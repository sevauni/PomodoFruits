"use strict";


// document.querySelector(".orange-svg-img").getSVGDocument().getElementById("progress-ring__circle").setAttribute("stroke", "black");


window.addEventListener('load', function () {



  // document.querySelector(".orange-svg-img").getSVGDocument().getElementById("progress-ring__circle").setAttribute("stroke-dashoffset", "1137");

  // document.querySelector(".orange-svg-img").getSVGDocument().getElementById("progress-ring__circle").getAttribute("stroke-dasharray")

let svgImg = document.querySelector(".orange-svg-img").getSVGDocument().getElementById("progress-ring__circle");
document.querySelector(".orange-svg-img").getSVGDocument().getElementById("progress-ring__circle").setAttribute("stroke-dashoffset", `${getSvgCirclePxAmount(svgImg)}`);

document.querySelector(".orange-svg-div").addEventListener("click", test);



}); 


function test(){

console.log("Testing");


}


// function startTimer(svgElement) {
//   let id = null;
//   let pos = 0;
//   clearInterval(id);
//   id = setInterval(frame, 5);
//   function frame() {
//     if (pos == 100) {
//       clearInterval(id);
//     } else {
//       pos++; 
//       elem.style.top = pos + "px"; 
//       elem.style.left = pos + "px"; 
//     }
//   }
// }



 function setProcentConstant(svgElement){
   return Math.ceil(getSvgCirclePxAmount(svgElement) / 100);
}

function getSvgCirclePxAmount(svgElement){
  return Number(svgElement.getAttribute("stroke-dasharray").split(' ')[0]);
}
