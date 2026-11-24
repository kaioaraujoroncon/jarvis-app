# Campus 3D do Jarvis

Endereço: https://kaioaraujoroncon.github.io/jarvis-app/campus/

- `index.html` + `app.js` (gerado) + `logo.png` são o que vai ao ar.
- `src.js` é o código-fonte. Para gerar o `app.js` de novo:
  `npm i three@0.170.0 @supabase/supabase-js@2.45.4 esbuild@0.24.0 && npx esbuild src.js --bundle --minify --format=iife --target=es2019,safari14 --outfile=app.js`
- Sem login (ou sem acesso ao banco) abre em modo demonstração.
- Com login (código por e-mail) lê escritórios, bots, tarefas e XP do Supabase e usa as funções
  `campus_confirmar_item` e `campus_criar_agente`.
- O service worker do app principal ignora esta pasta de propósito.
