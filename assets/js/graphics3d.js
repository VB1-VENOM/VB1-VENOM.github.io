// Lightweight 3D-ish background using canvas (to avoid external deps)
// Simulates rotating wireframe cube with subtle parallax
import { resizeCanvasToDisplaySize } from './main.js';

(function initGraphics3DBackground() {
  const canvas = document.getElementById('graphics3d-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const cube = [
    { x: -1, y: -1, z: -1 },
    { x: 1, y: -1, z: -1 },
    { x: 1, y: 1, z: -1 },
    { x: -1, y: 1, z: -1 },
    { x: -1, y: -1, z: 1 },
    { x: 1, y: -1, z: 1 },
    { x: 1, y: 1, z: 1 },
    { x: -1, y: 1, z: 1 }
  ];
  const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ];

  let rotX = 0.6;
  let rotY = 0.8;
  let rotZ = 0.2;
  let mouseX = 0.5;
  let mouseY = 0.5;

  function project(v) {
    // rotate
    const cx = Math.cos(rotX), sx = Math.sin(rotX);
    const cy = Math.cos(rotY), sy = Math.sin(rotY);
    const cz = Math.cos(rotZ), sz = Math.sin(rotZ);
    let x = v.x, y = v.y, z = v.z;
    // X
    let y1 = y * cx - z * sx;
    let z1 = y * sx + z * cx;
    y = y1; z = z1;
    // Y
    let x2 = x * cy + z * sy;
    let z2 = -x * sy + z * cy;
    x = x2; z = z2;
    // Z
    let x3 = x * cz - y * sz;
    let y3 = x * sz + y * cz;
    x = x3; y = y3;
    // perspective
    const distance = 3.5;
    const f = 1 / (distance - z);
    const scale = Math.min(canvas.width, canvas.height) * 0.2;
    return {
      x: canvas.width * 0.5 + x * f * scale,
      y: canvas.height * 0.5 + y * f * scale,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // background gradient glow
    const grad = ctx.createRadialGradient(
      canvas.width * (0.3 + 0.2 * (mouseX - 0.5)),
      canvas.height * (0.3 + 0.2 * (mouseY - 0.5)),
      10,
      canvas.width * 0.5,
      canvas.height * 0.5,
      Math.max(canvas.width, canvas.height) * 0.8
    );
    grad.addColorStop(0, 'rgba(167,139,250,0.18)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const pts = cube.map(project);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 2;
    for (const [a,b] of edges) {
      ctx.beginPath();
      ctx.moveTo(pts[a].x, pts[a].y);
      ctx.lineTo(pts[b].x, pts[b].y);
      ctx.stroke();
    }
  }

  function tick(now) {
    rotX += 0.0015 + (mouseY - 0.5) * 0.002;
    rotY += 0.0020 + (mouseX - 0.5) * 0.002;
    rotZ += 0.0010;
    draw();
    requestAnimationFrame(tick);
  }

  function reset() {
    resizeCanvasToDisplaySize(canvas);
    draw();
  }

  reset();
  requestAnimationFrame(tick);
  document.addEventListener('canvas-resize', reset);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width;
    mouseY = (e.clientY - rect.top) / rect.height;
  });
})();


