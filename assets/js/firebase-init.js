
// Firebase init (Compat) — using user's config
(function(){
  if (typeof firebase === 'undefined') {
    console.error('[Firebase] SDK not loaded');
    return;
  }
  const firebaseConfig = {
    apiKey: "AIzaSyDMIBSNT1FkK8XYQyQFldw3txnh1DbVspM",
    authDomain: "the-world-of-magic-wiki-thai.firebaseapp.com",
    projectId: "the-world-of-magic-wiki-thai",
    storageBucket: "the-world-of-magic-wiki-thai.firebasestorage.app",
    messagingSenderId: "1051629461515",
    appId: "1:1051629461515:web:7063ffb41838538781e70e",
    measurementId: "G-E7G0R3QY0C"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  // expose globals so admin/login can use them
  window.auth = firebase.auth();
  window.db = firebase.firestore();
  try { window.auth.useDeviceLanguage(); } catch(e){}
  console.log('[Firebase] Ready:', firebase.app().name);
})();