(function(){
  /* ===== i18n ===== */
  const html = document.documentElement;
  let currentLang = localStorage.getItem('bg-lang') || 'ka';
  function setLang(l){
    currentLang = l;
    window.currentLang = l;               // expose for inline handlers (e.g. contact form)
    html.setAttribute('data-lang', l);
    html.setAttribute('lang', l);
    document.querySelectorAll('[data-set-lang]').forEach(b=>b.classList.toggle('active', b.dataset.setLang===l));
    localStorage.setItem('bg-lang', l);
  }
  setLang(currentLang);
  document.querySelectorAll('[data-set-lang]').forEach(b=>b.addEventListener('click', ()=>setLang(b.dataset.setLang)));

  /* ===== Sticky header ===== */
  const header = document.getElementById('header');
  addEventListener('scroll', ()=>header.classList.toggle('scrolled', scrollY>30));

  /* ===== Menu toggle ===== */
  const nav = document.getElementById('nav');
  document.getElementById('menuBtn')?.addEventListener('click', ()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>nav.classList.remove('open')));

  /* ===== Reveal on scroll ===== */
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{threshold:.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* ===== Marquee ===== */
  const mk = document.getElementById('marquee');
  const items = ['Front-End','React','Next.js','TypeScript','Tailwind','Prisma','PostgreSQL','Cisco','Cybersecurity','Glassmorphism','Motion','Figma','Leaflet','Docker','RBAC','WebSocket','Claude Code','Photography','3D Modeling'];
  const renderItems = ()=>{
    const blocks = items.map(i=>`<span>${i}</span>`).join('');
    mk.innerHTML = blocks + blocks;
  };
  renderItems();

  /* ===== Custom cursor ===== */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('mousemove', e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`});
  (function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;requestAnimationFrame(loop)})();
  document.querySelectorAll('a,button,.skill-card,.proj-card,.stat-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
  });

  /* ===== Parallax hero portrait ===== */
  const portrait = document.querySelector('.portrait-frame');
  const portraitTags = document.querySelectorAll('.floating-tag');
  if(portrait){
    window.addEventListener('scroll', ()=>{
      const y = Math.min(window.scrollY, 800) * 0.05;
      portrait.style.translate = `0 ${y * -0.2}px`;
      portraitTags.forEach((t,i)=>t.style.translate = `0 ${y * (0.15 + i*0.1)}px`);
    },{passive:true});
  }

  /* ===== Intro animation ===== */
  const intro = document.getElementById('intro');
  const introCv = document.getElementById('introCanvas');
  const ic = introCv.getContext('2d');
  function sizeIntro(){introCv.width=innerWidth*devicePixelRatio;introCv.height=innerHeight*devicePixelRatio;introCv.style.width=innerWidth+'px';introCv.style.height=innerHeight+'px';ic.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
  sizeIntro();
  addEventListener('resize', sizeIntro);
  const stars = Array.from({length:140},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.3,v:Math.random()*.4+.1}));
  function drawIntro(){
    ic.fillStyle='rgba(0,0,0,0.25)';ic.fillRect(0,0,innerWidth,innerHeight);
    ic.fillStyle='#fff';
    stars.forEach(s=>{
      s.y+=s.v;if(s.y>innerHeight){s.y=0;s.x=Math.random()*innerWidth}
      ic.beginPath();ic.arc(s.x,s.y,s.r,0,Math.PI*2);ic.fill();
    });
    requestAnimationFrame(drawIntro);
  }
  drawIntro();
  setTimeout(()=>intro.classList.add('hide'), 2400);

  /* ===== Hero animated background (gradient mesh) ===== */
  const heroCv = document.getElementById('heroCanvas');
  const hc = heroCv.getContext('2d');
  let hx=0;
  function drawHero(){
    heroCv.width = heroCv.offsetWidth*devicePixelRatio;
    heroCv.height = heroCv.offsetHeight*devicePixelRatio;
    hc.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    hx += .002;
    const w = heroCv.offsetWidth, h = heroCv.offsetHeight;
    // Soft mesh gradient blobs
    const g1 = hc.createRadialGradient(w*.7 + Math.sin(hx)*40, h*.2 + Math.cos(hx*1.4)*30, 50, w*.7, h*.2, 600);
    g1.addColorStop(0,'rgba(244,180,0,.35)');g1.addColorStop(1,'rgba(244,180,0,0)');
    hc.fillStyle=g1;hc.fillRect(0,0,w,h);
    const g2 = hc.createRadialGradient(w*.2 + Math.sin(hx*1.7)*30, h*.75 + Math.cos(hx)*40, 50, w*.2, h*.75, 700);
    g2.addColorStop(0,'rgba(14,165,233,.18)');g2.addColorStop(1,'rgba(14,165,233,0)');
    hc.fillStyle=g2;hc.fillRect(0,0,w,h);
    const g3 = hc.createRadialGradient(w*.5 + Math.cos(hx*1.2)*40, h*.5 + Math.sin(hx)*40, 50, w*.5, h*.5, 500);
    g3.addColorStop(0,'rgba(17,17,17,.05)');g3.addColorStop(1,'rgba(17,17,17,0)');
    hc.fillStyle=g3;hc.fillRect(0,0,w,h);
    requestAnimationFrame(drawHero);
  }
  drawHero();

})();
