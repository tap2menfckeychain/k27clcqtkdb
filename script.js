/* ============ Thiệp 20/10 · bản pastel — tương tác (nội dung sửa ở data.js) ============ */
(() => {
  "use strict";

  const D = window.THIEP || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ten = (D.ten || "").trim();
  const goi = ten || "cậu";
  const tuAi = (D.nguoiGui || "").trim();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const R = (a, b) => a + Math.random() * (b - a);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function ngay2010() {
    const now = new Date(), m = now.getMonth() + 1, d = now.getDate();
    if (m === 10 && d === 20) return "hôm nay 20/10 nè";
    if (m === 10 && d < 20) return "sắp 20/10 rồi đó nha";
    return "20/10 vui vẻ nha";
  }
  const fill = (s) => String(s || "").replace(/\{ngay2010\}/g, ngay2010()).replace(/\{ten\}/g, goi);

  const anhCaNhan = D.anhCaNhan || "anh/ca-nhan.jpg";
  const anhLop = Array.isArray(D.anhLop) ? D.anhLop : [];
  const album = [
    { lon: anhCaNhan, chuThich: ten ? ten + " 🌷" : "main character 🌷" },
    ...anhLop.map((p) => ({ lon: p.lon || p.nho, chuThich: p.chuThich }))
  ];
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  const useIcon = (id) => {
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    const u = document.createElementNS(NS, "use");
    u.setAttribute("href", "#" + id);
    svg.appendChild(u);
    return svg;
  };

  /* =====================================================================
     PHÁO GIẤY (tim, sao, chấm, giấy vụn màu pastel)
     ===================================================================== */
  const cv = $("#confetti"), cx = cv.getContext("2d");
  const COLORS = ["#ffacd0", "#ff8fbf", "#f97fb1", "#ec6aa8", "#bba6ff", "#9fd0ff", "#ffd36e", "#8fe3c0"];
  const HEART = new Path2D("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
  const STAR = new Path2D("M12 1C13 8.5 15.5 11 23 12 15.5 13 13 15.5 12 23 11 15.5 8.5 13 1 12 8.5 11 11 8.5 12 1Z");
  let parts = [], running = false, CW = 0, CH = 0, last = 0;

  function sizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    CW = window.innerWidth;
    CH = window.innerHeight;
    cv.width = Math.round(CW * dpr);
    cv.height = Math.round(CH * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function confetti(x, y, n = 60, o = {}) {
    if (reduce) n = Math.min(n, 14);
    const spread = o.spread || Math.PI * 2, dir = o.dir == null ? -Math.PI / 2 : o.dir;
    for (let i = 0; i < n; i++) {
      const a = dir + (Math.random() - 0.5) * spread;
      const sp = R(o.min || 180, o.max || 620);
      const r = Math.random();
      parts.push({
        x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        rot: R(0, 6.3), vr: R(-8, 8), size: R(8, 15), flip: R(0, 6.3),
        shape: o.hearts ? (r < 0.75 ? "heart" : "star") : r < 0.3 ? "heart" : r < 0.5 ? "star" : r < 0.75 ? "rect" : "dot",
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0, max: R(1.6, 2.6)
      });
    }
    if (!running) {
      running = true;
      last = performance.now();
      requestAnimationFrame(tick);
    }
  }

  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    cx.clearRect(0, 0, CW, CH);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life += dt;
      if (p.life > p.max || p.y > CH + 40) { parts.splice(i, 1); continue; }
      const drag = Math.pow(0.955, dt * 60);
      p.vx *= drag;
      p.vy = p.vy * drag + 700 * dt;
      p.x += p.vx * dt + Math.sin(p.life * 6 + p.flip) * 0.6;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      cx.globalAlpha = Math.min(1, (p.max - p.life) * 2.5);
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.rot);
      cx.fillStyle = p.color;
      if (p.shape === "heart" || p.shape === "star") {
        const s = p.size / 22;
        cx.scale(s, s);
        cx.translate(-12, -12);
        cx.fill(p.shape === "heart" ? HEART : STAR);
      } else if (p.shape === "rect") {
        cx.scale(1, Math.cos(p.life * 8 + p.flip));
        cx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        cx.beginPath();
        cx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        cx.fill();
      }
      cx.restore();
    }
    cx.globalAlpha = 1;
    if (parts.length) requestAnimationFrame(tick);
    else { running = false; cx.clearRect(0, 0, CW, CH); }
  }

  function popHeart(x, y) {
    const h = el("span", "pop-heart");
    h.style.left = x + "px";
    h.style.top = y + "px";
    h.style.setProperty("--r", R(-18, 18).toFixed(0) + "deg");
    h.appendChild(useIcon("i-heart"));
    document.body.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
    confetti(x, y, 10, { hearts: true, min: 120, max: 320 });
  }

  /* =====================================================================
     NHẠC
     ===================================================================== */
  const bgm = $("#bgm"), player = $("#player");
  const nhac = D.nhac || {};
  bgm.src = nhac.file || "nhac/lofi-20-10.wav";
  $("#playerTitle").textContent = nhac.ten || "nhạc nền";
  $("#playerArtist").textContent = nhac.caSi || tuAi || "";
  $("#playerCover").src = anhCaNhan;
  let pausedByHide = false;
  const playMusic = () => { const p = bgm.play(); if (p && p.catch) p.catch(() => {}); };
  bgm.addEventListener("play", () => player.classList.add("playing"));
  bgm.addEventListener("pause", () => player.classList.remove("playing"));
  bgm.addEventListener("timeupdate", () => {
    if (bgm.duration) $("#playerBar").style.width = (bgm.currentTime / bgm.duration) * 100 + "%";
  });
  $("#playBtn").addEventListener("click", () => (bgm.paused ? playMusic() : bgm.pause()));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (!bgm.paused) { bgm.pause(); pausedByHide = true; }
    } else if (pausedByHide) {
      pausedByHide = false;
      playMusic();
    }
  });

  /* =====================================================================
     MÀN TẢI & MỞ QUÀ
     ===================================================================== */
  let opened = false;
  function runLoader() {
    const bar = $("#introBar"), pct = $("#introPct"), k = $("#introK");
    const texts = [[0, "đang tải độ dễ thương…"], [35, "đang rắc kim tuyến ✨"], [70, "đang thắt nơ 🎀"]];
    let p = 0;
    const step = () => {
      p = Math.min(100, p + R(3, 9));
      bar.style.width = p + "%";
      pct.textContent = Math.round(p) + "%";
      for (const [at, t] of texts) if (p >= at) k.textContent = t;
      if (p < 100) setTimeout(step, R(60, 150));
      else {
        k.textContent = "xong rồi nè! 🥳";
        pct.hidden = true;
        $("#openBtn").hidden = false;
      }
    };
    setTimeout(step, 450);
  }

  $("#openBtn").addEventListener("click", (e) => {
    if (opened) return;
    opened = true;
    playMusic();
    const r = e.currentTarget.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top + r.height / 2, 110);
    $("#intro").classList.add("gone");
    document.body.classList.remove("locked");
    player.hidden = false;
    window.scrollTo(0, 0);
    setTimeout(() => {
      $("#intro").hidden = true;
      $("#hero").classList.add("in");
      entered.add("hero");
      setDot($("#hero"));
    }, 380);
  });

  /* =====================================================================
     CÁC MÀN: hiện dần khi lướt tới
     ===================================================================== */
  const secs = $$(".sec");
  secs.forEach((sec) => $$(".reveal", sec).forEach((r, i) => { r.style.transitionDelay = i * 90 + "ms"; }));

  const dots = $("#dots");
  secs.forEach((sec) => {
    const b = el("button");
    b.setAttribute("aria-label", "Tới phần " + (sec.dataset.name || ""));
    b.addEventListener("click", () => sec.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }));
    dots.appendChild(b);
  });
  function setDot(sec) {
    const i = secs.indexOf(sec);
    $$("button", dots).forEach((b, k) => b.classList.toggle("on", k === i));
  }

  const entered = new Set();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting || !opened) continue;
      const sec = e.target;
      sec.classList.add("in");
      setDot(sec);
      if (!entered.has(sec.id)) {
        entered.add(sec.id);
        onFirstEnter(sec.id);
      }
    }
  }, { threshold: 0.55 });
  secs.forEach((s) => io.observe(s));

  function onFirstEnter(id) {
    if (id === "chat") runChat();
    if (id === "gallery") $("#rail").classList.add("nudge");
    if (id === "end") setTimeout(() => confetti(CW / 2, CH * 0.35, 90, { spread: Math.PI * 1.2 }), 500);
  }

  /* --- Mở đầu --- */
  $("#heroImg").src = anhCaNhan;
  $("#heroTo").textContent = goi;

  /* --- Tin nhắn --- */
  $("#chatAva").src = anhCaNhan;
  $("#chatName").textContent = goi;
  async function runChat() {
    const box = $("#msgs");
    const lines = (D.tinNhan || []).map(fill);
    await sleep(500);
    let lastMsg = null;
    for (const line of lines) {
      const t = el("div", "msg typing");
      t.append(el("i"), el("i"), el("i"));
      box.appendChild(t);
      await sleep(650 + Math.min(900, Array.from(line).length * 22));
      t.className = "msg";
      t.textContent = line;
      lastMsg = t;
      await sleep(420);
    }
    const st = el("div", "msg sticker");
    st.appendChild(useIcon("i-bow"));
    box.appendChild(st);
    await sleep(700);
    if (lastMsg) lastMsg.appendChild(el("span", "react", "💗"));
    const seen = el("p", "seen");
    const av = el("img");
    av.src = anhCaNhan;
    av.alt = "";
    seen.append(av, document.createTextNode("đã xem"));
    box.appendChild(seen);
  }

  /* --- Thẻ ảnh --- */
  const the = D.theAnh || {};
  $("#cardTitle").textContent = fill(the.tieuDe || "main character của hôm nay ✨");
  $("#cardImg").src = anhCaNhan;
  $("#pcLabel").textContent = (the.nhan || "certified cutie") + " ✓";
  $("#pcMsg").textContent = fill(the.loiNhan || "");
  (the.chiSo || []).forEach(([name, val]) => {
    const s = el("span", "stat");
    const top = el("span", "stat-top");
    top.append(el("span", "", fill(name)), el("b", "", fill(val)));
    const bar = el("span", "stat-bar");
    const fillBar = el("i");
    const v = parseFloat(val);
    fillBar.style.setProperty("--v", (isNaN(v) ? 100 : Math.min(100, v)) + "%");
    bar.appendChild(fillBar);
    s.append(top, bar);
    $("#stats").appendChild(s);
  });
  $("#pcard").addEventListener("click", (e) => {
    const c = e.currentTarget;
    c.classList.toggle("flipped");
    if (c.classList.contains("flipped")) {
      const r = c.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height * 0.3, 26, { min: 150, max: 420 });
    }
  });

  /* --- Điều ước --- */
  const wishes = (D.loiChuc || []).map(fill);
  const wishList = $("#wishes");
  let wishDone = 0;
  $("#wishCount").textContent = `0/${wishes.length}`;
  wishes.forEach((w) => {
    const li = el("li");
    const b = el("button", "wish");
    const box = el("span", "box");
    box.appendChild(useIcon("i-check"));
    b.append(box, el("span", "", w));
    b.addEventListener("click", () => {
      if (b.classList.contains("done")) return;
      b.classList.add("done");
      wishDone++;
      $("#wishCount").textContent = `${wishDone}/${wishes.length}`;
      const r = box.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height / 2, 16, { min: 120, max: 340 });
      if (wishDone === wishes.length) {
        $("#wishDone").hidden = false;
        setTimeout(() => confetti(CW / 2, CH * 0.45, 120), 200);
      }
    });
    li.appendChild(b);
    wishList.appendChild(li);
  });

  /* --- Ảnh lớp --- */
  const tick1 = el("span", "", "lớp mình ✿ thương cậu nhiều ✿ happy 20.10 ✿ chúc mừng ngày phụ nữ việt nam ✿ ");
  const ticker = $("#ticker");
  for (let i = 0; i < 4; i++) ticker.appendChild(tick1.cloneNode(true));

  const rail = $("#rail"), railDots = $("#railDots");
  anhLop.forEach((p, k) => {
    const card = el("button", "pol");
    card.style.setProperty("--rot", (k % 2 ? 2.2 : -2.2) + "deg");
    card.setAttribute("aria-label", "Xem ảnh: " + fill(p.chuThich));
    const tape = el("span", "tape");
    const img = el("img");
    img.src = p.nho || p.lon;
    img.alt = "";
    img.loading = "lazy";
    card.append(tape, img, el("span", "cap", fill(p.chuThich)));
    card.addEventListener("click", () => openLB(k + 1));
    rail.appendChild(card);
    railDots.appendChild(el("i"));
  });
  function railIndex() {
    const cards = $$(".pol", rail);
    if (!cards.length) return 0;
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0, bd = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  }
  function updateRailDots() {
    const i = railIndex();
    $$("i", railDots).forEach((d, k) => d.classList.toggle("on", k === i));
  }
  rail.addEventListener("scroll", () => requestAnimationFrame(updateRailDots), { passive: true });
  updateRailDots();
  const railGo = (dir) => {
    const cards = $$(".pol", rail);
    const i = Math.max(0, Math.min(cards.length - 1, railIndex() + dir));
    const c = cards[i];
    rail.scrollTo({ left: c.offsetLeft + c.offsetWidth / 2 - rail.clientWidth / 2, behavior: "smooth" });
  };
  $("#railPrev").addEventListener("click", () => railGo(-1));
  $("#railNext").addEventListener("click", () => railGo(1));

  /* --- Lá thư --- */
  const sheet = $("#sheet"), env = $("#envelope");
  $("#envTo").textContent = goi;
  $("#sheetTitle").textContent = `gửi ${goi} 💌`;
  (D.loiThu || []).forEach((t) => $("#sheetBody").appendChild(el("p", "", fill(t))));
  $("#sheetSign").textContent = tuAi ? `— ${tuAi} 💗` : "💗";
  env.addEventListener("click", () => {
    if (env.classList.contains("open")) { openLayer(sheet); return; }
    env.classList.add("open");
    const r = env.getBoundingClientRect();
    setTimeout(() => confetti(r.left + r.width / 2, r.top + r.height * 0.2, 40, { hearts: true, min: 160, max: 460 }), 450);
    setTimeout(() => openLayer(sheet), 1250);
  });

  /* --- Kết --- */
  $("#endMsg").textContent = fill(D.loiKet || "");
  $("#endFrom").textContent = tuAi || "tụi tớ";
  let hearts = 0;
  try { hearts = parseInt(localStorage.getItem("tim-20-10") || "0", 10) || 0; } catch (e) { /* bỏ qua */ }
  $("#heartCount").textContent = hearts;
  $("#bigHeart").addEventListener("click", (e) => {
    const b = e.currentTarget;
    hearts++;
    $("#heartCount").textContent = hearts;
    try { localStorage.setItem("tim-20-10", String(hearts)); } catch (err) { /* bỏ qua */ }
    b.classList.remove("tap");
    void b.offsetWidth;
    b.classList.add("tap");
    const r = b.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top + r.height / 2, 22, { hearts: true, min: 200, max: 520 });
  });
  $("#btnTop").addEventListener("click", () => $("#hero").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }));
  $("#btnAlbum").addEventListener("click", () => openLB(0));

  /* =====================================================================
     CỬA SỔ NỔI: lá thư & album
     ===================================================================== */
  function openLayer(layer) {
    layer.hidden = false;
    document.documentElement.classList.add("locked");
    requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.add("open")));
  }
  function closeLayer(layer) {
    layer.classList.remove("open");
    setTimeout(() => {
      if (layer.classList.contains("open")) return;
      layer.hidden = true;
      if (sheet.hidden && lb.hidden) document.documentElement.classList.remove("locked");
    }, 450);
  }
  $$("[data-close]").forEach((b) => b.addEventListener("click", () => closeLayer(b.closest(".sheet, .lightbox"))));
  sheet.addEventListener("click", (e) => { if (e.target === sheet) closeLayer(sheet); });

  const lb = $("#lightbox"), lbImg = $("#lbImg");
  let lbI = 0;
  function lbShow(i) {
    lbI = (i + album.length) % album.length;
    const a = album[lbI];
    lbImg.src = a.lon;
    lbImg.alt = fill(a.chuThich);
    $("#lbCap").textContent = fill(a.chuThich);
    $("#lbCount").textContent = `${lbI + 1} / ${album.length}`;
  }
  function openLB(i) { lbShow(i); openLayer(lb); }
  $("#lbPrev").addEventListener("click", () => lbShow(lbI - 1));
  $("#lbNext").addEventListener("click", () => lbShow(lbI + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLayer(lb); });
  let sx = null;
  lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (sx == null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) lbShow(lbI + (dx < 0 ? 1 : -1));
    sx = null;
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "ArrowRight") lbShow(lbI + 1);
      else if (e.key === "ArrowLeft") lbShow(lbI - 1);
      else if (e.key === "Escape") closeLayer(lb);
    } else if (!sheet.hidden && e.key === "Escape") closeLayer(sheet);
  });

  /* =====================================================================
     CHẠM 2 LẦN → TIM BAY (như TikTok)
     ===================================================================== */
  let lastTap = 0, lx = 0, ly = 0;
  document.addEventListener("pointerup", (e) => {
    if (!opened || (e.pointerType === "mouse" && e.button !== 0)) return;
    if (e.target.closest("button, a, .rail, .sheet, .lightbox, .player, .dots")) { lastTap = 0; return; }
    const now = performance.now();
    if (now - lastTap < 330 && Math.hypot(e.clientX - lx, e.clientY - ly) < 40) {
      popHeart(e.clientX, e.clientY);
      lastTap = 0;
    } else {
      lastTap = now;
      lx = e.clientX;
      ly = e.clientY;
    }
  });

  /* =====================================================================
     KHỞI ĐỘNG
     ===================================================================== */
  if (ten) document.title = `happy 20.10 · ${ten} 🎀`;
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  [anhCaNhan, ...anhLop.map((p) => p.nho || p.lon)].forEach((src) => { const i = new Image(); i.src = src; });
  runLoader();
})();
