import"./modulepreload-polyfill-B5Qt9EMX.js";import{R as p,j as s,c as A}from"./client-eAXdjRVy.js";import{S as M}from"./Section-DvYo-wXl.js";import{H as T}from"./HrefLink-uO8URVho.js";import{A as U}from"./ArticleLayout-2Y8A__n8.js";import{A as D}from"./AsideCard-DKxCtZGD.js";import{h as f,i as L,j as g,k as z,l as S,m as v,a as m,b as c}from"./webgl-BxJ6eXGr.js";import"./bootstrap-fJvt4zU1.js";import"./Layout-jTMvGiVP.js";const d=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,P=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the position texture
uniform sampler2D u_particle_position_tex;

// the momentum texture
uniform sampler2D u_particle_momentum_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

const float G = 0.001;

void main() {
  // get the resolution
  ivec2 resolution = textureSize(u_particle_mass_tex, 0);

  float x_off = 1.0/float(resolution.x);
  float y_off = 1.0/float(resolution.y);

  // our current position
  vec2 pos1 = texture(u_particle_position_tex, v_texCoord).xy;

  vec2 p = texture(u_particle_momentum_tex, v_texCoord).xy;

  uint state1 = texture(u_particle_state_tex, v_texCoord).x;
  if(state1 == 0u) {
    for(int y = 0; y < resolution.y; y++) {
      for(int x = 0; x < resolution.x; x++) {
        vec2 loc = vec2(float(x)*x_off, float(y)*y_off);
        uint state2 = texture(u_particle_state_tex, loc).x;
        if(state2 == 0u) {
          float m2 = texture(u_particle_mass_tex, loc).x;
          vec2 pos2 = texture(u_particle_position_tex, loc).xy;
          vec2 r_vec = pos2-pos1;
          float r_mag = length(r_vec);
          vec2 r_hat = r_vec/r_mag;
          vec2 accel = G*m2*r_hat/(r_mag*r_mag);
          if(!isnan(accel.x) && !isnan(accel.y)) {
            p += accel;
          }
        }
      }
    }
  }

  // apply momentum
  value = vec4(p, 0, 0);
}
`,I=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the position texture
uniform sampler2D u_particle_position_tex;

// the momentum texture
uniform sampler2D u_particle_momentum_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  uint state = texture(u_particle_state_tex, v_texCoord).x;
  float mass = texture(u_particle_mass_tex, v_texCoord).x;
  vec2 position = texture(u_particle_position_tex, v_texCoord).xy;
  vec2 momentum = texture(u_particle_momentum_tex, v_texCoord).xy;

  // change position only if live
  if(state == 0u) {
    position = position + momentum/mass;
  }

  value = vec4(position , 0, 1);
}
`,X=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  float mass = texture(u_particle_mass_tex, v_texCoord).x;
  value = vec4(mass, 0, 0, 1);
}
`,w=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the state texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the position texture
uniform sampler2D u_particle_position_tex;

// the momentum texture
uniform sampler2D u_particle_momentum_tex;


// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out uvec4 value;

const vec2 upperCorner = vec2(0, 0);
const vec2 lowerCorner = vec2(512, 512);

void main() {
  uint state = texture(u_particle_state_tex, v_texCoord).x;
  vec2 position = texture(u_particle_position_tex, v_texCoord).xy;
  if(position == clamp(position, upperCorner, lowerCorner)) {
    value = uvec4(state, 0, 0, 1);
  } else {
    value = uvec4(1, 0, 0, 1);
  }
}
`;class C extends p.Component{constructor(o){super(o),this.particle_tex_xsize=2,this.particle_tex_ysize=2,this.particle_canvas=p.createRef(),this.render_canvas=p.createRef(),this.range=p.createRef(),this.scalarSelect=p.createRef(),this.velocitySelect=p.createRef(),this.particleStateTextures=[],this.particleStateFramebuffers=[],this.particleMassTextures=[],this.particleMassFramebuffers=[],this.particlePositionTextures=[],this.particlePositionFramebuffers=[],this.particleMomentumTextures=[],this.particleMomentumFramebuffers=[],this.particleStateIndex=0,this.particleMassIndex=0,this.particlePositionIndex=0,this.particleMomentumIndex=0,this.needsReset=!0,this.mousePos=null,this.state_data=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.mass_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.position_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.momentum_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.needsReset){const i=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let r=0;r<i.length;r++)i[r]=0;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),f(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,i);const t=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let r=0;r<t.length;r++)t[r]=Math.random()*50;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),L(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,t);const e=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let r=0;r<this.particle_tex_ysize;r++)for(let a=0;a<this.particle_tex_xsize;a++){const n=r*this.particle_tex_xsize+a;e[n*2+0]=a*20+32,e[n*2+1]=r*20+32}this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),g(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,e);const l=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let r=0;r<this.particle_tex_ysize;r++)for(let a=0;a<this.particle_tex_xsize;a++){const n=r*this.particle_tex_xsize+a;l[n*2+0]=(Math.random()-.5)*0,l[n*2+1]=(Math.random()-.5)*0}this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]),g(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,l),this.needsReset=!1}for(let i=0;i<this.range.current.valueAsNumber;i++){{this.gl.useProgram(this.prog_handle_state),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);const t=this.particleStateTextures[this.particleStateIndex],e=this.particleStateFramebuffers[(this.particleStateIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleStateIndex=(this.particleStateIndex+1)%2}{this.gl.useProgram(this.prog_handle_mass),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]);const t=this.particleMassTextures[this.particleMassIndex],e=this.particleMassFramebuffers[(this.particleMassIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMassIndex=(this.particleMassIndex+1)%2}{this.gl.useProgram(this.prog_apply_gravity),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]);const t=this.particleMomentumTextures[this.particleMomentumIndex],e=this.particleMomentumFramebuffers[(this.particleMomentumIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMomentumIndex=(this.particleMomentumIndex+1)%2}{this.gl.useProgram(this.prog_move_particle),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);const t=this.particlePositionTextures[this.particlePositionIndex],e=this.particlePositionFramebuffers[(this.particlePositionIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionIndex=(this.particlePositionIndex+1)%2}}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleStateFramebuffers[this.particleStateIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA_INTEGER,this.gl.UNSIGNED_INT,this.state_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMassFramebuffers[this.particleMassIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.mass_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionFramebuffers[this.particlePositionIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.position_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMomentumFramebuffers[this.particleMomentumIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.momentum_data),this.draw(this.state_data,this.mass_data,this.position_data,this.momentum_data)},this.editData=null,this.handleMouseDown=i=>{const t=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:t,previous:t};for(let e=0;e<this.position_data.length/4;e++)if(this.state_data[e*4]==0){const l=this.calcRadius(this.mass_data[e*4]);if(Math.hypot(t.x-this.position_data[e*4+0],t.y-this.position_data[e*4+1])<l){this.editData={id:e,dragging:t},this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),f(this.gl,e%this.particle_tex_xsize,e/this.particle_tex_xsize,1,1,Uint32Array.from([1]));break}}},this.handleMouseUp=i=>{var t;(t=this.editData)!=null&&t.dragging&&(this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),g(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),f(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Uint32Array.from([0])),this.editData.dragging=null),this.mousePos=null},this.handleMouseMove=i=>{var e;if(!this.mousePos)return;const t=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:t,previous:this.mousePos.current},(e=this.editData)!=null&&e.dragging&&(this.editData.dragging=t,this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),g(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])))},this.discardTouchEvent=i=>i.preventDefault(),this.calcRadius=i=>1.5*Math.sqrt(i)+5,this.draw=(i,t,e,l)=>{var n;const r=this.render_canvas.current,a=this.render_canvas.current.getContext("2d");a.fillStyle="#000000",a.fillRect(0,0,r.width,r.height),a.strokeStyle="#FF0000";for(let h=0;h<e.length/4;h++){let R=i[h*4],_=e[h*4+0],u=e[h*4+1],x=t[h*4],F=Math.sqrt(x);switch(a.beginPath(),a.arc(_,u,F,0,2*Math.PI),R){case 0:a.fillStyle="#FFFFFF";break;default:a.fillStyle="#FF0000";break}a.fill(),a.beginPath(),a.moveTo(_,u);let b=l[h*4+0]/x,y=l[h*4+1]/x;a.lineTo(_+b,u+y),a.stroke(),h==((n=this.editData)==null?void 0:n.id)&&(a.strokeStyle="#0000FF",a.beginPath(),a.arc(_,u,this.calcRadius(x),0,2*Math.PI),a.stroke(),a.strokeStyle="#FF0000")}}}componentDidMount(){this.gl=this.particle_canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");for(let i=0;i<2;i++){const t=z(this.gl,this.particle_tex_xsize,this.particle_tex_ysize);this.particleStateTextures.push(t);const e=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,t,0),this.particleStateFramebuffers.push(e)}for(let i=0;i<2;i++){const t=S(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize));this.particleMassTextures.push(t);const e=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,t,0),this.particleMassFramebuffers.push(e)}for(let i=0;i<2;i++){const t=v(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particlePositionTextures.push(t);const e=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,t,0),this.particlePositionFramebuffers.push(e)}for(let i=0;i<2;i++){const t=v(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particleMomentumTextures.push(t);const e=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,t,0),this.particleMomentumFramebuffers.push(e)}const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_apply_gravity=m(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,d),c(this.gl,this.gl.FRAGMENT_SHADER,P)]);const i=this.gl.getAttribLocation(this.prog_apply_gravity,"a_position"),t=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_state_tex"),e=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_mass_tex"),l=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_position_tex"),r=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_gravity),this.gl.uniform1i(t,0),this.gl.uniform1i(e,1),this.gl.uniform1i(l,2),this.gl.uniform1i(r,3)}{this.prog_move_particle=m(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,d),c(this.gl,this.gl.FRAGMENT_SHADER,I)]);const i=this.gl.getAttribLocation(this.prog_move_particle,"a_position"),t=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_state_tex"),e=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_mass_tex"),l=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_position_tex"),r=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_move_particle),this.gl.uniform1i(t,0),this.gl.uniform1i(e,1),this.gl.uniform1i(l,2),this.gl.uniform1i(r,3)}{this.prog_handle_mass=m(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,d),c(this.gl,this.gl.FRAGMENT_SHADER,X)]);const i=this.gl.getAttribLocation(this.prog_handle_mass,"a_position"),t=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_state_tex"),e=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_mass_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_mass),this.gl.uniform1i(t,0),this.gl.uniform1i(e,1)}{this.prog_handle_state=m(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,d),c(this.gl,this.gl.FRAGMENT_SHADER,w)]);const i=this.gl.getAttribLocation(this.prog_handle_state,"a_position"),t=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_state_tex"),e=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_mass_tex"),l=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_position_tex"),r=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_state),this.gl.uniform1i(t,0),this.gl.uniform1i(e,1),this.gl.uniform1i(l,2),this.gl.uniform1i(r,3)}this.render_canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchcancel",this.discardTouchEvent),this.animationLoop()}getMousePos(o,i){const t=o.getBoundingClientRect(),e=o.width/t.width,l=o.height/t.height;return{x:(i.clientX-t.left)*e,y:(i.clientY-t.top)*l}}componentWillUnmount(){this.render_canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),window.cancelAnimationFrame(this.requestID)}render(){return s.jsxs("div",{style:this.props.style,className:this.props.className,children:[s.jsx("div",{children:s.jsx("canvas",{className:"border border-dark",ref:this.particle_canvas,height:this.particle_tex_xsize,width:this.particle_tex_ysize,hidden:!0})}),s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-md-8 d-flex",children:s.jsx("canvas",{className:"border border-dark",ref:this.render_canvas,height:this.props.size,width:this.props.size})}),s.jsx("div",{className:"col-md-4",children:s.jsxs("div",{className:"border border-dark p-3 m-3",children:[s.jsx("h6",{children:"Controls"}),s.jsxs("div",{className:"form-group mb-3",children:[s.jsx("label",{className:"form-label",children:"Simulation Speed"}),s.jsx("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),s.jsxs("div",{className:"form-group mb-3",children:[s.jsx("label",{className:"form-label",children:"Scalar Field"}),s.jsxs("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[s.jsx("option",{value:32,children:"2^6: 64"}),s.jsx("option",{value:32,children:"2^6: 64"}),s.jsx("option",{value:16,children:"2^8 64"})]}),s.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})]})]})})]})]})}}const B=()=>s.jsx(U,{children:({Citation:E,CitationBank:o})=>s.jsx(s.Fragment,{children:s.jsxs(M,{name:"Spacewar",id:"spacewar",children:[s.jsx("p",{children:s.jsx(T,{href:"https://github.com/pimpale/spacewar"})}),s.jsx("p",{children:s.jsx(T,{href:"https://github.com/pimpale/GravitySimulator"})}),s.jsx(D,{title:"Canvas Setup",id:"canvas-setup-demo",children:s.jsx(C,{className:"mx-auto",style:{maxWidth:"50em"},size:512})})]})})}),j=A.createRoot(document.getElementById("root"));j.render(s.jsx(p.StrictMode,{children:s.jsx(B,{})}));
