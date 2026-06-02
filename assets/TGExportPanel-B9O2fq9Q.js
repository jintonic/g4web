const m="https://forms.gle/jN8vKdzNbjkxSRde7",g="g4web.survey.dismissed";function b(){try{return window.localStorage.getItem(g)==="1"}catch{return!1}}function v(){try{window.localStorage.setItem(g,"1")}catch{}}function w(){const o=document.createElement("div");return o.id="g4SurveyPrompt",o.className="g4-survey-overlay hidden",o.innerHTML=`
    <div class="g4-survey-dialog" role="dialog" aria-modal="true" aria-labelledby="g4SurveyTitle">
      <div class="g4-survey-header">
        <strong id="g4SurveyTitle">Quick survey</strong>
        <button type="button" class="g4-survey-close" aria-label="Close">×</button>
      </div>
      <div class="g4-survey-body">
        <p class="g4-survey-copy">
          Help us improve g4web — do you want to take a short survey?
        </p>
        <div class="g4-survey-actions">
          <button type="button" class="Button" data-survey="yes">Yes</button>
          <button type="button" class="Button" data-survey="no">No</button>
          <button type="button" class="Button" data-survey="never">Don't show again</button>
        </div>
      </div>
    </div>`,document.body.appendChild(o),o}function E(){return new Promise(o=>{let e=document.getElementById("g4SurveyPrompt");e||(e=w());const n=t=>{e.classList.add("hidden"),u(),o(t)},r=t=>{t.target===e&&n("dismiss")},i=t=>{t.key==="Escape"&&(t.stopImmediatePropagation(),n("dismiss"))},c=t=>{const l=t.currentTarget.getAttribute("data-survey");n(l)},d=()=>n("dismiss"),s=e.querySelector(".g4-survey-close"),a=e.querySelectorAll("[data-survey]");function u(){e.removeEventListener("click",r),document.removeEventListener("keydown",i,!0),s.removeEventListener("click",d),a.forEach(t=>t.removeEventListener("click",c))}e.addEventListener("click",r),document.addEventListener("keydown",i,!0),s.addEventListener("click",d),a.forEach(t=>t.addEventListener("click",c)),e.classList.remove("hidden")})}async function p(){if(b())return;const o=await E();o==="yes"?(window.open(m,"_blank","noopener,noreferrer"),v()):o==="never"&&v()}const y=`# print macro commands on screen
/control/verbose 1

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
/run/beamOn 100`;function f(o){const e=document.createElement("div");e.id="g4ExportPreview",e.className="g4-export-preview hidden",e.innerHTML=`
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
            <button type="button" class="Button" data-download="tg">download detector.tg</button>
          </div>
          <pre class="g4-export-preview-content" data-content="tg"></pre>
        </div>
        <div class="g4-export-preview-pane" data-pane="mac">
          <div class="g4-export-preview-actions">
            <button type="button" class="Button" data-download="mac">download run.mac</button>
          </div>
          <pre class="g4-export-preview-content" data-content="mac"></pre>
        </div>
      </div>
    </div>`;const n=e.querySelector(".g4-export-preview-close"),r=e.querySelectorAll(".g4-export-preview-tabs button"),i=e.querySelectorAll(".g4-export-preview-pane"),c=e.querySelector('[data-download="tg"]'),d=e.querySelector('[data-download="mac"]'),s=()=>e.classList.add("hidden");return n.addEventListener("click",s),e.addEventListener("click",a=>{a.target===e&&s()}),r.forEach(a=>{a.addEventListener("click",()=>{const u=a.getAttribute("data-tab");r.forEach(t=>{const l=t===a;t.classList.toggle("active",l),t.setAttribute("aria-selected",String(l))}),i.forEach(t=>{t.classList.toggle("active",t.getAttribute("data-pane")===u)})})}),c.addEventListener("click",async()=>{const a=e.querySelector('[data-content="tg"]');await p(),o(a.textContent||"","detector.tg")}),d.addEventListener("click",async()=>{await p(),o(y,"run.mac")}),document.addEventListener("keydown",a=>{a.key==="Escape"&&!e.classList.contains("hidden")&&s()}),document.body.appendChild(e),e}function h(o,e){let n=document.getElementById("g4ExportPreview");n||(n=f(e)),n.querySelector('[data-content="tg"]').textContent=o,n.querySelector('[data-content="mac"]').textContent=y,n.querySelector('[data-tab="tg"]').click(),n.classList.remove("hidden")}export{h as showTGExportPanel};
