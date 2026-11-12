# Shell PWA · Jarvis (Central Mark III)
Página pequena que dá ao atalho do iPhone o **ícone do reator, o nome "Jarvis" e tela cheia** sem faixa branca.
Motivo: o app do Apps Script roda em script.google.com dentro de iframes do Google, então as metatags dele são ignoradas pelo iOS.

## Como funciona
- `index.html` abre o app (/exec?shell=1) num iframe em tela cheia. O Apps Script libera o iframe só com `?shell=1` (ALLOWALL).
- Se o login do Google não carregar dentro do iframe (iOS bloqueia cookies de terceiros), aparece "Não carregou? Abrir direto".
  Tocando, o atalho passa a abrir o app direto (modo salvo no aparelho). Troca: abre com ícone e nome, mas o iOS mostra a barra do navegador por cima.
- Sem segredos: só a URL /exec (que só abre com a conta do Kaio).

## Notificações
- `sw.js` recebe o push e mostra a notificação com o nome Jarvis e o ícone. Tocar nela abre o atalho.
- O botão "Ativar notificações" aparece só no atalho instalado. No iPhone, abrir pelo Safari não recebe push: é regra da Apple.
- A chave pública vem do app pelo postMessage. A inscrição volta ao app, que a grava na aba Push.

## Publicado
https://kaioaraujoroncon.github.io/jarvis-app/ (repositório público kaioaraujoroncon/jarvis-app, só estes arquivos).
No iPhone, abra no Safari e toque em Compartilhar > Adicionar à Tela de Início. Depois abra o ícone e toque em "Ativar notificações".
