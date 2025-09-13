
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
              <a href="admin.html" class="btn btn-warning btn-sm"><span data-i18n="nav.admin">🛠️ หลังบ้าน</span></a>
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
  };
})();