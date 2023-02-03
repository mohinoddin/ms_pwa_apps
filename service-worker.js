const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/app.js",
  "/images/icon-192x192.jpg",
  "/images/icon-256x256.jpg",
  "/images/icon-384x384.jpg",
  "/images/icon-512x512.jpg",
  
]

 

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
	  caches.open(staticDevCoffee).then(cache => {
		cache.addAll(assets)
	  })
	)
  })

self.addEventListener('activate', (event) => {
	console.log('[ServiceWorker] Activate');
	event.waitUntil(
		caches.keys().then(async (keys) =>
			Promise.all(
				keys.map((key) => {
					if (key !== staticDevCoffee) {
						console.log('[ServiceWorker] Removing old cache', key);
						return caches.delete(key);
					}
				}),
			),
		),
	);

	// self.clients.claim();
});


self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
	  caches.match(fetchEvent.request).then(res => {
		return res || fetch(fetchEvent.request)
	  })
	)
  })