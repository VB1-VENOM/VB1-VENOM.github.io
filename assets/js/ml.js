import { resizeCanvasToDisplaySize } from './main.js';

(function initMLBackground() {
  const canvas = document.getElementById('ml-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  /**
   * Simple particle-neuron network that connects near neighbors.
   */
  const nodes = [];
  const maxNodes = 120;
  const maxSpeed = 0.25;
  const connectDist = 120;

  function reset() {
    resizeCanvasToDisplaySize(canvas);
    nodes.length = 0;
    const area = canvas.width * canvas.height;
    const desired = Math.min(maxNodes, Math.max(60, Math.floor(area / 24000)));
    for (let i = 0; i < desired; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() * 2 - 1) * maxSpeed,
        vy: (Math.random() * 2 - 1) * maxSpeed,
      });
    }
  }

  function update(dt) {
    for (const n of nodes) {
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(125,211,252,0.9)';
    ctx.strokeStyle = 'rgba(125,211,252,0.25)';

    // connections
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < connectDist) {
          const alpha = 1 - d / connectDist;
          ctx.globalAlpha = alpha * 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    // nodes
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let last = performance.now();
  function loop(now) {
    const dt = Math.min(32, now - last);
    last = now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  reset();
  requestAnimationFrame(loop);

  document.addEventListener('canvas-resize', () => {
    reset();
  });
})();


