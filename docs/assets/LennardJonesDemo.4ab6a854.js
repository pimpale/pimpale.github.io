import{a as h,b as c,j as l}from"./bootstrap.526f4e94.js";import{g as T,o as L,a as f,h as M,c as S,b as R,d as x,e as u,i as y,j as E,k as w,l as z}from"./webgl.a929ddf3.js";const v=`#version 300 es
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
`,C=`#version 300 es
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
`,N=`#version 300 es
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
`;class k extends h.Component{constructor(o){super(o),this.particle_tex_xsize=2,this.particle_tex_ysize=2,this.particle_canvas=h.createRef(),this.render_canvas=h.createRef(),this.range=h.createRef(),this.scalarSelect=h.createRef(),this.velocitySelect=h.createRef(),this.particleStateTextures=[],this.particleStateFramebuffers=[],this.particleMassTextures=[],this.particleMassFramebuffers=[],this.particlePositionTextures=[],this.particlePositionFramebuffers=[],this.particleMomentumTextures=[],this.particleMomentumFramebuffers=[],this.particleStateIndex=0,this.particleMassIndex=0,this.particlePositionIndex=0,this.particleMomentumIndex=0,this.needsReset=!0,this.mousePos=null,this.state_data=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.mass_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.position_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.momentum_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.needsReset){const i=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let a=0;a<i.length;a++)i[a]=0;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),T(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,i);const e=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let a=0;a<e.length;a++)e[a]=Math.random()*50;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),L(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,e);const t=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let a=0;a<this.particle_tex_ysize;a++)for(let r=0;r<this.particle_tex_xsize;r++){const n=a*this.particle_tex_xsize+r;t[n*2+0]=r*20+32,t[n*2+1]=a*20+32}this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),f(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,t);const s=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let a=0;a<this.particle_tex_ysize;a++)for(let r=0;r<this.particle_tex_xsize;r++){const n=a*this.particle_tex_xsize+r;s[n*2+0]=(Math.random()-.5)*0,s[n*2+1]=(Math.random()-.5)*0}this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]),f(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,s),this.needsReset=!1}for(let i=0;i<this.range.current.valueAsNumber;i++){{this.gl.useProgram(this.prog_handle_state),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);const e=this.particleStateTextures[this.particleStateIndex],t=this.particleStateFramebuffers[(this.particleStateIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleStateIndex=(this.particleStateIndex+1)%2}{this.gl.useProgram(this.prog_handle_mass),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]);const e=this.particleMassTextures[this.particleMassIndex],t=this.particleMassFramebuffers[(this.particleMassIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMassIndex=(this.particleMassIndex+1)%2}{this.gl.useProgram(this.prog_apply_gravity),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]);const e=this.particleMomentumTextures[this.particleMomentumIndex],t=this.particleMomentumFramebuffers[(this.particleMomentumIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMomentumIndex=(this.particleMomentumIndex+1)%2}{this.gl.useProgram(this.prog_move_particle),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);const e=this.particlePositionTextures[this.particlePositionIndex],t=this.particlePositionFramebuffers[(this.particlePositionIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionIndex=(this.particlePositionIndex+1)%2}}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleStateFramebuffers[this.particleStateIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA_INTEGER,this.gl.UNSIGNED_INT,this.state_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMassFramebuffers[this.particleMassIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.mass_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionFramebuffers[this.particlePositionIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.position_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMomentumFramebuffers[this.particleMomentumIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.momentum_data),this.draw(this.state_data,this.mass_data,this.position_data,this.momentum_data)},this.editData=null,this.handleMouseDown=i=>{const e=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:e,previous:e};for(let t=0;t<this.position_data.length/4;t++)if(this.state_data[t*4]==0){const s=this.calcRadius(this.mass_data[t*4]);if(Math.hypot(e.x-this.position_data[t*4+0],e.y-this.position_data[t*4+1])<s){this.editData={id:t,dragging:e},this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),T(this.gl,t%this.particle_tex_xsize,t/this.particle_tex_xsize,1,1,Uint32Array.from([1]));break}}},this.handleMouseUp=i=>{var e;(e=this.editData)!=null&&e.dragging&&(this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),f(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),T(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Uint32Array.from([0])),this.editData.dragging=null),this.mousePos=null},this.handleMouseMove=i=>{var t;if(!this.mousePos)return;const e=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:e,previous:this.mousePos.current},(t=this.editData)!=null&&t.dragging&&(this.editData.dragging=e,this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),f(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])))},this.discardTouchEvent=i=>i.preventDefault(),this.calcRadius=i=>1.5*Math.sqrt(i)+5,this.draw=(i,e,t,s)=>{var n;const a=this.render_canvas.current,r=this.render_canvas.current.getContext("2d");r.fillStyle="#000000",r.fillRect(0,0,a.width,a.height),r.strokeStyle="#FF0000";for(let p=0;p<t.length/4;p++){let d=i[p*4],_=t[p*4+0],g=t[p*4+1],m=e[p*4],A=Math.sqrt(m);switch(r.beginPath(),r.arc(_,g,A,0,2*Math.PI),d){case 0:r.fillStyle="#FFFFFF";break;default:r.fillStyle="#FF0000";break}r.fill(),r.beginPath(),r.moveTo(_,g);let D=s[p*4+0]/m,U=s[p*4+1]/m;r.lineTo(_+D,g+U),r.stroke(),p==((n=this.editData)==null?void 0:n.id)&&(r.strokeStyle="#0000FF",r.beginPath(),r.arc(_,g,this.calcRadius(m),0,2*Math.PI),r.stroke(),r.strokeStyle="#FF0000")}}}componentDidMount(){this.gl=this.particle_canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");for(let i=0;i<2;i++){const e=M(this.gl,this.particle_tex_xsize,this.particle_tex_ysize);this.particleStateTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleStateFramebuffers.push(t)}for(let i=0;i<2;i++){const e=S(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize));this.particleMassTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMassFramebuffers.push(t)}for(let i=0;i<2;i++){const e=R(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particlePositionTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particlePositionFramebuffers.push(t)}for(let i=0;i<2;i++){const e=R(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particleMomentumTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMomentumFramebuffers.push(t)}const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_apply_gravity=x(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,v),u(this.gl,this.gl.FRAGMENT_SHADER,P)]);const i=this.gl.getAttribLocation(this.prog_apply_gravity,"a_position"),e=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_mass_tex"),s=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_position_tex"),a=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_gravity),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(s,2),this.gl.uniform1i(a,3)}{this.prog_move_particle=x(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,v),u(this.gl,this.gl.FRAGMENT_SHADER,I)]);const i=this.gl.getAttribLocation(this.prog_move_particle,"a_position"),e=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_mass_tex"),s=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_position_tex"),a=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_move_particle),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(s,2),this.gl.uniform1i(a,3)}{this.prog_handle_mass=x(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,v),u(this.gl,this.gl.FRAGMENT_SHADER,C)]);const i=this.gl.getAttribLocation(this.prog_handle_mass,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_mass_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_mass),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1)}{this.prog_handle_state=x(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,v),u(this.gl,this.gl.FRAGMENT_SHADER,N)]);const i=this.gl.getAttribLocation(this.prog_handle_state,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_mass_tex"),s=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_position_tex"),a=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_state),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1),this.gl.uniform1i(s,2),this.gl.uniform1i(a,3)}this.render_canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchcancel",this.discardTouchEvent),this.animationLoop()}getMousePos(o,i){const e=o.getBoundingClientRect(),t=o.width/e.width,s=o.height/e.height;return{x:(i.clientX-e.left)*t,y:(i.clientY-e.top)*s}}componentWillUnmount(){this.render_canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),window.cancelAnimationFrame(this.requestID)}render(){return c("div",{style:this.props.style,className:this.props.className,children:[l("div",{children:l("canvas",{className:"border border-dark",ref:this.particle_canvas,height:this.particle_tex_xsize,width:this.particle_tex_ysize,hidden:!0})}),c("div",{className:"row",children:[l("div",{className:"col-md-8 d-flex",children:l("canvas",{className:"border border-dark",ref:this.render_canvas,height:this.props.size,width:this.props.size})}),l("div",{className:"col-md-4",children:c("div",{className:"border border-dark p-3 m-3",children:[l("h6",{children:"Controls"}),c("div",{className:"form-group mb-3",children:[l("label",{className:"form-label",children:"Simulation Speed"}),l("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),c("div",{className:"form-group mb-3",children:[l("label",{className:"form-label",children:"Scalar Field"}),c("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[l("option",{value:32,children:"2^6: 64"}),l("option",{value:32,children:"2^6: 64"}),l("option",{value:16,children:"2^8 64"})]}),l("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})]})]})})]})]})}}const b=`#version 300 es
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
          force_strength = clamp(m2 * force_strength, -0.1, 0.1);
          vec2 accel = r_hat*force_strength/m1;

          if(!isnan(accel.x) && !isnan(accel.y)) {
            v1 += accel;
          }
        }
      }
    }
  }

  v1 *= (1.0-u_viscosity);

  v1.x += u_x_gravity;
  v1.y += u_y_gravity;

  const float xl = 10.0;
  const float yl = 10.0;
  const float xg = 502.0;
  const float yg = 502.0;

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
}
`,B=`#version 300 es
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

const vec2 upperCorner = vec2(0, 0);
const vec2 lowerCorner = vec2(512, 512);

void main() {
  int state = texture(u_particle_state_tex, v_texCoord).x;
  int mass = texture(u_particle_state_tex, v_texCoord).y;
  vec2 position = texture(u_particle_position_velocity_tex, v_texCoord).xy;
  if(position == clamp(position, upperCorner, lowerCorner)) {
    value = ivec4(state, mass, 0, 1);
  } else {
    value = ivec4(state, mass, 0, 1);
  }
}
`;class O extends h.Component{constructor(o){super(o),this.particle_tex_xsize=40,this.particle_tex_ysize=40,this.particle_canvas=h.createRef(),this.render_canvas=h.createRef(),this.range=h.createRef(),this.gravityDefault=0,this.viscosityDefault=0,this.attractionDefault=1,this.repulsionDefault=5e3,this.wallSpringConstantDefault=.001,this.wallSpringDampingDefault=.99,this.xGravityRange=h.createRef(),this.yGravityRange=h.createRef(),this.viscosityRange=h.createRef(),this.attractionRange=h.createRef(),this.repulsionRange=h.createRef(),this.wallSpringConstantRange=h.createRef(),this.wallSpringDampingRange=h.createRef(),this.scalarSelect=h.createRef(),this.velocitySelect=h.createRef(),this.particleStateTextures=[],this.particleStateFramebuffers=[],this.particlePositionVelocityTextures=[],this.particlePositionVelocityFramebuffers=[],this.particleStateIndex=0,this.particlePositionVelocityIndex=0,this.needsReset=!0,this.mousePos=null,this.state_data=new Int32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.position_velocity_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.needsReset){const t=new Int32Array(this.particle_tex_xsize*this.particle_tex_ysize*2),s=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4);for(let a=0;a<this.particle_tex_ysize;a++)for(let r=0;r<this.particle_tex_xsize;r++){const n=a*this.particle_tex_xsize+r;t[n*2]=0,r<this.particle_tex_xsize-20?(t[n*2+1]=1,s[n*4+0]=r*4+20,s[n*4+1]=a*4+20):(t[n*2+1]=-1,s[n*4+0]=r*4+200,s[n*4+1]=a*4+10)}this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),y(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,t),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),E(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,s),this.needsReset=!1}const i=this.range.current.valueAsNumber,e=i*i;for(let t=0;t<e;t++){{this.gl.useProgram(this.prog_handle_state),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]);const s=this.particleStateTextures[this.particleStateIndex],a=this.particleStateFramebuffers[(this.particleStateIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,a),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleStateIndex=(this.particleStateIndex+1)%2}{this.gl.useProgram(this.prog_apply_gravity),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]);const s=this.particlePositionVelocityTextures[this.particlePositionVelocityIndex],a=this.particlePositionVelocityFramebuffers[(this.particlePositionVelocityIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,a),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionVelocityIndex=(this.particlePositionVelocityIndex+1)%2}}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleStateFramebuffers[this.particleStateIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA_INTEGER,this.gl.INT,this.state_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionVelocityFramebuffers[this.particlePositionVelocityIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.position_velocity_data),this.draw(this.state_data,this.position_velocity_data)},this.editData=null,this.handleMouseDown=i=>{const e=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:e,previous:e};for(let t=0;t<this.position_velocity_data.length/4;t++)if(this.state_data[t*4]==0){const s=this.calcRadius(this.state_data[t*4+1]);if(Math.hypot(e.x-this.position_velocity_data[t*4+0],e.y-this.position_velocity_data[t*4+1])<s){const r=this.state_data[t*4+1];this.editData={id:t,mass:r,dragging:e},this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),y(this.gl,t%this.particle_tex_xsize,t/this.particle_tex_xsize,1,1,Int32Array.from([1,r]));break}}},this.handleMouseUp=i=>{var e;(e=this.editData)!=null&&e.dragging&&(this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),E(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y,0,0])),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),y(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Int32Array.from([0,this.editData.mass])),this.editData.dragging=null),this.mousePos=null},this.handleMouseMove=i=>{var t;if(!this.mousePos)return;const e=this.getMousePos(this.render_canvas.current,i);this.mousePos={current:e,previous:this.mousePos.current},(t=this.editData)!=null&&t.dragging&&(this.editData.dragging=e,this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),E(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y,0,0])))},this.handleChange=()=>{this.gl.useProgram(this.prog_apply_gravity);const i=this.xGravityRange.current.valueAsNumber,e=this.yGravityRange.current.valueAsNumber,t=this.viscosityRange.current.valueAsNumber,s=this.attractionRange.current.valueAsNumber,a=this.repulsionRange.current.valueAsNumber,r=this.wallSpringConstantRange.current.valueAsNumber,n=this.wallSpringDampingRange.current.valueAsNumber;this.gl.uniform1f(this.xGravityLoc,i),this.gl.uniform1f(this.yGravityLoc,e),this.gl.uniform1f(this.viscosityLoc,t),this.gl.uniform1f(this.attractionLoc,s),this.gl.uniform1f(this.repulsionLoc,a),this.gl.uniform1f(this.wallSpringConstantLoc,r),this.gl.uniform1f(this.wallSpringDampingLoc,n)},this.discardTouchEvent=i=>i.preventDefault(),this.calcRadius=i=>1.5*Math.sqrt(Math.abs(i))+5,this.tick=0,this.draw=(i,e)=>{var a;this.tick==0?this.tick=100:this.tick--;const t=this.render_canvas.current,s=this.render_canvas.current.getContext("2d");s.fillStyle="#000000",s.fillRect(0,0,t.width,t.height),s.strokeStyle="#FF0000";for(let r=0;r<e.length/4;r++){let n=i[r*4],p=e[r*4+0],d=e[r*4+1],_=i[r*4+1],g=Math.sqrt(Math.abs(_));switch(s.beginPath(),s.arc(p,d,g,0,2*Math.PI),n){case 0:_<0?s.fillStyle="#FF00FF":s.fillStyle="#FFFFFF";break;default:s.fillStyle="#FF0000";break}s.fill(),r==((a=this.editData)==null?void 0:a.id)&&(s.strokeStyle="#0000FF",s.beginPath(),s.arc(p,d,this.calcRadius(_),0,2*Math.PI),s.stroke(),s.strokeStyle="#FF0000")}}}componentDidMount(){this.gl=this.particle_canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");for(let i=0;i<2;i++){const e=w(this.gl,this.particle_tex_xsize,this.particle_tex_ysize);this.particleStateTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleStateFramebuffers.push(t)}for(let i=0;i<2;i++){const e=z(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4));this.particlePositionVelocityTextures.push(e);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particlePositionVelocityFramebuffers.push(t)}const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_apply_gravity=x(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,b),u(this.gl,this.gl.FRAGMENT_SHADER,X)]);const i=this.gl.getAttribLocation(this.prog_apply_gravity,"a_position"),e=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_position_velocity_tex");this.xGravityLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_x_gravity"),this.yGravityLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_y_gravity"),this.viscosityLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_viscosity"),this.attractionLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_attraction"),this.repulsionLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_repulsion"),this.wallSpringConstantLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_wall_spring_constant"),this.wallSpringDampingLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_wall_spring_damping"),this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_gravity),this.gl.uniform1f(this.xGravityLoc,this.gravityDefault),this.gl.uniform1f(this.yGravityLoc,this.gravityDefault),this.gl.uniform1f(this.viscosityLoc,this.viscosityDefault),this.gl.uniform1f(this.attractionLoc,this.attractionDefault),this.gl.uniform1f(this.repulsionLoc,this.repulsionDefault),this.gl.uniform1f(this.wallSpringConstantLoc,this.wallSpringConstantDefault),this.gl.uniform1f(this.wallSpringDampingLoc,this.wallSpringDampingDefault),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1)}{this.prog_handle_state=x(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,b),u(this.gl,this.gl.FRAGMENT_SHADER,B)]);const i=this.gl.getAttribLocation(this.prog_handle_state,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_position_velocity_tex");this.gl.enableVertexAttribArray(i),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_state),this.gl.uniform1i(e,0),this.gl.uniform1i(t,1)}this.render_canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchcancel",this.discardTouchEvent),this.animationLoop()}getMousePos(o,i){const e=o.getBoundingClientRect(),t=o.width/e.width,s=o.height/e.height;return{x:(i.clientX-e.left)*t,y:(i.clientY-e.top)*s}}componentWillUnmount(){this.render_canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),window.cancelAnimationFrame(this.requestID)}render(){return c("div",{style:this.props.style,className:this.props.className,children:[l("div",{children:l("canvas",{className:"border border-dark",ref:this.particle_canvas,height:this.particle_tex_xsize,width:this.particle_tex_ysize,hidden:!0})}),c("div",{className:"row",children:[l("div",{className:"col-md-8 ",children:l("canvas",{className:"border border-dark",ref:this.render_canvas,height:this.props.size,width:this.props.size})}),l("div",{className:"col-md-4",children:c("div",{className:"border border-dark p-3 m-3",children:[l("h6",{children:"Controls"}),c("div",{className:"form-group mb-3",children:[l("label",{className:"form-label",children:"Simulation Speed"}),l("input",{type:"range",className:"form-range",min:"0",max:"15",step:1,defaultValue:1,ref:this.range})]}),c("div",{className:"form-group mb-3",children:[l("label",{className:"form-label",children:"X Gravity"}),l("input",{type:"range",className:"form-range",min:"-0.00001",max:"0.00001",step:"0.000005",defaultValue:this.gravityDefault,ref:this.xGravityRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[l("label",{className:"form-label",children:"Y Gravity"}),l("input",{type:"range",className:"form-range",min:"-0.00001",max:"0.00001",step:"0.000005",defaultValue:this.gravityDefault,ref:this.yGravityRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[l("label",{className:"form-label",children:"Viscosity"}),l("input",{type:"range",className:"form-range",min:"0",max:"0.01",step:"0.001",defaultValue:this.viscosityDefault,ref:this.viscosityRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[l("label",{className:"form-label",children:"Repulsion"}),l("input",{type:"range",className:"form-range",min:"1000",max:"10000",step:"100",defaultValue:this.repulsionDefault,ref:this.repulsionRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[l("label",{className:"form-label",children:"Attraction"}),l("input",{type:"range",className:"form-range",min:"1",max:"5",step:"0.1",defaultValue:this.attractionDefault,ref:this.attractionRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[l("label",{className:"form-label",children:"Wall Spring Constant"}),l("input",{type:"range",className:"form-range",min:"0.00001",max:"0.001",step:"0.00001",defaultValue:this.wallSpringConstantDefault,ref:this.wallSpringConstantRange,onInput:this.handleChange})]}),c("div",{className:"form-group mb-3",children:[l("label",{className:"form-label",children:"Wall Bounciness"}),l("input",{type:"range",className:"form-range",min:"0.9",max:"0.999",step:"0.001",defaultValue:this.wallSpringDampingDefault,ref:this.wallSpringDampingRange,onInput:this.handleChange})]}),l("div",{className:"form-group mb-3",children:l("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})})]})})]})]})}}export{k as W,O as a};
