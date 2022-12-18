"use strict";

//Set consts:
let svgImg = null;
let timerTargetTimeMinutes = 1;
let frameId = null;
const workTime = 1;    //Working time duration
const relaxTime = 1;   //Relax time duration
const speedCorrectionSync = 57000;


const startSound = new Audio('./audio/tick.ogg');
const readySound = new Audio('./audio/ready.ogg');

const timerStatus = {   
  pause: false,   //globally set pause timer stops
  mode: "start"   //4 modes: start,work,relax,pause
};
window.addEventListener('load', function () {
  document.querySelector(".flex-container").style.opacity = "100";
  svgImg = document.querySelector(".orange-svg-img").getSVGDocument().getElementById("progress-ring__circle");
  setProcentage(svgImg, 100);
  document.querySelector(".orange-svg-div").addEventListener('click', startTimers, { once: true });
  setStartMode();
});
function startTimers() {
  switch (timerStatus.mode) {
    case "start":
      document.querySelector(".orange-svg-div").addEventListener('click', pauseTimer);
      timerStatus.mode = "work";
      startTimers();
      break;
    case "work":
      startTimerWork();
      break;
    case "relax":
      startTimerRelax();
      break;
    default:
      console.error("Wrong mode slelector");
  }
}
function startTimerWork() {
  timerTargetTimeMinutes = workTime;
  let speed = Math.ceil(timerTargetTimeMinutes * speedCorrectionSync / getSvgCirclePxAmount(svgImg));
  startCircle(speed);
  startCountDownTimer();
  timerStatus.mode = "work";
  setImgMode();
  startSound.play();
}
function startTimerRelax() {
  timerTargetTimeMinutes = relaxTime;
  let speed = Math.ceil(timerTargetTimeMinutes * speedCorrectionSync / getSvgCirclePxAmount(svgImg));
  startCircle(speed);
  startCountDownTimer(speed);
  timerStatus.mode = "relax";
  setImgMode();
}
function pauseTimer() {
  timerStatus.pause = !timerStatus.pause;

  if (!timerStatus.pause) {
    setImgMode();
    startSound.play();
  } else {
    setPauseMode();
    startSound.pause();
    startSound.currentTime = 0;
  }
}
function setImgMode() {
  switch (timerStatus.mode) {
    case "start":
      setStartMode();
      break;
    case "pause":
      setPauseMode();
      break;
    case "relax":
      setRelaxMode();
      break;
    case "work":
      setWorkMode();
      break;
    default:
      console.error("Wrong mode");
  }
}
function startCircle(speedPx) {

  let maxPx = getSvgCirclePxAmount(svgImg);
  let pos = 0;
  clearInterval(frameId);
  setProcentage(svgImg, 0);
  frameId = setInterval(frame, speedPx);
  function frame() {
    if (timerStatus.pause) {
      return;
    }
    if (pos !== maxPx) {
      pos++;
      setPixels(svgImg, pos);
    }
  }
}
function startCountDownTimer() {
  let id = null;
  let countSetTime = addMinutes(new Date(), timerTargetTimeMinutes).getTime();
  clearInterval(id);
  id = setInterval(tick, 10);
  tick();
  function tick() {
    if (timerStatus.pause) {
      return;
    }
    let countDownDateNow = new Date().getTime();
    if (countDownDateNow >= countSetTime) {
      clearInterval(id);
      clearInterval(frameId);
      readySound.play();
      timerStatus.mode = timerStatus.mode === "work" ? "relax" : "work";
      startTimers();
    } else {
      drawDate(countSetTime - countDownDateNow);
    }
  }
}
function drawDate(milliseconds) {
  let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString();
  let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000).toString();

  if (seconds.length < 2) {
    seconds = `0` + seconds;
  }
  if (minutes.length < 2) {
    minutes = `0` + minutes;
  }
  document.querySelector(".timer-container").innerHTML = `${minutes}:${seconds}`;
  return;
}
function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}
function getSvgCirclePxAmount(svgElement) {
  let result = Number(svgElement.getAttribute("stroke-dasharray").split(',')[0]);
  return result;
}
function setProcentage(svgElement, percents = 100) {
  let result = scale(percents, 0, 100, getSvgCirclePxAmount(svgElement), 0);
  svgElement.setAttribute("stroke-dashoffset", `${result}`);
}
function setPixels(svgElement, pixels) {
  let result = getSvgCirclePxAmount(svgElement) - pixels;
  svgElement.setAttribute("stroke-dashoffset", `${result}`);
}
function scale(number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

//SVG image related selectors

function setStartMode() {
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g2651").setAttribute("style", "display:none"); //chillbubble
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer4").setAttribute("style", "display:none"); //work setup
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer5").setAttribute("style", "display:none"); //chill
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g1025").setAttribute("style", "display:none"); //hand
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1696").setAttribute("style", "display:none"); //sad mouth
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1021").setAttribute("style", "display:none"); //sad eyes
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g5644").setAttribute("style", "display:none"); //pause
  document.querySelector(".header-container-under").innerHTML = "Ready!";
  document.querySelector(".header-container-under").style.color = "white";
}
function setWorkMode() {
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g2651").setAttribute("style", "display:none"); //chillbubble
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer2").setAttribute("style", "display:none"); //bubble
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer4").setAttribute("style", "display:inline"); //work setup
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer5").setAttribute("style", "display:none"); //chill
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer3").setAttribute("style", "display:none"); //normal face
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g1025").setAttribute("style", "display:inline"); //hand
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1696").setAttribute("style", "display:inline"); //sad mouth
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1021").setAttribute("style", "display:inline"); //sad eyes
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path2816").setAttribute("style", "display:none"); //bubble img
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g5644").setAttribute("style", "display:none"); //pause
  document.querySelector(".header-container-under").innerHTML = "Working...";
  document.querySelector(".header-container-under").style.color = "#ed8f20ff";
}
function setRelaxMode() {
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g2651").setAttribute("style", "display:inline"); //chillbubble
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer2").setAttribute("style", "display:none"); //bubble
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer4").setAttribute("style", "display:none"); //work setup
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer5").setAttribute("style", "display:inline"); //chill
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer3").setAttribute("style", "display:none"); //normal face
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1704").setAttribute("style", "display:none"); //hand
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1696").setAttribute("style", "display:none"); //sad mouth
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1021").setAttribute("style", "display:none"); //sad eyes
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path2816").setAttribute("style", "display:inline;fill:#ffffff;stroke:#000000;stroke-width:0.963187"); //bubble img
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g5644").setAttribute("style", "display:none"); //pause
  document.querySelector(".header-container-under").innerHTML = "Break";
  document.querySelector(".header-container-under").style.color = "white";

}
function setPauseMode() {
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g2651").setAttribute("style", "display:none"); //chillbubble
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer2").setAttribute("style", "display:none"); //bubble
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer5").setAttribute("style", "display:none"); //chill
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1696").setAttribute("style", "display:none"); //sad mouth
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1021").setAttribute("style", "display:none"); //sad eyes
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g5644").setAttribute("style", "display:inline"); //pause
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path2816").setAttribute("style", "display:none"); //bubble img
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer3").setAttribute("style", "display:none"); //normal face
  document.querySelector(".header-container-under").innerHTML = "Pause";
  document.querySelector(".header-container-under").style.color = "#ed8f20ff";
}