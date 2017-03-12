var cacheName = 'git-stalk-1';

var filesToCache = [
	'/git-stalk',
	'public/bundle.js',
	'empty.svg',
	'logo.svg'
]

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cacheName)
		.then(function(cache) {
			return cache.addAll(filesToCache)
		})
		)
});


self.addEventListener('fetch', function (e) {
	e.respondWith(
		caches.match(e.request)
		.then(function(response){
			if(response) {
				return response
			}

			return fetch(e.request)
		})
	);
});
