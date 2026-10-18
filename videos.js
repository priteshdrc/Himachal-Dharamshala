/* YouTube videos for each day. Paste a YouTube or Shorts link into the
   list for that day; the site shows a thumbnail and plays it in a popup. */

(function () {
  const byDay = {
    2: [
      "https://www.youtube.com/shorts/ZvIgxB7YJNM",
      "https://www.youtube.com/shorts/dCQeGPs1Zwo",
      "https://www.youtube.com/shorts/fxQui9fdCPg",
    ],
    3: [
      "https://www.youtube.com/shorts/Yqxn47AIVwc",
      "https://www.youtube.com/watch?v=23t7jjXHA-U",
    ],
    4: [
      "https://www.youtube.com/shorts/hKCYZ18y7e4",
      "https://www.youtube.com/shorts/vDHedfm-SFU",
    ],
    5: [
      "https://www.youtube.com/shorts/Fape7APIw-0",
      "https://www.youtube.com/shorts/ZGcua451kBw",
    ],
    6: [
      "https://www.youtube.com/shorts/dsp_Htr-oiI",
      "https://www.youtube.com/shorts/BzHnqbPECkI",
      "https://www.youtube.com/shorts/N37wPdcC8jk",
    ],
    7: [
      "https://www.youtube.com/shorts/ybH2lwrmusA",
      "https://www.youtube.com/shorts/BB__ZseIWdM",
    ],
    8: [
      "https://www.youtube.com/shorts/FoRSKlsUSBw",
      "https://www.youtube.com/shorts/o_cAWtpYqz4",
    ],
    9: [
      "https://www.youtube.com/shorts/k5sGCDuvXoo",
      "https://www.youtube.com/shorts/XzJ3EYLcGvU",
      "https://www.youtube.com/shorts/2nVBjjICDNg",
      "https://www.youtube.com/shorts/liI_b-0nIoM",
    ],
  };

  // "https://www.youtube.com/shorts/ID" or "...watch?v=ID" -> { id, short }
  function parse(url) {
    const u = new URL(url);
    const m = u.pathname.match(/^\/shorts\/([\w-]{11})/);
    if (m) return { id: m[1], short: true, url };
    const id = u.searchParams.get("v") || (u.hostname === "youtu.be" ? u.pathname.slice(1) : "");
    return /^[\w-]{11}$/.test(id) ? { id, short: false, url } : null;
  }

  window.TRIP.days.forEach((d) => {
    d.videos = (byDay[d.n] || []).map(parse).filter(Boolean);
  });
})();
