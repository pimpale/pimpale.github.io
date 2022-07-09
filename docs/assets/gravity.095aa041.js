import"./modulepreload-polyfill.b7f2da20.js";import{a as n,b as c,j as a,F as z}from"./bootstrap.eb315efa.js";import{S as w}from"./Section.9b064dd5.js";import{H as F}from"./HrefLink.b7871089.js";import{A as P}from"./ArticleLayout.080cae09.js";import{A}from"./AsideCard.20112497.js";import{g as T,o as I,a as f,h as C,c as N,b as D,d as g,e as p,i as y,j as E,k as X,l as B}from"./webgl.a929ddf3.js";import{c as U}from"./math.e4175633.js";import{C as V}from"./canvas.b4c9bbaa.js";import{c as G}from"./client.08e50d60.js";const v=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,k=`#version 300 es
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
`,O=`#version 300 es
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
`,H=`#version 300 es
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
`,Y=`#version 300 es
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
`;class q extends n.Component{constructor(h){super(h),this.particle_tex_xsize=2,this.particle_tex_ysize=2,this.particle_canvas=n.createRef(),this.render_canvas=n.createRef(),this.range=n.createRef(),this.scalarSelect=n.createRef(),this.velocitySelect=n.createRef(),this.particleStateTextures=[],this.particleStateFramebuffers=[],this.particleMassTextures=[],this.particleMassFramebuffers=[],this.particlePositionTextures=[],this.particlePositionFramebuffers=[],this.particleMomentumTextures=[],this.particleMomentumFramebuffers=[],this.particleStateIndex=0,this.particleMassIndex=0,this.particlePositionIndex=0,this.particleMomentumIndex=0,this.needsReset=!0,this.mousePos=null,this.state_data=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.mass_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.position_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.momentum_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.needsReset){const i=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let l=0;l<i.length;l++)i[l]=0;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),T(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,i);const e=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let l=0;l<e.length;l++)e[l]=Math.random()*50;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),I(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,e);const t=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let l=0;l<this.particle_tex_ysize;l++)for(let s=0;s<this.particle_tex_xsize;s++){const o=l*this.particle_tex_xsize+s;t[o*2+0]=s*20+32,t[o*2+1]=l*20+32}this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),f(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,t);const r=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let l=0;l<this.particle_tex_ysize;l++)for(let s=0;s<this.particle_tex_xsize;s++){const o=l*this.particle_tex_xsize+s;r[o*2+0]=(Math.random()-.5)*0,r[o*2+1]=(Math.random()-.5)*0}this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]),f(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,r),this.needsReset=!1}for(let i=0;i<this.range.current.valueAsNumber;i++){{this.gl.useProgram(this.prog_handle_state),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);const e=this.particleStateTextures[this.particleStateIndex],t=this.particleStateFramebuffers[(this.particleStateIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleStateIndex=(this.particleStateIndex+1)%2}{this.gl.useProgram(this.prog_handle_mass),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]);const e=this.particleMassTextures[this.particleMassIndex],t=this.particleMassFramebuffers[(this.particleMassIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMassIndex=(this.particleMassIndex+1)%2}{this.gl.useProgram(this.prog_apply_gravity),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]);const e=this.particleMomentumTextures[this.particleMomentumIndex],t=this.particleMomentumFramebuffers[(this.particleMomentumIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMomentumIndex=(this.particleMomentumIndex+1)%2}{this.gl.useProgram(this.prog_move_particle),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);const e=this.particlePositionTextures[this.particlePositionIndex],t=this.particlePositionFramebuffers[(this.particlePositionIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionIndex=(this.particlePositionIndex+1)%2}}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleStateFramebuffers[this.particleStateIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA_INTEGER,this.gl.UNSIGNED_INT,this.state_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMassFramebuffers[this.particleMassIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.mass_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionFramebuffers[this.particlePositionIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.position_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMomentumFramebuffers[this.particleMomentumIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.momentum_data),this.draw(this.state_data,this.mass_data,this.position_data,this.momentum_data)},this.editData=null,this.handleMouseDown=i=>{const e=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:e,previous:e};for(let t=0;t<this.position_data.length/4;t++)if(this.state_data[t*4]==0){const r=this.calcRadius(this.mass_data[t*4]);if(Math.hypot(e.x-this.position_data[t*4+0],e.y-this.position_data[t*4+1])<r){this.editData={id:t,dragging:e},this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),T(this.gl,t%this.particle_tex_xsize,t/this.particle_tex_xsize,1,1,Uint32Array.from([1]));break}}},this.handleMouseUp=i=>{var e;(e=this.editData)!=null&&e.dragging&&(this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),f(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),T(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Uint32Array.from([0])),this.editData.dragging=null),this.mousePos=null},this.handleMouseMove=i=>{var t;if(!this.mousePos)return;const e=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:e,previous:this.mousePos.current},(t=this.editData)!=null&&t.dragging&&(this.editData.dragging=e,this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),f(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])))},this.discardTouchEvent=i=>i.preventDefault(),this.calcRadius=i=>1.5*Math.sqrt(i)+5,this.draw=(i,e,t,r)=>{var o;const l=this.render_canvas.current,s=this.render_canvas.current.getContext("2d");s.fillStyle="#000000",s.fillRect(0,0,l.width,l.height),s.strokeStyle="#FF0000";for(let _=0;_<t.length/4;_++){let m=i[_*4],u=t[_*4+0],x=t[_*4+1],d=e[_*4],L=Math.sqrt(d);switch(s.beginPath(),s.arc(u,x,L,0,2*Math.PI),m){case 0:s.fillStyle="#FFFFFF";break;default:s.fillStyle="#FF0000";break}s.fill(),s.beginPath(),s.moveTo(u,x);let S=r[_*4+0]/d,M=r[_*4+1]/d;s.lineTo(u+S,x+M),s.stroke(),_==((o=this.editData)==null?void 0:o.id)&&(s.strokeStyle="#0000FF",s.beginPath(),s.arc(u,x,this.calcRadius(d),0,2*Math.PI),s.stroke(),s.strokeStyle="#FF0000")}}}componentDidMount(){this.gl=this.particle_canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");for(let i=0;i<2;i++){const e=C(this.gl,this.particle_tex_xsize,this.particle_tex_ysize);this.particleStateTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleStateFramebuffers.push(t)}for(let i=0;i<2;i++){const e=N(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize));this.particleMassTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMassFramebuffers.push(t)}for(let i=0;i<2;i++){const e=D(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particlePositionTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particlePositionFramebuffers.push(t)}for(let i=0;i<2;i++){const e=D(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particleMomentumTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMomentumFramebuffers.push(t)}const h=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_apply_gravity=g(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,v),p(this.gl,this.gl.FRAGMENT_SHADER,k)]);const i=this.gl.getAttribLocation(this.prog_apply_gravity,"a_position"),e=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_mass_tex"),r=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_position_tex"),l=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_gravity),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(r,2),this.gl.uniform1i(l,3)}{this.prog_move_particle=g(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,v),p(this.gl,this.gl.FRAGMENT_SHADER,O)]);const i=this.gl.getAttribLocation(this.prog_move_particle,"a_position"),e=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_mass_tex"),r=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_position_tex"),l=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_move_particle),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(r,2),this.gl.uniform1i(l,3)}{this.prog_handle_mass=g(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,v),p(this.gl,this.gl.FRAGMENT_SHADER,H)]);const i=this.gl.getAttribLocation(this.prog_handle_mass,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_mass_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_mass),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1)}{this.prog_handle_state=g(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,v),p(this.gl,this.gl.FRAGMENT_SHADER,Y)]);const i=this.gl.getAttribLocation(this.prog_handle_state,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_mass_tex"),r=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_position_tex"),l=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_state),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(r,2),this.gl.uniform1i(l,3)}this.render_canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchcancel",this.discardTouchEvent),this.animationLoop()}getMousePos(h,i){const e=h.getBoundingClientRect(),t=h.width/e.width,r=h.height/e.height;return{x:(i.clientX-e.left)*t,y:(i.clientY-e.top)*r}}componentWillUnmount(){this.render_canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),window.cancelAnimationFrame(this.requestID)}render(){return c("div",{style:this.props.style,className:this.props.className,children:[a("div",{children:a("canvas",{className:"border border-dark",ref:this.particle_canvas,height:this.particle_tex_xsize,width:this.particle_tex_ysize,hidden:!0})}),c("div",{className:"row",children:[a("div",{className:"col-md-8 d-flex",children:a("canvas",{className:"border border-dark",ref:this.render_canvas,height:this.props.size,width:this.props.size})}),a("div",{className:"col-md-4",children:c("div",{className:"border border-dark p-3 m-3",children:[a("h6",{children:"Controls"}),c("div",{className:"form-group mb-3",children:[a("label",{className:"form-label",children:"Simulation Speed"}),a("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),c("div",{className:"form-group mb-3",children:[a("label",{className:"form-label",children:"Scalar Field"}),c("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[a("option",{value:32,children:"2^6: 64"}),a("option",{value:32,children:"2^6: 64"}),a("option",{value:16,children:"2^8 64"})]}),a("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})]})]})})]})]})}}const R=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,W=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp isampler2D;

// the particle texture
uniform isampler2D u_particle_state_tex;

// the position / velocity texture
uniform sampler2D u_particle_position_velocity_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

uniform float u_x_gravity;
uniform float u_y_gravity;
uniform float u_viscosity;
uniform float u_repulsion;
uniform float u_attraction;
uniform float u_wall_spring_damping;
uniform float u_wall_spring_constant;

uniform vec2 u_dimensions;

void main() {
  // get the resolution
  ivec2 resolution = textureSize(u_particle_state_tex, 0);

  // our current position and velocity
  vec2 p1 = texture(u_particle_position_velocity_tex, v_texCoord).xy;
  vec2 v1 = texture(u_particle_position_velocity_tex, v_texCoord).zw;

  // our current state and mass
  int state1 = texture(u_particle_state_tex, v_texCoord).x;
  float m1 = float(texture(u_particle_state_tex, v_texCoord).y);

  if(state1 == 0) {
    for(int y = 0; y < resolution.y; y++) {
      for(int x = 0; x < resolution.x; x++) {
        ivec2 loc2 = ivec2(x, y);
        int state2 = texelFetch(u_particle_state_tex, loc2, 0).x;
        float m2 = float(texelFetch(u_particle_state_tex, loc2, 0).y);
        if(state2 == 0) {
          vec2 p2 = texelFetch(u_particle_position_velocity_tex, loc2, 0).xy;

          vec2 r_vec = p2-p1;
          float r = length(r_vec);
          vec2 r_hat = r_vec/r;

          float force_strength = u_attraction*pow(r, -7.0) - u_repulsion*pow(r, -13.0);
          vec2 accel = r_hat*clamp(force_strength/m1, -0.1, 0.1);

          if(!isnan(accel.x) && !isnan(accel.y)) {
            v1 += accel;
          }
        }
      }
    }

    v1 *= (1.0-u_viscosity);
  
    v1.x += u_x_gravity;
    v1.y += u_y_gravity;
  
    float xl = 10.0;
    float yl = 10.0;
    float xg = u_dimensions.x - 10.0;
    float yg = u_dimensions.y - 10.0;
  
    if(p1.x < xl) {
      v1.x = u_wall_spring_damping*v1.x + u_wall_spring_constant*pow(p1.x-xl, 2.0);
    }
    if(p1.x > xg) {
      v1.x = u_wall_spring_damping*v1.x -u_wall_spring_constant*pow(p1.x-xg, 2.0);
    }
    if(p1.y < yl) {
      v1.y = u_wall_spring_damping*v1.y + u_wall_spring_constant*pow(p1.y-yl, 2.0);
    }
    if(p1.y > yg) {
      v1.y = u_wall_spring_damping*v1.y -u_wall_spring_constant*pow(p1.y-yg, 2.0);
    }
  
  
    // apply new values
    value = vec4(p1 + v1, v1);
  } else {
    // do nothing if state == 1
    value = vec4(p1, v1);
  }
}
`,j=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp isampler2D;

// the particle texture
uniform isampler2D u_particle_state_tex;

// the position / velocity texture
uniform sampler2D u_particle_position_velocity_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

// new mouse position
uniform vec2 u_mouse;

void main() {
  // our current position and velocity
  vec2 p1 = texture(u_particle_position_velocity_tex, v_texCoord).xy;
  vec2 v1 = texture(u_particle_position_velocity_tex, v_texCoord).zw;

  // our current state and mass
  int state1 = texture(u_particle_state_tex, v_texCoord).x;

  if(state1 == 0) {
      vec2 p_to_mouse = u_mouse - p1;
      float d = length(p_to_mouse);
      if(d < 50.0) {
          v1 += 0.01*(p_to_mouse/(d));
          v1 *= 0.9;
      }
  }

  // apply new values
  value = vec4(p1, v1);
}
`,$=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp isampler2D;

// the state texture
uniform isampler2D u_particle_state_tex;

// the position texture
uniform sampler2D u_particle_position_velocity_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out ivec4 value;

uniform vec2 u_dimensions;


void main() {
  vec2 upperCorner = vec2(0, 0);
  vec2 lowerCorner = u_dimensions;

  int state = texture(u_particle_state_tex, v_texCoord).x;
  int mass = texture(u_particle_state_tex, v_texCoord).y;
  vec2 position = texture(u_particle_position_velocity_tex, v_texCoord).xy;
  if(position == clamp(position, upperCorner, lowerCorner)) {
    value = ivec4(state, mass, 0, 1);
  } else {
    value = ivec4(state, mass, 0, 1);
  }
}
`;class J extends n.Component{constructor(h){super(h),this.xsize=40,this.ysize=40,this.particle_tex_xsize=40,this.particle_tex_ysize=40,this.particle_canvas=n.createRef(),this.render_canvas=n.createRef(),this.range=n.createRef(),this.gravityDefault=0,this.viscosityDefault=0,this.attractionDefault=1,this.repulsionDefault=5e3,this.wallSpringConstantDefault=.001,this.wallSpringDampingDefault=.99,this.xGravityRange=n.createRef(),this.yGravityRange=n.createRef(),this.viscosityRange=n.createRef(),this.attractionRange=n.createRef(),this.repulsionRange=n.createRef(),this.wallSpringConstantRange=n.createRef(),this.wallSpringDampingRange=n.createRef(),this.scalarSelect=n.createRef(),this.velocitySelect=n.createRef(),this.particleStateTextures=[],this.particleStateFramebuffers=[],this.particlePositionVelocityTextures=[],this.particlePositionVelocityFramebuffers=[],this.particleStateIndex=0,this.particlePositionVelocityIndex=0,this.needsReset=!0,this.state_data=new Int32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.position_velocity_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.needsReset){const t=new Int32Array(this.particle_tex_xsize*this.particle_tex_ysize*2),r=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4);for(let l=0;l<this.particle_tex_ysize;l++)for(let s=0;s<this.particle_tex_xsize;s++){const o=l*this.particle_tex_xsize+s;t[o*2]=0,s<this.particle_tex_xsize-0?(t[o*2+1]=1,r[o*4+0]=s*4+20,r[o*4+1]=l*4+20):(t[o*2+1]=-1,r[o*4+0]=s*4+200,r[o*4+1]=l*4+10)}this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),y(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,t),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),E(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,r),this.needsReset=!1}const i=this.range.current.valueAsNumber,e=i*i;for(let t=0;t<e;t++){const r=this.cmt.mousePos;r&&(this.gl.useProgram(this.prog_apply_mouse),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionVelocityFramebuffers[(this.particlePositionVelocityIndex+1)%2]),this.gl.uniform2f(this.mouseLoc,U(r.current.x,0,this.props.xsize),U(r.current.y,0,this.props.ysize)),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionVelocityIndex=(this.particlePositionVelocityIndex+1)%2);{this.gl.useProgram(this.prog_handle_state),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]);const l=this.particleStateTextures[this.particleStateIndex],s=this.particleStateFramebuffers[(this.particleStateIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,l),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,s),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleStateIndex=(this.particleStateIndex+1)%2}{this.gl.useProgram(this.prog_apply_gravity),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]);const l=this.particlePositionVelocityTextures[this.particlePositionVelocityIndex],s=this.particlePositionVelocityFramebuffers[(this.particlePositionVelocityIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,l),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,s),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionVelocityIndex=(this.particlePositionVelocityIndex+1)%2}}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleStateFramebuffers[this.particleStateIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA_INTEGER,this.gl.INT,this.state_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionVelocityFramebuffers[this.particlePositionVelocityIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.position_velocity_data),this.draw(this.state_data,this.position_velocity_data)},this.handleMouseDown=i=>{var e;if(((e=this.editData)==null?void 0:e.dragging)===void 0){for(let t=0;t<this.position_velocity_data.length/4;t++)if(this.state_data[t*4]==0){const r=this.calcRadius(this.state_data[t*4+1]);if(Math.hypot(i.x-this.position_velocity_data[t*4+0],i.y-this.position_velocity_data[t*4+1])<r){const s=this.state_data[t*4+1];this.editData={id:t,mass:s,dragging:i},this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),y(this.gl,t%this.particle_tex_xsize,t/this.particle_tex_xsize,1,1,Int32Array.from([1,s]));break}}}},this.handleMouseUp=i=>{var e;((e=this.editData)==null?void 0:e.dragging)!==void 0&&(this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),E(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y,0,0])),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),y(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Int32Array.from([0,this.editData.mass])),this.editData.dragging=void 0)},this.handleMouseMove=i=>{var e;((e=this.editData)==null?void 0:e.dragging)!==void 0&&(this.editData.dragging=i,this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),E(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y,0,0])))},this.handleChange=()=>{this.gl.useProgram(this.prog_apply_gravity);const i=this.xGravityRange.current.valueAsNumber,e=this.yGravityRange.current.valueAsNumber,t=this.viscosityRange.current.valueAsNumber,r=this.attractionRange.current.valueAsNumber,l=this.repulsionRange.current.valueAsNumber,s=this.wallSpringConstantRange.current.valueAsNumber,o=this.wallSpringDampingRange.current.valueAsNumber;this.gl.uniform1f(this.xGravityLoc,i),this.gl.uniform1f(this.yGravityLoc,e),this.gl.uniform1f(this.viscosityLoc,t),this.gl.uniform1f(this.attractionLoc,r),this.gl.uniform1f(this.repulsionLoc,l),this.gl.uniform1f(this.wallSpringConstantLoc,s),this.gl.uniform1f(this.wallSpringDampingLoc,o)},this.calcRadius=i=>1.5*Math.sqrt(Math.abs(i))+5,this.tick=0,this.draw=(i,e)=>{var l;this.tick==0?this.tick=100:this.tick--;const t=this.render_canvas.current,r=this.render_canvas.current.getContext("2d");r.fillStyle="#000000",r.fillRect(0,0,t.width,t.height),r.strokeStyle="#FF0000";for(let s=0;s<e.length/4;s++){let o=i[s*4],_=e[s*4+0],m=e[s*4+1],u=i[s*4+1],x=Math.sqrt(Math.abs(u));switch(r.beginPath(),r.arc(_,m,x,0,2*Math.PI),o){case 0:u<0?r.fillStyle="#FF00FF":r.fillStyle="#FFFFFF";break;default:r.fillStyle="#FF0000";break}r.fill(),s==((l=this.editData)==null?void 0:l.id)&&(r.strokeStyle="#0000FF",r.beginPath(),r.arc(_,m,this.calcRadius(u),0,2*Math.PI),r.stroke(),r.strokeStyle="#FF0000")}}}componentDidMount(){this.gl=this.particle_canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");for(let i=0;i<2;i++){const e=X(this.gl,this.particle_tex_xsize,this.particle_tex_ysize);this.particleStateTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleStateFramebuffers.push(t)}for(let i=0;i<2;i++){const e=B(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4));this.particlePositionVelocityTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particlePositionVelocityFramebuffers.push(t)}const h=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_apply_gravity=g(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,R),p(this.gl,this.gl.FRAGMENT_SHADER,W)]);const i=this.gl.getAttribLocation(this.prog_apply_gravity,"a_position"),e=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_position_velocity_tex");this.xGravityLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_x_gravity"),this.yGravityLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_y_gravity"),this.viscosityLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_viscosity"),this.attractionLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_attraction"),this.repulsionLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_repulsion"),this.wallSpringConstantLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_wall_spring_constant"),this.wallSpringDampingLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_wall_spring_damping"),this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_gravity),this.gl.uniform1f(this.xGravityLoc,this.gravityDefault),this.gl.uniform1f(this.yGravityLoc,this.gravityDefault),this.gl.uniform1f(this.viscosityLoc,this.viscosityDefault),this.gl.uniform1f(this.attractionLoc,this.attractionDefault),this.gl.uniform1f(this.repulsionLoc,this.repulsionDefault),this.gl.uniform1f(this.wallSpringConstantLoc,this.wallSpringConstantDefault),this.gl.uniform1f(this.wallSpringDampingLoc,this.wallSpringDampingDefault);const r=this.gl.getUniformLocation(this.prog_apply_gravity,"u_dimensions");this.gl.uniform2f(r,this.props.xsize,this.props.ysize),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1)}{this.prog_handle_state=g(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,R),p(this.gl,this.gl.FRAGMENT_SHADER,$)]);const i=this.gl.getAttribLocation(this.prog_handle_state,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_position_velocity_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0);const r=this.gl.getUniformLocation(this.prog_handle_state,"u_dimensions");this.gl.uniform2f(r,this.props.xsize,this.props.ysize),this.gl.useProgram(this.prog_handle_state),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1)}{this.prog_apply_mouse=g(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,R),p(this.gl,this.gl.FRAGMENT_SHADER,j)]);const i=this.gl.getAttribLocation(this.prog_apply_mouse,"a_position"),e=this.gl.getUniformLocation(this.prog_apply_mouse,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_apply_mouse,"u_particle_position_velocity_tex");this.mouseLoc=this.gl.getUniformLocation(this.prog_apply_mouse,"u_mouse"),this.gl.enableVertexAttribArray(i),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_mouse),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1)}this.cmt=new V(this.render_canvas.current),this.animationLoop()}componentWillUnmount(){this.cmt.cleanup(),window.cancelAnimationFrame(this.requestID)}render(){return c("div",{style:this.props.style,className:this.props.className,children:[a("div",{children:a("canvas",{className:"border border-dark",ref:this.particle_canvas,height:this.particle_tex_xsize,width:this.particle_tex_ysize,hidden:!0})}),c("div",{className:"row",children:[a("div",{className:"col-md-8 ",children:a("canvas",{className:"border border-dark",ref:this.render_canvas,width:this.props.xsize,height:this.props.ysize})}),a("div",{className:"col-md-4",children:c("div",{className:"border border-dark p-3 m-3",children:[a("h6",{children:"Controls"}),c("div",{className:"form-group mb-3",children:[a("label",{className:"form-label",children:"Simulation Speed"}),a("input",{type:"range",className:"form-range",min:"0",max:"15",step:1,defaultValue:1,ref:this.range})]}),c("div",{className:"form-group mb-3",children:[a("label",{className:"form-label",children:"X Gravity"}),a("input",{type:"range",className:"form-range",min:"-0.00001",max:"0.00001",step:"0.000005",defaultValue:this.gravityDefault,ref:this.xGravityRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[a("label",{className:"form-label",children:"Y Gravity"}),a("input",{type:"range",className:"form-range",min:"-0.00001",max:"0.00001",step:"0.000005",defaultValue:this.gravityDefault,ref:this.yGravityRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[a("label",{className:"form-label",children:"Viscosity"}),a("input",{type:"range",className:"form-range",min:"0",max:"0.01",step:"0.001",defaultValue:this.viscosityDefault,ref:this.viscosityRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[a("label",{className:"form-label",children:"Repulsion"}),a("input",{type:"range",className:"form-range",min:"1000",max:"10000",step:"100",defaultValue:this.repulsionDefault,ref:this.repulsionRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[a("label",{className:"form-label",children:"Attraction"}),a("input",{type:"range",className:"form-range",min:"1",max:"5",step:"0.1",defaultValue:this.attractionDefault,ref:this.attractionRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[a("label",{className:"form-label",children:"Wall Spring Constant"}),a("input",{type:"range",className:"form-range",min:"0.00001",max:"0.001",step:"0.00001",defaultValue:this.wallSpringConstantDefault,ref:this.wallSpringConstantRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[a("label",{className:"form-label",children:"Wall Bounciness"}),a("input",{type:"range",className:"form-range",min:"0.9",max:"0.999",step:"0.001",defaultValue:this.wallSpringDampingDefault,ref:this.wallSpringDampingRange,onInput:this.handleChange})]}),a("div",{className:"form-group mb-3",children:a("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})})]})})]})]})}}const K=()=>a(P,{children:({Citation:b,CitationBank:h})=>a(z,{children:c(w,{name:"Spacewar",id:"spacewar",children:[a("p",{children:a(F,{href:"https://github.com/pimpale/spacewar"})}),a("p",{children:a(F,{href:"https://github.com/pimpale/GravitySimulator"})}),a(A,{title:"Canvas Setup",id:"canvas-setup-demo",children:a(q,{className:"mx-auto",style:{maxWidth:"50em"},size:512})}),a(A,{title:"Canvas Setup",id:"canvas-setup-demo",children:a(J,{className:"mx-auto",style:{maxWidth:"50em"},xsize:512,ysize:512})})]})})}),Q=G(document.getElementById("root"));Q.render(a(n.StrictMode,{children:a(K,{})}));
