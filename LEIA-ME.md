# Jarvis · app da Central (Mark IV)

App web instalável (PWA) da Central do Kaio: ícone do reator, nome "Jarvis", tela cheia no iPhone e notificações.

Desde o Mark IV a tela inteira roda aqui (GitHub Pages), sem login do Google e sem iframe.
Os dados ficam no Google (Apps Script + planilha privada). Cada aparelho é pareado uma vez com um código
e recebe um token próprio, guardado só nele; o servidor guarda apenas o hash e pode desconectar o aparelho.

Não há segredos neste repositório: só HTML/CSS/JS, ícones e o service worker.
Os arquivos são gerados a partir do código do Apps Script (repositório privado) por `build_pages.js`.

Instalar no iPhone: abra https://kaioaraujoroncon.github.io/jarvis-app/ no Safari > Compartilhar > Adicionar à Tela de Início.
Abra pelo ícone, digite o código de pareamento e toque em "Ativar" para receber os avisos.
