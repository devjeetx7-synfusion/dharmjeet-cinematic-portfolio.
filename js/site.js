(()=>{"use strict";const DATA=window.PORTFOLIO||{projects:[]},$=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s)),escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])),projectLink=p=>"project.html?slug="+encodeURIComponent(p.slug);
function cards(ps){return ps.map(p=>'<a class="project-card reveal" href="'+projectLink(p)+'" aria-label="View '+escape(p.name)+' case study"><div class="project-card__visual"><img src="'+p.cover+'" alt="Conceptual cover artwork for '+escape(p.name)+'" width="960" height="740" loading="lazy"><span class="project-card__view">View<br>project ↗</span></div><div class="project-card__footer"><div><p class="eyebrow">'+escape(p.type)+'</p><h3>'+escape(p.name)+'</h3></div><span class="project-card__year">'+p.year+' ↗</span></div></a>').join("")}
function renderProjects(){const f=$("#featured-grid");if(f)f.innerHTML=cards(DATA.projects.filter(p=>p.featured));const all=$("#all-projects");if(!all)return;function show(filter){const list=DATA.projects.filter(p=>filter==="all"||p.category===filter);all.innerHTML=cards(list);const n=$("#filter-count");if(n)n.textContent=String(list.length).padStart(2,"0");observe()}show("all");$$("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{$$("[data-filter]").forEach(b=>{b.classList.toggle("active",b===btn);b.setAttribute("aria-pressed",String(b===btn))});show(btn.dataset.filter)}))}
function renderCase(){const root=$("#case-study");if(!root)return;const slug=new URLSearchParams(location.search).get("slug"),p=DATA.projects.find(x=>x.slug===slug);if(!p){root.innerHTML='<section class="not-found container"><p class="eyebrow">404 / Project not found</p><h1>Not found.</h1><a class="button button-dark" href="work.html">View all projects ↗</a></section>';return}document.title=p.name+" — Dharmjeet Singh";const next=DATA.projects[(DATA.projects.indexOf(p)+1)%DATA.projects.length],buttons=p.links.length?p.links.map(l=>'<a href="'+escape(l.url)+'" target="_blank" rel="noopener noreferrer" class="button button-dark">'+escape(l.label)+' <span>↗</span></a>').join(""):'<p>Private source; a public repository link is not available.</p>';root.innerHTML='<section class="case-hero"><div class="container"><a href="work.html" class="back-link">← All projects</a><div class="case-head"><p class="eyebrow light">'+p.number+' / '+escape(p.type)+'</p><h1 class="case-title">'+escape(p.name)+'<span class="period">.</span></h1><p class="case-tagline">'+escape(p.tagline)+'</p></div><div class="case-cover"><img src="'+p.cover+'" width="960" height="740" alt="Conceptual cover for '+escape(p.name)+'"></div></div></section><section class="section section-light"><div class="container case-detail"><div class="case-lede"><p class="eyebrow">The overview</p><h2>'+escape(p.summary)+'</h2></div><div class="case-data"><div><span>Discipline</span><strong>'+escape(p.type)+'</strong></div><div><span>Year</span><strong>'+escape(p.year)+'</strong></div><div><span>Status</span><strong>'+escape(p.status)+'</strong></div></div><div class="case-text-grid"><div><p class="eyebrow">01 / Challenge</p><h3>The problem.</h3><p>'+escape(p.challenge)+'</p></div><div><p class="eyebrow">02 / Solution</p><h3>The experience.</h3><p>'+escape(p.solution)+'</p></div></div><div class="feature-list">'+p.features.map((x,i)=>'<div class="feature-row"><span>'+String(i+1).padStart(2,"0")+'</span><h3>'+escape(x)+'</h3><span class="feature-symbol">↗</span></div>').join("")+'</div><div class="stack-list"><span class="eyebrow">Built with</span>'+p.stack.map(x=>'<span class="tech-pill">'+escape(x)+'</span>').join("")+'</div><p class="asset-note">This visual is original conceptual artwork, not a screenshot from the actual Android app. Real screenshots can be added later.</p><div class="case-actions">'+buttons+'</div></div></section><a href="'+projectLink(next)+'" class="next-project"><div class="container"><p class="eyebrow light">Next project</p><h2 class="display">'+escape(next.name)+' ↗</h2></div></a>'}
function nav(){const btn=$(".menu-toggle"),panel=$("#menu-panel");if(!btn||!panel)return;const set=open=>{btn.setAttribute("aria-expanded",String(open));btn.setAttribute("aria-label",open?"Close menu":"Open menu");panel.classList.toggle("is-open",open);panel.setAttribute("aria-hidden",String(!open));panel.inert=!open;document.body.classList.toggle("menu-open",open)};btn.addEventListener("click",()=>set(btn.getAttribute("aria-expanded")!=="true"));panel.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>set(false)));document.addEventListener("keydown",e=>{if(e.key==="Escape")set(false)})}
function observe(){const items=$$(".reveal:not(.is-observed)");if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion:reduce)").matches){items.forEach(x=>x.classList.add("is-visible"));return}const io=new IntersectionObserver((entries,observer)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");observer.unobserve(e.target)}}),{threshold:.09});items.forEach(x=>{x.classList.add("is-observed");io.observe(x)})}
async function gitHub(){const target=$("#github-repos");if(!target)return;let repos=[];try{const ctrl=new AbortController(),t=setTimeout(()=>ctrl.abort(),6000),response=await fetch("https://api.github.com/users/"+DATA.github+"/repos?sort=updated&per_page=100",{signal:ctrl.signal});clearTimeout(t);if(!response.ok)throw Error("API unavailable");const data=await response.json();repos=data.filter(r=>!r.fork).slice(0,6).map(r=>({name:r.name,url:r.html_url,description:r.description||"Public repository",language:r.language||"Code"}));$("#public-repo-count").textContent=String(data.length);$("#github-data-label").textContent="Live public GitHub repositories"}catch(e){repos=["OfficeMitra","TurtleX","Jump-Adventure","SM-Traders","YouTube-Video-Player","WorkDaily-AppShow"].map(name=>({name,url:"https://github.com/"+DATA.github+"/"+name,description:"Public code & development updates",language:"GitHub"}));$("#public-repo-count").textContent="—";$("#github-data-label").textContent="Selected public repositories"}target.innerHTML=repos.map(r=>'<a class="repo-card reveal" target="_blank" rel="noopener noreferrer" href="'+escape(r.url)+'"><div class="repo-card__top"><span>'+escape(r.language)+'</span><span>↗</span></div><h3>'+escape(r.name)+'</h3><p>'+escape(r.description)+'</p></a>').join("");observe()}
function motion(){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;if(!window.gsap||!window.ScrollTrigger)return;gsap.registerPlugin(ScrollTrigger);if($(".hero__word"))gsap.from(".hero__word",{yPercent:110,opacity:.5,ease:"power3.out",duration:1.1,stagger:.13});$$("[data-parallax]").forEach(el=>gsap.to(el,{yPercent:Number(el.dataset.parallax)||-8,ease:"none",scrollTrigger:{trigger:el.closest("section")||el,start:"top bottom",end:"bottom top",scrub:true}}));if($(".horizontal-marquee"))gsap.to(".horizontal-marquee",{xPercent:-18,ease:"none",scrollTrigger:{trigger:".marquee-band",start:"top bottom",end:"bottom top",scrub:true}})}
function initStory(){
 const page=$(".story-page");if(!page)return;
 const reduced=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
 const chapters=$("[data-story-chapter]"),storyLinks=$("[data-story-link]"),number=$("#story-active"),fill=$(".story-progress__fill");
 const reveals=$(".story-reveal");
 if(!reduced && "IntersectionObserver" in window){
   reveals.forEach(el=>el.classList.add("story-pending"));
   const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{
     if(entry.isIntersecting){entry.target.classList.remove("story-pending");entry.target.classList.add("story-visible");observer.unobserve(entry.target)}
   })},{threshold:.08,rootMargin:"0px 0px -6% 0px"});
   reveals.forEach(el=>observer.observe(el));
 }else{reveals.forEach(el=>el.classList.add("story-visible"))}
 let ticking=false,lastActive=0;
 function updateProgress(){
   ticking=false;
   let active=1;
   for(const section of chapters){if(section.getBoundingClientRect().top<=window.innerHeight*.52)active=Number(section.dataset.storyChapter)}
   active=Math.max(1,Math.min(chapters.length,active));
   if(active!==lastActive){
     lastActive=active;
     if(number)number.textContent=String(active).padStart(2,"0");
     for(const link of storyLinks){
       if(Number(link.dataset.storyLink)===active)link.setAttribute("aria-current","step");
       else link.removeAttribute("aria-current");
     }
   }
   if(fill){
     const pc=active/Math.max(1,chapters.length)*100;
     if(window.matchMedia("(max-width:720px)").matches){fill.style.width=pc+"%";fill.style.height="100%"}
     else{fill.style.height=pc+"%";fill.style.width="100%"}
   }
 }
 const onScroll=()=>{if(ticking)return;ticking=true;window.requestAnimationFrame(updateProgress)};
 window.addEventListener("scroll",onScroll,{passive:true});
 window.addEventListener("resize",onScroll,{passive:true});
 updateProgress();
 const buttons=$("[data-story-project]"),cover=$("#story-project-cover"),title=$("#story-project-title"),desc=$("#story-project-description"),link=$("#story-project-link"),num=$("#story-project-number");
 function chooseProject(slug){
   const project=DATA.projects.find(p=>p.slug===slug);
   if(!project||!cover||!title||!desc||!link)return;
   buttons.forEach(b=>{const selected=b.dataset.storyProject===slug;b.classList.toggle("is-active",selected);b.setAttribute("aria-pressed",String(selected))});
   cover.src=project.cover;cover.alt="Original concept artwork for "+project.name+", not an app screenshot";
   title.textContent=project.name;desc.textContent=project.summary;link.href=projectLink(project);
   if(num)num.textContent=project.number||"01";
   // Web Animations API: reliable crossfade motion on direct user interaction.
   if(!reduced&&typeof cover.animate==="function"){
     cover.animate([{opacity:.4,transform:"scale(1.035)"},{opacity:1,transform:"scale(1)"}],{duration:470,easing:"cubic-bezier(.16,1,.3,1)"});
   }
 }
 buttons.forEach(button=>button.addEventListener("click",()=>chooseProject(button.dataset.storyProject)));
}
function magnets(){if(!matchMedia("(pointer:fine)").matches||matchMedia("(prefers-reduced-motion:reduce)").matches)return;$$(".magnetic").forEach(b=>{b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();b.style.transform="translate("+((e.clientX-r.left-r.width/2)*.14)+"px,"+((e.clientY-r.top-r.height/2)*.14)+"px)"});b.addEventListener("pointerleave",()=>b.style.transform="")})}
document.addEventListener("DOMContentLoaded",()=>{nav();initStory();renderProjects();renderCase();gitHub();observe();motion();magnets();$$(".current-year").forEach(x=>x.textContent=new Date().getFullYear());const k=$("#local-time");if(k)k.textContent=new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit"}).format(new Date())+" IST";document.documentElement.classList.add("is-ready")})})();