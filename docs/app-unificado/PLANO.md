# Jarvis — app unificado (aprovado em 24/11/2026)

Proposta visual: https://claude.ai/artifact/Cpyew6VtY6ssF98VFRWRck (4 telas: Hoje, Agenda, Escritório, Conversa).
Os arquivos `.dc.html` desta pasta são a cópia de segurança dessas telas.

## Ideia
- O app é uma agenda inteligente, calma e minimalista. O jogo (Campus 3D, em `/campus`) é o lugar para onde você vai pelo botão do meio.
- Visual: fundo claro quente #F6F5F1, texto #121212, destaque azul #2F5BFF, status vermelho #C8372A / âmbar #A86A00 / verde #1B7F52, fonte Plus Jakarta Sans.
- Abas: Hoje · Agenda · Escritório (centro) · Conversas · Você.

## Fases
1. Novo app numa pasta separada (`/novo`), lendo o mesmo Supabase. O app atual segue intacto até a troca.
2. Conversas: tabela de mensagens no Supabase; o OpenBot (Claude no PC) responde como cada bot.
3. Agenda Google + Notion na aba Agenda.
4. Juntar no app do iPhone (Capacitor) e trocar a tela inicial.
5. Respostas sem depender do PC: função no servidor (Supabase Edge Function) com chave de API.

## Regras
- XP só por trabalho confirmado com evidência (saldo inicial 220).
- Backup antes de cada troca grande (ramo `backup-...`).
