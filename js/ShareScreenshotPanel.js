const SHARE_TEXT = 'Built with g4web.';

function getViewportCanvas() {
  const viewport = document.getElementById('viewport');
  if (!viewport) return null;
  return viewport.querySelector('canvas');
}

function dataUrlToBlob(dataUrl) {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
  const binary = atob(parts[1]);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mimeType });
}

function canvasToPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create screenshot blob.'));
          return;
        }

        resolve(blob);
      }, 'image/png');
      return;
    }

    try {
      resolve(dataUrlToBlob(canvas.toDataURL('image/png')));
    } catch (error) {
      reject(error);
    }
  });
}

function getTimestampedName() {
  const now = new Date();
  const stamp = now
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, '');
  return `g4web-screenshot-${stamp}.png`;
}

function createShareLinks() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(SHARE_TEXT);

  return {
    x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    reddit: `https://www.reddit.com/submit?url=${url}&title=${text}`,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
  };
}

async function copyImageToClipboard(state) {
  if (!state.blob) {
    throw new Error('Take a screenshot first.');
  }

  if (!navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Clipboard image copy is not supported in this browser.');
  }

  await navigator.clipboard.write([
    new ClipboardItem({
      'image/png': state.blob,
    }),
  ]);
}

function downloadImage(state) {
  if (!state.blob) {
    throw new Error('Take a screenshot first.');
  }

  const downloadUrl = URL.createObjectURL(state.blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = state.fileName || getTimestampedName();
  link.dispatchEvent(new MouseEvent('click'));
  URL.revokeObjectURL(downloadUrl);
}

function setFeedback(state, message, isError = false) {
  state.feedback.textContent = message;
  state.feedback.classList.toggle('error', isError);
}

function setStep(state, step) {
  state.captureStep.classList.toggle('active', step === 'capture');
  state.resultStep.classList.toggle('active', step === 'result');
}

function resetPreview(state) {
  if (state.previewUrl) {
    URL.revokeObjectURL(state.previewUrl);
    state.previewUrl = null;
  }

  state.previewImage.removeAttribute('src');
  state.blob = null;
  state.file = null;
  state.fileName = '';
}

async function captureViewport(state) {
  const sourceCanvas = getViewportCanvas();

  if (!sourceCanvas) {
    throw new Error('Viewport canvas was not found.');
  }

  let blob = null;

  // Give the renderer one frame before capture to avoid stale/blank grabs.
  await new Promise((resolve) => requestAnimationFrame(resolve));

  try {
    blob = await canvasToPngBlob(sourceCanvas);
  } catch (error) {
    blob = null;
  }

  if (!blob || blob.size === 0) {
    const snapshotCanvas = document.createElement('canvas');
    snapshotCanvas.width = sourceCanvas.width;
    snapshotCanvas.height = sourceCanvas.height;

    const context = snapshotCanvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to initialize screenshot context.');
    }

    context.drawImage(sourceCanvas, 0, 0);
    blob = await canvasToPngBlob(snapshotCanvas);
  }

  if (!blob || blob.size === 0) {
    throw new Error('Screenshot capture returned empty image data.');
  }

  const filename = getTimestampedName();

  let file = null;
  if (typeof File !== 'undefined') {
    file = new File([blob], filename, { type: 'image/png' });
  }

  resetPreview(state);

  state.blob = blob;
  state.file = file;
  state.fileName = filename;
  state.previewUrl = URL.createObjectURL(blob);
  state.previewImage.src = state.previewUrl;
}

function createPanel() {
  const overlay = document.createElement('div');
  overlay.id = 'g4SharePanel';
  overlay.className = 'g4-share-overlay hidden';

  overlay.innerHTML = `
    <div class="g4-share-dialog" role="dialog" aria-modal="true" aria-label="Share Screenshot">
      <div class="g4-share-header">
        <strong>Share Screenshot</strong>
        <button type="button" class="g4-share-close" aria-label="Close">x</button>
      </div>

      <div class="g4-share-body">
        <div class="g4-share-step g4-share-capture-step active" data-step="capture">
          <p class="g4-share-copy">
            Capture the current viewport, then share it on social media.
          </p>
          <div class="g4-share-actions">
            <button type="button" class="Button" data-action="capture">Capture Screenshot</button>
            <button type="button" class="Button" data-action="cancel">Cancel</button>
          </div>
        </div>

        <div class="g4-share-step g4-share-result-step" data-step="result">
          <div class="g4-share-preview-wrap">
            <img class="g4-share-preview" alt="Screenshot preview" />
          </div>

          <p class="g4-share-hint">
            Some platforms cannot auto-attach local images from the browser. Use copy or download if needed.
          </p>

          <div class="g4-share-actions g4-share-actions-primary">
            <button type="button" class="Button" data-action="copy">Copy Image</button>
            <button type="button" class="Button" data-action="download">Download PNG</button>
            <button type="button" class="Button" data-action="retake">Retake</button>
          </div>

          <div class="g4-share-social-grid">
            <button type="button" class="Button" data-social="x">Share on X</button>
            <button type="button" class="Button" data-social="facebook">Share on Facebook</button>
            <button type="button" class="Button" data-social="linkedin">Share on LinkedIn</button>
            <button type="button" class="Button" data-social="reddit">Share on Reddit</button>
            <button type="button" class="Button" data-social="telegram">Share on Telegram</button>
            <button type="button" class="Button" data-social="whatsapp">Share on WhatsApp</button>
          </div>
        </div>
      </div>

      <div class="g4-share-feedback" aria-live="polite"></div>
    </div>
  `;

  const closeButton = overlay.querySelector('.g4-share-close');
  const captureStep = overlay.querySelector('.g4-share-capture-step');
  const resultStep = overlay.querySelector('.g4-share-result-step');
  const previewImage = overlay.querySelector('.g4-share-preview');
  const feedback = overlay.querySelector('.g4-share-feedback');

  const state = {
    overlay,
    captureStep,
    resultStep,
    previewImage,
    feedback,
    blob: null,
    file: null,
    fileName: '',
    previewUrl: null,
  };

  const close = () => {
    overlay.classList.add('hidden');
    setFeedback(state, '');
  };

  const open = () => {
    setStep(state, 'capture');
    setFeedback(state, '');
    overlay.classList.remove('hidden');
  };

  closeButton.addEventListener('click', close);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      close();
    }
  });

  overlay.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', async () => {
      const action = button.getAttribute('data-action');

      try {
        if (action === 'cancel') {
          close();
          return;
        }

        if (action === 'capture') {
          await captureViewport(state);
          setStep(state, 'result');
          setFeedback(state, 'Screenshot captured. Choose how to share it.');
          return;
        }

        if (action === 'retake') {
          setStep(state, 'capture');
          setFeedback(state, 'Take another screenshot.');
          return;
        }

        if (action === 'copy') {
          await copyImageToClipboard(state);
          setFeedback(state, 'Image copied to clipboard.');
          return;
        }

        if (action === 'download') {
          downloadImage(state);
          setFeedback(state, 'Image downloaded as PNG.');
        }
      } catch (error) {
        setFeedback(state, error.message || 'Action failed.', true);
      }
    });
  });

  overlay.querySelectorAll('[data-social]').forEach((button) => {
    button.addEventListener('click', async () => {
      const platform = button.getAttribute('data-social');
      const links = createShareLinks();
      const target = links[platform];

      if (!target) {
        setFeedback(state, 'Unknown social platform.', true);
        return;
      }

      window.open(target, '_blank', 'noopener,noreferrer');

      try {
        await copyImageToClipboard(state);
        setFeedback(
          state,
          'Share page opened. Image copied: paste it into the social composer.'
        );
      } catch (error) {
        setFeedback(
          state,
          'Share page opened. If needed, upload or paste your screenshot manually.'
        );
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
      close();
    }
  });

  document.body.appendChild(overlay);

  return {
    open,
    destroy: () => {
      resetPreview(state);
      overlay.remove();
    },
  };
}

let sharePanelController = null;

function showShareScreenshotPanel(_editor) {
  if (!sharePanelController) {
    sharePanelController = createPanel();
  }

  sharePanelController.open();
}

export { showShareScreenshotPanel };
