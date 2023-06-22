const paintcanvas = document.getElementById("canvas");
const context = paintcanvas.getContext("2d");
var color = 'black';
var radius = 20;
var isPainting = false;
const topic = document.getElementById("topic");
let topics = ["lake", "venus", "programming", "raincoat", "ovomaltine", "stand-up paddle", "snowhite", "korean drama"]

function setWidth (value) {
  if (isNumeric(value)) paintcanvas.width = value;
}

function setHeight (value) {
  if (isNumeric(value) )  paintcanvas.height = value;
}

function clearCanvas () {
  context.clearRect(0, 0, paintcanvas.width, paintcanvas.height);
}

function paintCircle (x, y) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fillStyle = color;
    context.fill();
}

function isNumeric (value) {
  return !isNaN(value);
}

function startPaint(){
  isPainting = true;
}
function endPaint(){
  isPainting = false;
}
function doPaint(x,y){
  if (isPainting==true) paintcanvas.drawTo=paintCircle(x,y);
}

function setColor(newColor){
  color=newColor;
}
function resizeBrush(newSize){
  radius=newSize;
  newSize=document.getElementById("sizeOutput").value;
}

function changeBgColor(){
  var color=document.getElementById("bgcolor");
  canvas.style.backgroundColor = color.value;
}

function saveImage(){
  if (canvas.getContext) {
    var backgroundColor = getComputedStyle(canvas).backgroundColor;
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    var tempContext = tempCanvas.getContext('2d');
    tempContext.fillStyle = backgroundColor;
    tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempContext.drawImage(canvas, 0, 0);
    var image = tempCanvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    image = image.replace("image/octet-stream", "image/octet-stream;charset=utf-8");
    var link = document.createElement('a');
    link.download = 'mydrawing.jpg';
    link.href = image;
    link.click();
  }
}

function showTopic() {
  topic.innerHTML = "Topic: fried rice";
  showTopicElement = document.getElementById("showTopic");
  changeTopicElement = document.getElementById("changeTopic");
  showTopicElement.style.display = "none";
  changeTopicElement.style.display = "inline-block";
}

function changeTopic() {
  const currenttopic = topic.innerHTML;
  const randomIndex = Math.floor(Math.random() * topics.length);
  if (currenttopic != `Topic: ${topics[randomIndex]}`) {
    topic.innerHTML = `Topic: ${topics[randomIndex]}`;
  } else {
    changeTopic()
  };
}
