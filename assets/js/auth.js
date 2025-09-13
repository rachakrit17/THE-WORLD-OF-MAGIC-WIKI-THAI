(function(){
  function setBtn(user){
    const btn = document.getElementById('btnLogin'); if(!btn) return;
    if(user){ btn.textContent = i18next.t('auth.signOut'); btn.classList.add('btn-success'); btn.classList.remove('btn-outline-light'); }
    else { btn.textContent = i18next.t('auth.signIn'); btn.classList.remove('btn-success'); btn.classList.add('btn-outline-light'); }
  }
  document.addEventListener('click', async (e)=>{
    if(e.target && e.target.id==='btnLogin'){
      if(!window.auth){ alert('Firebase ยังไม่พร้อม (auth)'); return; }
      const u = auth.currentUser;
      if(u) await auth.signOut();
      else {
        const provider = new firebase.auth.GoogleAuthProvider();
        try { await auth.signInWithPopup(provider); }
        catch (err) {
          if (['auth/popup-blocked','auth/operation-not-supported-in-this-environment','auth/cancelled-popup-request'].includes(err?.code)) {
            try { await auth.signInWithRedirect(provider); } catch (e2) { alert(e2.message||'Login error'); }
          } else { alert(err.message||'Login error'); }
        }
      }
    }
  });
  if (window.auth) auth.onAuthStateChanged(u=>setBtn(u));
})();