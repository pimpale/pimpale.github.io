class h{constructor(s){this.mousePos=null,this.handleMouseDown=e=>{const t=this.getMousePos(this.canvas,e);this.mousePos={current:t,previous:t}},this.handleMouseUp=e=>{this.mousePos=null},this.handleMouseMove=e=>{!this.mousePos||(this.mousePos={current:this.getMousePos(this.canvas,e),previous:this.mousePos.current})},this.discardTouchEvent=e=>e.preventDefault(),this.cleanup=()=>{this.canvas.removeEventListener("pointerdown",this.handleMouseDown),this.canvas.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.canvas.removeEventListener("touchstart",this.discardTouchEvent),this.canvas.removeEventListener("touchmove",this.discardTouchEvent),this.canvas.removeEventListener("touchend",this.discardTouchEvent),this.canvas.removeEventListener("touchcancel",this.discardTouchEvent)},this.canvas=s,this.canvas.addEventListener("pointerdown",this.handleMouseDown),this.canvas.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.canvas.addEventListener("touchstart",this.discardTouchEvent),this.canvas.addEventListener("touchmove",this.discardTouchEvent),this.canvas.addEventListener("touchend",this.discardTouchEvent),this.canvas.addEventListener("touchcancel",this.discardTouchEvent)}getMousePos(s,e){const t=s.getBoundingClientRect(),n=s.width/t.width,i=s.height/t.height;return{x:(e.clientX-t.left)*n,y:(e.clientY-t.top)*i}}}export{h as C};