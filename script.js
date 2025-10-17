document.addEventListener("DOMContentLoaded", () => {
  const timeEl = document.querySelector('[data-testid="test-user-time"]');
  const avatarImg = document.querySelector('[data-testid="test-user-avatar"]');
  const avatarUrlInput = document.getElementById("avatar-url");
  const avatarFileInput = document.getElementById("avatar-file");
  const avatarClear = document.getElementById("avatar-clear");
  const setUrlBtn = document.getElementById('avatar-set-url');

  const defaultAvatar = "";
  const saved = localStorage.getItem('profile-avatar');
  if (saved) {
    avatarImg.src = saved;
    avatarUrlInput.value = saved;
  } else if (defaultAvatar) {
    avatarImg.src = defaultAvatar;
  }

  const statusEl = document.getElementById('avatar-status');

  function setAvatarSrc(src) {
    if (!avatarImg) return;
    avatarImg.classList.add('fading');
    avatarImg.onload = function() {
      avatarImg.classList.remove('fading');
      if (statusEl) statusEl.textContent = 'Avatar updated';
      try { localStorage.setItem('profile-avatar', avatarImg.src); } catch (e) {}
    };
    avatarImg.onerror = function() {
      avatarImg.classList.remove('fading');
      avatarImg.src = '';
      if (statusEl) statusEl.textContent = 'Failed to load avatar';
      try { localStorage.removeItem('profile-avatar'); } catch (e) {}
    };
    avatarImg.src = src || '';
  }

  function updateTime() {
    const now = Date.now();
    if (timeEl) timeEl.textContent = String(now);
  }
  updateTime();
  setInterval(updateTime, 1000);

  avatarUrlInput.addEventListener("change", (e) => {
    const url = (e.target.value || "").trim();
    if (!url) {
      setAvatarSrc('');
      return;
    }
    setAvatarSrc(url);
  });

  if(setUrlBtn){
    setUrlBtn.addEventListener('click', ()=>{
      const url = (avatarUrlInput.value||'').trim();
      if(!url) return;
      setAvatarSrc(url);
    });
  }

  avatarFileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      const data = ev.target.result;
      avatarUrlInput.value = data;
      setAvatarSrc(data);
    };
    reader.readAsDataURL(file);
  });

  avatarClear.addEventListener("click", () => {
    setAvatarSrc('');
    avatarUrlInput.value = '';
    avatarFileInput.value = '';
    avatarUrlInput.focus();
  });

  const legacyFileBtn = document.querySelector('.file-btn');
  if(legacyFileBtn && avatarFileInput){
    legacyFileBtn.addEventListener('click', ()=> avatarFileInput.click());
  }
});
