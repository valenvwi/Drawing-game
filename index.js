const paintcanvas1 = document.getElementById("canvas1");
const paintcanvas2 = document.getElementById("canvas2");
const allCanvas = document.querySelectorAll("canvas");

const original = document.getElementById("original");
const colorful = document.getElementById("colorful");

const context1 = paintcanvas1.getContext("2d");
const context2 = paintcanvas2.getContext("2d");
const modifybrush = document.getElementById("modifybrush")

const showTopicElement = document.getElementById("showTopic");
const changeTopicElement = document.getElementById("changeTopic");
let bgcolor = document.getElementById("bgcolor");
let textWidth = document.getElementById("textWidth");
let textHeight = document.getElementById("textHeight");
let sizeInput = document.getElementById("sizeInput");

function addListener(id, event, listener) {
  document.getElementById(id).addEventListener(event, listener);
}

let color = "black";
let radius = 20;
let isPainting = false;
const topic = document.getElementById("topic");
let topics = [
  "lake",
  "venus",
  "programming",
  "raincoat",
  "ovomaltine",
  "stand-up paddle",
  "snowhite",
  "korean drama",
];

let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function setWidth(value) {
  if (isNumeric(value)) {
    paintcanvas1.width = value;
    paintcanvas2.width = value;
  }
}

function setHeight(value) {
  if (isNumeric(value)) {
    paintcanvas1.height = value;
    paintcanvas2.height = value;
  }
}

function clearCanvas() {
  context1.clearRect(0, 0, paintcanvas1.width, paintcanvas1.height);
  context2.clearRect(0, 0, paintcanvas2.width, paintcanvas2.height);
}

function paintCircle(x, y) {
  context1.beginPath();
  context1.arc(x, y, radius, 0, Math.PI * 2, true);
  context1.fillStyle = color;
  context1.fill();
}

function isNumeric(value) {
  return !isNaN(value);
}

function startPaint() {
  isPainting = true;
}

function startColorfulPaint(offsetX, offsetY) {
  isPainting = true;
  lastX = offsetX;
  lastY = offsetY;
}

function doColorfulPaint(offsetX, offsetY) {
  if (!isPainting) return;
  console.log('doColorfulPaint', offsetX, offsetY);
  context2.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  context2.beginPath();
  context2.moveTo(lastX, lastY);
  context2.lineTo(offsetX, offsetY);
  context2.stroke();
  lastX = offsetX;
  lastY = offsetY;
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (context2.lineWidth >= 80 || context2.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    context2.lineWidth++;
  } else {
    context2.lineWidth--;
  }
}

function endPaint() {
  isPainting = false;
}
function doPaint(x, y) {
  if (isPainting == true) this.drawTo = paintCircle(x, y);
}

function setColor(newColor) {
  color = newColor;
}
function resizeBrush(newSize) {
  radius = newSize;
  newSize = document.getElementById("sizeOutput").value;
}

function changeBgColor() {
  canvas1.style.backgroundColor = this.value;
  canvas2.style.backgroundColor = this.value;
}


function saveImage(canvas) {
  if (canvas.getContext && canvas.style.display == "block") {
    let backgroundColor = getComputedStyle(canvas).backgroundColor;
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    let tempContext = tempCanvas.getContext("2d");
    tempContext.fillStyle = backgroundColor;
    tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempContext.drawImage(canvas, 0, 0);
    let image = tempCanvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream");
    image = image.replace(
      "image/octet-stream",
      "image/octet-stream;charset=utf-8"
    );
    var link = document.createElement("a");
    link.download = "mydrawing.jpg";
    link.href = image;
    link.click();
  }
}

function showTopic() {
  topic.innerHTML = "Topic: fried rice";
  showTopicElement.style.display = "none";
  changeTopicElement.style.display = "inline-block";
}

function changeTopic() {
  const currenttopic = topic.innerHTML;
  const randomIndex = Math.floor(Math.random() * topics.length);
  if (currenttopic != `Topic: ${topics[randomIndex]}`) {
    topic.innerHTML = `Topic: ${topics[randomIndex]}`;
  } else {
    changeTopic();
  }
}

function showCanvas2() {
  canvas1.style.display = "none";
  colorful.style.display = "none";
  canvas2.style.display = "block";
  original.style.display = "inline-block";
  modifybrush.style.display = "none";
}

function showCanvas1() {
  canvas1.style.display = "block";
  original.style.display = "none";
  canvas2.style.display = "none";
  colorful.style.display = "inline-block";
  modifybrush.style.display = "block";
}

showTopicElement.addEventListener("click", showTopic);
changeTopicElement.addEventListener("click", changeTopic);
textWidth.addEventListener("change", (e) => setWidth(e.target.value));
textHeight.addEventListener("change", (e) => setHeight(e.target.value));

addListener('bgColor',"change", changeBgColor);
addListener('color',"change", (e) => setColor(e.target.value));
addListener('sizeInput',"change", (e) => resizeBrush(e.target.value));

addListener('canvas1',"mousedown", (e) => startPaint());
addListener('canvas1',"mousemove", (e) => doPaint(e.offsetX, e.offsetY));
addListener('canvas1',"mouseup", endPaint);


addListener('canvas2',"mousedown", (e)=>  startColorfulPaint(e.offsetX, e.offsetY));
addListener('canvas2',"mousemove", (e) => doColorfulPaint(e.offsetX, e.offsetY));
addListener('canvas2',"mouseup", endPaint);

addListener('clear', 'click', clearCanvas);
addListener('original', 'click', showCanvas1);
addListener('colorful', 'click', showCanvas2);

save.addEventListener("click", ()=> {
    if (canvas1.getContext && canvas1.style.display == "block") {
      saveImage(canvas1);
    } else if (canvas2.getContext && canvas2.style.display == "block") {
      saveImage(canvas2);
    }
  });
