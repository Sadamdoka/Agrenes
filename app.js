//Removing Preloader
setTimeout(function () {
    var preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('preloader-hide');
    }
}, 150);

document.addEventListener('DOMContentLoaded', () => {
    'use strict'


    //Global Variables
    let isPWA = true;  // Enables or disables the service worker and PWA
    //let isAJAX = true; // AJAX transitions. Requires local server or server
    var pwaName = "Agrenes App"; //Local Storage Names for PWA
    var pwaRemind = 1; //Days to re-remind to add to home
    //var pwaNoCache = false; //Requires server and HTTPS/SSL. Will clear cache with each visit

    //Setting Service Worker Locations scope = folder | location = service worker js location
    //localhost
    //var pwaScope = "/agro/";
    //var pwaLocation = "/agro/sw.js";
    
    //live server
    var pwaScope = "/";
    var pwaLocation = "/sw.js";

    //Place all your custom Javascript functions and plugin calls below this line
    function init_agrenes() {
        //Caching Global Variables
        var i, e, el, evt, event; //https://www.w3schools.com/js/js_performance.asp

        //Activating the Page - Required to improve CLS Performance
        document.querySelectorAll('#page')[0].style.display = "block";

        //Activating Off Canvas
        var offCanvasBoxes = document.querySelectorAll('.offcanvas');
        if (offCanvasBoxes) {
            setTimeout(function () {
                offCanvasBoxes.forEach(function (e) {
                    e.style.display = "block";
                })
            }, 250)
        }


        //Adding Local Storage for Visited Links
        var checkVisited = document.querySelectorAll('.check-visited');
        if (checkVisited) {
            function check_visited_links() {
                var visited_links = JSON.parse(localStorage.getItem(pwaName + '_Visited_Links')) || [];
                var links = document.querySelectorAll('.check-visited a');
                for (let i = 0; i < links.length; i++) {
                    var that = links[i];
                    that.addEventListener('click', function (e) {
                        var clicked_url = this.href;
                        if (visited_links.indexOf(clicked_url) == -1) {
                            visited_links.push(clicked_url);
                            localStorage.setItem(pwaName + '_Visited_Links', JSON.stringify(visited_links));
                        }
                    })
                    if (visited_links.indexOf(that.href) !== -1) {
                        that.className += ' visited-link';
                    }
                }
            }
            check_visited_links();
        }




        //Creating Offline Alert Messages
        var addOfflineClasses = document.querySelectorAll('.offline-message');
        if (!addOfflineClasses.length) {
            const offlineAlert = document.createElement('p');
            const onlineAlert = document.createElement('p');
            offlineAlert.className = 'offline-message bg-red-dark shadow-bg shadow-bg-s color-white';
            offlineAlert.innerHTML = '<i class="bi bi-wifi-off pe-2"></i> No internet connection detected';
            onlineAlert.className = 'online-message bg-green-dark shadow-bg shadow-bg-s color-white';
            onlineAlert.innerHTML = '<i class="bi bi-wifi pe-2"></i> You are back online.';
            document.querySelectorAll('#page')[0].appendChild(offlineAlert);
            document.querySelectorAll('#page')[0].appendChild(onlineAlert);
        }

        //Online / Offline Settings
        //Activating and Deactivating Links Based on Online / Offline State
        function offlinePage() {
            var anchorsDisabled = document.querySelectorAll('a');
            anchorsDisabled.forEach(function (e) {
                var hrefs = e.getAttribute('href');
                if (hrefs.match(/.html/)) {
                    e.classList.add('show-offline');
                    e.setAttribute('data-link', hrefs);
                    e.setAttribute('href', '#');
                }
            });
            var showOffline = document.querySelectorAll('.show-offline');
            showOffline.forEach(el => el.addEventListener('click', event => {
                    document.getElementsByClassName('offline-message')[0].classList.add('offline-message-active');
                    setTimeout(function () {
                        document.getElementsByClassName('offline-message')[0].classList.remove('offline-message-active');
                    }, 1500);
                }));
        }

        function onlinePage() {
            var anchorsEnabled = document.querySelectorAll('[data-link]');
            anchorsEnabled.forEach(function (e) {
                var hrefs = e.getAttribute('data-link');
                if (hrefs.match(/.html/)) {
                    e.setAttribute('href', hrefs);
                    e.removeAttribute('data-link', '');
                }
            });
        }

        //Defining Offline/Online Variables
        var offlineMessage = document.getElementsByClassName('offline-message')[0];
        var onlineMessage = document.getElementsByClassName('online-message')[0];

        //Online / Offline Status
        function isOnline() {
            onlinePage();
            offlineMessage.classList.remove('offline-message-active');
            onlineMessage.classList.add('online-message-active');
            setTimeout(function () {
                onlineMessage.classList.remove('online-message-active');
            }, 2000);
            console.info('Connection: Online');
        }

        function isOffline() {
            offlinePage();
            onlineMessage.classList.remove('online-message-active');
            offlineMessage.classList.add('offline-message-active');
            setTimeout(function () {
                offlineMessage.classList.remove('offline-message-active');
            }, 2000);
            console.info('Connection: Offline');
        }

        var simulateOffline = document.querySelectorAll('.simulate-offline');
        var simulateOnline = document.querySelectorAll('.simulate-online');
        if (simulateOffline.length) {
            simulateOffline[0].addEventListener('click', function () {
                isOffline();
            });
            simulateOnline[0].addEventListener('click', function () {
                isOnline();
            });
        }

        //Check if Online / Offline
        function updateOnlineStatus(event) {
            var condition = navigator.onLine ? "online" : "offline";
            isOnline();
        }
        function updateOfflineStatus(event) {
            isOffline();
        }
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOfflineStatus);

        //Detecting Mobile OS
        let isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.iOS());
            }
        };
        function iOSversion() {
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                return [parseInt(v[1], 10)];
            }
        }


        const androidDev = document.getElementsByClassName('show-android');
        const iOSDev = document.getElementsByClassName('show-ios');
        const noDev = document.getElementsByClassName('show-no-device');

        if (!isMobile.any()) {
            for (let i = 0; i < iOSDev.length; i++) {
                iOSDev[i].classList.add('disabled');
            }
            for (let i = 0; i < androidDev.length; i++) {
                androidDev[i].classList.add('disabled');
            }
        }
        if (isMobile.iOS()) {
            for (let i = 0; i < noDev.length; i++) {
                noDev[i].classList.add('disabled');
            }
            for (let i = 0; i < androidDev.length; i++) {
                androidDev[i].classList.add('disabled');
            }
            //Detect iOS 15 or Higher Version and Attach Classes
            var iOSVer = iOSversion();
            if (iOSVer > 15) {
                const tabBar = document.querySelectorAll('.iosTabBar')[0];
                if (!tabBar) {
                    document.querySelectorAll('#footer-bar')[0].classList.add('iosTabBar');
                }
            }
        }
        if (isMobile.Android()) {
            for (let i = 0; i < iOSDev.length; i++) {
                iOSDev[i].classList.add('disabled');
            }
            for (let i = 0; i < noDev.length; i++) {
                noDev[i].classList.add('disabled');
            }
        }

        //Adding is-on-homescreen class to be targeted when used as PWA.
        function ath() {
            (function (a, b, c) {
                if (c in b && b[c]) {
                    var d, e = a.location,
                            f = /^(a|html)$/i;
                    a.addEventListener("click", function (a) {
                        d = a.target;
                        while (!f.test(d.nodeName))
                            d = d.parentNode;
                        "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
                    }, !1);
                    document.querySelectorAll('.page-content')[0].classList.add('is-on-homescreen');
                    setTimeout(function () {
                        document.querySelectorAll('#footer-bar')[0].classList.remove('iosTabBar');
                    }, 50)
                }
            })(document, window.navigator, "standalone")
        }
        ath();

        //PWA Settings
        if (isPWA === true) {
            //Defining PWA Windows
            var iOS_PWA = document.querySelectorAll('#menu-install-pwa-ios')[0];
            if (iOS_PWA) {
                var iOS_Window = new bootstrap.Offcanvas(iOS_PWA);
            }
            var Android_PWA = document.querySelectorAll('#menu-install-pwa-android')[0];
            if (Android_PWA) {
                var Android_Window = new bootstrap.Offcanvas(Android_PWA);
            }

            var checkPWA = document.getElementsByTagName('html')[0];
            if (!checkPWA.classList.contains('isPWA')) {
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', function () {
                        navigator.serviceWorker.register(pwaLocation, {scope: pwaScope})
                                .then(function (registration) {
                                    // Service Worker registered successfully
                                    console.log('Service Worker registered with scope:', registration.scope);
                                    registration.update(); // Check for updates to the Service Worker
                                })
                                .catch(function (error) {
                                    // Handle errors during registration
                                    console.error('Service Worker registration failed:', error);
                                });
                    });
                }


                //Setting Timeout Before Prompt Shows Again if Dismissed
                var hours = pwaRemind * 24; // Reset when storage is more than 24hours
                var now = Date.now();
                var setupTime = localStorage.getItem(pwaName + '-PWA-Timeout-Value');
                if (setupTime == null) {
                    localStorage.setItem(pwaName + '-PWA-Timeout-Value', now);
                } else if (now - setupTime > hours * 60 * 60 * 1000) {
                    localStorage.removeItem(pwaName + '-PWA-Prompt')
                    localStorage.setItem(pwaName + '-PWA-Timeout-Value', now);
                }


                const pwaClose = document.querySelectorAll('.pwa-dismiss');
                pwaClose.forEach(el => el.addEventListener('click', e => {
                        const pwaWindows = document.querySelectorAll('#menu-install-pwa-android, #menu-install-pwa-ios');
                        for (let i = 0; i < pwaWindows.length; i++) {
                            pwaWindows[i].classList.remove('menu-active');
                        }
                        localStorage.setItem(pwaName + '-PWA-Timeout-Value', now);
                        localStorage.setItem(pwaName + '-PWA-Prompt', 'install-rejected');
                        console.log('PWA Install Rejected. Will Show Again in ' + (pwaRemind) + ' Days');
                    }));

                //Trigger Install Prompt for Android
                const pwaWindows = document.querySelectorAll('#menu-install-pwa-android, #menu-install-pwa-ios');
                if (pwaWindows.length) {
                    if (isMobile.Android()) {
                        if (localStorage.getItem(pwaName + '-PWA-Prompt') != "install-rejected") {
                            function showInstallPrompt() {
                                setTimeout(function () {
                                    if (!window.matchMedia('(display-mode: fullscreen)').matches) {
                                        console.log('Triggering PWA Window for Android')
                                        Android_Window.show();
                                    }
                                }, 3500);
                            }
                            var deferredPrompt;
                            window.addEventListener('beforeinstallprompt', (e) => {
                                e.preventDefault();
                                deferredPrompt = e;
                                showInstallPrompt();
                            });
                        }
                        const pwaInstall = document.querySelectorAll('.pwa-install');
                        pwaInstall.forEach(el => el.addEventListener('click', e => {
                                deferredPrompt.prompt();
                                deferredPrompt.userChoice
                                        .then((choiceResult) => {
                                            if (choiceResult.outcome === 'accepted') {
                                                console.log('Added');
                                            } else {
                                                localStorage.setItem(pwaName + '-PWA-Timeout-Value', now);
                                                localStorage.setItem(pwaName + '-PWA-Prompt', 'install-rejected');
                                                setTimeout(function () {
                                                    if (!window.matchMedia('(display-mode: fullscreen)').matches) {
                                                         Android_Window.show()
                                                    }
                                                }, 50);
                                            }
                                            deferredPrompt = null;
                                        });
                            }));
                        window.addEventListener('appinstalled', (evt) => {
                            Android_Window.hide();
                        });
                    }
                    //Trigger Install Guide iOS
                    if (isMobile.iOS()) {
                        if (localStorage.getItem(pwaName + '-PWA-Prompt') != "install-rejected") {
                            setTimeout(function () {
                                if (!window.matchMedia('(display-mode: fullscreen)').matches) {
                                    console.log('Triggering PWA Window for iOS');
                                    iOS_Window.show();
                                }
                            }, 3500);
                        }
                    }
                }
            }
            checkPWA.setAttribute('class', 'isPWA');
        }

        //Remove Bootstrap OffCanvas Overflow on Load
        setTimeout(function () {
            var body = document.body;
            body.removeAttribute('style');
        }, 100);



    }
    init_agrenes();
});