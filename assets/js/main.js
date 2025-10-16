// Update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Resize helpers for canvases
function resizeCanvasToDisplaySize(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { clientWidth, clientHeight } = canvas;
  const width = Math.floor(clientWidth * dpr);
  const height = Math.floor(clientHeight * dpr);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

window.addEventListener('resize', () => {
  document.dispatchEvent(new Event('canvas-resize'));
});

export { resizeCanvasToDisplaySize };


