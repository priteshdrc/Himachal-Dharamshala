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
    openMap: { en: "Hotel on Maps", gu: "નકશામાં હોટેલ" },
    directions: { en: "Directions", gu: "રસ્તો બતાવો" },
    pnr: { en: "PNR", gu: "PNR" },
    cls: { en: "Class", gu: "ક્લાસ" },
    coach: { en: "Coach", gu: "કોચ" },
    berths: { en: "Berths", gu: "બર્થ" },
    depart: { en: "Departs", gu: "રવાના" },
    arrive: { en: "Arrives", gu: "આગમન" },
    tip: { en: "Tip", gu: "નોંધ" },
    food: { en: "Where to eat · vegetarian", gu: "ક્યાં જમવું · શાકાહારી" },
    pureVeg: { en: "Pure veg", gu: "શુદ્ધ શાકાહારી" },
    vegEgg: { en: "Veg · serves egg", gu: "શાકાહારી · ઈંડું પણ મળે" },
    vegAsk: { en: "Veg food · ask", gu: "શાકાહારી મળે · પૂછો" },
    order: { en: "Try", gu: "શું મંગાવવું" },
    backup: { en: "Backup", gu: "બીજો વિકલ્પ" },
    onMaps: { en: "Open in Maps", gu: "નકશામાં ખોલો" },
    wxNow: { en: "Now", gu: "અત્યારે" },
    wxForecast: { en: "forecast", gu: "આગાહી" },
    wxTypical: { en: "usual", gu: "સામાન્ય" },
    wxTypicalNote: {
      en: "“Usual” = average for these dates over the last 5 years. The real forecast appears 16 days before.",
      gu: "“સામાન્ય” = છેલ્લાં 5 વર્ષમાં આ તારીખોનું સરેરાશ તાપમાન. સાચી આગાહી 16 દિવસ પહેલાં દેખાશે.",
    },
    wxLoading: { en: "Loading weather…", gu: "હવામાન લોડ થાય છે…" },
    wxError: { en: "Weather not available right now", gu: "હવામાન હાલ ઉપલબ્ધ નથી" },
    wxCodes: {
      en: { clear: "Clear", partly: "Partly cloudy", cloudy: "Cloudy", fog: "Fog", drizzle: "Drizzle", rain: "Rain", snow: "Snow", storm: "Thunderstorm" },
      gu: { clear: "સ્વચ્છ", partly: "આંશિક વાદળ", cloudy: "વાદળછાયું", fog: "ધુમ્મસ", drizzle: "ઝરમર", rain: "વરસાદ", snow: "બરફવર્ષા", storm: "વાવાઝોડું" },
    },
    places: { en: (n) => `${n} picks`, gu: (n) => `${n} વિકલ્પ` },
    journey: { en: "Journey map", gu: "યાત્રાનો નકશો" },
    planAlt: { en: "See the alternative plan (Jispa) →", gu: "વૈકલ્પિક પ્લાન (જિસ્પા) જુઓ →" },
    planMain: { en: "← Back to the main plan", gu: "← મુખ્ય પ્લાન પર પાછા" },
    pdf: { en: "Download PDF", gu: "PDF ડાઉનલોડ કરો" },
    planBadge: { en: "Alternative plan", gu: "વૈકલ્પિક પ્લાન" },
    altBookings: { en: "Bookings to change", gu: "બદલવાનાં બુકિંગ" },
    seeDay: { en: (n) => `See Day ${n} →`, gu: (n) => `દિવસ ${n} જુઓ →` },
    nightHere: { en: "Night stay", gu: "રાત્રિ રોકાણ" },
    mapStart: { en: "Start", gu: "શરૂઆત" },
    mapEnd: { en: "End", gu: "અંત" },
    mapRoad: { en: (km) => `Road route · about ${km} km from Jalandhar to Chandigarh`, gu: (km) => `રોડ રૂટ · જલંધરથી ચંડીગઢ લગભગ ${km} કિમી` },
    mapRoadLoading: { en: "Loading road route…", gu: "રોડ રૂટ લોડ થાય છે…" },
    mapRoadFail: { en: "Road route not available right now — dashed line joins the stops in order.", gu: "રોડ રૂટ હાલ ઉપલબ્ધ નથી — તૂટક લાઇન સ્થળોને ક્રમમાં જોડે છે." },
    mapError: { en: "The map could not load. The stops are listed below.", gu: "નકશો લોડ થઈ શક્યો નહીં. સ્થળોની યાદી નીચે છે." },
    videos: { en: "Videos", gu: "વીડિયો" },
    videoCount: { en: (n) => (n === 1 ? "1 video" : `${n} videos`), gu: (n) => `${n} વીડિયો` },
    video: { en: (n) => `Video ${n}`, gu: (n) => `વીડિયો ${n}` },
    short: { en: "Short", gu: "શોર્ટ" },
    playVideo: { en: "Play", gu: "ચલાવો" },
    close: { en: "Close", gu: "બંધ કરો" },
    prev: { en: "Previous video", gu: "પાછલો વીડિયો" },
    next: { en: "Next video", gu: "આગળનો વીડિયો" },
    openYouTube: { en: "Open on YouTube", gu: "YouTube પર ખોલો" },
    meal: {
      en: { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack", train: "On the train" },
      gu: { breakfast: "નાસ્તો", lunch: "બપોરનું ભોજન", dinner: "રાત્રિ ભોજન", snack: "નાસ્તો / મીઠાઈ", train: "ટ્રેનમાં ભોજન" },
    },
    toGo: { en: (n) => (n === 1 ? "1 day to go" : `${n} days to go`), gu: (n) => `${n} દિવસ બાકી` },
    today: { en: (n) => `Today is Day ${n} · see plan`, gu: (n) => `આજે દિવસ ${n} · કાર્યક્રમ જુઓ` },
    done: { en: "Trip completed · Happy Diwali!", gu: "યાત્રા પૂર્ણ · શુભ દિવાળી!" },
    footer: {
      en: "Made from our family trip plan. Photos from Wikimedia Commons. Weather data by Open-Meteo.com. Booking numbers are partly hidden; check your email or SMS for the full numbers.",
      gu: "અમારા પારિવારિક પ્રવાસ આયોજન પરથી બનાવેલ. ફોટો: Wikimedia Commons. હવામાન: Open-Meteo.com. બુકિંગ નંબર આંશિક રીતે છુપાવેલ છે; સંપૂર્ણ નંબર માટે ઇમેઇલ અથવા SMS જુઓ.",
    },
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

  let lang = "gu";
  // Food sections start collapsed; remember which ones were opened so a
  // language switch (which re-renders the page) keeps them open.
  const openFood = new Set();
  const openVideos = new Set();
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

  // "2019-11" -> "Nov 2019" / "નવે 2019": when the photo was taken.
  function fmtMonth(ym) {
    return new Intl.DateTimeFormat(locale(), { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(ym + "-15T00:00:00Z"));
  }

  function photoUrl(file) {
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=640";
  }

  function renderHero() {
    $("#title").textContent = t(trip.title);
    const badge = $("#plan-badge");
    if (badge) {
      badge.hidden = !trip.alt;
      badge.textContent = ui("planBadge");
    }
    const link = $("#plan-link");
    if (link) {
      link.href = trip.alt ? "./" : "alt.html";
      link.textContent = ui(trip.alt ? "planMain" : "planAlt");
    }
    const pdf = $("#pdf-link");
    if (pdf) {
      // Pre-built PDFs in pdf/: one per plan and language (see tools/make-pdf.js).
      const plan = trip.alt ? "alt" : "main";
      pdf.href = `pdf/${plan}-${lang}.pdf?v=${window.__assetVersion || ""}`;
      pdf.setAttribute(
        "download",
        `Diwali-Trip-${trip.alt ? "Alternative-Plan" : "Plan"}-${lang === "gu" ? "Gujarati" : "English"}.pdf`
      );
      pdf.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg><span>${esc(ui("pdf"))}</span>`;
    }
    const note = $("#alt-note");
    if (note && trip.altNote) {
      const n = trip.altNote;
      note.innerHTML = `
        <h2>${esc(t(n.title))}</h2>
        <ul>${n.changes.map((c) => `<li>${esc(t(c))}</li>`).join("")}</ul>
        <h3>${esc(ui("altBookings"))}</h3>
        <ul>${n.bookings.map((c) => `<li>${esc(t(c))}</li>`).join("")}</ul>`;
    }
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

  // pure: true = pure veg, "egg" = no meat but serves egg, false = not confirmed.
  const vegKey = (pure) => (pure === true ? "pureVeg" : pure === "egg" ? "vegEgg" : "vegAsk");
  const vegMark = (pure) =>
    `<span class="veg${pure === true ? "" : " partial"}"><i aria-hidden="true"></i>${esc(ui(vegKey(pure)))}</span>`;

  function foodCard(f) {
    const mapLink = (q, label) =>
      `<a class="food-map" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}" target="_blank" rel="noopener">${ICON.pin}<span>${esc(label)}</span></a>`;
    return `
      <li class="food">
        <div class="food-top"><span class="food-meal">${esc(ui("meal")[f.meal])}${f.time ? " · " + esc(t(f.time)) : ""}</span>${vegMark(f.pure)}</div>
        <b class="food-name">${esc(t(f.name))}</b>
        ${f.area ? `<p class="food-area">${esc(t(f.area))}</p>` : ""}
        ${f.order ? `<p class="food-order"><b>${esc(ui("order"))}:</b> ${esc(t(f.order))}</p>` : ""}
        ${f.note ? `<p class="food-note">${esc(t(f.note))}</p>` : ""}
        ${f.query ? mapLink(f.query, ui("onMaps")) : ""}
        ${
          f.alt
            ? `<p class="food-alt"><b>${esc(ui("backup"))}:</b> ${esc(t(f.alt.name))}${f.alt.area ? " — " + esc(t(f.alt.area)) : ""}${
                f.alt.pure === true ? "" : " (" + esc(ui(vegKey(f.alt.pure))) + ")"
              }${f.alt.query ? " " + mapLink(f.alt.query, "") : ""}</p>`
            : ""
        }
      </li>`;
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
        <div class="btns">
          <a class="btn" href="${esc(s.map)}" target="_blank" rel="noopener">${ICON.pin}<span>${esc(s.mapLabel ? t(s.mapLabel) : ui("openMap"))}</span></a>
          ${s.directions ? `<a class="btn btn-alt" href="${esc(s.directions)}" target="_blank" rel="noopener">${ICON.car}<span>${esc(ui("directions"))}</span></a>` : ""}
        </div>
      </div>`;
  }

  function placeCard(p) {
    const href = p.file ? "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(p.file) : p.link;
    const img = p.file
      ? `<img src="${esc(photoUrl(p.file))}" alt="${esc(t(p.name))}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`
      : "";
    return `
      <a class="place${p.file ? "" : " noimg"}" href="${esc(href)}" target="_blank" rel="noopener">
        <span class="ph">${ICON.peak}${img}${p.taken ? `<span class="when">${esc(fmtMonth(p.taken))}</span>` : ""}</span>
        <span class="cap">${esc(t(p.name))}</span>
      </a>`;
  }

  // ---------- Weather widget ----------
  let wxStatus = "loading";
  const WX_ICON = { clear: "☀️", partly: "🌤️", cloudy: "☁️", fog: "🌫️", drizzle: "🌦️", rain: "🌧️", snow: "❄️", storm: "⛈️" };
  function wxKind(code) {
    if (code == null) return null;
    if (code === 0) return "clear";
    if (code <= 2) return "partly";
    if (code === 3) return "cloudy";
    if (code === 45 || code === 48) return "fog";
    if (code >= 51 && code <= 57) return "drizzle";
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
    if (code >= 95) return "storm";
    return "cloudy";
  }
  const deg = (v) => Math.round(v) + "°";
  const wxIcon = (code) => {
    const k = wxKind(code);
    return k ? `<span class="wx-ic" role="img" aria-label="${esc(ui("wxCodes")[k])}" title="${esc(ui("wxCodes")[k])}">${WX_ICON[k]}</span>` : "";
  };

  function wxInner(d) {
    if (wxStatus === "loading") return `<p class="wx-msg">${esc(ui("wxLoading"))}</p>`;
    if (wxStatus === "error") return `<p class="wx-msg">${esc(ui("wxError"))}</p>`;
    const st = window.TripWeather.state;
    let usedTypical = false;
    const rows = d.wx.map((p) => {
      const s = st[p.key] || {};
      const fc = s.forecast && s.forecast[d.date];
      const ty = s.typical && s.typical[d.date];
      const visit = fc || ty;
      if (!fc && ty) usedTypical = true;
      return `
        <div class="wx-row">
          <span class="wx-place">${esc(t(p.name))}</span>
          <span class="wx-now"><small>${esc(ui("wxNow"))}</small>${
            s.now ? `${wxIcon(s.now.code)}<b>${deg(s.now.temp)}</b>` : "<b>–</b>"
          }</span>
          <span class="wx-visit"><small>${esc(fmtDate(d.date, { day: "numeric", month: "short" }))} · ${esc(ui(fc ? "wxForecast" : "wxTypical"))}</small>${
            visit ? `${fc ? wxIcon(fc.code) : ""}<b>${deg(visit.min)} / ${deg(visit.max)}</b>` : "<b>–</b>"
          }</span>
        </div>`;
    });
    return rows.join("") + (usedTypical ? `<p class="wx-note">${esc(ui("wxTypicalNote"))}</p>` : "");
  }

  function wxBox(d) {
    return d.wx && d.wx.length ? `<div class="wx" data-day="${d.n}" aria-live="polite">${wxInner(d)}</div>` : "";
  }

  function refreshWeather() {
    document.querySelectorAll(".wx").forEach((el) => {
      const d = trip.days.find((x) => x.n === Number(el.dataset.day));
      if (d) el.innerHTML = wxInner(d);
    });
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

          ${wxBox(d)}

          <p class="wake">${ICON.sun}<span><b>${esc(ui("wake"))}:</b> ${esc(t(d.wake))}</span></p>

          <ol class="timeline" aria-label="${esc(ui("plan"))}">${items}</ol>

          ${d.train != null ? trainCard(trip.trains[d.train]) : ""}
          ${
            d.food && d.food.length
              ? `<details class="food-box" data-day="${d.n}"${openFood.has(d.n) ? " open" : ""}>
                  <summary><span>${esc(ui("food"))}</span><small>${esc(ui("places", d.food.length))}</small></summary>
                  <ul class="foods">${d.food.map(foodCard).join("")}</ul>
                </details>`
              : ""
          }

          ${
            d.videos && d.videos.length
              ? `<details class="vid-box" data-day="${d.n}"${openVideos.has(d.n) ? " open" : ""}>
                  <summary><svg class="yt" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" rx="4" fill="#e62117" stroke="none"/><path d="M8 4l5 3-5 3z" fill="#fff" stroke="none"/></svg><span>${esc(ui("videos"))}</span><small>${esc(ui("videoCount", d.videos.length))}</small></summary>
                  <div class="vids">${d.videos
                    .map(
                      (v, i) => `
                    <button type="button" class="vid${v.short ? " is-short" : ""}" data-day="${d.n}" data-i="${i}" aria-label="${esc(ui("playVideo") + ": " + ui("video", i + 1))}">
                      <img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy" decoding="async" onerror="this.remove()">
                      <span class="vid-play" aria-hidden="true"></span>
                      ${v.short ? `<span class="vid-tag">${esc(ui("short"))}</span>` : ""}
                      <span class="vid-cap">${esc(ui("video", i + 1))}</span>
                    </button>`
                    )
                    .join("")}</div>
                </details>`
              : ""
          }

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

  // ---------- Journey map ----------
  let map;
  const mapMarkers = [];
  const stopDate = (s) => {
    const f = (iso) => fmtDate(iso, { day: "numeric", month: "short" });
    return s.end ? `${fmtDate(s.date, { day: "numeric" })}–${f(s.end)}` : f(s.date);
  };
  function stopPopup(s, i, last) {
    const tag = i === 0 ? ui("mapStart") : i === last ? ui("mapEnd") : "";
    return `
      <div class="pop">
        <small>${i + 1}${tag ? " · " + esc(tag) : ""} · ${esc(stopDate(s))}</small>
        <b>${esc(t(s.name))}</b>
        <span>${esc(t(s.what))}</span>
        ${s.night ? `<span class="pop-night">🌙 ${esc(ui("nightHere"))}</span>` : ""}
        <a href="#day-${s.day}">${esc(ui("seeDay", s.day))}</a>
      </div>`;
  }

  function renderJourney() {
    const r = trip.stops || [];
    const last = r.length - 1;
    $("#stops").innerHTML = r
      .map(
        (s, i) => `
        <li><button type="button" class="stop${s.night ? " is-night" : ""}" data-stop="${i}">
          <span class="stop-n">${i + 1}</span>
          <span class="stop-date">${esc(stopDate(s))}</span>
          <span class="stop-name"><b>${esc(t(s.name))}</b><small>${esc(t(s.what))}</small></span>
          ${s.night ? '<span class="stop-moon" aria-hidden="true">🌙</span>' : ""}
        </button></li>`
      )
      .join("");
    mapMarkers.forEach((m, i) => m.setPopupContent(stopPopup(r[i], i, last)));
    updateMapNote();
    if (!map && !window.L) $("#map").innerHTML = `<p class="map-msg">${esc(ui("mapError"))}</p>`;
  }

  // Road geometry from the public OSRM router (no key needed), with a second
  // OSRM server as backup. Coordinates go in as lon,lat.
  let mapRoad = null; // null = loading, { km } = ok, { failed: true }
  function loadRoadRoute(stops) {
    const coords = stops.filter((s) => s.via !== false).map((s) => `${s.lon},${s.lat}`).join(";");
    const servers = [
      "https://router.project-osrm.org/route/v1/driving/",
      "https://routing.openstreetmap.de/routed-car/route/v1/driving/",
    ];
    const tryServer = (i) => {
      if (i >= servers.length) return Promise.reject(new Error("no route"));
      const ctrl = "AbortController" in window ? new AbortController() : null;
      const timer = setTimeout(() => ctrl && ctrl.abort(), 10000);
      return fetch(servers[i] + coords + "?overview=full&geometries=geojson", ctrl ? { signal: ctrl.signal } : {})
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error("HTTP " + res.status))))
        .then((j) => {
          const route = j && j.code === "Ok" && j.routes && j.routes[0];
          if (!route) throw new Error("bad route");
          return { coords: route.geometry.coordinates.map(([lon, lat]) => [lat, lon]), meters: route.distance };
        })
        .catch(() => tryServer(i + 1))
        .finally(() => clearTimeout(timer));
    };
    return tryServer(0);
  }

  function updateMapNote() {
    const el = $("#map-note");
    if (!el) return;
    if (!map) return (el.textContent = "");
    el.textContent = !mapRoad ? ui("mapRoadLoading") : mapRoad.failed ? ui("mapRoadFail") : ui("mapRoad", mapRoad.km.toLocaleString(locale()));
  }

  function initMap() {
    const el = $("#map");
    const r = trip.stops || [];
    if (!window.L || !el || !r.length) return;
    el.innerHTML = "";
    map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25 });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    const pts = r.map((s) => [s.lat, s.lon]);
    // Straight dashed line first; replaced by the real road route once it loads.
    const straight = L.polyline(pts, { color: "#e0702b", weight: 3, opacity: 0.6, dashArray: "6 8" }).addTo(map);
    loadRoadRoute(r)
      .then((road) => {
        straight.remove();
        L.polyline(road.coords, { color: "#ffffff", weight: 7, opacity: 0.9, lineJoin: "round" }).addTo(map);
        L.polyline(road.coords, { color: "#e0702b", weight: 4, opacity: 0.95, lineJoin: "round" }).addTo(map);
        mapRoad = { km: Math.round(road.meters / 1000) };
      })
      .catch(() => (mapRoad = { failed: true }))
      .then(updateMapNote);
    const last = r.length - 1;
    r.forEach((s, i) => {
      const cls = ["pin", s.night ? "is-night" : "", i === 0 ? "is-start" : "", i === last ? "is-end" : ""].join(" ");
      const icon = L.divIcon({ className: "", html: `<span class="${cls}">${i + 1}</span>`, iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14] });
      mapMarkers.push(L.marker([s.lat, s.lon], { icon, title: t(s.name), zIndexOffset: i === 0 || i === last ? 1000 : 0 }).bindPopup(stopPopup(s, i, last)).addTo(map));
    });
    map.fitBounds(L.latLngBounds(pts), { padding: [24, 24] });
    updateMapNote();
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest(".stop[data-stop]");
    if (!b || !map) return;
    const i = Number(b.dataset.stop);
    const s = trip.stops[i];
    $("#map").scrollIntoView({ behavior: "smooth", block: "center" });
    map.flyTo([s.lat, s.lon], 11, { duration: 0.8 });
    map.once("moveend", () => mapMarkers[i].openPopup());
  });

  function render() {
    renderStatic();
    renderHero();
    renderNav();
    renderGlance();
    renderJourney();
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

  document.addEventListener(
    "toggle",
    (e) => {
      const box = e.target;
      if (!box.classList) return;
      const set = box.classList.contains("food-box") ? openFood : box.classList.contains("vid-box") ? openVideos : null;
      if (!set) return;
      const n = Number(box.dataset.day);
      box.open ? set.add(n) : set.delete(n);
    },
    true
  );

  // ---------- Video popup ----------
  let player, playing; // playing = { day, i }
  function ensurePlayer() {
    if (player) return player;
    player = document.createElement("dialog");
    player.className = "player";
    player.innerHTML = `
      <div class="player-bar">
        <b class="player-title"></b>
        <button type="button" class="player-x" data-act="close">✕</button>
      </div>
      <div class="player-frame"></div>
      <div class="player-nav">
        <button type="button" data-act="prev">‹</button>
        <a class="player-yt" target="_blank" rel="noopener"></a>
        <button type="button" data-act="next">›</button>
      </div>`;
    document.body.appendChild(player);
    player.addEventListener("click", (e) => {
      if (e.target === player) return player.close(); // tap on the dark backdrop
      const act = e.target.closest("[data-act]");
      if (!act) return;
      if (act.dataset.act === "close") player.close();
      else showVideo(playing.day, playing.i + (act.dataset.act === "next" ? 1 : -1));
    });
    // Stop playback when the popup closes (✕, backdrop, Esc or back gesture).
    player.addEventListener("close", () => {
      player.querySelector(".player-frame").innerHTML = "";
      playing = null;
    });
    return player;
  }

  function showVideo(dayN, i) {
    const d = trip.days.find((x) => x.n === dayN);
    const list = d.videos;
    i = (i + list.length) % list.length;
    const v = list[i];
    playing = { day: dayN, i };
    const p = ensurePlayer();
    p.classList.toggle("is-short", v.short);
    p.querySelector(".player-title").textContent = `${ui("day")} ${d.n} · ${ui("video", i + 1)} / ${list.length}`;
    p.querySelector(".player-x").setAttribute("aria-label", ui("close"));
    p.querySelector('[data-act="prev"]').setAttribute("aria-label", ui("prev"));
    p.querySelector('[data-act="next"]').setAttribute("aria-label", ui("next"));
    p.querySelectorAll('[data-act="prev"],[data-act="next"]').forEach((b) => (b.hidden = list.length < 2));
    const yt = p.querySelector(".player-yt");
    yt.href = v.url;
    yt.textContent = ui("openYouTube");
    p.querySelector(".player-frame").innerHTML =
      `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}?autoplay=1&playsinline=1&rel=0" ` +
      `title="${esc(ui("video", i + 1))}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    if (!p.open) p.showModal();
  }

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".vid[data-day]");
    if (card) showVideo(Number(card.dataset.day), Number(card.dataset.i));
  });

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
  initMap();

  if (window.TripWeather) {
    window.TripWeather.load()
      .then(() => (wxStatus = "ok"))
      .catch(() => (wxStatus = "error"))
      .then(refreshWeather);
  } else {
    wxStatus = "error";
    refreshWeather();
  }

  if (todayDay && !location.hash) {
    requestAnimationFrame(() => {
      const el = document.getElementById("day-" + todayDay.n);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "instant" });
    });
  }

  // No caching: remove the offline service worker and its saved copies
  // from phones that opened an earlier version of the site.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister())).catch(() => {});
  }
  if ("caches" in window) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {});
  }
})();
