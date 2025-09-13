
(function(){
  const resources = {
    th:{translation:{
      "nav":{
        "home":"🏠 หน้าแรก",
        "guides":"📚 ไกด์",
        "explore":"🗂️ สำรวจ",
        "classes":"🛡️ อาชีพ",
        "skills":"✨ สกิล",
        "maps":"🗺️ แผนที่",
        "quests":"🧭 เควสต์",
        "monsters":"👾 มอนสเตอร์",
        "equipment":"⚙️ อุปกรณ์",
        "items":"🎒 ไอเทม",
        "pets":"🐾 สัตว์เลี้ยง",
        "costumes":"👗 ชุดแฟชั่น",
        "factions":"⚔️ ฝ่าย",
        "shops":"🛒 ร้านค้า",
        "servers":"🌐 เซิร์ฟเวอร์",
        "events":"🎉 อีเวนต์",
        "news":"📰 ข่าว",
        "admin":"🛠️ หลังบ้าน",
        "search":"🔎 ค้นหา"
      },
      "auth":{"signIn":"เข้าสู่ระบบ","signOut":"ออกจากระบบ"},
      "hero":{"title":"✨ ศูนย์รวมแฟนเกม The World of Magic","subtitle":"ฐานความรู้ภาษาไทย ครบทั้งไกด์ อาชีพ แผนที่ อุปกรณ์ และกิจกรรม","cta":"เริ่มสำรวจ 🚀"},
      "home":{"latestGuides":"📌 ไกด์ล่าสุด","browseBy":"📁 สำรวจตามหมวด"},
      "footer":{"privacy":"นโยบายความเป็นส่วนตัว"}
    }},
    en:{translation:{
      "nav":{
        "home":"🏠 Home",
        "guides":"📚 Guides",
        "explore":"🗂️ Explore",
        "classes":"🛡️ Classes",
        "skills":"✨ Skills",
        "maps":"🗺️ Maps",
        "quests":"🧭 Quests",
        "monsters":"👾 Monsters",
        "equipment":"⚙️ Equipment",
        "items":"🎒 Items",
        "pets":"🐾 Pets",
        "costumes":"👗 Costumes",
        "factions":"⚔️ Factions",
        "shops":"🛒 Shops",
        "servers":"🌐 Servers",
        "events":"🎉 Events",
        "news":"📰 News",
        "admin":"🛠️ Admin",
        "search":"🔎 Search"
      },
      "auth":{"signIn":"Sign in","signOut":"Sign out"},
      "hero":{"title":"✨ The World of Magic — Fan Hub","subtitle":"Thai/English knowledge base for guides, classes, maps, gear and events","cta":"Browse now 🚀"},
      "home":{"latestGuides":"📌 Latest Guides","browseBy":"📁 Browse by category"},
      "footer":{"privacy":"Privacy"}
    }}
  };
  window.i18nInit = function(lang){
    i18next.init({lng: lang || localStorage.getItem('lang') || 'th', resources}, function(){
      document.querySelectorAll("[data-i18n]").forEach(el => el.innerHTML = i18next.t(el.getAttribute("data-i18n")));
      const sel = document.getElementById('langSelect'); if(sel){ sel.value = i18next.language; }
    });
  };
  window.switchLang = function(lang){
    i18next.changeLanguage(lang, ()=>{
      localStorage.setItem('lang', lang);
      document.querySelectorAll("[data-i18n]").forEach(el => el.innerHTML = i18next.t(el.getAttribute("data-i18n")));
      document.dispatchEvent(new CustomEvent('langchanged',{detail:lang}));
    });
  };
})();