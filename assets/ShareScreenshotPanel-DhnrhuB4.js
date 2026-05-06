const g="Built with g4web.";function f(){const e=document.getElementById("viewport");return e?e.querySelector("canvas"):null}function v(e){const o=e.split(","),a=o[0].match(/:(.*?);/),n=a?a[1]:"image/png",t=atob(o[1]),s=new Uint8Array(t.length);for(let c=0;c<t.length;c+=1)s[c]=t.charCodeAt(c);return new Blob([s],{type:n})}function w(e){return new Promise((o,a)=>{if(e.toBlob){e.toBlob(n=>{if(!n){a(new Error("Failed to create screenshot blob."));return}o(n)},"image/png");return}try{o(v(e.toDataURL("image/png")))}catch(n){a(n)}})}function m(){return`g4web-screenshot-${new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"")}.png`}function y(){const e=encodeURIComponent(window.location.href),o=encodeURIComponent(g);return{x:`https://twitter.com/intent/tweet?text=${o}&url=${e}`,facebook:`https://www.facebook.com/sharer/sharer.php?u=${e}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${e}`,reddit:`https://www.reddit.com/submit?url=${e}&title=${o}`,telegram:`https://t.me/share/url?url=${e}&text=${o}`,whatsapp:`https://wa.me/?text=${o}%20${e}`}}async function b(e){if(!e.blob)throw new Error("Take a screenshot first.");if(!navigator.clipboard||!window.ClipboardItem)throw new Error("Clipboard image copy is not supported in this browser.");await navigator.clipboard.write([new ClipboardItem({"image/png":e.blob})])}function k(e){if(!e.blob)throw new Error("Take a screenshot first.");const o=URL.createObjectURL(e.blob),a=document.createElement("a");a.href=o,a.download=e.fileName||m(),a.dispatchEvent(new MouseEvent("click")),URL.revokeObjectURL(o)}function i(e,o,a=!1){e.feedback.textContent=o,e.feedback.classList.toggle("error",a)}function p(e){e.previewUrl&&(URL.revokeObjectURL(e.previewUrl),e.previewUrl=null),e.previewImage.removeAttribute("src"),e.blob=null,e.fileName=""}async function S(e){const o=f();if(!o)throw new Error("Viewport canvas was not found.");let a=null;await new Promise(t=>requestAnimationFrame(t));try{a=await w(o)}catch{a=null}if(!a||a.size===0){const t=document.createElement("canvas");t.width=o.width,t.height=o.height;const s=t.getContext("2d");if(!s)throw new Error("Failed to initialize screenshot context.");s.drawImage(o,0,0),a=await w(t)}if(!a||a.size===0)throw new Error("Screenshot capture returned empty image data.");const n=m();p(e),e.blob=a,e.fileName=n,e.previewUrl=URL.createObjectURL(a),e.previewImage.src=e.previewUrl}function E(){const e=document.createElement("div");e.id="g4SharePanel",e.className="g4-share-overlay hidden",e.innerHTML=`
    <div class="g4-share-dialog" role="dialog" aria-modal="true" aria-label="Share Screenshot">
      <div class="g4-share-header">
        <strong>Share Screenshot</strong>
        <button type="button" class="g4-share-close" aria-label="Close">x</button>
      </div>

      <div class="g4-share-body">
        <div class="g4-share-result-step">
          <p class="g4-share-copy">
            Screenshot captured from the current viewport.
          </p>
          <div class="g4-share-preview-wrap">
            <img class="g4-share-preview" alt="Screenshot preview" />
          </div>

          <p class="g4-share-hint">
            Some platforms cannot auto-attach local images from the browser. Use copy or download if needed.
          </p>

          <div class="g4-share-actions g4-share-actions-primary">
            <button type="button" class="Button" data-action="copy">Copy Image</button>
            <button type="button" class="Button" data-action="download">Download PNG</button>
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
  `;const o=e.querySelector(".g4-share-close"),a=e.querySelector(".g4-share-preview"),n=e.querySelector(".g4-share-feedback"),t={overlay:e,previewImage:a,feedback:n,blob:null,fileName:"",previewUrl:null},s=()=>{e.classList.add("hidden"),i(t,"")},c=async()=>{e.classList.remove("hidden"),p(t),i(t,"Capturing screenshot...");try{await S(t),i(t,"Screenshot captured. Choose how to share it.")}catch(r){i(t,r.message||"Failed to capture screenshot.",!0)}};return o.addEventListener("click",s),e.addEventListener("click",r=>{r.target===e&&s()}),e.querySelectorAll("[data-action]").forEach(r=>{r.addEventListener("click",async()=>{const l=r.getAttribute("data-action");try{if(l==="copy"){await b(t),i(t,"Image copied to clipboard.");return}l==="download"&&(k(t),i(t,"Image downloaded as PNG."))}catch(u){i(t,u.message||"Action failed.",!0)}})}),e.querySelectorAll("[data-social]").forEach(r=>{r.addEventListener("click",async()=>{const l=r.getAttribute("data-social"),h=y()[l];if(!h){i(t,"Unknown social platform.",!0);return}window.open(h,"_blank","noopener,noreferrer");try{await b(t),i(t,"Share page opened. Image copied: paste it into the social composer.")}catch{i(t,"Share page opened. If needed, upload or paste your screenshot manually.")}})}),document.addEventListener("keydown",r=>{r.key==="Escape"&&!e.classList.contains("hidden")&&s()}),document.body.appendChild(e),{open:c,destroy:()=>{p(t),e.remove()}}}let d=null;function L(e){d||(d=E()),d.open()}export{L as showShareScreenshotPanel};
