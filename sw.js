// Caching is switched off. Phones that installed the old offline worker
// fetch this file on their next visit; it deletes the saved copies,
// removes itself and reloads open tabs so they show the latest site.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((tabs) => tabs.forEach((tab) => tab.navigate(tab.url)))
  );
});
