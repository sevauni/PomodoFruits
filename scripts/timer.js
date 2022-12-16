"use strict";
let svgImg = null;
let lastCall = 0;
let timesUp = false;

window.addEventListener('load', function () {
  document.querySelector(".flex-container").style.opacity = "100";
  svgImg = document.querySelector(".orange-svg-img").getSVGDocument().getElementById("progress-ring__circle");
  setProcentage(svgImg, 100);
  document.querySelector(".orange-svg-div").addEventListener('click', startTimer, { once: true });
  setStartMode();

  //setPauseMode();

});











function startTimer(svgElement = svgImg) {

  let maxPx = getSvgCirclePxAmount(svgImg);
  let id = null;
  let pos = 0;
  setWorkMode();
  clearInterval(id);

  let countDownDate = new Date();
  let show = addMinutes(countDownDate, 1).getTime();

  id = setInterval(frame, 10);
  function frame() {
    if (pos === maxPx && timesUp) {
      clearInterval(id);
      document.querySelector(".orange-svg-div").addEventListener('click', startTimer, { once: true });
      setRelaxMode();
    } else {
      timerTick(show);
      if (timesUp) {
        pos++;
        setPixels(svgImg, pos);
      }

    }
  }
}




function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

//var countDownDate = new Date().getTime();


















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
  document.querySelector(".header-container-under").style.color = "#659c35ff";

}


function setPauseMode() {
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g2651").setAttribute("style", "display:none"); //chillbubble
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer2").setAttribute("style", "display:none"); //bubble
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer4").setAttribute("style", "display:none"); //work setup
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer5").setAttribute("style", "display:none"); //chill
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g1025").setAttribute("style", "display:none"); //hand
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1696").setAttribute("style", "display:none"); //sad mouth
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path1021").setAttribute("style", "display:none"); //sad eyes
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("g5644").setAttribute("style", "display:inline"); //pause
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("path2816").setAttribute("style", "display:none"); //bubble img
  document.querySelector(".orange-svg-img").getSVGDocument().getElementById("layer3").setAttribute("style", "display:none"); //normal face
  document.querySelector(".header-container-under").innerHTML = "Pause";
  document.querySelector(".header-container-under").style.color = "#ed8f20ff";

}




function timerTick(setMillis) {
  let now = new Date().getTime();
  let timeLeft = setMillis - now;
  if (now - lastCall > 1000) {
    lastCall = now;
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    console.log(minutes, seconds);
    document.querySelector(".timer-container").innerHTML = `${minutes}:${seconds}`;
    if (setMillis === now) {
      timesUp = true;
    }
  }
}
