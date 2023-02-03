// const staticDevCoffee = "dev-coffee-site-v1"
const n = [
  "/",
  "/index.html",
  "/css/style.css",
  "/app.js",
  "/images/icon-192x192.jpg",
  "/images/icon-256x256.jpg",
  "/images/icon-384x384.jpg",
  "/images/icon-512x512.jpg",
  
]


// self.addEventListener("install", installEvent => {
//     installEvent.waitUntil(
//       caches.open(staticDevCoffee).then(cache => {
//         cache.addAll(assets)
//       })
//     )
// })

let a = "1675418747536", c = self, o = `static-cache-${a}`, l = [
    ...n
  ];
  c.addEventListener("install", (e) => {
    console.log("[ServiceWorker] Install"), e.waitUntil(
      caches.open(o).then(async (i) => {
        console.log("[ServiceWorker] Pre-caching offline page"), await i.addAll(l), c.skipWaiting();
      })
    );
  });
  c.addEventListener("activate", (e) => {
    console.log("[ServiceWorker] Activate"), e.waitUntil(
      caches.keys().then(
        async (i) => Promise.all(
          i.map((s) => {
            if (s !== o)
              return console.log("[ServiceWorker] Removing old cache", s), caches.delete(s);
          })
        )
      )
    ), c.clients.claim();
  });

  self.addEventListener("fetch", (e) => {
    console.log("[ServiceWorker] Fetch"), e.request.mode === "navigate" && e.respondWith(
      fetch(e.request).catch(async () => await (await caches.open(o)).match("offline.html"))
    );
  });
  