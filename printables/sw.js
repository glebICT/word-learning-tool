// Cache-first service worker: everything the generator needs is precached on install.
const CACHE = "printables-v1";
const FILES = [
  "./",
  "index.html",
  "fonts.css",
  "fonts/AmaticSC-cyrillic.woff2",
  "fonts/AmaticSC-latin.woff2",
  "fonts/Andika-cyrillic-ext.woff2",
  "fonts/Andika-cyrillic.woff2",
  "fonts/Andika-latin.woff2",
  "fonts/BadScript-cyrillic-ext.woff2",
  "fonts/BadScript-cyrillic.woff2",
  "fonts/BadScript-latin.woff2",
  "fonts/BalsamiqSans-cyrillic-ext.woff2",
  "fonts/BalsamiqSans-cyrillic.woff2",
  "fonts/BalsamiqSans-latin.woff2",
  "fonts/Caveat-cyrillic-ext.woff2",
  "fonts/Caveat-cyrillic.woff2",
  "fonts/Caveat-latin.woff2",
  "fonts/Comforter-cyrillic.woff2",
  "fonts/Comforter-latin.woff2",
  "fonts/ComforterBrush-cyrillic.woff2",
  "fonts/ComforterBrush-latin.woff2",
  "fonts/GreatVibes-cyrillic-ext.woff2",
  "fonts/GreatVibes-cyrillic.woff2",
  "fonts/GreatVibes-latin.woff2",
  "fonts/Lobster-cyrillic-ext.woff2",
  "fonts/Lobster-cyrillic.woff2",
  "fonts/Lobster-latin.woff2",
  "fonts/MarckScript-cyrillic.woff2",
  "fonts/MarckScript-latin.woff2",
  "fonts/Neucha-cyrillic.woff2",
  "fonts/Neucha-latin.woff2",
  "fonts/Pacifico-cyrillic-ext.woff2",
  "fonts/Pacifico-cyrillic.woff2",
  "fonts/Pacifico-latin.woff2",
  "fonts/Pangolin-cyrillic-ext.woff2",
  "fonts/Pangolin-cyrillic.woff2",
  "fonts/Pangolin-latin.woff2",
  "fonts/Pattaya-cyrillic.woff2",
  "fonts/Pattaya-latin.woff2",
  "fonts/PlaypenSans-cyrillic-ext.woff2",
  "fonts/PlaypenSans-cyrillic.woff2",
  "fonts/PlaypenSans-latin.woff2",
  "fonts/ShantellSans-cyrillic-ext.woff2",
  "fonts/ShantellSans-cyrillic.woff2",
  "fonts/ShantellSans-latin.woff2",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Network-first for the page so updates show up when online; cache-first for fonts.
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  if (e.request.mode === "navigate" || url.pathname.endsWith(".html")) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request).then((r) => r || caches.match("index.html"))),
    );
    return;
  }
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
