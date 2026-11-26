/* Jarvis · "Meu dia" — mesma tela no app unificado (/novo) e no campus 3D (/campus).
   Agenda Google + Notion + tarefas que andam de setor em setor (tarefas / tarefa_passos). */

const CSS = `
.md-ov{position:fixed;inset:0;z-index:60;background:rgba(10,10,10,.35);display:flex;justify-content:center;align-items:flex-end;font:15px/1.45 "Plus Jakarta Sans",system-ui,-apple-system,sans-serif;color:#121212}
.md-ov[hidden]{display:none}
.md-sh{background:#F6F5F1;width:100%;max-width:560px;height:min(94vh,94dvh);border-radius:22px 22px 0 0;display:flex;flex-direction:column;box-shadow:0 -10px 40px rgba(0,0,0,.25)}
@media(min-width:760px){.md-ov{align-items:center}.md-sh{border-radius:22px;height:min(88vh,860px)}}
.md-hd{display:flex;align-items:center;gap:8px;padding:14px 14px 10px;border-bottom:1px solid #E4E2DC}
.md-hd h2{margin:0;font-size:20px;font-weight:800;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.md-ib{width:44px;height:44px;border-radius:12px;border:0;background:none;display:grid;place-items:center;font-size:22px;color:#121212;cursor:pointer;flex:none}
.md-bd{flex:1;overflow:auto;padding:6px 16px calc(24px + env(safe-area-inset-bottom));-webkit-overflow-scrolling:touch}
.md-sec{display:flex;justify-content:space-between;align-items:baseline;margin:18px 0 4px}
.md-sec h3{margin:0;font-size:14px;font-weight:800}
.md-sec span{font-size:12.5px;font-weight:600;color:#55534F}
.md-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid #E4E2DC}
.md-row:first-of-type{border-top:0}
.md-op{flex:1;min-width:0;border:0;background:none;text-align:left;padding:4px 0;cursor:pointer;color:inherit;font:inherit}
.md-t{font-size:15px;font-weight:650;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.md-t.done{text-decoration:line-through;color:#6B6A66}
.md-m{font-size:12.5px;font-weight:600;color:#55534F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.md-h{width:46px;flex:none;font-size:13px;font-weight:800;color:#55534F}
.md-ck{width:40px;height:40px;border-radius:50%;border:2px solid #C9C6BE;background:#fff;display:grid;place-items:center;flex:none;cursor:pointer;color:#fff;padding:0}
.md-ck.on{background:#1B7F52;border-color:#1B7F52}
.md-ck svg{width:18px;height:18px}
.md-tag{display:inline-block;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:#E8EEFF;color:#2443B8;margin-left:4px;vertical-align:1px}
.md-tag.ok{background:#E3F2EA;color:#1B7F52}.md-tag.la{background:#FBE3DF;color:#C8372A}.md-tag.wa{background:#FFF1CC;color:#7A4D00}
.md-chips{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.md-chip{border:1px solid #E4E2DC;background:#fff;border-radius:999px;padding:7px 12px;font-size:13px;font-weight:700;min-height:38px;cursor:pointer;color:#121212;font-family:inherit}
.md-chip.on{background:#121212;color:#F6F5F1;border-color:#121212}
.md-chip b{font-weight:800;margin-left:4px;color:#2F5BFF}.md-chip.on b{color:#9db0ff}
.md-add{display:flex;gap:8px;margin:12px 0 4px}
.md-in,.md-ta{width:100%;font:inherit;font-size:16px;padding:12px 14px;border-radius:14px;border:1px solid #E4E2DC;background:#fff;color:#121212;box-sizing:border-box}
.md-ta{min-height:96px;resize:vertical}
.md-btn{border:0;border-radius:14px;background:#121212;color:#F6F5F1;font:inherit;font-weight:800;padding:0 16px;min-height:48px;cursor:pointer;white-space:nowrap}
.md-btn.ac{background:#2F5BFF;color:#fff}.md-btn.ok{background:#1B7F52;color:#fff}.md-btn.gh{background:#fff;color:#121212;border:1px solid #E4E2DC}
.md-btn:disabled{opacity:.5}
.md-tabs{display:grid;grid-template-columns:1fr 1fr;gap:4px;background:#ECEAE4;border-radius:14px;padding:4px;margin:14px 0 10px}
.md-tabs button{border:0;border-radius:11px;background:none;min-height:40px;font:inherit;font-weight:800;font-size:14px;color:#55534F;cursor:pointer}
.md-tabs button.on{background:#fff;color:#121212;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.md-meta{font-size:13px;font-weight:600;color:#55534F;margin-top:4px}
.md-big{font-size:22px;font-weight:800;line-height:1.2;margin:14px 0 0}
.md-desc{white-space:pre-wrap;font-size:14px;color:#3A3936;background:#fff;border:1px solid #E4E2DC;border-radius:14px;padding:10px 12px;margin-top:10px;max-height:160px;overflow:auto}
.md-tl{list-style:none;margin:6px 0 0;padding:0 0 0 14px;border-left:2px solid #E4E2DC}
.md-tl li{position:relative;padding:0 0 12px 10px;font-size:14px}
.md-tl li:before{content:"";position:absolute;left:-20px;top:5px;width:10px;height:10px;border-radius:50%;background:#2F5BFF}
.md-tl li.f:before{background:#1B7F52}.md-tl li.n:before{background:#A86A00}
.md-tl small{display:block;font-size:12px;color:#6B6A66;font-weight:600}
.md-empty{padding:14px 0;color:#55534F;font-size:14px}
.md-grp{font-size:12px;font-weight:800;color:#6B6A66;margin:10px 0 0;text-transform:uppercase;letter-spacing:.04em}
.md-toast{position:fixed;left:50%;top:calc(14px + env(safe-area-inset-top));transform:translateX(-50%);background:#121212;color:#F6F5F1;padding:10px 16px;border-radius:999px;font-weight:700;font-size:14px;z-index:70;pointer-events:none}
.md-err{color:#C8372A;font-size:13px;font-weight:700;margin-top:6px}
.md-ov :focus-visible{outline:3px solid #2F5BFF;outline-offset:2px}
`;
const CK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isoLocal = (d) => { const x = new Date(d); x.setMinutes(x.getMinutes() - x.getTimezoneOffset()); return x.toISOString().slice(0, 10); };
const hojeISO = () => isoLocal(new Date());
const addDias = (iso, n) => { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return isoLocal(d); };
const hhmm = (ts) => new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
const limpa = (t) => String(t || '').replace(/^[⏱✅💸]\s*/u, '');
function ha(ts) { const m = Math.round((Date.now() - new Date(ts)) / 6e4); if (m < 1) return 'agora'; if (m < 60) return `há ${m} min`; const h = Math.round(m / 60); if (h < 24) return `há ${h} h`; const d = Math.round(h / 24); return d === 1 ? 'ontem' : `há ${d} dias`; }
function quando(prazo) { if (!prazo) return 'sem prazo'; const d = Math.round((new Date(prazo + 'T12:00:00') - new Date(hojeISO() + 'T12:00:00')) / 864e5); if (d < -1) return `atrasada há ${-d} dias`; if (d === -1) return 'venceu ontem'; if (d === 0) return 'vence hoje'; if (d === 1) return 'vence amanhã'; return `vence ${prazo.slice(8)}/${prazo.slice(5, 7)}`; }
const SIT = { atrasado: 'la', chegando: 'wa', no_prazo: 'ok' };

export function criarMeuDia(sb, opts = {}) {
  if (!document.getElementById('md-css')) { const st = document.createElement('style'); st.id = 'md-css'; st.textContent = CSS; document.head.appendChild(st); }
  const ov = document.createElement('div'); ov.className = 'md-ov'; ov.hidden = true;
  ov.innerHTML = '<div class="md-sh" role="dialog" aria-modal="true" aria-labelledby="md-tt"><div class="md-hd" id="md-hd"></div><div class="md-bd" id="md-bd"></div></div>';
  document.body.appendChild(ov);
  const hd = ov.querySelector('#md-hd'), bd = ov.querySelector('#md-bd');
  ov.addEventListener('click', (e) => { if (e.target === ov) fechar(); });
  document.addEventListener('keydown', (e) => { if (!ov.hidden && e.key === 'Escape') voltar(); });
  ['keydown', 'keyup', 'keypress', 'pointerdown', 'touchstart', 'wheel'].forEach((k) => ov.addEventListener(k, (e) => e.stopPropagation(), { passive: true }));

  const D = { dia: hojeISO(), ev: [], reg: {}, itens: [], tarefas: [], feitas: [], bots: [], esc: [], stack: [], aba: 'aconteceu', para: undefined, userId: null };
  const bot = (id) => D.bots.find((b) => b.id === id);
  const nomeSetor = (id) => id ? (bot(id)?.nome || 'Setor') : 'Você';
  const emoSetor = (id) => id ? (bot(id)?.emoji || '🤖') : '🙋';
  const tarefaDe = (origem, oid) => D.tarefas.find((t) => t.origem === origem && t.origem_id === oid);
  function toast(t) { const el = document.createElement('div'); el.className = 'md-toast'; el.textContent = t; document.body.appendChild(el); setTimeout(() => el.remove(), 1700); }

  // setores: um por nome dentro de cada escritório (há vários "Jarvis" antigos)
  function setores() { const seen = {}, out = []; for (const b of D.bots) { const k = b.escritorio_id + '|' + b.nome; if (seen[k]) continue; seen[k] = 1; out.push(b); } return out; }
  const idsMesmo = (id) => { const b = bot(id); if (!b) return [id]; return D.bots.filter((x) => x.escritorio_id === b.escritorio_id && x.nome === b.nome).map((x) => x.id); };

  async function carregar() {
    const ini = new Date(D.dia + 'T00:00:00'), fim = new Date(D.dia + 'T00:00:00'); fim.setDate(fim.getDate() + 1);
    const semana = new Date(); semana.setDate(semana.getDate() - 7);
    const [u, ev, it, ta, tf, bs, es] = await Promise.all([
      sb.auth.getUser(),
      sb.from('agenda_eventos').select('id,calendario,titulo,descricao,inicio,fim,dia_inteiro,recorrente,local').gte('inicio', ini.toISOString()).lt('inicio', fim.toISOString()).order('inicio'),
      sb.from('itens_situacao').select('id,bot_id,titulo,prazo,xp,situacao,status,escritorio_id').eq('ativo', true).neq('status', 'fechado').in('situacao', ['atrasado', 'chegando', 'no_prazo']),
      sb.from('tarefas').select('id,titulo,origem,origem_id,setor_id,status,prazo,xp,criado_em,atualizado_em,feito_em').eq('status', 'aberta').order('atualizado_em', { ascending: false }),
      sb.from('tarefas').select('id,titulo,origem,origem_id,setor_id,status,feito_em,atualizado_em').eq('status', 'feita').gte('feito_em', semana.toISOString()).order('feito_em', { ascending: false }).limit(30),
      sb.from('bots').select('id,nome,emoji,tipo,sala,escritorio_id,missao').eq('ativo', true).order('nome'),
      sb.from('escritorios').select('id,nome,ordem').order('ordem'),
    ]);
    for (const r of [ev, it, ta, tf, bs]) if (r.error) throw r.error;
    D.userId = u.data?.user?.id || null;
    D.ev = ev.data; D.itens = it.data; D.tarefas = ta.data; D.feitas = tf.data; D.bots = bs.data; D.esc = es.data || [];
    D.reg = {};
    if (D.ev.length) { const r = await sb.from('agenda_registros').select('evento_id,feito,relato').in('evento_id', D.ev.map((e) => e.id)); (r.data || []).forEach((x) => { D.reg[x.evento_id] = x; }); }
    opts.onChange?.(contagem());
  }
  function contagem() { const hj = hojeISO(); const evAbertos = D.dia === hj ? D.ev.filter((e) => !D.reg[e.id]?.feito).length : 0; return { agenda: evAbertos, tarefas: D.tarefas.length, notion: D.itens.filter((i) => i.prazo && i.prazo <= hj).length }; }

  /* ---------- telas ---------- */
  function cab(titulo, { back = false, sub = '' } = {}) {
    hd.innerHTML = `${back ? '<button class="md-ib" data-md="voltar" aria-label="Voltar">‹</button>' : ''}<h2 id="md-tt">${esc(titulo)}${sub ? `<div class="md-m" style="font-size:12.5px">${esc(sub)}</div>` : ''}</h2><button class="md-ib" data-md="fechar" aria-label="Fechar">×</button>`;
  }
  function linhaEv(e) {
    const r = D.reg[e.id] || {}, t = tarefaDe('agenda', e.id);
    const tags = (t ? `<span class="md-tag">→ ${esc(nomeSetor(t.setor_id))}</span>` : '') + (r.relato ? '<span class="md-tag wa">anotado</span>' : '');
    return `<div class="md-row"><button class="md-ck ${r.feito ? 'on' : ''}" data-md="ckev" data-id="${esc(e.id)}" aria-pressed="${!!r.feito}" aria-label="Aconteceu: ${esc(limpa(e.titulo))}">${CK}</button>
      <div class="md-h">${e.dia_inteiro ? 'dia' : esc(hhmm(e.inicio))}</div>
      <button class="md-op" data-md="abrir" data-k="ev" data-id="${esc(e.id)}"><div class="md-t ${r.feito ? 'done' : ''}">${esc(limpa(e.titulo))}${tags}</div><div class="md-m">${/prosperi/i.test(e.calendario) ? 'Agenda da escola' : 'Sua agenda'}${e.local ? ' · ' + esc(e.local) : ''}</div></button></div>`;
  }
  function linhaItem(i) {
    const b = bot(i.bot_id), t = tarefaDe('notion', i.id);
    return `<div class="md-row"><button class="md-ck" data-md="ckit" data-id="${esc(i.id)}" aria-label="Feito: ${esc(i.titulo)}">${CK}</button>
      <button class="md-op" data-md="abrir" data-k="it" data-id="${esc(i.id)}"><div class="md-t">${esc(i.titulo || 'Sem título')}${t ? `<span class="md-tag">→ ${esc(nomeSetor(t.setor_id))}</span>` : ''}</div><div class="md-m"><span class="md-tag ${SIT[i.situacao] || 'ok'}" style="margin:0 4px 0 0">${esc(quando(i.prazo))}</span>${esc(b ? b.emoji + ' ' + b.nome : 'Notion')}${i.status === 'respondido' ? ' · em andamento' : ''}</div></button></div>`;
  }
  function linhaTarefa(t, feita = false) {
    return `<div class="md-row"><button class="md-ck ${feita ? 'on' : ''}" data-md="cktf" data-id="${t.id}" ${feita ? 'disabled' : ''} aria-label="Resolvida: ${esc(t.titulo)}">${CK}</button>
      <button class="md-op" data-md="abrir" data-k="tf" data-id="${t.id}"><div class="md-t ${feita ? 'done' : ''}">${esc(t.titulo)}</div><div class="md-m">${esc(emoSetor(t.setor_id) + ' ' + nomeSetor(t.setor_id))} · ${feita ? 'resolvida ' + ha(t.feito_em) : 'mexida ' + ha(t.atualizado_em)}${t.origem === 'agenda' ? ' · da agenda' : t.origem === 'notion' ? ' · do Notion' : ''}</div></button></div>`;
  }
  function telaLista() {
    const hj = hojeISO(), ehHoje = D.dia === hj;
    const dt = new Date(D.dia + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    cab('Meu dia', { sub: dt.charAt(0).toUpperCase() + dt.slice(1) });
    const itensDia = D.itens.filter((i) => ehHoje ? (i.prazo && i.prazo <= hj) : i.prazo === D.dia).sort((a, b) => String(a.prazo).localeCompare(String(b.prazo)));
    const porSetor = {}; D.tarefas.forEach((t) => { const k = t.setor_id ? (bot(t.setor_id)?.escritorio_id + '|' + nomeSetor(t.setor_id)) : 'voce'; (porSetor[k] = porSetor[k] || { id: t.setor_id, n: 0 }).n++; });
    const feitosEv = D.ev.filter((e) => D.reg[e.id]?.feito).length;
    bd.innerHTML = `
      <div class="md-chips" style="justify-content:space-between;align-items:center"><button class="md-chip" data-md="dia" data-n="-1" aria-label="Dia anterior">‹ Ontem</button>${ehHoje ? '' : '<button class="md-chip" data-md="dia" data-n="0">Hoje</button>'}<button class="md-chip" data-md="dia" data-n="1" aria-label="Próximo dia">Amanhã ›</button></div>
      <form class="md-add" data-md="novo"><label style="flex:1"><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Nova tarefa</span><input class="md-in" name="t" maxlength="300" placeholder="Anotar algo rápido (ex.: maçaneta do 6º ano)" autocomplete="off"></label><button class="md-btn ac" type="submit">Anotar</button></form>
      <div class="md-sec"><h3>Agenda</h3><span>${D.ev.length ? `${feitosEv} de ${D.ev.length} feitos` : ''}</span></div>
      ${D.ev.map(linhaEv).join('') || '<div class="md-empty">Nada na agenda neste dia.</div>'}
      <div class="md-sec"><h3>${ehHoje ? 'Notion · vence hoje ou atrasado' : 'Notion · vence neste dia'}</h3><span>${itensDia.length || ''}</span></div>
      ${itensDia.map(linhaItem).join('') || '<div class="md-empty">Nada do Notion para este dia.</div>'}
      <div class="md-sec"><h3>Com os setores</h3><span>${D.tarefas.length} abertas</span></div>
      ${Object.keys(porSetor).length ? `<div class="md-chips">${Object.values(porSetor).map((s) => `<button class="md-chip" data-md="setor" data-id="${esc(s.id || '')}">${esc(emoSetor(s.id) + ' ' + nomeSetor(s.id))}<b>${s.n}</b></button>`).join('')}</div>` : ''}
      ${D.tarefas.slice(0, 12).map((t) => linhaTarefa(t)).join('') || '<div class="md-empty">Nada direcionado ainda. Toque num compromisso e use “Direcionar”.</div>'}
      ${D.tarefas.length > 12 ? `<div class="md-empty">E mais ${D.tarefas.length - 12}: toque num setor acima.</div>` : ''}
      ${D.feitas.length ? `<div class="md-sec"><h3>Resolvidas · voltaram pra você</h3><span>últimos 7 dias</span></div>${D.feitas.slice(0, 10).map((t) => linhaTarefa(t, true)).join('')}` : ''}
      <p class="md-m" style="margin-top:22px;white-space:normal">Agenda do Google (sua e da escola) e Notion. Anote na agenda na correria; aqui você marca, escreve o que aconteceu e direciona pro setor.</p>`;
  }
  function telaSetor(id) {
    const ids = id ? idsMesmo(id) : [null];
    const ts = D.tarefas.filter((t) => ids.includes(t.setor_id));
    const its = id ? D.itens.filter((i) => ids.includes(i.bot_id)) : [];
    const b = bot(id);
    cab(`${emoSetor(id)} ${nomeSetor(id)}`, { back: true, sub: b?.missao || (id ? '' : 'Voltou para você / sem setor') });
    bd.innerHTML = `<div class="md-sec"><h3>Direcionadas</h3><span>${ts.length}</span></div>${ts.map((t) => linhaTarefa(t)).join('') || '<div class="md-empty">Nenhuma tarefa direcionada aqui.</div>'}
      ${its.length ? `<div class="md-sec"><h3>Do Notion</h3><span>${its.length}</span></div>${its.map(linhaItem).join('')}` : ''}
      ${id ? `<form class="md-add" data-md="novo" data-para="${esc(id)}" style="margin-top:18px"><input class="md-in" name="t" maxlength="300" placeholder="Nova tarefa para ${esc(nomeSetor(id))}" aria-label="Nova tarefa para ${esc(nomeSetor(id))}" autocomplete="off"><button class="md-btn ac" type="submit">Criar</button></form>` : ''}`;
  }
  function gradeSetores(atual) {
    const grupos = D.esc.length ? D.esc : [{ id: null, nome: '' }];
    const ss = setores();
    let h = `<div class="md-chips"><button class="md-chip ${D.para === null ? 'on' : ''}" data-md="para" data-id="">🙋 Você (administrativo)</button></div>`;
    for (const g of grupos) { const l = ss.filter((b) => !g.id || b.escritorio_id === g.id); if (!l.length) continue;
      h += `<div class="md-grp">${esc(g.nome)}</div><div class="md-chips">${l.map((b) => `<button class="md-chip ${D.para === b.id ? 'on' : ''}" data-md="para" data-id="${esc(b.id)}" ${idsMesmo(atual || '').includes(b.id) && atual ? 'aria-describedby="md-aqui"' : ''}>${esc((b.emoji || '🤖') + ' ' + b.nome)}${idsMesmo(atual || '').includes(b.id) && atual ? ' · aqui' : ''}</button>`).join('')}</div>`; }
    return h;
  }
  async function telaDetalhe(k, id) {
    let titulo = '', meta = '', desc = '', feito = false, t = null, it = null, ev = null;
    if (k === 'ev') { ev = D.ev.find((e) => e.id === id); if (!ev) return voltar(); titulo = limpa(ev.titulo); meta = (ev.dia_inteiro ? 'Dia todo' : hhmm(ev.inicio) + (ev.fim ? '–' + hhmm(ev.fim) : '')) + ' · ' + (/prosperi/i.test(ev.calendario) ? 'Agenda da escola' : 'Sua agenda') + (ev.local ? ' · ' + ev.local : ''); desc = ev.descricao || ''; feito = !!D.reg[id]?.feito; t = tarefaDe('agenda', id); }
    else if (k === 'it') { it = D.itens.find((i) => i.id === id); if (!it) return voltar(); titulo = it.titulo; const b = bot(it.bot_id); meta = `Notion · ${quando(it.prazo)}${b ? ' · ' + b.nome : ''}${it.status === 'respondido' ? ' · em andamento' : ''}`; t = tarefaDe('notion', id); }
    else { t = D.tarefas.find((x) => x.id === id) || D.feitas.find((x) => x.id === id); if (!t) { const r = await sb.from('tarefas').select('*').eq('id', id).maybeSingle(); t = r.data; } if (!t) return voltar(); titulo = t.titulo; feito = t.status === 'feita'; meta = `${emoSetor(t.setor_id)} Com ${nomeSetor(t.setor_id)}${t.origem === 'agenda' ? ' · veio da agenda' : t.origem === 'notion' ? ' · veio do Notion' : ''}`; }
    let passos = [];
    if (t) { const r = await sb.from('tarefa_passos').select('tipo,de_setor,para_setor,texto,criado_em').eq('tarefa_id', t.id).order('criado_em'); passos = r.data || []; }
    cab(k === 'ev' ? 'Compromisso' : k === 'it' ? 'Tarefa do Notion' : 'Tarefa', { back: true });
    const relato = k === 'ev' ? (D.reg[id]?.relato || '') : '';
    const fluxo = t ? `<div class="md-sec"><h3>Caminho</h3><span>${t.status === 'feita' ? 'resolvida' : 'com ' + esc(nomeSetor(t.setor_id))}</span></div><ul class="md-tl">${passos.map((p) => { const cl = p.tipo === 'feita' ? 'f' : p.tipo === 'nota' ? 'n' : '';
        const o = p.tipo === 'nota' ? `Nota em ${esc(nomeSetor(p.de_setor))}` : p.tipo === 'feita' ? `Resolvida${p.de_setor ? ' por ' + esc(nomeSetor(p.de_setor)) : ''}` : p.tipo === 'criada' ? 'Anotada' : `${p.tipo === 'reaberta' ? 'Reaberta → ' : '→ '}${esc(nomeSetor(p.para_setor))}`;
        return `<li class="${cl}"><b>${o}</b>${p.texto ? ` · ${esc(p.texto)}` : ''}<small>${new Date(p.criado_em).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</small></li>`; }).join('')}</ul>` : '';
    const tituloAba1 = k === 'tf' ? 'Anotar' : 'O que aconteceu';
    bd.innerHTML = `<div class="md-big">${esc(titulo)}</div><div class="md-meta">${esc(meta)}</div>${desc ? `<div class="md-desc">${esc(desc.slice(0, 1500))}</div>` : ''}
      <div style="display:flex;gap:8px;margin-top:14px">${feito
        ? `<button class="md-btn gh" style="flex:1" data-md="desfazer" data-k="${k}" data-id="${esc(id)}">${k === 'tf' ? 'Reabrir' : 'Desmarcar'}</button>`
        : `<button class="md-btn ok" style="flex:1" data-md="feito" data-k="${k}" data-id="${esc(id)}">${CK.replace('<svg', '<svg width="18" height="18" style="vertical-align:-3px;margin-right:6px"')}${k === 'ev' ? 'Aconteceu / feito' : 'Resolvido'}</button>`}</div>
      <div class="md-tabs" role="tablist"><button role="tab" aria-selected="${D.aba === 'aconteceu'}" class="${D.aba === 'aconteceu' ? 'on' : ''}" data-md="aba" data-a="aconteceu">${tituloAba1}</button><button role="tab" aria-selected="${D.aba === 'direcionar'}" class="${D.aba === 'direcionar' ? 'on' : ''}" data-md="aba" data-a="direcionar">Direcionar</button></div>
      ${D.aba === 'aconteceu'
        ? `<form data-md="salvarnota" data-k="${k}" data-id="${esc(id)}"><label class="md-m" style="display:block;margin-bottom:6px" for="md-nota">${k === 'ev' ? 'Como foi, o que ficou decidido' : k === 'it' ? 'Sua resposta (vai para o Notion)' : 'Nota para o caminho desta tarefa'}</label><textarea class="md-ta" id="md-nota" name="n" maxlength="4000">${esc(relato)}</textarea><button class="md-btn" style="width:100%;margin-top:8px" type="submit">Salvar</button></form>`
        : `<div class="md-m" style="margin-bottom:4px">Para quem vai${t ? ` · hoje está com ${esc(nomeSetor(t.setor_id))}` : ''}</div>${gradeSetores(t?.setor_id)}
           <form data-md="enviar" data-k="${k}" data-id="${esc(id)}"><label class="md-m" style="display:block;margin:10px 0 6px" for="md-instr">Instrução (opcional)</label><textarea class="md-ta" id="md-instr" name="i" maxlength="4000" placeholder="Ex.: comprar maçaneta tubular cromada, mandar foto do modelo"></textarea><button class="md-btn ac" style="width:100%;margin-top:8px" type="submit">Direcionar${D.para !== undefined ? ' para ' + esc(nomeSetor(D.para)) : ''}</button><div class="md-err" id="md-err"></div></form>`}
      ${fluxo}`;
  }
  async function render() {
    const top = D.stack[D.stack.length - 1] || { v: 'lista' };
    try {
      if (top.v === 'lista') telaLista(); else if (top.v === 'setor') telaSetor(top.id); else await telaDetalhe(top.k, top.id);
    } catch (e) { bd.innerHTML = `<div class="md-err">Não consegui mostrar: ${esc(e.message || e)}</div>`; }
  }
  function ir(v) { D.stack.push(v); D.aba = 'aconteceu'; D.para = undefined; render(); bd.scrollTop = 0; }
  function voltar() { if (D.stack.length) { D.stack.pop(); D.para = undefined; render(); } else fechar(); }
  function fechar() { ov.hidden = true; D.stack = []; opts.onClose?.(); }
  async function recarregar() { try { await carregar(); } catch (e) { toast('Sem conexão agora'); } render(); }

  async function rpc(nome, args) { const r = await sb.rpc(nome, args); if (r.error) throw r.error; if (r.data?.xp_total != null) opts.onXP?.(r.data.xp_total); return r.data; }

  ov.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-md]'); if (!b || b.tagName === 'FORM') return;
    const a = b.dataset.md, id = b.dataset.id;
    try {
      if (a === 'fechar') fechar();
      else if (a === 'voltar') voltar();
      else if (a === 'dia') { const n = +b.dataset.n; D.dia = n === 0 ? hojeISO() : addDias(D.dia, n); bd.innerHTML = '<div class="md-empty">Carregando…</div>'; await recarregar(); }
      else if (a === 'abrir') ir({ v: 'det', k: b.dataset.k, id });
      else if (a === 'setor') ir({ v: 'setor', id: id || null });
      else if (a === 'aba') { D.aba = b.dataset.a; render(); }
      else if (a === 'para') { D.para = id || null; render(); }
      else if (a === 'ckev') { const on = !D.reg[id]?.feito; b.classList.toggle('on', on); await rpc('agenda_registrar', { p_evento: id, p_feito: on }); D.reg[id] = { ...(D.reg[id] || {}), feito: on }; if (on) toast('Feito'); render(); opts.onChange?.(contagem()); }
      else if (a === 'ckit') { b.classList.add('on'); const t = tarefaDe('notion', id); if (t) await rpc('tarefa_concluir', { p_tarefa: t.id, p_texto: null }); else await rpc('campus_confirmar_item', { p_item: id, p_obs: 'confirmado no Meu dia' }); toast('Feito · foi pro Notion'); await recarregar(); }
      else if (a === 'cktf') { b.classList.add('on'); await rpc('tarefa_concluir', { p_tarefa: id, p_texto: null }); toast('Resolvida'); await recarregar(); }
      else if (a === 'feito') { b.disabled = true; const k = b.dataset.k;
        if (k === 'ev') await rpc('agenda_registrar', { p_evento: id, p_feito: true });
        else if (k === 'it') { const t = tarefaDe('notion', id); if (t) await rpc('tarefa_concluir', { p_tarefa: t.id, p_texto: null }); else await rpc('campus_confirmar_item', { p_item: id, p_obs: 'confirmado no Meu dia' }); }
        else await rpc('tarefa_concluir', { p_tarefa: id, p_texto: null });
        toast(k === 'ev' ? 'Feito' : 'Resolvida'); await carregar(); if (k === 'it') { D.stack.pop(); } render(); }
      else if (a === 'desfazer') { const k = b.dataset.k;
        if (k === 'ev') await rpc('agenda_registrar', { p_evento: id, p_feito: false });
        else { const t = D.feitas.find((x) => x.id === id); await rpc('tarefa_direcionar', { p_tarefa: id, p_para: t?.setor_id ?? null, p_texto: 'reaberta' }); }
        await recarregar(); }
    } catch (err) { toast('Não salvou: ' + (err.message || err)); await recarregar(); }
  });
  ov.addEventListener('submit', async (e) => {
    e.preventDefault(); const f = e.target, a = f.dataset.md, id = f.dataset.id, k = f.dataset.k;
    const btn = f.querySelector('[type=submit]'); if (btn) btn.disabled = true;
    try {
      if (a === 'novo') { const t = f.t.value.trim(); if (!t) { btn.disabled = false; return; }
        const r = await rpc('tarefa_criar', { p_titulo: t, p_para: f.dataset.para || null, p_texto: null, p_origem: 'app', p_origem_id: null, p_prazo: D.dia });
        await carregar(); toast(f.dataset.para ? 'Criada para ' + nomeSetor(f.dataset.para) : 'Anotada · agora direcione'); if (!f.dataset.para) { D.stack.push({ v: 'det', k: 'tf', id: r.id }); D.aba = 'direcionar'; D.para = undefined; } render(); }
      else if (a === 'salvarnota') { const n = f.n.value.trim();
        if (k === 'ev') await rpc('agenda_registrar', { p_evento: id, p_feito: null, p_relato: n });
        else if (!n) { btn.disabled = false; return; }
        else if (k === 'it') { const r = await sb.from('respostas').insert({ user_id: D.userId, item_id: id, resposta: 'texto', extra: n }); if (r.error) throw r.error; }
        else await rpc('tarefa_nota', { p_tarefa: id, p_texto: n });
        toast(k === 'it' ? 'Salvo · vai para o Notion' : 'Salvo'); await carregar(); render(); }
      else if (a === 'enviar') {
        if (D.para === undefined) { f.querySelector('#md-err').textContent = 'Escolha para quem vai.'; btn.disabled = false; return; }
        const instr = f.i.value.trim() || null;
        if (k === 'tf') await rpc('tarefa_direcionar', { p_tarefa: id, p_para: D.para, p_texto: instr });
        else { const src = k === 'ev' ? D.ev.find((x) => x.id === id) : D.itens.find((x) => x.id === id);
          const r = await rpc('tarefa_criar', { p_titulo: limpa(src?.titulo) || 'Sem título', p_para: D.para, p_texto: instr, p_origem: k === 'ev' ? 'agenda' : 'notion', p_origem_id: id, p_prazo: k === 'it' ? (src?.prazo || null) : D.dia });
          void r; }
        toast(D.para ? 'Foi para ' + nomeSetor(D.para) : 'Voltou para você'); await carregar(); D.aba = 'aconteceu'; D.para = undefined; render(); }
    } catch (err) { toast('Não salvou: ' + (err.message || err)); if (btn) btn.disabled = false; }
  });

  async function abrir(v) { ov.hidden = false; D.stack = v ? [v] : []; D.aba = 'aconteceu'; D.para = undefined; hd.innerHTML = ''; bd.innerHTML = '<div class="md-empty">Carregando seu dia…</div>'; await recarregar(); setTimeout(() => ov.querySelector('.md-ib')?.focus(), 50); }
  return {
    abrir: () => abrir(null),
    abrirSetor: (id) => abrir({ v: 'setor', id }),
    abrirTarefa: (id) => abrir({ v: 'det', k: 'tf', id }),
    atualizar: async () => { try { await carregar(); } catch (e) { /* silencioso */ } return contagem(); },
    tarefasDo: (ids) => D.tarefas.filter((t) => ids.includes(t.setor_id)),
    get aberto() { return !ov.hidden; },
  };
}
