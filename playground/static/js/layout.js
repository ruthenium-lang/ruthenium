const divider = document.querySelector('#divider');
const leftPanel = document.querySelector('.left.panel');
let isResizing = false;

divider.addEventListener('mousedown', (e) => {
  isResizing = true;
  document.body.style.cursor = 'col-resize';
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;

  const newWidth = e.clientX - 20;
  leftPanel.style.width = `${newWidth}px`;
});

document.addEventListener('mouseup', () => {
  isResizing = false;
  document.body.style.cursor = 'default';
});
