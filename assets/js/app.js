
(function(){
  window.renderShell = function(){
    const top = document.getElementById('topnav');
    if(top){
      top.outerHTML = `<nav class="navbar navbar-expand-lg navbar-dark bg-gradient shadow-sm">
        <div class="container">
          <a class="navbar-brand fw-bold" href="index.html">IMO</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="nav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"><a class="nav-link" href="guides.html" data-i18n="nav.guides">📚 ไกด์</a></li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="exploreDrop" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-i18n="nav.explore">🗂️ สำรวจ</a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item" href="classes.html" data-i18n="nav.classes">🛡️ อาชีพ</a></li>
                  <li><a class="dropdown-item" href="skills.html" data-i18n="nav.skills">✨ สกิล</a></li>
                  <li><a class="dropdown-item" href="maps.html" data-i18n="nav.maps">🗺️ แผนที่</a></li>
                  <li><a class="dropdown-item" href="quests.html" data-i18n="nav.quests">🧭 เควสต์</a></li>
                  <li><a class="dropdown-item" href="monsters.html" data-i18n="nav.monsters">👾 มอนสเตอร์</a></li>
                  <li><a class="dropdown-item" href="equipment.html" data-i18n="nav.equipment">⚙️ อุปกรณ์</a></li>
                  <li><a class="dropdown-item" href="items.html" data-i18n="nav.items">🎒 ไอเทม</a></li>
                  <li><a class="dropdown-item" href="pets.html" data-i18n="nav.pets">🐾 สัตว์เลี้ยง</a></li>
                  <li><a class="dropdown-item" href="costumes.html" data-i18n="nav.costumes">👗 ชุดแฟชั่น</a></li>
                  <li><a class="dropdown-item" href="factions.html" data-i18n="nav.factions">⚔️ ฝ่าย</a></li>
                  <li><a class="dropdown-item" href="shops.html" data-i18n="nav.shops">🛒 ร้านค้า</a></li>
                  <li><a class="dropdown-item" href="servers.html" data-i18n="nav.servers">🌐 เซิร์ฟเวอร์</a></li>
                </ul>
              </li>
              <li class="nav-item"><a class="nav-link" href="events.html" data-i18n="nav.events">🎉 อีเวนต์</a></li>
              <li class="nav-item"><a class="nav-link" href="news.html" data-i18n="nav.news">📰 ข่าว</a></li>
            </ul>
            <div class="d-flex gap-2">
              <button id="btnSearch" class="btn btn-neon btn-sm" aria-label="Search" data-i18n="nav.search">🔎 ค้นหา</button>
              <select id="langSelect" class="form-select form-select-sm bg-dark text-light border-secondary w-auto">
                <option value="th">TH</option><option value="en">EN</option>
              </select>
              <button id="btnLogin" class="btn btn-outline-light btn-sm" data-i18n="auth.signIn">เข้าสู่ระบบ</button>
              <a href="admin.html" class="btn btn-warning btn-sm"><span data-i18n="nav.admin">หลังบ้าน</span></a>
            </div>
          </div>
        </div>
      </nav>`;
    }
    // footer
    const f = document.getElementById('footer');
    if(f){
      f.outerHTML = `<footer class="py-4 border-top border-secondary">
        <div class="container small d-flex justify-content-between">
          <span>&copy; <span id="year"></span> IMO Fan Hub</span>
          <div class="d-flex gap-3"><a href="#" class="link-light">💜</a></div>
        </div>
      </footer>`;
    }
    const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
    window.i18nInit && window.i18nInit();
    document.getElementById('langSelect')?.addEventListener('change', e=> window.switchLang(e.target.value));

    // Search overlay
    if(!document.getElementById('searchOverlay')){
      const div = document.createElement('div');
      div.id='searchOverlay';
      div.className='search-overlay';
      div.innerHTML = `<div class="search-box neon">
        <div class="input-group">
          <span class="input-group-text bg-dark text-light border-secondary">🔎</span>
          <input id="searchInput" class="form-control bg-dark text-light border-secondary" placeholder="พิมพ์เพื่อค้นหา… (กด Esc เพื่อปิด)">
          <button class="btn btn-outline-light" id="searchClose">✖</button>
        </div>
        <div id="searchResults" class="search-results mt-3"></div>
      </div>`;
      document.body.appendChild(div);
    }
    document.getElementById('btnSearch')?.addEventListener('click', ()=> showSearch());
    document.getElementById('searchClose')?.addEventListener('click', ()=> hideSearch());
    document.addEventListener('keydown', (e)=>{ if(e.key === '/') { e.preventDefault(); showSearch(); } if(e.key==='Escape') hideSearch(); });

    function showSearch(){ document.getElementById('searchOverlay').classList.add('show'); setTimeout(()=> document.getElementById('searchInput').focus(), 0); }
    function hideSearch(){ document.getElementById('searchOverlay').classList.remove('show'); }

    document.getElementById('searchInput')?.addEventListener('input', debounce(async (e)=>{
      const term = e.target.value.trim().toLowerCase();
      const box = document.getElementById('searchResults');
      if(!term){ box.innerHTML=''; return; }
      const collections = ['guides','classes','skills','maps','quests','monsters','equipment','items','pets','costumes','factions','shops','servers','events'];
      const results = [];
      for(const col of collections){
        const snap = await db.collection(col).limit(50).get();
        snap.docs.forEach(d=>{
          const o = d.data();
          const text = JSON.stringify(o).toLowerCase();
          if(text.includes(term)){
            const title = o.title_th || o.name_th || o.title_en || o.name_en || o.slug || '(no title)';
            results.push({col, title, id:d.id, slug:o.slug});
          }
        });
      }
      box.innerHTML = results.slice(0,50).map(r=>`<a class="list-group-item list-group-item-action bg-transparent text-light border-secondary" href="${linkFor(r)}">🔥 ${r.title} <span class="small opacity-75">[${r.col}]</span></a>`).join('') || '<div class="text-secondary">ไม่พบข้อมูล</div>';
    }, 300));

    function linkFor(r){
      const map = {guides:'guides.html', classes:'classes.html', skills:'skills.html', maps:'maps.html', quests:'quests.html', monsters:'monsters.html', equipment:'equipment.html', items:'items.html', pets:'pets.html', costumes:'costumes.html', factions:'factions.html', shops:'shops.html', servers:'servers.html', events:'events.html'};
      return (r.col==='guides' && r.slug) ? `${map[r.col]}#${r.slug}` : map[r.col];
    }

    function debounce(fn,ms){ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args),ms);} }

    // Floating FAB to top
    if(!document.getElementById('fab')){
      const fab = document.createElement('div'); fab.id='fab'; fab.className='fab';
      fab.innerHTML = `<button class="btn btn-neon">⬆️</button>`;
      fab.querySelector('button').addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
      document.body.appendChild(fab);
    }
  };

  // Generic list render with image link support
  window.renderCollectionCards = async function({col, containerId, titleKey_th='name_th', titleKey_en='name_en', subtitleKeys=[]}){
    const con = document.getElementById(containerId); if(!con) return;
    const lang = i18next.language || 'th';
    const snap = await db.collection(col).where('published','==', true).orderBy('updatedAt','desc').limit(200).get();
    con.innerHTML = snap.docs.map(d=>{
      const data = d.data();
      const title = (lang==='th' && data[titleKey_th]) ? data[titleKey_th] : (data[titleKey_en]||'');
      const sub = subtitleKeys.map(k=>data[k]).filter(Boolean).join(' • ');
      const img = data.image || data.icon || '';
      return `<div class="col-sm-6 col-xl-4">
        <div class="card h-100 neon tilt glow-pulse">
          ${img ? `<img src="${img}" class="card-img-top" alt="" style="object-fit:cover; height:140px; border-bottom:1px solid rgba(255,255,255,.06)">` : ''}
          <div class="card-body">
            <h3 class="h6 mb-2">💜 ${title}</h3>
            ${sub? `<div class="small opacity-75">${sub}</div>`:''}
          </div>
        </div>
      </div>`;
    }).join('');
    window.enableTilt && window.enableTilt();
  };
})();