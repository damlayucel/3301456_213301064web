'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "1d786cb9393e56398f93909c232827d8",
"index.html": "046db9433af90053c699fbe89e073a3a",
"/": "046db9433af90053c699fbe89e073a3a",
"main.dart.js": "95099e1eac2a775aa3fc4979e5f0f291",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "860345e768bc8a394470823c0f37077b",
"assets/AssetManifest.json": "0eafdabc9d08ef8c5afc10fb8d83de66",
"assets/NOTICES": "259068529bed6e57beac74e9760f7147",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/resimler/yerk%25C3%25B6pr%25C3%25BC%2520%25C5%259Fel.jpeg": "a86fbc815f8edf73add94c9d6225ca3b",
"assets/assets/resimler/Meram-Ba%25C4%259Flar%25C4%25B14.jpg": "557f12e470d1880899071f56ff624862",
"assets/assets/resimler/kelebek4.jpg": "402d9746c57324b6a2844f42f5e2495c",
"assets/assets/resimler/selimiye%2520cami.jpeg": "fea6693fad071dd8f756a61366d89992",
"assets/assets/resimler/Bey%25C5%259Fehir-G%25C3%25B6l%25C3%25BC-Nerede-1.jpg": "a5b5cf1c8f8ab9180064ab4a6ad5c210",
"assets/assets/resimler/mevlana.jpeg": "641251cd389dafaeb1fb25d92320780c",
"assets/assets/resimler/atatt%25C3%25BCrkevi.jpeg": "5a12737d0b8c579d78bc658b1d7ff2ad",
"assets/assets/resimler/sille-koyu-konya.webp": "f89eccc63c0c74d397daf03fdd0a3d50",
"assets/assets/resimler/resimqww.JPEG": "c5fb42e58f84741cf9f23f982b7bcb87",
"assets/assets/resimler/%25C3%25A7atal.jpeg": "c5c36127807088585811b863f04652e3",
"assets/assets/resimler/ataturk-evi-muzesi-konya.jpg": "7c61d36faeed2013e3fb1c8f4fd8a7ab",
"assets/assets/resimler/Karap%25C4%25B1nar-%25C3%2587%25C3%25B6l%25C3%25BC-1.jpg": "9f749bb24d2ed7a8faf6ec86bdb58df7",
"assets/assets/resimler/ince%2520minareli%2520medrese.jpeg": "7f5af6b737c84fe34a600d0467578337",
"assets/assets/resimler/loading.gif": "b71b7d6046bdfbee99ed17e1c3adecdf",
"assets/assets/resimler/ana.jpg": "fdc0a7c990786afd2430b9f1d8f11fe0",
"assets/assets/resimler/bilim_merkezi_b_2.jpg": "f46e7d058e047bfc5ea6725be33faebe",
"assets/assets/resimler/80.jpeg": "af90488e4c5d74288f1f8f93623a6331",
"assets/assets/resimler/karataymzu.jpeg": "a3b6c467d932b2c347f1b84f873f4585",
"assets/assets/resimler/kilistra.jpeg": "0386574f89631c4f91a5befd4ffd9f10",
"assets/assets/resimler/Konya-Kyoto-Japon-Bah%25C3%25A7esi-3-e1572252841767.jpeg": "77e9d99f15f2017f6aa06fc11b885316",
"assets/assets/resimler/istiklal.jpeg": "71e26ceec05fb9df81fff24dc1979525",
"assets/assets/resimler/nasreddin_hoca_turbesi_003.jpg": "c4977d5ec9943320ce3880776e24346e",
"assets/assets/resimler/nasreddin%2520hoca%2520rkeoloji.jpeg": "a2d6fc676cedff5b27bc06dd6de81354",
"assets/assets/resimler/aladdin.jpeg": "004f3f344b5366d74243948b4cead2d3",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
