(()=>{var em=Object.create;var xo=Object.defineProperty;var nm=Object.getOwnPropertyDescriptor;var im=Object.getOwnPropertyNames;var sm=Object.getPrototypeOf,rm=Object.prototype.hasOwnProperty;var om=(i,t)=>()=>(i&&(t=i(i=0)),t);var Xn=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports),am=(i,t)=>{for(var e in t)xo(i,e,{get:t[e],enumerable:!0})},Lu=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of im(t))!rm.call(i,s)&&s!==e&&xo(i,s,{get:()=>t[s],enumerable:!(n=nm(t,s))||n.enumerable});return i};var Du=(i,t,e)=>(e=i!=null?em(sm(i)):{},Lu(t||!i||!i.__esModule?xo(e,"default",{value:i,enumerable:!0}):e,i)),cm=i=>Lu(xo({},"__esModule",{value:!0}),i);var as={};am(as,{Headers:()=>Uh,Request:()=>Ax,Response:()=>Rx,default:()=>Dh,fetch:()=>Tx});var Ex,nr,Tx,Dh,Uh,Ax,Rx,Di=om(()=>{"use strict";Ex=function(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")},nr=Ex(),Tx=nr.fetch,Dh=nr.fetch.bind(nr),Uh=nr.Headers,Ax=nr.Request,Rx=nr.Response});var pf=Xn(Oh=>{"use strict";Object.defineProperty(Oh,"__esModule",{value:!0});var Nh=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}};Oh.default=Nh});var kh=Xn(Wr=>{"use strict";var mf=Wr&&Wr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Wr,"__esModule",{value:!0});var Px=mf((Di(),cm(as))),Ix=mf(pf()),Fh=class{constructor(t){this.shouldThrowOnError=!1,this.method=t.method,this.url=t.url,this.headers=t.headers,this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=t.shouldThrowOnError,this.signal=t.signal,this.isMaybeSingle=t.isMaybeSingle,t.fetch?this.fetch=t.fetch:typeof fetch>"u"?this.fetch=Px.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=Object.assign({},this.headers),this.headers[t]=e,this}then(t,e){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),this.method!=="GET"&&this.method!=="HEAD"&&(this.headers["Content-Type"]="application/json");let n=this.fetch,s=n(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async r=>{var o,a,c;let h=null,u=null,f=null,d=r.status,p=r.statusText;if(r.ok){if(this.method!=="HEAD"){let g=await r.text();g===""||(this.headers.Accept==="text/csv"||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?u=g:u=JSON.parse(g))}let x=(o=this.headers.Prefer)===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),_=(a=r.headers.get("content-range"))===null||a===void 0?void 0:a.split("/");x&&_&&_.length>1&&(f=parseInt(_[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(u)&&(u.length>1?(h={code:"PGRST116",details:`Results contain ${u.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},u=null,f=null,d=406,p="Not Acceptable"):u.length===1?u=u[0]:u=null)}else{let x=await r.text();try{h=JSON.parse(x),Array.isArray(h)&&r.status===404&&(u=[],h=null,d=200,p="OK")}catch{r.status===404&&x===""?(d=204,p="No Content"):h={message:x}}if(h&&this.isMaybeSingle&&(!((c=h?.details)===null||c===void 0)&&c.includes("0 rows"))&&(h=null,d=200,p="OK"),h&&this.shouldThrowOnError)throw new Ix.default(h)}return{error:h,data:u,count:f,status:d,statusText:p}});return this.shouldThrowOnError||(s=s.catch(r=>{var o,a,c;return{error:{message:`${(o=r?.name)!==null&&o!==void 0?o:"FetchError"}: ${r?.message}`,details:`${(a=r?.stack)!==null&&a!==void 0?a:""}`,hint:"",code:`${(c=r?.code)!==null&&c!==void 0?c:""}`},data:null,count:null,status:0,statusText:""}})),s.then(t,e)}};Wr.default=Fh});var zh=Xn($r=>{"use strict";var Lx=$r&&$r.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty($r,"__esModule",{value:!0});var Dx=Lx(kh()),Bh=class extends Dx.default{select(t){let e=!1,n=(t??"*").split("").map(s=>/\s/.test(s)&&!e?"":(s==='"'&&(e=!e),s)).join("");return this.url.searchParams.set("select",n),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(t,{ascending:e=!0,nullsFirst:n,foreignTable:s,referencedTable:r=s}={}){let o=r?`${r}.order`:"order",a=this.url.searchParams.get(o);return this.url.searchParams.set(o,`${a?`${a},`:""}${t}.${e?"asc":"desc"}${n===void 0?"":n?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:n=e}={}){let s=typeof n>"u"?"limit":`${n}.limit`;return this.url.searchParams.set(s,`${t}`),this}range(t,e,{foreignTable:n,referencedTable:s=n}={}){let r=typeof s>"u"?"offset":`${s}.offset`,o=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(r,`${t}`),this.url.searchParams.set(o,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return this.method==="GET"?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:t=!1,verbose:e=!1,settings:n=!1,buffers:s=!1,wal:r=!1,format:o="text"}={}){var a;let c=[t?"analyze":null,e?"verbose":null,n?"settings":null,s?"buffers":null,r?"wal":null].filter(Boolean).join("|"),h=(a=this.headers.Accept)!==null&&a!==void 0?a:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${o}; for="${h}"; options=${c};`,o==="json"?this:this}rollback(){var t;return((t=this.headers.Prefer)!==null&&t!==void 0?t:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}};$r.default=Bh});var Ia=Xn(Xr=>{"use strict";var Ux=Xr&&Xr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Xr,"__esModule",{value:!0});var Nx=Ux(zh()),Hh=class extends Nx.default{eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}in(t,e){let n=Array.from(new Set(e)).map(s=>typeof s=="string"&&new RegExp("[,()]").test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`in.(${n})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:n,type:s}={}){let r="";s==="plain"?r="pl":s==="phrase"?r="ph":s==="websearch"&&(r="w");let o=n===void 0?"":`(${n})`;return this.url.searchParams.append(t,`${r}fts${o}.${e}`),this}match(t){return Object.entries(t).forEach(([e,n])=>{this.url.searchParams.append(e,`eq.${n}`)}),this}not(t,e,n){return this.url.searchParams.append(t,`not.${e}.${n}`),this}or(t,{foreignTable:e,referencedTable:n=e}={}){let s=n?`${n}.or`:"or";return this.url.searchParams.append(s,`(${t})`),this}filter(t,e,n){return this.url.searchParams.append(t,`${e}.${n}`),this}};Xr.default=Hh});var Gh=Xn(jr=>{"use strict";var Ox=jr&&jr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(jr,"__esModule",{value:!0});var qr=Ox(Ia()),Vh=class{constructor(t,{headers:e={},schema:n,fetch:s}){this.url=t,this.headers=e,this.schema=n,this.fetch=s}select(t,{head:e=!1,count:n}={}){let s=e?"HEAD":"GET",r=!1,o=(t??"*").split("").map(a=>/\s/.test(a)&&!r?"":(a==='"'&&(r=!r),a)).join("");return this.url.searchParams.set("select",o),n&&(this.headers.Prefer=`count=${n}`),new qr.default({method:s,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(t,{count:e,defaultToNull:n=!0}={}){let s="POST",r=[];if(this.headers.Prefer&&r.push(this.headers.Prefer),e&&r.push(`count=${e}`),n||r.push("missing=default"),this.headers.Prefer=r.join(","),Array.isArray(t)){let o=t.reduce((a,c)=>a.concat(Object.keys(c)),[]);if(o.length>0){let a=[...new Set(o)].map(c=>`"${c}"`);this.url.searchParams.set("columns",a.join(","))}}return new qr.default({method:s,url:this.url,headers:this.headers,schema:this.schema,body:t,fetch:this.fetch,allowEmpty:!1})}upsert(t,{onConflict:e,ignoreDuplicates:n=!1,count:s,defaultToNull:r=!0}={}){let o="POST",a=[`resolution=${n?"ignore":"merge"}-duplicates`];if(e!==void 0&&this.url.searchParams.set("on_conflict",e),this.headers.Prefer&&a.push(this.headers.Prefer),s&&a.push(`count=${s}`),r||a.push("missing=default"),this.headers.Prefer=a.join(","),Array.isArray(t)){let c=t.reduce((h,u)=>h.concat(Object.keys(u)),[]);if(c.length>0){let h=[...new Set(c)].map(u=>`"${u}"`);this.url.searchParams.set("columns",h.join(","))}}return new qr.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:t,fetch:this.fetch,allowEmpty:!1})}update(t,{count:e}={}){let n="PATCH",s=[];return this.headers.Prefer&&s.push(this.headers.Prefer),e&&s.push(`count=${e}`),this.headers.Prefer=s.join(","),new qr.default({method:n,url:this.url,headers:this.headers,schema:this.schema,body:t,fetch:this.fetch,allowEmpty:!1})}delete({count:t}={}){let e="DELETE",n=[];return t&&n.push(`count=${t}`),this.headers.Prefer&&n.unshift(this.headers.Prefer),this.headers.Prefer=n.join(","),new qr.default({method:e,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}};jr.default=Vh});var gf=Xn(La=>{"use strict";Object.defineProperty(La,"__esModule",{value:!0});La.version=void 0;La.version="0.0.0-automated"});var _f=Xn(Da=>{"use strict";Object.defineProperty(Da,"__esModule",{value:!0});Da.DEFAULT_HEADERS=void 0;var Fx=gf();Da.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${Fx.version}`}});var yf=Xn(Yr=>{"use strict";var vf=Yr&&Yr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Yr,"__esModule",{value:!0});var kx=vf(Gh()),Bx=vf(Ia()),zx=_f(),Wh=class i{constructor(t,{headers:e={},schema:n,fetch:s}={}){this.url=t,this.headers=Object.assign(Object.assign({},zx.DEFAULT_HEADERS),e),this.schemaName=n,this.fetch=s}from(t){let e=new URL(`${this.url}/${t}`);return new kx.default(e,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(t){return new i(this.url,{headers:this.headers,schema:t,fetch:this.fetch})}rpc(t,e={},{head:n=!1,get:s=!1,count:r}={}){let o,a=new URL(`${this.url}/rpc/${t}`),c;n||s?(o=n?"HEAD":"GET",Object.entries(e).filter(([u,f])=>f!==void 0).map(([u,f])=>[u,Array.isArray(f)?`{${f.join(",")}}`:`${f}`]).forEach(([u,f])=>{a.searchParams.append(u,f)})):(o="POST",c=e);let h=Object.assign({},this.headers);return r&&(h.Prefer=`count=${r}`),new Bx.default({method:o,url:a,headers:h,schema:this.schemaName,body:c,fetch:this.fetch,allowEmpty:!1})}};Yr.default=Wh});var Ef=Xn(an=>{"use strict";var Zr=an&&an.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(an,"__esModule",{value:!0});an.PostgrestBuilder=an.PostgrestTransformBuilder=an.PostgrestFilterBuilder=an.PostgrestQueryBuilder=an.PostgrestClient=void 0;var xf=Zr(yf());an.PostgrestClient=xf.default;var bf=Zr(Gh());an.PostgrestQueryBuilder=bf.default;var Mf=Zr(Ia());an.PostgrestFilterBuilder=Mf.default;var Sf=Zr(zh());an.PostgrestTransformBuilder=Sf.default;var wf=Zr(kh());an.PostgrestBuilder=wf.default;an.default={PostgrestClient:xf.default,PostgrestQueryBuilder:bf.default,PostgrestFilterBuilder:Mf.default,PostgrestTransformBuilder:Sf.default,PostgrestBuilder:wf.default}});var Uf=Xn((bM,Df)=>{"use strict";Df.exports=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")}});var yh="170",ss={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},rs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},lm=0,Uu=1,hm=2;var Gd=1,xh=2,ai=3,Ii=0,hn=1,kn=2,Ci=0,Hs=1,Nu=2,Ou=3,Fu=4,um=5,Xi=100,dm=101,fm=102,pm=103,mm=104,gm=200,_m=201,vm=202,ym=203,Yc=204,Zc=205,xm=206,bm=207,Mm=208,Sm=209,wm=210,Em=211,Tm=212,Am=213,Rm=214,Jc=0,Kc=1,Qc=2,$s=3,tl=4,el=5,nl=6,il=7,Wd=0,Cm=1,Pm=2,Pi=0,Im=1,Lm=2,Dm=3,bh=4,Um=5,Nm=6,Om=7;var $d=300,Xs=301,qs=302,sl=303,rl=304,wa=306,ol=1e3,Yi=1001,al=1002,zn=1003,Fm=1004;var bo=1005;var jn=1006,gc=1007;var Zi=1008;var ui=1009,Xd=1010,qd=1011,Pr=1012,Mh=1013,Ji=1014,ci=1015,Hr=1016,Sh=1017,wh=1018,js=1020,jd=35902,Yd=1021,Zd=1022,Bn=1023,Jd=1024,Kd=1025,Vs=1026,Ys=1027,Qd=1028,Eh=1029,tf=1030,Th=1031;var Ah=1033,Wo=33776,$o=33777,Xo=33778,qo=33779,cl=35840,ll=35841,hl=35842,ul=35843,dl=36196,fl=37492,pl=37496,ml=37808,gl=37809,_l=37810,vl=37811,yl=37812,xl=37813,bl=37814,Ml=37815,Sl=37816,wl=37817,El=37818,Tl=37819,Al=37820,Rl=37821,jo=36492,Cl=36494,Pl=36495,ef=36283,Il=36284,Ll=36285,Dl=36286;var Yo=2300,Ul=2301,_c=2302,ku=2400,Bu=2401,zu=2402;var km=3200,Bm=3201;var nf=0,zm=1,Ri="",Qe="srgb",Qs="srgb-linear",Ea="linear",Me="srgb";var Es=7680;var Hu=519,Hm=512,Vm=513,Gm=514,sf=515,Wm=516,$m=517,Xm=518,qm=519,Vu=35044;var Gu="300 es",li=2e3,Zo=2001,di=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wu=1234567,Er=Math.PI/180,Ir=180/Math.PI;function tr(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]).toLowerCase()}function Ve(i,t,e){return Math.max(t,Math.min(e,i))}function Rh(i,t){return(i%t+t)%t}function jm(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Ym(i,t,e){return i!==t?(e-i)/(t-i):0}function Tr(i,t,e){return(1-e)*i+e*t}function Zm(i,t,e,n){return Tr(i,t,1-Math.exp(-e*n))}function Jm(i,t=1){return t-Math.abs(Rh(i,t*2)-t)}function Km(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Qm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function tg(i,t){return i+Math.floor(Math.random()*(t-i+1))}function eg(i,t){return i+Math.random()*(t-i)}function ng(i){return i*(.5-Math.random())}function ig(i){i!==void 0&&(Wu=i);let t=Wu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function sg(i){return i*Er}function rg(i){return i*Ir}function og(i){return(i&i-1)===0&&i!==0}function ag(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function lg(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),h=r((t+n)/2),u=o((t+n)/2),f=r((t-n)/2),d=o((t-n)/2),p=r((n-t)/2),v=o((n-t)/2);switch(s){case"XYX":i.set(a*u,c*f,c*d,a*h);break;case"YZY":i.set(c*d,a*u,c*f,a*h);break;case"ZXZ":i.set(c*f,c*d,a*u,a*h);break;case"XZX":i.set(a*u,c*v,c*p,a*h);break;case"YXY":i.set(c*p,a*u,c*v,a*h);break;case"ZYZ":i.set(c*v,c*p,a*u,a*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function nn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var os={DEG2RAD:Er,RAD2DEG:Ir,generateUUID:tr,clamp:Ve,euclideanModulo:Rh,mapLinear:jm,inverseLerp:Ym,lerp:Tr,damp:Zm,pingpong:Jm,smoothstep:Km,smootherstep:Qm,randInt:tg,randFloat:eg,randFloatSpread:ng,seededRandom:ig,degToRad:sg,radToDeg:rg,isPowerOfTwo:og,ceilPowerOfTwo:ag,floorPowerOfTwo:cg,setQuaternionFromProperEuler:lg,normalize:nn,denormalize:Bs},xt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ne=class i{constructor(t,e,n,s,r,o,a,c,h){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,h)}set(t,e,n,s,r,o,a,c,h){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],h=n[1],u=n[4],f=n[7],d=n[2],p=n[5],v=n[8],x=s[0],_=s[3],g=s[6],E=s[1],T=s[4],b=s[7],k=s[2],L=s[5],U=s[8];return r[0]=o*x+a*E+c*k,r[3]=o*_+a*T+c*L,r[6]=o*g+a*b+c*U,r[1]=h*x+u*E+f*k,r[4]=h*_+u*T+f*L,r[7]=h*g+u*b+f*U,r[2]=d*x+p*E+v*k,r[5]=d*_+p*T+v*L,r[8]=d*g+p*b+v*U,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],u=t[8];return e*o*u-e*a*h-n*r*u+n*a*c+s*r*h-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],u=t[8],f=u*o-a*h,d=a*c-u*r,p=h*r-o*c,v=e*f+n*d+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/v;return t[0]=f*x,t[1]=(s*h-u*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(n*c-h*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),h=Math.sin(r);return this.set(n*c,n*h,-n*(c*o+h*a)+o+t,-s*h,s*c,-s*(-h*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(vc.makeScale(t,e)),this}rotate(t){return this.premultiply(vc.makeRotation(-t)),this}translate(t,e){return this.premultiply(vc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},vc=new ne;function rf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Jo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function hg(){let i=Jo("canvas");return i.style.display="block",i}var $u={};function Sr(i){i in $u||($u[i]=!0,console.warn(i))}function ug(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function dg(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function fg(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var me={enabled:!0,workingColorSpace:Qs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Me&&(i.r=hi(i.r),i.g=hi(i.g),i.b=hi(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Me&&(i.r=Gs(i.r),i.g=Gs(i.g),i.b=Gs(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ri?Ea:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function hi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Xu=[.64,.33,.3,.6,.15,.06],qu=[.2126,.7152,.0722],ju=[.3127,.329],Yu=new ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zu=new ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);me.define({[Qs]:{primaries:Xu,whitePoint:ju,transfer:Ea,toXYZ:Yu,fromXYZ:Zu,luminanceCoefficients:qu,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:Xu,whitePoint:ju,transfer:Me,toXYZ:Yu,fromXYZ:Zu,luminanceCoefficients:qu,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}});var Ts,Nl=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ts===void 0&&(Ts=Jo("canvas")),Ts.width=t.width,Ts.height=t.height;let n=Ts.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ts}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Jo("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=hi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(hi(e[n]/255)*255):e[n]=hi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},pg=0,Ko=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pg++}),this.uuid=tr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(yc(s[o].image)):r.push(yc(s[o]))}else r=yc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function yc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Nl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var mg=0,rn=class i extends di{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Yi,s=Yi,r=jn,o=Zi,a=Bn,c=ui,h=i.DEFAULT_ANISOTROPY,u=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=tr(),this.name="",this.source=new Ko(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=c,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$d)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ol:t.x=t.x-Math.floor(t.x);break;case Yi:t.x=t.x<0?0:1;break;case al:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ol:t.y=t.y-Math.floor(t.y);break;case Yi:t.y=t.y<0?0:1;break;case al:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=$d;rn.DEFAULT_ANISOTROPY=1;var Se=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,h=c[0],u=c[4],f=c[8],d=c[1],p=c[5],v=c[9],x=c[2],_=c[6],g=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(v-_)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(v+_)<.1&&Math.abs(h+p+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(h+1)/2,b=(p+1)/2,k=(g+1)/2,L=(u+d)/4,U=(f+x)/4,C=(v+_)/4;return T>b&&T>k?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=L/n,r=U/n):b>k?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=L/s,r=C/s):k<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(k),n=U/r,s=C/r),this.set(n,s,r,e),this}let E=Math.sqrt((_-v)*(_-v)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(E)<.001&&(E=1),this.x=(_-v)/E,this.y=(f-x)/E,this.z=(d-u)/E,this.w=Math.acos((h+p+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ol=class extends di{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new rn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Ko(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},fi=class extends Ol{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Qo=class extends rn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=zn,this.minFilter=zn,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Fl=class extends rn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=zn,this.minFilter=zn,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Hn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],h=n[s+1],u=n[s+2],f=n[s+3],d=r[o+0],p=r[o+1],v=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=h,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=v,t[e+3]=x;return}if(f!==x||c!==d||h!==p||u!==v){let _=1-a,g=c*d+h*p+u*v+f*x,E=g>=0?1:-1,T=1-g*g;if(T>Number.EPSILON){let k=Math.sqrt(T),L=Math.atan2(k,g*E);_=Math.sin(_*L)/k,a=Math.sin(a*L)/k}let b=a*E;if(c=c*_+d*b,h=h*_+p*b,u=u*_+v*b,f=f*_+x*b,_===1-a){let k=1/Math.sqrt(c*c+h*h+u*u+f*f);c*=k,h*=k,u*=k,f*=k}}t[e]=c,t[e+1]=h,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],h=n[s+2],u=n[s+3],f=r[o],d=r[o+1],p=r[o+2],v=r[o+3];return t[e]=a*v+u*f+c*p-h*d,t[e+1]=c*v+u*d+h*f-a*p,t[e+2]=h*v+u*p+a*d-c*f,t[e+3]=u*v-a*f-c*d-h*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,h=a(n/2),u=a(s/2),f=a(r/2),d=c(n/2),p=c(s/2),v=c(r/2);switch(o){case"XYZ":this._x=d*u*f+h*p*v,this._y=h*p*f-d*u*v,this._z=h*u*v+d*p*f,this._w=h*u*f-d*p*v;break;case"YXZ":this._x=d*u*f+h*p*v,this._y=h*p*f-d*u*v,this._z=h*u*v-d*p*f,this._w=h*u*f+d*p*v;break;case"ZXY":this._x=d*u*f-h*p*v,this._y=h*p*f+d*u*v,this._z=h*u*v+d*p*f,this._w=h*u*f-d*p*v;break;case"ZYX":this._x=d*u*f-h*p*v,this._y=h*p*f+d*u*v,this._z=h*u*v-d*p*f,this._w=h*u*f+d*p*v;break;case"YZX":this._x=d*u*f+h*p*v,this._y=h*p*f+d*u*v,this._z=h*u*v-d*p*f,this._w=h*u*f-d*p*v;break;case"XZY":this._x=d*u*f-h*p*v,this._y=h*p*f-d*u*v,this._z=h*u*v+d*p*f,this._w=h*u*f+d*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],h=e[2],u=e[6],f=e[10],d=n+a+f;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-h)*p,this._z=(o-s)*p}else if(n>a&&n>f){let p=2*Math.sqrt(1+n-a-f);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+h)/p}else if(a>f){let p=2*Math.sqrt(1+a-n-f);this._w=(r-h)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+f-n-a);this._w=(o-s)/p,this._x=(r+h)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ve(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,h=e._z,u=e._w;return this._x=n*u+o*a+s*h-r*c,this._y=s*u+o*c+r*a-n*h,this._z=r*u+o*h+n*c-s*a,this._w=o*u-n*a-s*c-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let h=Math.sqrt(c),u=Math.atan2(h,a),f=Math.sin((1-e)*u)/h,d=Math.sin(e*u)/h;return this._w=o*f+this._w*d,this._x=n*f+this._x*d,this._y=s*f+this._y*d,this._z=r*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ju.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ju.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,h=2*(o*s-a*n),u=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+c*h+o*f-a*u,this.y=n+c*u+a*h-r*f,this.z=s+c*f+r*u-o*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xc.copy(this).projectOnVector(t),this.sub(xc)}reflect(t){return this.sub(xc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},xc=new D,Ju=new Hn,Ki=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Un):Un.fromBufferAttribute(r,o),Un.applyMatrix4(t.matrixWorld),this.expandByPoint(Un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Mo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Mo.copy(n.boundingBox)),Mo.applyMatrix4(t.matrixWorld),this.union(Mo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Un),Un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vr),So.subVectors(this.max,vr),As.subVectors(t.a,vr),Rs.subVectors(t.b,vr),Cs.subVectors(t.c,vr),Mi.subVectors(Rs,As),Si.subVectors(Cs,Rs),Bi.subVectors(As,Cs);let e=[0,-Mi.z,Mi.y,0,-Si.z,Si.y,0,-Bi.z,Bi.y,Mi.z,0,-Mi.x,Si.z,0,-Si.x,Bi.z,0,-Bi.x,-Mi.y,Mi.x,0,-Si.y,Si.x,0,-Bi.y,Bi.x,0];return!bc(e,As,Rs,Cs,So)||(e=[1,0,0,0,1,0,0,0,1],!bc(e,As,Rs,Cs,So))?!1:(wo.crossVectors(Mi,Si),e=[wo.x,wo.y,wo.z],bc(e,As,Rs,Cs,So))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Un).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ni),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},ni=[new D,new D,new D,new D,new D,new D,new D,new D],Un=new D,Mo=new Ki,As=new D,Rs=new D,Cs=new D,Mi=new D,Si=new D,Bi=new D,vr=new D,So=new D,wo=new D,zi=new D;function bc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){zi.fromArray(i,r);let a=s.x*Math.abs(zi.x)+s.y*Math.abs(zi.y)+s.z*Math.abs(zi.z),c=t.dot(zi),h=e.dot(zi),u=n.dot(zi);if(Math.max(-Math.max(c,h,u),Math.min(c,h,u))>a)return!1}return!0}var gg=new Ki,yr=new D,Mc=new D,Lr=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):gg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;yr.subVectors(t,this.center);let e=yr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(yr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Mc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(yr.copy(t.center).add(Mc)),this.expandByPoint(yr.copy(t.center).sub(Mc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},ii=new D,Sc=new D,Eo=new D,wi=new D,wc=new D,To=new D,Ec=new D,Zs=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ii)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ii.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ii.copy(this.origin).addScaledVector(this.direction,e),ii.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Sc.copy(t).add(e).multiplyScalar(.5),Eo.copy(e).sub(t).normalize(),wi.copy(this.origin).sub(Sc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Eo),a=wi.dot(this.direction),c=-wi.dot(Eo),h=wi.lengthSq(),u=Math.abs(1-o*o),f,d,p,v;if(u>0)if(f=o*c-a,d=o*a-c,v=r*u,f>=0)if(d>=-v)if(d<=v){let x=1/u;f*=x,d*=x,p=f*(f+o*d+2*a)+d*(o*f+d+2*c)+h}else d=r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+h;else d=-r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+h;else d<=-v?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+d*(d+2*c)+h):d<=v?(f=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+h):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+d*(d+2*c)+h);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Sc).addScaledVector(Eo,d),p}intersectSphere(t,e){ii.subVectors(t.center,this.origin);let n=ii.dot(this.direction),s=ii.dot(ii)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,h=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return h>=0?(n=(t.min.x-d.x)*h,s=(t.max.x-d.x)*h):(n=(t.max.x-d.x)*h,s=(t.min.x-d.x)*h),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-d.z)*f,c=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,c=(t.min.z-d.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ii)!==null}intersectTriangle(t,e,n,s,r){wc.subVectors(e,t),To.subVectors(n,t),Ec.crossVectors(wc,To);let o=this.direction.dot(Ec),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;wi.subVectors(this.origin,t);let c=a*this.direction.dot(To.crossVectors(wi,To));if(c<0)return null;let h=a*this.direction.dot(wc.cross(wi));if(h<0||c+h>o)return null;let u=-a*wi.dot(Ec);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Le=class i{constructor(t,e,n,s,r,o,a,c,h,u,f,d,p,v,x,_){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,h,u,f,d,p,v,x,_)}set(t,e,n,s,r,o,a,c,h,u,f,d,p,v,x,_){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=h,g[6]=u,g[10]=f,g[14]=d,g[3]=p,g[7]=v,g[11]=x,g[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Ps.setFromMatrixColumn(t,0).length(),r=1/Ps.setFromMatrixColumn(t,1).length(),o=1/Ps.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),h=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let d=o*u,p=o*f,v=a*u,x=a*f;e[0]=c*u,e[4]=-c*f,e[8]=h,e[1]=p+v*h,e[5]=d-x*h,e[9]=-a*c,e[2]=x-d*h,e[6]=v+p*h,e[10]=o*c}else if(t.order==="YXZ"){let d=c*u,p=c*f,v=h*u,x=h*f;e[0]=d+x*a,e[4]=v*a-p,e[8]=o*h,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=p*a-v,e[6]=x+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*u,p=c*f,v=h*u,x=h*f;e[0]=d-x*a,e[4]=-o*f,e[8]=v+p*a,e[1]=p+v*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*h,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*u,p=o*f,v=a*u,x=a*f;e[0]=c*u,e[4]=v*h-p,e[8]=d*h+x,e[1]=c*f,e[5]=x*h+d,e[9]=p*h-v,e[2]=-h,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,p=o*h,v=a*c,x=a*h;e[0]=c*u,e[4]=x-d*f,e[8]=v*f+p,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-h*u,e[6]=p*f+v,e[10]=d-x*f}else if(t.order==="XZY"){let d=o*c,p=o*h,v=a*c,x=a*h;e[0]=c*u,e[4]=-f,e[8]=h*u,e[1]=d*f+x,e[5]=o*u,e[9]=p*f-v,e[2]=v*f-p,e[6]=a*u,e[10]=x*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_g,t,vg)}lookAt(t,e,n){let s=this.elements;return vn.subVectors(t,e),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Ei.crossVectors(n,vn),Ei.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Ei.crossVectors(n,vn)),Ei.normalize(),Ao.crossVectors(vn,Ei),s[0]=Ei.x,s[4]=Ao.x,s[8]=vn.x,s[1]=Ei.y,s[5]=Ao.y,s[9]=vn.y,s[2]=Ei.z,s[6]=Ao.z,s[10]=vn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],h=n[12],u=n[1],f=n[5],d=n[9],p=n[13],v=n[2],x=n[6],_=n[10],g=n[14],E=n[3],T=n[7],b=n[11],k=n[15],L=s[0],U=s[4],C=s[8],A=s[12],S=s[1],O=s[5],Y=s[9],K=s[13],I=s[2],F=s[6],B=s[10],it=s[14],q=s[3],ct=s[7],et=s[11],ft=s[15];return r[0]=o*L+a*S+c*I+h*q,r[4]=o*U+a*O+c*F+h*ct,r[8]=o*C+a*Y+c*B+h*et,r[12]=o*A+a*K+c*it+h*ft,r[1]=u*L+f*S+d*I+p*q,r[5]=u*U+f*O+d*F+p*ct,r[9]=u*C+f*Y+d*B+p*et,r[13]=u*A+f*K+d*it+p*ft,r[2]=v*L+x*S+_*I+g*q,r[6]=v*U+x*O+_*F+g*ct,r[10]=v*C+x*Y+_*B+g*et,r[14]=v*A+x*K+_*it+g*ft,r[3]=E*L+T*S+b*I+k*q,r[7]=E*U+T*O+b*F+k*ct,r[11]=E*C+T*Y+b*B+k*et,r[15]=E*A+T*K+b*it+k*ft,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],h=t[13],u=t[2],f=t[6],d=t[10],p=t[14],v=t[3],x=t[7],_=t[11],g=t[15];return v*(+r*c*f-s*h*f-r*a*d+n*h*d+s*a*p-n*c*p)+x*(+e*c*p-e*h*d+r*o*d-s*o*p+s*h*u-r*c*u)+_*(+e*h*f-e*a*p-r*o*f+n*o*p+r*a*u-n*h*u)+g*(-s*a*u-e*c*f+e*a*d+s*o*f-n*o*d+n*c*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],u=t[8],f=t[9],d=t[10],p=t[11],v=t[12],x=t[13],_=t[14],g=t[15],E=f*_*h-x*d*h+x*c*p-a*_*p-f*c*g+a*d*g,T=v*d*h-u*_*h-v*c*p+o*_*p+u*c*g-o*d*g,b=u*x*h-v*f*h+v*a*p-o*x*p-u*a*g+o*f*g,k=v*f*c-u*x*c-v*a*d+o*x*d+u*a*_-o*f*_,L=e*E+n*T+s*b+r*k;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/L;return t[0]=E*U,t[1]=(x*d*r-f*_*r-x*s*p+n*_*p+f*s*g-n*d*g)*U,t[2]=(a*_*r-x*c*r+x*s*h-n*_*h-a*s*g+n*c*g)*U,t[3]=(f*c*r-a*d*r-f*s*h+n*d*h+a*s*p-n*c*p)*U,t[4]=T*U,t[5]=(u*_*r-v*d*r+v*s*p-e*_*p-u*s*g+e*d*g)*U,t[6]=(v*c*r-o*_*r-v*s*h+e*_*h+o*s*g-e*c*g)*U,t[7]=(o*d*r-u*c*r+u*s*h-e*d*h-o*s*p+e*c*p)*U,t[8]=b*U,t[9]=(v*f*r-u*x*r-v*n*p+e*x*p+u*n*g-e*f*g)*U,t[10]=(o*x*r-v*a*r+v*n*h-e*x*h-o*n*g+e*a*g)*U,t[11]=(u*a*r-o*f*r-u*n*h+e*f*h+o*n*p-e*a*p)*U,t[12]=k*U,t[13]=(u*x*s-v*f*s+v*n*d-e*x*d-u*n*_+e*f*_)*U,t[14]=(v*a*s-o*x*s-v*n*c+e*x*c+o*n*_-e*a*_)*U,t[15]=(o*f*s-u*a*s+u*n*c-e*f*c-o*n*d+e*a*d)*U,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,h=r*o,u=r*a;return this.set(h*o+n,h*a-s*c,h*c+s*a,0,h*a+s*c,u*a+n,u*c-s*o,0,h*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,h=r+r,u=o+o,f=a+a,d=r*h,p=r*u,v=r*f,x=o*u,_=o*f,g=a*f,E=c*h,T=c*u,b=c*f,k=n.x,L=n.y,U=n.z;return s[0]=(1-(x+g))*k,s[1]=(p+b)*k,s[2]=(v-T)*k,s[3]=0,s[4]=(p-b)*L,s[5]=(1-(d+g))*L,s[6]=(_+E)*L,s[7]=0,s[8]=(v+T)*U,s[9]=(_-E)*U,s[10]=(1-(d+x))*U,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Ps.set(s[0],s[1],s[2]).length(),o=Ps.set(s[4],s[5],s[6]).length(),a=Ps.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Nn.copy(this);let h=1/r,u=1/o,f=1/a;return Nn.elements[0]*=h,Nn.elements[1]*=h,Nn.elements[2]*=h,Nn.elements[4]*=u,Nn.elements[5]*=u,Nn.elements[6]*=u,Nn.elements[8]*=f,Nn.elements[9]*=f,Nn.elements[10]*=f,e.setFromRotationMatrix(Nn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=li){let c=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),p,v;if(a===li)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Zo)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=li){let c=this.elements,h=1/(e-t),u=1/(n-s),f=1/(o-r),d=(e+t)*h,p=(n+s)*u,v,x;if(a===li)v=(o+r)*f,x=-2*f;else if(a===Zo)v=r*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*h,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ps=new D,Nn=new Le,_g=new D(0,0,0),vg=new D(1,1,1),Ei=new D,Ao=new D,vn=new D,Ku=new Le,Qu=new Hn,Yn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],h=s[5],u=s[9],f=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ve(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Ve(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ku.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ku,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qu.setFromEuler(this),this.setFromQuaternion(Qu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yn.DEFAULT_ORDER="XYZ";var Dr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},yg=0,td=new D,Is=new Hn,si=new Le,Ro=new D,xr=new D,xg=new D,bg=new Hn,ed=new D(1,0,0),nd=new D(0,1,0),id=new D(0,0,1),sd={type:"added"},Mg={type:"removed"},Ls={type:"childadded",child:null},Tc={type:"childremoved",child:null},on=class i extends di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=tr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new Yn,n=new Hn,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Le},normalMatrix:{value:new ne}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.multiply(Is),this}rotateOnWorldAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.premultiply(Is),this}rotateX(t){return this.rotateOnAxis(ed,t)}rotateY(t){return this.rotateOnAxis(nd,t)}rotateZ(t){return this.rotateOnAxis(id,t)}translateOnAxis(t,e){return td.copy(t).applyQuaternion(this.quaternion),this.position.add(td.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ed,t)}translateY(t){return this.translateOnAxis(nd,t)}translateZ(t){return this.translateOnAxis(id,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ro.copy(t):Ro.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(xr,Ro,this.up):si.lookAt(Ro,xr,this.up),this.quaternion.setFromRotationMatrix(si),s&&(si.extractRotation(s.matrixWorld),Is.setFromRotationMatrix(si),this.quaternion.premultiply(Is.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sd),Ls.child=t,this.dispatchEvent(Ls),Ls.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Mg),Tc.child=t,this.dispatchEvent(Tc),Tc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),si.multiply(t.parent.matrixWorld)),t.applyMatrix4(si),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sd),Ls.child=t,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,t,xg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,bg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let h=0,u=c.length;h<u;h++){let f=c[h];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,h=this.material.length;c<h;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),h=o(t.textures),u=o(t.images),f=o(t.shapes),d=o(t.skeletons),p=o(t.animations),v=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),h.length>0&&(n.textures=h),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=s,n;function o(a){let c=[];for(let h in a){let u=a[h];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};on.DEFAULT_UP=new D(0,1,0);on.DEFAULT_MATRIX_AUTO_UPDATE=!0;on.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var On=new D,ri=new D,Ac=new D,oi=new D,Ds=new D,Us=new D,rd=new D,Rc=new D,Cc=new D,Pc=new D,Ic=new Se,Lc=new Se,Dc=new Se,qi=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),On.subVectors(t,e),s.cross(On);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){On.subVectors(s,e),ri.subVectors(n,e),Ac.subVectors(t,e);let o=On.dot(On),a=On.dot(ri),c=On.dot(Ac),h=ri.dot(ri),u=ri.dot(Ac),f=o*h-a*a;if(f===0)return r.set(0,0,0),null;let d=1/f,p=(h*c-a*u)*d,v=(o*u-a*c)*d;return r.set(1-p-v,v,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,oi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,oi.x),c.addScaledVector(o,oi.y),c.addScaledVector(a,oi.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Ic.setScalar(0),Lc.setScalar(0),Dc.setScalar(0),Ic.fromBufferAttribute(t,e),Lc.fromBufferAttribute(t,n),Dc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ic,r.x),o.addScaledVector(Lc,r.y),o.addScaledVector(Dc,r.z),o}static isFrontFacing(t,e,n,s){return On.subVectors(n,e),ri.subVectors(t,e),On.cross(ri).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return On.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),On.cross(ri).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Ds.subVectors(s,n),Us.subVectors(r,n),Rc.subVectors(t,n);let c=Ds.dot(Rc),h=Us.dot(Rc);if(c<=0&&h<=0)return e.copy(n);Cc.subVectors(t,s);let u=Ds.dot(Cc),f=Us.dot(Cc);if(u>=0&&f<=u)return e.copy(s);let d=c*f-u*h;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(Ds,o);Pc.subVectors(t,r);let p=Ds.dot(Pc),v=Us.dot(Pc);if(v>=0&&p<=v)return e.copy(r);let x=p*h-c*v;if(x<=0&&h>=0&&v<=0)return a=h/(h-v),e.copy(n).addScaledVector(Us,a);let _=u*v-p*f;if(_<=0&&f-u>=0&&p-v>=0)return rd.subVectors(r,s),a=(f-u)/(f-u+(p-v)),e.copy(s).addScaledVector(rd,a);let g=1/(_+x+d);return o=x*g,a=d*g,e.copy(n).addScaledVector(Ds,o).addScaledVector(Us,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},of={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},Co={h:0,s:0,l:0};function Uc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var le=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,me.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=me.workingColorSpace){return this.r=t,this.g=e,this.b=n,me.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=me.workingColorSpace){if(t=Rh(t,1),e=Ve(e,0,1),n=Ve(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Uc(o,r,t+1/3),this.g=Uc(o,r,t),this.b=Uc(o,r,t-1/3)}return me.toWorkingColorSpace(this,s),this}setStyle(t,e=Qe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){let n=of[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hi(t.r),this.g=hi(t.g),this.b=hi(t.b),this}copyLinearToSRGB(t){return this.r=Gs(t.r),this.g=Gs(t.g),this.b=Gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return me.fromWorkingColorSpace(Ke.copy(this),t),Math.round(Ve(Ke.r*255,0,255))*65536+Math.round(Ve(Ke.g*255,0,255))*256+Math.round(Ve(Ke.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=me.workingColorSpace){me.fromWorkingColorSpace(Ke.copy(this),e);let n=Ke.r,s=Ke.g,r=Ke.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,h,u=(a+o)/2;if(a===o)c=0,h=0;else{let f=o-a;switch(h=u<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=h,t.l=u,t}getRGB(t,e=me.workingColorSpace){return me.fromWorkingColorSpace(Ke.copy(this),e),t.r=Ke.r,t.g=Ke.g,t.b=Ke.b,t}getStyle(t=Qe){me.fromWorkingColorSpace(Ke.copy(this),t);let e=Ke.r,n=Ke.g,s=Ke.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ti),this.setHSL(Ti.h+t,Ti.s+e,Ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ti),t.getHSL(Co);let n=Tr(Ti.h,Co.h,e),s=Tr(Ti.s,Co.s,e),r=Tr(Ti.l,Co.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ke=new le;le.NAMES=of;var Sg=0,Qi=class extends di{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sg++}),this.uuid=tr(),this.name="",this.blending=Hs,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yc,this.blendDst=Zc,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new le(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Es,this.stencilZFail=Es,this.stencilZPass=Es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Hs&&(n.blending=this.blending),this.side!==Ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Yc&&(n.blendSrc=this.blendSrc),this.blendDst!==Zc&&(n.blendDst=this.blendDst),this.blendEquation!==Xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$s&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Es&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Es&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Es&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Rn=class extends Qi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Wd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ke=new D,Po=new xt,An=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Vu,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Po.fromBufferAttribute(this,e),Po.applyMatrix3(t),this.setXY(e,Po.x,Po.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix3(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Bs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=nn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Bs(e,this.array)),e}setX(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Bs(e,this.array)),e}setY(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Bs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Bs(e,this.array)),e}setW(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),n=nn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),n=nn(n,this.array),s=nn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),n=nn(n,this.array),s=nn(s,this.array),r=nn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Vu&&(t.usage=this.usage),t}};var ta=class extends An{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ea=class extends An{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ye=class extends An{constructor(t,e,n){super(new Float32Array(t),e,n)}},wg=0,Tn=new Le,Nc=new on,Ns=new D,yn=new Ki,br=new Ki,je=new D,un=class i extends di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=tr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rf(t)?ea:ta)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ne().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,n){return Tn.makeTranslation(t,e,n),this.applyMatrix4(Tn),this}scale(t,e,n){return Tn.makeScale(t,e,n),this.applyMatrix4(Tn),this}lookAt(t){return Nc.lookAt(t),Nc.updateMatrix(),this.applyMatrix4(Nc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ye(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ki);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];yn.setFromBufferAttribute(r),this.morphTargetsRelative?(je.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(je),je.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(je)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(yn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];br.setFromBufferAttribute(a),this.morphTargetsRelative?(je.addVectors(yn.min,br.min),yn.expandByPoint(je),je.addVectors(yn.max,br.max),yn.expandByPoint(je)):(yn.expandByPoint(br.min),yn.expandByPoint(br.max))}yn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)je.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(je));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let h=0,u=a.count;h<u;h++)je.fromBufferAttribute(a,h),c&&(Ns.fromBufferAttribute(t,h),je.add(Ns)),s=Math.max(s,n.distanceToSquared(je))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new D,c[C]=new D;let h=new D,u=new D,f=new D,d=new xt,p=new xt,v=new xt,x=new D,_=new D;function g(C,A,S){h.fromBufferAttribute(n,C),u.fromBufferAttribute(n,A),f.fromBufferAttribute(n,S),d.fromBufferAttribute(r,C),p.fromBufferAttribute(r,A),v.fromBufferAttribute(r,S),u.sub(h),f.sub(h),p.sub(d),v.sub(d);let O=1/(p.x*v.y-v.x*p.y);isFinite(O)&&(x.copy(u).multiplyScalar(v.y).addScaledVector(f,-p.y).multiplyScalar(O),_.copy(f).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(O),a[C].add(x),a[A].add(x),a[S].add(x),c[C].add(_),c[A].add(_),c[S].add(_))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let C=0,A=E.length;C<A;++C){let S=E[C],O=S.start,Y=S.count;for(let K=O,I=O+Y;K<I;K+=3)g(t.getX(K+0),t.getX(K+1),t.getX(K+2))}let T=new D,b=new D,k=new D,L=new D;function U(C){k.fromBufferAttribute(s,C),L.copy(k);let A=a[C];T.copy(A),T.sub(k.multiplyScalar(k.dot(A))).normalize(),b.crossVectors(L,A);let O=b.dot(c[C])<0?-1:1;o.setXYZW(C,T.x,T.y,T.z,O)}for(let C=0,A=E.length;C<A;++C){let S=E[C],O=S.start,Y=S.count;for(let K=O,I=O+Y;K<I;K+=3)U(t.getX(K+0)),U(t.getX(K+1)),U(t.getX(K+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new An(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let s=new D,r=new D,o=new D,a=new D,c=new D,h=new D,u=new D,f=new D;if(t)for(let d=0,p=t.count;d<p;d+=3){let v=t.getX(d+0),x=t.getX(d+1),_=t.getX(d+2);s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,_),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(n,v),c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,_),a.add(u),c.add(u),h.add(u),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(_,h.x,h.y,h.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)je.fromBufferAttribute(t,e),je.normalize(),t.setXYZ(e,je.x,je.y,je.z)}toNonIndexed(){function t(a,c){let h=a.array,u=a.itemSize,f=a.normalized,d=new h.constructor(c.length*u),p=0,v=0;for(let x=0,_=c.length;x<_;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*u;for(let g=0;g<u;g++)d[v++]=h[p++]}return new An(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],h=t(c,n);e.setAttribute(a,h)}let r=this.morphAttributes;for(let a in r){let c=[],h=r[a];for(let u=0,f=h.length;u<f;u++){let d=h[u],p=t(d,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let h=o[a];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let h in c)c[h]!==void 0&&(t[h]=c[h]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let h=n[c];t.data.attributes[c]=h.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let h=this.morphAttributes[c],u=[];for(let f=0,d=h.length;f<d;f++){let p=h[f];u.push(p.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let h in s){let u=s[h];this.setAttribute(h,u.clone(e))}let r=t.morphAttributes;for(let h in r){let u=[],f=r[h];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(e));this.morphAttributes[h]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let h=0,u=o.length;h<u;h++){let f=o[h];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},od=new Le,Hi=new Zs,Io=new Lr,ad=new D,Lo=new D,Do=new D,Uo=new D,Oc=new D,No=new D,cd=new D,Oo=new D,Ht=class extends on{constructor(t=new un,e=new Rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){No.set(0,0,0);for(let c=0,h=r.length;c<h;c++){let u=a[c],f=r[c];u!==0&&(Oc.fromBufferAttribute(f,t),o?No.addScaledVector(Oc,u):No.addScaledVector(Oc.sub(e),u))}e.add(No)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(r),Hi.copy(t.ray).recast(t.near),!(Io.containsPoint(Hi.origin)===!1&&(Hi.intersectSphere(Io,ad)===null||Hi.origin.distanceToSquared(ad)>(t.far-t.near)**2))&&(od.copy(r).invert(),Hi.copy(t.ray).applyMatrix4(od),!(n.boundingBox!==null&&Hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Hi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,h=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=d.length;v<x;v++){let _=d[v],g=o[_.materialIndex],E=Math.max(_.start,p.start),T=Math.min(a.count,Math.min(_.start+_.count,p.start+p.count));for(let b=E,k=T;b<k;b+=3){let L=a.getX(b),U=a.getX(b+1),C=a.getX(b+2);s=Fo(this,g,t,n,h,u,f,L,U,C),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{let v=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let _=v,g=x;_<g;_+=3){let E=a.getX(_),T=a.getX(_+1),b=a.getX(_+2);s=Fo(this,o,t,n,h,u,f,E,T,b),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let v=0,x=d.length;v<x;v++){let _=d[v],g=o[_.materialIndex],E=Math.max(_.start,p.start),T=Math.min(c.count,Math.min(_.start+_.count,p.start+p.count));for(let b=E,k=T;b<k;b+=3){let L=b,U=b+1,C=b+2;s=Fo(this,g,t,n,h,u,f,L,U,C),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{let v=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let _=v,g=x;_<g;_+=3){let E=_,T=_+1,b=_+2;s=Fo(this,o,t,n,h,u,f,E,T,b),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}}};function Eg(i,t,e,n,s,r,o,a){let c;if(t.side===hn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Ii,a),c===null)return null;Oo.copy(a),Oo.applyMatrix4(i.matrixWorld);let h=e.ray.origin.distanceTo(Oo);return h<e.near||h>e.far?null:{distance:h,point:Oo.clone(),object:i}}function Fo(i,t,e,n,s,r,o,a,c,h){i.getVertexPosition(a,Lo),i.getVertexPosition(c,Do),i.getVertexPosition(h,Uo);let u=Eg(i,t,e,n,Lo,Do,Uo,cd);if(u){let f=new D;qi.getBarycoord(cd,Lo,Do,Uo,f),s&&(u.uv=qi.getInterpolatedAttribute(s,a,c,h,f,new xt)),r&&(u.uv1=qi.getInterpolatedAttribute(r,a,c,h,f,new xt)),o&&(u.normal=qi.getInterpolatedAttribute(o,a,c,h,f,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:h,normal:new D,materialIndex:0};qi.getNormal(Lo,Do,Uo,d.normal),u.face=d,u.barycoord=f}return u}var pi=class i extends un{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],h=[],u=[],f=[],d=0,p=0;v("z","y","x",-1,-1,n,e,t,o,r,0),v("z","y","x",1,-1,n,e,-t,o,r,1),v("x","z","y",1,1,t,n,e,s,o,2),v("x","z","y",1,-1,t,n,-e,s,o,3),v("x","y","z",1,-1,t,e,n,s,r,4),v("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ye(h,3)),this.setAttribute("normal",new ye(u,3)),this.setAttribute("uv",new ye(f,2));function v(x,_,g,E,T,b,k,L,U,C,A){let S=b/U,O=k/C,Y=b/2,K=k/2,I=L/2,F=U+1,B=C+1,it=0,q=0,ct=new D;for(let et=0;et<B;et++){let ft=et*O-K;for(let It=0;It<F;It++){let Nt=It*S-Y;ct[x]=Nt*E,ct[_]=ft*T,ct[g]=I,h.push(ct.x,ct.y,ct.z),ct[x]=0,ct[_]=0,ct[g]=L>0?1:-1,u.push(ct.x,ct.y,ct.z),f.push(It/U),f.push(1-et/C),it+=1}}for(let et=0;et<C;et++)for(let ft=0;ft<U;ft++){let It=d+ft+F*et,Nt=d+ft+F*(et+1),J=d+(ft+1)+F*(et+1),dt=d+(ft+1)+F*et;c.push(It,Nt,dt),c.push(Nt,J,dt),q+=6}a.addGroup(p,q,A),p+=q,d+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Js(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function sn(i){let t={};for(let e=0;e<i.length;e++){let n=Js(i[e]);for(let s in n)t[s]=n[s]}return t}function Tg(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function af(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:me.workingColorSpace}var Ag={clone:Js,merge:sn},Rg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Zn=class extends Qi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rg,this.fragmentShader=Cg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Js(t.uniforms),this.uniformsGroups=Tg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},na=class extends on{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=li}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ai=new D,ld=new xt,hd=new xt,tn=class extends na{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ir*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Er*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ir*2*Math.atan(Math.tan(Er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z),Ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z)}getViewSize(t,e){return this.getViewBounds(t,ld,hd),e.subVectors(hd,ld)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Er*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,h=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/h,s*=o.width/c,n*=o.height/h}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Os=-90,Fs=1,kl=class extends on{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new tn(Os,Fs,t,e);s.layers=this.layers,this.add(s);let r=new tn(Os,Fs,t,e);r.layers=this.layers,this.add(r);let o=new tn(Os,Fs,t,e);o.layers=this.layers,this.add(o);let a=new tn(Os,Fs,t,e);a.layers=this.layers,this.add(a);let c=new tn(Os,Fs,t,e);c.layers=this.layers,this.add(c);let h=new tn(Os,Fs,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let h of e)this.remove(h);if(t===li)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Zo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,h,u]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,h),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(f,d,p),t.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},ia=class extends rn{constructor(t,e,n,s,r,o,a,c,h,u){t=t!==void 0?t:[],e=e!==void 0?e:Xs,super(t,e,n,s,r,o,a,c,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Bl=class extends fi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ia(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:jn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new pi(5,5,5),r=new Zn({name:"CubemapFromEquirect",uniforms:Js(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:hn,blending:Ci});r.uniforms.tEquirect.value=e;let o=new Ht(s,r),a=e.minFilter;return e.minFilter===Zi&&(e.minFilter=jn),new kl(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Fc=new D,Pg=new D,Ig=new ne,Fn=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Fc.subVectors(n,e).cross(Pg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Fc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ig.getNormalMatrix(t),s=this.coplanarPoint(Fc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Vi=new Lr,ko=new D,Ur=class{constructor(t=new Fn,e=new Fn,n=new Fn,s=new Fn,r=new Fn,o=new Fn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=li){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],h=s[4],u=s[5],f=s[6],d=s[7],p=s[8],v=s[9],x=s[10],_=s[11],g=s[12],E=s[13],T=s[14],b=s[15];if(n[0].setComponents(c-r,d-h,_-p,b-g).normalize(),n[1].setComponents(c+r,d+h,_+p,b+g).normalize(),n[2].setComponents(c+o,d+u,_+v,b+E).normalize(),n[3].setComponents(c-o,d-u,_-v,b-E).normalize(),n[4].setComponents(c-a,d-f,_-x,b-T).normalize(),e===li)n[5].setComponents(c+a,d+f,_+x,b+T).normalize();else if(e===Zo)n[5].setComponents(a,f,x,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(t){return Vi.center.set(0,0,0),Vi.radius=.7071067811865476,Vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ko.x=s.normal.x>0?t.max.x:t.min.x,ko.y=s.normal.y>0?t.max.y:t.min.y,ko.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ko)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function cf(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Lg(i){let t=new WeakMap;function e(a,c){let h=a.array,u=a.usage,f=h.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,h,u),a.onUploadCallback();let p;if(h instanceof Float32Array)p=i.FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)p=i.SHORT;else if(h instanceof Uint32Array)p=i.UNSIGNED_INT;else if(h instanceof Int32Array)p=i.INT;else if(h instanceof Int8Array)p=i.BYTE;else if(h instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:p,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,h){let u=c.array,f=c.updateRanges;if(i.bindBuffer(h,a),f.length===0)i.bufferSubData(h,0,u);else{f.sort((p,v)=>p.start-v.start);let d=0;for(let p=1;p<f.length;p++){let v=f[d],x=f[p];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++d,f[d]=x)}f.length=d+1;for(let p=0,v=f.length;p<v;p++){let x=f[p];i.bufferSubData(h,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let h=t.get(a);if(h===void 0)t.set(a,e(a,c));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,a,c),h.version=a.version}}return{get:s,remove:r,update:o}}var Cn=class i extends un{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),h=a+1,u=c+1,f=t/a,d=e/c,p=[],v=[],x=[],_=[];for(let g=0;g<u;g++){let E=g*d-o;for(let T=0;T<h;T++){let b=T*f-r;v.push(b,-E,0),x.push(0,0,1),_.push(T/a),_.push(1-g/c)}}for(let g=0;g<c;g++)for(let E=0;E<a;E++){let T=E+h*g,b=E+h*(g+1),k=E+1+h*(g+1),L=E+1+h*g;p.push(T,b,L),p.push(b,k,L)}this.setIndex(p),this.setAttribute("position",new ye(v,3)),this.setAttribute("normal",new ye(x,3)),this.setAttribute("uv",new ye(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Dg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ug=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ng=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Og=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,zg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Vg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$g=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,t_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,e_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,n_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,i_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,s_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,r_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,o_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,a_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,c_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,l_="gl_FragColor = linearToOutputTexel( gl_FragColor );",h_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,u_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,d_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,f_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,p_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,m_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,g_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,__=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,v_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,y_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,x_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,b_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,M_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,S_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,w_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,E_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,T_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,A_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,R_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,C_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,P_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,I_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,L_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,D_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,U_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,N_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,O_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,F_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,B_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,z_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,H_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,V_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,G_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,W_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,X_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,q_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Y_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Z_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,J_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,K_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Q_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,e0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,n0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,i0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,s0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,r0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,o0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,a0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,c0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,l0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,h0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,u0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,d0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,f0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,p0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,m0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,g0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,v0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,y0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,x0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,b0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,M0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,S0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,E0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,T0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,A0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,R0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,I0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,L0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,D0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,N0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,k0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,B0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,z0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,H0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,V0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,G0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,X0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,q0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,J0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Q0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ev=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,iv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ov=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,av=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,hv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ae={alphahash_fragment:Dg,alphahash_pars_fragment:Ug,alphamap_fragment:Ng,alphamap_pars_fragment:Og,alphatest_fragment:Fg,alphatest_pars_fragment:kg,aomap_fragment:Bg,aomap_pars_fragment:zg,batching_pars_vertex:Hg,batching_vertex:Vg,begin_vertex:Gg,beginnormal_vertex:Wg,bsdfs:$g,iridescence_fragment:Xg,bumpmap_pars_fragment:qg,clipping_planes_fragment:jg,clipping_planes_pars_fragment:Yg,clipping_planes_pars_vertex:Zg,clipping_planes_vertex:Jg,color_fragment:Kg,color_pars_fragment:Qg,color_pars_vertex:t_,color_vertex:e_,common:n_,cube_uv_reflection_fragment:i_,defaultnormal_vertex:s_,displacementmap_pars_vertex:r_,displacementmap_vertex:o_,emissivemap_fragment:a_,emissivemap_pars_fragment:c_,colorspace_fragment:l_,colorspace_pars_fragment:h_,envmap_fragment:u_,envmap_common_pars_fragment:d_,envmap_pars_fragment:f_,envmap_pars_vertex:p_,envmap_physical_pars_fragment:E_,envmap_vertex:m_,fog_vertex:g_,fog_pars_vertex:__,fog_fragment:v_,fog_pars_fragment:y_,gradientmap_pars_fragment:x_,lightmap_pars_fragment:b_,lights_lambert_fragment:M_,lights_lambert_pars_fragment:S_,lights_pars_begin:w_,lights_toon_fragment:T_,lights_toon_pars_fragment:A_,lights_phong_fragment:R_,lights_phong_pars_fragment:C_,lights_physical_fragment:P_,lights_physical_pars_fragment:I_,lights_fragment_begin:L_,lights_fragment_maps:D_,lights_fragment_end:U_,logdepthbuf_fragment:N_,logdepthbuf_pars_fragment:O_,logdepthbuf_pars_vertex:F_,logdepthbuf_vertex:k_,map_fragment:B_,map_pars_fragment:z_,map_particle_fragment:H_,map_particle_pars_fragment:V_,metalnessmap_fragment:G_,metalnessmap_pars_fragment:W_,morphinstance_vertex:$_,morphcolor_vertex:X_,morphnormal_vertex:q_,morphtarget_pars_vertex:j_,morphtarget_vertex:Y_,normal_fragment_begin:Z_,normal_fragment_maps:J_,normal_pars_fragment:K_,normal_pars_vertex:Q_,normal_vertex:t0,normalmap_pars_fragment:e0,clearcoat_normal_fragment_begin:n0,clearcoat_normal_fragment_maps:i0,clearcoat_pars_fragment:s0,iridescence_pars_fragment:r0,opaque_fragment:o0,packing:a0,premultiplied_alpha_fragment:c0,project_vertex:l0,dithering_fragment:h0,dithering_pars_fragment:u0,roughnessmap_fragment:d0,roughnessmap_pars_fragment:f0,shadowmap_pars_fragment:p0,shadowmap_pars_vertex:m0,shadowmap_vertex:g0,shadowmask_pars_fragment:_0,skinbase_vertex:v0,skinning_pars_vertex:y0,skinning_vertex:x0,skinnormal_vertex:b0,specularmap_fragment:M0,specularmap_pars_fragment:S0,tonemapping_fragment:w0,tonemapping_pars_fragment:E0,transmission_fragment:T0,transmission_pars_fragment:A0,uv_pars_fragment:R0,uv_pars_vertex:C0,uv_vertex:P0,worldpos_vertex:I0,background_vert:L0,background_frag:D0,backgroundCube_vert:U0,backgroundCube_frag:N0,cube_vert:O0,cube_frag:F0,depth_vert:k0,depth_frag:B0,distanceRGBA_vert:z0,distanceRGBA_frag:H0,equirect_vert:V0,equirect_frag:G0,linedashed_vert:W0,linedashed_frag:$0,meshbasic_vert:X0,meshbasic_frag:q0,meshlambert_vert:j0,meshlambert_frag:Y0,meshmatcap_vert:Z0,meshmatcap_frag:J0,meshnormal_vert:K0,meshnormal_frag:Q0,meshphong_vert:tv,meshphong_frag:ev,meshphysical_vert:nv,meshphysical_frag:iv,meshtoon_vert:sv,meshtoon_frag:rv,points_vert:ov,points_frag:av,shadow_vert:cv,shadow_frag:lv,sprite_vert:hv,sprite_frag:uv},wt={common:{diffuse:{value:new le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},envMapRotation:{value:new ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new le(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},qn={basic:{uniforms:sn([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:ae.meshbasic_vert,fragmentShader:ae.meshbasic_frag},lambert:{uniforms:sn([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new le(0)}}]),vertexShader:ae.meshlambert_vert,fragmentShader:ae.meshlambert_frag},phong:{uniforms:sn([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new le(0)},specular:{value:new le(1118481)},shininess:{value:30}}]),vertexShader:ae.meshphong_vert,fragmentShader:ae.meshphong_frag},standard:{uniforms:sn([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag},toon:{uniforms:sn([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new le(0)}}]),vertexShader:ae.meshtoon_vert,fragmentShader:ae.meshtoon_frag},matcap:{uniforms:sn([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:ae.meshmatcap_vert,fragmentShader:ae.meshmatcap_frag},points:{uniforms:sn([wt.points,wt.fog]),vertexShader:ae.points_vert,fragmentShader:ae.points_frag},dashed:{uniforms:sn([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ae.linedashed_vert,fragmentShader:ae.linedashed_frag},depth:{uniforms:sn([wt.common,wt.displacementmap]),vertexShader:ae.depth_vert,fragmentShader:ae.depth_frag},normal:{uniforms:sn([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:ae.meshnormal_vert,fragmentShader:ae.meshnormal_frag},sprite:{uniforms:sn([wt.sprite,wt.fog]),vertexShader:ae.sprite_vert,fragmentShader:ae.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ae.background_vert,fragmentShader:ae.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ne}},vertexShader:ae.backgroundCube_vert,fragmentShader:ae.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ae.cube_vert,fragmentShader:ae.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ae.equirect_vert,fragmentShader:ae.equirect_frag},distanceRGBA:{uniforms:sn([wt.common,wt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ae.distanceRGBA_vert,fragmentShader:ae.distanceRGBA_frag},shadow:{uniforms:sn([wt.lights,wt.fog,{color:{value:new le(0)},opacity:{value:1}}]),vertexShader:ae.shadow_vert,fragmentShader:ae.shadow_frag}};qn.physical={uniforms:sn([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new le(0)},specularColor:{value:new le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag};var Bo={r:0,b:0,g:0},Gi=new Yn,dv=new Le;function fv(i,t,e,n,s,r,o){let a=new le(0),c=r===!0?0:1,h,u,f=null,d=0,p=null;function v(E){let T=E.isScene===!0?E.background:null;return T&&T.isTexture&&(T=(E.backgroundBlurriness>0?e:t).get(T)),T}function x(E){let T=!1,b=v(E);b===null?g(a,c):b&&b.isColor&&(g(b,1),T=!0);let k=i.xr.getEnvironmentBlendMode();k==="additive"?n.buffers.color.setClear(0,0,0,1,o):k==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(E,T){let b=v(T);b&&(b.isCubeTexture||b.mapping===wa)?(u===void 0&&(u=new Ht(new pi(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:Js(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(k,L,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Gi.copy(T.backgroundRotation),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(dv.makeRotationFromEuler(Gi)),u.material.toneMapped=me.getTransfer(b.colorSpace)!==Me,(f!==b||d!==b.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,f=b,d=b.version,p=i.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(h===void 0&&(h=new Ht(new Cn(2,2),new Zn({name:"BackgroundMaterial",uniforms:Js(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=b,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.toneMapped=me.getTransfer(b.colorSpace)!==Me,b.matrixAutoUpdate===!0&&b.updateMatrix(),h.material.uniforms.uvTransform.value.copy(b.matrix),(f!==b||d!==b.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=b,d=b.version,p=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null))}function g(E,T){E.getRGB(Bo,af(i)),n.buffers.color.setClear(Bo.r,Bo.g,Bo.b,T,o)}return{getClearColor:function(){return a},setClearColor:function(E,T=1){a.set(E),c=T,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,g(a,c)},render:x,addToRenderList:_}}function pv(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(S,O,Y,K,I){let F=!1,B=f(K,Y,O);r!==B&&(r=B,h(r.object)),F=p(S,K,Y,I),F&&v(S,K,Y,I),I!==null&&t.update(I,i.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,b(S,O,Y,K),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function c(){return i.createVertexArray()}function h(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function f(S,O,Y){let K=Y.wireframe===!0,I=n[S.id];I===void 0&&(I={},n[S.id]=I);let F=I[O.id];F===void 0&&(F={},I[O.id]=F);let B=F[K];return B===void 0&&(B=d(c()),F[K]=B),B}function d(S){let O=[],Y=[],K=[];for(let I=0;I<e;I++)O[I]=0,Y[I]=0,K[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Y,attributeDivisors:K,object:S,attributes:{},index:null}}function p(S,O,Y,K){let I=r.attributes,F=O.attributes,B=0,it=Y.getAttributes();for(let q in it)if(it[q].location>=0){let et=I[q],ft=F[q];if(ft===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(ft=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(ft=S.instanceColor)),et===void 0||et.attribute!==ft||ft&&et.data!==ft.data)return!0;B++}return r.attributesNum!==B||r.index!==K}function v(S,O,Y,K){let I={},F=O.attributes,B=0,it=Y.getAttributes();for(let q in it)if(it[q].location>=0){let et=F[q];et===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(et=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(et=S.instanceColor));let ft={};ft.attribute=et,et&&et.data&&(ft.data=et.data),I[q]=ft,B++}r.attributes=I,r.attributesNum=B,r.index=K}function x(){let S=r.newAttributes;for(let O=0,Y=S.length;O<Y;O++)S[O]=0}function _(S){g(S,0)}function g(S,O){let Y=r.newAttributes,K=r.enabledAttributes,I=r.attributeDivisors;Y[S]=1,K[S]===0&&(i.enableVertexAttribArray(S),K[S]=1),I[S]!==O&&(i.vertexAttribDivisor(S,O),I[S]=O)}function E(){let S=r.newAttributes,O=r.enabledAttributes;for(let Y=0,K=O.length;Y<K;Y++)O[Y]!==S[Y]&&(i.disableVertexAttribArray(Y),O[Y]=0)}function T(S,O,Y,K,I,F,B){B===!0?i.vertexAttribIPointer(S,O,Y,I,F):i.vertexAttribPointer(S,O,Y,K,I,F)}function b(S,O,Y,K){x();let I=K.attributes,F=Y.getAttributes(),B=O.defaultAttributeValues;for(let it in F){let q=F[it];if(q.location>=0){let ct=I[it];if(ct===void 0&&(it==="instanceMatrix"&&S.instanceMatrix&&(ct=S.instanceMatrix),it==="instanceColor"&&S.instanceColor&&(ct=S.instanceColor)),ct!==void 0){let et=ct.normalized,ft=ct.itemSize,It=t.get(ct);if(It===void 0)continue;let Nt=It.buffer,J=It.type,dt=It.bytesPerElement,Dt=J===i.INT||J===i.UNSIGNED_INT||ct.gpuType===Mh;if(ct.isInterleavedBufferAttribute){let at=ct.data,Bt=at.stride,Xt=ct.offset;if(at.isInstancedInterleavedBuffer){for(let se=0;se<q.locationSize;se++)g(q.location+se,at.meshPerAttribute);S.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let se=0;se<q.locationSize;se++)_(q.location+se);i.bindBuffer(i.ARRAY_BUFFER,Nt);for(let se=0;se<q.locationSize;se++)T(q.location+se,ft/q.locationSize,J,et,Bt*dt,(Xt+ft/q.locationSize*se)*dt,Dt)}else{if(ct.isInstancedBufferAttribute){for(let at=0;at<q.locationSize;at++)g(q.location+at,ct.meshPerAttribute);S.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let at=0;at<q.locationSize;at++)_(q.location+at);i.bindBuffer(i.ARRAY_BUFFER,Nt);for(let at=0;at<q.locationSize;at++)T(q.location+at,ft/q.locationSize,J,et,ft*dt,ft/q.locationSize*at*dt,Dt)}}else if(B!==void 0){let et=B[it];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(q.location,et);break;case 3:i.vertexAttrib3fv(q.location,et);break;case 4:i.vertexAttrib4fv(q.location,et);break;default:i.vertexAttrib1fv(q.location,et)}}}}E()}function k(){C();for(let S in n){let O=n[S];for(let Y in O){let K=O[Y];for(let I in K)u(K[I].object),delete K[I];delete O[Y]}delete n[S]}}function L(S){if(n[S.id]===void 0)return;let O=n[S.id];for(let Y in O){let K=O[Y];for(let I in K)u(K[I].object),delete K[I];delete O[Y]}delete n[S.id]}function U(S){for(let O in n){let Y=n[O];if(Y[S.id]===void 0)continue;let K=Y[S.id];for(let I in K)u(K[I].object),delete K[I];delete Y[S.id]}}function C(){A(),o=!0,r!==s&&(r=s,h(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:A,dispose:k,releaseStatesOfGeometry:L,releaseStatesOfProgram:U,initAttributes:x,enableAttribute:_,disableUnusedAttributes:E}}function mv(i,t,e){let n;function s(h){n=h}function r(h,u){i.drawArrays(n,h,u),e.update(u,n,1)}function o(h,u,f){f!==0&&(i.drawArraysInstanced(n,h,u,f),e.update(u,n,f))}function a(h,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,u,0,f);let p=0;for(let v=0;v<f;v++)p+=u[v];e.update(p,n,1)}function c(h,u,f,d){if(f===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<h.length;v++)o(h[v],u[v],d[v]);else{p.multiDrawArraysInstancedWEBGL(n,h,0,u,0,d,0,f);let v=0;for(let x=0;x<f;x++)v+=u[x]*d[x];e.update(v,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function gv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let U=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(U){return!(U!==Bn&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(U){let C=U===Hr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(U!==ui&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==ci&&!C)}function c(U){if(U==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp",u=c(h);u!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);let f=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),k=v>0,L=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:E,maxVaryings:T,maxFragmentUniforms:b,vertexTextures:k,maxSamples:L}}function _v(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Fn,a=new ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let p=f.length!==0||d||n!==0||s;return s=d,n=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=u(f,d,0)},this.setState=function(f,d,p){let v=f.clippingPlanes,x=f.clipIntersection,_=f.clipShadows,g=i.get(f);if(!s||v===null||v.length===0||r&&!_)r?u(null):h();else{let E=r?0:n,T=E*4,b=g.clippingState||null;c.value=b,b=u(v,d,T,p);for(let k=0;k!==T;++k)b[k]=e[k];g.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function h(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,d,p,v){let x=f!==null?f.length:0,_=null;if(x!==0){if(_=c.value,v!==!0||_===null){let g=p+x*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(_===null||_.length<g)&&(_=new Float32Array(g));for(let T=0,b=p;T!==x;++T,b+=4)o.copy(f[T]).applyMatrix4(E,a),o.normal.toArray(_,b),_[b+3]=o.constant}c.value=_,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,_}}function vv(i){let t=new WeakMap;function e(o,a){return a===sl?o.mapping=Xs:a===rl&&(o.mapping=qs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===sl||a===rl)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let h=new Bl(c.height);return h.fromEquirectangularTexture(i,o),t.set(o,h),o.addEventListener("dispose",s),e(h.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var sa=class extends na{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,o=r+h*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},zs=4,ud=[.125,.215,.35,.446,.526,.582],ji=20,kc=new sa,dd=new le,Bc=null,zc=0,Hc=0,Vc=!1,$i=(1+Math.sqrt(5))/2,ks=1/$i,fd=[new D(-$i,ks,0),new D($i,ks,0),new D(-ks,0,$i),new D(ks,0,$i),new D(0,$i,-ks),new D(0,$i,ks),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],ra=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Bc=this._renderer.getRenderTarget(),zc=this._renderer.getActiveCubeFace(),Hc=this._renderer.getActiveMipmapLevel(),Vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=md(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Bc,zc,Hc),this._renderer.xr.enabled=Vc,t.scissorTest=!1,zo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Xs||t.mapping===qs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Bc=this._renderer.getRenderTarget(),zc=this._renderer.getActiveCubeFace(),Hc=this._renderer.getActiveMipmapLevel(),Vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:Hr,format:Bn,colorSpace:Qs,depthBuffer:!1},s=pd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pd(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yv(r)),this._blurMaterial=xv(r,t,e)}return s}_compileMaterial(t){let e=new Ht(this._lodPlanes[0],t);this._renderer.compile(e,kc)}_sceneToCubeUV(t,e,n,s){let a=new tn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(dd),u.toneMapping=Pi,u.autoClear=!1;let p=new Rn({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1}),v=new Ht(new pi,p),x=!1,_=t.background;_?_.isColor&&(p.color.copy(_),t.background=null,x=!0):(p.color.copy(dd),x=!0);for(let g=0;g<6;g++){let E=g%3;E===0?(a.up.set(0,c[g],0),a.lookAt(h[g],0,0)):E===1?(a.up.set(0,0,c[g]),a.lookAt(0,h[g],0)):(a.up.set(0,c[g],0),a.lookAt(0,0,h[g]));let T=this._cubeSize;zo(s,E*T,g>2?T:0,T,T),u.setRenderTarget(s),x&&u.render(v,a),u.render(t,a)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=_}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Xs||t.mapping===qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=md());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ht(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;zo(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,kc)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=fd[(s-r-1)%fd.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,f=new Ht(this._lodPlanes[s],h),d=h.uniforms,p=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ji-1),x=r/v,_=isFinite(r)?1+Math.floor(u*x):ji;_>ji&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${ji}`);let g=[],E=0;for(let U=0;U<ji;++U){let C=U/x,A=Math.exp(-C*C/2);g.push(A),U===0?E+=A:U<_&&(E+=2*A)}for(let U=0;U<g.length;U++)g[U]=g[U]/E;d.envMap.value=t.texture,d.samples.value=_,d.weights.value=g,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:T}=this;d.dTheta.value=v,d.mipInt.value=T-n;let b=this._sizeLods[s],k=3*b*(s>T-zs?s-T+zs:0),L=4*(this._cubeSize-b);zo(e,k,L,3*b,2*b),c.setRenderTarget(e),c.render(f,kc)}};function yv(i){let t=[],e=[],n=[],s=i,r=i-zs+1+ud.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-zs?c=ud[o-i+zs-1]:o===0&&(c=0),n.push(c);let h=1/(a-2),u=-h,f=1+h,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,v=6,x=3,_=2,g=1,E=new Float32Array(x*v*p),T=new Float32Array(_*v*p),b=new Float32Array(g*v*p);for(let L=0;L<p;L++){let U=L%3*2/3-1,C=L>2?0:-1,A=[U,C,0,U+2/3,C,0,U+2/3,C+1,0,U,C,0,U+2/3,C+1,0,U,C+1,0];E.set(A,x*v*L),T.set(d,_*v*L);let S=[L,L,L,L,L,L];b.set(S,g*v*L)}let k=new un;k.setAttribute("position",new An(E,x)),k.setAttribute("uv",new An(T,_)),k.setAttribute("faceIndex",new An(b,g)),t.push(k),s>zs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function pd(i,t,e){let n=new fi(i,t,e);return n.texture.mapping=wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zo(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function xv(i,t,e){let n=new Float32Array(ji),s=new D(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ch(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function md(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ch(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function gd(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ch(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Ch(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bv(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,h=c===sl||c===rl,u=c===Xs||c===qs;if(h||u){let f=t.get(a),d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new ra(i)),f=h?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{let p=a.image;return h&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new ra(i)),f=h?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let c=0,h=6;for(let u=0;u<h;u++)a[u]!==void 0&&c++;return c===h}function r(a){let c=a.target;c.removeEventListener("dispose",r);let h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Mv(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Sr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Sv(i,t,e,n){let s={},r=new WeakMap;function o(f){let d=f.target;d.index!==null&&t.remove(d.index);for(let v in d.attributes)t.remove(d.attributes[v]);for(let v in d.morphAttributes){let x=d.morphAttributes[v];for(let _=0,g=x.length;_<g;_++)t.remove(x[_])}d.removeEventListener("dispose",o),delete s[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(f){let d=f.attributes;for(let v in d)t.update(d[v],i.ARRAY_BUFFER);let p=f.morphAttributes;for(let v in p){let x=p[v];for(let _=0,g=x.length;_<g;_++)t.update(x[_],i.ARRAY_BUFFER)}}function h(f){let d=[],p=f.index,v=f.attributes.position,x=0;if(p!==null){let E=p.array;x=p.version;for(let T=0,b=E.length;T<b;T+=3){let k=E[T+0],L=E[T+1],U=E[T+2];d.push(k,L,L,U,U,k)}}else if(v!==void 0){let E=v.array;x=v.version;for(let T=0,b=E.length/3-1;T<b;T+=3){let k=T+0,L=T+1,U=T+2;d.push(k,L,L,U,U,k)}}else return;let _=new(rf(d)?ea:ta)(d,1);_.version=x;let g=r.get(f);g&&t.remove(g),r.set(f,_)}function u(f){let d=r.get(f);if(d){let p=f.index;p!==null&&d.version<p.version&&h(f)}else h(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function wv(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,p){i.drawElements(n,p,r,d*o),e.update(p,n,1)}function h(d,p,v){v!==0&&(i.drawElementsInstanced(n,p,r,d*o,v),e.update(p,n,v))}function u(d,p,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,v);let _=0;for(let g=0;g<v;g++)_+=p[g];e.update(_,n,1)}function f(d,p,v,x){if(v===0)return;let _=t.get("WEBGL_multi_draw");if(_===null)for(let g=0;g<d.length;g++)h(d[g]/o,p[g],x[g]);else{_.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,x,0,v);let g=0;for(let E=0;E<v;E++)g+=p[E]*x[E];e.update(g,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=h,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Ev(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Tv(i,t,e){let n=new WeakMap,s=new Se;function r(o,a,c){let h=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==f){let A=function(){U.dispose(),n.delete(a),a.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();let p=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,_=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],T=0;p===!0&&(T=1),v===!0&&(T=2),x===!0&&(T=3);let b=a.attributes.position.count*T,k=1;b>t.maxTextureSize&&(k=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let L=new Float32Array(b*k*4*f),U=new Qo(L,b,k,f);U.type=ci,U.needsUpdate=!0;let C=T*4;for(let S=0;S<f;S++){let O=_[S],Y=g[S],K=E[S],I=b*k*4*S;for(let F=0;F<O.count;F++){let B=F*C;p===!0&&(s.fromBufferAttribute(O,F),L[I+B+0]=s.x,L[I+B+1]=s.y,L[I+B+2]=s.z,L[I+B+3]=0),v===!0&&(s.fromBufferAttribute(Y,F),L[I+B+4]=s.x,L[I+B+5]=s.y,L[I+B+6]=s.z,L[I+B+7]=0),x===!0&&(s.fromBufferAttribute(K,F),L[I+B+8]=s.x,L[I+B+9]=s.y,L[I+B+10]=s.z,L[I+B+11]=K.itemSize===4?s.w:1)}}d={count:f,texture:U,size:new xt(b,k)},n.set(a,d),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let x=0;x<h.length;x++)p+=h[x];let v=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",h)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Av(i,t,e,n){let s=new WeakMap;function r(c){let h=n.render.frame,u=c.geometry,f=t.get(c,u);if(s.get(f)!==h&&(t.update(f),s.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==h&&(d.update(),s.set(d,h))}return f}function o(){s=new WeakMap}function a(c){let h=c.target;h.removeEventListener("dispose",a),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:o}}var oa=class extends rn{constructor(t,e,n,s,r,o,a,c,h,u=Vs){if(u!==Vs&&u!==Ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Vs&&(n=Ji),n===void 0&&u===Ys&&(n=js),super(null,s,r,o,a,c,u,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:zn,this.minFilter=c!==void 0?c:zn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},lf=new rn,_d=new oa(1,1),hf=new Qo,uf=new Fl,df=new ia,vd=[],yd=[],xd=new Float32Array(16),bd=new Float32Array(9),Md=new Float32Array(4);function er(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=vd[s];if(r===void 0&&(r=new Float32Array(s),vd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function We(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ta(i,t){let e=yd[t];e===void 0&&(e=new Int32Array(t),yd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Rv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Cv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2fv(this.addr,t),We(e,t)}}function Pv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;i.uniform3fv(this.addr,t),We(e,t)}}function Iv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4fv(this.addr,t),We(e,t)}}function Lv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;Md.set(n),i.uniformMatrix2fv(this.addr,!1,Md),We(e,n)}}function Dv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;bd.set(n),i.uniformMatrix3fv(this.addr,!1,bd),We(e,n)}}function Uv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;xd.set(n),i.uniformMatrix4fv(this.addr,!1,xd),We(e,n)}}function Nv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ov(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2iv(this.addr,t),We(e,t)}}function Fv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;i.uniform3iv(this.addr,t),We(e,t)}}function kv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4iv(this.addr,t),We(e,t)}}function Bv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function zv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2uiv(this.addr,t),We(e,t)}}function Hv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;i.uniform3uiv(this.addr,t),We(e,t)}}function Vv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4uiv(this.addr,t),We(e,t)}}function Gv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(_d.compareFunction=sf,r=_d):r=lf,e.setTexture2D(t||r,s)}function Wv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||uf,s)}function $v(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||df,s)}function Xv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||hf,s)}function qv(i){switch(i){case 5126:return Rv;case 35664:return Cv;case 35665:return Pv;case 35666:return Iv;case 35674:return Lv;case 35675:return Dv;case 35676:return Uv;case 5124:case 35670:return Nv;case 35667:case 35671:return Ov;case 35668:case 35672:return Fv;case 35669:case 35673:return kv;case 5125:return Bv;case 36294:return zv;case 36295:return Hv;case 36296:return Vv;case 35678:case 36198:case 36298:case 36306:case 35682:return Gv;case 35679:case 36299:case 36307:return Wv;case 35680:case 36300:case 36308:case 36293:return $v;case 36289:case 36303:case 36311:case 36292:return Xv}}function jv(i,t){i.uniform1fv(this.addr,t)}function Yv(i,t){let e=er(t,this.size,2);i.uniform2fv(this.addr,e)}function Zv(i,t){let e=er(t,this.size,3);i.uniform3fv(this.addr,e)}function Jv(i,t){let e=er(t,this.size,4);i.uniform4fv(this.addr,e)}function Kv(i,t){let e=er(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Qv(i,t){let e=er(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function ty(i,t){let e=er(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function ey(i,t){i.uniform1iv(this.addr,t)}function ny(i,t){i.uniform2iv(this.addr,t)}function iy(i,t){i.uniform3iv(this.addr,t)}function sy(i,t){i.uniform4iv(this.addr,t)}function ry(i,t){i.uniform1uiv(this.addr,t)}function oy(i,t){i.uniform2uiv(this.addr,t)}function ay(i,t){i.uniform3uiv(this.addr,t)}function cy(i,t){i.uniform4uiv(this.addr,t)}function ly(i,t,e){let n=this.cache,s=t.length,r=Ta(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||lf,r[o])}function hy(i,t,e){let n=this.cache,s=t.length,r=Ta(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||uf,r[o])}function uy(i,t,e){let n=this.cache,s=t.length,r=Ta(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||df,r[o])}function dy(i,t,e){let n=this.cache,s=t.length,r=Ta(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||hf,r[o])}function fy(i){switch(i){case 5126:return jv;case 35664:return Yv;case 35665:return Zv;case 35666:return Jv;case 35674:return Kv;case 35675:return Qv;case 35676:return ty;case 5124:case 35670:return ey;case 35667:case 35671:return ny;case 35668:case 35672:return iy;case 35669:case 35673:return sy;case 5125:return ry;case 36294:return oy;case 36295:return ay;case 36296:return cy;case 35678:case 36198:case 36298:case 36306:case 35682:return ly;case 35679:case 36299:case 36307:return hy;case 35680:case 36300:case 36308:case 36293:return uy;case 36289:case 36303:case 36311:case 36292:return dy}}var zl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=qv(e.type)}},Hl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=fy(e.type)}},Vl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Gc=/(\w+)(\])?(\[|\.)?/g;function Sd(i,t){i.seq.push(t),i.map[t.id]=t}function py(i,t,e){let n=i.name,s=n.length;for(Gc.lastIndex=0;;){let r=Gc.exec(n),o=Gc.lastIndex,a=r[1],c=r[2]==="]",h=r[3];if(c&&(a=a|0),h===void 0||h==="["&&o+2===s){Sd(e,h===void 0?new zl(a,i,t):new Hl(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new Vl(a),Sd(e,f)),e=f}}}var Ws=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);py(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function wd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var my=37297,gy=0;function _y(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Ed=new ne;function vy(i){me._getMatrix(Ed,me.workingColorSpace,i);let t=`mat3( ${Ed.elements.map(e=>e.toFixed(4))} )`;switch(me.getTransfer(i)){case Ea:return[t,"LinearTransferOETF"];case Me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Td(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+_y(i.getShaderSource(t),o)}else return s}function yy(i,t){let e=vy(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function xy(i,t){let e;switch(t){case Im:e="Linear";break;case Lm:e="Reinhard";break;case Dm:e="Cineon";break;case bh:e="ACESFilmic";break;case Nm:e="AgX";break;case Om:e="Neutral";break;case Um:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ho=new D;function by(){me.getLuminanceCoefficients(Ho);let i=Ho.x.toFixed(4),t=Ho.y.toFixed(4),e=Ho.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function My(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wr).join(`
`)}function Sy(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function wy(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function wr(i){return i!==""}function Ad(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ey=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gl(i){return i.replace(Ey,Ay)}var Ty=new Map;function Ay(i,t){let e=ae[t];if(e===void 0){let n=Ty.get(t);if(n!==void 0)e=ae[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Gl(e)}var Ry=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cd(i){return i.replace(Ry,Cy)}function Cy(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Py(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Gd?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===xh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ai&&(t="SHADOWMAP_TYPE_VSM"),t}function Iy(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Xs:case qs:t="ENVMAP_TYPE_CUBE";break;case wa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ly(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case qs:t="ENVMAP_MODE_REFRACTION";break}return t}function Dy(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Wd:t="ENVMAP_BLENDING_MULTIPLY";break;case Cm:t="ENVMAP_BLENDING_MIX";break;case Pm:t="ENVMAP_BLENDING_ADD";break}return t}function Uy(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Ny(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Py(e),h=Iy(e),u=Ly(e),f=Dy(e),d=Uy(e),p=My(e),v=Sy(r),x=s.createProgram(),_,g,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(wr).join(`
`),_.length>0&&(_+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(wr).join(`
`),g.length>0&&(g+=`
`)):(_=[Pd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wr).join(`
`),g=[Pd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Pi?"#define TONE_MAPPING":"",e.toneMapping!==Pi?ae.tonemapping_pars_fragment:"",e.toneMapping!==Pi?xy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ae.colorspace_pars_fragment,yy("linearToOutputTexel",e.outputColorSpace),by(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(wr).join(`
`)),o=Gl(o),o=Ad(o,e),o=Rd(o,e),a=Gl(a),a=Ad(a,e),a=Rd(a,e),o=Cd(o),a=Cd(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,_=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,g=["#define varying in",e.glslVersion===Gu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Gu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let T=E+_+o,b=E+g+a,k=wd(s,s.VERTEX_SHADER,T),L=wd(s,s.FRAGMENT_SHADER,b);s.attachShader(x,k),s.attachShader(x,L),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function U(O){if(i.debug.checkShaderErrors){let Y=s.getProgramInfoLog(x).trim(),K=s.getShaderInfoLog(k).trim(),I=s.getShaderInfoLog(L).trim(),F=!0,B=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(F=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,k,L);else{let it=Td(s,k,"vertex"),q=Td(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+Y+`
`+it+`
`+q)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(K===""||I==="")&&(B=!1);B&&(O.diagnostics={runnable:F,programLog:Y,vertexShader:{log:K,prefix:_},fragmentShader:{log:I,prefix:g}})}s.deleteShader(k),s.deleteShader(L),C=new Ws(s,x),A=wy(s,x)}let C;this.getUniforms=function(){return C===void 0&&U(this),C};let A;this.getAttributes=function(){return A===void 0&&U(this),A};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(x,my)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=gy++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=k,this.fragmentShader=L,this}var Oy=0,Wl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new $l(t),e.set(t,n)),n}},$l=class{constructor(t){this.id=Oy++,this.code=t,this.usedTimes=0}};function Fy(i,t,e,n,s,r,o){let a=new Dr,c=new Wl,h=new Set,u=[],f=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(A){return h.add(A),A===0?"uv":`uv${A}`}function _(A,S,O,Y,K){let I=Y.fog,F=K.geometry,B=A.isMeshStandardMaterial?Y.environment:null,it=(A.isMeshStandardMaterial?e:t).get(A.envMap||B),q=it&&it.mapping===wa?it.image.height:null,ct=v[A.type];A.precision!==null&&(p=s.getMaxPrecision(A.precision),p!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",p,"instead."));let et=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ft=et!==void 0?et.length:0,It=0;F.morphAttributes.position!==void 0&&(It=1),F.morphAttributes.normal!==void 0&&(It=2),F.morphAttributes.color!==void 0&&(It=3);let Nt,J,dt,Dt;if(ct){let ge=qn[ct];Nt=ge.vertexShader,J=ge.fragmentShader}else Nt=A.vertexShader,J=A.fragmentShader,c.update(A),dt=c.getVertexShaderID(A),Dt=c.getFragmentShaderID(A);let at=i.getRenderTarget(),Bt=i.state.buffers.depth.getReversed(),Xt=K.isInstancedMesh===!0,se=K.isBatchedMesh===!0,Yt=!!A.map,he=!!A.matcap,Te=!!it,X=!!A.aoMap,ze=!!A.lightMap,Qt=!!A.bumpMap,te=!!A.normalMap,Ft=!!A.displacementMap,Ee=!!A.emissiveMap,bt=!!A.metalnessMap,P=!!A.roughnessMap,M=A.anisotropy>0,j=A.clearcoat>0,ot=A.dispersion>0,lt=A.iridescence>0,rt=A.sheen>0,Ot=A.transmission>0,Mt=M&&!!A.anisotropyMap,vt=j&&!!A.clearcoatMap,Wt=j&&!!A.clearcoatNormalMap,ht=j&&!!A.clearcoatRoughnessMap,_t=lt&&!!A.iridescenceMap,Vt=lt&&!!A.iridescenceThicknessMap,qt=rt&&!!A.sheenColorMap,Lt=rt&&!!A.sheenRoughnessMap,ce=!!A.specularMap,ee=!!A.specularColorMap,xe=!!A.specularIntensityMap,G=Ot&&!!A.transmissionMap,Et=Ot&&!!A.thicknessMap,st=!!A.gradientMap,ut=!!A.alphaMap,Rt=A.alphaTest>0,Tt=!!A.alphaHash,$t=!!A.extensions,tt=Pi;A.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(tt=i.toneMapping);let Pe={shaderID:ct,shaderType:A.type,shaderName:A.name,vertexShader:Nt,fragmentShader:J,defines:A.defines,customVertexShaderID:dt,customFragmentShaderID:Dt,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:p,batching:se,batchingColor:se&&K._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&K.instanceColor!==null,instancingMorph:Xt&&K.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Qs,alphaToCoverage:!!A.alphaToCoverage,map:Yt,matcap:he,envMap:Te,envMapMode:Te&&it.mapping,envMapCubeUVHeight:q,aoMap:X,lightMap:ze,bumpMap:Qt,normalMap:te,displacementMap:d&&Ft,emissiveMap:Ee,normalMapObjectSpace:te&&A.normalMapType===zm,normalMapTangentSpace:te&&A.normalMapType===nf,metalnessMap:bt,roughnessMap:P,anisotropy:M,anisotropyMap:Mt,clearcoat:j,clearcoatMap:vt,clearcoatNormalMap:Wt,clearcoatRoughnessMap:ht,dispersion:ot,iridescence:lt,iridescenceMap:_t,iridescenceThicknessMap:Vt,sheen:rt,sheenColorMap:qt,sheenRoughnessMap:Lt,specularMap:ce,specularColorMap:ee,specularIntensityMap:xe,transmission:Ot,transmissionMap:G,thicknessMap:Et,gradientMap:st,opaque:A.transparent===!1&&A.blending===Hs&&A.alphaToCoverage===!1,alphaMap:ut,alphaTest:Rt,alphaHash:Tt,combine:A.combine,mapUv:Yt&&x(A.map.channel),aoMapUv:X&&x(A.aoMap.channel),lightMapUv:ze&&x(A.lightMap.channel),bumpMapUv:Qt&&x(A.bumpMap.channel),normalMapUv:te&&x(A.normalMap.channel),displacementMapUv:Ft&&x(A.displacementMap.channel),emissiveMapUv:Ee&&x(A.emissiveMap.channel),metalnessMapUv:bt&&x(A.metalnessMap.channel),roughnessMapUv:P&&x(A.roughnessMap.channel),anisotropyMapUv:Mt&&x(A.anisotropyMap.channel),clearcoatMapUv:vt&&x(A.clearcoatMap.channel),clearcoatNormalMapUv:Wt&&x(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ht&&x(A.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&x(A.iridescenceMap.channel),iridescenceThicknessMapUv:Vt&&x(A.iridescenceThicknessMap.channel),sheenColorMapUv:qt&&x(A.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&x(A.sheenRoughnessMap.channel),specularMapUv:ce&&x(A.specularMap.channel),specularColorMapUv:ee&&x(A.specularColorMap.channel),specularIntensityMapUv:xe&&x(A.specularIntensityMap.channel),transmissionMapUv:G&&x(A.transmissionMap.channel),thicknessMapUv:Et&&x(A.thicknessMap.channel),alphaMapUv:ut&&x(A.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(te||M),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!F.attributes.uv&&(Yt||ut),fog:!!I,useFog:A.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Bt,skinning:K.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:It,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:A.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:tt,decodeVideoTexture:Yt&&A.map.isVideoTexture===!0&&me.getTransfer(A.map.colorSpace)===Me,decodeVideoTextureEmissive:Ee&&A.emissiveMap.isVideoTexture===!0&&me.getTransfer(A.emissiveMap.colorSpace)===Me,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===kn,flipSided:A.side===hn,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:$t&&A.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&A.extensions.multiDraw===!0||se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Pe.vertexUv1s=h.has(1),Pe.vertexUv2s=h.has(2),Pe.vertexUv3s=h.has(3),h.clear(),Pe}function g(A){let S=[];if(A.shaderID?S.push(A.shaderID):(S.push(A.customVertexShaderID),S.push(A.customFragmentShaderID)),A.defines!==void 0)for(let O in A.defines)S.push(O),S.push(A.defines[O]);return A.isRawShaderMaterial===!1&&(E(S,A),T(S,A),S.push(i.outputColorSpace)),S.push(A.customProgramCacheKey),S.join()}function E(A,S){A.push(S.precision),A.push(S.outputColorSpace),A.push(S.envMapMode),A.push(S.envMapCubeUVHeight),A.push(S.mapUv),A.push(S.alphaMapUv),A.push(S.lightMapUv),A.push(S.aoMapUv),A.push(S.bumpMapUv),A.push(S.normalMapUv),A.push(S.displacementMapUv),A.push(S.emissiveMapUv),A.push(S.metalnessMapUv),A.push(S.roughnessMapUv),A.push(S.anisotropyMapUv),A.push(S.clearcoatMapUv),A.push(S.clearcoatNormalMapUv),A.push(S.clearcoatRoughnessMapUv),A.push(S.iridescenceMapUv),A.push(S.iridescenceThicknessMapUv),A.push(S.sheenColorMapUv),A.push(S.sheenRoughnessMapUv),A.push(S.specularMapUv),A.push(S.specularColorMapUv),A.push(S.specularIntensityMapUv),A.push(S.transmissionMapUv),A.push(S.thicknessMapUv),A.push(S.combine),A.push(S.fogExp2),A.push(S.sizeAttenuation),A.push(S.morphTargetsCount),A.push(S.morphAttributeCount),A.push(S.numDirLights),A.push(S.numPointLights),A.push(S.numSpotLights),A.push(S.numSpotLightMaps),A.push(S.numHemiLights),A.push(S.numRectAreaLights),A.push(S.numDirLightShadows),A.push(S.numPointLightShadows),A.push(S.numSpotLightShadows),A.push(S.numSpotLightShadowsWithMaps),A.push(S.numLightProbes),A.push(S.shadowMapType),A.push(S.toneMapping),A.push(S.numClippingPlanes),A.push(S.numClipIntersection),A.push(S.depthPacking)}function T(A,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),A.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),A.push(a.mask)}function b(A){let S=v[A.type],O;if(S){let Y=qn[S];O=Ag.clone(Y.uniforms)}else O=A.uniforms;return O}function k(A,S){let O;for(let Y=0,K=u.length;Y<K;Y++){let I=u[Y];if(I.cacheKey===S){O=I,++O.usedTimes;break}}return O===void 0&&(O=new Ny(i,S,A,r),u.push(O)),O}function L(A){if(--A.usedTimes===0){let S=u.indexOf(A);u[S]=u[u.length-1],u.pop(),A.destroy()}}function U(A){c.remove(A)}function C(){c.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:b,acquireProgram:k,releaseProgram:L,releaseShaderCache:U,programs:u,dispose:C}}function ky(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function By(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Id(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ld(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f,d,p,v,x,_){let g=i[t];return g===void 0?(g={id:f.id,object:f,geometry:d,material:p,groupOrder:v,renderOrder:f.renderOrder,z:x,group:_},i[t]=g):(g.id=f.id,g.object=f,g.geometry=d,g.material=p,g.groupOrder=v,g.renderOrder=f.renderOrder,g.z=x,g.group=_),t++,g}function a(f,d,p,v,x,_){let g=o(f,d,p,v,x,_);p.transmission>0?n.push(g):p.transparent===!0?s.push(g):e.push(g)}function c(f,d,p,v,x,_){let g=o(f,d,p,v,x,_);p.transmission>0?n.unshift(g):p.transparent===!0?s.unshift(g):e.unshift(g)}function h(f,d){e.length>1&&e.sort(f||By),n.length>1&&n.sort(d||Id),s.length>1&&s.sort(d||Id)}function u(){for(let f=t,d=i.length;f<d;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:h}}function zy(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Ld,i.set(n,[o])):s>=r.length?(o=new Ld,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Hy(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new le};break;case"SpotLight":e={position:new D,direction:new D,color:new le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new le,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new le,groundColor:new le};break;case"RectAreaLight":e={color:new le,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function Vy(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Gy=0;function Wy(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function $y(i){let t=new Hy,e=Vy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new D);let s=new D,r=new Le,o=new Le;function a(h){let u=0,f=0,d=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let p=0,v=0,x=0,_=0,g=0,E=0,T=0,b=0,k=0,L=0,U=0;h.sort(Wy);for(let A=0,S=h.length;A<S;A++){let O=h[A],Y=O.color,K=O.intensity,I=O.distance,F=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)u+=Y.r*K,f+=Y.g*K,d+=Y.b*K;else if(O.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(O.sh.coefficients[B],K);U++}else if(O.isDirectionalLight){let B=t.get(O);if(B.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let it=O.shadow,q=e.get(O);q.shadowIntensity=it.intensity,q.shadowBias=it.bias,q.shadowNormalBias=it.normalBias,q.shadowRadius=it.radius,q.shadowMapSize=it.mapSize,n.directionalShadow[p]=q,n.directionalShadowMap[p]=F,n.directionalShadowMatrix[p]=O.shadow.matrix,E++}n.directional[p]=B,p++}else if(O.isSpotLight){let B=t.get(O);B.position.setFromMatrixPosition(O.matrixWorld),B.color.copy(Y).multiplyScalar(K),B.distance=I,B.coneCos=Math.cos(O.angle),B.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),B.decay=O.decay,n.spot[x]=B;let it=O.shadow;if(O.map&&(n.spotLightMap[k]=O.map,k++,it.updateMatrices(O),O.castShadow&&L++),n.spotLightMatrix[x]=it.matrix,O.castShadow){let q=e.get(O);q.shadowIntensity=it.intensity,q.shadowBias=it.bias,q.shadowNormalBias=it.normalBias,q.shadowRadius=it.radius,q.shadowMapSize=it.mapSize,n.spotShadow[x]=q,n.spotShadowMap[x]=F,b++}x++}else if(O.isRectAreaLight){let B=t.get(O);B.color.copy(Y).multiplyScalar(K),B.halfWidth.set(O.width*.5,0,0),B.halfHeight.set(0,O.height*.5,0),n.rectArea[_]=B,_++}else if(O.isPointLight){let B=t.get(O);if(B.color.copy(O.color).multiplyScalar(O.intensity),B.distance=O.distance,B.decay=O.decay,O.castShadow){let it=O.shadow,q=e.get(O);q.shadowIntensity=it.intensity,q.shadowBias=it.bias,q.shadowNormalBias=it.normalBias,q.shadowRadius=it.radius,q.shadowMapSize=it.mapSize,q.shadowCameraNear=it.camera.near,q.shadowCameraFar=it.camera.far,n.pointShadow[v]=q,n.pointShadowMap[v]=F,n.pointShadowMatrix[v]=O.shadow.matrix,T++}n.point[v]=B,v++}else if(O.isHemisphereLight){let B=t.get(O);B.skyColor.copy(O.color).multiplyScalar(K),B.groundColor.copy(O.groundColor).multiplyScalar(K),n.hemi[g]=B,g++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=wt.LTC_FLOAT_1,n.rectAreaLTC2=wt.LTC_FLOAT_2):(n.rectAreaLTC1=wt.LTC_HALF_1,n.rectAreaLTC2=wt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=d;let C=n.hash;(C.directionalLength!==p||C.pointLength!==v||C.spotLength!==x||C.rectAreaLength!==_||C.hemiLength!==g||C.numDirectionalShadows!==E||C.numPointShadows!==T||C.numSpotShadows!==b||C.numSpotMaps!==k||C.numLightProbes!==U)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=_,n.point.length=v,n.hemi.length=g,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=b+k-L,n.spotLightMap.length=k,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=U,C.directionalLength=p,C.pointLength=v,C.spotLength=x,C.rectAreaLength=_,C.hemiLength=g,C.numDirectionalShadows=E,C.numPointShadows=T,C.numSpotShadows=b,C.numSpotMaps=k,C.numLightProbes=U,n.version=Gy++)}function c(h,u){let f=0,d=0,p=0,v=0,x=0,_=u.matrixWorldInverse;for(let g=0,E=h.length;g<E;g++){let T=h[g];if(T.isDirectionalLight){let b=n.directional[f];b.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(_),f++}else if(T.isSpotLight){let b=n.spot[p];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(_),b.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(_),p++}else if(T.isRectAreaLight){let b=n.rectArea[v];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(_),o.identity(),r.copy(T.matrixWorld),r.premultiply(_),o.extractRotation(r),b.halfWidth.set(T.width*.5,0,0),b.halfHeight.set(0,T.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),v++}else if(T.isPointLight){let b=n.point[d];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(_),d++}else if(T.isHemisphereLight){let b=n.hemi[x];b.direction.setFromMatrixPosition(T.matrixWorld),b.direction.transformDirection(_),x++}}}return{setup:a,setupView:c,state:n}}function Dd(i){let t=new $y(i),e=[],n=[];function s(u){h.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}let h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Xy(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Dd(i),t.set(s,[a])):r>=o.length?(a=new Dd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Xl=class extends Qi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=km,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ql=class extends Qi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},qy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Yy(i,t,e){let n=new Ur,s=new xt,r=new xt,o=new Se,a=new Xl({depthPacking:Bm}),c=new ql,h={},u=e.maxTextureSize,f={[Ii]:hn,[hn]:Ii,[kn]:kn},d=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:qy,fragmentShader:jy}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let v=new un;v.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ht(v,d),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gd;let g=this.type;this.render=function(L,U,C){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||L.length===0)return;let A=i.getRenderTarget(),S=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),Y=i.state;Y.setBlending(Ci),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);let K=g!==ai&&this.type===ai,I=g===ai&&this.type!==ai;for(let F=0,B=L.length;F<B;F++){let it=L[F],q=it.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let ct=q.getFrameExtents();if(s.multiply(ct),r.copy(q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ct.x),s.x=r.x*ct.x,q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ct.y),s.y=r.y*ct.y,q.mapSize.y=r.y)),q.map===null||K===!0||I===!0){let ft=this.type!==ai?{minFilter:zn,magFilter:zn}:{};q.map!==null&&q.map.dispose(),q.map=new fi(s.x,s.y,ft),q.map.texture.name=it.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();let et=q.getViewportCount();for(let ft=0;ft<et;ft++){let It=q.getViewport(ft);o.set(r.x*It.x,r.y*It.y,r.x*It.z,r.y*It.w),Y.viewport(o),q.updateMatrices(it,ft),n=q.getFrustum(),b(U,C,q.camera,it,this.type)}q.isPointLightShadow!==!0&&this.type===ai&&E(q,C),q.needsUpdate=!1}g=this.type,_.needsUpdate=!1,i.setRenderTarget(A,S,O)};function E(L,U){let C=t.update(x);d.defines.VSM_SAMPLES!==L.blurSamples&&(d.defines.VSM_SAMPLES=L.blurSamples,p.defines.VSM_SAMPLES=L.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new fi(s.x,s.y)),d.uniforms.shadow_pass.value=L.map.texture,d.uniforms.resolution.value=L.mapSize,d.uniforms.radius.value=L.radius,i.setRenderTarget(L.mapPass),i.clear(),i.renderBufferDirect(U,null,C,d,x,null),p.uniforms.shadow_pass.value=L.mapPass.texture,p.uniforms.resolution.value=L.mapSize,p.uniforms.radius.value=L.radius,i.setRenderTarget(L.map),i.clear(),i.renderBufferDirect(U,null,C,p,x,null)}function T(L,U,C,A){let S=null,O=C.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(O!==void 0)S=O;else if(S=C.isPointLight===!0?c:a,i.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){let Y=S.uuid,K=U.uuid,I=h[Y];I===void 0&&(I={},h[Y]=I);let F=I[K];F===void 0&&(F=S.clone(),I[K]=F,U.addEventListener("dispose",k)),S=F}if(S.visible=U.visible,S.wireframe=U.wireframe,A===ai?S.side=U.shadowSide!==null?U.shadowSide:U.side:S.side=U.shadowSide!==null?U.shadowSide:f[U.side],S.alphaMap=U.alphaMap,S.alphaTest=U.alphaTest,S.map=U.map,S.clipShadows=U.clipShadows,S.clippingPlanes=U.clippingPlanes,S.clipIntersection=U.clipIntersection,S.displacementMap=U.displacementMap,S.displacementScale=U.displacementScale,S.displacementBias=U.displacementBias,S.wireframeLinewidth=U.wireframeLinewidth,S.linewidth=U.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let Y=i.properties.get(S);Y.light=C}return S}function b(L,U,C,A,S){if(L.visible===!1)return;if(L.layers.test(U.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&S===ai)&&(!L.frustumCulled||n.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,L.matrixWorld);let K=t.update(L),I=L.material;if(Array.isArray(I)){let F=K.groups;for(let B=0,it=F.length;B<it;B++){let q=F[B],ct=I[q.materialIndex];if(ct&&ct.visible){let et=T(L,ct,A,S);L.onBeforeShadow(i,L,U,C,K,et,q),i.renderBufferDirect(C,null,K,et,L,q),L.onAfterShadow(i,L,U,C,K,et,q)}}}else if(I.visible){let F=T(L,I,A,S);L.onBeforeShadow(i,L,U,C,K,F,null),i.renderBufferDirect(C,null,K,F,L,null),L.onAfterShadow(i,L,U,C,K,F,null)}}let Y=L.children;for(let K=0,I=Y.length;K<I;K++)b(Y[K],U,C,A,S)}function k(L){L.target.removeEventListener("dispose",k);for(let C in h){let A=h[C],S=L.target.uuid;S in A&&(A[S].dispose(),delete A[S])}}}var Zy={[Jc]:Kc,[Qc]:nl,[tl]:il,[$s]:el,[Kc]:Jc,[nl]:Qc,[il]:tl,[el]:$s};function Jy(i,t){function e(){let G=!1,Et=new Se,st=null,ut=new Se(0,0,0,0);return{setMask:function(Rt){st!==Rt&&!G&&(i.colorMask(Rt,Rt,Rt,Rt),st=Rt)},setLocked:function(Rt){G=Rt},setClear:function(Rt,Tt,$t,tt,Pe){Pe===!0&&(Rt*=tt,Tt*=tt,$t*=tt),Et.set(Rt,Tt,$t,tt),ut.equals(Et)===!1&&(i.clearColor(Rt,Tt,$t,tt),ut.copy(Et))},reset:function(){G=!1,st=null,ut.set(-1,0,0,0)}}}function n(){let G=!1,Et=!1,st=null,ut=null,Rt=null;return{setReversed:function(Tt){if(Et!==Tt){let $t=t.get("EXT_clip_control");Et?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT);let tt=Rt;Rt=null,this.setClear(tt)}Et=Tt},getReversed:function(){return Et},setTest:function(Tt){Tt?at(i.DEPTH_TEST):Bt(i.DEPTH_TEST)},setMask:function(Tt){st!==Tt&&!G&&(i.depthMask(Tt),st=Tt)},setFunc:function(Tt){if(Et&&(Tt=Zy[Tt]),ut!==Tt){switch(Tt){case Jc:i.depthFunc(i.NEVER);break;case Kc:i.depthFunc(i.ALWAYS);break;case Qc:i.depthFunc(i.LESS);break;case $s:i.depthFunc(i.LEQUAL);break;case tl:i.depthFunc(i.EQUAL);break;case el:i.depthFunc(i.GEQUAL);break;case nl:i.depthFunc(i.GREATER);break;case il:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ut=Tt}},setLocked:function(Tt){G=Tt},setClear:function(Tt){Rt!==Tt&&(Et&&(Tt=1-Tt),i.clearDepth(Tt),Rt=Tt)},reset:function(){G=!1,st=null,ut=null,Rt=null,Et=!1}}}function s(){let G=!1,Et=null,st=null,ut=null,Rt=null,Tt=null,$t=null,tt=null,Pe=null;return{setTest:function(ge){G||(ge?at(i.STENCIL_TEST):Bt(i.STENCIL_TEST))},setMask:function(ge){Et!==ge&&!G&&(i.stencilMask(ge),Et=ge)},setFunc:function(ge,cn,en){(st!==ge||ut!==cn||Rt!==en)&&(i.stencilFunc(ge,cn,en),st=ge,ut=cn,Rt=en)},setOp:function(ge,cn,en){(Tt!==ge||$t!==cn||tt!==en)&&(i.stencilOp(ge,cn,en),Tt=ge,$t=cn,tt=en)},setLocked:function(ge){G=ge},setClear:function(ge){Pe!==ge&&(i.clearStencil(ge),Pe=ge)},reset:function(){G=!1,Et=null,st=null,ut=null,Rt=null,Tt=null,$t=null,tt=null,Pe=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,h=new WeakMap,u={},f={},d=new WeakMap,p=[],v=null,x=!1,_=null,g=null,E=null,T=null,b=null,k=null,L=null,U=new le(0,0,0),C=0,A=!1,S=null,O=null,Y=null,K=null,I=null,F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,it=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(q)[1]),B=it>=1):q.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),B=it>=2);let ct=null,et={},ft=i.getParameter(i.SCISSOR_BOX),It=i.getParameter(i.VIEWPORT),Nt=new Se().fromArray(ft),J=new Se().fromArray(It);function dt(G,Et,st,ut){let Rt=new Uint8Array(4),Tt=i.createTexture();i.bindTexture(G,Tt),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $t=0;$t<st;$t++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(Et,0,i.RGBA,1,1,ut,0,i.RGBA,i.UNSIGNED_BYTE,Rt):i.texImage2D(Et+$t,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Rt);return Tt}let Dt={};Dt[i.TEXTURE_2D]=dt(i.TEXTURE_2D,i.TEXTURE_2D,1),Dt[i.TEXTURE_CUBE_MAP]=dt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Dt[i.TEXTURE_2D_ARRAY]=dt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Dt[i.TEXTURE_3D]=dt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(i.DEPTH_TEST),o.setFunc($s),Qt(!1),te(Uu),at(i.CULL_FACE),X(Ci);function at(G){u[G]!==!0&&(i.enable(G),u[G]=!0)}function Bt(G){u[G]!==!1&&(i.disable(G),u[G]=!1)}function Xt(G,Et){return f[G]!==Et?(i.bindFramebuffer(G,Et),f[G]=Et,G===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Et),G===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Et),!0):!1}function se(G,Et){let st=p,ut=!1;if(G){st=d.get(Et),st===void 0&&(st=[],d.set(Et,st));let Rt=G.textures;if(st.length!==Rt.length||st[0]!==i.COLOR_ATTACHMENT0){for(let Tt=0,$t=Rt.length;Tt<$t;Tt++)st[Tt]=i.COLOR_ATTACHMENT0+Tt;st.length=Rt.length,ut=!0}}else st[0]!==i.BACK&&(st[0]=i.BACK,ut=!0);ut&&i.drawBuffers(st)}function Yt(G){return v!==G?(i.useProgram(G),v=G,!0):!1}let he={[Xi]:i.FUNC_ADD,[dm]:i.FUNC_SUBTRACT,[fm]:i.FUNC_REVERSE_SUBTRACT};he[pm]=i.MIN,he[mm]=i.MAX;let Te={[gm]:i.ZERO,[_m]:i.ONE,[vm]:i.SRC_COLOR,[Yc]:i.SRC_ALPHA,[wm]:i.SRC_ALPHA_SATURATE,[Mm]:i.DST_COLOR,[xm]:i.DST_ALPHA,[ym]:i.ONE_MINUS_SRC_COLOR,[Zc]:i.ONE_MINUS_SRC_ALPHA,[Sm]:i.ONE_MINUS_DST_COLOR,[bm]:i.ONE_MINUS_DST_ALPHA,[Em]:i.CONSTANT_COLOR,[Tm]:i.ONE_MINUS_CONSTANT_COLOR,[Am]:i.CONSTANT_ALPHA,[Rm]:i.ONE_MINUS_CONSTANT_ALPHA};function X(G,Et,st,ut,Rt,Tt,$t,tt,Pe,ge){if(G===Ci){x===!0&&(Bt(i.BLEND),x=!1);return}if(x===!1&&(at(i.BLEND),x=!0),G!==um){if(G!==_||ge!==A){if((g!==Xi||b!==Xi)&&(i.blendEquation(i.FUNC_ADD),g=Xi,b=Xi),ge)switch(G){case Hs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Nu:i.blendFunc(i.ONE,i.ONE);break;case Ou:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Hs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Nu:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ou:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}E=null,T=null,k=null,L=null,U.set(0,0,0),C=0,_=G,A=ge}return}Rt=Rt||Et,Tt=Tt||st,$t=$t||ut,(Et!==g||Rt!==b)&&(i.blendEquationSeparate(he[Et],he[Rt]),g=Et,b=Rt),(st!==E||ut!==T||Tt!==k||$t!==L)&&(i.blendFuncSeparate(Te[st],Te[ut],Te[Tt],Te[$t]),E=st,T=ut,k=Tt,L=$t),(tt.equals(U)===!1||Pe!==C)&&(i.blendColor(tt.r,tt.g,tt.b,Pe),U.copy(tt),C=Pe),_=G,A=!1}function ze(G,Et){G.side===kn?Bt(i.CULL_FACE):at(i.CULL_FACE);let st=G.side===hn;Et&&(st=!st),Qt(st),G.blending===Hs&&G.transparent===!1?X(Ci):X(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),r.setMask(G.colorWrite);let ut=G.stencilWrite;a.setTest(ut),ut&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Ee(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):Bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Qt(G){S!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),S=G)}function te(G){G!==lm?(at(i.CULL_FACE),G!==O&&(G===Uu?i.cullFace(i.BACK):G===hm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Bt(i.CULL_FACE),O=G}function Ft(G){G!==Y&&(B&&i.lineWidth(G),Y=G)}function Ee(G,Et,st){G?(at(i.POLYGON_OFFSET_FILL),(K!==Et||I!==st)&&(i.polygonOffset(Et,st),K=Et,I=st)):Bt(i.POLYGON_OFFSET_FILL)}function bt(G){G?at(i.SCISSOR_TEST):Bt(i.SCISSOR_TEST)}function P(G){G===void 0&&(G=i.TEXTURE0+F-1),ct!==G&&(i.activeTexture(G),ct=G)}function M(G,Et,st){st===void 0&&(ct===null?st=i.TEXTURE0+F-1:st=ct);let ut=et[st];ut===void 0&&(ut={type:void 0,texture:void 0},et[st]=ut),(ut.type!==G||ut.texture!==Et)&&(ct!==st&&(i.activeTexture(st),ct=st),i.bindTexture(G,Et||Dt[G]),ut.type=G,ut.texture=Et)}function j(){let G=et[ct];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function ot(){try{i.compressedTexImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function lt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function rt(){try{i.texSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ot(){try{i.texSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Mt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function vt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Wt(){try{i.texStorage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ht(){try{i.texStorage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function _t(){try{i.texImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Vt(){try{i.texImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function qt(G){Nt.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),Nt.copy(G))}function Lt(G){J.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),J.copy(G))}function ce(G,Et){let st=h.get(Et);st===void 0&&(st=new WeakMap,h.set(Et,st));let ut=st.get(G);ut===void 0&&(ut=i.getUniformBlockIndex(Et,G.name),st.set(G,ut))}function ee(G,Et){let ut=h.get(Et).get(G);c.get(Et)!==ut&&(i.uniformBlockBinding(Et,ut,G.__bindingPointIndex),c.set(Et,ut))}function xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ct=null,et={},f={},d=new WeakMap,p=[],v=null,x=!1,_=null,g=null,E=null,T=null,b=null,k=null,L=null,U=new le(0,0,0),C=0,A=!1,S=null,O=null,Y=null,K=null,I=null,Nt.set(0,0,i.canvas.width,i.canvas.height),J.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:at,disable:Bt,bindFramebuffer:Xt,drawBuffers:se,useProgram:Yt,setBlending:X,setMaterial:ze,setFlipSided:Qt,setCullFace:te,setLineWidth:Ft,setPolygonOffset:Ee,setScissorTest:bt,activeTexture:P,bindTexture:M,unbindTexture:j,compressedTexImage2D:ot,compressedTexImage3D:lt,texImage2D:_t,texImage3D:Vt,updateUBOMapping:ce,uniformBlockBinding:ee,texStorage2D:Wt,texStorage3D:ht,texSubImage2D:rt,texSubImage3D:Ot,compressedTexSubImage2D:Mt,compressedTexSubImage3D:vt,scissor:qt,viewport:Lt,reset:xe}}function Ud(i,t,e,n){let s=Ky(n);switch(e){case Yd:return i*t;case Jd:return i*t;case Kd:return i*t*2;case Qd:return i*t/s.components*s.byteLength;case Eh:return i*t/s.components*s.byteLength;case tf:return i*t*2/s.components*s.byteLength;case Th:return i*t*2/s.components*s.byteLength;case Zd:return i*t*3/s.components*s.byteLength;case Bn:return i*t*4/s.components*s.byteLength;case Ah:return i*t*4/s.components*s.byteLength;case Wo:case $o:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Xo:case qo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ll:case ul:return Math.max(i,16)*Math.max(t,8)/4;case cl:case hl:return Math.max(i,8)*Math.max(t,8)/2;case dl:case fl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case pl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ml:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case gl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case _l:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case vl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case yl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case xl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case bl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ml:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Sl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case wl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case El:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Al:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Rl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case jo:case Cl:case Pl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ef:case Il:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ll:case Dl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ky(i){switch(i){case ui:case Xd:return{byteLength:1,components:1};case Pr:case qd:case Hr:return{byteLength:2,components:1};case Sh:case wh:return{byteLength:2,components:4};case Ji:case Mh:case ci:return{byteLength:4,components:1};case jd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Qy(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new xt,u=new WeakMap,f,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(P,M){return p?new OffscreenCanvas(P,M):Jo("canvas")}function x(P,M,j){let ot=1,lt=bt(P);if((lt.width>j||lt.height>j)&&(ot=j/Math.max(lt.width,lt.height)),ot<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let rt=Math.floor(ot*lt.width),Ot=Math.floor(ot*lt.height);f===void 0&&(f=v(rt,Ot));let Mt=M?v(rt,Ot):f;return Mt.width=rt,Mt.height=Ot,Mt.getContext("2d").drawImage(P,0,0,rt,Ot),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+rt+"x"+Ot+")."),Mt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),P;return P}function _(P){return P.generateMipmaps}function g(P){i.generateMipmap(P)}function E(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(P,M,j,ot,lt=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let rt=M;if(M===i.RED&&(j===i.FLOAT&&(rt=i.R32F),j===i.HALF_FLOAT&&(rt=i.R16F),j===i.UNSIGNED_BYTE&&(rt=i.R8)),M===i.RED_INTEGER&&(j===i.UNSIGNED_BYTE&&(rt=i.R8UI),j===i.UNSIGNED_SHORT&&(rt=i.R16UI),j===i.UNSIGNED_INT&&(rt=i.R32UI),j===i.BYTE&&(rt=i.R8I),j===i.SHORT&&(rt=i.R16I),j===i.INT&&(rt=i.R32I)),M===i.RG&&(j===i.FLOAT&&(rt=i.RG32F),j===i.HALF_FLOAT&&(rt=i.RG16F),j===i.UNSIGNED_BYTE&&(rt=i.RG8)),M===i.RG_INTEGER&&(j===i.UNSIGNED_BYTE&&(rt=i.RG8UI),j===i.UNSIGNED_SHORT&&(rt=i.RG16UI),j===i.UNSIGNED_INT&&(rt=i.RG32UI),j===i.BYTE&&(rt=i.RG8I),j===i.SHORT&&(rt=i.RG16I),j===i.INT&&(rt=i.RG32I)),M===i.RGB_INTEGER&&(j===i.UNSIGNED_BYTE&&(rt=i.RGB8UI),j===i.UNSIGNED_SHORT&&(rt=i.RGB16UI),j===i.UNSIGNED_INT&&(rt=i.RGB32UI),j===i.BYTE&&(rt=i.RGB8I),j===i.SHORT&&(rt=i.RGB16I),j===i.INT&&(rt=i.RGB32I)),M===i.RGBA_INTEGER&&(j===i.UNSIGNED_BYTE&&(rt=i.RGBA8UI),j===i.UNSIGNED_SHORT&&(rt=i.RGBA16UI),j===i.UNSIGNED_INT&&(rt=i.RGBA32UI),j===i.BYTE&&(rt=i.RGBA8I),j===i.SHORT&&(rt=i.RGBA16I),j===i.INT&&(rt=i.RGBA32I)),M===i.RGB&&j===i.UNSIGNED_INT_5_9_9_9_REV&&(rt=i.RGB9_E5),M===i.RGBA){let Ot=lt?Ea:me.getTransfer(ot);j===i.FLOAT&&(rt=i.RGBA32F),j===i.HALF_FLOAT&&(rt=i.RGBA16F),j===i.UNSIGNED_BYTE&&(rt=Ot===Me?i.SRGB8_ALPHA8:i.RGBA8),j===i.UNSIGNED_SHORT_4_4_4_4&&(rt=i.RGBA4),j===i.UNSIGNED_SHORT_5_5_5_1&&(rt=i.RGB5_A1)}return(rt===i.R16F||rt===i.R32F||rt===i.RG16F||rt===i.RG32F||rt===i.RGBA16F||rt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function b(P,M){let j;return P?M===null||M===Ji||M===js?j=i.DEPTH24_STENCIL8:M===ci?j=i.DEPTH32F_STENCIL8:M===Pr&&(j=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ji||M===js?j=i.DEPTH_COMPONENT24:M===ci?j=i.DEPTH_COMPONENT32F:M===Pr&&(j=i.DEPTH_COMPONENT16),j}function k(P,M){return _(P)===!0||P.isFramebufferTexture&&P.minFilter!==zn&&P.minFilter!==jn?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function L(P){let M=P.target;M.removeEventListener("dispose",L),C(M),M.isVideoTexture&&u.delete(M)}function U(P){let M=P.target;M.removeEventListener("dispose",U),S(M)}function C(P){let M=n.get(P);if(M.__webglInit===void 0)return;let j=P.source,ot=d.get(j);if(ot){let lt=ot[M.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&A(P),Object.keys(ot).length===0&&d.delete(j)}n.remove(P)}function A(P){let M=n.get(P);i.deleteTexture(M.__webglTexture);let j=P.source,ot=d.get(j);delete ot[M.__cacheKey],o.memory.textures--}function S(P){let M=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(M.__webglFramebuffer[ot]))for(let lt=0;lt<M.__webglFramebuffer[ot].length;lt++)i.deleteFramebuffer(M.__webglFramebuffer[ot][lt]);else i.deleteFramebuffer(M.__webglFramebuffer[ot]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[ot])}else{if(Array.isArray(M.__webglFramebuffer))for(let ot=0;ot<M.__webglFramebuffer.length;ot++)i.deleteFramebuffer(M.__webglFramebuffer[ot]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ot=0;ot<M.__webglColorRenderbuffer.length;ot++)M.__webglColorRenderbuffer[ot]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[ot]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let j=P.textures;for(let ot=0,lt=j.length;ot<lt;ot++){let rt=n.get(j[ot]);rt.__webglTexture&&(i.deleteTexture(rt.__webglTexture),o.memory.textures--),n.remove(j[ot])}n.remove(P)}let O=0;function Y(){O=0}function K(){let P=O;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),O+=1,P}function I(P){let M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function F(P,M){let j=n.get(P);if(P.isVideoTexture&&Ft(P),P.isRenderTargetTexture===!1&&P.version>0&&j.__version!==P.version){let ot=P.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(j,P,M);return}}e.bindTexture(i.TEXTURE_2D,j.__webglTexture,i.TEXTURE0+M)}function B(P,M){let j=n.get(P);if(P.version>0&&j.__version!==P.version){J(j,P,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,j.__webglTexture,i.TEXTURE0+M)}function it(P,M){let j=n.get(P);if(P.version>0&&j.__version!==P.version){J(j,P,M);return}e.bindTexture(i.TEXTURE_3D,j.__webglTexture,i.TEXTURE0+M)}function q(P,M){let j=n.get(P);if(P.version>0&&j.__version!==P.version){dt(j,P,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture,i.TEXTURE0+M)}let ct={[ol]:i.REPEAT,[Yi]:i.CLAMP_TO_EDGE,[al]:i.MIRRORED_REPEAT},et={[zn]:i.NEAREST,[Fm]:i.NEAREST_MIPMAP_NEAREST,[bo]:i.NEAREST_MIPMAP_LINEAR,[jn]:i.LINEAR,[gc]:i.LINEAR_MIPMAP_NEAREST,[Zi]:i.LINEAR_MIPMAP_LINEAR},ft={[Hm]:i.NEVER,[qm]:i.ALWAYS,[Vm]:i.LESS,[sf]:i.LEQUAL,[Gm]:i.EQUAL,[Xm]:i.GEQUAL,[Wm]:i.GREATER,[$m]:i.NOTEQUAL};function It(P,M){if(M.type===ci&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===jn||M.magFilter===gc||M.magFilter===bo||M.magFilter===Zi||M.minFilter===jn||M.minFilter===gc||M.minFilter===bo||M.minFilter===Zi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,ct[M.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,ct[M.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,ct[M.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,et[M.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,et[M.minFilter]),M.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,ft[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===zn||M.minFilter!==bo&&M.minFilter!==Zi||M.type===ci&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let j=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Nt(P,M){let j=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",L));let ot=M.source,lt=d.get(ot);lt===void 0&&(lt={},d.set(ot,lt));let rt=I(M);if(rt!==P.__cacheKey){lt[rt]===void 0&&(lt[rt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,j=!0),lt[rt].usedTimes++;let Ot=lt[P.__cacheKey];Ot!==void 0&&(lt[P.__cacheKey].usedTimes--,Ot.usedTimes===0&&A(M)),P.__cacheKey=rt,P.__webglTexture=lt[rt].texture}return j}function J(P,M,j){let ot=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ot=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ot=i.TEXTURE_3D);let lt=Nt(P,M),rt=M.source;e.bindTexture(ot,P.__webglTexture,i.TEXTURE0+j);let Ot=n.get(rt);if(rt.version!==Ot.__version||lt===!0){e.activeTexture(i.TEXTURE0+j);let Mt=me.getPrimaries(me.workingColorSpace),vt=M.colorSpace===Ri?null:me.getPrimaries(M.colorSpace),Wt=M.colorSpace===Ri||Mt===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let ht=x(M.image,!1,s.maxTextureSize);ht=Ee(M,ht);let _t=r.convert(M.format,M.colorSpace),Vt=r.convert(M.type),qt=T(M.internalFormat,_t,Vt,M.colorSpace,M.isVideoTexture);It(ot,M);let Lt,ce=M.mipmaps,ee=M.isVideoTexture!==!0,xe=Ot.__version===void 0||lt===!0,G=rt.dataReady,Et=k(M,ht);if(M.isDepthTexture)qt=b(M.format===Ys,M.type),xe&&(ee?e.texStorage2D(i.TEXTURE_2D,1,qt,ht.width,ht.height):e.texImage2D(i.TEXTURE_2D,0,qt,ht.width,ht.height,0,_t,Vt,null));else if(M.isDataTexture)if(ce.length>0){ee&&xe&&e.texStorage2D(i.TEXTURE_2D,Et,qt,ce[0].width,ce[0].height);for(let st=0,ut=ce.length;st<ut;st++)Lt=ce[st],ee?G&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Lt.width,Lt.height,_t,Vt,Lt.data):e.texImage2D(i.TEXTURE_2D,st,qt,Lt.width,Lt.height,0,_t,Vt,Lt.data);M.generateMipmaps=!1}else ee?(xe&&e.texStorage2D(i.TEXTURE_2D,Et,qt,ht.width,ht.height),G&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht.width,ht.height,_t,Vt,ht.data)):e.texImage2D(i.TEXTURE_2D,0,qt,ht.width,ht.height,0,_t,Vt,ht.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ee&&xe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Et,qt,ce[0].width,ce[0].height,ht.depth);for(let st=0,ut=ce.length;st<ut;st++)if(Lt=ce[st],M.format!==Bn)if(_t!==null)if(ee){if(G)if(M.layerUpdates.size>0){let Rt=Ud(Lt.width,Lt.height,M.format,M.type);for(let Tt of M.layerUpdates){let $t=Lt.data.subarray(Tt*Rt/Lt.data.BYTES_PER_ELEMENT,(Tt+1)*Rt/Lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,Tt,Lt.width,Lt.height,1,_t,$t)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,Lt.width,Lt.height,ht.depth,_t,Lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,qt,Lt.width,Lt.height,ht.depth,0,Lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ee?G&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,Lt.width,Lt.height,ht.depth,_t,Vt,Lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,qt,Lt.width,Lt.height,ht.depth,0,_t,Vt,Lt.data)}else{ee&&xe&&e.texStorage2D(i.TEXTURE_2D,Et,qt,ce[0].width,ce[0].height);for(let st=0,ut=ce.length;st<ut;st++)Lt=ce[st],M.format!==Bn?_t!==null?ee?G&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,Lt.width,Lt.height,_t,Lt.data):e.compressedTexImage2D(i.TEXTURE_2D,st,qt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?G&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Lt.width,Lt.height,_t,Vt,Lt.data):e.texImage2D(i.TEXTURE_2D,st,qt,Lt.width,Lt.height,0,_t,Vt,Lt.data)}else if(M.isDataArrayTexture)if(ee){if(xe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Et,qt,ht.width,ht.height,ht.depth),G)if(M.layerUpdates.size>0){let st=Ud(ht.width,ht.height,M.format,M.type);for(let ut of M.layerUpdates){let Rt=ht.data.subarray(ut*st/ht.data.BYTES_PER_ELEMENT,(ut+1)*st/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,ht.width,ht.height,1,_t,Vt,Rt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,_t,Vt,ht.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,qt,ht.width,ht.height,ht.depth,0,_t,Vt,ht.data);else if(M.isData3DTexture)ee?(xe&&e.texStorage3D(i.TEXTURE_3D,Et,qt,ht.width,ht.height,ht.depth),G&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,_t,Vt,ht.data)):e.texImage3D(i.TEXTURE_3D,0,qt,ht.width,ht.height,ht.depth,0,_t,Vt,ht.data);else if(M.isFramebufferTexture){if(xe)if(ee)e.texStorage2D(i.TEXTURE_2D,Et,qt,ht.width,ht.height);else{let st=ht.width,ut=ht.height;for(let Rt=0;Rt<Et;Rt++)e.texImage2D(i.TEXTURE_2D,Rt,qt,st,ut,0,_t,Vt,null),st>>=1,ut>>=1}}else if(ce.length>0){if(ee&&xe){let st=bt(ce[0]);e.texStorage2D(i.TEXTURE_2D,Et,qt,st.width,st.height)}for(let st=0,ut=ce.length;st<ut;st++)Lt=ce[st],ee?G&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,_t,Vt,Lt):e.texImage2D(i.TEXTURE_2D,st,qt,_t,Vt,Lt);M.generateMipmaps=!1}else if(ee){if(xe){let st=bt(ht);e.texStorage2D(i.TEXTURE_2D,Et,qt,st.width,st.height)}G&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,Vt,ht)}else e.texImage2D(i.TEXTURE_2D,0,qt,_t,Vt,ht);_(M)&&g(ot),Ot.__version=rt.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function dt(P,M,j){if(M.image.length!==6)return;let ot=Nt(P,M),lt=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+j);let rt=n.get(lt);if(lt.version!==rt.__version||ot===!0){e.activeTexture(i.TEXTURE0+j);let Ot=me.getPrimaries(me.workingColorSpace),Mt=M.colorSpace===Ri?null:me.getPrimaries(M.colorSpace),vt=M.colorSpace===Ri||Ot===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let Wt=M.isCompressedTexture||M.image[0].isCompressedTexture,ht=M.image[0]&&M.image[0].isDataTexture,_t=[];for(let ut=0;ut<6;ut++)!Wt&&!ht?_t[ut]=x(M.image[ut],!0,s.maxCubemapSize):_t[ut]=ht?M.image[ut].image:M.image[ut],_t[ut]=Ee(M,_t[ut]);let Vt=_t[0],qt=r.convert(M.format,M.colorSpace),Lt=r.convert(M.type),ce=T(M.internalFormat,qt,Lt,M.colorSpace),ee=M.isVideoTexture!==!0,xe=rt.__version===void 0||ot===!0,G=lt.dataReady,Et=k(M,Vt);It(i.TEXTURE_CUBE_MAP,M);let st;if(Wt){ee&&xe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Et,ce,Vt.width,Vt.height);for(let ut=0;ut<6;ut++){st=_t[ut].mipmaps;for(let Rt=0;Rt<st.length;Rt++){let Tt=st[Rt];M.format!==Bn?qt!==null?ee?G&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Rt,0,0,Tt.width,Tt.height,qt,Tt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Rt,ce,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ee?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Rt,0,0,Tt.width,Tt.height,qt,Lt,Tt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Rt,ce,Tt.width,Tt.height,0,qt,Lt,Tt.data)}}}else{if(st=M.mipmaps,ee&&xe){st.length>0&&Et++;let ut=bt(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Et,ce,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(ht){ee?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,_t[ut].width,_t[ut].height,qt,Lt,_t[ut].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ce,_t[ut].width,_t[ut].height,0,qt,Lt,_t[ut].data);for(let Rt=0;Rt<st.length;Rt++){let $t=st[Rt].image[ut].image;ee?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Rt+1,0,0,$t.width,$t.height,qt,Lt,$t.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Rt+1,ce,$t.width,$t.height,0,qt,Lt,$t.data)}}else{ee?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,qt,Lt,_t[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ce,qt,Lt,_t[ut]);for(let Rt=0;Rt<st.length;Rt++){let Tt=st[Rt];ee?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Rt+1,0,0,qt,Lt,Tt.image[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Rt+1,ce,qt,Lt,Tt.image[ut])}}}_(M)&&g(i.TEXTURE_CUBE_MAP),rt.__version=lt.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function Dt(P,M,j,ot,lt,rt){let Ot=r.convert(j.format,j.colorSpace),Mt=r.convert(j.type),vt=T(j.internalFormat,Ot,Mt,j.colorSpace),Wt=n.get(M),ht=n.get(j);if(ht.__renderTarget=M,!Wt.__hasExternalTextures){let _t=Math.max(1,M.width>>rt),Vt=Math.max(1,M.height>>rt);lt===i.TEXTURE_3D||lt===i.TEXTURE_2D_ARRAY?e.texImage3D(lt,rt,vt,_t,Vt,M.depth,0,Ot,Mt,null):e.texImage2D(lt,rt,vt,_t,Vt,0,Ot,Mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),te(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,lt,ht.__webglTexture,0,Qt(M)):(lt===i.TEXTURE_2D||lt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ot,lt,ht.__webglTexture,rt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(P,M,j){if(i.bindRenderbuffer(i.RENDERBUFFER,P),M.depthBuffer){let ot=M.depthTexture,lt=ot&&ot.isDepthTexture?ot.type:null,rt=b(M.stencilBuffer,lt),Ot=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=Qt(M);te(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt,rt,M.width,M.height):j?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,rt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,rt,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ot,i.RENDERBUFFER,P)}else{let ot=M.textures;for(let lt=0;lt<ot.length;lt++){let rt=ot[lt],Ot=r.convert(rt.format,rt.colorSpace),Mt=r.convert(rt.type),vt=T(rt.internalFormat,Ot,Mt,rt.colorSpace),Wt=Qt(M);j&&te(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt,vt,M.width,M.height):te(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt,vt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,vt,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Bt(P,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ot=n.get(M.depthTexture);ot.__renderTarget=M,(!ot.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),F(M.depthTexture,0);let lt=ot.__webglTexture,rt=Qt(M);if(M.depthTexture.format===Vs)te(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0);else if(M.depthTexture.format===Ys)te(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0);else throw new Error("Unknown depthTexture format")}function Xt(P){let M=n.get(P),j=P.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==P.depthTexture){let ot=P.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ot){let lt=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ot.removeEventListener("dispose",lt)};ot.addEventListener("dispose",lt),M.__depthDisposeCallback=lt}M.__boundDepthTexture=ot}if(P.depthTexture&&!M.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");Bt(M.__webglFramebuffer,P)}else if(j){M.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[ot]),M.__webglDepthbuffer[ot]===void 0)M.__webglDepthbuffer[ot]=i.createRenderbuffer(),at(M.__webglDepthbuffer[ot],P,!1);else{let lt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=M.__webglDepthbuffer[ot];i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,rt)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),at(M.__webglDepthbuffer,P,!1);else{let ot=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,lt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function se(P,M,j){let ot=n.get(P);M!==void 0&&Dt(ot.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),j!==void 0&&Xt(P)}function Yt(P){let M=P.texture,j=n.get(P),ot=n.get(M);P.addEventListener("dispose",U);let lt=P.textures,rt=P.isWebGLCubeRenderTarget===!0,Ot=lt.length>1;if(Ot||(ot.__webglTexture===void 0&&(ot.__webglTexture=i.createTexture()),ot.__version=M.version,o.memory.textures++),rt){j.__webglFramebuffer=[];for(let Mt=0;Mt<6;Mt++)if(M.mipmaps&&M.mipmaps.length>0){j.__webglFramebuffer[Mt]=[];for(let vt=0;vt<M.mipmaps.length;vt++)j.__webglFramebuffer[Mt][vt]=i.createFramebuffer()}else j.__webglFramebuffer[Mt]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){j.__webglFramebuffer=[];for(let Mt=0;Mt<M.mipmaps.length;Mt++)j.__webglFramebuffer[Mt]=i.createFramebuffer()}else j.__webglFramebuffer=i.createFramebuffer();if(Ot)for(let Mt=0,vt=lt.length;Mt<vt;Mt++){let Wt=n.get(lt[Mt]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&te(P)===!1){j.__webglMultisampledFramebuffer=i.createFramebuffer(),j.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let Mt=0;Mt<lt.length;Mt++){let vt=lt[Mt];j.__webglColorRenderbuffer[Mt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,j.__webglColorRenderbuffer[Mt]);let Wt=r.convert(vt.format,vt.colorSpace),ht=r.convert(vt.type),_t=T(vt.internalFormat,Wt,ht,vt.colorSpace,P.isXRRenderTarget===!0),Vt=Qt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Vt,_t,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,j.__webglColorRenderbuffer[Mt])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(j.__webglDepthRenderbuffer=i.createRenderbuffer(),at(j.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(rt){e.bindTexture(i.TEXTURE_CUBE_MAP,ot.__webglTexture),It(i.TEXTURE_CUBE_MAP,M);for(let Mt=0;Mt<6;Mt++)if(M.mipmaps&&M.mipmaps.length>0)for(let vt=0;vt<M.mipmaps.length;vt++)Dt(j.__webglFramebuffer[Mt][vt],P,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,vt);else Dt(j.__webglFramebuffer[Mt],P,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0);_(M)&&g(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ot){for(let Mt=0,vt=lt.length;Mt<vt;Mt++){let Wt=lt[Mt],ht=n.get(Wt);e.bindTexture(i.TEXTURE_2D,ht.__webglTexture),It(i.TEXTURE_2D,Wt),Dt(j.__webglFramebuffer,P,Wt,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,0),_(Wt)&&g(i.TEXTURE_2D)}e.unbindTexture()}else{let Mt=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Mt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Mt,ot.__webglTexture),It(Mt,M),M.mipmaps&&M.mipmaps.length>0)for(let vt=0;vt<M.mipmaps.length;vt++)Dt(j.__webglFramebuffer[vt],P,M,i.COLOR_ATTACHMENT0,Mt,vt);else Dt(j.__webglFramebuffer,P,M,i.COLOR_ATTACHMENT0,Mt,0);_(M)&&g(Mt),e.unbindTexture()}P.depthBuffer&&Xt(P)}function he(P){let M=P.textures;for(let j=0,ot=M.length;j<ot;j++){let lt=M[j];if(_(lt)){let rt=E(P),Ot=n.get(lt).__webglTexture;e.bindTexture(rt,Ot),g(rt),e.unbindTexture()}}}let Te=[],X=[];function ze(P){if(P.samples>0){if(te(P)===!1){let M=P.textures,j=P.width,ot=P.height,lt=i.COLOR_BUFFER_BIT,rt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ot=n.get(P),Mt=M.length>1;if(Mt)for(let vt=0;vt<M.length;vt++)e.bindFramebuffer(i.FRAMEBUFFER,Ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ot.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ot.__webglFramebuffer);for(let vt=0;vt<M.length;vt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(lt|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(lt|=i.STENCIL_BUFFER_BIT)),Mt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ot.__webglColorRenderbuffer[vt]);let Wt=n.get(M[vt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Wt,0)}i.blitFramebuffer(0,0,j,ot,0,0,j,ot,lt,i.NEAREST),c===!0&&(Te.length=0,X.length=0,Te.push(i.COLOR_ATTACHMENT0+vt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Te.push(rt),X.push(rt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,X)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Te))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Mt)for(let vt=0;vt<M.length;vt++){e.bindFramebuffer(i.FRAMEBUFFER,Ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,Ot.__webglColorRenderbuffer[vt]);let Wt=n.get(M[vt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,Wt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ot.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){let M=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Qt(P){return Math.min(s.maxSamples,P.samples)}function te(P){let M=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ft(P){let M=o.render.frame;u.get(P)!==M&&(u.set(P,M),P.update())}function Ee(P,M){let j=P.colorSpace,ot=P.format,lt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||j!==Qs&&j!==Ri&&(me.getTransfer(j)===Me?(ot!==Bn||lt!==ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),M}function bt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(h.width=P.naturalWidth||P.width,h.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(h.width=P.displayWidth,h.height=P.displayHeight):(h.width=P.width,h.height=P.height),h}this.allocateTextureUnit=K,this.resetTextureUnits=Y,this.setTexture2D=F,this.setTexture2DArray=B,this.setTexture3D=it,this.setTextureCube=q,this.rebindTextures=se,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=ze,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=Dt,this.useMultisampledRTT=te}function tx(i,t){function e(n,s=Ri){let r,o=me.getTransfer(s);if(n===ui)return i.UNSIGNED_BYTE;if(n===Sh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===jd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Xd)return i.BYTE;if(n===qd)return i.SHORT;if(n===Pr)return i.UNSIGNED_SHORT;if(n===Mh)return i.INT;if(n===Ji)return i.UNSIGNED_INT;if(n===ci)return i.FLOAT;if(n===Hr)return i.HALF_FLOAT;if(n===Yd)return i.ALPHA;if(n===Zd)return i.RGB;if(n===Bn)return i.RGBA;if(n===Jd)return i.LUMINANCE;if(n===Kd)return i.LUMINANCE_ALPHA;if(n===Vs)return i.DEPTH_COMPONENT;if(n===Ys)return i.DEPTH_STENCIL;if(n===Qd)return i.RED;if(n===Eh)return i.RED_INTEGER;if(n===tf)return i.RG;if(n===Th)return i.RG_INTEGER;if(n===Ah)return i.RGBA_INTEGER;if(n===Wo||n===$o||n===Xo||n===qo)if(o===Me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Wo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Wo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$o)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===cl||n===ll||n===hl||n===ul)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===cl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ll)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===hl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ul)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===dl||n===fl||n===pl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===dl||n===fl)return o===Me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===pl)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ml||n===gl||n===_l||n===vl||n===yl||n===xl||n===bl||n===Ml||n===Sl||n===wl||n===El||n===Tl||n===Al||n===Rl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ml)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===gl)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_l)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===vl)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===yl)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xl)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===bl)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ml)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Sl)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===wl)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===El)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Tl)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Al)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Rl)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===jo||n===Cl||n===Pl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===jo)return o===Me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ef||n===Il||n===Ll||n===Dl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===jo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ll)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Dl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===js?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var jl=class extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Ae=class extends on{constructor(){super(),this.isGroup=!0,this.type="Group"}},ex={type:"move"},Ar=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){o=!0;for(let x of t.hand.values()){let _=e.getJointPose(x,n),g=this._getHandJoint(h,x);_!==null&&(g.matrix.fromArray(_.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=_.radius),g.visible=_!==null}let u=h.joints["index-finger-tip"],f=h.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,v=.005;h.inputState.pinching&&d>p+v?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&d<=p-v&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ex)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ae;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},nx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ix=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Yl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new rn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Zn({vertexShader:nx,fragmentShader:ix,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ht(new Cn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Zl=class extends di{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,h=null,u=null,f=null,d=null,p=null,v=null,x=new Yl,_=e.getContextAttributes(),g=null,E=null,T=[],b=[],k=new xt,L=null,U=new tn;U.viewport=new Se;let C=new tn;C.viewport=new Se;let A=[U,C],S=new jl,O=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let dt=T[J];return dt===void 0&&(dt=new Ar,T[J]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(J){let dt=T[J];return dt===void 0&&(dt=new Ar,T[J]=dt),dt.getGripSpace()},this.getHand=function(J){let dt=T[J];return dt===void 0&&(dt=new Ar,T[J]=dt),dt.getHandSpace()};function K(J){let dt=b.indexOf(J.inputSource);if(dt===-1)return;let Dt=T[dt];Dt!==void 0&&(Dt.update(J.inputSource,J.frame,h||o),Dt.dispatchEvent({type:J.type,data:J.inputSource}))}function I(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",I),s.removeEventListener("inputsourceschange",F);for(let J=0;J<T.length;J++){let dt=b[J];dt!==null&&(b[J]=null,T[J].disconnect(dt))}O=null,Y=null,x.reset(),t.setRenderTarget(g),p=null,d=null,f=null,s=null,E=null,Nt.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(J){h=J},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",I),s.addEventListener("inputsourceschange",F),_.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(k),s.renderState.layers===void 0){let dt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,dt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new fi(p.framebufferWidth,p.framebufferHeight,{format:Bn,type:ui,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let dt=null,Dt=null,at=null;_.depth&&(at=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=_.stencil?Ys:Vs,Dt=_.stencil?js:Ji);let Bt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};f=new XRWebGLBinding(s,e),d=f.createProjectionLayer(Bt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),E=new fi(d.textureWidth,d.textureHeight,{format:Bn,type:ui,depthTexture:new oa(d.textureWidth,d.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),h=null,o=await s.requestReferenceSpace(a),Nt.setContext(s),Nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function F(J){for(let dt=0;dt<J.removed.length;dt++){let Dt=J.removed[dt],at=b.indexOf(Dt);at>=0&&(b[at]=null,T[at].disconnect(Dt))}for(let dt=0;dt<J.added.length;dt++){let Dt=J.added[dt],at=b.indexOf(Dt);if(at===-1){for(let Xt=0;Xt<T.length;Xt++)if(Xt>=b.length){b.push(Dt),at=Xt;break}else if(b[Xt]===null){b[Xt]=Dt,at=Xt;break}if(at===-1)break}let Bt=T[at];Bt&&Bt.connect(Dt)}}let B=new D,it=new D;function q(J,dt,Dt){B.setFromMatrixPosition(dt.matrixWorld),it.setFromMatrixPosition(Dt.matrixWorld);let at=B.distanceTo(it),Bt=dt.projectionMatrix.elements,Xt=Dt.projectionMatrix.elements,se=Bt[14]/(Bt[10]-1),Yt=Bt[14]/(Bt[10]+1),he=(Bt[9]+1)/Bt[5],Te=(Bt[9]-1)/Bt[5],X=(Bt[8]-1)/Bt[0],ze=(Xt[8]+1)/Xt[0],Qt=se*X,te=se*ze,Ft=at/(-X+ze),Ee=Ft*-X;if(dt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Ee),J.translateZ(Ft),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Bt[10]===-1)J.projectionMatrix.copy(dt.projectionMatrix),J.projectionMatrixInverse.copy(dt.projectionMatrixInverse);else{let bt=se+Ft,P=Yt+Ft,M=Qt-Ee,j=te+(at-Ee),ot=he*Yt/P*bt,lt=Te*Yt/P*bt;J.projectionMatrix.makePerspective(M,j,ot,lt,bt,P),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ct(J,dt){dt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(dt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let dt=J.near,Dt=J.far;x.texture!==null&&(x.depthNear>0&&(dt=x.depthNear),x.depthFar>0&&(Dt=x.depthFar)),S.near=C.near=U.near=dt,S.far=C.far=U.far=Dt,(O!==S.near||Y!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),O=S.near,Y=S.far),U.layers.mask=J.layers.mask|2,C.layers.mask=J.layers.mask|4,S.layers.mask=U.layers.mask|C.layers.mask;let at=J.parent,Bt=S.cameras;ct(S,at);for(let Xt=0;Xt<Bt.length;Xt++)ct(Bt[Xt],at);Bt.length===2?q(S,U,C):S.projectionMatrix.copy(U.projectionMatrix),et(J,S,at)};function et(J,dt,Dt){Dt===null?J.matrix.copy(dt.matrixWorld):(J.matrix.copy(Dt.matrixWorld),J.matrix.invert(),J.matrix.multiply(dt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(dt.projectionMatrix),J.projectionMatrixInverse.copy(dt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ir*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(J){c=J,d!==null&&(d.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(S)};let ft=null;function It(J,dt){if(u=dt.getViewerPose(h||o),v=dt,u!==null){let Dt=u.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let at=!1;Dt.length!==S.cameras.length&&(S.cameras.length=0,at=!0);for(let Xt=0;Xt<Dt.length;Xt++){let se=Dt[Xt],Yt=null;if(p!==null)Yt=p.getViewport(se);else{let Te=f.getViewSubImage(d,se);Yt=Te.viewport,Xt===0&&(t.setRenderTargetTextures(E,Te.colorTexture,d.ignoreDepthValues?void 0:Te.depthStencilTexture),t.setRenderTarget(E))}let he=A[Xt];he===void 0&&(he=new tn,he.layers.enable(Xt),he.viewport=new Se,A[Xt]=he),he.matrix.fromArray(se.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(se.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),Xt===0&&(S.matrix.copy(he.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),at===!0&&S.cameras.push(he)}let Bt=s.enabledFeatures;if(Bt&&Bt.includes("depth-sensing")){let Xt=f.getDepthInformation(Dt[0]);Xt&&Xt.isValid&&Xt.texture&&x.init(t,Xt,s.renderState)}}for(let Dt=0;Dt<T.length;Dt++){let at=b[Dt],Bt=T[Dt];at!==null&&Bt!==void 0&&Bt.update(at,dt,h||o)}ft&&ft(J,dt),dt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:dt}),v=null}let Nt=new cf;Nt.setAnimationLoop(It),this.setAnimationLoop=function(J){ft=J},this.dispose=function(){}}},Wi=new Yn,sx=new Le;function rx(i,t){function e(_,g){_.matrixAutoUpdate===!0&&_.updateMatrix(),g.value.copy(_.matrix)}function n(_,g){g.color.getRGB(_.fogColor.value,af(i)),g.isFog?(_.fogNear.value=g.near,_.fogFar.value=g.far):g.isFogExp2&&(_.fogDensity.value=g.density)}function s(_,g,E,T,b){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(_,g):g.isMeshToonMaterial?(r(_,g),f(_,g)):g.isMeshPhongMaterial?(r(_,g),u(_,g)):g.isMeshStandardMaterial?(r(_,g),d(_,g),g.isMeshPhysicalMaterial&&p(_,g,b)):g.isMeshMatcapMaterial?(r(_,g),v(_,g)):g.isMeshDepthMaterial?r(_,g):g.isMeshDistanceMaterial?(r(_,g),x(_,g)):g.isMeshNormalMaterial?r(_,g):g.isLineBasicMaterial?(o(_,g),g.isLineDashedMaterial&&a(_,g)):g.isPointsMaterial?c(_,g,E,T):g.isSpriteMaterial?h(_,g):g.isShadowMaterial?(_.color.value.copy(g.color),_.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(_,g){_.opacity.value=g.opacity,g.color&&_.diffuse.value.copy(g.color),g.emissive&&_.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(_.map.value=g.map,e(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,e(g.alphaMap,_.alphaMapTransform)),g.bumpMap&&(_.bumpMap.value=g.bumpMap,e(g.bumpMap,_.bumpMapTransform),_.bumpScale.value=g.bumpScale,g.side===hn&&(_.bumpScale.value*=-1)),g.normalMap&&(_.normalMap.value=g.normalMap,e(g.normalMap,_.normalMapTransform),_.normalScale.value.copy(g.normalScale),g.side===hn&&_.normalScale.value.negate()),g.displacementMap&&(_.displacementMap.value=g.displacementMap,e(g.displacementMap,_.displacementMapTransform),_.displacementScale.value=g.displacementScale,_.displacementBias.value=g.displacementBias),g.emissiveMap&&(_.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,_.emissiveMapTransform)),g.specularMap&&(_.specularMap.value=g.specularMap,e(g.specularMap,_.specularMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest);let E=t.get(g),T=E.envMap,b=E.envMapRotation;T&&(_.envMap.value=T,Wi.copy(b),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),_.envMapRotation.value.setFromMatrix4(sx.makeRotationFromEuler(Wi)),_.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=g.reflectivity,_.ior.value=g.ior,_.refractionRatio.value=g.refractionRatio),g.lightMap&&(_.lightMap.value=g.lightMap,_.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,_.lightMapTransform)),g.aoMap&&(_.aoMap.value=g.aoMap,_.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,_.aoMapTransform))}function o(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,g.map&&(_.map.value=g.map,e(g.map,_.mapTransform))}function a(_,g){_.dashSize.value=g.dashSize,_.totalSize.value=g.dashSize+g.gapSize,_.scale.value=g.scale}function c(_,g,E,T){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.size.value=g.size*E,_.scale.value=T*.5,g.map&&(_.map.value=g.map,e(g.map,_.uvTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,e(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function h(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.rotation.value=g.rotation,g.map&&(_.map.value=g.map,e(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,e(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function u(_,g){_.specular.value.copy(g.specular),_.shininess.value=Math.max(g.shininess,1e-4)}function f(_,g){g.gradientMap&&(_.gradientMap.value=g.gradientMap)}function d(_,g){_.metalness.value=g.metalness,g.metalnessMap&&(_.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,_.metalnessMapTransform)),_.roughness.value=g.roughness,g.roughnessMap&&(_.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,_.roughnessMapTransform)),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)}function p(_,g,E){_.ior.value=g.ior,g.sheen>0&&(_.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),_.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(_.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,_.sheenColorMapTransform)),g.sheenRoughnessMap&&(_.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,_.sheenRoughnessMapTransform))),g.clearcoat>0&&(_.clearcoat.value=g.clearcoat,_.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(_.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,_.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(_.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===hn&&_.clearcoatNormalScale.value.negate())),g.dispersion>0&&(_.dispersion.value=g.dispersion),g.iridescence>0&&(_.iridescence.value=g.iridescence,_.iridescenceIOR.value=g.iridescenceIOR,_.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(_.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,_.iridescenceMapTransform)),g.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),g.transmission>0&&(_.transmission.value=g.transmission,_.transmissionSamplerMap.value=E.texture,_.transmissionSamplerSize.value.set(E.width,E.height),g.transmissionMap&&(_.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,_.transmissionMapTransform)),_.thickness.value=g.thickness,g.thicknessMap&&(_.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=g.attenuationDistance,_.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(_.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(_.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=g.specularIntensity,_.specularColor.value.copy(g.specularColor),g.specularColorMap&&(_.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,_.specularColorMapTransform)),g.specularIntensityMap&&(_.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,_.specularIntensityMapTransform))}function v(_,g){g.matcap&&(_.matcap.value=g.matcap)}function x(_,g){let E=t.get(g).light;_.referencePosition.value.setFromMatrixPosition(E.matrixWorld),_.nearDistance.value=E.shadow.camera.near,_.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ox(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,T){let b=T.program;n.uniformBlockBinding(E,b)}function h(E,T){let b=s[E.id];b===void 0&&(v(E),b=u(E),s[E.id]=b,E.addEventListener("dispose",_));let k=T.program;n.updateUBOMapping(E,k);let L=t.render.frame;r[E.id]!==L&&(d(E),r[E.id]=L)}function u(E){let T=f();E.__bindingPointIndex=T;let b=i.createBuffer(),k=E.__size,L=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,k,L),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,b),b}function f(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){let T=s[E.id],b=E.uniforms,k=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let L=0,U=b.length;L<U;L++){let C=Array.isArray(b[L])?b[L]:[b[L]];for(let A=0,S=C.length;A<S;A++){let O=C[A];if(p(O,L,A,k)===!0){let Y=O.__offset,K=Array.isArray(O.value)?O.value:[O.value],I=0;for(let F=0;F<K.length;F++){let B=K[F],it=x(B);typeof B=="number"||typeof B=="boolean"?(O.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,Y+I,O.__data)):B.isMatrix3?(O.__data[0]=B.elements[0],O.__data[1]=B.elements[1],O.__data[2]=B.elements[2],O.__data[3]=0,O.__data[4]=B.elements[3],O.__data[5]=B.elements[4],O.__data[6]=B.elements[5],O.__data[7]=0,O.__data[8]=B.elements[6],O.__data[9]=B.elements[7],O.__data[10]=B.elements[8],O.__data[11]=0):(B.toArray(O.__data,I),I+=it.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Y,O.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(E,T,b,k){let L=E.value,U=T+"_"+b;if(k[U]===void 0)return typeof L=="number"||typeof L=="boolean"?k[U]=L:k[U]=L.clone(),!0;{let C=k[U];if(typeof L=="number"||typeof L=="boolean"){if(C!==L)return k[U]=L,!0}else if(C.equals(L)===!1)return C.copy(L),!0}return!1}function v(E){let T=E.uniforms,b=0,k=16;for(let U=0,C=T.length;U<C;U++){let A=Array.isArray(T[U])?T[U]:[T[U]];for(let S=0,O=A.length;S<O;S++){let Y=A[S],K=Array.isArray(Y.value)?Y.value:[Y.value];for(let I=0,F=K.length;I<F;I++){let B=K[I],it=x(B),q=b%k,ct=q%it.boundary,et=q+ct;b+=ct,et!==0&&k-et<it.storage&&(b+=k-et),Y.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=b,b+=it.storage}}}let L=b%k;return L>0&&(b+=k-L),E.__size=b,E.__cache={},this}function x(E){let T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=48,T.storage=48):E.isMatrix4?(T.boundary=64,T.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),T}function _(E){let T=E.target;T.removeEventListener("dispose",_);let b=o.indexOf(T.__bindingPointIndex);o.splice(b,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function g(){for(let E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:c,update:h,dispose:g}}var aa=class{constructor(t={}){let{canvas:e=hg(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let v=new Uint32Array(4),x=new Int32Array(4),_=null,g=null,E=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qe,this.toneMapping=Pi,this.toneMappingExposure=1;let b=this,k=!1,L=0,U=0,C=null,A=-1,S=null,O=new Se,Y=new Se,K=null,I=new le(0),F=0,B=e.width,it=e.height,q=1,ct=null,et=null,ft=new Se(0,0,B,it),It=new Se(0,0,B,it),Nt=!1,J=new Ur,dt=!1,Dt=!1,at=new Le,Bt=new Le,Xt=new D,se=new Se,Yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},he=!1;function Te(){return C===null?q:1}let X=n;function ze(w,W){return e.getContext(w,W)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${yh}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",Rt,!1),e.addEventListener("webglcontextcreationerror",Tt,!1),X===null){let W="webgl2";if(X=ze(W,w),X===null)throw ze(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Qt,te,Ft,Ee,bt,P,M,j,ot,lt,rt,Ot,Mt,vt,Wt,ht,_t,Vt,qt,Lt,ce,ee,xe,G;function Et(){Qt=new Mv(X),Qt.init(),ee=new tx(X,Qt),te=new gv(X,Qt,t,ee),Ft=new Jy(X,Qt),te.reverseDepthBuffer&&d&&Ft.buffers.depth.setReversed(!0),Ee=new Ev(X),bt=new ky,P=new Qy(X,Qt,Ft,bt,te,ee,Ee),M=new vv(b),j=new bv(b),ot=new Lg(X),xe=new pv(X,ot),lt=new Sv(X,ot,Ee,xe),rt=new Av(X,lt,ot,Ee),qt=new Tv(X,te,P),ht=new _v(bt),Ot=new Fy(b,M,j,Qt,te,xe,ht),Mt=new rx(b,bt),vt=new zy,Wt=new Xy(Qt),Vt=new fv(b,M,j,Ft,rt,p,c),_t=new Yy(b,rt,te),G=new ox(X,Ee,te,Ft),Lt=new mv(X,Qt,Ee),ce=new wv(X,Qt,Ee),Ee.programs=Ot.programs,b.capabilities=te,b.extensions=Qt,b.properties=bt,b.renderLists=vt,b.shadowMap=_t,b.state=Ft,b.info=Ee}Et();let st=new Zl(b,X);this.xr=st,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){let w=Qt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Qt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(w){w!==void 0&&(q=w,this.setSize(B,it,!1))},this.getSize=function(w){return w.set(B,it)},this.setSize=function(w,W,z=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=w,it=W,e.width=Math.floor(w*q),e.height=Math.floor(W*q),z===!0&&(e.style.width=w+"px",e.style.height=W+"px"),this.setViewport(0,0,w,W)},this.getDrawingBufferSize=function(w){return w.set(B*q,it*q).floor()},this.setDrawingBufferSize=function(w,W,z){B=w,it=W,q=z,e.width=Math.floor(w*z),e.height=Math.floor(W*z),this.setViewport(0,0,w,W)},this.getCurrentViewport=function(w){return w.copy(O)},this.getViewport=function(w){return w.copy(ft)},this.setViewport=function(w,W,z,Q){w.isVector4?ft.set(w.x,w.y,w.z,w.w):ft.set(w,W,z,Q),Ft.viewport(O.copy(ft).multiplyScalar(q).round())},this.getScissor=function(w){return w.copy(It)},this.setScissor=function(w,W,z,Q){w.isVector4?It.set(w.x,w.y,w.z,w.w):It.set(w,W,z,Q),Ft.scissor(Y.copy(It).multiplyScalar(q).round())},this.getScissorTest=function(){return Nt},this.setScissorTest=function(w){Ft.setScissorTest(Nt=w)},this.setOpaqueSort=function(w){ct=w},this.setTransparentSort=function(w){et=w},this.getClearColor=function(w){return w.copy(Vt.getClearColor())},this.setClearColor=function(){Vt.setClearColor.apply(Vt,arguments)},this.getClearAlpha=function(){return Vt.getClearAlpha()},this.setClearAlpha=function(){Vt.setClearAlpha.apply(Vt,arguments)},this.clear=function(w=!0,W=!0,z=!0){let Q=0;if(w){let $=!1;if(C!==null){let pt=C.texture.format;$=pt===Ah||pt===Th||pt===Eh}if($){let pt=C.texture.type,At=pt===ui||pt===Ji||pt===Pr||pt===js||pt===Sh||pt===wh,Ut=Vt.getClearColor(),St=Vt.getClearAlpha(),Gt=Ut.r,Zt=Ut.g,yt=Ut.b;At?(v[0]=Gt,v[1]=Zt,v[2]=yt,v[3]=St,X.clearBufferuiv(X.COLOR,0,v)):(x[0]=Gt,x[1]=Zt,x[2]=yt,x[3]=St,X.clearBufferiv(X.COLOR,0,x))}else Q|=X.COLOR_BUFFER_BIT}W&&(Q|=X.DEPTH_BUFFER_BIT),z&&(Q|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",Rt,!1),e.removeEventListener("webglcontextcreationerror",Tt,!1),vt.dispose(),Wt.dispose(),bt.dispose(),M.dispose(),j.dispose(),rt.dispose(),xe.dispose(),G.dispose(),Ot.dispose(),st.dispose(),st.removeEventListener("sessionstart",dr),st.removeEventListener("sessionend",vi),Dn.stop()};function ut(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;let w=Ee.autoReset,W=_t.enabled,z=_t.autoUpdate,Q=_t.needsUpdate,$=_t.type;Et(),Ee.autoReset=w,_t.enabled=W,_t.autoUpdate=z,_t.needsUpdate=Q,_t.type=$}function Tt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function $t(w){let W=w.target;W.removeEventListener("dispose",$t),tt(W)}function tt(w){Pe(w),bt.remove(w)}function Pe(w){let W=bt.get(w).programs;W!==void 0&&(W.forEach(function(z){Ot.releaseProgram(z)}),w.isShaderMaterial&&Ot.releaseShaderCache(w))}this.renderBufferDirect=function(w,W,z,Q,$,pt){W===null&&(W=Yt);let At=$.isMesh&&$.matrixWorld.determinant()<0,Ut=Ka(w,W,z,Q,$);Ft.setMaterial(Q,At);let St=z.index,Gt=1;if(Q.wireframe===!0){if(St=lt.getWireframeAttribute(z),St===void 0)return;Gt=2}let Zt=z.drawRange,yt=z.attributes.position,de=Zt.start*Gt,_e=(Zt.start+Zt.count)*Gt;pt!==null&&(de=Math.max(de,pt.start*Gt),_e=Math.min(_e,(pt.start+pt.count)*Gt)),St!==null?(de=Math.max(de,0),_e=Math.min(_e,St.count)):yt!=null&&(de=Math.max(de,0),_e=Math.min(_e,yt.count));let ve=_e-de;if(ve<0||ve===1/0)return;xe.setup($,Q,Ut,z,St);let Ce,fe=Lt;if(St!==null&&(Ce=ot.get(St),fe=ce,fe.setIndex(Ce)),$.isMesh)Q.wireframe===!0?(Ft.setLineWidth(Q.wireframeLinewidth*Te()),fe.setMode(X.LINES)):fe.setMode(X.TRIANGLES);else if($.isLine){let kt=Q.linewidth;kt===void 0&&(kt=1),Ft.setLineWidth(kt*Te()),$.isLineSegments?fe.setMode(X.LINES):$.isLineLoop?fe.setMode(X.LINE_LOOP):fe.setMode(X.LINE_STRIP)}else $.isPoints?fe.setMode(X.POINTS):$.isSprite&&fe.setMode(X.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)fe.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(Qt.get("WEBGL_multi_draw"))fe.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let kt=$._multiDrawStarts,He=$._multiDrawCounts,re=$._multiDrawCount,pe=St?ot.get(St).bytesPerElement:1,gn=bt.get(Q).currentProgram.getUniforms();for(let Ue=0;Ue<re;Ue++)gn.setValue(X,"_gl_DrawID",Ue),fe.render(kt[Ue]/pe,He[Ue])}else if($.isInstancedMesh)fe.renderInstances(de,ve,$.count);else if(z.isInstancedBufferGeometry){let kt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,He=Math.min(z.instanceCount,kt);fe.renderInstances(de,ve,He)}else fe.render(de,ve)};function ge(w,W,z){w.transparent===!0&&w.side===kn&&w.forceSinglePass===!1?(w.side=hn,w.needsUpdate=!0,bs(w,W,z),w.side=Ii,w.needsUpdate=!0,bs(w,W,z),w.side=kn):bs(w,W,z)}this.compile=function(w,W,z=null){z===null&&(z=w),g=Wt.get(z),g.init(W),T.push(g),z.traverseVisible(function($){$.isLight&&$.layers.test(W.layers)&&(g.pushLight($),$.castShadow&&g.pushShadow($))}),w!==z&&w.traverseVisible(function($){$.isLight&&$.layers.test(W.layers)&&(g.pushLight($),$.castShadow&&g.pushShadow($))}),g.setupLights();let Q=new Set;return w.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let pt=$.material;if(pt)if(Array.isArray(pt))for(let At=0;At<pt.length;At++){let Ut=pt[At];ge(Ut,z,$),Q.add(Ut)}else ge(pt,z,$),Q.add(pt)}),T.pop(),g=null,Q},this.compileAsync=function(w,W,z=null){let Q=this.compile(w,W,z);return new Promise($=>{function pt(){if(Q.forEach(function(At){bt.get(At).currentProgram.isReady()&&Q.delete(At)}),Q.size===0){$(w);return}setTimeout(pt,10)}Qt.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let cn=null;function en(w){cn&&cn(w)}function dr(){Dn.stop()}function vi(){Dn.start()}let Dn=new cf;Dn.setAnimationLoop(en),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(w){cn=w,st.setAnimationLoop(w),w===null?Dn.stop():Dn.start()},st.addEventListener("sessionstart",dr),st.addEventListener("sessionend",vi),this.render=function(w,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(W),W=st.getCamera()),w.isScene===!0&&w.onBeforeRender(b,w,W,C),g=Wt.get(w,T.length),g.init(W),T.push(g),Bt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),J.setFromProjectionMatrix(Bt),Dt=this.localClippingEnabled,dt=ht.init(this.clippingPlanes,Dt),_=vt.get(w,E.length),_.init(),E.push(_),st.enabled===!0&&st.isPresenting===!0){let pt=b.xr.getDepthSensingMesh();pt!==null&&fr(pt,W,-1/0,b.sortObjects)}fr(w,W,0,b.sortObjects),_.finish(),b.sortObjects===!0&&_.sort(ct,et),he=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,he&&Vt.addToRenderList(_,w),this.info.render.frame++,dt===!0&&ht.beginShadows();let z=g.state.shadowsArray;_t.render(z,w,W),dt===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();let Q=_.opaque,$=_.transmissive;if(g.setupLights(),W.isArrayCamera){let pt=W.cameras;if($.length>0)for(let At=0,Ut=pt.length;At<Ut;At++){let St=pt[At];Qn(Q,$,w,St)}he&&Vt.render(w);for(let At=0,Ut=pt.length;At<Ut;At++){let St=pt[At];Mn(_,w,St,St.viewport)}}else $.length>0&&Qn(Q,$,w,W),he&&Vt.render(w),Mn(_,w,W);C!==null&&(P.updateMultisampleRenderTarget(C),P.updateRenderTargetMipmap(C)),w.isScene===!0&&w.onAfterRender(b,w,W),xe.resetDefaultState(),A=-1,S=null,T.pop(),T.length>0?(g=T[T.length-1],dt===!0&&ht.setGlobalState(b.clippingPlanes,g.state.camera)):g=null,E.pop(),E.length>0?_=E[E.length-1]:_=null};function fr(w,W,z,Q){if(w.visible===!1)return;if(w.layers.test(W.layers)){if(w.isGroup)z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(W);else if(w.isLight)g.pushLight(w),w.castShadow&&g.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||J.intersectsSprite(w)){Q&&se.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Bt);let At=rt.update(w),Ut=w.material;Ut.visible&&_.push(w,At,Ut,z,se.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||J.intersectsObject(w))){let At=rt.update(w),Ut=w.material;if(Q&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),se.copy(w.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),se.copy(At.boundingSphere.center)),se.applyMatrix4(w.matrixWorld).applyMatrix4(Bt)),Array.isArray(Ut)){let St=At.groups;for(let Gt=0,Zt=St.length;Gt<Zt;Gt++){let yt=St[Gt],de=Ut[yt.materialIndex];de&&de.visible&&_.push(w,At,de,z,se.z,yt)}}else Ut.visible&&_.push(w,At,Ut,z,se.z,null)}}let pt=w.children;for(let At=0,Ut=pt.length;At<Ut;At++)fr(pt[At],W,z,Q)}function Mn(w,W,z,Q){let $=w.opaque,pt=w.transmissive,At=w.transparent;g.setupLightsView(z),dt===!0&&ht.setGlobalState(b.clippingPlanes,z),Q&&Ft.viewport(O.copy(Q)),$.length>0&&mn($,W,z),pt.length>0&&mn(pt,W,z),At.length>0&&mn(At,W,z),Ft.buffers.depth.setTest(!0),Ft.buffers.depth.setMask(!0),Ft.buffers.color.setMask(!0),Ft.setPolygonOffset(!1)}function Qn(w,W,z,Q){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[Q.id]===void 0&&(g.state.transmissionRenderTarget[Q.id]=new fi(1,1,{generateMipmaps:!0,type:Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float")?Hr:ui,minFilter:Zi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:me.workingColorSpace}));let pt=g.state.transmissionRenderTarget[Q.id],At=Q.viewport||O;pt.setSize(At.z,At.w);let Ut=b.getRenderTarget();b.setRenderTarget(pt),b.getClearColor(I),F=b.getClearAlpha(),F<1&&b.setClearColor(16777215,.5),b.clear(),he&&Vt.render(z);let St=b.toneMapping;b.toneMapping=Pi;let Gt=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),g.setupLightsView(Q),dt===!0&&ht.setGlobalState(b.clippingPlanes,Q),mn(w,z,Q),P.updateMultisampleRenderTarget(pt),P.updateRenderTargetMipmap(pt),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let yt=0,de=W.length;yt<de;yt++){let _e=W[yt],ve=_e.object,Ce=_e.geometry,fe=_e.material,kt=_e.group;if(fe.side===kn&&ve.layers.test(Q.layers)){let He=fe.side;fe.side=hn,fe.needsUpdate=!0,Ze(ve,z,Q,Ce,fe,kt),fe.side=He,fe.needsUpdate=!0,Zt=!0}}Zt===!0&&(P.updateMultisampleRenderTarget(pt),P.updateRenderTargetMipmap(pt))}b.setRenderTarget(Ut),b.setClearColor(I,F),Gt!==void 0&&(Q.viewport=Gt),b.toneMapping=St}function mn(w,W,z){let Q=W.isScene===!0?W.overrideMaterial:null;for(let $=0,pt=w.length;$<pt;$++){let At=w[$],Ut=At.object,St=At.geometry,Gt=Q===null?At.material:Q,Zt=At.group;Ut.layers.test(z.layers)&&Ze(Ut,W,z,St,Gt,Zt)}}function Ze(w,W,z,Q,$,pt){w.onBeforeRender(b,W,z,Q,$,pt),w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),$.onBeforeRender(b,W,z,Q,w,pt),$.transparent===!0&&$.side===kn&&$.forceSinglePass===!1?($.side=hn,$.needsUpdate=!0,b.renderBufferDirect(z,W,Q,$,w,pt),$.side=Ii,$.needsUpdate=!0,b.renderBufferDirect(z,W,Q,$,w,pt),$.side=kn):b.renderBufferDirect(z,W,Q,$,w,pt),w.onAfterRender(b,W,z,Q,$,pt)}function bs(w,W,z){W.isScene!==!0&&(W=Yt);let Q=bt.get(w),$=g.state.lights,pt=g.state.shadowsArray,At=$.state.version,Ut=Ot.getParameters(w,$.state,pt,W,z),St=Ot.getProgramCacheKey(Ut),Gt=Q.programs;Q.environment=w.isMeshStandardMaterial?W.environment:null,Q.fog=W.fog,Q.envMap=(w.isMeshStandardMaterial?j:M).get(w.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&w.envMap===null?W.environmentRotation:w.envMapRotation,Gt===void 0&&(w.addEventListener("dispose",$t),Gt=new Map,Q.programs=Gt);let Zt=Gt.get(St);if(Zt!==void 0){if(Q.currentProgram===Zt&&Q.lightsStateVersion===At)return Oi(w,Ut),Zt}else Ut.uniforms=Ot.getUniforms(w),w.onBeforeCompile(Ut,b),Zt=Ot.acquireProgram(Ut,St),Gt.set(St,Zt),Q.uniforms=Ut.uniforms;let yt=Q.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(yt.clippingPlanes=ht.uniform),Oi(w,Ut),Q.needsLights=Ms(w),Q.lightsStateVersion=At,Q.needsLights&&(yt.ambientLightColor.value=$.state.ambient,yt.lightProbe.value=$.state.probe,yt.directionalLights.value=$.state.directional,yt.directionalLightShadows.value=$.state.directionalShadow,yt.spotLights.value=$.state.spot,yt.spotLightShadows.value=$.state.spotShadow,yt.rectAreaLights.value=$.state.rectArea,yt.ltc_1.value=$.state.rectAreaLTC1,yt.ltc_2.value=$.state.rectAreaLTC2,yt.pointLights.value=$.state.point,yt.pointLightShadows.value=$.state.pointShadow,yt.hemisphereLights.value=$.state.hemi,yt.directionalShadowMap.value=$.state.directionalShadowMap,yt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,yt.spotShadowMap.value=$.state.spotShadowMap,yt.spotLightMatrix.value=$.state.spotLightMatrix,yt.spotLightMap.value=$.state.spotLightMap,yt.pointShadowMap.value=$.state.pointShadowMap,yt.pointShadowMatrix.value=$.state.pointShadowMatrix),Q.currentProgram=Zt,Q.uniformsList=null,Zt}function yi(w){if(w.uniformsList===null){let W=w.currentProgram.getUniforms();w.uniformsList=Ws.seqWithValue(W.seq,w.uniforms)}return w.uniformsList}function Oi(w,W){let z=bt.get(w);z.outputColorSpace=W.outputColorSpace,z.batching=W.batching,z.batchingColor=W.batchingColor,z.instancing=W.instancing,z.instancingColor=W.instancingColor,z.instancingMorph=W.instancingMorph,z.skinning=W.skinning,z.morphTargets=W.morphTargets,z.morphNormals=W.morphNormals,z.morphColors=W.morphColors,z.morphTargetsCount=W.morphTargetsCount,z.numClippingPlanes=W.numClippingPlanes,z.numIntersection=W.numClipIntersection,z.vertexAlphas=W.vertexAlphas,z.vertexTangents=W.vertexTangents,z.toneMapping=W.toneMapping}function Ka(w,W,z,Q,$){W.isScene!==!0&&(W=Yt),P.resetTextureUnits();let pt=W.fog,At=Q.isMeshStandardMaterial?W.environment:null,Ut=C===null?b.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Qs,St=(Q.isMeshStandardMaterial?j:M).get(Q.envMap||At),Gt=Q.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Zt=!!z.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),yt=!!z.morphAttributes.position,de=!!z.morphAttributes.normal,_e=!!z.morphAttributes.color,ve=Pi;Q.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ve=b.toneMapping);let Ce=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,fe=Ce!==void 0?Ce.length:0,kt=bt.get(Q),He=g.state.lights;if(dt===!0&&(Dt===!0||w!==S)){let ln=w===S&&Q.id===A;ht.setState(Q,w,ln)}let re=!1;Q.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==He.state.version||kt.outputColorSpace!==Ut||$.isBatchedMesh&&kt.batching===!1||!$.isBatchedMesh&&kt.batching===!0||$.isBatchedMesh&&kt.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&kt.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&kt.instancing===!1||!$.isInstancedMesh&&kt.instancing===!0||$.isSkinnedMesh&&kt.skinning===!1||!$.isSkinnedMesh&&kt.skinning===!0||$.isInstancedMesh&&kt.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&kt.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&kt.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&kt.instancingMorph===!1&&$.morphTexture!==null||kt.envMap!==St||Q.fog===!0&&kt.fog!==pt||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==ht.numPlanes||kt.numIntersection!==ht.numIntersection)||kt.vertexAlphas!==Gt||kt.vertexTangents!==Zt||kt.morphTargets!==yt||kt.morphNormals!==de||kt.morphColors!==_e||kt.toneMapping!==ve||kt.morphTargetsCount!==fe)&&(re=!0):(re=!0,kt.__version=Q.version);let pe=kt.currentProgram;re===!0&&(pe=bs(Q,W,$));let gn=!1,Ue=!1,Fi=!1,be=pe.getUniforms(),_n=kt.uniforms;if(Ft.useProgram(pe.program)&&(gn=!0,Ue=!0,Fi=!0),Q.id!==A&&(A=Q.id,Ue=!0),gn||S!==w){Ft.buffers.depth.getReversed()?(at.copy(w.projectionMatrix),dg(at),fg(at),be.setValue(X,"projectionMatrix",at)):be.setValue(X,"projectionMatrix",w.projectionMatrix),be.setValue(X,"viewMatrix",w.matrixWorldInverse);let Gn=be.map.cameraPosition;Gn!==void 0&&Gn.setValue(X,Xt.setFromMatrixPosition(w.matrixWorld)),te.logarithmicDepthBuffer&&be.setValue(X,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&be.setValue(X,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,Ue=!0,Fi=!0)}if($.isSkinnedMesh){be.setOptional(X,$,"bindMatrix"),be.setOptional(X,$,"bindMatrixInverse");let ln=$.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),be.setValue(X,"boneTexture",ln.boneTexture,P))}$.isBatchedMesh&&(be.setOptional(X,$,"batchingTexture"),be.setValue(X,"batchingTexture",$._matricesTexture,P),be.setOptional(X,$,"batchingIdTexture"),be.setValue(X,"batchingIdTexture",$._indirectTexture,P),be.setOptional(X,$,"batchingColorTexture"),$._colorsTexture!==null&&be.setValue(X,"batchingColorTexture",$._colorsTexture,P));let Sn=z.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&qt.update($,z,pe),(Ue||kt.receiveShadow!==$.receiveShadow)&&(kt.receiveShadow=$.receiveShadow,be.setValue(X,"receiveShadow",$.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(_n.envMap.value=St,_n.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&W.environment!==null&&(_n.envMapIntensity.value=W.environmentIntensity),Ue&&(be.setValue(X,"toneMappingExposure",b.toneMappingExposure),kt.needsLights&&Qa(_n,Fi),pt&&Q.fog===!0&&Mt.refreshFogUniforms(_n,pt),Mt.refreshMaterialUniforms(_n,Q,q,it,g.state.transmissionRenderTarget[w.id]),Ws.upload(X,yi(kt),_n,P)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Ws.upload(X,yi(kt),_n,P),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&be.setValue(X,"center",$.center),be.setValue(X,"modelViewMatrix",$.modelViewMatrix),be.setValue(X,"normalMatrix",$.normalMatrix),be.setValue(X,"modelMatrix",$.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let ln=Q.uniformsGroups;for(let Gn=0,Wn=ln.length;Gn<Wn;Gn++){let xi=ln[Gn];G.update(xi,pe),G.bind(xi,pe)}}return pe}function Qa(w,W){w.ambientLightColor.needsUpdate=W,w.lightProbe.needsUpdate=W,w.directionalLights.needsUpdate=W,w.directionalLightShadows.needsUpdate=W,w.pointLights.needsUpdate=W,w.pointLightShadows.needsUpdate=W,w.spotLights.needsUpdate=W,w.spotLightShadows.needsUpdate=W,w.rectAreaLights.needsUpdate=W,w.hemisphereLights.needsUpdate=W}function Ms(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(w,W,z){bt.get(w.texture).__webglTexture=W,bt.get(w.depthTexture).__webglTexture=z;let Q=bt.get(w);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=z===void 0,Q.__autoAllocateDepthBuffer||Qt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,W){let z=bt.get(w);z.__webglFramebuffer=W,z.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(w,W=0,z=0){C=w,L=W,U=z;let Q=!0,$=null,pt=!1,At=!1;if(w){let St=bt.get(w);if(St.__useDefaultFramebuffer!==void 0)Ft.bindFramebuffer(X.FRAMEBUFFER,null),Q=!1;else if(St.__webglFramebuffer===void 0)P.setupRenderTarget(w);else if(St.__hasExternalTextures)P.rebindTextures(w,bt.get(w.texture).__webglTexture,bt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let yt=w.depthTexture;if(St.__boundDepthTexture!==yt){if(yt!==null&&bt.has(yt)&&(w.width!==yt.image.width||w.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(w)}}let Gt=w.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(At=!0);let Zt=bt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Zt[W])?$=Zt[W][z]:$=Zt[W],pt=!0):w.samples>0&&P.useMultisampledRTT(w)===!1?$=bt.get(w).__webglMultisampledFramebuffer:Array.isArray(Zt)?$=Zt[z]:$=Zt,O.copy(w.viewport),Y.copy(w.scissor),K=w.scissorTest}else O.copy(ft).multiplyScalar(q).floor(),Y.copy(It).multiplyScalar(q).floor(),K=Nt;if(Ft.bindFramebuffer(X.FRAMEBUFFER,$)&&Q&&Ft.drawBuffers(w,$),Ft.viewport(O),Ft.scissor(Y),Ft.setScissorTest(K),pt){let St=bt.get(w.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+W,St.__webglTexture,z)}else if(At){let St=bt.get(w.texture),Gt=W||0;X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,St.__webglTexture,z||0,Gt)}A=-1},this.readRenderTargetPixels=function(w,W,z,Q,$,pt,At){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=bt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&At!==void 0&&(Ut=Ut[At]),Ut){Ft.bindFramebuffer(X.FRAMEBUFFER,Ut);try{let St=w.texture,Gt=St.format,Zt=St.type;if(!te.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!te.textureTypeReadable(Zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=w.width-Q&&z>=0&&z<=w.height-$&&X.readPixels(W,z,Q,$,ee.convert(Gt),ee.convert(Zt),pt)}finally{let St=C!==null?bt.get(C).__webglFramebuffer:null;Ft.bindFramebuffer(X.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(w,W,z,Q,$,pt,At){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=bt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&At!==void 0&&(Ut=Ut[At]),Ut){let St=w.texture,Gt=St.format,Zt=St.type;if(!te.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=w.width-Q&&z>=0&&z<=w.height-$){Ft.bindFramebuffer(X.FRAMEBUFFER,Ut);let yt=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,yt),X.bufferData(X.PIXEL_PACK_BUFFER,pt.byteLength,X.STREAM_READ),X.readPixels(W,z,Q,$,ee.convert(Gt),ee.convert(Zt),0);let de=C!==null?bt.get(C).__webglFramebuffer:null;Ft.bindFramebuffer(X.FRAMEBUFFER,de);let _e=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await ug(X,_e,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,yt),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,pt),X.deleteBuffer(yt),X.deleteSync(_e),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,W=null,z=0){w.isTexture!==!0&&(Sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,w=arguments[1]);let Q=Math.pow(2,-z),$=Math.floor(w.image.width*Q),pt=Math.floor(w.image.height*Q),At=W!==null?W.x:0,Ut=W!==null?W.y:0;P.setTexture2D(w,0),X.copyTexSubImage2D(X.TEXTURE_2D,z,0,0,At,Ut,$,pt),Ft.unbindTexture()},this.copyTextureToTexture=function(w,W,z=null,Q=null,$=0){w.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,w=arguments[1],W=arguments[2],$=arguments[3]||0,z=null);let pt,At,Ut,St,Gt,Zt,yt,de,_e,ve=w.isCompressedTexture?w.mipmaps[$]:w.image;z!==null?(pt=z.max.x-z.min.x,At=z.max.y-z.min.y,Ut=z.isBox3?z.max.z-z.min.z:1,St=z.min.x,Gt=z.min.y,Zt=z.isBox3?z.min.z:0):(pt=ve.width,At=ve.height,Ut=ve.depth||1,St=0,Gt=0,Zt=0),Q!==null?(yt=Q.x,de=Q.y,_e=Q.z):(yt=0,de=0,_e=0);let Ce=ee.convert(W.format),fe=ee.convert(W.type),kt;W.isData3DTexture?(P.setTexture3D(W,0),kt=X.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(P.setTexture2DArray(W,0),kt=X.TEXTURE_2D_ARRAY):(P.setTexture2D(W,0),kt=X.TEXTURE_2D),X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,W.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,W.unpackAlignment);let He=X.getParameter(X.UNPACK_ROW_LENGTH),re=X.getParameter(X.UNPACK_IMAGE_HEIGHT),pe=X.getParameter(X.UNPACK_SKIP_PIXELS),gn=X.getParameter(X.UNPACK_SKIP_ROWS),Ue=X.getParameter(X.UNPACK_SKIP_IMAGES);X.pixelStorei(X.UNPACK_ROW_LENGTH,ve.width),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,ve.height),X.pixelStorei(X.UNPACK_SKIP_PIXELS,St),X.pixelStorei(X.UNPACK_SKIP_ROWS,Gt),X.pixelStorei(X.UNPACK_SKIP_IMAGES,Zt);let Fi=w.isDataArrayTexture||w.isData3DTexture,be=W.isDataArrayTexture||W.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let _n=bt.get(w),Sn=bt.get(W),ln=bt.get(_n.__renderTarget),Gn=bt.get(Sn.__renderTarget);Ft.bindFramebuffer(X.READ_FRAMEBUFFER,ln.__webglFramebuffer),Ft.bindFramebuffer(X.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let Wn=0;Wn<Ut;Wn++)Fi&&X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,bt.get(w).__webglTexture,$,Zt+Wn),w.isDepthTexture?(be&&X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,bt.get(W).__webglTexture,$,_e+Wn),X.blitFramebuffer(St,Gt,pt,At,yt,de,pt,At,X.DEPTH_BUFFER_BIT,X.NEAREST)):be?X.copyTexSubImage3D(kt,$,yt,de,_e+Wn,St,Gt,pt,At):X.copyTexSubImage2D(kt,$,yt,de,_e+Wn,St,Gt,pt,At);Ft.bindFramebuffer(X.READ_FRAMEBUFFER,null),Ft.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else be?w.isDataTexture||w.isData3DTexture?X.texSubImage3D(kt,$,yt,de,_e,pt,At,Ut,Ce,fe,ve.data):W.isCompressedArrayTexture?X.compressedTexSubImage3D(kt,$,yt,de,_e,pt,At,Ut,Ce,ve.data):X.texSubImage3D(kt,$,yt,de,_e,pt,At,Ut,Ce,fe,ve):w.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,$,yt,de,pt,At,Ce,fe,ve.data):w.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,$,yt,de,ve.width,ve.height,Ce,ve.data):X.texSubImage2D(X.TEXTURE_2D,$,yt,de,pt,At,Ce,fe,ve);X.pixelStorei(X.UNPACK_ROW_LENGTH,He),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,re),X.pixelStorei(X.UNPACK_SKIP_PIXELS,pe),X.pixelStorei(X.UNPACK_SKIP_ROWS,gn),X.pixelStorei(X.UNPACK_SKIP_IMAGES,Ue),$===0&&W.generateMipmaps&&X.generateMipmap(kt),Ft.unbindTexture()},this.copyTextureToTexture3D=function(w,W,z=null,Q=null,$=0){return w.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,Q=arguments[1]||null,w=arguments[2],W=arguments[3],$=arguments[4]||0),Sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,W,z,Q,$)},this.initRenderTarget=function(w){bt.get(w).__webglFramebuffer===void 0&&P.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?P.setTextureCube(w,0):w.isData3DTexture?P.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?P.setTexture2DArray(w,0):P.setTexture2D(w,0),Ft.unbindTexture()},this.resetState=function(){L=0,U=0,C=null,Ft.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=me._getDrawingBufferColorSpace(t),e.unpackColorSpace=me._getUnpackColorSpace()}};var ca=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new le(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},la=class extends on{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Nr=class extends rn{constructor(t,e,n,s,r,o,a,c,h){super(t,e,n,s,r,o,a,c,h),this.isCanvasTexture=!0,this.needsUpdate=!0}},Pn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,h;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),h=n[s]-o,h<0)a=s+1;else if(h>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let u=n[s],d=n[s+1]-u,p=(o-u)/d;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new xt:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new D,s=[],r=[],o=[],a=new D,c=new Le;for(let p=0;p<=t;p++){let v=p/t;s[p]=this.getTangentAt(v,new D)}r[0]=new D,o[0]=new D;let h=Number.MAX_VALUE,u=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=h&&(h=u,n.set(1,0,0)),f<=h&&(h=f,n.set(0,1,0)),d<=h&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let v=Math.acos(Ve(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,v))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Ve(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let v=1;v<=t;v++)r[v].applyMatrix4(c.makeRotationAxis(s[v],p*v)),o[v].crossVectors(s[v],r[v])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Or=class extends Pn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new xt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=c-this.aX,p=h-this.aY;c=d*u-p*f+this.aX,h=d*f+p*u+this.aY}return n.set(c,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Jl=class extends Or{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Ph(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,h){s(o,a,h*(a-r),h*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,h,u,f){let d=(o-r)/h-(a-r)/(h+u)+(a-o)/u,p=(a-o)/u-(c-o)/(u+f)+(c-a)/f;d*=u,p*=u,s(o,a,d,p)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Vo=new D,Wc=new Ph,$c=new Ph,Xc=new Ph,Kl=class extends Pn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let h,u;this.closed||a>0?h=s[(a-1)%r]:(Vo.subVectors(s[0],s[1]).add(s[0]),h=Vo);let f=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Vo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Vo),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,v=Math.pow(h.distanceToSquared(f),p),x=Math.pow(f.distanceToSquared(d),p),_=Math.pow(d.distanceToSquared(u),p);x<1e-4&&(x=1),v<1e-4&&(v=x),_<1e-4&&(_=x),Wc.initNonuniformCatmullRom(h.x,f.x,d.x,u.x,v,x,_),$c.initNonuniformCatmullRom(h.y,f.y,d.y,u.y,v,x,_),Xc.initNonuniformCatmullRom(h.z,f.z,d.z,u.z,v,x,_)}else this.curveType==="catmullrom"&&(Wc.initCatmullRom(h.x,f.x,d.x,u.x,this.tension),$c.initCatmullRom(h.y,f.y,d.y,u.y,this.tension),Xc.initCatmullRom(h.z,f.z,d.z,u.z,this.tension));return n.set(Wc.calc(c),$c.calc(c),Xc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Nd(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function ax(i,t){let e=1-i;return e*e*t}function cx(i,t){return 2*(1-i)*i*t}function lx(i,t){return i*i*t}function Rr(i,t,e,n){return ax(i,t)+cx(i,e)+lx(i,n)}function hx(i,t){let e=1-i;return e*e*e*t}function ux(i,t){let e=1-i;return 3*e*e*i*t}function dx(i,t){return 3*(1-i)*i*i*t}function fx(i,t){return i*i*i*t}function Cr(i,t,e,n,s){return hx(i,t)+ux(i,e)+dx(i,n)+fx(i,s)}var ha=class extends Pn{constructor(t=new xt,e=new xt,n=new xt,s=new xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new xt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Cr(t,s.x,r.x,o.x,a.x),Cr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ql=class extends Pn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Cr(t,s.x,r.x,o.x,a.x),Cr(t,s.y,r.y,o.y,a.y),Cr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ua=class extends Pn{constructor(t=new xt,e=new xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new xt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new xt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},th=class extends Pn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},da=class extends Pn{constructor(t=new xt,e=new xt,n=new xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new xt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Rr(t,s.x,r.x,o.x),Rr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},eh=class extends Pn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Rr(t,s.x,r.x,o.x),Rr(t,s.y,r.y,o.y),Rr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},fa=class extends Pn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new xt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],h=s[o],u=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(Nd(a,c.x,h.x,u.x,f.x),Nd(a,c.y,h.y,u.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new xt().fromArray(s))}return this}},Od=Object.freeze({__proto__:null,ArcCurve:Jl,CatmullRomCurve3:Kl,CubicBezierCurve:ha,CubicBezierCurve3:Ql,EllipseCurve:Or,LineCurve:ua,LineCurve3:th,QuadraticBezierCurve:da,QuadraticBezierCurve3:eh,SplineCurve:fa}),nh=class extends Pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Od[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),h=c===0?0:1-o/c;return a.getPointAt(h,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let h=0;h<c.length;h++){let u=c[h];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Od[s.type]().fromJSON(s))}return this}},ih=class extends nh{constructor(t){super(),this.type="Path",this.currentPoint=new xt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new ua(this.currentPoint.clone(),new xt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new da(this.currentPoint.clone(),new xt(t,e),new xt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new ha(this.currentPoint.clone(),new xt(t,e),new xt(n,s),new xt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new fa(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let h=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+h,e+u,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let h=new Or(t,e,n,s,r,o,a,c);if(this.curves.length>0){let f=h.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(h);let u=h.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},sh=class i extends un{constructor(t=[new xt(0,-.5),new xt(.5,0),new xt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ve(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],h=[],u=1/e,f=new D,d=new xt,p=new D,v=new D,x=new D,_=0,g=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:_=t[E+1].x-t[E].x,g=t[E+1].y-t[E].y,p.x=g*1,p.y=-_,p.z=g*0,x.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:_=t[E+1].x-t[E].x,g=t[E+1].y-t[E].y,p.x=g*1,p.y=-_,p.z=g*0,v.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),c.push(p.x,p.y,p.z),x.copy(v)}for(let E=0;E<=e;E++){let T=n+E*u*s,b=Math.sin(T),k=Math.cos(T);for(let L=0;L<=t.length-1;L++){f.x=t[L].x*b,f.y=t[L].y,f.z=t[L].x*k,o.push(f.x,f.y,f.z),d.x=E/e,d.y=L/(t.length-1),a.push(d.x,d.y);let U=c[3*L+0]*b,C=c[3*L+1],A=c[3*L+0]*k;h.push(U,C,A)}}for(let E=0;E<e;E++)for(let T=0;T<t.length-1;T++){let b=T+E*t.length,k=b,L=b+t.length,U=b+t.length+1,C=b+1;r.push(k,L,C),r.push(U,C,L)}this.setIndex(r),this.setAttribute("position",new ye(o,3)),this.setAttribute("uv",new ye(a,2)),this.setAttribute("normal",new ye(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},ts=class i extends sh{constructor(t=1,e=1,n=4,s=8){let r=new ih;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},Fr=class i extends un{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],h=new D,u=new xt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){let p=n+f/e*s;h.x=t*Math.cos(p),h.y=t*Math.sin(p),o.push(h.x,h.y,h.z),a.push(0,0,1),u.x=(o[d]/t+1)/2,u.y=(o[d+1]/t+1)/2,c.push(u.x,u.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new ye(o,3)),this.setAttribute("normal",new ye(a,3)),this.setAttribute("uv",new ye(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},es=class i extends un{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let h=this;s=Math.floor(s),r=Math.floor(r);let u=[],f=[],d=[],p=[],v=0,x=[],_=n/2,g=0;E(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new ye(f,3)),this.setAttribute("normal",new ye(d,3)),this.setAttribute("uv",new ye(p,2));function E(){let b=new D,k=new D,L=0,U=(e-t)/n;for(let C=0;C<=r;C++){let A=[],S=C/r,O=S*(e-t)+t;for(let Y=0;Y<=s;Y++){let K=Y/s,I=K*c+a,F=Math.sin(I),B=Math.cos(I);k.x=O*F,k.y=-S*n+_,k.z=O*B,f.push(k.x,k.y,k.z),b.set(F,U,B).normalize(),d.push(b.x,b.y,b.z),p.push(K,1-S),A.push(v++)}x.push(A)}for(let C=0;C<s;C++)for(let A=0;A<r;A++){let S=x[A][C],O=x[A+1][C],Y=x[A+1][C+1],K=x[A][C+1];(t>0||A!==0)&&(u.push(S,O,K),L+=3),(e>0||A!==r-1)&&(u.push(O,Y,K),L+=3)}h.addGroup(g,L,0),g+=L}function T(b){let k=v,L=new xt,U=new D,C=0,A=b===!0?t:e,S=b===!0?1:-1;for(let Y=1;Y<=s;Y++)f.push(0,_*S,0),d.push(0,S,0),p.push(.5,.5),v++;let O=v;for(let Y=0;Y<=s;Y++){let I=Y/s*c+a,F=Math.cos(I),B=Math.sin(I);U.x=A*B,U.y=_*S,U.z=A*F,f.push(U.x,U.y,U.z),d.push(0,S,0),L.x=F*.5+.5,L.y=B*.5*S+.5,p.push(L.x,L.y),v++}for(let Y=0;Y<s;Y++){let K=k+Y,I=O+Y;b===!0?u.push(I,I+1,K):u.push(I+1,I,K),C+=3}h.addGroup(g,C,b===!0?1:2),g+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},pa=class i extends es{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},rh=class i extends un{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),h(n),u(),this.setAttribute("position",new ye(r,3)),this.setAttribute("normal",new ye(r.slice(),3)),this.setAttribute("uv",new ye(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(E){let T=new D,b=new D,k=new D;for(let L=0;L<e.length;L+=3)p(e[L+0],T),p(e[L+1],b),p(e[L+2],k),c(T,b,k,E)}function c(E,T,b,k){let L=k+1,U=[];for(let C=0;C<=L;C++){U[C]=[];let A=E.clone().lerp(b,C/L),S=T.clone().lerp(b,C/L),O=L-C;for(let Y=0;Y<=O;Y++)Y===0&&C===L?U[C][Y]=A:U[C][Y]=A.clone().lerp(S,Y/O)}for(let C=0;C<L;C++)for(let A=0;A<2*(L-C)-1;A++){let S=Math.floor(A/2);A%2===0?(d(U[C][S+1]),d(U[C+1][S]),d(U[C][S])):(d(U[C][S+1]),d(U[C+1][S+1]),d(U[C+1][S]))}}function h(E){let T=new D;for(let b=0;b<r.length;b+=3)T.x=r[b+0],T.y=r[b+1],T.z=r[b+2],T.normalize().multiplyScalar(E),r[b+0]=T.x,r[b+1]=T.y,r[b+2]=T.z}function u(){let E=new D;for(let T=0;T<r.length;T+=3){E.x=r[T+0],E.y=r[T+1],E.z=r[T+2];let b=_(E)/2/Math.PI+.5,k=g(E)/Math.PI+.5;o.push(b,1-k)}v(),f()}function f(){for(let E=0;E<o.length;E+=6){let T=o[E+0],b=o[E+2],k=o[E+4],L=Math.max(T,b,k),U=Math.min(T,b,k);L>.9&&U<.1&&(T<.2&&(o[E+0]+=1),b<.2&&(o[E+2]+=1),k<.2&&(o[E+4]+=1))}}function d(E){r.push(E.x,E.y,E.z)}function p(E,T){let b=E*3;T.x=t[b+0],T.y=t[b+1],T.z=t[b+2]}function v(){let E=new D,T=new D,b=new D,k=new D,L=new xt,U=new xt,C=new xt;for(let A=0,S=0;A<r.length;A+=9,S+=6){E.set(r[A+0],r[A+1],r[A+2]),T.set(r[A+3],r[A+4],r[A+5]),b.set(r[A+6],r[A+7],r[A+8]),L.set(o[S+0],o[S+1]),U.set(o[S+2],o[S+3]),C.set(o[S+4],o[S+5]),k.copy(E).add(T).add(b).divideScalar(3);let O=_(k);x(L,S+0,E,O),x(U,S+2,T,O),x(C,S+4,b,O)}}function x(E,T,b,k){k<0&&E.x===1&&(o[T]=E.x-1),b.x===0&&b.z===0&&(o[T]=k/2/Math.PI+.5)}function _(E){return Math.atan2(E.z,-E.x)}function g(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var mi=class i extends rh{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var ma=class i extends un{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],h=[],u=[],f=t,d=(e-t)/s,p=new D,v=new xt;for(let x=0;x<=s;x++){for(let _=0;_<=n;_++){let g=r+_/n*o;p.x=f*Math.cos(g),p.y=f*Math.sin(g),c.push(p.x,p.y,p.z),h.push(0,0,1),v.x=(p.x/e+1)/2,v.y=(p.y/e+1)/2,u.push(v.x,v.y)}f+=d}for(let x=0;x<s;x++){let _=x*(n+1);for(let g=0;g<n;g++){let E=g+_,T=E,b=E+n+1,k=E+n+2,L=E+1;a.push(T,b,L),a.push(b,k,L)}}this.setIndex(a),this.setAttribute("position",new ye(c,3)),this.setAttribute("normal",new ye(h,3)),this.setAttribute("uv",new ye(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var xn=class i extends un{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),h=0,u=[],f=new D,d=new D,p=[],v=[],x=[],_=[];for(let g=0;g<=n;g++){let E=[],T=g/n,b=0;g===0&&o===0?b=.5/e:g===n&&c===Math.PI&&(b=-.5/e);for(let k=0;k<=e;k++){let L=k/e;f.x=-t*Math.cos(s+L*r)*Math.sin(o+T*a),f.y=t*Math.cos(o+T*a),f.z=t*Math.sin(s+L*r)*Math.sin(o+T*a),v.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),_.push(L+b,1-T),E.push(h++)}u.push(E)}for(let g=0;g<n;g++)for(let E=0;E<e;E++){let T=u[g][E+1],b=u[g][E],k=u[g+1][E],L=u[g+1][E+1];(g!==0||o>0)&&p.push(T,b,L),(g!==n-1||c<Math.PI)&&p.push(b,k,L)}this.setIndex(p),this.setAttribute("position",new ye(v,3)),this.setAttribute("normal",new ye(x,3)),this.setAttribute("uv",new ye(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var kr=class i extends un{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],h=[],u=new D,f=new D,d=new D;for(let p=0;p<=n;p++)for(let v=0;v<=s;v++){let x=v/s*r,_=p/n*Math.PI*2;f.x=(t+e*Math.cos(_))*Math.cos(x),f.y=(t+e*Math.cos(_))*Math.sin(x),f.z=e*Math.sin(_),a.push(f.x,f.y,f.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),d.subVectors(f,u).normalize(),c.push(d.x,d.y,d.z),h.push(v/s),h.push(p/n)}for(let p=1;p<=n;p++)for(let v=1;v<=s;v++){let x=(s+1)*p+v-1,_=(s+1)*(p-1)+v-1,g=(s+1)*(p-1)+v,E=(s+1)*p+v;o.push(x,_,E),o.push(_,g,E)}this.setIndex(o),this.setAttribute("position",new ye(a,3)),this.setAttribute("normal",new ye(c,3)),this.setAttribute("uv",new ye(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Li=class extends Qi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nf,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Go(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function px(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ks=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},oh=class extends Ks{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ku,endingEnd:ku}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Bu:r=t,a=2*e-n;break;case zu:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Bu:o=t,c=2*n-e;break;case zu:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let h=(n-e)*.5,u=this.valueSize;this._weightPrev=h/(e-a),this._weightNext=h/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,h=c-a,u=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,p=this._weightNext,v=(n-e)/(s-e),x=v*v,_=x*v,g=-d*_+2*d*x-d*v,E=(1+d)*_+(-1.5-2*d)*x+(-.5+d)*v+1,T=(-1-p)*_+(1.5+p)*x+.5*v,b=p*_-p*x;for(let k=0;k!==a;++k)r[k]=g*o[u+k]+E*o[h+k]+T*o[c+k]+b*o[f+k];return r}},ah=class extends Ks{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,h=c-a,u=(n-e)/(s-e),f=1-u;for(let d=0;d!==a;++d)r[d]=o[h+d]*f+o[c+d]*u;return r}},ch=class extends Ks{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Vn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Go(e,this.TimeBufferType),this.values=Go(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Go(t.times,Array),values:Go(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ch(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ah(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new oh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Yo:e=this.InterpolantFactoryMethodDiscrete;break;case Ul:e=this.InterpolantFactoryMethodLinear;break;case _c:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Yo;case this.InterpolantFactoryMethodLinear:return Ul;case this.InterpolantFactoryMethodSmooth:return _c}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&px(s))for(let a=0,c=s.length;a!==c;++a){let h=s[a];if(isNaN(h)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,h),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===_c,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,h=t[a],u=t[a+1];if(h!==u&&(a!==1||h!==t[0]))if(s)c=!0;else{let f=a*n,d=f-n,p=f+n;for(let v=0;v!==n;++v){let x=e[f+v];if(x!==e[d+v]||x!==e[p+v]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let f=a*n,d=o*n;for(let p=0;p!==n;++p)e[d+p]=e[f+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,h=0;h!==n;++h)e[c+h]=e[a+h];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Vn.prototype.TimeBufferType=Float32Array;Vn.prototype.ValueBufferType=Float32Array;Vn.prototype.DefaultInterpolation=Ul;var ns=class extends Vn{constructor(t,e,n){super(t,e,n)}};ns.prototype.ValueTypeName="bool";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=Yo;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var lh=class extends Vn{};lh.prototype.ValueTypeName="color";var hh=class extends Vn{};hh.prototype.ValueTypeName="number";var uh=class extends Ks{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),h=t*a;for(let u=h+a;h!==u;h+=4)Hn.slerpFlat(r,0,o,h-a,o,h,c);return r}},ga=class extends Vn{InterpolantFactoryMethodLinear(t){return new uh(this.times,this.values,this.getValueSize(),t)}};ga.prototype.ValueTypeName="quaternion";ga.prototype.InterpolantFactoryMethodSmooth=void 0;var is=class extends Vn{constructor(t,e,n){super(t,e,n)}};is.prototype.ValueTypeName="string";is.prototype.ValueBufferType=Array;is.prototype.DefaultInterpolation=Yo;is.prototype.InterpolantFactoryMethodLinear=void 0;is.prototype.InterpolantFactoryMethodSmooth=void 0;var dh=class extends Vn{};dh.prototype.ValueTypeName="vector";var fh=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,h=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return h.push(u,f),this},this.removeHandler=function(u){let f=h.indexOf(u);return f!==-1&&h.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=h.length;f<d;f+=2){let p=h[f],v=h[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null}}},mx=new fh,ph=class{constructor(t){this.manager=t!==void 0?t:mx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};ph.DEFAULT_MATERIAL_NAME="__DEFAULT";var Br=class extends on{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new le(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},_a=class extends Br{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(on.DEFAULT_UP),this.updateMatrix(),this.groundColor=new le(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},qc=new Le,Fd=new D,kd=new D,va=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ur,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Fd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Fd),kd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kd),e.updateMatrixWorld(),qc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Bd=new Le,Mr=new D,jc=new D,mh=class extends va{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xt(4,2),this._viewportCount=6,this._viewports=[new Se(2,1,1,1),new Se(0,1,1,1),new Se(3,1,1,1),new Se(1,1,1,1),new Se(3,0,1,1),new Se(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Mr.setFromMatrixPosition(t.matrixWorld),n.position.copy(Mr),jc.copy(n.position),jc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(jc),n.updateMatrixWorld(),s.makeTranslation(-Mr.x,-Mr.y,-Mr.z),Bd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bd)}},ya=class extends Br{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new mh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},gh=class extends va{constructor(){super(new sa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},xa=class extends Br{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(on.DEFAULT_UP),this.updateMatrix(),this.target=new on,this.shadow=new gh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var ba=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=zd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=zd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function zd(){return performance.now()}var Ih="\\[\\]\\.:\\/",gx=new RegExp("["+Ih+"]","g"),Lh="[^"+Ih+"]",_x="[^"+Ih.replace("\\.","")+"]",vx=/((?:WC+[\/:])*)/.source.replace("WC",Lh),yx=/(WCOD+)?/.source.replace("WCOD",_x),xx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lh),bx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lh),Mx=new RegExp("^"+vx+yx+xx+bx+"$"),Sx=["material","materials","bones","map"],_h=class{constructor(t,e,n){let s=n||Ie.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ie=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(gx,"")}static parseTrackName(t){let e=Mx.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Sx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===h){h=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(h!==void 0){if(t[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[h]}}let o=t[s];if(o===void 0){let h=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ie.Composite=_h;Ie.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ie.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ie.prototype.GetterByBindingType=[Ie.prototype._getValue_direct,Ie.prototype._getValue_array,Ie.prototype._getValue_arrayElement,Ie.prototype._getValue_toArray];Ie.prototype.SetterByBindingTypeAndVersioning=[[Ie.prototype._setValue_direct,Ie.prototype._setValue_direct_setNeedsUpdate,Ie.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_array,Ie.prototype._setValue_array_setNeedsUpdate,Ie.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_arrayElement,Ie.prototype._setValue_arrayElement_setNeedsUpdate,Ie.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_fromArray,Ie.prototype._setValue_fromArray_setNeedsUpdate,Ie.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Bb=new Float32Array(1);var Hd=new Le,Ma=class{constructor(t,e,n=0,s=1/0){this.ray=new Zs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Dr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Hd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hd),this}intersectObject(t,e=!0,n=[]){return vh(t,this,n,e),n.sort(Vd),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)vh(t[s],this,n,e);return n.sort(Vd),n}};function Vd(i,t){return i.distance-t.distance}function vh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)vh(r[o],t,e,!0)}}var zr=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ve(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Sa=class extends di{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yh);var ff=i=>{let t;return i?t=i:typeof fetch>"u"?t=(...e)=>Promise.resolve().then(()=>(Di(),as)).then(({default:n})=>n(...e)):t=fetch,(...e)=>t(...e)};var Vr=class extends Error{constructor(t,e="FunctionsError",n){super(t),this.name=e,this.context=n}},Aa=class extends Vr{constructor(t){super("Failed to send a request to the Edge Function","FunctionsFetchError",t)}},Ra=class extends Vr{constructor(t){super("Relay Error invoking the Edge Function","FunctionsRelayError",t)}},Ca=class extends Vr{constructor(t){super("Edge Function returned a non-2xx status code","FunctionsHttpError",t)}},Pa;(function(i){i.Any="any",i.ApNortheast1="ap-northeast-1",i.ApNortheast2="ap-northeast-2",i.ApSouth1="ap-south-1",i.ApSoutheast1="ap-southeast-1",i.ApSoutheast2="ap-southeast-2",i.CaCentral1="ca-central-1",i.EuCentral1="eu-central-1",i.EuWest1="eu-west-1",i.EuWest2="eu-west-2",i.EuWest3="eu-west-3",i.SaEast1="sa-east-1",i.UsEast1="us-east-1",i.UsWest1="us-west-1",i.UsWest2="us-west-2"})(Pa||(Pa={}));var Cx=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(u){try{h(n.next(u))}catch(f){o(f)}}function c(u){try{h(n.throw(u))}catch(f){o(f)}}function h(u){u.done?r(u.value):s(u.value).then(a,c)}h((n=n.apply(i,t||[])).next())})},Gr=class{constructor(t,{headers:e={},customFetch:n,region:s=Pa.Any}={}){this.url=t,this.headers=e,this.region=s,this.fetch=ff(n)}setAuth(t){this.headers.Authorization=`Bearer ${t}`}invoke(t,e={}){var n;return Cx(this,void 0,void 0,function*(){try{let{headers:s,method:r,body:o}=e,a={},{region:c}=e;c||(c=this.region),c&&c!=="any"&&(a["x-region"]=c);let h;o&&(s&&!Object.prototype.hasOwnProperty.call(s,"Content-Type")||!s)&&(typeof Blob<"u"&&o instanceof Blob||o instanceof ArrayBuffer?(a["Content-Type"]="application/octet-stream",h=o):typeof o=="string"?(a["Content-Type"]="text/plain",h=o):typeof FormData<"u"&&o instanceof FormData?h=o:(a["Content-Type"]="application/json",h=JSON.stringify(o)));let u=yield this.fetch(`${this.url}/${t}`,{method:r||"POST",headers:Object.assign(Object.assign(Object.assign({},a),this.headers),s),body:h}).catch(v=>{throw new Aa(v)}),f=u.headers.get("x-relay-error");if(f&&f==="true")throw new Ra(u);if(!u.ok)throw new Ca(u);let d=((n=u.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim(),p;return d==="application/json"?p=yield u.json():d==="application/octet-stream"?p=yield u.blob():d==="text/event-stream"?p=u:d==="multipart/form-data"?p=yield u.formData():p=yield u.text(),{data:p,error:null}}catch(s){return{data:null,error:s}}})}};var Tf=Du(Ef(),1),{PostgrestClient:Af,PostgrestQueryBuilder:nM,PostgrestFilterBuilder:iM,PostgrestTransformBuilder:sM,PostgrestBuilder:rM}=Tf.default;var Rf="2.10.2";var Cf={"X-Client-Info":`realtime-js/${Rf}`},Pf="1.0.0",Na=1e4,If=1e3,cs;(function(i){i[i.connecting=0]="connecting",i[i.open=1]="open",i[i.closing=2]="closing",i[i.closed=3]="closed"})(cs||(cs={}));var dn;(function(i){i.closed="closed",i.errored="errored",i.joined="joined",i.joining="joining",i.leaving="leaving"})(dn||(dn={}));var bn;(function(i){i.close="phx_close",i.error="phx_error",i.join="phx_join",i.reply="phx_reply",i.leave="phx_leave",i.access_token="access_token"})(bn||(bn={}));var Ua;(function(i){i.websocket="websocket"})(Ua||(Ua={}));var Ui;(function(i){i.Connecting="connecting",i.Open="open",i.Closing="closing",i.Closed="closed"})(Ui||(Ui={}));var Jr=class{constructor(){this.HEADER_LENGTH=1}decode(t,e){return t.constructor===ArrayBuffer?e(this._binaryDecode(t)):e(typeof t=="string"?JSON.parse(t):{})}_binaryDecode(t){let e=new DataView(t),n=new TextDecoder;return this._decodeBroadcast(t,e,n)}_decodeBroadcast(t,e,n){let s=e.getUint8(1),r=e.getUint8(2),o=this.HEADER_LENGTH+2,a=n.decode(t.slice(o,o+s));o=o+s;let c=n.decode(t.slice(o,o+r));o=o+r;let h=JSON.parse(n.decode(t.slice(o,t.byteLength)));return{ref:null,topic:a,event:c,payload:h}}};var ls=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0,this.callback=t,this.timerCalc=e}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}};var Re;(function(i){i.abstime="abstime",i.bool="bool",i.date="date",i.daterange="daterange",i.float4="float4",i.float8="float8",i.int2="int2",i.int4="int4",i.int4range="int4range",i.int8="int8",i.int8range="int8range",i.json="json",i.jsonb="jsonb",i.money="money",i.numeric="numeric",i.oid="oid",i.reltime="reltime",i.text="text",i.time="time",i.timestamp="timestamp",i.timestamptz="timestamptz",i.timetz="timetz",i.tsrange="tsrange",i.tstzrange="tstzrange"})(Re||(Re={}));var Xh=(i,t,e={})=>{var n;let s=(n=e.skipTypes)!==null&&n!==void 0?n:[];return Object.keys(t).reduce((r,o)=>(r[o]=Hx(o,i,t,s),r),{})},Hx=(i,t,e,n)=>{let s=t.find(a=>a.name===i),r=s?.type,o=e[i];return r&&!n.includes(r)?Lf(r,o):$h(o)},Lf=(i,t)=>{if(i.charAt(0)==="_"){let e=i.slice(1,i.length);return $x(t,e)}switch(i){case Re.bool:return Vx(t);case Re.float4:case Re.float8:case Re.int2:case Re.int4:case Re.int8:case Re.numeric:case Re.oid:return Gx(t);case Re.json:case Re.jsonb:return Wx(t);case Re.timestamp:return Xx(t);case Re.abstime:case Re.date:case Re.daterange:case Re.int4range:case Re.int8range:case Re.money:case Re.reltime:case Re.text:case Re.time:case Re.timestamptz:case Re.timetz:case Re.tsrange:case Re.tstzrange:return $h(t);default:return $h(t)}},$h=i=>i,Vx=i=>{switch(i){case"t":return!0;case"f":return!1;default:return i}},Gx=i=>{if(typeof i=="string"){let t=parseFloat(i);if(!Number.isNaN(t))return t}return i},Wx=i=>{if(typeof i=="string")try{return JSON.parse(i)}catch(t){return console.log(`JSON parse error: ${t}`),i}return i},$x=(i,t)=>{if(typeof i!="string")return i;let e=i.length-1,n=i[e];if(i[0]==="{"&&n==="}"){let r,o=i.slice(1,e);try{r=JSON.parse("["+o+"]")}catch{r=o?o.split(","):[]}return r.map(a=>Lf(t,a))}return i},Xx=i=>typeof i=="string"?i.replace(" ","T"):i,Oa=i=>{let t=i;return t=t.replace(/^ws/i,"http"),t=t.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),t.replace(/\/+$/,"")};var hs=class{constructor(t,e,n={},s=Na){this.channel=t,this.event=e,this.payload=n,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(t){this.timeout=t,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(t){this.payload=Object.assign(Object.assign({},this.payload),t)}receive(t,e){var n;return this._hasReceived(t)&&e((n=this.receivedResp)===null||n===void 0?void 0:n.response),this.recHooks.push({status:t,callback:e}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);let t=e=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=e,this._matchReceive(e)};this.channel._on(this.refEvent,{},t),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(t,e){this.refEvent&&this.channel._trigger(this.refEvent,{status:t,response:e})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:t,response:e}){this.recHooks.filter(n=>n.status===t).forEach(n=>n.callback(e))}_hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}};var qh;(function(i){i.SYNC="sync",i.JOIN="join",i.LEAVE="leave"})(qh||(qh={}));var ir=class i{constructor(t,e){this.channel=t,this.state={},this.pendingDiffs=[],this.joinRef=null,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};let n=e?.events||{state:"presence_state",diff:"presence_diff"};this.channel._on(n.state,{},s=>{let{onJoin:r,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=i.syncState(this.state,s,r,o),this.pendingDiffs.forEach(c=>{this.state=i.syncDiff(this.state,c,r,o)}),this.pendingDiffs=[],a()}),this.channel._on(n.diff,{},s=>{let{onJoin:r,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=i.syncDiff(this.state,s,r,o),a())}),this.onJoin((s,r,o)=>{this.channel._trigger("presence",{event:"join",key:s,currentPresences:r,newPresences:o})}),this.onLeave((s,r,o)=>{this.channel._trigger("presence",{event:"leave",key:s,currentPresences:r,leftPresences:o})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(t,e,n,s){let r=this.cloneDeep(t),o=this.transformState(e),a={},c={};return this.map(r,(h,u)=>{o[h]||(c[h]=u)}),this.map(o,(h,u)=>{let f=r[h];if(f){let d=u.map(_=>_.presence_ref),p=f.map(_=>_.presence_ref),v=u.filter(_=>p.indexOf(_.presence_ref)<0),x=f.filter(_=>d.indexOf(_.presence_ref)<0);v.length>0&&(a[h]=v),x.length>0&&(c[h]=x)}else a[h]=u}),this.syncDiff(r,{joins:a,leaves:c},n,s)}static syncDiff(t,e,n,s){let{joins:r,leaves:o}={joins:this.transformState(e.joins),leaves:this.transformState(e.leaves)};return n||(n=()=>{}),s||(s=()=>{}),this.map(r,(a,c)=>{var h;let u=(h=t[a])!==null&&h!==void 0?h:[];if(t[a]=this.cloneDeep(c),u.length>0){let f=t[a].map(p=>p.presence_ref),d=u.filter(p=>f.indexOf(p.presence_ref)<0);t[a].unshift(...d)}n(a,u,c)}),this.map(o,(a,c)=>{let h=t[a];if(!h)return;let u=c.map(f=>f.presence_ref);h=h.filter(f=>u.indexOf(f.presence_ref)<0),t[a]=h,s(a,h,c),h.length===0&&delete t[a]}),t}static map(t,e){return Object.getOwnPropertyNames(t).map(n=>e(n,t[n]))}static transformState(t){return t=this.cloneDeep(t),Object.getOwnPropertyNames(t).reduce((e,n)=>{let s=t[n];return"metas"in s?e[n]=s.metas.map(r=>(r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r)):e[n]=s,e},{})}static cloneDeep(t){return JSON.parse(JSON.stringify(t))}onJoin(t){this.caller.onJoin=t}onLeave(t){this.caller.onLeave=t}onSync(t){this.caller.onSync=t}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}};var jh;(function(i){i.ALL="*",i.INSERT="INSERT",i.UPDATE="UPDATE",i.DELETE="DELETE"})(jh||(jh={}));var Yh;(function(i){i.BROADCAST="broadcast",i.PRESENCE="presence",i.POSTGRES_CHANGES="postgres_changes"})(Yh||(Yh={}));var Zh;(function(i){i.SUBSCRIBED="SUBSCRIBED",i.TIMED_OUT="TIMED_OUT",i.CLOSED="CLOSED",i.CHANNEL_ERROR="CHANNEL_ERROR"})(Zh||(Zh={}));var sr=class i{constructor(t,e={config:{}},n){this.topic=t,this.params=e,this.socket=n,this.bindings={},this.state=dn.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=t.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:""},private:!1},e.config),this.timeout=this.socket.timeout,this.joinPush=new hs(this,bn.join,this.params,this.timeout),this.rejoinTimer=new ls(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=dn.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(s=>s.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=dn.closed,this.socket._remove(this)}),this._onError(s=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,s),this.state=dn.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=dn.errored,this.rejoinTimer.scheduleTimeout())}),this._on(bn.reply,{},(s,r)=>{this._trigger(this._replyEventName(r),s)}),this.presence=new ir(this),this.broadcastEndpointURL=Oa(this.socket.endPoint)+"/api/broadcast"}subscribe(t,e=this.timeout){var n,s;if(this.socket.isConnected()||this.socket.connect(),this.joinedOnce)throw"tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";{let{config:{broadcast:r,presence:o,private:a}}=this.params;this._onError(u=>t&&t("CHANNEL_ERROR",u)),this._onClose(()=>t&&t("CLOSED"));let c={},h={broadcast:r,presence:o,postgres_changes:(s=(n=this.bindings.postgres_changes)===null||n===void 0?void 0:n.map(u=>u.filter))!==null&&s!==void 0?s:[],private:a};this.socket.accessToken&&(c.access_token=this.socket.accessToken),this.updateJoinPayload(Object.assign({config:h},c)),this.joinedOnce=!0,this._rejoin(e),this.joinPush.receive("ok",({postgres_changes:u})=>{var f;if(this.socket.accessToken&&this.socket.setAuth(this.socket.accessToken),u===void 0){t&&t("SUBSCRIBED");return}else{let d=this.bindings.postgres_changes,p=(f=d?.length)!==null&&f!==void 0?f:0,v=[];for(let x=0;x<p;x++){let _=d[x],{filter:{event:g,schema:E,table:T,filter:b}}=_,k=u&&u[x];if(k&&k.event===g&&k.schema===E&&k.table===T&&k.filter===b)v.push(Object.assign(Object.assign({},_),{id:k.id}));else{this.unsubscribe(),t&&t("CHANNEL_ERROR",new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=v,t&&t("SUBSCRIBED");return}}).receive("error",u=>{t&&t("CHANNEL_ERROR",new Error(JSON.stringify(Object.values(u).join(", ")||"error")))}).receive("timeout",()=>{t&&t("TIMED_OUT")})}return this}presenceState(){return this.presence.state}async track(t,e={}){return await this.send({type:"presence",event:"track",payload:t},e.timeout||this.timeout)}async untrack(t={}){return await this.send({type:"presence",event:"untrack"},t)}on(t,e,n){return this._on(t,e,n)}async send(t,e={}){var n,s;if(!this._canPush()&&t.type==="broadcast"){let{event:r,payload:o}=t,a={method:"POST",headers:{Authorization:this.socket.accessToken?`Bearer ${this.socket.accessToken}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:o}]})};try{let c=await this._fetchWithTimeout(this.broadcastEndpointURL,a,(n=e.timeout)!==null&&n!==void 0?n:this.timeout);return await((s=c.body)===null||s===void 0?void 0:s.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(r=>{var o,a,c;let h=this._push(t.type,t,e.timeout||this.timeout);t.type==="broadcast"&&!(!((c=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||c===void 0)&&c.ack)&&r("ok"),h.receive("ok",()=>r("ok")),h.receive("error",()=>r("error")),h.receive("timeout",()=>r("timed out"))})}updateJoinPayload(t){this.joinPush.updatePayload(t)}unsubscribe(t=this.timeout){this.state=dn.leaving;let e=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(bn.close,"leave",this._joinRef())};return this.rejoinTimer.reset(),this.joinPush.destroy(),new Promise(n=>{let s=new hs(this,bn.leave,{},t);s.receive("ok",()=>{e(),n("ok")}).receive("timeout",()=>{e(),n("timed out")}).receive("error",()=>{n("error")}),s.send(),this._canPush()||s.trigger("ok",{})})}async _fetchWithTimeout(t,e,n){let s=new AbortController,r=setTimeout(()=>s.abort(),n),o=await this.socket.fetch(t,Object.assign(Object.assign({},e),{signal:s.signal}));return clearTimeout(r),o}_push(t,e,n=this.timeout){if(!this.joinedOnce)throw`tried to push '${t}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new hs(this,t,e,n);return this._canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}_onMessage(t,e,n){return e}_isMember(t){return this.topic===t}_joinRef(){return this.joinPush.ref}_trigger(t,e,n){var s,r;let o=t.toLocaleLowerCase(),{close:a,error:c,leave:h,join:u}=bn;if(n&&[a,c,h,u].indexOf(o)>=0&&n!==this._joinRef())return;let d=this._onMessage(o,e,n);if(e&&!d)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(o)?(s=this.bindings.postgres_changes)===null||s===void 0||s.filter(p=>{var v,x,_;return((v=p.filter)===null||v===void 0?void 0:v.event)==="*"||((_=(x=p.filter)===null||x===void 0?void 0:x.event)===null||_===void 0?void 0:_.toLocaleLowerCase())===o}).map(p=>p.callback(d,n)):(r=this.bindings[o])===null||r===void 0||r.filter(p=>{var v,x,_,g,E,T;if(["broadcast","presence","postgres_changes"].includes(o))if("id"in p){let b=p.id,k=(v=p.filter)===null||v===void 0?void 0:v.event;return b&&((x=e.ids)===null||x===void 0?void 0:x.includes(b))&&(k==="*"||k?.toLocaleLowerCase()===((_=e.data)===null||_===void 0?void 0:_.type.toLocaleLowerCase()))}else{let b=(E=(g=p?.filter)===null||g===void 0?void 0:g.event)===null||E===void 0?void 0:E.toLocaleLowerCase();return b==="*"||b===((T=e?.event)===null||T===void 0?void 0:T.toLocaleLowerCase())}else return p.type.toLocaleLowerCase()===o}).map(p=>{if(typeof d=="object"&&"ids"in d){let v=d.data,{schema:x,table:_,commit_timestamp:g,type:E,errors:T}=v;d=Object.assign(Object.assign({},{schema:x,table:_,commit_timestamp:g,eventType:E,new:{},old:{},errors:T}),this._getPayloadRecords(v))}p.callback(d,n)})}_isClosed(){return this.state===dn.closed}_isJoined(){return this.state===dn.joined}_isJoining(){return this.state===dn.joining}_isLeaving(){return this.state===dn.leaving}_replyEventName(t){return`chan_reply_${t}`}_on(t,e,n){let s=t.toLocaleLowerCase(),r={type:s,filter:e,callback:n};return this.bindings[s]?this.bindings[s].push(r):this.bindings[s]=[r],this}_off(t,e){let n=t.toLocaleLowerCase();return this.bindings[n]=this.bindings[n].filter(s=>{var r;return!(((r=s.type)===null||r===void 0?void 0:r.toLocaleLowerCase())===n&&i.isEqual(s.filter,e))}),this}static isEqual(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(let n in t)if(t[n]!==e[n])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(t){this._on(bn.close,{},t)}_onError(t){this._on(bn.error,{},e=>t(e))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(t=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=dn.joining,this.joinPush.resend(t))}_getPayloadRecords(t){let e={new:{},old:{}};return(t.type==="INSERT"||t.type==="UPDATE")&&(e.new=Xh(t.columns,t.record)),(t.type==="UPDATE"||t.type==="DELETE")&&(e.old=Xh(t.columns,t.old_record)),e}};var jx=()=>{},Yx=typeof WebSocket<"u",rr=class{constructor(t,e){var n;this.accessToken=null,this.apiKey=null,this.channels=[],this.endPoint="",this.httpEndpoint="",this.headers=Cf,this.params={},this.timeout=Na,this.heartbeatIntervalMs=3e4,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.ref=0,this.logger=jx,this.conn=null,this.sendBuffer=[],this.serializer=new Jr,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this._resolveFetch=r=>{let o;return r?o=r:typeof fetch>"u"?o=(...a)=>Promise.resolve().then(()=>(Di(),as)).then(({default:c})=>c(...a)):o=fetch,(...a)=>o(...a)},this.endPoint=`${t}/${Ua.websocket}`,this.httpEndpoint=Oa(t),e?.transport?this.transport=e.transport:this.transport=null,e?.params&&(this.params=e.params),e?.headers&&(this.headers=Object.assign(Object.assign({},this.headers),e.headers)),e?.timeout&&(this.timeout=e.timeout),e?.logger&&(this.logger=e.logger),e?.heartbeatIntervalMs&&(this.heartbeatIntervalMs=e.heartbeatIntervalMs);let s=(n=e?.params)===null||n===void 0?void 0:n.apikey;s&&(this.accessToken=s,this.apiKey=s),this.reconnectAfterMs=e?.reconnectAfterMs?e.reconnectAfterMs:r=>[1e3,2e3,5e3,1e4][r-1]||1e4,this.encode=e?.encode?e.encode:(r,o)=>o(JSON.stringify(r)),this.decode=e?.decode?e.decode:this.serializer.decode.bind(this.serializer),this.reconnectTimer=new ls(async()=>{this.disconnect(),this.connect()},this.reconnectAfterMs),this.fetch=this._resolveFetch(e?.fetch)}connect(){if(!this.conn){if(this.transport){this.conn=new this.transport(this._endPointURL(),void 0,{headers:this.headers});return}if(Yx){this.conn=new WebSocket(this._endPointURL()),this.setupConnection();return}this.conn=new Jh(this._endPointURL(),void 0,{close:()=>{this.conn=null}}),Promise.resolve().then(()=>Du(Uf())).then(({default:t})=>{this.conn=new t(this._endPointURL(),void 0,{headers:this.headers}),this.setupConnection()})}}disconnect(t,e){this.conn&&(this.conn.onclose=function(){},t?this.conn.close(t,e??""):this.conn.close(),this.conn=null,this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.reset())}getChannels(){return this.channels}async removeChannel(t){let e=await t.unsubscribe();return this.channels.length===0&&this.disconnect(),e}async removeAllChannels(){let t=await Promise.all(this.channels.map(e=>e.unsubscribe()));return this.disconnect(),t}log(t,e,n){this.logger(t,e,n)}connectionState(){switch(this.conn&&this.conn.readyState){case cs.connecting:return Ui.Connecting;case cs.open:return Ui.Open;case cs.closing:return Ui.Closing;default:return Ui.Closed}}isConnected(){return this.connectionState()===Ui.Open}channel(t,e={config:{}}){let n=new sr(`realtime:${t}`,e,this);return this.channels.push(n),n}push(t){let{topic:e,event:n,payload:s,ref:r}=t,o=()=>{this.encode(t,a=>{var c;(c=this.conn)===null||c===void 0||c.send(a)})};this.log("push",`${e} ${n} (${r})`,s),this.isConnected()?o():this.sendBuffer.push(o)}setAuth(t){this.accessToken=t,this.channels.forEach(e=>{t&&e.updateJoinPayload({access_token:t}),e.joinedOnce&&e._isJoined()&&e._push(bn.access_token,{access_token:t})})}_makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}_leaveOpenTopic(t){let e=this.channels.find(n=>n.topic===t&&(n._isJoined()||n._isJoining()));e&&(this.log("transport",`leaving duplicate topic "${t}"`),e.unsubscribe())}_remove(t){this.channels=this.channels.filter(e=>e._joinRef()!==t._joinRef())}setupConnection(){this.conn&&(this.conn.binaryType="arraybuffer",this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=t=>this._onConnError(t),this.conn.onmessage=t=>this._onConnMessage(t),this.conn.onclose=t=>this._onConnClose(t))}_endPointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:Pf}))}_onConnMessage(t){this.decode(t.data,e=>{let{topic:n,event:s,payload:r,ref:o}=e;(o&&o===this.pendingHeartbeatRef||s===r?.type)&&(this.pendingHeartbeatRef=null),this.log("receive",`${r.status||""} ${n} ${s} ${o&&"("+o+")"||""}`,r),this.channels.filter(a=>a._isMember(n)).forEach(a=>a._trigger(s,r,o)),this.stateChangeCallbacks.message.forEach(a=>a(e))})}_onConnOpen(){this.log("transport",`connected to ${this._endPointURL()}`),this._flushSendBuffer(),this.reconnectTimer.reset(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this._sendHeartbeat(),this.heartbeatIntervalMs),this.stateChangeCallbacks.open.forEach(t=>t())}_onConnClose(t){this.log("transport","close",t),this._triggerChanError(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach(e=>e(t))}_onConnError(t){this.log("transport",t.message),this._triggerChanError(),this.stateChangeCallbacks.error.forEach(e=>e(t))}_triggerChanError(){this.channels.forEach(t=>t._trigger(bn.error))}_appendParams(t,e){if(Object.keys(e).length===0)return t;let n=t.match(/\?/)?"&":"?",s=new URLSearchParams(e);return`${t}${n}${s}`}_flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}_sendHeartbeat(){var t;if(this.isConnected()){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),(t=this.conn)===null||t===void 0||t.close(If,"hearbeat timeout");return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.setAuth(this.accessToken)}}},Jh=class{constructor(t,e,n){this.binaryType="arraybuffer",this.onclose=()=>{},this.onerror=()=>{},this.onmessage=()=>{},this.onopen=()=>{},this.readyState=cs.connecting,this.send=()=>{},this.url=null,this.url=t,this.close=n.close}};var or=class extends Error{constructor(t){super(t),this.__isStorageError=!0,this.name="StorageError"}};function Be(i){return typeof i=="object"&&i!==null&&"__isStorageError"in i}var Fa=class extends or{constructor(t,e){super(t),this.name="StorageApiError",this.status=e}toJSON(){return{name:this.name,message:this.message,status:this.status}}},us=class extends or{constructor(t,e){super(t),this.name="StorageUnknownError",this.originalError=e}};var Zx=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(u){try{h(n.next(u))}catch(f){o(f)}}function c(u){try{h(n.throw(u))}catch(f){o(f)}}function h(u){u.done?r(u.value):s(u.value).then(a,c)}h((n=n.apply(i,t||[])).next())})},Ba=i=>{let t;return i?t=i:typeof fetch>"u"?t=(...e)=>Promise.resolve().then(()=>(Di(),as)).then(({default:n})=>n(...e)):t=fetch,(...e)=>t(...e)},Nf=()=>Zx(void 0,void 0,void 0,function*(){return typeof Response>"u"?(yield Promise.resolve().then(()=>(Di(),as))).Response:Response}),ka=i=>{if(Array.isArray(i))return i.map(e=>ka(e));if(typeof i=="function"||i!==Object(i))return i;let t={};return Object.entries(i).forEach(([e,n])=>{let s=e.replace(/([-_][a-z])/gi,r=>r.toUpperCase().replace(/[-_]/g,""));t[s]=ka(n)}),t};var ds=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(u){try{h(n.next(u))}catch(f){o(f)}}function c(u){try{h(n.throw(u))}catch(f){o(f)}}function h(u){u.done?r(u.value):s(u.value).then(a,c)}h((n=n.apply(i,t||[])).next())})},Kh=i=>i.msg||i.message||i.error_description||i.error||JSON.stringify(i),Jx=(i,t,e)=>ds(void 0,void 0,void 0,function*(){let n=yield Nf();i instanceof n&&!e?.noResolveJson?i.json().then(s=>{t(new Fa(Kh(s),i.status||500))}).catch(s=>{t(new us(Kh(s),s))}):t(new us(Kh(i),i))}),Kx=(i,t,e,n)=>{let s={method:i,headers:t?.headers||{}};return i==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json"},t?.headers),n&&(s.body=JSON.stringify(n)),Object.assign(Object.assign({},s),e))};function Kr(i,t,e,n,s,r){return ds(this,void 0,void 0,function*(){return new Promise((o,a)=>{i(e,Kx(t,n,s,r)).then(c=>{if(!c.ok)throw c;return n?.noResolveJson?c:c.json()}).then(c=>o(c)).catch(c=>Jx(c,a,n))})})}function ar(i,t,e,n){return ds(this,void 0,void 0,function*(){return Kr(i,"GET",t,e,n)})}function Jn(i,t,e,n,s){return ds(this,void 0,void 0,function*(){return Kr(i,"POST",t,n,s,e)})}function Of(i,t,e,n,s){return ds(this,void 0,void 0,function*(){return Kr(i,"PUT",t,n,s,e)})}function Ff(i,t,e,n){return ds(this,void 0,void 0,function*(){return Kr(i,"HEAD",t,Object.assign(Object.assign({},e),{noResolveJson:!0}),n)})}function za(i,t,e,n,s){return ds(this,void 0,void 0,function*(){return Kr(i,"DELETE",t,n,s,e)})}var fn=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(u){try{h(n.next(u))}catch(f){o(f)}}function c(u){try{h(n.throw(u))}catch(f){o(f)}}function h(u){u.done?r(u.value):s(u.value).then(a,c)}h((n=n.apply(i,t||[])).next())})},Qx={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},kf={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1},Qr=class{constructor(t,e={},n,s){this.url=t,this.headers=e,this.bucketId=n,this.fetch=Ba(s)}uploadOrUpdate(t,e,n,s){return fn(this,void 0,void 0,function*(){try{let r,o=Object.assign(Object.assign({},kf),s),a=Object.assign(Object.assign({},this.headers),t==="POST"&&{"x-upsert":String(o.upsert)}),c=o.metadata;typeof Blob<"u"&&n instanceof Blob?(r=new FormData,r.append("cacheControl",o.cacheControl),r.append("",n),c&&r.append("metadata",this.encodeMetadata(c))):typeof FormData<"u"&&n instanceof FormData?(r=n,r.append("cacheControl",o.cacheControl),c&&r.append("metadata",this.encodeMetadata(c))):(r=n,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,c&&(a["x-metadata"]=this.toBase64(this.encodeMetadata(c)))),s?.headers&&(a=Object.assign(Object.assign({},a),s.headers));let h=this._removeEmptyFolders(e),u=this._getFinalPath(h),f=yield this.fetch(`${this.url}/object/${u}`,Object.assign({method:t,body:r,headers:a},o?.duplex?{duplex:o.duplex}:{})),d=yield f.json();return f.ok?{data:{path:h,id:d.Id,fullPath:d.Key},error:null}:{data:null,error:d}}catch(r){if(Be(r))return{data:null,error:r};throw r}})}upload(t,e,n){return fn(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",t,e,n)})}uploadToSignedUrl(t,e,n,s){return fn(this,void 0,void 0,function*(){let r=this._removeEmptyFolders(t),o=this._getFinalPath(r),a=new URL(this.url+`/object/upload/sign/${o}`);a.searchParams.set("token",e);try{let c,h=Object.assign({upsert:kf.upsert},s),u=Object.assign(Object.assign({},this.headers),{"x-upsert":String(h.upsert)});typeof Blob<"u"&&n instanceof Blob?(c=new FormData,c.append("cacheControl",h.cacheControl),c.append("",n)):typeof FormData<"u"&&n instanceof FormData?(c=n,c.append("cacheControl",h.cacheControl)):(c=n,u["cache-control"]=`max-age=${h.cacheControl}`,u["content-type"]=h.contentType);let f=yield this.fetch(a.toString(),{method:"PUT",body:c,headers:u}),d=yield f.json();return f.ok?{data:{path:r,fullPath:d.Key},error:null}:{data:null,error:d}}catch(c){if(Be(c))return{data:null,error:c};throw c}})}createSignedUploadUrl(t,e){return fn(this,void 0,void 0,function*(){try{let n=this._getFinalPath(t),s=Object.assign({},this.headers);e?.upsert&&(s["x-upsert"]="true");let r=yield Jn(this.fetch,`${this.url}/object/upload/sign/${n}`,{},{headers:s}),o=new URL(this.url+r.url),a=o.searchParams.get("token");if(!a)throw new or("No token returned by API");return{data:{signedUrl:o.toString(),path:t,token:a},error:null}}catch(n){if(Be(n))return{data:null,error:n};throw n}})}update(t,e,n){return fn(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",t,e,n)})}move(t,e,n){return fn(this,void 0,void 0,function*(){try{return{data:yield Jn(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:t,destinationKey:e,destinationBucket:n?.destinationBucket},{headers:this.headers}),error:null}}catch(s){if(Be(s))return{data:null,error:s};throw s}})}copy(t,e,n){return fn(this,void 0,void 0,function*(){try{return{data:{path:(yield Jn(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:t,destinationKey:e,destinationBucket:n?.destinationBucket},{headers:this.headers})).Key},error:null}}catch(s){if(Be(s))return{data:null,error:s};throw s}})}createSignedUrl(t,e,n){return fn(this,void 0,void 0,function*(){try{let s=this._getFinalPath(t),r=yield Jn(this.fetch,`${this.url}/object/sign/${s}`,Object.assign({expiresIn:e},n?.transform?{transform:n.transform}:{}),{headers:this.headers}),o=n?.download?`&download=${n.download===!0?"":n.download}`:"";return r={signedUrl:encodeURI(`${this.url}${r.signedURL}${o}`)},{data:r,error:null}}catch(s){if(Be(s))return{data:null,error:s};throw s}})}createSignedUrls(t,e,n){return fn(this,void 0,void 0,function*(){try{let s=yield Jn(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:e,paths:t},{headers:this.headers}),r=n?.download?`&download=${n.download===!0?"":n.download}`:"";return{data:s.map(o=>Object.assign(Object.assign({},o),{signedUrl:o.signedURL?encodeURI(`${this.url}${o.signedURL}${r}`):null})),error:null}}catch(s){if(Be(s))return{data:null,error:s};throw s}})}download(t,e){return fn(this,void 0,void 0,function*(){let s=typeof e?.transform<"u"?"render/image/authenticated":"object",r=this.transformOptsToQueryString(e?.transform||{}),o=r?`?${r}`:"";try{let a=this._getFinalPath(t);return{data:yield(yield ar(this.fetch,`${this.url}/${s}/${a}${o}`,{headers:this.headers,noResolveJson:!0})).blob(),error:null}}catch(a){if(Be(a))return{data:null,error:a};throw a}})}info(t){return fn(this,void 0,void 0,function*(){let e=this._getFinalPath(t);try{let n=yield ar(this.fetch,`${this.url}/object/info/${e}`,{headers:this.headers});return{data:ka(n),error:null}}catch(n){if(Be(n))return{data:null,error:n};throw n}})}exists(t){return fn(this,void 0,void 0,function*(){let e=this._getFinalPath(t);try{return yield Ff(this.fetch,`${this.url}/object/${e}`,{headers:this.headers}),{data:!0,error:null}}catch(n){if(Be(n)&&n instanceof us){let s=n.originalError;if([400,404].includes(s?.status))return{data:!1,error:n}}throw n}})}getPublicUrl(t,e){let n=this._getFinalPath(t),s=[],r=e?.download?`download=${e.download===!0?"":e.download}`:"";r!==""&&s.push(r);let a=typeof e?.transform<"u"?"render/image":"object",c=this.transformOptsToQueryString(e?.transform||{});c!==""&&s.push(c);let h=s.join("&");return h!==""&&(h=`?${h}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}${h}`)}}}remove(t){return fn(this,void 0,void 0,function*(){try{return{data:yield za(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:t},{headers:this.headers}),error:null}}catch(e){if(Be(e))return{data:null,error:e};throw e}})}list(t,e,n){return fn(this,void 0,void 0,function*(){try{let s=Object.assign(Object.assign(Object.assign({},Qx),e),{prefix:t||""});return{data:yield Jn(this.fetch,`${this.url}/object/list/${this.bucketId}`,s,{headers:this.headers},n),error:null}}catch(s){if(Be(s))return{data:null,error:s};throw s}})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(t){let e=[];return t.width&&e.push(`width=${t.width}`),t.height&&e.push(`height=${t.height}`),t.resize&&e.push(`resize=${t.resize}`),t.format&&e.push(`format=${t.format}`),t.quality&&e.push(`quality=${t.quality}`),e.join("&")}};var Bf="2.7.0";var zf={"X-Client-Info":`storage-js/${Bf}`};var cr=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(u){try{h(n.next(u))}catch(f){o(f)}}function c(u){try{h(n.throw(u))}catch(f){o(f)}}function h(u){u.done?r(u.value):s(u.value).then(a,c)}h((n=n.apply(i,t||[])).next())})},to=class{constructor(t,e={},n){this.url=t,this.headers=Object.assign(Object.assign({},zf),e),this.fetch=Ba(n)}listBuckets(){return cr(this,void 0,void 0,function*(){try{return{data:yield ar(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(t){if(Be(t))return{data:null,error:t};throw t}})}getBucket(t){return cr(this,void 0,void 0,function*(){try{return{data:yield ar(this.fetch,`${this.url}/bucket/${t}`,{headers:this.headers}),error:null}}catch(e){if(Be(e))return{data:null,error:e};throw e}})}createBucket(t,e={public:!1}){return cr(this,void 0,void 0,function*(){try{return{data:yield Jn(this.fetch,`${this.url}/bucket`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(Be(n))return{data:null,error:n};throw n}})}updateBucket(t,e){return cr(this,void 0,void 0,function*(){try{return{data:yield Of(this.fetch,`${this.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(Be(n))return{data:null,error:n};throw n}})}emptyBucket(t){return cr(this,void 0,void 0,function*(){try{return{data:yield Jn(this.fetch,`${this.url}/bucket/${t}/empty`,{},{headers:this.headers}),error:null}}catch(e){if(Be(e))return{data:null,error:e};throw e}})}deleteBucket(t){return cr(this,void 0,void 0,function*(){try{return{data:yield za(this.fetch,`${this.url}/bucket/${t}`,{},{headers:this.headers}),error:null}}catch(e){if(Be(e))return{data:null,error:e};throw e}})}};var eo=class extends to{constructor(t,e={},n){super(t,e,n)}from(t){return new Qr(this.url,this.headers,t,this.fetch)}};var Hf="2.45.4";var no="";typeof Deno<"u"?no="deno":typeof document<"u"?no="web":typeof navigator<"u"&&navigator.product==="ReactNative"?no="react-native":no="node";var tb={"X-Client-Info":`supabase-js-${no}/${Hf}`},Vf={headers:tb},Gf={schema:"public"},Wf={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},$f={};Di();var eb=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(u){try{h(n.next(u))}catch(f){o(f)}}function c(u){try{h(n.throw(u))}catch(f){o(f)}}function h(u){u.done?r(u.value):s(u.value).then(a,c)}h((n=n.apply(i,t||[])).next())})},nb=i=>{let t;return i?t=i:typeof fetch>"u"?t=Dh:t=fetch,(...e)=>t(...e)},ib=()=>typeof Headers>"u"?Uh:Headers,Xf=(i,t,e)=>{let n=nb(e),s=ib();return(r,o)=>eb(void 0,void 0,void 0,function*(){var a;let c=(a=yield t())!==null&&a!==void 0?a:i,h=new s(o?.headers);return h.has("apikey")||h.set("apikey",i),h.has("Authorization")||h.set("Authorization",`Bearer ${c}`),n(r,Object.assign(Object.assign({},o),{headers:h}))})};var sb=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(u){try{h(n.next(u))}catch(f){o(f)}}function c(u){try{h(n.throw(u))}catch(f){o(f)}}function h(u){u.done?r(u.value):s(u.value).then(a,c)}h((n=n.apply(i,t||[])).next())})};function qf(i){return i.replace(/\/$/,"")}function jf(i,t){let{db:e,auth:n,realtime:s,global:r}=i,{db:o,auth:a,realtime:c,global:h}=t,u={db:Object.assign(Object.assign({},o),e),auth:Object.assign(Object.assign({},a),n),realtime:Object.assign(Object.assign({},c),s),global:Object.assign(Object.assign({},h),r),accessToken:()=>sb(this,void 0,void 0,function*(){return""})};return i.accessToken?u.accessToken=i.accessToken:delete u.accessToken,u}var Ha="2.65.0";var Yf="http://localhost:9999",Zf="supabase.auth.token";var Jf={"X-Client-Info":`gotrue-js/${Ha}`},Qh=10;var io="X-Supabase-Api-Version",tu={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}};function Kf(i){return Math.round(Date.now()/1e3)+i}function Qf(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(i){let t=Math.random()*16|0;return(i=="x"?t:t&3|8).toString(16)})}var In=()=>typeof document<"u",fs={tested:!1,writable:!1},Ni=()=>{if(!In())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(fs.tested)return fs.writable;let i=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(i,i),globalThis.localStorage.removeItem(i),fs.tested=!0,fs.writable=!0}catch{fs.tested=!0,fs.writable=!1}return fs.writable};function Va(i){let t={},e=new URL(i);if(e.hash&&e.hash[0]==="#")try{new URLSearchParams(e.hash.substring(1)).forEach((s,r)=>{t[r]=s})}catch{}return e.searchParams.forEach((n,s)=>{t[s]=n}),t}var Ga=i=>{let t;return i?t=i:typeof fetch>"u"?t=(...e)=>Promise.resolve().then(()=>(Di(),as)).then(({default:n})=>n(...e)):t=fetch,(...e)=>t(...e)},tp=i=>typeof i=="object"&&i!==null&&"status"in i&&"ok"in i&&"json"in i&&typeof i.json=="function",eu=async(i,t,e)=>{await i.setItem(t,JSON.stringify(e))},ro=async(i,t)=>{let e=await i.getItem(t);if(!e)return null;try{return JSON.parse(e)}catch{return e}},oo=async(i,t)=>{await i.removeItem(t)};function rb(i){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="",n,s,r,o,a,c,h,u=0;for(i=i.replace("-","+").replace("_","/");u<i.length;)o=t.indexOf(i.charAt(u++)),a=t.indexOf(i.charAt(u++)),c=t.indexOf(i.charAt(u++)),h=t.indexOf(i.charAt(u++)),n=o<<2|a>>4,s=(a&15)<<4|c>>2,r=(c&3)<<6|h,e=e+String.fromCharCode(n),c!=64&&s!=0&&(e=e+String.fromCharCode(s)),h!=64&&r!=0&&(e=e+String.fromCharCode(r));return e}var so=class i{constructor(){this.promise=new i.promiseConstructor((t,e)=>{this.resolve=t,this.reject=e})}};so.promiseConstructor=Promise;function nu(i){let t=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i,e=i.split(".");if(e.length!==3)throw new Error("JWT is not valid: not a JWT structure");if(!t.test(e[1]))throw new Error("JWT is not valid: payload is not in base64url format");let n=e[1];return JSON.parse(rb(n))}async function ep(i){return await new Promise(t=>{setTimeout(()=>t(null),i)})}function np(i,t){return new Promise((n,s)=>{(async()=>{for(let r=0;r<1/0;r++)try{let o=await i(r);if(!t(r,null,o)){n(o);return}}catch(o){if(!t(r,o)){s(o);return}}})()})}function ob(i){return("0"+i.toString(16)).substr(-2)}function ab(){let t=new Uint32Array(56);if(typeof crypto>"u"){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",n=e.length,s="";for(let r=0;r<56;r++)s+=e.charAt(Math.floor(Math.random()*n));return s}return crypto.getRandomValues(t),Array.from(t,ob).join("")}async function cb(i){let e=new TextEncoder().encode(i),n=await crypto.subtle.digest("SHA-256",e),s=new Uint8Array(n);return Array.from(s).map(r=>String.fromCharCode(r)).join("")}function lb(i){return btoa(i).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function hb(i){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),i;let e=await cb(i);return lb(e)}async function ps(i,t,e=!1){let n=ab(),s=n;e&&(s+="/PASSWORD_RECOVERY"),await eu(i,`${t}-code-verifier`,s);let r=await hb(n);return[r,n===r?"plain":"s256"]}var ub=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function ip(i){let t=i.headers.get(io);if(!t||!t.match(ub))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}var ao=class extends Error{constructor(t,e,n){super(t),this.__isAuthError=!0,this.name="AuthError",this.status=e,this.code=n}};function ie(i){return typeof i=="object"&&i!==null&&"__isAuthError"in i}var Wa=class extends ao{constructor(t,e,n){super(t,e,n),this.name="AuthApiError",this.status=e,this.code=n}};function sp(i){return ie(i)&&i.name==="AuthApiError"}var lr=class extends ao{constructor(t,e){super(t),this.name="AuthUnknownError",this.originalError=e}},gi=class extends ao{constructor(t,e,n,s){super(t,n,s),this.name=e,this.status=n}},Ln=class extends gi{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}};function rp(i){return ie(i)&&i.name==="AuthSessionMissingError"}var hr=class extends gi{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}},ms=class extends gi{constructor(t){super(t,"AuthInvalidCredentialsError",400,void 0)}},gs=class extends gi{constructor(t,e=null){super(t,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=e}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},co=class extends gi{constructor(t,e=null){super(t,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=e}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},ur=class extends gi{constructor(t,e){super(t,"AuthRetryableFetchError",e,void 0)}};function $a(i){return ie(i)&&i.name==="AuthRetryableFetchError"}var lo=class extends gi{constructor(t,e,n){super(t,"AuthWeakPasswordError",e,"weak_password"),this.reasons=n}};var db=function(i,t){var e={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&t.indexOf(n)<0&&(e[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(i);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(i,n[s])&&(e[n[s]]=i[n[s]]);return e},_s=i=>i.msg||i.message||i.error_description||i.error||JSON.stringify(i),fb=[502,503,504];async function op(i){var t;if(!tp(i))throw new ur(_s(i),0);if(fb.includes(i.status))throw new ur(_s(i),i.status);let e;try{e=await i.json()}catch(r){throw new lr(_s(r),r)}let n,s=ip(i);if(s&&s.getTime()>=tu["2024-01-01"].timestamp&&typeof e=="object"&&e&&typeof e.code=="string"?n=e.code:typeof e=="object"&&e&&typeof e.error_code=="string"&&(n=e.error_code),n){if(n==="weak_password")throw new lo(_s(e),i.status,((t=e.weak_password)===null||t===void 0?void 0:t.reasons)||[]);if(n==="session_not_found")throw new Ln}else if(typeof e=="object"&&e&&typeof e.weak_password=="object"&&e.weak_password&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.reasons.reduce((r,o)=>r&&typeof o=="string",!0))throw new lo(_s(e),i.status,e.weak_password.reasons);throw new Wa(_s(e),i.status||500,n)}var pb=(i,t,e,n)=>{let s={method:i,headers:t?.headers||{}};return i==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},t?.headers),s.body=JSON.stringify(n),Object.assign(Object.assign({},s),e))};async function ue(i,t,e,n){var s;let r=Object.assign({},n?.headers);r[io]||(r[io]=tu["2024-01-01"].name),n?.jwt&&(r.Authorization=`Bearer ${n.jwt}`);let o=(s=n?.query)!==null&&s!==void 0?s:{};n?.redirectTo&&(o.redirect_to=n.redirectTo);let a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",c=await mb(i,t,e+a,{headers:r,noResolveJson:n?.noResolveJson},{},n?.body);return n?.xform?n?.xform(c):{data:Object.assign({},c),error:null}}async function mb(i,t,e,n,s,r){let o=pb(t,n,s,r),a;try{a=await i(e,Object.assign({},o))}catch(c){throw console.error(c),new ur(_s(c),0)}if(a.ok||await op(a),n?.noResolveJson)return a;try{return await a.json()}catch(c){await op(c)}}function _i(i){var t;let e=null;gb(i)&&(e=Object.assign({},i),i.expires_at||(e.expires_at=Kf(i.expires_in)));let n=(t=i.user)!==null&&t!==void 0?t:i;return{data:{session:e,user:n},error:null}}function iu(i){let t=_i(i);return!t.error&&i.weak_password&&typeof i.weak_password=="object"&&Array.isArray(i.weak_password.reasons)&&i.weak_password.reasons.length&&i.weak_password.message&&typeof i.weak_password.message=="string"&&i.weak_password.reasons.reduce((e,n)=>e&&typeof n=="string",!0)&&(t.data.weak_password=i.weak_password),t}function Kn(i){var t;return{data:{user:(t=i.user)!==null&&t!==void 0?t:i},error:null}}function ap(i){return{data:i,error:null}}function cp(i){let{action_link:t,email_otp:e,hashed_token:n,redirect_to:s,verification_type:r}=i,o=db(i,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:t,email_otp:e,hashed_token:n,redirect_to:s,verification_type:r},c=Object.assign({},o);return{data:{properties:a,user:c},error:null}}function lp(i){return i}function gb(i){return i.access_token&&i.refresh_token&&i.expires_in}var _b=function(i,t){var e={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&t.indexOf(n)<0&&(e[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(i);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(i,n[s])&&(e[n[s]]=i[n[s]]);return e},vs=class{constructor({url:t="",headers:e={},fetch:n}){this.url=t,this.headers=e,this.fetch=Ga(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(t,e="global"){try{return await ue(this.fetch,"POST",`${this.url}/logout?scope=${e}`,{headers:this.headers,jwt:t,noResolveJson:!0}),{data:null,error:null}}catch(n){if(ie(n))return{data:null,error:n};throw n}}async inviteUserByEmail(t,e={}){try{return await ue(this.fetch,"POST",`${this.url}/invite`,{body:{email:t,data:e.data},headers:this.headers,redirectTo:e.redirectTo,xform:Kn})}catch(n){if(ie(n))return{data:{user:null},error:n};throw n}}async generateLink(t){try{let{options:e}=t,n=_b(t,["options"]),s=Object.assign(Object.assign({},n),e);return"newEmail"in n&&(s.new_email=n?.newEmail,delete s.newEmail),await ue(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:cp,redirectTo:e?.redirectTo})}catch(e){if(ie(e))return{data:{properties:null,user:null},error:e};throw e}}async createUser(t){try{return await ue(this.fetch,"POST",`${this.url}/admin/users`,{body:t,headers:this.headers,xform:Kn})}catch(e){if(ie(e))return{data:{user:null},error:e};throw e}}async listUsers(t){var e,n,s,r,o,a,c;try{let h={nextPage:null,lastPage:0,total:0},u=await ue(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(e=t?.page)===null||e===void 0?void 0:e.toString())!==null&&n!==void 0?n:"",per_page:(r=(s=t?.perPage)===null||s===void 0?void 0:s.toString())!==null&&r!==void 0?r:""},xform:lp});if(u.error)throw u.error;let f=await u.json(),d=(o=u.headers.get("x-total-count"))!==null&&o!==void 0?o:0,p=(c=(a=u.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&c!==void 0?c:[];return p.length>0&&(p.forEach(v=>{let x=parseInt(v.split(";")[0].split("=")[1].substring(0,1)),_=JSON.parse(v.split(";")[1].split("=")[1]);h[`${_}Page`]=x}),h.total=parseInt(d)),{data:Object.assign(Object.assign({},f),h),error:null}}catch(h){if(ie(h))return{data:{users:[]},error:h};throw h}}async getUserById(t){try{return await ue(this.fetch,"GET",`${this.url}/admin/users/${t}`,{headers:this.headers,xform:Kn})}catch(e){if(ie(e))return{data:{user:null},error:e};throw e}}async updateUserById(t,e){try{return await ue(this.fetch,"PUT",`${this.url}/admin/users/${t}`,{body:e,headers:this.headers,xform:Kn})}catch(n){if(ie(n))return{data:{user:null},error:n};throw n}}async deleteUser(t,e=!1){try{return await ue(this.fetch,"DELETE",`${this.url}/admin/users/${t}`,{headers:this.headers,body:{should_soft_delete:e},xform:Kn})}catch(n){if(ie(n))return{data:{user:null},error:n};throw n}}async _listFactors(t){try{let{data:e,error:n}=await ue(this.fetch,"GET",`${this.url}/admin/users/${t.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:e,error:n}}catch(e){if(ie(e))return{data:null,error:e};throw e}}async _deleteFactor(t){try{return{data:await ue(this.fetch,"DELETE",`${this.url}/admin/users/${t.userId}/factors/${t.id}`,{headers:this.headers}),error:null}}catch(e){if(ie(e))return{data:null,error:e};throw e}}};var hp={getItem:i=>Ni()?globalThis.localStorage.getItem(i):null,setItem:(i,t)=>{Ni()&&globalThis.localStorage.setItem(i,t)},removeItem:i=>{Ni()&&globalThis.localStorage.removeItem(i)}};function su(i={}){return{getItem:t=>i[t]||null,setItem:(t,e)=>{i[t]=e},removeItem:t=>{delete i[t]}}}function up(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}var ys={debug:!!(globalThis&&Ni()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")},ho=class extends Error{constructor(t){super(t),this.isAcquireTimeout=!0}},Xa=class extends ho{};async function ru(i,t,e){ys.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",i,t);let n=new globalThis.AbortController;return t>0&&setTimeout(()=>{n.abort(),ys.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",i)},t),await globalThis.navigator.locks.request(i,t===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:n.signal},async s=>{if(s){ys.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",i,s.name);try{return await e()}finally{ys.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",i,s.name)}}else{if(t===0)throw ys.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",i),new Xa(`Acquiring an exclusive Navigator LockManager lock "${i}" immediately failed`);if(ys.debug)try{let r=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(r,null,"  "))}catch(r){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",r)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await e()}})}up();var vb={url:Yf,storageKey:Zf,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Jf,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1},uo=30*1e3,dp=3;async function fp(i,t,e){return await e()}var xs=class i{constructor(t){var e,n;this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=i.nextInstanceID,i.nextInstanceID+=1,this.instanceID>0&&In()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");let s=Object.assign(Object.assign({},vb),t);if(this.logDebugMessages=!!s.debug,typeof s.debug=="function"&&(this.logger=s.debug),this.persistSession=s.persistSession,this.storageKey=s.storageKey,this.autoRefreshToken=s.autoRefreshToken,this.admin=new vs({url:s.url,headers:s.headers,fetch:s.fetch}),this.url=s.url,this.headers=s.headers,this.fetch=Ga(s.fetch),this.lock=s.lock||fp,this.detectSessionInUrl=s.detectSessionInUrl,this.flowType=s.flowType,this.hasCustomAuthorizationHeader=s.hasCustomAuthorizationHeader,s.lock?this.lock=s.lock:In()&&(!((e=globalThis?.navigator)===null||e===void 0)&&e.locks)?this.lock=ru:this.lock=fp,this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?s.storage?this.storage=s.storage:Ni()?this.storage=hp:(this.memoryStorage={},this.storage=su(this.memoryStorage)):(this.memoryStorage={},this.storage=su(this.memoryStorage)),In()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(r){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",r)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async r=>{this._debug("received broadcast notification from other tab or client",r),await this._notifyAllSubscribers(r.data.event,r.data.session,!1)})}this.initialize()}_debug(...t){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${Ha}) ${new Date().toISOString()}`,...t),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){try{let t=In()?await this._isPKCEFlow():!1;if(this._debug("#_initialize()","begin","is PKCE flow",t),t||this.detectSessionInUrl&&this._isImplicitGrantFlow()){let{data:e,error:n}=await this._getSessionFromURL(t);if(n)return this._debug("#_initialize()","error detecting session from URL",n),n?.message==="Identity is already linked"||n?.message==="Identity is already linked to another user"?{error:n}:(await this._removeSession(),{error:n});let{session:s,redirectType:r}=e;return this._debug("#_initialize()","detected session in URL",s,"redirect type",r),await this._saveSession(s),setTimeout(async()=>{r==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",s):await this._notifyAllSubscribers("SIGNED_IN",s)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return ie(t)?{error:t}:{error:new lr("Unexpected error during initialization",t)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(t){var e,n,s;try{let r=await ue(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(n=(e=t?.options)===null||e===void 0?void 0:e.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:(s=t?.options)===null||s===void 0?void 0:s.captchaToken}},xform:_i}),{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};let c=o.session,h=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),{data:{user:h,session:c},error:null}}catch(r){if(ie(r))return{data:{user:null,session:null},error:r};throw r}}async signUp(t){var e,n,s;try{let r;if("email"in t){let{email:u,password:f,options:d}=t,p=null,v=null;this.flowType==="pkce"&&([p,v]=await ps(this.storage,this.storageKey)),r=await ue(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:d?.emailRedirectTo,body:{email:u,password:f,data:(e=d?.data)!==null&&e!==void 0?e:{},gotrue_meta_security:{captcha_token:d?.captchaToken},code_challenge:p,code_challenge_method:v},xform:_i})}else if("phone"in t){let{phone:u,password:f,options:d}=t;r=await ue(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:f,data:(n=d?.data)!==null&&n!==void 0?n:{},channel:(s=d?.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:d?.captchaToken}},xform:_i})}else throw new ms("You must provide either an email or phone number and a password");let{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};let c=o.session,h=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),{data:{user:h,session:c},error:null}}catch(r){if(ie(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithPassword(t){try{let e;if("email"in t){let{email:r,password:o,options:a}=t;e=await ue(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:o,gotrue_meta_security:{captcha_token:a?.captchaToken}},xform:iu})}else if("phone"in t){let{phone:r,password:o,options:a}=t;e=await ue(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:o,gotrue_meta_security:{captcha_token:a?.captchaToken}},xform:iu})}else throw new ms("You must provide either an email or phone number and a password");let{data:n,error:s}=e;return s?{data:{user:null,session:null},error:s}:!n||!n.session||!n.user?{data:{user:null,session:null},error:new hr}:(n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),{data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:s})}catch(e){if(ie(e))return{data:{user:null,session:null},error:e};throw e}}async signInWithOAuth(t){var e,n,s,r;return await this._handleProviderSignIn(t.provider,{redirectTo:(e=t.options)===null||e===void 0?void 0:e.redirectTo,scopes:(n=t.options)===null||n===void 0?void 0:n.scopes,queryParams:(s=t.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(r=t.options)===null||r===void 0?void 0:r.skipBrowserRedirect})}async exchangeCodeForSession(t){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(t))}async _exchangeCodeForSession(t){let e=await ro(this.storage,`${this.storageKey}-code-verifier`),[n,s]=(e??"").split("/");try{let{data:r,error:o}=await ue(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:t,code_verifier:n},xform:_i});if(await oo(this.storage,`${this.storageKey}-code-verifier`),o)throw o;return!r||!r.session||!r.user?{data:{user:null,session:null,redirectType:null},error:new hr}:(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),{data:Object.assign(Object.assign({},r),{redirectType:s??null}),error:o})}catch(r){if(ie(r))return{data:{user:null,session:null,redirectType:null},error:r};throw r}}async signInWithIdToken(t){try{let{options:e,provider:n,token:s,access_token:r,nonce:o}=t,a=await ue(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:s,access_token:r,nonce:o,gotrue_meta_security:{captcha_token:e?.captchaToken}},xform:_i}),{data:c,error:h}=a;return h?{data:{user:null,session:null},error:h}:!c||!c.session||!c.user?{data:{user:null,session:null},error:new hr}:(c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers("SIGNED_IN",c.session)),{data:c,error:h})}catch(e){if(ie(e))return{data:{user:null,session:null},error:e};throw e}}async signInWithOtp(t){var e,n,s,r,o;try{if("email"in t){let{email:a,options:c}=t,h=null,u=null;this.flowType==="pkce"&&([h,u]=await ps(this.storage,this.storageKey));let{error:f}=await ue(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(e=c?.data)!==null&&e!==void 0?e:{},create_user:(n=c?.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:c?.captchaToken},code_challenge:h,code_challenge_method:u},redirectTo:c?.emailRedirectTo});return{data:{user:null,session:null},error:f}}if("phone"in t){let{phone:a,options:c}=t,{data:h,error:u}=await ue(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(s=c?.data)!==null&&s!==void 0?s:{},create_user:(r=c?.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:c?.captchaToken},channel:(o=c?.channel)!==null&&o!==void 0?o:"sms"}});return{data:{user:null,session:null,messageId:h?.message_id},error:u}}throw new ms("You must provide either an email or phone number.")}catch(a){if(ie(a))return{data:{user:null,session:null},error:a};throw a}}async verifyOtp(t){var e,n;try{let s,r;"options"in t&&(s=(e=t.options)===null||e===void 0?void 0:e.redirectTo,r=(n=t.options)===null||n===void 0?void 0:n.captchaToken);let{data:o,error:a}=await ue(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},t),{gotrue_meta_security:{captcha_token:r}}),redirectTo:s,xform:_i});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");let c=o.session,h=o.user;return c?.access_token&&(await this._saveSession(c),await this._notifyAllSubscribers(t.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c)),{data:{user:h,session:c},error:null}}catch(s){if(ie(s))return{data:{user:null,session:null},error:s};throw s}}async signInWithSSO(t){var e,n,s;try{let r=null,o=null;return this.flowType==="pkce"&&([r,o]=await ps(this.storage,this.storageKey)),await ue(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in t?{provider_id:t.providerId}:null),"domain"in t?{domain:t.domain}:null),{redirect_to:(n=(e=t.options)===null||e===void 0?void 0:e.redirectTo)!==null&&n!==void 0?n:void 0}),!((s=t?.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:t.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:r,code_challenge_method:o}),headers:this.headers,xform:ap})}catch(r){if(ie(r))return{data:null,error:r};throw r}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async t=>{let{data:{session:e},error:n}=t;if(n)throw n;if(!e)throw new Ln;let{error:s}=await ue(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:e.access_token});return{data:{user:null,session:null},error:s}})}catch(t){if(ie(t))return{data:{user:null,session:null},error:t};throw t}}async resend(t){try{let e=`${this.url}/resend`;if("email"in t){let{email:n,type:s,options:r}=t,{error:o}=await ue(this.fetch,"POST",e,{headers:this.headers,body:{email:n,type:s,gotrue_meta_security:{captcha_token:r?.captchaToken}},redirectTo:r?.emailRedirectTo});return{data:{user:null,session:null},error:o}}else if("phone"in t){let{phone:n,type:s,options:r}=t,{data:o,error:a}=await ue(this.fetch,"POST",e,{headers:this.headers,body:{phone:n,type:s,gotrue_meta_security:{captcha_token:r?.captchaToken}}});return{data:{user:null,session:null,messageId:o?.message_id},error:a}}throw new ms("You must provide either an email or phone number and a type")}catch(e){if(ie(e))return{data:{user:null,session:null},error:e};throw e}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async e=>e))}async _acquireLock(t,e){this._debug("#_acquireLock","begin",t);try{if(this.lockAcquired){let n=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await n,await e()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,t,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;let n=e();for(this.pendingInLock.push((async()=>{try{await n}catch{}})()),await n;this.pendingInLock.length;){let s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await n}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(t){this._debug("#_useSession","begin");try{let e=await this.__loadSession();return await t(e)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let t=null,e=await ro(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",e),e!==null&&(this._isValidSession(e)?t=e:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!t)return{data:{session:null},error:null};let n=t.expires_at?t.expires_at<=Date.now()/1e3:!1;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",t.expires_at),!n){if(this.storage.isServer){let o=this.suppressGetSessionWarning;t=new Proxy(t,{get:(c,h,u)=>(!o&&h==="user"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),o=!0,this.suppressGetSessionWarning=!0),Reflect.get(c,h,u))})}return{data:{session:t},error:null}}let{session:s,error:r}=await this._callRefreshToken(t.refresh_token);return r?{data:{session:null},error:r}:{data:{session:s},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(t){return t?await this._getUser(t):(await this.initializePromise,await this._acquireLock(-1,async()=>await this._getUser()))}async _getUser(t){try{return t?await ue(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:t,xform:Kn}):await this._useSession(async e=>{var n,s,r;let{data:o,error:a}=e;if(a)throw a;return!(!((n=o.session)===null||n===void 0)&&n.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new Ln}:await ue(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(r=(s=o.session)===null||s===void 0?void 0:s.access_token)!==null&&r!==void 0?r:void 0,xform:Kn})})}catch(e){if(ie(e))return rp(e)&&(await this._removeSession(),await oo(this.storage,`${this.storageKey}-code-verifier`),await this._notifyAllSubscribers("SIGNED_OUT",null)),{data:{user:null},error:e};throw e}}async updateUser(t,e={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(t,e))}async _updateUser(t,e={}){try{return await this._useSession(async n=>{let{data:s,error:r}=n;if(r)throw r;if(!s.session)throw new Ln;let o=s.session,a=null,c=null;this.flowType==="pkce"&&t.email!=null&&([a,c]=await ps(this.storage,this.storageKey));let{data:h,error:u}=await ue(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:e?.emailRedirectTo,body:Object.assign(Object.assign({},t),{code_challenge:a,code_challenge_method:c}),jwt:o.access_token,xform:Kn});if(u)throw u;return o.user=h.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),{data:{user:o.user},error:null}})}catch(n){if(ie(n))return{data:{user:null},error:n};throw n}}_decodeJWT(t){return nu(t)}async setSession(t){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(t))}async _setSession(t){try{if(!t.access_token||!t.refresh_token)throw new Ln;let e=Date.now()/1e3,n=e,s=!0,r=null,o=nu(t.access_token);if(o.exp&&(n=o.exp,s=n<=e),s){let{session:a,error:c}=await this._callRefreshToken(t.refresh_token);if(c)return{data:{user:null,session:null},error:c};if(!a)return{data:{user:null,session:null},error:null};r=a}else{let{data:a,error:c}=await this._getUser(t.access_token);if(c)throw c;r={access_token:t.access_token,refresh_token:t.refresh_token,user:a.user,token_type:"bearer",expires_in:n-e,expires_at:n},await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)}return{data:{user:r.user,session:r},error:null}}catch(e){if(ie(e))return{data:{session:null,user:null},error:e};throw e}}async refreshSession(t){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(t))}async _refreshSession(t){try{return await this._useSession(async e=>{var n;if(!t){let{data:o,error:a}=e;if(a)throw a;t=(n=o.session)!==null&&n!==void 0?n:void 0}if(!t?.refresh_token)throw new Ln;let{session:s,error:r}=await this._callRefreshToken(t.refresh_token);return r?{data:{user:null,session:null},error:r}:s?{data:{user:s.user,session:s},error:null}:{data:{user:null,session:null},error:null}})}catch(e){if(ie(e))return{data:{user:null,session:null},error:e};throw e}}async _getSessionFromURL(t){try{if(!In())throw new gs("No browser detected.");if(this.flowType==="implicit"&&!this._isImplicitGrantFlow())throw new gs("Not a valid implicit grant flow url.");if(this.flowType=="pkce"&&!t)throw new co("Not a valid PKCE flow url.");let e=Va(window.location.href);if(t){if(!e.code)throw new co("No code detected.");let{data:E,error:T}=await this._exchangeCodeForSession(e.code);if(T)throw T;let b=new URL(window.location.href);return b.searchParams.delete("code"),window.history.replaceState(window.history.state,"",b.toString()),{data:{session:E.session,redirectType:null},error:null}}if(e.error||e.error_description||e.error_code)throw new gs(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});let{provider_token:n,provider_refresh_token:s,access_token:r,refresh_token:o,expires_in:a,expires_at:c,token_type:h}=e;if(!r||!a||!o||!h)throw new gs("No session defined in URL");let u=Math.round(Date.now()/1e3),f=parseInt(a),d=u+f;c&&(d=parseInt(c));let p=d-u;p*1e3<=uo&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${f}s`);let v=d-f;u-v>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",v,d,u):u-v<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",v,d,u);let{data:x,error:_}=await this._getUser(r);if(_)throw _;let g={provider_token:n,provider_refresh_token:s,access_token:r,expires_in:f,expires_at:d,refresh_token:o,token_type:h,user:x.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:g,redirectType:e.type},error:null}}catch(e){if(ie(e))return{data:{session:null,redirectType:null},error:e};throw e}}_isImplicitGrantFlow(){let t=Va(window.location.href);return!!(In()&&(t.access_token||t.error_description))}async _isPKCEFlow(){let t=Va(window.location.href),e=await ro(this.storage,`${this.storageKey}-code-verifier`);return!!(t.code&&e)}async signOut(t={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(t))}async _signOut({scope:t}={scope:"global"}){return await this._useSession(async e=>{var n;let{data:s,error:r}=e;if(r)return{error:r};let o=(n=s.session)===null||n===void 0?void 0:n.access_token;if(o){let{error:a}=await this.admin.signOut(o,t);if(a&&!(sp(a)&&(a.status===404||a.status===401||a.status===403)))return{error:a}}return t!=="others"&&(await this._removeSession(),await oo(this.storage,`${this.storageKey}-code-verifier`),await this._notifyAllSubscribers("SIGNED_OUT",null)),{error:null}})}onAuthStateChange(t){let e=Qf(),n={id:e,callback:t,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",e),this.stateChangeEmitters.delete(e)}};return this._debug("#onAuthStateChange()","registered callback with id",e),this.stateChangeEmitters.set(e,n),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(e)})))(),{data:{subscription:n}}}async _emitInitialSession(t){return await this._useSession(async e=>{var n,s;try{let{data:{session:r},error:o}=e;if(o)throw o;await((n=this.stateChangeEmitters.get(t))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",t,"session",r)}catch(r){await((s=this.stateChangeEmitters.get(t))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",t,"error",r),console.error(r)}})}async resetPasswordForEmail(t,e={}){let n=null,s=null;this.flowType==="pkce"&&([n,s]=await ps(this.storage,this.storageKey,!0));try{return await ue(this.fetch,"POST",`${this.url}/recover`,{body:{email:t,code_challenge:n,code_challenge_method:s,gotrue_meta_security:{captcha_token:e.captchaToken}},headers:this.headers,redirectTo:e.redirectTo})}catch(r){if(ie(r))return{data:null,error:r};throw r}}async getUserIdentities(){var t;try{let{data:e,error:n}=await this.getUser();if(n)throw n;return{data:{identities:(t=e.user.identities)!==null&&t!==void 0?t:[]},error:null}}catch(e){if(ie(e))return{data:null,error:e};throw e}}async linkIdentity(t){var e;try{let{data:n,error:s}=await this._useSession(async r=>{var o,a,c,h,u;let{data:f,error:d}=r;if(d)throw d;let p=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,t.provider,{redirectTo:(o=t.options)===null||o===void 0?void 0:o.redirectTo,scopes:(a=t.options)===null||a===void 0?void 0:a.scopes,queryParams:(c=t.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return await ue(this.fetch,"GET",p,{headers:this.headers,jwt:(u=(h=f.session)===null||h===void 0?void 0:h.access_token)!==null&&u!==void 0?u:void 0})});if(s)throw s;return In()&&!(!((e=t.options)===null||e===void 0)&&e.skipBrowserRedirect)&&window.location.assign(n?.url),{data:{provider:t.provider,url:n?.url},error:null}}catch(n){if(ie(n))return{data:{provider:t.provider,url:null},error:n};throw n}}async unlinkIdentity(t){try{return await this._useSession(async e=>{var n,s;let{data:r,error:o}=e;if(o)throw o;return await ue(this.fetch,"DELETE",`${this.url}/user/identities/${t.identity_id}`,{headers:this.headers,jwt:(s=(n=r.session)===null||n===void 0?void 0:n.access_token)!==null&&s!==void 0?s:void 0})})}catch(e){if(ie(e))return{data:null,error:e};throw e}}async _refreshAccessToken(t){let e=`#_refreshAccessToken(${t.substring(0,5)}...)`;this._debug(e,"begin");try{let n=Date.now();return await np(async s=>(s>0&&await ep(200*Math.pow(2,s-1)),this._debug(e,"refreshing attempt",s),await ue(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:t},headers:this.headers,xform:_i})),(s,r)=>{let o=200*Math.pow(2,s);return r&&$a(r)&&Date.now()+o-n<uo})}catch(n){if(this._debug(e,"error",n),ie(n))return{data:{session:null,user:null},error:n};throw n}finally{this._debug(e,"end")}}_isValidSession(t){return typeof t=="object"&&t!==null&&"access_token"in t&&"refresh_token"in t&&"expires_at"in t}async _handleProviderSignIn(t,e){let n=await this._getUrlForProvider(`${this.url}/authorize`,t,{redirectTo:e.redirectTo,scopes:e.scopes,queryParams:e.queryParams});return this._debug("#_handleProviderSignIn()","provider",t,"options",e,"url",n),In()&&!e.skipBrowserRedirect&&window.location.assign(n),{data:{provider:t,url:n},error:null}}async _recoverAndRefresh(){var t;let e="#_recoverAndRefresh()";this._debug(e,"begin");try{let n=await ro(this.storage,this.storageKey);if(this._debug(e,"session from storage",n),!this._isValidSession(n)){this._debug(e,"session is not valid"),n!==null&&await this._removeSession();return}let s=Math.round(Date.now()/1e3),r=((t=n.expires_at)!==null&&t!==void 0?t:1/0)<s+Qh;if(this._debug(e,`session has${r?"":" not"} expired with margin of ${Qh}s`),r){if(this.autoRefreshToken&&n.refresh_token){let{error:o}=await this._callRefreshToken(n.refresh_token);o&&(console.error(o),$a(o)||(this._debug(e,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(e,"error",n),console.error(n);return}finally{this._debug(e,"end")}}async _callRefreshToken(t){var e,n;if(!t)throw new Ln;if(this.refreshingDeferred)return this.refreshingDeferred.promise;let s=`#_callRefreshToken(${t.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new so;let{data:r,error:o}=await this._refreshAccessToken(t);if(o)throw o;if(!r.session)throw new Ln;await this._saveSession(r.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",r.session);let a={session:r.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(r){if(this._debug(s,"error",r),ie(r)){let o={session:null,error:r};return $a(r)||(await this._removeSession(),await this._notifyAllSubscribers("SIGNED_OUT",null)),(e=this.refreshingDeferred)===null||e===void 0||e.resolve(o),o}throw(n=this.refreshingDeferred)===null||n===void 0||n.reject(r),r}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(t,e,n=!0){let s=`#_notifyAllSubscribers(${t})`;this._debug(s,"begin",e,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:t,session:e});let r=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(t,e)}catch(c){r.push(c)}});if(await Promise.all(o),r.length>0){for(let a=0;a<r.length;a+=1)console.error(r[a]);throw r[0]}}finally{this._debug(s,"end")}}async _saveSession(t){this._debug("#_saveSession()",t),this.suppressGetSessionWarning=!0,await eu(this.storage,this.storageKey,t)}async _removeSession(){this._debug("#_removeSession()"),await oo(this.storage,this.storageKey)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");let t=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{t&&In()&&window?.removeEventListener&&window.removeEventListener("visibilitychange",t)}catch(e){console.error("removing visibilitychange callback failed",e)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");let t=setInterval(()=>this._autoRefreshTokenTick(),uo);this.autoRefreshTicker=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");let t=this.autoRefreshTicker;this.autoRefreshTicker=null,t&&clearInterval(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{let t=Date.now();try{return await this._useSession(async e=>{let{data:{session:n}}=e;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}let s=Math.floor((n.expires_at*1e3-t)/uo);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${uo}ms, refresh threshold is ${dp} ticks`),s<=dp&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error("Auto refresh tick failed with error. This is likely a transient error.",e)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(t){if(t.isAcquireTimeout||t instanceof ho)this._debug("auto refresh token tick lock not available");else throw t}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!In()||!window?.addEventListener)return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window?.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(t){console.error("_handleVisibilityChange",t)}}async _onVisibilityChanged(t){let e=`#_onVisibilityChanged(${t})`;this._debug(e,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),t||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(e,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(t,e,n){let s=[`provider=${encodeURIComponent(e)}`];if(n?.redirectTo&&s.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n?.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType==="pkce"){let[r,o]=await ps(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(r)}`,code_challenge_method:`${encodeURIComponent(o)}`});s.push(a.toString())}if(n?.queryParams){let r=new URLSearchParams(n.queryParams);s.push(r.toString())}return n?.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${t}?${s.join("&")}`}async _unenroll(t){try{return await this._useSession(async e=>{var n;let{data:s,error:r}=e;return r?{data:null,error:r}:await ue(this.fetch,"DELETE",`${this.url}/factors/${t.factorId}`,{headers:this.headers,jwt:(n=s?.session)===null||n===void 0?void 0:n.access_token})})}catch(e){if(ie(e))return{data:null,error:e};throw e}}async _enroll(t){try{return await this._useSession(async e=>{var n,s;let{data:r,error:o}=e;if(o)return{data:null,error:o};let a=Object.assign({friendly_name:t.friendlyName,factor_type:t.factorType},t.factorType==="phone"?{phone:t.phone}:{issuer:t.issuer}),{data:c,error:h}=await ue(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(n=r?.session)===null||n===void 0?void 0:n.access_token});return h?{data:null,error:h}:(t.factorType==="phone"&&delete c.totp,t.factorType==="totp"&&(!((s=c?.totp)===null||s===void 0)&&s.qr_code)&&(c.totp.qr_code=`data:image/svg+xml;utf-8,${c.totp.qr_code}`),{data:c,error:null})})}catch(e){if(ie(e))return{data:null,error:e};throw e}}async _verify(t){return this._acquireLock(-1,async()=>{try{return await this._useSession(async e=>{var n;let{data:s,error:r}=e;if(r)return{data:null,error:r};let{data:o,error:a}=await ue(this.fetch,"POST",`${this.url}/factors/${t.factorId}/verify`,{body:{code:t.code,challenge_id:t.challengeId},headers:this.headers,jwt:(n=s?.session)===null||n===void 0?void 0:n.access_token});return a?{data:null,error:a}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),{data:o,error:a})})}catch(e){if(ie(e))return{data:null,error:e};throw e}})}async _challenge(t){return this._acquireLock(-1,async()=>{try{return await this._useSession(async e=>{var n;let{data:s,error:r}=e;return r?{data:null,error:r}:await ue(this.fetch,"POST",`${this.url}/factors/${t.factorId}/challenge`,{body:{channel:t.channel},headers:this.headers,jwt:(n=s?.session)===null||n===void 0?void 0:n.access_token})})}catch(e){if(ie(e))return{data:null,error:e};throw e}})}async _challengeAndVerify(t){let{data:e,error:n}=await this._challenge({factorId:t.factorId});return n?{data:null,error:n}:await this._verify({factorId:t.factorId,challengeId:e.id,code:t.code})}async _listFactors(){let{data:{user:t},error:e}=await this.getUser();if(e)return{data:null,error:e};let n=t?.factors||[],s=n.filter(o=>o.factor_type==="totp"&&o.status==="verified"),r=n.filter(o=>o.factor_type==="phone"&&o.status==="verified");return{data:{all:n,totp:s,phone:r},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,async()=>await this._useSession(async t=>{var e,n;let{data:{session:s},error:r}=t;if(r)return{data:null,error:r};if(!s)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};let o=this._decodeJWT(s.access_token),a=null;o.aal&&(a=o.aal);let c=a;((n=(e=s.user.factors)===null||e===void 0?void 0:e.filter(f=>f.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(c="aal2");let u=o.amr||[];return{data:{currentLevel:a,nextLevel:c,currentAuthenticationMethods:u},error:null}}))}};xs.nextInstanceID=0;var yb=xs,ou=yb;var qa=class extends ou{constructor(t){super(t)}};var xb=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(u){try{h(n.next(u))}catch(f){o(f)}}function c(u){try{h(n.throw(u))}catch(f){o(f)}}function h(u){u.done?r(u.value):s(u.value).then(a,c)}h((n=n.apply(i,t||[])).next())})},fo=class{constructor(t,e,n){var s,r,o;if(this.supabaseUrl=t,this.supabaseKey=e,!t)throw new Error("supabaseUrl is required.");if(!e)throw new Error("supabaseKey is required.");let a=qf(t);this.realtimeUrl=`${a}/realtime/v1`.replace(/^http/i,"ws"),this.authUrl=`${a}/auth/v1`,this.storageUrl=`${a}/storage/v1`,this.functionsUrl=`${a}/functions/v1`;let c=`sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`,h={db:Gf,realtime:$f,auth:Object.assign(Object.assign({},Wf),{storageKey:c}),global:Vf},u=jf(n??{},h);this.storageKey=(s=u.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(r=u.global.headers)!==null&&r!==void 0?r:{},u.accessToken?(this.accessToken=u.accessToken,this.auth=new Proxy({},{get:(f,d)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(d)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((o=u.auth)!==null&&o!==void 0?o:{},this.headers,u.global.fetch),this.fetch=Xf(e,this._getAccessToken.bind(this),u.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers},u.realtime)),this.rest=new Af(`${a}/rest/v1`,{headers:this.headers,schema:u.db.schema,fetch:this.fetch}),u.accessToken||this._listenForAuthEvents()}get functions(){return new Gr(this.functionsUrl,{headers:this.headers,customFetch:this.fetch})}get storage(){return new eo(this.storageUrl,this.headers,this.fetch)}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},n={}){return this.rest.rpc(t,e,n)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var t,e;return xb(this,void 0,void 0,function*(){if(this.accessToken)return yield this.accessToken();let{data:n}=yield this.auth.getSession();return(e=(t=n.session)===null||t===void 0?void 0:t.access_token)!==null&&e!==void 0?e:null})}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:n,storage:s,storageKey:r,flowType:o,lock:a,debug:c},h,u){var f;let d={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new qa({url:this.authUrl,headers:Object.assign(Object.assign({},d),h),storageKey:r,autoRefreshToken:t,persistSession:e,detectSessionInUrl:n,storage:s,flowType:o,lock:a,debug:c,fetch:u,hasCustomAuthorizationHeader:(f="Authorization"in this.headers)!==null&&f!==void 0?f:!1})}_initRealtimeClient(t){return new rr(this.realtimeUrl,Object.assign(Object.assign({},t),{params:Object.assign({apikey:this.supabaseKey},t?.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,n)=>{this._handleTokenChanged(e,"CLIENT",n?.access_token)})}_handleTokenChanged(t,e,n){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN")&&this.changedAccessToken!==n?(this.realtime.setAuth(n??null),this.changedAccessToken=n):t==="SIGNED_OUT"&&(this.realtime.setAuth(this.supabaseKey),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};var pp=(i,t,e)=>new fo(i,t,e);var mp={type:"change"},cu={type:"start"},_p={type:"end"},ja=new Zs,gp=new Fn,bb=Math.cos(70*os.DEG2RAD),$e=new D,pn=2*Math.PI,we={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},au=1e-6,Ya=class extends Sa{constructor(t,e=null){super(t,e),this.state=we.NONE,this.enabled=!0,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ss.ROTATE,MIDDLE:ss.DOLLY,RIGHT:ss.PAN},this.touches={ONE:rs.ROTATE,TWO:rs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Hn,this._lastTargetPosition=new D,this._quat=new Hn().setFromUnitVectors(t.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new zr,this._sphericalDelta=new zr,this._scale=1,this._panOffset=new D,this._rotateStart=new xt,this._rotateEnd=new xt,this._rotateDelta=new xt,this._panStart=new xt,this._panEnd=new xt,this._panDelta=new xt,this._dollyStart=new xt,this._dollyEnd=new xt,this._dollyDelta=new xt,this._dollyDirection=new D,this._mouse=new xt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Sb.bind(this),this._onPointerDown=Mb.bind(this),this._onPointerUp=wb.bind(this),this._onContextMenu=Ib.bind(this),this._onMouseWheel=Ab.bind(this),this._onKeyDown=Rb.bind(this),this._onTouchStart=Cb.bind(this),this._onTouchMove=Pb.bind(this),this._onMouseDown=Eb.bind(this),this._onMouseMove=Tb.bind(this),this._interceptControlDown=Lb.bind(this),this._interceptControlUp=Db.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(mp),this.update(),this.state=we.NONE}update(t=null){let e=this.object.position;$e.copy(e).sub(this.target),$e.applyQuaternion(this._quat),this._spherical.setFromVector3($e),this.autoRotate&&this.state===we.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=pn:n>Math.PI&&(n-=pn),s<-Math.PI?s+=pn:s>Math.PI&&(s-=pn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if($e.setFromSpherical(this._spherical),$e.applyQuaternion(this._quatInverse),e.copy(this.target).add($e),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=$e.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new D(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let h=new D(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(a),this.object.updateMatrixWorld(),o=$e.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ja.origin.copy(this.object.position),ja.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ja.direction))<bb?this.object.lookAt(this.target):(gp.setFromNormalAndCoplanarPoint(this.object.up,this.target),ja.intersectPlane(gp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>au||8*(1-this._lastQuaternion.dot(this.object.quaternion))>au||this._lastTargetPosition.distanceToSquared(this.target)>au?(this.dispatchEvent(mp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?pn/60*this.autoRotateSpeed*t:pn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){$e.setFromMatrixColumn(e,0),$e.multiplyScalar(-t),this._panOffset.add($e)}_panUp(t,e){this.screenSpacePanning===!0?$e.setFromMatrixColumn(e,1):($e.setFromMatrixColumn(e,0),$e.crossVectors(this.object.up,$e)),$e.multiplyScalar(t),this._panOffset.add($e)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;$e.copy(s).sub(this.target);let r=$e.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/e.clientHeight),this._rotateUp(pn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/e.clientHeight),this._rotateUp(pn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new xt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Mb(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Sb(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function wb(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(_p),this.state=we.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Eb(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ss.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=we.DOLLY;break;case ss.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=we.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=we.ROTATE}break;case ss.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=we.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=we.PAN}break;default:this.state=we.NONE}this.state!==we.NONE&&this.dispatchEvent(cu)}function Tb(i){switch(this.state){case we.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case we.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case we.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ab(i){this.enabled===!1||this.enableZoom===!1||this.state!==we.NONE||(i.preventDefault(),this.dispatchEvent(cu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(_p))}function Rb(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Cb(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case rs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=we.TOUCH_ROTATE;break;case rs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=we.TOUCH_PAN;break;default:this.state=we.NONE}break;case 2:switch(this.touches.TWO){case rs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=we.TOUCH_DOLLY_PAN;break;case rs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=we.TOUCH_DOLLY_ROTATE;break;default:this.state=we.NONE}break;default:this.state=we.NONE}this.state!==we.NONE&&this.dispatchEvent(cu)}function Pb(i){switch(this._trackPointer(i),this.state){case we.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case we.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case we.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case we.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=we.NONE}}function Ib(i){this.enabled!==!1&&i.preventDefault()}function Lb(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Db(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Ub=`
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
`,Za='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',Kt=i=>String(i??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),xp=i=>{let t=new Date(i);return t.setMinutes(t.getMinutes()-t.getTimezoneOffset()),t.toISOString().slice(0,10)},po=()=>xp(new Date),Nb=(i,t)=>{let e=new Date(i+"T12:00:00");return e.setDate(e.getDate()+t),xp(e)},lu=i=>new Date(i).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),Ja=i=>String(i||"").replace(/^[⏱✅💸]\s*/u,"");function vp(i){let t=Math.round((Date.now()-new Date(i))/6e4);if(t<1)return"agora";if(t<60)return`h\xE1 ${t} min`;let e=Math.round(t/60);if(e<24)return`h\xE1 ${e} h`;let n=Math.round(e/24);return n===1?"ontem":`h\xE1 ${n} dias`}function yp(i){if(!i)return"sem prazo";let t=Math.round((new Date(i+"T12:00:00")-new Date(po()+"T12:00:00"))/864e5);return t<-1?`atrasada h\xE1 ${-t} dias`:t===-1?"venceu ontem":t===0?"vence hoje":t===1?"vence amanh\xE3":`vence ${i.slice(8)}/${i.slice(5,7)}`}var Ob={atrasado:"la",chegando:"wa",no_prazo:"ok"};function bp(i,t={}){if(!document.getElementById("md-css")){let I=document.createElement("style");I.id="md-css",I.textContent=Ub,document.head.appendChild(I)}let e=document.createElement("div");e.className="md-ov",e.hidden=!0,e.innerHTML='<div class="md-sh" role="dialog" aria-modal="true" aria-labelledby="md-tt"><div class="md-hd" id="md-hd"></div><div class="md-bd" id="md-bd"></div></div>',document.body.appendChild(e);let n=e.querySelector("#md-hd"),s=e.querySelector("#md-bd");e.addEventListener("click",I=>{I.target===e&&S()}),document.addEventListener("keydown",I=>{!e.hidden&&I.key==="Escape"&&A()}),["keydown","keyup","keypress","pointerdown","touchstart","wheel"].forEach(I=>e.addEventListener(I,F=>F.stopPropagation(),{passive:!0}));let r={dia:po(),ev:[],reg:{},itens:[],tarefas:[],feitas:[],bots:[],esc:[],stack:[],aba:"aconteceu",para:void 0,userId:null},o=I=>r.bots.find(F=>F.id===I),a=I=>I?o(I)?.nome||"Setor":"Voc\xEA",c=I=>I?o(I)?.emoji||"\u{1F916}":"\u{1F64B}",h=(I,F)=>r.tarefas.find(B=>B.origem===I&&B.origem_id===F);function u(I){let F=document.createElement("div");F.className="md-toast",F.textContent=I,document.body.appendChild(F),setTimeout(()=>F.remove(),1700)}function f(){let I={},F=[];for(let B of r.bots){let it=B.escritorio_id+"|"+B.nome;I[it]||(I[it]=1,F.push(B))}return F}let d=I=>{let F=o(I);return F?r.bots.filter(B=>B.escritorio_id===F.escritorio_id&&B.nome===F.nome).map(B=>B.id):[I]};async function p(){let I=new Date(r.dia+"T00:00:00"),F=new Date(r.dia+"T00:00:00");F.setDate(F.getDate()+1);let B=new Date;B.setDate(B.getDate()-7);let[it,q,ct,et,ft,It,Nt]=await Promise.all([i.auth.getUser(),i.from("agenda_eventos").select("id,calendario,titulo,descricao,inicio,fim,dia_inteiro,recorrente,local").gte("inicio",I.toISOString()).lt("inicio",F.toISOString()).order("inicio"),i.from("itens_situacao").select("id,bot_id,titulo,prazo,xp,situacao,status,escritorio_id").eq("ativo",!0).neq("status","fechado").in("situacao",["atrasado","chegando","no_prazo"]),i.from("tarefas").select("id,titulo,origem,origem_id,setor_id,status,prazo,xp,criado_em,atualizado_em,feito_em").eq("status","aberta").order("atualizado_em",{ascending:!1}),i.from("tarefas").select("id,titulo,origem,origem_id,setor_id,status,feito_em,atualizado_em").eq("status","feita").gte("feito_em",B.toISOString()).order("feito_em",{ascending:!1}).limit(30),i.from("bots").select("id,nome,emoji,tipo,sala,escritorio_id,missao").eq("ativo",!0).order("nome"),i.from("escritorios").select("id,nome,ordem").order("ordem")]);for(let J of[q,ct,et,ft,It])if(J.error)throw J.error;r.userId=it.data?.user?.id||null,r.ev=q.data,r.itens=ct.data,r.tarefas=et.data,r.feitas=ft.data,r.bots=It.data,r.esc=Nt.data||[],r.reg={},r.ev.length&&((await i.from("agenda_registros").select("evento_id,feito,relato").in("evento_id",r.ev.map(dt=>dt.id))).data||[]).forEach(dt=>{r.reg[dt.evento_id]=dt}),t.onChange?.(v())}function v(){let I=po();return{agenda:r.dia===I?r.ev.filter(B=>!r.reg[B.id]?.feito).length:0,tarefas:r.tarefas.length,notion:r.itens.filter(B=>B.prazo&&B.prazo<=I).length}}function x(I,{back:F=!1,sub:B=""}={}){n.innerHTML=`${F?'<button class="md-ib" data-md="voltar" aria-label="Voltar">\u2039</button>':""}<h2 id="md-tt">${Kt(I)}${B?`<div class="md-m" style="font-size:12.5px">${Kt(B)}</div>`:""}</h2><button class="md-ib" data-md="fechar" aria-label="Fechar">\xD7</button>`}function _(I){let F=r.reg[I.id]||{},B=h("agenda",I.id),it=(B?`<span class="md-tag">\u2192 ${Kt(a(B.setor_id))}</span>`:"")+(F.relato?'<span class="md-tag wa">anotado</span>':"");return`<div class="md-row"><button class="md-ck ${F.feito?"on":""}" data-md="ckev" data-id="${Kt(I.id)}" aria-pressed="${!!F.feito}" aria-label="Aconteceu: ${Kt(Ja(I.titulo))}">${Za}</button>
      <div class="md-h">${I.dia_inteiro?"dia":Kt(lu(I.inicio))}</div>
      <button class="md-op" data-md="abrir" data-k="ev" data-id="${Kt(I.id)}"><div class="md-t ${F.feito?"done":""}">${Kt(Ja(I.titulo))}${it}</div><div class="md-m">${/prosperi/i.test(I.calendario)?"Agenda da escola":"Sua agenda"}${I.local?" \xB7 "+Kt(I.local):""}</div></button></div>`}function g(I){let F=o(I.bot_id),B=h("notion",I.id);return`<div class="md-row"><button class="md-ck" data-md="ckit" data-id="${Kt(I.id)}" aria-label="Feito: ${Kt(I.titulo)}">${Za}</button>
      <button class="md-op" data-md="abrir" data-k="it" data-id="${Kt(I.id)}"><div class="md-t">${Kt(I.titulo||"Sem t\xEDtulo")}${B?`<span class="md-tag">\u2192 ${Kt(a(B.setor_id))}</span>`:""}</div><div class="md-m"><span class="md-tag ${Ob[I.situacao]||"ok"}" style="margin:0 4px 0 0">${Kt(yp(I.prazo))}</span>${Kt(F?F.emoji+" "+F.nome:"Notion")}${I.status==="respondido"?" \xB7 em andamento":""}</div></button></div>`}function E(I,F=!1){return`<div class="md-row"><button class="md-ck ${F?"on":""}" data-md="cktf" data-id="${I.id}" ${F?"disabled":""} aria-label="Resolvida: ${Kt(I.titulo)}">${Za}</button>
      <button class="md-op" data-md="abrir" data-k="tf" data-id="${I.id}"><div class="md-t ${F?"done":""}">${Kt(I.titulo)}</div><div class="md-m">${Kt(c(I.setor_id)+" "+a(I.setor_id))} \xB7 ${F?"resolvida "+vp(I.feito_em):"mexida "+vp(I.atualizado_em)}${I.origem==="agenda"?" \xB7 da agenda":I.origem==="notion"?" \xB7 do Notion":""}</div></button></div>`}function T(){let I=po(),F=r.dia===I,B=new Date(r.dia+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});x("Meu dia",{sub:B.charAt(0).toUpperCase()+B.slice(1)});let it=r.itens.filter(et=>F?et.prazo&&et.prazo<=I:et.prazo===r.dia).sort((et,ft)=>String(et.prazo).localeCompare(String(ft.prazo))),q={};r.tarefas.forEach(et=>{let ft=et.setor_id?o(et.setor_id)?.escritorio_id+"|"+a(et.setor_id):"voce";(q[ft]=q[ft]||{id:et.setor_id,n:0}).n++});let ct=r.ev.filter(et=>r.reg[et.id]?.feito).length;s.innerHTML=`
      <div class="md-chips" style="justify-content:space-between;align-items:center"><button class="md-chip" data-md="dia" data-n="-1" aria-label="Dia anterior">\u2039 Ontem</button>${F?"":'<button class="md-chip" data-md="dia" data-n="0">Hoje</button>'}<button class="md-chip" data-md="dia" data-n="1" aria-label="Pr\xF3ximo dia">Amanh\xE3 \u203A</button></div>
      <form class="md-add" data-md="novo"><label style="flex:1"><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Nova tarefa</span><input class="md-in" name="t" maxlength="300" placeholder="Anotar algo r\xE1pido (ex.: ma\xE7aneta do 6\xBA ano)" autocomplete="off"></label><button class="md-btn ac" type="submit">Anotar</button></form>
      <div class="md-sec"><h3>Agenda</h3><span>${r.ev.length?`${ct} de ${r.ev.length} feitos`:""}</span></div>
      ${r.ev.map(_).join("")||'<div class="md-empty">Nada na agenda neste dia.</div>'}
      <div class="md-sec"><h3>${F?"Notion \xB7 vence hoje ou atrasado":"Notion \xB7 vence neste dia"}</h3><span>${it.length||""}</span></div>
      ${it.map(g).join("")||'<div class="md-empty">Nada do Notion para este dia.</div>'}
      <div class="md-sec"><h3>Com os setores</h3><span>${r.tarefas.length} abertas</span></div>
      ${Object.keys(q).length?`<div class="md-chips">${Object.values(q).map(et=>`<button class="md-chip" data-md="setor" data-id="${Kt(et.id||"")}">${Kt(c(et.id)+" "+a(et.id))}<b>${et.n}</b></button>`).join("")}</div>`:""}
      ${r.tarefas.slice(0,12).map(et=>E(et)).join("")||'<div class="md-empty">Nada direcionado ainda. Toque num compromisso e use \u201CDirecionar\u201D.</div>'}
      ${r.tarefas.length>12?`<div class="md-empty">E mais ${r.tarefas.length-12}: toque num setor acima.</div>`:""}
      ${r.feitas.length?`<div class="md-sec"><h3>Resolvidas \xB7 voltaram pra voc\xEA</h3><span>\xFAltimos 7 dias</span></div>${r.feitas.slice(0,10).map(et=>E(et,!0)).join("")}`:""}
      <p class="md-m" style="margin-top:22px;white-space:normal">Agenda do Google (sua e da escola) e Notion. Anote na agenda na correria; aqui voc\xEA marca, escreve o que aconteceu e direciona pro setor.</p>`}function b(I){let F=I?d(I):[null],B=r.tarefas.filter(ct=>F.includes(ct.setor_id)),it=I?r.itens.filter(ct=>F.includes(ct.bot_id)):[],q=o(I);x(`${c(I)} ${a(I)}`,{back:!0,sub:q?.missao||(I?"":"Voltou para voc\xEA / sem setor")}),s.innerHTML=`<div class="md-sec"><h3>Direcionadas</h3><span>${B.length}</span></div>${B.map(ct=>E(ct)).join("")||'<div class="md-empty">Nenhuma tarefa direcionada aqui.</div>'}
      ${it.length?`<div class="md-sec"><h3>Do Notion</h3><span>${it.length}</span></div>${it.map(g).join("")}`:""}
      ${I?`<form class="md-add" data-md="novo" data-para="${Kt(I)}" style="margin-top:18px"><input class="md-in" name="t" maxlength="300" placeholder="Nova tarefa para ${Kt(a(I))}" aria-label="Nova tarefa para ${Kt(a(I))}" autocomplete="off"><button class="md-btn ac" type="submit">Criar</button></form>`:""}`}function k(I){let F=r.esc.length?r.esc:[{id:null,nome:""}],B=f(),it=`<div class="md-chips"><button class="md-chip ${r.para===null?"on":""}" data-md="para" data-id="">\u{1F64B} Voc\xEA (administrativo)</button></div>`;for(let q of F){let ct=B.filter(et=>!q.id||et.escritorio_id===q.id);ct.length&&(it+=`<div class="md-grp">${Kt(q.nome)}</div><div class="md-chips">${ct.map(et=>`<button class="md-chip ${r.para===et.id?"on":""}" data-md="para" data-id="${Kt(et.id)}" ${d(I||"").includes(et.id)&&I?'aria-describedby="md-aqui"':""}>${Kt((et.emoji||"\u{1F916}")+" "+et.nome)}${d(I||"").includes(et.id)&&I?" \xB7 aqui":""}</button>`).join("")}</div>`)}return it}async function L(I,F){let B="",it="",q="",ct=!1,et=null,ft=null,It=null;if(I==="ev"){if(It=r.ev.find(at=>at.id===F),!It)return A();B=Ja(It.titulo),it=(It.dia_inteiro?"Dia todo":lu(It.inicio)+(It.fim?"\u2013"+lu(It.fim):""))+" \xB7 "+(/prosperi/i.test(It.calendario)?"Agenda da escola":"Sua agenda")+(It.local?" \xB7 "+It.local:""),q=It.descricao||"",ct=!!r.reg[F]?.feito,et=h("agenda",F)}else if(I==="it"){if(ft=r.itens.find(Bt=>Bt.id===F),!ft)return A();B=ft.titulo;let at=o(ft.bot_id);it=`Notion \xB7 ${yp(ft.prazo)}${at?" \xB7 "+at.nome:""}${ft.status==="respondido"?" \xB7 em andamento":""}`,et=h("notion",F)}else{if(et=r.tarefas.find(at=>at.id===F)||r.feitas.find(at=>at.id===F),et||(et=(await i.from("tarefas").select("*").eq("id",F).maybeSingle()).data),!et)return A();B=et.titulo,ct=et.status==="feita",it=`${c(et.setor_id)} Com ${a(et.setor_id)}${et.origem==="agenda"?" \xB7 veio da agenda":et.origem==="notion"?" \xB7 veio do Notion":""}`}let Nt=[];et&&(Nt=(await i.from("tarefa_passos").select("tipo,de_setor,para_setor,texto,criado_em").eq("tarefa_id",et.id).order("criado_em")).data||[]),x(I==="ev"?"Compromisso":I==="it"?"Tarefa do Notion":"Tarefa",{back:!0});let J=I==="ev"&&r.reg[F]?.relato||"",dt=et?`<div class="md-sec"><h3>Caminho</h3><span>${et.status==="feita"?"resolvida":"com "+Kt(a(et.setor_id))}</span></div><ul class="md-tl">${Nt.map(at=>{let Bt=at.tipo==="feita"?"f":at.tipo==="nota"?"n":"",Xt=at.tipo==="nota"?`Nota em ${Kt(a(at.de_setor))}`:at.tipo==="feita"?`Resolvida${at.de_setor?" por "+Kt(a(at.de_setor)):""}`:at.tipo==="criada"?"Anotada":`${at.tipo==="reaberta"?"Reaberta \u2192 ":"\u2192 "}${Kt(a(at.para_setor))}`;return`<li class="${Bt}"><b>${Xt}</b>${at.texto?` \xB7 ${Kt(at.texto)}`:""}<small>${new Date(at.criado_em).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}</small></li>`}).join("")}</ul>`:"",Dt=I==="tf"?"Anotar":"O que aconteceu";s.innerHTML=`<div class="md-big">${Kt(B)}</div><div class="md-meta">${Kt(it)}</div>${q?`<div class="md-desc">${Kt(q.slice(0,1500))}</div>`:""}
      <div style="display:flex;gap:8px;margin-top:14px">${ct?`<button class="md-btn gh" style="flex:1" data-md="desfazer" data-k="${I}" data-id="${Kt(F)}">${I==="tf"?"Reabrir":"Desmarcar"}</button>`:`<button class="md-btn ok" style="flex:1" data-md="feito" data-k="${I}" data-id="${Kt(F)}">${Za.replace("<svg",'<svg width="18" height="18" style="vertical-align:-3px;margin-right:6px"')}${I==="ev"?"Aconteceu / feito":"Resolvido"}</button>`}</div>
      <div class="md-tabs" role="tablist"><button role="tab" aria-selected="${r.aba==="aconteceu"}" class="${r.aba==="aconteceu"?"on":""}" data-md="aba" data-a="aconteceu">${Dt}</button><button role="tab" aria-selected="${r.aba==="direcionar"}" class="${r.aba==="direcionar"?"on":""}" data-md="aba" data-a="direcionar">Direcionar</button></div>
      ${r.aba==="aconteceu"?`<form data-md="salvarnota" data-k="${I}" data-id="${Kt(F)}"><label class="md-m" style="display:block;margin-bottom:6px" for="md-nota">${I==="ev"?"Como foi, o que ficou decidido":I==="it"?"Sua resposta (vai para o Notion)":"Nota para o caminho desta tarefa"}</label><textarea class="md-ta" id="md-nota" name="n" maxlength="4000">${Kt(J)}</textarea><button class="md-btn" style="width:100%;margin-top:8px" type="submit">Salvar</button></form>`:`<div class="md-m" style="margin-bottom:4px">Para quem vai${et?` \xB7 hoje est\xE1 com ${Kt(a(et.setor_id))}`:""}</div>${k(et?.setor_id)}
           <form data-md="enviar" data-k="${I}" data-id="${Kt(F)}"><label class="md-m" style="display:block;margin:10px 0 6px" for="md-instr">Instru\xE7\xE3o (opcional)</label><textarea class="md-ta" id="md-instr" name="i" maxlength="4000" placeholder="Ex.: comprar ma\xE7aneta tubular cromada, mandar foto do modelo"></textarea><button class="md-btn ac" style="width:100%;margin-top:8px" type="submit">Direcionar${r.para!==void 0?" para "+Kt(a(r.para)):""}</button><div class="md-err" id="md-err"></div></form>`}
      ${dt}`}async function U(){let I=r.stack[r.stack.length-1]||{v:"lista"};try{I.v==="lista"?T():I.v==="setor"?b(I.id):await L(I.k,I.id)}catch(F){s.innerHTML=`<div class="md-err">N\xE3o consegui mostrar: ${Kt(F.message||F)}</div>`}}function C(I){r.stack.push(I),r.aba="aconteceu",r.para=void 0,U(),s.scrollTop=0}function A(){r.stack.length?(r.stack.pop(),r.para=void 0,U()):S()}function S(){e.hidden=!0,r.stack=[],t.onClose?.()}async function O(){try{await p()}catch{u("Sem conex\xE3o agora")}U()}async function Y(I,F){let B=await i.rpc(I,F);if(B.error)throw B.error;return B.data?.xp_total!=null&&t.onXP?.(B.data.xp_total),B.data}e.addEventListener("click",async I=>{let F=I.target.closest("[data-md]");if(!F||F.tagName==="FORM")return;let B=F.dataset.md,it=F.dataset.id;try{if(B==="fechar")S();else if(B==="voltar")A();else if(B==="dia"){let q=+F.dataset.n;r.dia=q===0?po():Nb(r.dia,q),s.innerHTML='<div class="md-empty">Carregando\u2026</div>',await O()}else if(B==="abrir")C({v:"det",k:F.dataset.k,id:it});else if(B==="setor")C({v:"setor",id:it||null});else if(B==="aba")r.aba=F.dataset.a,U();else if(B==="para")r.para=it||null,U();else if(B==="ckev"){let q=!r.reg[it]?.feito;F.classList.toggle("on",q),await Y("agenda_registrar",{p_evento:it,p_feito:q}),r.reg[it]={...r.reg[it]||{},feito:q},q&&u("Feito"),U(),t.onChange?.(v())}else if(B==="ckit"){F.classList.add("on");let q=h("notion",it);q?await Y("tarefa_concluir",{p_tarefa:q.id,p_texto:null}):await Y("campus_confirmar_item",{p_item:it,p_obs:"confirmado no Meu dia"}),u("Feito \xB7 foi pro Notion"),await O()}else if(B==="cktf")F.classList.add("on"),await Y("tarefa_concluir",{p_tarefa:it,p_texto:null}),u("Resolvida"),await O();else if(B==="feito"){F.disabled=!0;let q=F.dataset.k;if(q==="ev")await Y("agenda_registrar",{p_evento:it,p_feito:!0});else if(q==="it"){let ct=h("notion",it);ct?await Y("tarefa_concluir",{p_tarefa:ct.id,p_texto:null}):await Y("campus_confirmar_item",{p_item:it,p_obs:"confirmado no Meu dia"})}else await Y("tarefa_concluir",{p_tarefa:it,p_texto:null});u(q==="ev"?"Feito":"Resolvida"),await p(),q==="it"&&r.stack.pop(),U()}else if(B==="desfazer"){if(F.dataset.k==="ev")await Y("agenda_registrar",{p_evento:it,p_feito:!1});else{let ct=r.feitas.find(et=>et.id===it);await Y("tarefa_direcionar",{p_tarefa:it,p_para:ct?.setor_id??null,p_texto:"reaberta"})}await O()}}catch(q){u("N\xE3o salvou: "+(q.message||q)),await O()}}),e.addEventListener("submit",async I=>{I.preventDefault();let F=I.target,B=F.dataset.md,it=F.dataset.id,q=F.dataset.k,ct=F.querySelector("[type=submit]");ct&&(ct.disabled=!0);try{if(B==="novo"){let et=F.t.value.trim();if(!et){ct.disabled=!1;return}let ft=await Y("tarefa_criar",{p_titulo:et,p_para:F.dataset.para||null,p_texto:null,p_origem:"app",p_origem_id:null,p_prazo:r.dia});await p(),u(F.dataset.para?"Criada para "+a(F.dataset.para):"Anotada \xB7 agora direcione"),F.dataset.para||(r.stack.push({v:"det",k:"tf",id:ft.id}),r.aba="direcionar",r.para=void 0),U()}else if(B==="salvarnota"){let et=F.n.value.trim();if(q==="ev")await Y("agenda_registrar",{p_evento:it,p_feito:null,p_relato:et});else if(et)if(q==="it"){let ft=await i.from("respostas").insert({user_id:r.userId,item_id:it,resposta:"texto",extra:et});if(ft.error)throw ft.error}else await Y("tarefa_nota",{p_tarefa:it,p_texto:et});else{ct.disabled=!1;return}u(q==="it"?"Salvo \xB7 vai para o Notion":"Salvo"),await p(),U()}else if(B==="enviar"){if(r.para===void 0){F.querySelector("#md-err").textContent="Escolha para quem vai.",ct.disabled=!1;return}let et=F.i.value.trim()||null;if(q==="tf")await Y("tarefa_direcionar",{p_tarefa:it,p_para:r.para,p_texto:et});else{let ft=q==="ev"?r.ev.find(Nt=>Nt.id===it):r.itens.find(Nt=>Nt.id===it),It=await Y("tarefa_criar",{p_titulo:Ja(ft?.titulo)||"Sem t\xEDtulo",p_para:r.para,p_texto:et,p_origem:q==="ev"?"agenda":"notion",p_origem_id:it,p_prazo:q==="it"?ft?.prazo||null:r.dia})}u(r.para?"Foi para "+a(r.para):"Voltou para voc\xEA"),await p(),r.aba="aconteceu",r.para=void 0,U()}}catch(et){u("N\xE3o salvou: "+(et.message||et)),ct&&(ct.disabled=!1)}});async function K(I){e.hidden=!1,r.stack=I?[I]:[],r.aba="aconteceu",r.para=void 0,n.innerHTML="",s.innerHTML='<div class="md-empty">Carregando seu dia\u2026</div>',await O(),setTimeout(()=>e.querySelector(".md-ib")?.focus(),50)}return{abrir:()=>K(null),abrirSetor:I=>K({v:"setor",id:I}),abrirTarefa:I=>K({v:"det",k:"tf",id:I}),atualizar:async()=>{try{await p()}catch{}return v()},tarefasDo:I=>r.tarefas.filter(F=>I.includes(F.setor_id)),get aberto(){return!e.hidden}}}{let v=function(l,m,y,R,N,V,nt,H,gt={}){let Z=new Ht(p,typeof N=="string"?d(N):N);return Z.scale.set(m,y,R),Z.position.set(V,nt+y/2,H),Z.castShadow=gt.cast!==!1,Z.receiveShadow=!0,gt.ry&&(Z.rotation.y=gt.ry),l.add(Z),Z},x=function(l,m,y,R,N,V,nt,H,gt=12){let Z=new Ht(new es(m,y,R,gt),typeof N=="string"?d(N):N);return Z.position.set(V,nt+R/2,H),Z.castShadow=!0,Z.receiveShadow=!0,l.add(Z),Z},_=function(l,m,y,R,N,V,nt,H=0){let gt=new Ht(new Cn(m,y),typeof R=="string"?d(R):R);return gt.rotation.x=-Math.PI/2,gt.rotation.z=H,gt.position.set(N,V,nt),gt.receiveShadow=!0,l.add(gt),gt},g=function(l,{w:m=1024,h:y=256,bg:R=null,fg:N="#fff",font:V="800 150px Plus Jakarta Sans, sans-serif"}={}){let nt=document.createElement("canvas");nt.width=m,nt.height=y;let H=nt.getContext("2d");R&&(H.fillStyle=R,H.fillRect(0,0,m,y)),H.fillStyle=N,H.font=V;let gt=H.measureText(l).width;gt>m*.9&&(H.font=V.replace(/\d+px/,mt=>Math.floor(parseInt(mt)*m*.9/gt)+"px")),H.textAlign="center",H.textBaseline="middle",H.fillText(l,m/2,y/2+6);let Z=new Nr(nt);return Z.colorSpace=Qe,Z.anisotropy=4,Z},U=function(l,m,{w:y=1024,h:R=160,bg:N=null}={}){let V=document.createElement("canvas");V.width=y,V.height=R;let nt=V.getContext("2d"),H=new Nr(V);H.colorSpace=Qe,H.anisotropy=4;let gt=()=>{nt.clearRect(0,0,y,R),N&&(nt.fillStyle=N,nt.fillRect(0,0,y,R));let Z=m!==null&&b.complete&&b.naturalWidth,mt=Z?R*.8*b.naturalWidth/b.naturalHeight:0,Ct=R*.62;nt.font=`800 ${Ct}px Plus Jakarta Sans, sans-serif`;let Pt=nt.measureText(l).width,zt=y*.92-mt-(Z?R*.15:0);Pt>zt&&(Ct*=zt/Pt,nt.font=`800 ${Ct}px Plus Jakarta Sans, sans-serif`,Pt=nt.measureText(l).width);let Jt=(y-(Pt+mt+(Z?R*.15:0)))/2;Z&&(nt.drawImage(b,Jt,R*.1,mt,R*.8),Jt+=mt+R*.15),nt.textBaseline="middle";let jt=0;for(let Ye of l)nt.fillStyle=Ye===" "||Ye==="\xB7"?"#334155":T[jt++%5],nt.fillText(Ye,Jt,R/2+4),Jt+=nt.measureText(Ye).width;H.needsUpdate=!0};return gt(),L.push(gt),H},K=function(l,m,y,R,N){let V=new Ae;return v(V,4.2,.8,1.9,N,0,.35,0),v(V,2.4,.7,1.7,"#1e293b",-.2,1.12,0),[-1.3,1.3].forEach(nt=>[-.95,.95].forEach(H=>{let gt=x(V,.36,.36,.25,"#111",nt,.02,H,10);gt.rotation.x=Math.PI/2,gt.position.y=.36})),V.position.set(m,0,y),V.rotation.y=R,l.add(V),V},B=function(l,m,y=1){let R=new Ae;x(R,.18*y,.26*y,2.2*y,"#8b5a2b",0,0,0,7);let N=new Ht(new mi(1.6*y,0),d(F[Math.floor(Math.abs(l*7+m*3))%4],{flatShading:!0}));N.position.y=3.2*y,N.castShadow=!0,R.add(N),R.position.set(l,0,m),C.add(R)},ze=function(l,m,y,R,N,V){let nt=new Ae;nt.position.set(y,0,R),nt.rotation.y=N,l.add(nt);let H=v(nt,1.6,.06,.8,"#f5f5f4",0,.74,0);v(nt,.06,.74,.7,"#9ca3af",-.74,0,0),v(nt,.06,.74,.7,"#9ca3af",.74,0,0),v(nt,.9,.5,.05,"#111827",0,.82,-.25);let gt=v(nt,.84,.44,.01,d("#38bdf8",{emissive:"#0ea5e9",emissiveIntensity:.5}),0,.85,-.22,{cast:!1});v(nt,.4,.04,.15,"#d1d5db",0,.8,.05);let Z=new Ae;Z.position.set(0,0,.85),nt.add(Z),v(Z,.5,.08,.5,"#334155",0,.42,0),v(Z,.5,.55,.08,"#334155",0,.5,.24),x(Z,.04,.04,.42,"#64748b",0,0,0,6);let mt=y+Math.sin(N)*.85,Ct=R+Math.cos(N)*.85,Pt={id:Yt.length,f:m,x:mt,z:Ct,ry:N+Math.PI,room:V,who:null,scr:gt};return Yt.push(Pt),H.userData.seat=Pt,E.push(H),Pt},Qt=function(l,m,y,R,N,V,nt="#475569"){let H=new Ae;H.position.set(y,0,R),H.rotation.y=N,l.add(H),v(H,.5,.08,.5,nt,0,.42,0),v(H,.5,.5,.08,nt,0,.5,-.24),[-.2,.2].forEach(Z=>[-.2,.2].forEach(mt=>v(H,.05,.42,.05,"#334155",Z,0,mt)));let gt={id:Yt.length,f:m,x:y,z:R,ry:N,room:V,who:null};return Yt.push(gt),gt},te=function(l,m,y,R,N){let V=new Ae;V.position.set(m,0,y),V.rotation.y=R,l.add(V),v(V,2.2,.45,.9,N,0,0,0),v(V,2.2,.55,.25,N,0,.45,-.33),v(V,.25,.3,.9,N,-1,.45,0),v(V,.25,.3,.9,N,1,.45,0)},Ft=function(l,m,y,R=1){x(l,.28*R,.22*R,.5*R,"#f5f5f4",m,0,y,8);let N=new Ht(new mi(.55*R,0),d("#22c55e",{flatShading:!0}));N.position.set(m,.95*R,y),N.castShadow=!0,l.add(N)},Ee=function(l,m,y){let N=y.s<0?Nt+1.6:2.6,V=y.s<0?-2.6:J-1.6,nt=(y.x0+y.x1)/2,H=(N+V)/2,gt=y.x1-y.x0;if(y.t==="desks"){for(let Z=y.x0+2.2;Z<=y.x1-1.8;Z+=2.6)if(!(Math.abs(Z-nt)<1.4))for(let mt=N+.6;mt<=V-1.2;mt+=2.8)ze(l,m,Z,mt,0,y.k);Ft(l,y.x0+.7,y.s<0?Nt+.7:J-.7),Ft(l,y.x1-.7,y.s<0?Nt+.7:J-.7)}if(y.t==="dir"){let Z=ze(l,m,nt-4,H-1,0,y.k);Z.kaio=!0,ze(l,m,nt+3,H-1,0,y.k),te(l,nt,H+3.2,Math.PI,"#78350f"),v(l,1.6,.4,.8,"#d6d3d1",nt,0,H+1.8),v(l,6,2.2,.4,"#7c5a3a",nt,0,Nt+.4),Ft(l,y.x0+.8,Nt+.8,1.3),Ft(l,y.x1-.8,Nt+.8,1.3)}if(y.t==="meet"){let Z=Math.min(gt-4,9);v(l,Z,.08,2,"#f5f5f4",nt,.74,H),v(l,Z-.6,.74,.3,"#9ca3af",nt,0,H);for(let mt=nt-Z/2+.7;mt<=nt+Z/2-.6;mt+=1.2)Qt(l,m,mt,H-1.4,0,y.k),Qt(l,m,mt,H+1.4,Math.PI,y.k);v(l,4,2,.1,d("#0f172a",{emissive:"#1e3a8a",emissiveIntensity:.3}),nt,1,y.s<0?Nt+.3:J-.3)}if(y.t==="cafe"){v(l,8,1.05,.9,"#78350f",nt,0,Nt+1),v(l,8,.06,1,"#f5f5f4",nt,1.05,Nt+1);for(let Z=y.x0+3;Z<y.x1-1.5;Z+=3.2)for(let mt=N+3;mt<V;mt+=3)x(l,.6,.6,.06,"#f5f5f4",Z,.74,mt,16),x(l,.06,.06,.74,"#57534e",Z,0,mt,6),Qt(l,m,Z-.9,mt,Math.PI/2,y.k,"#f59e0b"),Qt(l,m,Z+.9,mt,-Math.PI/2,y.k,"#f59e0b")}if(y.t==="lib"){for(let Z=y.x0+1;Z<y.x1-.8;Z+=2.1){v(l,1.9,2.4,.5,"#7c5a3a",Z+.95,0,Nt+.4);for(let mt=0;mt<4;mt++)v(l,1.7,.35,.35,["#ef4444","#3b82f6","#eab308","#22c55e"][mt],Z+.95,.25+mt*.55,Nt+.5,{cast:!1})}v(l,4,.08,1.6,"#d6b48a",nt,.74,H+1);for(let Z=-1;Z<=1;Z++)Qt(l,m,nt+Z*1.3,H,0,y.k),Qt(l,m,nt+Z*1.3,H+2,Math.PI,y.k)}if(y.t==="lounge"&&(te(l,nt-2.5,H,Math.PI/2,"#0ea5e9"),te(l,nt+2.5,H,-Math.PI/2,"#0ea5e9"),v(l,2,.4,1,"#f5f5f4",nt,0,H),Ft(l,y.x0+.8,H,1.2),Ft(l,y.x1-.8,H,1.2),v(l,3,1.7,.1,d("#111827",{emissive:"#334155",emissiveIntensity:.3}),nt,.8,y.s<0?Nt+.3:J-.3)),y.t==="bench")for(let Z=y.x0+2;Z<y.x1-1.5;Z+=2.6)ze(l,m,Z,H-1,0,y.k),ze(l,m,Z,H+1.6,Math.PI,y.k);if(y.t==="lobby"){let Z=new Ht(new Cn(2.6,2.9),new Rn({map:k,transparent:!0}));Z.position.set(-2.6,1.9,1.62),l.add(Z),v(l,2.8,3.4,.1,"#ffffff",-2.6,0,1.55),v(l,2.8,3.4,.1,"#ffffff",2.6,0,1.55),v(l,2.4,3.4,.1,T[3],2.6,0,1.6,{cast:!1}).scale.set(2.4,.3,.02),v(l,2.4,1.1,1,T[1],-2.4,0,4.5),v(l,2.8,.08,1.2,"#f5f5f4",-2.4,1.1,4.5),te(l,-2.2,9,Math.PI/2,"#0f766e"),te(l,2.2,9,-Math.PI/2,"#0f766e"),Ft(l,-3.2,12,1.4),Ft(l,3.2,12,1.4)}if(y.t==="ai"){v(l,gt-2,2.6,.2,d("#0b1220",{emissive:"#0891b2",emissiveIntensity:.55}),nt,.2,J-.4);for(let mt=y.x0+2.5;mt<y.x1-2;mt+=3.2)ze(l,m,mt,H,Math.PI,y.k);let Z=new Ht(new mi(.8,1),d("#22d3ee",{emissive:"#22d3ee",emissiveIntensity:1.2,flatShading:!0}));Z.position.set(nt,2.2,H-1.5),Z.userData.spin=!0,l.add(Z)}if(y.t==="deck"){for(let mt=y.x0+2;mt<y.x1-1;mt+=5)Ft(l,mt,J-.9,1.5);te(l,nt-4,H,0,"#f5f5f4"),te(l,nt+3,H,0,"#f5f5f4"),x(l,.06,.06,2.6,"#57534e",nt-.5,0,H+1.8,6);let Z=new Ht(new pa(1.8,.7,8),d("#f97316",{flatShading:!0}));Z.position.set(nt-.5,2.8,H+1.8),Z.castShadow=!0,l.add(Z);for(let mt=y.x0+3;mt<y.x1;mt+=6)Qt(l,m,mt,H-2,0,y.k,"#f5f5f4")}},M=function(l){let m=P;m.t+=l;let y=bt.userData.rot,R=m.phase==="pousado"?m.t>m.wait-3?Math.min(1,(m.t-(m.wait-3))/3):Math.max(0,1-m.t/3):1;if(y.rotation.y+=l*28*R,bt.userData.tr.rotation.z+=l*40*R,m.phase==="pousado"&&m.t>m.wait&&(m.phase="subindo",m.t=0),m.phase==="subindo"&&(bt.position.y=m.y0+Math.min(1,m.t/4)**2*22,m.t>4&&(m.phase="voando",m.t=0)),m.phase==="voando"){let V=m.t/16*Math.PI*2,nt=60;bt.position.set(m.x+Math.sin(V)*nt,m.y0+22,m.z+(1-Math.cos(V))*nt*.7);let H=Math.cos(V),gt=.7*Math.sin(V);bt.rotation.set(0,Math.atan2(-gt,H),-.14),m.t>16&&(m.phase="descendo",m.t=0,bt.position.set(m.x,m.y0+22,m.z))}m.phase==="descendo"&&(bt.position.y=m.y0+(1-Math.min(1,m.t/5))**2*22,bt.rotation.z=-.05*(1-Math.min(1,m.t/5)),m.t>5&&(m.phase="pousado",m.t=0,m.wait=45+Math.random()*45,bt.position.y=m.y0,bt.rotation.set(0,bt.rotation.y,0)))},Tt=function({shirt:l="#2563eb",pants:m="#1f2937",skin:y="#e0ac7e",hair:R="#3f2a1d",bot:N=null,corte:V="curto",acessorio:nt="",sapato:H="#111827"}={}){let gt=new Ae,Z=new Ae;gt.add(Z);let mt=[-.11,.11].map(zt=>{let Jt=new Ae;Jt.position.set(zt,.86,0);let jt=new Ht(G,d(m));return jt.position.y=-.43,jt.castShadow=!0,Jt.add(jt),Z.add(Jt),Jt}),Ct=new Ht(ee,d(N||l));Ct.scale.set(1,1,.72),Ct.position.y=1.18,Ct.castShadow=!0,Z.add(Ct);let Pt=[-.3,.3].map(zt=>{let Jt=new Ae;Jt.position.set(zt,1.42,0);let jt=new Ht(xe,d(N?"#e5e7eb":l));return jt.position.y=-.3,jt.castShadow=!0,Jt.add(jt),Z.add(Jt),Jt});if(N){let zt=new Ht(Et,d(N,{flatShading:!0}));zt.rotation.x=Math.PI/2,zt.rotation.y=Math.PI/6,zt.position.y=1.78,zt.castShadow=!0,Z.add(zt),[-.09,.09].forEach(jt=>{let Ye=new Ht(ut,d("#fff"));Ye.position.set(jt,1.8,.17),Z.add(Ye);let Ne=new Ht(Rt,d("#111"));Ne.position.set(jt,1.8,.22),Z.add(Ne)});let Jt=new Ht(ut,d(N,{emissive:N,emissiveIntensity:.6}));Jt.position.y=2.07,Z.add(Jt),v(Z,.02,.12,.02,"#94a3b8",0,1.95,0)}else{let zt=new Ht(st,d(y));zt.position.y=1.74,zt.castShadow=!0,Z.add(zt);let Jt=d(R);if(V!=="careca"){let jt=new Ht(new xn(V==="cacheado"?.235:.21,12,8,0,Math.PI*2,0,Math.PI/2),Jt);jt.position.y=1.77,V==="cacheado"&&jt.scale.set(1.08,1.15,1.08),Z.add(jt)}if(V==="longo"){let jt=new Ht(new pi(.4,.42,.12),Jt);jt.position.set(0,1.6,-.13),Z.add(jt)}if(V==="rabo"){let jt=new Ht(new ts(.06,.26,3,6),Jt);jt.position.set(0,1.62,-.24),jt.rotation.x=.35,Z.add(jt)}if(V==="coque"){let jt=new Ht(new xn(.1,10,8),Jt);jt.position.set(0,1.98,-.08),Z.add(jt)}if(nt==="oculos"&&([-.08,.08].forEach(jt=>{let Ye=new Ht(new kr(.05,.012,6,12),d("#111"));Ye.position.set(jt,1.76,.19),Z.add(Ye)}),v(Z,.06,.012,.012,"#111",0,1.76,.2)),nt==="bone"){let jt=new Ht(new xn(.22,12,8,0,Math.PI*2,0,Math.PI/2),d(l));jt.position.y=1.8,Z.add(jt),v(Z,.3,.025,.18,l,0,1.81,.18)}nt==="cracha"&&(v(Z,.1,.13,.02,"#f8fafc",.08,1.15,.17),v(Z,.1,.03,.021,"#2F5BFF",.08,1.2,.171))}return[-.11,.11].forEach((zt,Jt)=>{let jt=new Ht(new pi(.13,.08,.22),d(N?"#475569":H));jt.position.set(0,-.84,.04),mt[Jt].add(jt)}),{g:gt,body:Z,legs:mt,arms:Pt}},cn=function(l){return l.o?.02:dt(l.f)},en=function(l,m,y){return he[l].find(R=>m>R.x0&&m<R.x1&&y>R.zA&&y<R.zB)||null},dr=function(l,m){return l>ft-1&&l<It+1&&m>Nt-1&&m<J+1},vi=function(l,m){for(let y=0;y<=20;y++){let R=y/20;if(dr(l.x+(m.x-l.x)*R,l.z+(m.z-l.z)*R))return!0}return!1},Dn=function(l,m){if(!vi(l,m))return[m];let y=[{x:-26,z:-17},{x:26,z:-17},{x:26,z:17},{x:-26,z:17}].map(R=>({...R,f:0,o:!0}));for(let R of y)if(!vi(l,R)&&!vi(R,m))return[R,m];for(let R=0;R<4;R++){let N=y[R];if(!vi(l,N)){for(let V of[y[(R+1)%4],y[(R+3)%4]])if(!vi(V,m))return[N,V,m]}}return[m]},fr=function(l,m){if(!l.o&&!m.o&&l.f===m.f&&en(l.f,l.x,l.z)===en(m.f,m.x,m.z))return[{f:m.f,x:m.x,z:m.z,o:!1}];let y=[],R=(H,gt,Z,mt=!1)=>y.push({f:H,x:gt,z:Z,o:mt}),N=l;if(l.o){if(m.o)return Dn(l,m);Dn(l,{f:0,x:0,z:16,o:!0}).forEach(H=>y.push(H)),R(0,0,12),R(0,0,5),R(0,0,0),N={f:0,x:0,z:0}}else{let H=en(l.f,l.x,l.z);H?(R(l.f,H.cx,H.s*2.4),R(l.f,H.cx,0)):R(l.f,l.x,0)}if(m.o)return(N.f!==0||l.f!==0)&&(R(l.f,0,0),R(0,0,0)),R(0,0,5),R(0,0,12),R(0,0,16,!0),Dn({x:0,z:16},m).forEach(H=>y.push(H)),y;let V=l.o?0:l.f;V!==m.f&&(R(V,0,0),R(m.f,0,0));let nt=en(m.f,m.x,m.z);return nt?(R(m.f,nt.cx,0),R(m.f,nt.cx,nt.s*2.4)):R(m.f,m.x,0),y.push({f:m.f,x:m.x,z:m.z,o:!1}),y},Mn=function(l){let m=Tt(l.look||{});C.add(m.g);let y={...l,m,f:l.f??0,x:l.x??0,z:l.z??15,o:l.o??!0,path:[],state:"idle",timer:2+Math.random()*4,seat:null,sit:!1,speed:l.speed||1.6,phase:Math.random()*9};return m.g.position.set(y.x,cn(y),y.z),$t.push(y),y},Qn=function(l,m,y){l.seat&&(l.seat.who=null,l.seat=null),l.sit=!1,l.path=fr({f:l.f,x:l.x,z:l.z,o:l.o},m),l.then=y,l.state="walk"},mn=function(l,m){Qn(l,{f:m.f,x:m.x,z:m.z,o:!!m.o},()=>{l.seat=m,m.who=l,l.sit=!0,l.m.g.rotation.y=m.ry,l.state="sit",l.timer=l.isPlayer?1e9:25+Math.random()*40}),m.who=l},yi=function(l){return Yt.find(m=>m.room===l&&!m.who&&!m.kaio&&m.scr)||Yt.find(m=>m.room===l&&!m.who&&!m.kaio)||Yt.find(m=>m.room===l&&!m.kaio&&m.who&&m.who.staff&&(m.who.seat=null,m.who.state="idle",m.who.timer=0,m.who.home=Yt.find(y=>y.scr&&!y.who&&y.room==="foco")||m.who.home,m.who.sit=!1,m.who=null,!0))},Oi=function(l){let m=yo(l.id),y=l.visual||{};return l.tipo!=="pessoa"?{bot:y.camisa||l.cor}:{shirt:y.camisa||l.cor,skin:y.pele||Pe[m%5],pants:y.calca||["#1f2937","#334155","#1e3a8a"][m%3],hair:y.cabelo||["#1c1917","#78350f","#facc15","#a8a29e"][m%4],corte:y.corte||["curto","longo","rabo","coque"][m%4],acessorio:y.acessorio||"",sapato:y.sapato||"#111827"}},Ka=function(l,m){let y=l.m.g.position.clone(),R=l.m.g.rotation.y;C.remove(l.m.g),l.visual=m;let N=Tt(Oi(l));N.g.position.copy(y),N.g.rotation.y=R,C.add(N.g),l.m=N,l.tennis&&pt(l,"#a6cf4a")},Qa=function(l){let m={...l.visual||{}},y=Oi(l),R=l.tipo==="pessoa",N={pele:["#ffdbac","#f1c27d","#e0ac69","#c68642","#8d5524","#5c3a21"],cabelo:["#1c1917","#3f2a1d","#78350f","#b45309","#facc15","#a8a29e","#f8fafc","#7c3aed"],camisa:["#e3423b","#2F5BFF","#10b981","#f59e0b","#8b5cf6","#ec4899","#0f172a","#f8fafc","#0ea5e9","#14532d"],calca:["#1f2937","#334155","#1e3a8a","#78350f","#f8fafc","#57534e"],sapato:["#111827","#f8fafc","#78350f","#e3423b"]},V={pele:"Pele",cabelo:"Cabelo",camisa:R?"Camisa":"Cor do corpo",calca:"Cal\xE7a",sapato:"Sapato"},nt=R?["pele","cabelo","camisa","calca","sapato"]:["camisa"],H={pele:y.skin,cabelo:y.hair,camisa:y.shirt||y.bot,calca:y.pants,sapato:y.sapato},gt=Pt=>`<div class="sub" style="margin:10px 0 4px;font-weight:800">${V[Pt]}</div><div style="display:flex;gap:8px;flex-wrap:wrap">${N[Pt].map(zt=>`<button class="sw" data-k="${Pt}" data-c="${zt}" aria-label="${V[Pt]} ${zt}" aria-pressed="${(m[Pt]||H[Pt])===zt}" style="width:36px;height:36px;border-radius:50%;background:${zt};border:3px solid ${(m[Pt]||H[Pt])===zt?"#2F5BFF":"rgba(255,255,255,.5)"};cursor:pointer"></button>`).join("")}</div>`,Z=(Pt,zt)=>`<div class="sub" style="margin:10px 0 4px;font-weight:800">${Pt==="corte"?"Cabelo (corte)":"Acess\xF3rio"}</div><div style="display:flex;gap:6px;flex-wrap:wrap">${zt.map(([Jt,jt])=>`<button class="btn ${((m[Pt]??y[Pt])||"")===Jt?"":"ghost"}" data-op="${Pt}" data-v="${Jt}" style="min-height:38px;padding:0 12px">${jt}</button>`).join("")}</div>`;wn(`<h2>Visual \xB7 ${oe(l.nome)}</h2><div class="sub">Muda s\xF3 a apar\xEAncia no campus</div>${nt.map(gt).join("")}${R?Z("corte",[["curto","Curto"],["longo","Longo"],["rabo","Rabo"],["coque","Coque"],["cacheado","Cacheado"],["careca","Careca"]])+Z("acessorio",[["","Nada"],["oculos","\xD3culos"],["cracha","Crach\xE1"],["bone","Bon\xE9"]]):""}<div class="row"><button class="btn" id="vSave">Salvar visual</button><button class="btn ghost" id="vBack">Voltar</button></div>`);let mt=Ze.find(Pt=>Pt.id===l.id)||l,Ct=()=>{Ka(mt,{...m})};Xe.querySelectorAll(".sw").forEach(Pt=>Pt.onclick=()=>{m[Pt.dataset.k]=Pt.dataset.c,Xe.querySelectorAll(`.sw[data-k="${Pt.dataset.k}"]`).forEach(zt=>{let Jt=zt===Pt;zt.style.borderColor=Jt?"#2F5BFF":"rgba(255,255,255,.5)",zt.setAttribute("aria-pressed",Jt)}),Ct()}),Xe.querySelectorAll("[data-op]").forEach(Pt=>Pt.onclick=()=>{m[Pt.dataset.op]=Pt.dataset.v,Xe.querySelectorAll(`[data-op="${Pt.dataset.op}"]`).forEach(zt=>zt.classList.toggle("ghost",zt!==Pt)),Ct()}),document.getElementById("vBack").onclick=()=>bi(mt),document.getElementById("vSave").onclick=async()=>{if(!qe){De("S\xF3 no app ao vivo");return}let Pt=await Fe.rpc("bot_visual",{p_bot:l.id,p_visual:m});if(Pt.error){De("N\xE3o salvou");return}l.visual=Pt.data.visual,mt.visual=Pt.data.visual;let zt=(i[e]?.bots||[]).find(Jt=>Jt.id===l.id);zt&&(zt.visual=Pt.data.visual),De("Visual salvo"),bi(mt)}},Ms=function(){Ze.forEach(l=>{C.remove(l.m.g),l.seat&&(l.seat.who=null),$t.splice($t.indexOf(l),1),l.tag?.remove()}),Ze=[];for(let l of i[e].bots){if(l.sala==="tenis"){let N=Mn({...l,look:Oi(l),o:!0,f:0,x:vt-9,z:Wt,speed:4});N.tennis=!0,pt(N,"#a6cf4a"),Ze.push(N);continue}let m=yi(l.sala)||yi("foco")||Yt.find(N=>!N.who&&N.scr&&!N.kaio);if(!m)continue;let y=yo(l.id),R=Mn({...l,look:Oi(l),o:!1,f:m.f,x:m.x,z:m.z});R.seat=m,m.who=R,R.sit=!0,R.state="sit",R.timer=8+Math.random()*30,R.m.g.rotation.y=m.ry,R.home=m,Ze.push(R)}Ze.forEach(l=>{let m=document.createElement("div");m.className="tag "+{ok:"",wa:"warn",la:"late"}[l.st],m.innerHTML="<i></i>",m.append(l.emo+" "+l.nome),m.onclick=y=>{y.stopPropagation(),bi(l)},_e.appendChild(m),l.tag=m}),it.material.map=U(i[e].placa,"",{bg:"#ffffff"}),it.material.needsUpdate=!0,Te.forEach(l=>l.el.textContent=t[e][l.k]),nc(),typeof mr=="function"&&mr()},w=function(l){if(!(l.isPlayer||l.tennis||l.npc)){if(l.state==="sit"&&l.timer<=0){let m=[()=>{let y=Yt.find(R=>R.room==="cafe"&&!R.who);y&&mn(l,y)},()=>{let y=ce[Math.floor(Math.random()*ce.length)];Qn(l,{f:0,x:y.x+(Math.random()-.5)*2,z:y.z+1.5,o:!0},()=>{l.state="idle",l.timer=10+Math.random()*10})},()=>{let y=Mt.filter(R=>!R.who)[Math.floor(Math.random()*6)];y&&mn(l,y)},()=>{let y=Yt.find(R=>(R.room==="reuniao"||R.room==="conselho")&&!R.who);y&&mn(l,y)},()=>{let y=Yt.find(R=>R.room==="deck"&&!R.who);y&&mn(l,y)}];m[Math.floor(Math.random()*m.length)](),l.state==="sit"&&(l.timer=10)}else l.state==="idle"&&l.timer<=0?(l.returning=!0,mn(l,l.home.who&&l.home.who!==l&&yi(l.home.room)||l.home)):l.state==="sit"&&l.seat&&l.seat!==l.home&&l.timer<=0;l.state==="sit"&&l.seat!==l.home&&l.timer<=0&&mn(l,l.home)}},pt=function(l,m){let y=new Ae,R=new Ht(new es(.025,.03,.3,6),d("#1f2937"));R.position.y=-.15,y.add(R);let N=new Ht(new kr(.16,.025,6,18),d(m));N.position.y=-.47,y.add(N);let V=new Ht(new Fr(.15,14),new Rn({color:"#f8fafc",transparent:!0,opacity:.45,side:kn}));return V.position.y=-.47,y.add(V),y.position.set(0,-.62,.05),y.rotation.x=.4,l.m.arms[1].add(y),l.racket=y,y},fe=function(l,m,y){if(!y){l.style.display="none";return}if(Ce.copy(m).project(c),Ce.z>1||Math.abs(Ce.x)>1.1||Math.abs(Ce.y)>1.1){l.style.display="none";return}l.style.display="",l.style.transform=`translate(${(Ce.x*.5+.5)*innerWidth}px,${(-Ce.y*.5+.5)*innerHeight}px) translate(-50%,-100%)`},kt=function(l,m,y){if(!y){l.style.display="none";return}if(Ce.copy(m).project(c),Ce.z>1){l.style.display="none";return}l.style.display="",l.style.transform=`translate(${(Ce.x*.5+.5)*innerWidth}px,${(-Ce.y*.5+.5)*innerHeight}px) translate(-50%,-50%)`},gn=function(l,m,y=1.1){pe.on=!0,pe.t=0,pe.d=y,pe.p0.copy(c.position),pe.p1.copy(l),pe.t0.copy(h.target),pe.t1.copy(m)},Ue=function(l,m){He=l,m||(re=!1),Dt.forEach((y,R)=>y.visible=l<0||R<=l),at.visible=l<0,document.querySelectorAll("#floors button").forEach(y=>y.classList.toggle("on",+y.dataset.f===l)),!m&&(l<0?gn(new D(95,80,142),new D(4,0,16)):innerWidth<innerHeight?gn(new D(44,dt(l)+50,10),new D(1,dt(l),0)):gn(new D(8,dt(l)+36,30),new D(0,dt(l),-1)))},Gn=function(l){_n.set(l.clientX/innerWidth*2-1,-(l.clientY/innerHeight)*2+1),be.setFromCamera(_n,c);let m=[];$t.forEach(N=>{N.m.g.visible&&N.m.g.traverse(V=>{V.isMesh&&(V.userData.agent=N,m.push(V))})});let y=be.intersectObjects([...m,...E],!1).find(N=>ln(N.object));if(!y)return;let R=y.object.userData;if(R.agent&&!R.agent.npc&&!R.agent.staff&&!R.agent.isPlayer){bi(R.agent);return}if(R.seat){if(He<0){Ue(R.seat.f);return}if(R.seat.who&&R.seat.who!==tt){De("Mesa ocupada");return}mn(tt,R.seat),tt.then2=()=>uu(),xi();return}if(R.floor!==void 0){if(He<0){Ue(2);return}let N=y.point;Qn(tt,{f:R.floor,x:os.clamp(N.x,ft+.6,It-.6),z:os.clamp(N.z,Nt+.6,J-.6),o:!1}),xi();return}if(R.ground){let N=y.point;if(dr(N.x,N.z))return;Qn(tt,{f:0,x:N.x,z:N.z,o:!0}),xi()}},xi=function(){Wn.style.opacity=0},wn=function(l){Xe.innerHTML=l,hu.classList.add("open")},Oe=function(){hu.classList.remove("open"),document.querySelectorAll("#tabs button").forEach(l=>l.classList.toggle("on",l.dataset.t==="campus"))},ec=function(l){return l.tarefas.map((m,y)=>`<div class="task"><span class="d" style="background:${m[3]?"var(--cy)":tc[m[1]]}"></span><div class="n">${oe(m[0])}<small>${m[3]?"confirmada":Mp[m[1]]} \xB7 +${m[2]} XP${m[6]&&!m[3]?" \xB7 voc\xEA respondeu: "+oe(m[6]):""}</small></div><button class="btn" data-b="${l.id}" data-i="${y}" ${m[3]?"disabled":""}>${m[3]?"Feito":"Confirmar"}</button></div>`).join("")},bi=function(l){Bp(l);let m=l.o?"ao ar livre":["t\xE9rreo","1\xBA andar","2\xBA andar"][l.f];wn(`<h2>${oe(l.emo)} ${oe(l.nome)}</h2><div class="sub">${oe(l.papel)} \xB7 ${oe(l.sala==="tenis"?"Quadra de t\xEAnis":t[e][l.sala])} \xB7 ${m}</div>${ec(l)}${qe&&En?(()=>{let y=En.tarefasDo(l.ids||[l.id]);return`<div class="sub" style="margin-top:10px;font-weight:800">Direcionadas para ${oe(l.nome)} \xB7 ${y.length}</div>`+y.map(R=>`<div class="task"><span class="d" style="background:var(--cy)"></span><div class="n">${oe(R.titulo)}<small>mexida ${new Date(R.atualizado_em).toLocaleDateString("pt-BR")}</small></div><button class="btn" data-tf="${R.id}">Abrir</button></div>`).join("")+'<div class="row"><button class="btn" id="mdB">Setor no Meu dia</button></div>'})():""}
  <div class="row"><button class="btn ghost" id="seeB">Ver no campus</button><button class="btn ghost" id="callB">Chamar at\xE9 voc\xEA</button></div><div class="row"><button class="btn ghost" id="visB">Mudar visual</button></div>${qe?(l.tarefas.length?"":'<div class="note">Sem tarefas abertas.</div>')+'<div class="row"><button class="btn ghost" id="rmB">Tirar da equipe</button></div>':'<div class="note">Dados de exemplo. No app, o XP s\xF3 entra quando a tarefa \xE9 confirmada com evid\xEAncia.</div>'}`),qe&&En&&(document.getElementById("mdB").onclick=()=>{Oe(),En.abrirSetor(l.id)},Xe.querySelectorAll("[data-tf]").forEach(y=>y.onclick=()=>{Oe(),En.abrirTarefa(y.dataset.tf)})),qe&&(document.getElementById("rmB").onclick=()=>{let y=document.getElementById("rmB");y.dataset.ok?Kp(l):(y.dataset.ok=1,y.textContent="Toque de novo para confirmar")}),document.getElementById("visB").onclick=()=>Qa(l),document.getElementById("seeB").onclick=()=>{Oe(),l.o||Ue(l.f),setTimeout(()=>gn(l.m.g.position.clone().add(new D(7,9,11)),l.m.g.position.clone()),l.o?0:1150)},document.getElementById("callB").onclick=()=>{if(l.tennis){De(l.nome+" est\xE1 jogando"),Oe();return}let y=tt,R=y.m.g.rotation.y;Qn(l,{f:y.o?0:y.f,x:y.x+Math.sin(R)*1.4,z:y.z+Math.cos(R)*1.4,o:y.o},()=>{l.state="idle",l.timer=45,l.m.g.rotation.y=Math.atan2(tt.x-l.x,tt.z-l.z),De(l.nome+" chegou")}),De(l.nome+" est\xE1 indo at\xE9 voc\xEA"),Oe()}},uu=function(){if(qe&&dc()){En.abrir();return}let l=i[e].bots.filter(m=>m.tarefas.some(y=>!y[3]&&y[1]!=="ok"));wn(`<h2>Sua mesa</h2><div class="sub">${oe(t[e][tt.seat?.room]||"")} \xB7 o que pede a sua aten\xE7\xE3o</div>${l.map(m=>ec(m).replace(/<div class="n">/g,`<div class="n"><small>${oe(m.emo+" "+m.nome)}</small>`)).join("")||'<div class="note">Nada pendente. Bom trabalho.</div>'}<div class="row"><button class="btn ghost" id="up">Levantar</button></div>`),document.getElementById("up").onclick=()=>{Oe();let m=en(tt.f,tt.x,tt.z);Qn(tt,{f:tt.f,x:m?m.cx:tt.x,z:m?m.s*3.5:0,o:!1})}},nc=function(){let l=i[e].bots.flatMap(m=>m.tarefas.filter(y=>!y[3]));document.getElementById("nOk").textContent=l.filter(m=>m[1]==="ok").length,document.getElementById("nWa").textContent=l.filter(m=>m[1]==="wa").length,document.getElementById("nLa").textContent=l.filter(m=>m[1]==="la").length,document.getElementById("relSub").textContent=i[e].bots.length+" na equipe"},du=function(l){let m=Math.floor(n/100)+1;n+=l;let y=Math.floor(n/100)+1;Ss(),De(y>m?"N\xEDvel "+y+"!":"+"+l+" XP")},Ss=function(){let l=Math.floor(n/100)+1;document.getElementById("lv").textContent=l,document.getElementById("xpn").textContent=n,document.getElementById("xpNext").textContent="faltam "+(l*100-n)+" para o n\xEDvel "+(l+1),document.querySelector("#bar i").style.width=n%100+"%"},De=function(l){ic.textContent=l,ic.classList.add("show"),clearTimeout(fu),fu=setTimeout(()=>ic.classList.remove("show"),1300)},Ep=function(l,m){let y=l.m;if(l.state==="walk"&&l.path.length){let V=l.path[0];if(V.f!==l.f&&!V.o&&!l.o)l.f=V.f,l.x=V.x,l.z=V.z,l.path.shift();else{let nt=V.x-l.x,H=V.z-l.z,gt=Math.hypot(nt,H),Z=l.speed*m;gt<=Z?(l.x=V.x,l.z=V.z,l.o=V.o,l.f=V.o?0:V.f,l.path.shift()):(l.x+=nt/gt*Z,l.z+=H/gt*Z,y.g.rotation.y=Math.atan2(nt,H))}if(!l.path.length){l.state="idle",l.timer=6+Math.random()*8;let nt=l.then;if(l.then=null,nt&&nt(),l===tt&&tt.then2&&tt.sit){let H=tt.then2;tt.then2=null,H()}}}let R=l.state==="walk"&&l.path.length||l.manual>0;l.phase+=m*(R?l.speed*5:0);let N=R?Math.sin(l.phase)*.65:0;l.sit?(y.legs.forEach(V=>V.rotation.x=-Math.PI/2),y.body.position.y=-.4+(l.seat&&l.seat.h||0),y.arms.forEach((V,nt)=>V.rotation.x=-.9+Math.sin(mo*6+nt*2)*.08)):(y.legs[0].rotation.x=N,y.legs[1].rotation.x=-N,y.arms[0].rotation.x=-N*.8,y.arms[1].rotation.x=N*.8,y.body.position.y=R?Math.abs(Math.sin(l.phase))*.06:0),l.jump&&(l.jump=Math.max(0,l.jump-m*1.6),y.body.position.y+=Math.sin(l.jump*Math.PI)*.8),y.g.position.set(l.x,cn(l),l.z),y.g.visible=Fi(l),l.timer-=m},Tp=function(l){if(z.x+=z.vx*l,z.z+=z.vz*l,z.vx*=Math.pow(.45,l),z.vz*=Math.pow(.45,l),(z.z<lt+.3||z.z>rt-.3)&&(z.vz*=-1,z.z=os.clamp(z.z,lt+.3,rt-.3)),z.x<j+.3||z.x>ot-.3)if(Math.abs(z.z)<2.5){let m=z.x>47?0:1;Q[m]++,z.last==="kaio"&&De("Gola\xE7o!"),z.x=47,z.z=0,z.vx=z.vz=0,ve[0].el.textContent="Quadra society \xB7 "+Q[0]+" x "+Q[1]}else z.vx*=-1,z.x=os.clamp(z.x,j+.3,ot-.3);W.position.set(z.x,.22,z.z),W.rotation.x+=z.vz*l*3,W.rotation.z-=z.vx*l*3,[0,1].forEach(m=>{let y=$.filter(V=>V.team===m),R=y[0],N=1e9;y.forEach(V=>{let nt=Math.hypot(V.x-z.x,V.z-z.z);nt<N&&(N=nt,R=V)}),y.forEach(V=>{let nt=V===R?z.x-(m?-.4:.4):V.home.x+(z.x-47)*.4,H=V===R?z.z:V.home.z+z.z*.3,gt=nt-V.x,Z=H-V.z;if(Math.hypot(gt,Z)>.25?(V.state="walk",V.path=[{f:0,x:nt,z:H,o:!0}],V.speed=V===R?4.2:2.4):(V.state="idle",V.path=[],pu(V,z.x-V.x,z.z-V.z)),V===R&&N<.7&&Math.hypot(z.vx,z.vz)<4){let Ct=m?j:ot,Pt=Math.random()<.15?Ct:y[Math.floor(Math.random()*5)].x,zt=Math.random()<.35?(Math.random()-.5)*4:y[Math.floor(Math.random()*5)].z,Jt=Pt-z.x,jt=zt-z.z,Ye=Math.hypot(Jt,jt)||1,Ne=8+Math.random()*6;z.vx=Jt/Ye*Ne,z.vz=jt/Ye*Ne,z.last=m}})})},pu=function(l,m,y){l.m.g.rotation.y=Math.atan2(m,y)},Rp=function(l){let m=Ap(),y=St?null:m||Ut,R=vt-10.5;if(m||St){let Z={x:vt-13.5,z:Wt+(m&&!St?-7:7)};(St?m?[Ut,m]:[Ut]:[Ut]).forEach((Ct,Pt)=>{let zt=Z.x,Jt=Z.z+Pt*1.2;Math.hypot(Ct.x-zt,Ct.z-Jt)>.3?(Ct.state="walk",Ct.path=[{f:0,x:zt,z:Jt,o:!0}]):(Ct.state="idle",Ct.path=[],Ct.m.g.rotation.y=Math.PI/2)})}if(tt.racket||pt(tt,"#f2d84b"),tt.racket.visible=St,Ut.racket.visible=!!(!m||St),yt.t+=l/(St?1.7:1.4),yt.t>=1){if(St&&yt.dir<0){let Z=Math.hypot(tt.x-R,tt.z-yt.z1)<2.2||Math.abs(tt.z-yt.z1)<1.6&&tt.x<vt-2;Z?tt.m.arms[1].rotation.x=-2:(Gt[1]++,De("Ponto do advers\xE1rio")),Z||(yt.z1=Wt)}St&&yt.dir>0&&Math.random()<.18&&(Gt[0]++,De("Ponto seu!")),ve[1].el.textContent=St?"T\xEAnis \xB7 Voc\xEA "+Gt[0]+" x "+Gt[1]:"Quadra de t\xEAnis",yt.t=0,yt.dir*=-1,yt.z0=yt.z1,yt.z1=Wt+(Math.random()-.5)*(St?7:8)}let N=vt-10.5,V=vt+10.5,nt=yt.dir>0?N+(V-N)*yt.t:V-(V-N)*yt.t,H=yt.z0+(yt.z1-yt.z0)*yt.t;Zt.position.set(nt,.3+Math.sin(yt.t*Math.PI)*2.4,H);let gt=(Z,mt,Ct)=>{if(!Z)return;let Pt=yt.dir===Ct?yt.z1:Z.z,zt=Pt-Z.z;Math.abs(zt)>.2?(Z.state="walk",Z.path=[{f:0,x:mt,z:Pt,o:!0}]):(Z.state="idle",Z.path=[]),pu(Z,-Ct*-1*Ct,0),Z.m.g.rotation.y=Ct>0?Math.PI/2:-Math.PI/2,Z.m.arms[1].rotation.x=yt.t>.85&&yt.dir===Ct?-2:-.4};gt(y,N,-1),gt(At,V,1)},Cp=function(l){l.state!=="walk"&&l.timer<=0&&(l.state="walk",l.path=[{f:0,x:ht+(Math.random()-.5)*36,z:_t+(Math.random()-.5)*44,o:!0}],l.timer=4+Math.random()*6)},mu=function(){let l=innerWidth,m=innerHeight;o.setSize(l,m,!1),c.aspect=l/m,c.fov=l<m?55:42,c.updateProjectionMatrix()},Pp=function(l,m,y,R,N,V,nt,H){let gt=(y-l)*(H-V)-(R-m)*(nt-N);if(Math.abs(gt)<1e-9)return!1;let Z=((N-l)*(H-V)-(V-m)*(nt-N))/gt,mt=((N-l)*(R-m)-(V-m)*(y-l))/gt;return Z>=0&&Z<=1&&mt>=0&&mt<=1},_u=function(l,m,y,R,N){let V=R-m,nt=N-y,H=Math.hypot(V,nt)||1,gt=R+V/H*.35,Z=N+nt/H*.35;return gu[l].some(mt=>Pp(m,y,gt,Z,mt[0],mt[1],mt[2],mt[3]))},yu=function(l){let m=ki.getBoundingClientRect(),y=m.left+m.width/2,R=m.top+m.height/2,N=l.clientX-y,V=l.clientY-R,nt=Math.hypot(N,V),H=m.width/2-8;nt>H&&(N*=H/nt,V*=H/nt),ti.x=N/H,ti.y=V/H,vu.style.transform=`translate(${N}px,${V}px)`},pr=function(){re=!0;let l=tt.m.g.position;!tt.o&&He!==tt.f&&Ue(tt.f,!0),tt.o&&He<0;let m=innerWidth<innerHeight;gn(l.clone().add(new D(m?9:12,m?15:11,m?13:16)),l.clone().add(new D(0,1,0)),.8),sc.copy(l),document.getElementById("fol").classList.add("on")},Lp=function(l){let m=ti.x,y=ti.y;($n.w||$n.arrowup)&&(y=-1),($n.s||$n.arrowdown)&&(y=1),($n.a||$n.arrowleft)&&(m=-1),($n.d||$n.arrowright)&&(m=1);let R=Math.min(1,Math.hypot(m,y));if(tt.manual=0,R>.12){re||pr(),(tt.sit||tt.state==="walk")&&(tt.seat&&(tt.seat.who=null,tt.seat=null),tt.sit=!1,tt.path=[],tt.state="idle",tt.then=null,tt.then2=null);let N=h.target.x-c.position.x,V=h.target.z-c.position.z,nt=Math.hypot(N,V)||1,H={x:N/nt,z:V/nt},gt={x:-H.z,z:H.x},Z=H.x*-y+gt.x*m,mt=H.z*-y+gt.z*m,Ct=Math.hypot(Z,mt)||1,Pt=4.6*R*l,zt=tt.x+Z/Ct*Pt,Jt=tt.z+mt/Ct*Pt,jt=tt.o?0:tt.f,Ye=tt.o?jt===0:!0,Ne=(ws,mc)=>(tt.o||tt.f===0?!_u(0,tt.x,tt.z,ws,mc):!_u(jt,tt.x,tt.z,ws,mc))?(tt.x=ws,tt.z=mc,!0):!1;if(Ne(zt,Jt)||Ne(zt,tt.z)||Ne(tt.x,Jt),tt.o||tt.f===0){let ws=!Ip(tt.x,tt.z);ws!==tt.o&&(tt.o=ws,tt.f=0)}St&&(!tt.o||tt.x>vt+1||tt.x<vt-17||Math.abs(tt.z-Wt)>10)&&(St=!1,ve[1].el.textContent="Quadra de t\xEAnis"),tt.m.g.rotation.y=Math.atan2(Z,mt),tt.manual=R,tt.state="idle",tt.timer=99}if(re){let N=tt.m.g.position,V=N.clone().sub(sc);pe.on?(pe.p1.add(V),pe.t1.add(V)):(c.position.add(V),h.target.add(V)),sc.copy(N),!tt.o&&He!==tt.f&&Ue(tt.f,!0)}},Up=function(l,m){return l.o&&m.o||!l.o&&!m.o&&l.f===m.f},Mu=function(){let l=null,m=tt;if(m.m.g.visible)if(m.sit)l=m.seat&&m.seat.room==="ia"?{t:"Usar o Jarvis",fn:Su}:m.seat&&m.seat.room==="arquibancada"?{t:"Levantar",fn:cc}:{t:"Levantar",fn:cc};else{let y=[...Ze,...ei].find(R=>Up(R,m)&&ac(R,m.x,m.z,2.4));if(y)l={t:(y.pessoa?"Falar com ":"Conversar com ")+y.nome,fn:()=>{Np(y),y.pessoa?hc(y):bi(y,!0)}};else if(m.o&&Math.hypot(z.x-m.x,z.z-m.z)<1.8)l={t:"Chutar a bola",fn:Op};else if(St)l={t:"Parar de jogar",fn:()=>{St=!1,ve[1].el.textContent="Quadra de t\xEAnis"}};else if(m.o&&m.x>vt-15&&m.x<vt&&Math.abs(m.z-Wt)<8)l={t:"Jogar t\xEAnis",fn:()=>{St=!0,Gt[0]=Gt[1]=0,tt.x=vt-10.5,tt.z=Wt,pr(),De("Ande at\xE9 a bolinha para rebater")}};else if(!m.o&&ac(m,0,-.6,2))l={t:"Elevador",fn:kp};else{let R=Yt.filter(N=>!N.who&&(N.o?m.o:!m.o&&N.f===m.f)&&ac(N,m.x,m.z,1.6)).sort((N,V)=>Math.hypot(N.x-m.x,N.z-m.z)-Math.hypot(V.x-m.x,V.z-m.z))[0];R&&(l={t:R.room==="ia"?"Sentar no Jarvis":R.room==="arquibancada"?"Sentar e assistir":"Sentar",fn:()=>{mn(tt,R),tt.then2=R.room==="ia"?Su:R.room==="arquibancada"?Fp:uu}})}}oc=l,rc.style.display=l?"":"none",l&&(rc.textContent=l.t)},cc=function(){Oe();let l=tt.seat;l&&(l.who=null,tt.seat=null),tt.sit=!1,tt.state="idle",l&&(tt.x+=Math.sin(l.ry)*.9,tt.z+=Math.cos(l.ry)*.9)},Np=function(l){l.sit||(l.m.g.rotation.y=Math.atan2(tt.x-l.x,tt.z-l.z)),tt.m.g.rotation.y=Math.atan2(l.x-tt.x,l.z-tt.z),l.state==="idle"&&(l.timer=Math.max(l.timer,8))},Op=function(){let l=tt.m.g.rotation.y;z.vx=Math.sin(l)*15,z.vz=Math.cos(l)*15,z.last="kaio",tt.m.arms[0].rotation.x=-1.2},Fp=function(){re=!1,document.getElementById("fol").classList.remove("on"),gn(new D(47,9,rt+13),new D(47,0,0),1.2),De("Bom jogo!")},kp=function(){wn(`<h2>Elevador</h2><div class="sub">Para qual andar?</div><div class="row">${["T\xE9rreo","1\xBA andar","2\xBA andar"].map((l,m)=>`<button class="btn ${m===tt.f?"ghost":""}" data-el="${m}">${l}</button>`).join("")}</div>`),Xe.querySelectorAll("[data-el]").forEach(l=>l.onclick=()=>{let m=+l.dataset.el;Oe(),tt.f=m,tt.o=!1,tt.x=0,tt.z=.4,Ue(m,!0),pr()})},Bp=function(l){!l||l.pessoa||go.has(l.sala)||(go.add(l.sala),!bu&&go.size>=5&&(bu=!0,setTimeout(()=>du(50),600)))},Su=function(){let l=i[e].bots,m=l.flatMap(y=>y.tarefas.map((R,N)=>({b:y,t:R,i:N})).filter(R=>!R.t[3]&&R.t[1]==="la"));wn(`<h2>Central Jarvis</h2><div class="sub">Vis\xE3o geral de ${oe(i[e].nome)} agora</div>`+l.map(y=>{let R=y.tarefas.filter(V=>!V[3]),N=V=>R.filter(nt=>nt[1]===V).length;return`<div class="task"><span class="d" style="background:${tc[y.st]}"></span><div class="n">${oe(y.emo+" "+y.nome)}<small>${N("la")} atrasadas \xB7 ${N("wa")} chegando \xB7 ${N("ok")} no prazo</small></div></div>`}).join("")+`<div class="row"><button class="btn" id="cobrar" ${m.length?"":"disabled"}>Cobrar atrasados (${m.length})</button><button class="btn ghost" id="up">Levantar</button></div><div class="note">Exemplo. No app real o Jarvis manda a cobran\xE7a pelo canal de cada bot.</div>`),document.getElementById("up").onclick=cc,document.getElementById("cobrar").onclick=()=>{let y=[...new Set(m.map(R=>R.b.nome))].join(", ");De("Cobran\xE7a enviada"),Xe.querySelector(".note").textContent="Jarvis cobrou: "+y+"."}},mr=function(){ei.forEach(l=>{C.remove(l.m.g),l.seat&&(l.seat.who=null),$t.splice($t.indexOf(l),1),l.tag.remove()}),ei=[],_o().forEach((l,m)=>{let y=yi(l.sala)||yi("foco");if(!y)return;let R=Mn({pessoa:!0,staff:!0,nome:l.nome,papel:l.papel,sala:l.sala,o:!1,f:y.f,x:y.x,z:y.z,speed:1.5,look:{shirt:T[m%6],skin:Pe[m%5],pants:"#1f2937",hair:["#1c1917","#78350f","#facc15"][m%3]}});R.seat=y,y.who=R,R.sit=!0,R.state="sit",R.timer=30+Math.random()*60,R.m.g.rotation.y=y.ry,R.home=y,R.pid=l.id;let N=document.createElement("div");N.className="tag pes",N.innerHTML="<i></i>",N.append(l.nome),N.onclick=V=>{V.stopPropagation(),hc(R)},_e.appendChild(N),R.tag=N,ei.push(R)})},Gp=function(){Xe.insertAdjacentHTML("beforeend",'<div class="row"><button class="btn" id="addP">Adicionar pessoa</button></div>'),document.getElementById("addP").onclick=Wp,ei.forEach(l=>{}),ei.length&&Xe.insertAdjacentHTML("beforeend",'<div class="sub" style="margin-top:14px">Pessoas</div>'+ei.map(l=>`<div class="bot" data-pid="${oe(l.pid)}"><div class="av" style="background:#ffffff14">\u{1F464}</div><div class="n" style="flex:1"><b>${oe(l.nome)}</b><small style="display:block;color:var(--mut)">${oe(l.papel||"")} \xB7 ${oe(t[e][l.sala]||"")}</small></div></div>`).join("")),Xe.querySelectorAll("[data-pid]").forEach(l=>l.onclick=()=>hc(ei.find(m=>m.pid===l.dataset.pid)))},Wp=function(){wn(`<h2>Adicionar pessoa</h2><div class="sub">Ela ganha uma mesa no campus</div>
  <form id="fp" class="form"><label>Nome<input id="pn" required maxlength="30" autocomplete="off"></label><label>Fun\xE7\xE3o<input id="pr" maxlength="40" placeholder="ex.: Secret\xE1ria" autocomplete="off"></label>
  <label>Sala<select id="ps">${Vp().map(l=>`<option value="${l}">${oe(t[e][l])}</option>`).join("")}</select></label><div class="row"><button class="btn" type="submit">Adicionar</button></div></form>
  <div class="note">Por enquanto fica s\xF3 neste aparelho. Para a pessoa entrar de verdade, o pr\xF3ximo passo \xE9 o convite por e-mail ligado ao banco.</div>`),document.getElementById("fp").onsubmit=l=>{l.preventDefault();let m=document.getElementById("pn").value.trim();if(!m)return;let y=_o();y.push({id:Date.now().toString(36),nome:m,papel:document.getElementById("pr").value.trim(),sala:document.getElementById("ps").value}),lc(y),mr(),Oe(),De(m+" entrou na equipe")}},hc=function(l){l&&(wn(`<h2>\u{1F464} ${oe(l.nome)}</h2><div class="sub">${oe(l.papel||"Equipe")} \xB7 ${oe(t[e][l.sala]||"")}</div><div class="say">\u201COi! Ainda n\xE3o tenho tarefas aqui no Jarvis.\u201D</div><div class="row"><button class="btn ghost" id="rmP">Remover da equipe</button></div>`),document.getElementById("rmP").onclick=()=>{lc(_o().filter(m=>m.id!==l.pid)),mr(),Oe()})},dc=function(){return!En&&Fe&&(En=bp(Fe,{onXP:l=>{n=l,Ss()},onChange:l=>{let m=document.getElementById("mdN");m&&(m.textContent=l.tarefas+l.agenda);let y=document.getElementById("mdTopN");y&&(y.textContent=l.agenda+l.notion||"")},onClose:()=>{qe&&Ru().then(()=>{let l=i[e]?.bots||[];Ze.forEach(m=>{let y=l.find(R=>R.id===m.id);y&&(m.tarefas=y.tarefas,m.st=y.st,m.tag&&(m.tag.className="tag "+{ok:"",wa:"warn",la:"late"}[y.st]))}),nc(),Ss()}).catch(()=>{})}})),En},vo=function(l,m){if(gr.innerHTML="",gr.append(l),m){let y=document.createElement("button");y.textContent=m.t,y.onclick=m.fn,gr.append(y)}gr.style.display=""},fc=function(l,m){return Promise.race([l,new Promise((y,R)=>setTimeout(()=>R(new Error("tempo esgotado")),m))])},Cu=function(){let l=document.getElementById("offices");l.innerHTML="";for(let[m,y]of Object.entries(i)){let R=document.createElement("button");if(R.className=m===e?"on":"",y.kind==="escola"||m==="escola"){let N=document.createElement("img");N.src="logo.png",N.alt="",N.style.cssText="height:18px;vertical-align:-4px;margin-right:6px",R.append(N)}R.append(y.nome),R.onclick=()=>{m!==e&&(e=m,Cu(),Oe(),Ms())},l.append(R)}},jp=function(){wn('<h2>Entrar no Jarvis</h2><div class="sub">Mandamos um c\xF3digo para o seu e-mail</div><form id="lf" class="form"><label>E-mail<input id="le" type="email" required autocomplete="email" inputmode="email"></label><div class="row"><button class="btn" type="submit">Enviar c\xF3digo</button></div></form><div class="note" id="lmsg"></div>'),document.getElementById("lf").onsubmit=async l=>{l.preventDefault();let m=document.getElementById("le").value.trim(),y=document.getElementById("lmsg");y.textContent="Enviando\u2026";let R=await Fe.auth.signInWithOtp({email:m,options:{shouldCreateUser:!1}});if(R.error){y.textContent="N\xE3o deu: "+R.error.message;return}Xe.innerHTML=`<h2>Digite o c\xF3digo</h2><div class="sub">Enviado para ${oe(m)}</div><form id="cf" class="form"><label>C\xF3digo<input id="cc" inputmode="numeric" autocomplete="one-time-code" required maxlength="10"></label><div class="row"><button class="btn" type="submit">Entrar</button></div></form><div class="note" id="cmsg"></div>`,document.getElementById("cf").onsubmit=async N=>{N.preventDefault();let V=document.getElementById("cmsg");V.textContent="Conferindo\u2026";let nt=await Fe.auth.verifyOtp({email:m,token:document.getElementById("cc").value.replace(/\s/g,""),type:"email"});if(nt.error){V.textContent="C\xF3digo n\xE3o confere: "+nt.error.message;return}Au=nt.data.session,Oe(),De("Bem-vindo, Kaio"),_r()}}},Zp=function(){let l=[...new Set(Yt.filter(y=>y.scr&&!y.kaio).map(y=>y.room)),"diretoria"];wn(`<h2>Adicionar \xE0 equipe</h2><div class="sub">${oe(i[e].nome)}</div>
  <form id="fa" class="form"><label>Tipo<select id="at"><option value="bot">Agente de IA</option><option value="pessoa">Pessoa</option></select></label>
  <label>Nome<input id="an" required maxlength="40" autocomplete="off" placeholder="ex.: Criadora de conte\xFAdo"></label>
  <label>Fun\xE7\xE3o<input id="ap" maxlength="80" autocomplete="off" placeholder="ex.: posts e v\xEDdeos da rematr\xEDcula"></label>
  <label>Sala<select id="as">${l.map(y=>`<option value="${y}" ${y==="marketing"?"selected":""}>${oe(t[e][y]||y)}</option>`).join("")}</select></label>
  <label id="amw">Especialidade (biblioteca de agentes)<select id="am"><option value="">Nenhuma</option>${uc.map(y=>`<option value="${oe(y.slug)}">${oe((y.emoji||"")+" "+y.nome)}</option>`).join("")}</select></label>
  <div class="row"><button class="btn" type="submit">Adicionar</button></div></form><div class="note" id="amsg">${qe?"Fica salvo no banco e aparece em todos os seus aparelhos.":"Modo demonstra\xE7\xE3o: fica s\xF3 neste aparelho."}</div>`);let m=document.getElementById("at");m.onchange=()=>document.getElementById("amw").style.display=m.value==="bot"?"":"none",document.getElementById("fa").onsubmit=async y=>{y.preventDefault();let R=document.getElementById("an").value.trim();if(!R)return;let N=m.value,V=document.getElementById("ap").value.trim(),nt=document.getElementById("as").value,H=document.getElementById("am").value||null;if(!qe){let Z=_o();Z.push({id:Date.now().toString(36),nome:R,papel:V,sala:nt}),lc(Z),mr(),Oe(),De(R+" entrou na equipe");return}document.getElementById("amsg").textContent="Salvando\u2026";let gt=await Fe.rpc("campus_criar_agente",{p_escritorio:e,p_nome:R,p_sala:nt,p_papel:V||null,p_tipo:N,p_emoji:null,p_modelo:N==="bot"?H:null,p_cor:T[yo(R)%6]});if(gt.error){document.getElementById("amsg").textContent="N\xE3o salvou: "+gt.error.message;return}Oe(),De(R+" entrou na equipe"),await _r()}},Pu=function(){let l=Math.min(wp.getDelta(),.05);if(mo+=l,pe.on){pe.t+=l/pe.d;let y=pe.t>=1?1:1-Math.pow(1-pe.t,3);c.position.lerpVectors(pe.p0,pe.p1,y),h.target.lerpVectors(pe.t0,pe.t1,y),pe.t>=1&&(pe.on=!1)}Lp(l),h.update(),Tp(l),Rp(l);for(let y of $t)y.wander&&Cp(y),w(y),Ep(y,l);M(l),bt.visible=at.visible||P.phase!=="pousado",I.forEach(y=>{y.g.position.x+=y.d*y.v*l,y.g.position.x>120&&(y.g.position.x=-120),y.g.position.x<-120&&(y.g.position.x=120)}),Lt.forEach((y,R)=>y.rotation.x=Math.sin(mo*2+R)*.5),C.traverse,Dt[2].children.forEach(y=>{y.userData.spin&&(y.rotation.y+=l,y.position.y=2.2+Math.sin(mo*2)*.15)}),Yt.forEach(y=>{y.scr&&(y.scr.material=y.who?Qp:tm)});let m=c.position.distanceTo(h.target);Ze.forEach(y=>fe(y.tag,y.m.g.position.clone().setY(y.m.g.position.y+(y.sit?2.1:2.5)),y.m.g.visible)),fe(tt.tag,tt.m.g.position.clone().setY(tt.m.g.position.y+(tt.sit?2.1:2.5)),tt.m.g.visible),Te.forEach(y=>kt(y.el,y.pos,He===y.f&&m<70)),ve.forEach(y=>kt(y.el,y.pos,He<0||m>60||re)),++Dp%6===0&&Mu(),ei.forEach(y=>fe(y.tag,y.m.g.position.clone().setY(y.m.g.position.y+(y.sit?2.1:2.5)),y.m.g.visible)),o.render(a,c),requestAnimationFrame(Pu)},i={escola:{nome:"Escola Prosperi",placa:"ESCOLA PROSPERI",kind:"escola",bots:[{id:"zeus",nome:"Zeus",emo:"\u26A1",cor:"#facc15",sala:"diretoria",st:"ok",papel:"Dire\xE7\xE3o geral",tarefas:[["Aprovar or\xE7amento de material 2027","ok",30],["Revisar contratos de fornecedores","wa",20]]},{id:"jarvis",nome:"Jarvis",emo:"\u{1F916}",cor:"#22d3ee",sala:"ia",st:"ok",papel:"Central de IA \xB7 resumo das 5h40",tarefas:[["Resumo falado das 5h40","ok",10],["Cobrar quem est\xE1 atrasado","ok",10]]},{id:"plutus",nome:"Plutus",emo:"\u{1F4B0}",cor:"#22c55e",sala:"financeiro",st:"la",papel:"Financeiro",tarefas:[["Conferir boletos vencidos","la",30],["Fechar caixa da semana","wa",20],["Lan\xE7ar notas no TecSof","ok",10]]},{id:"hermes",nome:"Hermes",emo:"\u{1F4E3}",cor:"#f97316",sala:"marketing",st:"wa",papel:"Marketing e comercial",tarefas:[["Post de rematr\xEDcula no Instagram","wa",20],["Fechar sistema da Rabbit (sexta)","ok",20]]},{id:"remat",nome:"Rematr\xEDculas",emo:"\u{1F392}",cor:"#ef4444",sala:"secretaria",st:"la",papel:"Secretaria",tarefas:[["Ligar para 5 fam\xEDlias pendentes","la",30],["Separar contratos assinados","ok",10]]},{id:"demeter",nome:"Dem\xE9ter & Atena",emo:"\u{1F3DB}\uFE0F",cor:"#a78bfa",sala:"coord",st:"ok",papel:"Coordena\xE7\xE3o pedag\xF3gica",tarefas:[["Revisar planejamento do 6\xBA ano","ok",20],["Curadoria liter\xE1ria 2027","wa",20]]},{id:"manut",nome:"Manuten\xE7\xE3o",emo:"\u{1F527}",cor:"#94a3b8",sala:"operacoes",st:"wa",papel:"Manuten\xE7\xE3o e servi\xE7os gerais",tarefas:[["Trocar l\xE2mpadas do corredor","wa",10],["Or\xE7amento da fachada","ok",20]]}]},pessoal:{nome:"Pessoal",placa:"KAIO \xB7 PESSOAL",kind:"pessoal",bots:[{id:"jarvis",nome:"Jarvis",emo:"\u{1F916}",cor:"#22d3ee",sala:"ia",st:"ok",papel:"Central de IA",tarefas:[["Resumo falado das 5h40","ok",10]]},{id:"apolo",nome:"Apolo & Cronos",emo:"\u{1F9ED}",cor:"#60a5fa",sala:"coord",st:"wa",papel:"Agenda e rotina",tarefas:[["Planejar a semana","wa",20],["Revisar h\xE1bitos do m\xEAs","ok",10]]},{id:"jordan",nome:"Jordan Belfort",emo:"\u{1F4C8}",cor:"#22c55e",sala:"financeiro",st:"ok",papel:"Investimentos",tarefas:[["Revisar carteira","ok",20]]},{id:"jubileu",nome:"Jubileu",emo:"\u231A",cor:"#eab308",sala:"marketing",st:"wa",papel:"Rel\xF3gios",tarefas:[["Avaliar rel\xF3gio anunciado","wa",20]]},{id:"dumont",nome:"Santos Dumont",emo:"\u2708\uFE0F",cor:"#38bdf8",sala:"operacoes",st:"la",papel:"Avia\xE7\xE3o \xB7 aulas de PP",tarefas:[["Revisar mat\xE9ria da \xFAltima aula","la",20]]},{id:"federer",nome:"Federer",emo:"\u{1F3BE}",cor:"#a3e635",sala:"tenis",st:"ok",papel:"T\xEAnis e esporte",tarefas:[["Treino de t\xEAnis 18h","ok",20]]}]}},t={escola:{bib:"Biblioteca",coord:"Coordena\xE7\xE3o pedag\xF3gica",cafe:"Refeit\xF3rio & caf\xE9",secretaria:"Secretaria",lobby:"Recep\xE7\xE3o",prof:"Sala dos professores",financeiro:"Financeiro",reuniao:"Sala de reuni\xE3o",lounge:"Lounge",marketing:"Marketing & comercial",foco:"Ilha de foco",operacoes:"Manuten\xE7\xE3o & opera\xE7\xF5es",diretoria:"Diretoria",conselho:"Sala do conselho",ia:"Jarvis \xB7 Central de IA",deck:"Terra\xE7o"},pessoal:{bib:"Biblioteca",coord:"Agenda & rotina",cafe:"Cozinha & caf\xE9",secretaria:"Casa & documentos",lobby:"Entrada",prof:"Est\xFAdio",financeiro:"Investimentos",reuniao:"Sala de reuni\xE3o",lounge:"Lounge",marketing:"Rel\xF3gios",foco:"Ilha de foco",operacoes:"Avia\xE7\xE3o",diretoria:"Seu escrit\xF3rio",conselho:"Sala de projetos",ia:"Jarvis \xB7 Central de IA",deck:"Terra\xE7o"}},e="escola",n=220,s=document.getElementById("c"),r=/iPhone|iPad|Android/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&innerWidth<900,o=new aa({canvas:s,antialias:!0,powerPreference:"default"});o.setPixelRatio(Math.min(devicePixelRatio,2)),s.addEventListener("webglcontextlost",l=>{l.preventDefault();let m=document.createElement("div");m.id="load",m.innerHTML='<div style="padding:24px;text-align:center">O 3D foi pausado pelo aparelho (mem\xF3ria).<br><button onclick="location.reload()" style="margin-top:12px;padding:10px 18px;border-radius:12px;border:0;font-weight:700">Recarregar</button></div>',document.body.appendChild(m)}),o.shadowMap.enabled=!0,o.shadowMap.type=xh,o.toneMapping=bh,o.toneMappingExposure=1.05;let a=new la;a.background=new le("#a9dcf7"),a.fog=new ca("#a9dcf7",180,420);let c=new tn(42,1,.5,900);c.position.set(95,80,142);let h=new Ya(c,s);h.target.set(4,0,16),h.enableDamping=!0,h.dampingFactor=.08,h.maxPolarAngle=1.35,h.minDistance=7,h.maxDistance=260,h.screenSpacePanning=!1,a.add(new _a("#dff3ff","#6b8f4e",1.1));let u=new xa("#fff4e0",2.4);u.position.set(60,110,45),u.castShadow=!0,u.shadow.mapSize.set(r?1024:2048,r?1024:2048),Object.assign(u.shadow.camera,{left:-110,right:110,top:110,bottom:-110,near:10,far:320}),u.shadow.bias=-4e-4,u.shadow.normalBias=.04,a.add(u);let f={},d=(l,m={})=>{let y=l+JSON.stringify(m);return f[y]||(f[y]=new Li({color:l,roughness:.85,...m}))},p=new pi(1,1,1),E=[],T=["#7b5aa6","#3a8fd6","#a6cf4a","#ef8b3b","#e3423b","#f2d84b"],b=new Image,k=new rn(b);k.colorSpace=Qe;let L=[];b.onload=()=>{k.needsUpdate=!0,L.forEach(l=>l())},b.src="logo.png";let C=new Ae;a.add(C);let A=_(C,520,520,"#7fc35d",0,0,0);A.userData.ground=!0,E.push(A),_(C,240,14,"#3b3f46",0,.02,70);for(let l=-115;l<120;l+=9)_(C,4,.35,"#f5f5f4",l,.04,70);_(C,240,3,"#d6d3d1",0,.03,61.5),_(C,240,3,"#d6d3d1",0,.03,78.5);let S=-2,O=44;_(C,52,24,"#4b5058",S,.025,O);for(let l=0;l<10;l++)_(C,.2,7,"#f5f5f4",S-22.5+l*5,.04,O-6.5),_(C,.2,7,"#f5f5f4",S-22.5+l*5,.04,O+6.5);_(C,8,8,"#4b5058",S,.026,O+16);let Y=["#e3423b","#f8fafc","#1e293b","#3a8fd6","#a3a3a3","#f2d84b","#7b5aa6","#a6cf4a"];for(let l=0;l<9;l++)l%3!==1&&K(C,S-20+l*5,O-6.5,Math.PI/2,Y[l%8]),l%4!==2&&K(C,S-20+l*5,O+6.5,-Math.PI/2,Y[(l+3)%8]);let I=[0,1,2,3].map(l=>({g:K(C,-100+l*60,l%2?73:67,l%2?0:Math.PI,Y[(l+1)%8]),d:l%2?1:-1,v:9+l*2}));[["#7b5aa6",-30],["#3a8fd6",-15],["#a6cf4a",0],["#ef8b3b",15],["#e3423b",30]].forEach(([l,m])=>{_(C,10,6,"#6aa84f",m,.03,-30);for(let y=0;y<6;y++){let R=new Ht(new mi(.45,0),d(l,{flatShading:!0}));R.position.set(m-3.5+y*1.4,.4,-30+(y%2?1.2:-1.2)),C.add(R)}});let F=["#4ade80","#22c55e","#65a30d","#86efac"];for(let l=-110;l<115;l+=11)B(l,-48,1),Math.abs(l+2)>8&&B(l,59,1),B(l+5,82,1.1);for(let l=-46;l<60;l+=10)B(-96,l,1.2),B(96,l,1.2);_(C,30,12,"#e7e5e4",0,.03,20),[-11.5,11.5].forEach(l=>{_(C,3.2,8,"#e7e5e4",l,.03,29);for(let m=0;m<4;m++)_(C,2.6,.45,"#f8fafc",l,.045,33.2+m*1.1)}),_(C,70,3.4,"#e7e5e4",-48,.03,20),_(C,64,3.4,"#e7e5e4",42,.03,20),_(C,3.4,60,"#e7e5e4",-30,.03,-8);let it=new Ht(new Cn(16,2.5),new Rn({map:U("ESCOLA PROSPERI","",{bg:"#ffffff"}),toneMapped:!1}));v(C,17,3.1,.6,"#ffffff",0,0,27.5);for(let l=0;l<5;l++)v(C,17/5,.35,.62,T[l],-6.8+l*3.4,0,27.5);it.position.set(0,1.75,27.85),C.add(it);for(let l=-12;l<=12;l+=6)if(l){x(C,.6,.7,.7,"#a8a29e",l,0,15.8);let m=new Ht(new mi(.75,0),d(T[(l/6+2+5)%5|0],{flatShading:!0}));m.position.set(l,1.2,15.8),C.add(m)}let q=4.2,ct=44,et=26,ft=-22,It=22,Nt=-13,J=13,dt=l=>l*q+.3,Dt=[0,1,2].map(()=>{let l=new Ae;return C.add(l),l}),at=new Ae;C.add(at);let Bt=new Li({color:"#bfe6ff",transparent:!0,opacity:.22,roughness:.05,metalness:.2,depthWrite:!1}),Xt=new Li({color:"#e0f2fe",transparent:!0,opacity:.28,roughness:.05,depthWrite:!1}),se="#e5e7eb",Yt=[],he=[[],[],[]],Te=[],X=[[{k:"bib",x0:-22,x1:-12,s:-1,t:"lib",c:"#d6b48a"},{k:"coord",x0:-12,x1:-3,s:-1,t:"desks",c:"#c7d2fe"},{k:"cafe",x0:3,x1:22,s:-1,t:"cafe",c:"#e8c9a0"},{k:"secretaria",x0:-22,x1:-4,s:1,t:"desks",c:"#fde2c4"},{k:"lobby",x0:-4,x1:4,s:1,t:"lobby",c:"#ececec",open:!0},{k:"prof",x0:4,x1:22,s:1,t:"lounge",c:"#d9f99d"}],[{k:"financeiro",x0:-22,x1:-3,s:-1,t:"desks",c:"#bbf7d0"},{k:"reuniao",x0:3,x1:13,s:-1,t:"meet",c:"#ddd6fe"},{k:"lounge",x0:13,x1:22,s:-1,t:"lounge",c:"#fecdd3"},{k:"marketing",x0:-22,x1:-6,s:1,t:"desks",c:"#fed7aa"},{k:"foco",x0:-6,x1:6,s:1,t:"bench",c:"#e0f2fe"},{k:"operacoes",x0:6,x1:22,s:1,t:"desks",c:"#e5e7eb"}],[{k:"diretoria",x0:-22,x1:-3,s:-1,t:"dir",c:"#d6b48a"},{k:"conselho",x0:3,x1:22,s:-1,t:"meet",c:"#c7d2fe"},{k:"ia",x0:-22,x1:-6,s:1,t:"ai",c:"#0f2a33"},{k:"deck",x0:-6,x1:22,s:1,t:"deck",c:"#b07b4f",open:!0}]];for(let l=0;l<3;l++){let m=Dt[l],y=dt(l);m.position.y=y;let R=v(m,ct+.6,.3,et+.6,["#f2d84b","#3a8fd6","#a6cf4a"][l],0,-.3,0);R.userData.floor=l,E.push(R),_(m,ct,3,"#e5e7eb",0,.012,0),v(m,6,2.8,.3,"#cbd5e1",0,0,-1.65),v(m,.3,2.8,11.4,"#cbd5e1",-3,0,-7.3),v(m,.3,2.8,11.4,"#cbd5e1",3,0,-7.3),v(m,6,2.8,.3,"#cbd5e1",0,0,Nt+.15),_(m,5.6,11,"#94a3b8",0,.02,-7.3),v(m,1.6,2.4,.05,"#64748b",0,0,-1.47,{cast:!1});for(let H=0;H<8;H++)v(m,2.4,.25*(H+1),.9,"#e2e8f0",-1.4,0,-11.5+H*.9);for(let H of X[l]){let gt=H.s<0?Nt:1.5,Z=H.s<0?-1.5:J,mt=(H.x0+H.x1)/2;_(m,H.x1-H.x0-.1,Z-gt-.1,H.c,mt,.015,(gt+Z)/2),he[l].push({...H,zA:gt,zB:Z,cx:mt});let Ct=H.s<0?-1.5:1.5,Pt=(H.x1-H.x0-1.8)/2;if(!H.open){let zt=T[(Math.round(mt)+l*3+20)%5];v(m,.16,2.75,.22,zt,mt-.95,0,Ct),v(m,.16,2.75,.22,zt,mt+.95,0,Ct),v(m,2.06,.22,.22,zt,mt,2.6,Ct),_(m,1.7,1.4,zt,mt,.02,Ct+(H.s<0?-.75:.75)).material=d(zt,{transparent:!0,opacity:.45})}H.open||(v(m,Pt,2.6,.08,Xt,H.x0+Pt/2,0,Ct,{cast:!1}),v(m,Pt,2.6,.08,Xt,H.x1-Pt/2,0,Ct,{cast:!1}),v(m,H.x1-H.x0,.08,.12,se,mt,2.6,Ct)),H.x0>ft+.1&&!(l===0&&H.k==="lobby")&&v(m,.08,2.6,Z-gt,Xt,H.x0,0,(gt+Z)/2,{cast:!1}),Ee(m,l,H),Te.push({k:H.k,f:l,pos:new D(mt,y+3,(gt+Z)/2)})}let N=q-.3,V=(H,gt,Z,mt)=>{let Ct=new Ht(p,Bt);Ct.scale.set(H,N,.06),Ct.position.set(gt,N/2,Z),Ct.rotation.y=mt,m.add(Ct)};l===0?(V(18,-13,J,0),V(18,13,J,0)):l===2?V(16,-14,J,0):V(ct,0,J,0),V(ct,0,Nt,0),V(et,ft,0,Math.PI/2),V(et,It,0,Math.PI/2);let nt=l;for(let H=ft;H<=It;H+=2.2){let gt=T[nt++%5];!(l===0&&Math.abs(H)<4)&&!(l===2&&H>-6)&&v(m,.22,N,.3,gt,H,0,J+.1),v(m,.22,N,.3,gt,H,0,Nt-.1)}for(let H=Nt;H<=J;H+=2.2){let gt=T[nt++%5];v(m,.3,N,.22,gt,ft-.1,0,H),v(m,.3,N,.22,gt,It+.1,0,H)}l===2&&(v(m,28,1.1,.08,Bt,8,0,J,{cast:!1}),v(m,28,.08,.12,se,8,1.1,J))}{let l=dt(3);at.position.y=l,v(at,ct+.6,.3,et+.6,"#e2e8f0",0,-.3,0);for(let R=0;R<5;R++){let N=(ct+.6)/5,V=ft-.3+N*(R+.5);v(at,N,.9,.3,T[R],V,0,Nt-.15),v(at,N,.9,.3,T[4-R],V,0,J+.15)}v(at,.3,.9,et,T[1],ft-.15,0,0),v(at,.3,.9,et,T[3],It+.15,0,0);for(let R=-19;R<-3;R+=2.4)for(let N=-10;N<=-3;N+=2.6){let V=v(at,2,.08,1.4,d("#1e3a8a",{metalness:.4,roughness:.3}),R,.6,N);V.rotation.x=-.3}_(at,22,10,"#b07b4f",9,.02,5);for(let R=0;R<20;R+=4)B(0,0,0);for(let R=1;R<19;R+=4.5){let N=new Ae;x(N,.12,.16,1.2,"#8b5a2b",0,0,0,6);let V=new Ht(new mi(1,0),d("#22c55e",{flatShading:!0}));V.position.y=1.8,V.castShadow=!0,N.add(V),N.position.set(R,0,8),at.add(N)}x(at,3.6,3.6,.06,"#334155",15,0,-6,24),_(at,.8,3.4,"#facc15",15,.08,-6),_(at,2.4,.8,"#facc15",15,.08,-6),v(at,6,3,4,"#64748b",0,0,-7);let m=new Ht(new Cn(22,3.4),new Rn({map:U("PROSPERI",null),transparent:!0})),y=new Ht(new Cn(8,9),new Rn({map:k,transparent:!0,depthWrite:!1}));y.rotation.x=-Math.PI/2,y.position.set(-12,.06,6),at.add(y),m.position.set(-8,2.4,J+.35),at.add(m),at.userData.logo=m,v(at,22.5,2.6,.2,"#ffffff",-8,.7,J+.15)}{let l=Dt[0];[-4.1,4.1].forEach((y,R)=>v(l,.5,3.8,.5,T[R?4:1],y,0,J+.3)),v(l,8.7,.6,.5,T[0],0,3.6,J+.3);let m=new Ht(new Cn(6,.5),new Rn({map:U("ENTRADA",null),transparent:!0}));m.position.set(0,3.9,J+.57),l.add(m),_(C,8,4,T[5],0,.035,J+3)}let bt=new Ae;{let l=new Ht(new xn(1.1,14,10),d("#e3423b"));l.scale.set(1.6,1,1),l.castShadow=!0,bt.add(l);let m=new Ht(new xn(.75,12,8),d("#bfe6ff",{roughness:.1,metalness:.3}));m.position.set(1.05,.15,0),m.scale.set(1,.8,.95),bt.add(m),v(bt,3.4,.28,.28,"#e3423b",-2.6,.1,0),v(bt,.18,1,.7,"#f2d84b",-4.2,.1,0),[-.7,.7].forEach(N=>v(bt,2.6,.1,.1,"#334155",0,-1.15,N)),[-.6,.6].forEach(N=>[-.7,.7].forEach(V=>v(bt,.08,.5,.08,"#334155",N,-1.1,V)));let y=new Ae;y.position.y=1.25,bt.add(y),v(y,7,.06,.3,"#1f2937",0,0,0),v(y,.3,.06,7,"#1f2937",0,0,0),x(bt,.08,.08,.35,"#1f2937",0,.95,0,6),bt.userData.rot=y;let R=new Ae;R.position.set(-4.2,.3,.38),bt.add(R),v(R,.06,1.4,.12,"#1f2937",0,-.7,0),bt.userData.tr=R,[1,-1].forEach(N=>{let V=new Ht(new Cn(1.15,1.3),new Rn({map:k,transparent:!0,depthWrite:!1}));V.position.set(-.15,.05,N*1.13),V.rotation.y=N>0?0:Math.PI,bt.add(V)})}bt.rotation.order="YXZ";let P={x:15,z:-6,y0:dt(3)+1.25,t:0,phase:"pousado",wait:30};bt.position.set(P.x,P.y0,P.z),C.add(bt),v(C,ct+2,.3,et+2,"#cbd5e1",0,0,0);let j=32,ot=62,lt=-11,rt=11;_(C,ot-j+4,rt-lt+4,"#15803d",(j+ot)/2,.03,0);for(let l=0;l<6;l++)_(C,(ot-j)/6,rt-lt,l%2?"#16a34a":"#22a34d",j+(l+.5)*(ot-j)/6,.035,0);let Ot=(l,m,y,R)=>_(C,l,m,"#f8fafc",y,.04,R);Ot(ot-j,.15,47,lt),Ot(ot-j,.15,47,rt),Ot(.15,rt-lt,j,0),Ot(.15,rt-lt,ot,0),Ot(.15,rt-lt,47,0);{let l=new Ht(new ma(2.9,3.05,40),d("#f8fafc"));l.rotation.x=-Math.PI/2,l.position.set(47,.045,0),C.add(l)}[j,ot].forEach((l,m)=>{let y=m?1:-1;v(C,.12,2,.12,"#f8fafc",l+y*.8,0,-2.5),v(C,.12,2,.12,"#f8fafc",l+y*.8,0,2.5),v(C,.12,.12,5.1,"#f8fafc",l+y*.8,2,0),Ot(.15,9,l-y*4,0)});for(let l=j-2;l<=ot+2;l+=3)v(C,.08,4,.08,"#334155",l,0,lt-2),v(C,.08,4,.08,"#334155",l,0,rt+2);v(C,ot-j+4,4,.03,new Li({color:"#334155",transparent:!0,opacity:.18}),47,0,lt-2,{cast:!1}),v(C,ot-j+4,4,.03,new Li({color:"#334155",transparent:!0,opacity:.18}),47,0,rt+2,{cast:!1});let Mt=[];for(let l=0;l<2;l++){let m=rt+3.6+l*1.4,y=l*.5;v(C,18,y+.05,1.2,"#cbd5e1",47,0,m+.2);let R=v(C,18,.12,.5,T[l+1],47,y+.33,m);for(let N=39;N<=55;N+=1.6){let V={id:Yt.length,f:0,o:!0,x:N,z:m+.05,ry:Math.PI,room:"arquibancada",who:null,h:y};Yt.push(V),Mt.push(V)}R.userData.seat=Mt[Mt.length-3],E.push(R)}let vt=46,Wt=34;_(C,30,16,"#2563eb",vt,.03,Wt),_(C,23.8,11,"#1d4ed8",vt,.035,Wt),[[23.8,.1,0,-5.5],[23.8,.1,0,5.5],[23.8,.1,0,-4.1],[23.8,.1,0,4.1],[.1,11,-11.9,0],[.1,11,11.9,0],[.1,8.2,-6.4,0],[.1,8.2,6.4,0],[12.8,.1,0,0]].forEach(([l,m,y,R])=>_(C,l,m,"#f8fafc",vt+y,.04,Wt+R)),v(C,.08,1,11.8,d("#f8fafc",{transparent:!0,opacity:.6}),vt,0,Wt,{cast:!1});let ht=-58,_t=-6;_(C,52,62,"#86d16a",ht,.02,_t);let Vt=new Ht(new Fr(7,28),d("#38bdf8",{roughness:.15,metalness:.1}));Vt.rotation.x=-Math.PI/2,Vt.position.set(ht-8,.05,_t-14),C.add(Vt),_(C,18,14,"#fde68a",ht+10,.04,_t+16),v(C,.1,2.4,.1,"#f8fafc",ht+6,0,_t+16),v(C,.1,2.4,.1,"#f8fafc",ht+14,0,_t+16),v(C,8,.05,.02,"#f8fafc",ht+10,2.2,_t+16),v(C,3,2.4,3,"#f43f5e",ht+8,0,_t-2);let qt=v(C,1,.1,4,"#facc15",ht+8,1.2,_t+1.6);qt.rotation.x=.55,v(C,.15,2.6,.15,"#0ea5e9",ht-4,0,_t-1),v(C,.15,2.6,.15,"#0ea5e9",ht+1,0,_t-1),v(C,5.2,.15,.15,"#0ea5e9",ht-1.5,2.6,_t-1);let Lt=[];[-3,0].forEach(l=>{let m=new Ae;m.position.set(ht+l+.5,2.6,_t-1),v(m,.02,1.9,.02,"#94a3b8",-.25,-1.9,0),v(m,.02,1.9,.02,"#94a3b8",.25,-1.9,0),v(m,.6,.06,.3,"#f43f5e",0,-1.95,0),C.add(m),Lt.push(m)});for(let l=0;l<26;l++){let m=l*2.4,y=14+l*37%10;B(ht+Math.cos(m)*y*1.3,_t+Math.sin(m)*y*1.5,.9+l%3*.2)}let ce=[];[[ht-14,_t+4],[ht+2,_t-14],[ht-2,_t+12],[ht+14,_t-6]].forEach(([l,m],y)=>{v(C,2,.45,.6,"#92400e",l,0,m),ce.push({x:l,z:m+.6,ry:Math.PI})}),_(C,3,40,"#e7e5e4",ht+4,.035,_t),_(C,30,3,"#e7e5e4",ht,.035,_t+6);let ee=new ts(.22,.38,4,8),xe=new ts(.07,.45,3,6),G=new ts(.09,.62,3,6),Et=new es(.26,.26,.36,6),st=new xn(.2,12,10),ut=new xn(.055,8,6),Rt=new xn(.028,6,5),$t=[],tt=null,Pe=["#f1c27d","#e0ac69","#c68642","#8d5524","#ffdbac"],ge=["#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#f8fafc"],Ze=[],bs={};X.forEach((l,m)=>l.forEach(y=>bs[y.k]=m));let W=new Ht(new xn(.22,10,8),d("#f8fafc"));W.castShadow=!0,C.add(W);let z={x:47,z:0,vx:0,vz:0,last:null},Q=[0,0],$=[];for(let l=0;l<10;l++){let m=l<5?0:1,y=m?50+l%5%3*4:44-l%5%3*4,R=-7+l%5*3.5,N=Mn({npc:!0,o:!0,f:0,x:y,z:R,speed:3.4,look:{shirt:m?"#f8fafc":"#eab308",pants:m?"#1d4ed8":"#111827",skin:Pe[l%5],hair:"#1c1917"}});N.home={x:y,z:R},N.team=m,$.push(N)}let At=Mn({npc:!0,o:!0,f:0,x:vt+9,z:Wt,speed:4,look:{shirt:"#f8fafc",pants:"#f8fafc",skin:Pe[1]}}),Ut=Mn({npc:!0,o:!0,f:0,x:vt-9,z:Wt,speed:4,look:{shirt:"#ef8b3b",pants:"#1f2937",skin:Pe[3],hair:"#1c1917"}}),St=!1,Gt=[0,0];pt(At,"#e3423b"),pt(Ut,"#3a8fd6");let Zt=new Ht(new xn(.09,8,6),d("#d9f99d",{emissive:"#a3e635",emissiveIntensity:.4}));C.add(Zt);let yt={t:0,dir:1,z0:Wt,z1:Wt},de=[];for(let l=0;l<7;l++){let m=Mn({npc:!0,o:!0,f:0,x:ht+(Math.random()-.5)*30,z:_t+(Math.random()-.5)*36,speed:1.1+Math.random()*.6,look:{shirt:ge[l%7],skin:Pe[l%5],pants:l%2?"#1e3a8a":"#374151",hair:["#1c1917","#78350f","#facc15"][l%3]}});l>3&&m.m.g.scale.setScalar(.7),de.push(m),m.wander=!0}{let l=Yt.filter(y=>y.scr&&!y.kaio&&!["ia","diretoria"].includes(y.room)),m=0;l.forEach((y,R)=>{if(R%3!==0||m>=22)return;m++;let N=Mn({staff:!0,o:!1,f:y.f,x:y.x,z:y.z,speed:1.4,look:{shirt:ge[R%7],skin:Pe[R%5],pants:["#1f2937","#334155","#1e3a8a"][R%3],hair:["#1c1917","#78350f","#facc15","#a8a29e"][R%4]}});N.seat=y,y.who=N,N.sit=!0,N.state="sit",N.timer=20+Math.random()*90,N.m.g.rotation.y=y.ry,N.home=y})}tt=Mn({isPlayer:!0,nome:"Voc\xEA",o:!1,f:2,x:-14,z:-6,speed:2.6,look:{shirt:"#0f172a",pants:"#334155",skin:"#e0ac7e",hair:"#1c1917"}});{let l=Yt.find(m=>m.kaio);tt.x=l.x,tt.z=l.z,tt.seat=l,l.who=tt,tt.sit=!0,tt.state="sit",tt.timer=1e9,tt.m.g.rotation.y=l.ry}let _e=document.getElementById("labels");Te.forEach(l=>{let m=document.createElement("div");m.className="room",_e.appendChild(m),l.el=m});let ve=[["Quadra society",47,3,lt-4],["Quadra de t\xEAnis",vt,3,Wt-9],["Parque",ht,4,_t-24],["Beach play",ht+10,2,_t+16],["Estacionamento",S,2,O],["Entrada",0,3,18]].map(([l,m,y,R])=>{let N=document.createElement("div");return N.className="room out",N.textContent=l,_e.appendChild(N),{el:N,pos:new D(m,y,R)}});tt.tag=document.createElement("div"),tt.tag.className="tag me",tt.tag.innerHTML="<i></i>Voc\xEA",_e.appendChild(tt.tag);let Ce=new D,He=-1,re=!1,pe={on:!1,t:0,p0:new D,p1:new D,t0:new D,t1:new D},Fi=l=>l.o?!0:He===l.f,be=new Ma,_n=new xt,Sn=null;s.addEventListener("pointerdown",l=>{Sn={x:l.clientX,y:l.clientY,t:performance.now()}}),s.addEventListener("pointerup",l=>{if(!Sn)return;Math.hypot(l.clientX-Sn.x,l.clientY-Sn.y)<8&&performance.now()-Sn.t<450&&Gn(l),Sn=null});let ln=l=>{for(;l;){if(!l.visible)return!1;l=l.parent}return!0},Wn=document.getElementById("hint"),hu=document.getElementById("sheet"),Xe=document.getElementById("sc"),oe=l=>String(l).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[m]),tc={ok:"var(--ok)",wa:"var(--wa)",la:"var(--la)"},Mp={ok:"no prazo",wa:"chegando",la:"atrasada"};document.getElementById("sx").onclick=Oe,Xe.addEventListener("click",l=>{let m=l.target.closest("[data-b]");if(!m)return;let y=i[e].bots.find(N=>N.id===m.dataset.b),R=y.tarefas[+m.dataset.i];R[3]||Yp(y,R,m).then(N=>{if(!N)return;m.disabled=!0,m.textContent="Feito",m.closest(".task").querySelector(".d").style.background="var(--cy)";let V=Ze.find(nt=>nt.id===y.id);if(V){V.jump=1;let nt=y.tarefas.filter(H=>!H[3]);y.st=nt.some(H=>H[1]==="la")?"la":nt.some(H=>H[1]==="wa")?"wa":"ok",V.st=y.st,V.tag.className="tag "+{ok:"",wa:"warn",la:"late"}[y.st]}nc()})});let ic=document.getElementById("toast"),fu,Sp=()=>{let l=i[e].bots.flatMap(N=>N.tarefas),m=l.filter(N=>N[3]).length,y=l.filter(N=>N[1]==="la"),R=y.filter(N=>N[3]).length;return[["Confirmar 3 tarefas hoje",Math.min(m,3),3,50],["Zerar as atrasadas",R,y.length||1,80],["Ronda: conversar com 5 setores",Math.min(go.size,5),5,50],["Sentar na arquibancada",tt.seat&&tt.seat.room==="arquibancada"?1:0,1,0]]};document.querySelectorAll("#tabs button").forEach(l=>l.onclick=()=>{document.querySelectorAll("#tabs button").forEach(y=>y.classList.toggle("on",y===l));let m=l.dataset.t;if(m==="campus"&&(Oe(),Ue(-1)),m==="tarefas"&&qe&&dc()){Oe(),En.abrir();return}m==="tarefas"&&wn(`<h2>Tarefas</h2><div class="sub">${oe(i[e].nome)} \xB7 toque em Confirmar quando estiver feito</div>`+i[e].bots.map(y=>ec(y).replace(/<div class="n">/g,`<div class="n"><small>${oe(y.emo+" "+y.nome)}</small>`)).join("")+(qe?"":'<div class="note">Dados de exemplo.</div>')),m==="missoes"&&wn('<h2>Miss\xF5es do dia</h2><div class="sub">Recompensa s\xF3 com trabalho confirmado</div>'+Sp().map(y=>`<div class="task"><div class="n">${oe(y[0])}<small>${y[1]}/${y[2]} \xB7 +${y[3]} XP</small><div class="prog"><i style="width:${Math.round(y[1]/y[2]*100)}%"></i></div></div></div>`).join("")),m==="bots"&&(wn(`<h2>Equipe</h2><div class="sub">${oe(i[e].nome)}</div>`+Ze.map(y=>`<div class="bot" data-id="${y.id}"><div class="av" style="background:${y.cor}33">${oe(y.emo)}</div><div class="n" style="flex:1"><b>${oe(y.nome)}</b><small style="display:block;color:var(--mut)">${oe(y.papel)}</small></div><span class="d" style="width:10px;height:10px;border-radius:50%;background:${tc[y.st]}"></span></div>`).join("")),Xe.querySelectorAll(".bot").forEach(y=>y.onclick=()=>bi(Ze.find(R=>R.id===y.dataset.id))),qe?(Xe.insertAdjacentHTML("beforeend",'<div class="row"><button class="btn" id="addA">Adicionar \xE0 equipe</button></div>'),document.getElementById("addA").onclick=Zp):Gp())}),document.querySelectorAll("#floors button").forEach(l=>l.onclick=()=>Ue(+l.dataset.f)),document.querySelectorAll("#offices button[data-o]").forEach(l=>l.onclick=()=>{l.dataset.o!==e&&(e=l.dataset.o,document.querySelectorAll("#offices button").forEach(m=>m.classList.toggle("on",m===l)),Oe(),Ms())});let wp=new ba,mo=0,Ap=()=>Ze.find(l=>l.tennis);addEventListener("resize",mu),mu(),(()=>{let l=new Date().getHours();return l>=18||l<6})()&&(a.background.set("#0b1630"),a.fog.color.set("#0b1630"),u.intensity=.5,u.color.set("#9db4ff"),a.children.find(l=>l.isHemisphereLight).intensity=.45,Dt.forEach((l,m)=>{let y=new ya("#ffe7b0",40,40);y.position.set(0,3.4,0),l.add(y)}),Bt.color.set("#ffd58a"),Bt.opacity=.3,Bt.emissive=new le("#ffb347"),Bt.emissiveIntensity=.35);let gu=[[],[],[]];for(let l=0;l<3;l++){let m=gu[l];for(let y of he[l]){let R=y.s<0?-1.5:1.5;y.open||m.push([y.x0,R,y.cx-.9,R],[y.cx+.9,R,y.x1,R]),y.x0>ft+.1&&!(l===0&&y.k==="lobby")&&m.push([y.x0,y.zA,y.x0,y.zB])}m.push([ft,Nt,It,Nt],[ft,Nt,ft,J],[It,Nt,It,J]),l===0?m.push([ft,J,-4,J],[4,J,It,J],[-4,1.55,-1.2,1.55],[1.2,1.55,4,1.55]):m.push([ft,J,It,J]),m.push([-3,Nt,-3,-1.5],[3,Nt,3,-1.5],[-3,-1.5,3,-1.5])}let Ip=(l,m)=>l>ft&&l<It&&m>Nt&&m<J,ti={x:0,y:0,on:!1},ki=document.getElementById("joy"),vu=ki.querySelector("i");ki.addEventListener("pointerdown",l=>{ti.on=!0,ki.setPointerCapture(l.pointerId),yu(l),xi(),re||pr()}),ki.addEventListener("pointermove",l=>{ti.on&&yu(l)});let xu=()=>{ti.on=!1,ti.x=ti.y=0,vu.style.transform=""};ki.addEventListener("pointerup",xu),ki.addEventListener("pointercancel",xu);let $n={};addEventListener("keydown",l=>{$n[l.key.toLowerCase()]=!0}),addEventListener("keyup",l=>{$n[l.key.toLowerCase()]=!1});let sc=new D;document.getElementById("fol").onclick=()=>{re?(re=!1,document.getElementById("fol").classList.remove("on")):pr()};let rc=document.getElementById("act"),oc=null,Dp=0,go=new Set,bu=!1,ac=(l,m,y,R)=>Math.hypot(l.x-m,l.z-y)<R;rc.onclick=()=>{oc&&oc.fn(),Mu()};let zp={la:["T\xF4 atrasado nisso, me d\xE1 uma for\xE7a?","Isso aqui venceu, preciso da sua decis\xE3o."],wa:["T\xE1 chegando o prazo, j\xE1 t\xF4 em cima.","Faltam poucos dias, vou fechar."],ok:["Tudo em dia por aqui!","Sem pend\xEAncia, chefe."]},Hp=bi;bi=function(l,m){if(Hp(l),qe&&!l.pessoa&&Jp(l),m&&!qe){let y=zp[l.st];Xe.querySelector(".sub").insertAdjacentHTML("afterend",`<div class="say">\u201C${oe(y[Math.floor(Math.random()*y.length)])}\u201D</div>`)}};let ei=[],wu=()=>"jarvis.campus.pessoas."+e,_o=()=>{try{return JSON.parse(localStorage.getItem(wu())||"[]")}catch{return[]}},lc=l=>{try{localStorage.setItem(wu(),JSON.stringify(l))}catch{}},Vp=()=>[...new Set(Yt.filter(l=>l.scr&&!l.kaio).map(l=>l.room))],Eu="https://qydpjcudcnirhybwlnhs.supabase.co",Tu="sb_publishable_41C_vG_CaaYvwiNhyGb88A_yQgSwqC1",Fe=null,qe=!1,Au=null,uc=[];try{Fe=pp(Eu,Tu,{auth:{persistSession:!0,storageKey:"jarvis.sb",autoRefreshToken:!0}})}catch{Fe=null}let En=null,gr=document.getElementById("mode"),$p={atrasado:"la",chegando:"wa",no_prazo:"ok"},Xp={gestao:"coord",comercial:"marketing",dinheiro:"financeiro",manutencao:"operacoes",central:"ia",pessoal:"coord","smash-point":"tenis"},yo=l=>{let m=0;for(let y of String(l))m=m*31+y.charCodeAt(0)|0;return Math.abs(m)};async function Ru(){let[l,m,y,R,N,V]=await Promise.all([Fe.from("escritorios").select("id,nome,emoji,cor,tipo,ordem").order("ordem"),Fe.from("bots").select("id,nome,emoji,sala,tipo,cor,missao,modelo_slug,escritorio_id,area_id,visual").eq("ativo",!0),Fe.from("itens_situacao").select("id,bot_id,titulo,prazo,xp,situacao,status,escritorio_id").eq("ativo",!0).in("situacao",["atrasado","chegando","no_prazo"]),Fe.from("respostas").select("item_id,resposta,extra,criado_em").order("criado_em",{ascending:!1}).limit(600),Fe.from("xp_eventos").select("pontos"),Fe.from("agente_modelos").select("slug,nome,emoji,divisao").order("nome")]);for(let H of[l,m,y,N])if(H.error)throw H.error;uc=V.data||[];let nt={};(R&&R.data||[]).forEach(H=>{nt[H.item_id]||(nt[H.item_id]=H.resposta==="texto"||!H.resposta?H.extra||"":H.resposta)});for(let H of Object.keys(i))delete i[H];for(let H of l.data){let gt=/pessoal/i.test(H.nome)||H.tipo==="pessoal"?"pessoal":"escola";t[H.id]=t[gt];let Z={},mt=[];for(let Ct of m.data.filter(Pt=>Pt.escritorio_id===H.id)){let Pt=Ct.sala||Xp[Ct.area_id]||"foco",zt=Ct.nome+"|"+Pt,Jt=y.data.filter(Ne=>Ne.bot_id===Ct.id&&Ne.status!=="fechado").map(Ne=>[Ne.titulo||"Sem t\xEDtulo",$p[Ne.situacao]||"ok",Ne.xp||10,!1,Ne.id,Ne.prazo,Ne.status==="respondido"?String(nt[Ne.id]||"respondida").slice(0,60):""]);if(Z[zt]){Z[zt].tarefas.push(...Jt),Z[zt].ids.push(Ct.id);continue}let jt=uc.find(Ne=>Ne.slug===Ct.modelo_slug),Ye={id:Ct.id,ids:[Ct.id],nome:Ct.nome,emo:Ct.emoji||(Ct.tipo==="pessoa"?"\u{1F464}":"\u{1F916}"),cor:Ct.cor||T[yo(Ct.id)%6],sala:Pt,tipo:Ct.tipo||"bot",papel:Ct.missao||(jt?jt.nome:Ct.tipo==="pessoa"?"Equipe":"Agente"),tarefas:Jt,criado:Ct.id.startsWith("app-"),visual:Ct.visual||{}};Z[zt]=Ye,mt.push(Ye)}mt.forEach(Ct=>{Ct.tarefas.sort((Pt,zt)=>({la:0,wa:1,ok:2})[Pt[1]]-{la:0,wa:1,ok:2}[zt[1]]),Ct.st=Ct.tarefas.some(Pt=>Pt[1]==="la")?"la":Ct.tarefas.some(Pt=>Pt[1]==="wa")?"wa":"ok"}),i[H.id]={nome:H.nome,placa:(gt==="escola"&&!/^escola/i.test(H.nome)?"ESCOLA ":"")+H.nome.toUpperCase(),kind:gt,bots:mt}}n=(N.data||[]).reduce((H,gt)=>H+(gt.pontos||0),0),i[e]||(e=Object.keys(i).find(H=>i[H].kind==="escola")||Object.keys(i)[0])}async function _r(){try{await fc(Ru(),9e3),qe=!0,Cu(),Ms(),Ss(),gr.style.display="none",dc()?.atualizar();let l=document.getElementById("mdTop");l&&(l.hidden=!1,l.onclick=R=>{R.stopPropagation(),Oe(),En.abrir()});let m=document.getElementById("rel");m&&(m.style.cursor="pointer",m.onclick=()=>{Oe(),En.abrir()});let y=document.querySelector("#tabs [data-t=tarefas]");y&&!y.dataset.md&&(y.dataset.md=1,y.lastChild.textContent="Meu dia",y.insertAdjacentHTML("beforeend",' <b id="mdN" style="font-size:10px"></b>'))}catch{qe=!1,vo("N\xE3o consegui ler o banco agora. Mostrando exemplo.",{t:"Tentar de novo",fn:_r})}}async function qp(){if(!Fe){vo("Modo demonstra\xE7\xE3o");return}let l=null;try{l=(await fc(Fe.auth.getSession(),4e3)).data.session}catch{l=null}if(l)return Au=l,_r();try{let m=await fc(fetch(Eu+"/auth/v1/health",{headers:{apikey:Tu}}),4e3);if(!m.ok&&m.status!==401)throw 0;vo("Modo demonstra\xE7\xE3o",{t:"Entrar",fn:jp})}catch{vo("Modo demonstra\xE7\xE3o \xB7 os dados reais abrem no app do Jarvis")}}async function Yp(l,m,y){if(!qe||!m[4])return m[3]=!0,du(m[2]),!0;y.disabled=!0,y.textContent="Salvando\u2026";let R=await Fe.rpc("campus_confirmar_item",{p_item:m[4],p_obs:"confirmado no campus"});if(R.error)return y.disabled=!1,y.textContent="Confirmar",De("N\xE3o salvou"),!1;m[3]=!0;let N=Math.floor(n/100)+1,V=Math.max(0,(R.data.xp_total||n)-n);n=R.data.xp_total??n,Ss();let nt=Math.floor(n/100)+1;return De(nt>N?"N\xEDvel "+nt+"!":V?"+"+V+" XP":"Confirmado"),!0}let pc=null;async function Jp(l){clearInterval(pc);let m=Xe.querySelector(".say")||Xe.querySelector(".sub"),y=l.tipo==="pessoa";m.insertAdjacentHTML("afterend",`<div class="sub" style="margin:6px 0 6px">${y?"Recados para "+oe(l.nome)+" \xB7 ela l\xEA quando entrar no Jarvis":"Conversa com "+oe(l.nome)}</div><div id="lc" class="lc"></div>
   <form id="lcf" class="lcf" style="margin-bottom:14px"><label style="flex:1;display:flex"><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Mensagem</span><input id="lci" maxlength="4000" autocomplete="off" placeholder="${y?"Deixe um recado para ":"Escreva para "}${oe(l.nome)}"></label><button class="btn" type="submit">Enviar</button></form>`);let R=document.getElementById("lc"),N=async()=>{if(!document.getElementById("lc")){clearInterval(pc);return}let V=document.getElementById("lc"),nt=await Fe.from("conversa_mensagens").select("autor,texto,status,criado_em").in("bot_id",l.ids||[l.id]).order("criado_em",{ascending:!1}).limit(6);if(nt.error)return;let H=nt.data.reverse().filter(mt=>!(y&&mt.autor==="bot")),gt=H[H.length-1],Z=!y&&gt&&gt.autor==="kaio"&&["pendente","lendo"].includes(gt.status);R.innerHTML=H.map(mt=>`<div class="lb ${mt.autor==="kaio"?"me":""}">${oe(mt.texto)}</div>`).join("")+(Z?`<div class="lb w">${gt.status==="lendo"?oe(l.nome)+" est\xE1 lendo\u2026":Date.now()-new Date(gt.criado_em)>18e4?"Entregue. Ainda sem resposta: o OpenBot responde quando o computador est\xE1 ligado.":"Entregue. Aguardando "+oe(l.nome)+"\u2026"}</div>`:"")||(y?'<div class="note">Nenhum recado ainda.</div>':'<div class="note">Mande a primeira mensagem.</div>')};await N(),R.scrollTop=R.scrollHeight,pc=setInterval(()=>N().then(()=>{R.scrollTop=R.scrollHeight}),4e3),document.getElementById("lcf").onsubmit=async V=>{V.preventDefault();let nt=document.getElementById("lci"),H=nt.value.trim();if(!H)return;nt.value="";let gt=(await Fe.auth.getUser()).data.user;if((await Fe.from("conversa_mensagens").insert({user_id:gt.id,bot_id:l.id,autor:"kaio",texto:H})).error){De("N\xE3o enviou"),nt.value=H;return}N()}}async function Kp(l){if(!qe)return;if((await Fe.from("bots").update({ativo:!1}).in("id",l.ids||[l.id])).error){De("N\xE3o removeu");return}Oe(),De(l.nome+" saiu da equipe"),_r()}Ms(),Ss(),setTimeout(xi,7e3),qp(),/\/campus\//.test(location.pathname)&&(document.getElementById("sair").hidden=!1);let Qp=d("#38bdf8",{emissive:"#0ea5e9",emissiveIntensity:.9}),tm=d("#1f2937");Pu();let Iu=document.getElementById("load");Iu.style.opacity=0,setTimeout(()=>Iu.remove(),700)}})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
