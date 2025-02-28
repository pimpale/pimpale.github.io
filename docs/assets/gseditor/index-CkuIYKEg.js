import"../modulepreload-polyfill-B5Qt9EMX.js";import{R as E,j as v,e as Z}from"../client-MRn4bnEa.js";import{b as d,n as z,r as X,m as w,s as tt,h as et,d as j,p as it,g as st,f as p,i as H,c as ot,j as rt,a as nt,k as at,l as ht,q as ct,t as lt,u as W}from"../quat-BHbpDEQk.js";import{f as A,s as C,c as P}from"../vec2-Cp9oXPjg.js";function T(s,r,i){const t=s.createShader(r);return s.shaderSource(t,i),s.compileShader(t),t}function O(s,r){const i=s.createProgram();for(const e of r)s.attachShader(i,e);if(s.linkProgram(i),s.getProgramParameter(i,s.LINK_STATUS))return i;for(const e of r){if(!s.getShaderParameter(e,s.COMPILE_STATUS))throw Error(s.getShaderInfoLog(e));s.deleteShader(e)}return console.log(s.getProgramInfoLog(i)),s.deleteProgram(i),null}function V(s,r,i){const t=s.createTexture();return s.bindTexture(s.TEXTURE_2D,t),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.NEAREST),s.pixelStorei(s.UNPACK_ALIGNMENT,1),s.texImage2D(s.TEXTURE_2D,0,s.RGBA,r,i,0,s.RGBA,s.UNSIGNED_BYTE,new Uint8Array(r*i*4)),t}function Y(s,r,i,t){const e=s.createTexture();return s.bindTexture(s.TEXTURE_2D,e),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.NEAREST),s.pixelStorei(s.UNPACK_ALIGNMENT,1),s.texImage2D(s.TEXTURE_2D,0,s.RGBA32F,r,i,0,s.RGBA,s.FLOAT,t),e}function dt(s,r,i,t){const e=s.createTexture();return s.bindTexture(s.TEXTURE_2D,e),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.NEAREST),s.texImage2D(s.TEXTURE_2D,0,s.DEPTH_COMPONENT32F,r,i,0,s.DEPTH_COMPONENT,s.FLOAT,t),e}function ut(s){return s*Math.PI/180}function U(s){const r=s.x,i=s.y,t=1;let e;return r*r+i*i<=t*t/2?e=Math.sqrt(t*t-r*r-i*i):e=t*t/2/Math.sqrt(r*r+i*i),new Float32Array([r,-i,e])}const ft=47;class _t{constructor(r,i){this.mouseLoc=null,this.baseQ=d(),this.currQ=d(),this.momentumQ=d(),this.offsetRadius=1,this.currentMomentumLevel=0,this.getNormalizedMouseCoords=t=>{const e=this.canvas.getBoundingClientRect(),o=(e.left+e.right)/2,n=(e.top+e.bottom)/2,h=e.right-e.left,a=e.bottom-e.top,c=Math.min(h,a);return{x:2*(t.clientX-o)/c,y:2*(t.clientY-n)/c}},this.fov=()=>ut(ft),this.handleMouseDown=t=>{const e=this.getNormalizedMouseCoords(t);this.mouseLoc={start:e,current:e,previous:e}},this.handleScroll=t=>{this.offsetRadius+=t.deltaY/50,t.preventDefault()},this.handleMouseMove=t=>{if(this.mouseLoc===null)return;this.mouseLoc.previous=this.mouseLoc.current,this.mouseLoc.current=this.getNormalizedMouseCoords(t);const e=U(this.mouseLoc.start),o=U(this.mouseLoc.current);z(e,e),z(o,o),X(this.currQ,e,o)},this.handleMouseUp=t=>{if(this.mouseLoc===null)return;const e=U(this.mouseLoc.previous),o=U(this.mouseLoc.current);z(e,e),z(o,o),X(this.momentumQ,e,o),w(this.baseQ,this.currQ,this.baseQ),this.currQ=d(),this.mouseLoc=null,this.currentMomentumLevel=1},this.discardTouchEvent=t=>t.preventDefault(),this.cleanup=()=>{this.canvas.removeEventListener("pointerdown",this.handleMouseDown),this.canvas.removeEventListener("wheel",this.handleScroll),window.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.canvas.removeEventListener("touchstart",this.discardTouchEvent),this.canvas.removeEventListener("touchmove",this.discardTouchEvent),this.canvas.removeEventListener("touchend",this.discardTouchEvent),this.canvas.removeEventListener("touchcancel",this.discardTouchEvent)},this.update=()=>{if(this.mouseLoc===null){const t=tt(d(),this.rotationQ,this.momentumQ,this.currentMomentumLevel);this.currentMomentumLevel*=this.dampingFactor,w(this.baseQ,t,this.baseQ)}},this.viewMatrix=()=>{const t=w(d(),this.currQ,this.baseQ);return et(j(),t,[0,0,-this.offsetRadius])},this.viewProjMatrix=(t,e)=>{const o=it(j(),this.fov(),t/e,1,1e3),n=this.viewMatrix();return st(j(),o,n)},i.rotation?this.rotationQ=i.rotation:this.rotationQ=d(),i.dampingFactor!==void 0?this.dampingFactor=i.dampingFactor:this.dampingFactor=.9,this.canvas=r,this.canvas.addEventListener("pointerdown",this.handleMouseDown),this.canvas.addEventListener("wheel",this.handleScroll),window.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.canvas.addEventListener("touchstart",this.discardTouchEvent),this.canvas.addEventListener("touchmove",this.discardTouchEvent),this.canvas.addEventListener("touchend",this.discardTouchEvent),this.canvas.addEventListener("touchcancel",this.discardTouchEvent)}}function gt(s){const r=performance.now(),i=new TextDecoder("utf-8").decode(s.slice(0,2e3)),t=i.indexOf("end_header")+10+1,[e]=i.split("end_header"),o=/element vertex (\d+)/,n=e.match(o);if(!n)throw new Error('Invalid PLY file: missing "element vertex"');const h=parseInt(n[1]),a=[],c=[],u=[],_=[],R=[],M=l=>1/(1+Math.exp(-l)),y=62,G=new DataView(s),D=(l,x,m)=>{const g=t+l*y*4+x*4;return new Float32Array(m-x).map((L,f)=>G.getFloat32(g+f*4,!0))},Q=(l,x)=>{const m=t+l*y*4+x*4;return G.getFloat32(m,!0)},$=l=>{const x=D(l,0,3),m=D(l,6,9),g=54,L=Q(l,g),f=D(l,g+1,g+4),F=D(l,g+4,g+8);return{position:x,harmonic:m,opacity:L,scale:f,rotation:F}};for(let l=0;l<h;l++){let{position:x,harmonic:m,opacity:g,scale:L,rotation:f}=$(l),F=0;for(let b=0;b<4;b++)F+=f[b]*f[b];const K=Math.sqrt(F);f=f.map(b=>b/K),u.push(f[1],f[2],f[3],f[0]),L=L.map(b=>Math.exp(b)),_.push(...L),g=M(g),c.push(g);const B=.28209479177387814,J=[.5+B*m[0],.5+B*m[1],.5+B*m[2]];R.push(...J),a.push(...x)}return console.log(`Loaded ${h} gaussians in ${((performance.now()-r)/1e3).toFixed(3)}s`),{count:h,positions:Float32Array.from(a),opacities:Float32Array.from(c),colors:Float32Array.from(R),scales:Float32Array.from(_),rotations:Float32Array.from(u)}}function I(s,r){if(!s)throw new Error(r)}function vt(s,r){I(s>0),I(r>0);let i=[];for(let t=0;t<s;t++){const e=t/s,o=(t+1)/s;for(let n=0;n<r;n++){const h=n/r,a=(n+1)/r;i.push(A(e,h)),i.push(A(o,h)),i.push(A(e,a)),i.push(A(o,h)),i.push(A(o,a)),i.push(A(e,a))}}return i}class pt{constructor(r){this.mousePos=null,this.mouseDownListeners=[],this.mouseDragListeners=[],this.mouseMoveListeners=[],this.mouseUpListeners=[],this.mouseClickListeners=[],this.keyDownListeners=[],this.addMouseDownListener=i=>{this.mouseDownListeners.push(i)},this.removeMouseDownListener=i=>{this.mouseDownListeners=this.mouseDownListeners.filter(t=>t!==i)},this.addMouseDragListener=i=>{this.mouseDragListeners.push(i)},this.removeMouseDragListener=i=>{this.mouseDragListeners=this.mouseDragListeners.filter(t=>t!==i)},this.addMouseMoveListener=i=>{this.mouseMoveListeners.push(i)},this.removeMouseMoveListener=i=>{this.mouseMoveListeners=this.mouseMoveListeners.filter(t=>t!==i)},this.addMouseUpListener=i=>{this.mouseUpListeners.push(i)},this.removeMouseUpListener=i=>{this.mouseUpListeners=this.mouseUpListeners.filter(t=>t!==i)},this.addMouseClickListener=i=>{this.mouseClickListeners.push(i)},this.removeMouseClickListener=i=>{this.mouseClickListeners=this.mouseClickListeners.filter(t=>t!==i)},this.addKeyDownListener=i=>{this.keyDownListeners.push(i)},this.removeKeyDownListener=i=>{this.keyDownListeners=this.keyDownListeners.filter(t=>t!==i)},this.handleMouseDown=i=>{const t=this.getMousePos(this.canvas,i);this.mousePos={current:t,previous:t};for(const e of this.mouseDownListeners)e(t)},this.handleMouseUp=i=>{this.mousePos=null;const t=this.getMousePos(this.canvas,i);for(const e of this.mouseUpListeners)e(t)},this.handleMouseDrag=i=>{const t=this.getMousePos(this.canvas,i);for(const e of this.mouseMoveListeners)e(t);if(this.mousePos){this.mousePos={current:t,previous:this.mousePos.current};for(const e of this.mouseDragListeners)e(t)}},this.handleMouseClick=i=>{const t=this.getMousePos(this.canvas,i);for(const e of this.mouseClickListeners)e(t)},this.handleKeyDown=i=>{for(const t of this.keyDownListeners)t(i.key)},this.discardTouchEvent=i=>i.preventDefault(),this.cleanup=()=>{this.canvas.removeEventListener("pointerdown",this.handleMouseDown),this.canvas.removeEventListener("pointermove",this.handleMouseDrag),window.removeEventListener("pointerup",this.handleMouseUp),this.canvas.removeEventListener("dblclick",this.handleMouseClick),this.canvas.removeEventListener("keydown",this.handleKeyDown),this.canvas.removeEventListener("touchstart",this.discardTouchEvent),this.canvas.removeEventListener("touchmove",this.discardTouchEvent),this.canvas.removeEventListener("touchend",this.discardTouchEvent),this.canvas.removeEventListener("touchcancel",this.discardTouchEvent)},this.canvas=r,this.canvas.addEventListener("pointerdown",this.handleMouseDown),this.canvas.addEventListener("pointermove",this.handleMouseDrag),window.addEventListener("pointerup",this.handleMouseUp),this.canvas.addEventListener("dblclick",this.handleMouseClick),this.canvas.addEventListener("keydown",this.handleKeyDown),this.canvas.addEventListener("touchstart",this.discardTouchEvent),this.canvas.addEventListener("touchmove",this.discardTouchEvent),this.canvas.addEventListener("touchend",this.discardTouchEvent),this.canvas.addEventListener("touchcancel",this.discardTouchEvent)}getMousePos(r,i){const t=r.getBoundingClientRect(),e=r.width/t.width,o=r.height/t.height;return[(i.clientX-t.left)*e,(i.clientY-t.top)*o]}}function k(s=1){const r=[],i=[p(1,0,0),p(0,1,0),p(0,0,1)],t=[p(s,0,0),p(0,s,0),p(0,0,s)];for(let e=0;e<3;e++)r.push({position:H(),color:i[e]}),r.push({position:t[e],color:i[e]});return r}const q=new Float32Array(vt(1,1).flatMap(s=>[s[0],s[1]])),mt=`#version 300 es
layout(location=0) in vec3 a_center;
layout(location=1) in vec3 a_col;
layout(location=2) in float a_opacity;
layout(location=3) in vec3 a_covA;
layout(location=4) in vec3 a_covB;
layout(location=5) in uint a_objId;

uniform float W;
uniform float H;
uniform float focal_x;
uniform float focal_y;
uniform float tan_fovx;
uniform float tan_fovy;
uniform float scale_modifier;
uniform mat4 projmatrix;
uniform mat4 viewmatrix;
uniform vec3 boxmin;
uniform vec3 boxmax;

out vec3 splat_color;
out float depth;
out float scale_modif;
out vec4 con_o;
out vec2 xy;
out vec2 pixf;
flat out uint objId;

vec3 computeCov2D(vec3 mean, float focal_x, float focal_y, float tan_fovx, float tan_fovy, float[6] cov3D, mat4 viewmatrix) {
    vec4 t = viewmatrix * vec4(mean, 1.0);

    float limx = 1.3 * tan_fovx;
    float limy = 1.3 * tan_fovy;
    float txtz = t.x / t.z;
    float tytz = t.y / t.z;
    t.x = min(limx, max(-limx, txtz)) * t.z;
    t.y = min(limy, max(-limy, tytz)) * t.z;

    mat3 J = mat3(
        focal_x / t.z, 0, -(focal_x * t.x) / (t.z * t.z),
        0, focal_y / t.z, -(focal_y * t.y) / (t.z * t.z),
        0, 0, 0
    );

    mat3 W =  mat3(
        viewmatrix[0][0], viewmatrix[1][0], viewmatrix[2][0],
        viewmatrix[0][1], viewmatrix[1][1], viewmatrix[2][1],
        viewmatrix[0][2], viewmatrix[1][2], viewmatrix[2][2]
    );

    mat3 T = W * J;

    mat3 Vrk = mat3(
        cov3D[0], cov3D[1], cov3D[2],
        cov3D[1], cov3D[3], cov3D[4],
        cov3D[2], cov3D[4], cov3D[5]
    );

    mat3 cov = transpose(T) * transpose(Vrk) * T;

    cov[0][0] += .3;
    cov[1][1] += .3;
    return vec3(cov[0][0], cov[0][1], cov[1][1]);
}

float ndc2Pix(float v, float S) {
    return ((v + 1.) * S - 1.) * .5;
}

#define hash33(p) fract(sin( (p) * mat3( 127.1,311.7,74.7 , 269.5,183.3,246.1 , 113.5,271.9,124.6) ) *43758.5453123)

// Original CUDA implementation: https://github.com/graphdeco-inria/diff-gaussian-rasterization/blob/main/cuda_rasterizer/forward.cu#L156
void main() {
    vec3 p_orig = a_center;

    // Discard splats outside of the scene bounding box (should not happen)
    // if (p_orig.x < boxmin.x || p_orig.y < boxmin.y || p_orig.z < boxmin.z ||
    //     p_orig.x > boxmax.x || p_orig.y > boxmax.y || p_orig.z > boxmax.z) {
    //         gl_Position = vec4(0, 0, 0, 1);
    //         return;
    //     }

    // Transform point by projecting
    vec4 p_hom = projmatrix * vec4(p_orig, 1);
    float p_w = 1. / (p_hom.w + 1e-7);
    vec3 p_proj = p_hom.xyz * p_w;

    // Perform near culling, quit if outside.
    vec4 p_view = viewmatrix * vec4(p_orig, 1);
    if (p_view.z <= .4) {
        gl_Position = vec4(0, 0, 0, 1);
        return;
    }

    // (Webgl-specific) The covariance matrix is pre-computed on the CPU for faster performance
    float cov3D[6] = float[6](a_covA.x, a_covA.y, a_covA.z, a_covB.x, a_covB.y, a_covB.z);
    // computeCov3D(a_scale, scale_modifier, a_rot, cov3D);

    // Compute 2D screen-space covariance matrix
    vec3 cov = computeCov2D(p_orig, focal_x, focal_y, tan_fovx, tan_fovy, cov3D, viewmatrix);

    // Invert covariance (EWA algorithm)
    float det = (cov.x * cov.z - cov.y * cov.y);
    if (det == 0.) {
        gl_Position = vec4(0, 0, 0, 1);
        return;
    }
    float det_inv = 1. / det;
    vec3 conic = vec3(cov.z, -cov.y, cov.x) * det_inv;

    // Compute extent in screen space (by finding eigenvalues of
    // 2D covariance matrix). Use extent to compute the bounding
    // rectangle of the splat in screen space.

    float mid = 0.5 * (cov.x + cov.z);
    float lambda1 = mid + sqrt(max(0.1, mid * mid - det));
    float lambda2 = mid - sqrt(max(0.1, mid * mid - det));
    float my_radius = ceil(3. * sqrt(max(lambda1, lambda2)));
    vec2 point_image = vec2(ndc2Pix(p_proj.x, W), ndc2Pix(p_proj.y, H));

    // (Webgl-specific) As the covariance matrix is calculated as a one-time operation on CPU in this implementation,
    // we need to apply the scale modifier differently to still allow for real-time scaling of the splats.
    my_radius *= .15 + scale_modifier * .85;
    scale_modif = 1. / scale_modifier;

    // (Webgl-specific) Convert gl_VertexID from [0,1,2,3] to [-1,-1],[1,-1],[-1,1],[1,1]
    vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) - 1.;
    // Vertex position in screen space
    vec2 screen_pos = point_image + my_radius * corner;

    // Store some useful helper data for the fragment stage
    splat_color = a_col;
    con_o = vec4(conic, a_opacity);
    xy = point_image;
    pixf = screen_pos;
    depth = p_view.z;
    objId = a_objId;

    // (Webgl-specific) Convert from screen-space to clip-space
    vec2 clip_pos = screen_pos / vec2(W, H) * 2. - 1.;

    gl_Position = vec4(clip_pos, 0, 1);
}`,xt=`#version 300 es
precision highp float;

// time
uniform float time;

// which object is selected
uniform uint selectedObjectId;

// 0 = render all objects
// 1 = render only selected object
// 2 = highlight selected object
uniform uint selectedObjectRenderMode;

in vec3 splat_color;
in float scale_modif;
in float depth;
in vec4 con_o;
in vec2 xy;
in vec2 pixf;
flat in uint objId;

layout(location=0) out vec4 fragColor;
layout(location=1) out vec4 fragInvDepth;

vec3 depth_palette(float x) { 
    x = min(1., x);
    return vec3( sin(x*6.28/4.), x*x, mix(sin(x*6.28),x,.6) );
}

// Original CUDA implementation: https://github.com/graphdeco-inria/diff-gaussian-rasterization/blob/main/cuda_rasterizer/forward.cu#L263
void main() {

    // discard splats with wrong objectId
    if (selectedObjectRenderMode == 1u && objId != selectedObjectId) {
        discard;
    }

    // highlight selected object
    vec3 color = splat_color;
    if (selectedObjectRenderMode == 2u && objId == selectedObjectId) {
      color = mix(splat_color, vec3(1.0, 0.0, 0.0), 0.1*mod(time + gl_FragCoord.x/10.0 + gl_FragCoord.y/10.0, 1.0));
    }

    // Resample using conic matrix (cf. "Surface 
    // Splatting" by Zwicker et al., 2001)
    vec2 d = xy - pixf;
    float power = -0.5 * (con_o.x * d.x * d.x + con_o.z * d.y * d.y) - con_o.y * d.x * d.y;

    if (power > 0.) {
        discard;
    }

    // (Custom) As the covariance matrix is calculated in a one-time operation on CPU in this implementation,
    // we need to apply the scale modifier differently to still allow for real-time scaling of the splats.
    power *= scale_modif;

    // Eq. (2) from 3D Gaussian splatting paper.
    float alpha = min(.99f, con_o.w * exp(power));
    
    if (alpha < 1./255.) {
        discard;
    }

    float col_alpha = alpha;

    // with depth we want to avoid including the depth value of faint splats
    float depth_alpha = alpha*float(alpha > 50./255.);

    // Eq. (3) from 3D Gaussian splatting paper.
    fragColor = vec4(color * col_alpha, col_alpha);
    fragInvDepth = vec4(vec3(1.0/depth) * depth_alpha, depth_alpha);
}`,bt=(s,r)=>{s[r+0]=-s[r+0],s[r+4]=-s[r+4],s[r+8]=-s[r+8],s[r+12]=-s[r+12]},S=s=>{const r=W(s);return bt(r,2),r},N=s=>W(s);class Et{constructor(r){this.sortWorkerBusy=!1,this.lastSortedViewProjMatrix=null,this.sceneGraph=new Map,this.processed_scenegraph=null,this.needs_rebuild=!0,this.get_xsize=()=>this.xsize,this.get_ysize=()=>this.ysize,this.getObject=t=>this.sceneGraph.get(t),this.addObject=(t,e,o,n,h)=>{this.sceneGraph.set(t,{translation:e,rotation:o,object:h,scale:n}),this.needs_rebuild=!0},this.setPositionObject=(t,e)=>{const o=this.sceneGraph.get(t);if(o===void 0)throw Error(`Object with id ${t} does not exist`);o.translation=e,this.needs_rebuild=!0},this.setRotationObject=(t,e)=>{const o=this.sceneGraph.get(t);if(o===void 0)throw Error(`Object with id ${t} does not exist`);o.rotation=e,this.needs_rebuild=!0},this.setScaleObject=(t,e)=>{const o=this.sceneGraph.get(t);if(o===void 0)throw Error(`Object with id ${t} does not exist`);o.scale=e,this.needs_rebuild=!0},this.removeObject=t=>{this.sceneGraph.delete(t),this.needs_rebuild=!0},this.doWorkerSort=t=>{this.sortWorkerBusy=!0,this.lastSortedViewProjMatrix=t,this.sortWorker.postMessage({viewMatrix:this.lastSortedViewProjMatrix,sortingAlgorithm:"count sort",sceneGraph:this.sceneGraph})},this.recieveUpdatedGaussianData=t=>{const e=(o,n)=>{this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,n,this.gl.STATIC_DRAW)};e(this.buffers.color,t.colors),e(this.buffers.center,t.positions),e(this.buffers.opacity,t.opacities),e(this.buffers.covA,t.cov3Da),e(this.buffers.covB,t.cov3Db),e(this.buffers.objId,t.objectIds),this.processed_scenegraph=t},this.renderDepths=t=>{const e=new Map;this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.gl.viewport(0,0,this.xsize,this.ysize),this.gl.useProgram(this.program),this.gl.disable(this.gl.DEPTH_TEST),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.ONE_MINUS_DST_ALPHA,this.gl.ONE),this.gl.bindVertexArray(this.vao);const o=this.xsize,n=this.ysize,h=Math.tan(t.fov()*.5),a=h*o/n,c=n/(2*h),u=o/(2*a),_=t.viewMatrix(),R=t.viewProjMatrix(o,n);this.gl.uniform1f(this.wLoc,o),this.gl.uniform1f(this.hLoc,n),this.gl.uniform1f(this.focalXLoc,u),this.gl.uniform1f(this.focalYLoc,c),this.gl.uniform1f(this.tanFovXLoc,a),this.gl.uniform1f(this.tanFovYLoc,h),this.gl.uniform1f(this.scaleModifierLoc,1),this.gl.uniformMatrix4fv(this.viewMatrixLoc,!1,S(_)),this.gl.uniformMatrix4fv(this.projMatrixLoc,!1,N(R)),this.gl.uniform1ui(this.selectedObjectRenderModeLoc,1),this.gl.uniform1f(this.timeLoc,performance.now()/1e3);for(const M of this.sceneGraph.keys()){const y=new Float32Array(o*n*4);this.gl.uniform1ui(this.selectedObjectIdLoc,M),this.processed_scenegraph&&(this.gl.uniform3fv(this.boxMinLoc,this.processed_scenegraph.sceneMin),this.gl.uniform3fv(this.boxMaxLoc,this.processed_scenegraph.sceneMax),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0,this.gl.COLOR_ATTACHMENT1]),this.gl.drawArraysInstanced(this.gl.TRIANGLE_STRIP,0,4,this.processed_scenegraph.count),this.gl.readBuffer(this.gl.COLOR_ATTACHMENT1),this.gl.readPixels(0,0,o,n,this.gl.RGBA,this.gl.FLOAT,y)),e.set(M,y)}return e},this.render=(t,e)=>{this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.gl.viewport(0,0,this.xsize,this.ysize),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.disable(this.gl.DEPTH_TEST),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.ONE_MINUS_DST_ALPHA,this.gl.ONE),this.gl.bindVertexArray(this.vao);const o=this.xsize,n=this.ysize,h=Math.tan(t.fov()*.5),a=h*o/n,c=n/(2*h),u=o/(2*a),_=t.viewMatrix(),R=t.viewProjMatrix(o,n);e!==null?(this.gl.uniform1ui(this.selectedObjectIdLoc,e),this.gl.uniform1ui(this.selectedObjectRenderModeLoc,2)):(this.gl.uniform1ui(this.selectedObjectIdLoc,0),this.gl.uniform1ui(this.selectedObjectRenderModeLoc,0)),this.gl.uniform1f(this.wLoc,o),this.gl.uniform1f(this.hLoc,n),this.gl.uniform1f(this.focalXLoc,u),this.gl.uniform1f(this.focalYLoc,c),this.gl.uniform1f(this.tanFovXLoc,a),this.gl.uniform1f(this.tanFovYLoc,h),this.gl.uniform1f(this.scaleModifierLoc,1),this.gl.uniformMatrix4fv(this.viewMatrixLoc,!1,S(_)),this.gl.uniformMatrix4fv(this.projMatrixLoc,!1,N(R)),this.gl.uniform1f(this.timeLoc,performance.now()/1e3),this.processed_scenegraph&&(this.gl.uniform3fv(this.boxMinLoc,this.processed_scenegraph.sceneMin),this.gl.uniform3fv(this.boxMaxLoc,this.processed_scenegraph.sceneMax),this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0,this.gl.COLOR_ATTACHMENT1]),this.gl.drawArraysInstanced(this.gl.TRIANGLE_STRIP,0,4,this.processed_scenegraph.count))},this.update=t=>{let e=this.needs_rebuild;const o=t.viewProjMatrix(this.gl.canvas.width,this.gl.canvas.height);this.processed_scenegraph&&this.lastSortedViewProjMatrix&&at(ht(j(),o,this.lastSortedViewProjMatrix))>.1&&(e=!0),e&&!this.sortWorkerBusy&&(this.doWorkerSort(o),this.needs_rebuild=!1)},this.cleanup=()=>{this.sortWorker.terminate(),this.gl.deleteFramebuffer(this.fbo),this.gl.deleteTexture(this.col_tex),this.gl.deleteTexture(this.inv_depth_tex),this.gl.deleteProgram(this.program),this.gl.deleteBuffer(this.buffers.color),this.gl.deleteBuffer(this.buffers.center),this.gl.deleteBuffer(this.buffers.opacity),this.gl.deleteBuffer(this.buffers.covA),this.gl.deleteBuffer(this.buffers.covB),this.gl.deleteBuffer(this.buffers.objId)},this.gl=r,this.program=O(this.gl,[T(this.gl,this.gl.VERTEX_SHADER,mt),T(this.gl,this.gl.FRAGMENT_SHADER,xt)]),this.gl.useProgram(this.program);const i=(t,e,o)=>{const n=this.gl.getAttribLocation(this.program,t),h=this.gl.createBuffer();if(I(h!==null,"Failed to create buffer"),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.enableVertexAttribArray(n),e===this.gl.UNSIGNED_INT)this.gl.vertexAttribIPointer(n,o,e,0,0);else if(e===this.gl.FLOAT)this.gl.vertexAttribPointer(n,o,e,!1,0,0);else throw Error("ptr_type not supported");return this.gl.vertexAttribDivisor(n,1),h};this.vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.vao),this.buffers={color:i("a_col",this.gl.FLOAT,3),center:i("a_center",this.gl.FLOAT,3),opacity:i("a_opacity",this.gl.FLOAT,1),covA:i("a_covA",this.gl.FLOAT,3),covB:i("a_covB",this.gl.FLOAT,3),objId:i("a_objId",this.gl.UNSIGNED_INT,1)},this.wLoc=this.gl.getUniformLocation(this.program,"W"),this.hLoc=this.gl.getUniformLocation(this.program,"H"),this.focalXLoc=this.gl.getUniformLocation(this.program,"focal_x"),this.focalYLoc=this.gl.getUniformLocation(this.program,"focal_y"),this.tanFovXLoc=this.gl.getUniformLocation(this.program,"tan_fovx"),this.tanFovYLoc=this.gl.getUniformLocation(this.program,"tan_fovy"),this.scaleModifierLoc=this.gl.getUniformLocation(this.program,"scale_modifier"),this.projMatrixLoc=this.gl.getUniformLocation(this.program,"projmatrix"),this.viewMatrixLoc=this.gl.getUniformLocation(this.program,"viewmatrix"),this.boxMinLoc=this.gl.getUniformLocation(this.program,"boxmin"),this.boxMaxLoc=this.gl.getUniformLocation(this.program,"boxmax"),this.timeLoc=this.gl.getUniformLocation(this.program,"time"),this.selectedObjectRenderModeLoc=this.gl.getUniformLocation(this.program,"selectedObjectRenderMode"),this.selectedObjectIdLoc=this.gl.getUniformLocation(this.program,"selectedObjectId"),this.xsize=this.gl.canvas.width,this.ysize=this.gl.canvas.height,this.fbo=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.col_tex=V(this.gl,this.xsize,this.ysize),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.col_tex,0),this.inv_depth_tex=Y(this.gl,this.xsize,this.ysize,new Float32Array(this.xsize*this.ysize*4)),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT1,this.gl.TEXTURE_2D,this.inv_depth_tex,0),this.sortWorker=new Worker(new URL("/assets/sortWorker-BSP3PoiM.js",import.meta.url),{type:"module"}),this.sortWorker.onmessage=t=>{this.sortWorkerBusy=!1,this.recieveUpdatedGaussianData(t.data.data)}}}const Tt=`#version 300 es
layout(location=0) in vec3 a_position;
layout(location=1) in vec3 a_color;

uniform mat4 u_view;
uniform mat4 u_view_proj;

out vec3 v_color;
out float v_depth;

void main() {
  vec4 pos = u_view * vec4(a_position, 1);
  v_depth = pos.z/pos.w;
  v_color = a_color;
  gl_Position = u_view_proj * vec4(a_position, 1);
}`,Rt=`#version 300 es
precision highp float;

in vec3 v_color;
in float v_depth;

layout(location = 0) out vec4 outColor;
layout(location = 1) out vec4 outInvDepth;

void main() {
  outColor = vec4(v_color, 1);
  outInvDepth = vec4(vec3(1.0/v_depth), 1);
}`;class Lt{constructor(r){this.get_xsize=()=>this.xsize,this.get_ysize=()=>this.ysize,this.objects=new Map,this.needs_rebuild=!0,this.buildBuffers=t=>{const e=t.reduce((a,c)=>a+c.vertexes.length,0),o=new Float32Array(e*3),n=new Float32Array(e*3);let h=0;for(const a of t){const c=ct(j(),a.rotation,a.translation,p(a.scale,a.scale,a.scale));for(const u of a.vertexes)o.set(lt(H(),u.position,c),h*3),n.set(u.color,h*3),h+=1}return[o,n,e]},this.update=()=>{if(this.needs_rebuild){const t=[],e=[];for(const _ of this.objects.values())_.kind==="triangle"?t.push(_):_.kind==="line"&&e.push(_);const[o,n,h]=this.buildBuffers(t),[a,c,u]=this.buildBuffers(e);this.gl.bindVertexArray(this.tri_vao),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.tri_positionBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,o,this.gl.STATIC_DRAW),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.tri_colorBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,n,this.gl.STATIC_DRAW),this.tri_n_vertexes=h,this.gl.bindVertexArray(this.line_vao),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.line_positionBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,a,this.gl.STATIC_DRAW),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.line_colorBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,c,this.gl.STATIC_DRAW),this.line_n_vertexes=u,this.needs_rebuild=!1}},this.addObject=(t,e)=>{this.objects.set(t,e),this.needs_rebuild=!0},this.setPositionObject=(t,e)=>{const o=this.objects.get(t);if(o===void 0)throw Error(`Object with id ${t} does not exist`);o.translation=e,this.needs_rebuild=!0},this.setRotationObject=(t,e)=>{const o=this.objects.get(t);if(o===void 0)throw Error(`Object with id ${t} does not exist`);o.rotation=e,this.needs_rebuild=!0},this.setScaleObject=(t,e)=>{const o=this.objects.get(t);if(o===void 0)throw Error(`Object with id ${t} does not exist`);o.scale=e,this.needs_rebuild=!0},this.removeObject=t=>{this.objects.delete(t),this.needs_rebuild=!0},this.render=t=>{this.gl.disable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.useProgram(this.program),this.gl.uniformMatrix4fv(this.viewLoc,!1,S(t.viewMatrix())),this.gl.uniformMatrix4fv(this.viewProjLoc,!1,N(t.viewProjMatrix(this.xsize,this.ysize))),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0,this.gl.COLOR_ATTACHMENT1]),this.gl.clear(this.gl.DEPTH_BUFFER_BIT|this.gl.COLOR_BUFFER_BIT),this.gl.viewport(0,0,this.xsize,this.ysize),this.gl.bindVertexArray(this.tri_vao),this.gl.drawArrays(this.gl.TRIANGLES,0,this.tri_n_vertexes),this.gl.bindVertexArray(this.line_vao),this.gl.drawArrays(this.gl.LINES,0,this.line_n_vertexes)},this.gl=r,this.program=O(this.gl,[T(this.gl,this.gl.VERTEX_SHADER,Tt),T(this.gl,this.gl.FRAGMENT_SHADER,Rt)]),this.gl.useProgram(this.program);const i=(t,e)=>{const o=this.gl.getAttribLocation(this.program,t),n=this.gl.createBuffer();return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.enableVertexAttribArray(o),this.gl.vertexAttribPointer(o,e,this.gl.FLOAT,!1,0,0),n};this.tri_vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.tri_vao),this.tri_n_vertexes=0,this.tri_positionBuffer=i("a_position",3),this.tri_colorBuffer=i("a_color",3),this.line_vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.line_vao),this.line_n_vertexes=0,this.line_positionBuffer=i("a_position",3),this.line_colorBuffer=i("a_color",3),this.viewLoc=this.gl.getUniformLocation(this.program,"u_view"),this.viewProjLoc=this.gl.getUniformLocation(this.program,"u_view_proj"),this.xsize=this.gl.canvas.width,this.ysize=this.gl.canvas.height,this.fbo=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.col_tex=V(this.gl,this.xsize,this.ysize),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.col_tex,0),this.inv_depth_tex=Y(this.gl,this.xsize,this.ysize,new Float32Array(this.xsize*this.ysize*4)),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT1,this.gl.TEXTURE_2D,this.inv_depth_tex,0),this.webgl_depth_tex=dt(this.gl,this.xsize,this.ysize,new Float32Array(this.xsize*this.ysize)),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.webgl_depth_tex,0)}}const At=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}`,yt=`#version 300 es
precision highp float;
precision highp sampler2D;

// texture 0
uniform sampler2D u_render_tex0;
uniform sampler2D u_inv_depth_tex0;
// texture 1
uniform sampler2D u_render_tex1;
uniform sampler2D u_inv_depth_tex1;

in vec2 v_texCoord;
out vec4 v_outColor;

void main() {
  float inv_depth0 = texture(u_inv_depth_tex0, v_texCoord).r;
  float inv_depth1 = texture(u_inv_depth_tex1, v_texCoord).r;

  if (inv_depth0 > inv_depth1) {
    v_outColor = texture(u_render_tex0, v_texCoord);
  } else {
    v_outColor = texture(u_render_tex1, v_texCoord);
  }
}`;class wt{constructor(r){this.render=(t,e,o,n)=>{this.gl.useProgram(this.program),this.gl.bindVertexArray(this.vao),this.gl.viewport(0,0,this.xsize,this.ysize),this.gl.uniform1i(this.renderTex0Loc,0),this.gl.uniform1i(this.invDepthTex0Loc,1),this.gl.uniform1i(this.renderTex1Loc,2),this.gl.uniform1i(this.invDepthTex1Loc,3),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,o),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,n),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)},this.gl=r,this.program=O(this.gl,[T(this.gl,this.gl.VERTEX_SHADER,At),T(this.gl,this.gl.FRAGMENT_SHADER,yt)]),this.gl.useProgram(this.program);const i=(t,e)=>{const o=this.gl.getAttribLocation(this.program,t),n=this.gl.createBuffer();return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.enableVertexAttribArray(o),this.gl.vertexAttribPointer(o,e,this.gl.FLOAT,!1,0,0),n};this.vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.vao),this.positionBuffer=i("a_position",2),r.bufferData(r.ARRAY_BUFFER,q,r.STATIC_DRAW),this.renderTex0Loc=this.gl.getUniformLocation(this.program,"u_render_tex0"),this.invDepthTex0Loc=this.gl.getUniformLocation(this.program,"u_inv_depth_tex0"),this.renderTex1Loc=this.gl.getUniformLocation(this.program,"u_render_tex1"),this.invDepthTex1Loc=this.gl.getUniformLocation(this.program,"u_inv_depth_tex1"),this.xsize=this.gl.canvas.width,this.ysize=this.gl.canvas.height}}const jt=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}`,Mt=`#version 300 es
precision highp float;
precision highp sampler2D;

// the rendered texture
uniform sampler2D u_render_tex;

in vec2 v_texCoord;
out vec4 v_outColor;

void main() {
  v_outColor = vec4(texture(u_render_tex, v_texCoord).rgb, 1.0);
}`;function Dt(s){switch(s){case"x":return 0;case"y":return 1;case"z":return 2;default:throw Error("Invalid axis")}}function Ft(s){switch(s){case"x":return p(1,0,0);case"y":return p(0,1,0);case"z":return p(0,0,1);default:throw Error("Invalid axis")}}class zt extends E.Component{constructor(r){super(r),this.canvas=E.createRef(),this.gsEngineColorViz=E.createRef(),this.gsEngineDepthViz=E.createRef(),this.overlayEngineColorViz=E.createRef(),this.overlayEngineDepthViz=E.createRef(),this.fileInput=E.createRef(),this.interface_state={kind:"idle"},this.interface_inputs=[],this.setupVizCanvas=i=>{const t=i.getContext("webgl2"),e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,q,t.STATIC_DRAW);const o=O(t,[T(t,t.VERTEX_SHADER,jt),T(t,t.FRAGMENT_SHADER,Mt)]),n=t.getAttribLocation(o,"a_position");t.enableVertexAttribArray(n),t.vertexAttribPointer(n,2,this.gl.FLOAT,!1,0,0);const h=t.getUniformLocation(o,"u_render_tex"),a=V(t,this.props.width,this.props.height);return{gl:t,program:o,texLoc:h,tex:a}},this.visualizeTexture=(i,t)=>{const e=i.gl;e.useProgram(i.program),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,i.tex),e.uniform1i(i.texLoc,0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.props.width,this.props.height,0,e.RGBA,e.UNSIGNED_BYTE,t),e.clear(e.DEPTH_BUFFER_BIT|e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,6)},this.convertRGBA32Tex=i=>{const t=new Uint8Array(i.length);for(let e=0;e<i.length;e++)t[e]=Math.floor(i[e]*255);return t},this.handleFileInputChange=async()=>{var t,e;const i=(e=(t=this.fileInput.current)==null?void 0:t.files)==null?void 0:e[0];i&&this.gsRendererEngine.addObject(Math.floor(Math.random()*4294967295),p(0,0,0),d(),1,gt(await i.arrayBuffer()))},this.getNearestObjectAt=i=>{const t=Math.floor(i[0])+Math.floor(this.gsRendererEngine.get_ysize()-i[1])*this.gsRendererEngine.get_xsize(),e=this.gsRendererEngine.renderDepths(this.camera);let o=0,n=null;for(const[h,a]of e){const c=a[4*t];c>o&&(o=c,n=h)}return n},this.animationLoop=()=>{this.camera.update(),this.gsRendererEngine.update(this.camera),this.overlayEngine.update();for(const h of this.interface_inputs)switch(h.kind){case"mouseclick":{switch(this.interface_state.kind){case"idle":{const a=this.getNearestObjectAt(h.location);a!==null&&(this.interface_state={kind:"selected_object_interface",selected_object_id:a,selected_object_state:{kind:"idle"},last_mouse_pos:h.location});break}case"selected_object_interface":{const a=this.getNearestObjectAt(h.location);a===this.interface_state.selected_object_id||a!==null&&(this.interface_state={kind:"selected_object_interface",selected_object_id:a,selected_object_state:{kind:"idle"},last_mouse_pos:h.location});break}}break}case"keydown":{switch(this.interface_state.kind){case"selected_object_interface":{switch(h.key){case"r":{this.interface_state.selected_object_state={kind:"rotate"},this.overlayEngine.removeObject(this.interface_state.selected_object_id);let a=this.gsRendererEngine.getObject(this.interface_state.selected_object_id);this.overlayEngine.addObject(this.interface_state.selected_object_id,{kind:"line",translation:a.translation,rotation:a.rotation,scale:a.scale,vertexes:k(4)});break}case"g":{this.interface_state.selected_object_state={kind:"translate"},this.overlayEngine.removeObject(this.interface_state.selected_object_id);let a=this.gsRendererEngine.getObject(this.interface_state.selected_object_id);this.overlayEngine.addObject(this.interface_state.selected_object_id,{kind:"line",translation:a.translation,rotation:d(),scale:a.scale,vertexes:k(4)});break}case"s":{this.interface_state.selected_object_state={kind:"scale",mouse_start:this.interface_state.last_mouse_pos,scale_start:1},this.overlayEngine.removeObject(this.interface_state.selected_object_id);let a=this.gsRendererEngine.getObject(this.interface_state.selected_object_id);this.overlayEngine.addObject(this.interface_state.selected_object_id,{kind:"line",translation:a.translation,rotation:d(),scale:a.scale,vertexes:k(4)});break}case"x":case"y":case"z":{const a=h.key;this.interface_state.selected_object_state.kind==="rotate"?this.interface_state.selected_object_state={kind:"rotate_with_axis",axis:a,quat_start:this.gsRendererEngine.getObject(this.interface_state.selected_object_id).rotation,mouse_start:this.interface_state.last_mouse_pos}:this.interface_state.selected_object_state.kind==="translate"&&(this.interface_state.selected_object_state={kind:"translate_with_axis",axis:a,pos_start:this.gsRendererEngine.getObject(this.interface_state.selected_object_id).translation,mouse_start:this.interface_state.last_mouse_pos});break}case"Escape":{switch(this.interface_state.selected_object_state.kind){case"scale":case"rotate_with_axis":case"translate_with_axis":case"rotate":case"translate":{this.interface_state.selected_object_state={kind:"idle"},this.overlayEngine.removeObject(this.interface_state.selected_object_id);break}case"idle":{this.interface_state={kind:"idle"};break}}break}default:{console.log("unhandled key",h.key);break}}break}}break}case"mousemove":{switch(this.interface_state.kind){case"selected_object_interface":{switch(this.interface_state.last_mouse_pos=h.location,this.interface_state.selected_object_state.kind){case"rotate_with_axis":{if(this.interface_state.selected_object_state.axis!==null){const a=C(P(),h.location,this.interface_state.selected_object_state.mouse_start),c=rt(d(),Ft(this.interface_state.selected_object_state.axis),a[0]*.02);this.gsRendererEngine.setRotationObject(this.interface_state.selected_object_id,w(d(),this.interface_state.selected_object_state.quat_start,c)),this.overlayEngine.setRotationObject(this.interface_state.selected_object_id,w(d(),this.interface_state.selected_object_state.quat_start,c))}break}case"translate_with_axis":{if(this.interface_state.selected_object_state.axis!==null){const a=C(P(),h.location,this.interface_state.selected_object_state.mouse_start),c=ot(this.interface_state.selected_object_state.pos_start);c[Dt(this.interface_state.selected_object_state.axis)]+=a[0]*.01,this.gsRendererEngine.setPositionObject(this.interface_state.selected_object_id,c),this.overlayEngine.setPositionObject(this.interface_state.selected_object_id,c)}break}case"scale":{const a=C(P(),h.location,this.interface_state.selected_object_state.mouse_start),c=this.interface_state.selected_object_state.scale_start+a[0]*.01;this.gsRendererEngine.setScaleObject(this.interface_state.selected_object_id,c),this.overlayEngine.setScaleObject(this.interface_state.selected_object_id,c);break}}break}}break}}this.interface_inputs=[];const i=this.interface_state.kind==="selected_object_interface"?this.interface_state.selected_object_id:null;this.gsRendererEngine.render(this.camera,i);const t=new Uint8Array(this.gsRendererEngine.get_xsize()*this.gsRendererEngine.get_ysize()*4);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.gsRendererEngine.fbo),this.gl.readBuffer(this.gl.COLOR_ATTACHMENT0),this.gl.readPixels(0,0,this.gsRendererEngine.get_xsize(),this.gsRendererEngine.get_ysize(),this.gl.RGBA,this.gl.UNSIGNED_BYTE,t);const e=new Float32Array(this.gsRendererEngine.get_xsize()*this.gsRendererEngine.get_ysize()*4);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.gsRendererEngine.fbo),this.gl.readBuffer(this.gl.COLOR_ATTACHMENT1),this.gl.readPixels(0,0,this.gsRendererEngine.get_xsize(),this.gsRendererEngine.get_ysize(),this.gl.RGBA,this.gl.FLOAT,e),this.visualizeTexture(this.gsColorVizData,t),this.visualizeTexture(this.gsDepthVizData,this.convertRGBA32Tex(e)),this.overlayEngine.render(this.camera);const o=new Uint8Array(this.overlayEngine.get_xsize()*this.overlayEngine.get_ysize()*4);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.overlayEngine.fbo),this.gl.readBuffer(this.gl.COLOR_ATTACHMENT0),this.gl.readPixels(0,0,this.overlayEngine.get_xsize(),this.overlayEngine.get_ysize(),this.gl.RGBA,this.gl.UNSIGNED_BYTE,o);const n=new Float32Array(this.overlayEngine.get_xsize()*this.overlayEngine.get_ysize()*4);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.overlayEngine.fbo),this.gl.readBuffer(this.gl.COLOR_ATTACHMENT1),this.gl.readPixels(0,0,this.overlayEngine.get_xsize(),this.overlayEngine.get_ysize(),this.gl.RGBA,this.gl.FLOAT,n),this.visualizeTexture(this.overlayColorVizData,o),this.visualizeTexture(this.overlayDepthVizData,this.convertRGBA32Tex(n)),this.compositor.render(this.gsRendererEngine.col_tex,this.gsRendererEngine.inv_depth_tex,this.overlayEngine.col_tex,this.overlayEngine.inv_depth_tex),this.requestID=window.requestAnimationFrame(this.animationLoop)}}componentDidMount(){const r=this.canvas.current;this.camera=new _t(r,{rotation:nt(d(),0,.001,0)}),this.gl=r.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float"),this.gl.getExtension("EXT_float_blend"),this.gsRendererEngine=new Et(this.gl),this.overlayEngine=new Lt(this.gl),this.compositor=new wt(this.gl),this.gsColorVizData=this.setupVizCanvas(this.gsEngineColorViz.current),this.gsDepthVizData=this.setupVizCanvas(this.gsEngineDepthViz.current),this.overlayColorVizData=this.setupVizCanvas(this.overlayEngineColorViz.current),this.overlayDepthVizData=this.setupVizCanvas(this.overlayEngineDepthViz.current),this.cmt=new pt(r),this.cmt.addMouseClickListener(i=>this.interface_inputs.push({kind:"mouseclick",location:i})),this.cmt.addMouseMoveListener(i=>this.interface_inputs.push({kind:"mousemove",location:i})),this.cmt.addKeyDownListener(i=>this.interface_inputs.push({kind:"keydown",key:i})),this.requestID=window.requestAnimationFrame(this.animationLoop)}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.camera.cleanup()}render(){return v.jsxs(v.Fragment,{children:[v.jsx("canvas",{tabIndex:0,style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.height,width:this.props.width}),v.jsx("br",{}),v.jsx("canvas",{style:this.props.style,className:this.props.className,ref:this.gsEngineColorViz,height:this.props.height,width:this.props.width}),v.jsx("canvas",{style:this.props.style,className:this.props.className,ref:this.gsEngineDepthViz,height:this.props.height,width:this.props.width}),v.jsx("canvas",{style:this.props.style,className:this.props.className,ref:this.overlayEngineColorViz,height:this.props.height,width:this.props.width}),v.jsx("canvas",{style:this.props.style,className:this.props.className,ref:this.overlayEngineDepthViz,height:this.props.height,width:this.props.width}),v.jsx("input",{ref:this.fileInput,type:"file",accept:".ply",onChange:this.handleFileInputChange})]})}}Z.createRoot(document.getElementById("root")).render(v.jsx(E.StrictMode,{children:v.jsx(zt,{width:400,height:400})}));
