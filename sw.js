/* Jarvis · service worker do app (Mark IV): notificações + abre rápido/offline. Sem segredos.
   Rede primeiro para os arquivos do app; os dados (script.google.com) não passam pelo cache. */
var CACHE = 'jarvis-4.0.0';
var ARQS = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'badge-72.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARQS); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return; // o app do Google passa direto
  e.respondWith(fetch(e.request).then(function (r) { var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, cp); }); return r; })
    .catch(function () { return caches.match(e.request).then(function (r) { return r || caches.match('./'); }); }));
});
self.addEventListener('push', function (e) {
  var m = {};
  try { m = e.data ? e.data.json() : {}; } catch (err) { m = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(m.title || 'Jarvis', {
    body: m.body || 'Você tem novidades na Central.',
    icon: 'icon-192.png', badge: 'badge-72.png', tag: m.tag || 'jarvis', renotify: true,
    data: { url: m.url || self.registration.scope }
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var alvo = self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    for (var i = 0; i < cs.length; i++) if (cs[i].url.indexOf(alvo) === 0 && 'focus' in cs[i]) return cs[i].focus();
    return self.clients.openWindow(alvo);
  }));
});
