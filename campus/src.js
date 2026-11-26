
import * as THREE from 'three';
import { createClient } from '@supabase/supabase-js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { criarMeuDia } from '../shared/meudia.js';
{
/* ================= DADOS DE EXEMPLO (no app real vêm do Supabase) ================= */
const OFFICES = {
  escola: { nome:'Escola Prosperi', placa:'ESCOLA PROSPERI', kind:'escola',
    bots:[
      {id:'zeus', nome:'Zeus', emo:'⚡', cor:'#facc15', sala:'diretoria', st:'ok', papel:'Direção geral',
        tarefas:[['Aprovar orçamento de material 2027','ok',30],['Revisar contratos de fornecedores','wa',20]]},
      {id:'jarvis', nome:'Jarvis', emo:'🤖', cor:'#22d3ee', sala:'ia', st:'ok', papel:'Central de IA · resumo das 5h40',
        tarefas:[['Resumo falado das 5h40','ok',10],['Cobrar quem está atrasado','ok',10]]},
      {id:'plutus', nome:'Plutus', emo:'💰', cor:'#22c55e', sala:'financeiro', st:'la', papel:'Financeiro',
        tarefas:[['Conferir boletos vencidos','la',30],['Fechar caixa da semana','wa',20],['Lançar notas no TecSof','ok',10]]},
      {id:'hermes', nome:'Hermes', emo:'📣', cor:'#f97316', sala:'marketing', st:'wa', papel:'Marketing e comercial',
        tarefas:[['Post de rematrícula no Instagram','wa',20],['Fechar sistema da Rabbit (sexta)','ok',20]]},
      {id:'remat', nome:'Rematrículas', emo:'🎒', cor:'#ef4444', sala:'secretaria', st:'la', papel:'Secretaria',
        tarefas:[['Ligar para 5 famílias pendentes','la',30],['Separar contratos assinados','ok',10]]},
      {id:'demeter', nome:'Deméter & Atena', emo:'🏛️', cor:'#a78bfa', sala:'coord', st:'ok', papel:'Coordenação pedagógica',
        tarefas:[['Revisar planejamento do 6º ano','ok',20],['Curadoria literária 2027','wa',20]]},
      {id:'manut', nome:'Manutenção', emo:'🔧', cor:'#94a3b8', sala:'operacoes', st:'wa', papel:'Manutenção e serviços gerais',
        tarefas:[['Trocar lâmpadas do corredor','wa',10],['Orçamento da fachada','ok',20]]},
    ]},
  pessoal: { nome:'Pessoal', placa:'KAIO · PESSOAL', kind:'pessoal',
    bots:[
      {id:'jarvis', nome:'Jarvis', emo:'🤖', cor:'#22d3ee', sala:'ia', st:'ok', papel:'Central de IA',
        tarefas:[['Resumo falado das 5h40','ok',10]]},
      {id:'apolo', nome:'Apolo & Cronos', emo:'🧭', cor:'#60a5fa', sala:'coord', st:'wa', papel:'Agenda e rotina',
        tarefas:[['Planejar a semana','wa',20],['Revisar hábitos do mês','ok',10]]},
      {id:'jordan', nome:'Jordan Belfort', emo:'📈', cor:'#22c55e', sala:'financeiro', st:'ok', papel:'Investimentos',
        tarefas:[['Revisar carteira','ok',20]]},
      {id:'jubileu', nome:'Jubileu', emo:'⌚', cor:'#eab308', sala:'marketing', st:'wa', papel:'Relógios',
        tarefas:[['Avaliar relógio anunciado','wa',20]]},
      {id:'dumont', nome:'Santos Dumont', emo:'✈️', cor:'#38bdf8', sala:'operacoes', st:'la', papel:'Aviação · aulas de PP',
        tarefas:[['Revisar matéria da última aula','la',20]]},
      {id:'federer', nome:'Federer', emo:'🎾', cor:'#a3e635', sala:'tenis', st:'ok', papel:'Tênis e esporte',
        tarefas:[['Treino de tênis 18h','ok',20]]},
    ]},
};
const ROOMNAMES = {
  escola:{bib:'Biblioteca',coord:'Coordenação pedagógica',cafe:'Refeitório & café',secretaria:'Secretaria',lobby:'Recepção',prof:'Sala dos professores',
    financeiro:'Financeiro',reuniao:'Sala de reunião',lounge:'Lounge',marketing:'Marketing & comercial',foco:'Ilha de foco',operacoes:'Manutenção & operações',
    diretoria:'Diretoria',conselho:'Sala do conselho',ia:'Jarvis · Central de IA',deck:'Terraço'},
  pessoal:{bib:'Biblioteca',coord:'Agenda & rotina',cafe:'Cozinha & café',secretaria:'Casa & documentos',lobby:'Entrada',prof:'Estúdio',
    financeiro:'Investimentos',reuniao:'Sala de reunião',lounge:'Lounge',marketing:'Relógios',foco:'Ilha de foco',operacoes:'Aviação',
    diretoria:'Seu escritório',conselho:'Sala de projetos',ia:'Jarvis · Central de IA',deck:'Terraço'},
};
let office = 'escola', xp = 220;

/* ================= BASE 3D ================= */
const canvas = document.getElementById('c');
const MOBILE = /iPhone|iPad|Android/i.test(navigator.userAgent) || (navigator.maxTouchPoints>1 && innerWidth<900);
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, powerPreference:'default'});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
canvas.addEventListener('webglcontextlost',e=>{ e.preventDefault(); const l=document.createElement('div'); l.id='load'; l.innerHTML='<div style="padding:24px;text-align:center">O 3D foi pausado pelo aparelho (memória).<br><button onclick="location.reload()" style="margin-top:12px;padding:10px 18px;border-radius:12px;border:0;font-weight:700">Recarregar</button></div>'; document.body.appendChild(l); });
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#a9dcf7'); scene.fog = new THREE.Fog('#a9dcf7', 180, 420);
const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 900);
camera.position.set(95, 80, 142);
const controls = new OrbitControls(camera, canvas);
controls.target.set(4,0,16); controls.enableDamping = true; controls.dampingFactor = .08;
controls.maxPolarAngle = 1.35; controls.minDistance = 7; controls.maxDistance = 260; controls.screenSpacePanning = false;
scene.add(new THREE.HemisphereLight('#dff3ff','#6b8f4e',1.1));
const sun = new THREE.DirectionalLight('#fff4e0', 2.4); sun.position.set(60,110,45); sun.castShadow = true;
sun.shadow.mapSize.set(MOBILE?1024:2048,MOBILE?1024:2048); Object.assign(sun.shadow.camera,{left:-110,right:110,top:110,bottom:-110,near:10,far:320}); sun.shadow.bias=-0.0004; sun.shadow.normalBias=.04;
scene.add(sun);

const matCache = {};
const mat = (c,o={}) => { const k=c+JSON.stringify(o); return matCache[k] || (matCache[k]=new THREE.MeshStandardMaterial({color:c,roughness:.85,...o})); };
const BOXG = new THREE.BoxGeometry(1,1,1);
function box(p,w,h,d,c,x,y,z,o={}){ const m=new THREE.Mesh(BOXG, typeof c==='string'?mat(c):c); m.scale.set(w,h,d); m.position.set(x,y+h/2,z); m.castShadow=o.cast!==false; m.receiveShadow=true; if(o.ry) m.rotation.y=o.ry; p.add(m); return m; }
function cyl(p,rt,rb,h,c,x,y,z,seg=12){ const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg), typeof c==='string'?mat(c):c); m.position.set(x,y+h/2,z); m.castShadow=true; m.receiveShadow=true; p.add(m); return m; }
function flat(p,w,d,c,x,y,z,ry=0){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d), typeof c==='string'?mat(c):c); m.rotation.x=-Math.PI/2; m.rotation.z=ry; m.position.set(x,y,z); m.receiveShadow=true; p.add(m); return m; }
function textTex(t,{w=1024,h=256,bg=null,fg='#fff',font='800 150px Plus Jakarta Sans, sans-serif'}={}){
  const cv=document.createElement('canvas'); cv.width=w; cv.height=h; const g=cv.getContext('2d');
  if(bg){g.fillStyle=bg;g.fillRect(0,0,w,h);} g.fillStyle=fg; g.font=font; const mw=g.measureText(t).width; if(mw>w*.9){ g.font=font.replace(/\d+px/,m=>Math.floor(parseInt(m)*w*.9/mw)+'px'); } g.textAlign='center'; g.textBaseline='middle'; g.fillText(t,w/2,h/2+6);
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=4; return tx; }
const clickables = [];
const PAL=['#7b5aa6','#3a8fd6','#a6cf4a','#ef8b3b','#e3423b','#f2d84b'];
const logoImg=new Image(); const logoTex=new THREE.Texture(logoImg); logoTex.colorSpace=THREE.SRGBColorSpace;
const texWaiting=[]; logoImg.onload=()=>{ logoTex.needsUpdate=true; texWaiting.forEach(f=>f()); }; logoImg.src='logo.png';
function rainbowTex(t,sub,{w=1024,h=160,bg=null}={}){
  const cv=document.createElement('canvas'); cv.width=w; cv.height=h; const g=cv.getContext('2d'); const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=4;
  const draw=()=>{ g.clearRect(0,0,w,h); if(bg){ g.fillStyle=bg; g.fillRect(0,0,w,h); }
    const hasLogo=sub!==null&&logoImg.complete&&logoImg.naturalWidth; const lw=hasLogo?h*.8*logoImg.naturalWidth/logoImg.naturalHeight:0;
    let fs=h*.62; g.font=`800 ${fs}px Plus Jakarta Sans, sans-serif`; let tw=g.measureText(t).width; const maxW=w*.92-lw-(hasLogo?h*.15:0); if(tw>maxW){ fs*=maxW/tw; g.font=`800 ${fs}px Plus Jakarta Sans, sans-serif`; tw=g.measureText(t).width; }
    let x=(w-(tw+lw+(hasLogo?h*.15:0)))/2; if(hasLogo){ g.drawImage(logoImg,x,h*.1,lw,h*.8); x+=lw+h*.15; }
    g.textBaseline='middle'; let i=0; for(const ch of t){ g.fillStyle=ch===' '||ch==='·'?'#334155':PAL[(i++)%5]; g.fillText(ch,x,h/2+4); x+=g.measureText(ch).width; }
    tx.needsUpdate=true; };
  draw(); texWaiting.push(draw); return tx; }

/* ================= TERRENO, RUA, ESTACIONAMENTO ================= */
const world = new THREE.Group(); scene.add(world);
const ground = flat(world,520,520,'#7fc35d',0,0,0); ground.userData.ground=true; clickables.push(ground);
flat(world,240,14,'#3b3f46',0,0.02,70);                       // rua (lado da entrada)
for(let x=-115;x<120;x+=9) flat(world,4,.35,'#f5f5f4',x,0.04,70);
flat(world,240,3,'#d6d3d1',0,0.03,61.5); flat(world,240,3,'#d6d3d1',0,0.03,78.5);
const PKX=-2, PKZ=44;
flat(world,52,24,'#4b5058',PKX,0.025,PKZ);                     // estacionamento na frente da entrada
for(let i=0;i<10;i++){ flat(world,.2,7,'#f5f5f4',PKX-22.5+i*5,0.04,PKZ-6.5); flat(world,.2,7,'#f5f5f4',PKX-22.5+i*5,0.04,PKZ+6.5); }
flat(world,8,8,'#4b5058',PKX,0.026,PKZ+16);
const CAR=['#e3423b','#f8fafc','#1e293b','#3a8fd6','#a3a3a3','#f2d84b','#7b5aa6','#a6cf4a'];
function car(p,x,z,ry,c){ const g=new THREE.Group(); box(g,4.2,.8,1.9,c,0,.35,0); box(g,2.4,.7,1.7,'#1e293b',-.2,1.12,0); [-1.3,1.3].forEach(a=>[-.95,.95].forEach(b=>{const w=cyl(g,.36,.36,.25,'#111',a,.02,b,10);w.rotation.x=Math.PI/2;w.position.y=.36;})); g.position.set(x,0,z); g.rotation.y=ry; p.add(g); return g; }
for(let i=0;i<9;i++){ if(i%3!==1) car(world,PKX-20+i*5,PKZ-6.5,Math.PI/2,CAR[i%8]); if(i%4!==2) car(world,PKX-20+i*5,PKZ+6.5,-Math.PI/2,CAR[(i+3)%8]); }
const movingCars=[0,1,2,3].map(i=>({g:car(world,-100+i*60,i%2?73:67,i%2?0:Math.PI,CAR[(i+1)%8]),d:i%2?1:-1,v:9+i*2}));
/* jardim dos fundos com canteiros coloridos */
[['#7b5aa6',-30],['#3a8fd6',-15],['#a6cf4a',0],['#ef8b3b',15],['#e3423b',30]].forEach(([c,x])=>{ flat(world,10,6,'#6aa84f',x,0.03,-30); for(let k=0;k<6;k++){ const fl=new THREE.Mesh(new THREE.IcosahedronGeometry(.45,0),mat(c,{flatShading:true})); fl.position.set(x-3.5+k*1.4,.4,-30+((k%2)?1.2:-1.2)); world.add(fl);} });

/* árvores */
const TREEC=['#4ade80','#22c55e','#65a30d','#86efac'];
function tree(x,z,s=1){ const g=new THREE.Group(); cyl(g,.18*s,.26*s,2.2*s,'#8b5a2b',0,0,0,7); const f=new THREE.Mesh(new THREE.IcosahedronGeometry(1.6*s,0),mat(TREEC[Math.floor(Math.abs(x*7+z*3))%4],{flatShading:true})); f.position.y=3.2*s; f.castShadow=true; g.add(f); g.position.set(x,0,z); world.add(g); }
for(let x=-110;x<115;x+=11) { tree(x,-48,1); if(Math.abs(x+2)>8) tree(x,59,1); tree(x+5,82,1.1); }
for(let z=-46;z<60;z+=10){ tree(-96,z,1.2); tree(96,z,1.2); }


/* praça de entrada e caminhos */
flat(world,30,12,'#e7e5e4',0,0.03,20);
[-11.5,11.5].forEach(x=>{ flat(world,3.2,8,'#e7e5e4',x,0.03,29); for(let k=0;k<4;k++) flat(world,2.6,.45,'#f8fafc',x,0.045,33.2+k*1.1); }); // duas passagens de pedestres, uma de cada lado do letreiro
flat(world,70,3.4,'#e7e5e4',-48,0.03,20); flat(world,64,3.4,'#e7e5e4',42,0.03,20);
flat(world,3.4,60,'#e7e5e4',-30,0.03,-8);
const sign = new THREE.Mesh(new THREE.PlaneGeometry(16,2.5), new THREE.MeshBasicMaterial({map:rainbowTex('ESCOLA PROSPERI','',{bg:'#ffffff'}),toneMapped:false}));
box(world,17,3.1,.6,'#ffffff',0,0,27.5); for(let i=0;i<5;i++) box(world,17/5,.35,.62,PAL[i],-6.8+i*3.4,0,27.5); sign.position.set(0,1.75,27.85); world.add(sign);
for(let x=-12;x<=12;x+=6) if(x) { cyl(world,.6,.7,.7,'#a8a29e',x,0,15.8); const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.75,0),mat(PAL[(x/6+2+5)%5|0],{flatShading:true})); b.position.set(x,1.2,15.8); world.add(b); }

/* ================= PRÉDIO (3 andares) ================= */
const FH=4.2, BW=44, BD=26, X0=-22, X1=22, Z0=-13, Z1=13;
const fy = f => f*FH + .3;
const floors=[0,1,2].map(()=>{const g=new THREE.Group(); world.add(g); return g;});
const roof = new THREE.Group(); world.add(roof);
const glassM = new THREE.MeshStandardMaterial({color:'#bfe6ff',transparent:true,opacity:.22,roughness:.05,metalness:.2,depthWrite:false});
const partM  = new THREE.MeshStandardMaterial({color:'#e0f2fe',transparent:true,opacity:.28,roughness:.05,depthWrite:false});
const frameC = '#e5e7eb';
const seats = []; const roomsAt=[[],[],[]]; const roomLabels=[];

const FLOORPLAN = [
 [ {k:'bib',x0:-22,x1:-12,s:-1,t:'lib',c:'#d6b48a'},{k:'coord',x0:-12,x1:-3,s:-1,t:'desks',c:'#c7d2fe'},{k:'cafe',x0:3,x1:22,s:-1,t:'cafe',c:'#e8c9a0'},
   {k:'secretaria',x0:-22,x1:-4,s:1,t:'desks',c:'#fde2c4'},{k:'lobby',x0:-4,x1:4,s:1,t:'lobby',c:'#ececec',open:true},{k:'prof',x0:4,x1:22,s:1,t:'lounge',c:'#d9f99d'} ],
 [ {k:'financeiro',x0:-22,x1:-3,s:-1,t:'desks',c:'#bbf7d0'},{k:'reuniao',x0:3,x1:13,s:-1,t:'meet',c:'#ddd6fe'},{k:'lounge',x0:13,x1:22,s:-1,t:'lounge',c:'#fecdd3'},
   {k:'marketing',x0:-22,x1:-6,s:1,t:'desks',c:'#fed7aa'},{k:'foco',x0:-6,x1:6,s:1,t:'bench',c:'#e0f2fe'},{k:'operacoes',x0:6,x1:22,s:1,t:'desks',c:'#e5e7eb'} ],
 [ {k:'diretoria',x0:-22,x1:-3,s:-1,t:'dir',c:'#d6b48a'},{k:'conselho',x0:3,x1:22,s:-1,t:'meet',c:'#c7d2fe'},
   {k:'ia',x0:-22,x1:-6,s:1,t:'ai',c:'#0f2a33'},{k:'deck',x0:-6,x1:22,s:1,t:'deck',c:'#b07b4f',open:true} ],
];

function desk(p,f,x,z,ry,room){
  const g=new THREE.Group(); g.position.set(x,0,z); g.rotation.y=ry; p.add(g);
  const top=box(g,1.6,.06,.8,'#f5f5f4',0,.74,0); box(g,.06,.74,.7,'#9ca3af',-.74,0,0); box(g,.06,.74,.7,'#9ca3af',.74,0,0);
  box(g,.9,.5,.05,'#111827',0,.82,-.25); const scr=box(g,.84,.44,.01,mat('#38bdf8',{emissive:'#0ea5e9',emissiveIntensity:.5}),0,.85,-.22,{cast:false});
  box(g,.4,.04,.15,'#d1d5db',0,.8,.05);
  const ch=new THREE.Group(); ch.position.set(0,0,.85); g.add(ch);
  box(ch,.5,.08,.5,'#334155',0,.42,0); box(ch,.5,.55,.08,'#334155',0,.5,.24); cyl(ch,.04,.04,.42,'#64748b',0,0,0,6);
  const wx=x+Math.sin(ry)*.85, wz=z+Math.cos(ry)*.85;
  const seat={id:seats.length,f,x:wx,z:wz,ry:ry+Math.PI,room,who:null,scr};
  seats.push(seat); top.userData.seat=seat; clickables.push(top);
  return seat;
}
function chairOnly(p,f,x,z,ry,room,c='#475569'){ const ch=new THREE.Group(); ch.position.set(x,0,z); ch.rotation.y=ry; p.add(ch); box(ch,.5,.08,.5,c,0,.42,0); box(ch,.5,.5,.08,c,0,.5,-.24); [-.2,.2].forEach(a=>[-.2,.2].forEach(b=>box(ch,.05,.42,.05,'#334155',a,0,b))); const seat={id:seats.length,f,x,z,ry,room,who:null}; seats.push(seat); return seat; }
function sofa(p,x,z,ry,c){ const g=new THREE.Group(); g.position.set(x,0,z); g.rotation.y=ry; p.add(g); box(g,2.2,.45,.9,c,0,0,0); box(g,2.2,.55,.25,c,0,.45,-.33); box(g,.25,.3,.9,c,-1,.45,0); box(g,.25,.3,.9,c,1,.45,0); }
function plant(p,x,z,s=1){ cyl(p,.28*s,.22*s,.5*s,'#f5f5f4',x,0,z,8); const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.55*s,0),mat('#22c55e',{flatShading:true})); b.position.set(x,.95*s,z); b.castShadow=true; p.add(b); }

function furnish(g,f,r){
  const y=0, zA=r.s<0?Z0+1.6:2.6, zB=r.s<0?-2.6:Z1-1.6, cx=(r.x0+r.x1)/2, cz=(zA+zB)/2, w=r.x1-r.x0;
  if(r.t==='desks'){ for(let x=r.x0+2.2;x<=r.x1-1.8;x+=2.6){ if(Math.abs(x-cx)<1.4) continue; for(let z=zA+.6;z<=zB-1.2;z+=2.8) desk(g,f,x,z,0,r.k); } plant(g,r.x0+.7,r.s<0?Z0+.7:Z1-.7); plant(g,r.x1-.7,r.s<0?Z0+.7:Z1-.7); }
  if(r.t==='dir'){ const s=desk(g,f,cx-4,cz-1,0,r.k); s.kaio=true; desk(g,f,cx+3,cz-1,0,r.k); sofa(g,cx,cz+3.2,Math.PI,'#78350f'); box(g,1.6,.4,.8,'#d6d3d1',cx,0,cz+1.8); box(g,6,2.2,.4,'#7c5a3a',cx,0,Z0+.4); plant(g,r.x0+.8,Z0+.8,1.3); plant(g,r.x1-.8,Z0+.8,1.3); }
  if(r.t==='meet'){ const L=Math.min(w-4,9); box(g,L,.08,2,'#f5f5f4',cx,.74,cz); box(g,L-.6,.74,.3,'#9ca3af',cx,0,cz); for(let x=cx-L/2+.7;x<=cx+L/2-.6;x+=1.2){ chairOnly(g,f,x,cz-1.4,0,r.k); chairOnly(g,f,x,cz+1.4,Math.PI,r.k);} box(g,4,2,.1,mat('#0f172a',{emissive:'#1e3a8a',emissiveIntensity:.3}),cx,1,r.s<0?Z0+.3:Z1-.3); }
  if(r.t==='cafe'){ box(g,8,1.05,.9,'#78350f',cx,0,Z0+1); box(g,8,.06,1,'#f5f5f4',cx,1.05,Z0+1); for(let x=r.x0+3;x<r.x1-1.5;x+=3.2) for(let z=zA+3;z<zB;z+=3){ cyl(g,.6,.6,.06,'#f5f5f4',x,.74,z,16); cyl(g,.06,.06,.74,'#57534e',x,0,z,6); chairOnly(g,f,x-.9,z,Math.PI/2,r.k,'#f59e0b'); chairOnly(g,f,x+.9,z,-Math.PI/2,r.k,'#f59e0b'); } }
  if(r.t==='lib'){ for(let x=r.x0+1;x<r.x1-.8;x+=2.1) { box(g,1.9,2.4,.5,'#7c5a3a',x+.95,0,Z0+.4); for(let k=0;k<4;k++) box(g,1.7,.35,.35,['#ef4444','#3b82f6','#eab308','#22c55e'][k],x+.95,.25+k*.55,Z0+.5,{cast:false}); } box(g,4,.08,1.6,'#d6b48a',cx,.74,cz+1); for(let i=-1;i<=1;i++){ chairOnly(g,f,cx+i*1.3,cz,0,r.k); chairOnly(g,f,cx+i*1.3,cz+2,Math.PI,r.k);} }
  if(r.t==='lounge'){ sofa(g,cx-2.5,cz,Math.PI/2,'#0ea5e9'); sofa(g,cx+2.5,cz,-Math.PI/2,'#0ea5e9'); box(g,2,.4,1,'#f5f5f4',cx,0,cz); plant(g,r.x0+.8,cz,1.2); plant(g,r.x1-.8,cz,1.2); box(g,3,1.7,.1,mat('#111827',{emissive:'#334155',emissiveIntensity:.3}),cx,.8,r.s<0?Z0+.3:Z1-.3); }
  if(r.t==='bench'){ for(let x=r.x0+2;x<r.x1-1.5;x+=2.6){ desk(g,f,x,cz-1,0,r.k); desk(g,f,x,cz+1.6,Math.PI,r.k);} }
  if(r.t==='lobby'){ const lw=new THREE.Mesh(new THREE.PlaneGeometry(2.6,2.9),new THREE.MeshBasicMaterial({map:logoTex,transparent:true})); lw.position.set(-2.6,1.9,1.62); g.add(lw); box(g,2.8,3.4,.1,'#ffffff',-2.6,0,1.55); box(g,2.8,3.4,.1,'#ffffff',2.6,0,1.55); box(g,2.4,3.4,.1,PAL[3],2.6,0,1.6,{cast:false}).scale.set(2.4,.3,.02); box(g,2.4,1.1,1,PAL[1],-2.4,0,4.5); box(g,2.8,.08,1.2,'#f5f5f4',-2.4,1.1,4.5); sofa(g,-2.2,9,Math.PI/2,'#0f766e'); sofa(g,2.2,9,-Math.PI/2,'#0f766e'); plant(g,-3.2,12,1.4); plant(g,3.2,12,1.4); }
  if(r.t==='ai'){ box(g,w-2,2.6,.2,mat('#0b1220',{emissive:'#0891b2',emissiveIntensity:.55}),cx,.2,Z1-.4); for(let x=r.x0+2.5;x<r.x1-2;x+=3.2) desk(g,f,x,cz,Math.PI,r.k); const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.8,1),mat('#22d3ee',{emissive:'#22d3ee',emissiveIntensity:1.2,flatShading:true})); core.position.set(cx,2.2,cz-1.5); core.userData.spin=true; g.add(core); }
  if(r.t==='deck'){ for(let x=r.x0+2;x<r.x1-1;x+=5){ plant(g,x,Z1-.9,1.5); } sofa(g,cx-4,cz,0,'#f5f5f4'); sofa(g,cx+3,cz,0,'#f5f5f4'); cyl(g,.06,.06,2.6,'#57534e',cx-.5,0,cz+1.8,6); const u=new THREE.Mesh(new THREE.ConeGeometry(1.8,.7,8),mat('#f97316',{flatShading:true})); u.position.set(cx-.5,2.8,cz+1.8); u.castShadow=true; g.add(u); for(let x=r.x0+3;x<r.x1;x+=6) chairOnly(g,f,x,cz-2,0,r.k,'#f5f5f4'); }
}

for(let f=0;f<3;f++){
  const g=floors[f], y=fy(f); g.position.y=y;
  const slab=box(g,BW+.6,.3,BD+.6,['#f2d84b','#3a8fd6','#a6cf4a'][f],0,-.3,0); slab.userData.floor=f; clickables.push(slab);
  flat(g,BW,3,'#e5e7eb',0,.012,0); // corredor
  // núcleo: elevador e escada
  box(g,6,2.8,.3,'#cbd5e1',0,0,-1.65); box(g,.3,2.8,11.4,'#cbd5e1',-3,0,-7.3); box(g,.3,2.8,11.4,'#cbd5e1',3,0,-7.3); box(g,6,2.8,.3,'#cbd5e1',0,0,Z0+.15); flat(g,5.6,11,'#94a3b8',0,.02,-7.3);
  box(g,1.6,2.4,.05,'#64748b',0,0,-1.47,{cast:false}); for(let k=0;k<8;k++) box(g,2.4,.25*(k+1),.9,'#e2e8f0',-1.4,0,-11.5+k*.9);
  for(const r of FLOORPLAN[f]){
    const zA=r.s<0?Z0:1.5, zB=r.s<0?-1.5:Z1, cx=(r.x0+r.x1)/2;
    flat(g,r.x1-r.x0-.1,zB-zA-.1,r.c,cx,.015,(zA+zB)/2);
    roomsAt[f].push({...r,zA,zB,cx});
    // divisória com o corredor (porta no meio)
    const zc=r.s<0?-1.5:1.5, L=(r.x1-r.x0-1.8)/2;
    if(!r.open){ const dc=PAL[(Math.round(cx)+f*3+20)%5]; box(g,.16,2.75,.22,dc,cx-.95,0,zc); box(g,.16,2.75,.22,dc,cx+.95,0,zc); box(g,2.06,.22,.22,dc,cx,2.6,zc); flat(g,1.7,1.4,dc,cx,.02,zc+(r.s<0?-.75:.75)).material=mat(dc,{transparent:true,opacity:.45}); }
    if(!r.open){ box(g,L,2.6,.08,partM,r.x0+L/2,0,zc,{cast:false}); box(g,L,2.6,.08,partM,r.x1-L/2,0,zc,{cast:false}); box(g,r.x1-r.x0,.08,.12,frameC,cx,2.6,zc); }
    // paredes laterais de vidro
    if(r.x0>X0+.1 && !(f===0&&r.k==='lobby')) box(g,.08,2.6,zB-zA,partM,r.x0,0,(zA+zB)/2,{cast:false});
    furnish(g,f,r);
    roomLabels.push({k:r.k,f,pos:new THREE.Vector3(cx,y+3,(zA+zB)/2)});
  }
  // fachada de vidro com caixilhos
  const H=FH-.3;
  const facade=(len,x,z,rot)=>{ const p=new THREE.Mesh(BOXG,glassM); p.scale.set(len,H,.06); p.position.set(x,H/2,z); p.rotation.y=rot; g.add(p); };
  if(f===0){ facade(18,-13,Z1,0); facade(18,13,Z1,0); } else if(f===2){ facade(16,-14,Z1,0); } else facade(BW,0,Z1,0);
  facade(BW,0,Z0,0); facade(BD,X0,0,Math.PI/2); facade(BD,X1,0,Math.PI/2);
  let ci=f; for(let x=X0;x<=X1;x+=2.2){ const c=PAL[(ci++)%5]; if(!(f===0&&Math.abs(x)<4) && !(f===2&&x>-6)) box(g,.22,H,.3,c,x,0,Z1+.1); box(g,.22,H,.3,c,x,0,Z0-.1); }
  for(let z=Z0;z<=Z1;z+=2.2){ const c=PAL[(ci++)%5]; box(g,.3,H,.22,c,X0-.1,0,z); box(g,.3,H,.22,c,X1+.1,0,z); }
  if(f===2){ box(g,28,1.1,.08,glassM,8,0,Z1,{cast:false}); box(g,28,.08,.12,frameC,8,1.1,Z1); }
}
// cobertura
{ const y=fy(3); roof.position.y=y;
  box(roof,BW+.6,.3,BD+.6,'#e2e8f0',0,-.3,0);
  for(let i=0;i<5;i++){ const w=(BW+.6)/5, x=X0-.3+w*(i+.5); box(roof,w,.9,.3,PAL[i],x,0,Z0-.15); box(roof,w,.9,.3,PAL[4-i],x,0,Z1+.15); } box(roof,.3,.9,BD,PAL[1],X0-.15,0,0); box(roof,.3,.9,BD,PAL[3],X1+.15,0,0);
  for(let x=-19;x<-3;x+=2.4) for(let z=-10;z<=-3;z+=2.6){ const p=box(roof,2,.08,1.4,mat('#1e3a8a',{metalness:.4,roughness:.3}),x,.6,z); p.rotation.x=-.3; }
  flat(roof,22,10,'#b07b4f',9,.02,5); for(let x=0;x<20;x+=4) tree(0,0,0);
  for(let x=1;x<19;x+=4.5){ const t=new THREE.Group(); cyl(t,.12,.16,1.2,'#8b5a2b',0,0,0,6); const b=new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),mat('#22c55e',{flatShading:true})); b.position.y=1.8; b.castShadow=true; t.add(b); t.position.set(x,0,8); roof.add(t); }
  cyl(roof,3.6,3.6,.06,'#334155',15,0,-6,24); flat(roof,.8,3.4,'#facc15',15,.08,-6); flat(roof,2.4,.8,'#facc15',15,.08,-6);
  box(roof,6,3,4,'#64748b',0,0,-7);
  const logo=new THREE.Mesh(new THREE.PlaneGeometry(22,3.4),new THREE.MeshBasicMaterial({map:rainbowTex('PROSPERI',null),transparent:true}));
  const hand=new THREE.Mesh(new THREE.PlaneGeometry(8,9),new THREE.MeshBasicMaterial({map:logoTex,transparent:true,depthWrite:false})); hand.rotation.x=-Math.PI/2; hand.position.set(-12,.06,6); roof.add(hand);
  logo.position.set(-8,2.4,Z1+.35); roof.add(logo); roof.userData.logo=logo;
  box(roof,22.5,2.6,.2,'#ffffff',-8,.7,Z1+.15);
}
{ const g=floors[0]; [-4.1,4.1].forEach((x,i)=>box(g,.5,3.8,.5,PAL[i?4:1],x,0,Z1+.3)); box(g,8.7,.6,.5,PAL[0],0,3.6,Z1+.3); const e=new THREE.Mesh(new THREE.PlaneGeometry(6,.5),new THREE.MeshBasicMaterial({map:rainbowTex('ENTRADA',null),transparent:true})); e.position.set(0,3.9,Z1+.57); g.add(e); flat(world,8,4,PAL[5],0,.035,Z1+3); }
// helicóptero no heliponto
const heli=new THREE.Group(); { const body=new THREE.Mesh(new THREE.SphereGeometry(1.1,14,10),mat('#e3423b')); body.scale.set(1.6,1,1); body.castShadow=true; heli.add(body);
  const glass=new THREE.Mesh(new THREE.SphereGeometry(.75,12,8),mat('#bfe6ff',{roughness:.1,metalness:.3})); glass.position.set(1.05,.15,0); glass.scale.set(1,.8,.95); heli.add(glass);
  box(heli,3.4,.28,.28,'#e3423b',-2.6,.1,0); box(heli,.18,1,.7,'#f2d84b',-4.2,.1,0); [-.7,.7].forEach(z=>box(heli,2.6,.1,.1,'#334155',0,-1.15,z)); [-.6,.6].forEach(x=>[-.7,.7].forEach(z=>box(heli,.08,.5,.08,'#334155',x,-1.1,z)));
  const rot=new THREE.Group(); rot.position.y=1.25; heli.add(rot); box(rot,7,.06,.3,'#1f2937',0,0,0); box(rot,.3,.06,7,'#1f2937',0,0,0); cyl(heli,.08,.08,.35,'#1f2937',0,.95,0,6); heli.userData.rot=rot;
  const tr=new THREE.Group(); tr.position.set(-4.2,.3,.38); heli.add(tr); box(tr,.06,1.4,.12,'#1f2937',0,-.7,0); heli.userData.tr=tr;
  [1,-1].forEach(sd=>{ const lg=new THREE.Mesh(new THREE.PlaneGeometry(1.15,1.3),new THREE.MeshBasicMaterial({map:logoTex,transparent:true,depthWrite:false})); lg.position.set(-.15,.05,sd*1.13); lg.rotation.y=sd>0?0:Math.PI; heli.add(lg); }); }
heli.rotation.order='YXZ';
const HELI={x:15,z:-6,y0:fy(3)+1.25,t:0,phase:'pousado',wait:30}; heli.position.set(HELI.x,HELI.y0,HELI.z); world.add(heli);
function heliStep(dt){ const H=HELI; H.t+=dt; const r=heli.userData.rot;
  const spin=H.phase==='pousado'?(H.t>H.wait-3?Math.min(1,(H.t-(H.wait-3))/3):Math.max(0,1-H.t/3)):1; r.rotation.y+=dt*28*spin; heli.userData.tr.rotation.z+=dt*40*spin;
  if(H.phase==='pousado'&&H.t>H.wait){ H.phase='subindo'; H.t=0; }
  if(H.phase==='subindo'){ heli.position.y=H.y0+Math.min(1,H.t/4)**2*22; if(H.t>4){ H.phase='voando'; H.t=0; } }
  if(H.phase==='voando'){ const T=16, a=H.t/T*Math.PI*2, R=60;
    heli.position.set(H.x+Math.sin(a)*R, H.y0+22, H.z+(1-Math.cos(a))*R*.7);
    const vx=Math.cos(a), vz=.7*Math.sin(a); heli.rotation.set(0,Math.atan2(-vz,vx),-.14);
    if(H.t>T){ H.phase='descendo'; H.t=0; heli.position.set(H.x,H.y0+22,H.z); } }
  if(H.phase==='descendo'){ heli.position.y=H.y0+(1-Math.min(1,H.t/5))**2*22; heli.rotation.z=-.05*(1-Math.min(1,H.t/5)); if(H.t>5){ H.phase='pousado'; H.t=0; H.wait=45+Math.random()*45; heli.position.y=H.y0; heli.rotation.set(0,heli.rotation.y,0); } } }
// base de pedra do prédio
box(world,BW+2,.3,BD+2,'#cbd5e1',0,0,0);

/* ================= QUADRA, TÊNIS, PARQUE ================= */
const FX0=32,FX1=62,FZ0=-11,FZ1=11;
flat(world,FX1-FX0+4,FZ1-FZ0+4,'#15803d',(FX0+FX1)/2,0.03,0);
for(let i=0;i<6;i++) flat(world,(FX1-FX0)/6,FZ1-FZ0,i%2?'#16a34a':'#22a34d',FX0+(i+.5)*(FX1-FX0)/6,0.035,0);
const line=(w,d,x,z)=>flat(world,w,d,'#f8fafc',x,0.04,z);
line(FX1-FX0,.15,47,FZ0); line(FX1-FX0,.15,47,FZ1); line(.15,FZ1-FZ0,FX0,0); line(.15,FZ1-FZ0,FX1,0); line(.15,FZ1-FZ0,47,0);
{ const c=new THREE.Mesh(new THREE.RingGeometry(2.9,3.05,40),mat('#f8fafc')); c.rotation.x=-Math.PI/2; c.position.set(47,0.045,0); world.add(c); }
[FX0,FX1].forEach((x,i)=>{ const s=i?1:-1; box(world,.12,2,.12,'#f8fafc',x+s*.8,0,-2.5); box(world,.12,2,.12,'#f8fafc',x+s*.8,0,2.5); box(world,.12,.12,5.1,'#f8fafc',x+s*.8,2,0); line(.15,9,x-s*4,0); });
for(let x=FX0-2;x<=FX1+2;x+=3){ box(world,.08,4,.08,'#334155',x,0,FZ0-2); box(world,.08,4,.08,'#334155',x,0,FZ1+2); }
box(world,FX1-FX0+4,4,.03,new THREE.MeshStandardMaterial({color:'#334155',transparent:true,opacity:.18}),47,0,FZ0-2,{cast:false});
box(world,FX1-FX0+4,4,.03,new THREE.MeshStandardMaterial({color:'#334155',transparent:true,opacity:.18}),47,0,FZ1+2,{cast:false});
const ARQ=[]; for(let row=0;row<2;row++){ const z=FZ1+3.6+row*1.4, h=row*.5; box(world,18,h+.05,1.2,'#cbd5e1',47,0,z+.2); const bt=box(world,18,.12,.5,PAL[row+1],47,h+.33,z); 
  for(let x=39;x<=55;x+=1.6){ const st={id:seats.length,f:0,o:true,x,z:z+.05,ry:Math.PI,room:'arquibancada',who:null,h}; seats.push(st); ARQ.push(st); } bt.userData.seat=ARQ[ARQ.length-3]; clickables.push(bt); }
// tênis
const TX=46,TZ=34;
flat(world,30,16,'#2563eb',TX,0.03,TZ); flat(world,23.8,11,'#1d4ed8',TX,0.035,TZ);
[[23.8,.1,0,-5.5],[23.8,.1,0,5.5],[23.8,.1,0,-4.1],[23.8,.1,0,4.1],[.1,11,-11.9,0],[.1,11,11.9,0],[.1,8.2,-6.4,0],[.1,8.2,6.4,0],[12.8,.1,0,0]].forEach(([w,d,x,z])=>flat(world,w,d,'#f8fafc',TX+x,0.04,TZ+z));
box(world,.08,1,11.8,mat('#f8fafc',{transparent:true,opacity:.6}),TX,0,TZ,{cast:false});
// parque
const PX=-58,PZ=-6;
flat(world,52,62,'#86d16a',PX,0.02,PZ);
const pond=new THREE.Mesh(new THREE.CircleGeometry(7,28),mat('#38bdf8',{roughness:.15,metalness:.1})); pond.rotation.x=-Math.PI/2; pond.position.set(PX-8,0.05,PZ-14); world.add(pond);
flat(world,18,14,'#fde68a',PX+10,0.04,PZ+16); // areia / beach play
box(world,.1,2.4,.1,'#f8fafc',PX+6,0,PZ+16); box(world,.1,2.4,.1,'#f8fafc',PX+14,0,PZ+16); box(world,8,.05,.02,'#f8fafc',PX+10,2.2,PZ+16);
// brinquedos
box(world,3,2.4,3,'#f43f5e',PX+8,0,PZ-2); const sl=box(world,1,.1,4,'#facc15',PX+8,1.2,PZ+1.6); sl.rotation.x=.55;
box(world,.15,2.6,.15,'#0ea5e9',PX-4,0,PZ-1); box(world,.15,2.6,.15,'#0ea5e9',PX+1,0,PZ-1); box(world,5.2,.15,.15,'#0ea5e9',PX-1.5,2.6,PZ-1);
const swings=[]; [-3,0].forEach(dx=>{ const s=new THREE.Group(); s.position.set(PX+dx+.5,2.6,PZ-1); box(s,.02,1.9,.02,'#94a3b8',-.25,-1.9,0); box(s,.02,1.9,.02,'#94a3b8',.25,-1.9,0); box(s,.6,.06,.3,'#f43f5e',0,-1.95,0); world.add(s); swings.push(s); });
for(let i=0;i<26;i++){ const a=i*2.4, r=14+((i*37)%10); tree(PX+Math.cos(a)*r*1.3,PZ+Math.sin(a)*r*1.5,.9+(i%3)*.2); }
const BENCH=[];
[[PX-14,PZ+4],[PX+2,PZ-14],[PX-2,PZ+12],[PX+14,PZ-6]].forEach(([x,z],i)=>{ box(world,2,.45,.6,'#92400e',x,0,z); BENCH.push({x,z:z+.6,ry:Math.PI}); });
flat(world,3,40,'#e7e5e4',PX+4,0.035,PZ); flat(world,30,3,'#e7e5e4',PX,0.035,PZ+6);

/* ================= PERSONAGENS ================= */
const CAPS=new THREE.CapsuleGeometry(.22,.38,4,8), ARM=new THREE.CapsuleGeometry(.07,.45,3,6), LEG=new THREE.CapsuleGeometry(.09,.62,3,6);
const HEX=new THREE.CylinderGeometry(.26,.26,.36,6), HEAD=new THREE.SphereGeometry(.2,12,10), EYE=new THREE.SphereGeometry(.055,8,6), PUP=new THREE.SphereGeometry(.028,6,5);
function person({shirt='#2563eb',pants='#1f2937',skin='#e0ac7e',hair='#3f2a1d',bot=null,corte='curto',acessorio='',sapato='#111827'}={}){
  const g=new THREE.Group(), body=new THREE.Group(); g.add(body);
  const legs=[-.11,.11].map(x=>{ const p=new THREE.Group(); p.position.set(x,.86,0); const l=new THREE.Mesh(LEG,mat(pants)); l.position.y=-.43; l.castShadow=true; p.add(l); body.add(p); return p; });
  const t=new THREE.Mesh(CAPS,mat(bot||shirt)); t.scale.set(1,1,.72); t.position.y=1.18; t.castShadow=true; body.add(t);
  const arms=[-.3,.3].map(x=>{ const p=new THREE.Group(); p.position.set(x,1.42,0); const a=new THREE.Mesh(ARM,mat(bot?'#e5e7eb':shirt)); a.position.y=-.3; a.castShadow=true; p.add(a); body.add(p); return p; });
  if(bot){ const h=new THREE.Mesh(HEX,mat(bot,{flatShading:true})); h.rotation.x=Math.PI/2; h.rotation.y=Math.PI/6; h.position.y=1.78; h.castShadow=true; body.add(h);
    [-.09,.09].forEach(x=>{ const e=new THREE.Mesh(EYE,mat('#fff')); e.position.set(x,1.8,.17); body.add(e); const p=new THREE.Mesh(PUP,mat('#111')); p.position.set(x,1.8,.22); body.add(p); });
    const an=new THREE.Mesh(EYE,mat(bot,{emissive:bot,emissiveIntensity:.6})); an.position.y=2.07; body.add(an); box(body,.02,.12,.02,'#94a3b8',0,1.95,0);
  } else { const h=new THREE.Mesh(HEAD,mat(skin)); h.position.y=1.74; h.castShadow=true; body.add(h);
    const hm=mat(hair);
    if(corte!=='careca'){ const hr=new THREE.Mesh(new THREE.SphereGeometry(corte==='cacheado'?.235:.21,12,8,0,Math.PI*2,0,Math.PI/2),hm); hr.position.y=1.77; if(corte==='cacheado') hr.scale.set(1.08,1.15,1.08); body.add(hr); }
    if(corte==='longo'){ const l=new THREE.Mesh(new THREE.BoxGeometry(.4,.42,.12),hm); l.position.set(0,1.6,-.13); body.add(l); }
    if(corte==='rabo'){ const l=new THREE.Mesh(new THREE.CapsuleGeometry(.06,.26,3,6),hm); l.position.set(0,1.62,-.24); l.rotation.x=.35; body.add(l); }
    if(corte==='coque'){ const l=new THREE.Mesh(new THREE.SphereGeometry(.1,10,8),hm); l.position.set(0,1.98,-.08); body.add(l); }
    if(acessorio==='oculos'){ [-.08,.08].forEach(x=>{ const o=new THREE.Mesh(new THREE.TorusGeometry(.05,.012,6,12),mat('#111')); o.position.set(x,1.76,.19); body.add(o); }); box(body,.06,.012,.012,'#111',0,1.76,.2); }
    if(acessorio==='bone'){ const c=new THREE.Mesh(new THREE.SphereGeometry(.22,12,8,0,Math.PI*2,0,Math.PI/2),mat(shirt)); c.position.y=1.8; body.add(c); box(body,.3,.025,.18,shirt,0,1.81,.18); }
    if(acessorio==='cracha'){ box(body,.1,.13,.02,'#f8fafc',.08,1.15,.17); box(body,.1,.03,.021,'#2F5BFF',.08,1.2,.171); }
  }
  [-.11,.11].forEach((x,i)=>{ const sh=new THREE.Mesh(new THREE.BoxGeometry(.13,.08,.22),mat(bot?'#475569':sapato)); sh.position.set(0,-.84,.04); legs[i].add(sh); });
  return {g,body,legs,arms};
}
const agents=[]; let player=null;
const SKINS=['#f1c27d','#e0ac69','#c68642','#8d5524','#ffdbac'], SHIRTS=['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899','#f8fafc'];

function ptY(p){ return p.o?0.02:fy(p.f); }
function roomAt(f,x,z){ return roomsAt[f].find(r=>x>r.x0&&x<r.x1&&z>r.zA&&z<r.zB)||null; }
function inBuilding(x,z){ return x>X0-1&&x<X1+1&&z>Z0-1&&z<Z1+1; }
function segHits(a,b){ for(let i=0;i<=20;i++){ const t=i/20; if(inBuilding(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t)) return true; } return false; }
function outdoorPath(a,b){ if(!segHits(a,b)) return [b];
  const C=[{x:-26,z:-17},{x:26,z:-17},{x:26,z:17},{x:-26,z:17}].map(c=>({...c,f:0,o:true}));
  for(const c of C) if(!segHits(a,c)&&!segHits(c,b)) return [c,b];
  for(let i=0;i<4;i++){ const c1=C[i]; if(segHits(a,c1)) continue; for(const c2 of [C[(i+1)%4],C[(i+3)%4]]) if(!segHits(c2,b)) return [c1,c2,b]; }
  return [b]; }
function route(a,b){
  if(!a.o&&!b.o&&a.f===b.f&&roomAt(a.f,a.x,a.z)===roomAt(b.f,b.x,b.z)) return [{f:b.f,x:b.x,z:b.z,o:false}];
  const pts=[]; const P=(f,x,z,o=false)=>pts.push({f,x,z,o});
  let cur=a;
  if(a.o){ if(b.o){ return outdoorPath(a,b); } outdoorPath(a,{f:0,x:0,z:16,o:true}).forEach(p=>pts.push(p)); P(0,0,12); P(0,0,5); P(0,0,0); cur={f:0,x:0,z:0}; }
  else { const r=roomAt(a.f,a.x,a.z); if(r){ P(a.f,r.cx,r.s*2.4); P(a.f,r.cx,0); } else P(a.f,a.x,0); }
  if(b.o){ if(cur.f!==0||a.f!==0){ P(a.f,0,0); P(0,0,0); } P(0,0,5); P(0,0,12); P(0,0,16,true); outdoorPath({x:0,z:16},b).forEach(p=>pts.push(p)); return pts; }
  const af=a.o?0:a.f;
  if(af!==b.f){ P(af,0,0); P(b.f,0,0); }
  const r=roomAt(b.f,b.x,b.z); if(r){ P(b.f,r.cx,0); P(b.f,r.cx,r.s*2.4); } else P(b.f,b.x,0);
  pts.push({f:b.f,x:b.x,z:b.z,o:false}); return pts;
}
function spawn(def){
  const m=person(def.look||{}); world.add(m.g);
  const a={...def,m,f:def.f??0,x:def.x??0,z:def.z??15,o:def.o??true,path:[],state:'idle',timer:2+Math.random()*4,seat:null,sit:false,speed:def.speed||1.6,phase:Math.random()*9};
  m.g.position.set(a.x,ptY(a),a.z); agents.push(a); return a;
}
function goTo(a,target,then){ if(a.seat){ a.seat.who=null; a.seat=null; } a.sit=false; a.path=route({f:a.f,x:a.x,z:a.z,o:a.o},target); a.then=then; a.state='walk'; }
function sitAt(a,s){ goTo(a,{f:s.f,x:s.x,z:s.z,o:!!s.o},()=>{ a.seat=s; s.who=a; a.sit=true; a.m.g.rotation.y=s.ry; a.state='sit'; a.timer=a.isPlayer?1e9:25+Math.random()*40; }); s.who=a; }

/* ===== bots do escritório atual ===== */
let botAgents=[];
const SALA2F={}; FLOORPLAN.forEach((fl,f)=>fl.forEach(r=>SALA2F[r.k]=f));
function freeSeat(k){ return seats.find(s=>s.room===k&&!s.who&&!s.kaio&&s.scr) || seats.find(s=>s.room===k&&!s.who&&!s.kaio) || seats.find(s=>s.room===k&&!s.kaio&&s.who&&s.who.staff&&(s.who.seat=null,s.who.state='idle',s.who.timer=0,s.who.home=seats.find(x=>x.scr&&!x.who&&x.room==='foco')||s.who.home,s.who.sit=false,s.who=null,true)); }
function lookDe(d){ const hh=hashN(d.id), v=d.visual||{};
  if(d.tipo!=='pessoa') return {bot:v.camisa||d.cor};
  return {shirt:v.camisa||d.cor, skin:v.pele||SKINS[hh%5], pants:v.calca||['#1f2937','#334155','#1e3a8a'][hh%3], hair:v.cabelo||['#1c1917','#78350f','#facc15','#a8a29e'][hh%4], corte:v.corte||(['curto','longo','rabo','coque'][hh%4]), acessorio:v.acessorio||'', sapato:v.sapato||'#111827'}; }
function trocarVisual(ag,v){ const pos=ag.m.g.position.clone(), ry=ag.m.g.rotation.y; world.remove(ag.m.g); ag.visual=v; const m=person(lookDe(ag)); m.g.position.copy(pos); m.g.rotation.y=ry; world.add(m.g); ag.m=m; if(ag.tennis) racket(ag,'#a6cf4a'); }
function formVisual(b){ const v={...(b.visual||{})}, L=lookDe(b), pessoa=b.tipo==='pessoa';
  const CORES={pele:['#ffdbac','#f1c27d','#e0ac69','#c68642','#8d5524','#5c3a21'],cabelo:['#1c1917','#3f2a1d','#78350f','#b45309','#facc15','#a8a29e','#f8fafc','#7c3aed'],camisa:['#e3423b','#2F5BFF','#10b981','#f59e0b','#8b5cf6','#ec4899','#0f172a','#f8fafc','#0ea5e9','#14532d'],calca:['#1f2937','#334155','#1e3a8a','#78350f','#f8fafc','#57534e'],sapato:['#111827','#f8fafc','#78350f','#e3423b']};
  const NOMES={pele:'Pele',cabelo:'Cabelo',camisa:pessoa?'Camisa':'Cor do corpo',calca:'Calça',sapato:'Sapato'};
  const camposCor=pessoa?['pele','cabelo','camisa','calca','sapato']:['camisa'];
  const cur={pele:L.skin,cabelo:L.hair,camisa:L.shirt||L.bot,calca:L.pants,sapato:L.sapato};
  const sw=k=>`<div class="sub" style="margin:10px 0 4px;font-weight:800">${NOMES[k]}</div><div style="display:flex;gap:8px;flex-wrap:wrap">${CORES[k].map(c=>`<button class="sw" data-k="${k}" data-c="${c}" aria-label="${NOMES[k]} ${c}" aria-pressed="${(v[k]||cur[k])===c}" style="width:36px;height:36px;border-radius:50%;background:${c};border:3px solid ${(v[k]||cur[k])===c?'#2F5BFF':'rgba(255,255,255,.5)'};cursor:pointer"></button>`).join('')}</div>`;
  const op=(k,arr)=>`<div class="sub" style="margin:10px 0 4px;font-weight:800">${k==='corte'?'Cabelo (corte)':'Acessório'}</div><div style="display:flex;gap:6px;flex-wrap:wrap">${arr.map(([val,n])=>`<button class="btn ${((v[k]??L[k])||'')===val?'':'ghost'}" data-op="${k}" data-v="${val}" style="min-height:38px;padding:0 12px">${n}</button>`).join('')}</div>`;
  openSheet(`<h2>Visual · ${esc(b.nome)}</h2><div class="sub">Muda só a aparência no campus</div>${camposCor.map(sw).join('')}${pessoa?op('corte',[['curto','Curto'],['longo','Longo'],['rabo','Rabo'],['coque','Coque'],['cacheado','Cacheado'],['careca','Careca']])+op('acessorio',[['','Nada'],['oculos','Óculos'],['cracha','Crachá'],['bone','Boné']]):''}<div class="row"><button class="btn" id="vSave">Salvar visual</button><button class="btn ghost" id="vBack">Voltar</button></div>`);
  const ag=botAgents.find(a=>a.id===b.id)||b;
  const prev=()=>{ trocarVisual(ag,{...v}); };
  sc.querySelectorAll('.sw').forEach(el=>el.onclick=()=>{ v[el.dataset.k]=el.dataset.c; sc.querySelectorAll(`.sw[data-k="${el.dataset.k}"]`).forEach(x=>{ const on=x===el; x.style.borderColor=on?'#2F5BFF':'rgba(255,255,255,.5)'; x.setAttribute('aria-pressed',on); }); prev(); });
  sc.querySelectorAll('[data-op]').forEach(el=>el.onclick=()=>{ v[el.dataset.op]=el.dataset.v; sc.querySelectorAll(`[data-op="${el.dataset.op}"]`).forEach(x=>x.classList.toggle('ghost',x!==el)); prev(); });
  document.getElementById('vBack').onclick=()=>openBot(ag);
  document.getElementById('vSave').onclick=async()=>{ if(!LIVE){ toast('Só no app ao vivo'); return; } const r=await sb.rpc('bot_visual',{p_bot:b.id,p_visual:v}); if(r.error){ toast('Não salvou'); return; } b.visual=r.data.visual; ag.visual=r.data.visual; const d=(OFFICES[office]?.bots||[]).find(x=>x.id===b.id); if(d) d.visual=r.data.visual; toast('Visual salvo'); openBot(ag); };
}
function buildOffice(){
  botAgents.forEach(b=>{ world.remove(b.m.g); if(b.seat) b.seat.who=null; agents.splice(agents.indexOf(b),1); b.tag?.remove(); });
  botAgents=[];
  for(const d of OFFICES[office].bots){
    if(d.sala==='tenis'){ const a=spawn({...d,look:lookDe(d),o:true,f:0,x:TX-9,z:TZ,speed:4}); a.tennis=true; racket(a,'#a6cf4a'); botAgents.push(a); continue; }
    const s=freeSeat(d.sala)||freeSeat('foco')||seats.find(x=>!x.who&&x.scr&&!x.kaio); if(!s) continue; const hh=hashN(d.id); const a=spawn({...d,look:lookDe(d),o:false,f:s.f,x:s.x,z:s.z});
    a.seat=s; s.who=a; a.sit=true; a.state='sit'; a.timer=8+Math.random()*30; a.m.g.rotation.y=s.ry; a.home=s; botAgents.push(a);
  }
  botAgents.forEach(b=>{ const t=document.createElement('div'); t.className='tag '+({ok:'',wa:'warn',la:'late'}[b.st]); t.innerHTML='<i></i>'; t.append(b.emo+' '+b.nome); t.onclick=e=>{e.stopPropagation(); openBot(b);}; labelsEl.appendChild(t); b.tag=t; });
  sign.material.map=rainbowTex(OFFICES[office].placa,'',{bg:'#ffffff'}); sign.material.needsUpdate=true;
  roomLabels.forEach(r=>r.el.textContent=ROOMNAMES[office][r.k]);
  updateReport(); if(typeof spawnPessoas==='function') spawnPessoas();
}
function behave(a){
  if(a.isPlayer||a.tennis||a.npc) return;
  if(a.state==='sit'&&a.timer<=0){
    const opts=[ ()=>{ const s=seats.find(s=>s.room==='cafe'&&!s.who); s&&sitAt(a,s); },
      ()=>{ const b=BENCH[Math.floor(Math.random()*BENCH.length)]; goTo(a,{f:0,x:b.x+(Math.random()-.5)*2,z:b.z+1.5,o:true},()=>{a.state='idle';a.timer=10+Math.random()*10;}); },
      ()=>{ const s=ARQ.filter(s=>!s.who)[Math.floor(Math.random()*6)]; s&&sitAt(a,s); },
      ()=>{ const s=seats.find(s=>(s.room==='reuniao'||s.room==='conselho')&&!s.who); s&&sitAt(a,s); },
      ()=>{ const s=seats.find(s=>s.room==='deck'&&!s.who); s&&sitAt(a,s); } ];
    opts[Math.floor(Math.random()*opts.length)]();
    if(a.state==='sit') a.timer=10;
  } else if(a.state==='idle'&&a.timer<=0){ a.returning=true; sitAt(a,a.home.who&&a.home.who!==a?freeSeat(a.home.room)||a.home:a.home); }
  else if(a.state==='sit'&&a.seat&&a.seat!==a.home&&a.timer<=0){}
  if(a.state==='sit'&&a.seat!==a.home&&a.timer<=0){ sitAt(a,a.home); }
}

/* ===== figurantes: futebol, tênis, parque ===== */
const ball=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),mat('#f8fafc')); ball.castShadow=true; world.add(ball);
const B={x:47,z:0,vx:0,vz:0,last:null}; const SCORE=[0,0]; const players=[];
for(let i=0;i<10;i++){ const team=i<5?0:1; const hx=team?50+((i%5)%3)*4:44-((i%5)%3)*4, hz=-7+(i%5)*3.5;
  const a=spawn({npc:true,o:true,f:0,x:hx,z:hz,speed:3.4,look:{shirt:team?'#f8fafc':'#eab308',pants:team?'#1d4ed8':'#111827',skin:SKINS[i%5],hair:'#1c1917'}});
  a.home={x:hx,z:hz}; a.team=team; players.push(a); }
function racket(a,c){ const r=new THREE.Group(); const h=new THREE.Mesh(new THREE.CylinderGeometry(.025,.03,.3,6),mat('#1f2937')); h.position.y=-.15; r.add(h);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.16,.025,6,18),mat(c)); ring.position.y=-.47; r.add(ring); const net=new THREE.Mesh(new THREE.CircleGeometry(.15,14),new THREE.MeshBasicMaterial({color:'#f8fafc',transparent:true,opacity:.45,side:THREE.DoubleSide})); net.position.y=-.47; r.add(net);
  r.position.set(0,-.62,.05); r.rotation.x=.4; a.m.arms[1].add(r); a.racket=r; return r; }
let opp=spawn({npc:true,o:true,f:0,x:TX+9,z:TZ,speed:4,look:{shirt:'#f8fafc',pants:'#f8fafc',skin:SKINS[1]}});
let npcA=spawn({npc:true,o:true,f:0,x:TX-9,z:TZ,speed:4,look:{shirt:'#ef8b3b',pants:'#1f2937',skin:SKINS[3],hair:'#1c1917'}});
let tennisPlay=false; const TEN=[0,0];
racket(opp,'#e3423b'); racket(npcA,'#3a8fd6');
const tball=new THREE.Mesh(new THREE.SphereGeometry(.09,8,6),mat('#d9f99d',{emissive:'#a3e635',emissiveIntensity:.4})); world.add(tball); let tb={t:0,dir:1,z0:TZ,z1:TZ};
const walkers=[]; for(let i=0;i<7;i++){ const a=spawn({npc:true,o:true,f:0,x:PX+(Math.random()-.5)*30,z:PZ+(Math.random()-.5)*36,speed:1.1+Math.random()*.6,look:{shirt:SHIRTS[i%7],skin:SKINS[i%5],pants:i%2?'#1e3a8a':'#374151',hair:['#1c1917','#78350f','#facc15'][i%3]}}); if(i>3){a.m.g.scale.setScalar(.7);} walkers.push(a); a.wander=true; }

/* ===== funcionários (figurantes nas mesas) ===== */
{ const free=seats.filter(s=>s.scr&&!s.kaio&&!['ia','diretoria'].includes(s.room)); let n=0;
  free.forEach((s,i)=>{ if(i%3!==0||n>=22) return; n++; const a=spawn({staff:true,o:false,f:s.f,x:s.x,z:s.z,speed:1.4,look:{shirt:SHIRTS[i%7],skin:SKINS[i%5],pants:['#1f2937','#334155','#1e3a8a'][i%3],hair:['#1c1917','#78350f','#facc15','#a8a29e'][i%4]}});
    a.seat=s; s.who=a; a.sit=true; a.state='sit'; a.timer=20+Math.random()*90; a.m.g.rotation.y=s.ry; a.home=s; }); }
/* ===== você (Kaio) ===== */
player=spawn({isPlayer:true,nome:'Você',o:false,f:2,x:-14,z:-6,speed:2.6,look:{shirt:'#0f172a',pants:'#334155',skin:'#e0ac7e',hair:'#1c1917'}});
{ const s=seats.find(s=>s.kaio); player.x=s.x; player.z=s.z; player.seat=s; s.who=player; player.sit=true; player.state='sit'; player.timer=1e9; player.m.g.rotation.y=s.ry; }

/* ================= RÓTULOS HTML ================= */
const labelsEl=document.getElementById('labels');
roomLabels.forEach(r=>{ const e=document.createElement('div'); e.className='room'; labelsEl.appendChild(e); r.el=e; });
const OUT=[['Quadra society',47,3,FZ0-4],['Quadra de tênis',TX,3,TZ-9],['Parque',PX,4,PZ-24],['Beach play',PX+10,2,PZ+16],['Estacionamento',PKX,2,PKZ],['Entrada',0,3,18]].map(([t,x,y,z])=>{ const e=document.createElement('div'); e.className='room out'; e.textContent=t; labelsEl.appendChild(e); return {el:e,pos:new THREE.Vector3(x,y,z)}; });
player.tag=document.createElement('div'); player.tag.className='tag me'; player.tag.innerHTML='<i></i>Você'; labelsEl.appendChild(player.tag);
const v=new THREE.Vector3();
function place(el,pos,show){ if(!show){ el.style.display='none'; return; } v.copy(pos).project(camera); if(v.z>1||Math.abs(v.x)>1.1||Math.abs(v.y)>1.1){ el.style.display='none'; return; } el.style.display=''; el.style.transform=`translate(${(v.x*.5+.5)*innerWidth}px,${(-v.y*.5+.5)*innerHeight}px) translate(-50%,-100%)`; }
function placeC(el,pos,show){ if(!show){ el.style.display='none'; return; } v.copy(pos).project(camera); if(v.z>1){ el.style.display='none'; return; } el.style.display=''; el.style.transform=`translate(${(v.x*.5+.5)*innerWidth}px,${(-v.y*.5+.5)*innerHeight}px) translate(-50%,-50%)`; }

/* ================= ANDARES / CÂMERA ================= */
let view=-1, follow=false; const fly={on:false,t:0,p0:new THREE.Vector3(),p1:new THREE.Vector3(),t0:new THREE.Vector3(),t1:new THREE.Vector3()};
function flyTo(pos,target,dur=1.1){ fly.on=true; fly.t=0; fly.d=dur; fly.p0.copy(camera.position); fly.p1.copy(pos); fly.t0.copy(controls.target); fly.t1.copy(target); }
function setView(f,nofly){
  view=f; if(!nofly) follow=false; floors.forEach((g,i)=>g.visible=f<0||i<=f); roof.visible=f<0;
  document.querySelectorAll('#floors button').forEach(b=>b.classList.toggle('on',+b.dataset.f===f));
  if(nofly) return;
  if(f<0) flyTo(new THREE.Vector3(95,80,142),new THREE.Vector3(4,0,16));
  else if(innerWidth<innerHeight) flyTo(new THREE.Vector3(44,fy(f)+50,10),new THREE.Vector3(1,fy(f),0)); else flyTo(new THREE.Vector3(8,fy(f)+36,30),new THREE.Vector3(0,fy(f),-1));
}
const agentVisible=a=> a.o ? true : view===a.f;

/* ================= TOQUES ================= */
const ray=new THREE.Raycaster(), mouse=new THREE.Vector2(); let down=null;
canvas.addEventListener('pointerdown',e=>{ down={x:e.clientX,y:e.clientY,t:performance.now()}; });
canvas.addEventListener('pointerup',e=>{ if(!down) return; const moved=Math.hypot(e.clientX-down.x,e.clientY-down.y); if(moved<8&&performance.now()-down.t<450) tap(e); down=null; });
const visibleChain=o=>{ while(o){ if(!o.visible) return false; o=o.parent; } return true; };
function tap(e){
  mouse.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1); ray.setFromCamera(mouse,camera);
  const botMeshes=[]; agents.forEach(a=>{ if(a.m.g.visible) a.m.g.traverse(o=>{ if(o.isMesh){ o.userData.agent=a; botMeshes.push(o);} }); });
  const hit=ray.intersectObjects([...botMeshes,...clickables],false).find(h=>visibleChain(h.object));
  if(!hit) return;
  const ud=hit.object.userData;
  if(ud.agent && !ud.agent.npc && !ud.agent.staff && !ud.agent.isPlayer){ openBot(ud.agent); return; }
  if(ud.seat){ if(view<0) { setView(ud.seat.f); return; } if(ud.seat.who&&ud.seat.who!==player){ toast('Mesa ocupada'); return; } sitAt(player,ud.seat); player.then2=()=>openDesk(); hideHint(); return; }
  if(ud.floor!==undefined){ if(view<0){ setView(2); return; } const p=hit.point; goTo(player,{f:ud.floor,x:THREE.MathUtils.clamp(p.x,X0+.6,X1-.6),z:THREE.MathUtils.clamp(p.z,Z0+.6,Z1-.6),o:false}); hideHint(); return; }
  if(ud.ground){ const p=hit.point; if(inBuilding(p.x,p.z)) return; goTo(player,{f:0,x:p.x,z:p.z,o:true}); hideHint(); }
}
const hintEl=document.getElementById('hint'); function hideHint(){ hintEl.style.opacity=0; }

/* ================= PAINÉIS ================= */
const sheet=document.getElementById('sheet'), sc=document.getElementById('sc');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const STC={ok:'var(--ok)',wa:'var(--wa)',la:'var(--la)'}, STN={ok:'no prazo',wa:'chegando',la:'atrasada'};
function openSheet(html){ sc.innerHTML=html; sheet.classList.add('open'); }
function closeSheet(){ sheet.classList.remove('open'); document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==='campus')); }
document.getElementById('sx').onclick=closeSheet;
function taskRows(b){ return b.tarefas.map((t,i)=>`<div class="task"><span class="d" style="background:${t[3]?'var(--cy)':STC[t[1]]}"></span><div class="n">${esc(t[0])}<small>${t[3]?'confirmada':STN[t[1]]} · +${t[2]} XP${t[6]&&!t[3]?' · você respondeu: '+esc(t[6]):''}</small></div><button class="btn" data-b="${b.id}" data-i="${i}" ${t[3]?'disabled':''}>${t[3]?'Feito':'Confirmar'}</button></div>`).join(''); }
function openBot(b){ ronda(b);
  const f=b.o?'ao ar livre':['térreo','1º andar','2º andar'][b.f];
  openSheet(`<h2>${esc(b.emo)} ${esc(b.nome)}</h2><div class="sub">${esc(b.papel)} · ${esc(b.sala==='tenis'?'Quadra de tênis':ROOMNAMES[office][b.sala])} · ${f}</div>${taskRows(b)}${LIVE&&MD?(()=>{ const ts=MD.tarefasDo(b.ids||[b.id]); return `<div class="sub" style="margin-top:10px;font-weight:800">Direcionadas para ${esc(b.nome)} · ${ts.length}</div>`+ts.map(t=>`<div class="task"><span class="d" style="background:var(--cy)"></span><div class="n">${esc(t.titulo)}<small>mexida ${new Date(t.atualizado_em).toLocaleDateString('pt-BR')}</small></div><button class="btn" data-tf="${t.id}">Abrir</button></div>`).join('')+`<div class="row"><button class="btn" id="mdB">Setor no Meu dia</button></div>`; })():''}
  <div class="row"><button class="btn ghost" id="seeB">Ver no campus</button><button class="btn ghost" id="callB">Chamar até você</button></div><div class="row"><button class="btn ghost" id="visB">Mudar visual</button></div>${LIVE?(b.tarefas.length?'':'<div class="note">Sem tarefas abertas.</div>')+`<div class="row"><button class="btn ghost" id="rmB">Tirar da equipe</button></div>`:'<div class="note">Dados de exemplo. No app, o XP só entra quando a tarefa é confirmada com evidência.</div>'}`);
  if(LIVE&&MD){ document.getElementById('mdB').onclick=()=>{ closeSheet(); MD.abrirSetor(b.id); }; sc.querySelectorAll('[data-tf]').forEach(el=>el.onclick=()=>{ closeSheet(); MD.abrirTarefa(el.dataset.tf); }); }
  if(LIVE) document.getElementById('rmB').onclick=()=>{ const el=document.getElementById('rmB'); if(el.dataset.ok){ removerAgente(b); } else { el.dataset.ok=1; el.textContent='Toque de novo para confirmar'; } };
  document.getElementById('visB').onclick=()=>formVisual(b);
  document.getElementById('seeB').onclick=()=>{ closeSheet(); if(!b.o) setView(b.f); setTimeout(()=>flyTo(b.m.g.position.clone().add(new THREE.Vector3(7,9,11)),b.m.g.position.clone()),b.o?0:1150); };
  document.getElementById('callB').onclick=()=>{ if(b.tennis){ toast(b.nome+' está jogando'); closeSheet(); return; } const P=player, ang=P.m.g.rotation.y; goTo(b,{f:P.o?0:P.f,x:P.x+Math.sin(ang)*1.4,z:P.z+Math.cos(ang)*1.4,o:P.o},()=>{ b.state='idle'; b.timer=45; b.m.g.rotation.y=Math.atan2(player.x-b.x,player.z-b.z); toast(b.nome+' chegou'); }); toast(b.nome+' está indo até você'); closeSheet(); };
}
function openDesk(){ if(LIVE&&meuDia()){ MD.abrir(); return; } const all=OFFICES[office].bots.filter(b=>b.tarefas.some(t=>!t[3]&&t[1]!=='ok'));
  openSheet(`<h2>Sua mesa</h2><div class="sub">${esc(ROOMNAMES[office][player.seat?.room]||'')} · o que pede a sua atenção</div>${all.map(b=>taskRows(b).replace(/<div class="n">/g,`<div class="n"><small>${esc(b.emo+' '+b.nome)}</small>`)).join('')||'<div class="note">Nada pendente. Bom trabalho.</div>'}<div class="row"><button class="btn ghost" id="up">Levantar</button></div>`);
  document.getElementById('up').onclick=()=>{ closeSheet(); const r=roomAt(player.f,player.x,player.z); goTo(player,{f:player.f,x:r?r.cx:player.x,z:r?r.s*3.5:0,o:false}); };
}
sc.addEventListener('click',e=>{ const t=e.target.closest('[data-b]'); if(!t) return; const b=OFFICES[office].bots.find(x=>x.id===t.dataset.b); const k=b.tarefas[+t.dataset.i]; if(k[3]) return; confirmTask(b,k,t).then(ok=>{ if(!ok) return; t.disabled=true; t.textContent='Feito'; t.closest('.task').querySelector('.d').style.background='var(--cy)';
  const ag=botAgents.find(a=>a.id===b.id); if(ag){ ag.jump=1; const rest=b.tarefas.filter(x=>!x[3]); b.st=rest.some(x=>x[1]==='la')?'la':rest.some(x=>x[1]==='wa')?'wa':'ok'; ag.st=b.st; ag.tag.className='tag '+({ok:'',wa:'warn',la:'late'}[b.st]); } updateReport(); }); });
function updateReport(){ const ts=OFFICES[office].bots.flatMap(b=>b.tarefas.filter(t=>!t[3]));
  document.getElementById('nOk').textContent=ts.filter(t=>t[1]==='ok').length; document.getElementById('nWa').textContent=ts.filter(t=>t[1]==='wa').length; document.getElementById('nLa').textContent=ts.filter(t=>t[1]==='la').length;
  document.getElementById('relSub').textContent=OFFICES[office].bots.length+' na equipe'; }
function addXP(n){ const lv0=Math.floor(xp/100)+1; xp+=n; const lv=Math.floor(xp/100)+1; renderXP(); toast(lv>lv0?'Nível '+lv+'!':'+'+n+' XP'); }
function renderXP(){ const lv=Math.floor(xp/100)+1; document.getElementById('lv').textContent=lv; document.getElementById('xpn').textContent=xp; document.getElementById('xpNext').textContent='faltam '+(lv*100-xp)+' para o nível '+(lv+1); document.querySelector('#bar i').style.width=(xp%100)+'%'; }
const toastEl=document.getElementById('toast'); let tt; function toast(t){ toastEl.textContent=t; toastEl.classList.add('show'); clearTimeout(tt); tt=setTimeout(()=>toastEl.classList.remove('show'),1300); }
const MISSOES=()=>{ const ts=OFFICES[office].bots.flatMap(b=>b.tarefas); const done=ts.filter(t=>t[3]).length, late=ts.filter(t=>t[1]==='la'), lateDone=late.filter(t=>t[3]).length;
  return [['Confirmar 3 tarefas hoje',Math.min(done,3),3,50],['Zerar as atrasadas',lateDone,late.length||1,80],['Ronda: conversar com 5 setores',Math.min(visited.size,5),5,50],['Sentar na arquibancada',player.seat&&player.seat.room==='arquibancada'?1:0,1,0]]; };
document.querySelectorAll('#tabs button').forEach(b=>b.onclick=()=>{ document.querySelectorAll('#tabs button').forEach(x=>x.classList.toggle('on',x===b)); const t=b.dataset.t;
  if(t==='campus'){ closeSheet(); setView(-1); }
  if(t==='tarefas'&&LIVE&&meuDia()){ closeSheet(); MD.abrir(); return; }
  if(t==='tarefas'){ openSheet(`<h2>Tarefas</h2><div class="sub">${esc(OFFICES[office].nome)} · toque em Confirmar quando estiver feito</div>`+OFFICES[office].bots.map(b=>taskRows(b).replace(/<div class="n">/g,`<div class="n"><small>${esc(b.emo+' '+b.nome)}</small>`)).join('')+(LIVE?'':'<div class="note">Dados de exemplo.</div>')); }
  if(t==='missoes'){ openSheet(`<h2>Missões do dia</h2><div class="sub">Recompensa só com trabalho confirmado</div>`+MISSOES().map(m=>`<div class="task"><div class="n">${esc(m[0])}<small>${m[1]}/${m[2]} · +${m[3]} XP</small><div class="prog"><i style="width:${Math.round(m[1]/m[2]*100)}%"></i></div></div></div>`).join('')); }
  if(t==='bots'){ openSheet(`<h2>Equipe</h2><div class="sub">${esc(OFFICES[office].nome)}</div>`+botAgents.map(a=>`<div class="bot" data-id="${a.id}"><div class="av" style="background:${a.cor}33">${esc(a.emo)}</div><div class="n" style="flex:1"><b>${esc(a.nome)}</b><small style="display:block;color:var(--mut)">${esc(a.papel)}</small></div><span class="d" style="width:10px;height:10px;border-radius:50%;background:${STC[a.st]}"></span></div>`).join(''));
    sc.querySelectorAll('.bot').forEach(el=>el.onclick=()=>openBot(botAgents.find(a=>a.id===el.dataset.id))); if(LIVE){ sc.insertAdjacentHTML('beforeend',`<div class="row"><button class="btn" id="addA">Adicionar à equipe</button></div>`); document.getElementById('addA').onclick=formAgente; } else addPessoaUI(); }
});
document.querySelectorAll('#floors button').forEach(b=>b.onclick=()=>setView(+b.dataset.f));
document.querySelectorAll('#offices button[data-o]').forEach(b=>b.onclick=()=>{ if(b.dataset.o===office) return; office=b.dataset.o; document.querySelectorAll('#offices button').forEach(x=>x.classList.toggle('on',x===b)); closeSheet(); buildOffice(); });

/* ================= LOOP ================= */
const clock=new THREE.Clock(); let T=0;
function stepAgent(a,dt){
  const m=a.m;
  if(a.state==='walk'&&a.path.length){
    const p=a.path[0];
    if(p.f!==a.f && !p.o && !a.o){ a.f=p.f; a.x=p.x; a.z=p.z; a.path.shift(); }
    else { const dx=p.x-a.x, dz=p.z-a.z, d=Math.hypot(dx,dz), s=a.speed*dt;
      if(d<=s){ a.x=p.x; a.z=p.z; a.o=p.o; a.f=p.o?0:p.f; a.path.shift(); }
      else { a.x+=dx/d*s; a.z+=dz/d*s; m.g.rotation.y=Math.atan2(dx,dz); } }
    if(!a.path.length){ a.state='idle'; a.timer=6+Math.random()*8; const th=a.then; a.then=null; th&&th(); if(a===player&&player.then2&&player.sit){ const f=player.then2; player.then2=null; f(); } }
  }
  const walking=(a.state==='walk'&&a.path.length)||a.manual>0; a.phase+=dt*(walking?a.speed*5:0);
  const sw=walking?Math.sin(a.phase)*.65:0;
  if(a.sit){ m.legs.forEach(l=>l.rotation.x=-Math.PI/2); m.body.position.y=-.4+(a.seat&&a.seat.h||0); m.arms.forEach((ar,i)=>ar.rotation.x=-.9+Math.sin(T*6+i*2)*.08); }
  else { m.legs[0].rotation.x=sw; m.legs[1].rotation.x=-sw; m.arms[0].rotation.x=-sw*.8; m.arms[1].rotation.x=sw*.8; m.body.position.y=walking?Math.abs(Math.sin(a.phase))*.06:0; }
  if(a.jump){ a.jump=Math.max(0,a.jump-dt*1.6); m.body.position.y+=Math.sin(a.jump*Math.PI)*.8; }
  m.g.position.set(a.x,ptY(a),a.z); m.g.visible=agentVisible(a);
  a.timer-=dt;
}
function soccer(dt){
  B.x+=B.vx*dt; B.z+=B.vz*dt; B.vx*=Math.pow(.45,dt); B.vz*=Math.pow(.45,dt);
  if(B.z<FZ0+.3||B.z>FZ1-.3){ B.vz*=-1; B.z=THREE.MathUtils.clamp(B.z,FZ0+.3,FZ1-.3); }
  if(B.x<FX0+.3||B.x>FX1-.3){ if(Math.abs(B.z)<2.5){ const side=B.x>47?0:1; SCORE[side]++; if(B.last==='kaio') { toast('Golaço!'); } B.x=47;B.z=0;B.vx=B.vz=0; OUT[0].el.textContent='Quadra society · '+SCORE[0]+' x '+SCORE[1]; } else { B.vx*=-1; B.x=THREE.MathUtils.clamp(B.x,FX0+.3,FX1-.3);} }
  ball.position.set(B.x,.22,B.z); ball.rotation.x+=B.vz*dt*3; ball.rotation.z-=B.vx*dt*3;
  [0,1].forEach(team=>{ const ps=players.filter(p=>p.team===team); let near=ps[0],nd=1e9; ps.forEach(p=>{const d=Math.hypot(p.x-B.x,p.z-B.z); if(d<nd){nd=d;near=p;}});
    ps.forEach(p=>{ const tx=p===near?B.x-(team?-.4:.4):p.home.x+(B.x-47)*.4, tz=p===near?B.z:p.home.z+(B.z)*.3; const dx=tx-p.x,dz=tz-p.z,d=Math.hypot(dx,dz);
      if(d>.25){ p.state='walk'; p.path=[{f:0,x:tx,z:tz,o:true}]; p.speed=p===near?4.2:2.4; } else { p.state='idle'; p.path=[]; m_face(p,B.x-p.x,B.z-p.z); }
      if(p===near&&nd<.7&&Math.hypot(B.vx,B.vz)<4){ const goalX=team?FX0:FX1; const tx2=Math.random()<.15?goalX:ps[Math.floor(Math.random()*5)].x, tz2=Math.random()<.35?(Math.random()-.5)*4:ps[Math.floor(Math.random()*5)].z; const ddx=tx2-B.x,ddz=tz2-B.z,dd=Math.hypot(ddx,ddz)||1; const pow=8+Math.random()*6; B.vx=ddx/dd*pow; B.vz=ddz/dd*pow; B.last=team; } }); });
}
function m_face(a,dx,dz){ a.m.g.rotation.y=Math.atan2(dx,dz); }
const fed=()=>botAgents.find(a=>a.tennis);
function tennis(dt){
  const F=fed(); const A=tennisPlay?null:(F||npcA); const xa0=TX-10.5;
  if(F||tennisPlay){ const benchP={x:TX-13.5,z:TZ+(F&&!tennisPlay?-7:7)}; const w=tennisPlay?(F?[npcA,F]:[npcA]):[npcA]; w.forEach((q,i)=>{ const tx=benchP.x, tz=benchP.z+i*1.2; if(Math.hypot(q.x-tx,q.z-tz)>.3){ q.state='walk'; q.path=[{f:0,x:tx,z:tz,o:true}]; } else { q.state='idle'; q.path=[]; q.m.g.rotation.y=Math.PI/2; } }); }
  if(!player.racket) racket(player,'#f2d84b'); player.racket.visible=tennisPlay; npcA.racket.visible=!F||tennisPlay?true:false;
  tb.t+=dt/(tennisPlay?1.7:1.4);
  if(tb.t>=1){
    if(tennisPlay&&tb.dir<0){ const ok=Math.hypot(player.x-xa0,player.z-tb.z1)<2.2||(Math.abs(player.z-tb.z1)<1.6&&player.x<TX-2);
      if(ok){ player.m.arms[1].rotation.x=-2; } else { TEN[1]++; toast('Ponto do adversário'); }
      if(!ok){ tb.z1=TZ; } }
    if(tennisPlay&&tb.dir>0&&Math.random()<.18){ TEN[0]++; toast('Ponto seu!'); }
    OUT[1].el.textContent=tennisPlay?'Tênis · Você '+TEN[0]+' x '+TEN[1]:'Quadra de tênis';
    tb.t=0; tb.dir*=-1; tb.z0=tb.z1; tb.z1=TZ+(Math.random()-.5)*(tennisPlay?7:8); }
  const xa=TX-10.5, xb=TX+10.5, x=tb.dir>0?xa+(xb-xa)*tb.t:xb-(xb-xa)*tb.t, z=tb.z0+(tb.z1-tb.z0)*tb.t;
  tball.position.set(x,.3+Math.sin(tb.t*Math.PI)*2.4,z);
  const hit=(p,px,side)=>{ if(!p) return; const tz=tb.dir===side?tb.z1:p.z; const d=tz-p.z; if(Math.abs(d)>.2){ p.state='walk'; p.path=[{f:0,x:px,z:tz,o:true}]; } else { p.state='idle'; p.path=[]; } m_face(p,-side*-1*(side),0); p.m.g.rotation.y=side>0?Math.PI/2:-Math.PI/2; p.m.arms[1].rotation.x=tb.t>.85&&tb.dir===side?-2:-.4; };
  hit(A,xa,-1); hit(opp,xb,1); if(!A){ /* sem o Federer: bate-bola no paredão */ }
}
function wander(a){ if(a.state!=='walk'&&a.timer<=0){ a.state='walk'; a.path=[{f:0,x:PX+(Math.random()-.5)*36,z:PZ+(Math.random()-.5)*44,o:true}]; a.timer=4+Math.random()*6; } }

function resize(){ const w=innerWidth,h=innerHeight; renderer.setSize(w,h,false); camera.aspect=w/h; camera.fov=w<h?55:42; camera.updateProjectionMatrix(); }
addEventListener('resize',resize); resize();
const night=(()=>{ const h=new Date().getHours(); return h>=18||h<6; })();
if(night){ scene.background.set('#0b1630'); scene.fog.color.set('#0b1630'); sun.intensity=.5; sun.color.set('#9db4ff'); scene.children.find(o=>o.isHemisphereLight).intensity=.45;
  floors.forEach((g,f)=>{ const l=new THREE.PointLight('#ffe7b0',40,40); l.position.set(0,3.4,0); g.add(l); }); glassM.color.set('#ffd58a'); glassM.opacity=.3; glassM.emissive=new THREE.Color('#ffb347'); glassM.emissiveIntensity=.35; }

/* ================= JOGABILIDADE: controle, colisão, ações ================= */
const WALLS=[[],[],[]];
for(let f=0;f<3;f++){ const W=WALLS[f];
  for(const r of roomsAt[f]){ const zc=r.s<0?-1.5:1.5;
    if(!r.open){ W.push([r.x0,zc,r.cx-.9,zc],[r.cx+.9,zc,r.x1,zc]); }
    if(r.x0>X0+.1 && !(f===0&&r.k==='lobby')) W.push([r.x0,r.zA,r.x0,r.zB]); }
  W.push([X0,Z0,X1,Z0],[X0,Z0,X0,Z1],[X1,Z0,X1,Z1]);
  if(f===0) W.push([X0,Z1,-4,Z1],[4,Z1,X1,Z1],[-4,1.55,-1.2,1.55],[1.2,1.55,4,1.55]); else W.push([X0,Z1,X1,Z1]);
  W.push([-3,Z0,-3,-1.5],[3,Z0,3,-1.5],[-3,-1.5,3,-1.5]); }
function cross(ax,az,bx,bz,cx,cz,dx,dz){ const d=(bx-ax)*(dz-cz)-(bz-az)*(dx-cx); if(Math.abs(d)<1e-9) return false; const t=((cx-ax)*(dz-cz)-(cz-az)*(dx-cx))/d, u=((cx-ax)*(bz-az)-(cz-az)*(bx-ax))/d; return t>=0&&t<=1&&u>=0&&u<=1; }
function blocked(f,ax,az,bx,bz){ const dx=bx-ax,dz=bz-az,l=Math.hypot(dx,dz)||1, ex=bx+dx/l*.35, ez=bz+dz/l*.35; return WALLS[f].some(w=>cross(ax,az,ex,ez,w[0],w[1],w[2],w[3])); }
const inside=(x,z)=>x>X0&&x<X1&&z>Z0&&z<Z1;
const joy={x:0,y:0,on:false}; const jEl=document.getElementById('joy'), jKnob=jEl.querySelector('i');
function joyMove(e){ const r=jEl.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2; let dx=e.clientX-cx, dy=e.clientY-cy; const m=Math.hypot(dx,dy), R=r.width/2-8; if(m>R){dx*=R/m;dy*=R/m;} joy.x=dx/R; joy.y=dy/R; jKnob.style.transform=`translate(${dx}px,${dy}px)`; }
jEl.addEventListener('pointerdown',e=>{ joy.on=true; jEl.setPointerCapture(e.pointerId); joyMove(e); hideHint(); if(!follow) startFollow(); });
jEl.addEventListener('pointermove',e=>{ if(joy.on) joyMove(e); });
const joyEnd=()=>{ joy.on=false; joy.x=joy.y=0; jKnob.style.transform=''; }; jEl.addEventListener('pointerup',joyEnd); jEl.addEventListener('pointercancel',joyEnd);
const keys={}; addEventListener('keydown',e=>{ keys[e.key.toLowerCase()]=true; }); addEventListener('keyup',e=>{ keys[e.key.toLowerCase()]=false; });
let lastP=new THREE.Vector3();
function startFollow(){ follow=true; const p=player.m.g.position; if(!player.o&&view!==player.f) setView(player.f,true); if(player.o&&view<0){} const port=innerWidth<innerHeight; flyTo(p.clone().add(new THREE.Vector3(port?9:12,port?15:11,port?13:16)),p.clone().add(new THREE.Vector3(0,1,0)),.8); lastP.copy(p); document.getElementById('fol').classList.add('on'); }
document.getElementById('fol').onclick=()=>{ if(follow){ follow=false; document.getElementById('fol').classList.remove('on'); } else startFollow(); };
function playerControl(dt){
  let jx=joy.x, jy=joy.y; if(keys['w']||keys['arrowup']) jy=-1; if(keys['s']||keys['arrowdown']) jy=1; if(keys['a']||keys['arrowleft']) jx=-1; if(keys['d']||keys['arrowright']) jx=1;
  const mag=Math.min(1,Math.hypot(jx,jy)); player.manual=0;
  if(mag>.12){ if(!follow) startFollow();
    if(player.sit||player.state==='walk'){ if(player.seat){ player.seat.who=null; player.seat=null; } player.sit=false; player.path=[]; player.state='idle'; player.then=null; player.then2=null; }
    const fx=controls.target.x-camera.position.x, fz=controls.target.z-camera.position.z, fl=Math.hypot(fx,fz)||1; const F={x:fx/fl,z:fz/fl}, Rt={x:-F.z,z:F.x};
    const vx=(F.x*-jy+Rt.x*jx), vz=(F.z*-jy+Rt.z*jx), vl=Math.hypot(vx,vz)||1, sp=4.6*mag*dt;
    const nx=player.x+vx/vl*sp, nz=player.z+vz/vl*sp, f=player.o?0:player.f, checkW=player.o?f===0:true;
    const tryMove=(x,z)=>{ if((player.o||player.f===0)?!blocked(0,player.x,player.z,x,z):!blocked(f,player.x,player.z,x,z)){ player.x=x; player.z=z; return true; } return false; };
    if(!tryMove(nx,nz)){ tryMove(nx,player.z)||tryMove(player.x,nz); }
    if(player.o||player.f===0){ const o=!inside(player.x,player.z); if(o!==player.o){ player.o=o; player.f=0; } }
    if(tennisPlay&&(!player.o||player.x>TX+1||player.x<TX-17||Math.abs(player.z-TZ)>10)){ tennisPlay=false; OUT[1].el.textContent='Quadra de tênis'; }
    player.m.g.rotation.y=Math.atan2(vx,vz); player.manual=mag; player.state='idle'; player.timer=99;
  }
  if(follow){ const p=player.m.g.position; const d=p.clone().sub(lastP); if(!fly.on){ camera.position.add(d); controls.target.add(d); } else { fly.p1.add(d); fly.t1.add(d); } lastP.copy(p);
    if(!player.o&&view!==player.f) setView(player.f,true); }
}
/* ação contextual */
const actEl=document.getElementById('act'); let act=null, actTick=0; const visited=new Set(); let rondaOk=false;
const near=(a,x,z,r)=>Math.hypot(a.x-x,a.z-z)<r;
function sameSpace(a,b){ return a.o&&b.o || (!a.o&&!b.o&&a.f===b.f); }
function updateAction(){
  let best=null; const P=player;
  if(!P.m.g.visible){}
  else if(P.sit){ best=P.seat&&P.seat.room==='ia'?{t:'Usar o Jarvis',fn:openJarvis}:P.seat&&P.seat.room==='arquibancada'?{t:'Levantar',fn:standUp}:{t:'Levantar',fn:standUp}; }
  else {
    const b=[...botAgents,...pessoaAgents].find(b=>sameSpace(b,P)&&near(b,P.x,P.z,2.4));
    if(b) best={t:(b.pessoa?'Falar com ':'Conversar com ')+b.nome,fn:()=>{ faceEach(b); b.pessoa?openPessoa(b):openBot(b,true); }};
    else if(P.o&&Math.hypot(B.x-P.x,B.z-P.z)<1.8) best={t:'Chutar a bola',fn:kick};
    else if(tennisPlay) best={t:'Parar de jogar',fn:()=>{ tennisPlay=false; OUT[1].el.textContent='Quadra de tênis'; }};
    else if(P.o&&P.x>TX-15&&P.x<TX&&Math.abs(P.z-TZ)<8) best={t:'Jogar tênis',fn:()=>{ tennisPlay=true; TEN[0]=TEN[1]=0; player.x=TX-10.5; player.z=TZ; startFollow(); toast('Ande até a bolinha para rebater'); }};
    else if(!P.o&&near(P,0,-.6,2)) best={t:'Elevador',fn:openElevator};
    else { const s=seats.filter(s=>!s.who&&(s.o?P.o:(!P.o&&s.f===P.f))&&near(s,P.x,P.z,1.6)).sort((a,b)=>Math.hypot(a.x-P.x,a.z-P.z)-Math.hypot(b.x-P.x,b.z-P.z))[0];
      if(s) best={t:s.room==='ia'?'Sentar no Jarvis':s.room==='arquibancada'?'Sentar e assistir':'Sentar',fn:()=>{ sitAt(player,s); player.then2=s.room==='ia'?openJarvis:s.room==='arquibancada'?watchGame:openDesk; }}; }
  }
  act=best; actEl.style.display=best?'':'none'; if(best) actEl.textContent=best.t;
}
actEl.onclick=()=>{ act&&act.fn(); updateAction(); };
function standUp(){ closeSheet(); const s=player.seat; if(s){ s.who=null; player.seat=null; } player.sit=false; player.state='idle'; if(s){ player.x+=Math.sin(s.ry)*.9; player.z+=Math.cos(s.ry)*.9; } }
function faceEach(b){ if(!b.sit) b.m.g.rotation.y=Math.atan2(player.x-b.x,player.z-b.z); player.m.g.rotation.y=Math.atan2(b.x-player.x,b.z-player.z); if(b.state==='idle') b.timer=Math.max(b.timer,8); }
function kick(){ const r=player.m.g.rotation.y; B.vx=Math.sin(r)*15; B.vz=Math.cos(r)*15; B.last='kaio'; player.m.arms[0].rotation.x=-1.2; }
function watchGame(){ follow=false; document.getElementById('fol').classList.remove('on'); flyTo(new THREE.Vector3(47,9,FZ1+13),new THREE.Vector3(47,0,0),1.2); toast('Bom jogo!'); }
function openElevator(){ openSheet(`<h2>Elevador</h2><div class="sub">Para qual andar?</div><div class="row">${['Térreo','1º andar','2º andar'].map((n,i)=>`<button class="btn ${i===player.f?'ghost':''}" data-el="${i}">${n}</button>`).join('')}</div>`);
  sc.querySelectorAll('[data-el]').forEach(b=>b.onclick=()=>{ const f=+b.dataset.el; closeSheet(); player.f=f; player.o=false; player.x=0; player.z=.4; setView(f,true); startFollow(); }); }
function ronda(b){ if(!b||b.pessoa) return; if(!visited.has(b.sala)){ visited.add(b.sala); if(!rondaOk&&visited.size>=5){ rondaOk=true; setTimeout(()=>addXP(50),600); } } }
function openJarvis(){ const bots=OFFICES[office].bots; const late=bots.flatMap(b=>b.tarefas.map((t,i)=>({b,t,i})).filter(x=>!x.t[3]&&x.t[1]==='la'));
  openSheet(`<h2>Central Jarvis</h2><div class="sub">Visão geral de ${esc(OFFICES[office].nome)} agora</div>`+
  bots.map(b=>{ const r=b.tarefas.filter(t=>!t[3]); const n=k=>r.filter(t=>t[1]===k).length; return `<div class="task"><span class="d" style="background:${STC[b.st]}"></span><div class="n">${esc(b.emo+' '+b.nome)}<small>${n('la')} atrasadas · ${n('wa')} chegando · ${n('ok')} no prazo</small></div></div>`; }).join('')+
  `<div class="row"><button class="btn" id="cobrar" ${late.length?'':'disabled'}>Cobrar atrasados (${late.length})</button><button class="btn ghost" id="up">Levantar</button></div><div class="note">Exemplo. No app real o Jarvis manda a cobrança pelo canal de cada bot.</div>`);
  document.getElementById('up').onclick=standUp;
  document.getElementById('cobrar').onclick=()=>{ const quem=[...new Set(late.map(x=>x.b.nome))].join(', '); toast('Cobrança enviada'); sc.querySelector('.note').textContent='Jarvis cobrou: '+quem+'.'; }; }
/* falas ao conversar */
const FALA={la:['Tô atrasado nisso, me dá uma força?','Isso aqui venceu, preciso da sua decisão.'],wa:['Tá chegando o prazo, já tô em cima.','Faltam poucos dias, vou fechar.'],ok:['Tudo em dia por aqui!','Sem pendência, chefe.']};
const _openBot=openBot; openBot=function(b,talk){ _openBot(b); if(LIVE&&!b.pessoa) liveChat(b); if(talk&&!LIVE){ const f=FALA[b.st]; sc.querySelector('.sub').insertAdjacentHTML('afterend',`<div class="say">“${esc(f[Math.floor(Math.random()*f.length)])}”</div>`); } };
/* pessoas da equipe (adicionadas por você) */
let pessoaAgents=[]; const PKEY=()=>'jarvis.campus.pessoas.'+office;
const loadP=()=>{ try{ return JSON.parse(localStorage.getItem(PKEY())||'[]'); }catch(e){ return []; } };
const saveP=l=>{ try{ localStorage.setItem(PKEY(),JSON.stringify(l)); }catch(e){} };
function spawnPessoas(){ pessoaAgents.forEach(a=>{ world.remove(a.m.g); if(a.seat) a.seat.who=null; agents.splice(agents.indexOf(a),1); a.tag.remove(); }); pessoaAgents=[];
  loadP().forEach((p,i)=>{ const s=freeSeat(p.sala)||freeSeat('foco'); if(!s) return; const a=spawn({pessoa:true,staff:true,nome:p.nome,papel:p.papel,sala:p.sala,o:false,f:s.f,x:s.x,z:s.z,speed:1.5,look:{shirt:PAL[i%6],skin:SKINS[i%5],pants:'#1f2937',hair:['#1c1917','#78350f','#facc15'][i%3]}});
    a.seat=s; s.who=a; a.sit=true; a.state='sit'; a.timer=30+Math.random()*60; a.m.g.rotation.y=s.ry; a.home=s; a.pid=p.id;
    const t=document.createElement('div'); t.className='tag pes'; t.innerHTML='<i></i>'; t.append(p.nome); t.onclick=e=>{e.stopPropagation(); openPessoa(a);}; labelsEl.appendChild(t); a.tag=t; pessoaAgents.push(a); }); }
const DESKROOMS=()=>[...new Set(seats.filter(s=>s.scr&&!s.kaio).map(s=>s.room))];
function addPessoaUI(){ sc.insertAdjacentHTML('beforeend',`<div class="row"><button class="btn" id="addP">Adicionar pessoa</button></div>`); document.getElementById('addP').onclick=formPessoa; pessoaAgents.forEach(a=>{}); 
  if(pessoaAgents.length) sc.insertAdjacentHTML('beforeend','<div class="sub" style="margin-top:14px">Pessoas</div>'+pessoaAgents.map(a=>`<div class="bot" data-pid="${esc(a.pid)}"><div class="av" style="background:#ffffff14">👤</div><div class="n" style="flex:1"><b>${esc(a.nome)}</b><small style="display:block;color:var(--mut)">${esc(a.papel||'')} · ${esc(ROOMNAMES[office][a.sala]||'')}</small></div></div>`).join(''));
  sc.querySelectorAll('[data-pid]').forEach(el=>el.onclick=()=>openPessoa(pessoaAgents.find(a=>a.pid===el.dataset.pid))); }
function formPessoa(){ openSheet(`<h2>Adicionar pessoa</h2><div class="sub">Ela ganha uma mesa no campus</div>
  <form id="fp" class="form"><label>Nome<input id="pn" required maxlength="30" autocomplete="off"></label><label>Função<input id="pr" maxlength="40" placeholder="ex.: Secretária" autocomplete="off"></label>
  <label>Sala<select id="ps">${DESKROOMS().map(k=>`<option value="${k}">${esc(ROOMNAMES[office][k])}</option>`).join('')}</select></label><div class="row"><button class="btn" type="submit">Adicionar</button></div></form>
  <div class="note">Por enquanto fica só neste aparelho. Para a pessoa entrar de verdade, o próximo passo é o convite por e-mail ligado ao banco.</div>`);
  document.getElementById('fp').onsubmit=e=>{ e.preventDefault(); const n=document.getElementById('pn').value.trim(); if(!n) return; const l=loadP(); l.push({id:Date.now().toString(36),nome:n,papel:document.getElementById('pr').value.trim(),sala:document.getElementById('ps').value}); saveP(l); spawnPessoas(); closeSheet(); toast(n+' entrou na equipe'); }; }
function openPessoa(a){ if(!a) return; openSheet(`<h2>👤 ${esc(a.nome)}</h2><div class="sub">${esc(a.papel||'Equipe')} · ${esc(ROOMNAMES[office][a.sala]||'')}</div><div class="say">“Oi! Ainda não tenho tarefas aqui no Jarvis.”</div><div class="row"><button class="btn ghost" id="rmP">Remover da equipe</button></div>`);
  document.getElementById('rmP').onclick=()=>{ saveP(loadP().filter(p=>p.id!==a.pid)); spawnPessoas(); closeSheet(); }; }

/* ================= MODO AO VIVO (Supabase) ================= */
const SBURL='https://qydpjcudcnirhybwlnhs.supabase.co', SBKEY='sb_publishable_41C_vG_CaaYvwiNhyGb88A_yQgSwqC1';
let sb=null, LIVE=false, session=null, MODELOS=[];
try{ sb=createClient(SBURL,SBKEY,{auth:{persistSession:true,storageKey:'jarvis.sb',autoRefreshToken:true}}); }catch(e){ sb=null; }
let MD=null; function meuDia(){ if(!MD&&sb) MD=criarMeuDia(sb,{onXP:v=>{ xp=v; renderXP(); },onChange:c=>{ const el=document.getElementById('mdN'); if(el) el.textContent=c.tarefas+c.agenda; const n2=document.getElementById('mdTopN'); if(n2) n2.textContent=c.agenda+c.notion||''; },onClose:()=>{ if(LIVE) loadLive().then(()=>{ const L=OFFICES[office]?.bots||[]; botAgents.forEach(ag=>{ const d=L.find(x=>x.id===ag.id); if(!d) return; ag.tarefas=d.tarefas; ag.st=d.st; if(ag.tag) ag.tag.className='tag '+({ok:'',wa:'warn',la:'late'}[d.st]); }); updateReport(); renderXP(); }).catch(()=>{}); }}); return MD; }
const modeEl=document.getElementById('mode');
function setMode(t,btn){ modeEl.innerHTML=''; modeEl.append(t); if(btn){ const b=document.createElement('button'); b.textContent=btn.t; b.onclick=btn.fn; modeEl.append(b); } modeEl.style.display=''; }
const SITMAP={atrasado:'la',chegando:'wa',no_prazo:'ok'};
const SALA_AREA={gestao:'coord',comercial:'marketing',dinheiro:'financeiro',manutencao:'operacoes',central:'ia',pessoal:'coord','smash-point':'tenis'};
const hashN=s=>{ let h=0; for(const c of String(s)) h=(h*31+c.charCodeAt(0))|0; return Math.abs(h); };
function withTimeout(p,ms){ return Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(new Error('tempo esgotado')),ms))]); }
async function loadLive(){
  const [esc,bots,its,resps,xpr,mods]=await Promise.all([
    sb.from('escritorios').select('id,nome,emoji,cor,tipo,ordem').order('ordem'),
    sb.from('bots').select('id,nome,emoji,sala,tipo,cor,missao,modelo_slug,escritorio_id,area_id,visual').eq('ativo',true),
    sb.from('itens_situacao').select('id,bot_id,titulo,prazo,xp,situacao,status,escritorio_id').eq('ativo',true).in('situacao',['atrasado','chegando','no_prazo']),
    sb.from('respostas').select('item_id,resposta,extra,criado_em').order('criado_em',{ascending:false}).limit(600),
    sb.from('xp_eventos').select('pontos'),
    sb.from('agente_modelos').select('slug,nome,emoji,divisao').order('nome')]);
  for(const r of [esc,bots,its,xpr]) if(r.error) throw r.error;
  MODELOS=mods.data||[]; const RESP={}; (resps&&resps.data||[]).forEach(r=>{ if(!RESP[r.item_id]) RESP[r.item_id]=(r.resposta==='texto'||!r.resposta)?(r.extra||''):r.resposta; });
  for(const k of Object.keys(OFFICES)) delete OFFICES[k];
  for(const e of esc.data){
    const kind=/pessoal/i.test(e.nome)||e.tipo==='pessoal'?'pessoal':'escola'; ROOMNAMES[e.id]=ROOMNAMES[kind];
    const seen={}, list=[];
    for(const b of bots.data.filter(b=>b.escritorio_id===e.id)){
      const sala=b.sala||SALA_AREA[b.area_id]||'foco', key=b.nome+'|'+sala;
      const tarefas=its.data.filter(i=>i.bot_id===b.id&&i.status!=='fechado').map(i=>[i.titulo||'Sem título',SITMAP[i.situacao]||'ok',i.xp||10,false,i.id,i.prazo,i.status==='respondido'?String(RESP[i.id]||'respondida').slice(0,60):'']);
      if(seen[key]){ seen[key].tarefas.push(...tarefas); seen[key].ids.push(b.id); continue; }
      const mod=MODELOS.find(m=>m.slug===b.modelo_slug);
      const d={id:b.id,ids:[b.id],nome:b.nome,emo:b.emoji||(b.tipo==='pessoa'?'👤':'🤖'),cor:b.cor||PAL[hashN(b.id)%6],sala,tipo:b.tipo||'bot',papel:b.missao||(mod?mod.nome:(b.tipo==='pessoa'?'Equipe':'Agente')),tarefas,criado:b.id.startsWith('app-'),visual:b.visual||{}};
      seen[key]=d; list.push(d); }
    list.forEach(d=>{ d.tarefas.sort((a,b)=>({la:0,wa:1,ok:2}[a[1]]-{la:0,wa:1,ok:2}[b[1]])); d.st=d.tarefas.some(t=>t[1]==='la')?'la':d.tarefas.some(t=>t[1]==='wa')?'wa':'ok'; });
    OFFICES[e.id]={nome:e.nome,placa:(kind==='escola'&&!/^escola/i.test(e.nome)?'ESCOLA ':'')+e.nome.toUpperCase(),kind,bots:list};
  }
  xp=(xpr.data||[]).reduce((s,r)=>s+(r.pontos||0),0);
  if(!OFFICES[office]) office=Object.keys(OFFICES).find(k=>OFFICES[k].kind==='escola')||Object.keys(OFFICES)[0];
}
function renderOfficeChips(){ const el=document.getElementById('offices'); el.innerHTML='';
  for(const [id,o] of Object.entries(OFFICES)){ const b=document.createElement('button'); b.className=id===office?'on':''; if(o.kind==='escola'||id==='escola'){ const im=document.createElement('img'); im.src='logo.png'; im.alt=''; im.style.cssText='height:18px;vertical-align:-4px;margin-right:6px'; b.append(im); } b.append(o.nome);
    b.onclick=()=>{ if(id===office) return; office=id; renderOfficeChips(); closeSheet(); buildOffice(); }; el.append(b); } }
async function goLive(){
  try{ await withTimeout(loadLive(),9000); LIVE=true; renderOfficeChips(); buildOffice(); renderXP(); modeEl.style.display='none'; meuDia()?.atualizar(); const mt=document.getElementById('mdTop'); if(mt){ mt.hidden=false; mt.onclick=e=>{ e.stopPropagation(); closeSheet(); MD.abrir(); }; } const rl=document.getElementById('rel'); if(rl){ rl.style.cursor='pointer'; rl.onclick=()=>{ closeSheet(); MD.abrir(); }; } const tb=document.querySelector('#tabs [data-t=tarefas]'); if(tb&&!tb.dataset.md){ tb.dataset.md=1; tb.lastChild.textContent='Meu dia'; tb.insertAdjacentHTML('beforeend',' <b id="mdN" style="font-size:10px"></b>'); } }
  catch(e){ LIVE=false; setMode('Não consegui ler o banco agora. Mostrando exemplo.',{t:'Tentar de novo',fn:goLive}); }
}
async function startLive(){
  if(!sb){ setMode('Modo demonstração'); return; }
  let s=null; try{ s=(await withTimeout(sb.auth.getSession(),4000)).data.session; }catch(e){ s=null; }
  if(s){ session=s; return goLive(); }
  // sem sessão: testa se o banco é alcançável (na página do Claude ele é bloqueado)
  try{ const r=await withTimeout(fetch(SBURL+'/auth/v1/health',{headers:{apikey:SBKEY}}),4000); if(!r.ok&&r.status!==401) throw 0; setMode('Modo demonstração',{t:'Entrar',fn:loginSheet}); }
  catch(e){ setMode('Modo demonstração · os dados reais abrem no app do Jarvis'); }
}
function loginSheet(){
  openSheet(`<h2>Entrar no Jarvis</h2><div class="sub">Mandamos um código para o seu e-mail</div><form id="lf" class="form"><label>E-mail<input id="le" type="email" required autocomplete="email" inputmode="email"></label><div class="row"><button class="btn" type="submit">Enviar código</button></div></form><div class="note" id="lmsg"></div>`);
  document.getElementById('lf').onsubmit=async e=>{ e.preventDefault(); const email=document.getElementById('le').value.trim(); const m=document.getElementById('lmsg'); m.textContent='Enviando…';
    const r=await sb.auth.signInWithOtp({email,options:{shouldCreateUser:false}}); if(r.error){ m.textContent='Não deu: '+r.error.message; return; }
    sc.innerHTML=`<h2>Digite o código</h2><div class="sub">Enviado para ${esc(email)}</div><form id="cf" class="form"><label>Código<input id="cc" inputmode="numeric" autocomplete="one-time-code" required maxlength="10"></label><div class="row"><button class="btn" type="submit">Entrar</button></div></form><div class="note" id="cmsg"></div>`;
    document.getElementById('cf').onsubmit=async e2=>{ e2.preventDefault(); const cm=document.getElementById('cmsg'); cm.textContent='Conferindo…';
      const v=await sb.auth.verifyOtp({email,token:document.getElementById('cc').value.replace(/\s/g,''),type:'email'}); if(v.error){ cm.textContent='Código não confere: '+v.error.message; return; }
      session=v.data.session; closeSheet(); toast('Bem-vindo, Kaio'); goLive(); }; }; }
async function confirmTask(b,k,btn){
  if(!LIVE||!k[4]){ k[3]=true; addXP(k[2]); return true; }
  btn.disabled=true; btn.textContent='Salvando…';
  const r=await sb.rpc('campus_confirmar_item',{p_item:k[4],p_obs:'confirmado no campus'});
  if(r.error){ btn.disabled=false; btn.textContent='Confirmar'; toast('Não salvou'); return false; }
  k[3]=true; const lv0=Math.floor(xp/100)+1, ganho=Math.max(0,(r.data.xp_total||xp)-xp); xp=r.data.xp_total??xp; renderXP(); const lv=Math.floor(xp/100)+1; toast(lv>lv0?'Nível '+lv+'!':ganho?'+'+ganho+' XP':'Confirmado'); return true;
}
function formAgente(){
  const salas=[...new Set(seats.filter(s=>s.scr&&!s.kaio).map(s=>s.room)),'diretoria'];
  openSheet(`<h2>Adicionar à equipe</h2><div class="sub">${esc(OFFICES[office].nome)}</div>
  <form id="fa" class="form"><label>Tipo<select id="at"><option value="bot">Agente de IA</option><option value="pessoa">Pessoa</option></select></label>
  <label>Nome<input id="an" required maxlength="40" autocomplete="off" placeholder="ex.: Criadora de conteúdo"></label>
  <label>Função<input id="ap" maxlength="80" autocomplete="off" placeholder="ex.: posts e vídeos da rematrícula"></label>
  <label>Sala<select id="as">${salas.map(k=>`<option value="${k}" ${k==='marketing'?'selected':''}>${esc(ROOMNAMES[office][k]||k)}</option>`).join('')}</select></label>
  <label id="amw">Especialidade (biblioteca de agentes)<select id="am"><option value="">Nenhuma</option>${MODELOS.map(m=>`<option value="${esc(m.slug)}">${esc((m.emoji||'')+' '+m.nome)}</option>`).join('')}</select></label>
  <div class="row"><button class="btn" type="submit">Adicionar</button></div></form><div class="note" id="amsg">${LIVE?'Fica salvo no banco e aparece em todos os seus aparelhos.':'Modo demonstração: fica só neste aparelho.'}</div>`);
  const tsel=document.getElementById('at'); tsel.onchange=()=>document.getElementById('amw').style.display=tsel.value==='bot'?'':'none';
  document.getElementById('fa').onsubmit=async e=>{ e.preventDefault(); const nome=document.getElementById('an').value.trim(); if(!nome) return;
    const tipo=tsel.value, papel=document.getElementById('ap').value.trim(), sala=document.getElementById('as').value, modelo=document.getElementById('am').value||null;
    if(!LIVE){ const l=loadP(); l.push({id:Date.now().toString(36),nome,papel,sala}); saveP(l); spawnPessoas(); closeSheet(); toast(nome+' entrou na equipe'); return; }
    document.getElementById('amsg').textContent='Salvando…';
    const r=await sb.rpc('campus_criar_agente',{p_escritorio:office,p_nome:nome,p_sala:sala,p_papel:papel||null,p_tipo:tipo,p_emoji:null,p_modelo:tipo==='bot'?modelo:null,p_cor:PAL[hashN(nome)%6]});
    if(r.error){ document.getElementById('amsg').textContent='Não salvou: '+r.error.message; return; }
    closeSheet(); toast(nome+' entrou na equipe'); await goLive(); };
}
let chatTimer=null;
async function liveChat(b){
  clearInterval(chatTimer);
  const anchor=sc.querySelector('.say')||sc.querySelector('.sub'); const ehPessoa=b.tipo==='pessoa'; anchor.insertAdjacentHTML('afterend',`<div class="sub" style="margin:6px 0 6px">${ehPessoa?'Recados para '+esc(b.nome)+' · ela lê quando entrar no Jarvis':'Conversa com '+esc(b.nome)}</div><div id="lc" class="lc"></div>
   <form id="lcf" class="lcf" style="margin-bottom:14px"><label style="flex:1;display:flex"><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Mensagem</span><input id="lci" maxlength="4000" autocomplete="off" placeholder="${ehPessoa?'Deixe um recado para ':'Escreva para '}${esc(b.nome)}"></label><button class="btn" type="submit">Enviar</button></form>`);
  const box=document.getElementById('lc');
  const load=async()=>{ if(!document.getElementById('lc')){ clearInterval(chatTimer); return; } const lc=document.getElementById('lc'); const r=await sb.from('conversa_mensagens').select('autor,texto,status,criado_em').in('bot_id',b.ids||[b.id]).order('criado_em',{ascending:false}).limit(6); if(r.error) return;
    const ms=r.data.reverse().filter(m=>!(ehPessoa&&m.autor==='bot')); const ult=ms[ms.length-1]; const esp=!ehPessoa&&ult&&ult.autor==='kaio'&&['pendente','lendo'].includes(ult.status);
    box.innerHTML=ms.map(m=>`<div class="lb ${m.autor==='kaio'?'me':''}">${esc(m.texto)}</div>`).join('')+(esp?`<div class="lb w">${ult.status==='lendo'?esc(b.nome)+' está lendo…':Date.now()-new Date(ult.criado_em)>180000?'Entregue. Ainda sem resposta: o OpenBot responde quando o computador está ligado.':'Entregue. Aguardando '+esc(b.nome)+'…'}</div>`:'')||(ehPessoa?'<div class="note">Nenhum recado ainda.</div>':'<div class="note">Mande a primeira mensagem.</div>'); };
  await load(); box.scrollTop=box.scrollHeight; chatTimer=setInterval(()=>load().then(()=>{box.scrollTop=box.scrollHeight;}),4000);
  document.getElementById('lcf').onsubmit=async e=>{ e.preventDefault(); const i=document.getElementById('lci'), t=i.value.trim(); if(!t) return; i.value='';
    const u=(await sb.auth.getUser()).data.user; const r=await sb.from('conversa_mensagens').insert({user_id:u.id,bot_id:b.id,autor:'kaio',texto:t});
    if(r.error){ toast('Não enviou'); i.value=t; return; } load(); };
}
async function removerAgente(b){ if(!LIVE) return; const r=await sb.from('bots').update({ativo:false}).in('id',b.ids||[b.id]); if(r.error){ toast('Não removeu'); return; } closeSheet(); toast(b.nome+' saiu da equipe'); goLive(); }

buildOffice(); renderXP(); setTimeout(hideHint,7000); startLive(); if(/\/campus\//.test(location.pathname)) document.getElementById('sair').hidden=false;
function loop(){
  const dt=Math.min(clock.getDelta(),.05); T+=dt;
  if(fly.on){ fly.t+=dt/fly.d; const k=fly.t>=1?1:1-Math.pow(1-fly.t,3); camera.position.lerpVectors(fly.p0,fly.p1,k); controls.target.lerpVectors(fly.t0,fly.t1,k); if(fly.t>=1) fly.on=false; }
  playerControl(dt); controls.update();
  soccer(dt); tennis(dt);
  for(const a of agents){ if(a.wander) wander(a); behave(a); stepAgent(a,dt); }
  heliStep(dt); heli.visible=roof.visible||HELI.phase!=='pousado';
  movingCars.forEach(c=>{ c.g.position.x+=c.d*c.v*dt; if(c.g.position.x>120) c.g.position.x=-120; if(c.g.position.x<-120) c.g.position.x=120; });
  swings.forEach((s,i)=>s.rotation.x=Math.sin(T*2+i)*.5);
  world.traverse; floors[2].children.forEach(o=>{ if(o.userData.spin){ o.rotation.y+=dt; o.position.y=2.2+Math.sin(T*2)*.15; } });
  seats.forEach(s=>{ if(s.scr) s.scr.material=s.who?SCR_ON:SCR_OFF; });
  // rótulos
  const far=camera.position.distanceTo(controls.target);
  botAgents.forEach(b=>place(b.tag,b.m.g.position.clone().setY(b.m.g.position.y+(b.sit?2.1:2.5)),b.m.g.visible));
  place(player.tag,player.m.g.position.clone().setY(player.m.g.position.y+(player.sit?2.1:2.5)),player.m.g.visible);
  roomLabels.forEach(r=>placeC(r.el,r.pos,view===r.f&&far<70));
  OUT.forEach(r=>placeC(r.el,r.pos,view<0||far>60||follow));
  if(++actTick%6===0) updateAction();
  pessoaAgents.forEach(a=>place(a.tag,a.m.g.position.clone().setY(a.m.g.position.y+(a.sit?2.1:2.5)),a.m.g.visible));
  renderer.render(scene,camera); requestAnimationFrame(loop);
}
const SCR_ON=mat('#38bdf8',{emissive:'#0ea5e9',emissiveIntensity:.9}), SCR_OFF=mat('#1f2937');
loop();
const ld=document.getElementById('load'); ld.style.opacity=0; setTimeout(()=>ld.remove(),700);
}
