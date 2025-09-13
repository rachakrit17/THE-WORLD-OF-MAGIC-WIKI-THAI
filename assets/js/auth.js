
(function(){
  function setBtn(user){
    const btn = document.getElementById('btnLogin'); if(!btn) return;
    if(user){ btn.textContent = i18next.t('auth.signOut'); btn.classList.add('btn-success'); btn.classList.remove('btn-outline-light'); }
    else { btn.textContent = i18next.t('auth.signIn'); btn.classList.remove('btn-success'); btn.classList.add('btn-outline-light'); }
  }
  document.addEventListener('click', async (e)=>{
    if(e.target && e.target.id==='btnLogin'){
      const u = auth.currentUser;
      if(u) await auth.signOut();
      else { const provider = new firebase.auth.GoogleAuthProvider(); await auth.signInWithPopup(provider); }
    }
  });
  auth.onAuthStateChanged(u=>setBtn(u));
})();