/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var APP_NAME = 'Agrenes App';
var APP_VER = '1.3';
var CACHE_NAME = APP_NAME + '-' + APP_VER;


// Files required to make this app work offline.
// Add all files you want to view offline below.
// Leave REQUIRED_FILES = [] to disable offline.
var REQUIRED_FILES = [
    '/',
    '/index.html',
    //css files
    '/style.css',
    'css/bootstrap.css',
    //Js files
    'js/bootstrap.min.js',
    '/app.js',
    //icons
    'icons/agrenes_192.png',
    'icons/web.png'
];


// Service Worker Diagnostic. Set true to get console logs.
var APP_DIAG = false;

//Service Worker Function Below.
self.addEventListener('install', function (event) {
    event.waitUntil(
            caches.open(CACHE_NAME)
            .then(function (cache) {
                //Adding files to cache
                return cache.addAll(REQUIRED_FILES);
            }).catch(function (error) {
        //Output error if file locations are incorrect
        if (APP_DIAG) {
            console.log('Service Worker Cache: Error Check REQUIRED_FILES array in _service-worker.js - files are missing or path to files is incorrectly written -  ' + error);
        }
    })
            .then(function () {
                //Install SW if everything is ok
                return self.skipWaiting();
            })
            .then(function () {
                if (APP_DIAG) {
                    console.log('Service Worker: Cache is OK');
                }
            })
            );
    if (APP_DIAG) {
        console.log('Service Worker: Installed');
    }
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
            //Fetch Data from cache if offline
            caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
            );
    if (APP_DIAG) {
        console.log('Service Worker: Fetching ' + APP_NAME + '-' + APP_VER + ' files from Cache');
    }
});

self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
    event.waitUntil(
            //Check cache number, clear all assets and re-add if cache number changed
            caches.keys().then(cacheNames => {
        return Promise.all(
                cacheNames
                .filter(cacheName => (cacheName.startsWith(APP_NAME + "-")))
                .filter(cacheName => (cacheName !== CACHE_NAME))
                .map(cacheName => caches.delete(cacheName))
                );
    })
            );
    if (APP_DIAG) {
        console.log('Service Worker: Activated');
    }
});