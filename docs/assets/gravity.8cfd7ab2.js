import{S as b}from"./style.2e6bf75d.js";import{a as _,b as u,j as s,R as y,F as A}from"./vendor.943a4930.js";import{H as d}from"./HrefLink.f1e4ab75.js";import{A as M}from"./ArticleLayout.c88c37a7.js";import{A as U}from"./AsideCard.9c7dc37c.js";import{b as L,f,e as z,d as D,g as v,c as x,a as m}from"./webgl.9b9ef8e8.js";const g=`#version 300 es
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

const float G = 0.0001;

void main() {
  // get the resolution
  ivec2 resolution = textureSize(u_particle_mass_tex, 0);

  float x_off = 1.0/float(resolution.x);
  float y_off = 1.0/float(resolution.y);

  // our current position
  vec2 pos1 = texture(u_particle_position_tex, v_texCoord).xy;

  vec2 p = texture(u_particle_momentum_tex, v_texCoord).xy;

  for(int y = 0; y < resolution.y; y++) {
    for(int x = 0; x < resolution.x; x++) {
      vec2 loc = vec2(float(x)*x_off, float(y)*y_off);
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

  // run potential
  value = vec4(p, 0, 0);
}
`,w=`#version 300 es
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
  float mass = texture(u_particle_mass_tex, v_texCoord).x;
  vec2 position = texture(u_particle_position_tex, v_texCoord).xy;
  vec2 momentum = texture(u_particle_momentum_tex, v_texCoord).xy;

  // do position
  position = position + momentum/mass;

  value = vec4(position , 0, 1);
}
`,I=`#version 300 es
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
`;class S extends _.Component{constructor(n){super(n);this.particle_canvas=_.createRef(),this.render_canvas=_.createRef(),this.range=_.createRef(),this.scalarSelect=_.createRef(),this.velocitySelect=_.createRef(),this.particleStateTextures=[],this.particleStateFramebuffers=[],this.particleMassTextures=[],this.particleMassFramebuffers=[],this.particlePositionTextures=[],this.particlePositionFramebuffers=[],this.particleMomentumTextures=[],this.particleMomentumFramebuffers=[],this.particleStateIndex=0,this.particleMassIndex=0,this.particlePositionIndex=0,this.particleMomentumIndex=0,this.needsReset=!0,this.mousePos=null,this.handleMouseDown=t=>{const e=this.getMousePos(this.render_canvas.current,t);this.mousePos={current:e,previous:e}},this.handleMouseUp=t=>{this.mousePos=null},this.handleMouseMove=t=>{!this.mousePos||(this.mousePos={current:this.getMousePos(this.render_canvas.current,t),previous:this.mousePos.current})},this.discardTouchEvent=t=>t.preventDefault(),this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.needsReset){const o=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let l=0;l<o.length;l++)o[l]=Math.random()*5;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),L(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,o);const r=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let l=0;l<this.particle_tex_ysize;l++)for(let h=0;h<this.particle_tex_xsize;h++){const p=l*this.particle_tex_xsize+h;r[p*2+0]=h*3+32,r[p*2+1]=l*3+32}this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),f(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,r);const a=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let l=0;l<this.particle_tex_ysize;l++)for(let h=0;h<this.particle_tex_xsize;h++){const p=l*this.particle_tex_xsize+h;a[p*2+0]=(Math.random()-.5)*1,a[p*2+1]=(Math.random()-.5)*1}this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]),f(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,a),this.needsReset=!1}for(let o=0;o<this.range.current.valueAsNumber;o++){{this.gl.useProgram(this.prog_handle_mass),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]);const r=this.particleMassTextures[this.particleMassIndex],a=this.particleMassFramebuffers[(this.particleMassIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,a),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMassIndex=(this.particleMassIndex+1)%2}{this.gl.useProgram(this.prog_apply_gravity),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]);const r=this.particleMomentumTextures[this.particleMomentumIndex],a=this.particleMomentumFramebuffers[(this.particleMomentumIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,a),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMomentumIndex=(this.particleMomentumIndex+1)%2}{this.gl.useProgram(this.prog_move_particle),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);const r=this.particlePositionTextures[this.particlePositionIndex],a=this.particlePositionFramebuffers[(this.particlePositionIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,a),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionIndex=(this.particlePositionIndex+1)%2}}const t=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize),e=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),i=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),c=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleStateFramebuffers[this.particleStateIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RED_INTEGER,this.gl.UNSIGNED_INT,t),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMassFramebuffers[this.particleMassIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionFramebuffers[this.particlePositionIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,i),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMomentumFramebuffers[this.particleMomentumIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,c),this.draw(t,e,i,c)},this.tick=0,this.draw=(t,e,i,c)=>{this.tick==100?(console.log(i),this.tick=0):this.tick++;const o=this.render_canvas.current,r=this.render_canvas.current.getContext("2d");r.fillStyle="#000000",r.fillRect(0,0,o.width,o.height),r.fillStyle="#FFFFFF",r.strokeStyle="#FF0000";for(let a=0;a<i.length/4;a++){let l=i[a*4+0],h=i[a*4+1],p=e[a*4],E=Math.sqrt(p);r.beginPath(),r.arc(l,h,E,0,2*Math.PI),r.fill(),r.beginPath(),r.moveTo(l,h);let F=c[a*4+0]/p,R=c[a*4+1]/p;r.lineTo(l+F,h+R),r.stroke()}},this.particle_tex_xsize=16,this.particle_tex_ysize=16}componentDidMount(){this.gl=this.particle_canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");for(let t=0;t<2;t++){const e=z(this.gl,this.particle_tex_xsize,this.particle_tex_ysize);this.particleStateTextures.push(e);const i=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleStateFramebuffers.push(i)}for(let t=0;t<2;t++){const e=D(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize));this.particleMassTextures.push(e);const i=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMassFramebuffers.push(i)}for(let t=0;t<2;t++){const e=v(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particlePositionTextures.push(e);const i=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particlePositionFramebuffers.push(i)}for(let t=0;t<2;t++){const e=v(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particleMomentumTextures.push(e);const i=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMomentumFramebuffers.push(i)}const n=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_apply_gravity=x(this.gl,[m(this.gl,this.gl.VERTEX_SHADER,g),m(this.gl,this.gl.FRAGMENT_SHADER,P)]);const t=this.gl.getAttribLocation(this.prog_apply_gravity,"a_position"),e=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_state_tex"),i=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_mass_tex"),c=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_position_tex"),o=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_gravity),this.gl.uniform1i(e,0),this.gl.uniform1i(i,1),this.gl.uniform1i(c,2),this.gl.uniform1i(o,3)}{this.prog_move_particle=x(this.gl,[m(this.gl,this.gl.VERTEX_SHADER,g),m(this.gl,this.gl.FRAGMENT_SHADER,w)]);const t=this.gl.getAttribLocation(this.prog_move_particle,"a_position"),e=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_state_tex"),i=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_mass_tex"),c=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_position_tex"),o=this.gl.getUniformLocation(this.prog_move_particle,"u_particle_momentum_tex");this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_move_particle),this.gl.uniform1i(e,0),this.gl.uniform1i(i,1),this.gl.uniform1i(c,2),this.gl.uniform1i(o,3)}{this.prog_handle_mass=x(this.gl,[m(this.gl,this.gl.VERTEX_SHADER,g),m(this.gl,this.gl.FRAGMENT_SHADER,I)]);const t=this.gl.getAttribLocation(this.prog_handle_mass,"a_position"),e=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_state_tex"),i=this.gl.getUniformLocation(this.prog_handle_mass,"u_particle_mass_tex");this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_mass),this.gl.uniform1i(e,0),this.gl.uniform1i(i,1)}this.render_canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.addEventListener("touchcancel",this.discardTouchEvent),this.animationLoop()}getMousePos(n,t){const e=n.getBoundingClientRect(),i=n.width/e.width,c=n.height/e.height;return{x:(t.clientX-e.left)*i,y:(t.clientY-e.top)*c}}componentWillUnmount(){this.render_canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.render_canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.render_canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.render_canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return u("div",{style:this.props.style,className:this.props.className,children:[s("div",{children:s("canvas",{className:"border border-dark",ref:this.particle_canvas,height:this.particle_tex_xsize,width:this.particle_tex_ysize,hidden:!0})}),u("div",{className:"row",children:[s("div",{className:"col-md-8 d-flex",children:s("canvas",{className:"border border-dark",ref:this.render_canvas,height:this.props.size,width:this.props.size})}),s("div",{className:"col-md-4",children:u("div",{className:"border border-dark p-3 m-3",children:[s("h6",{children:"Controls"}),u("div",{className:"form-group mb-3",children:[s("label",{className:"form-label",children:"Simulation Speed"}),s("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),u("div",{className:"form-group mb-3",children:[s("label",{className:"form-label",children:"Scalar Field"}),u("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[s("option",{value:32,children:"2^6: 64"}),s("option",{value:32,children:"2^6: 64"}),s("option",{value:16,children:"2^8 64"}),s("option",{value:32,children:"Grid 64"})]}),s("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})]})]})})]})]})}}const C=()=>s(M,{children:({Citation:T,CitationBank:n})=>s(A,{children:u(b,{name:"Spacewar",id:"spacewar",children:[s("p",{children:s(d,{href:"https://github.com/pimpale/spacewar"})}),s("p",{children:s(d,{href:"https://github.com/pimpale/GravitySimulator"})}),s(U,{title:"Canvas Setup",id:"canvas-setup-demo",children:s(S,{className:"mx-auto",style:{maxWidth:"50em"},size:512})})]})})});y.render(s(_.StrictMode,{children:s(C,{})}),document.getElementById("root"));
