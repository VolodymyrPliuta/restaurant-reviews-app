console.log('Service worker executing');

const version = 'v1::';

self.addEventListener("install", (event) => {
  console.log('WORKER: install event in progress')
  event.waitUntil(
    caches
      .open(version + 'fundamentals')
      .then( function(cache) {
        return cache.addAll([
          '/',
          '/css/style.css',
          '/js/main.js'
        ]);
      })
    .then(() => {
      console.log('WORKER: install is completed');
    })
  );
});
