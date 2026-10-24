// Builds the downloadable PDFs (pdf/main-gu.pdf, pdf/main-en.pdf, pdf/alt-gu.pdf,
// pdf/alt-en.pdf) from the site's own data files. Meals, videos, maps, weather
// and photos are left out. Re-run after changing the plan:
//
//   npm pack @fontsource/noto-sans-gujarati@5.1.0 @fontsource/inter@5.1.0 @fontsource/fraunces@5.1.0
//   (unpack each into <fontsDir>/fontsource-<name>-5.1.0/)
//   PW=<path to playwright> node tools/make-pdf.js <fontsDir>
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { chromium } = require(process.env.PW);

const repo = path.join(__dirname, "..");
const outDir = path.join(repo, "pdf");
const [fontsDir] = process.argv.slice(2);

function loadTrip(alt) {
  const ctx = { window: {}, URL, console };
  vm.createContext(ctx);
  // Main page = data files + the Jispa changes; alt page = the earlier plan.
  const files = ["data.js", "route.js", "food.js", "weather.js", "videos.js", alt ? "plan-original.js" : "plan-jispa.js"];
  for (const f of files) {
    vm.runInContext(fs.readFileSync(path.join(repo, f), "utf8"), ctx, { filename: f });
  }
  return ctx.window.TRIP;
}

const UI = {
  en: {
    badge: "Alternative plan · earlier version", generated: "Plan as of", nights: "Where we sleep", trains: "Trains",
    day: "Day", wake: "Wake up", stay: "Hotel stay", night: "Night stay", tip: "Tip",
    confirmed: "Confirmed", pending: "Booking pending", onTrain: "On the train", via: "Booked via",
    bookingId: "Booking ID", checkin: "Check-in", checkout: "Check-out", address: "Address",
    pnr: "PNR", cls: "Class", coach: "Coach", berths: "Berths", depart: "Departs", arrive: "Arrives",
    plan: "Plan for the day", footer: "Booking numbers are partly hidden; check your email or SMS for the full numbers.",
    date: "Date", place: "Place", status: "Status", train: "Train", from: "From", to: "To",
    pace: { relaxed: "Relaxed", moderate: "Moderate", busy: "Busy", tough: "Tough" },
  },
  gu: {
    badge: "વૈકલ્પિક પ્લાન · અગાઉનો", generated: "પ્લાન તારીખ", nights: "રાત્રિ રોકાણ", trains: "ટ્રેન",
    day: "દિવસ", wake: "ઉઠવાનો સમય", stay: "હોટેલ રોકાણ", night: "રાત્રિ રોકાણ", tip: "નોંધ",
    confirmed: "કન્ફર્મ", pending: "બુકિંગ બાકી", onTrain: "ટ્રેનમાં", via: "બુકિંગ",
    bookingId: "બુકિંગ ID", checkin: "ચેક-ઇન", checkout: "ચેક-આઉટ", address: "સરનામું",
    pnr: "PNR", cls: "ક્લાસ", coach: "કોચ", berths: "બર્થ", depart: "રવાના", arrive: "આગમન",
    plan: "દિવસનો કાર્યક્રમ", footer: "બુકિંગ નંબર આંશિક રીતે છુપાવેલ છે; સંપૂર્ણ નંબર માટે ઇમેઇલ અથવા SMS જુઓ.",
    date: "તારીખ", place: "સ્થળ", status: "સ્થિતિ", train: "ટ્રેન", from: "થી", to: "સુધી",
    pace: { relaxed: "આરામદાયક", moderate: "મધ્યમ", busy: "વ્યસ્ત", tough: "થકવનારો" },
  },
};

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function build(trip, lang) {
  const u = UI[lang];
  // The PDF has no food section, so drop pointers to it.
  const t = (o) => String(o && typeof o === "object" ? o[lang] ?? o.en : o ?? "")
    .replace(/ \(see “Where to eat”\)/, "")
    .replace(/ \(“ક્યાં જમવું” જુઓ\)/, "");
  const loc = lang === "gu" ? "gu-IN" : "en-IN";
  const fmt = (iso, opts) => new Intl.DateTimeFormat(loc, { timeZone: "Asia/Kolkata", ...opts }).format(new Date(iso + "T12:00:00+05:30"));
  const badge = (status) => `<span class="badge ${status}">${esc(status === "confirmed" ? u.confirmed : status === "pending" ? u.pending : u.onTrain)}</span>`;

  const trainBlock = (tr) => `
    <div class="card train">
      <div class="card-h"><b>${esc(tr.number)} · ${esc(tr.name)}</b>${badge("confirmed")}</div>
      <table class="kv">
        <tr><th>${u.depart}</th><td>${esc(t(tr.from))} — ${esc(t(tr.depart))}</td></tr>
        <tr><th>${u.arrive}</th><td>${esc(t(tr.to))} — ${esc(t(tr.arrive))}</td></tr>
        <tr><th>${u.cls} · ${u.coach} · ${u.berths}</th><td>${esc(tr.cls)} · ${esc(tr.coach)} · ${esc(tr.berths)}</td></tr>
        <tr><th>${u.pnr}</th><td class="mono">${esc(tr.pnr)}</td></tr>
      </table>
    </div>`;

  const stayBlock = (s) => {
    if (!s) return "";
    const rows = [];
    if (s.nights) rows.push(`<tr><th></th><td class="hl">${esc(t(s.nights))}</td></tr>`);
    if (s.address) rows.push(`<tr><th>${u.address}</th><td>${esc(t(s.address))}</td></tr>`);
    if (s.checkin) rows.push(`<tr><th>${u.checkin}</th><td>${esc(t(s.checkin))}</td></tr>`);
    if (s.checkout) rows.push(`<tr><th>${u.checkout}</th><td>${esc(t(s.checkout))}</td></tr>`);
    if (s.via) rows.push(`<tr><th>${u.via}</th><td>${esc(s.via)}${s.id ? ` · ${u.bookingId} <span class="mono">${esc(s.id)}</span>` : ""}</td></tr>`);
    return `
      <div class="card stay ${s.status}">
        <div class="card-h"><b>${esc(t(s.name))}</b>${badge(s.status)}</div>
        ${rows.length ? `<table class="kv">${rows.join("")}</table>` : ""}
      </div>`;
  };

  const days = trip.days.map((d) => `
    <section class="day">
      <div class="day-h">
        <div class="num"><small>${u.day}</small><b>${d.n}</b></div>
        <div>
          <p class="date">${esc(fmt(d.date, { weekday: "long", day: "numeric", month: "long" }))}</p>
          <h2>${esc(t(d.title))}</h2>
          <p class="where">${esc(t(d.where))}</p>
          ${d.pace ? `<p class="pace ${d.pace}"><i></i><b>${esc(u.pace[d.pace])}</b> · ${esc(t(d.paceWhy))}</p>` : ""}
        </div>
      </div>
      <p class="wake"><b>${u.wake}:</b> ${esc(t(d.wake))}</p>
      <table class="tl">
        ${d.items.map((it) => `
          <tr class="${it.drive ? "drive" : ""}">
            <td class="time">${esc(t(it.time))}</td>
            <td>${esc(t(it.text))}${it.tip ? `<div class="tip"><b>${u.tip}:</b> ${esc(t(it.tip))}</div>` : ""}</td>
          </tr>`).join("")}
      </table>
      ${d.train != null ? trainBlock(trip.trains[d.train]) : ""}
      ${stayBlock(d.stay)}
      <p class="night"><b>${u.night}:</b> ${esc(t(d.night))}</p>
    </section>`).join("");

  const nights = trip.days.map((d) => `
    <tr>
      <td>${esc(fmt(d.date, { weekday: "short", day: "numeric", month: "short" }))}</td>
      <td>${esc(t(d.night))}${d.stay && d.stay.status === "confirmed" ? `<br><small>${esc(t(d.stay.name))}</small>` : ""}</td>
      <td>${d.stay ? badge(d.stay.status) : badge("train")}</td>
    </tr>`).join("");

  const trains = trip.trains.map((tr) => `
    <tr>
      <td><b>${esc(tr.number)}</b><br><small>${esc(tr.name)}</small></td>
      <td>${esc(t(tr.from))}<br><small>${esc(t(tr.depart))}</small></td>
      <td>${esc(t(tr.to))}<br><small>${esc(t(tr.arrive))}</small></td>
      <td>${esc(tr.cls)} · ${esc(tr.coach)}<br><small>${esc(tr.berths)}</small></td>
    </tr>`).join("");

  const n = trip.planNote;
  const font = (file) => "file://" + path.join(fontsDir, file);
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(t(trip.title))}${trip.alt ? " — " + u.badge : ""}</title>
<style>
@font-face { font-family: "NSG"; font-weight: 400; src: url("${font("fontsource-noto-sans-gujarati-5.1.0/package/files/noto-sans-gujarati-gujarati-400-normal.woff2")}"); }
@font-face { font-family: "NSG"; font-weight: 600; src: url("${font("fontsource-noto-sans-gujarati-5.1.0/package/files/noto-sans-gujarati-gujarati-600-normal.woff2")}"); }
@font-face { font-family: "NSG"; font-weight: 700; src: url("${font("fontsource-noto-sans-gujarati-5.1.0/package/files/noto-sans-gujarati-gujarati-700-normal.woff2")}"); }
@font-face { font-family: "Inter"; font-weight: 400; src: url("${font("fontsource-inter-5.1.0/package/files/inter-latin-400-normal.woff2")}"); }
@font-face { font-family: "Inter"; font-weight: 600; src: url("${font("fontsource-inter-5.1.0/package/files/inter-latin-600-normal.woff2")}"); }
@font-face { font-family: "Inter"; font-weight: 700; src: url("${font("fontsource-inter-5.1.0/package/files/inter-latin-700-normal.woff2")}"); }
@font-face { font-family: "Fraunces"; font-weight: 700; src: url("${font("fontsource-fraunces-5.1.0/package/files/fraunces-latin-700-normal.woff2")}"); }
* { box-sizing: border-box; }
body { margin: 0; font: 10.5pt/1.45 "Inter", "NSG", sans-serif; color: #1b2233; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, .num b { font-family: ${lang === "gu" ? '"NSG"' : '"Fraunces", "NSG"'}, serif; }
.cover { background: linear-gradient(160deg, #2a3f6b, #5a5f8c 55%, #d98b5f); color: #fff; border-radius: 14px; padding: 22px 24px; }
.cover .badge-top { display: inline-block; background: #ffd27a; color: #4a2a05; font-weight: 700; font-size: 9.5pt; padding: 2px 10px; border-radius: 99px; }
.cover h1 { font-size: 22pt; line-height: 1.15; margin: 10px 0 4px; }
.cover .dates { font-weight: 600; font-size: 12pt; margin: 0 0 10px; }
.cover .route { margin: 0; font-size: 9.5pt; opacity: .95; }
.cover .gen { margin: 8px 0 0; font-size: 8.5pt; opacity: .8; }
.box { margin-top: 14px; padding: 12px 16px; border-radius: 12px; background: #fbefd5; border: 1px solid #ecd3a3; }
.box h3 { margin: 0 0 4px; font-size: 11.5pt; }
.box h4 { margin: 8px 0 3px; font-size: 10pt; color: #a5660b; }
.box ul { margin: 0; padding-left: 18px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 14px; }
.panel h3 { margin: 0 0 6px; font-size: 10pt; color: #7a8196; text-transform: uppercase; letter-spacing: .06em; }
table { border-collapse: collapse; width: 100%; }
.list td { border-top: 1px solid #e6e0d4; padding: 4px 6px 4px 0; vertical-align: top; font-size: 9.5pt; }
.list small, td small { color: #7a8196; }
.badge { display: inline-block; font-size: 8pt; font-weight: 700; padding: 1px 7px; border-radius: 99px; white-space: nowrap; }
.badge.confirmed { background: #dcefe6; color: #2f6b55; }
.badge.pending { background: #fbefd5; color: #a5660b; }
.badge.train { background: #e1ebf8; color: #3d6fb4; }
.day { break-inside: avoid; margin-top: 22px; padding-top: 2px; }
.day-h { display: flex; gap: 12px; align-items: flex-start; border-bottom: 2px solid #e0702b; padding-bottom: 8px; }
.num { flex: none; width: 50px; height: 54px; border-radius: 12px; background: #1d2b45; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1; }
.num small { font-size: 7.5pt; opacity: .8; margin-bottom: 3px; }
.num b { font-size: 20pt; }
.date { margin: 0; color: #e0702b; font-weight: 700; font-size: 9.5pt; }
.day h2 { margin: 1px 0 2px; font-size: 16pt; line-height: 1.2; }
.where { margin: 0; color: #4a5268; font-size: 9.5pt; }
.pace { margin: 3px 0 0; font-size: 9pt; color: #4a5268; }
.pace i { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; vertical-align: 0; }
.pace.relaxed i { background: #2f9e5b; } .pace.relaxed b { color: #2f9e5b; }
.pace.moderate i { background: #c9a227; } .pace.moderate b { color: #a8861a; }
.pace.busy i { background: #e0702b; } .pace.busy b { color: #e0702b; }
.pace.tough i { background: #d64545; } .pace.tough b { color: #d64545; }
.wake, .night { margin: 10px 0 0; padding: 6px 10px; border-radius: 8px; font-size: 9.5pt; }
.wake { background: #fdebdc; }
.night { background: #e1ebf8; }
.tl { margin-top: 8px; }
.tl td { padding: 5px 8px 5px 0; vertical-align: top; border-top: 1px solid #eee7da; }
.tl tr { break-inside: avoid; }
.tl .time { width: 30%; font-weight: 700; color: #4a5268; white-space: nowrap; font-size: 9.5pt; }
.tl tr.drive .time { color: #3d6fb4; }
.tip { margin-top: 3px; padding: 3px 8px; border-radius: 6px; background: #fbefd5; color: #8a5508; font-size: 9pt; }
.card { margin-top: 10px; border: 1px solid #e6e0d4; border-radius: 10px; padding: 8px 12px; background: #faf7f1; break-inside: avoid; }
.card-h { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 10.5pt; }
.kv { margin-top: 4px; }
.kv th { text-align: left; font-weight: 600; color: #7a8196; width: 26%; padding: 2px 8px 2px 0; vertical-align: top; font-size: 9pt; }
.kv td { padding: 2px 0; font-size: 9.5pt; }
.kv td.hl { color: #2f6b55; font-weight: 600; }
.stay.pending .kv td.hl { color: #a5660b; }
.mono { font-variant-numeric: tabular-nums; letter-spacing: .03em; }
.todo { break-inside: avoid; margin-top: 22px; padding: 12px 16px; border: 1px solid #e6e0d4; border-radius: 12px; }
.todo h2 { margin: 0 0 6px; font-size: 15pt; }
.todo h3 { margin: 10px 0 4px; font-size: 10pt; color: #7a8196; }
.todo ul { list-style: none; margin: 0; padding: 0; }
.todo li { display: flex; gap: 10px; padding: 5px 0; border-top: 1px solid #eee7da; font-size: 10pt; }
.todo li small { display: block; color: #7a8196; font-size: 9pt; }
.todo .chk { flex: none; width: 14px; height: 14px; margin-top: 2px; border: 1.5px solid #a5660b; border-radius: 3px; font-size: 9pt; line-height: 12px; text-align: center; color: #fff; }
.todo li.done .chk { background: #2f6b55; border-color: #2f6b55; }
.todo li.done b { color: #7a8196; font-weight: 600; }
.foot { margin-top: 14px; color: #7a8196; font-size: 8.5pt; }
</style></head><body>
  <div class="cover">
    ${trip.alt ? `<span class="badge-top">${u.badge}</span>` : ""}
    <h1>${esc(t(trip.title))}</h1>
    <p class="dates">${esc(t(trip.dates))}</p>
    <p class="route">${trip.route.map((r) => esc(t(r))).join(" → ")}</p>
    <p class="gen">${u.generated}: ${esc(fmt(new Date().toISOString().slice(0, 10), { day: "numeric", month: "long", year: "numeric" }))}</p>
  </div>
  ${n ? `<div class="box"><h3>${esc(t(n.title))}</h3><ul>${n.changes.map((c) => `<li>${esc(t(c))}</li>`).join("")}</ul>
    ${n.bookings ? `<h4>${lang === "gu" ? "બદલવાનાં બુકિંગ" : "Bookings to change"}</h4><ul>${n.bookings.map((c) => `<li>${esc(t(c))}</li>`).join("")}</ul>` : ""}</div>` : ""}
  <div class="grid2">
    <div class="panel"><h3>${u.nights}</h3><table class="list">${nights}</table></div>
    <div class="panel"><h3>${u.trains}</h3><table class="list">${trains}</table><p class="foot">${u.footer}</p></div>
  </div>
  ${days}
  ${trip.todo && trip.todo.length ? `
  <section class="todo">
    <h2>${lang === "gu" ? "બાકી કામ" : "Still to do"}</h2>
    <ul>${trip.todo.filter((x) => !x.done).map((x) => `<li><span class="chk"></span><div><b>${esc(t(x.what))}</b>${x.when ? `<small>${esc(t(x.when))}</small>` : ""}</div></li>`).join("")}</ul>
    <h3>${lang === "gu" ? "થઈ ગયું" : "Done"}</h3>
    <ul>${trip.todo.filter((x) => x.done).map((x) => `<li class="done"><span class="chk">✓</span><div><b>${esc(t(x.what))}</b>${x.when ? `<small>${esc(t(x.when))}</small>` : ""}</div></li>`).join("")}</ul>
  </section>` : ""}
</body></html>`;
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const tmp = fs.mkdtempSync(path.join(require("os").tmpdir(), "trip-pdf-"));
  for (const plan of ["main", "alt"]) {
    const trip = loadTrip(plan === "alt");
    for (const lang of ["gu", "en"]) {
      const htmlPath = path.join(tmp, `${plan}-${lang}.html`);
      fs.writeFileSync(htmlPath, build(trip, lang));
      await page.goto("file://" + htmlPath, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const out = path.join(outDir, `${plan}-${lang}.pdf`);
      await page.pdf({
        path: out,
        format: "A4",
        printBackground: true,
        margin: { top: "14mm", bottom: "16mm", left: "13mm", right: "13mm" },
        displayHeaderFooter: true,
        headerTemplate: "<span></span>",
        footerTemplate: `<div style="width:100%;font:8px sans-serif;color:#999;text-align:center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
      });
      console.log("wrote", path.relative(repo, out));
    }
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  await browser.close();
})();
