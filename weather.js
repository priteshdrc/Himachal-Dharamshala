/* Weather for each day's places, from Open-Meteo (free, no API key).
   - "Now": current temperature at the place.
   - Visit day: the real forecast once the date is within 16 days;
     before that, the typical min/max for that date over the last 5 years. */

(function () {
  const T = (en, gu) => ({ en, gu });
  const P = {
    gandhinagar: { name: T("Gandhinagar", "ગાંધીનગર"), lat: 23.2156, lon: 72.6369 },
    amritsar: { name: T("Amritsar", "અમૃતસર"), lat: 31.62, lon: 74.8765 },
    dalhousie: { name: T("Dalhousie", "ડેલહાઉસી"), lat: 32.536, lon: 75.97 },
    mcleod: { name: T("McLeod Ganj", "મેકલિયોડ ગંજ"), lat: 32.2427, lon: 76.3234 },
    kangra: { name: T("Kangra", "કાંગડા"), lat: 32.0998, lon: 76.2691 },
    bir: { name: T("Bir", "બીર"), lat: 32.044, lon: 76.723 },
    kullu: { name: T("Kullu", "કુલ્લુ"), lat: 31.9578, lon: 77.1095 },
    sissu: { name: T("Sissu", "સિસ્સુ"), lat: 32.48, lon: 77.125 },
    keylong: { name: T("Keylong", "કેલોંગ"), lat: 32.5717, lon: 77.0328 },
    jispa: { name: T("Jispa", "જિસ્પા"), lat: 32.64, lon: 77.185 },
    mandi: { name: T("Mandi", "મંડી"), lat: 31.708, lon: 76.9318 },
    chandigarh: { name: T("Chandigarh", "ચંડીગઢ"), lat: 30.7333, lon: 76.7794 },
  };
  const byDay = {
    1: ["gandhinagar"],
    2: ["amritsar"],
    3: ["dalhousie"],
    4: ["mcleod"],
    5: ["mcleod"],
    6: ["kangra"],
    7: ["bir", "kullu"],
    8: ["sissu", "keylong"],
    9: ["keylong", "mandi"],
    10: ["chandigarh"],
  };

  window.TRIP.days.forEach((d) => {
    d.wx = (byDay[d.n] || []).map((k) => ({ key: k, ...P[k] }));
  });

  const keys = Object.keys(P);
  const lats = keys.map((k) => P[k].lat).join(",");
  const lons = keys.map((k) => P[k].lon).join(",");
  const base = `latitude=${lats}&longitude=${lons}&timezone=Asia%2FKolkata`;
  const asList = (j) => (Array.isArray(j) ? j : [j]);
  const getJSON = (url) =>
    fetch(url, { cache: "no-store" }).then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });

  // state[key] = { now: {temp, code}, forecast: {date: {max, min, code}}, typical: {date: {max, min}} }
  const state = {};
  keys.forEach((k) => (state[k] = { forecast: {}, typical: {} }));

  function loadForecast() {
    const url =
      "https://api.open-meteo.com/v1/forecast?" + base +
      "&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=16";
    return getJSON(url).then((json) => {
      asList(json).forEach((loc, i) => {
        const s = state[keys[i]];
        if (loc.current) s.now = { temp: loc.current.temperature_2m, code: loc.current.weather_code };
        const dl = loc.daily || {};
        (dl.time || []).forEach((date, j) => {
          s.forecast[date] = { max: dl.temperature_2m_max[j], min: dl.temperature_2m_min[j], code: dl.weather_code[j] };
        });
      });
    });
  }

  // Average of the same calendar window (±3 days) over the last 5 Novembers.
  function loadTypical() {
    const trip = window.TRIP;
    const lastYear = Number(trip.start.slice(0, 4)) - 1;
    const years = [0, 1, 2, 3, 4].map((i) => lastYear - i);
    const md = (iso) => iso.slice(5);
    const shift = (iso, n) => {
      const d = new Date(iso + "T00:00:00Z");
      d.setUTCDate(d.getUTCDate() + n);
      return d.toISOString().slice(0, 10);
    };
    const from = md(shift(trip.start, -3));
    const to = md(shift(trip.end, 3));
    return Promise.all(
      years.map((y) =>
        getJSON(
          "https://archive-api.open-meteo.com/v1/archive?" + base +
            `&start_date=${y}-${from}&end_date=${y}-${to}&daily=temperature_2m_max,temperature_2m_min`
        ).catch(() => null)
      )
    ).then((results) => {
      if (!results.some(Boolean)) throw new Error("no history");
      const samples = {}; // samples[key][MM-DD] = [{max, min}]
      results.filter(Boolean).forEach((json) => {
        asList(json).forEach((loc, i) => {
          const k = keys[i];
          const dl = loc.daily || {};
          (dl.time || []).forEach((date, j) => {
            const mx = dl.temperature_2m_max[j], mn = dl.temperature_2m_min[j];
            if (mx == null || mn == null) return;
            const bucket = (samples[k] = samples[k] || {});
            (bucket[md(date)] = bucket[md(date)] || []).push({ max: mx, min: mn });
          });
        });
      });
      trip.days.forEach((d) => {
        d.wx.forEach((p) => {
          const pool = [];
          for (let n = -3; n <= 3; n++) pool.push(...((samples[p.key] || {})[md(shift(d.date, n))] || []));
          if (!pool.length) return;
          const avg = (f) => pool.reduce((a, s) => a + s[f], 0) / pool.length;
          state[p.key].typical[d.date] = { max: avg("max"), min: avg("min") };
        });
      });
    });
  }

  let loading;
  window.TripWeather = {
    places: P,
    state,
    load() {
      if (!loading) {
        loading = Promise.allSettled([loadForecast(), loadTypical()]).then((r) => {
          if (r.every((x) => x.status === "rejected")) throw new Error("weather unavailable");
        });
      }
      return loading;
    },
  };
})();
