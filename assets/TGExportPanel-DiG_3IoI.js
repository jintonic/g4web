const s=`# print macro commands on screen
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
/run/beamOn 100`;function v(n){const e=document.createElement("div");e.id="g4ExportPreview",e.className="g4-export-preview hidden",e.innerHTML=`
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
    </div>`;const a=e.querySelector(".g4-export-preview-close"),r=e.querySelectorAll(".g4-export-preview-tabs button"),d=e.querySelectorAll(".g4-export-preview-pane"),l=e.querySelector('[data-download="tg"]'),p=e.querySelector('[data-download="mac"]'),c=()=>e.classList.add("hidden");return a.addEventListener("click",c),e.addEventListener("click",t=>{t.target===e&&c()}),r.forEach(t=>{t.addEventListener("click",()=>{const g=t.getAttribute("data-tab");r.forEach(o=>{const i=o===t;o.classList.toggle("active",i),o.setAttribute("aria-selected",String(i))}),d.forEach(o=>{o.classList.toggle("active",o.getAttribute("data-pane")===g)})})}),l.addEventListener("click",()=>{const t=e.querySelector('[data-content="tg"]');n(t.textContent||"","detector.tg")}),p.addEventListener("click",()=>{n(s,"run.mac")}),document.addEventListener("keydown",t=>{t.key==="Escape"&&!e.classList.contains("hidden")&&c()}),document.body.appendChild(e),e}function u(n,e){let a=document.getElementById("g4ExportPreview");a||(a=v(e)),a.querySelector('[data-content="tg"]').textContent=n,a.querySelector('[data-content="mac"]').textContent=s,a.querySelector('[data-tab="tg"]').click(),a.classList.remove("hidden")}export{u as showTGExportPanel};
