import{a as s}from"./bootstrap-f22bda69.js";const y=(()=>typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global||typeof global=="object"&&global.GLOBAL===global?global:{})();y.__REACT_ASYNC__=y.__REACT_ASYNC__||{};const k=()=>{};class B{constructor(){this.abort=k,this.signal={}}}let n;try{n=require("prop-types")}catch{}const f=n&&n.oneOfType([n.node,n.func]),b=n&&n.shape({initialValue:n.any,data:n.any,error:n.instanceOf(Error),value:n.any,startedAt:n.instanceOf(Date),finishedAt:n.instanceOf(Date),status:n.oneOf(["initial","pending","fulfilled","rejected"]),isInitial:n.bool,isPending:n.bool,isLoading:n.bool,isFulfilled:n.bool,isResolved:n.bool,isRejected:n.bool,isSettled:n.bool,counter:n.number,promise:n.instanceOf(Promise),run:n.func,reload:n.func,cancel:n.func,setData:n.func,setError:n.func});var u=n&&{Async:{children:f,promise:n.instanceOf(Promise),promiseFn:n.func,deferFn:n.func,watch:n.any,watchFn:n.func,initialValue:n.any,onResolve:n.func,onReject:n.func,reducer:n.func,dispatcher:n.func,debugLabel:n.string,suspense:n.bool},Initial:{children:f,state:b.isRequired,persist:n.bool},Pending:{children:f,state:b.isRequired,initial:n.bool},Fulfilled:{children:f,state:b.isRequired,persist:n.bool},Rejected:{children:f,state:b.isRequired,persist:n.bool},Settled:{children:f,state:b.isRequired,persist:n.bool}};const j=(e,...r)=>typeof e=="function"?e(...r):e,x=({children:e,persist:r,state:i={}})=>s.createElement(s.Fragment,null,i.isInitial||r&&!i.data?j(e,i):null),O=({children:e,initial:r,state:i={}})=>s.createElement(s.Fragment,null,i.isPending&&(!r||!i.value)?j(e,i):null),$=({children:e,persist:r,state:i={}})=>s.createElement(s.Fragment,null,i.isFulfilled||r&&i.data?j(e,i.data,i):null),q=({children:e,persist:r,state:i={}})=>s.createElement(s.Fragment,null,i.isRejected||r&&i.error?j(e,i.error,i):null),N=({children:e,persist:r,state:i={}})=>s.createElement(s.Fragment,null,i.isSettled||r&&i.value?j(e,i):null);u&&(x.propTypes=u.Initial,O.propTypes=u.Pending,$.propTypes=u.Fulfilled,q.propTypes=u.Rejected,N.propTypes=u.Settled);var l;(function(e){e.initial="initial",e.pending="pending",e.fulfilled="fulfilled",e.rejected="rejected"})(l||(l={}));const G=(e,r)=>e instanceof Error?l.rejected:e!==void 0?l.fulfilled:r?l.pending:l.initial,W=e=>e instanceof Error?l.rejected:e!==void 0?l.fulfilled:l.initial,g=e=>({status:e,isInitial:e===l.initial,isPending:e===l.pending,isLoading:e===l.pending,isFulfilled:e===l.fulfilled,isResolved:e===l.fulfilled,isRejected:e===l.rejected,isSettled:e===l.fulfilled||e===l.rejected}),E=function(){};Object.setPrototypeOf?Object.setPrototypeOf(E,Promise):E.__proto__=Promise;E.prototype=Object.assign(Object.create(Promise.prototype),{finally(){return this},catch(){return this},then(){return this}});const v=new E;var d;(function(e){e.start="start",e.cancel="cancel",e.fulfill="fulfill",e.reject="reject"})(d||(d={}));const z=({initialValue:e,promise:r,promiseFn:i})=>({initialValue:e,data:e instanceof Error?void 0:e,error:e instanceof Error?e:void 0,value:e,startedAt:r||i?new Date:void 0,finishedAt:e?new Date:void 0,...g(G(e,r||i)),counter:0,promise:v}),M=(e,r)=>{switch(r.type){case d.start:return{...e,startedAt:new Date,finishedAt:void 0,...g(l.pending),counter:r.meta.counter,promise:r.meta.promise};case d.cancel:return{...e,startedAt:void 0,finishedAt:void 0,...g(W(e.error||e.data)),counter:r.meta.counter,promise:r.meta.promise};case d.fulfill:return{...e,data:r.payload,value:r.payload,error:void 0,finishedAt:new Date,...g(l.fulfilled),promise:r.meta.promise};case d.reject:return{...e,error:r.payload,value:r.payload,finishedAt:new Date,...g(l.rejected),promise:r.meta.promise};default:return e}},H=e=>(r,...i)=>{e(r,...i),r.type===d.start&&typeof r.payload=="function"&&r.payload()};class Q extends s.Component{}function J(e={},r="Async"){const{Consumer:i,Provider:w}=s.createContext(void 0);function p({children:a}){return s.createElement(i,null,t=>{if(!t)throw new Error("this component should only be used within an associated <Async> component!");return a(t)})}class _ extends s.Component{constructor(t){super(t),this.mounted=!1,this.counter=0,this.args=[],this.promise=v,this.abortController=new B,this.start=this.start.bind(this),this.load=this.load.bind(this),this.run=this.run.bind(this),this.cancel=this.cancel.bind(this),this.onResolve=this.onResolve.bind(this),this.onReject=this.onReject.bind(this),this.setData=this.setData.bind(this),this.setError=this.setError.bind(this);const o=t.promise,c=t.promiseFn||e.promiseFn,h=t.initialValue||e.initialValue;this.state={...z({initialValue:h,promise:o,promiseFn:c}),cancel:this.cancel,run:this.run,reload:()=>{this.load(),this.run(...this.args)},setData:this.setData,setError:this.setError},this.debugLabel=t.debugLabel||e.debugLabel;const{devToolsDispatcher:R}=y.__REACT_ASYNC__,S=t.reducer||e.reducer,L=t.dispatcher||e.dispatcher||R,U=S?(m,C)=>S(m,C,M):M,T=H((m,C)=>{this.setState(Y=>U(Y,m),C)});this.dispatch=L?m=>L(m,T,t):T}componentDidMount(){this.mounted=!0,(this.props.promise||!this.state.initialValue)&&this.load()}componentDidUpdate(t){const{watch:o,watchFn:c=e.watchFn,promise:h,promiseFn:R}=this.props;if(o!==t.watch)return this.counter&&this.cancel(),this.load();if(c&&c({...e,...this.props},{...e,...t}))return this.counter&&this.cancel(),this.load();if(h!==t.promise&&(this.counter&&this.cancel(),h))return this.load();if(R!==t.promiseFn&&(this.counter&&this.cancel(),R))return this.load()}componentWillUnmount(){this.cancel(),this.mounted=!1}getMeta(t){return{counter:this.counter,promise:this.promise,debugLabel:this.debugLabel,...t}}start(t){return"AbortController"in y&&(this.abortController.abort(),this.abortController=new y.AbortController),this.counter++,this.promise=new Promise((o,c)=>{if(!this.mounted)return;const h=()=>t().then(o,c);this.dispatch({type:d.start,payload:h,meta:this.getMeta()})})}load(){const t=this.props.promise,o=this.props.promiseFn||e.promiseFn;if(t)this.start(()=>t).then(this.onResolve(this.counter)).catch(this.onReject(this.counter));else if(o){const c={...e,...this.props};this.start(()=>o(c,this.abortController)).then(this.onResolve(this.counter)).catch(this.onReject(this.counter))}}run(...t){const o=this.props.deferFn||e.deferFn;if(o){this.args=t;const c={...e,...this.props};return this.start(()=>o(t,c,this.abortController)).then(this.onResolve(this.counter),this.onReject(this.counter))}}cancel(){const t=this.props.onCancel||e.onCancel;t&&t(),this.counter++,this.abortController.abort(),this.mounted&&this.dispatch({type:d.cancel,meta:this.getMeta()})}onResolve(t){return o=>{if(this.counter===t){const c=this.props.onResolve||e.onResolve;this.setData(o,()=>c&&c(o))}return o}}onReject(t){return o=>{if(this.counter===t){const c=this.props.onReject||e.onReject;this.setError(o,()=>c&&c(o))}return o}}setData(t,o){return this.mounted&&this.dispatch({type:d.fulfill,payload:t,meta:this.getMeta()},o),t}setError(t,o){return this.mounted&&this.dispatch({type:d.reject,payload:t,error:!0,meta:this.getMeta()},o),t}render(){const{children:t,suspense:o}=this.props;if(o&&this.state.isPending&&this.promise!==v)throw this.promise;if(typeof t=="function"){const c=t;return s.createElement(w,{value:this.state},c(this.state))}return t!=null?s.createElement(w,{value:this.state},t):null}}u&&(_.propTypes=u.Async);const P=a=>s.createElement(p,null,t=>s.createElement(x,Object.assign({},a,{state:t}))),A=a=>s.createElement(p,null,t=>s.createElement(O,Object.assign({},a,{state:t}))),F=a=>s.createElement(p,null,t=>s.createElement($,Object.assign({},a,{state:t}))),D=a=>s.createElement(p,null,t=>s.createElement(q,Object.assign({},a,{state:t}))),I=a=>s.createElement(p,null,t=>s.createElement(N,Object.assign({},a,{state:t})));return P.displayName=`${r}.Initial`,A.displayName=`${r}.Pending`,F.displayName=`${r}.Fulfilled`,D.displayName=`${r}.Rejected`,I.displayName=`${r}.Settled`,Object.assign(_,{displayName:r,Initial:P,Pending:A,Loading:A,Fulfilled:F,Resolved:F,Rejected:D,Settled:I})}var X=J();async function Z(e){return await(await fetch(e)).text()}export{X as A,Z as f};