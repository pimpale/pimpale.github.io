import{r as v,b as s,j as t,F as u}from"./bootstrap.7b2ffd8b.js";var l={exports:{}},f="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",y=f,b=y;function d(){}function h(){}h.resetWarningCache=d;var g=function(){function e(a,n,i,k,_,m){if(m!==b){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}e.isRequired=e;function r(){return e}var o={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:h,resetWarningCache:d};return o.PropTypes=o,o};l.exports=g();var x=["color","size","title"];function T(e,r){if(e==null)return{};var o=P(e,r),a,n;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],!(r.indexOf(a)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,a)||(o[a]=e[a]))}return o}function P(e,r){if(e==null)return{};var o={},a=Object.keys(e),n,i;for(i=0;i<a.length;i++)n=a[i],!(r.indexOf(n)>=0)&&(o[n]=e[n]);return o}var c=v.exports.forwardRef(function(e,r){var o=e.color,a=e.size,n=e.title,i=T(e,x);return s("svg",{ref:r,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:a,height:a,fill:o,...i,children:[n?t("title",{children:n}):null,t("path",{d:"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"})]})});c.propTypes={color:l.exports.string,size:l.exports.oneOfType([l.exports.string,l.exports.number]),title:l.exports.string};c.defaultProps={color:"currentColor",size:"1em",title:null};const N=c,O="/articles.html",S="/resume.html",j="/projects.html",w=()=>t("header",{className:"pb-5",children:t("nav",{className:"navbar navbar-expand-lg py-3 fixed-top bg-secondary",children:s("div",{className:"container d-flex",children:[t("a",{className:"navbar-brand",href:"/",children:t("strong",{children:"Govind Pimpale"})}),t("button",{type:"button",className:"navbar-toggler","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:t(N,{className:"text-body"})}),t("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent",children:s("div",{className:"navbar-nav ms-auto",children:[t("a",{href:S,className:"nav-item nav-link",children:t("strong",{children:"Resume"})}),t("a",{href:j,className:"nav-item nav-link",children:t("strong",{children:"Projects"})}),t("a",{href:O,className:"nav-item nav-link",children:t("strong",{children:"Articles"})})]})})]})})});function R(){return s("footer",{className:"container-fluid my-3",children:[t("br",{}),t("p",{children:"\xA9 Govind Pimpale, MIT Licensed"})]})}const C=e=>s(u,{children:[t(w,{}),e.children,t(R,{})]}),F=e=>s("section",{className:"mt-5",style:{overflow:"hidden",position:"relative"},children:[t("span",{id:e.id,style:{position:"absolute",top:"-100px",visibility:"hidden"}}),s("div",{children:[t("a",{href:`#${e.id}`,className:"float-end text-muted",children:t("h3",{children:"#"})}),t("h2",{children:e.name})]}),e.children]});export{C as L,F as S,l as p};