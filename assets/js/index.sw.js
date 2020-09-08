const CACHE_NAME = 'APP_CACHE_V1'

const cacheItems = [
    // global
    '../../index.html',
    '../css/style.css',
    // /icons
    '../icons/android-chrome-192x192.png',
    '../icons/android-chrome-512x512.png',
    '../icons/apple-touch-icon.png',
    '../icons/browserconfig.xml',
    '../icons/favicon-16x16.png',
    '../icons/favicon-32x32.png',
    '../icons/favicon.ico',
    '../icons/mstile-150x150.png',
    '../icons/safari-pinned-tab.svg',
    '../icons/site.webmanifest',
    // /js
    './controlElements.js',
    // '',
    // '',
    // '',
    // '',
    // '',
    // ''
    // root
]

// install service worker
self.addEventListener('install', installer => {
    console.log('insatalling')
    const done = async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.addAll(cacheItems)
    }

    installer.waitUntil(done());
})

// fetch from the network
self.addEventListener('fetch', fetchEvent => {
    const url = fetchEvent.request.url;

    const getResponse = async (request) => {
        let response;

        response = await caches.match(request);
        if (response && response.status === 200 || response.status === 304) {
            console.log('available there');
            return response;
        }

        try {
            response = await fetch(request);
            if (response && response.status === 404) {
                console.log('not available there');
                // return response;
            }
        }
        catch (e) {
            console.error(e);
        }

        const clone = response.clone();
        const cache = await caches.open(CACHE_NAME);
        cache.put(url, clone);
        return response;
    }

    fetchEvent.respondWith(getResponse(fetchEvent.request));

});


// activate service worker
self.addEventListener('activate', activator => {
    console.log('activating');

    const currrentCaches = [CACHE_NAME];

    const done = async () => {
        const names = await caches.keys();
        return Promise.all(names.map(name => {
            if(!currrentCaches.includes(name)) {
                return caches.delete(name);
            }
        }))
    }

    activator.waitUntil(done());
});


async function ss () {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();

    keys.forEach(key => {
        
    })

    console.log(keys)
}
ss();