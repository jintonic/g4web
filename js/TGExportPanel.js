const RUN_MAC_CONTENT = `# print macro commands on screen
/control/verbose 1
# uncomment the following line if you use https://github.com/jintonic/gears
/geometry/source detector.tg

# initialize geometry and physics
/run/initialize

# change particle and its energy here
/gps/particle gamma
/gps/energy 2.6 MeV
/gps/ang/type iso

# visualize geometry and events for debugging
/vis/open
/vis/drawVolume
/vis/scene/add/trajectories
/vis/scene/endOfEventAction accumulate
/run/beamOn 100`;

function createPanel(saveString) {
  const overlay = document.createElement('div');
  overlay.id = 'g4ExportPreview';
  overlay.className = 'g4-export-preview hidden';

  overlay.innerHTML = `
    <div class="g4-export-preview-dialog" role="dialog" aria-modal="true" aria-label="Export Preview">
      <div class="g4-export-preview-header">
        <strong>Export Preview</strong>
        <button type="button" class="g4-export-preview-close" aria-label="Close">×</button>
      </div>
      <div class="g4-export-preview-tabs" role="tablist">
        <button type="button" class="active" data-tab="tg" role="tab" aria-selected="true">TG</button>
        <button type="button" data-tab="mac" role="tab" aria-selected="false">MAC</button>
      </div>
      <div class="g4-export-preview-body">
        <div class="g4-export-preview-pane active" data-pane="tg">
          <div class="g4-export-preview-actions">
            <button type="button" class="Button" data-download="tg">Download scene.tg</button>
          </div>
          <pre class="g4-export-preview-content" data-content="tg"></pre>
        </div>
        <div class="g4-export-preview-pane" data-pane="mac">
          <div class="g4-export-preview-actions">
            <button type="button" class="Button" data-download="mac">Download run.mac</button>
          </div>
          <pre class="g4-export-preview-content" data-content="mac"></pre>
        </div>
      </div>
    </div>`;

  const closeButton = overlay.querySelector('.g4-export-preview-close');
  const tabButtons = overlay.querySelectorAll('.g4-export-preview-tabs button');
  const panes = overlay.querySelectorAll('.g4-export-preview-pane');
  const tgDownload = overlay.querySelector('[data-download="tg"]');
  const macDownload = overlay.querySelector('[data-download="mac"]');

  const close = () => overlay.classList.add('hidden');

  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');

      tabButtons.forEach((tab) => {
        const isActive = tab === button;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      panes.forEach((pane) => {
        pane.classList.toggle(
          'active',
          pane.getAttribute('data-pane') === target
        );
      });
    });
  });

  tgDownload.addEventListener('click', () => {
    const tgContentNode = overlay.querySelector('[data-content="tg"]');
    saveString(tgContentNode.textContent || '', 'scene.tg');
  });

  macDownload.addEventListener('click', () => {
    saveString(RUN_MAC_CONTENT, 'run.mac');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
      close();
    }
  });

  document.body.appendChild(overlay);
  return overlay;
}

function showTGExportPanel(tgContent, saveString) {
  let panel = document.getElementById('g4ExportPreview');

  if (!panel) {
    panel = createPanel(saveString);
  }

  panel.querySelector('[data-content="tg"]').textContent = tgContent;
  panel.querySelector('[data-content="mac"]').textContent = RUN_MAC_CONTENT;

  const tgTab = panel.querySelector('[data-tab="tg"]');
  tgTab.click();
  panel.classList.remove('hidden');
}

export { showTGExportPanel };
