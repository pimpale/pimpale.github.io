import"./modulepreload-polyfill-3cfb730f.js";import{a as l,b as n,j as i,F as b}from"./bootstrap-4b021b69.js";import{S as F}from"./Section-44dcc952.js";import{H as y}from"./HrefLink-ddfeafcf.js";import{A as E}from"./ArticleLayout-216bbe17.js";import{A as D}from"./AsideCard-82c7af73.js";import{i as u,j as _,k as A,l as S,d as m,e as p}from"./webgl-cad418c0.js";import{c as v}from"./math-2c30d096.js";import{C as w}from"./canvas-6f722327.js";import{c as L}from"./client-cb9b5d3b.js";const f=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,C=`#version 300 es
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
`,z=`#version 300 es
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
`,N=`#version 300 es
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
`;class U extends l.Component{constructor(c){super(c),this.xsize=40,this.ysize=40,this.particle_tex_xsize=40,this.particle_tex_ysize=40,this.particle_canvas=l.createRef(),this.render_canvas=l.createRef(),this.range=l.createRef(),this.gravityDefault=0,this.viscosityDefault=0,this.attractionDefault=1,this.repulsionDefault=5e3,this.wallSpringConstantDefault=.001,this.wallSpringDampingDefault=.99,this.xGravityRange=l.createRef(),this.yGravityRange=l.createRef(),this.viscosityRange=l.createRef(),this.attractionRange=l.createRef(),this.repulsionRange=l.createRef(),this.wallSpringConstantRange=l.createRef(),this.wallSpringDampingRange=l.createRef(),this.scalarSelect=l.createRef(),this.velocitySelect=l.createRef(),this.particleStateTextures=[],this.particleStateFramebuffers=[],this.particlePositionVelocityTextures=[],this.particlePositionVelocityFramebuffers=[],this.particleStateIndex=0,this.particlePositionVelocityIndex=0,this.needsReset=!0,this.state_data=new Int32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.position_velocity_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.needsReset){const t=new Int32Array(this.particle_tex_xsize*this.particle_tex_ysize*2),e=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4);for(let o=0;o<this.particle_tex_ysize;o++)for(let r=0;r<this.particle_tex_xsize;r++){const h=o*this.particle_tex_xsize+r;t[h*2]=0,r<this.particle_tex_xsize-0?(t[h*2+1]=1,e[h*4+0]=r*4+20,e[h*4+1]=o*4+20):(t[h*2+1]=-1,e[h*4+0]=r*4+200,e[h*4+1]=o*4+10)}this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),u(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,t),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),_(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,e),this.needsReset=!1}const s=this.range.current.valueAsNumber,a=s*s;for(let t=0;t<a;t++){const e=this.cmt.mousePos;e&&(this.gl.useProgram(this.prog_apply_mouse),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionVelocityFramebuffers[(this.particlePositionVelocityIndex+1)%2]),this.gl.uniform2f(this.mouseLoc,v(e.current.x,0,this.props.xsize),v(e.current.y,0,this.props.ysize)),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionVelocityIndex=(this.particlePositionVelocityIndex+1)%2);{this.gl.useProgram(this.prog_handle_state),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]);const o=this.particleStateTextures[this.particleStateIndex],r=this.particleStateFramebuffers[(this.particleStateIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,o),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleStateIndex=(this.particleStateIndex+1)%2}{this.gl.useProgram(this.prog_apply_gravity),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]);const o=this.particlePositionVelocityTextures[this.particlePositionVelocityIndex],r=this.particlePositionVelocityFramebuffers[(this.particlePositionVelocityIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,o),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionVelocityIndex=(this.particlePositionVelocityIndex+1)%2}}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleStateFramebuffers[this.particleStateIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA_INTEGER,this.gl.INT,this.state_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionVelocityFramebuffers[this.particlePositionVelocityIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.position_velocity_data),this.draw(this.state_data,this.position_velocity_data)},this.handleMouseDown=s=>{var a;if(((a=this.editData)==null?void 0:a.dragging)===void 0){for(let t=0;t<this.position_velocity_data.length/4;t++)if(this.state_data[t*4]==0){const e=this.calcRadius(this.state_data[t*4+1]);if(Math.hypot(s.x-this.position_velocity_data[t*4+0],s.y-this.position_velocity_data[t*4+1])<e){const r=this.state_data[t*4+1];this.editData={id:t,mass:r,dragging:s},this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),u(this.gl,t%this.particle_tex_xsize,t/this.particle_tex_xsize,1,1,Int32Array.from([1,r]));break}}}},this.handleMouseUp=s=>{var a;((a=this.editData)==null?void 0:a.dragging)!==void 0&&(this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),_(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y,0,0])),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),u(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Int32Array.from([0,this.editData.mass])),this.editData.dragging=void 0)},this.handleMouseMove=s=>{var a;((a=this.editData)==null?void 0:a.dragging)!==void 0&&(this.editData.dragging=s,this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionVelocityTextures[this.particlePositionVelocityIndex]),_(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y,0,0])))},this.handleChange=()=>{this.gl.useProgram(this.prog_apply_gravity);const s=this.xGravityRange.current.valueAsNumber,a=this.yGravityRange.current.valueAsNumber,t=this.viscosityRange.current.valueAsNumber,e=this.attractionRange.current.valueAsNumber,o=this.repulsionRange.current.valueAsNumber,r=this.wallSpringConstantRange.current.valueAsNumber,h=this.wallSpringDampingRange.current.valueAsNumber;this.gl.uniform1f(this.xGravityLoc,s),this.gl.uniform1f(this.yGravityLoc,a),this.gl.uniform1f(this.viscosityLoc,t),this.gl.uniform1f(this.attractionLoc,e),this.gl.uniform1f(this.repulsionLoc,o),this.gl.uniform1f(this.wallSpringConstantLoc,r),this.gl.uniform1f(this.wallSpringDampingLoc,h)},this.calcRadius=s=>1.5*Math.sqrt(Math.abs(s))+5,this.tick=0,this.draw=(s,a)=>{var o;this.tick==0?this.tick=100:this.tick--;const t=this.render_canvas.current,e=this.render_canvas.current.getContext("2d");e.fillStyle="#000000",e.fillRect(0,0,t.width,t.height),e.strokeStyle="#FF0000";for(let r=0;r<a.length/4;r++){let h=s[r*4],d=a[r*4+0],x=a[r*4+1],g=s[r*4+1],T=Math.sqrt(Math.abs(g));switch(e.beginPath(),e.arc(d,x,T,0,2*Math.PI),h){case 0:g<0?e.fillStyle="#FF00FF":e.fillStyle="#FFFFFF";break;default:e.fillStyle="#FF0000";break}e.fill(),r==((o=this.editData)==null?void 0:o.id)&&(e.strokeStyle="#0000FF",e.beginPath(),e.arc(d,x,this.calcRadius(g),0,2*Math.PI),e.stroke(),e.strokeStyle="#FF0000")}}}componentDidMount(){this.gl=this.particle_canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");for(let s=0;s<2;s++){const a=A(this.gl,this.particle_tex_xsize,this.particle_tex_ysize);this.particleStateTextures.push(a);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,a,0),this.particleStateFramebuffers.push(t)}for(let s=0;s<2;s++){const a=S(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4));this.particlePositionVelocityTextures.push(a);const t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,a,0),this.particlePositionVelocityFramebuffers.push(t)}const c=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,c),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_apply_gravity=m(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,f),p(this.gl,this.gl.FRAGMENT_SHADER,C)]);const s=this.gl.getAttribLocation(this.prog_apply_gravity,"a_position"),a=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_apply_gravity,"u_particle_position_velocity_tex");this.xGravityLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_x_gravity"),this.yGravityLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_y_gravity"),this.viscosityLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_viscosity"),this.attractionLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_attraction"),this.repulsionLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_repulsion"),this.wallSpringConstantLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_wall_spring_constant"),this.wallSpringDampingLoc=this.gl.getUniformLocation(this.prog_apply_gravity,"u_wall_spring_damping"),this.gl.enableVertexAttribArray(s),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,c),this.gl.vertexAttribPointer(s,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_gravity),this.gl.uniform1f(this.xGravityLoc,this.gravityDefault),this.gl.uniform1f(this.yGravityLoc,this.gravityDefault),this.gl.uniform1f(this.viscosityLoc,this.viscosityDefault),this.gl.uniform1f(this.attractionLoc,this.attractionDefault),this.gl.uniform1f(this.repulsionLoc,this.repulsionDefault),this.gl.uniform1f(this.wallSpringConstantLoc,this.wallSpringConstantDefault),this.gl.uniform1f(this.wallSpringDampingLoc,this.wallSpringDampingDefault);const e=this.gl.getUniformLocation(this.prog_apply_gravity,"u_dimensions");this.gl.uniform2f(e,this.props.xsize,this.props.ysize),this.gl.uniform1i(a,0),this.gl.uniform1i(t,1)}{this.prog_handle_state=m(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,f),p(this.gl,this.gl.FRAGMENT_SHADER,N)]);const s=this.gl.getAttribLocation(this.prog_handle_state,"a_position"),a=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_handle_state,"u_particle_position_velocity_tex");this.gl.enableVertexAttribArray(s),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,c),this.gl.vertexAttribPointer(s,2,this.gl.FLOAT,!1,0,0);const e=this.gl.getUniformLocation(this.prog_handle_state,"u_dimensions");this.gl.uniform2f(e,this.props.xsize,this.props.ysize),this.gl.useProgram(this.prog_handle_state),this.gl.uniform1i(a,0),this.gl.uniform1i(t,1)}{this.prog_apply_mouse=m(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,f),p(this.gl,this.gl.FRAGMENT_SHADER,z)]);const s=this.gl.getAttribLocation(this.prog_apply_mouse,"a_position"),a=this.gl.getUniformLocation(this.prog_apply_mouse,"u_particle_state_tex"),t=this.gl.getUniformLocation(this.prog_apply_mouse,"u_particle_position_velocity_tex");this.mouseLoc=this.gl.getUniformLocation(this.prog_apply_mouse,"u_mouse"),this.gl.enableVertexAttribArray(s),this.gl.vertexAttribPointer(s,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_mouse),this.gl.uniform1i(a,0),this.gl.uniform1i(t,1)}this.cmt=new w(this.render_canvas.current),this.animationLoop()}componentWillUnmount(){this.cmt.cleanup(),window.cancelAnimationFrame(this.requestID)}render(){return n("div",{style:this.props.style,className:this.props.className,children:[i("div",{children:i("canvas",{className:"border border-dark",ref:this.particle_canvas,height:this.particle_tex_xsize,width:this.particle_tex_ysize,hidden:!0})}),n("div",{className:"row",children:[i("div",{className:"col-md-8 ",children:i("canvas",{className:"border border-dark",ref:this.render_canvas,width:this.props.xsize,height:this.props.ysize})}),i("div",{className:"col-md-4",children:n("div",{className:"border border-dark p-3 m-3",children:[i("h6",{children:"Controls"}),n("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"Simulation Speed"}),i("input",{type:"range",className:"form-range",min:"0",max:"15",step:1,defaultValue:1,ref:this.range})]}),n("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"X Gravity"}),i("input",{type:"range",className:"form-range",min:"-0.00001",max:"0.00001",step:"0.000005",defaultValue:this.gravityDefault,ref:this.xGravityRange,onInput:this.handleChange})]}),n("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"Y Gravity"}),i("input",{type:"range",className:"form-range",min:"-0.00001",max:"0.00001",step:"0.000005",defaultValue:this.gravityDefault,ref:this.yGravityRange,onInput:this.handleChange})]}),n("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"Viscosity"}),i("input",{type:"range",className:"form-range",min:"0",max:"0.01",step:"0.001",defaultValue:this.viscosityDefault,ref:this.viscosityRange,onInput:this.handleChange})]}),n("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"Repulsion"}),i("input",{type:"range",className:"form-range",min:"1000",max:"10000",step:"100",defaultValue:this.repulsionDefault,ref:this.repulsionRange,onInput:this.handleChange})]}),n("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"Attraction"}),i("input",{type:"range",className:"form-range",min:"1",max:"5",step:"0.1",defaultValue:this.attractionDefault,ref:this.attractionRange,onInput:this.handleChange})]}),n("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"Wall Spring Constant"}),i("input",{type:"range",className:"form-range",min:"0.00001",max:"0.001",step:"0.00001",defaultValue:this.wallSpringConstantDefault,ref:this.wallSpringConstantRange,onInput:this.handleChange})]}),n("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"Wall Bounciness"}),i("input",{type:"range",className:"form-range",min:"0.9",max:"0.999",step:"0.001",defaultValue:this.wallSpringDampingDefault,ref:this.wallSpringDampingRange,onInput:this.handleChange})]}),i("div",{className:"form-group mb-3",children:i("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})})]})})]})]})}}const P=()=>i(E,{children:({Citation:R,CitationBank:c})=>i(b,{children:n(F,{name:"Spacewar",id:"spacewar",children:[i("p",{children:i(y,{href:"https://github.com/pimpale/spacewar"})}),i("p",{children:i(y,{href:"https://github.com/pimpale/GravitySimulator"})}),i(D,{title:"Canvas Setup",id:"canvas-setup-demo",children:i(U,{className:"mx-auto",style:{maxWidth:"50em"},xsize:512,ysize:512})})]})})}),I=L(document.getElementById("root"));I.render(i(l.StrictMode,{children:i(P,{})}));
