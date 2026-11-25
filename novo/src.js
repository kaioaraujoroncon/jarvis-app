import { createClient } from '@supabase/supabase-js';

const SBURL = 'https://qydpjcudcnirhybwlnhs.supabase.co';
const SBKEY = 'sb_publishable_41C_vG_CaaYvwiNhyGb88A_yQgSwqC1';
const sb = createClient(SBURL, SBKEY, { auth: { persistSession: true, storageKey: 'jarvis.sb', autoRefreshToken: true } });

const $ = (s) => document.querySelector(s);
const main = $('#main'), nav = $('#nav');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const SIT = { atrasado: { c: 'var(--la)', bg: 'var(--laBg)', n: 'atrasada' }, chegando: { c: 'var(--wa)', bg: 'var(--waBg)', n: 'vence logo' }, no_prazo: { c: 'var(--ok)', bg: 'var(--okBg)', n: 'no prazo' } };
const ORD = { atrasado: 0, chegando: 1, no_prazo: 2 };
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const BACK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';

const S = { tab: 'hoje', office: 'todos', esc: [], bots: [], itens: [], xp: 0, msgs: [], chat: null, day: null, user: null, ch: null };

function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toast.k); toast.k = setTimeout(() => el.classList.remove('show'), 1600); }
const nivel = (xp) => Math.floor(xp / 100) + 1;
const hojeISO = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const fmtData = (iso) => { if (!iso) return 'sem data'; const [y, m, d] = iso.split('-'); return `${d}/${m}`; };
function diasAte(iso) { if (!iso) return null; const a = new Date(iso + 'T12:00:00'), b = new Date(hojeISO() + 'T12:00:00'); return Math.round((a - b) / 864e5); }
function quando(it) { const d = diasAte(it.prazo); if (d === null) return 'sem prazo'; if (d < -1) return `atrasada há ${-d} dias`; if (d === -1) return 'venceu ontem'; if (d === 0) return 'vence hoje'; if (d === 1) return 'vence amanhã'; return `vence em ${d} dias · ${fmtData(it.prazo)}`; }
const botDe = (id) => S.bots.find((b) => b.id === id);
const escDe = (id) => S.esc.find((e) => e.id === id);
const filtroEsc = (x) => S.office === 'todos' || x.escritorio_id === S.office;

/* ---------- dados ---------- */
async function carregar() {
  const [e, b, i, x] = await Promise.all([
    sb.from('escritorios').select('id,nome,emoji,ordem').order('ordem'),
    sb.from('bots').select('id,nome,emoji,tipo,sala,missao,escritorio_id').eq('ativo', true).order('nome'),
    sb.from('itens_situacao').select('id,bot_id,titulo,prazo,xp,situacao,status,escritorio_id,bot_nome,bot_emoji').eq('ativo', true).in('situacao', ['atrasado', 'chegando', 'no_prazo']),
    sb.from('xp_eventos').select('pontos'),
  ]);
  for (const r of [e, b, i, x]) if (r.error) throw r.error;
  S.esc = e.data; S.bots = b.data;
  S.itens = i.data.filter((t) => !['fechado', 'respondido'].includes(t.status));
  S.xp = x.data.reduce((s, r) => s + (r.pontos || 0), 0);
}
async function carregarMsgs() {
  const r = await sb.from('conversa_mensagens').select('id,bot_id,autor,texto,status,criado_em').order('criado_em', { ascending: false }).limit(400);
  if (!r.error) S.msgs = r.data.reverse();
}
function ouvirMsgs() {
  if (S.ch) return;
  S.ch = sb.channel('conversas').on('postgres_changes', { event: '*', schema: 'public', table: 'conversa_mensagens' }, (p) => {
    const n = p.new; if (!n || !n.id) return;
    const k = S.msgs.findIndex((m) => m.id === n.id); if (k >= 0) S.msgs[k] = n; else S.msgs.push(n);
    if (S.tab === 'conversas') render();
  }).subscribe();
}

/* ---------- telas ---------- */
function chipsEsc() {
  return `<div class="chips" role="group" aria-label="Escritório">${[{ id: 'todos', nome: 'Tudo' }, ...S.esc].map((e) => `<button class="chip ${S.office === e.id ? 'on' : ''}" data-office="${esc(e.id)}">${esc(e.nome)}</button>`).join('')}</div>`;
}
function linhaItem(it) {
  const s = SIT[it.situacao] || SIT.no_prazo, b = botDe(it.bot_id);
  return `<div class="row"><div class="av" style="background:${s.bg}">${esc(b?.emoji || it.bot_emoji || '•')}</div>
    <div class="grow"><div class="t">${esc(it.titulo || 'Sem título')}</div><div class="m" style="color:${s.c}">${esc((b?.nome || it.bot_nome || '') + ' · ' + quando(it))}</div></div>
    <button class="ck" data-ok="${esc(it.id)}" aria-label="Confirmar feito: ${esc(it.titulo)}">${CHECK}</button></div>`;
}
function telaHoje() {
  const its = S.itens.filter(filtroEsc).sort((a, b) => ORD[a.situacao] - ORD[b.situacao] || String(a.prazo || '9').localeCompare(String(b.prazo || '9')));
  const n = (k) => its.filter((t) => t.situacao === k).length, la = n('atrasado'), wa = n('chegando'), ok = n('no_prazo');
  const h = new Date().getHours(), saud = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  const nomeBot = (k) => { const c = {}; its.filter((t) => t.situacao === k).forEach((t) => { const b = botDe(t.bot_id); if (b) c[b.nome] = (c[b.nome] || 0) + 1; }); return Object.keys(c).sort((a, b) => c[b] - c[a])[0]; };
  let frase = la ? (la === 1 ? `Uma coisa atrasou${nomeBot('atrasado') ? ', com ' + nomeBot('atrasado') : ''}.` : `${la} coisas atrasaram${nomeBot('atrasado') ? ', a maior parte com ' + nomeBot('atrasado') : ''}.`) : 'Nada atrasado.';
  frase += wa ? ` ${wa} ${wa === 1 ? 'vence' : 'vencem'} nos próximos dias.` : ' Nada vencendo nos próximos dias.';
  const data = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  return `<div class="top"><span class="small muted" style="font-weight:600">${esc(data.charAt(0).toUpperCase() + data.slice(1))}</span><span class="pill">Nível ${nivel(S.xp)} · ${S.xp} XP</span></div>
  <h1>${saud}, Kaio.</h1><p class="say">${esc(frase)}</p>
  ${chipsEsc()}
  <div class="stats"><div class="stat"><b style="color:var(--la)">${la}</b><span>atrasadas</span></div><div class="stat"><b style="color:var(--wa)">${wa}</b><span>vencem logo</span></div><div class="stat"><b style="color:var(--ok)">${ok}</b><span>no prazo</span></div></div>
  <div class="secth"><h2>Pede você agora</h2><a href="#agenda" data-go="agenda" class="small" style="font-weight:700">Ver agenda</a></div>
  ${its.slice(0, 5).map(linhaItem).join('') || '<div class="empty">Tudo em dia por aqui.</div>'}
  <a class="campus" href="../campus/"><img src="campus.jpg" alt="Campus da escola visto de cima"><div><span><b style="display:block;font-size:14px">Entrar no escritório</b><span style="font-size:12px;color:#C9C7C1">${S.bots.length} na equipe</span></span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div></a>`;
}
function telaAgenda() {
  const hoje = hojeISO(); if (!S.day) S.day = hoje;
  const base = new Date(hoje + 'T12:00:00'); const dow = (base.getDay() + 6) % 7; base.setDate(base.getDate() - dow);
  const dias = [...Array(7)].map((_, i) => { const d = new Date(base); d.setDate(d.getDate() + i); return d.toISOString().slice(0, 10); });
  const its = S.itens.filter(filtroEsc);
  const cor = (iso) => { const l = its.filter((t) => t.prazo === iso); if (!l.length) return 'transparent'; return l.some((t) => t.situacao === 'atrasado') ? 'var(--la)' : l.some((t) => t.situacao === 'chegando') ? 'var(--wa)' : 'var(--ok)'; };
  const W = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
  const doDia = its.filter((t) => t.prazo === S.day);
  const atras = S.day === hoje ? its.filter((t) => t.prazo && t.prazo < hoje) : [];
  const semData = S.day === hoje ? its.filter((t) => !t.prazo) : [];
  return `<div class="top"><h1>Agenda</h1></div>${chipsEsc()}
  <div class="week">${dias.map((d, i) => `<button class="day ${d === S.day ? 'on' : ''}" data-day="${d}"><small>${W[i]}</small><b>${+d.slice(8)}</b><span class="dot" style="background:${cor(d)}"></span></button>`).join('')}</div>
  ${atras.length ? `<div class="secth"><h2>Ficou para trás</h2></div>${atras.map(linhaItem).join('')}` : ''}
  <div class="secth"><h2>${S.day === hoje ? 'Hoje' : esc(fmtData(S.day))}</h2></div>
  ${doDia.map(linhaItem).join('') || '<div class="empty">Nenhum prazo neste dia.</div>'}
  ${semData.length ? `<div class="secth"><h2>Sem data</h2></div>${semData.map(linhaItem).join('')}` : ''}
  <p class="small muted" style="margin-top:18px">Prazos das tarefas dos bots e do Notion. Os eventos do Google Agenda entram na próxima etapa.</p>`;
}
function ultima(botId) { for (let i = S.msgs.length - 1; i >= 0; i--) if (S.msgs[i].bot_id === botId) return S.msgs[i]; return null; }
function telaConversas() {
  if (S.chat) return telaChat();
  const bots = S.bots.filter(filtroEsc).map((b) => ({ b, u: ultima(b.id) })).sort((x, y) => (y.u?.criado_em || '').localeCompare(x.u?.criado_em || ''));
  return `<div class="top"><h1>Conversas</h1></div>${chipsEsc()}
  ${bots.map(({ b, u }) => { const n = S.itens.filter((t) => t.bot_id === b.id && t.situacao === 'atrasado').length;
    return `<button class="row" data-chat="${esc(b.id)}" style="width:100%;border-left:0;border-right:0;border-bottom:0;background:none;text-align:left">
      <div class="av">${esc(b.emoji || '🤖')}</div><div class="grow"><div class="t">${esc(b.nome)}</div><div class="m muted" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(u ? (u.autor === 'kaio' ? 'Você: ' : '') + u.texto : (b.missao || escDe(b.escritorio_id)?.nome || ''))}</div></div>
      ${n ? `<span class="m" style="color:var(--la)">${n} atrasada${n > 1 ? 's' : ''}</span>` : ''}</button>`; }).join('') || '<div class="empty">Nenhum bot neste escritório.</div>'}`;
}
function telaChat() {
  const b = botDe(S.chat); if (!b) { S.chat = null; return telaConversas(); }
  const ms = S.msgs.filter((m) => m.bot_id === b.id);
  const ult = ms[ms.length - 1], esperando = ult && ult.autor === 'kaio' && ['pendente', 'lendo'].includes(ult.status);
  const velho = esperando && Date.now() - new Date(ult.criado_em).getTime() > 3 * 60e3;
  const tarefas = S.itens.filter((t) => t.bot_id === b.id).sort((x, y) => ORD[x.situacao] - ORD[y.situacao]);
  return `<div class="top" style="justify-content:flex-start;gap:8px"><button class="back" data-back aria-label="Voltar">${BACK}</button><div class="av">${esc(b.emoji || '🤖')}</div>
    <div class="grow"><div style="font-weight:800">${esc(b.nome)}</div><div class="m muted">${esc([b.missao, escDe(b.escritorio_id)?.nome].filter(Boolean).join(' · '))}</div></div></div>
  ${tarefas.length ? `<details style="margin-bottom:6px"><summary class="small" style="font-weight:700;cursor:pointer">${tarefas.length} tarefa${tarefas.length > 1 ? 's' : ''} aberta${tarefas.length > 1 ? 's' : ''}</summary>${tarefas.map(linhaItem).join('')}</details>` : ''}
  <div class="chat" id="chat">${ms.map((m) => `<div class="b ${m.autor === 'kaio' ? 'me' : 'bot'}">${esc(m.texto)}</div>`).join('') || `<div class="empty">Mande a primeira mensagem para ${esc(b.nome)}.</div>`}
  ${esperando ? `<div class="b wait">${velho ? 'Ainda sem resposta. O OpenBot responde quando o computador estiver ligado.' : esc(b.nome) + ' está lendo…'}</div>` : ''}</div>
  <div class="composer"><form id="send"><label style="flex:1;display:flex"><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Mensagem</span><input id="msg" maxlength="4000" autocomplete="off" placeholder="Escreva para ${esc(b.nome)}"></label><button class="btn ac" type="submit">Enviar</button></form></div>`;
}
function telaVoce() {
  const lv = nivel(S.xp), pct = S.xp % 100;
  return `<div class="top"><h1>Você</h1></div>
  <div class="stat" style="margin-top:6px"><span>Nível</span><b>${lv}</b><div class="m muted" style="margin:6px 0">${S.xp} XP · faltam ${lv * 100 - S.xp} para o nível ${lv + 1}</div>
  <div style="height:8px;border-radius:8px;background:var(--line);overflow:hidden"><div style="height:100%;width:${pct}%;background:var(--ac)"></div></div></div>
  <p class="small muted" style="margin-top:12px">XP só entra quando uma tarefa é confirmada. Começou com 220 de saldo.</p>
  <div class="secth"><h2>Conta</h2></div>
  <div class="row"><div class="grow"><div class="t">${esc(S.user?.email || '')}</div><div class="m muted">${S.esc.length} escritórios · ${S.bots.length} na equipe</div></div></div>
  <div class="row"><a class="grow" href="../index.html" style="font-weight:700">Abrir o app atual</a></div>
  <div class="row"><button class="grow" data-sair style="text-align:left;border:0;background:none;font-weight:700;color:var(--la);padding:0;min-height:44px">Sair</button></div>
  <p class="small muted" style="margin-top:24px">Jarvis · versão nova (teste)</p>`;
}
function telaLogin(msg = '') {
  nav.hidden = true;
  main.innerHTML = `<h1 style="margin-top:40px">Jarvis</h1><p class="say">Sua agenda inteligente, com o escritório para jogar.</p>
  <form class="form" id="lf"><label>E-mail<input id="le" type="email" inputmode="email" autocomplete="email" required></label><button class="btn" type="submit">Receber código</button><div class="err" id="lerr">${esc(msg)}</div></form>`;
  $('#lf').onsubmit = async (e) => { e.preventDefault(); const email = $('#le').value.trim(); $('#lerr').textContent = 'Enviando…';
    const r = await sb.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
    if (r.error) { $('#lerr').textContent = 'Não deu: ' + r.error.message; return; }
    main.innerHTML = `<h1 style="margin-top:40px">Digite o código</h1><p class="say">Mandamos para ${esc(email)}.</p><form class="form" id="cf"><label>Código<input id="cc" inputmode="numeric" autocomplete="one-time-code" maxlength="10" required></label><button class="btn" type="submit">Entrar</button><div class="err" id="cerr"></div></form>`;
    $('#cf').onsubmit = async (e2) => { e2.preventDefault(); $('#cerr').textContent = 'Conferindo…';
      const v = await sb.auth.verifyOtp({ email, token: $('#cc').value.replace(/\s/g, ''), type: 'email' });
      if (v.error) { $('#cerr').textContent = 'Código não confere: ' + v.error.message; return; }
      iniciar(v.data.session); }; };
}

/* ---------- render e eventos ---------- */
function render() {
  nav.hidden = false;
  nav.querySelectorAll('[data-tab]').forEach((b) => b.classList.toggle('on', b.dataset.tab === S.tab));
  nav.style.display = S.tab === 'conversas' && S.chat ? 'none' : '';
  main.innerHTML = { hoje: telaHoje, agenda: telaAgenda, conversas: telaConversas, voce: telaVoce }[S.tab]();
  const c = $('#chat'); if (c) scrollTo(0, document.body.scrollHeight);
  const f = $('#send'); if (f) f.onsubmit = enviar;
}
async function enviar(e) {
  e.preventDefault(); const inp = $('#msg'), texto = inp.value.trim(); if (!texto) return;
  inp.value = ''; const tmp = { id: 'tmp' + Date.now(), bot_id: S.chat, autor: 'kaio', texto, status: 'pendente', criado_em: new Date().toISOString() };
  S.msgs.push(tmp); render();
  const r = await sb.from('conversa_mensagens').insert({ user_id: S.user.id, bot_id: S.chat, autor: 'kaio', texto }).select('id,bot_id,autor,texto,status,criado_em').single();
  const k = S.msgs.indexOf(tmp);
  if (r.error) { S.msgs.splice(k, 1); toast('Não enviou'); $('#msg') && ($('#msg').value = texto); render(); return; }
  if (S.msgs.some((m) => m.id === r.data.id)) S.msgs.splice(k, 1); else S.msgs[k] = r.data; render();
}
async function confirmar(id, btn) {
  btn.disabled = true; btn.classList.add('done'); btn.style.color = '#fff';
  const r = await sb.rpc('campus_confirmar_item', { p_item: id, p_obs: 'confirmado no app novo' });
  if (r.error) { btn.disabled = false; btn.classList.remove('done'); btn.style.color = ''; toast('Não salvou'); return; }
  const antes = S.xp; S.xp = r.data?.xp_total ?? S.xp; S.itens = S.itens.filter((t) => t.id !== id);
  toast(nivel(S.xp) > nivel(antes) ? `Nível ${nivel(S.xp)}!` : S.xp > antes ? `+${S.xp - antes} XP` : 'Confirmado');
  setTimeout(render, 450);
}
document.addEventListener('click', (e) => {
  const t = e.target.closest('button,a'); if (!t) return;
  if (t.dataset.tab) { if (t.dataset.tab === 'escritorio') { location.href = '../campus/'; return; } S.tab = t.dataset.tab; S.chat = null; history.replaceState(null, '', '#' + S.tab); render(); scrollTo(0, 0); }
  else if (t.dataset.go) { e.preventDefault(); S.tab = t.dataset.go; render(); scrollTo(0, 0); }
  else if (t.dataset.office) { S.office = t.dataset.office; render(); }
  else if (t.dataset.day) { S.day = t.dataset.day; render(); }
  else if (t.dataset.ok) confirmar(t.dataset.ok, t);
  else if (t.dataset.chat !== undefined) { S.chat = t.dataset.chat; render(); }
  else if (t.dataset.back !== undefined) { S.chat = null; render(); }
  else if (t.dataset.sair !== undefined) { sb.auth.signOut().then(() => telaLogin()); }
});
async function iniciar(sess) {
  S.user = sess.user; main.innerHTML = '<p class="muted">Carregando seus dados…</p>';
  try { await Promise.all([carregar(), carregarMsgs()]); }
  catch (err) { main.innerHTML = `<h1>Ops</h1><p class="say">Não consegui ler o banco agora.</p><p class="err">${esc(err.message || err)}</p><button class="btn" onclick="location.reload()">Tentar de novo</button>`; return; }
  const h = location.hash.slice(1); if (['hoje', 'agenda', 'conversas', 'voce'].includes(h)) S.tab = h;
  render(); ouvirMsgs();
  setInterval(() => { if (document.visibilityState === 'visible' && !(S.tab === 'conversas' && S.chat)) carregar().then(render).catch(() => {}); }, 120000);
}
sb.auth.getSession().then(({ data }) => data.session ? iniciar(data.session) : telaLogin()).catch(() => telaLogin('Sem conexão com o banco.'));
