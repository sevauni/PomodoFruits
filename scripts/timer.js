"use strict";
let svgImg = null;

window.addEventListener('load', function () {




  svgImg = document.querySelector(".orange-svg-img").getSVGDocument().getElementById("progress-ring__circle");
  
  setProcentage(svgImg, 100);
  
  document.querySelector(".orange-svg-div").addEventListener('click', startTimer,{once: true });
  //svgImg.setAttribute("stroke-dashoffset", "500");


});

function startTimer(svgElement = svgImg) {
  let maxPx = getSvgCirclePxAmount(svgImg);
  let id = null;
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos === maxPx ) {
      clearInterval(id);
      document.querySelector(".orange-svg-div").addEventListener('click', startTimer,{once: true });
    } else {
      pos++;
     setPixels(svgImg, pos);
    }
  }
}

function getSvgCirclePxAmount(svgElement) {
  let result = Number(svgElement.getAttribute("stroke-dasharray").split(' ')[0]);
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