import{j as e,b as a,T as c,F as d}from"./vendor.8c8c5e31.js";const h=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}};h();const m="/articles.html",u="/resume.html",f="/projects.html",p=()=>e("header",{className:"pb-5",children:e("nav",{className:"navbar navbar-expand-lg py-3 fixed-top bg-secondary",children:a("div",{className:"container d-flex",children:[e("a",{className:"navbar-brand",href:"/",children:e("strong",{children:"Govind Pimpale"})}),e("button",{type:"button",className:"navbar-toggler","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:e(c,{className:"text-body"})}),e("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent",children:a("div",{className:"navbar-nav ms-auto",children:[e("a",{href:u,className:"nav-item nav-link",children:e("strong",{children:"Resume"})}),e("a",{href:f,className:"nav-item nav-link",children:e("strong",{children:"Projects"})}),e("a",{href:m,className:"nav-item nav-link",children:e("strong",{children:"Articles"})})]})})]})})});function v(){return a("footer",{className:"container-fluid my-3",children:[e("br",{}),e("p",{children:"\xA9 Govind Pimpale, MIT Licensed"})]})}const g=t=>a(d,{children:[e(p,{}),t.children,e(v,{})]}),y=t=>a("section",{className:"mt-5",style:{overflow:"hidden",position:"relative"},children:[e("span",{id:t.id,style:{position:"absolute",top:"-100px",visibility:"hidden"}}),a("div",{children:[e("a",{href:`#${t.id}`,className:"float-end text-muted",children:e("h3",{children:"#"})}),e("h2",{children:t.name})]}),t.children]});export{g as L,y as S};