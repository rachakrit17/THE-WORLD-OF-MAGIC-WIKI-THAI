
(function(){
  window.renderShell = function(){
    // top navbar
    const top = document.getElementById('topnav');
    if(top){
      top.outerHTML = `<nav class="navbar navbar-expand-lg navbar-dark bg-gradient shadow-sm">
        <div class="container">
          <a class="navbar-brand fw-bold" href="index.html">IMO</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="nav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"><a class="nav-link" href="guides.html" data-i18n="nav.guides">Guides</a></li>
              <li class="nav-item"><a class="nav-link" href="classes.html" data-i18n="nav.classes">Classes</a></li>
              <li class="nav-item"><a class="nav-link" href="skills.html" data-i18n="nav.skills">Skills</a></li>
              <li class="nav-item"><a class="nav-link" href="maps.html" data-i18n="nav.maps">Maps</a></li>
              <li class="nav-item"><a class="nav-link" href="monsters.html" data-i18n="nav.monsters">Monsters</a></li>
              <li class="nav-item"><a class="nav-link" href="equipment.html" data-i18n="nav.equipment">Equipment</a></li>
              <li class="nav-item"><a class="nav-link" href="items.html" data-i18n="nav.items">Items</a></li>
              <li class="nav-item"><a class="nav-link" href="events.html" data-i18n="nav.events">Events</a></li>
              <li class="nav-item"><a class="nav-link" href="news.html" data-i18n="nav.news">News</a></li>
            </ul>
            <div class="d-flex gap-2">
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
          <a href="#" class="link-light" data-i18n="footer.privacy">นโยบายความเป็นส่วนตัว</a>
        </div>
      </footer>`;
    }
    const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
    window.i18nInit && window.i18nInit();
    document.getElementById('langSelect')?.addEventListener('change', e=> window.switchLang(e.target.value));
  };

  // Helpers
  window.qs = (sel)=> document.querySelector(sel);
  window.qsa = (sel)=> Array.from(document.querySelectorAll(sel));

  // Generic list render for a collection
  window.renderCollectionCards = async function({col, containerId, titleKey_th='name_th', titleKey_en='name_en', subtitleKeys=[]}){
    const con = document.getElementById(containerId); if(!con) return;
    const lang = i18next.language || 'th';
    const snap = await db.collection(col).where('published','==', true).orderBy('updatedAt','desc').limit(100).get();
    con.innerHTML = snap.docs.map(d=>{
      const data = d.data();
      const title = (lang==='th' && data[titleKey_th]) ? data[titleKey_th] : (data[titleKey_en]||'');
      const sub = subtitleKeys.map(k=>data[k]).filter(Boolean).join(' • ');
      return `<div class="col-md-6 col-xl-4">
        <div class="card h-100 neon">
          <div class="card-body">
            <h3 class="h6 mb-2">${title}</h3>
            <div class="small opacity-75">${sub||''}</div>
          </div>
        </div>
      </div>`;
    }).join('');
  };

  document.addEventListener('DOMContentLoaded', ()=>{
    window.renderShell && window.renderShell();
  });
})();