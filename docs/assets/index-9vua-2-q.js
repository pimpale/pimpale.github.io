function Vn(){return{blue:"#458588",indigo:"#6610f2",purple:"#b16286",pink:"#fb4934",red:"#dc3545",orange:"#d65d0e",yellow:"#d79921",green:"#98971a",teal:"#689d6a",cyan:"#8ec07c",fg0:"#fbf1c7",fg1:"#ebdbb2",fg2:"#d5c4a1",fg3:"#bdae93",gray:"#a89984",bg4:"#7c6f64",bg2:"#504945",bg1:"#3c3836",bg0:"#282828",bg0_h:"#1d2021",black:"#000000"}}const F=(e,t=0,n=1)=>ve(Ae(t,e),n),Me=e=>{e._clipped=!1,e._unclipped=e.slice(0);for(let t=0;t<=3;t++)t<3?((e[t]<0||e[t]>255)&&(e._clipped=!0),e[t]=F(e[t],0,255)):t===3&&(e[t]=F(e[t],0,1));return e},Se={};for(let e of["Boolean","Number","String","Function","Array","Date","RegExp","Undefined","Null"])Se[`[object ${e}]`]=e.toLowerCase();function N(e){return Se[Object.prototype.toString.call(e)]||"object"}const x=(e,t=null)=>e.length>=3?Array.prototype.slice.call(e):N(e[0])=="object"&&t?t.split("").filter(n=>e[0][n]!==void 0).map(n=>e[0][n]):e[0],ce=e=>{if(e.length<2)return null;const t=e.length-1;return N(e[t])=="string"?e[t].toLowerCase():null},{PI:oe,min:ve,max:Ae}=Math,O=oe*2,le=oe/3,bt=oe/180,dt=180/oe,m={format:{},autodetect:[]};class i{constructor(...t){const n=this;if(N(t[0])==="object"&&t[0].constructor&&t[0].constructor===this.constructor)return t[0];let r=ce(t),f=!1;if(!r){f=!0,m.sorted||(m.autodetect=m.autodetect.sort((c,o)=>o.p-c.p),m.sorted=!0);for(let c of m.autodetect)if(r=c.test(...t),r)break}if(m.format[r]){const c=m.format[r].apply(null,f?t:t.slice(0,-1));n._rgb=Me(c)}else throw new Error("unknown format: "+t);n._rgb.length===3&&n._rgb.push(1)}toString(){return N(this.hex)=="function"?this.hex():`[${this._rgb.join(",")}]`}}const ht="2.6.0",_=(...e)=>new _.Color(...e);_.Color=i;_.version=ht;const pt=(...e)=>{e=x(e,"cmyk");const[t,n,r,f]=e,c=e.length>4?e[4]:1;return f===1?[0,0,0,c]:[t>=1?0:255*(1-t)*(1-f),n>=1?0:255*(1-n)*(1-f),r>=1?0:255*(1-r)*(1-f),c]},{max:Le}=Math,gt=(...e)=>{let[t,n,r]=x(e,"rgb");t=t/255,n=n/255,r=r/255;const f=1-Le(t,Le(n,r)),c=f<1?1/(1-f):0,o=(1-t-f)*c,s=(1-n-f)*c,l=(1-r-f)*c;return[o,s,l,f]};i.prototype.cmyk=function(){return gt(this._rgb)};_.cmyk=(...e)=>new i(...e,"cmyk");m.format.cmyk=pt;m.autodetect.push({p:2,test:(...e)=>{if(e=x(e,"cmyk"),N(e)==="array"&&e.length===4)return"cmyk"}});const ae=e=>Math.round(e*100)/100,mt=(...e)=>{const t=x(e,"hsla");let n=ce(e)||"lsa";return t[0]=ae(t[0]||0),t[1]=ae(t[1]*100)+"%",t[2]=ae(t[2]*100)+"%",n==="hsla"||t.length>3&&t[3]<1?(t[3]=t.length>3?t[3]:1,n="hsla"):t.length=3,`${n}(${t.join(",")})`},Te=(...e)=>{e=x(e,"rgba");let[t,n,r]=e;t/=255,n/=255,r/=255;const f=ve(t,n,r),c=Ae(t,n,r),o=(c+f)/2;let s,l;return c===f?(s=0,l=Number.NaN):s=o<.5?(c-f)/(c+f):(c-f)/(2-c-f),t==c?l=(n-r)/(c-f):n==c?l=2+(r-t)/(c-f):r==c&&(l=4+(t-n)/(c-f)),l*=60,l<0&&(l+=360),e.length>3&&e[3]!==void 0?[l,s,o,e[3]]:[l,s,o]},{round:ie}=Math,yt=(...e)=>{const t=x(e,"rgba");let n=ce(e)||"rgb";return n.substr(0,3)=="hsl"?mt(Te(t),n):(t[0]=ie(t[0]),t[1]=ie(t[1]),t[2]=ie(t[2]),(n==="rgba"||t.length>3&&t[3]<1)&&(t[3]=t.length>3?t[3]:1,n="rgba"),`${n}(${t.slice(0,n==="rgb"?3:4).join(",")})`)},{round:ue}=Math,xe=(...e)=>{e=x(e,"hsl");const[t,n,r]=e;let f,c,o;if(n===0)f=c=o=r*255;else{const s=[0,0,0],l=[0,0,0],u=r<.5?r*(1+n):r+n-r*n,h=2*r-u,b=t/360;s[0]=b+1/3,s[1]=b,s[2]=b-1/3;for(let d=0;d<3;d++)s[d]<0&&(s[d]+=1),s[d]>1&&(s[d]-=1),6*s[d]<1?l[d]=h+(u-h)*6*s[d]:2*s[d]<1?l[d]=u:3*s[d]<2?l[d]=h+(u-h)*(2/3-s[d])*6:l[d]=h;[f,c,o]=[ue(l[0]*255),ue(l[1]*255),ue(l[2]*255)]}return e.length>3?[f,c,o,e[3]]:[f,c,o,1]},Ie=/^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/,Ye=/^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/,Xe=/^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/,De=/^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,He=/^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/,Fe=/^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,{round:ze}=Math,Ee=e=>{e=e.toLowerCase().trim();let t;if(m.format.named)try{return m.format.named(e)}catch{}if(t=e.match(Ie)){const n=t.slice(1,4);for(let r=0;r<3;r++)n[r]=+n[r];return n[3]=1,n}if(t=e.match(Ye)){const n=t.slice(1,5);for(let r=0;r<4;r++)n[r]=+n[r];return n}if(t=e.match(Xe)){const n=t.slice(1,4);for(let r=0;r<3;r++)n[r]=ze(n[r]*2.55);return n[3]=1,n}if(t=e.match(De)){const n=t.slice(1,5);for(let r=0;r<3;r++)n[r]=ze(n[r]*2.55);return n[3]=+n[3],n}if(t=e.match(He)){const n=t.slice(1,4);n[1]*=.01,n[2]*=.01;const r=xe(n);return r[3]=1,r}if(t=e.match(Fe)){const n=t.slice(1,4);n[1]*=.01,n[2]*=.01;const r=xe(n);return r[3]=+t[4],r}};Ee.test=e=>Ie.test(e)||Ye.test(e)||Xe.test(e)||De.test(e)||He.test(e)||Fe.test(e);i.prototype.css=function(e){return yt(this._rgb,e)};_.css=(...e)=>new i(...e,"css");m.format.css=Ee;m.autodetect.push({p:5,test:(e,...t)=>{if(!t.length&&N(e)==="string"&&Ee.test(e))return"css"}});m.format.gl=(...e)=>{const t=x(e,"rgba");return t[0]*=255,t[1]*=255,t[2]*=255,t};_.gl=(...e)=>new i(...e,"gl");i.prototype.gl=function(){const e=this._rgb;return[e[0]/255,e[1]/255,e[2]/255,e[3]]};const{floor:wt}=Math,kt=(...e)=>{e=x(e,"hcg");let[t,n,r]=e,f,c,o;r=r*255;const s=n*255;if(n===0)f=c=o=r;else{t===360&&(t=0),t>360&&(t-=360),t<0&&(t+=360),t/=60;const l=wt(t),u=t-l,h=r*(1-n),b=h+s*(1-u),d=h+s*u,$=h+s;switch(l){case 0:[f,c,o]=[$,d,h];break;case 1:[f,c,o]=[b,$,h];break;case 2:[f,c,o]=[h,$,d];break;case 3:[f,c,o]=[h,b,$];break;case 4:[f,c,o]=[d,h,$];break;case 5:[f,c,o]=[$,h,b];break}}return[f,c,o,e.length>3?e[3]:1]},_t=(...e)=>{const[t,n,r]=x(e,"rgb"),f=ve(t,n,r),c=Ae(t,n,r),o=c-f,s=o*100/255,l=f/(255-o)*100;let u;return o===0?u=Number.NaN:(t===c&&(u=(n-r)/o),n===c&&(u=2+(r-t)/o),r===c&&(u=4+(t-n)/o),u*=60,u<0&&(u+=360)),[u,s,l]};i.prototype.hcg=function(){return _t(this._rgb)};_.hcg=(...e)=>new i(...e,"hcg");m.format.hcg=kt;m.autodetect.push({p:1,test:(...e)=>{if(e=x(e,"hcg"),N(e)==="array"&&e.length===3)return"hcg"}});const $t=/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,Nt=/^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,Ue=e=>{if(e.match($t)){(e.length===4||e.length===7)&&(e=e.substr(1)),e.length===3&&(e=e.split(""),e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);const t=parseInt(e,16),n=t>>16,r=t>>8&255,f=t&255;return[n,r,f,1]}if(e.match(Nt)){(e.length===5||e.length===9)&&(e=e.substr(1)),e.length===4&&(e=e.split(""),e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);const t=parseInt(e,16),n=t>>24&255,r=t>>16&255,f=t>>8&255,c=Math.round((t&255)/255*100)/100;return[n,r,f,c]}throw new Error(`unknown hex color: ${e}`)},{round:Q}=Math,Ve=(...e)=>{let[t,n,r,f]=x(e,"rgba"),c=ce(e)||"auto";f===void 0&&(f=1),c==="auto"&&(c=f<1?"rgba":"rgb"),t=Q(t),n=Q(n),r=Q(r);let s="000000"+(t<<16|n<<8|r).toString(16);s=s.substr(s.length-6);let l="0"+Q(f*255).toString(16);switch(l=l.substr(l.length-2),c.toLowerCase()){case"rgba":return`#${s}${l}`;case"argb":return`#${l}${s}`;default:return`#${s}`}};i.prototype.hex=function(e){return Ve(this._rgb,e)};_.hex=(...e)=>new i(...e,"hex");m.format.hex=Ue;m.autodetect.push({p:4,test:(e,...t)=>{if(!t.length&&N(e)==="string"&&[3,4,5,6,7,8,9].indexOf(e.length)>=0)return"hex"}});const{cos:D}=Math,xt=(...e)=>{e=x(e,"hsi");let[t,n,r]=e,f,c,o;return isNaN(t)&&(t=0),isNaN(n)&&(n=0),t>360&&(t-=360),t<0&&(t+=360),t/=360,t<1/3?(o=(1-n)/3,f=(1+n*D(O*t)/D(le-O*t))/3,c=1-(o+f)):t<2/3?(t-=1/3,f=(1-n)/3,c=(1+n*D(O*t)/D(le-O*t))/3,o=1-(f+c)):(t-=2/3,c=(1-n)/3,o=(1+n*D(O*t)/D(le-O*t))/3,f=1-(c+o)),f=F(r*f*3),c=F(r*c*3),o=F(r*o*3),[f*255,c*255,o*255,e.length>3?e[3]:1]},{min:Mt,sqrt:vt,acos:At}=Math,Et=(...e)=>{let[t,n,r]=x(e,"rgb");t/=255,n/=255,r/=255;let f;const c=Mt(t,n,r),o=(t+n+r)/3,s=o>0?1-c/o:0;return s===0?f=NaN:(f=(t-n+(t-r))/2,f/=vt((t-n)*(t-n)+(t-r)*(n-r)),f=At(f),r>n&&(f=O-f),f/=O),[f*360,s,o]};i.prototype.hsi=function(){return Et(this._rgb)};_.hsi=(...e)=>new i(...e,"hsi");m.format.hsi=xt;m.autodetect.push({p:2,test:(...e)=>{if(e=x(e,"hsi"),N(e)==="array"&&e.length===3)return"hsi"}});i.prototype.hsl=function(){return Te(this._rgb)};_.hsl=(...e)=>new i(...e,"hsl");m.format.hsl=xe;m.autodetect.push({p:2,test:(...e)=>{if(e=x(e,"hsl"),N(e)==="array"&&e.length===3)return"hsl"}});const{floor:Rt}=Math,Lt=(...e)=>{e=x(e,"hsv");let[t,n,r]=e,f,c,o;if(r*=255,n===0)f=c=o=r;else{t===360&&(t=0),t>360&&(t-=360),t<0&&(t+=360),t/=60;const s=Rt(t),l=t-s,u=r*(1-n),h=r*(1-n*l),b=r*(1-n*(1-l));switch(s){case 0:[f,c,o]=[r,b,u];break;case 1:[f,c,o]=[h,r,u];break;case 2:[f,c,o]=[u,r,b];break;case 3:[f,c,o]=[u,h,r];break;case 4:[f,c,o]=[b,u,r];break;case 5:[f,c,o]=[r,u,h];break}}return[f,c,o,e.length>3?e[3]:1]},{min:zt,max:Ct}=Math,jt=(...e)=>{e=x(e,"rgb");let[t,n,r]=e;const f=zt(t,n,r),c=Ct(t,n,r),o=c-f;let s,l,u;return u=c/255,c===0?(s=Number.NaN,l=0):(l=o/c,t===c&&(s=(n-r)/o),n===c&&(s=2+(r-t)/o),r===c&&(s=4+(t-n)/o),s*=60,s<0&&(s+=360)),[s,l,u]};i.prototype.hsv=function(){return jt(this._rgb)};_.hsv=(...e)=>new i(...e,"hsv");m.format.hsv=Lt;m.autodetect.push({p:2,test:(...e)=>{if(e=x(e,"hsv"),N(e)==="array"&&e.length===3)return"hsv"}});const j={Kn:18,Xn:.95047,Yn:1,Zn:1.08883,t0:.137931034,t1:.206896552,t2:.12841855,t3:.008856452},{pow:qt}=Math,Ze=(...e)=>{e=x(e,"lab");const[t,n,r]=e;let f,c,o,s,l,u;return c=(t+16)/116,f=isNaN(n)?c:c+n/500,o=isNaN(r)?c:c-r/200,c=j.Yn*de(c),f=j.Xn*de(f),o=j.Zn*de(o),s=be(3.2404542*f-1.5371385*c-.4985314*o),l=be(-.969266*f+1.8760108*c+.041556*o),u=be(.0556434*f-.2040259*c+1.0572252*o),[s,l,u,e.length>3?e[3]:1]},be=e=>255*(e<=.00304?12.92*e:1.055*qt(e,1/2.4)-.055),de=e=>e>j.t1?e*e*e:j.t2*(e-j.t0),{pow:Ke}=Math,We=(...e)=>{const[t,n,r]=x(e,"rgb"),[f,c,o]=Pt(t,n,r),s=116*c-16;return[s<0?0:s,500*(f-c),200*(c-o)]},he=e=>(e/=255)<=.04045?e/12.92:Ke((e+.055)/1.055,2.4),pe=e=>e>j.t3?Ke(e,1/3):e/j.t2+j.t0,Pt=(e,t,n)=>{e=he(e),t=he(t),n=he(n);const r=pe((.4124564*e+.3575761*t+.1804375*n)/j.Xn),f=pe((.2126729*e+.7151522*t+.072175*n)/j.Yn),c=pe((.0193339*e+.119192*t+.9503041*n)/j.Zn);return[r,f,c]};i.prototype.lab=function(){return We(this._rgb)};_.lab=(...e)=>new i(...e,"lab");m.format.lab=Ze;m.autodetect.push({p:2,test:(...e)=>{if(e=x(e,"lab"),N(e)==="array"&&e.length===3)return"lab"}});const{sin:Gt,cos:Bt}=Math,Je=(...e)=>{let[t,n,r]=x(e,"lch");return isNaN(r)&&(r=0),r=r*bt,[t,Bt(r)*n,Gt(r)*n]},Qe=(...e)=>{e=x(e,"lch");const[t,n,r]=e,[f,c,o]=Je(t,n,r),[s,l,u]=Ze(f,c,o);return[s,l,u,e.length>3?e[3]:1]},Ot=(...e)=>{const t=x(e,"hcl").reverse();return Qe(...t)},{sqrt:St,atan2:Tt,round:It}=Math,et=(...e)=>{const[t,n,r]=x(e,"lab"),f=St(n*n+r*r);let c=(Tt(r,n)*dt+360)%360;return It(f*1e4)===0&&(c=Number.NaN),[t,f,c]},tt=(...e)=>{const[t,n,r]=x(e,"rgb"),[f,c,o]=We(t,n,r);return et(f,c,o)};i.prototype.lch=function(){return tt(this._rgb)};i.prototype.hcl=function(){return tt(this._rgb).reverse()};_.lch=(...e)=>new i(...e,"lch");_.hcl=(...e)=>new i(...e,"hcl");m.format.lch=Qe;m.format.hcl=Ot;["lch","hcl"].forEach(e=>m.autodetect.push({p:2,test:(...t)=>{if(t=x(t,e),N(t)==="array"&&t.length===3)return e}}));const U={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",laserlemon:"#ffff54",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrod:"#fafad2",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",maroon2:"#7f0000",maroon3:"#b03060",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",purple2:"#7f007f",purple3:"#a020f0",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};i.prototype.name=function(){const e=Ve(this._rgb,"rgb");for(let t of Object.keys(U))if(U[t]===e)return t.toLowerCase();return e};m.format.named=e=>{if(e=e.toLowerCase(),U[e])return Ue(U[e]);throw new Error("unknown color name: "+e)};m.autodetect.push({p:5,test:(e,...t)=>{if(!t.length&&N(e)==="string"&&U[e.toLowerCase()])return"named"}});const Yt=e=>{if(N(e)=="number"&&e>=0&&e<=16777215){const t=e>>16,n=e>>8&255,r=e&255;return[t,n,r,1]}throw new Error("unknown num color: "+e)},Xt=(...e)=>{const[t,n,r]=x(e,"rgb");return(t<<16)+(n<<8)+r};i.prototype.num=function(){return Xt(this._rgb)};_.num=(...e)=>new i(...e,"num");m.format.num=Yt;m.autodetect.push({p:5,test:(...e)=>{if(e.length===1&&N(e[0])==="number"&&e[0]>=0&&e[0]<=16777215)return"num"}});const{round:nt}=Math;i.prototype.rgb=function(e=!0){return e===!1?this._rgb.slice(0,3):this._rgb.slice(0,3).map(nt)};i.prototype.rgba=function(e=!0){return this._rgb.slice(0,4).map((t,n)=>n<3?e===!1?t:nt(t):t)};_.rgb=(...e)=>new i(...e,"rgb");m.format.rgb=(...e)=>{const t=x(e,"rgba");return t[3]===void 0&&(t[3]=1),t};m.autodetect.push({p:3,test:(...e)=>{if(e=x(e,"rgba"),N(e)==="array"&&(e.length===3||e.length===4&&N(e[3])=="number"&&e[3]>=0&&e[3]<=1))return"rgb"}});const{log:ee}=Math,rt=e=>{const t=e/100;let n,r,f;return t<66?(n=255,r=t<6?0:-155.25485562709179-.44596950469579133*(r=t-2)+104.49216199393888*ee(r),f=t<20?0:-254.76935184120902+.8274096064007395*(f=t-10)+115.67994401066147*ee(f)):(n=351.97690566805693+.114206453784165*(n=t-55)-40.25366309332127*ee(n),r=325.4494125711974+.07943456536662342*(r=t-50)-28.0852963507957*ee(r),f=255),[n,r,f,1]},{round:Dt}=Math,Ht=(...e)=>{const t=x(e,"rgb"),n=t[0],r=t[2];let f=1e3,c=4e4;const o=.4;let s;for(;c-f>o;){s=(c+f)*.5;const l=rt(s);l[2]/l[0]>=r/n?c=s:f=s}return Dt(s)};i.prototype.temp=i.prototype.kelvin=i.prototype.temperature=function(){return Ht(this._rgb)};_.temp=_.kelvin=_.temperature=(...e)=>new i(...e,"temp");m.format.temp=m.format.kelvin=m.format.temperature=rt;const{pow:ne,sign:Ft}=Math,ft=(...e)=>{e=x(e,"lab");const[t,n,r]=e,f=ne(t+.3963377774*n+.2158037573*r,3),c=ne(t-.1055613458*n-.0638541728*r,3),o=ne(t-.0894841775*n-1.291485548*r,3);return[255*ge(4.0767416621*f-3.3077115913*c+.2309699292*o),255*ge(-1.2684380046*f+2.6097574011*c-.3413193965*o),255*ge(-.0041960863*f-.7034186147*c+1.707614701*o),e.length>3?e[3]:1]};function ge(e){const t=Math.abs(e);return t>.0031308?(Ft(e)||1)*(1.055*ne(t,1/2.4)-.055):e*12.92}const{cbrt:me,pow:Ut,sign:Vt}=Math,ct=(...e)=>{const[t,n,r]=x(e,"rgb"),[f,c,o]=[ye(t/255),ye(n/255),ye(r/255)],s=me(.4122214708*f+.5363325363*c+.0514459929*o),l=me(.2119034982*f+.6806995451*c+.1073969566*o),u=me(.0883024619*f+.2817188376*c+.6299787005*o);return[.2104542553*s+.793617785*l-.0040720468*u,1.9779984951*s-2.428592205*l+.4505937099*u,.0259040371*s+.7827717662*l-.808675766*u]};function ye(e){const t=Math.abs(e);return t<.04045?e/12.92:(Vt(e)||1)*Ut((t+.055)/1.055,2.4)}i.prototype.oklab=function(){return ct(this._rgb)};_.oklab=(...e)=>new i(...e,"oklab");m.format.oklab=ft;m.autodetect.push({p:3,test:(...e)=>{if(e=x(e,"oklab"),N(e)==="array"&&e.length===3)return"oklab"}});const Zt=(...e)=>{e=x(e,"lch");const[t,n,r]=e,[f,c,o]=Je(t,n,r),[s,l,u]=ft(f,c,o);return[s,l,u,e.length>3?e[3]:1]},Kt=(...e)=>{const[t,n,r]=x(e,"rgb"),[f,c,o]=ct(t,n,r);return et(f,c,o)};i.prototype.oklch=function(){return Kt(this._rgb)};_.oklch=(...e)=>new i(...e,"oklch");m.format.oklch=Zt;m.autodetect.push({p:3,test:(...e)=>{if(e=x(e,"oklch"),N(e)==="array"&&e.length===3)return"oklch"}});i.prototype.alpha=function(e,t=!1){return e!==void 0&&N(e)==="number"?t?(this._rgb[3]=e,this):new i([this._rgb[0],this._rgb[1],this._rgb[2],e],"rgb"):this._rgb[3]};i.prototype.clipped=function(){return this._rgb._clipped||!1};i.prototype.darken=function(e=1){const t=this,n=t.lab();return n[0]-=j.Kn*e,new i(n,"lab").alpha(t.alpha(),!0)};i.prototype.brighten=function(e=1){return this.darken(-e)};i.prototype.darker=i.prototype.darken;i.prototype.brighter=i.prototype.brighten;i.prototype.get=function(e){const[t,n]=e.split("."),r=this[t]();if(n){const f=t.indexOf(n)-(t.substr(0,2)==="ok"?2:0);if(f>-1)return r[f];throw new Error(`unknown channel ${n} in mode ${t}`)}else return r};const{pow:Wt}=Math,Jt=1e-7,Qt=20;i.prototype.luminance=function(e,t="rgb"){if(e!==void 0&&N(e)==="number"){if(e===0)return new i([0,0,0,this._rgb[3]],"rgb");if(e===1)return new i([255,255,255,this._rgb[3]],"rgb");let n=this.luminance(),r=Qt;const f=(o,s)=>{const l=o.interpolate(s,.5,t),u=l.luminance();return Math.abs(e-u)<Jt||!r--?l:u>e?f(o,l):f(l,s)},c=(n>e?f(new i([0,0,0]),this):f(this,new i([255,255,255]))).rgb();return new i([...c,this._rgb[3]])}return en(...this._rgb.slice(0,3))};const en=(e,t,n)=>(e=we(e),t=we(t),n=we(n),.2126*e+.7152*t+.0722*n),we=e=>(e/=255,e<=.03928?e/12.92:Wt((e+.055)/1.055,2.4)),C={},K=(e,t,n=.5,...r)=>{let f=r[0]||"lrgb";if(!C[f]&&!r.length&&(f=Object.keys(C)[0]),!C[f])throw new Error(`interpolation mode ${f} is not defined`);return N(e)!=="object"&&(e=new i(e)),N(t)!=="object"&&(t=new i(t)),C[f](e,t,n).alpha(e.alpha()+n*(t.alpha()-e.alpha()))};i.prototype.mix=i.prototype.interpolate=function(e,t=.5,...n){return K(this,e,t,...n)};i.prototype.premultiply=function(e=!1){const t=this._rgb,n=t[3];return e?(this._rgb=[t[0]*n,t[1]*n,t[2]*n,n],this):new i([t[0]*n,t[1]*n,t[2]*n,n],"rgb")};i.prototype.saturate=function(e=1){const t=this,n=t.lch();return n[1]+=j.Kn*e,n[1]<0&&(n[1]=0),new i(n,"lch").alpha(t.alpha(),!0)};i.prototype.desaturate=function(e=1){return this.saturate(-e)};i.prototype.set=function(e,t,n=!1){const[r,f]=e.split("."),c=this[r]();if(f){const o=r.indexOf(f)-(r.substr(0,2)==="ok"?2:0);if(o>-1){if(N(t)=="string")switch(t.charAt(0)){case"+":c[o]+=+t;break;case"-":c[o]+=+t;break;case"*":c[o]*=+t.substr(1);break;case"/":c[o]/=+t.substr(1);break;default:c[o]=+t}else if(N(t)==="number")c[o]=t;else throw new Error("unsupported value for Color.set");const s=new i(c,r);return n?(this._rgb=s._rgb,this):s}throw new Error(`unknown channel ${f} in mode ${r}`)}else return c};i.prototype.tint=function(e=.5,...t){return K(this,"white",e,...t)};i.prototype.shade=function(e=.5,...t){return K(this,"black",e,...t)};const tn=(e,t,n)=>{const r=e._rgb,f=t._rgb;return new i(r[0]+n*(f[0]-r[0]),r[1]+n*(f[1]-r[1]),r[2]+n*(f[2]-r[2]),"rgb")};C.rgb=tn;const{sqrt:ke,pow:H}=Math,nn=(e,t,n)=>{const[r,f,c]=e._rgb,[o,s,l]=t._rgb;return new i(ke(H(r,2)*(1-n)+H(o,2)*n),ke(H(f,2)*(1-n)+H(s,2)*n),ke(H(c,2)*(1-n)+H(l,2)*n),"rgb")};C.lrgb=nn;const rn=(e,t,n)=>{const r=e.lab(),f=t.lab();return new i(r[0]+n*(f[0]-r[0]),r[1]+n*(f[1]-r[1]),r[2]+n*(f[2]-r[2]),"lab")};C.lab=rn;const V=(e,t,n,r)=>{let f,c;r==="hsl"?(f=e.hsl(),c=t.hsl()):r==="hsv"?(f=e.hsv(),c=t.hsv()):r==="hcg"?(f=e.hcg(),c=t.hcg()):r==="hsi"?(f=e.hsi(),c=t.hsi()):r==="lch"||r==="hcl"?(r="hcl",f=e.hcl(),c=t.hcl()):r==="oklch"&&(f=e.oklch().reverse(),c=t.oklch().reverse());let o,s,l,u,h,b;(r.substr(0,1)==="h"||r==="oklch")&&([o,l,h]=f,[s,u,b]=c);let d,$,E,R;return!isNaN(o)&&!isNaN(s)?(s>o&&s-o>180?R=s-(o+360):s<o&&o-s>180?R=s+360-o:R=s-o,$=o+n*R):isNaN(o)?isNaN(s)?$=Number.NaN:($=s,(h==1||h==0)&&r!="hsv"&&(d=u)):($=o,(b==1||b==0)&&r!="hsv"&&(d=l)),d===void 0&&(d=l+n*(u-l)),E=h+n*(b-h),r==="oklch"?new i([E,d,$],r):new i([$,d,E],r)},ot=(e,t,n)=>V(e,t,n,"lch");C.lch=ot;C.hcl=ot;const fn=(e,t,n)=>{const r=e.num(),f=t.num();return new i(r+n*(f-r),"num")};C.num=fn;const cn=(e,t,n)=>V(e,t,n,"hcg");C.hcg=cn;const on=(e,t,n)=>V(e,t,n,"hsi");C.hsi=on;const sn=(e,t,n)=>V(e,t,n,"hsl");C.hsl=sn;const ln=(e,t,n)=>V(e,t,n,"hsv");C.hsv=ln;const an=(e,t,n)=>{const r=e.oklab(),f=t.oklab();return new i(r[0]+n*(f[0]-r[0]),r[1]+n*(f[1]-r[1]),r[2]+n*(f[2]-r[2]),"oklab")};C.oklab=an;const un=(e,t,n)=>V(e,t,n,"oklch");C.oklch=un;const{pow:_e,sqrt:$e,PI:Ne,cos:Ce,sin:je,atan2:bn}=Math,dn=(e,t="lrgb",n=null)=>{const r=e.length;n||(n=Array.from(new Array(r)).map(()=>1));const f=r/n.reduce(function(b,d){return b+d});if(n.forEach((b,d)=>{n[d]*=f}),e=e.map(b=>new i(b)),t==="lrgb")return hn(e,n);const c=e.shift(),o=c.get(t),s=[];let l=0,u=0;for(let b=0;b<o.length;b++)if(o[b]=(o[b]||0)*n[0],s.push(isNaN(o[b])?0:n[0]),t.charAt(b)==="h"&&!isNaN(o[b])){const d=o[b]/180*Ne;l+=Ce(d)*n[0],u+=je(d)*n[0]}let h=c.alpha()*n[0];e.forEach((b,d)=>{const $=b.get(t);h+=b.alpha()*n[d+1];for(let E=0;E<o.length;E++)if(!isNaN($[E]))if(s[E]+=n[d+1],t.charAt(E)==="h"){const R=$[E]/180*Ne;l+=Ce(R)*n[d+1],u+=je(R)*n[d+1]}else o[E]+=$[E]*n[d+1]});for(let b=0;b<o.length;b++)if(t.charAt(b)==="h"){let d=bn(u/s[b],l/s[b])/Ne*180;for(;d<0;)d+=360;for(;d>=360;)d-=360;o[b]=d}else o[b]=o[b]/s[b];return h/=r,new i(o,t).alpha(h>.99999?1:h,!0)},hn=(e,t)=>{const n=e.length,r=[0,0,0,0];for(let f=0;f<e.length;f++){const c=e[f],o=t[f]/n,s=c._rgb;r[0]+=_e(s[0],2)*o,r[1]+=_e(s[1],2)*o,r[2]+=_e(s[2],2)*o,r[3]+=s[3]*o}return r[0]=$e(r[0]),r[1]=$e(r[1]),r[2]=$e(r[2]),r[3]>.9999999&&(r[3]=1),new i(Me(r))},{pow:pn}=Math;function fe(e){let t="rgb",n=_("#ccc"),r=0,f=[0,1],c=[],o=[0,0],s=!1,l=[],u=!1,h=0,b=1,d=!1,$={},E=!0,R=1;const k=function(a){if(a=a||["#fff","#000"],a&&N(a)==="string"&&_.brewer&&_.brewer[a.toLowerCase()]&&(a=_.brewer[a.toLowerCase()]),N(a)==="array"){a.length===1&&(a=[a[0],a[0]]),a=a.slice(0);for(let p=0;p<a.length;p++)a[p]=_(a[p]);c.length=0;for(let p=0;p<a.length;p++)c.push(p/(a.length-1))}return P(),l=a},y=function(a){if(s!=null){const p=s.length-1;let w=0;for(;w<p&&a>=s[w];)w++;return w-1}return 0};let S=a=>a,T=a=>a;const q=function(a,p){let w,g;if(p==null&&(p=!1),isNaN(a)||a===null)return n;p?g=a:s&&s.length>2?g=y(a)/(s.length-2):b!==h?g=(a-h)/(b-h):g=1,g=T(g),p||(g=S(g)),R!==1&&(g=pn(g,R)),g=o[0]+g*(1-o[0]-o[1]),g=F(g,0,1);const A=Math.floor(g*1e4);if(E&&$[A])w=$[A];else{if(N(l)==="array")for(let M=0;M<c.length;M++){const L=c[M];if(g<=L){w=l[M];break}if(g>=L&&M===c.length-1){w=l[M];break}if(g>L&&g<c[M+1]){g=(g-L)/(c[M+1]-L),w=_.interpolate(l[M],l[M+1],g,t);break}}else N(l)==="function"&&(w=l(g));E&&($[A]=w)}return w};var P=()=>$={};k(e);const v=function(a){const p=_(q(a));return u&&p[u]?p[u]():p};return v.classes=function(a){if(a!=null){if(N(a)==="array")s=a,f=[a[0],a[a.length-1]];else{const p=_.analyze(f);a===0?s=[p.min,p.max]:s=_.limits(p,"e",a)}return v}return s},v.domain=function(a){if(!arguments.length)return f;h=a[0],b=a[a.length-1],c=[];const p=l.length;if(a.length===p&&h!==b)for(let w of Array.from(a))c.push((w-h)/(b-h));else{for(let w=0;w<p;w++)c.push(w/(p-1));if(a.length>2){const w=a.map((A,M)=>M/(a.length-1)),g=a.map(A=>(A-h)/(b-h));g.every((A,M)=>w[M]===A)||(T=A=>{if(A<=0||A>=1)return A;let M=0;for(;A>=g[M+1];)M++;const L=(A-g[M])/(g[M+1]-g[M]);return w[M]+L*(w[M+1]-w[M])})}}return f=[h,b],v},v.mode=function(a){return arguments.length?(t=a,P(),v):t},v.range=function(a,p){return k(a),v},v.out=function(a){return u=a,v},v.spread=function(a){return arguments.length?(r=a,v):r},v.correctLightness=function(a){return a==null&&(a=!0),d=a,P(),d?S=function(p){const w=q(0,!0).lab()[0],g=q(1,!0).lab()[0],A=w>g;let M=q(p,!0).lab()[0];const L=w+(g-w)*p;let X=M-L,Z=0,W=1,J=20;for(;Math.abs(X)>.01&&J-- >0;)(function(){return A&&(X*=-1),X<0?(Z=p,p+=(W-p)*.5):(W=p,p+=(Z-p)*.5),M=q(p,!0).lab()[0],X=M-L})();return p}:S=p=>p,v},v.padding=function(a){return a!=null?(N(a)==="number"&&(a=[a,a]),o=a,v):o},v.colors=function(a,p){arguments.length<2&&(p="hex");let w=[];if(arguments.length===0)w=l.slice(0);else if(a===1)w=[v(.5)];else if(a>1){const g=f[0],A=f[1]-g;w=gn(0,a,!1).map(M=>v(g+M/(a-1)*A))}else{e=[];let g=[];if(s&&s.length>2)for(let A=1,M=s.length,L=1<=M;L?A<M:A>M;L?A++:A--)g.push((s[A-1]+s[A])*.5);else g=f;w=g.map(A=>v(A))}return _[p]&&(w=w.map(g=>g[p]())),w},v.cache=function(a){return a!=null?(E=a,v):E},v.gamma=function(a){return a!=null?(R=a,v):R},v.nodata=function(a){return a!=null?(n=_(a),v):n},v}function gn(e,t,n){let r=[],f=e<t,c=n?f?t+1:t-1:t;for(let o=e;f?o<c:o>c;f?o++:o--)r.push(o);return r}const mn=function(e){let t=[1,1];for(let n=1;n<e;n++){let r=[1];for(let f=1;f<=t.length;f++)r[f]=(t[f]||0)+t[f-1];t=r}return t},yn=function(e){let t,n,r,f;if(e=e.map(c=>new i(c)),e.length===2)[n,r]=e.map(c=>c.lab()),t=function(c){const o=[0,1,2].map(s=>n[s]+c*(r[s]-n[s]));return new i(o,"lab")};else if(e.length===3)[n,r,f]=e.map(c=>c.lab()),t=function(c){const o=[0,1,2].map(s=>(1-c)*(1-c)*n[s]+2*(1-c)*c*r[s]+c*c*f[s]);return new i(o,"lab")};else if(e.length===4){let c;[n,r,f,c]=e.map(o=>o.lab()),t=function(o){const s=[0,1,2].map(l=>(1-o)*(1-o)*(1-o)*n[l]+3*(1-o)*(1-o)*o*r[l]+3*(1-o)*o*o*f[l]+o*o*o*c[l]);return new i(s,"lab")}}else if(e.length>=5){let c,o,s;c=e.map(l=>l.lab()),s=e.length-1,o=mn(s),t=function(l){const u=1-l,h=[0,1,2].map(b=>c.reduce((d,$,E)=>d+o[E]*u**(s-E)*l**E*$[b],0));return new i(h,"lab")}}else throw new RangeError("No point in running bezier with only one color.");return t},wn=e=>{const t=yn(e);return t.scale=()=>fe(t),t},G=(e,t,n)=>{if(!G[n])throw new Error("unknown blend mode "+n);return G[n](e,t)},I=e=>(t,n)=>{const r=_(n).rgb(),f=_(t).rgb();return _.rgb(e(r,f))},Y=e=>(t,n)=>{const r=[];return r[0]=e(t[0],n[0]),r[1]=e(t[1],n[1]),r[2]=e(t[2],n[2]),r},kn=e=>e,_n=(e,t)=>e*t/255,$n=(e,t)=>e>t?t:e,Nn=(e,t)=>e>t?e:t,xn=(e,t)=>255*(1-(1-e/255)*(1-t/255)),Mn=(e,t)=>t<128?2*e*t/255:255*(1-2*(1-e/255)*(1-t/255)),vn=(e,t)=>255*(1-(1-t/255)/(e/255)),An=(e,t)=>e===255?255:(e=255*(t/255)/(1-e/255),e>255?255:e);G.normal=I(Y(kn));G.multiply=I(Y(_n));G.screen=I(Y(xn));G.overlay=I(Y(Mn));G.darken=I(Y($n));G.lighten=I(Y(Nn));G.dodge=I(Y(An));G.burn=I(Y(vn));const{pow:En,sin:Rn,cos:Ln}=Math;function zn(e=300,t=-1.5,n=1,r=1,f=[0,1]){let c=0,o;N(f)==="array"?o=f[1]-f[0]:(o=0,f=[f,f]);const s=function(l){const u=O*((e+120)/360+t*l),h=En(f[0]+o*l,r),d=(c!==0?n[0]+l*c:n)*h*(1-h)/2,$=Ln(u),E=Rn(u),R=h+d*(-.14861*$+1.78277*E),k=h+d*(-.29227*$-.90649*E),y=h+d*(1.97294*$);return _(Me([R*255,k*255,y*255,1]))};return s.start=function(l){return l==null?e:(e=l,s)},s.rotations=function(l){return l==null?t:(t=l,s)},s.gamma=function(l){return l==null?r:(r=l,s)},s.hue=function(l){return l==null?n:(n=l,N(n)==="array"?(c=n[1]-n[0],c===0&&(n=n[1])):c=0,s)},s.lightness=function(l){return l==null?f:(N(l)==="array"?(f=l,o=l[1]-l[0]):(f=[l,l],o=0),s)},s.scale=()=>_.scale(s),s.hue(n),s}const Cn="0123456789abcdef",{floor:jn,random:qn}=Math,Pn=()=>{let e="#";for(let t=0;t<6;t++)e+=Cn.charAt(jn(qn()*16));return new i(e,"hex")},{log:qe,pow:Gn,floor:Bn,abs:On}=Math;function st(e,t=null){const n={min:Number.MAX_VALUE,max:Number.MAX_VALUE*-1,sum:0,values:[],count:0};return N(e)==="object"&&(e=Object.values(e)),e.forEach(r=>{t&&N(r)==="object"&&(r=r[t]),r!=null&&!isNaN(r)&&(n.values.push(r),n.sum+=r,r<n.min&&(n.min=r),r>n.max&&(n.max=r),n.count+=1)}),n.domain=[n.min,n.max],n.limits=(r,f)=>lt(n,r,f),n}function lt(e,t="equal",n=7){N(e)=="array"&&(e=st(e));const{min:r,max:f}=e,c=e.values.sort((s,l)=>s-l);if(n===1)return[r,f];const o=[];if(t.substr(0,1)==="c"&&(o.push(r),o.push(f)),t.substr(0,1)==="e"){o.push(r);for(let s=1;s<n;s++)o.push(r+s/n*(f-r));o.push(f)}else if(t.substr(0,1)==="l"){if(r<=0)throw new Error("Logarithmic scales are only possible for values > 0");const s=Math.LOG10E*qe(r),l=Math.LOG10E*qe(f);o.push(r);for(let u=1;u<n;u++)o.push(Gn(10,s+u/n*(l-s)));o.push(f)}else if(t.substr(0,1)==="q"){o.push(r);for(let s=1;s<n;s++){const l=(c.length-1)*s/n,u=Bn(l);if(u===l)o.push(c[u]);else{const h=l-u;o.push(c[u]*(1-h)+c[u+1]*h)}}o.push(f)}else if(t.substr(0,1)==="k"){let s;const l=c.length,u=new Array(l),h=new Array(n);let b=!0,d=0,$=null;$=[],$.push(r);for(let k=1;k<n;k++)$.push(r+k/n*(f-r));for($.push(f);b;){for(let y=0;y<n;y++)h[y]=0;for(let y=0;y<l;y++){const S=c[y];let T=Number.MAX_VALUE,q;for(let P=0;P<n;P++){const v=On($[P]-S);v<T&&(T=v,q=P),h[q]++,u[y]=q}}const k=new Array(n);for(let y=0;y<n;y++)k[y]=null;for(let y=0;y<l;y++)s=u[y],k[s]===null?k[s]=c[y]:k[s]+=c[y];for(let y=0;y<n;y++)k[y]*=1/h[y];b=!1;for(let y=0;y<n;y++)if(k[y]!==$[y]){b=!0;break}$=k,d++,d>200&&(b=!1)}const E={};for(let k=0;k<n;k++)E[k]=[];for(let k=0;k<l;k++)s=u[k],E[s].push(c[k]);let R=[];for(let k=0;k<n;k++)R.push(E[k][0]),R.push(E[k][E[k].length-1]);R=R.sort((k,y)=>k-y),o.push(R[0]);for(let k=1;k<R.length;k+=2){const y=R[k];!isNaN(y)&&o.indexOf(y)===-1&&o.push(y)}}return o}const Sn=(e,t)=>{e=new i(e),t=new i(t);const n=e.luminance(),r=t.luminance();return n>r?(n+.05)/(r+.05):(r+.05)/(n+.05)},{sqrt:B,pow:z,min:Tn,max:In,atan2:Pe,abs:Ge,cos:te,sin:Be,exp:Yn,PI:Oe}=Math;function Xn(e,t,n=1,r=1,f=1){var c=function(se){return 360*se/(2*Oe)},o=function(se){return 2*Oe*se/360};e=new i(e),t=new i(t);const[s,l,u]=Array.from(e.lab()),[h,b,d]=Array.from(t.lab()),$=(s+h)/2,E=B(z(l,2)+z(u,2)),R=B(z(b,2)+z(d,2)),k=(E+R)/2,y=.5*(1-B(z(k,7)/(z(k,7)+z(25,7)))),S=l*(1+y),T=b*(1+y),q=B(z(S,2)+z(u,2)),P=B(z(T,2)+z(d,2)),v=(q+P)/2,a=c(Pe(u,S)),p=c(Pe(d,T)),w=a>=0?a:a+360,g=p>=0?p:p+360,A=Ge(w-g)>180?(w+g+360)/2:(w+g)/2,M=1-.17*te(o(A-30))+.24*te(o(2*A))+.32*te(o(3*A+6))-.2*te(o(4*A-63));let L=g-w;L=Ge(L)<=180?L:g<=w?L+360:L-360,L=2*B(q*P)*Be(o(L)/2);const X=h-s,Z=P-q,W=1+.015*z($-50,2)/B(20+z($-50,2)),J=1+.045*v,Re=1+.015*v*M,at=30*Yn(-z((A-275)/25,2)),it=-(2*B(z(v,7)/(z(v,7)+z(25,7))))*Be(2*o(at)),ut=B(z(X/(n*W),2)+z(Z/(r*J),2)+z(L/(f*Re),2)+it*(Z/(r*J))*(L/(f*Re)));return In(0,Tn(100,ut))}function Dn(e,t,n="lab"){e=new i(e),t=new i(t);const r=e.get(n),f=t.get(n);let c=0;for(let o in r){const s=(r[o]||0)-(f[o]||0);c+=s*s}return Math.sqrt(c)}const Hn=(...e)=>{try{return new i(...e),!0}catch{return!1}},Fn={cool(){return fe([_.hsl(180,1,.9),_.hsl(250,.7,.4)])},hot(){return fe(["#000","#f00","#ff0","#fff"]).mode("rgb")}},re={OrRd:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"],PuBu:["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"],BuPu:["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"],Oranges:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"],BuGn:["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"],YlOrBr:["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"],YlGn:["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"],Reds:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"],RdPu:["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"],Greens:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],YlGnBu:["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],Purples:["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"],GnBu:["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"],Greys:["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"],YlOrRd:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"],PuRd:["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"],Blues:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"],PuBuGn:["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"],Viridis:["#440154","#482777","#3f4a8a","#31678e","#26838f","#1f9d8a","#6cce5a","#b6de2b","#fee825"],Spectral:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],RdYlGn:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],RdBu:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],PiYG:["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],PRGn:["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],RdYlBu:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],BrBG:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],RdGy:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],PuOr:["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],Set2:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"],Accent:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],Set1:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"],Set3:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"],Dark2:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"],Paired:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"],Pastel2:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"],Pastel1:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]};for(let e of Object.keys(re))re[e.toLowerCase()]=re[e];Object.assign(_,{average:dn,bezier:wn,blend:G,cubehelix:zn,mix:K,interpolate:K,random:Pn,scale:fe,analyze:st,contrast:Sn,deltaE:Xn,distance:Dn,limits:lt,valid:Hn,scales:Fn,input:m,colors:U,brewer:re});export{Vn as a,_ as c};