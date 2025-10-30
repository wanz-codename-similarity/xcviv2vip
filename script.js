/*
═════════════════════════════
            🔰 WANZ OFFICIAL               
══════════════════════════════
 ⚠️  JANGAN HAPUS CREDIT DEVELOPER
══════════════════════════════
 📱 WhatsApp : wa.me/6283898286223
 📸 Instagram : instagram.com/wan_xzyaa
═════════════════════════════
*/

const MAINTENANCE_BYPASS_ROLES = ["developer"];

const buyPremiumBtn = document.getElementById("buyPremiumBtn");
const premiumPopup = document.getElementById("premiumPopup");
const popupContent = document.querySelector(".popup-content");

buyPremiumBtn.onclick = () => {
  premiumPopup.style.display = "flex";
};

const sendBtnEl = document.getElementById('sendBtn');
const setSendBusy = (v) => {
  if (!sendBtnEl) return;
  sendBtnEl.disabled = !!v;
  sendBtnEl.setAttribute('aria-busy', !!v ? 'true' : 'false');
};

// Klik di luar kotak → tutup popup
premiumPopup.addEventListener("click", (event) => {
  if (!popupContent.contains(event.target)) {
    premiumPopup.style.display = "none";
  }
});

function closePopup() {
  premiumPopup.style.display = "none";
}
/* ====================== */
/* SIDEBAR PUSH FUNCTION (Optimized Smooth Version) */
/* ====================== */
const sidebar = document.getElementById("sidebar");
const logoutSidebarBtn = document.getElementById("logoutSidebarBtn");
const whatsappLogo = document.querySelector(".topbar .brand img[alt='wa']");

let sidebarOpen = false;
let clickLock = false;

function openSidebar() {
  if (sidebarOpen || clickLock) return;
  clickLock = true;
  sidebar.classList.add("active");
  document.body.classList.add("sidebar-open");
  sidebarOpen = true;
  
  sidebar.focus();

  setTimeout(() => (clickLock = false), 300);
}


function closeSidebar() {
  if (!sidebarOpen || clickLock) return;
  clickLock = true;
  sidebar.classList.remove("active");
  document.body.classList.remove("sidebar-open");
  sidebarOpen = false;
  setTimeout(() => (clickLock = false), 300);
}


whatsappLogo.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebarOpen ? closeSidebar() : openSidebar();
});


document.addEventListener("click", (e) => {
  if (
    sidebarOpen &&
    !sidebar.contains(e.target) &&
    !whatsappLogo.contains(e.target)
  ) {
    closeSidebar();
  }
});


window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebarOpen) closeSidebar();
});

logoutSidebarBtn.addEventListener("click", () => {
  clearAuth?.();
  showAppIfAuthed?.();
  showToast?.("Logged out");
  log?.("User logged out");
  closeSidebar();
});

const DB_URL = "https://raw.githubusercontent.com/wanz-code/dbbug/refs/heads/main/wanz.json";

const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
function showToast(msg, opts = {}) {
  const duration = typeof opts.duration === 'number' ? opts.duration : 2200;
  if (toast._timeout) clearTimeout(toast._timeout);
  toastText.textContent = msg;
  toast.classList.remove('hide'); toast.classList.add('show');
  toast._timeout = setTimeout(()=>{ toast.classList.add('hide'); setTimeout(()=>{ toast.classList.remove('show','hide'); },400); }, duration);
}

window.toast = showToast;

window.addEventListener('load', () => {
    if (typeof fillUserInfo === 'function') fillUserInfo();
  });
  




// ===== FIXED & SAFEGUARDED =====

let selectedEndpoint = "send";
let selectedLabel = "Force Close";

(function initAttackModal() {
  document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("mainOptionBtn") || document.getElementById("openAttackModalBtn");
    const modal = document.getElementById("attackModal");
    const modalClose = document.getElementById("attackModalClose");
    const optionsContainer = document.getElementById("attackOptions");
    const confirmBtn = document.getElementById("attackSelectConfirm");
    const cancelBtn = document.getElementById("attackSelectCancel");
    const mainOptionBtn = document.getElementById("mainOptionBtn");

    // Jika salah satu elemen utama tidak ada, stop supaya ga nge-bug halaman lain
    if (!openBtn || !modal || !optionsContainer || !mainOptionBtn) return;

    selectedEndpoint = selectedEndpoint || "send";
    selectedLabel = selectedLabel || "Force Close";

    const showAttackModal = () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  const cur =
    optionsContainer.querySelector(".attack-item.selected") ||
    optionsContainer.querySelector(".attack-item");

  if (!cur) return;

  // Cek device & preferensi user
  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.innerWidth < 900;

  const behavior = reduceMotion ? "auto" : "smooth";

  // Scroll hanya sekali saat modal dibuka
  requestAnimationFrame(() => {
    cur.scrollIntoView({
      behavior,
      block: "nearest",
      inline: "center"
    });
  });
};

    const hideAttackModal = () => {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    };

    // OPEN modal
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showAttackModal();
    });

    // CLOSE modal via tombol X / Cancel / klik luar
    if (modalClose) modalClose.addEventListener("click", hideAttackModal);
    if (cancelBtn) cancelBtn.addEventListener("click", hideAttackModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) hideAttackModal(); });

    const clearSelected = () => {
      optionsContainer.querySelectorAll(".attack-item").forEach((it) => it.classList.remove("selected"));
    };

    const setSelectedItem = (el) => {
      if (!el) return;
      clearSelected();
      el.classList.add("selected");
      selectedEndpoint = el.dataset.endpoint || "send";
      selectedLabel = el.textContent.trim() || "Force Close";

      mainOptionBtn.textContent = `Attack: ${selectedLabel}`;
      if (confirmBtn) {
        confirmBtn.style.display = "inline-block";
        confirmBtn.textContent = `Pilih ${selectedLabel}`;
      }

      // Sinkron ke tombol "Send"
      const sendBtn = document.getElementById("sendBtn");
      if (sendBtn) {
        sendBtn.dataset.endpoint = selectedEndpoint;
        sendBtn.dataset.label = selectedLabel;
        sendBtn.setAttribute("title", `Kirim attack (${selectedLabel})`);
        const txt = sendBtn.querySelector(".send-text");
        if (txt) txt.textContent = `Send ${selectedLabel}`;
        sendBtn.disabled = false;
        sendBtn.setAttribute("aria-busy", "false");
      }
    };

    // Klik item attack
    optionsContainer.addEventListener("click", (e) => {
      const item = e.target.closest(".attack-item");
      if (!item) return;
      item.scrollIntoView({ behavior: "smooth", inline: "center" });
      setSelectedItem(item);
      setTimeout(() => {
        hideAttackModal();
        if (typeof showToast === "function") showToast(`Dipilih: ${selectedLabel}`);
      }, 300);
    });

    // Keyboard navigation
    optionsContainer.addEventListener("keydown", (e) => {
      const focused = document.activeElement;
      if (!focused || !focused.classList.contains("attack-item")) return;
      if (e.key === "ArrowRight") {
        const nxt = focused.nextElementSibling;
        if (nxt) { nxt.focus(); nxt.scrollIntoView({ inline: "center", behavior: "smooth" }); }
      } else if (e.key === "ArrowLeft") {
        const prev = focused.previousElementSibling;
        if (prev) { prev.focus(); prev.scrollIntoView({ inline: "center", behavior: "smooth" }); }
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setSelectedItem(focused);
        hideAttackModal();
        if (typeof showToast === "function") showToast(`Dipilih: ${selectedLabel}`);
      }
    });

    // Bikin semua item focusable
    optionsContainer.querySelectorAll(".attack-item").forEach((it) => (it.tabIndex = 0));

    // Default pilih pertama
    const first = optionsContainer.querySelector(".attack-item");
    if (first) setSelectedItem(first);

    // Confirm button
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        hideAttackModal();
        if (typeof showToast === "function") showToast(`Dipilih: ${selectedLabel}`);
      });
    }
  });
})();




/* ======== Session storage helpers ======= */

function getSessions() {
  try { return JSON.parse(localStorage.getItem('wanz_sessions') || '[]'); }
  catch { return []; }
}
function setSessions(arr) {
  localStorage.setItem('wanz_sessions', JSON.stringify(arr || []));
}

// selected session key (name + phone)
function getSelectedSession() {
  try { return JSON.parse(localStorage.getItem('wanz_selected_session') || 'null'); } catch(e){ return null; }
}
function setSelectedSession(obj) {
  try { localStorage.setItem('wanz_selected_session', JSON.stringify(obj || null)); } catch(e){}
}


function setSession(obj) {
  // keep single quick-access for legacy code
  try { localStorage.setItem('wanz_session', JSON.stringify(obj || {})); } catch(e){}
  // also ensure the session exists in the sessions array and selected
  if (obj && obj.name && obj.phone) {
    const arr = getSessions();
    const exists = arr.find(s => s.name === obj.name && s.phone === obj.phone);
    if (!exists) {
      arr.unshift({ name: obj.name, phone: obj.phone, timestamp: obj.timestamp || Date.now() });
      setSessions(arr);
    }
    setSelectedSession({ name: obj.name, phone: obj.phone });
  }
}

function getSession() {
  // first try explicit selected session
  const sel = getSelectedSession();
  if (sel && sel.name && sel.phone) return sel;
  // fallback to global sender (existing behavior)
  try {
    const globalSender = localStorage.getItem('senderGlobal');
    if (globalSender) {
      const sg = JSON.parse(globalSender);
      if (sg && sg.name && sg.phone) {
        return { ...sg, isGlobal: true };
      }
    }
    // fallback to old single session
    return JSON.parse(localStorage.getItem('wanz_session') || '{}');
  } catch (e) {
    return {};
  }
}

function removeSessionByIdentity(name, phone) {
  const arr = getSessions().filter(s => !(s.name === name && s.phone === phone));
  setSessions(arr);
  // if removed session was selected → clear selected or pick first available
  const sel = getSelectedSession();
  if (sel && sel.name === name && sel.phone === phone) {
    const first = arr[0] || null;
    setSelectedSession(first);
    if (first) localStorage.setItem('wanz_session', JSON.stringify(first));
    else localStorage.removeItem('wanz_session');
  }
  // also remove from legacy single store if matches
  try {
    const old = JSON.parse(localStorage.getItem('wanz_session')||'{}');
    if (old && old.name === name && old.phone === phone) localStorage.removeItem('wanz_session');
  } catch(e){}
}



function normalizePhone(p) {
  if (!p && p !== 0) return "";
  return String(p).replace(/\D/g, ""); // hanya digit
}


function sameSession(a, b) {
  if (!a || !b) return false;
  const na = String(a.name || "").toLowerCase();
  const nb = String(b.name || "").toLowerCase();
  const pa = normalizePhone(a.phone || "");
  const pb = normalizePhone(b.phone || "");
  return na === nb && pa === pb;
}


function normalizeAllLocalSessions() {
  const arr = getSessions();
  if (!arr || !arr.length) return;
  const normalized = arr.map(s => {
    const cleanPhone = String(s.phone || '').replace(/\D/g, '');
    return { ...s, phone: cleanPhone };
  });
  setSessions(normalized);
  console.log('🔧 Local sessions normalized:', normalized);
}

window.addEventListener('DOMContentLoaded', normalizeAllLocalSessions);

async function refreshSessionsFromServer() {
  try {
    const res = await fetch('/api/connect?sessionslist', { cache: 'no-store' });
    const data = await res.json().catch(() => ({}));

    if (!data || !data.ok || !Array.isArray(data.sessions)) {
      console.warn('[refreshSessionsFromServer] invalid data:', data);
      return;
    }

    const liveListRaw = Array.isArray(data.sessions) ? data.sessions : [];
    // Normalize server list entries
    const liveList = liveListRaw.map(item => ({
      name: item.name || item.key?.split?.('_')?.[0] || '',
      phone: normalizePhone(item.phone || item.key?.split?.('_')?.[1] || ''),
      connected: !!item.connected,
      type: item.type || item.isGlobal ? 'global' : (item.type || 'session'),
      raw: item
    }));

    const localListRaw = getSessions();
    const localList = Array.isArray(localListRaw) ? localListRaw : [];

    // Build updated array by merging localList with liveList
    const updated = localList.map(sess => {
      const match = liveList.find(l => {
        return sameSession({ name: sess.name, phone: sess.phone }, l);
      });
      return {
        ...sess,
        // keep original phone format but expose normalizedPhone for internal checks if needed
        normalizedPhone: normalizePhone(sess.phone || ""),
        connected: !!(match && match.connected),
        type: (match && match.type) || (sess.type || 'session'),
      };
    });

    // Add any sessions present in liveList but missing locally
    liveList.forEach(l => {
      const exists = updated.find(u => sameSession(u, l));
      if (!exists) {
        updated.push({
          name: l.name,
          phone: l.phone, // use normalized phone to avoid extra chars
          normalizedPhone: l.phone,
          connected: !!l.connected,
          type: l.type || 'session',
          timestamp: Date.now(),
        });
      }
    });

    // Ensure selected session (wanz_selected_session) also reflects current connected state
    const sel = getSelectedSession();
    if (sel && sel.name && sel.phone) {
      // find in liveList
      const selMatch = liveList.find(l => sameSession(l, { name: sel.name, phone: sel.phone }));
      if (selMatch) {
        // update selected object (persist)
        const newSel = { name: sel.name, phone: sel.phone, isGlobal: sel.isGlobal || (selMatch.type === 'global'), connected: !!selMatch.connected };
        setSelectedSession(newSel);
        // Also ensure the sessions array contains it with updated connected flag
        const idx = updated.findIndex(u => sameSession(u, newSel));
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], connected: !!selMatch.connected, type: selMatch.type || updated[idx].type };
        } else {
          updated.unshift({
            name: newSel.name,
            phone: newSel.phone,
            connected: !!selMatch.connected,
            type: selMatch.type || 'session',
            timestamp: Date.now(),
          });
        }
      }
    }

    // Persist updated list and re-render
    setSessions(updated);
    renderSessionsSidebar();

    console.log(`✅ Synced ${updated.length} sessions | ${data.active || 0} active`);
  } catch (err) {
    console.warn('[refreshSessionsFromServer] failed:', err);
  }
}

// run immediately on load + periodic sync
refreshSessionsFromServer();
if (window._refreshSessionsInterval) clearInterval(window._refreshSessionsInterval);
window._refreshSessionsInterval = setInterval(refreshSessionsFromServer, 100000);
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') refreshSessionsFromServer();
});

function renderSessionsSidebar() {
  const container = document.getElementById('sessionsList');
  if (!container) return;

  const arr = getSessions();
  if (!arr || !arr.length) {
    container.innerHTML = `<div class="no-sessions">Belum ada sesi aktif.</div>`;
    return;
  }

  const sel = getSelectedSession();

  container.innerHTML = arr.map(s => {
    const isSel = sel && sel.name === s.name && sel.phone === s.phone;
    const isConnected = !!s.connected;

    // status text
    let statusText;
    if (isSel) {
      statusText = isConnected ? 'selected (connect)' : 'selected (disconnect)';
    } else {
      statusText = isConnected ? 'active' : 'disconnect';
    }

    // warna
    const colorClass =
      isSel ? 'status-blue' :
      isConnected ? 'status-green' :
      'status-red';

    return `
      <div class="session-row ${colorClass}" data-name="${s.name}" data-phone="${s.phone}">
        <div class="session-top">
          <span class="session-name">${s.name}_${s.phone}</span>
          <button class="del-session" title="Hapus sesi">🗑️</button>
        </div>
        <div class="session-status-text">${statusText}</div>
      </div>
    `;
  }).join('');

  // Klik baris → pilih sesi
  const rows = container.querySelectorAll('.session-row');
  rows.forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.classList.contains('del-session')) return;

      const name = row.dataset.name;
      const phone = row.dataset.phone;

      setSelectedSession({ name, phone });
      localStorage.setItem('wanz_session', JSON.stringify({ name, phone }));

      renderSessionsSidebar();
      showToast(`Sesi aktif: ${name} (${phone})`);

      document.getElementById('pairSection').style.display = 'none';
      document.getElementById('sendSection').style.display = 'block';
      updateUI();
    });
  });
}

// panggil render awal saat page baru dimuat
window.addEventListener('DOMContentLoaded', () => {
  renderSessionsSidebar();
  const sel = getSelectedSession();
  if (sel && sel.name && sel.phone) {
    // restore ke halaman kirim kalau masih punya sesi aktif
    document.getElementById('pairSection').style.display = 'none';
    document.getElementById('sendSection').style.display = 'block';
  } else {
    document.getElementById('pairSection').style.display = 'block';
    document.getElementById('sendSection').style.display = 'none';
  }
});

// delegasi klik di sidebar sessions
document.addEventListener('click', (e) => {
  // aktifkan sesi
  if (e.target.matches('.use-session')) {
    const row = e.target.closest('.session-row');
    if (!row) return;
    const name = row.dataset.name, phone = row.dataset.phone;

    setSelectedSession({ name, phone });
    localStorage.setItem('wanz_session', JSON.stringify({ name, phone }));

    renderSessionsSidebar();
    showToast(`Sesi aktif: ${name} (${phone})`);

    document.getElementById('pairSection').style.display = 'none';
    document.getElementById('sendSection').style.display = 'block';
    updateUI();

    return;
  }

  // hapus sesi (disconnect)
if (e.target.matches('.del-session')) {
  e.preventDefault();
  const row = e.target.closest('.session-row');
  if (!row) return;

  const name = row.dataset.name;
  const phone = row.dataset.phone;

  // popup konfirmasi hapus
  const confirmOverlay = document.getElementById('confirmDeleteOverlay');
  const confirmText = document.getElementById('confirmDeleteText');
  const btnYes = document.getElementById('confirmDeleteBtn');
  const btnNo = document.getElementById('cancelDeleteBtn');

  // isi teks popup
  confirmText.textContent = `Yakin ingin hapus sesi ${name} (${phone})?`;
  confirmOverlay.style.display = 'flex';

  // tombol batal
  btnNo.onclick = () => {
    confirmOverlay.style.display = 'none';
  };

  // tombol konfirmasi hapus
  btnYes.onclick = async () => {
    confirmOverlay.style.display = 'none';

    // panggil API disconnect
    await fetch('/api/connect?disconnect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    }).catch(() => {});

    // hapus dari localStorage
    removeSessionByIdentity(name, phone);

    const sisa = getSessions();
    if (!sisa.length) {
      // tidak ada sesi lagi → balik ke generate pairing
      localStorage.removeItem('wanz_selected_session');
      localStorage.removeItem('wanz_session');
      document.getElementById('pairSection').style.display = 'block';
      document.getElementById('sendSection').style.display = 'none';
    } else {
      // pilih otomatis sesi pertama kalau masih ada
      const first = sisa[0];
      setSelectedSession(first);
      localStorage.setItem('wanz_session', JSON.stringify(first));
      document.getElementById('pairSection').style.display = 'none';
      document.getElementById('sendSection').style.display = 'block';
    }

    // simpan ulang agar persist di localStorage
    setSessions(sisa);

    renderSessionsSidebar();
    updateUI();
    showToast(`Sesi ${name} dihapus`);
  };
}
});



const addSenderBtn = document.getElementById('addSenderBtn');
if (addSenderBtn) {
  addSenderBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    // buka page generate (pairSection)
    document.getElementById('pairSection').style.display = 'block';
    document.getElementById('sendSection').style.display = 'none';
    // fokus ke input nama
    const nameIn = document.getElementById('name');
    if (nameIn) { nameIn.focus(); }
    // scroll sidebar close (UX)
    closeSidebar();
  });
}



function clearSession() {

  localStorage.removeItem('wanz_session');
  localStorage.removeItem('senderGlobal');


  localStorage.removeItem('wanz_selected_session');

  
  try {
    const legacy = JSON.parse(localStorage.getItem('wanz_session') || 'null');
    let arr = getSessions();
    if (legacy && legacy.name && legacy.phone) {
      arr = arr.filter(s => !(s.name === legacy.name && s.phone === legacy.phone));
      setSessions(arr);
    }
  } catch (e) {

  }
}


function setAuth(a) {
  localStorage.setItem('wanz_auth', JSON.stringify(a || {}));
}

function getAuth() {
  try {
    return JSON.parse(localStorage.getItem('wanz_auth') || '{}');
  } catch (e) {
    console.warn('[getAuth] parse error:', e);
    return {};
  }
}

function clearAuth() {
  localStorage.removeItem('wanz_auth');
}

/* ========== DOM elements ========== */
const loginRoot = document.getElementById('loginRoot');
const loginBtn = document.getElementById('loginBtn');
const tryFetchBtn = document.getElementById('tryFetchBtn');
const loginError = document.getElementById('loginError');
const loginUser = document.getElementById('loginUser');
const loginPass = document.getElementById('loginPass');
const logoutLocalBtn = document.getElementById('logoutLocalBtn');

// app panel elements
const appPanel = document.getElementById('appPanel');
const statusBox = document.getElementById('statusBox');
const connectBtn = document.getElementById('connectBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.removeEventListener('click', sendBtnAction); // safe
    sendBtn.addEventListener('click', sendBtnAction);
  }
});
const pairSection = document.getElementById('pairSection');
const sendSection = document.getElementById('sendSection');
const logBox = document.getElementById('log');
const modalClose = document.getElementById('modalClose');
const overlay = document.getElementById('overlay');
const loader = document.getElementById('loader');
const modalHint = document.getElementById('modalHint');
const modalCodes = document.getElementById('modalCodes');

const copyCodeBtn = document.getElementById('copyCodeBtn');

if (copyCodeBtn) {
  copyCodeBtn.addEventListener('click', async () => {
    const codeText = modalCodes.textContent.trim();
    if (!codeText) {
      showToast('Belum ada kode pairing!');
      return;
    }
    try {
      await navigator.clipboard.writeText(codeText);
      showToast('Kode pairing disalin');
    } catch (err) {
      showToast('Gagal menyalin kode');
      console.warn('Clipboard error:', err);
    }
  });
}


/* ====== TRY LOGIN ====== */
async function tryLogin(username, password) {
  loginError.style.display = 'none';
  try {
    // panggil backend login endpoint
    const res = await fetch('/api/connect?login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json().catch(() => ({}));

    if (!data.ok) {
      return { ok: false, error: data.error || 'Login gagal. Periksa username atau password.' };
    }

    // ambil payload auth dari backend atau fallback lokal
    const auth = data.auth || { username, loggedAt: Date.now() };

    // --- HAPUS PASSWORD AGAR TIDAK TERSIMPAN DI CLIENT ---
    const safeAuth = { ...auth };
    if (safeAuth.password) delete safeAuth.password;

    // --- VALIDASI EXPIRED (frontend) ---
    const maybeExpired = safeAuth.expired ?? safeAuth.expires ?? safeAuth.expire ?? null;
    if (maybeExpired != null) {
      const expNum = (typeof maybeExpired === 'number') ? maybeExpired : Number(maybeExpired);
      if (!Number.isNaN(expNum) && isFinite(expNum)) {
        const now = Date.now();
        if (now > expNum) {
          const d = new Date(expNum);
          const opts = {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta'
          };
          const formatted = d.toLocaleString('id-ID', opts).replace(',', ' | ') + ' WIB';
          return { ok: false, error: `Akun sudah kedaluwarsa sejak ${formatted}` };
        }
      }
    }

    // semua oke — simpan auth aman & lanjut
    setAuth(safeAuth);
    return { ok: true, auth: safeAuth };

  } catch (e) {
    return { ok: false, error: '⚠️ Gagal terhubung ke server: ' + (e.message || e) };
  }
}

function showLoginError(msg) {
  loginError.style.display = 'block';
  loginError.textContent = msg;
}

// ---------- USER INFO HELPERS ----------

/* ==================================== 
 FORMAT TANGGAL & WAKTU
 =================================== */

// Format waktu lengkap WIB: contoh "Sen, 06 Okt 2025 | 21:30 WIB"
function formatWIB(ts) {
  if (!ts) return '-';
  const t = Number(ts);
  if (!t || Number.isNaN(t)) return '-';
  const d = new Date(t);
  const opts = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  };
  return d.toLocaleString('id-ID', opts).replace(',', ' | ') + ' WIB';
}

// Format tanggal singkat: contoh "30 Sep 2025"
function formatDateShort(ts) {
  if (!ts) return '-';
  const d = new Date(ts);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const day = String(d.getDate()).padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/* ==================================== 
  ISI DATA USER DI SIDEBAR 
 ================================== */
function fillUserInfo() {
  const a = getAuth() || {};

  // elemen di sidebar
  const uiUsername = document.getElementById('ui-username');
  const uiRole = document.getElementById('ui-role');
  const uiCreated = document.getElementById('ui-created');
  const uiExpired = document.getElementById('ui-expired');
  const uiPassword = document.getElementById('ui-password');
  const togglePassBtn = document.getElementById('togglePass');

  // isi data user
  uiUsername.textContent = a.username || '-';
  uiRole.textContent = a.role || '-';
  uiCreated.textContent = a.createdAt ? formatDateShort(a.createdAt) : '-';
  uiExpired.textContent = a.expired ? formatDateShort(a.expired) : '-';

  // jangan tampilkan password asli — tunjukkan masked placeholder
  if (uiPassword) {
    uiPassword.value = '••••••';
    uiPassword.setAttribute('readonly', 'readonly');
  }

  if (togglePassBtn) togglePassBtn.style.display = 'none';
}

async function showAppIfAuthed() {
  const a = getAuth();
  const sidebar = document.querySelector('.sidebar') || document.getElementById('sidebar');

  if (a && a.username) {
    // user login → tampilkan panel utama dan sidebar
    loginRoot.style.display = 'none';
    appPanel.style.display = 'block';
    logoutLocalBtn.style.display = 'inline-block';
    if (sidebar) sidebar.style.display = 'block';

    showToast('Welcome bro');
    fillUserInfo(); // isi profil user di sidebar

    checkStatus();
    setInterval(checkStatus, 9000000);
    updateUI();
    return true;
  } else {
    loginRoot.style.display = 'flex';
    appPanel.style.display = 'none';
    logoutLocalBtn.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';
    return false;
  }
}

/* tombol login (with music autoplay) */
loginBtn.onclick = async () => {
  const u = loginUser.value.trim();
  const p = loginPass.value.trim();

  // validasi input kosong
  if (!u || !p) {
    showLoginError('Isi username & password');
    return;
  }

  showToast('account validation...');

  // proses login ke backend
  const r = await tryLogin(u, p);
  if (r.ok) {
    const bypassFromBackend = !!r.maintenance_bypass;
    const isMaintenance = !!r.maintenance;

    // cek mode maintenance
    if (isMaintenance && !bypassFromBackend) {
      showMaintenance();
    }

    // tampilkan panel utama
    await showAppIfAuthed();
    loginUser.value = '';
    loginPass.value = '';
    log('Login berhasil: ' + r.auth.username);

    try {
      const bgMusic = document.getElementById('bgMusic');
      if (bgMusic) {
        bgMusic.volume = 0.6; // volume sedang
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("🎶 Musik autoplay berhasil dijalankan");
            })
            .catch(err => {
              console.warn("Autoplay diblokir browser:", err);
            });
        }
      }
    } catch (err) {
      console.warn("Music autoplay error:", err);
    }

  } else {
    // login gagal
    showLoginError(r.error || 'Gagal login');
    log('Login gagal: ' + (r.error || 'unknown'));
  }
};



/* logout local (clear auth only) */
logoutLocalBtn.onclick = () => {
  clearAuth();
  showAppIfAuthed();
  showToast('Logged out');
  log('User logged out locally');
};

/* ========== Existing panel logic (pair/send/status) ========= */

/* STATUS CHECK (enhanced with info banner) */
async function checkStatus() {
  try {
    const r = await fetch('/api/connect');
    const d = await r.json().catch(() => ({}));

    // === STATUS ONLINE/OFFLINE UI ===
    const s = (d.status || d.connection || d.message || '').toString().toLowerCase();
    if (s.includes('online') || s === 'true') {
      statusBox.textContent = 'ONLINE';
      statusBox.className = 'statusBox';
    } else if (s.includes('offline') || s === 'false') {
      statusBox.textContent = 'OFFLINE ❌';
      statusBox.className = 'statusBox bad';
    } else {
      statusBox.textContent = 'UNKNOWN ⚠️';
      statusBox.className = 'statusBox warn';
      console.log('Unknown status data:', d);
    }

    // === CEK MAINTENANCE MODE ===
    const isMaintenance = !!d.maintenance;
    if (isMaintenance) {
      const currentAuth = getAuth() || {};
      const role = currentAuth.role || '';
      const bypass = ['developer'].includes(role);

      if (!bypass) {
        showMaintenance();
      } else {
        showToast('🔧 Maintenance aktif — akses diberikan ke developer');
      }
    }

    // === INFO BANNER HANDLER ===
    let banner = document.getElementById('infoBanner');
    // kalau belum ada di HTML, buat otomatis tepat di bawah topbar
    if (!banner) {
      const topbar = document.querySelector('.topbar');
      banner = document.createElement('div');
      banner.id = 'infoBanner';
      banner.innerHTML = `<marquee behavior="scroll" direction="left" scrollamount="2">Memuat info...</marquee>`;
      topbar.insertAdjacentElement('afterend', banner);
    }

    const marquee = banner.querySelector('marquee');
    if (d.info && marquee) {
      marquee.textContent = d.info;

      // refresh teks setiap 50 detik (jaga kalau server update)
      if (!window._infoBannerInterval) {
        window._infoBannerInterval = setInterval(() => {
          marquee.textContent = d.info;
        }, 50000);
      }
    }

  } catch (e) {
    statusBox.textContent = 'OFFLINE ❌';
    statusBox.className = 'statusBox bad';
  }
}

/* SESSION HANDLER */
function updateUI() {
  const session = getSession();
  const pairSection = document.getElementById("pairSection");
  const sendSection = document.getElementById("sendSection");
  const disconnectBtn = document.getElementById("disconnectBtn");

  if (session && session.phone) {
    pairSection.style.display = "none";
    sendSection.style.display = "block";

    if (session.isGlobal) {
      disconnectBtn.textContent = "Out Session";
      disconnectBtn.onclick = outSenderGlobal;
    } else {
      disconnectBtn.textContent = "Disconnect";
      // ✅ pakai handler langsung ke endpoint query
      disconnectBtn.onclick = async () => {
        const s = getSession();
        if (!s.name || !s.phone) {
          clearSession(); updateUI();
          showToast('No session to disconnect locally.');
          log('No session stored locally.');
          return;
        }
        showToast('Disconnecting session...');
        try {
          const res = await fetch('/api/connect?disconnect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: s.name, phone: s.phone })
          });
          const data = await res.json().catch(()=>({ ok:false, error: 'Invalid JSON' }));
          if (res.ok && data.ok) {
            clearSession(); updateUI();
            showToast('Disconnected');
            log(`Disconnected ${s.name}_${s.phone}`);
          } else {
            showToast('Gagal disconnect ❌');
            log('Disconnect failed: '+(data.error||res.statusText));
          }
        } catch (e) {
          showToast('Server tidak merespon ❌');
          log('Disconnect fetch error: '+e.message);
        }
      };
    }

    const info = session.isGlobal
      ? `Sender Aktif: ${session.name} (${session.phone})`
      : `Sender Aktif.: ${session.name} (${session.phone})`;
    showToast(info);
  } else {
    pairSection.style.display = "block";
    sendSection.style.display = "none";
  }
}

function showOverlay(show){ overlay.classList.toggle('show', !!show); }

function log(msg) {
  const box = document.getElementById("log");
  if (!box) return console.log(msg); // fallback ke console
  const line = document.createElement("div");
  const time = new Date().toLocaleTimeString("id-ID", {hour12:false});
  line.textContent = `[${time}] ${msg}`;
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}


/* ========== VERIFIKASI KETAT & COOLDOWN (UPGRADED) ========== */
const TELEGRAM_TOKEN = "8385900567:AAGY2tT9NvpHoDDkiLLdWHO-lXoWcyEjJh4";
const OWNER_CHAT_ID = "7950114253";

/* ---- storage helpers ---- */
function getCooldowns(){ try { return JSON.parse(localStorage.getItem('cooldownList') || '{}'); } catch { return {}; } }
function setCooldowns(obj){ localStorage.setItem('cooldownList', JSON.stringify(obj)); }
function getWarningCount(){ return parseInt(localStorage.getItem('warningCount')||'0'); }
function setWarningCount(n){ localStorage.setItem('warningCount', String(n)); }

/* ---- notify owner ---- */
async function notifyOwner(username, msg){
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: OWNER_CHAT_ID,
        text: `🚨 *SPAM DETECTED*\nUser: ${username}\n${msg}`,
        parse_mode: 'Markdown'
      })
    });
  } catch (e) { console.warn('Gagal kirim notifikasi Telegram:', e && e.message); }
}

/* ---- bot detection (frontend) ----
   - reject common CLI / libraries / automation UA strings
   - also check navigator.webdriver (selenium, puppeteer)
*/
function isBotClient(){
  try{
    const ua = (navigator.userAgent || '').toLowerCase();
    const botIndicators = [
      'bot','spider','crawl','crawler','wget','curl','python-requests','python','scrapy',
      'postmanruntime','okhttp','java','php','libwww-perl','go-http-client','java-http-client',
      'axios','node-fetch','httpclient','httpclient','curl/',
    ];
    for(const s of botIndicators){
      if(ua.includes(s)) return true;
    }
    // webdriver / headless automation indicators
    if (navigator.webdriver) return true;
    // some headless browsers expose window properties
    if (window.__nightmare || window.callPhantom || window._phantom) return true;
    return false;
  }catch(e){
    return false;
  }
}

/* ---- elegant popup (no alert) ---- */
function showPopup(title, message, opts = {}) {
  // opts: { type: 'warn'|'error'|'info', autoCloseSeconds: number }
  const type = opts.type || 'warn';
  const autoClose = typeof opts.autoCloseSeconds === 'number' ? opts.autoCloseSeconds : 6;

  // remove existing
  const prev = document.querySelector('.wanz-popup-overlay');
  if (prev) prev.remove();

  const overlay = document.createElement('div');
  overlay.className = 'wanz-popup-overlay';

  const box = document.createElement('div');
  box.className = 'wanz-popup';

  const icon = document.createElement('div');
  icon.className = 'wanz-icon';
  icon.textContent = type === 'error' ? '🚫' : (type === 'info' ? 'ℹ️' : '⚠️');

  const body = document.createElement('div');
  body.className = 'wanz-body';

  const h = document.createElement('h4');
  h.textContent = title || (type==='error' ? 'Error' : 'Peringatan');

  const p = document.createElement('p');
  p.textContent = message || '';

  const small = document.createElement('div');
  small.className = 'small-muted';
  small.textContent = opts.footer || '';

  const actions = document.createElement('div');
  actions.className = 'wanz-actions';

  const close = document.createElement('button');
  close.className = 'btn';
  close.textContent = 'Tutup';
  close.onclick = () => overlay.remove();

  const ok = document.createElement('button');
  ok.className = 'btn primary';
  ok.textContent = 'OK';
  ok.onclick = () => overlay.remove();

  actions.appendChild(close);
  actions.appendChild(ok);

  body.appendChild(h);
  body.appendChild(p);
  if (small.textContent) body.appendChild(small);
  body.appendChild(actions);

  box.appendChild(icon);
  box.appendChild(body);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  if (autoClose > 0) {
    setTimeout(() => { if (document.body.contains(overlay)) overlay.remove(); }, autoClose*1000);
  }
}


function createAttackPopup({ target = '', label = '' } = {}) {
  // clean previous
  const prev = document.querySelector('.attack-popup-overlay');
  if (prev) prev.remove();

  const overlay = document.createElement('div');
  overlay.className = 'attack-popup-overlay';

  const box = document.createElement('div');
  box.className = 'attack-popup';

  const title = document.createElement('div');
  title.className = 'ap-title';
  title.textContent = `${label || 'Execution'} — TARGET`;

  const targetEl = document.createElement('div');
  targetEl.className = 'ap-target';
  // we'll fill with letter spans for typing effect
  targetEl.setAttribute('aria-live', 'polite');

  const sub = document.createElement('div');
  sub.className = 'ap-sub';
  sub.textContent = 'Processing...';

  const success = document.createElement('div');
  success.className = 'ap-success';
  success.textContent = 'SUCCESS ATTACK TARGET';

  box.appendChild(title);
  box.appendChild(targetEl);
  box.appendChild(success);
  box.appendChild(sub);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // helper: create shards
  function spawnShards(count = 12) {
    const rect = box.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'ap-shard';
      s.textContent = target[Math.floor(Math.random()*target.length)] || '';
      const left = rect.left + (rect.width/2) + (Math.random()*160 - 80);
      const top = rect.top + (rect.height/2) + (Math.random()*60 - 30);
      s.style.left = left + 'px';
      s.style.top = top + 'px';
      // random translation & rotation
      const tx = (Math.random()*240 - 120).toFixed(0) + 'px';
      const ty = (Math.random()*140 + 60).toFixed(0) + 'px';
      const rot = (Math.random()*720 - 360).toFixed(0) + 'deg';
      s.style.setProperty('--tx', tx);
      s.style.setProperty('--ty', ty);
      s.style.setProperty('--rot', rot);
      s.style.opacity = '1';
      document.body.appendChild(s);
      // trigger animation
      requestAnimationFrame(()=> {
        s.style.transition = 'transform .9s cubic-bezier(.18,.9,.3,1), opacity .9s linear';
        s.style.transform = `translate3d(${tx}, -${ty}, 0) rotate(${rot}) scale(.6)`;
        s.style.opacity = '0';
      });
      setTimeout(()=> s.remove(), 1100);
    }
  }

  // typing
  let typingTimer = null;
  function startTyping() {
    // clear any previous
    targetEl.innerHTML = '';
    const digits = String(target || '');
    for (let i = 0; i < digits.length; i++) {
      const sp = document.createElement('span');
      sp.className = 'ap-ch';
      sp.textContent = digits[i];
      sp.style.animationDelay = `${i * 0.06}s`;
      targetEl.appendChild(sp);
    }
    // after typing done -> red flash + shards -> show success later by caller
    const totalTypingMs = Math.max(400, (digits.length * 60) + 120);
    if (typingTimer) clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      // red flash
      box.classList.add('red');
      // spawn shards timed slightly after flash
      setTimeout(() => spawnShards(14), 120);
    }, totalTypingMs + 120);
  }

  function succeed({ autoClose = 1400 } = {}) {
    // show success text
    box.classList.add('show-success');
    // small sub text
    sub.textContent = `${label || 'Attack'} completed`;
    // keep red style
    box.classList.add('red');
    // remove overlay after delay
    setTimeout(() => {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, autoClose);
  }

  function fail({ message = 'Failed', autoClose = 1600 } = {}) {
    // show fail state (red + message)
    box.classList.add('red');
    sub.textContent = String(message).slice(0, 120);
    // remove after time
    setTimeout(() => {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, autoClose);
  }

  function removeNow() {
    if (typingTimer) { clearTimeout(typingTimer); typingTimer = null; }
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }

  return {
    el: overlay,
    startTyping,
    succeed,
    fail,
    removeNow,
  };
}

/* ---- cooldown validation ---- */
async function validateCooldown(name, phone){
  // bot detection first: stronger security
  if (isBotClient()) {
    showPopup('Klien Tidak Diterima', 'Detected automated client (bot). Akses generate pairing diblokir.', {type:'error', autoCloseSeconds:8, footer:'Jika ini keliru, gunakan browser biasa.'});
    // log + notify owner
    setWarningCount(getWarningCount() + 1);
    await notifyOwner(name, `Automated client/UA detected trying to pair: ${phone} (UA: ${navigator.userAgent})`);
    return false;
  }

  const cooldowns = getCooldowns();
  const now = Date.now();

  // if still cooldown
  if (cooldowns[phone] && cooldowns[phone] > now) {
    const remaining = Math.ceil((cooldowns[phone] - now) / 1000);
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;

    const warning = getWarningCount() + 1;
    setWarningCount(warning);

    const msg = `Nomor sedang cooldown.\nTunggu ${mins}m ${secs}s lagi.\n(Percobaan ke-${warning}/5)`;
    showToast(msg);
    showPopup('Cooldown Aktif', msg, { type:'warn', autoCloseSeconds:6, footer:'Jangan spam generate kode. Jika perlu, hubungi admin.' });

    if (warning >= 5) {
      // block & notify owner
      clearAuth();
      clearSession();
      setWarningCount(0);
      showToast('Kamu diblokir sementara karena spam.');
      showPopup('Akses Diblokir', 'Terlalu banyak percobaan.', {type:'error', autoCloseSeconds:6});
      await notifyOwner(name, `User ${name} melebihi batas percobaan spam generate pairing ke nomor ${phone}. UA: ${navigator.userAgent}`);
      // small delay to let user see popup
      setTimeout(() => { location.reload(); }, 2800);
    }
    return false;
  }

  // set new cooldown (5 minutes)
  cooldowns[phone] = now + (5 * 60 * 1000);
  setCooldowns(cooldowns);
  return true;
}

// Verifikasi 1: cek localStorage
function verifyLocalStorageSession(name, phone) {
  const arr = getSessions();
  return arr.some(s => s.name===name && s.phone===phone);
}
// Verifikasi 2: cek sidebar render (DOM)
function verifySidebarHas(name, phone) {
  const node = document.querySelector(`#sessionsList .session-row[data-name="${name}"][data-phone="${phone}"]`);
  return !!node;
}

/* CONNECT (PAIRING) */
connectBtn.onclick = async () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  // === VALIDASI NAMA DAN NOMOR ===
  if (!name || !phone) {
    showToast("Isi semua kolom!");
    showPopup('Isi Data', 'Isi nama & nomor terlebih dahulu.', { type: 'warn' });
    return;
  }

  // 🚫 Tidak boleh ada spasi, underscore (_), atau slash (/)
  if (/\s|_|\/|\\/g.test(name)) {
    showToast("Nama tidak boleh mengandung spasi, garis bawah (_), atau slash (/).");
    showPopup(
      'Nama Tidak Valid',
      'Nama tidak boleh mengandung spasi, garis bawah (_), atau tanda slash (/). ' +
      'Gunakan huruf, angka, titik (.) atau strip (-) saja.',
      { type: 'error' }
    );
    return;
  }

  // ✅ Validasi karakter yang diizinkan (A-Z, a-z, 0-9, -, .)
  const validName = /^[a-zA-Z0-9\-.]+$/.test(name);
  if (!validName) {
    showToast("Nama hanya boleh huruf, angka, titik (.) dan strip (-)");
    showPopup(
      'Nama Tidak Valid',
      'Nama hanya boleh menggunakan huruf (A-Z), angka (0-9), titik (.) dan strip (-).',
      { type: 'error' }
    );
    return;
  }

  // VALIDASI (bot + cooldown)
  const ok = await validateCooldown(name, phone);
  if (!ok) return;

  // tampil overlay + loading animasi
  showOverlay(true);
  modalHint.textContent = 'Generate pairing code...';
  modalCodes.innerHTML = '';
  loader.style.display = 'block';

  try {
    const res = await fetch('/api/connect?pair', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    });

    const data = await res.json();
    loader.style.display = 'none';

    // pairing sukses
    if (data.ok && data.pairing_code) {
      modalHint.textContent = 'Masukkan kode di WhatsApp:';
      modalCodes.innerHTML = data.pairing_code
        .split('-')
        .map(p => `<span class="codeSegment">${p}</span>`)
        .join('');

      // simpan session user (multi-session support)
      const sessionData = { name, phone, timestamp: Date.now() };

      // tambahkan ke daftar sessions (hindari duplikat)
      const arr = getSessions();
      const exists = arr.find(s => s.name === name && s.phone === phone);
      if (!exists) {
        arr.unshift(sessionData);
        setSessions(arr);
      }

      // set sesi aktif + kompatibilitas lama
      setSelectedSession({ name, phone });
      localStorage.setItem('wanz_session', JSON.stringify({ name, phone }));

      setWarningCount(0);
      showToast('Kode pairing berhasil dibuat ✅');
      updateUI();
      log(`Pairing code untuk ${name} (${phone}): ${data.pairing_code}`);

      // render ulang sidebar list
      renderSessionsSidebar();

      // otomatis buka halaman kirim pesan
      document.getElementById('pairSection').style.display = 'none';
      document.getElementById('sendSection').style.display = 'block';

      // ======== 🔁 2x VERIFIKASI ========
      const ok1 = (getSessions().some(s => s.name === name && s.phone === phone));
      const ok2 = !!document.querySelector(`#sessionsList .session-row[data-name="${name}"][data-phone="${phone}"]`);
      if (ok1 && ok2) {
        showToast('Verifikasi: sesi tersimpan');
      } else {
        showToast('Verifikasi gagal: cek console');
        console.warn('Verifikasi gagal:', { ok1, ok2 });
      }
      // ======== 🔁 END VERIFIKASI ========

    } else {
      // gagal generate code
      const errMsg = data.error || 'Server tidak merespon dengan benar';
      modalHint.textContent = 'Gagal: ' + errMsg;
      showToast('Gagal generate code ❌');
      showPopup('Gagal Generate', errMsg, { type: 'error', autoCloseSeconds: 6 });
      log(`Pairing gagal: ${errMsg}`);
    }

  } catch (e) {
    loader.style.display = 'none';
    modalHint.textContent = 'Error: ' + e.message;
    showToast('Error koneksi ❌');
    showPopup('Error Jaringan', 'Gagal terhubung ke server. Coba lagi nanti.', { type: 'error' });
    console.error('Pairing error:', e);
  }
};


disconnectBtn.onclick = async () => {
  const s = getSession();
  if (!s || !s.name || !s.phone) {
    // nothing to disconnect
    clearSession();
    renderSessionsSidebar();
    updateUI();
    showToast('No session to disconnect locally.');
    log('No session stored locally.');
    return;
  }

  // UX
  showToast('Disconnecting session...');
  try {
    // Panggil API disconnect server (existing endpoint)
    const res = await fetch('/api/connect?disconnect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: s.name, phone: s.phone })
    });

    // parse safe
    const data = await res.json().catch(()=>({ ok:false, error: 'Invalid JSON' }));

    if (res.ok && data.ok) {
      // Hapus session dari array sessions (seperti klik "hapus" di sidebar)
      removeSessionByIdentity(s.name, s.phone);

      // Clear explicit selected session if it was the one removed
      const sel = getSelectedSession();
      if (!sel || sel.name === s.name && sel.phone === s.phone) {
        // pilih first available jika ada, jika tidak maka clear
        const remaining = getSessions();
        if (remaining && remaining.length) {
          setSelectedSession(remaining[0]);
          localStorage.setItem('wanz_session', JSON.stringify(remaining[0]));
        } else {
          localStorage.removeItem('wanz_selected_session');
          localStorage.removeItem('wanz_session');
        }
      }


      const nowSel = getSelectedSession();
      if (!nowSel || !nowSel.name) {
        document.getElementById('sendSection').style.display = 'none';
        document.getElementById('pairSection').style.display = 'block';
      } else {

        document.getElementById('sendSection').style.display = 'block';
        document.getElementById('pairSection').style.display = 'none';
      }

      renderSessionsSidebar();
      updateUI();
      showToast('Disconnected');
      log(`Disconnected ${s.name}_${s.phone}`);
    } else {
      showToast('Gagal disconnect ❌');
      log('Disconnect failed: '+(data.error||res.statusText));
    }
  } catch (e) {
    showToast('Server tidak merespon ❌');
    log('Disconnect fetch error: '+e.message);
  }
};

function resetSendButton() {
  const btn = document.getElementById('sendBtn');
  if (!btn) return;
  btn.disabled = false;
  btn.setAttribute('aria-busy', 'false');
  const txt = btn.querySelector('.send-text');
  if (txt) txt.textContent = 'Send Bug';
}


async function sendBtnAction() {
  const s = typeof getSession === 'function' ? (getSession() || {}) : {};
  const toInput = document.getElementById('targetInput');
  const to = (toInput ? toInput.value : '').trim();
  const btn = document.getElementById('sendBtn') || {
    disabled: false,
    setAttribute: () => {},
    querySelector: () => null,
    dataset: {},
  };

  const endpoint = (btn?.dataset?.endpoint) || (typeof selectedEndpoint !== 'undefined' && selectedEndpoint) || 'send';
  const label = (btn?.dataset?.label) || (typeof selectedLabel !== 'undefined' && selectedLabel) || endpoint;

  const safeShowPopup = (title, msg, opt) => { if (typeof showPopup === 'function') try { showPopup(title, msg, opt); } catch(e){} };
  const safeLog = (m) => { if (typeof log === 'function') try { log(m); } catch(e){} };

  // 🔧 helper untuk reset tombol biar gak beku
  const resetSendButton = () => {
    try {
      btn.disabled = false;
      btn.setAttribute('aria-busy', 'false');
      const txt = btn.querySelector?.('.send-text');
      if (txt) txt.textContent = 'Send Bug';
    } catch {}
  };

  // ======================================
  // 🧩 VALIDASI DASAR
  // ======================================
  if (!to) return safeShowPopup('Nomor Target Kosong', 'Masukkan nomor target (contoh: 628xx) sebelum mengirim.', { type: 'warn' });
  if (!s.name || !s.phone) return safeShowPopup('Session Kosong', 'Generate pairing code dulu sebelum mengirim.', { type: 'warn' });

  const onlyDigits = String(to).replace(/\D/g, '');
  if (onlyDigits.length < 8) return safeShowPopup('Nomor Tidak Valid', 'Pastikan diawali 62 dan minimal 8 digit.', { type: 'warn' });

  try {
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    const btnTextEl = btn.querySelector?.('.send-text');
    if (btnTextEl) btnTextEl.textContent = `Processing ${label}...`;
  } catch {}

  safeLog(`⏳ Mulai kirim ${label} ke ${onlyDigits} via session ${s.name}_${s.phone}`);

  // ============================================================
  // 🩸 POPUP HORROR START
  // ============================================================
  const horrorPopup = document.getElementById("horrorPopup");
  const horrorTitle = document.getElementById("horrorTitle");
  const horrorTarget = document.getElementById("horrorTarget");
  const horrorLoader = document.querySelector(".horror-loader");

  if (horrorPopup && horrorTitle && horrorTarget) {
    try {
      const bgVid = document.getElementById('bgVideo');
      const bgAud = document.getElementById('bgMusic');
      if (bgVid && !bgVid.paused) bgVid.pause();
      if (bgAud && !bgAud.paused) bgAud.pause();
    } catch {}
    horrorPopup.classList.remove("hidden");
    horrorLoader.style.display = "block";
    document.body.classList.add("popup-active");
  }

  const horrorStep = async (text, delay = 900) => {
    if (horrorTitle) horrorTitle.textContent = text;
    await new Promise(r => setTimeout(r, delay));
  };

  try {
    // ==============================
    // 🔍 CEK SESSION AKTIF
    // ==============================
    await horrorStep("🩸 Checking Sender...");
    const sessRes = await fetch('/api/connect?sessionslist', { cache: 'no-store' });
    if (!sessRes.ok) throw new Error(`Gagal cek session (${sessRes.status})`);
    const sessData = await sessRes.json();
    const sessions = sessData.sessions || [];
    const active = sessions.find(x =>
      (String(x.name || '').toLowerCase() === String(s.name).toLowerCase() ||
       String(x.phone || '').replace(/\D/g, '') === String(s.phone).replace(/\D/g, '')) &&
      x.connected === true
    );
    if (!active) {
      safeShowPopup('Session Tidak Aktif', 'Session kamu belum connect ke WhatsApp.', { type: 'warn' });
      finalizeFail('SESSION ERROR', 'Session belum terhubung ke WhatsApp.');
      resetSendButton();
      return;
    }

    // ==============================
    // 🩸 CEK TARGET BLACKLIST
    // ==============================
    await horrorStep("🩸 Checking Target...");
    let blacklistedNumbers = [];
    try {
      const resBL = await fetch('/api/connect?blacklist', { cache: 'no-store' });
      if (resBL.ok) {
        const dataBL = await resBL.json();
        if (dataBL?.ok && Array.isArray(dataBL.blacklist)) {
          blacklistedNumbers = dataBL.blacklist.map(num => String(num).replace(/\D/g, ""));
          safeLog(`✅ Loaded ${blacklistedNumbers.length} blacklisted numbers from backend.`);
        } else safeLog('⚠️ Format blacklist tidak valid dari backend.');
      } else safeLog(`⚠️ Gagal ambil blacklist (HTTP ${resBL.status}).`);
    } catch (err) { safeLog(`⚠️ Error fetch blacklist: ${err.message}`); }

    if (blacklistedNumbers.includes(onlyDigits)) {
      safeLog(`🚫 Nomor ${onlyDigits} diblokir oleh sistem`);
      safeShowPopup('Target Diblokir', `Nomor ${onlyDigits} dilindungi sistem.`, { type: 'error' });
      finalizeFail('FAILED (BLACKLIST)', `Nomor ${onlyDigits} diblacklist.`);
      resetSendButton();
      return;
    }

    // ==============================
    // ⚙️ PROSES KIRIM
    // ==============================
    await horrorStep("PROCESSING...");

  } catch (err) {
    finalizeFail('SESSION ERROR', err.message || 'Gagal memeriksa session / blacklist.');
    resetSendButton();
    return;
  }

  // ============================================================
  // 🧩 ANIMASI MATRIX (tetap seperti sebelumnya)
  // ============================================================
  const sendModal = document.getElementById('sendModal');
  const matrixPre = document.getElementById('matrixPre');
  const sendInfo = document.getElementById('sendInfo');
  const sendSuccess = document.getElementById('sendSuccess');
  const sendTarget = document.getElementById('sendTarget');
  const sendOption = document.getElementById('sendOption');
  const sendMatrix = document.getElementById('sendMatrix');
  let intv = null;
  try {
    if (sendModal && matrixPre) {
      matrixPre.textContent = '';
      if (sendInfo) sendInfo.style.display = 'none';
      if (sendSuccess) sendSuccess.style.display = 'none';
      if (sendMatrix) sendMatrix.style.display = 'block';
      sendModal.classList.add('show');
      sendModal.setAttribute('aria-hidden', 'false');
      if (sendTarget) sendTarget.textContent = onlyDigits;
      if (sendOption) sendOption.textContent = label;

      const chars = '01█▒▓░<>[]()#@*+—\\/|';
      const lines = 12, len = 48;
      const buffer = Array.from({ length: lines }, () =>
        Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
      );
      matrixPre.textContent = buffer.join('\n');

      intv = setInterval(() => {
        buffer.shift();
        buffer.push(Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(''));
        matrixPre.textContent = buffer.join('\n');
      }, 80);

      setTimeout(() => {
        clearInterval(intv);
        if (sendMatrix) sendMatrix.style.display = 'none';
        if (sendInfo) sendInfo.style.display = 'block';
      }, 2200);
    }
  } catch (e) { safeLog('matrix prep error: ' + e.message); }

  // ============================================================
  // 🚀 FETCH API CONNECT
  // ============================================================
  const controller = new AbortController();
  const fetchTimeout = 20000;
  const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

  try {
    const body = { name: s.name, phone: s.phone, to: onlyDigits };
    const url = `/api/connect?action=${encodeURIComponent(endpoint)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      horrorTitle.textContent = "SUCCESS!";
      horrorTarget.innerHTML = `TARGET: ${onlyDigits}<br>🔥 Thanks for using! 🔥`;
      horrorLoader.style.display = "none";
      setTimeout(() => finalizePopup(), 2500);
      safeLog(`✅ Berhasil kirim ${label} -> ${onlyDigits}`);
    } else {
      const errMsg = data.error || data.message || `Error (${res.status})`;
      finalizeFail('FAILED!', errMsg);
    }
  } catch (err) {
    const msg = err.name === 'AbortError' ? 'Request timeout' : err.message;
    finalizeFail('ERROR!', msg);
    safeShowPopup('Error', msg, { type: 'error' });
  } finally {
    clearTimeout(timeoutId);
    if (intv) clearInterval(intv);
    resetSendButton(); // pastikan tombol kembali aktif di semua kondisi
  }

  // ============================================================
  // 🔚 FUNGSI TAMBAHAN
  // ============================================================
  function finalizePopup() {
    if (horrorPopup) horrorPopup.classList.add("hidden");
    document.body.classList.remove("popup-active");
    try {
      const bgVid = document.getElementById('bgVideo');
      const bgAud = document.getElementById('bgMusic');
      if (bgVid?.paused) bgVid.play();
      if (bgAud?.paused) bgAud.play();
    } catch {}
  }

  function finalizeFail(title, msg) {
    if (horrorPopup && horrorTitle && horrorTarget) {
      horrorTitle.textContent = title;
      horrorTarget.textContent = msg;
      horrorLoader.style.display = "none";
      setTimeout(() => finalizePopup(), 2500);
    }
    safeLog(`❌ ${title}: ${msg}`);
    resetSendButton();
  }
}

/* overlay close */
try { if (modalClose) modalClose.onclick = () => showOverlay(false); } catch {}

/* ======= SENDER GLOBAL FEATURE ======== */
const globalSenderBtn = document.getElementById("globalSenderBtn");
const globalPopup = document.getElementById("globalSenderPopup");
const closeGlobalPopup = document.getElementById("closeGlobalPopup");
const senderList = document.getElementById("senderList");

// buka popup
globalSenderBtn.addEventListener("click", async () => {
  globalPopup.classList.add("show");
  senderList.innerHTML = `<div class="loading">Memuat daftar sender...</div>`;
  try {
    const res = await fetch("/api/connect?senders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    const data = await res.json();

    if (!data.ok || !data.senders || !data.senders.length) {
      senderList.innerHTML = `<div class="loading">Belum ada sender global yang aktif.</div>`;
      return;
    }

    senderList.innerHTML = data.senders
      .map(
        (s, i) => `
        <div class="sender-card">
          <strong>${s.name}</strong><br>
          <small>${s.phone}</small><br>
          <small>Status: ${s.connected ? "🟢 Online" : "🔴 Offline"}</small><br>
          <button onclick="useGlobalSender('${s.name}','${s.phone}')">Gunakan</button>
        </div>`
      )
      .join("");
  } catch (e) {
    console.error("Gagal ambil sender:", e);
    senderList.innerHTML = `<div class="loading">Gagal memuat sender global.</div>`;
  }
});

// tutup popup
closeGlobalPopup.addEventListener("click", () => {
  globalPopup.classList.remove("show");
});

// fungsi saat pilih sender
function useGlobalSender(name, phone) {
  localStorage.setItem("senderGlobal", JSON.stringify({ name, phone }));
  globalPopup.classList.remove("show");

  // skip pairing langsung ke send panel
  document.getElementById("pairSection").style.display = "none";
  document.getElementById("sendSection").style.display = "block";

  // ubah tombol disconnect jadi "Out Session"
  const disconnectBtn = document.getElementById("disconnectBtn");
  disconnectBtn.textContent = "Out Session";
  disconnectBtn.onclick = outSenderGlobal;

  showToast(`Menggunakan sender global: ${name} (${phone})`);
}

// lepas session global (hanya user)
async function outSenderGlobal() {
  const s = JSON.parse(localStorage.getItem("senderGlobal") || "{}");
  if (!s.name) return showToast("Tidak ada session global aktif.");

  try {
    await fetch("/api/connect/out-sender", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: s.name, phone: s.phone }),
    });
  } catch (e) {
    console.warn("Out sender global error:", e);
  }

  // hapus semua jejak global session
  localStorage.removeItem("senderGlobal");
  localStorage.removeItem("wanz_session");

  // update UI langsung tanpa reload
  document.getElementById("sendSection").style.display = "none";
  document.getElementById("pairSection").style.display = "block";

  showToast("Keluar dari sender global.");
  log("User keluar dari sender global.");
}

function showMaintenance() {
  const el = document.getElementById("maintenancePopup");
  if (el) el.style.display = "flex";
}




  (function(){
    const music = document.getElementById('bgMusic');
    if (!music) return;

    music.volume = 0.5;
    music.loop = true;
    music.autoplay = true;
    music.preload = "auto";

    function tryPlay() {
      const p = music.play();
      if (p !== undefined) {
        p.catch(() => {
          window.addEventListener('click', tryPlay, { once: true });
          window.addEventListener('touchstart', tryPlay, { once: true });
        });
      }
    }
    tryPlay();

    // Kalau tab dibuka lagi setelah di-minimize, coba play ulang
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') tryPlay();
    });
  })();

  (function () {
    const v = document.getElementById('bgVideo');

    
    v.muted = true;
    v.playsInline = true;
    v.loop = true;

    
    function tryPlay() {
      v.play().catch((err) => {

        function onFirstInteract() {
          v.play().catch(()=>{});
          window.removeEventListener('click', onFirstInteract);
          window.removeEventListener('touchstart', onFirstInteract);
        }
        window.addEventListener('click', onFirstInteract, { once: true });
        window.addEventListener('touchstart', onFirstInteract, { once: true });
      });
    }

    
    tryPlay();

    
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      } else {
      }
    });


    v.addEventListener('ended', () => {
      try {
        v.currentTime = 0;
        v.play().catch(()=>{});
      } catch(e) {}
    });

  })();
  
const bg = document.getElementById('bgVideo');
bg.muted = true;
bg.loop = true;
bg.playsInline = true;

function ensurePlay() {
  const p = bg.play();
  if (p !== undefined) {
    p.catch(() => {
      window.addEventListener('click', ensurePlay, { once: true });
      window.addEventListener('touchstart', ensurePlay, { once: true });
    });
  }
}
ensurePlay();


/* =====================================================
   🔍 CEKBAN HANDLER — Wanz Official
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const cekBanBtn       = document.getElementById("cekBanBtn");
  const cekbanModal     = document.getElementById("cekbanModal");
  const cekbanClose     = document.getElementById("cekbanClose");
  const cekbanCheckBtn  = document.getElementById("cekbanCheckBtn");
  const cekbanPhone     = document.getElementById("cekbanPhone");
  const cekbanLoader    = document.getElementById("cekbanLoader");
  const cekbanResult    = document.getElementById("cekbanResult");

  // Jika elemen penting tidak ditemukan, hentikan eksekusi
  if (!cekBanBtn || !cekbanModal || !cekbanCheckBtn || !cekbanPhone) {
    console.error("[CEKBAN] ❌ Elemen HTML tidak lengkap, pastikan ID sudah sesuai.");
    return;
  }

  /* =====================================================
     🪟 Buka / Tutup Modal
  ===================================================== */
  cekBanBtn.addEventListener("click", () => {
    cekbanModal.classList.add("show");
    cekbanModal.setAttribute("aria-hidden", "false");
    cekbanPhone.focus();
  });

  cekbanClose.addEventListener("click", () => {
    cekbanModal.classList.remove("show");
    cekbanModal.setAttribute("aria-hidden", "true");
    cekbanResult.innerHTML = "";
  });

  cekbanModal.addEventListener("click", (e) => {
    if (e.target === cekbanModal) {
      cekbanModal.classList.remove("show");
      cekbanModal.setAttribute("aria-hidden", "true");
      cekbanResult.innerHTML = "";
    }
  });

  /* =====================================================
     ⚙️ Handler Tombol "Cek Sekarang"
  ===================================================== */
  cekbanCheckBtn.addEventListener("click", async () => {
    const number = cekbanPhone.value.trim().replace(/\D/g, "");
    cekbanResult.innerHTML = "";

    // Validasi input nomor
    if (!number) {
      showToast("Masukkan nomor WhatsApp dulu bro!");
      return;
    }
    if (number.length < 6) {
      showToast("Nomor terlalu pendek bro!");
      return;
    }
    if (number.length > 16) {
      showToast("Nomor terlalu panjang bro!");
      return;
    }

    cekbanLoader.style.display = "block";

    try {
      // 🔗 Panggil API backend yang udah lu deploy di Vercel
      const res  = await fetch(`/api/connect/cekban?number=${encodeURIComponent(number)}`);
      const data = await res.json().catch(() => ({})); // jaga kalau JSON invalid

      cekbanLoader.style.display = "none";

      // Handle jika request gagal
      if (!res.ok || !data || !data.ok) {
        const errMsg = data?.error || res.statusText || "Tidak dapat memproses permintaan.";
        cekbanResult.innerHTML = `
          <div class="cekban-error" style="color:red;font-weight:600;">
            ⚠️ Gagal cek nomor: ${errMsg}
          </div>`;
        return;
      }

      /* =====================================================
         🎯 Tentukan status berdasarkan respons backend
      ===================================================== */
      let statusText  = "";
      let statusColor = "";

      if (data.isBanned === true) {
        statusText  = "❌ NOMOR TERBANNED";
        statusColor = "red";
      } else if (data.isBanned === false) {
        statusText  = "✅ NOMOR MASIH AKTIF";
        statusColor = "limegreen";
      } else {
        statusText  = "⚠️ STATUS TIDAK DIKETAHUI";
        statusColor = "gray";
      }

      const officialText = data.isNeedOfficialWa
        ? "⚠️ Support terus ya genkk"
        : "✅ Support terus ya genkk";

      /* =====================================================
         🧾 Tampilkan hasil akhir ke pengguna
      ===================================================== */
      cekbanResult.innerHTML = `
        <div class="cekban-info" 
             style="border:2px solid ${statusColor};
                    padding:14px 16px;
                    border-radius:10px;
                    background:#101010;
                    color:#fff;
                    box-shadow:0 0 8px ${statusColor}55;">
          <h3 style="color:${statusColor};
                     margin-bottom:8px;
                     font-size:18px;">${statusText}</h3>
          <p><b>📱 Nomor:</b> ${data.number || number}</p>
          <p style="font-size:12px;opacity:.7;margin-top:10px;">
            Checked via <span style="color:deepskyblue;">Wanz Official</span>
          </p>
        </div>`;
    } catch (err) {
      // Tangani semua jenis error dengan tampilan rapi
      cekbanLoader.style.display = "none";
      console.error("[CEKBAN] ❗", err);

      cekbanResult.innerHTML = `
        <div class="cekban-error"
             style="color:orange;font-weight:600;">
          ⚠️ Terjadi kesalahan: ${err.message || "Unknown error"}
        </div>`;
    }
  });
});






/* ========== Init on load ========== */
(async function init(){
  // if already authed, show app
  await showAppIfAuthed();
  // if not authed, keep login visible
  updateUI();
})();