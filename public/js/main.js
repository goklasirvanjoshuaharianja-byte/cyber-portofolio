// ---- Hero boot sequence (runs only if #bootLog exists on the page) ----
document.addEventListener('DOMContentLoaded', () => {
  const bootLog = document.getElementById('bootLog');
  if (bootLog) {
    const lines = [
      { t: '&gt; initializing profile...', ok: false },
      { t: '&gt; loading modules [html] [css] [js]...', ok: false },
      { t: '&gt; connecting to network...', ok: false },
      { t: '&gt; access granted', ok: true },
    ];
    let delay = 0;
    lines.forEach((l) => {
      const div = document.createElement('div');
      div.className = 'line' + (l.ok ? ' ok' : '');
      div.innerHTML = l.t;
      div.style.animationDelay = delay + 's';
      bootLog.appendChild(div);
      delay += 0.45;
    });
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    bootLog.appendChild(cursor);
  }

  // ---- Skill radar chart (runs only if #radarChart exists on the page) ----
  const canvas = document.getElementById('radarChart');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    // Edit these values (0 to 1) to reflect your real skill levels
    const skills = [
      { label: 'HTML/CSS', value: 0.8 },
      { label: 'JavaScript', value: 0.65 },
      { label: 'Networking', value: 0.55 },
      { label: 'Pentest Basics', value: 0.45 },
      { label: 'Node.js', value: 0.5 },
      { label: 'Linux', value: 0.6 },
    ];

    function drawRadar() {
      const w = canvas.width, h = canvas.height;
      const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 50;
      ctx.clearRect(0, 0, w, h);
      const n = skills.length;
      const angleStep = (Math.PI * 2) / n;

      ctx.strokeStyle = 'rgba(34,48,39,0.9)';
      ctx.lineWidth = 1;
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
          const a = -Math.PI / 2 + i * angleStep;
          const rr = r * (ring / 4);
          const x = cx + Math.cos(a) * rr;
          const y = cy + Math.sin(a) * rr;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.fillStyle = '#64756f';
      ctx.font = '10.5px JetBrains Mono';
      skills.forEach((s, i) => {
        const a = -Math.PI / 2 + i * angleStep;
        const x2 = cx + Math.cos(a) * r;
        const y2 = cy + Math.sin(a) * r;
        ctx.strokeStyle = 'rgba(34,48,39,0.9)';
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x2, y2); ctx.stroke();

        const lx = cx + Math.cos(a) * (r + 28);
        const ly = cy + Math.sin(a) * (r + 28);
        ctx.textAlign = Math.cos(a) > 0.3 ? 'left' : Math.cos(a) < -0.3 ? 'right' : 'center';
        ctx.fillText(s.label, lx, ly);
      });

      ctx.beginPath();
      skills.forEach((s, i) => {
        const a = -Math.PI / 2 + i * angleStep;
        const rr = r * s.value;
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(0,255,156,0.12)';
      ctx.fill();
      ctx.strokeStyle = '#00ff9c';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      skills.forEach((s, i) => {
        const a = -Math.PI / 2 + i * angleStep;
        const rr = r * s.value;
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff9c';
        ctx.fill();
      });
    }
    drawRadar();
  }
});
