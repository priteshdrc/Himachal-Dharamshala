// Offline support: the itinerary keeps working with no signal in the mountains.
const CORE = "trip-core-v2";
const PHOTOS = "trip-photos-v2";
const FILES = ["./", "index.html", "styles.css", "data.js", "app.js", "icon.svg", "manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CORE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CORE && k !== PHOTOS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Site files: network first so updates show up, cache when offline.
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CORE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("index.html")))
    );
    return;
  }

  // Photos and fonts: cache first, fill the cache as they load.
  if (req.destination === "image" || req.destination === "font" || url.hostname === "fonts.googleapis.com") {
    e.respondWith(
      caches.open(PHOTOS).then((c) =>
        c.match(req).then(
          (hit) =>
            hit ||
            fetch(req).then((res) => {
              c.put(req, res.clone());
              return res;
            })
        )
      )
    );
  }
});
