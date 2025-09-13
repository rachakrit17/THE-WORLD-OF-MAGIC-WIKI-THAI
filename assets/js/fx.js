
// Tiny tilt effect + confetti 🎉
(function(){
  window.enableTilt = function(sel='.tilt'){
    document.querySelectorAll(sel).forEach(card=>{
      card.addEventListener('mousemove', e=>{
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateY(${x*6}deg) rotateX(${ -y*6 }deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', ()=> card.style.transform='');
    });
  };
  window.confetti = function(x=window.innerWidth-40, y=window.innerHeight-40){
    const emoji = ['🎉','✨','💜','🪄','🌟','⚡'];
    for(let i=0;i<18;i++){
      const s = document.createElement('div');
      s.textContent = emoji[(Math.random()*emoji.length)|0];
      s.style.position='fixed'; s.style.left=x+'px'; s.style.top=y+'px';
      s.style.fontSize=(18+Math.random()*22)+'px'; s.style.transition='transform 900ms ease, opacity 900ms ease';
      document.body.appendChild(s);
      requestAnimationFrame(()=>{
        const dx = (Math.random()-0.5)*200;
        const dy = (Math.random()-0.8)*240-60;
        s.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random()*360}deg)`;
        s.style.opacity = 0;
      });
      setTimeout(()=> s.remove(), 1000);
    }
  };
})();