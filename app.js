(function () {
  "use strict";

  const trip = window.TRIP;

  const UI = {
    brand: { en: "Trip Guide", gu: "યાત્રા માર્ગદર્શિકા" },
    glance: { en: "At a glance", gu: "એક નજરે" },
    nights: { en: "Where we sleep", gu: "રાત્રિ રોકાણ" },
    trains: { en: "Trains", gu: "ટ્રેન" },
    day: { en: "Day", gu: "દિવસ" },
    wake: { en: "Wake up", gu: "ઉઠવાનો સમય" },
    plan: { en: "Plan for the day", gu: "દિવસનો કાર્યક્રમ" },
    stay: { en: "Hotel stay", gu: "હોટેલ રોકાણ" },
    night: { en: "Night stay", gu: "રાત્રિ રોકાણ" },
    photos: { en: "Places", gu: "મુલાકાતના સ્થળો" },
    confirmed: { en: "Confirmed", gu: "કન્ફર્મ" },
    pending: { en: "Booking pending", gu: "બુકિંગ બાકી" },
    onTrain: { en: "Train", gu: "ટ્રેન" },
    via: { en: "Booked via", gu: "બુકિંગ" },
    bookingId: { en: "Booking ID", gu: "બુકિંગ ID" },
    checkin: { en: "Check-in", gu: "ચેક-ઇન" },
    checkout: { en: "Check-out", gu: "ચેક-આઉટ" },
    openMap: { en: "Open in Maps", gu: "નકશામાં ખોલો" },
    pnr: { en: "PNR", gu: "PNR" },
    cls: { en: "Class", gu: "ક્લાસ" },
    coach: { en: "Coach", gu: "કોચ" },
    berths: { en: "Berths", gu: "બર્થ" },
    depart: { en: "Departs", gu: "રવાના" },
    arrive: { en: "Arrives", gu: "આગમન" },
    tip: { en: "Tip", gu: "નોંધ" },
    toGo: { en: (n) => (n === 1 ? "1 day to go" : `${n} days to go`), gu: (n) => `${n} દિવસ બાકી` },
    today: { en: (n) => `Today is Day ${n} · see plan`, gu: (n) => `આજે દિવસ ${n} · કાર્યક્રમ જુઓ` },
    done: { en: "Trip completed · Happy Diwali!", gu: "યાત્રા પૂર્ણ · શુભ દિવાળી!" },
    footer: {
      en: "Made from our family trip plan. Photos from Wikimedia Commons. Booking numbers are partly hidden; check your email or SMS for the full numbers.",
      gu: "અમારા પારિવારિક પ્રવાસ આયોજન પરથી બનાવેલ. ફોટો: Wikimedia Commons. બુકિંગ નંબર આંશિક રીતે છુપાવેલ છે; સંપૂર્ણ નંબર માટે ઇમેઇલ અથવા SMS જુઓ.",
    },
    offline: { en: "✓ Saved for offline use — works without network in the mountains.", gu: "✓ ઑફલાઇન માટે સાચવેલ — પહાડોમાં નેટવર્ક વગર પણ ચાલશે." },
  };

  const ICON = {
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17h14v-5l-2-5H7l-2 5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/><path d="M5 12h14"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="2"/></svg>',
    train: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2-4M15 21l2-4"/><circle cx="9" cy="14" r=".8"/><circle cx="15" cy="14" r=".8"/></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
    peak: '<svg viewBox="0 0 64 40" aria-hidden="true"><path d="M0 40 L20 12 L28 22 L38 6 L64 40Z"/><path d="M38 6 L44 14 L40 13 L37 17 L34 12Z" fill="#fff" opacity=".85"/></svg>',
  };

  let lang = "en";
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "gu") lang = saved;
  } catch (e) {}

  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const t = (o) => (o && typeof o === "object" ? o[lang] ?? o.en : o ?? "");
  const ui = (k, ...a) => {
    const v = UI[k][lang];
    return typeof v === "function" ? v(...a) : v;
  };
  const locale = () => (lang === "gu" ? "gu-IN" : "en-IN");
  const asDate = (iso) => new Date(iso + "T12:00:00+05:30");
  const fmtDate = (iso, opts) => new Intl.DateTimeFormat(locale(), { timeZone: "Asia/Kolkata", ...opts }).format(asDate(iso));

  function todayIST() {
    const q = new URLSearchParams(location.search).get("today");
    if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) return q;
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
  }
  const today = todayIST();
  const todayDay = trip.days.find((d) => d.date === today);

  function photoUrl(file) {
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=640";
  }

  function renderHero() {
    $("#title").textContent = t(trip.title);
    $("#dates").textContent = t(trip.dates);
    $("#route").innerHTML = trip.route.map((r) => `<li>${esc(t(r))}</li>`).join("");

    const st = $("#status");
    const dayMs = 864e5;
    if (todayDay) {
      st.textContent = ui("today", todayDay.n);
      st.href = "#day-" + todayDay.n;
      st.className = "status live";
    } else if (today < trip.start) {
      const n = Math.round((asDate(trip.start) - asDate(today)) / dayMs);
      st.textContent = ui("toGo", n);
      st.href = "#day-1";
      st.className = "status";
    } else {
      st.textContent = ui("done");
      st.href = "#day-1";
      st.className = "status";
    }
  }

  function renderNav() {
    $("#daynav").innerHTML =
      '<div class="daynav-track">' +
      trip.days
        .map(
          (d) =>
            `<a href="#day-${d.n}" class="chip${todayDay && todayDay.n === d.n ? " is-today" : ""}" data-day="${d.n}">` +
            `<b>${esc(ui("day"))} ${d.n}</b><span>${esc(fmtDate(d.date, { day: "numeric", month: "short" }))}</span></a>`
        )
        .join("") +
      "</div>";
  }

  function renderGlance() {
    $("#note").innerHTML = `<span class="note-icon" aria-hidden="true">!</span><p>${t(trip.note)}</p>`;

    $("#nights").innerHTML = trip.days
      .map((d) => {
        const s = d.stay;
        const status = s ? s.status : "ontrain";
        const label = s ? ui(s.status) : ui("onTrain");
        return (
          `<li><a href="#day-${d.n}">` +
          `<span class="n-date">${esc(fmtDate(d.date, { day: "numeric", month: "short" }))}</span>` +
          `<span class="n-place">${esc(t(d.night).replace(/\s*\(.*\)$/, ""))}</span>` +
          `<span class="badge ${status}">${esc(label)}</span></a></li>`
        );
      })
      .join("");

    $("#trains").innerHTML = trip.trains.map(trainCard).join("");
  }

  function trainCard(tr) {
    return `
      <div class="train">
        <div class="train-head">${ICON.train}<div><b>${esc(tr.number)} · ${esc(tr.name)}</b><span class="badge confirmed">${esc(ui("confirmed"))}</span></div></div>
        <div class="leg">
          <div><small>${esc(ui("depart"))}</small><b>${esc(t(tr.from))}</b><span>${esc(t(tr.depart))}</span></div>
          <div class="leg-line" aria-hidden="true"></div>
          <div><small>${esc(ui("arrive"))}</small><b>${esc(t(tr.to))}</b><span>${esc(t(tr.arrive))}</span></div>
        </div>
        <dl class="facts">
          <div><dt>${esc(ui("cls"))}</dt><dd>${esc(tr.cls)}</dd></div>
          <div><dt>${esc(ui("coach"))}</dt><dd>${esc(tr.coach)}</dd></div>
          <div><dt>${esc(ui("berths"))}</dt><dd>${esc(tr.berths)}</dd></div>
          <div><dt>${esc(ui("pnr"))}</dt><dd class="mono">${esc(tr.pnr)}</dd></div>
        </dl>
      </div>`;
  }

  function stayCard(d) {
    const s = d.stay;
    if (!s) return "";
    const rows = [];
    if (s.nights) rows.push(`<p class="stay-sub">${esc(t(s.nights))}</p>`);
    if (s.address) rows.push(`<p class="stay-addr">${esc(t(s.address))}</p>`);
    const facts = [];
    if (s.checkin) facts.push(`<div><dt>${esc(ui("checkin"))}</dt><dd>${esc(t(s.checkin))}</dd></div>`);
    if (s.checkout) facts.push(`<div><dt>${esc(ui("checkout"))}</dt><dd>${esc(t(s.checkout))}</dd></div>`);
    if (s.via) facts.push(`<div><dt>${esc(ui("via"))}</dt><dd>${esc(s.via)}</dd></div>`);
    if (s.id) facts.push(`<div><dt>${esc(ui("bookingId"))}</dt><dd class="mono">${esc(s.id)}</dd></div>`);
    return `
      <div class="stay ${s.status}">
        <div class="stay-head">${ICON.bed}<div><small>${esc(ui("stay"))}</small><b>${esc(t(s.name))}</b></div><span class="badge ${s.status}">${esc(ui(s.status))}</span></div>
        ${rows.join("")}
        ${facts.length ? `<dl class="facts">${facts.join("")}</dl>` : ""}
        <a class="btn" href="${esc(s.map)}" target="_blank" rel="noopener">${ICON.pin}<span>${esc(s.mapLabel ? t(s.mapLabel) : ui("openMap"))}</span></a>
      </div>`;
  }

  function placeCard(p) {
    const href = p.file ? "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(p.file) : p.link;
    const img = p.file
      ? `<img src="${esc(photoUrl(p.file))}" alt="${esc(t(p.name))}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`
      : "";
    return `
      <a class="place${p.file ? "" : " noimg"}" href="${esc(href)}" target="_blank" rel="noopener">
        <span class="ph">${ICON.peak}${img}</span>
        <span class="cap">${esc(t(p.name))}</span>
      </a>`;
  }

  function renderDays() {
    $("#days").innerHTML = trip.days
      .map((d) => {
        const isToday = todayDay && todayDay.n === d.n;
        const items = d.items
          .map(
            (it) => `
            <li class="${it.drive ? "drive" : ""}">
              <time>${esc(t(it.time))}</time>
              <div class="what">
                ${it.drive ? `<span class="tag">${ICON.car}</span>` : ""}
                <p>${esc(t(it.text))}</p>
                ${it.tip ? `<p class="tip"><b>${esc(ui("tip"))}:</b> ${esc(t(it.tip))}</p>` : ""}
              </div>
            </li>`
          )
          .join("");
        return `
        <section class="day${isToday ? " is-today" : ""}" id="day-${d.n}" aria-labelledby="day-${d.n}-h">
          <header class="day-head">
            <div class="day-num"><small>${esc(ui("day"))}</small><b>${d.n}</b></div>
            <div>
              <p class="day-date">${esc(fmtDate(d.date, { weekday: "long", day: "numeric", month: "long" }))}</p>
              <h2 id="day-${d.n}-h">${esc(t(d.title))}</h2>
              <p class="day-where">${ICON.pin}<span>${esc(t(d.where))}</span></p>
            </div>
          </header>

          <p class="wake">${ICON.sun}<span><b>${esc(ui("wake"))}:</b> ${esc(t(d.wake))}</span></p>

          <ol class="timeline" aria-label="${esc(ui("plan"))}">${items}</ol>

          ${d.train != null ? trainCard(trip.trains[d.train]) : ""}
          ${stayCard(d)}

          <p class="night">${ICON.moon}<span><b>${esc(ui("night"))}:</b> ${esc(t(d.night))}</span></p>

          ${
            d.places && d.places.length
              ? `<h3 class="places-h">${esc(ui("photos"))}</h3><div class="places">${d.places.map(placeCard).join("")}</div>`
              : ""
          }
        </section>`;
      })
      .join("");

    // Hide broken photos and show the drawn mountain placeholder instead.
    document.querySelectorAll(".place img").forEach((img) => {
      const fail = () => img.closest(".place").classList.add("noimg");
      if (img.complete && img.naturalWidth === 0) fail();
      else img.addEventListener("error", fail, { once: true });
      img.addEventListener("load", () => img.closest(".place").classList.add("loaded"), { once: true });
    });
  }

  function renderStatic() {
    document.documentElement.lang = lang === "gu" ? "gu" : "en";
    document.body.classList.toggle("gu", lang === "gu");
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = ui(el.dataset.i18n)));
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  }

  function render() {
    renderStatic();
    renderHero();
    renderNav();
    renderGlance();
    renderDays();
    watchActiveDay();
  }

  // Highlight the chip of the day currently on screen and keep it visible.
  let observer;
  function watchActiveDay() {
    if (observer) observer.disconnect();
    if (!("IntersectionObserver" in window)) return;
    const chips = new Map([...document.querySelectorAll(".chip")].map((c) => [c.dataset.day, c]));
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const n = e.target.id.replace("day-", "");
          chips.forEach((c, k) => c.classList.toggle("active", k === n));
          const c = chips.get(n);
          if (c) {
            // Scroll only the chip strip, never the page.
            const track = c.parentElement;
            track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll(".day").forEach((s) => observer.observe(s));
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lang]");
    if (!b || b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    try {
      localStorage.setItem("lang", lang);
    } catch (err) {}
    render();
  });

  render();

  if (todayDay && !location.hash) {
    requestAnimationFrame(() => {
      const el = document.getElementById("day-" + todayDay.n);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "instant" });
    });
  }

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => navigator.serviceWorker.ready)
      .then(() => {
        $("#offline").hidden = false;
      })
      .catch(() => {});
  }
})();
