const body = document.querySelector('body');
body.onresize = sizeCanvas;

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
sizeCanvas();

let drawing = false;
let lastX = 0;
let lastY = 0;
let lastMoveTime = new Date();
let hue = 0;
const minWidth = 5;
const maxWidth = 50;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', (e) => {
  [lastX, lastY] = [e.offsetX, e.offsetY];
  drawing = true
});
document.addEventListener('mouseup', () => drawing = false);
document.addEventListener('mouseout', () => drawing = false);

document.addEventListener('touchmove', drawTouch);
document.addEventListener('touchstart', (e) => {
  [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
  drawing = true;
});
document.addEventListener('touchend', () => drawing = false);

function draw(e) {
  if (!drawing) return;
  const distance = getDistance(lastX, lastY, e.offsetX, e.offsetY);
  const moveTime = new Date();
  const time = moveTime - lastMoveTime;
  lastMoveTime = moveTime;
  const speed = distance / (time);
  const width = (maxWidth - (speed * 3));
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineWidth = width < minWidth ? minWidth : (width > maxWidth ? maxWidth : width);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue += 180 + 1;
}

function drawTouch(e) {
  if (!drawing) return;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const distance = getDistance(lastX, lastY, e.touches[0].clientX, e.touches[0].clientY);
  const moveTime = new Date();
  const time = moveTime - lastMoveTime;
  lastMoveTime = moveTime;
  const speed = distance / (time);
  const width = (maxWidth - (speed * 3));
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineWidth = width < minWidth ? minWidth : (width > maxWidth ? maxWidth : width);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
  ctx.stroke();
  [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
  hue += 180 + 1;
}

function sizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function getDistance(x0, y0, x1, y1) {
  const xDist = Math.abs(x1 - x0);
  const yDist = Math.abs(y1 - y0)
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}