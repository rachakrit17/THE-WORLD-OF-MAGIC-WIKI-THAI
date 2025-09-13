
(function(){
  const SCHEMAS = {
    guides:{ title:"📚 Guides", fields:[
      {k:'title_th',t:'text',label:'ชื่อเรื่อง (TH) 💜',req:true},
      {k:'title_en',t:'text',label:'Title (EN)'},
      {k:'slug',t:'text',label:'Slug',req:true},
      {k:'image',t:'text',label:'รูป (URL) 🖼️'},
      {k:'tags',t:'tags',label:'แท็ก'},
      {k:'published',t:'bool',label:'เผยแพร่'},
      {k:'content_th',t:'textarea',label:'เนื้อหา (TH)',rows:8},
      {k:'content_en',t:'textarea',label:'Content (EN)',rows:8},
    ], list:['title_th','slug','published','updatedAt']},
    classes:{ title:"🛡️ Classes", fields:[
      {k:'name_th',t:'text',label:'ชื่อ (TH)',req:true},
      {k:'name_en',t:'text',label:'Name (EN)'},
      {k:'icon',t:'text',label:'ไอคอน (URL)'},
      {k:'role',t:'select',label:'บทบาท',options:['Warrior','Ranger','Mage']},
      {k:'stats',t:'json',label:'ค่าสเตตัส (JSON)'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','role','published','updatedAt']},
    skills:{ title:"✨ Skills", fields:[
      {k:'class',t:'select',label:'อาชีพ',options:['Warrior','Ranger','Mage']},
      {k:'name_th',t:'text',label:'ชื่อสกิล (TH)',req:true},
      {k:'name_en',t:'text',label:'Skill (EN)'},
      {k:'icon',t:'text',label:'ไอคอน (URL)'},
      {k:'cooldown',t:'text',label:'คูลดาวน์'},
      {k:'cost',t:'text',label:'ค่าใช้จ่าย'},
      {k:'effect',t:'textarea',label:'เอฟเฟกต์',rows:3},
      {k:'levelReq',t:'number',label:'เลเวลที่ต้องการ'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','class','levelReq','published','updatedAt']},
    maps:{ title:"🗺️ Maps", fields:[
      {k:'name_th',t:'text',label:'ชื่อแผนที่ (TH)',req:true},
      {k:'name_en',t:'text',label:'Name (EN)'},
      {k:'image',t:'text',label:'ภาพแผนที่ (URL)'},
      {k:'levelRange',t:'text',label:'ช่วงเลเวล'},
      {k:'type',t:'text',label:'ประเภท'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','levelRange','type','published','updatedAt']},
    quests:{ title:"🧭 Quests", fields:[
      {k:'name_th',t:'text',label:'ชื่อเควสต์ (TH)',req:true},
      {k:'name_en',t:'text',label:'Quest (EN)'},
      {k:'npc',t:'text',label:'NPC'},
      {k:'chain',t:'text',label:'สายเควสต์'},
      {k:'requirements',t:'textarea',label:'เงื่อนไข',rows:3},
      {k:'rewards',t:'tags',label:'รางวัล'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','npc','chain','published','updatedAt']},
    monsters:{ title:"👾 Monsters", fields:[
      {k:'name_th',t:'text',label:'ชื่อ (TH)',req:true},
      {k:'name_en',t:'text',label:'Name (EN)'},
      {k:'image',t:'text',label:'รูป (URL)'},
      {k:'type',t:'text',label:'ประเภท'},
      {k:'level',t:'number',label:'เลเวล'},
      {k:'mapRef',t:'text',label:'แผนที่'},
      {k:'drops',t:'tags',label:'ดรอป'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','level','mapRef','published','updatedAt']},
    equipment:{ title:"⚙️ Equipment", fields:[
      {k:'name_th',t:'text',label:'ชื่อ (TH)',req:true},
      {k:'name_en',t:'text',label:'Name (EN)'},
      {k:'image',t:'text',label:'รูป (URL)'},
      {k:'type',t:'select',label:'ชนิด',options:['Weapon','Armor','Helmet','Gloves','Boots','Shield','Accessory']},
      {k:'classLimit',t:'tags',label:'จำกัดอาชีพ'},
      {k:'levelReq',t:'number',label:'เลเวลที่ต้องการ'},
      {k:'stats',t:'json',label:'สเตตัส (JSON)'},
      {k:'rarity',t:'text',label:'แรร์'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','type','levelReq','rarity','published','updatedAt']},
    items:{ title:"🎒 Items", fields:[
      {k:'name_th',t:'text',label:'ชื่อ (TH)',req:true},
      {k:'name_en',t:'text',label:'Name (EN)'},
      {k:'image',t:'text',label:'รูป (URL)'},
      {k:'type',t:'text',label:'ประเภท'},
      {k:'usage',t:'textarea',label:'การใช้',rows:3},
      {k:'effect',t:'textarea',label:'เอฟเฟกต์',rows:3},
      {k:'rarity',t:'text',label:'แรร์'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','type','rarity','published','updatedAt']},
    pets:{ title:"🐾 Pets", fields:[
      {k:'name_th',t:'text',label:'ชื่อ (TH)',req:true},
      {k:'name_en',t:'text',label:'Name (EN)'},
      {k:'image',t:'text',label:'รูป (URL)'},
      {k:'stats',t:'json',label:'สเตตัส (JSON)'},
      {k:'skills',t:'tags',label:'สกิลสัตว์เลี้ยง'},
      {k:'howToGet',t:'textarea',label:'วิธีได้มา',rows:3},
      {k:'enchantInfo',t:'textarea',label:'Pet Enchant',rows:3},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','published','updatedAt']},
    costumes:{ title:"👗 Costumes", fields:[
      {k:'name_th',t:'text',label:'ชื่อ (TH)',req:true},
      {k:'name_en',t:'text',label:'Name (EN)'},
      {k:'image',t:'text',label:'รูป (URL)'},
      {k:'slot',t:'text',label:'ตำแหน่ง'},
      {k:'bonus',t:'textarea',label:'บัฟ',rows:3},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','slot','published','updatedAt']},
    factions:{ title:"⚔️ Factions", fields:[
      {k:'name_th',t:'text',label:'ชื่อฝ่าย (TH)',req:true},
      {k:'name_en',t:'text',label:'Faction (EN)'},
      {k:'icon',t:'text',label:'ไอคอน (URL)'},
      {k:'lore_th',t:'textarea',label:'ตำนาน (TH)',rows:4},
      {k:'lore_en',t:'textarea',label:'Lore (EN)',rows:4},
      {k:'bonuses',t:'tags',label:'โบนัส'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','published','updatedAt']},
    shops:{ title:"🛒 Shops", fields:[
      {k:'name_th',t:'text',label:'ชื่อร้าน (TH)',req:true},
      {k:'name_en',t:'text',label:'Shop (EN)'},
      {k:'location',t:'text',label:'พิกัด/เมือง'},
      {k:'items',t:'tags',label:'รายการ'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','location','published','updatedAt']},
    servers:{ title:"🌐 Servers", fields:[
      {k:'name_th',t:'text',label:'ชื่อเซิร์ฟ (TH)',req:true},
      {k:'name_en',t:'text',label:'Server (EN)'},
      {k:'region',t:'text',label:'ภูมิภาค'},
      {k:'status',t:'select',label:'สถานะ',options:['Online','Maintenance','Closed']},
      {k:'openedAt',t:'datetime',label:'เปิด'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['name_th','region','status','published','updatedAt']},
    events:{ title:"🎉 Events", fields:[
      {k:'title_th',t:'text',label:'ชื่ออีเวนต์ (TH)',req:true},
      {k:'title_en',t:'text',label:'Event (EN)'},
      {k:'banner',t:'text',label:'แบนเนอร์ (URL)'},
      {k:'startsAt',t:'datetime',label:'เริ่ม'},
      {k:'endsAt',t:'datetime',label:'จบ'},
      {k:'details_th',t:'textarea',label:'รายละเอียด (TH)',rows:4},
      {k:'details_en',t:'textarea',label:'Details (EN)',rows:4},
      {k:'couponCode',t:'text',label:'คูปอง'},
      {k:'published',t:'bool',label:'เผยแพร่'}
    ], list:['title_th','startsAt','endsAt','couponCode','published','updatedAt']}
  };

  function el(tag, attrs={}, html=''){
    const e = document.createElement(tag);
    Object.entries(attrs).forEach(([k,v])=> { if(v!==undefined) e.setAttribute(k,v) });
    if(html) e.innerHTML = html;
    return e;
  }
  function renderMenu(){
    const menu = document.getElementById('adminMenu'); menu.innerHTML='';
    Object.keys(SCHEMAS).forEach(key=>{
      const a = el('a', {href:'#', class:'list-group-item list-group-item-action bg-transparent text-light border-secondary', 'data-col':key}, SCHEMAS[key].title);
      menu.appendChild(a);
    });
    menu.querySelector('a').classList.add('active');
  }

  let currentCol = 'guides', currentId = null;

  function renderForm(){
    const form = document.getElementById('adminForm'); form.innerHTML='';
    const schema = SCHEMAS[currentCol];
    document.getElementById('adminTitle').textContent = schema.title;
    schema.fields.forEach(f=>{
      const wrap = el('div', {class:'col-md-6'});
      wrap.appendChild(el('label', {class:'form-label'}, f.label + (f.req?' *':'')));
      let input;
      if(f.t==='text' || f.t==='number'){
        input = el('input', {id:f.k, class:'form-control bg-dark text-light border-secondary', type: f.t==='number'?'number':'text', required: f.req?'required':undefined});
      } else if(f.t==='textarea'){
        input = el('textarea', {id:f.k, rows:f.rows||4, class:'form-control bg-dark text-light border-secondary'});
      } else if(f.t==='bool'){
        wrap.classList.add('col-12','form-check'); wrap.classList.remove('col-md-6');
        wrap.innerHTML = `<input class="form-check-input" type="checkbox" id="${f.k}"><label class="form-check-label" for="${f.k}">${f.label}</label>`;
        form.appendChild(wrap); return;
      } else if(f.t==='select'){
        input = el('select', {id:f.k, class:'form-select bg-dark text-light border-secondary'});
        (f.options||[]).forEach(op=> input.appendChild(el('option', {value:op}, op)));
      } else if(f.t==='json'){
        input = el('textarea', {id:f.k, rows:f.rows||4, class:'form-control bg-dark text-light border-secondary', placeholder:'{ "atk": 5, "def": 2 }'});
      } else if(f.t==='tags'){
        input = el('input', {id:f.k, class:'form-control bg-dark text-light border-secondary', placeholder:'แยกด้วยคอมมา'});
      } else if(f.t==='datetime'){
        input = el('input', {id:f.k, class:'form-control bg-dark text-light border-secondary', type:'datetime-local'});
      }
      wrap.appendChild(input);
      form.appendChild(wrap);
    });
  }

  function readForm(){
    const data = {updatedAt: new Date()};
    SCHEMAS[currentCol].fields.forEach(f=>{
      const el = document.getElementById(f.k);
      if(!el) return;
      if(f.t==='bool') data[f.k] = el.checked;
      else if(f.t==='number') data[f.k] = el.value? Number(el.value): null;
      else if(f.t==='tags') data[f.k] = el.value.split(',').map(s=>s.trim()).filter(Boolean);
      else if(f.t==='json'){
        try { data[f.k] = el.value? JSON.parse(el.value): {}; } catch(e){ alert('JSON ไม่ถูกต้องที่ฟิลด์: '+f.label); throw e; }
      } else if(f.t==='datetime'){
        data[f.k] = el.value ? new Date(el.value) : null;
      } else data[f.k] = el.value;
    });
    return data;
  }

  function fillForm(obj){
    SCHEMAS[currentCol].fields.forEach(f=>{
      const elem = document.getElementById(f.k); if(!elem) return;
      const v = obj[f.k];
      if(f.t==='bool') elem.checked = !!v;
      else if(f.t==='json') elem.value = v? JSON.stringify(v, null, 2): '';
      else if(f.t==='tags') elem.value = (v||[]).join(', ');
      else if(f.t==='datetime'){
        if(v){ const dt = (v.toDate? v.toDate(): new Date(v)); elem.value = new Date(dt.getTime()-dt.getTimezoneOffset()*60000).toISOString().slice(0,16); }
      }
      else elem.value = (v ?? '');
    });
  }

  async function loadGrid(){
    const head = document.getElementById('gridHead');
    const body = document.getElementById('gridBody');
    const cols = SCHEMAS[currentCol].list;
    head.innerHTML = `<tr>${cols.map(c=>`<th>${c}</th>`).join('')}<th></th></tr>`;
    const snap = await db.collection(currentCol).orderBy('updatedAt','desc').limit(500).get();
    body.innerHTML = snap.docs.map(d=>{
      const row = cols.map(c=>{
        const v = d.data()[c];
        if(v && v.toDate) return new Date(v.toDate()).toLocaleString();
        return (typeof v === 'object' && v!==null) ? JSON.stringify(v) : (v ?? '');
      }).join('</td><td>');
      return `<tr><td>${row}</td><td><button class="btn btn-sm btn-outline-light" data-id="${d.id}">แก้ไข</button></td></tr>`;
    }).join('');
  }

  function bindEvents(){
    document.getElementById('adminMenu').addEventListener('click', async (e)=>{
      if(e.target.matches('[data-col]')){
        e.preventDefault();
        document.querySelectorAll('#adminMenu a').forEach(a=>a.classList.remove('active'));
        e.target.classList.add('active');
        currentCol = e.target.getAttribute('data-col'); currentId=null;
        renderForm(); await loadGrid();
      }
    });
    document.getElementById('gridBody').addEventListener('click', async (e)=>{
      if(e.target.matches('button[data-id]')){
        const id = e.target.getAttribute('data-id'); currentId=id;
        const doc = await db.collection(currentCol).doc(id).get();
        fillForm(doc.data());
        window.scrollTo({top:0, behavior:'smooth'});
      }
    });
    document.getElementById('btnNew').addEventListener('click', ()=>{ currentId=null; fillForm({}); });
    document.getElementById('btnDelete').addEventListener('click', async ()=>{
      if(!currentId) return;
      if(confirm('ลบรายการนี้?')){ await db.collection(currentCol).doc(currentId).delete(); currentId=null; await loadGrid(); }
    });
    document.getElementById('btnSave').addEventListener('click', async (e)=>{
      e.preventDefault();
      const data = readForm();
      if(currentId) await db.collection(currentCol).doc(currentId).set(data, {merge:true});
      else { const ref = await db.collection(currentCol).add(data); currentId = ref.id; }
      window.confetti && window.confetti(); // 🎉
      alert('บันทึกแล้ว');
      await loadGrid();
    });
  }

  // expose one-time init for gate
  window.initAdminUI = async function(){
    renderMenu(); renderForm(); bindEvents(); await loadGrid();
  };
})();