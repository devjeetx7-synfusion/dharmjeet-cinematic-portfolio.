/* V4 rotating carousel & cinematic layer polish. Dependency-free, Blogger-friendly. */
(()=>{
"use strict";
const stage=document.getElementById("v4-story-stage");
const reduce=window.matchMedia("(prefers-reduced-motion:reduce)");
if(stage){
 const slides=[...stage.querySelectorAll("[data-v4-panel]")],dots=[...document.querySelectorAll("[data-v4-goto]")];
 const theatre=document.querySelector(".v4-story__theatre");
 const current=document.getElementById("v4-current");
 const n=slides.length;
 let active=0;
 function setHeight(){
  const slide=slides[active];if(!slide)return;
  const mobile=window.matchMedia("(max-width:720px)").matches;
  const copy=slide.querySelector(".v4-panel__story");
  const content=copy?copy.scrollHeight:0;
  const minimum=mobile?480:525;
  const need=mobile?content+170:content+28;
  stage.style.height=Math.max(minimum,need)+"px";
 }
 function go(index,hash=true){
  active=(index+n)%n;
  slides.forEach((slide,i)=>{
   let distance=(i-active+n)%n;
   if(distance>n/2)distance-=n;
   slide.dataset.position=String(distance);
   const isCurrent=i===active;
   slide.setAttribute("aria-hidden",String(!isCurrent));
   slide.inert=Math.abs(distance)>1;
   slide.querySelectorAll("a,button").forEach(el=>{
    if(isCurrent){el.removeAttribute("tabindex");el.removeAttribute("aria-hidden")}
    else{el.setAttribute("tabindex","-1");el.setAttribute("aria-hidden","true")}
   });
   slide.classList.toggle("is-active",isCurrent);
  });
  dots.forEach((dot,i)=>{
   if(i===active)dot.setAttribute("aria-current","step");
   else dot.removeAttribute("aria-current");
  });
  if(current)current.textContent=String(active+1).padStart(2,"0");
  setHeight();
  if(hash)history.replaceState(null,"","#chapter-"+(active+1));
 }
 stage.addEventListener("click",event=>{
  const hit=event.target.closest("[data-v4-panel]");
  if(!hit)return;
  const selected=Number(hit.dataset.v4Panel);
  if(selected!==active && !hit.inert){event.preventDefault();go(selected)}
 });
 document.getElementById("v4-prev")?.addEventListener("click",()=>go(active-1));
 document.getElementById("v4-next")?.addEventListener("click",()=>go(active+1));
 dots.forEach(button=>button.addEventListener("click",()=>go(Number(button.dataset.v4Goto))));
 theatre?.addEventListener("keydown",event=>{
  if(event.altKey||event.ctrlKey||event.metaKey)return;
  if(event.key==="ArrowRight"){event.preventDefault();go(active+1)}
  if(event.key==="ArrowLeft"){event.preventDefault();go(active-1)}
  if(event.key==="Home"){event.preventDefault();go(0)}
  if(event.key==="End"){event.preventDefault();go(n-1)}
 });
 // Horizontal gestures should not interfere with natural vertical scrolling.
 let start=null;
 function horizontalSwipe(dx,dy){
  if(Math.abs(dx)<42||Math.abs(dx)<Math.abs(dy)*1.3)return false;
  go(active+(dx<0?1:-1));
  return true;
 }
 theatre?.addEventListener("touchstart",event=>{
  const touch=event.touches[0];if(!touch)return;
  start={x:touch.clientX,y:touch.clientY};
 },{passive:true});
 theatre?.addEventListener("touchend",event=>{
  if(!start)return;
  const touch=event.changedTouches[0];if(!touch){start=null;return}
  const dx=touch.clientX-start.x,dy=touch.clientY-start.y;
  start=null;
  if(horizontalSwipe(dx,dy))event.preventDefault();
 },{passive:false});
 theatre?.addEventListener("touchcancel",()=>{start=null},{passive:true});
 let mouseStart=null;
 theatre?.addEventListener("pointerdown",event=>{
  if(event.pointerType!=="mouse"||event.button!==0)return;
  if(event.target.closest("button,a"))return;
  mouseStart={x:event.clientX,y:event.clientY};
 },{passive:true});
 theatre?.addEventListener("pointerup",event=>{
  if(!mouseStart||event.pointerType!=="mouse")return;
  const dx=event.clientX-mouseStart.x,dy=event.clientY-mouseStart.y;
  mouseStart=null;horizontalSwipe(dx,dy);
 },{passive:true});
 theatre?.addEventListener("pointercancel",()=>{mouseStart=null},{passive:true});
 window.addEventListener("resize",setHeight,{passive:true});
 const hash=location.hash.match(/^#chapter-([1-6])$/);
 go(hash?Number(hash[1])-1:0,false);
 window.addEventListener("load",setHeight,{once:true});
 const cover=document.getElementById("v4-project-cover");
 const title=document.getElementById("v4-project-title");
 const caseLink=document.getElementById("v4-project-link");
 const options=[...document.querySelectorAll("[data-v4-project]")];
 function pick(slug){
  const project=window.PORTFOLIO?.projects?.find(p=>p.slug===slug);
  if(!project||!cover||!title||!caseLink)return;
  options.forEach(button=>{
   const selected=button.dataset.v4Project===slug;
   button.classList.toggle("is-selected",selected);
   button.setAttribute("aria-pressed",String(selected));
  });
  cover.src=project.cover;
  cover.alt="Conceptual project cover for "+project.name+", not an app screenshot";
  title.textContent=project.name;
  caseLink.href="project.html?slug="+encodeURIComponent(slug);
  if(!reduce.matches&&cover.animate)cover.animate([{opacity:.35,transform:"scale(1.04)"},{opacity:1,transform:"scale(1)"}],{duration:460,easing:"ease-out"});
  setHeight();
 }
 options.forEach(button=>button.addEventListener("click",()=>pick(button.dataset.v4Project)));
}
const hero=document.querySelector(".v4-hero");
if(hero&&!reduce.matches&&window.IntersectionObserver){
 const picture=hero.querySelector(".v4-hero__photolayer");
 const title=hero.querySelector(".v4-hero__name");
 const listen=()=>{const r=hero.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
  const progress=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height)));
  if(picture)picture.style.translate="0 "+(progress*36)+"px";
  if(title)title.style.translate="0 "+(-progress*21)+"px";
 };
 window.addEventListener("scroll",listen,{passive:true});listen();
}
})();