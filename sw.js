console.log('Service worker executing');

const version = 'v1::';

const cacheFiles = [
  '/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
];

//install
self.addEventListener('install', (event) => {
  // console.log('WORKER: installed');
  event.waitUntil(
    caches.open('v1').
		then( (cache) => {
			// console.log('reached installation')
      return cache.addAll(cacheFiles);
    })
  );
});

//fetch

// self.addEventListener('fetch', (e) => { 
//   // console.log('fetch happend')
//   return e.respondWith(
//     caches.match(e.request).then( (response) => {
//       if(response) { // console.log('Found', e.request, ' in cache');
//                 console.log('we are the champion of the world', {response})
//         return response;
//       }
//       else { // console.log('Could not find ', e, ' in cache')
//         console.log('we are the champion of the world', 'nothing')
//         return fetch(e.request)
//           .then( (response) => {
//             const clonedResponse = response.clone();
//             caches.open('v1').then( (cache) =>{
//                 console.log('we are the champion of the world everything', {clonedResponse})
//                 return cache.put(e.request, clonedResponse);
//               })
//             return response;
//           })
//           .catch( (err) =>{ console.log({err}) })
//       }
//     })
//   );
// })

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                console.log('Found ', e.request, ' in cache');
                return response;
            }
            else {
                console.log('Could not find ', e.request, ' in cache, FETCHING!');
                return fetch(e.request)
                .then(function(response) {
                    const clonedResponse = response.clone(); 
                    caches.open('v1').then(function(cache) {
                        cache.put(e.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        })
    );
});
