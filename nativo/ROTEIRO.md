# Jarvis nativo — roteiro

## Arquitetura alvo
App iOS (Capacitor, empacota o app web atual) → Supabase (Postgres + Auth + Storage + Edge Functions) → "cérebro" Claude (tarefa agendada que lê `respostas` não processadas) → Notion/Agenda.
A planilha passa a ser só importação/exportação. O Apps Script fica só até a migração terminar.

## Fases
1. **Base de dados (Supabase)** — rodar `supabase/schema.sql`; importar Itens/Respostas/Bots da planilha; login com e-mail + "Entrar com Apple".
2. **App fala com o Supabase** — trocar `CentralAPI` (hoje Apps Script) por supabase-js, mantendo as telas. Modo offline com cache local.
3. **Casca nativa (Mac + Xcode)** — `npm i`, `npm run ios:add`, `npm run ios:sync`, `npm run ios:abrir`. Face ID nativo (abre direto, sem toque), áudio liberado, ícone e tela cheia corretos, push (APNs).
4. **Voz** — voz própria do app (ElevenLabs), falas pré-geradas guardadas no Storage e baixadas no app (some o atraso); botão de conversar por voz.
5. **Cérebro Claude** — migração dos bots do Grok (19/11): rotinas, XP, sincronização com Notion.
6. **App Store** — política de privacidade, exclusão de conta dentro do app, capturas de tela, TestFlight, envio. Mesma conta Apple do Smash Point.

## O que o Kaio precisa fazer (só ele pode)
- Mac com Xcode (+ conta Apple Developer já existente).
- Supabase: criar o projeto "jarvis", me passar a URL e a chave **anon** (a chave service_role NUNCA no app e nunca no chat).
- Conectar o conector do Supabase no Claude para eu criar tabelas direto.
- Apple: ativar "Sign in with Apple" no identificador `br.com.kaioaraujo.jarvis`.

## Decisões em aberto
- Nome final e ícone do app; voz definitiva; Mariana vira o quê (renomear).
