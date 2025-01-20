(function(d,t){typeof exports=="object"&&typeof module<"u"?module.exports=t(require("velocity-animate"),require("vue")):typeof define=="function"&&define.amd?define(["velocity-animate","vue"],t):(d=typeof globalThis<"u"?globalThis:d||self,d.VueNotification3=t(d.Velocity,d.Vue))})(this,function(d,t){"use strict";class V{constructor(){this.events={}}$on(o,i){this.events[o]||(this.events[o]=[]),this.events[o].push(i)}$off(o,i){this.events[o]&&(this.events[o]=this.events[o].filter(s=>s!==i))}emit(o,...i){this.events[o]&&this.events[`${o}`].forEach(s=>{try{s(...i)}catch(r){console.error("error",r)}})}}const m=new V,b={x:["left","center","right"],y:["top","bottom"]},G=(e=>()=>e++)(0),H=e=>typeof e!="string"?[]:e.split(/\s+/gi).filter(o=>o),R=e=>{typeof e=="string"&&(e=H(e));let o=null,i=null;return e.forEach(s=>{b.y.indexOf(s)!==-1&&(i=s),b.x.indexOf(s)!==-1&&(o=s)}),{x:o,y:i}};function I(e,o,i){let s,r=o;this.pause=function(){clearTimeout(i.timer),r-=Date.now()-s},this.resume=function(){s=Date.now(),clearTimeout(i.timer),i.timer=setTimeout(e,r)},this.resume()}const _={position:["top","right"],cssAnimation:"vn-fade",velocityAnimation:{enter:e=>{console.warn("enter",e);var o=e.clientHeight;return{height:[o,0],opacity:[1,0]}},leave:{height:0,opacity:[0,1]}}},M={__name:"VelocityGroup",emits:["enter","leave","afterLeave"],setup(e,{emit:o}){const i=o,s=(a,u)=>{i("enter",{el:a,complete:u})},r=(a,u)=>{i("leave",{el:a,complete:u})},c=()=>{i("afterLeave")};return(a,u)=>(t.openBlock(),t.createBlock(t.TransitionGroup,{css:!1,onEnter:s,onLeave:r,onAfterLeave:c},{default:t.withCtx(()=>[t.renderSlot(a.$slots,"default")]),_:3}))}},j={__name:"CssGroup",props:{name:{require:!0}},setup(e){const o=e,i=t.computed(()=>o.name);return(s,r)=>(t.openBlock(),t.createBlock(t.TransitionGroup,{name:i.value},{default:t.withCtx(()=>[t.renderSlot(s.$slots,"default")]),_:3},8,["name"]))}},w="[-+]?[0-9]*.?[0-9]+",v=[{name:"px",regexp:new RegExp(`^${w}px$`)},{name:"%",regexp:new RegExp(`^${w}%$`)},{name:"px",regexp:new RegExp(`^${w}$`)}];var z=e=>{if(e==="auto")return{type:e,value:0};for(var o=0;o<v.length;o++){let i=v[o];if(i.regexp.test(e))return{type:i.name,value:parseFloat(e)}}return{type:"",value:e}};const W=e=>{switch(typeof e){case"number":return{type:"px",value:e};case"string":return z(e);default:return{type:"",value:e}}},Y=(e,o)=>{const i=e.__vccOpts||e;for(const[s,r]of o)i[s]=r;return i},x={IDLE:0,DESTROYED:2},q={name:"Vue3Notifications",components:{VelocityGroup:M,CssGroup:j},props:{group:{type:String,default:""},width:{type:[Number,String],default:300},reverse:{type:Boolean,default:!1},position:{type:[String,Array],default:()=>_.position},classes:{type:String,default:"vue-notification"},animationType:{type:String,default:"css",validator(e){return e==="css"||e==="velocity"}},animation:{type:Object,default(){return _.velocityAnimation}},animationName:{type:String,default:_.cssAnimation},speed:{type:Number,default:300},cooldown:{type:Number,default:0},duration:{type:Number,default:3e3},delay:{type:Number,default:0},max:{type:Number,default:1/0},ignoreDuplicates:{type:Boolean,default:!1},closeOnClick:{type:Boolean,default:!0},pauseOnHover:{type:Boolean,default:!1}},setup(e,{emit:o}){const i=t.ref([]),s=C.params.velocity||d,r=t.ref(null),c=t.computed(()=>W(e.width)),a=t.computed(()=>e.animationType==="velocity"),u=t.computed(()=>a.value?"VelocityGroup":"CssGroup"),L=t.computed(()=>{const{x:n,y:f}=R(e.position),l=c.value.value,T=c.value.type;let h={width:l+T,[f]:"0px"};return n==="center"?h.left=`calc(50% - ${l/2}${T})`:h[n]="0px",h}),p=t.computed(()=>i.value.filter(n=>n.state!==x.DESTROYED)),k=t.computed(()=>Object.hasOwnProperty.call(L.value,"bottom")),X=n=>{o("click",n),e.closeOnClick&&y(n)},Z=()=>{e.pauseOnHover&&r.value&&r.value.pause()},ee=()=>{e.pauseOnHover&&r.value&&r.value.resume()},D=n=>{if(n.group=n.group||"",n.data=n.data||{},e.group!==n.group)return;if(n.clean||n.clear){O();return}const f=typeof n.duration=="number"?n.duration:e.duration,l=typeof n.speed=="number"?n.speed:e.speed,T=typeof n.ignoreDuplicates=="boolean"?n.ignoreDuplicates:e.ignoreDuplicates;let{title:h,text:se,type:ae,data:re,id:le}=n;const g={id:le||G(),title:h,text:se,type:ae,state:x.IDLE,speed:l,length:f+2*l,data:re};f>=0&&(r.value=new I(()=>y(g),g.length,g));let ce=e.reverse?!k.value:k.value,E=-1;const fe=p.value.some($=>$.title===n.title&&$.text===n.text);(!T||!fe)&&(ce?(i.value.push(g),p.value.length>e.max&&(E=0)):(i.value.unshift(g),p.value.length>e.max&&(E=p.value.length-1)),E!==-1&&y(p.value[E]))},B=n=>{N(n)},te=n=>["vue-notification-template",e.classes,n.type],ne=n=>a.value?null:{transition:`all ${n.speed}ms`},y=n=>{clearTimeout(n.timer),n.state=x.DESTROYED,a.value||A(),o("destroy",n)},N=n=>{const f=i.value.find(l=>l.id===n);f&&y(f)},O=()=>{p.value.forEach(y)},S=(n,f)=>{const l=e.animation[n];return typeof l=="function"?l.call(this,f):l},oe=(n,f)=>{const l=S("enter",n);s(n,l,{duration:e.speed,complete:f})},ie=(n,f)=>{let l=S("leave",n);s(n,l,{duration:e.speed,complete:f})},A=()=>{i.value=i.value.filter(n=>n.state!==x.DESTROYED)};return t.onMounted(()=>{m.$on("add",D),m.$on("close",B)}),t.onUnmounted(()=>{m.$off("add",D),m.$off("close",B)}),{list:i,velocity:s,timerControl:r,actualWidth:c,isVA:a,componentName:u,styles:L,active:p,botToTop:k,destroyIfNecessary:X,pauseTimeout:Z,resumeTimeout:ee,addItem:D,closeItem:B,notifyClass:te,notifyWrapperStyle:ne,destroy:y,destroyById:N,destroyAll:O,getAnimation:S,enter:oe,leave:ie,clean:A}}},F=["data-id"],P=["onClick"],U=["innerHTML"],J=["innerHTML"];function K(e,o,i,s,r,c){return t.openBlock(),t.createElementBlock("div",{class:"vue-notification-group",style:t.normalizeStyle(s.styles)},[(t.openBlock(),t.createBlock(t.resolveDynamicComponent(s.componentName),{name:i.animationName,onEnter:s.enter,onLeave:s.leave,onAfterLeave:s.clean},{default:t.withCtx(()=>[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(s.active,a=>(t.openBlock(),t.createElementBlock("div",{class:"vue-notification-wrapper",style:t.normalizeStyle(s.notifyWrapperStyle(a)),key:a.id,"data-id":a.id,onMouseenter:o[0]||(o[0]=(...u)=>s.pauseTimeout&&s.pauseTimeout(...u)),onMouseleave:o[1]||(o[1]=(...u)=>s.resumeTimeout&&s.resumeTimeout(...u))},[t.renderSlot(e.$slots,"body",{class:t.normalizeClass([i.classes,a.type]),item:a,close:()=>s.destroy(a)},()=>[t.createElementVNode("div",{class:t.normalizeClass(s.notifyClass(a)),onClick:u=>s.destroyIfNecessary(a)},[a.title?(t.openBlock(),t.createElementBlock("div",{key:0,class:"notification-title",innerHTML:a.title},null,8,U)):t.createCommentVNode("",!0),t.createElementVNode("div",{class:"notification-content",innerHTML:a.text},null,8,J)],10,P)])],44,F))),128))]),_:3},40,["name","onEnter","onLeave","onAfterLeave"]))],4)}const Q=Y(q,[["render",K]]),C={install(e,o={}){if(this.installed)return;this.installed=!0,this.params=o,e.component(o.componentName||"notifications",Q);const i=c=>{typeof c=="string"&&(c={title:"",text:c}),typeof c=="object"&&m.emit("add",c)};i.close=function(c){m.emit("close",c)};const s=o.name||"notify",r=o.window||!1;e.config.globalProperties["$"+s]=i,r!==!1&&(window["$"+r]=i),e.provide(s,i)}};return C});
