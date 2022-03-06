import{S as z}from"./style.2e6bf75d.js";import{a as n,b as p,j as r,R as w,F as P}from"./vendor.943a4930.js";import{H as F}from"./HrefLink.f1e4ab75.js";import{A as I}from"./ArticleLayout.c88c37a7.js";import{A}from"./AsideCard.9c7dc37c.js";import{o as f,b as D,f as g,e as U,d as M,g as E,c as x,a as _}from"./webgl.9b9ef8e8.js";const v=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,X=`#version 300 es
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
`,C=`#version 300 es
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
`,N=`#version 300 es
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
`,B=`#version 300 es
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
`;class V extends n.Component{constructor(o){super(o);this.particle_tex_xsize=32,this.particle_tex_ysize=32,this.particle_canvas=n.createRef(),this.render_canvas=n.createRef(),this.range=n.createRef(),this.scalarSelect=n.createRef(),this.velocitySelect=n.createRef(),this.particleStateTextures=[],this.particleStateFramebuffers=[],this.particleMassTextures=[],this.particleMassFramebuffers=[],this.particlePositionTextures=[],this.particlePositionFramebuffers=[],this.particleMomentumTextures=[],this.particleMomentumFramebuffers=[],this.particleStateIndex=0,this.particleMassIndex=0,this.particlePositionIndex=0,this.particleMomentumIndex=0,this.needsReset=!0,this.mousePos=null,this.state_data=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.mass_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.position_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.momentum_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.needsReset){const i=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let a=0;a<i.length;a++)i[a]=0;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),f(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,i);const e=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let a=0;a<e.length;a++)e[a]=Math.random()*50;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),D(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,e);const t=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let a=0;a<this.particle_tex_ysize;a++)for(let s=0;s<this.particle_tex_xsize;s++){const h=a*this.particle_tex_xsize+s;t[h*2+0]=s*20+32,t[h*2+1]=a*20+32}this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),g(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,t);const l=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let a=0;a<this.particle_tex_ysize;a++)for(let s=0;s<this.particle_tex_xsize;s++){const h=a*this.particle_tex_xsize+s;l[h*2+0]=(Math.random()-.5)*0,l[h*2+1]=(Math.random()-.5)*0}this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]),g(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,l),this.needsReset=!1}for(let i=0;i<this.range.current.valueAsNumber;i++){{this.gl.useProgram(this.prog_handle_state),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);const e=this.particleStateTextures[this.particleStateIndex],t=this.particleStateFramebuffers[(this.particleStateIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleStateIndex=(this.particleStateIndex+1)%2}{this.gl.useProgram(this.prog_handle_mass),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]);const e=this.particleMassTextures[this.particleMassIndex],t=this.particleMassFramebuffers[(this.particleMassIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMassIndex=(this.particleMassIndex+1)%2}{this.gl.useProgram(this.prog_apply_gravity),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]);const e=this.particleMomentumTextures[this.particleMomentumIndex],t=this.particleMomentumFramebuffers[(this.particleMomentumIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMomentumIndex=(this.particleMomentumIndex+1)%2}{this.gl.useProgram(this.prog_move_particle),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);const e=this.particlePositionTextures[this.particlePositionIndex],t=this.particlePositionFramebuffers[(this.particlePositionIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionIndex=(this.particlePositionIndex+1)%2}}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleStateFramebuffers[this.particleStateIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA_INTEGER,this.gl.UNSIGNED_INT,this.state_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMassFramebuffers[this.particleMassIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.mass_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionFramebuffers[this.particlePositionIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.position_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMomentumFramebuffers[this.particleMomentumIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.momentum_data),this.draw(this.state_data,this.mass_data,this.position_data,this.momentum_data)},this.editData=null,this.handleMouseDown=i=>{const e=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:e,previous:e};for(let t=0;t<this.position_data.length/4;t++)if(this.state_data[t*4]==0){const l=this.calcRadius(this.mass_data[t*4]);if(Math.hypot(e.x-this.position_data[t*4+0],e.y-this.position_data[t*4+1])<l){this.editData={id:t,dragging:e},this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),f(this.gl,t%this.particle_tex_xsize,t/this.particle_tex_xsize,1,1,Uint32Array.from([1]));break}}},this.handleMouseUp=i=>{var e;((e=this.editData)==null?void 0:e.dragging)&&(this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),g(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),f(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Uint32Array.from([0])),this.editData.dragging=null),this.mousePos=null},this.handleMouseMove=i=>{var t;if(!this.mousePos)return;const e=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:e,previous:this.mousePos.current},((t=this.editData)==null?void 0:t.dragging)&&(this.editData.dragging=e,this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),g(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])))},this.discardTouchEvent=i=>i.preventDefault(),this.calcRadius=i=>1.5*Math.sqrt(i)+5,this.draw=(i,e,t,l)=>{var h;const a=this.render_canvas.current,s=this.render_canvas.current.getContext("2d");s.fillStyle="#000000",s.fillRect(0,0,a.width,a.height),s.strokeStyle="#FF0000";for(let c=0;c<t.length/4;c++){let R=i[c*4],d=t[c*4+0],m=t[c*4+1],u=e[c*4],y=Math.sqrt(u);switch(s.beginPath(),s.arc(d,m,y,0,2*Math.PI),R){case 0:s.fillStyle="#FFFFFF";break;default:s.fillStyle="#FF0000";break}s.fill(),s.beginPath(),s.moveTo(d,m);let L=l[c*4+0]/u,S=l[c*4+1]/u;s.lineTo(d+L,m+S),s.stroke(),c==((h=this.editData)==null?void 0:h.id)&&(s.strokeStyle="#0000FF",s.beginPath(),s.arc(d,m,this.calcRadius(u),0,2*Math.PI),s.stroke(),s.strokeStyle="#FF0000")}}}componentDidMount(){this.gl=this.particle_canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");for(let i=0;i<2;i++){const e=U(this.gl,this.particle_tex_xsize,this.particle_tex_ysize);this.particleStateTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleStateFramebuffers.push(t)}for(let i=0;i<2;i++){const e=M(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize));this.particleMassTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMassFramebuffers.push(t)}for(let i=0;i<2;i++){const e=E(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particlePositionTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particlePositionFramebuffers.push(t)}for(let i=0;i<2;i++){const e=E(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particleMomentumTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMomentumFramebuffers.push(t)}const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_apply_gravity=x(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,v),_(this.gl,this.gl.FRAGMENT_SHADER,X)]);const i=this.gl.getAttribLocation(this.prog_apply_gravity,"a_position"),e=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_mass_tex"),l=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_position_tex"),a=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_gravity),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(l,2),this.gl.uniform1i(a,3)}{this.prog_move_particle=x(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,v),_(this.gl,this.gl.FRAGMENT_SHADER,C)]);const i=this.gl.getAttribLocation(this.prog_move_particle,"a_position"),e=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_mass_tex"),l=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_position_tex"),a=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_move_particle),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(l,2),this.gl.uniform1i(a,3)}{this.prog_handle_mass=x(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,v),_(this.gl,this.gl.FRAGMENT_SHADER,N)]);const i=this.gl.getAttribLocation(this.prog_handle_mass,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_mass_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_mass),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1)}{this.prog_handle_state=x(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,v),_(this.gl,this.gl.FRAGMENT_SHADER,B)]);const i=this.gl.getAttribLocation(this.prog_handle_state,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_mass_tex"),l=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_position_tex"),a=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_state),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(l,2),this.gl.uniform1i(a,3)}this.render_canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchcancel",this.discardTouchEvent),this.animationLoop()}getMousePos(o,i){const e=o.getBoundingClientRect(),t=o.width/e.width,l=o.height/e.height;return{x:(i.clientX-e.left)*t,y:(i.clientY-e.top)*l}}componentWillUnmount(){this.render_canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return p("div",{style:this.props.style,className:this.props.className,children:[r("div",{children:r("canvas",{className:"border border-dark",ref:this.particle_canvas,height:this.particle_tex_xsize,width:this.particle_tex_ysize,hidden:!0})}),p("div",{className:"row",children:[r("div",{className:"col-md-8 d-flex",children:r("canvas",{className:"border border-dark",ref:this.render_canvas,height:this.props.size,width:this.props.size})}),r("div",{className:"col-md-4",children:p("div",{className:"border border-dark p-3 m-3",children:[r("h6",{children:"Controls"}),p("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Simulation Speed"}),r("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),p("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Scalar Field"}),p("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[r("option",{value:32,children:"2^6: 64"}),r("option",{value:32,children:"2^6: 64"}),r("option",{value:16,children:"2^8 64"})]}),r("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})]})]})})]})]})}}const T=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,G=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the position texture
uniform sampler2D u_particle_position_tex;

// the velocity texture
uniform sampler2D u_particle_velocity_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

uniform float u_gravity;
uniform float u_repulsion;
uniform float u_attraction;
uniform float u_wall_spring_damping;
uniform float u_wall_spring_constant;

void main() {
  // get the resolution
  ivec2 resolution = textureSize(u_particle_mass_tex, 0);

  float x_off = 1.0/float(resolution.x);
  float y_off = 1.0/float(resolution.y);

  // our current position
  vec2 pos1 = texture(u_particle_position_tex, v_texCoord).xy;
  float m1 = texture(u_particle_mass_tex, v_texCoord).x;

  vec2 v = texture(u_particle_velocity_tex, v_texCoord).xy;

  uint state1 = texture(u_particle_state_tex, v_texCoord).x;
  if(state1 == 0u) {
    for(int y = 0; y < resolution.y; y++) {
      for(int x = 0; x < resolution.x; x++) {
        vec2 loc = vec2(float(x)*x_off, float(y)*y_off);
        uint state2 = texture(u_particle_state_tex, loc).x;
        if(state2 == 0u) {
          vec2 pos2 = texture(u_particle_position_tex, loc).xy;
          float m2 = texture(u_particle_mass_tex, loc).x;
          vec2 r_vec = pos2-pos1;
          float r = length(r_vec);
          vec2 r_hat = r_vec/r;

          float force_strength = u_attraction*pow(r, -7.0) - u_repulsion*pow(r, -13.0);
          vec2 accel = sign(m2)*r_hat*clamp(force_strength, -10.0, 10.0)/m1;

          if(!isnan(accel.x) && !isinf(accel.x) && !isnan(accel.y) && !isinf(accel.y)) {
            v += accel;
          }
        }
      }
    }
  }

  v.y += u_gravity;

  const float xl = 10.0;
  const float yl = 10.0;
  const float xg = 502.0;
  const float yg = 502.0;

  if(pos1.x < xl) {
    v.x = u_wall_spring_damping*v.x + u_wall_spring_constant*pow(pos1.x-xl, 2.0);
  }
  if(pos1.x > xg) {
    v.x = u_wall_spring_damping*v.x -u_wall_spring_constant*pow(pos1.x-xg, 2.0);
  }
  if(pos1.y < yl) {
    v.y = u_wall_spring_damping*v.y + u_wall_spring_constant*pow(pos1.y-yl, 2.0);
  }
  if(pos1.y > yg) {
    v.y = u_wall_spring_damping*v.y -u_wall_spring_constant*pow(pos1.y-yg, 2.0);
  }

  // apply velocity
  value = vec4(v, 0, 0);
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

// the velocity texture
uniform sampler2D u_particle_velocity_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  uint state = texture(u_particle_state_tex, v_texCoord).x;
  vec2 position = texture(u_particle_position_tex, v_texCoord).xy;
  vec2 velocity = texture(u_particle_velocity_tex, v_texCoord).xy;

  // change position only if live
  if(state == 0u) {
    position = position + velocity;
  }

  value = vec4(position , 0, 1);
}
`,k=`#version 300 es
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
`,H=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the state texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the position texture
uniform sampler2D u_particle_position_tex;

// the velocity texture
uniform sampler2D u_particle_velocity_tex;


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
    //value = uvec4(1, 0, 0, 1);
    value = uvec4(state, 0, 0, 1);
  }
}
`;class Y extends n.Component{constructor(o){super(o);this.particle_tex_xsize=32,this.particle_tex_ysize=32,this.particle_canvas=n.createRef(),this.render_canvas=n.createRef(),this.range=n.createRef(),this.gravityDefault=0,this.attractionDefault=1,this.repulsionDefault=1e3,this.wallSpringConstantDefault=.001,this.wallSpringDampingDefault=.99,this.gravityRange=n.createRef(),this.attractionRange=n.createRef(),this.repulsionRange=n.createRef(),this.wallSpringConstantRange=n.createRef(),this.wallSpringDampingRange=n.createRef(),this.scalarSelect=n.createRef(),this.velocitySelect=n.createRef(),this.particleStateTextures=[],this.particleStateFramebuffers=[],this.particleMassTextures=[],this.particleMassFramebuffers=[],this.particlePositionTextures=[],this.particlePositionFramebuffers=[],this.particleVelocityTextures=[],this.particleVelocityFramebuffers=[],this.particleStateIndex=0,this.particleMassIndex=0,this.particlePositionIndex=0,this.particleVelocityIndex=0,this.needsReset=!0,this.mousePos=null,this.state_data=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.mass_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.position_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.velocity_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.needsReset){const i=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize),e=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize),t=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2),l=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let a=0;a<this.particle_tex_ysize;a++)for(let s=0;s<this.particle_tex_xsize;s++){const h=a*this.particle_tex_xsize+s;i[h]=0,s<this.particle_tex_xsize?(e[h]=1,t[h*2+0]=s*2.5+10,t[h*2+1]=a*2.5+10):(e[h]=-1,t[h*2+0]=s*2.5+200,t[h*2+1]=a*2.5+10),l[h*2+0]=(Math.random()-.5)*0,l[h*2+1]=(Math.random()-.5)*0}this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),f(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,i),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),D(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,e),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),g(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,t),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleVelocityTextures[this.particleVelocityIndex]),g(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,l),this.needsReset=!1}for(let i=0;i<this.range.current.valueAsNumber;i++){{this.gl.useProgram(this.prog_handle_state),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleVelocityTextures[this.particleVelocityIndex]);const e=this.particleStateTextures[this.particleStateIndex],t=this.particleStateFramebuffers[(this.particleStateIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleStateIndex=(this.particleStateIndex+1)%2}{this.gl.useProgram(this.prog_handle_mass),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]);const e=this.particleMassTextures[this.particleMassIndex],t=this.particleMassFramebuffers[(this.particleMassIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMassIndex=(this.particleMassIndex+1)%2}{this.gl.useProgram(this.prog_apply_gravity),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]);const e=this.particleVelocityTextures[this.particleVelocityIndex],t=this.particleVelocityFramebuffers[(this.particleVelocityIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleVelocityIndex=(this.particleVelocityIndex+1)%2}{this.gl.useProgram(this.prog_move_particle),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleVelocityTextures[this.particleVelocityIndex]);const e=this.particlePositionTextures[this.particlePositionIndex],t=this.particlePositionFramebuffers[(this.particlePositionIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionIndex=(this.particlePositionIndex+1)%2}}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleStateFramebuffers[this.particleStateIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA_INTEGER,this.gl.UNSIGNED_INT,this.state_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMassFramebuffers[this.particleMassIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.mass_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionFramebuffers[this.particlePositionIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.position_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleVelocityFramebuffers[this.particleVelocityIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.velocity_data),this.draw(this.state_data,this.mass_data,this.position_data,this.velocity_data)},this.editData=null,this.handleMouseDown=i=>{const e=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:e,previous:e};for(let t=0;t<this.position_data.length/4;t++)if(this.state_data[t*4]==0){const l=this.calcRadius(this.mass_data[t*4]);if(Math.hypot(e.x-this.position_data[t*4+0],e.y-this.position_data[t*4+1])<l){this.editData={id:t,dragging:e},this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),f(this.gl,t%this.particle_tex_xsize,t/this.particle_tex_xsize,1,1,Uint32Array.from([1]));break}}},this.handleMouseUp=i=>{var e;((e=this.editData)==null?void 0:e.dragging)&&(this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),g(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),f(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Uint32Array.from([0])),this.editData.dragging=null),this.mousePos=null},this.handleMouseMove=i=>{var t;if(!this.mousePos)return;const e=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:e,previous:this.mousePos.current},((t=this.editData)==null?void 0:t.dragging)&&(this.editData.dragging=e,this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),g(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])))},this.handleChange=()=>{this.gl.useProgram(this.prog_apply_gravity);const i=this.gravityRange.current.valueAsNumber,e=this.attractionRange.current.valueAsNumber,t=this.repulsionRange.current.valueAsNumber,l=this.wallSpringConstantRange.current.valueAsNumber,a=this.wallSpringDampingRange.current.valueAsNumber;this.gl.uniform1f(this.gravityLoc,i),this.gl.uniform1f(this.attractionLoc,e),this.gl.uniform1f(this.repulsionLoc,t),this.gl.uniform1f(this.wallSpringConstantLoc,l),this.gl.uniform1f(this.wallSpringDampingLoc,a)},this.discardTouchEvent=i=>i.preventDefault(),this.calcRadius=i=>1.5*Math.sqrt(Math.abs(i))+5,this.tick=0,this.draw=(i,e,t,l)=>{var h;this.tick==0?(console.log(l),this.tick=100):this.tick--;const a=this.render_canvas.current,s=this.render_canvas.current.getContext("2d");s.fillStyle="#000000",s.fillRect(0,0,a.width,a.height),s.strokeStyle="#FF0000";for(let c=0;c<t.length/4;c++){let R=i[c*4],d=t[c*4+0],m=t[c*4+1],u=e[c*4],y=Math.sqrt(Math.abs(u));switch(s.beginPath(),s.arc(d,m,y,0,2*Math.PI),R){case 0:u<0?s.fillStyle="#FF00FF":s.fillStyle="#FFFFFF";break;default:s.fillStyle="#FF0000";break}s.fill(),c==((h=this.editData)==null?void 0:h.id)&&(s.strokeStyle="#0000FF",s.beginPath(),s.arc(d,m,this.calcRadius(u),0,2*Math.PI),s.stroke(),s.strokeStyle="#FF0000")}}}componentDidMount(){this.gl=this.particle_canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");for(let i=0;i<2;i++){const e=U(this.gl,this.particle_tex_xsize,this.particle_tex_ysize);this.particleStateTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleStateFramebuffers.push(t)}for(let i=0;i<2;i++){const e=M(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize));this.particleMassTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMassFramebuffers.push(t)}for(let i=0;i<2;i++){const e=E(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particlePositionTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particlePositionFramebuffers.push(t)}for(let i=0;i<2;i++){const e=E(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particleVelocityTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleVelocityFramebuffers.push(t)}const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_apply_gravity=x(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,T),_(this.gl,this.gl.FRAGMENT_SHADER,G)]);const i=this.gl.getAttribLocation(this.prog_apply_gravity,"a_position"),e=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_mass_tex"),l=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_position_tex"),a=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_velocity_tex");this.gravityLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_gravity"),this.attractionLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_attraction"),this.repulsionLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_repulsion"),this.wallSpringConstantLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_wall_spring_constant"),this.wallSpringDampingLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_wall_spring_damping"),this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_gravity),this.gl.uniform1f(this.gravityLoc,this.gravityDefault),this.gl.uniform1f(this.attractionLoc,this.attractionDefault),this.gl.uniform1f(this.repulsionLoc,this.repulsionDefault),this.gl.uniform1f(this.wallSpringConstantLoc,this.wallSpringConstantDefault),this.gl.uniform1f(this.wallSpringDampingLoc,this.wallSpringDampingDefault),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(l,2),this.gl.uniform1i(a,3)}{this.prog_move_particle=x(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,T),_(this.gl,this.gl.FRAGMENT_SHADER,O)]);const i=this.gl.getAttribLocation(this.prog_move_particle,"a_position"),e=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_mass_tex"),l=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_position_tex"),a=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_velocity_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_move_particle),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(l,2),this.gl.uniform1i(a,3)}{this.prog_handle_mass=x(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,T),_(this.gl,this.gl.FRAGMENT_SHADER,k)]);const i=this.gl.getAttribLocation(this.prog_handle_mass,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_mass_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_mass),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1)}{this.prog_handle_state=x(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,T),_(this.gl,this.gl.FRAGMENT_SHADER,H)]);const i=this.gl.getAttribLocation(this.prog_handle_state,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_mass_tex"),l=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_position_tex"),a=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_velocity_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_state),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(l,2),this.gl.uniform1i(a,3)}this.render_canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchcancel",this.discardTouchEvent),this.animationLoop()}getMousePos(o,i){const e=o.getBoundingClientRect(),t=o.width/e.width,l=o.height/e.height;return{x:(i.clientX-e.left)*t,y:(i.clientY-e.top)*l}}componentWillUnmount(){this.render_canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return p("div",{style:this.props.style,className:this.props.className,children:[r("div",{children:r("canvas",{className:"border border-dark",ref:this.particle_canvas,height:this.particle_tex_xsize,width:this.particle_tex_ysize,hidden:!0})}),p("div",{className:"row",children:[r("div",{className:"col-md-8 ",children:r("canvas",{className:"border border-dark",ref:this.render_canvas,height:this.props.size,width:this.props.size})}),r("div",{className:"col-md-4",children:p("div",{className:"border border-dark p-3 m-3",children:[r("h6",{children:"Controls"}),p("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Simulation Speed"}),r("input",{type:"range",className:"form-range",min:"0",max:"100",step:1,defaultValue:1,ref:this.range})]}),p("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Gravity"}),r("input",{type:"range",className:"form-range",min:"-0.00001",max:"0.00001",step:"0.000005",defaultValue:this.gravityDefault,ref:this.gravityRange,onInput:this.handleChange})]}),p("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Repulsion"}),r("input",{type:"range",className:"form-range",min:"100",max:"1000",step:"100",defaultValue:this.repulsionDefault,ref:this.repulsionRange,onInput:this.handleChange})]}),p("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Attraction"}),r("input",{type:"range",className:"form-range",min:"1",max:"5",step:"1",defaultValue:this.attractionDefault,ref:this.attractionRange,onInput:this.handleChange})]}),p("div",{className:"form-group mb-3",hidden:!0,children:[r("label",{className:"form-label",children:"Wall Spring Constant"}),r("input",{type:"range",className:"form-range",min:"0.001",max:"0.01",step:"0.001",defaultValue:this.wallSpringConstantDefault,ref:this.wallSpringConstantRange,onInput:this.handleChange})]}),p("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Wall Spring Damping"}),r("input",{type:"range",className:"form-range",min:"0.9",max:"0.999",step:"0.001",defaultValue:this.wallSpringDampingDefault,ref:this.wallSpringDampingRange,onInput:this.handleChange})]}),r("div",{className:"form-group mb-3",children:r("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})})]})})]})]})}}const W=()=>r(I,{children:({Citation:b,CitationBank:o})=>r(P,{children:p(z,{name:"Spacewar",id:"spacewar",children:[r("p",{children:r(F,{href:"https://github.com/pimpale/spacewar"})}),r("p",{children:r(F,{href:"https://github.com/pimpale/GravitySimulator"})}),r(A,{title:"Canvas Setup",id:"canvas-setup-demo",children:r(V,{className:"mx-auto",style:{maxWidth:"50em"},size:512})}),r(A,{title:"Canvas Setup",id:"canvas-setup-demo",children:r(Y,{className:"mx-auto",style:{maxWidth:"50em"},size:512})})]})})});w.render(r(n.StrictMode,{children:r(W,{})}),document.getElementById("root"));
