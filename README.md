
# IMO Fan Hub — Ultimate (TH/EN)

Static site + Firebase Auth/Firestore + i18n + Admin (ครบทุกโมดูล) + Bulk Import/Export + Attribution page

## คอลเลกชันหลัก
roles, guides, classes, skills, maps, quests, monsters, equipment, items, pets, costumes, factions, shops, servers, events, attributions

## เริ่มต้น
1) Firebase Auth (Google) + Firestore
2) ใส่ config ใน `assets/js/firebase-init.js`
3) `roles/{uid}` = `{ "role": "admin" }`
4) อัป Rules ด้านล่าง
5) เปิด `admin.html`, เลือกคอลเลกชันซ้ายมือ, กรอก/นำเข้า JSON/CSV

## Attribution / CC
- หากนำข้อความจากแหล่ง CC BY-SA (เช่นบางส่วนของ Fandom wiki) ต้องใส่เครดิต **และ** ปล่อยข้อมูลที่ดัดแปลงภายใต้ CC BY-SA ด้วย
- รูปภาพอาจมีลิขสิทธิ์ต่างกันในแต่ละไฟล์ ควรตรวจสอบก่อนใช้
- เก็บเครดิตไว้ในคอลเลกชัน `attributions` แล้วหน้า `license.html` จะแสดงออโต้

## Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null &&
             exists(/databases/$(database)/documents/roles/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/roles/$(request.auth.uid)).data.role == "admin";
    }
    match /{coll}/{id} {
      allow read: if
        (coll in ['guides','classes','skills','maps','quests','monsters','equipment','items','pets','costumes','factions','shops','servers','events','attributions']
         && resource.data.published == true);
      allow write: if isAdmin();
    }
    match /roles/{uid} { allow read, write: if isAdmin(); }
  }
}
```
