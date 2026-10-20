/* =====================================================================
   NQAAE monitoring — «Oʻzbekiston xaritasi» boʻlimi
   - 14 hudud chegarasi (uz-map-data.js, geoBoundaries ADM1 asosida)
   - Och koʻk hududlar, toʻq koʻk chegaralar, hudud nomlari
   - Kursor ustida: hudud boʻrtib chiqadi, nuqta + yoʻnaltiruvchi chiziq,
     taʼlim tashkilotlari soni (jami va turlar boʻyicha, manba: RAW_DATA)
   - Maʼlumot va hisob-kitoblarga tegilmaydi; faqat koʻrsatish qatlami
   ===================================================================== */
(function(){
"use strict";
// DOM matni har doim oʻzbekcha yoziladi — tarjimani i18n.js kuzatuvchisi koʻrsatish vaqtida bajaradi
const TR  = s => s;
const NUM = n => (typeof window.fmtNum==='function') ? fmtNum(n) : String(n);
const norm = s => String(s||'').toLowerCase().replace(/[‘’ʻʼ`´']/g,"'").replace(/\s+/g,' ').trim();

// taʼlim turlari (tartib foydalanuvchi talabi boʻyicha)
const CATS = [
  {k:'oliy', label:'Oliy taʼlim',                      test:l=>/^oliy ta'lim/.test(l)},
  {k:'post', label:'Oliy taʼlimdan keyingi taʼlim',    test:l=>/keyingi/.test(l)},
  {k:'orta', label:'Oʻrta maxsus taʼlim',              test:l=>/^o'rta maxsus/.test(l)},
  {k:'kasb', label:'Kasbiy taʼlim',                    test:l=>/^kasbiy/.test(l)},
  {k:'kadr', label:'Kadrlarni qayta tayyorlash va ularning malakasini oshirish', test:l=>/^kadrlarni qayta/.test(l)}
];
// yorliq joylashuvi uchun qoʻlda tuzatishlar (SVG birligida)
// shahar nomi joylashuvi (standart: nuqta ostida, markazlashgan)
const CITY_FIX = { 'UZ-TK':{dx:-8, dy:4, anchor:'end'}, 'UZ-TO':{dx:6, dy:18, anchor:'start'}, 'UZ-SU':{dy:-8} };
// hudud nomi joylashuvi (markazdan siljish; shahar nomi bilan toʻqnashmasligi uchun)
const LABEL_FIX = { 'UZ-TK':{dx:0, dy:-16, size:11}, 'UZ-TO':{dx:30, dy:-34}, 'UZ-AN':{size:12, dy:-14}, 'UZ-NG':{size:12, dx:-20, dy:-6}, 'UZ-FA':{size:12, dx:-18, dy:-8},
  'UZ-SI':{size:12, dy:-14}, 'UZ-XO':{size:12, dy:-14}, 'UZ-QA':{dx:20, dy:-10}, 'UZ-SA':{dx:-14, dy:-6} };

const CSS = `
.uzm-wrap{position:relative;width:100%;max-width:1100px;margin:0 auto;user-select:none}
.uzm-wrap svg{width:100%;height:auto;display:block;overflow:visible}
.uzm-region{fill:#CFE4FB;stroke:#1E3A8A;stroke-width:1.3;stroke-linejoin:round;cursor:pointer;outline:none;
  transform-box:fill-box;transform-origin:center;
  transition:transform .28s cubic-bezier(.2,.8,.2,1), fill .2s ease, filter .28s ease}
.uzm-region.is-hover,.uzm-region:focus-visible{fill:#A9CFF7;stroke-width:1.8;transform:scale(1.045);filter:drop-shadow(0 8px 12px rgba(30,58,138,.35))}
.uzm-label{font-family:var(--font,Inter,Arial,sans-serif);font-size:13px;font-weight:600;fill:#1E3A8A;text-anchor:middle;pointer-events:none;paint-order:stroke;stroke:rgba(255,255,255,.85);stroke-width:3px;stroke-linejoin:round}
.uzm-city{fill:#1E3A8A;stroke:#fff;stroke-width:1.6;pointer-events:none}
.uzm-city-label{font-family:var(--font,Inter,Arial,sans-serif);font-size:11px;font-weight:500;font-style:italic;fill:#1E3A8A;text-anchor:middle;pointer-events:none;paint-order:stroke;stroke:rgba(255,255,255,.9);stroke-width:3px;stroke-linejoin:round}
.uzm-tip .r.city{margin-bottom:4px;padding-bottom:4px;border-bottom:1px dashed var(--border,#E4EAF2)}
.uzm-tip .r.city b{color:var(--c-text,#172033);font-weight:600}
.uzm-marker{pointer-events:none;opacity:0;transition:opacity .15s}
.uzm-marker.on{opacity:1}
.uzm-lead{fill:none;stroke:#1E3A8A;stroke-width:1.6;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .35s ease-out}
.uzm-marker.on .uzm-lead{stroke-dashoffset:0}
.uzm-dot{fill:#1E3A8A;stroke:#fff;stroke-width:2}
.uzm-ring{fill:none;stroke:#1E3A8A;stroke-width:1.5;opacity:.9;transform-box:fill-box;transform-origin:center;animation:uzmPulse 1.6s ease-out infinite}
@keyframes uzmPulse{0%{transform:scale(.5);opacity:.9}100%{transform:scale(2.2);opacity:0}}
.uzm-tip{position:absolute;z-index:5;min-width:230px;max-width:300px;background:var(--c-card,#fff);color:var(--c-text,#172033);border:1px solid #1E3A8A;border-radius:12px;box-shadow:0 12px 32px rgba(24,49,83,.22);padding:10px 12px;font-size:13px;line-height:1.35;pointer-events:none;opacity:0;transform:translateY(4px);transition:opacity .18s ease,transform .18s ease}
.uzm-tip.on{opacity:1;transform:none}
.uzm-tip.static{position:static;max-width:none;min-width:0;margin:10px 0 0;pointer-events:auto}
.uzm-tip.static:not(.on){display:none}
.uzm-tip .t{font-weight:700;font-size:14px;color:#1E3A8A;margin-bottom:6px;padding-bottom:6px;border-bottom:1px dashed var(--border,#E4EAF2)}
.uzm-tip .r{display:flex;justify-content:space-between;gap:12px;padding:2px 0}
.uzm-tip .r b{font-variant-numeric:tabular-nums;color:#1E3A8A}
.uzm-tip .r.total{font-weight:700;margin-bottom:4px}
.uzm-tip .r.sub span:first-child{color:var(--c-text-2,#667085)}
.uzm-legend{display:flex;flex-wrap:wrap;gap:14px;margin:10px 2px 0;font-size:12px;color:var(--c-text-2,#667085)}
.uzm-legend i{display:inline-block;width:14px;height:14px;border-radius:3px;background:#CFE4FB;border:1.5px solid #1E3A8A;vertical-align:-2px;margin-right:6px}
body.reduce-motion .uzm-region,body.reduce-motion .uzm-lead,body.reduce-motion .uzm-tip{transition:none}
body.reduce-motion .uzm-ring{animation:none}
@media (prefers-reduced-motion:reduce){.uzm-region,.uzm-lead,.uzm-tip{transition:none}.uzm-ring{animation:none}}
[data-theme="dark"] .uzm-region,body.dark .uzm-region{fill:#2B4C7E;stroke:#9CC4F2}
[data-theme="dark"] .uzm-region.is-hover,body.dark .uzm-region.is-hover{fill:#3B66A6}
[data-theme="dark"] .uzm-label,body.dark .uzm-label{fill:#E7EDF6;stroke:rgba(14,23,38,.8)}
[data-theme="dark"] .uzm-city-label,body.dark .uzm-city-label{fill:#CFE4FB;stroke:rgba(14,23,38,.8)}
[data-theme="dark"] .uzm-city,body.dark .uzm-city{fill:#9CC4F2;stroke:#0E1726}
[data-theme="dark"] .uzm-lead,[data-theme="dark"] .uzm-dot,[data-theme="dark"] .uzm-ring,body.dark .uzm-lead,body.dark .uzm-dot,body.dark .uzm-ring{stroke:#9CC4F2}
[data-theme="dark"] .uzm-dot,body.dark .uzm-dot{fill:#9CC4F2;stroke:#0E1726}
[data-theme="dark"] .uzm-tip,body.dark .uzm-tip{border-color:#9CC4F2}
[data-theme="dark"] .uzm-tip .t,[data-theme="dark"] .uzm-tip .r b,body.dark .uzm-tip .t,body.dark .uzm-tip .r b{color:#9CC4F2}
@media (max-width:767px){.uzm-label{font-size:18px;stroke-width:4px}.uzm-city-label{font-size:15px;stroke-width:4px}.uzm-city{r:5}.uzm-tip{min-width:190px;max-width:240px;font-size:12px}}
`;

const UZMAP = { data:null, rendered:false };

function compute(){
  const M = window.UZ_MAP; if(!M) return null;
  const rows = (typeof RAW_DATA!=='undefined' && Array.isArray(RAW_DATA)) ? RAW_DATA : (window.RAW_DATA||[]);
  const by = {}; const keyOf = {};
  M.regions.forEach(r=>{ by[r.id] = {id:r.id, key:r.key, short:r.short, total:0}; CATS.forEach(c=>by[r.id][c.k]=0); keyOf[norm(r.key)] = r.id; });
  let unmatched = 0;
  rows.forEach(o=>{ const id = keyOf[norm(o.region)]; if(!id){ unmatched++; return; } const b = by[id]; b.total++; const l = norm(o.lvl); const c = CATS.find(c=>c.test(l)); if(c) b[c.k]++; });
  return {by, total: rows.length - unmatched, unmatched};
}

function svgEl(tag, attrs){ const e = document.createElementNS('http://www.w3.org/2000/svg', tag); if(attrs) Object.keys(attrs).forEach(k=>e.setAttribute(k, attrs[k])); return e; }

function build(wrap){
  const M = window.UZ_MAP; const D = UZMAP.data = compute(); if(!M || !D) return;
  wrap.innerHTML = '';
  const svg = svgEl('svg', {viewBox:`0 0 ${M.w} ${M.h}`, role:'group', 'aria-label':TR('Oʻzbekiston hududlari xaritasi')});
  const gR = svgEl('g', {class:'uzm-regions'}), gL = svgEl('g', {class:'uzm-labels'}), gM = svgEl('g', {class:'uzm-marker'});
  const lead = svgEl('path', {class:'uzm-lead', pathLength:'1'}); const ring = svgEl('circle', {class:'uzm-ring', r:'7'}); const dot = svgEl('circle', {class:'uzm-dot', r:'4.5'});
  gM.appendChild(lead); gM.appendChild(ring); gM.appendChild(dot);
  const tip = document.createElement('div'); tip.className = 'uzm-tip'; tip.setAttribute('role','status'); tip.setAttribute('aria-live','polite');

  M.regions.forEach(r=>{
    const c = D.by[r.id];
    const p = svgEl('path', {d:r.d, class:'uzm-region', 'data-id':r.id, tabindex:'0', role:'button'});
    p.setAttribute('aria-label', `${r.key}: ${c.total}`);
    p.__region = r; gR.appendChild(p);
    const fx = LABEL_FIX[r.id] || {};
    const t = svgEl('text', {x:r.cx + (fx.dx||0), y:r.cy + (fx.dy||0) + 4, class:'uzm-label'});
    if(fx.size) t.setAttribute('font-size', fx.size);
    t.textContent = r.short; gL.appendChild(t);
  });
  // markaziy shaharlar: nuqta + nom (geografik joylashuvi boʻyicha)
  const gC = svgEl('g', {class:'uzm-cities'});
  M.regions.forEach(r=>{
    if(r.px==null) return;
    const fx = CITY_FIX[r.id] || {};
    gC.appendChild(svgEl('circle', {class:'uzm-city', cx:r.px, cy:r.py, r:'3.6', 'data-id':r.id}));
    const t = svgEl('text', {x:r.px + (fx.dx||0), y:r.py + (fx.dy!=null ? fx.dy : 16), class:'uzm-city-label', 'data-id':r.id});
    if(fx.anchor) t.setAttribute('text-anchor', fx.anchor);
    t.textContent = r.city; gC.appendChild(t);
  });
  svg.appendChild(gR); svg.appendChild(gL); svg.appendChild(gC); svg.appendChild(gM);
  wrap.appendChild(svg); wrap.appendChild(tip);

  const legend = document.createElement('div'); legend.className = 'uzm-legend';
  legend.innerHTML = `<span><i></i>${TR('Hudud')} · ${TR('kursorni hudud ustiga olib boring')}</span><span>${TR('Jami taʼlim tashkilotlari')}: <b>${NUM(D.total)}</b></span>`;
  wrap.appendChild(legend);

  let active = null;
  const show = (p)=>{
    const r = p.__region, c = D.by[r.id];
    if(active && active!==p) active.classList.remove('is-hover');
    active = p; p.classList.add('is-hover'); gR.appendChild(p);           // ustiga chizish
    // tooltip matni
    const rows = CATS.filter(k=>c[k.k]>0).map(k=>`<div class="r sub"><span>${TR(k.label)}</span><b>${NUM(c[k.k])}</b></div>`).join('');
    tip.innerHTML = `<div class="t">${TR(r.key)}</div>${r.city?`<div class="r sub city"><span>${TR('Markaziy shahar')}</span><b>${r.city}</b></div>`:''}<div class="r total"><span>${TR('Jami taʼlim tashkilotlari')}</span><b>${NUM(c.total)}</b></div>${rows}`;
    // joylashuv: SVG → piksel
    const W = wrap.clientWidth || 1, k = W / M.w;
    tip.style.visibility = 'hidden'; tip.classList.add('on');
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    const ox = (r.px!=null) ? r.px : r.cx, oy = (r.py!=null) ? r.py : r.cy;   // belgi nuqtasi — markaziy shahar
    const gap = 34, px = ox*k, py = oy*k, Hpx = M.h*k;
    // shahar nomi yozuvi — tooltip uni yopmasligi kerak
    let lb = null; try{ const b = gC.querySelector(`text[data-id="${r.id}"]`).getBBox(); lb = {x:b.x*k, y:b.y*k, w:b.width*k, h:b.height*k}; }catch(e){}
    const hitLabel = (x,y)=> !!lb && !(x+tw < lb.x-4 || x > lb.x+lb.w+4 || y+th < lb.y-4 || y > lb.y+lb.h+4);
    // tor ekran (telefon): yozuv xaritani yopmasin — xarita ostida statik blok, faqat nuqta belgilanadi
    if(W < 480){
      tip.classList.add('static'); tip.style.left = ''; tip.style.top = ''; tip.style.visibility = '';
      lead.setAttribute('d', '');
      dot.setAttribute('cx', ox); dot.setAttribute('cy', oy); ring.setAttribute('cx', ox); ring.setAttribute('cy', oy);
      gM.classList.remove('on'); void gM.getBoundingClientRect(); gM.classList.add('on');
      return;
    }
    tip.classList.remove('static');
    const preferRight = r.cx < M.w*0.62;                 // sharqiy hududlar uchun chapga
    const fitsR = px + gap + tw <= W, fitsL = px - gap - tw >= 0;
    let mode; if(preferRight && fitsR) mode='R'; else if(!preferRight && fitsL) mode='L'; else if(fitsR) mode='R'; else if(fitsL) mode='L'; else mode='V';
    let tx, ty;
    if(mode==='R'){ tx = px + gap; ty = py - th/2; }
    else if(mode==='L'){ tx = px - gap - tw; ty = py - th/2; }
    else { tx = px - tw/2; ty = (py - gap - th >= 0) ? py - gap - th : py + gap; }   // tor ekran: ustida yoki ostida
    if(mode!=='V' && hitLabel(tx,ty)){ const below = lb.y + lb.h + 8; ty = (below + th <= Hpx) ? below : lb.y - th - 8; }   // yozuvni yopmaslik: pastga yoki tepaga suramiz
    tx = Math.max(0, Math.min(W - tw, tx)); ty = Math.max(0, Math.min(Hpx - th, ty));
    tip.style.left = tx + 'px'; tip.style.top = ty + 'px'; tip.style.visibility = '';
    // yoʻnaltiruvchi chiziq: nuqtadan tooltip chetiga (tirsakli)
    let d;
    if(mode==='V'){ const ax = (tx + tw/2)/k, above = ty + th <= py, ay = (above ? ty + th : ty)/k; d = `M${ox} ${oy}L${ax} ${ay}`; }
    else { const rightSide = tx >= px; const ax = (rightSide ? tx : tx + tw)/k, ay = (ty + th/2)/k; const mx = rightSide ? ax - 10 : ax + 10; d = `M${ox} ${oy}L${mx} ${ay}L${ax} ${ay}`; }
    lead.setAttribute('d', d);
    dot.setAttribute('cx', ox); dot.setAttribute('cy', oy); ring.setAttribute('cx', ox); ring.setAttribute('cy', oy);
    gM.classList.remove('on'); void gM.getBoundingClientRect(); gM.classList.add('on');
  };
  const hide = ()=>{ if(active){ active.classList.remove('is-hover'); active = null; } tip.classList.remove('on'); gM.classList.remove('on'); };
  gR.addEventListener('pointerover', e=>{ const p = e.target.closest('.uzm-region'); if(p) show(p); });
  gR.addEventListener('pointerleave', hide);
  gR.addEventListener('focusin', e=>{ const p = e.target.closest('.uzm-region'); if(p) show(p); });
  gR.addEventListener('focusout', e=>{ if(!gR.contains(e.relatedTarget)) hide(); });
  gR.addEventListener('click', e=>{ const p = e.target.closest('.uzm-region'); if(p) show(p); });   // sensorli ekran
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') hide(); });
  window.addEventListener('resize', ()=>{ if(active) show(active); });
}

function buildTable(tbl){
  const D = UZMAP.data || compute(); if(!D || !tbl) return;
  const M = window.UZ_MAP;
  const cats = CATS.filter(c=>M.regions.some(r=>D.by[r.id][c.k]>0));   // boʻsh ustunlar koʻrsatilmaydi
  const cell = v => v>0 ? NUM(v) : '';
  const head = `<thead><tr><th>${TR('Hudud')}</th><th>${TR('Jami')}</th>${cats.map(c=>`<th>${TR(c.label)}</th>`).join('')}</tr></thead>`;
  const list = M.regions.map(r=>D.by[r.id]).sort((a,b)=>b.total-a.total);
  const body = list.map(c=>`<tr><td>${TR(c.key)}</td><td><b>${cell(c.total)}</b></td>${cats.map(k=>`<td>${cell(c[k.k])}</td>`).join('')}</tr>`).join('');
  const sum = {total:D.total}; cats.forEach(k=>sum[k.k]=list.reduce((a,c)=>a+c[k.k],0));
  const foot = `<tr class="total"><td><b>${TR('Jami')}</b></td><td><b>${cell(sum.total)}</b></td>${cats.map(k=>`<td><b>${cell(sum[k.k])}</b></td>`).join('')}</tr>`;
  tbl.innerHTML = head + '<tbody>' + body + foot + '</tbody>';
}

UZMAP.render = function(){
  const wrap = document.getElementById('uzMapWrap'); if(!wrap || !window.UZ_MAP) return;
  if(!document.getElementById('uzmCss')){ const st = document.createElement('style'); st.id='uzmCss'; st.textContent = CSS; document.head.appendChild(st); }
  if(!UZMAP.rendered || wrap.childElementCount===0){ build(wrap); buildTable(document.getElementById('uzMapTable')); UZMAP.rendered = true; }
};
UZMAP.refresh = function(){ UZMAP.rendered = false; UZMAP.render(); };
UZMAP.compute = compute; UZMAP.CATS = CATS;
window.UZMAP = UZMAP;
// til almashganda jadval va yorliqlar qayta chiziladi (tooltip har safar yangidan tuziladi)
document.addEventListener('i18n:change', ()=>{ if(UZMAP.rendered) UZMAP.refresh(); });
})();
