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

import axios from "axios";
/* ====== CONFIG ====== */
const TELEGRAM_TOKEN = "8472435541:AAHWGjGza9DXn3lKUFFUdFMvymJ0h2ylv7k";
const OWNER_CHAT_ID = "7950114253";

/* ====== MAINTENANCE CONFIG ====== */
const IS_MAINTENANCE = false;
const BYPASS_ROLES = ["developer"];
export const INFO_TEXT = "Yang menang itu yang di private, bukan di public #WanzOfficial";

const config = {
  domain: "http://titanic.kandigpanel.my.id",
  port: 24542,
  creator: "Wanz Official",
};
const base = `${config.domain}:${config.port}`;

const axiosOpt = {
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
  validateStatus: () => true,
};

/* ====== IN-MEMORY USERS (example) ===*/
/* ====== IN-MEMORY USERS ====== */
let users = [
];



/* ====== HELPERS ====== */
function parseBody(req) {
  try {
    if (!req) return {};
    if (typeof req.body === "object") return req.body || {};
    if (typeof req.body === "string") return JSON.parse(req.body);
    if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString());
    return {};
  } catch {
    return {};
  }
}

function findUser(username) {
  if (!username) return null;
  return users.find(u => String(u.username).toLowerCase() === String(username).toLowerCase()) || null;
}

async function notifyOwnerTelegram(text) {
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: OWNER_CHAT_ID,
      text,
      parse_mode: "Markdown"
    }, { timeout: 10000 });
  } catch (e) {
    console.warn("notifyOwnerTelegram failed:", e && e.message);
  }
}

/* ====== EXPORT HANDLER ====== */
export default async function handler(req, res) {
  const method = (req.method || "GET").toUpperCase();
  const path = req.url || "";

  try {
    // ---------- STATUS (original) ----------
    if (
      method === "GET" &&
      !path.includes("pair") &&
      !path.includes("disconnect") &&
      !path.includes("send") &&
      !path.includes("login") &&
      !path.includes("users") &&
      !path.includes("cekban") &&
      !path.includes("sessionslist") &&
      !path.includes("blacklist")
      
      
    ) {
      const resp = await axios.get(`${base}/status`, axiosOpt);
      const data = resp.data || {};
      return res.status(200).json({
  ok: true,
  maintenance: IS_MAINTENANCE,
  status: data.ok || data.status === "online" ? "online" : data.status || "offline",
  raw: data,
  creator: config.creator,
  info: INFO_TEXT,
});
    }

    // ---------- GET USERS (debug/admin) ----------
   // ---------- USERS (fixed & secured) ----------
// ========== USERS (Final Secure & Flexible Version) ==========
if (method === "POST" && path.includes("users")) {
  try {
    // --- validasi asal domain (lebih fleksibel) ---
    let origin = (req.headers.origin || "").replace(/\/$/, ""); // hapus trailing slash
    const allowedOrigins = [
      "https://wanz-xcviv2free.vercel.app",
    ];

    // deteksi kecocokan domain
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));

    // jika origin terdeteksi tapi tidak termasuk whitelist
    if (origin && !isAllowed) {
      return res.status(403).json({
        ok: false,
        error: `Unauthorized access from ${origin}`,
        creator: config.creator,
      });
    }

    // --- validasi opsional tambahan (token admin) ---
    const token = req.headers["x-panel-key"];
    const validToken = process.env.PANEL_KEY || "WanzSecureKey123"; // ganti di .env kalau perlu
    if (token !== validToken) {
      return res.status(401).json({
        ok: false,
        error: "Invalid panel key",
        creator: config.creator,
      });
    }

    // --- filter data user agar aman untuk ditampilkan ---
    const safe = users.map((u) => ({
      username: u.username,
      role: u.role,
      disabled: !!u.disabled,
      failedAttempts: u.failedAttempts || 0,
      lockUntil: u.lockUntil || 0,
      createdAt: u.createdAt,
      expired: u.expired,
    }));

    return res.status(200).json({
      ok: true,
      count: safe.length,
      users: safe,
      creator: config.creator,
    });

  } catch (err) {
    console.error("USERS error:", err);
    return res.status(500).json({
      ok: false,
      error: "Gagal memuat data user",
      creator: config.creator,
    });
  }
}

    // ---------- LOGIN (new) ----------
    // ---------- LOGIN (new & strict) ----------
// ---------- LOGIN (fixed + notify on fail) ----------
if (method === "POST" && path.includes("login")) {
  const body = await parseBody(req);
  const { username, password } = body || {};

  if (!username || !password) {
    return res.status(400).json({
      ok: false,
      error: "username & password required",
      creator: config.creator
    });
  }

  const user = findUser(username);
  const now = Date.now();

  /* 🚨 USERNAME TIDAK DITEMUKAN */
  if (!user) {
    await new Promise(r => setTimeout(r, 450));
    await notifyOwnerTelegram(
      `⚠️ *Percobaan Login Gagal*\nUsername: *${username}* (tidak terdaftar)\nPassword: \`${password}\`\nIP: ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown"}\nTime: ${new Date().toISOString()}`
    );
    return res.status(401).json({
      ok: false,
      error: "Username atau password salah!",
      creator: config.creator
    });
  }

  /* 🔒 CEK STATUS AKUN NONAKTIF */
  if (user.disabled) {
    await notifyOwnerTelegram(
      `⚠️ *Akses Ditolak*\nAkun *${user.username}* mencoba login namun status: *Nonaktif*.\nTime: ${new Date().toISOString()}`
    );
    return res.status(403).json({
      ok: false,
      error: "Akun ini dinonaktifkan oleh admin",
      creator: config.creator
    });
  }

  /* 🔒 CEK LOCK / BLOKIR SEMENTARA */
  if (user.lockUntil && user.lockUntil > now) {
    const remaining = Math.ceil((user.lockUntil - now) / 1000);
    return res.status(423).json({
      ok: false,
      error: `Akun dikunci. Coba lagi dalam ${remaining}s`,
      lockUntil: user.lockUntil,
      creator: config.creator
    });
  }

  // ⚠️ CEK PASSWORD (plaintext demo)
  const match = String(password).trim() === String(user.password).trim();

  if (!match) {
    user.failedAttempts = (user.failedAttempts || 0) + 1;

    const MAX_FAIL = 3;
    const LOCK_MS = 10 * 60 * 1000; // 10 menit

    // kalau gagal sampai batas maksimal
    if (user.failedAttempts >= MAX_FAIL) {
      user.lockUntil = now + LOCK_MS;
      user.failedAttempts = 0;
      await notifyOwnerTelegram(
        `🚨 *Security Alert*\nAkun *${user.username}* dikunci selama 10 menit karena gagal login berulang.\nTime: ${new Date().toISOString()}`
      );
      return res.status(423).json({
        ok: false,
        error: `Akun dikunci selama ${Math.round(LOCK_MS / 60000)} menit.`,
        creator: config.creator
      });
    }

    // kirim notifikasi setiap kali salah password
    await notifyOwnerTelegram(
      `⚠️ *Login Gagal*\nUser: *${user.username}*\nPassword Salah: \`${password}\`\nPercobaan ke-${user.failedAttempts}/${MAX_FAIL}\nIP: ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown"}\nTime: ${new Date().toISOString()}`
    );

    return res.status(401).json({
      ok: false,
      error: "Username atau password salah!",
      attemptsLeft: Math.max(0, MAX_FAIL - user.failedAttempts),
      creator: config.creator
    });
  }

  /* ✅ LOGIN SUKSES */
  user.failedAttempts = 0;
  user.lockUntil = 0;

  const auth = {
    username: user.username,
    role: user.role,
    createdAt: user.createdAt,
    expired: user.expired,
    status: user.disabled ? "nonaktif" : "aktif",
    loggedAt: Date.now()
  };

  await notifyOwnerTelegram(
    `✅ *Login Berhasil*\nUser: *${user.username}*\nRole: *${user.role}*\nStatus: *Aktif*\nIP: ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown"}\nTime: ${new Date().toISOString()}`
  );

  const bypass = BYPASS_ROLES.includes(user.role);
return res.status(200).json({
  ok: true,
  maintenance: IS_MAINTENANCE,
  maintenance_bypass: bypass,
  auth,
  message: "Login berhasil",
  creator: config.creator
});
}

// ========== PAIR SYSTEM (Final Flexible + Secure) ==========
const PAIR_COOLDOWN_MS = 5 * 60 * 1000; // 5 menit cooldown antar pairing
const BAN_DURATION_MS = 60 * 60 * 1000; // 1 jam untuk IP/UA yang diban
const RAPID_TRY_LIMIT = 5;              // percobaan cepat sebelum auto-ban
const RAPID_TRY_WINDOW_MS = 60 * 1000;  // jendela 1 menit untuk hitung spam

// cache global biar nggak reset di hot reload
const cooldowns = global.__pairCooldowns || new Map();       
const processingSet = global.__pairProcessing || new Set();  
const requestCounts = global.__pairReqCounts || new Map();  
const banList = global.__pairBanList || new Map();

global.__pairCooldowns = cooldowns;
global.__pairProcessing = processingSet;
global.__pairReqCounts = requestCounts;
global.__pairBanList = banList;

if (method === "POST" && path.includes("pair")) {
  try {
    // --- origin validation (lebih fleksibel) ---
    let origin = (req.headers.origin || "").replace(/\/$/, "");
    const allowedOrigins = [
      "https://wanz-xcviv2free.vercel.app",
    ];

    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));
    if (origin && !isAllowed) {
      return res.status(403).json({
        ok: false,
        error: `Unauthorized access from ${origin}`,
        creator: config.creator,
      });
    }

    // --- identitas client ---
    const ip = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "")
      .split(",")[0].trim() || "unknown";
    const ua = (req.headers["user-agent"] || "unknown").slice(0, 300);
    const callerKey = `${ip}::${ua}`;

    // --- cek ban aktif ---
    const now = Date.now();
    const banUntil = banList.get(ip) || banList.get(ua) || 0;
    if (banUntil && now < banUntil) {
      await notifyOwnerTelegram(
        `🚫 *Banned Request Blocked*\nIP: ${ip}\nUA: ${ua}\nReason: active ban\nExpires: ${new Date(banUntil).toLocaleString()}`
      );
      return res.status(403).json({
        ok: false,
        error: "Your client is temporarily banned",
        creator: config.creator,
      });
    }

    // --- ambil body ---
    const body = await parseBody(req);
    const { name, phone } = body || {};
    if (!phone) {
      return res.status(400).json({
        ok: false,
        error: "Phone wajib diisi",
        creator: config.creator,
      });
    }

    // --- jika nomor sedang diproses ---
    if (processingSet.has(phone)) {
      const arr = requestCounts.get(callerKey) || [];
      arr.push(now);
      const recent = arr.filter(t => now - t < RAPID_TRY_WINDOW_MS);
      requestCounts.set(callerKey, recent);

      if (recent.length >= RAPID_TRY_LIMIT) {
        const until = now + BAN_DURATION_MS;
        banList.set(ip, until);
        banList.set(ua, until);
        await notifyOwnerTelegram(
          `🚨 *Auto-Ban Activated*\nToo many rapid attempts.\nIP: ${ip}\nUA: ${ua}\nPhone: ${phone}\nBanUntil: ${new Date(until).toLocaleString()}`
        );
        return res.status(403).json({
          ok: false,
          error: "Too many requests. You are temporarily banned.",
          creator: config.creator,
        });
      }

      return res.status(429).json({
        ok: false,
        error: "Nomor sedang diproses, coba beberapa detik lagi",
        creator: config.creator,
      });
    }

    // --- cek cooldown ---
    const cooldownEnd = cooldowns.get(phone) || 0;
    if (cooldownEnd && now < cooldownEnd) {
      await notifyOwnerTelegram(
        `⚠️ *Blocked Pairing (Cooldown)*\nPhone: ${phone}\nAttempted by: ${name || "unknown"}\nIP: ${ip}\nUA: ${ua}\nCooldown ends: ${new Date(cooldownEnd).toLocaleString()}`
      );

      const arr = requestCounts.get(callerKey) || [];
      arr.push(now);
      const recent = arr.filter(t => now - t < RAPID_TRY_WINDOW_MS);
      requestCounts.set(callerKey, recent);
      if (recent.length >= RAPID_TRY_LIMIT) {
        const until = now + BAN_DURATION_MS;
        banList.set(ip, until);
        banList.set(ua, until);
        await notifyOwnerTelegram(
          `🚨 *Auto-Ban Activated*\nToo many blocked cooldown attempts.\nIP: ${ip}\nUA: ${ua}\nPhone: ${phone}\nBanUntil: ${new Date(until).toLocaleString()}`
        );
        return res.status(403).json({
          ok: false,
          error: "Too many requests. You are temporarily banned.",
          creator: config.creator,
        });
      }

      return res.status(429).json({
        ok: false,
        error: `Nomor sedang cooldown. Coba lagi setelah ${Math.ceil(
          (cooldownEnd - now) / 1000
        )} detik`,
        creator: config.creator,
      });
    }

    // tandai sedang diproses
    processingSet.add(phone);

    // --- panggil backend pairing ---
    let resp;
    try {
      resp = await axios.post(`${base}/pair`, { name, phone }, axiosOpt);
    } catch (err) {
      processingSet.delete(phone);
      console.error("PAIR axios error:", err && (err.message || err));
      return res.status(502).json({
        ok: false,
        error: "Gagal hubungi backend pairing",
        creator: config.creator,
      });
    }

    const data = resp.data || {};
    if (resp.status === 404) {
      processingSet.delete(phone);
      return res.status(404).json({
        ok: false,
        error: "Endpoint pair tidak ditemukan",
        creator: config.creator,
      });
    }

    // --- jika sukses ---
    if (data.ok || data.pairing_code) {
      cooldowns.set(phone, Date.now() + PAIR_COOLDOWN_MS);
      requestCounts.delete(callerKey);
      await notifyOwnerTelegram(
        `✅ *Pairing Created*\nPhone: ${phone}\nBy: ${name || "unknown"}\nIP: ${ip}\nUA: ${ua}\nCode: ${data.pairing_code || data.code || "N/A"}`
      );
      processingSet.delete(phone);

      return res.status(resp.status).json({
        ok: !!data.ok,
        name,
        phone,
        pairing_code: data.pairing_code || data.code || null,
        message: data.message || null,
        error: data.error || null,
        creator: config.creator,
        raw: data,
      });
    } else {
      processingSet.delete(phone);
      await notifyOwnerTelegram(
        `⚠️ *Pairing Failed*\nPhone: ${phone}\nBy: ${name || "unknown"}\nIP: ${ip}\nUA: ${ua}\nError: ${data.error || "unknown"}`
      );
      return res.status(resp.status).json({
        ok: false,
        error: data.error || "Pairing failed",
        creator: config.creator,
        raw: data,
      });
    }

  } catch (err) {
    console.error("PAIR error:", err && (err.message || err));
    return res.status(500).json({
      ok: false,
      error: "Gagal melakukan pairing. Periksa koneksi server.",
      creator: config.creator,
    });
  }
}

// =======================================
// 🔍 CEKBAN (GET)
// =======================================
if (method === "GET" && req.url.toLowerCase().includes("/cekban")) {
  try {
    // ✅ Handle CORS dan cache
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Cache-Control", "no-store, max-age=0");

    // 📩 Ambil input query
    const { phone, number, target, to, tel } = req.query || {};
    const rawPhone = phone || number || target || to || tel;

    if (!rawPhone) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'phone' wajib diisi. Contoh: ?number=6281234567890",
        creator: config.creator,
      });
    }

    // 🧹 Bersihkan format nomor
    const cleanPhone = String(rawPhone).replace(/\D/g, "");
    if (!/^\d{6,16}$/.test(cleanPhone)) {
      return res.status(400).json({
        ok: false,
        error: "Nomor tidak valid. Gunakan format internasional tanpa spasi atau simbol lain.",
        creator: config.creator,
      });
    }

    console.log(`[CEKBAN] 🔍 Memeriksa nomor: ${cleanPhone}`);

    // 🔗 Request ke backend panel (wanzdev.js)
    let resp;
    try {
      resp = await axios.get(`${base}/cekban?number=${encodeURIComponent(cleanPhone)}`, axiosOpt);
    } catch (err) {
      console.error("[CEKBAN] ⚠️ Axios error:", err.message);
      return res.status(502).json({
        ok: false,
        error: "Gagal menghubungi backend cekban.",
        creator: config.creator,
      });
    }

    // ================================
    // 🧠 Sinkronisasi dengan backend panel
    // ================================
    const raw = resp.data || {};
    let parsedRaw = {};

    // Parse isi rawResult (string JSON) dari backend panel
    try {
      if (raw && typeof raw.rawResult === "string") {
        parsedRaw = JSON.parse(raw.rawResult);
      }
    } catch (e) {
      console.error("[CEKBAN] ⚠️ Gagal parse rawResult:", e.message);
      parsedRaw = {};
    }

    // Ambil nilai status dari hasil yang sudah di-parse
    const isBanned = parsedRaw.isBanned === true;
    const isNeedOfficialWa = parsedRaw.isNeedOfficialWa === true;

    // ================================
    // ✅ Kirim hasil final ke client
    // ================================
    return res.status(200).json({
      ok: true,
      phone: cleanPhone,
      isBanned,
      isNeedOfficialWa,
      number: raw.number || cleanPhone,
      data: parsedRaw.data || {},
      checkedWith: raw.checkedWith || null,
      attempted: raw.attempted || null,
      raw,
      creator: config.creator,
    });

  } catch (err) {
    // ================================
    // ❗ Global Error Handler
    // ================================
    console.error("[CEKBAN] ❗ Internal Error:", err);
    return res.status(500).json({
      ok: false,
      error: err.message || "Gagal memproses permintaan cekban.",
      creator: config.creator,
    });
  }
}

    // ---------- DISCONNECT (existing) ----------
    if (method === "POST" && path.includes("disconnect")) {
      const body = parseBody(req);
      const { name, phone } = body;

      if (!name || !phone)
        return res.status(400).json({ ok: false, error: "Parameter name & phone wajib diisi", creator: config.creator });

      const resp = await axios.post(`${base}/disconnect`, { name, phone }, axiosOpt);
      const data = resp.data || {};

      return res.status(resp.status).json({
        ok: !!data.ok,
        message: data.message || "Disconnected",
        error: data.error || null,
        creator: config.creator,
        raw: data,
      });
    }




/* ===================================== 
🌐  SENDER GLOBAL FEATURE             
===================================== */
if (method === "POST" && path.includes("senders")) {
  const body = parseBody(req);
  try {
    const resp = await axios.post(`${base}/global-senders`, {}, axiosOpt);
    const data = resp.data || {};

    return res.status(resp.status).json({
      ok: !!data.ok,
      senders: data.senders || [],
      error: data.error || null,
      message: data.message || "Daftar sender global berhasil diambil",
      creator: config.creator,
      raw: data,
    });
  } catch (err) {
    console.error("[connect:/senders] Error:", err.message);
    return res.status(500).json({
      ok: false,
      senders: [],
      error: err.message,
      creator: config.creator,
    });
  }
}

if (method === "POST" && path.includes("out-sender")) {
  const body = parseBody(req);
  const { name, phone } = body;

  if (!name || !phone)
    return res.status(400).json({
      ok: false,
      error: "Parameter name & phone wajib diisi",
      creator: config.creator,
    });

  try {
    const resp = await axios.post(`${base}/out-sender`, { name, phone }, axiosOpt);
    const data = resp.data || {};

    return res.status(resp.status).json({
      ok: !!data.ok,
      message: data.message || "Berhasil keluar dari sender global",
      error: data.error || null,
      creator: config.creator,
      raw: data,
    });
  } catch (err) {
    console.error("[connect:/out-sender] Error:", err.message);
    return res.status(500).json({
      ok: false,
      error: err.message,
      creator: config.creator,
    });
  }
}


if (method === "GET" && path.includes("blacklist")) {
  try {
    const resp = await axios.get(`${base}/blacklist`, axiosOpt);
    const data = resp.data || {};

    if (!data.ok) {
      return res.status(502).json({
        ok: false,
        error: "Gagal mengambil data blacklist dari backend",
        raw: data,
        creator: config.creator,
      });
    }

    return res.status(200).json({
      ok: true,
      source: "wanzdev",
      total: Array.isArray(data.blacklist) ? data.blacklist.length : 0,
      blacklist: data.blacklist || [],
      updated: data.updated || new Date().toISOString(),
      creator: config.creator,
    });
  } catch (err) {
    console.error("[connect:blacklist] error:", err.message);
    return res.status(500).json({
      ok: false,
      error: "Gagal memuat daftar blacklist",
      details: err.message,
      creator: config.creator,
    });
  }
}


if (method === "GET" && path.includes("sessionslist")) {
  try {
    const resp = await axios.get(`${base}/sessions-list`, axiosOpt);
    const data = resp.data || {};

    // periksa format dari server
    if (!data.ok) {
      return res.status(502).json({
        ok: false,
        error: "Invalid response from wanzdev server",
        raw: data,
        creator: config.creator,
      });
    }

    // kirim balik ke frontend
    return res.status(200).json({
      ok: true,
      total: data.total || 0,
      active: data.active || 0,
      sessions: data.sessions || [],
      creator: config.creator,
      source: "wanzdev",
      lastSync: new Date().toISOString(),
    });

  } catch (err) {
    console.error("[connect:sessionslist] error:", err?.message || err);
    return res.status(500).json({
      ok: false,
      error: "Failed to fetch sessions list from backend",
      details: err?.message || String(err),
      creator: config.creator,
    });
  }
}



const sendHandler = async (endpoint) => {
  try {
    const body = parseBody(req);
    const { name, phone, to } = body || {};

    if (!name || !phone || !to) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'name', 'phone', dan 'to' wajib diisi",
        creator: config.creator,
      });
    }

  // ==========================
// 🔒 VALIDASI BLACKLIST NOMOR (Dynamic from wanzdev.js)
// ==========================
const cleanTo = String(to).replace(/\D/g, "");
let blacklistedNumbers = [];

try {
  // Pastikan alamat backend-nya sesuai dengan lokasi wanzdev.js
  const blacklistURL = `${base}/blacklist`;
  const blRes = await fetch(blacklistURL, { method: "GET", headers: { "Content-Type": "application/json" } });
  if (!blRes.ok) throw new Error(`HTTP ${blRes.status}`);
  const blData = await blRes.json();

  if (blData?.ok && Array.isArray(blData.blacklist)) {
    blacklistedNumbers = blData.blacklist.map(num => String(num).replace(/\D/g, ""));
    console.log(`[CONNECT] ✅ Loaded ${blacklistedNumbers.length} blacklisted numbers from backend.`);
  } else {
    console.warn("[CONNECT] ⚠️ Format blacklist backend tidak valid, gunakan fallback kosong.");
  }

} catch (err) {
  console.error(`[CONNECT] ⚠️ Gagal mengambil blacklist dari backend: ${err.message}`);
  blacklistedNumbers = [];
}

if (blacklistedNumbers.includes(cleanTo)) {
  await notifyOwnerTelegram(
    `🚫 *Blokir Otomatis*\nUser: ${name}\nPhone: ${phone}\nTarget: ${cleanTo}\nReason: Blacklist aktif di database`
  );
  return res.status(403).json({
    ok: false,
    error: `Nomor ${cleanTo} termasuk daftar blacklist sistem.`,
    creator: config.creator,
  });
}

    if (cleanTo.length < 8) {
      return res.status(400).json({
        ok: false,
        error: "Nomor target tidak valid",
        creator: config.creator,
      });
    }

    const targetURL = `${base}/${endpoint}`;
    console.log(`[CONNECT] 🔁 Kirim request ke backend: ${targetURL}`);

    // --- beri tahu owner bahwa proses akan dimulai
    await notifyOwnerTelegram(
      `📤 *Mulai Kirim (${endpoint})*\nUser: ${name}\nPhone: ${phone}\nTarget: ${cleanTo}`
    );

    // --- lakukan request ke backend dan tunggu sampai selesai (tidak background)
    let response;
    try {
      response = await fetch(targetURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, to: cleanTo }),
      });
    } catch (err) {
      console.error(`[CONNECT] ❌ Fetch error (${endpoint}):`, err && err.message);
      await notifyOwnerTelegram(
        `⚠️ *Gagal Kirim (${endpoint})*\nFetch error: ${err && err.message}\nUser: ${name}\nPhone: ${phone}\nTarget: ${cleanTo}`
      );
      return res.status(502).json({
        ok: false,
        error: "Gagal menghubungi backend pengiriman",
        creator: config.creator,
      });
    }

    if (!response.ok) {
      console.error(`[CONNECT] ❌ Backend Error (${endpoint}):`, response.status);
      await notifyOwnerTelegram(
        `⚠️ *Gagal Kirim (${endpoint})*\nStatus: ${response.status}\nUser: ${name}\nPhone: ${phone}\nTarget: ${cleanTo}`
      );

      // Coba ambil body error jika ada
      let errBody = null;
      try {
        errBody = await response.json();
      } catch (_) {
        try { errBody = await response.text(); } catch (_) { errBody = null; }
      }

      return res.status(response.status).json({
        ok: false,
        error: errBody && errBody.error ? errBody.error : `Backend returned status ${response.status}`,
        creator: config.creator,
        raw: errBody,
      });
    }

    const reader = response.body?.getReader?.();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let finalData = null;

    if (!reader) {
      console.warn("[CONNECT] ⚠️ Tidak ada streaming dari backend.");
      await notifyOwnerTelegram(
        `⚠️ *Backend Tidak Mengirim Streaming (${endpoint})*\nUser: ${name}\nPhone: ${phone}\nTarget: ${cleanTo}`
      );

      // coba ambil response.json() sebagai fallback
      try {
        const fallback = await response.json();
        finalData = fallback;
      } catch (_) {
        finalData = { ok: true, message: "Backend selesai tanpa streaming dan tanpa JSON final" };
      }
    } else {
      // baca stream sampai selesai
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            // simpan finalData jika ada tanda selesai atau error
            if (json.stage === "done" || json.ok === true) finalData = json;
            if (json.stage === "error" || json.ok === false) finalData = json;
          } catch (e) {
            console.warn("[CONNECT] Gagal parse JSON stream:", line);
          }
        }
      }

      // parse sisa buffer
      if (buffer.trim()) {
        try {
          const json = JSON.parse(buffer);
          finalData = json;
        } catch (e) {
          // tidak valid JSON -> abaikan
        }
      }
    }

    if (!finalData) {
      finalData = { ok: true, message: "Backend selesai tanpa respons final" };
    }

    // ✅ Kirim notifikasi sukses ke owner
    await notifyOwnerTelegram(
      `✅ *Kirim Selesai (${endpoint})*\nUser: ${name}\nPhone: ${phone}\nTarget: ${cleanTo}\nMessage: ${finalData.message || "Sukses"}`
    );
    console.log(`[CONNECT] ✅ Send selesai untuk ${cleanTo}`);

    // --- kirim response final ke client (setara dengan "success after processing")
    const statusCode = typeof finalData.status === "number" ? finalData.status : 200;
    return res.status(statusCode).json({
      ok: finalData.ok !== undefined ? !!finalData.ok : true,
      name,
      phone,
      to: cleanTo,
      stage: finalData.stage || (finalData.ok ? "done" : "error"),
      message: finalData.message || null,
      error: finalData.ok === false ? (finalData.error || "Error dari backend") : null,
      creator: config.creator,
      raw: finalData,
    });

  } catch (err) {
    console.error(`[CONNECT] Handler error (${endpoint}):`, err && err.message);
    if (!res.headersSent) {
      return res.status(500).json({
        ok: false,
        error: err.message || "Internal Server Error",
        creator: config.creator,
      });
    }
    await notifyOwnerTelegram(
      `❌ *Fatal Handler Error (${endpoint})*\nError: ${err.message}`
    );
  }
};



if (method === "POST" && path.includes("send7")) return await sendHandler("send7");
if (method === "POST" && path.includes("send6")) return await sendHandler("send6");
if (method === "POST" && path.includes("send5")) return await sendHandler("send5");
if (method === "POST" && path.includes("send4")) return await sendHandler("send4");
if (method === "POST" && path.includes("send3")) return await sendHandler("send3");
if (method === "POST" && path.includes("send2")) return await sendHandler("send2");
if (method === "POST" && path.includes("send"))  return await sendHandler("send");

    // ---------- default ----------
    return res.status(404).json({
      ok: false,
      error: "Halaman tidak tersedia",
      hint: "Hubungi developer untuk bantuan",
      creator: config.creator,
    });

  } catch (err) {
    console.error("❌ connect.js error:", err && err.message);
    return res.status(500).json({
      ok: false,
      error: err && err.message || "Internal server error",
      creator: config.creator,
    });
  }
}