const y="Built with g4web.";function S(){const e=document.getElementById("viewport");return e?e.querySelector("canvas"):null}function k(e){const t=e.split(","),o=t[0].match(/:(.*?);/),n=o?o[1]:"image/png",c=atob(t[1]),r=new Uint8Array(c.length);for(let a=0;a<c.length;a+=1)r[a]=c.charCodeAt(a);return new Blob([r],{type:n})}function b(e){return new Promise((t,o)=>{if(e.toBlob){e.toBlob(n=>{if(!n){o(new Error("Failed to create screenshot blob."));return}t(n)},"image/png");return}try{t(k(e.toDataURL("image/png")))}catch(n){o(n)}})}function m(){return`g4web-screenshot-${new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"")}.png`}function E(){const e=encodeURIComponent(window.location.href),t=encodeURIComponent(y);return{x:`https://twitter.com/intent/tweet?text=${t}&url=${e}`,facebook:`https://www.facebook.com/sharer/sharer.php?u=${e}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${e}`,reddit:`https://www.reddit.com/submit?url=${e}&title=${t}`,telegram:`https://t.me/share/url?url=${e}&text=${t}`,whatsapp:`https://wa.me/?text=${t}%20${e}`}}async function g(e){if(!e.blob)throw new Error("Take a screenshot first.");if(!navigator.clipboard||!window.ClipboardItem)throw new Error("Clipboard image copy is not supported in this browser.");await navigator.clipboard.write([new ClipboardItem({"image/png":e.blob})])}function L(e){if(!e.blob)throw new Error("Take a screenshot first.");const t=URL.createObjectURL(e.blob),o=document.createElement("a");o.href=t,o.download=e.fileName||m(),o.dispatchEvent(new MouseEvent("click")),URL.revokeObjectURL(t)}function i(e,t,o=!1){e.feedback.textContent=t,e.feedback.classList.toggle("error",o)}function u(e,t){e.captureStep.classList.toggle("active",t==="capture"),e.resultStep.classList.toggle("active",t==="result")}function f(e){e.previewUrl&&(URL.revokeObjectURL(e.previewUrl),e.previewUrl=null),e.previewImage.removeAttribute("src"),e.blob=null,e.file=null,e.fileName=""}async function U(e){const t=S();if(!t)throw new Error("Viewport canvas was not found.");let o=null;await new Promise(r=>requestAnimationFrame(r));try{o=await b(t)}catch{o=null}if(!o||o.size===0){const r=document.createElement("canvas");r.width=t.width,r.height=t.height;const a=r.getContext("2d");if(!a)throw new Error("Failed to initialize screenshot context.");a.drawImage(t,0,0),o=await b(r)}if(!o||o.size===0)throw new Error("Screenshot capture returned empty image data.");const n=m();let c=null;typeof File<"u"&&(c=new File([o],n,{type:"image/png"})),f(e),e.blob=o,e.file=c,e.fileName=n,e.previewUrl=URL.createObjectURL(o),e.previewImage.src=e.previewUrl}function C(){const e=document.createElement("div");e.id="g4SharePanel",e.className="g4-share-overlay hidden",e.innerHTML=`
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
  `;const t=e.querySelector(".g4-share-close"),o=e.querySelector(".g4-share-capture-step"),n=e.querySelector(".g4-share-result-step"),c=e.querySelector(".g4-share-preview"),r=e.querySelector(".g4-share-feedback"),a={overlay:e,captureStep:o,resultStep:n,previewImage:c,feedback:r,blob:null,file:null,fileName:"",previewUrl:null},d=()=>{e.classList.add("hidden"),i(a,"")},v=()=>{u(a,"capture"),i(a,""),e.classList.remove("hidden")};return t.addEventListener("click",d),e.addEventListener("click",s=>{s.target===e&&d()}),e.querySelectorAll("[data-action]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.getAttribute("data-action");try{if(l==="cancel"){d();return}if(l==="capture"){await U(a),u(a,"result"),i(a,"Screenshot captured. Choose how to share it.");return}if(l==="retake"){u(a,"capture"),i(a,"Take another screenshot.");return}if(l==="copy"){await g(a),i(a,"Image copied to clipboard.");return}l==="download"&&(L(a),i(a,"Image downloaded as PNG."))}catch(h){i(a,h.message||"Action failed.",!0)}})}),e.querySelectorAll("[data-social]").forEach(s=>{s.addEventListener("click",async()=>{const l=s.getAttribute("data-social"),w=E()[l];if(!w){i(a,"Unknown social platform.",!0);return}window.open(w,"_blank","noopener,noreferrer");try{await g(a),i(a,"Share page opened. Image copied: paste it into the social composer.")}catch{i(a,"Share page opened. If needed, upload or paste your screenshot manually.")}})}),document.addEventListener("keydown",s=>{s.key==="Escape"&&!e.classList.contains("hidden")&&d()}),document.body.appendChild(e),{open:v,destroy:()=>{f(a),e.remove()}}}let p=null;function I(e){p||(p=C()),p.open()}export{I as showShareScreenshotPanel};
