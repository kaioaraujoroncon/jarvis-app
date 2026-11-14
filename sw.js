/* Jarvis · service worker do app (Mark V): notificações (com badge e link direto para o item) + abre rápido/offline. Sem segredos.
   Rede primeiro para os arquivos do app; os dados (script.google.com) não passam pelo cache.
   O cache "jarvis-guarda" (cópia do token do aparelho, feita pelo app) nunca é apagado aqui. */
var CACHE = 'jarvis-6.1.1';
var GUARDA = 'jarvis-guarda';
var ARQS = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'badge-72.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARQS); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE && k !== GUARDA; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return; // o app do Google passa direto
  e.respondWith(fetch(e.request).then(function (r) { var cp = r.clone(); if (r.ok) caches.open(CACHE).then(function (c) { c.put(e.request.mode === 'navigate' ? './' : e.request, cp); }); return r; })
    .catch(function () { return caches.match(e.request, { ignoreSearch: e.request.mode === 'navigate' }).then(function (r) { return r || caches.match('./'); }); }));
});
self.addEventListener('push', function (e) {
  var m = {};
  try { m = e.data ? e.data.json() : {}; } catch (err) { m = { body: e.data ? e.data.text() : '' }; }
  var tarefas = [self.registration.showNotification(m.title || 'Jarvis', {
    body: m.body || 'Você tem novidades na Central.',
    icon: 'icon-192.png', badge: 'badge-72.png', tag: m.tag || 'jarvis', renotify: true,
    data: { url: m.url || self.registration.scope, item: m.item || '' }
  })];
  // número de pendentes no ícone (Badging API; iOS 16.4+ com notificações permitidas)
  if (m.badge != null && self.navigator && self.navigator.setAppBadge) tarefas.push((m.badge ? self.navigator.setAppBadge(m.badge) : self.navigator.clearAppBadge()).catch(function () {}));
  e.waitUntil(Promise.all(tarefas));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var d = e.notification.data || {}, alvo = d.url || self.registration.scope, escopo = self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    for (var i = 0; i < cs.length; i++) if (cs[i].url.indexOf(escopo) === 0 && 'focus' in cs[i]) {
      cs[i].postMessage({ tipo: 'abrir', url: alvo }); // app já aberto: vai direto ao item
      return cs[i].focus();
    }
    return self.clients.openWindow(alvo);
  }));
});
