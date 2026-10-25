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
  const min=mobile?740:665;
  stage.style.height=Math.max(min,slide.scrollHeight+22)+"px";
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
 let startX=null,startY=null;
 theatre?.addEventListener("pointerdown",event=>{
  if(event.target.closest("button, a"))return;
  if(event.pointerType==="mouse"&&event.button!==0)return;
  startX=event.clientX;startY=event.clientY;
 },{passive:true});
 theatre?.addEventListener("pointerup",event=>{
  if(startX===null)return;
  const dx=event.clientX-startX,dy=event.clientY-startY;
  startX=null;startY=null;
  if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25)go(active+(dx<0?1:-1));
 },{passive:true});
 theatre?.addEventListener("pointercancel",()=>{startX=null;startY=null});
 const ro=typeof ResizeObserver!=="undefined"?new ResizeObserver(()=>setHeight()):null;
 slides.forEach(s=>ro?.observe(s));
 window.addEventListener("resize",setHeight,{passive:true});
 const hash=location.hash.match(/^#chapter-([1-6])$/);
 go(hash?Number(hash[1])-1:0,false);
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