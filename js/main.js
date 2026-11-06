/* main.js — shared behaviour for every page:
   header + footer injection, roster grids, model profile page,
   lightbox, scroll reveal and the application form. */
(function () {
  const EMAIL = "tdtdmodels@gmail.com";
  const IG_URL = "https://www.instagram.com/tdtd_runwayz/";
  const IG_HANDLE = "@tdtd_runwayz";
  const NAV = [
    ["women.html", "Women", "women"],
    ["men.html", "Men", "men"],
    ["about.html", "About", "about"],
    ["submit.html", "Submit", "submit"]
  ];
  const page = document.body.dataset.page || "";
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const link = ([href, label, key]) => `<a href="${href}"${key === page ? ' aria-current="page"' : ""}>${label}</a>`;

  /* ---------- header + footer (one source for every page) ---------- */
  function chrome() {
    const h = $("#site-header");
    if (h) {
      h.outerHTML = `
      <header class="site-header" id="siteHeader">
        <nav class="nav nav-left" aria-label="Primary">${NAV.slice(0, 2).map(link).join("")}</nav>
        <a class="brand" href="index.html" aria-label="TDTD Models home"><img src="images/tdtd-logo-white.png" alt="TDTD Models"></a>
        <nav class="nav nav-right" aria-label="Secondary">${NAV.slice(2).map(link).join("")}</nav>
        <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
      </header>
      <div class="menu" id="menu">
        <div>${NAV.map(([href, label, key]) => `<a class="menu-link" href="${href}"${key === page ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</div>
        <div class="menu-foot"><a href="mailto:${EMAIL}">${EMAIL}</a><a href="${IG_URL}" target="_blank" rel="noopener">Instagram ${IG_HANDLE}</a></div>
      </div>`;
    }
    const f = $("#site-footer");
    if (f) {
      f.outerHTML = `
      <footer class="site-footer">
        <div class="foot-grid">
          <div><img src="images/tdtd-logo-white.png" alt="TDTD Models"><p>A New York based agency developing models into attractable talent for clients across the country.</p></div>
          <div><h3>Explore</h3><ul>${NAV.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul></div>
          <div><h3>Contact</h3><ul><li><a href="mailto:${EMAIL}">${EMAIL}</a></li><li><a href="${IG_URL}" target="_blank" rel="noopener">Instagram ${IG_HANDLE}</a></li><li>New York, NY</li></ul></div>
        </div>
        <div class="foot-base"><span>© 2026 TDTD Models</span><span>All rights reserved</span></div>
      </footer>`;
    }
    // header colour state: transparent over the home hero, solid everywhere else
    const header = $("#siteHeader");
    const home = document.body.classList.contains("home");
    const setState = () => {
      const solid = !home || window.scrollY > window.innerHeight * 0.75;
      header.classList.toggle("is-solid", solid);
      header.classList.toggle("is-over", !solid);
    };
    setState(); window.addEventListener("scroll", setState, { passive: true });

    // mobile menu
    const burger = $(".burger");
    const setMenu = open => {
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open);
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    $("#menu").addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
    matchMedia("(min-width: 901px)").addEventListener("change", e => { if (e.matches) setMenu(false); });
  }

  /* ---------- roster grids: <div data-roster="women|men|featured"> ---------- */
  function card(m) {
    const [a, b] = m.images;
    return `<a class="card reveal" href="model.html?id=${encodeURIComponent(m.id)}">
      <div class="frame"><img src="${esc(a)}" alt="${esc(m.name)}" loading="lazy">${b ? `<img src="${esc(b)}" alt="" loading="lazy">` : ""}</div>
      <div class="name"><span>${esc(m.name)}</span><small>${m.division === "men" ? "Men" : "Women"}</small></div>
    </a>`;
  }
  function rosters() {
    document.querySelectorAll("[data-roster]").forEach(el => {
      const key = el.dataset.roster;
      const list = (window.ROSTER || []).filter(m => key === "featured" ? m.featured : m.division === key);
      el.innerHTML = list.map(card).join("") || '<p class="note-bar">No talent listed yet.</p>';
    });
  }

  /* ---------- lightbox ---------- */
  function lightbox(imgs, start) {
    let cur = start;
    const lb = document.createElement("div");
    lb.className = "lb open"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML = `<button class="lb-close" aria-label="Close">&times;</button><button class="lb-prev" aria-label="Previous">&#10094;</button><img alt=""><button class="lb-next" aria-label="Next">&#10095;</button>`;
    document.body.appendChild(lb); document.body.style.overflow = "hidden";
    const img = $("img", lb);
    const show = i => { cur = (i + imgs.length) % imgs.length; img.src = imgs[cur]; };
    const close = () => { lb.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", keys); };
    const keys = e => { if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); };
    $(".lb-close", lb).onclick = close;
    $(".lb-prev", lb).onclick = e => { e.stopPropagation(); show(cur - 1); };
    $(".lb-next", lb).onclick = e => { e.stopPropagation(); show(cur + 1); };
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", keys);
    show(cur); $(".lb-close", lb).focus();
  }

  /* ---------- model profile (model.html?id=…) ---------- */
  function modelPage() {
    const root = $("#model-root"); if (!root) return;
    const id = new URLSearchParams(location.search).get("id");
    const m = (window.ROSTER || []).find(x => x.id === id);
    if (!m) {
      root.innerHTML = `<div class="empty"><p class="eyebrow">Not found</p><h1 class="display" style="font-size:clamp(40px,7vw,90px);margin:12px 0 28px">That profile<br>isn&rsquo;t here.</h1><a class="btn" href="women.html">View the roster</a></div>`;
      return;
    }
    document.title = `${m.name} | TDTD Models`;
    const subject = encodeURIComponent(`Booking inquiry: ${m.name}`);
    const stats = Object.entries(m.stats || {}).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
    root.innerHTML = `
      <section class="model">
        <aside class="model-info">
          <a class="back-link" href="${m.division}.html">&larr; ${m.division === "men" ? "Men" : "Women"}</a>
          <p class="eyebrow">${m.division === "men" ? "Men" : "Women"}</p>
          <h1 class="display">${esc(m.name)}</h1>
          <dl class="stats">${stats}</dl>
          <div class="model-actions">
            <a class="btn" href="mailto:${EMAIL}?subject=${subject}">Inquire</a>
            ${m.instagram ? `<a class="link-arrow" href="https://www.instagram.com/${esc(m.instagram)}/" target="_blank" rel="noopener">@${esc(m.instagram)}</a>` : ""}
          </div>
        </aside>
        <div class="gallery">${m.images.map((src, i) => `<button type="button" data-i="${i}" aria-label="Open photo ${i + 1}"><img src="${esc(src)}" alt="${esc(m.name)}, photo ${i + 1}" loading="${i < 2 ? "eager" : "lazy"}"></button>`).join("")}</div>
      </section>`;
    root.querySelectorAll(".gallery button").forEach(b => b.addEventListener("click", () => lightbox(m.images, Number(b.dataset.i))));
  }

  /* ---------- application form ---------- */
  function form() {
    const f = $("#applyForm"); if (!f) return;
    const msg = $("#formMsg");
    const say = (t, ok) => { msg.textContent = t; msg.classList.add("show"); msg.style.borderColor = ok ? "#1d6b3a" : ""; msg.style.color = ok ? "#1d6b3a" : ""; msg.scrollIntoView({ block: "center", behavior: "smooth" }); };
    f.addEventListener("submit", async e => {
      e.preventDefault();
      if (f.elements._gotcha && f.elements._gotcha.value) return;     // spam trap
      const data = new FormData(f);
      const action = f.getAttribute("action") || "";
      if (action.includes("YOUR_FORM_ID")) {                          // not connected yet: open an email instead
        const body = [...data.entries()].filter(([k]) => !k.startsWith("_")).map(([k, v]) => `${k}: ${v}`).join("\n");
        location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Model application")}&body=${encodeURIComponent(body)}`;
        return;
      }
      const btn = $("button[type=submit]", f); btn.disabled = true; btn.textContent = "Sending…";
      try {
        const r = await fetch(action, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error(r.status);
        f.reset(); say("Thank you. Your application has been received and our team will be in touch.", true);
      } catch (err) {
        say(`Something went wrong sending that. Please email ${EMAIL} directly.`, false);
      }
      btn.disabled = false; btn.textContent = "Send application";
    });
  }

  /* ---------- scroll reveal ---------- */
  function reveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  chrome(); rosters(); modelPage(); form(); reveal();
})();
