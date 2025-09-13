
# IMO Fan Hub — Full Pack (TH/EN)

Static site + Firebase Auth/Firestore + i18n + Admin (หลายโมดูล). รองรับ GitHub Pages

## คอลเลกชันหลัก
- roles, guides, classes, skills, maps, monsters, equipment, items, events
(ขยายเพิ่มได้ใน `assets/js/admin.js` ที่ตัวแปร SCHEMAS)

## เริ่มต้น
1) เปิด Firebase Auth (Google) + Firestore
2) ใส่ค่า config ใน `assets/js/firebase-init.js`
3) สร้างเอกสาร `roles/{uid}` = `{ "role": "admin" }`
4) อัป Rules ด้านล่าง
5) เปิด `admin.html` ล็อกอินและเพิ่มข้อมูล

## Firestore Rules แนะนำ
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null &&
             exists(/databases/$(database)/documents/roles/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/roles/$(request.auth.uid)).data.role == "admin";
    }
    // public read on published fields for content collections
    match /{coll}/{id} {
      allow read: if
        (coll in ['guides','classes','skills','maps','monsters','equipment','items','events'] &&
         resource.data.published == true);
      allow write: if isAdmin();
    }
    match /roles/{uid} {{ allow read, write: if isAdmin(); }}
  }
}
```
