const m="https://forms.gle/jN8vKdzNbjkxSRde7",p="g4web.survey.dismissed";function b(){try{return window.localStorage.getItem(p)==="1"}catch{return!1}}function u(){try{window.localStorage.setItem(p,"1")}catch{}}function w(){const t=document.createElement("div");return t.id="g4SurveyPrompt",t.className="g4-survey-overlay hidden",t.innerHTML=`
    <div class="g4-survey-dialog" role="dialog" aria-modal="true" aria-labelledby="g4SurveyTitle">
      <div class="g4-survey-header">
        <strong id="g4SurveyTitle">Quick survey</strong>
      </div>
      <div class="g4-survey-body">
        <p class="g4-survey-copy">
          Help us improve g4web — do you want to take a short survey?
        </p>
        <div class="g4-survey-actions">
          <button type="button" class="Button" data-survey="yes">Yes</button>
          <button type="button" class="Button" data-survey="no">Maybe later</button>
          <button type="button" class="Button" data-survey="never">Don't show again</button>
        </div>
      </div>
    </div>`,document.body.appendChild(t),t}function E(){return new Promise(t=>{let e=document.getElementById("g4SurveyPrompt");e||(e=w());const a=o=>{e.classList.add("hidden"),d(),t(o)},r=o=>{o.key==="Escape"&&(o.stopImmediatePropagation(),a("dismiss"))},i=o=>{const n=o.currentTarget.getAttribute("data-survey");a(n)},c=e.querySelectorAll("[data-survey]");function d(){document.removeEventListener("keydown",r,!0),c.forEach(o=>o.removeEventListener("click",i))}document.addEventListener("keydown",r,!0),c.forEach(o=>o.addEventListener("click",i)),e.classList.remove("hidden")})}async function v(){if(b())return;const t=await E();t==="yes"?(window.open(m,"_blank","noopener,noreferrer"),u()):t==="never"&&u()}const g=`# print macro commands on screen
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
/run/beamOn 100`;function f(t){const e=document.createElement("div");e.id="g4ExportPreview",e.className="g4-export-preview hidden",e.innerHTML=`
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
    </div>`;const a=e.querySelector(".g4-export-preview-close"),r=e.querySelectorAll(".g4-export-preview-tabs button"),i=e.querySelectorAll(".g4-export-preview-pane"),c=e.querySelector('[data-download="tg"]'),d=e.querySelector('[data-download="mac"]'),o=()=>e.classList.add("hidden");return a.addEventListener("click",o),e.addEventListener("click",n=>{n.target===e&&o()}),r.forEach(n=>{n.addEventListener("click",()=>{const y=n.getAttribute("data-tab");r.forEach(s=>{const l=s===n;s.classList.toggle("active",l),s.setAttribute("aria-selected",String(l))}),i.forEach(s=>{s.classList.toggle("active",s.getAttribute("data-pane")===y)})})}),c.addEventListener("click",async()=>{const n=e.querySelector('[data-content="tg"]');await v(),t(n.textContent||"","detector.tg")}),d.addEventListener("click",async()=>{await v(),t(g,"run.mac")}),document.addEventListener("keydown",n=>{n.key==="Escape"&&!e.classList.contains("hidden")&&o()}),document.body.appendChild(e),e}function h(t,e){let a=document.getElementById("g4ExportPreview");a||(a=f(e)),a.querySelector('[data-content="tg"]').textContent=t,a.querySelector('[data-content="mac"]').textContent=g,a.querySelector('[data-tab="tg"]').click(),a.classList.remove("hidden")}export{h as showTGExportPanel};
