/* ============================================================
   Semin Seo Portfolio — main.js
   ============================================================ */

/* ---------- Page Routing ---------- */
const PAGE_MAP = {
  main: 'main-page',
  p01:  'p01-page',
  p02:  'p02-page',
  p03:  'p03-page',
};

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(PAGE_MAP[id] || 'main-page');
  if (el) {
    el.classList.add('active');
    window.scrollTo(0, 0);
  }
}

/* ---------- P01: Figma Prototype Screen Switcher ---------- */
function ps(n) {
  for (let i = 0; i < 4; i++) {
    document.getElementById('ps' + i)?.classList.remove('active');
    document.getElementById('pnav-' + i)?.classList.remove('active');
  }
  document.getElementById('ps' + n)?.classList.add('active');
  document.getElementById('pnav-' + n)?.classList.add('active');
}

/* ---------- P02: Bar Chart (Sales Distribution) ---------- */
function buildBarChart() {
  const container = document.getElementById('bars02');
  if (!container) return;

  const data = [
    { w:'W1',  v:4,  normal:true  },
    { w:'W2',  v:6,  normal:true  },
    { w:'W3',  v:7,  normal:true  },
    { w:'W4',  v:5,  normal:true  },
    { w:'W5',  v:5,  normal:true  },
    { w:'W6',  v:6,  normal:true  },
    { w:'W7',  v:4,  normal:true  },
    { w:'W8',  v:5,  normal:true  },
    { w:'W9',  v:3,  normal:true  },
    { w:'W10', v:18, normal:false },
    { w:'W11', v:22, normal:false },
    { w:'W12', v:19, normal:false },
  ];

  const MAX = 22;
  data.forEach(d => {
    let pct = Math.round(d.v / MAX * 100);
    if (!d.normal) {
      pct = Math.min(pct + 20, 100); // anomaly 바 높이 20% 추가 강조
    }
    const wrap = document.createElement('div');
    wrap.className = 'bar-wrap';
    wrap.innerHTML = `
      <div class="bar-val" style="color:${d.normal ? '#888' : '#E24B4A'};font-weight:${d.normal ? '400' : '500'}">${d.v}%</div>
      <div class="bar" style="height:${pct}%;background:${d.normal ? '#C0DD97' : '#E24B4A'};min-height:4px;"></div>
      <div class="bar-label">${d.w}</div>
    `;
    container.appendChild(wrap);
  });
}

/* ---------- Photo Grid Card Flip ---------- */
function initPhotoGrid() {
  const cells = document.querySelectorAll('.photo-cell');
  const grid  = document.querySelector('.hero-photo-grid');
  if (!grid || !cells.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      cells.forEach((cell, i) => {
        setTimeout(() => cell.classList.add('flipped'), i * 180);
      });
      observer.disconnect();
    });
  }, { threshold: 0.25 });

  observer.observe(grid);

  // Click → popup fact
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const fact = cell.dataset.fact;
      const label = cell.querySelector('.cell-front span')?.textContent || '';
      if (!fact) return;
      document.getElementById('fact-label').textContent = label;
      document.getElementById('fact-text').textContent = fact;
      document.getElementById('fact-popup').classList.add('open');
    });
  });
}

function closeFact() {
  document.getElementById('fact-popup').classList.remove('open');
}

// Close popup on backdrop click
document.addEventListener('click', e => {
  const popup = document.getElementById('fact-popup');
  if (e.target === popup) closeFact();
});

/* ---------- Print / PDF Export ---------- */
function printAll() {
  const showAll = () => {
    document.querySelectorAll('.page').forEach(p => { p.style.display = 'block'; });
    document.querySelectorAll('.scr').forEach(s => { s.style.display = 'flex'; });
    document.querySelectorAll('.fade').forEach(f => { f.style.opacity = '1'; f.style.animation = 'none'; });
  };
  const restoreAll = () => {
    document.querySelectorAll('.page').forEach(p => { p.style.display = ''; });
    document.querySelectorAll('.scr').forEach(s => { s.style.display = ''; });
    document.querySelectorAll('.fade').forEach(f => { f.style.opacity = ''; f.style.animation = ''; });
  };
  window.addEventListener('beforeprint', showAll, { once: true });
  window.addEventListener('afterprint', restoreAll, { once: true });
  window.print();
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  buildBarChart();
  initPhotoGrid();
});
