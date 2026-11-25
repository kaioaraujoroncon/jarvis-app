(()=>{var Hp=Object.create;var po=Object.defineProperty;var Vp=Object.getOwnPropertyDescriptor;var Gp=Object.getOwnPropertyNames;var Wp=Object.getPrototypeOf,Xp=Object.prototype.hasOwnProperty;var $p=(i,e)=>()=>(i&&(e=i(i=0)),e);var Gn=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports),qp=(i,e)=>{for(var t in e)po(i,t,{get:e[t],enumerable:!0})},bu=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Gp(e))!Xp.call(i,s)&&s!==t&&po(i,s,{get:()=>e[s],enumerable:!(n=Vp(e,s))||n.enumerable});return i};var Mu=(i,e,t)=>(t=i!=null?Hp(Wp(i)):{},bu(e||!i||!i.__esModule?po(t,"default",{value:i,enumerable:!0}):t,i)),jp=i=>bu(po({},"__esModule",{value:!0}),i);var is={};qp(is,{Headers:()=>Eh,Request:()=>fx,Response:()=>px,default:()=>wh,fetch:()=>dx});var ux,Ks,dx,wh,Eh,fx,px,Ri=$p(()=>{"use strict";ux=function(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("unable to locate global object")},Ks=ux(),dx=Ks.fetch,wh=Ks.fetch.bind(Ks),Eh=Ks.Headers,fx=Ks.Request,px=Ks.Response});var nf=Gn(Ah=>{"use strict";Object.defineProperty(Ah,"__esModule",{value:!0});var Th=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}};Ah.default=Th});var Ch=Gn(Br=>{"use strict";var sf=Br&&Br.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Br,"__esModule",{value:!0});var gx=sf((Ri(),jp(is))),_x=sf(nf()),Rh=class{constructor(e){this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=e.headers,this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle,e.fetch?this.fetch=e.fetch:typeof fetch=="undefined"?this.fetch=gx.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=Object.assign({},this.headers),this.headers[e]=t,this}then(e,t){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),this.method!=="GET"&&this.method!=="HEAD"&&(this.headers["Content-Type"]="application/json");let n=this.fetch,s=n(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async r=>{var o,a,c;let l=null,u=null,d=null,f=r.status,p=r.statusText;if(r.ok){if(this.method!=="HEAD"){let m=await r.text();m===""||(this.headers.Accept==="text/csv"||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?u=m:u=JSON.parse(m))}let x=(o=this.headers.Prefer)===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),g=(a=r.headers.get("content-range"))===null||a===void 0?void 0:a.split("/");x&&g&&g.length>1&&(d=parseInt(g[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(u)&&(u.length>1?(l={code:"PGRST116",details:`Results contain ${u.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},u=null,d=null,f=406,p="Not Acceptable"):u.length===1?u=u[0]:u=null)}else{let x=await r.text();try{l=JSON.parse(x),Array.isArray(l)&&r.status===404&&(u=[],l=null,f=200,p="OK")}catch{r.status===404&&x===""?(f=204,p="No Content"):l={message:x}}if(l&&this.isMaybeSingle&&(!((c=l==null?void 0:l.details)===null||c===void 0)&&c.includes("0 rows"))&&(l=null,f=200,p="OK"),l&&this.shouldThrowOnError)throw new _x.default(l)}return{error:l,data:u,count:d,status:f,statusText:p}});return this.shouldThrowOnError||(s=s.catch(r=>{var o,a,c;return{error:{message:`${(o=r==null?void 0:r.name)!==null&&o!==void 0?o:"FetchError"}: ${r==null?void 0:r.message}`,details:`${(a=r==null?void 0:r.stack)!==null&&a!==void 0?a:""}`,hint:"",code:`${(c=r==null?void 0:r.code)!==null&&c!==void 0?c:""}`},data:null,count:null,status:0,statusText:""}})),s.then(e,t)}};Br.default=Rh});var Ih=Gn(zr=>{"use strict";var vx=zr&&zr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(zr,"__esModule",{value:!0});var yx=vx(Ch()),Ph=class extends yx.default{select(e){let t=!1,n=(e!=null?e:"*").split("").map(s=>/\s/.test(s)&&!t?"":(s==='"'&&(t=!t),s)).join("");return this.url.searchParams.set("select",n),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:s,referencedTable:r=s}={}){let o=r?`${r}.order`:"order",a=this.url.searchParams.get(o);return this.url.searchParams.set(o,`${a?`${a},`:""}${e}.${t?"asc":"desc"}${n===void 0?"":n?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){let s=typeof n=="undefined"?"limit":`${n}.limit`;return this.url.searchParams.set(s,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:s=n}={}){let r=typeof s=="undefined"?"offset":`${s}.offset`,o=typeof s=="undefined"?"limit":`${s}.limit`;return this.url.searchParams.set(r,`${e}`),this.url.searchParams.set(o,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return this.method==="GET"?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:s=!1,wal:r=!1,format:o="text"}={}){var a;let c=[e?"analyze":null,t?"verbose":null,n?"settings":null,s?"buffers":null,r?"wal":null].filter(Boolean).join("|"),l=(a=this.headers.Accept)!==null&&a!==void 0?a:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${o}; for="${l}"; options=${c};`,o==="json"?this:this}rollback(){var e;return((e=this.headers.Prefer)!==null&&e!==void 0?e:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}};zr.default=Ph});var Ta=Gn(Hr=>{"use strict";var xx=Hr&&Hr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Hr,"__esModule",{value:!0});var bx=xx(Ih()),Lh=class extends bx.default{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}in(e,t){let n=Array.from(new Set(t)).map(s=>typeof s=="string"&&new RegExp("[,()]").test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(e,`in.(${n})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:n,type:s}={}){let r="";s==="plain"?r="pl":s==="phrase"?r="ph":s==="websearch"&&(r="w");let o=n===void 0?"":`(${n})`;return this.url.searchParams.append(e,`${r}fts${o}.${t}`),this}match(e){return Object.entries(e).forEach(([t,n])=>{this.url.searchParams.append(t,`eq.${n}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){let s=n?`${n}.or`:"or";return this.url.searchParams.append(s,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}};Hr.default=Lh});var Uh=Gn(Gr=>{"use strict";var Mx=Gr&&Gr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Gr,"__esModule",{value:!0});var Vr=Mx(Ta()),Dh=class{constructor(e,{headers:t={},schema:n,fetch:s}){this.url=e,this.headers=t,this.schema=n,this.fetch=s}select(e,{head:t=!1,count:n}={}){let s=t?"HEAD":"GET",r=!1,o=(e!=null?e:"*").split("").map(a=>/\s/.test(a)&&!r?"":(a==='"'&&(r=!r),a)).join("");return this.url.searchParams.set("select",o),n&&(this.headers.Prefer=`count=${n}`),new Vr.default({method:s,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(e,{count:t,defaultToNull:n=!0}={}){let s="POST",r=[];if(this.headers.Prefer&&r.push(this.headers.Prefer),t&&r.push(`count=${t}`),n||r.push("missing=default"),this.headers.Prefer=r.join(","),Array.isArray(e)){let o=e.reduce((a,c)=>a.concat(Object.keys(c)),[]);if(o.length>0){let a=[...new Set(o)].map(c=>`"${c}"`);this.url.searchParams.set("columns",a.join(","))}}return new Vr.default({method:s,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:s,defaultToNull:r=!0}={}){let o="POST",a=[`resolution=${n?"ignore":"merge"}-duplicates`];if(t!==void 0&&this.url.searchParams.set("on_conflict",t),this.headers.Prefer&&a.push(this.headers.Prefer),s&&a.push(`count=${s}`),r||a.push("missing=default"),this.headers.Prefer=a.join(","),Array.isArray(e)){let c=e.reduce((l,u)=>l.concat(Object.keys(u)),[]);if(c.length>0){let l=[...new Set(c)].map(u=>`"${u}"`);this.url.searchParams.set("columns",l.join(","))}}return new Vr.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}update(e,{count:t}={}){let n="PATCH",s=[];return this.headers.Prefer&&s.push(this.headers.Prefer),t&&s.push(`count=${t}`),this.headers.Prefer=s.join(","),new Vr.default({method:n,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}delete({count:e}={}){let t="DELETE",n=[];return e&&n.push(`count=${e}`),this.headers.Prefer&&n.unshift(this.headers.Prefer),this.headers.Prefer=n.join(","),new Vr.default({method:t,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}};Gr.default=Dh});var rf=Gn(Aa=>{"use strict";Object.defineProperty(Aa,"__esModule",{value:!0});Aa.version=void 0;Aa.version="0.0.0-automated"});var of=Gn(Ra=>{"use strict";Object.defineProperty(Ra,"__esModule",{value:!0});Ra.DEFAULT_HEADERS=void 0;var Sx=rf();Ra.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${Sx.version}`}});var cf=Gn(Wr=>{"use strict";var af=Wr&&Wr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Wr,"__esModule",{value:!0});var wx=af(Uh()),Ex=af(Ta()),Tx=of(),Oh=class i{constructor(e,{headers:t={},schema:n,fetch:s}={}){this.url=e,this.headers=Object.assign(Object.assign({},Tx.DEFAULT_HEADERS),t),this.schemaName=n,this.fetch=s}from(e){let t=new URL(`${this.url}/${e}`);return new wx.default(t,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(e){return new i(this.url,{headers:this.headers,schema:e,fetch:this.fetch})}rpc(e,t={},{head:n=!1,get:s=!1,count:r}={}){let o,a=new URL(`${this.url}/rpc/${e}`),c;n||s?(o=n?"HEAD":"GET",Object.entries(t).filter(([u,d])=>d!==void 0).map(([u,d])=>[u,Array.isArray(d)?`{${d.join(",")}}`:`${d}`]).forEach(([u,d])=>{a.searchParams.append(u,d)})):(o="POST",c=t);let l=Object.assign({},this.headers);return r&&(l.Prefer=`count=${r}`),new Ex.default({method:o,url:a,headers:l,schema:this.schemaName,body:c,fetch:this.fetch,allowEmpty:!1})}};Wr.default=Oh});var pf=Gn(nn=>{"use strict";var Xr=nn&&nn.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(nn,"__esModule",{value:!0});nn.PostgrestBuilder=nn.PostgrestTransformBuilder=nn.PostgrestFilterBuilder=nn.PostgrestQueryBuilder=nn.PostgrestClient=void 0;var lf=Xr(cf());nn.PostgrestClient=lf.default;var hf=Xr(Uh());nn.PostgrestQueryBuilder=hf.default;var uf=Xr(Ta());nn.PostgrestFilterBuilder=uf.default;var df=Xr(Ih());nn.PostgrestTransformBuilder=df.default;var ff=Xr(Ch());nn.PostgrestBuilder=ff.default;nn.default={PostgrestClient:lf.default,PostgrestQueryBuilder:hf.default,PostgrestFilterBuilder:uf.default,PostgrestTransformBuilder:df.default,PostgrestBuilder:ff.default}});var Sf=Gn((sM,Mf)=>{"use strict";Mf.exports=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")}});var hh="170",es={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ts={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yp=0,Su=1,Zp=2;var Ld=1,uh=2,ri=3,Ti=0,on=1,On=2,wi=0,Ns=1,wu=2,Eu=3,Tu=4,Jp=5,Vi=100,Kp=101,Qp=102,em=103,tm=104,nm=200,im=201,sm=202,rm=203,zc=204,Hc=205,om=206,am=207,cm=208,lm=209,hm=210,um=211,dm=212,fm=213,pm=214,Vc=0,Gc=1,Wc=2,zs=3,Xc=4,$c=5,qc=6,jc=7,Dd=0,mm=1,gm=2,Ei=0,_m=1,vm=2,ym=3,dh=4,xm=5,bm=6,Mm=7;var Ud=300,Hs=301,Vs=302,Yc=303,Zc=304,ya=306,Jc=1e3,Xi=1001,Kc=1002,Fn=1003,Sm=1004;var mo=1005;var Xn=1006,ac=1007;var $i=1008;var li=1009,Od=1010,Nd=1011,Tr=1012,fh=1013,qi=1014,oi=1015,Nr=1016,ph=1017,mh=1018,Gs=1020,Fd=35902,kd=1021,Bd=1022,Nn=1023,zd=1024,Hd=1025,Fs=1026,Ws=1027,Vd=1028,gh=1029,Gd=1030,_h=1031;var vh=1033,ko=33776,Bo=33777,zo=33778,Ho=33779,Qc=35840,el=35841,tl=35842,nl=35843,il=36196,sl=37492,rl=37496,ol=37808,al=37809,cl=37810,ll=37811,hl=37812,ul=37813,dl=37814,fl=37815,pl=37816,ml=37817,gl=37818,_l=37819,vl=37820,yl=37821,Vo=36492,xl=36494,bl=36495,Wd=36283,Ml=36284,Sl=36285,wl=36286;var Go=2300,El=2301,cc=2302,Au=2400,Ru=2401,Cu=2402;var wm=3200,Em=3201;var Xd=0,Tm=1,Si="",Yt="srgb",Ys="srgb-linear",xa="linear",vt="srgb";var xs=7680;var Pu=519,Am=512,Rm=513,Cm=514,$d=515,Pm=516,Im=517,Lm=518,Dm=519,Iu=35044;var Lu="300 es",ai=2e3,Wo=2001,hi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Du=1234567,br=Math.PI/180,Ar=180/Math.PI;function Zs(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]).toLowerCase()}function Ft(i,e,t){return Math.max(e,Math.min(t,i))}function yh(i,e){return(i%e+e)%e}function Um(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Om(i,e,t){return i!==e?(t-i)/(e-i):0}function Mr(i,e,t){return(1-t)*i+t*e}function Nm(i,e,t,n){return Mr(i,e,1-Math.exp(-t*n))}function Fm(i,e=1){return e-Math.abs(yh(i,e*2)-e)}function km(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Bm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function zm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Hm(i,e){return i+Math.random()*(e-i)}function Vm(i){return i*(.5-Math.random())}function Gm(i){i!==void 0&&(Du=i);let e=Du+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Wm(i){return i*br}function Xm(i){return i*Ar}function $m(i){return(i&i-1)===0&&i!==0}function qm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function jm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ym(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),d=r((e-n)/2),f=o((e-n)/2),p=r((n-e)/2),v=o((n-e)/2);switch(s){case"XYX":i.set(a*u,c*d,c*f,a*l);break;case"YZY":i.set(c*f,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*f,a*u,a*l);break;case"XZX":i.set(a*u,c*v,c*p,a*l);break;case"YXY":i.set(c*p,a*u,c*v,a*l);break;case"ZYZ":i.set(c*v,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Us(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Kt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ns={DEG2RAD:br,RAD2DEG:Ar,generateUUID:Zs,clamp:Ft,euclideanModulo:yh,mapLinear:Um,inverseLerp:Om,lerp:Mr,damp:Nm,pingpong:Fm,smoothstep:km,smootherstep:Bm,randInt:zm,randFloat:Hm,randFloatSpread:Vm,seededRandom:Gm,degToRad:Wm,radToDeg:Xm,isPowerOfTwo:$m,ceilPowerOfTwo:qm,floorPowerOfTwo:jm,setQuaternionFromProperEuler:Ym,normalize:Kt,denormalize:Us},ve=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},et=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],p=n[5],v=n[8],x=s[0],g=s[3],m=s[6],T=s[1],E=s[4],M=s[7],N=s[2],I=s[5],U=s[8];return r[0]=o*x+a*T+c*N,r[3]=o*g+a*E+c*I,r[6]=o*m+a*M+c*U,r[1]=l*x+u*T+d*N,r[4]=l*g+u*E+d*I,r[7]=l*m+u*M+d*U,r[2]=f*x+p*T+v*N,r[5]=f*g+p*E+v*I,r[8]=f*m+p*M+v*U,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*r,p=l*r-o*c,v=t*d+n*f+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/v;return e[0]=d*x,e[1]=(s*l-u*n)*x,e[2]=(a*n-s*o)*x,e[3]=f*x,e[4]=(u*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(lc.makeScale(e,t)),this}rotate(e){return this.premultiply(lc.makeRotation(-e)),this}translate(e,t){return this.premultiply(lc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},lc=new et;function qd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Xo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Zm(){let i=Xo("canvas");return i.style.display="block",i}var Uu={};function yr(i){i in Uu||(Uu[i]=!0,console.warn(i))}function Jm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Km(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Qm(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var ut={enabled:!0,workingColorSpace:Ys,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===vt&&(i.r=ci(i.r),i.g=ci(i.g),i.b=ci(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===vt&&(i.r=ks(i.r),i.g=ks(i.g),i.b=ks(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Si?xa:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ci(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ks(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ou=[.64,.33,.3,.6,.15,.06],Nu=[.2126,.7152,.0722],Fu=[.3127,.329],ku=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bu=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ut.define({[Ys]:{primaries:Ou,whitePoint:Fu,transfer:xa,toXYZ:ku,fromXYZ:Bu,luminanceCoefficients:Nu,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:Ou,whitePoint:Fu,transfer:vt,toXYZ:ku,fromXYZ:Bu,luminanceCoefficients:Nu,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}});var bs,Tl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{bs===void 0&&(bs=Xo("canvas")),bs.width=e.width,bs.height=e.height;let n=bs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=bs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=Xo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ci(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ci(t[n]/255)*255):t[n]=ci(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},eg=0,$o=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:eg++}),this.uuid=Zs(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(hc(s[o].image)):r.push(hc(s[o]))}else r=hc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function hc(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Tl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var tg=0,en=class i extends hi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Xi,s=Xi,r=Xn,o=$i,a=Nn,c=li,l=i.DEFAULT_ANISOTROPY,u=Si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tg++}),this.uuid=Zs(),this.name="",this.source=new $o(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ud)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jc:e.x=e.x-Math.floor(e.x);break;case Xi:e.x=e.x<0?0:1;break;case Kc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jc:e.y=e.y-Math.floor(e.y);break;case Xi:e.y=e.y<0?0:1;break;case Kc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Ud;en.DEFAULT_ANISOTROPY=1;var yt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],p=c[5],v=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(v-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(v+g)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,M=(p+1)/2,N=(m+1)/2,I=(u+f)/4,U=(d+x)/4,P=(v+g)/4;return E>M&&E>N?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=I/n,r=U/n):M>N?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=I/s,r=P/s):N<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(N),n=U/r,s=P/r),this.set(n,s,r,t),this}let T=Math.sqrt((g-v)*(g-v)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(T)<.001&&(T=1),this.x=(g-v)/T,this.y=(d-x)/T,this.z=(f-u)/T,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Al=class extends hi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new en(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new $o(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ui=class extends Al{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qo=class extends en{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Rl=class extends en{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var kn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],f=r[o+0],p=r[o+1],v=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=v,e[t+3]=x;return}if(d!==x||c!==f||l!==p||u!==v){let g=1-a,m=c*f+l*p+u*v+d*x,T=m>=0?1:-1,E=1-m*m;if(E>Number.EPSILON){let N=Math.sqrt(E),I=Math.atan2(N,m*T);g=Math.sin(g*I)/N,a=Math.sin(a*I)/N}let M=a*T;if(c=c*g+f*M,l=l*g+p*M,u=u*g+v*M,d=d*g+x*M,g===1-a){let N=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=N,l*=N,u*=N,d*=N}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[o],f=r[o+1],p=r[o+2],v=r[o+3];return e[t]=a*v+u*d+c*p-l*f,e[t+1]=c*v+u*f+l*d-a*p,e[t+2]=l*v+u*p+a*f-c*d,e[t+3]=u*v-a*d-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),d=a(r/2),f=c(n/2),p=c(s/2),v=c(r/2);switch(o){case"XYZ":this._x=f*u*d+l*p*v,this._y=l*p*d-f*u*v,this._z=l*u*v+f*p*d,this._w=l*u*d-f*p*v;break;case"YXZ":this._x=f*u*d+l*p*v,this._y=l*p*d-f*u*v,this._z=l*u*v-f*p*d,this._w=l*u*d+f*p*v;break;case"ZXY":this._x=f*u*d-l*p*v,this._y=l*p*d+f*u*v,this._z=l*u*v+f*p*d,this._w=l*u*d-f*p*v;break;case"ZYX":this._x=f*u*d-l*p*v,this._y=l*p*d+f*u*v,this._z=l*u*v-f*p*d,this._w=l*u*d+f*p*v;break;case"YZX":this._x=f*u*d+l*p*v,this._y=l*p*d+f*u*v,this._z=l*u*v-f*p*d,this._w=l*u*d-f*p*v;break;case"XZY":this._x=f*u*d-l*p*v,this._y=l*p*d-f*u*v,this._z=l*u*v+f*p*d,this._w=l*u*d+f*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>d){let p=2*Math.sqrt(1+n-a-d);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>d){let p=2*Math.sqrt(1+a-n-d);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+c*l+o*d-a*u,this.y=n+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return uc.copy(this).projectOnVector(e),this.sub(uc)}reflect(e){return this.sub(uc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},uc=new L,zu=new kn,ji=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(In.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(In.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=In.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,In):In.fromBufferAttribute(r,o),In.applyMatrix4(e.matrixWorld),this.expandByPoint(In);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),go.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),go.copy(n.boundingBox)),go.applyMatrix4(e.matrixWorld),this.union(go)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,In),In.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),_o.subVectors(this.max,pr),Ms.subVectors(e.a,pr),Ss.subVectors(e.b,pr),ws.subVectors(e.c,pr),_i.subVectors(Ss,Ms),vi.subVectors(ws,Ss),Oi.subVectors(Ms,ws);let t=[0,-_i.z,_i.y,0,-vi.z,vi.y,0,-Oi.z,Oi.y,_i.z,0,-_i.x,vi.z,0,-vi.x,Oi.z,0,-Oi.x,-_i.y,_i.x,0,-vi.y,vi.x,0,-Oi.y,Oi.x,0];return!dc(t,Ms,Ss,ws,_o)||(t=[1,0,0,0,1,0,0,0,1],!dc(t,Ms,Ss,ws,_o))?!1:(vo.crossVectors(_i,vi),t=[vo.x,vo.y,vo.z],dc(t,Ms,Ss,ws,_o))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,In).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(In).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},ei=[new L,new L,new L,new L,new L,new L,new L,new L],In=new L,go=new ji,Ms=new L,Ss=new L,ws=new L,_i=new L,vi=new L,Oi=new L,pr=new L,_o=new L,vo=new L,Ni=new L;function dc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ni.fromArray(i,r);let a=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),c=e.dot(Ni),l=t.dot(Ni),u=n.dot(Ni);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var ng=new ji,mr=new L,fc=new L,Rr=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ng.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mr.subVectors(e,this.center);let t=mr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(mr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mr.copy(e.center).add(fc)),this.expandByPoint(mr.copy(e.center).sub(fc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},ti=new L,pc=new L,yo=new L,yi=new L,mc=new L,xo=new L,gc=new L,Xs=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ti.copy(this.origin).addScaledVector(this.direction,t),ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){pc.copy(e).add(t).multiplyScalar(.5),yo.copy(t).sub(e).normalize(),yi.copy(this.origin).sub(pc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(yo),a=yi.dot(this.direction),c=-yi.dot(yo),l=yi.lengthSq(),u=Math.abs(1-o*o),d,f,p,v;if(u>0)if(d=o*c-a,f=o*a-c,v=r*u,d>=0)if(f>=-v)if(f<=v){let x=1/u;d*=x,f*=x,p=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;else f<=-v?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+f*(f+2*c)+l):f<=v?(d=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+f*(f+2*c)+l);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(pc).addScaledVector(yo,f),p}intersectSphere(e,t){ti.subVectors(e.center,this.origin);let n=ti.dot(this.direction),s=ti.dot(ti)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ti)!==null}intersectTriangle(e,t,n,s,r){mc.subVectors(t,e),xo.subVectors(n,e),gc.crossVectors(mc,xo);let o=this.direction.dot(gc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;yi.subVectors(this.origin,e);let c=a*this.direction.dot(xo.crossVectors(yi,xo));if(c<0)return null;let l=a*this.direction.dot(mc.cross(yi));if(l<0||c+l>o)return null;let u=-a*yi.dot(gc);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ct=class i{constructor(e,t,n,s,r,o,a,c,l,u,d,f,p,v,x,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,d,f,p,v,x,g)}set(e,t,n,s,r,o,a,c,l,u,d,f,p,v,x,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=f,m[3]=p,m[7]=v,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Es.setFromMatrixColumn(e,0).length(),r=1/Es.setFromMatrixColumn(e,1).length(),o=1/Es.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let f=o*u,p=o*d,v=a*u,x=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+v*l,t[5]=f-x*l,t[9]=-a*c,t[2]=x-f*l,t[6]=v+p*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,p=c*d,v=l*u,x=l*d;t[0]=f+x*a,t[4]=v*a-p,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=p*a-v,t[6]=x+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,p=c*d,v=l*u,x=l*d;t[0]=f-x*a,t[4]=-o*d,t[8]=v+p*a,t[1]=p+v*a,t[5]=o*u,t[9]=x-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,p=o*d,v=a*u,x=a*d;t[0]=c*u,t[4]=v*l-p,t[8]=f*l+x,t[1]=c*d,t[5]=x*l+f,t[9]=p*l-v,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,p=o*l,v=a*c,x=a*l;t[0]=c*u,t[4]=x-f*d,t[8]=v*d+p,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*d+v,t[10]=f-x*d}else if(e.order==="XZY"){let f=o*c,p=o*l,v=a*c,x=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+x,t[5]=o*u,t[9]=p*d-v,t[2]=v*d-p,t[6]=a*u,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ig,e,sg)}lookAt(e,t,n){let s=this.elements;return fn.subVectors(e,t),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),xi.crossVectors(n,fn),xi.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),xi.crossVectors(n,fn)),xi.normalize(),bo.crossVectors(fn,xi),s[0]=xi.x,s[4]=bo.x,s[8]=fn.x,s[1]=xi.y,s[5]=bo.y,s[9]=fn.y,s[2]=xi.z,s[6]=bo.z,s[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],p=n[13],v=n[2],x=n[6],g=n[10],m=n[14],T=n[3],E=n[7],M=n[11],N=n[15],I=s[0],U=s[4],P=s[8],A=s[12],S=s[1],O=s[5],Z=s[9],q=s[13],ne=s[2],ce=s[6],J=s[10],de=s[14],ee=s[3],_e=s[7],Te=s[11],Ce=s[15];return r[0]=o*I+a*S+c*ne+l*ee,r[4]=o*U+a*O+c*ce+l*_e,r[8]=o*P+a*Z+c*J+l*Te,r[12]=o*A+a*q+c*de+l*Ce,r[1]=u*I+d*S+f*ne+p*ee,r[5]=u*U+d*O+f*ce+p*_e,r[9]=u*P+d*Z+f*J+p*Te,r[13]=u*A+d*q+f*de+p*Ce,r[2]=v*I+x*S+g*ne+m*ee,r[6]=v*U+x*O+g*ce+m*_e,r[10]=v*P+x*Z+g*J+m*Te,r[14]=v*A+x*q+g*de+m*Ce,r[3]=T*I+E*S+M*ne+N*ee,r[7]=T*U+E*O+M*ce+N*_e,r[11]=T*P+E*Z+M*J+N*Te,r[15]=T*A+E*q+M*de+N*Ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],p=e[14],v=e[3],x=e[7],g=e[11],m=e[15];return v*(+r*c*d-s*l*d-r*a*f+n*l*f+s*a*p-n*c*p)+x*(+t*c*p-t*l*f+r*o*f-s*o*p+s*l*u-r*c*u)+g*(+t*l*d-t*a*p-r*o*d+n*o*p+r*a*u-n*l*u)+m*(-s*a*u-t*c*d+t*a*f+s*o*d-n*o*f+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],p=e[11],v=e[12],x=e[13],g=e[14],m=e[15],T=d*g*l-x*f*l+x*c*p-a*g*p-d*c*m+a*f*m,E=v*f*l-u*g*l-v*c*p+o*g*p+u*c*m-o*f*m,M=u*x*l-v*d*l+v*a*p-o*x*p-u*a*m+o*d*m,N=v*d*c-u*x*c-v*a*f+o*x*f+u*a*g-o*d*g,I=t*T+n*E+s*M+r*N;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/I;return e[0]=T*U,e[1]=(x*f*r-d*g*r-x*s*p+n*g*p+d*s*m-n*f*m)*U,e[2]=(a*g*r-x*c*r+x*s*l-n*g*l-a*s*m+n*c*m)*U,e[3]=(d*c*r-a*f*r-d*s*l+n*f*l+a*s*p-n*c*p)*U,e[4]=E*U,e[5]=(u*g*r-v*f*r+v*s*p-t*g*p-u*s*m+t*f*m)*U,e[6]=(v*c*r-o*g*r-v*s*l+t*g*l+o*s*m-t*c*m)*U,e[7]=(o*f*r-u*c*r+u*s*l-t*f*l-o*s*p+t*c*p)*U,e[8]=M*U,e[9]=(v*d*r-u*x*r-v*n*p+t*x*p+u*n*m-t*d*m)*U,e[10]=(o*x*r-v*a*r+v*n*l-t*x*l-o*n*m+t*a*m)*U,e[11]=(u*a*r-o*d*r-u*n*l+t*d*l+o*n*p-t*a*p)*U,e[12]=N*U,e[13]=(u*x*s-v*d*s+v*n*f-t*x*f-u*n*g+t*d*g)*U,e[14]=(v*a*s-o*x*s-v*n*c+t*x*c+o*n*g-t*a*g)*U,e[15]=(o*d*s-u*a*s+u*n*c-t*d*c-o*n*f+t*a*f)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,d=a+a,f=r*l,p=r*u,v=r*d,x=o*u,g=o*d,m=a*d,T=c*l,E=c*u,M=c*d,N=n.x,I=n.y,U=n.z;return s[0]=(1-(x+m))*N,s[1]=(p+M)*N,s[2]=(v-E)*N,s[3]=0,s[4]=(p-M)*I,s[5]=(1-(f+m))*I,s[6]=(g+T)*I,s[7]=0,s[8]=(v+E)*U,s[9]=(g-T)*U,s[10]=(1-(f+x))*U,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Es.set(s[0],s[1],s[2]).length(),o=Es.set(s[4],s[5],s[6]).length(),a=Es.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Ln.copy(this);let l=1/r,u=1/o,d=1/a;return Ln.elements[0]*=l,Ln.elements[1]*=l,Ln.elements[2]*=l,Ln.elements[4]*=u,Ln.elements[5]*=u,Ln.elements[6]*=u,Ln.elements[8]*=d,Ln.elements[9]*=d,Ln.elements[10]*=d,t.setFromRotationMatrix(Ln),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=ai){let c=this.elements,l=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),p,v;if(a===ai)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Wo)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ai){let c=this.elements,l=1/(t-e),u=1/(n-s),d=1/(o-r),f=(t+e)*l,p=(n+s)*u,v,x;if(a===ai)v=(o+r)*d,x=-2*d;else if(a===Wo)v=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Es=new L,Ln=new Ct,ig=new L(0,0,0),sg=new L(1,1,1),xi=new L,bo=new L,fn=new L,Hu=new Ct,Vu=new kn,$n=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ft(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ft(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Hu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vu.setFromEuler(this),this.setFromQuaternion(Vu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};$n.DEFAULT_ORDER="XYZ";var Cr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},rg=0,Gu=new L,Ts=new kn,ni=new Ct,Mo=new L,gr=new L,og=new L,ag=new kn,Wu=new L(1,0,0),Xu=new L(0,1,0),$u=new L(0,0,1),qu={type:"added"},cg={type:"removed"},As={type:"childadded",child:null},_c={type:"childremoved",child:null},tn=class i extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rg++}),this.uuid=Zs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new $n,n=new kn,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ct},normalMatrix:{value:new et}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.multiply(Ts),this}rotateOnWorldAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.premultiply(Ts),this}rotateX(e){return this.rotateOnAxis(Wu,e)}rotateY(e){return this.rotateOnAxis(Xu,e)}rotateZ(e){return this.rotateOnAxis($u,e)}translateOnAxis(e,t){return Gu.copy(e).applyQuaternion(this.quaternion),this.position.add(Gu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wu,e)}translateY(e){return this.translateOnAxis(Xu,e)}translateZ(e){return this.translateOnAxis($u,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Mo.copy(e):Mo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt(gr,Mo,this.up):ni.lookAt(Mo,gr,this.up),this.quaternion.setFromRotationMatrix(ni),s&&(ni.extractRotation(s.matrixWorld),Ts.setFromRotationMatrix(ni),this.quaternion.premultiply(Ts.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qu),As.child=e,this.dispatchEvent(As),As.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cg),_c.child=e,this.dispatchEvent(_c),_c.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qu),As.child=e,this.dispatchEvent(As),As.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,e,og),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,ag,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};tn.DEFAULT_UP=new L(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Dn=new L,ii=new L,vc=new L,si=new L,Rs=new L,Cs=new L,ju=new L,yc=new L,xc=new L,bc=new L,Mc=new yt,Sc=new yt,wc=new yt,Gi=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Dn.subVectors(e,t),s.cross(Dn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Dn.subVectors(s,t),ii.subVectors(n,t),vc.subVectors(e,t);let o=Dn.dot(Dn),a=Dn.dot(ii),c=Dn.dot(vc),l=ii.dot(ii),u=ii.dot(vc),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let f=1/d,p=(l*c-a*u)*f,v=(o*u-a*c)*f;return r.set(1-p-v,v,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,si)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,si.x),c.addScaledVector(o,si.y),c.addScaledVector(a,si.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Mc.setScalar(0),Sc.setScalar(0),wc.setScalar(0),Mc.fromBufferAttribute(e,t),Sc.fromBufferAttribute(e,n),wc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Mc,r.x),o.addScaledVector(Sc,r.y),o.addScaledVector(wc,r.z),o}static isFrontFacing(e,t,n,s){return Dn.subVectors(n,t),ii.subVectors(e,t),Dn.cross(ii).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dn.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),Dn.cross(ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Rs.subVectors(s,n),Cs.subVectors(r,n),yc.subVectors(e,n);let c=Rs.dot(yc),l=Cs.dot(yc);if(c<=0&&l<=0)return t.copy(n);xc.subVectors(e,s);let u=Rs.dot(xc),d=Cs.dot(xc);if(u>=0&&d<=u)return t.copy(s);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(Rs,o);bc.subVectors(e,r);let p=Rs.dot(bc),v=Cs.dot(bc);if(v>=0&&p<=v)return t.copy(r);let x=p*l-c*v;if(x<=0&&l>=0&&v<=0)return a=l/(l-v),t.copy(n).addScaledVector(Cs,a);let g=u*v-p*d;if(g<=0&&d-u>=0&&p-v>=0)return ju.subVectors(r,s),a=(d-u)/(d-u+(p-v)),t.copy(s).addScaledVector(ju,a);let m=1/(g+x+f);return o=x*m,a=f*m,t.copy(n).addScaledVector(Rs,o).addScaledVector(Cs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},jd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},So={h:0,s:0,l:0};function Ec(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ct=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,ut.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=ut.workingColorSpace){if(e=yh(e,1),t=Ft(t,0,1),n=Ft(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ec(o,r,e+1/3),this.g=Ec(o,r,e),this.b=Ec(o,r,e-1/3)}return ut.toWorkingColorSpace(this,s),this}setStyle(e,t=Yt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){let n=jd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ci(e.r),this.g=ci(e.g),this.b=ci(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return ut.fromWorkingColorSpace(jt.copy(this),e),Math.round(Ft(jt.r*255,0,255))*65536+Math.round(Ft(jt.g*255,0,255))*256+Math.round(Ft(jt.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.fromWorkingColorSpace(jt.copy(this),t);let n=jt.r,s=jt.g,r=jt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ut.workingColorSpace){return ut.fromWorkingColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=Yt){ut.fromWorkingColorSpace(jt.copy(this),e);let t=jt.r,n=jt.g,s=jt.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(bi),this.setHSL(bi.h+e,bi.s+t,bi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bi),e.getHSL(So);let n=Mr(bi.h,So.h,t),s=Mr(bi.s,So.s,t),r=Mr(bi.l,So.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},jt=new ct;ct.NAMES=jd;var lg=0,Yi=class extends hi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=Zs(),this.name="",this.blending=Ns,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zc,this.blendDst=Hc,this.blendEquation=Vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xs,this.stencilZFail=xs,this.stencilZPass=xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ns&&(n.blending=this.blending),this.side!==Ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zc&&(n.blendSrc=this.blendSrc),this.blendDst!==Hc&&(n.blendDst=this.blendDst),this.blendEquation!==Vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},bn=class extends Yi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Dd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Lt=new L,wo=new ve,xn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Iu,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)wo.fromBufferAttribute(this,t),wo.applyMatrix3(e),this.setXY(t,wo.x,wo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Us(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Us(t,this.array)),t}setX(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Us(t,this.array)),t}setY(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Us(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Us(t,this.array)),t}setW(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),n=Kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),n=Kt(n,this.array),s=Kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),n=Kt(n,this.array),s=Kt(s,this.array),r=Kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Iu&&(e.usage=this.usage),e}};var jo=class extends xn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Yo=class extends xn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var pt=class extends xn{constructor(e,t,n){super(new Float32Array(e),t,n)}},hg=0,yn=new Ct,Tc=new tn,Ps=new L,pn=new ji,_r=new ji,Gt=new L,an=class i extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hg++}),this.uuid=Zs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qd(e)?Yo:jo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new et().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,n){return yn.makeTranslation(e,t,n),this.applyMatrix4(yn),this}scale(e,t,n){return yn.makeScale(e,t,n),this.applyMatrix4(yn),this}lookAt(e){return Tc.lookAt(e),Tc.updateMatrix(),this.applyMatrix4(Tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pt(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ji);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];pn.setFromBufferAttribute(r),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];_r.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(pn.min,_r.min),pn.expandByPoint(Gt),Gt.addVectors(pn.max,_r.max),pn.expandByPoint(Gt)):(pn.expandByPoint(_r.min),pn.expandByPoint(_r.max))}pn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Gt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Gt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Gt.fromBufferAttribute(a,l),c&&(Ps.fromBufferAttribute(e,l),Gt.add(Ps)),s=Math.max(s,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new L,c[P]=new L;let l=new L,u=new L,d=new L,f=new ve,p=new ve,v=new ve,x=new L,g=new L;function m(P,A,S){l.fromBufferAttribute(n,P),u.fromBufferAttribute(n,A),d.fromBufferAttribute(n,S),f.fromBufferAttribute(r,P),p.fromBufferAttribute(r,A),v.fromBufferAttribute(r,S),u.sub(l),d.sub(l),p.sub(f),v.sub(f);let O=1/(p.x*v.y-v.x*p.y);isFinite(O)&&(x.copy(u).multiplyScalar(v.y).addScaledVector(d,-p.y).multiplyScalar(O),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(O),a[P].add(x),a[A].add(x),a[S].add(x),c[P].add(g),c[A].add(g),c[S].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let P=0,A=T.length;P<A;++P){let S=T[P],O=S.start,Z=S.count;for(let q=O,ne=O+Z;q<ne;q+=3)m(e.getX(q+0),e.getX(q+1),e.getX(q+2))}let E=new L,M=new L,N=new L,I=new L;function U(P){N.fromBufferAttribute(s,P),I.copy(N);let A=a[P];E.copy(A),E.sub(N.multiplyScalar(N.dot(A))).normalize(),M.crossVectors(I,A);let O=M.dot(c[P])<0?-1:1;o.setXYZW(P,E.x,E.y,E.z,O)}for(let P=0,A=T.length;P<A;++P){let S=T[P],O=S.start,Z=S.count;for(let q=O,ne=O+Z;q<ne;q+=3)U(e.getX(q+0)),U(e.getX(q+1)),U(e.getX(q+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,u=new L,d=new L;if(e)for(let f=0,p=e.count;f<p;f+=3){let v=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,g),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,v),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(u),c.add(u),l.add(u),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),p=0,v=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*u;for(let m=0;m<u;m++)f[v++]=l[p++]}return new xn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],p=e(f,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],d=r[l];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yu=new Ct,Fi=new Xs,Eo=new Rr,Zu=new L,To=new L,Ao=new L,Ro=new L,Ac=new L,Co=new L,Ju=new L,Po=new L,Xe=class extends tn{constructor(e=new an,t=new bn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Co.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],d=r[c];u!==0&&(Ac.fromBufferAttribute(d,e),o?Co.addScaledVector(Ac,u):Co.addScaledVector(Ac.sub(t),u))}t.add(Co)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!(Eo.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Eo,Zu)===null||Fi.origin.distanceToSquared(Zu)>(e.far-e.near)**2))&&(Yu.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(Yu),!(n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=f.length;v<x;v++){let g=f[v],m=o[g.materialIndex],T=Math.max(g.start,p.start),E=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let M=T,N=E;M<N;M+=3){let I=a.getX(M),U=a.getX(M+1),P=a.getX(M+2);s=Io(this,m,e,n,l,u,d,I,U,P),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let v=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let g=v,m=x;g<m;g+=3){let T=a.getX(g),E=a.getX(g+1),M=a.getX(g+2);s=Io(this,o,e,n,l,u,d,T,E,M),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let v=0,x=f.length;v<x;v++){let g=f[v],m=o[g.materialIndex],T=Math.max(g.start,p.start),E=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let M=T,N=E;M<N;M+=3){let I=M,U=M+1,P=M+2;s=Io(this,m,e,n,l,u,d,I,U,P),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let v=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let g=v,m=x;g<m;g+=3){let T=g,E=g+1,M=g+2;s=Io(this,o,e,n,l,u,d,T,E,M),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function ug(i,e,t,n,s,r,o,a){let c;if(e.side===on?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Ti,a),c===null)return null;Po.copy(a),Po.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Po);return l<t.near||l>t.far?null:{distance:l,point:Po.clone(),object:i}}function Io(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,To),i.getVertexPosition(c,Ao),i.getVertexPosition(l,Ro);let u=ug(i,e,t,n,To,Ao,Ro,Ju);if(u){let d=new L;Gi.getBarycoord(Ju,To,Ao,Ro,d),s&&(u.uv=Gi.getInterpolatedAttribute(s,a,c,l,d,new ve)),r&&(u.uv1=Gi.getInterpolatedAttribute(r,a,c,l,d,new ve)),o&&(u.normal=Gi.getInterpolatedAttribute(o,a,c,l,d,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new L,materialIndex:0};Gi.getNormal(To,Ao,Ro,f.normal),u.face=f,u.barycoord=d}return u}var Zi=class i extends an{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],d=[],f=0,p=0;v("z","y","x",-1,-1,n,t,e,o,r,0),v("z","y","x",1,-1,n,t,-e,o,r,1),v("x","z","y",1,1,e,n,t,s,o,2),v("x","z","y",1,-1,e,n,-t,s,o,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(u,3)),this.setAttribute("uv",new pt(d,2));function v(x,g,m,T,E,M,N,I,U,P,A){let S=M/U,O=N/P,Z=M/2,q=N/2,ne=I/2,ce=U+1,J=P+1,de=0,ee=0,_e=new L;for(let Te=0;Te<J;Te++){let Ce=Te*O-q;for(let Be=0;Be<ce;Be++){let Ne=Be*S-Z;_e[x]=Ne*T,_e[g]=Ce*E,_e[m]=ne,l.push(_e.x,_e.y,_e.z),_e[x]=0,_e[g]=0,_e[m]=I>0?1:-1,u.push(_e.x,_e.y,_e.z),d.push(Be/U),d.push(1-Te/P),de+=1}}for(let Te=0;Te<P;Te++)for(let Ce=0;Ce<U;Ce++){let Be=f+Ce+ce*Te,Ne=f+Ce+ce*(Te+1),$=f+(Ce+1)+ce*(Te+1),le=f+(Ce+1)+ce*Te;c.push(Be,Ne,le),c.push(Ne,$,le),ee+=6}a.addGroup(p,ee,A),p+=ee,f+=de}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function $s(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Qt(i){let e={};for(let t=0;t<i.length;t++){let n=$s(i[t]);for(let s in n)e[s]=n[s]}return e}function dg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Yd(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}var fg={clone:$s,merge:Qt},pg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qn=class extends Yi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pg,this.fragmentShader=mg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$s(e.uniforms),this.uniformsGroups=dg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Zo=class extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=ai}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Mi=new L,Ku=new ve,Qu=new ve,Zt=class extends Zo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ar*2*Math.atan(Math.tan(br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z),Mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z)}getViewSize(e,t){return this.getViewBounds(e,Ku,Qu),t.subVectors(Qu,Ku)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(br*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Is=-90,Ls=1,Cl=class extends tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Zt(Is,Ls,e,t);s.layers=this.layers,this.add(s);let r=new Zt(Is,Ls,e,t);r.layers=this.layers,this.add(r);let o=new Zt(Is,Ls,e,t);o.layers=this.layers,this.add(o);let a=new Zt(Is,Ls,e,t);a.layers=this.layers,this.add(a);let c=new Zt(Is,Ls,e,t);c.layers=this.layers,this.add(c);let l=new Zt(Is,Ls,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===ai)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Wo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},Jo=class extends en{constructor(e,t,n,s,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Hs,super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Pl=class extends ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Jo(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Xn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Zi(5,5,5),r=new qn({name:"CubemapFromEquirect",uniforms:$s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:wi});r.uniforms.tEquirect.value=t;let o=new Xe(s,r),a=t.minFilter;return t.minFilter===$i&&(t.minFilter=Xn),new Cl(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Rc=new L,gg=new L,_g=new et,Un=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Rc.subVectors(n,t).cross(gg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Rc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||_g.getNormalMatrix(e),s=this.coplanarPoint(Rc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ki=new Rr,Lo=new L,Pr=class{constructor(e=new Un,t=new Un,n=new Un,s=new Un,r=new Un,o=new Un){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ai){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],d=s[6],f=s[7],p=s[8],v=s[9],x=s[10],g=s[11],m=s[12],T=s[13],E=s[14],M=s[15];if(n[0].setComponents(c-r,f-l,g-p,M-m).normalize(),n[1].setComponents(c+r,f+l,g+p,M+m).normalize(),n[2].setComponents(c+o,f+u,g+v,M+T).normalize(),n[3].setComponents(c-o,f-u,g-v,M-T).normalize(),n[4].setComponents(c-a,f-d,g-x,M-E).normalize(),t===ai)n[5].setComponents(c+a,f+d,g+x,M+E).normalize();else if(t===Wo)n[5].setComponents(a,d,x,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){return ki.center.set(0,0,0),ki.radius=.7071067811865476,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Lo.x=s.normal.x>0?e.max.x:e.min.x,Lo.y=s.normal.y>0?e.max.y:e.min.y,Lo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Lo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Zd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function vg(i){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,v)=>p.start-v.start);let f=0;for(let p=1;p<d.length;p++){let v=d[f],x=d[p];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++f,d[f]=x)}d.length=f+1;for(let p=0,v=d.length;p<v;p++){let x=d[p];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Mn=class i extends an{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,d=e/a,f=t/c,p=[],v=[],x=[],g=[];for(let m=0;m<u;m++){let T=m*f-o;for(let E=0;E<l;E++){let M=E*d-r;v.push(M,-T,0),x.push(0,0,1),g.push(E/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let T=0;T<a;T++){let E=T+l*m,M=T+l*(m+1),N=T+1+l*(m+1),I=T+1+l*m;p.push(E,M,I),p.push(M,N,I)}this.setIndex(p),this.setAttribute("position",new pt(v,3)),this.setAttribute("normal",new pt(x,3)),this.setAttribute("uv",new pt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},yg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xg=`#ifdef USE_ALPHAHASH
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
#endif`,bg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eg=`#ifdef USE_AOMAP
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
#endif`,Tg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ag=`#ifdef USE_BATCHING
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
#endif`,Rg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ig=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Lg=`#ifdef USE_IRIDESCENCE
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
#endif`,Dg=`#ifdef USE_BUMPMAP
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
#endif`,Ug=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Og=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ng=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Hg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Vg=`#define PI 3.141592653589793
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
} // validated`,Gg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Wg=`vec3 transformedNormal = objectNormal;
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
#endif`,Xg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$g=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jg=`#ifdef USE_ENVMAP
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
#endif`,Kg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Qg=`#ifdef USE_ENVMAP
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
#endif`,e_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,t_=`#ifdef USE_ENVMAP
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
#endif`,n_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,i_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,s_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,r_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,o_=`#ifdef USE_GRADIENTMAP
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
}`,a_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,c_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,l_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,h_=`uniform bool receiveShadow;
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
#endif`,u_=`#ifdef USE_ENVMAP
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
#endif`,d_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,f_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,p_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,m_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,g_=`PhysicalMaterial material;
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
#endif`,__=`struct PhysicalMaterial {
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
}`,v_=`
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
#endif`,y_=`#if defined( RE_IndirectDiffuse )
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
#endif`,x_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,b_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,M_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,S_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,w_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,E_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,T_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,A_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,R_=`#if defined( USE_POINTS_UV )
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
#endif`,C_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,P_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,I_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,L_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,D_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U_=`#ifdef USE_MORPHTARGETS
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
#endif`,O_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,N_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,F_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,k_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,z_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,H_=`#ifdef USE_NORMALMAP
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
#endif`,V_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,G_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,W_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,X_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,j_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Y_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Z_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,J_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,K_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Q_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,e0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,t0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,n0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,i0=`float getShadowMask() {
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
}`,s0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,r0=`#ifdef USE_SKINNING
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
#endif`,o0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,a0=`#ifdef USE_SKINNING
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
#endif`,c0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,l0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,h0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,u0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,d0=`#ifdef USE_TRANSMISSION
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
#endif`,f0=`#ifdef USE_TRANSMISSION
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
#endif`,p0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,g0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,v0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,y0=`uniform sampler2D t2D;
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
}`,x0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,M0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,S0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w0=`#include <common>
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
}`,E0=`#if DEPTH_PACKING == 3200
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
}`,T0=`#define DISTANCE
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
}`,A0=`#define DISTANCE
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
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,C0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P0=`uniform float scale;
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
}`,I0=`uniform vec3 diffuse;
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
}`,L0=`#include <common>
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
}`,D0=`uniform vec3 diffuse;
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
}`,U0=`#define LAMBERT
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
}`,O0=`#define LAMBERT
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
}`,N0=`#define MATCAP
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
}`,F0=`#define MATCAP
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
}`,k0=`#define NORMAL
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
}`,B0=`#define NORMAL
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
}`,z0=`#define PHONG
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
}`,H0=`#define PHONG
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
}`,V0=`#define STANDARD
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
}`,G0=`#define STANDARD
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
}`,W0=`#define TOON
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
}`,X0=`#define TOON
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
}`,$0=`uniform float size;
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
}`,q0=`uniform vec3 diffuse;
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
}`,j0=`#include <common>
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
}`,Y0=`uniform vec3 color;
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
}`,Z0=`uniform float rotation;
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
}`,J0=`uniform vec3 diffuse;
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
}`,st={alphahash_fragment:yg,alphahash_pars_fragment:xg,alphamap_fragment:bg,alphamap_pars_fragment:Mg,alphatest_fragment:Sg,alphatest_pars_fragment:wg,aomap_fragment:Eg,aomap_pars_fragment:Tg,batching_pars_vertex:Ag,batching_vertex:Rg,begin_vertex:Cg,beginnormal_vertex:Pg,bsdfs:Ig,iridescence_fragment:Lg,bumpmap_pars_fragment:Dg,clipping_planes_fragment:Ug,clipping_planes_pars_fragment:Og,clipping_planes_pars_vertex:Ng,clipping_planes_vertex:Fg,color_fragment:kg,color_pars_fragment:Bg,color_pars_vertex:zg,color_vertex:Hg,common:Vg,cube_uv_reflection_fragment:Gg,defaultnormal_vertex:Wg,displacementmap_pars_vertex:Xg,displacementmap_vertex:$g,emissivemap_fragment:qg,emissivemap_pars_fragment:jg,colorspace_fragment:Yg,colorspace_pars_fragment:Zg,envmap_fragment:Jg,envmap_common_pars_fragment:Kg,envmap_pars_fragment:Qg,envmap_pars_vertex:e_,envmap_physical_pars_fragment:u_,envmap_vertex:t_,fog_vertex:n_,fog_pars_vertex:i_,fog_fragment:s_,fog_pars_fragment:r_,gradientmap_pars_fragment:o_,lightmap_pars_fragment:a_,lights_lambert_fragment:c_,lights_lambert_pars_fragment:l_,lights_pars_begin:h_,lights_toon_fragment:d_,lights_toon_pars_fragment:f_,lights_phong_fragment:p_,lights_phong_pars_fragment:m_,lights_physical_fragment:g_,lights_physical_pars_fragment:__,lights_fragment_begin:v_,lights_fragment_maps:y_,lights_fragment_end:x_,logdepthbuf_fragment:b_,logdepthbuf_pars_fragment:M_,logdepthbuf_pars_vertex:S_,logdepthbuf_vertex:w_,map_fragment:E_,map_pars_fragment:T_,map_particle_fragment:A_,map_particle_pars_fragment:R_,metalnessmap_fragment:C_,metalnessmap_pars_fragment:P_,morphinstance_vertex:I_,morphcolor_vertex:L_,morphnormal_vertex:D_,morphtarget_pars_vertex:U_,morphtarget_vertex:O_,normal_fragment_begin:N_,normal_fragment_maps:F_,normal_pars_fragment:k_,normal_pars_vertex:B_,normal_vertex:z_,normalmap_pars_fragment:H_,clearcoat_normal_fragment_begin:V_,clearcoat_normal_fragment_maps:G_,clearcoat_pars_fragment:W_,iridescence_pars_fragment:X_,opaque_fragment:$_,packing:q_,premultiplied_alpha_fragment:j_,project_vertex:Y_,dithering_fragment:Z_,dithering_pars_fragment:J_,roughnessmap_fragment:K_,roughnessmap_pars_fragment:Q_,shadowmap_pars_fragment:e0,shadowmap_pars_vertex:t0,shadowmap_vertex:n0,shadowmask_pars_fragment:i0,skinbase_vertex:s0,skinning_pars_vertex:r0,skinning_vertex:o0,skinnormal_vertex:a0,specularmap_fragment:c0,specularmap_pars_fragment:l0,tonemapping_fragment:h0,tonemapping_pars_fragment:u0,transmission_fragment:d0,transmission_pars_fragment:f0,uv_pars_fragment:p0,uv_pars_vertex:m0,uv_vertex:g0,worldpos_vertex:_0,background_vert:v0,background_frag:y0,backgroundCube_vert:x0,backgroundCube_frag:b0,cube_vert:M0,cube_frag:S0,depth_vert:w0,depth_frag:E0,distanceRGBA_vert:T0,distanceRGBA_frag:A0,equirect_vert:R0,equirect_frag:C0,linedashed_vert:P0,linedashed_frag:I0,meshbasic_vert:L0,meshbasic_frag:D0,meshlambert_vert:U0,meshlambert_frag:O0,meshmatcap_vert:N0,meshmatcap_frag:F0,meshnormal_vert:k0,meshnormal_frag:B0,meshphong_vert:z0,meshphong_frag:H0,meshphysical_vert:V0,meshphysical_frag:G0,meshtoon_vert:W0,meshtoon_frag:X0,points_vert:$0,points_frag:q0,shadow_vert:j0,shadow_frag:Y0,sprite_vert:Z0,sprite_frag:J0},we={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Wn={basic:{uniforms:Qt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:st.meshbasic_vert,fragmentShader:st.meshbasic_frag},lambert:{uniforms:Qt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new ct(0)}}]),vertexShader:st.meshlambert_vert,fragmentShader:st.meshlambert_frag},phong:{uniforms:Qt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30}}]),vertexShader:st.meshphong_vert,fragmentShader:st.meshphong_frag},standard:{uniforms:Qt([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag},toon:{uniforms:Qt([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new ct(0)}}]),vertexShader:st.meshtoon_vert,fragmentShader:st.meshtoon_frag},matcap:{uniforms:Qt([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:st.meshmatcap_vert,fragmentShader:st.meshmatcap_frag},points:{uniforms:Qt([we.points,we.fog]),vertexShader:st.points_vert,fragmentShader:st.points_frag},dashed:{uniforms:Qt([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:st.linedashed_vert,fragmentShader:st.linedashed_frag},depth:{uniforms:Qt([we.common,we.displacementmap]),vertexShader:st.depth_vert,fragmentShader:st.depth_frag},normal:{uniforms:Qt([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:st.meshnormal_vert,fragmentShader:st.meshnormal_frag},sprite:{uniforms:Qt([we.sprite,we.fog]),vertexShader:st.sprite_vert,fragmentShader:st.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:st.background_vert,fragmentShader:st.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:st.backgroundCube_vert,fragmentShader:st.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:st.cube_vert,fragmentShader:st.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:st.equirect_vert,fragmentShader:st.equirect_frag},distanceRGBA:{uniforms:Qt([we.common,we.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:st.distanceRGBA_vert,fragmentShader:st.distanceRGBA_frag},shadow:{uniforms:Qt([we.lights,we.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:st.shadow_vert,fragmentShader:st.shadow_frag}};Wn.physical={uniforms:Qt([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag};var Do={r:0,b:0,g:0},Bi=new $n,K0=new Ct;function Q0(i,e,t,n,s,r,o){let a=new ct(0),c=r===!0?0:1,l,u,d=null,f=0,p=null;function v(T){let E=T.isScene===!0?T.background:null;return E&&E.isTexture&&(E=(T.backgroundBlurriness>0?t:e).get(E)),E}function x(T){let E=!1,M=v(T);M===null?m(a,c):M&&M.isColor&&(m(M,1),E=!0);let N=i.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,o):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(T,E){let M=v(E);M&&(M.isCubeTexture||M.mapping===ya)?(u===void 0&&(u=new Xe(new Zi(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:$s(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(N,I,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Bi.copy(E.backgroundRotation),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(K0.makeRotationFromEuler(Bi)),u.material.toneMapped=ut.getTransfer(M.colorSpace)!==vt,(d!==M||f!==M.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,d=M,f=M.version,p=i.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Xe(new Mn(2,2),new qn({name:"BackgroundMaterial",uniforms:$s(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=ut.getTransfer(M.colorSpace)!==vt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=M,f=M.version,p=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function m(T,E){T.getRGB(Do,Yd(i)),n.buffers.color.setClear(Do.r,Do.g,Do.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(T,E=1){a.set(T),c=E,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,m(a,c)},render:x,addToRenderList:g}}function ev(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(S,O,Z,q,ne){let ce=!1,J=d(q,Z,O);r!==J&&(r=J,l(r.object)),ce=p(S,q,Z,ne),ce&&v(S,q,Z,ne),ne!==null&&e.update(ne,i.ELEMENT_ARRAY_BUFFER),(ce||o)&&(o=!1,M(S,O,Z,q),ne!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(ne).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function d(S,O,Z){let q=Z.wireframe===!0,ne=n[S.id];ne===void 0&&(ne={},n[S.id]=ne);let ce=ne[O.id];ce===void 0&&(ce={},ne[O.id]=ce);let J=ce[q];return J===void 0&&(J=f(c()),ce[q]=J),J}function f(S){let O=[],Z=[],q=[];for(let ne=0;ne<t;ne++)O[ne]=0,Z[ne]=0,q[ne]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Z,attributeDivisors:q,object:S,attributes:{},index:null}}function p(S,O,Z,q){let ne=r.attributes,ce=O.attributes,J=0,de=Z.getAttributes();for(let ee in de)if(de[ee].location>=0){let Te=ne[ee],Ce=ce[ee];if(Ce===void 0&&(ee==="instanceMatrix"&&S.instanceMatrix&&(Ce=S.instanceMatrix),ee==="instanceColor"&&S.instanceColor&&(Ce=S.instanceColor)),Te===void 0||Te.attribute!==Ce||Ce&&Te.data!==Ce.data)return!0;J++}return r.attributesNum!==J||r.index!==q}function v(S,O,Z,q){let ne={},ce=O.attributes,J=0,de=Z.getAttributes();for(let ee in de)if(de[ee].location>=0){let Te=ce[ee];Te===void 0&&(ee==="instanceMatrix"&&S.instanceMatrix&&(Te=S.instanceMatrix),ee==="instanceColor"&&S.instanceColor&&(Te=S.instanceColor));let Ce={};Ce.attribute=Te,Te&&Te.data&&(Ce.data=Te.data),ne[ee]=Ce,J++}r.attributes=ne,r.attributesNum=J,r.index=q}function x(){let S=r.newAttributes;for(let O=0,Z=S.length;O<Z;O++)S[O]=0}function g(S){m(S,0)}function m(S,O){let Z=r.newAttributes,q=r.enabledAttributes,ne=r.attributeDivisors;Z[S]=1,q[S]===0&&(i.enableVertexAttribArray(S),q[S]=1),ne[S]!==O&&(i.vertexAttribDivisor(S,O),ne[S]=O)}function T(){let S=r.newAttributes,O=r.enabledAttributes;for(let Z=0,q=O.length;Z<q;Z++)O[Z]!==S[Z]&&(i.disableVertexAttribArray(Z),O[Z]=0)}function E(S,O,Z,q,ne,ce,J){J===!0?i.vertexAttribIPointer(S,O,Z,ne,ce):i.vertexAttribPointer(S,O,Z,q,ne,ce)}function M(S,O,Z,q){x();let ne=q.attributes,ce=Z.getAttributes(),J=O.defaultAttributeValues;for(let de in ce){let ee=ce[de];if(ee.location>=0){let _e=ne[de];if(_e===void 0&&(de==="instanceMatrix"&&S.instanceMatrix&&(_e=S.instanceMatrix),de==="instanceColor"&&S.instanceColor&&(_e=S.instanceColor)),_e!==void 0){let Te=_e.normalized,Ce=_e.itemSize,Be=e.get(_e);if(Be===void 0)continue;let Ne=Be.buffer,$=Be.type,le=Be.bytesPerElement,Le=$===i.INT||$===i.UNSIGNED_INT||_e.gpuType===fh;if(_e.isInterleavedBufferAttribute){let he=_e.data,Fe=he.stride,$e=_e.offset;if(he.isInstancedInterleavedBuffer){for(let nt=0;nt<ee.locationSize;nt++)m(ee.location+nt,he.meshPerAttribute);S.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let nt=0;nt<ee.locationSize;nt++)g(ee.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Ne);for(let nt=0;nt<ee.locationSize;nt++)E(ee.location+nt,Ce/ee.locationSize,$,Te,Fe*le,($e+Ce/ee.locationSize*nt)*le,Le)}else{if(_e.isInstancedBufferAttribute){for(let he=0;he<ee.locationSize;he++)m(ee.location+he,_e.meshPerAttribute);S.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let he=0;he<ee.locationSize;he++)g(ee.location+he);i.bindBuffer(i.ARRAY_BUFFER,Ne);for(let he=0;he<ee.locationSize;he++)E(ee.location+he,Ce/ee.locationSize,$,Te,Ce*le,Ce/ee.locationSize*he*le,Le)}}else if(J!==void 0){let Te=J[de];if(Te!==void 0)switch(Te.length){case 2:i.vertexAttrib2fv(ee.location,Te);break;case 3:i.vertexAttrib3fv(ee.location,Te);break;case 4:i.vertexAttrib4fv(ee.location,Te);break;default:i.vertexAttrib1fv(ee.location,Te)}}}}T()}function N(){P();for(let S in n){let O=n[S];for(let Z in O){let q=O[Z];for(let ne in q)u(q[ne].object),delete q[ne];delete O[Z]}delete n[S]}}function I(S){if(n[S.id]===void 0)return;let O=n[S.id];for(let Z in O){let q=O[Z];for(let ne in q)u(q[ne].object),delete q[ne];delete O[Z]}delete n[S.id]}function U(S){for(let O in n){let Z=n[O];if(Z[S.id]===void 0)continue;let q=Z[S.id];for(let ne in q)u(q[ne].object),delete q[ne];delete Z[S.id]}}function P(){A(),o=!0,r!==s&&(r=s,l(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:A,dispose:N,releaseStatesOfGeometry:I,releaseStatesOfProgram:U,initAttributes:x,enableAttribute:g,disableUnusedAttributes:T}}function tv(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),t.update(u,n,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let p=0;for(let v=0;v<d;v++)p+=u[v];t.update(p,n,1)}function c(l,u,d,f){if(d===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<l.length;v++)o(l[v],u[v],f[v]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,d);let v=0;for(let x=0;x<d;x++)v+=u[x]*f[x];t.update(v,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function nv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let U=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(U){return!(U!==Nn&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(U){let P=U===Nr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==li&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==oi&&!P)}function c(U){if(U==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),N=v>0,I=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:M,vertexTextures:N,maxSamples:I}}function iv(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Un,a=new et,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let p=d.length!==0||f||n!==0||s;return s=f,n=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,p){let v=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||v===null||v.length===0||r&&!g)r?u(null):l();else{let T=r?0:n,E=T*4,M=m.clippingState||null;c.value=M,M=u(v,f,E,p);for(let N=0;N!==E;++N)M[N]=t[N];m.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,p,v){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=c.value,v!==!0||g===null){let m=p+x*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,M=p;E!==x;++E,M+=4)o.copy(d[E]).applyMatrix4(T,a),o.normal.toArray(g,M),g[M+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function sv(i){let e=new WeakMap;function t(o,a){return a===Yc?o.mapping=Hs:a===Zc&&(o.mapping=Vs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Yc||a===Zc)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Pl(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Ko=class extends Zo{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Os=4,ed=[.125,.215,.35,.446,.526,.582],Wi=20,Cc=new Ko,td=new ct,Pc=null,Ic=0,Lc=0,Dc=!1,Hi=(1+Math.sqrt(5))/2,Ds=1/Hi,nd=[new L(-Hi,Ds,0),new L(Hi,Ds,0),new L(-Ds,0,Hi),new L(Ds,0,Hi),new L(0,Hi,-Ds),new L(0,Hi,Ds),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Qo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Pc=this._renderer.getRenderTarget(),Ic=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Dc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pc,Ic,Lc),this._renderer.xr.enabled=Dc,e.scissorTest=!1,Uo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hs||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pc=this._renderer.getRenderTarget(),Ic=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Dc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Xn,minFilter:Xn,generateMipmaps:!1,type:Nr,format:Nn,colorSpace:Ys,depthBuffer:!1},s=id(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=id(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rv(r)),this._blurMaterial=ov(r,e,t)}return s}_compileMaterial(e){let t=new Xe(this._lodPlanes[0],e);this._renderer.compile(t,Cc)}_sceneToCubeUV(e,t,n,s){let a=new Zt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(td),u.toneMapping=Ei,u.autoClear=!1;let p=new bn({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),v=new Xe(new Zi,p),x=!1,g=e.background;g?g.isColor&&(p.color.copy(g),e.background=null,x=!0):(p.color.copy(td),x=!0);for(let m=0;m<6;m++){let T=m%3;T===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):T===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));let E=this._cubeSize;Uo(s,T*E,m>2?E:0,E,E),u.setRenderTarget(s),x&&u.render(v,a),u.render(e,a)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=g}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Hs||e.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=rd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sd());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Xe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Uo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Cc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=nd[(s-r-1)%nd.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new Xe(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Wi-1),x=r/v,g=isFinite(r)?1+Math.floor(u*x):Wi;g>Wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Wi}`);let m=[],T=0;for(let U=0;U<Wi;++U){let P=U/x,A=Math.exp(-P*P/2);m.push(A),U===0?T+=A:U<g&&(T+=2*A)}for(let U=0;U<m.length;U++)m[U]=m[U]/T;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:E}=this;f.dTheta.value=v,f.mipInt.value=E-n;let M=this._sizeLods[s],N=3*M*(s>E-Os?s-E+Os:0),I=4*(this._cubeSize-M);Uo(t,N,I,3*M,2*M),c.setRenderTarget(t),c.render(d,Cc)}};function rv(i){let e=[],t=[],n=[],s=i,r=i-Os+1+ed.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Os?c=ed[o-i+Os-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,v=6,x=3,g=2,m=1,T=new Float32Array(x*v*p),E=new Float32Array(g*v*p),M=new Float32Array(m*v*p);for(let I=0;I<p;I++){let U=I%3*2/3-1,P=I>2?0:-1,A=[U,P,0,U+2/3,P,0,U+2/3,P+1,0,U,P,0,U+2/3,P+1,0,U,P+1,0];T.set(A,x*v*I),E.set(f,g*v*I);let S=[I,I,I,I,I,I];M.set(S,m*v*I)}let N=new an;N.setAttribute("position",new xn(T,x)),N.setAttribute("uv",new xn(E,g)),N.setAttribute("faceIndex",new xn(M,m)),e.push(N),s>Os&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function id(i,e,t){let n=new ui(i,e,t);return n.texture.mapping=ya,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Uo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function ov(i,e,t){let n=new Float32Array(Wi),s=new L(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:Wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xh(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function sd(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xh(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function rd(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function xh(){return`

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
	`}function av(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Yc||c===Zc,u=c===Hs||c===Vs;if(l||u){let d=e.get(a),f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Qo(i)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{let p=a.image;return l&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new Qo(i)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function cv(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&yr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function lv(i,e,t,n){let s={},r=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let v in f.attributes)e.remove(f.attributes[v]);for(let v in f.morphAttributes){let x=f.morphAttributes[v];for(let g=0,m=x.length;g<m;g++)e.remove(x[g])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let v in f)e.update(f[v],i.ARRAY_BUFFER);let p=d.morphAttributes;for(let v in p){let x=p[v];for(let g=0,m=x.length;g<m;g++)e.update(x[g],i.ARRAY_BUFFER)}}function l(d){let f=[],p=d.index,v=d.attributes.position,x=0;if(p!==null){let T=p.array;x=p.version;for(let E=0,M=T.length;E<M;E+=3){let N=T[E+0],I=T[E+1],U=T[E+2];f.push(N,I,I,U,U,N)}}else if(v!==void 0){let T=v.array;x=v.version;for(let E=0,M=T.length/3-1;E<M;E+=3){let N=E+0,I=E+1,U=E+2;f.push(N,I,I,U,U,N)}}else return;let g=new(qd(f)?Yo:jo)(f,1);g.version=x;let m=r.get(d);m&&e.remove(m),r.set(d,g)}function u(d){let f=r.get(d);if(f){let p=d.index;p!==null&&f.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function hv(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function l(f,p,v){v!==0&&(i.drawElementsInstanced(n,p,r,f*o,v),t.update(p,n,v))}function u(f,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,v);let g=0;for(let m=0;m<v;m++)g+=p[m];t.update(g,n,1)}function d(f,p,v,x){if(v===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f.length;m++)l(f[m]/o,p[m],x[m]);else{g.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,x,0,v);let m=0;for(let T=0;T<v;T++)m+=p[T]*x[T];t.update(m,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function uv(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function dv(i,e,t){let n=new WeakMap,s=new yt;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=n.get(a);if(f===void 0||f.count!==d){let A=function(){U.dispose(),n.delete(a),a.removeEventListener("dispose",A)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],T=a.morphAttributes.color||[],E=0;p===!0&&(E=1),v===!0&&(E=2),x===!0&&(E=3);let M=a.attributes.position.count*E,N=1;M>e.maxTextureSize&&(N=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let I=new Float32Array(M*N*4*d),U=new qo(I,M,N,d);U.type=oi,U.needsUpdate=!0;let P=E*4;for(let S=0;S<d;S++){let O=g[S],Z=m[S],q=T[S],ne=M*N*4*S;for(let ce=0;ce<O.count;ce++){let J=ce*P;p===!0&&(s.fromBufferAttribute(O,ce),I[ne+J+0]=s.x,I[ne+J+1]=s.y,I[ne+J+2]=s.z,I[ne+J+3]=0),v===!0&&(s.fromBufferAttribute(Z,ce),I[ne+J+4]=s.x,I[ne+J+5]=s.y,I[ne+J+6]=s.z,I[ne+J+7]=0),x===!0&&(s.fromBufferAttribute(q,ce),I[ne+J+8]=s.x,I[ne+J+9]=s.y,I[ne+J+10]=s.z,I[ne+J+11]=q.itemSize===4?s.w:1)}}f={count:d,texture:U,size:new ve(M,N)},n.set(a,f),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];let v=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function fv(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return d}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var ea=class extends en{constructor(e,t,n,s,r,o,a,c,l,u=Fs){if(u!==Fs&&u!==Ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Fs&&(n=qi),n===void 0&&u===Ws&&(n=Gs),super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Fn,this.minFilter=c!==void 0?c:Fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Jd=new en,od=new ea(1,1),Kd=new qo,Qd=new Rl,ef=new Jo,ad=[],cd=[],ld=new Float32Array(16),hd=new Float32Array(9),ud=new Float32Array(4);function Js(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=ad[s];if(r===void 0&&(r=new Float32Array(s),ad[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Bt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ba(i,e){let t=cd[e];t===void 0&&(t=new Int32Array(e),cd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function pv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function mv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Bt(t,e)}}function gv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Bt(t,e)}}function _v(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Bt(t,e)}}function vv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;ud.set(n),i.uniformMatrix2fv(this.addr,!1,ud),Bt(t,n)}}function yv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;hd.set(n),i.uniformMatrix3fv(this.addr,!1,hd),Bt(t,n)}}function xv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(kt(t,n))return;ld.set(n),i.uniformMatrix4fv(this.addr,!1,ld),Bt(t,n)}}function bv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Mv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Bt(t,e)}}function Sv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Bt(t,e)}}function wv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Bt(t,e)}}function Ev(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Tv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Bt(t,e)}}function Av(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Bt(t,e)}}function Rv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Bt(t,e)}}function Cv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(od.compareFunction=$d,r=od):r=Jd,t.setTexture2D(e||r,s)}function Pv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Qd,s)}function Iv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||ef,s)}function Lv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Kd,s)}function Dv(i){switch(i){case 5126:return pv;case 35664:return mv;case 35665:return gv;case 35666:return _v;case 35674:return vv;case 35675:return yv;case 35676:return xv;case 5124:case 35670:return bv;case 35667:case 35671:return Mv;case 35668:case 35672:return Sv;case 35669:case 35673:return wv;case 5125:return Ev;case 36294:return Tv;case 36295:return Av;case 36296:return Rv;case 35678:case 36198:case 36298:case 36306:case 35682:return Cv;case 35679:case 36299:case 36307:return Pv;case 35680:case 36300:case 36308:case 36293:return Iv;case 36289:case 36303:case 36311:case 36292:return Lv}}function Uv(i,e){i.uniform1fv(this.addr,e)}function Ov(i,e){let t=Js(e,this.size,2);i.uniform2fv(this.addr,t)}function Nv(i,e){let t=Js(e,this.size,3);i.uniform3fv(this.addr,t)}function Fv(i,e){let t=Js(e,this.size,4);i.uniform4fv(this.addr,t)}function kv(i,e){let t=Js(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Bv(i,e){let t=Js(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function zv(i,e){let t=Js(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Hv(i,e){i.uniform1iv(this.addr,e)}function Vv(i,e){i.uniform2iv(this.addr,e)}function Gv(i,e){i.uniform3iv(this.addr,e)}function Wv(i,e){i.uniform4iv(this.addr,e)}function Xv(i,e){i.uniform1uiv(this.addr,e)}function $v(i,e){i.uniform2uiv(this.addr,e)}function qv(i,e){i.uniform3uiv(this.addr,e)}function jv(i,e){i.uniform4uiv(this.addr,e)}function Yv(i,e,t){let n=this.cache,s=e.length,r=ba(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Jd,r[o])}function Zv(i,e,t){let n=this.cache,s=e.length,r=ba(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Qd,r[o])}function Jv(i,e,t){let n=this.cache,s=e.length,r=ba(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||ef,r[o])}function Kv(i,e,t){let n=this.cache,s=e.length,r=ba(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Kd,r[o])}function Qv(i){switch(i){case 5126:return Uv;case 35664:return Ov;case 35665:return Nv;case 35666:return Fv;case 35674:return kv;case 35675:return Bv;case 35676:return zv;case 5124:case 35670:return Hv;case 35667:case 35671:return Vv;case 35668:case 35672:return Gv;case 35669:case 35673:return Wv;case 5125:return Xv;case 36294:return $v;case 36295:return qv;case 36296:return jv;case 35678:case 36198:case 36298:case 36306:case 35682:return Yv;case 35679:case 36299:case 36307:return Zv;case 35680:case 36300:case 36308:case 36293:return Jv;case 36289:case 36303:case 36311:case 36292:return Kv}}var Il=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Dv(t.type)}},Ll=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qv(t.type)}},Dl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Uc=/(\w+)(\])?(\[|\.)?/g;function dd(i,e){i.seq.push(e),i.map[e.id]=e}function ey(i,e,t){let n=i.name,s=n.length;for(Uc.lastIndex=0;;){let r=Uc.exec(n),o=Uc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){dd(t,l===void 0?new Il(a,i,e):new Ll(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new Dl(a),dd(t,d)),t=d}}}var Bs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);ey(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function fd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var ty=37297,ny=0;function iy(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var pd=new et;function sy(i){ut._getMatrix(pd,ut.workingColorSpace,i);let e=`mat3( ${pd.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(i)){case xa:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function md(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+iy(i.getShaderSource(e),o)}else return s}function ry(i,e){let t=sy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function oy(i,e){let t;switch(e){case _m:t="Linear";break;case vm:t="Reinhard";break;case ym:t="Cineon";break;case dh:t="ACESFilmic";break;case bm:t="AgX";break;case Mm:t="Neutral";break;case xm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Oo=new L;function ay(){ut.getLuminanceCoefficients(Oo);let i=Oo.x.toFixed(4),e=Oo.y.toFixed(4),t=Oo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xr).join(`
`)}function ly(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function hy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function xr(i){return i!==""}function gd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _d(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var uy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ul(i){return i.replace(uy,fy)}var dy=new Map;function fy(i,e){let t=st[e];if(t===void 0){let n=dy.get(e);if(n!==void 0)t=st[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ul(t)}var py=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vd(i){return i.replace(py,my)}function my(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function yd(i){let e=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function gy(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ld?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===uh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ri&&(e="SHADOWMAP_TYPE_VSM"),e}function _y(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hs:case Vs:e="ENVMAP_TYPE_CUBE";break;case ya:e="ENVMAP_TYPE_CUBE_UV";break}return e}function vy(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vs:e="ENVMAP_MODE_REFRACTION";break}return e}function yy(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Dd:e="ENVMAP_BLENDING_MULTIPLY";break;case mm:e="ENVMAP_BLENDING_MIX";break;case gm:e="ENVMAP_BLENDING_ADD";break}return e}function xy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function by(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=gy(t),l=_y(t),u=vy(t),d=yy(t),f=xy(t),p=cy(t),v=ly(r),x=s.createProgram(),g,m,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(xr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(xr).join(`
`),m.length>0&&(m+=`
`)):(g=[yd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xr).join(`
`),m=[yd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ei?"#define TONE_MAPPING":"",t.toneMapping!==Ei?st.tonemapping_pars_fragment:"",t.toneMapping!==Ei?oy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",st.colorspace_pars_fragment,ry("linearToOutputTexel",t.outputColorSpace),ay(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xr).join(`
`)),o=Ul(o),o=gd(o,t),o=_d(o,t),a=Ul(a),a=gd(a,t),a=_d(a,t),o=vd(o),a=vd(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Lu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Lu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let E=T+g+o,M=T+m+a,N=fd(s,s.VERTEX_SHADER,E),I=fd(s,s.FRAGMENT_SHADER,M);s.attachShader(x,N),s.attachShader(x,I),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function U(O){if(i.debug.checkShaderErrors){let Z=s.getProgramInfoLog(x).trim(),q=s.getShaderInfoLog(N).trim(),ne=s.getShaderInfoLog(I).trim(),ce=!0,J=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(ce=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,N,I);else{let de=md(s,N,"vertex"),ee=md(s,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+Z+`
`+de+`
`+ee)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(q===""||ne==="")&&(J=!1);J&&(O.diagnostics={runnable:ce,programLog:Z,vertexShader:{log:q,prefix:g},fragmentShader:{log:ne,prefix:m}})}s.deleteShader(N),s.deleteShader(I),P=new Bs(s,x),A=hy(s,x)}let P;this.getUniforms=function(){return P===void 0&&U(this),P};let A;this.getAttributes=function(){return A===void 0&&U(this),A};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(x,ty)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ny++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=N,this.fragmentShader=I,this}var My=0,Ol=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Nl(e),t.set(e,n)),n}},Nl=class{constructor(e){this.id=My++,this.code=e,this.usedTimes=0}};function Sy(i,e,t,n,s,r,o){let a=new Cr,c=new Ol,l=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(A){return l.add(A),A===0?"uv":`uv${A}`}function g(A,S,O,Z,q){let ne=Z.fog,ce=q.geometry,J=A.isMeshStandardMaterial?Z.environment:null,de=(A.isMeshStandardMaterial?t:e).get(A.envMap||J),ee=de&&de.mapping===ya?de.image.height:null,_e=v[A.type];A.precision!==null&&(p=s.getMaxPrecision(A.precision),p!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",p,"instead."));let Te=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,Ce=Te!==void 0?Te.length:0,Be=0;ce.morphAttributes.position!==void 0&&(Be=1),ce.morphAttributes.normal!==void 0&&(Be=2),ce.morphAttributes.color!==void 0&&(Be=3);let Ne,$,le,Le;if(_e){let dt=Wn[_e];Ne=dt.vertexShader,$=dt.fragmentShader}else Ne=A.vertexShader,$=A.fragmentShader,c.update(A),le=c.getVertexShaderID(A),Le=c.getFragmentShaderID(A);let he=i.getRenderTarget(),Fe=i.state.buffers.depth.getReversed(),$e=q.isInstancedMesh===!0,nt=q.isBatchedMesh===!0,Ye=!!A.map,lt=!!A.matcap,St=!!de,V=!!A.aoMap,Ut=!!A.lightMap,Je=!!A.bumpMap,Ke=!!A.normalMap,Oe=!!A.displacementMap,bt=!!A.emissiveMap,ye=!!A.metalnessMap,C=!!A.roughnessMap,b=A.anisotropy>0,G=A.clearcoat>0,ie=A.dispersion>0,se=A.iridescence>0,te=A.sheen>0,De=A.transmission>0,Me=b&&!!A.anisotropyMap,pe=G&&!!A.clearcoatMap,ze=G&&!!A.clearcoatNormalMap,re=G&&!!A.clearcoatRoughnessMap,fe=se&&!!A.iridescenceMap,ke=se&&!!A.iridescenceThicknessMap,Ge=te&&!!A.sheenColorMap,Pe=te&&!!A.sheenRoughnessMap,ot=!!A.specularMap,Qe=!!A.specularColorMap,mt=!!A.specularIntensityMap,k=De&&!!A.transmissionMap,Ee=De&&!!A.thicknessMap,K=!!A.gradientMap,oe=!!A.alphaMap,Re=A.alphaTest>0,Ae=!!A.alphaHash,He=!!A.extensions,j=Ei;A.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(j=i.toneMapping);let Tt={shaderID:_e,shaderType:A.type,shaderName:A.name,vertexShader:Ne,fragmentShader:$,defines:A.defines,customVertexShaderID:le,customFragmentShaderID:Le,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:p,batching:nt,batchingColor:nt&&q._colorsTexture!==null,instancing:$e,instancingColor:$e&&q.instanceColor!==null,instancingMorph:$e&&q.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Ys,alphaToCoverage:!!A.alphaToCoverage,map:Ye,matcap:lt,envMap:St,envMapMode:St&&de.mapping,envMapCubeUVHeight:ee,aoMap:V,lightMap:Ut,bumpMap:Je,normalMap:Ke,displacementMap:f&&Oe,emissiveMap:bt,normalMapObjectSpace:Ke&&A.normalMapType===Tm,normalMapTangentSpace:Ke&&A.normalMapType===Xd,metalnessMap:ye,roughnessMap:C,anisotropy:b,anisotropyMap:Me,clearcoat:G,clearcoatMap:pe,clearcoatNormalMap:ze,clearcoatRoughnessMap:re,dispersion:ie,iridescence:se,iridescenceMap:fe,iridescenceThicknessMap:ke,sheen:te,sheenColorMap:Ge,sheenRoughnessMap:Pe,specularMap:ot,specularColorMap:Qe,specularIntensityMap:mt,transmission:De,transmissionMap:k,thicknessMap:Ee,gradientMap:K,opaque:A.transparent===!1&&A.blending===Ns&&A.alphaToCoverage===!1,alphaMap:oe,alphaTest:Re,alphaHash:Ae,combine:A.combine,mapUv:Ye&&x(A.map.channel),aoMapUv:V&&x(A.aoMap.channel),lightMapUv:Ut&&x(A.lightMap.channel),bumpMapUv:Je&&x(A.bumpMap.channel),normalMapUv:Ke&&x(A.normalMap.channel),displacementMapUv:Oe&&x(A.displacementMap.channel),emissiveMapUv:bt&&x(A.emissiveMap.channel),metalnessMapUv:ye&&x(A.metalnessMap.channel),roughnessMapUv:C&&x(A.roughnessMap.channel),anisotropyMapUv:Me&&x(A.anisotropyMap.channel),clearcoatMapUv:pe&&x(A.clearcoatMap.channel),clearcoatNormalMapUv:ze&&x(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&x(A.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&x(A.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&x(A.iridescenceThicknessMap.channel),sheenColorMapUv:Ge&&x(A.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&x(A.sheenRoughnessMap.channel),specularMapUv:ot&&x(A.specularMap.channel),specularColorMapUv:Qe&&x(A.specularColorMap.channel),specularIntensityMapUv:mt&&x(A.specularIntensityMap.channel),transmissionMapUv:k&&x(A.transmissionMap.channel),thicknessMapUv:Ee&&x(A.thicknessMap.channel),alphaMapUv:oe&&x(A.alphaMap.channel),vertexTangents:!!ce.attributes.tangent&&(Ke||b),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!ce.attributes.uv&&(Ye||oe),fog:!!ne,useFog:A.fog===!0,fogExp2:!!ne&&ne.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Fe,skinning:q.isSkinnedMesh===!0,morphTargets:ce.morphAttributes.position!==void 0,morphNormals:ce.morphAttributes.normal!==void 0,morphColors:ce.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:Be,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:A.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:j,decodeVideoTexture:Ye&&A.map.isVideoTexture===!0&&ut.getTransfer(A.map.colorSpace)===vt,decodeVideoTextureEmissive:bt&&A.emissiveMap.isVideoTexture===!0&&ut.getTransfer(A.emissiveMap.colorSpace)===vt,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===On,flipSided:A.side===on,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:He&&A.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(He&&A.extensions.multiDraw===!0||nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function m(A){let S=[];if(A.shaderID?S.push(A.shaderID):(S.push(A.customVertexShaderID),S.push(A.customFragmentShaderID)),A.defines!==void 0)for(let O in A.defines)S.push(O),S.push(A.defines[O]);return A.isRawShaderMaterial===!1&&(T(S,A),E(S,A),S.push(i.outputColorSpace)),S.push(A.customProgramCacheKey),S.join()}function T(A,S){A.push(S.precision),A.push(S.outputColorSpace),A.push(S.envMapMode),A.push(S.envMapCubeUVHeight),A.push(S.mapUv),A.push(S.alphaMapUv),A.push(S.lightMapUv),A.push(S.aoMapUv),A.push(S.bumpMapUv),A.push(S.normalMapUv),A.push(S.displacementMapUv),A.push(S.emissiveMapUv),A.push(S.metalnessMapUv),A.push(S.roughnessMapUv),A.push(S.anisotropyMapUv),A.push(S.clearcoatMapUv),A.push(S.clearcoatNormalMapUv),A.push(S.clearcoatRoughnessMapUv),A.push(S.iridescenceMapUv),A.push(S.iridescenceThicknessMapUv),A.push(S.sheenColorMapUv),A.push(S.sheenRoughnessMapUv),A.push(S.specularMapUv),A.push(S.specularColorMapUv),A.push(S.specularIntensityMapUv),A.push(S.transmissionMapUv),A.push(S.thicknessMapUv),A.push(S.combine),A.push(S.fogExp2),A.push(S.sizeAttenuation),A.push(S.morphTargetsCount),A.push(S.morphAttributeCount),A.push(S.numDirLights),A.push(S.numPointLights),A.push(S.numSpotLights),A.push(S.numSpotLightMaps),A.push(S.numHemiLights),A.push(S.numRectAreaLights),A.push(S.numDirLightShadows),A.push(S.numPointLightShadows),A.push(S.numSpotLightShadows),A.push(S.numSpotLightShadowsWithMaps),A.push(S.numLightProbes),A.push(S.shadowMapType),A.push(S.toneMapping),A.push(S.numClippingPlanes),A.push(S.numClipIntersection),A.push(S.depthPacking)}function E(A,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),A.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),A.push(a.mask)}function M(A){let S=v[A.type],O;if(S){let Z=Wn[S];O=fg.clone(Z.uniforms)}else O=A.uniforms;return O}function N(A,S){let O;for(let Z=0,q=u.length;Z<q;Z++){let ne=u[Z];if(ne.cacheKey===S){O=ne,++O.usedTimes;break}}return O===void 0&&(O=new by(i,S,A,r),u.push(O)),O}function I(A){if(--A.usedTimes===0){let S=u.indexOf(A);u[S]=u[u.length-1],u.pop(),A.destroy()}}function U(A){c.remove(A)}function P(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:M,acquireProgram:N,releaseProgram:I,releaseShaderCache:U,programs:u,dispose:P}}function wy(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ey(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function xd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d,f,p,v,x,g){let m=i[e];return m===void 0?(m={id:d.id,object:d,geometry:f,material:p,groupOrder:v,renderOrder:d.renderOrder,z:x,group:g},i[e]=m):(m.id=d.id,m.object=d,m.geometry=f,m.material=p,m.groupOrder=v,m.renderOrder=d.renderOrder,m.z=x,m.group=g),e++,m}function a(d,f,p,v,x,g){let m=o(d,f,p,v,x,g);p.transmission>0?n.push(m):p.transparent===!0?s.push(m):t.push(m)}function c(d,f,p,v,x,g){let m=o(d,f,p,v,x,g);p.transmission>0?n.unshift(m):p.transparent===!0?s.unshift(m):t.unshift(m)}function l(d,f){t.length>1&&t.sort(d||Ey),n.length>1&&n.sort(f||xd),s.length>1&&s.sort(f||xd)}function u(){for(let d=e,f=i.length;d<f;d++){let p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function Ty(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new bd,i.set(n,[o])):s>=r.length?(o=new bd,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Ay(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new ct};break;case"SpotLight":t={position:new L,direction:new L,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ct,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":t={color:new ct,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Ry(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Cy=0;function Py(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Iy(i){let e=new Ay,t=Ry(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new Ct,o=new Ct;function a(l){let u=0,d=0,f=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let p=0,v=0,x=0,g=0,m=0,T=0,E=0,M=0,N=0,I=0,U=0;l.sort(Py);for(let A=0,S=l.length;A<S;A++){let O=l[A],Z=O.color,q=O.intensity,ne=O.distance,ce=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)u+=Z.r*q,d+=Z.g*q,f+=Z.b*q;else if(O.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(O.sh.coefficients[J],q);U++}else if(O.isDirectionalLight){let J=e.get(O);if(J.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let de=O.shadow,ee=t.get(O);ee.shadowIntensity=de.intensity,ee.shadowBias=de.bias,ee.shadowNormalBias=de.normalBias,ee.shadowRadius=de.radius,ee.shadowMapSize=de.mapSize,n.directionalShadow[p]=ee,n.directionalShadowMap[p]=ce,n.directionalShadowMatrix[p]=O.shadow.matrix,T++}n.directional[p]=J,p++}else if(O.isSpotLight){let J=e.get(O);J.position.setFromMatrixPosition(O.matrixWorld),J.color.copy(Z).multiplyScalar(q),J.distance=ne,J.coneCos=Math.cos(O.angle),J.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),J.decay=O.decay,n.spot[x]=J;let de=O.shadow;if(O.map&&(n.spotLightMap[N]=O.map,N++,de.updateMatrices(O),O.castShadow&&I++),n.spotLightMatrix[x]=de.matrix,O.castShadow){let ee=t.get(O);ee.shadowIntensity=de.intensity,ee.shadowBias=de.bias,ee.shadowNormalBias=de.normalBias,ee.shadowRadius=de.radius,ee.shadowMapSize=de.mapSize,n.spotShadow[x]=ee,n.spotShadowMap[x]=ce,M++}x++}else if(O.isRectAreaLight){let J=e.get(O);J.color.copy(Z).multiplyScalar(q),J.halfWidth.set(O.width*.5,0,0),J.halfHeight.set(0,O.height*.5,0),n.rectArea[g]=J,g++}else if(O.isPointLight){let J=e.get(O);if(J.color.copy(O.color).multiplyScalar(O.intensity),J.distance=O.distance,J.decay=O.decay,O.castShadow){let de=O.shadow,ee=t.get(O);ee.shadowIntensity=de.intensity,ee.shadowBias=de.bias,ee.shadowNormalBias=de.normalBias,ee.shadowRadius=de.radius,ee.shadowMapSize=de.mapSize,ee.shadowCameraNear=de.camera.near,ee.shadowCameraFar=de.camera.far,n.pointShadow[v]=ee,n.pointShadowMap[v]=ce,n.pointShadowMatrix[v]=O.shadow.matrix,E++}n.point[v]=J,v++}else if(O.isHemisphereLight){let J=e.get(O);J.skyColor.copy(O.color).multiplyScalar(q),J.groundColor.copy(O.groundColor).multiplyScalar(q),n.hemi[m]=J,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;let P=n.hash;(P.directionalLength!==p||P.pointLength!==v||P.spotLength!==x||P.rectAreaLength!==g||P.hemiLength!==m||P.numDirectionalShadows!==T||P.numPointShadows!==E||P.numSpotShadows!==M||P.numSpotMaps!==N||P.numLightProbes!==U)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=g,n.point.length=v,n.hemi.length=m,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+N-I,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=U,P.directionalLength=p,P.pointLength=v,P.spotLength=x,P.rectAreaLength=g,P.hemiLength=m,P.numDirectionalShadows=T,P.numPointShadows=E,P.numSpotShadows=M,P.numSpotMaps=N,P.numLightProbes=U,n.version=Cy++)}function c(l,u){let d=0,f=0,p=0,v=0,x=0,g=u.matrixWorldInverse;for(let m=0,T=l.length;m<T;m++){let E=l[m];if(E.isDirectionalLight){let M=n.directional[d];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),d++}else if(E.isSpotLight){let M=n.spot[p];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),p++}else if(E.isRectAreaLight){let M=n.rectArea[v];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),v++}else if(E.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),f++}else if(E.isHemisphereLight){let M=n.hemi[x];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(g),x++}}}return{setup:a,setupView:c,state:n}}function Md(i){let e=new Iy(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Ly(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Md(i),e.set(s,[a])):r>=o.length?(a=new Md(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Fl=class extends Yi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=wm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},kl=class extends Yi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Dy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Uy=`uniform sampler2D shadow_pass;
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
}`;function Oy(i,e,t){let n=new Pr,s=new ve,r=new ve,o=new yt,a=new Fl({depthPacking:Em}),c=new kl,l={},u=t.maxTextureSize,d={[Ti]:on,[on]:Ti,[On]:On},f=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:Dy,fragmentShader:Uy}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let v=new an;v.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Xe(v,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ld;let m=this.type;this.render=function(I,U,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||I.length===0)return;let A=i.getRenderTarget(),S=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),Z=i.state;Z.setBlending(wi),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);let q=m!==ri&&this.type===ri,ne=m===ri&&this.type!==ri;for(let ce=0,J=I.length;ce<J;ce++){let de=I[ce],ee=de.shadow;if(ee===void 0){console.warn("THREE.WebGLShadowMap:",de,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;s.copy(ee.mapSize);let _e=ee.getFrameExtents();if(s.multiply(_e),r.copy(ee.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/_e.x),s.x=r.x*_e.x,ee.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/_e.y),s.y=r.y*_e.y,ee.mapSize.y=r.y)),ee.map===null||q===!0||ne===!0){let Ce=this.type!==ri?{minFilter:Fn,magFilter:Fn}:{};ee.map!==null&&ee.map.dispose(),ee.map=new ui(s.x,s.y,Ce),ee.map.texture.name=de.name+".shadowMap",ee.camera.updateProjectionMatrix()}i.setRenderTarget(ee.map),i.clear();let Te=ee.getViewportCount();for(let Ce=0;Ce<Te;Ce++){let Be=ee.getViewport(Ce);o.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),Z.viewport(o),ee.updateMatrices(de,Ce),n=ee.getFrustum(),M(U,P,ee.camera,de,this.type)}ee.isPointLightShadow!==!0&&this.type===ri&&T(ee,P),ee.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(A,S,O)};function T(I,U){let P=e.update(x);f.defines.VSM_SAMPLES!==I.blurSamples&&(f.defines.VSM_SAMPLES=I.blurSamples,p.defines.VSM_SAMPLES=I.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new ui(s.x,s.y)),f.uniforms.shadow_pass.value=I.map.texture,f.uniforms.resolution.value=I.mapSize,f.uniforms.radius.value=I.radius,i.setRenderTarget(I.mapPass),i.clear(),i.renderBufferDirect(U,null,P,f,x,null),p.uniforms.shadow_pass.value=I.mapPass.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,i.setRenderTarget(I.map),i.clear(),i.renderBufferDirect(U,null,P,p,x,null)}function E(I,U,P,A){let S=null,O=P.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(O!==void 0)S=O;else if(S=P.isPointLight===!0?c:a,i.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){let Z=S.uuid,q=U.uuid,ne=l[Z];ne===void 0&&(ne={},l[Z]=ne);let ce=ne[q];ce===void 0&&(ce=S.clone(),ne[q]=ce,U.addEventListener("dispose",N)),S=ce}if(S.visible=U.visible,S.wireframe=U.wireframe,A===ri?S.side=U.shadowSide!==null?U.shadowSide:U.side:S.side=U.shadowSide!==null?U.shadowSide:d[U.side],S.alphaMap=U.alphaMap,S.alphaTest=U.alphaTest,S.map=U.map,S.clipShadows=U.clipShadows,S.clippingPlanes=U.clippingPlanes,S.clipIntersection=U.clipIntersection,S.displacementMap=U.displacementMap,S.displacementScale=U.displacementScale,S.displacementBias=U.displacementBias,S.wireframeLinewidth=U.wireframeLinewidth,S.linewidth=U.linewidth,P.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let Z=i.properties.get(S);Z.light=P}return S}function M(I,U,P,A,S){if(I.visible===!1)return;if(I.layers.test(U.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&S===ri)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,I.matrixWorld);let q=e.update(I),ne=I.material;if(Array.isArray(ne)){let ce=q.groups;for(let J=0,de=ce.length;J<de;J++){let ee=ce[J],_e=ne[ee.materialIndex];if(_e&&_e.visible){let Te=E(I,_e,A,S);I.onBeforeShadow(i,I,U,P,q,Te,ee),i.renderBufferDirect(P,null,q,Te,I,ee),I.onAfterShadow(i,I,U,P,q,Te,ee)}}}else if(ne.visible){let ce=E(I,ne,A,S);I.onBeforeShadow(i,I,U,P,q,ce,null),i.renderBufferDirect(P,null,q,ce,I,null),I.onAfterShadow(i,I,U,P,q,ce,null)}}let Z=I.children;for(let q=0,ne=Z.length;q<ne;q++)M(Z[q],U,P,A,S)}function N(I){I.target.removeEventListener("dispose",N);for(let P in l){let A=l[P],S=I.target.uuid;S in A&&(A[S].dispose(),delete A[S])}}}var Ny={[Vc]:Gc,[Wc]:qc,[Xc]:jc,[zs]:$c,[Gc]:Vc,[qc]:Wc,[jc]:Xc,[$c]:zs};function Fy(i,e){function t(){let k=!1,Ee=new yt,K=null,oe=new yt(0,0,0,0);return{setMask:function(Re){K!==Re&&!k&&(i.colorMask(Re,Re,Re,Re),K=Re)},setLocked:function(Re){k=Re},setClear:function(Re,Ae,He,j,Tt){Tt===!0&&(Re*=j,Ae*=j,He*=j),Ee.set(Re,Ae,He,j),oe.equals(Ee)===!1&&(i.clearColor(Re,Ae,He,j),oe.copy(Ee))},reset:function(){k=!1,K=null,oe.set(-1,0,0,0)}}}function n(){let k=!1,Ee=!1,K=null,oe=null,Re=null;return{setReversed:function(Ae){if(Ee!==Ae){let He=e.get("EXT_clip_control");Ee?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT);let j=Re;Re=null,this.setClear(j)}Ee=Ae},getReversed:function(){return Ee},setTest:function(Ae){Ae?he(i.DEPTH_TEST):Fe(i.DEPTH_TEST)},setMask:function(Ae){K!==Ae&&!k&&(i.depthMask(Ae),K=Ae)},setFunc:function(Ae){if(Ee&&(Ae=Ny[Ae]),oe!==Ae){switch(Ae){case Vc:i.depthFunc(i.NEVER);break;case Gc:i.depthFunc(i.ALWAYS);break;case Wc:i.depthFunc(i.LESS);break;case zs:i.depthFunc(i.LEQUAL);break;case Xc:i.depthFunc(i.EQUAL);break;case $c:i.depthFunc(i.GEQUAL);break;case qc:i.depthFunc(i.GREATER);break;case jc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=Ae}},setLocked:function(Ae){k=Ae},setClear:function(Ae){Re!==Ae&&(Ee&&(Ae=1-Ae),i.clearDepth(Ae),Re=Ae)},reset:function(){k=!1,K=null,oe=null,Re=null,Ee=!1}}}function s(){let k=!1,Ee=null,K=null,oe=null,Re=null,Ae=null,He=null,j=null,Tt=null;return{setTest:function(dt){k||(dt?he(i.STENCIL_TEST):Fe(i.STENCIL_TEST))},setMask:function(dt){Ee!==dt&&!k&&(i.stencilMask(dt),Ee=dt)},setFunc:function(dt,sn,Jt){(K!==dt||oe!==sn||Re!==Jt)&&(i.stencilFunc(dt,sn,Jt),K=dt,oe=sn,Re=Jt)},setOp:function(dt,sn,Jt){(Ae!==dt||He!==sn||j!==Jt)&&(i.stencilOp(dt,sn,Jt),Ae=dt,He=sn,j=Jt)},setLocked:function(dt){k=dt},setClear:function(dt){Tt!==dt&&(i.clearStencil(dt),Tt=dt)},reset:function(){k=!1,Ee=null,K=null,oe=null,Re=null,Ae=null,He=null,j=null,Tt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,p=[],v=null,x=!1,g=null,m=null,T=null,E=null,M=null,N=null,I=null,U=new ct(0,0,0),P=0,A=!1,S=null,O=null,Z=null,q=null,ne=null,ce=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,de=0,ee=i.getParameter(i.VERSION);ee.indexOf("WebGL")!==-1?(de=parseFloat(/^WebGL (\d)/.exec(ee)[1]),J=de>=1):ee.indexOf("OpenGL ES")!==-1&&(de=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),J=de>=2);let _e=null,Te={},Ce=i.getParameter(i.SCISSOR_BOX),Be=i.getParameter(i.VIEWPORT),Ne=new yt().fromArray(Ce),$=new yt().fromArray(Be);function le(k,Ee,K,oe){let Re=new Uint8Array(4),Ae=i.createTexture();i.bindTexture(k,Ae),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let He=0;He<K;He++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(Ee,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,Re):i.texImage2D(Ee+He,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Re);return Ae}let Le={};Le[i.TEXTURE_2D]=le(i.TEXTURE_2D,i.TEXTURE_2D,1),Le[i.TEXTURE_CUBE_MAP]=le(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Le[i.TEXTURE_2D_ARRAY]=le(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Le[i.TEXTURE_3D]=le(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),he(i.DEPTH_TEST),o.setFunc(zs),Je(!1),Ke(Su),he(i.CULL_FACE),V(wi);function he(k){u[k]!==!0&&(i.enable(k),u[k]=!0)}function Fe(k){u[k]!==!1&&(i.disable(k),u[k]=!1)}function $e(k,Ee){return d[k]!==Ee?(i.bindFramebuffer(k,Ee),d[k]=Ee,k===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=Ee),k===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=Ee),!0):!1}function nt(k,Ee){let K=p,oe=!1;if(k){K=f.get(Ee),K===void 0&&(K=[],f.set(Ee,K));let Re=k.textures;if(K.length!==Re.length||K[0]!==i.COLOR_ATTACHMENT0){for(let Ae=0,He=Re.length;Ae<He;Ae++)K[Ae]=i.COLOR_ATTACHMENT0+Ae;K.length=Re.length,oe=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,oe=!0);oe&&i.drawBuffers(K)}function Ye(k){return v!==k?(i.useProgram(k),v=k,!0):!1}let lt={[Vi]:i.FUNC_ADD,[Kp]:i.FUNC_SUBTRACT,[Qp]:i.FUNC_REVERSE_SUBTRACT};lt[em]=i.MIN,lt[tm]=i.MAX;let St={[nm]:i.ZERO,[im]:i.ONE,[sm]:i.SRC_COLOR,[zc]:i.SRC_ALPHA,[hm]:i.SRC_ALPHA_SATURATE,[cm]:i.DST_COLOR,[om]:i.DST_ALPHA,[rm]:i.ONE_MINUS_SRC_COLOR,[Hc]:i.ONE_MINUS_SRC_ALPHA,[lm]:i.ONE_MINUS_DST_COLOR,[am]:i.ONE_MINUS_DST_ALPHA,[um]:i.CONSTANT_COLOR,[dm]:i.ONE_MINUS_CONSTANT_COLOR,[fm]:i.CONSTANT_ALPHA,[pm]:i.ONE_MINUS_CONSTANT_ALPHA};function V(k,Ee,K,oe,Re,Ae,He,j,Tt,dt){if(k===wi){x===!0&&(Fe(i.BLEND),x=!1);return}if(x===!1&&(he(i.BLEND),x=!0),k!==Jp){if(k!==g||dt!==A){if((m!==Vi||M!==Vi)&&(i.blendEquation(i.FUNC_ADD),m=Vi,M=Vi),dt)switch(k){case Ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wu:i.blendFunc(i.ONE,i.ONE);break;case Eu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Tu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wu:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Eu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Tu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}T=null,E=null,N=null,I=null,U.set(0,0,0),P=0,g=k,A=dt}return}Re=Re||Ee,Ae=Ae||K,He=He||oe,(Ee!==m||Re!==M)&&(i.blendEquationSeparate(lt[Ee],lt[Re]),m=Ee,M=Re),(K!==T||oe!==E||Ae!==N||He!==I)&&(i.blendFuncSeparate(St[K],St[oe],St[Ae],St[He]),T=K,E=oe,N=Ae,I=He),(j.equals(U)===!1||Tt!==P)&&(i.blendColor(j.r,j.g,j.b,Tt),U.copy(j),P=Tt),g=k,A=!1}function Ut(k,Ee){k.side===On?Fe(i.CULL_FACE):he(i.CULL_FACE);let K=k.side===on;Ee&&(K=!K),Je(K),k.blending===Ns&&k.transparent===!1?V(wi):V(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);let oe=k.stencilWrite;a.setTest(oe),oe&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),bt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?he(i.SAMPLE_ALPHA_TO_COVERAGE):Fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Je(k){S!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),S=k)}function Ke(k){k!==Yp?(he(i.CULL_FACE),k!==O&&(k===Su?i.cullFace(i.BACK):k===Zp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Fe(i.CULL_FACE),O=k}function Oe(k){k!==Z&&(J&&i.lineWidth(k),Z=k)}function bt(k,Ee,K){k?(he(i.POLYGON_OFFSET_FILL),(q!==Ee||ne!==K)&&(i.polygonOffset(Ee,K),q=Ee,ne=K)):Fe(i.POLYGON_OFFSET_FILL)}function ye(k){k?he(i.SCISSOR_TEST):Fe(i.SCISSOR_TEST)}function C(k){k===void 0&&(k=i.TEXTURE0+ce-1),_e!==k&&(i.activeTexture(k),_e=k)}function b(k,Ee,K){K===void 0&&(_e===null?K=i.TEXTURE0+ce-1:K=_e);let oe=Te[K];oe===void 0&&(oe={type:void 0,texture:void 0},Te[K]=oe),(oe.type!==k||oe.texture!==Ee)&&(_e!==K&&(i.activeTexture(K),_e=K),i.bindTexture(k,Ee||Le[k]),oe.type=k,oe.texture=Ee)}function G(){let k=Te[_e];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ie(){try{i.compressedTexImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function se(){try{i.compressedTexImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function te(){try{i.texSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function De(){try{i.texSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Me(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function pe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ze(){try{i.texStorage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{i.texStorage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function fe(){try{i.texImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ke(){try{i.texImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ge(k){Ne.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Ne.copy(k))}function Pe(k){$.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),$.copy(k))}function ot(k,Ee){let K=l.get(Ee);K===void 0&&(K=new WeakMap,l.set(Ee,K));let oe=K.get(k);oe===void 0&&(oe=i.getUniformBlockIndex(Ee,k.name),K.set(k,oe))}function Qe(k,Ee){let oe=l.get(Ee).get(k);c.get(Ee)!==oe&&(i.uniformBlockBinding(Ee,oe,k.__bindingPointIndex),c.set(Ee,oe))}function mt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},_e=null,Te={},d={},f=new WeakMap,p=[],v=null,x=!1,g=null,m=null,T=null,E=null,M=null,N=null,I=null,U=new ct(0,0,0),P=0,A=!1,S=null,O=null,Z=null,q=null,ne=null,Ne.set(0,0,i.canvas.width,i.canvas.height),$.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:he,disable:Fe,bindFramebuffer:$e,drawBuffers:nt,useProgram:Ye,setBlending:V,setMaterial:Ut,setFlipSided:Je,setCullFace:Ke,setLineWidth:Oe,setPolygonOffset:bt,setScissorTest:ye,activeTexture:C,bindTexture:b,unbindTexture:G,compressedTexImage2D:ie,compressedTexImage3D:se,texImage2D:fe,texImage3D:ke,updateUBOMapping:ot,uniformBlockBinding:Qe,texStorage2D:ze,texStorage3D:re,texSubImage2D:te,texSubImage3D:De,compressedTexSubImage2D:Me,compressedTexSubImage3D:pe,scissor:Ge,viewport:Pe,reset:mt}}function Sd(i,e,t,n){let s=ky(n);switch(t){case kd:return i*e;case zd:return i*e;case Hd:return i*e*2;case Vd:return i*e/s.components*s.byteLength;case gh:return i*e/s.components*s.byteLength;case Gd:return i*e*2/s.components*s.byteLength;case _h:return i*e*2/s.components*s.byteLength;case Bd:return i*e*3/s.components*s.byteLength;case Nn:return i*e*4/s.components*s.byteLength;case vh:return i*e*4/s.components*s.byteLength;case ko:case Bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case zo:case Ho:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case el:case nl:return Math.max(i,16)*Math.max(e,8)/4;case Qc:case tl:return Math.max(i,8)*Math.max(e,8)/2;case il:case sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case al:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case cl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ll:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case hl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ul:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case dl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case fl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case pl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ml:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case yl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Vo:case xl:case bl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Wd:case Ml:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Sl:case wl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ky(i){switch(i){case li:case Od:return{byteLength:1,components:1};case Tr:case Nd:case Nr:return{byteLength:2,components:1};case ph:case mh:return{byteLength:2,components:4};case qi:case fh:case oi:return{byteLength:4,components:1};case Fd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function By(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ve,u=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,b){return p?new OffscreenCanvas(C,b):Xo("canvas")}function x(C,b,G){let ie=1,se=ye(C);if((se.width>G||se.height>G)&&(ie=G/Math.max(se.width,se.height)),ie<1)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap||typeof VideoFrame!="undefined"&&C instanceof VideoFrame){let te=Math.floor(ie*se.width),De=Math.floor(ie*se.height);d===void 0&&(d=v(te,De));let Me=b?v(te,De):d;return Me.width=te,Me.height=De,Me.getContext("2d").drawImage(C,0,0,te,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+te+"x"+De+")."),Me}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),C;return C}function g(C){return C.generateMipmaps}function m(C){i.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(C,b,G,ie,se=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let te=b;if(b===i.RED&&(G===i.FLOAT&&(te=i.R32F),G===i.HALF_FLOAT&&(te=i.R16F),G===i.UNSIGNED_BYTE&&(te=i.R8)),b===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(te=i.R8UI),G===i.UNSIGNED_SHORT&&(te=i.R16UI),G===i.UNSIGNED_INT&&(te=i.R32UI),G===i.BYTE&&(te=i.R8I),G===i.SHORT&&(te=i.R16I),G===i.INT&&(te=i.R32I)),b===i.RG&&(G===i.FLOAT&&(te=i.RG32F),G===i.HALF_FLOAT&&(te=i.RG16F),G===i.UNSIGNED_BYTE&&(te=i.RG8)),b===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(te=i.RG8UI),G===i.UNSIGNED_SHORT&&(te=i.RG16UI),G===i.UNSIGNED_INT&&(te=i.RG32UI),G===i.BYTE&&(te=i.RG8I),G===i.SHORT&&(te=i.RG16I),G===i.INT&&(te=i.RG32I)),b===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(te=i.RGB8UI),G===i.UNSIGNED_SHORT&&(te=i.RGB16UI),G===i.UNSIGNED_INT&&(te=i.RGB32UI),G===i.BYTE&&(te=i.RGB8I),G===i.SHORT&&(te=i.RGB16I),G===i.INT&&(te=i.RGB32I)),b===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),G===i.UNSIGNED_INT&&(te=i.RGBA32UI),G===i.BYTE&&(te=i.RGBA8I),G===i.SHORT&&(te=i.RGBA16I),G===i.INT&&(te=i.RGBA32I)),b===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),b===i.RGBA){let De=se?xa:ut.getTransfer(ie);G===i.FLOAT&&(te=i.RGBA32F),G===i.HALF_FLOAT&&(te=i.RGBA16F),G===i.UNSIGNED_BYTE&&(te=De===vt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function M(C,b){let G;return C?b===null||b===qi||b===Gs?G=i.DEPTH24_STENCIL8:b===oi?G=i.DEPTH32F_STENCIL8:b===Tr&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===qi||b===Gs?G=i.DEPTH_COMPONENT24:b===oi?G=i.DEPTH_COMPONENT32F:b===Tr&&(G=i.DEPTH_COMPONENT16),G}function N(C,b){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Fn&&C.minFilter!==Xn?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function I(C){let b=C.target;b.removeEventListener("dispose",I),P(b),b.isVideoTexture&&u.delete(b)}function U(C){let b=C.target;b.removeEventListener("dispose",U),S(b)}function P(C){let b=n.get(C);if(b.__webglInit===void 0)return;let G=C.source,ie=f.get(G);if(ie){let se=ie[b.__cacheKey];se.usedTimes--,se.usedTimes===0&&A(C),Object.keys(ie).length===0&&f.delete(G)}n.remove(C)}function A(C){let b=n.get(C);i.deleteTexture(b.__webglTexture);let G=C.source,ie=f.get(G);delete ie[b.__cacheKey],o.memory.textures--}function S(C){let b=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(b.__webglFramebuffer[ie]))for(let se=0;se<b.__webglFramebuffer[ie].length;se++)i.deleteFramebuffer(b.__webglFramebuffer[ie][se]);else i.deleteFramebuffer(b.__webglFramebuffer[ie]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[ie])}else{if(Array.isArray(b.__webglFramebuffer))for(let ie=0;ie<b.__webglFramebuffer.length;ie++)i.deleteFramebuffer(b.__webglFramebuffer[ie]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ie=0;ie<b.__webglColorRenderbuffer.length;ie++)b.__webglColorRenderbuffer[ie]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[ie]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let G=C.textures;for(let ie=0,se=G.length;ie<se;ie++){let te=n.get(G[ie]);te.__webglTexture&&(i.deleteTexture(te.__webglTexture),o.memory.textures--),n.remove(G[ie])}n.remove(C)}let O=0;function Z(){O=0}function q(){let C=O;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),O+=1,C}function ne(C){let b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function ce(C,b){let G=n.get(C);if(C.isVideoTexture&&Oe(C),C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){let ie=C.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(G,C,b);return}}t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+b)}function J(C,b){let G=n.get(C);if(C.version>0&&G.__version!==C.version){$(G,C,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+b)}function de(C,b){let G=n.get(C);if(C.version>0&&G.__version!==C.version){$(G,C,b);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+b)}function ee(C,b){let G=n.get(C);if(C.version>0&&G.__version!==C.version){le(G,C,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+b)}let _e={[Jc]:i.REPEAT,[Xi]:i.CLAMP_TO_EDGE,[Kc]:i.MIRRORED_REPEAT},Te={[Fn]:i.NEAREST,[Sm]:i.NEAREST_MIPMAP_NEAREST,[mo]:i.NEAREST_MIPMAP_LINEAR,[Xn]:i.LINEAR,[ac]:i.LINEAR_MIPMAP_NEAREST,[$i]:i.LINEAR_MIPMAP_LINEAR},Ce={[Am]:i.NEVER,[Dm]:i.ALWAYS,[Rm]:i.LESS,[$d]:i.LEQUAL,[Cm]:i.EQUAL,[Lm]:i.GEQUAL,[Pm]:i.GREATER,[Im]:i.NOTEQUAL};function Be(C,b){if(b.type===oi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Xn||b.magFilter===ac||b.magFilter===mo||b.magFilter===$i||b.minFilter===Xn||b.minFilter===ac||b.minFilter===mo||b.minFilter===$i)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,_e[b.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,_e[b.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,_e[b.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Te[b.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Te[b.minFilter]),b.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Ce[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Fn||b.minFilter!==mo&&b.minFilter!==$i||b.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Ne(C,b){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",I));let ie=b.source,se=f.get(ie);se===void 0&&(se={},f.set(ie,se));let te=ne(b);if(te!==C.__cacheKey){se[te]===void 0&&(se[te]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,G=!0),se[te].usedTimes++;let De=se[C.__cacheKey];De!==void 0&&(se[C.__cacheKey].usedTimes--,De.usedTimes===0&&A(b)),C.__cacheKey=te,C.__webglTexture=se[te].texture}return G}function $(C,b,G){let ie=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ie=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ie=i.TEXTURE_3D);let se=Ne(C,b),te=b.source;t.bindTexture(ie,C.__webglTexture,i.TEXTURE0+G);let De=n.get(te);if(te.version!==De.__version||se===!0){t.activeTexture(i.TEXTURE0+G);let Me=ut.getPrimaries(ut.workingColorSpace),pe=b.colorSpace===Si?null:ut.getPrimaries(b.colorSpace),ze=b.colorSpace===Si||Me===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let re=x(b.image,!1,s.maxTextureSize);re=bt(b,re);let fe=r.convert(b.format,b.colorSpace),ke=r.convert(b.type),Ge=E(b.internalFormat,fe,ke,b.colorSpace,b.isVideoTexture);Be(ie,b);let Pe,ot=b.mipmaps,Qe=b.isVideoTexture!==!0,mt=De.__version===void 0||se===!0,k=te.dataReady,Ee=N(b,re);if(b.isDepthTexture)Ge=M(b.format===Ws,b.type),mt&&(Qe?t.texStorage2D(i.TEXTURE_2D,1,Ge,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Ge,re.width,re.height,0,fe,ke,null));else if(b.isDataTexture)if(ot.length>0){Qe&&mt&&t.texStorage2D(i.TEXTURE_2D,Ee,Ge,ot[0].width,ot[0].height);for(let K=0,oe=ot.length;K<oe;K++)Pe=ot[K],Qe?k&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Pe.width,Pe.height,fe,ke,Pe.data):t.texImage2D(i.TEXTURE_2D,K,Ge,Pe.width,Pe.height,0,fe,ke,Pe.data);b.generateMipmaps=!1}else Qe?(mt&&t.texStorage2D(i.TEXTURE_2D,Ee,Ge,re.width,re.height),k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re.width,re.height,fe,ke,re.data)):t.texImage2D(i.TEXTURE_2D,0,Ge,re.width,re.height,0,fe,ke,re.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Qe&&mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Ge,ot[0].width,ot[0].height,re.depth);for(let K=0,oe=ot.length;K<oe;K++)if(Pe=ot[K],b.format!==Nn)if(fe!==null)if(Qe){if(k)if(b.layerUpdates.size>0){let Re=Sd(Pe.width,Pe.height,b.format,b.type);for(let Ae of b.layerUpdates){let He=Pe.data.subarray(Ae*Re/Pe.data.BYTES_PER_ELEMENT,(Ae+1)*Re/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,Ae,Pe.width,Pe.height,1,fe,He)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Pe.width,Pe.height,re.depth,fe,Pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Ge,Pe.width,Pe.height,re.depth,0,Pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qe?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Pe.width,Pe.height,re.depth,fe,ke,Pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,Ge,Pe.width,Pe.height,re.depth,0,fe,ke,Pe.data)}else{Qe&&mt&&t.texStorage2D(i.TEXTURE_2D,Ee,Ge,ot[0].width,ot[0].height);for(let K=0,oe=ot.length;K<oe;K++)Pe=ot[K],b.format!==Nn?fe!==null?Qe?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,Pe.width,Pe.height,fe,Pe.data):t.compressedTexImage2D(i.TEXTURE_2D,K,Ge,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?k&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Pe.width,Pe.height,fe,ke,Pe.data):t.texImage2D(i.TEXTURE_2D,K,Ge,Pe.width,Pe.height,0,fe,ke,Pe.data)}else if(b.isDataArrayTexture)if(Qe){if(mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Ge,re.width,re.height,re.depth),k)if(b.layerUpdates.size>0){let K=Sd(re.width,re.height,b.format,b.type);for(let oe of b.layerUpdates){let Re=re.data.subarray(oe*K/re.data.BYTES_PER_ELEMENT,(oe+1)*K/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,re.width,re.height,1,fe,ke,Re)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,fe,ke,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ge,re.width,re.height,re.depth,0,fe,ke,re.data);else if(b.isData3DTexture)Qe?(mt&&t.texStorage3D(i.TEXTURE_3D,Ee,Ge,re.width,re.height,re.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,fe,ke,re.data)):t.texImage3D(i.TEXTURE_3D,0,Ge,re.width,re.height,re.depth,0,fe,ke,re.data);else if(b.isFramebufferTexture){if(mt)if(Qe)t.texStorage2D(i.TEXTURE_2D,Ee,Ge,re.width,re.height);else{let K=re.width,oe=re.height;for(let Re=0;Re<Ee;Re++)t.texImage2D(i.TEXTURE_2D,Re,Ge,K,oe,0,fe,ke,null),K>>=1,oe>>=1}}else if(ot.length>0){if(Qe&&mt){let K=ye(ot[0]);t.texStorage2D(i.TEXTURE_2D,Ee,Ge,K.width,K.height)}for(let K=0,oe=ot.length;K<oe;K++)Pe=ot[K],Qe?k&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,fe,ke,Pe):t.texImage2D(i.TEXTURE_2D,K,Ge,fe,ke,Pe);b.generateMipmaps=!1}else if(Qe){if(mt){let K=ye(re);t.texStorage2D(i.TEXTURE_2D,Ee,Ge,K.width,K.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,ke,re)}else t.texImage2D(i.TEXTURE_2D,0,Ge,fe,ke,re);g(b)&&m(ie),De.__version=te.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function le(C,b,G){if(b.image.length!==6)return;let ie=Ne(C,b),se=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+G);let te=n.get(se);if(se.version!==te.__version||ie===!0){t.activeTexture(i.TEXTURE0+G);let De=ut.getPrimaries(ut.workingColorSpace),Me=b.colorSpace===Si?null:ut.getPrimaries(b.colorSpace),pe=b.colorSpace===Si||De===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);let ze=b.isCompressedTexture||b.image[0].isCompressedTexture,re=b.image[0]&&b.image[0].isDataTexture,fe=[];for(let oe=0;oe<6;oe++)!ze&&!re?fe[oe]=x(b.image[oe],!0,s.maxCubemapSize):fe[oe]=re?b.image[oe].image:b.image[oe],fe[oe]=bt(b,fe[oe]);let ke=fe[0],Ge=r.convert(b.format,b.colorSpace),Pe=r.convert(b.type),ot=E(b.internalFormat,Ge,Pe,b.colorSpace),Qe=b.isVideoTexture!==!0,mt=te.__version===void 0||ie===!0,k=se.dataReady,Ee=N(b,ke);Be(i.TEXTURE_CUBE_MAP,b);let K;if(ze){Qe&&mt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,ot,ke.width,ke.height);for(let oe=0;oe<6;oe++){K=fe[oe].mipmaps;for(let Re=0;Re<K.length;Re++){let Ae=K[Re];b.format!==Nn?Ge!==null?Qe?k&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re,0,0,Ae.width,Ae.height,Ge,Ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re,ot,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qe?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re,0,0,Ae.width,Ae.height,Ge,Pe,Ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re,ot,Ae.width,Ae.height,0,Ge,Pe,Ae.data)}}}else{if(K=b.mipmaps,Qe&&mt){K.length>0&&Ee++;let oe=ye(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,ot,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(re){Qe?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,fe[oe].width,fe[oe].height,Ge,Pe,fe[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ot,fe[oe].width,fe[oe].height,0,Ge,Pe,fe[oe].data);for(let Re=0;Re<K.length;Re++){let He=K[Re].image[oe].image;Qe?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re+1,0,0,He.width,He.height,Ge,Pe,He.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re+1,ot,He.width,He.height,0,Ge,Pe,He.data)}}else{Qe?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ge,Pe,fe[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ot,Ge,Pe,fe[oe]);for(let Re=0;Re<K.length;Re++){let Ae=K[Re];Qe?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re+1,0,0,Ge,Pe,Ae.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re+1,ot,Ge,Pe,Ae.image[oe])}}}g(b)&&m(i.TEXTURE_CUBE_MAP),te.__version=se.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function Le(C,b,G,ie,se,te){let De=r.convert(G.format,G.colorSpace),Me=r.convert(G.type),pe=E(G.internalFormat,De,Me,G.colorSpace),ze=n.get(b),re=n.get(G);if(re.__renderTarget=b,!ze.__hasExternalTextures){let fe=Math.max(1,b.width>>te),ke=Math.max(1,b.height>>te);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,te,pe,fe,ke,b.depth,0,De,Me,null):t.texImage2D(se,te,pe,fe,ke,0,De,Me,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Ke(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,se,re.__webglTexture,0,Je(b)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ie,se,re.__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function he(C,b,G){if(i.bindRenderbuffer(i.RENDERBUFFER,C),b.depthBuffer){let ie=b.depthTexture,se=ie&&ie.isDepthTexture?ie.type:null,te=M(b.stencilBuffer,se),De=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=Je(b);Ke(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,te,b.width,b.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,te,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,te,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,De,i.RENDERBUFFER,C)}else{let ie=b.textures;for(let se=0;se<ie.length;se++){let te=ie[se],De=r.convert(te.format,te.colorSpace),Me=r.convert(te.type),pe=E(te.internalFormat,De,Me,te.colorSpace),ze=Je(b);G&&Ke(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ze,pe,b.width,b.height):Ke(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ze,pe,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,pe,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Fe(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ie=n.get(b.depthTexture);ie.__renderTarget=b,(!ie.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ce(b.depthTexture,0);let se=ie.__webglTexture,te=Je(b);if(b.depthTexture.format===Fs)Ke(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(b.depthTexture.format===Ws)Ke(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function $e(C){let b=n.get(C),G=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){let ie=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ie){let se=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ie.removeEventListener("dispose",se)};ie.addEventListener("dispose",se),b.__depthDisposeCallback=se}b.__boundDepthTexture=ie}if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Fe(b.__webglFramebuffer,C)}else if(G){b.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[ie]),b.__webglDepthbuffer[ie]===void 0)b.__webglDepthbuffer[ie]=i.createRenderbuffer(),he(b.__webglDepthbuffer[ie],C,!1);else{let se=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=b.__webglDepthbuffer[ie];i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,te)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),he(b.__webglDepthbuffer,C,!1);else{let ie=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,se)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(C,b,G){let ie=n.get(C);b!==void 0&&Le(ie.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&$e(C)}function Ye(C){let b=C.texture,G=n.get(C),ie=n.get(b);C.addEventListener("dispose",U);let se=C.textures,te=C.isWebGLCubeRenderTarget===!0,De=se.length>1;if(De||(ie.__webglTexture===void 0&&(ie.__webglTexture=i.createTexture()),ie.__version=b.version,o.memory.textures++),te){G.__webglFramebuffer=[];for(let Me=0;Me<6;Me++)if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer[Me]=[];for(let pe=0;pe<b.mipmaps.length;pe++)G.__webglFramebuffer[Me][pe]=i.createFramebuffer()}else G.__webglFramebuffer[Me]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer=[];for(let Me=0;Me<b.mipmaps.length;Me++)G.__webglFramebuffer[Me]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(De)for(let Me=0,pe=se.length;Me<pe;Me++){let ze=n.get(se[Me]);ze.__webglTexture===void 0&&(ze.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&Ke(C)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let Me=0;Me<se.length;Me++){let pe=se[Me];G.__webglColorRenderbuffer[Me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[Me]);let ze=r.convert(pe.format,pe.colorSpace),re=r.convert(pe.type),fe=E(pe.internalFormat,ze,re,pe.colorSpace,C.isXRRenderTarget===!0),ke=Je(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,fe,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,G.__webglColorRenderbuffer[Me])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),he(G.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),Be(i.TEXTURE_CUBE_MAP,b);for(let Me=0;Me<6;Me++)if(b.mipmaps&&b.mipmaps.length>0)for(let pe=0;pe<b.mipmaps.length;pe++)Le(G.__webglFramebuffer[Me][pe],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,pe);else Le(G.__webglFramebuffer[Me],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0);g(b)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let Me=0,pe=se.length;Me<pe;Me++){let ze=se[Me],re=n.get(ze);t.bindTexture(i.TEXTURE_2D,re.__webglTexture),Be(i.TEXTURE_2D,ze),Le(G.__webglFramebuffer,C,ze,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,0),g(ze)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let Me=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Me=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Me,ie.__webglTexture),Be(Me,b),b.mipmaps&&b.mipmaps.length>0)for(let pe=0;pe<b.mipmaps.length;pe++)Le(G.__webglFramebuffer[pe],C,b,i.COLOR_ATTACHMENT0,Me,pe);else Le(G.__webglFramebuffer,C,b,i.COLOR_ATTACHMENT0,Me,0);g(b)&&m(Me),t.unbindTexture()}C.depthBuffer&&$e(C)}function lt(C){let b=C.textures;for(let G=0,ie=b.length;G<ie;G++){let se=b[G];if(g(se)){let te=T(C),De=n.get(se).__webglTexture;t.bindTexture(te,De),m(te),t.unbindTexture()}}}let St=[],V=[];function Ut(C){if(C.samples>0){if(Ke(C)===!1){let b=C.textures,G=C.width,ie=C.height,se=i.COLOR_BUFFER_BIT,te=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,De=n.get(C),Me=b.length>1;if(Me)for(let pe=0;pe<b.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,De.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,De.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let pe=0;pe<b.length;pe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),Me){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,De.__webglColorRenderbuffer[pe]);let ze=n.get(b[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ze,0)}i.blitFramebuffer(0,0,G,ie,0,0,G,ie,se,i.NEAREST),c===!0&&(St.length=0,V.length=0,St.push(i.COLOR_ATTACHMENT0+pe),C.depthBuffer&&C.resolveDepthBuffer===!1&&(St.push(te),V.push(te),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,V)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,St))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Me)for(let pe=0;pe<b.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,De.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,De.__webglColorRenderbuffer[pe]);let ze=n.get(b[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,De.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,ze,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let b=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function Je(C){return Math.min(s.maxSamples,C.samples)}function Ke(C){let b=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Oe(C){let b=o.render.frame;u.get(C)!==b&&(u.set(C,b),C.update())}function bt(C,b){let G=C.colorSpace,ie=C.format,se=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==Ys&&G!==Si&&(ut.getTransfer(G)===vt?(ie!==Nn||se!==li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),b}function ye(C){return typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame!="undefined"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=Z,this.setTexture2D=ce,this.setTexture2DArray=J,this.setTexture3D=de,this.setTextureCube=ee,this.rebindTextures=nt,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=$e,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=Ke}function zy(i,e){function t(n,s=Si){let r,o=ut.getTransfer(s);if(n===li)return i.UNSIGNED_BYTE;if(n===ph)return i.UNSIGNED_SHORT_4_4_4_4;if(n===mh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Fd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Od)return i.BYTE;if(n===Nd)return i.SHORT;if(n===Tr)return i.UNSIGNED_SHORT;if(n===fh)return i.INT;if(n===qi)return i.UNSIGNED_INT;if(n===oi)return i.FLOAT;if(n===Nr)return i.HALF_FLOAT;if(n===kd)return i.ALPHA;if(n===Bd)return i.RGB;if(n===Nn)return i.RGBA;if(n===zd)return i.LUMINANCE;if(n===Hd)return i.LUMINANCE_ALPHA;if(n===Fs)return i.DEPTH_COMPONENT;if(n===Ws)return i.DEPTH_STENCIL;if(n===Vd)return i.RED;if(n===gh)return i.RED_INTEGER;if(n===Gd)return i.RG;if(n===_h)return i.RG_INTEGER;if(n===vh)return i.RGBA_INTEGER;if(n===ko||n===Bo||n===zo||n===Ho)if(o===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ko)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ko)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ho)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qc||n===el||n===tl||n===nl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===el)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===nl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===il||n===sl||n===rl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===il||n===sl)return o===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===rl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ol||n===al||n===cl||n===ll||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===vl||n===yl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ol)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===al)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===cl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ll)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===hl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ul)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ml)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===gl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_l)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===yl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vo||n===xl||n===bl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Vo)return o===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wd||n===Ml||n===Sl||n===wl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ml)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Bl=class extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},wt=class extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Hy={type:"move"},Sr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,v=.005;l.inputState.pinching&&f>p+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Hy)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new wt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Vy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gy=`
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

}`,zl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new en,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new qn({vertexShader:Vy,fragmentShader:Gy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Xe(new Mn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Hl=class extends hi{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,p=null,v=null,x=new zl,g=t.getContextAttributes(),m=null,T=null,E=[],M=[],N=new ve,I=null,U=new Zt;U.viewport=new yt;let P=new Zt;P.viewport=new yt;let A=[U,P],S=new Bl,O=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let le=E[$];return le===void 0&&(le=new Sr,E[$]=le),le.getTargetRaySpace()},this.getControllerGrip=function($){let le=E[$];return le===void 0&&(le=new Sr,E[$]=le),le.getGripSpace()},this.getHand=function($){let le=E[$];return le===void 0&&(le=new Sr,E[$]=le),le.getHandSpace()};function q($){let le=M.indexOf($.inputSource);if(le===-1)return;let Le=E[le];Le!==void 0&&(Le.update($.inputSource,$.frame,l||o),Le.dispatchEvent({type:$.type,data:$.inputSource}))}function ne(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",ne),s.removeEventListener("inputsourceschange",ce);for(let $=0;$<E.length;$++){let le=M[$];le!==null&&(M[$]=null,E[$].disconnect(le))}O=null,Z=null,x.reset(),e.setRenderTarget(m),p=null,f=null,d=null,s=null,T=null,Ne.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",ne),s.addEventListener("inputsourceschange",ce),g.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(N),s.renderState.layers===void 0){let le={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,le),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new ui(p.framebufferWidth,p.framebufferHeight,{format:Nn,type:li,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let le=null,Le=null,he=null;g.depth&&(he=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=g.stencil?Ws:Fs,Le=g.stencil?Gs:qi);let Fe={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:r};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(Fe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),T=new ui(f.textureWidth,f.textureHeight,{format:Nn,type:li,depthTexture:new ea(f.textureWidth,f.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ne.setContext(s),Ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function ce($){for(let le=0;le<$.removed.length;le++){let Le=$.removed[le],he=M.indexOf(Le);he>=0&&(M[he]=null,E[he].disconnect(Le))}for(let le=0;le<$.added.length;le++){let Le=$.added[le],he=M.indexOf(Le);if(he===-1){for(let $e=0;$e<E.length;$e++)if($e>=M.length){M.push(Le),he=$e;break}else if(M[$e]===null){M[$e]=Le,he=$e;break}if(he===-1)break}let Fe=E[he];Fe&&Fe.connect(Le)}}let J=new L,de=new L;function ee($,le,Le){J.setFromMatrixPosition(le.matrixWorld),de.setFromMatrixPosition(Le.matrixWorld);let he=J.distanceTo(de),Fe=le.projectionMatrix.elements,$e=Le.projectionMatrix.elements,nt=Fe[14]/(Fe[10]-1),Ye=Fe[14]/(Fe[10]+1),lt=(Fe[9]+1)/Fe[5],St=(Fe[9]-1)/Fe[5],V=(Fe[8]-1)/Fe[0],Ut=($e[8]+1)/$e[0],Je=nt*V,Ke=nt*Ut,Oe=he/(-V+Ut),bt=Oe*-V;if(le.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(bt),$.translateZ(Oe),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Fe[10]===-1)$.projectionMatrix.copy(le.projectionMatrix),$.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{let ye=nt+Oe,C=Ye+Oe,b=Je-bt,G=Ke+(he-bt),ie=lt*Ye/C*ye,se=St*Ye/C*ye;$.projectionMatrix.makePerspective(b,G,ie,se,ye,C),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function _e($,le){le===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(le.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let le=$.near,Le=$.far;x.texture!==null&&(x.depthNear>0&&(le=x.depthNear),x.depthFar>0&&(Le=x.depthFar)),S.near=P.near=U.near=le,S.far=P.far=U.far=Le,(O!==S.near||Z!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),O=S.near,Z=S.far),U.layers.mask=$.layers.mask|2,P.layers.mask=$.layers.mask|4,S.layers.mask=U.layers.mask|P.layers.mask;let he=$.parent,Fe=S.cameras;_e(S,he);for(let $e=0;$e<Fe.length;$e++)_e(Fe[$e],he);Fe.length===2?ee(S,U,P):S.projectionMatrix.copy(U.projectionMatrix),Te($,S,he)};function Te($,le,Le){Le===null?$.matrix.copy(le.matrixWorld):($.matrix.copy(Le.matrixWorld),$.matrix.invert(),$.matrix.multiply(le.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(le.projectionMatrix),$.projectionMatrixInverse.copy(le.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ar*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function($){c=$,f!==null&&(f.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(S)};let Ce=null;function Be($,le){if(u=le.getViewerPose(l||o),v=le,u!==null){let Le=u.views;p!==null&&(e.setRenderTargetFramebuffer(T,p.framebuffer),e.setRenderTarget(T));let he=!1;Le.length!==S.cameras.length&&(S.cameras.length=0,he=!0);for(let $e=0;$e<Le.length;$e++){let nt=Le[$e],Ye=null;if(p!==null)Ye=p.getViewport(nt);else{let St=d.getViewSubImage(f,nt);Ye=St.viewport,$e===0&&(e.setRenderTargetTextures(T,St.colorTexture,f.ignoreDepthValues?void 0:St.depthStencilTexture),e.setRenderTarget(T))}let lt=A[$e];lt===void 0&&(lt=new Zt,lt.layers.enable($e),lt.viewport=new yt,A[$e]=lt),lt.matrix.fromArray(nt.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(nt.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),$e===0&&(S.matrix.copy(lt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),he===!0&&S.cameras.push(lt)}let Fe=s.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")){let $e=d.getDepthInformation(Le[0]);$e&&$e.isValid&&$e.texture&&x.init(e,$e,s.renderState)}}for(let Le=0;Le<E.length;Le++){let he=M[Le],Fe=E[Le];he!==null&&Fe!==void 0&&Fe.update(he,le,l||o)}Ce&&Ce($,le),le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:le}),v=null}let Ne=new Zd;Ne.setAnimationLoop(Be),this.setAnimationLoop=function($){Ce=$},this.dispose=function(){}}},zi=new $n,Wy=new Ct;function Xy(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Yd(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,T,E,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&p(g,m,M)):m.isMeshMatcapMaterial?(r(g,m),v(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,T,E):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===on&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===on&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let T=e.get(m),E=T.envMap,M=T.envMapRotation;E&&(g.envMap.value=E,zi.copy(M),zi.x*=-1,zi.y*=-1,zi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),g.envMapRotation.value.setFromMatrix4(Wy.makeRotationFromEuler(zi)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,T,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*T,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,T){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===on&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let T=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $y(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,E){let M=E.program;n.uniformBlockBinding(T,M)}function l(T,E){let M=s[T.id];M===void 0&&(v(T),M=u(T),s[T.id]=M,T.addEventListener("dispose",g));let N=E.program;n.updateUBOMapping(T,N);let I=e.render.frame;r[T.id]!==I&&(f(T),r[T.id]=I)}function u(T){let E=d();T.__bindingPointIndex=E;let M=i.createBuffer(),N=T.__size,I=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,N,I),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,M),M}function d(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){let E=s[T.id],M=T.uniforms,N=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let I=0,U=M.length;I<U;I++){let P=Array.isArray(M[I])?M[I]:[M[I]];for(let A=0,S=P.length;A<S;A++){let O=P[A];if(p(O,I,A,N)===!0){let Z=O.__offset,q=Array.isArray(O.value)?O.value:[O.value],ne=0;for(let ce=0;ce<q.length;ce++){let J=q[ce],de=x(J);typeof J=="number"||typeof J=="boolean"?(O.__data[0]=J,i.bufferSubData(i.UNIFORM_BUFFER,Z+ne,O.__data)):J.isMatrix3?(O.__data[0]=J.elements[0],O.__data[1]=J.elements[1],O.__data[2]=J.elements[2],O.__data[3]=0,O.__data[4]=J.elements[3],O.__data[5]=J.elements[4],O.__data[6]=J.elements[5],O.__data[7]=0,O.__data[8]=J.elements[6],O.__data[9]=J.elements[7],O.__data[10]=J.elements[8],O.__data[11]=0):(J.toArray(O.__data,ne),ne+=de.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Z,O.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,E,M,N){let I=T.value,U=E+"_"+M;if(N[U]===void 0)return typeof I=="number"||typeof I=="boolean"?N[U]=I:N[U]=I.clone(),!0;{let P=N[U];if(typeof I=="number"||typeof I=="boolean"){if(P!==I)return N[U]=I,!0}else if(P.equals(I)===!1)return P.copy(I),!0}return!1}function v(T){let E=T.uniforms,M=0,N=16;for(let U=0,P=E.length;U<P;U++){let A=Array.isArray(E[U])?E[U]:[E[U]];for(let S=0,O=A.length;S<O;S++){let Z=A[S],q=Array.isArray(Z.value)?Z.value:[Z.value];for(let ne=0,ce=q.length;ne<ce;ne++){let J=q[ne],de=x(J),ee=M%N,_e=ee%de.boundary,Te=ee+_e;M+=_e,Te!==0&&N-Te<de.storage&&(M+=N-Te),Z.__data=new Float32Array(de.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=M,M+=de.storage}}}let I=M%N;return I>0&&(M+=N-I),T.__size=M,T.__cache={},this}function x(T){let E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function g(T){let E=T.target;E.removeEventListener("dispose",g);let M=o.indexOf(E.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(let T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:c,update:l,dispose:m}}var ta=class{constructor(e={}){let{canvas:t=Zm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let v=new Uint32Array(4),x=new Int32Array(4),g=null,m=null,T=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Yt,this.toneMapping=Ei,this.toneMappingExposure=1;let M=this,N=!1,I=0,U=0,P=null,A=-1,S=null,O=new yt,Z=new yt,q=null,ne=new ct(0),ce=0,J=t.width,de=t.height,ee=1,_e=null,Te=null,Ce=new yt(0,0,J,de),Be=new yt(0,0,J,de),Ne=!1,$=new Pr,le=!1,Le=!1,he=new Ct,Fe=new Ct,$e=new L,nt=new yt,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},lt=!1;function St(){return P===null?ee:1}let V=n;function Ut(w,H){return t.getContext(w,H)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${hh}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",Re,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),V===null){let H="webgl2";if(V=Ut(H,w),V===null)throw Ut(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Je,Ke,Oe,bt,ye,C,b,G,ie,se,te,De,Me,pe,ze,re,fe,ke,Ge,Pe,ot,Qe,mt,k;function Ee(){Je=new cv(V),Je.init(),Qe=new zy(V,Je),Ke=new nv(V,Je,e,Qe),Oe=new Fy(V,Je),Ke.reverseDepthBuffer&&f&&Oe.buffers.depth.setReversed(!0),bt=new uv(V),ye=new wy,C=new By(V,Je,Oe,ye,Ke,Qe,bt),b=new sv(M),G=new av(M),ie=new vg(V),mt=new ev(V,ie),se=new lv(V,ie,bt,mt),te=new fv(V,se,ie,bt),Ge=new dv(V,Ke,C),re=new iv(ye),De=new Sy(M,b,G,Je,Ke,mt,re),Me=new Xy(M,ye),pe=new Ty,ze=new Ly(Je),ke=new Q0(M,b,G,Oe,te,p,c),fe=new Oy(M,te,Ke),k=new $y(V,bt,Ke,Oe),Pe=new tv(V,Je,bt),ot=new hv(V,Je,bt),bt.programs=De.programs,M.capabilities=Ke,M.extensions=Je,M.properties=ye,M.renderLists=pe,M.shadowMap=fe,M.state=Oe,M.info=bt}Ee();let K=new Hl(M,V);this.xr=K,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){let w=Je.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Je.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(w){w!==void 0&&(ee=w,this.setSize(J,de,!1))},this.getSize=function(w){return w.set(J,de)},this.setSize=function(w,H,X=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=w,de=H,t.width=Math.floor(w*ee),t.height=Math.floor(H*ee),X===!0&&(t.style.width=w+"px",t.style.height=H+"px"),this.setViewport(0,0,w,H)},this.getDrawingBufferSize=function(w){return w.set(J*ee,de*ee).floor()},this.setDrawingBufferSize=function(w,H,X){J=w,de=H,ee=X,t.width=Math.floor(w*X),t.height=Math.floor(H*X),this.setViewport(0,0,w,H)},this.getCurrentViewport=function(w){return w.copy(O)},this.getViewport=function(w){return w.copy(Ce)},this.setViewport=function(w,H,X,Y){w.isVector4?Ce.set(w.x,w.y,w.z,w.w):Ce.set(w,H,X,Y),Oe.viewport(O.copy(Ce).multiplyScalar(ee).round())},this.getScissor=function(w){return w.copy(Be)},this.setScissor=function(w,H,X,Y){w.isVector4?Be.set(w.x,w.y,w.z,w.w):Be.set(w,H,X,Y),Oe.scissor(Z.copy(Be).multiplyScalar(ee).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(w){Oe.setScissorTest(Ne=w)},this.setOpaqueSort=function(w){_e=w},this.setTransparentSort=function(w){Te=w},this.getClearColor=function(w){return w.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor.apply(ke,arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha.apply(ke,arguments)},this.clear=function(w=!0,H=!0,X=!0){let Y=0;if(w){let z=!1;if(P!==null){let ae=P.texture.format;z=ae===vh||ae===_h||ae===gh}if(z){let ae=P.texture.type,be=ae===li||ae===qi||ae===Tr||ae===Gs||ae===ph||ae===mh,Ue=ke.getClearColor(),me=ke.getClearAlpha(),qe=Ue.r,We=Ue.g,Ie=Ue.b;be?(v[0]=qe,v[1]=We,v[2]=Ie,v[3]=me,V.clearBufferuiv(V.COLOR,0,v)):(x[0]=qe,x[1]=We,x[2]=Ie,x[3]=me,V.clearBufferiv(V.COLOR,0,x))}else Y|=V.COLOR_BUFFER_BIT}H&&(Y|=V.DEPTH_BUFFER_BIT),X&&(Y|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",Re,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),pe.dispose(),ze.dispose(),ye.dispose(),b.dispose(),G.dispose(),te.dispose(),mt.dispose(),k.dispose(),De.dispose(),K.dispose(),K.removeEventListener("sessionstart",cr),K.removeEventListener("sessionend",mi),Tn.stop()};function oe(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function Re(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;let w=bt.autoReset,H=fe.enabled,X=fe.autoUpdate,Y=fe.needsUpdate,z=fe.type;Ee(),bt.autoReset=w,fe.enabled=H,fe.autoUpdate=X,fe.needsUpdate=Y,fe.type=z}function Ae(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function He(w){let H=w.target;H.removeEventListener("dispose",He),j(H)}function j(w){Tt(w),ye.remove(w)}function Tt(w){let H=ye.get(w).programs;H!==void 0&&(H.forEach(function(X){De.releaseProgram(X)}),w.isShaderMaterial&&De.releaseShaderCache(w))}this.renderBufferDirect=function(w,H,X,Y,z,ae){H===null&&(H=Ye);let be=z.isMesh&&z.matrixWorld.determinant()<0,Ue=Xa(w,H,X,Y,z);Oe.setMaterial(Y,be);let me=X.index,qe=1;if(Y.wireframe===!0){if(me=se.getWireframeAttribute(X),me===void 0)return;qe=2}let We=X.drawRange,Ie=X.attributes.position,Ze=We.start*qe,ft=(We.start+We.count)*qe;ae!==null&&(Ze=Math.max(Ze,ae.start*qe),ft=Math.min(ft,(ae.start+ae.count)*qe)),me!==null?(Ze=Math.max(Ze,0),ft=Math.min(ft,me.count)):Ie!=null&&(Ze=Math.max(Ze,0),ft=Math.min(ft,Ie.count));let gt=ft-Ze;if(gt<0||gt===1/0)return;mt.setup(z,Y,Ue,X,me);let At,it=Pe;if(me!==null&&(At=ie.get(me),it=ot,it.setIndex(At)),z.isMesh)Y.wireframe===!0?(Oe.setLineWidth(Y.wireframeLinewidth*St()),it.setMode(V.LINES)):it.setMode(V.TRIANGLES);else if(z.isLine){let xe=Y.linewidth;xe===void 0&&(xe=1),Oe.setLineWidth(xe*St()),z.isLineSegments?it.setMode(V.LINES):z.isLineLoop?it.setMode(V.LINE_LOOP):it.setMode(V.LINE_STRIP)}else z.isPoints?it.setMode(V.POINTS):z.isSprite&&it.setMode(V.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)it.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Je.get("WEBGL_multi_draw"))it.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let xe=z._multiDrawStarts,Wt=z._multiDrawCounts,rt=z._multiDrawCount,dn=me?ie.get(me).bytesPerElement:1,Jn=ye.get(Y).currentProgram.getUniforms();for(let Xt=0;Xt<rt;Xt++)Jn.setValue(V,"_gl_DrawID",Xt),it.render(xe[Xt]/dn,Wt[Xt])}else if(z.isInstancedMesh)it.renderInstances(Ze,gt,z.count);else if(X.isInstancedBufferGeometry){let xe=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Wt=Math.min(X.instanceCount,xe);it.renderInstances(Ze,gt,Wt)}else it.render(Ze,gt)};function dt(w,H,X){w.transparent===!0&&w.side===On&&w.forceSinglePass===!1?(w.side=on,w.needsUpdate=!0,_s(w,H,X),w.side=Ti,w.needsUpdate=!0,_s(w,H,X),w.side=On):_s(w,H,X)}this.compile=function(w,H,X=null){X===null&&(X=w),m=ze.get(X),m.init(H),E.push(m),X.traverseVisible(function(z){z.isLight&&z.layers.test(H.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),w!==X&&w.traverseVisible(function(z){z.isLight&&z.layers.test(H.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights();let Y=new Set;return w.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let ae=z.material;if(ae)if(Array.isArray(ae))for(let be=0;be<ae.length;be++){let Ue=ae[be];dt(Ue,X,z),Y.add(Ue)}else dt(ae,X,z),Y.add(ae)}),E.pop(),m=null,Y},this.compileAsync=function(w,H,X=null){let Y=this.compile(w,H,X);return new Promise(z=>{function ae(){if(Y.forEach(function(be){ye.get(be).currentProgram.isReady()&&Y.delete(be)}),Y.size===0){z(w);return}setTimeout(ae,10)}Je.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let sn=null;function Jt(w){sn&&sn(w)}function cr(){Tn.stop()}function mi(){Tn.start()}let Tn=new Zd;Tn.setAnimationLoop(Jt),typeof self!="undefined"&&Tn.setContext(self),this.setAnimationLoop=function(w){sn=w,K.setAnimationLoop(w),w===null?Tn.stop():Tn.start()},K.addEventListener("sessionstart",cr),K.addEventListener("sessionend",mi),this.render=function(w,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(H),H=K.getCamera()),w.isScene===!0&&w.onBeforeRender(M,w,H,P),m=ze.get(w,E.length),m.init(H),E.push(m),Fe.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),$.setFromProjectionMatrix(Fe),Le=this.localClippingEnabled,le=re.init(this.clippingPlanes,Le),g=pe.get(w,T.length),g.init(),T.push(g),K.enabled===!0&&K.isPresenting===!0){let ae=M.xr.getDepthSensingMesh();ae!==null&&lr(ae,H,-1/0,M.sortObjects)}lr(w,H,0,M.sortObjects),g.finish(),M.sortObjects===!0&&g.sort(_e,Te),lt=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,lt&&ke.addToRenderList(g,w),this.info.render.frame++,le===!0&&re.beginShadows();let X=m.state.shadowsArray;fe.render(X,w,H),le===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();let Y=g.opaque,z=g.transmissive;if(m.setupLights(),H.isArrayCamera){let ae=H.cameras;if(z.length>0)for(let be=0,Ue=ae.length;be<Ue;be++){let me=ae[be];Zn(Y,z,w,me)}lt&&ke.render(w);for(let be=0,Ue=ae.length;be<Ue;be++){let me=ae[be];gn(g,w,me,me.viewport)}}else z.length>0&&Zn(Y,z,w,H),lt&&ke.render(w),gn(g,w,H);P!==null&&(C.updateMultisampleRenderTarget(P),C.updateRenderTargetMipmap(P)),w.isScene===!0&&w.onAfterRender(M,w,H),mt.resetDefaultState(),A=-1,S=null,E.pop(),E.length>0?(m=E[E.length-1],le===!0&&re.setGlobalState(M.clippingPlanes,m.state.camera)):m=null,T.pop(),T.length>0?g=T[T.length-1]:g=null};function lr(w,H,X,Y){if(w.visible===!1)return;if(w.layers.test(H.layers)){if(w.isGroup)X=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(H);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||$.intersectsSprite(w)){Y&&nt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Fe);let be=te.update(w),Ue=w.material;Ue.visible&&g.push(w,be,Ue,X,nt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||$.intersectsObject(w))){let be=te.update(w),Ue=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),nt.copy(w.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),nt.copy(be.boundingSphere.center)),nt.applyMatrix4(w.matrixWorld).applyMatrix4(Fe)),Array.isArray(Ue)){let me=be.groups;for(let qe=0,We=me.length;qe<We;qe++){let Ie=me[qe],Ze=Ue[Ie.materialIndex];Ze&&Ze.visible&&g.push(w,be,Ze,X,nt.z,Ie)}}else Ue.visible&&g.push(w,be,Ue,X,nt.z,null)}}let ae=w.children;for(let be=0,Ue=ae.length;be<Ue;be++)lr(ae[be],H,X,Y)}function gn(w,H,X,Y){let z=w.opaque,ae=w.transmissive,be=w.transparent;m.setupLightsView(X),le===!0&&re.setGlobalState(M.clippingPlanes,X),Y&&Oe.viewport(O.copy(Y)),z.length>0&&un(z,H,X),ae.length>0&&un(ae,H,X),be.length>0&&un(be,H,X),Oe.buffers.depth.setTest(!0),Oe.buffers.depth.setMask(!0),Oe.buffers.color.setMask(!0),Oe.setPolygonOffset(!1)}function Zn(w,H,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Y.id]===void 0&&(m.state.transmissionRenderTarget[Y.id]=new ui(1,1,{generateMipmaps:!0,type:Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float")?Nr:li,minFilter:$i,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace}));let ae=m.state.transmissionRenderTarget[Y.id],be=Y.viewport||O;ae.setSize(be.z,be.w);let Ue=M.getRenderTarget();M.setRenderTarget(ae),M.getClearColor(ne),ce=M.getClearAlpha(),ce<1&&M.setClearColor(16777215,.5),M.clear(),lt&&ke.render(X);let me=M.toneMapping;M.toneMapping=Ei;let qe=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),m.setupLightsView(Y),le===!0&&re.setGlobalState(M.clippingPlanes,Y),un(w,X,Y),C.updateMultisampleRenderTarget(ae),C.updateRenderTargetMipmap(ae),Je.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Ie=0,Ze=H.length;Ie<Ze;Ie++){let ft=H[Ie],gt=ft.object,At=ft.geometry,it=ft.material,xe=ft.group;if(it.side===On&&gt.layers.test(Y.layers)){let Wt=it.side;it.side=on,it.needsUpdate=!0,rn(gt,X,Y,At,it,xe),it.side=Wt,it.needsUpdate=!0,We=!0}}We===!0&&(C.updateMultisampleRenderTarget(ae),C.updateRenderTargetMipmap(ae))}M.setRenderTarget(Ue),M.setClearColor(ne,ce),qe!==void 0&&(Y.viewport=qe),M.toneMapping=me}function un(w,H,X){let Y=H.isScene===!0?H.overrideMaterial:null;for(let z=0,ae=w.length;z<ae;z++){let be=w[z],Ue=be.object,me=be.geometry,qe=Y===null?be.material:Y,We=be.group;Ue.layers.test(X.layers)&&rn(Ue,H,X,me,qe,We)}}function rn(w,H,X,Y,z,ae){w.onBeforeRender(M,H,X,Y,z,ae),w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(M,H,X,Y,w,ae),z.transparent===!0&&z.side===On&&z.forceSinglePass===!1?(z.side=on,z.needsUpdate=!0,M.renderBufferDirect(X,H,Y,z,w,ae),z.side=Ti,z.needsUpdate=!0,M.renderBufferDirect(X,H,Y,z,w,ae),z.side=On):M.renderBufferDirect(X,H,Y,z,w,ae),w.onAfterRender(M,H,X,Y,z,ae)}function _s(w,H,X){H.isScene!==!0&&(H=Ye);let Y=ye.get(w),z=m.state.lights,ae=m.state.shadowsArray,be=z.state.version,Ue=De.getParameters(w,z.state,ae,H,X),me=De.getProgramCacheKey(Ue),qe=Y.programs;Y.environment=w.isMeshStandardMaterial?H.environment:null,Y.fog=H.fog,Y.envMap=(w.isMeshStandardMaterial?G:b).get(w.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&w.envMap===null?H.environmentRotation:w.envMapRotation,qe===void 0&&(w.addEventListener("dispose",He),qe=new Map,Y.programs=qe);let We=qe.get(me);if(We!==void 0){if(Y.currentProgram===We&&Y.lightsStateVersion===be)return Ii(w,Ue),We}else Ue.uniforms=De.getUniforms(w),w.onBeforeCompile(Ue,M),We=De.acquireProgram(Ue,me),qe.set(me,We),Y.uniforms=Ue.uniforms;let Ie=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ie.clippingPlanes=re.uniform),Ii(w,Ue),Y.needsLights=Ve(w),Y.lightsStateVersion=be,Y.needsLights&&(Ie.ambientLightColor.value=z.state.ambient,Ie.lightProbe.value=z.state.probe,Ie.directionalLights.value=z.state.directional,Ie.directionalLightShadows.value=z.state.directionalShadow,Ie.spotLights.value=z.state.spot,Ie.spotLightShadows.value=z.state.spotShadow,Ie.rectAreaLights.value=z.state.rectArea,Ie.ltc_1.value=z.state.rectAreaLTC1,Ie.ltc_2.value=z.state.rectAreaLTC2,Ie.pointLights.value=z.state.point,Ie.pointLightShadows.value=z.state.pointShadow,Ie.hemisphereLights.value=z.state.hemi,Ie.directionalShadowMap.value=z.state.directionalShadowMap,Ie.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ie.spotShadowMap.value=z.state.spotShadowMap,Ie.spotLightMatrix.value=z.state.spotLightMatrix,Ie.spotLightMap.value=z.state.spotLightMap,Ie.pointShadowMap.value=z.state.pointShadowMap,Ie.pointShadowMatrix.value=z.state.pointShadowMatrix),Y.currentProgram=We,Y.uniformsList=null,We}function gi(w){if(w.uniformsList===null){let H=w.currentProgram.getUniforms();w.uniformsList=Bs.seqWithValue(H.seq,w.uniforms)}return w.uniformsList}function Ii(w,H){let X=ye.get(w);X.outputColorSpace=H.outputColorSpace,X.batching=H.batching,X.batchingColor=H.batchingColor,X.instancing=H.instancing,X.instancingColor=H.instancingColor,X.instancingMorph=H.instancingMorph,X.skinning=H.skinning,X.morphTargets=H.morphTargets,X.morphNormals=H.morphNormals,X.morphColors=H.morphColors,X.morphTargetsCount=H.morphTargetsCount,X.numClippingPlanes=H.numClippingPlanes,X.numIntersection=H.numClipIntersection,X.vertexAlphas=H.vertexAlphas,X.vertexTangents=H.vertexTangents,X.toneMapping=H.toneMapping}function Xa(w,H,X,Y,z){H.isScene!==!0&&(H=Ye),C.resetTextureUnits();let ae=H.fog,be=Y.isMeshStandardMaterial?H.environment:null,Ue=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ys,me=(Y.isMeshStandardMaterial?G:b).get(Y.envMap||be),qe=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,We=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ie=!!X.morphAttributes.position,Ze=!!X.morphAttributes.normal,ft=!!X.morphAttributes.color,gt=Ei;Y.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(gt=M.toneMapping);let At=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,it=At!==void 0?At.length:0,xe=ye.get(Y),Wt=m.state.lights;if(le===!0&&(Le===!0||w!==S)){let Ht=w===S&&Y.id===A;re.setState(Y,w,Ht)}let rt=!1;Y.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Wt.state.version||xe.outputColorSpace!==Ue||z.isBatchedMesh&&xe.batching===!1||!z.isBatchedMesh&&xe.batching===!0||z.isBatchedMesh&&xe.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&xe.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&xe.instancing===!1||!z.isInstancedMesh&&xe.instancing===!0||z.isSkinnedMesh&&xe.skinning===!1||!z.isSkinnedMesh&&xe.skinning===!0||z.isInstancedMesh&&xe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&xe.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&xe.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&xe.instancingMorph===!1&&z.morphTexture!==null||xe.envMap!==me||Y.fog===!0&&xe.fog!==ae||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==re.numPlanes||xe.numIntersection!==re.numIntersection)||xe.vertexAlphas!==qe||xe.vertexTangents!==We||xe.morphTargets!==Ie||xe.morphNormals!==Ze||xe.morphColors!==ft||xe.toneMapping!==gt||xe.morphTargetsCount!==it)&&(rt=!0):(rt=!0,xe.__version=Y.version);let dn=xe.currentProgram;rt===!0&&(dn=_s(Y,H,z));let Jn=!1,Xt=!1,_n=!1,Mt=dn.getUniforms(),vn=xe.uniforms;if(Oe.useProgram(dn.program)&&(Jn=!0,Xt=!0,_n=!0),Y.id!==A&&(A=Y.id,Xt=!0),Jn||S!==w){Oe.buffers.depth.getReversed()?(he.copy(w.projectionMatrix),Km(he),Qm(he),Mt.setValue(V,"projectionMatrix",he)):Mt.setValue(V,"projectionMatrix",w.projectionMatrix),Mt.setValue(V,"viewMatrix",w.matrixWorldInverse);let An=Mt.map.cameraPosition;An!==void 0&&An.setValue(V,$e.setFromMatrixPosition(w.matrixWorld)),Ke.logarithmicDepthBuffer&&Mt.setValue(V,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Mt.setValue(V,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,Xt=!0,_n=!0)}if(z.isSkinnedMesh){Mt.setOptional(V,z,"bindMatrix"),Mt.setOptional(V,z,"bindMatrixInverse");let Ht=z.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),Mt.setValue(V,"boneTexture",Ht.boneTexture,C))}z.isBatchedMesh&&(Mt.setOptional(V,z,"batchingTexture"),Mt.setValue(V,"batchingTexture",z._matricesTexture,C),Mt.setOptional(V,z,"batchingIdTexture"),Mt.setValue(V,"batchingIdTexture",z._indirectTexture,C),Mt.setOptional(V,z,"batchingColorTexture"),z._colorsTexture!==null&&Mt.setValue(V,"batchingColorTexture",z._colorsTexture,C));let Di=X.morphAttributes;if((Di.position!==void 0||Di.normal!==void 0||Di.color!==void 0)&&Ge.update(z,X,dn),(Xt||xe.receiveShadow!==z.receiveShadow)&&(xe.receiveShadow=z.receiveShadow,Mt.setValue(V,"receiveShadow",z.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(vn.envMap.value=me,vn.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&H.environment!==null&&(vn.envMapIntensity.value=H.environmentIntensity),Xt&&(Mt.setValue(V,"toneMappingExposure",M.toneMappingExposure),xe.needsLights&&Li(vn,_n),ae&&Y.fog===!0&&Me.refreshFogUniforms(vn,ae),Me.refreshMaterialUniforms(vn,Y,ee,de,m.state.transmissionRenderTarget[w.id]),Bs.upload(V,gi(xe),vn,C)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Bs.upload(V,gi(xe),vn,C),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Mt.setValue(V,"center",z.center),Mt.setValue(V,"modelViewMatrix",z.modelViewMatrix),Mt.setValue(V,"normalMatrix",z.normalMatrix),Mt.setValue(V,"modelMatrix",z.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){let Ht=Y.uniformsGroups;for(let An=0,Pt=Ht.length;An<Pt;An++){let at=Ht[An];k.update(at,dn),k.bind(at,dn)}}return dn}function Li(w,H){w.ambientLightColor.needsUpdate=H,w.lightProbe.needsUpdate=H,w.directionalLights.needsUpdate=H,w.directionalLightShadows.needsUpdate=H,w.pointLights.needsUpdate=H,w.pointLightShadows.needsUpdate=H,w.spotLights.needsUpdate=H,w.spotLightShadows.needsUpdate=H,w.rectAreaLights.needsUpdate=H,w.hemisphereLights.needsUpdate=H}function Ve(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(w,H,X){ye.get(w.texture).__webglTexture=H,ye.get(w.depthTexture).__webglTexture=X;let Y=ye.get(w);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=X===void 0,Y.__autoAllocateDepthBuffer||Je.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,H){let X=ye.get(w);X.__webglFramebuffer=H,X.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(w,H=0,X=0){P=w,I=H,U=X;let Y=!0,z=null,ae=!1,be=!1;if(w){let me=ye.get(w);if(me.__useDefaultFramebuffer!==void 0)Oe.bindFramebuffer(V.FRAMEBUFFER,null),Y=!1;else if(me.__webglFramebuffer===void 0)C.setupRenderTarget(w);else if(me.__hasExternalTextures)C.rebindTextures(w,ye.get(w.texture).__webglTexture,ye.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Ie=w.depthTexture;if(me.__boundDepthTexture!==Ie){if(Ie!==null&&ye.has(Ie)&&(w.width!==Ie.image.width||w.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(w)}}let qe=w.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(be=!0);let We=ye.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(We[H])?z=We[H][X]:z=We[H],ae=!0):w.samples>0&&C.useMultisampledRTT(w)===!1?z=ye.get(w).__webglMultisampledFramebuffer:Array.isArray(We)?z=We[X]:z=We,O.copy(w.viewport),Z.copy(w.scissor),q=w.scissorTest}else O.copy(Ce).multiplyScalar(ee).floor(),Z.copy(Be).multiplyScalar(ee).floor(),q=Ne;if(Oe.bindFramebuffer(V.FRAMEBUFFER,z)&&Y&&Oe.drawBuffers(w,z),Oe.viewport(O),Oe.scissor(Z),Oe.setScissorTest(q),ae){let me=ye.get(w.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+H,me.__webglTexture,X)}else if(be){let me=ye.get(w.texture),qe=H||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,me.__webglTexture,X||0,qe)}A=-1},this.readRenderTargetPixels=function(w,H,X,Y,z,ae,be){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=ye.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(Ue=Ue[be]),Ue){Oe.bindFramebuffer(V.FRAMEBUFFER,Ue);try{let me=w.texture,qe=me.format,We=me.type;if(!Ke.textureFormatReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ke.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=w.width-Y&&X>=0&&X<=w.height-z&&V.readPixels(H,X,Y,z,Qe.convert(qe),Qe.convert(We),ae)}finally{let me=P!==null?ye.get(P).__webglFramebuffer:null;Oe.bindFramebuffer(V.FRAMEBUFFER,me)}}},this.readRenderTargetPixelsAsync=async function(w,H,X,Y,z,ae,be){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=ye.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(Ue=Ue[be]),Ue){let me=w.texture,qe=me.format,We=me.type;if(!Ke.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ke.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=w.width-Y&&X>=0&&X<=w.height-z){Oe.bindFramebuffer(V.FRAMEBUFFER,Ue);let Ie=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,Ie),V.bufferData(V.PIXEL_PACK_BUFFER,ae.byteLength,V.STREAM_READ),V.readPixels(H,X,Y,z,Qe.convert(qe),Qe.convert(We),0);let Ze=P!==null?ye.get(P).__webglFramebuffer:null;Oe.bindFramebuffer(V.FRAMEBUFFER,Ze);let ft=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await Jm(V,ft,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,Ie),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,ae),V.deleteBuffer(Ie),V.deleteSync(ft),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,H=null,X=0){w.isTexture!==!0&&(yr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,w=arguments[1]);let Y=Math.pow(2,-X),z=Math.floor(w.image.width*Y),ae=Math.floor(w.image.height*Y),be=H!==null?H.x:0,Ue=H!==null?H.y:0;C.setTexture2D(w,0),V.copyTexSubImage2D(V.TEXTURE_2D,X,0,0,be,Ue,z,ae),Oe.unbindTexture()},this.copyTextureToTexture=function(w,H,X=null,Y=null,z=0){w.isTexture!==!0&&(yr("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,w=arguments[1],H=arguments[2],z=arguments[3]||0,X=null);let ae,be,Ue,me,qe,We,Ie,Ze,ft,gt=w.isCompressedTexture?w.mipmaps[z]:w.image;X!==null?(ae=X.max.x-X.min.x,be=X.max.y-X.min.y,Ue=X.isBox3?X.max.z-X.min.z:1,me=X.min.x,qe=X.min.y,We=X.isBox3?X.min.z:0):(ae=gt.width,be=gt.height,Ue=gt.depth||1,me=0,qe=0,We=0),Y!==null?(Ie=Y.x,Ze=Y.y,ft=Y.z):(Ie=0,Ze=0,ft=0);let At=Qe.convert(H.format),it=Qe.convert(H.type),xe;H.isData3DTexture?(C.setTexture3D(H,0),xe=V.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(C.setTexture2DArray(H,0),xe=V.TEXTURE_2D_ARRAY):(C.setTexture2D(H,0),xe=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,H.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,H.unpackAlignment);let Wt=V.getParameter(V.UNPACK_ROW_LENGTH),rt=V.getParameter(V.UNPACK_IMAGE_HEIGHT),dn=V.getParameter(V.UNPACK_SKIP_PIXELS),Jn=V.getParameter(V.UNPACK_SKIP_ROWS),Xt=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,gt.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,gt.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,me),V.pixelStorei(V.UNPACK_SKIP_ROWS,qe),V.pixelStorei(V.UNPACK_SKIP_IMAGES,We);let _n=w.isDataArrayTexture||w.isData3DTexture,Mt=H.isDataArrayTexture||H.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let vn=ye.get(w),Di=ye.get(H),Ht=ye.get(vn.__renderTarget),An=ye.get(Di.__renderTarget);Oe.bindFramebuffer(V.READ_FRAMEBUFFER,Ht.__webglFramebuffer),Oe.bindFramebuffer(V.DRAW_FRAMEBUFFER,An.__webglFramebuffer);for(let Pt=0;Pt<Ue;Pt++)_n&&V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,ye.get(w).__webglTexture,z,We+Pt),w.isDepthTexture?(Mt&&V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,ye.get(H).__webglTexture,z,ft+Pt),V.blitFramebuffer(me,qe,ae,be,Ie,Ze,ae,be,V.DEPTH_BUFFER_BIT,V.NEAREST)):Mt?V.copyTexSubImage3D(xe,z,Ie,Ze,ft+Pt,me,qe,ae,be):V.copyTexSubImage2D(xe,z,Ie,Ze,ft+Pt,me,qe,ae,be);Oe.bindFramebuffer(V.READ_FRAMEBUFFER,null),Oe.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Mt?w.isDataTexture||w.isData3DTexture?V.texSubImage3D(xe,z,Ie,Ze,ft,ae,be,Ue,At,it,gt.data):H.isCompressedArrayTexture?V.compressedTexSubImage3D(xe,z,Ie,Ze,ft,ae,be,Ue,At,gt.data):V.texSubImage3D(xe,z,Ie,Ze,ft,ae,be,Ue,At,it,gt):w.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,z,Ie,Ze,ae,be,At,it,gt.data):w.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,z,Ie,Ze,gt.width,gt.height,At,gt.data):V.texSubImage2D(V.TEXTURE_2D,z,Ie,Ze,ae,be,At,it,gt);V.pixelStorei(V.UNPACK_ROW_LENGTH,Wt),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,rt),V.pixelStorei(V.UNPACK_SKIP_PIXELS,dn),V.pixelStorei(V.UNPACK_SKIP_ROWS,Jn),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Xt),z===0&&H.generateMipmaps&&V.generateMipmap(xe),Oe.unbindTexture()},this.copyTextureToTexture3D=function(w,H,X=null,Y=null,z=0){return w.isTexture!==!0&&(yr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,Y=arguments[1]||null,w=arguments[2],H=arguments[3],z=arguments[4]||0),yr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,H,X,Y,z)},this.initRenderTarget=function(w){ye.get(w).__webglFramebuffer===void 0&&C.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?C.setTextureCube(w,0):w.isData3DTexture?C.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?C.setTexture2DArray(w,0):C.setTexture2D(w,0),Oe.unbindTexture()},this.resetState=function(){I=0,U=0,P=null,Oe.reset(),mt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}};var na=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ct(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ia=class extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Ir=class extends en{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let u=n[s],f=n[s+1]-u,p=(o-u)/f;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new ve:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new L,s=[],r=[],o=[],a=new L,c=new Ct;for(let p=0;p<=e;p++){let v=p/e;s[p]=this.getTangentAt(v,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let v=Math.acos(Ft(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,v))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Ft(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let v=1;v<=e;v++)r[v].applyMatrix4(c.makeRotationAxis(s[v],p*v)),o[v].crossVectors(s[v],r[v])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Lr=class extends Sn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ve){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*u-p*d+this.aX,l=f*d+p*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Vl=class extends Lr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function bh(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,d){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,p=(a-o)/u-(c-o)/(u+d)+(c-a)/d;f*=u,p*=u,s(o,a,f,p)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var No=new L,Oc=new bh,Nc=new bh,Fc=new bh,Gl=class extends Sn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(No.subVectors(s[0],s[1]).add(s[0]),l=No);let d=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(No.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=No),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,v=Math.pow(l.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(f),p),g=Math.pow(f.distanceToSquared(u),p);x<1e-4&&(x=1),v<1e-4&&(v=x),g<1e-4&&(g=x),Oc.initNonuniformCatmullRom(l.x,d.x,f.x,u.x,v,x,g),Nc.initNonuniformCatmullRom(l.y,d.y,f.y,u.y,v,x,g),Fc.initNonuniformCatmullRom(l.z,d.z,f.z,u.z,v,x,g)}else this.curveType==="catmullrom"&&(Oc.initCatmullRom(l.x,d.x,f.x,u.x,this.tension),Nc.initCatmullRom(l.y,d.y,f.y,u.y,this.tension),Fc.initCatmullRom(l.z,d.z,f.z,u.z,this.tension));return n.set(Oc.calc(c),Nc.calc(c),Fc.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function wd(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function qy(i,e){let t=1-i;return t*t*e}function jy(i,e){return 2*(1-i)*i*e}function Yy(i,e){return i*i*e}function wr(i,e,t,n){return qy(i,e)+jy(i,t)+Yy(i,n)}function Zy(i,e){let t=1-i;return t*t*t*e}function Jy(i,e){let t=1-i;return 3*t*t*i*e}function Ky(i,e){return 3*(1-i)*i*i*e}function Qy(i,e){return i*i*i*e}function Er(i,e,t,n,s){return Zy(i,e)+Jy(i,t)+Ky(i,n)+Qy(i,s)}var sa=class extends Sn{constructor(e=new ve,t=new ve,n=new ve,s=new ve){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ve){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Er(e,s.x,r.x,o.x,a.x),Er(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Wl=class extends Sn{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Er(e,s.x,r.x,o.x,a.x),Er(e,s.y,r.y,o.y,a.y),Er(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ra=class extends Sn{constructor(e=new ve,t=new ve){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ve){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ve){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xl=class extends Sn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oa=class extends Sn{constructor(e=new ve,t=new ve,n=new ve){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ve){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(wr(e,s.x,r.x,o.x),wr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$l=class extends Sn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(wr(e,s.x,r.x,o.x),wr(e,s.y,r.y,o.y),wr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},aa=class extends Sn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ve){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(wd(a,c.x,l.x,u.x,d.x),wd(a,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ve().fromArray(s))}return this}},Ed=Object.freeze({__proto__:null,ArcCurve:Vl,CatmullRomCurve3:Gl,CubicBezierCurve:sa,CubicBezierCurve3:Wl,EllipseCurve:Lr,LineCurve:ra,LineCurve3:Xl,QuadraticBezierCurve:oa,QuadraticBezierCurve3:$l,SplineCurve:aa}),ql=class extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ed[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Ed[s.type]().fromJSON(s))}return this}},jl=class extends ql{constructor(e){super(),this.type="Path",this.currentPoint=new ve,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ra(this.currentPoint.clone(),new ve(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new oa(this.currentPoint.clone(),new ve(e,t),new ve(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new sa(this.currentPoint.clone(),new ve(e,t),new ve(n,s),new ve(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new aa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){let l=new Lr(e,t,n,s,r,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Yl=class i extends an{constructor(e=[new ve(0,-.5),new ve(.5,0),new ve(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Ft(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],u=1/t,d=new L,f=new ve,p=new L,v=new L,x=new L,g=0,m=0;for(let T=0;T<=e.length-1;T++)switch(T){case 0:g=e[T+1].x-e[T].x,m=e[T+1].y-e[T].y,p.x=m*1,p.y=-g,p.z=m*0,x.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(x.x,x.y,x.z);break;default:g=e[T+1].x-e[T].x,m=e[T+1].y-e[T].y,p.x=m*1,p.y=-g,p.z=m*0,v.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),c.push(p.x,p.y,p.z),x.copy(v)}for(let T=0;T<=t;T++){let E=n+T*u*s,M=Math.sin(E),N=Math.cos(E);for(let I=0;I<=e.length-1;I++){d.x=e[I].x*M,d.y=e[I].y,d.z=e[I].x*N,o.push(d.x,d.y,d.z),f.x=T/t,f.y=I/(e.length-1),a.push(f.x,f.y);let U=c[3*I+0]*M,P=c[3*I+1],A=c[3*I+0]*N;l.push(U,P,A)}}for(let T=0;T<t;T++)for(let E=0;E<e.length-1;E++){let M=E+T*e.length,N=M,I=M+e.length,U=M+e.length+1,P=M+1;r.push(N,I,P),r.push(U,P,I)}this.setIndex(r),this.setAttribute("position",new pt(o,3)),this.setAttribute("uv",new pt(a,2)),this.setAttribute("normal",new pt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},qs=class i extends Yl{constructor(e=1,t=1,n=4,s=8){let r=new jl;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:s}}static fromJSON(e){return new i(e.radius,e.length,e.capSegments,e.radialSegments)}},Dr=class i extends an{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new L,u=new ve;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){let p=n+d/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new pt(o,3)),this.setAttribute("normal",new pt(a,3)),this.setAttribute("uv",new pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ji=class i extends an{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],f=[],p=[],v=0,x=[],g=n/2,m=0;T(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new pt(d,3)),this.setAttribute("normal",new pt(f,3)),this.setAttribute("uv",new pt(p,2));function T(){let M=new L,N=new L,I=0,U=(t-e)/n;for(let P=0;P<=r;P++){let A=[],S=P/r,O=S*(t-e)+e;for(let Z=0;Z<=s;Z++){let q=Z/s,ne=q*c+a,ce=Math.sin(ne),J=Math.cos(ne);N.x=O*ce,N.y=-S*n+g,N.z=O*J,d.push(N.x,N.y,N.z),M.set(ce,U,J).normalize(),f.push(M.x,M.y,M.z),p.push(q,1-S),A.push(v++)}x.push(A)}for(let P=0;P<s;P++)for(let A=0;A<r;A++){let S=x[A][P],O=x[A+1][P],Z=x[A+1][P+1],q=x[A][P+1];(e>0||A!==0)&&(u.push(S,O,q),I+=3),(t>0||A!==r-1)&&(u.push(O,Z,q),I+=3)}l.addGroup(m,I,0),m+=I}function E(M){let N=v,I=new ve,U=new L,P=0,A=M===!0?e:t,S=M===!0?1:-1;for(let Z=1;Z<=s;Z++)d.push(0,g*S,0),f.push(0,S,0),p.push(.5,.5),v++;let O=v;for(let Z=0;Z<=s;Z++){let ne=Z/s*c+a,ce=Math.cos(ne),J=Math.sin(ne);U.x=A*J,U.y=g*S,U.z=A*ce,d.push(U.x,U.y,U.z),f.push(0,S,0),I.x=ce*.5+.5,I.y=J*.5*S+.5,p.push(I.x,I.y),v++}for(let Z=0;Z<s;Z++){let q=N+Z,ne=O+Z;M===!0?u.push(ne,ne+1,q):u.push(ne+1,ne,q),P+=3}l.addGroup(m,P,M===!0?1:2),m+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ca=class i extends Ji{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Zl=class i extends an{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new pt(r,3)),this.setAttribute("normal",new pt(r.slice(),3)),this.setAttribute("uv",new pt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(T){let E=new L,M=new L,N=new L;for(let I=0;I<t.length;I+=3)p(t[I+0],E),p(t[I+1],M),p(t[I+2],N),c(E,M,N,T)}function c(T,E,M,N){let I=N+1,U=[];for(let P=0;P<=I;P++){U[P]=[];let A=T.clone().lerp(M,P/I),S=E.clone().lerp(M,P/I),O=I-P;for(let Z=0;Z<=O;Z++)Z===0&&P===I?U[P][Z]=A:U[P][Z]=A.clone().lerp(S,Z/O)}for(let P=0;P<I;P++)for(let A=0;A<2*(I-P)-1;A++){let S=Math.floor(A/2);A%2===0?(f(U[P][S+1]),f(U[P+1][S]),f(U[P][S])):(f(U[P][S+1]),f(U[P+1][S+1]),f(U[P+1][S]))}}function l(T){let E=new L;for(let M=0;M<r.length;M+=3)E.x=r[M+0],E.y=r[M+1],E.z=r[M+2],E.normalize().multiplyScalar(T),r[M+0]=E.x,r[M+1]=E.y,r[M+2]=E.z}function u(){let T=new L;for(let E=0;E<r.length;E+=3){T.x=r[E+0],T.y=r[E+1],T.z=r[E+2];let M=g(T)/2/Math.PI+.5,N=m(T)/Math.PI+.5;o.push(M,1-N)}v(),d()}function d(){for(let T=0;T<o.length;T+=6){let E=o[T+0],M=o[T+2],N=o[T+4],I=Math.max(E,M,N),U=Math.min(E,M,N);I>.9&&U<.1&&(E<.2&&(o[T+0]+=1),M<.2&&(o[T+2]+=1),N<.2&&(o[T+4]+=1))}}function f(T){r.push(T.x,T.y,T.z)}function p(T,E){let M=T*3;E.x=e[M+0],E.y=e[M+1],E.z=e[M+2]}function v(){let T=new L,E=new L,M=new L,N=new L,I=new ve,U=new ve,P=new ve;for(let A=0,S=0;A<r.length;A+=9,S+=6){T.set(r[A+0],r[A+1],r[A+2]),E.set(r[A+3],r[A+4],r[A+5]),M.set(r[A+6],r[A+7],r[A+8]),I.set(o[S+0],o[S+1]),U.set(o[S+2],o[S+3]),P.set(o[S+4],o[S+5]),N.copy(T).add(E).add(M).divideScalar(3);let O=g(N);x(I,S+0,T,O),x(U,S+2,E,O),x(P,S+4,M,O)}}function x(T,E,M,N){N<0&&T.x===1&&(o[E]=T.x-1),M.x===0&&M.z===0&&(o[E]=N/2/Math.PI+.5)}function g(T){return Math.atan2(T.z,-T.x)}function m(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var di=class i extends Zl{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var la=class i extends an{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],u=[],d=e,f=(t-e)/s,p=new L,v=new ve;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){let m=r+g/n*o;p.x=d*Math.cos(m),p.y=d*Math.sin(m),c.push(p.x,p.y,p.z),l.push(0,0,1),v.x=(p.x/t+1)/2,v.y=(p.y/t+1)/2,u.push(v.x,v.y)}d+=f}for(let x=0;x<s;x++){let g=x*(n+1);for(let m=0;m<n;m++){let T=m+g,E=T,M=T+n+1,N=T+n+2,I=T+1;a.push(E,M,I),a.push(M,N,I)}}this.setIndex(a),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(l,3)),this.setAttribute("uv",new pt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Bn=class i extends an{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new L,f=new L,p=[],v=[],x=[],g=[];for(let m=0;m<=n;m++){let T=[],E=m/n,M=0;m===0&&o===0?M=.5/t:m===n&&c===Math.PI&&(M=-.5/t);for(let N=0;N<=t;N++){let I=N/t;d.x=-e*Math.cos(s+I*r)*Math.sin(o+E*a),d.y=e*Math.cos(o+E*a),d.z=e*Math.sin(s+I*r)*Math.sin(o+E*a),v.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),g.push(I+M,1-E),T.push(l++)}u.push(T)}for(let m=0;m<n;m++)for(let T=0;T<t;T++){let E=u[m][T+1],M=u[m][T],N=u[m+1][T],I=u[m+1][T+1];(m!==0||o>0)&&p.push(E,M,I),(m!==n-1||c<Math.PI)&&p.push(M,N,I)}this.setIndex(p),this.setAttribute("position",new pt(v,3)),this.setAttribute("normal",new pt(x,3)),this.setAttribute("uv",new pt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ha=class i extends an{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],u=new L,d=new L,f=new L;for(let p=0;p<=n;p++)for(let v=0;v<=s;v++){let x=v/s*r,g=p/n*Math.PI*2;d.x=(e+t*Math.cos(g))*Math.cos(x),d.y=(e+t*Math.cos(g))*Math.sin(x),d.z=t*Math.sin(g),a.push(d.x,d.y,d.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),f.subVectors(d,u).normalize(),c.push(f.x,f.y,f.z),l.push(v/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let v=1;v<=s;v++){let x=(s+1)*p+v-1,g=(s+1)*(p-1)+v-1,m=(s+1)*(p-1)+v,T=(s+1)*p+v;o.push(x,g,T),o.push(g,m,T)}this.setIndex(o),this.setAttribute("position",new pt(a,3)),this.setAttribute("normal",new pt(c,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ai=class extends Yi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xd,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Fo(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ex(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var js=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jl=class extends js{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Au,endingEnd:Au}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ru:r=e,a=2*t-n;break;case Cu:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ru:o=e,c=2*n-t;break;case Cu:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,p=this._weightNext,v=(n-t)/(s-t),x=v*v,g=x*v,m=-f*g+2*f*x-f*v,T=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*v+1,E=(-1-p)*g+(1.5+p)*x+.5*v,M=p*g-p*x;for(let N=0;N!==a;++N)r[N]=m*o[u+N]+T*o[l+N]+E*o[c+N]+M*o[d+N];return r}},Kl=class extends js{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(s-t),d=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*d+o[c+f]*u;return r}},Ql=class extends js{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},zn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fo(t,this.TimeBufferType),this.values=Fo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Fo(e.times,Array),values:Fo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ql(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Kl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Go:t=this.InterpolantFactoryMethodDiscrete;break;case El:t=this.InterpolantFactoryMethodLinear;break;case cc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Go;case this.InterpolantFactoryMethodLinear:return El;case this.InterpolantFactoryMethodSmooth:return cc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&ex(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===cc,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(s)c=!0;else{let d=a*n,f=d-n,p=d+n;for(let v=0;v!==n;++v){let x=t[d+v];if(x!==t[f+v]||x!==t[p+v]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*n,f=o*n;for(let p=0;p!==n;++p)t[f+p]=t[d+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};zn.prototype.TimeBufferType=Float32Array;zn.prototype.ValueBufferType=Float32Array;zn.prototype.DefaultInterpolation=El;var Ki=class extends zn{constructor(e,t,n){super(e,t,n)}};Ki.prototype.ValueTypeName="bool";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=Go;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var eh=class extends zn{};eh.prototype.ValueTypeName="color";var th=class extends zn{};th.prototype.ValueTypeName="number";var nh=class extends js{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let u=l+a;l!==u;l+=4)kn.slerpFlat(r,0,o,l-a,o,l,c);return r}},ua=class extends zn{InterpolantFactoryMethodLinear(e){return new nh(this.times,this.values,this.getValueSize(),e)}};ua.prototype.ValueTypeName="quaternion";ua.prototype.InterpolantFactoryMethodSmooth=void 0;var Qi=class extends zn{constructor(e,t,n){super(e,t,n)}};Qi.prototype.ValueTypeName="string";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=Go;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;var ih=class extends zn{};ih.prototype.ValueTypeName="vector";var sh=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=l.length;d<f;d+=2){let p=l[d],v=l[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null}}},tx=new sh,rh=class{constructor(e){this.manager=e!==void 0?e:tx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};rh.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ur=class extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},da=class extends Ur{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ct(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},kc=new Ct,Td=new L,Ad=new L,fa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.map=null,this.mapPass=null,this.matrix=new Ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pr,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Td.setFromMatrixPosition(e.matrixWorld),t.position.copy(Td),Ad.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ad),t.updateMatrixWorld(),kc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(kc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Rd=new Ct,vr=new L,Bc=new L,oh=class extends fa{constructor(){super(new Zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ve(4,2),this._viewportCount=6,this._viewports=[new yt(2,1,1,1),new yt(0,1,1,1),new yt(3,1,1,1),new yt(1,1,1,1),new yt(3,0,1,1),new yt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),vr.setFromMatrixPosition(e.matrixWorld),n.position.copy(vr),Bc.copy(n.position),Bc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Bc),n.updateMatrixWorld(),s.makeTranslation(-vr.x,-vr.y,-vr.z),Rd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rd)}},pa=class extends Ur{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new oh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},ah=class extends fa{constructor(){super(new Ko(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ma=class extends Ur{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new ah}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ga=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Cd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Cd();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Cd(){return performance.now()}var Mh="\\[\\]\\.:\\/",nx=new RegExp("["+Mh+"]","g"),Sh="[^"+Mh+"]",ix="[^"+Mh.replace("\\.","")+"]",sx=/((?:WC+[\/:])*)/.source.replace("WC",Sh),rx=/(WCOD+)?/.source.replace("WCOD",ix),ox=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Sh),ax=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Sh),cx=new RegExp("^"+sx+rx+ox+ax+"$"),lx=["material","materials","bones","map"],ch=class{constructor(e,t,n){let s=n||Rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Rt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(nx,"")}static parseTrackName(e){let t=cx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);lx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Rt.Composite=ch;Rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Rt.prototype.GetterByBindingType=[Rt.prototype._getValue_direct,Rt.prototype._getValue_array,Rt.prototype._getValue_arrayElement,Rt.prototype._getValue_toArray];Rt.prototype.SetterByBindingTypeAndVersioning=[[Rt.prototype._setValue_direct,Rt.prototype._setValue_direct_setNeedsUpdate,Rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_array,Rt.prototype._setValue_array_setNeedsUpdate,Rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_arrayElement,Rt.prototype._setValue_arrayElement_setNeedsUpdate,Rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_fromArray,Rt.prototype._setValue_fromArray_setNeedsUpdate,Rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Mb=new Float32Array(1);var Pd=new Ct,_a=class{constructor(e,t,n=0,s=1/0){this.ray=new Xs(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Cr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Pd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Pd),this}intersectObject(e,t=!0,n=[]){return lh(e,this,n,t),n.sort(Id),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)lh(e[s],this,n,t);return n.sort(Id),n}};function Id(i,e){return i.distance-e.distance}function lh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)lh(r[o],e,t,!0)}}var Or=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var va=class extends hi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hh}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hh);var tf=i=>{let e;return i?e=i:typeof fetch=="undefined"?e=(...t)=>Promise.resolve().then(()=>(Ri(),is)).then(({default:n})=>n(...t)):e=fetch,(...t)=>e(...t)};var Fr=class extends Error{constructor(e,t="FunctionsError",n){super(e),this.name=t,this.context=n}},Ma=class extends Fr{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}},Sa=class extends Fr{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}},wa=class extends Fr{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}},Ea;(function(i){i.Any="any",i.ApNortheast1="ap-northeast-1",i.ApNortheast2="ap-northeast-2",i.ApSouth1="ap-south-1",i.ApSoutheast1="ap-southeast-1",i.ApSoutheast2="ap-southeast-2",i.CaCentral1="ca-central-1",i.EuCentral1="eu-central-1",i.EuWest1="eu-west-1",i.EuWest2="eu-west-2",i.EuWest3="eu-west-3",i.SaEast1="sa-east-1",i.UsEast1="us-east-1",i.UsWest1="us-west-1",i.UsWest2="us-west-2"})(Ea||(Ea={}));var mx=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(n.next(u))}catch(d){o(d)}}function c(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):s(u.value).then(a,c)}l((n=n.apply(i,e||[])).next())})},kr=class{constructor(e,{headers:t={},customFetch:n,region:s=Ea.Any}={}){this.url=e,this.headers=t,this.region=s,this.fetch=tf(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e,t={}){var n;return mx(this,void 0,void 0,function*(){try{let{headers:s,method:r,body:o}=t,a={},{region:c}=t;c||(c=this.region),c&&c!=="any"&&(a["x-region"]=c);let l;o&&(s&&!Object.prototype.hasOwnProperty.call(s,"Content-Type")||!s)&&(typeof Blob!="undefined"&&o instanceof Blob||o instanceof ArrayBuffer?(a["Content-Type"]="application/octet-stream",l=o):typeof o=="string"?(a["Content-Type"]="text/plain",l=o):typeof FormData!="undefined"&&o instanceof FormData?l=o:(a["Content-Type"]="application/json",l=JSON.stringify(o)));let u=yield this.fetch(`${this.url}/${e}`,{method:r||"POST",headers:Object.assign(Object.assign(Object.assign({},a),this.headers),s),body:l}).catch(v=>{throw new Ma(v)}),d=u.headers.get("x-relay-error");if(d&&d==="true")throw new Sa(u);if(!u.ok)throw new wa(u);let f=((n=u.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim(),p;return f==="application/json"?p=yield u.json():f==="application/octet-stream"?p=yield u.blob():f==="text/event-stream"?p=u:f==="multipart/form-data"?p=yield u.formData():p=yield u.text(),{data:p,error:null}}catch(s){return{data:null,error:s}}})}};var mf=Mu(pf(),1),{PostgrestClient:gf,PostgrestQueryBuilder:Bb,PostgrestFilterBuilder:zb,PostgrestTransformBuilder:Hb,PostgrestBuilder:Vb}=mf.default;var _f="2.10.2";var vf={"X-Client-Info":`realtime-js/${_f}`},yf="1.0.0",Pa=1e4,xf=1e3,ss;(function(i){i[i.connecting=0]="connecting",i[i.open=1]="open",i[i.closing=2]="closing",i[i.closed=3]="closed"})(ss||(ss={}));var cn;(function(i){i.closed="closed",i.errored="errored",i.joined="joined",i.joining="joining",i.leaving="leaving"})(cn||(cn={}));var mn;(function(i){i.close="phx_close",i.error="phx_error",i.join="phx_join",i.reply="phx_reply",i.leave="phx_leave",i.access_token="access_token"})(mn||(mn={}));var Ca;(function(i){i.websocket="websocket"})(Ca||(Ca={}));var Ci;(function(i){i.Connecting="connecting",i.Open="open",i.Closing="closing",i.Closed="closed"})(Ci||(Ci={}));var $r=class{constructor(){this.HEADER_LENGTH=1}decode(e,t){return e.constructor===ArrayBuffer?t(this._binaryDecode(e)):t(typeof e=="string"?JSON.parse(e):{})}_binaryDecode(e){let t=new DataView(e),n=new TextDecoder;return this._decodeBroadcast(e,t,n)}_decodeBroadcast(e,t,n){let s=t.getUint8(1),r=t.getUint8(2),o=this.HEADER_LENGTH+2,a=n.decode(e.slice(o,o+s));o=o+s;let c=n.decode(e.slice(o,o+r));o=o+r;let l=JSON.parse(n.decode(e.slice(o,e.byteLength)));return{ref:null,topic:a,event:c,payload:l}}};var rs=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}};var Et;(function(i){i.abstime="abstime",i.bool="bool",i.date="date",i.daterange="daterange",i.float4="float4",i.float8="float8",i.int2="int2",i.int4="int4",i.int4range="int4range",i.int8="int8",i.int8range="int8range",i.json="json",i.jsonb="jsonb",i.money="money",i.numeric="numeric",i.oid="oid",i.reltime="reltime",i.text="text",i.time="time",i.timestamp="timestamp",i.timestamptz="timestamptz",i.timetz="timetz",i.tsrange="tsrange",i.tstzrange="tstzrange"})(Et||(Et={}));var Fh=(i,e,t={})=>{var n;let s=(n=t.skipTypes)!==null&&n!==void 0?n:[];return Object.keys(e).reduce((r,o)=>(r[o]=Ax(o,i,e,s),r),{})},Ax=(i,e,t,n)=>{let s=e.find(a=>a.name===i),r=s==null?void 0:s.type,o=t[i];return r&&!n.includes(r)?bf(r,o):Nh(o)},bf=(i,e)=>{if(i.charAt(0)==="_"){let t=i.slice(1,i.length);return Ix(e,t)}switch(i){case Et.bool:return Rx(e);case Et.float4:case Et.float8:case Et.int2:case Et.int4:case Et.int8:case Et.numeric:case Et.oid:return Cx(e);case Et.json:case Et.jsonb:return Px(e);case Et.timestamp:return Lx(e);case Et.abstime:case Et.date:case Et.daterange:case Et.int4range:case Et.int8range:case Et.money:case Et.reltime:case Et.text:case Et.time:case Et.timestamptz:case Et.timetz:case Et.tsrange:case Et.tstzrange:return Nh(e);default:return Nh(e)}},Nh=i=>i,Rx=i=>{switch(i){case"t":return!0;case"f":return!1;default:return i}},Cx=i=>{if(typeof i=="string"){let e=parseFloat(i);if(!Number.isNaN(e))return e}return i},Px=i=>{if(typeof i=="string")try{return JSON.parse(i)}catch(e){return console.log(`JSON parse error: ${e}`),i}return i},Ix=(i,e)=>{if(typeof i!="string")return i;let t=i.length-1,n=i[t];if(i[0]==="{"&&n==="}"){let r,o=i.slice(1,t);try{r=JSON.parse("["+o+"]")}catch{r=o?o.split(","):[]}return r.map(a=>bf(e,a))}return i},Lx=i=>typeof i=="string"?i.replace(" ","T"):i,Ia=i=>{let e=i;return e=e.replace(/^ws/i,"http"),e=e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),e.replace(/\/+$/,"")};var os=class{constructor(e,t,n={},s=Pa){this.channel=e,this.event=t,this.payload=n,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var n;return this._hasReceived(e)&&t((n=this.receivedResp)===null||n===void 0?void 0:n.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);let e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(n=>n.status===e).forEach(n=>n.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}};var kh;(function(i){i.SYNC="sync",i.JOIN="join",i.LEAVE="leave"})(kh||(kh={}));var Qs=class i{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};let n=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(n.state,{},s=>{let{onJoin:r,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=i.syncState(this.state,s,r,o),this.pendingDiffs.forEach(c=>{this.state=i.syncDiff(this.state,c,r,o)}),this.pendingDiffs=[],a()}),this.channel._on(n.diff,{},s=>{let{onJoin:r,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=i.syncDiff(this.state,s,r,o),a())}),this.onJoin((s,r,o)=>{this.channel._trigger("presence",{event:"join",key:s,currentPresences:r,newPresences:o})}),this.onLeave((s,r,o)=>{this.channel._trigger("presence",{event:"leave",key:s,currentPresences:r,leftPresences:o})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,n,s){let r=this.cloneDeep(e),o=this.transformState(t),a={},c={};return this.map(r,(l,u)=>{o[l]||(c[l]=u)}),this.map(o,(l,u)=>{let d=r[l];if(d){let f=u.map(g=>g.presence_ref),p=d.map(g=>g.presence_ref),v=u.filter(g=>p.indexOf(g.presence_ref)<0),x=d.filter(g=>f.indexOf(g.presence_ref)<0);v.length>0&&(a[l]=v),x.length>0&&(c[l]=x)}else a[l]=u}),this.syncDiff(r,{joins:a,leaves:c},n,s)}static syncDiff(e,t,n,s){let{joins:r,leaves:o}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return n||(n=()=>{}),s||(s=()=>{}),this.map(r,(a,c)=>{var l;let u=(l=e[a])!==null&&l!==void 0?l:[];if(e[a]=this.cloneDeep(c),u.length>0){let d=e[a].map(p=>p.presence_ref),f=u.filter(p=>d.indexOf(p.presence_ref)<0);e[a].unshift(...f)}n(a,u,c)}),this.map(o,(a,c)=>{let l=e[a];if(!l)return;let u=c.map(d=>d.presence_ref);l=l.filter(d=>u.indexOf(d.presence_ref)<0),e[a]=l,s(a,l,c),l.length===0&&delete e[a]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(n=>t(n,e[n]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,n)=>{let s=e[n];return"metas"in s?t[n]=s.metas.map(r=>(r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r)):t[n]=s,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}};var Bh;(function(i){i.ALL="*",i.INSERT="INSERT",i.UPDATE="UPDATE",i.DELETE="DELETE"})(Bh||(Bh={}));var zh;(function(i){i.BROADCAST="broadcast",i.PRESENCE="presence",i.POSTGRES_CHANGES="postgres_changes"})(zh||(zh={}));var Hh;(function(i){i.SUBSCRIBED="SUBSCRIBED",i.TIMED_OUT="TIMED_OUT",i.CLOSED="CLOSED",i.CHANNEL_ERROR="CHANNEL_ERROR"})(Hh||(Hh={}));var er=class i{constructor(e,t={config:{}},n){this.topic=e,this.params=t,this.socket=n,this.bindings={},this.state=cn.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:""},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new os(this,mn.join,this.params,this.timeout),this.rejoinTimer=new rs(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=cn.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(s=>s.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=cn.closed,this.socket._remove(this)}),this._onError(s=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,s),this.state=cn.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=cn.errored,this.rejoinTimer.scheduleTimeout())}),this._on(mn.reply,{},(s,r)=>{this._trigger(this._replyEventName(r),s)}),this.presence=new Qs(this),this.broadcastEndpointURL=Ia(this.socket.endPoint)+"/api/broadcast"}subscribe(e,t=this.timeout){var n,s;if(this.socket.isConnected()||this.socket.connect(),this.joinedOnce)throw"tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";{let{config:{broadcast:r,presence:o,private:a}}=this.params;this._onError(u=>e&&e("CHANNEL_ERROR",u)),this._onClose(()=>e&&e("CLOSED"));let c={},l={broadcast:r,presence:o,postgres_changes:(s=(n=this.bindings.postgres_changes)===null||n===void 0?void 0:n.map(u=>u.filter))!==null&&s!==void 0?s:[],private:a};this.socket.accessToken&&(c.access_token=this.socket.accessToken),this.updateJoinPayload(Object.assign({config:l},c)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",({postgres_changes:u})=>{var d;if(this.socket.accessToken&&this.socket.setAuth(this.socket.accessToken),u===void 0){e&&e("SUBSCRIBED");return}else{let f=this.bindings.postgres_changes,p=(d=f==null?void 0:f.length)!==null&&d!==void 0?d:0,v=[];for(let x=0;x<p;x++){let g=f[x],{filter:{event:m,schema:T,table:E,filter:M}}=g,N=u&&u[x];if(N&&N.event===m&&N.schema===T&&N.table===E&&N.filter===M)v.push(Object.assign(Object.assign({},g),{id:N.id}));else{this.unsubscribe(),e&&e("CHANNEL_ERROR",new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=v,e&&e("SUBSCRIBED");return}}).receive("error",u=>{e&&e("CHANNEL_ERROR",new Error(JSON.stringify(Object.values(u).join(", ")||"error")))}).receive("timeout",()=>{e&&e("TIMED_OUT")})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,n){return this._on(e,t,n)}async send(e,t={}){var n,s;if(!this._canPush()&&e.type==="broadcast"){let{event:r,payload:o}=e,a={method:"POST",headers:{Authorization:this.socket.accessToken?`Bearer ${this.socket.accessToken}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:o}]})};try{let c=await this._fetchWithTimeout(this.broadcastEndpointURL,a,(n=t.timeout)!==null&&n!==void 0?n:this.timeout);return await((s=c.body)===null||s===void 0?void 0:s.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(r=>{var o,a,c;let l=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((c=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||c===void 0)&&c.ack)&&r("ok"),l.receive("ok",()=>r("ok")),l.receive("error",()=>r("error")),l.receive("timeout",()=>r("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=cn.leaving;let t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(mn.close,"leave",this._joinRef())};return this.rejoinTimer.reset(),this.joinPush.destroy(),new Promise(n=>{let s=new os(this,mn.leave,{},e);s.receive("ok",()=>{t(),n("ok")}).receive("timeout",()=>{t(),n("timed out")}).receive("error",()=>{n("error")}),s.send(),this._canPush()||s.trigger("ok",{})})}async _fetchWithTimeout(e,t,n){let s=new AbortController,r=setTimeout(()=>s.abort(),n),o=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:s.signal}));return clearTimeout(r),o}_push(e,t,n=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new os(this,e,t,n);return this._canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}_onMessage(e,t,n){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,n){var s,r;let o=e.toLocaleLowerCase(),{close:a,error:c,leave:l,join:u}=mn;if(n&&[a,c,l,u].indexOf(o)>=0&&n!==this._joinRef())return;let f=this._onMessage(o,t,n);if(t&&!f)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(o)?(s=this.bindings.postgres_changes)===null||s===void 0||s.filter(p=>{var v,x,g;return((v=p.filter)===null||v===void 0?void 0:v.event)==="*"||((g=(x=p.filter)===null||x===void 0?void 0:x.event)===null||g===void 0?void 0:g.toLocaleLowerCase())===o}).map(p=>p.callback(f,n)):(r=this.bindings[o])===null||r===void 0||r.filter(p=>{var v,x,g,m,T,E;if(["broadcast","presence","postgres_changes"].includes(o))if("id"in p){let M=p.id,N=(v=p.filter)===null||v===void 0?void 0:v.event;return M&&((x=t.ids)===null||x===void 0?void 0:x.includes(M))&&(N==="*"||(N==null?void 0:N.toLocaleLowerCase())===((g=t.data)===null||g===void 0?void 0:g.type.toLocaleLowerCase()))}else{let M=(T=(m=p==null?void 0:p.filter)===null||m===void 0?void 0:m.event)===null||T===void 0?void 0:T.toLocaleLowerCase();return M==="*"||M===((E=t==null?void 0:t.event)===null||E===void 0?void 0:E.toLocaleLowerCase())}else return p.type.toLocaleLowerCase()===o}).map(p=>{if(typeof f=="object"&&"ids"in f){let v=f.data,{schema:x,table:g,commit_timestamp:m,type:T,errors:E}=v;f=Object.assign(Object.assign({},{schema:x,table:g,commit_timestamp:m,eventType:T,new:{},old:{},errors:E}),this._getPayloadRecords(v))}p.callback(f,n)})}_isClosed(){return this.state===cn.closed}_isJoined(){return this.state===cn.joined}_isJoining(){return this.state===cn.joining}_isLeaving(){return this.state===cn.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,n){let s=e.toLocaleLowerCase(),r={type:s,filter:t,callback:n};return this.bindings[s]?this.bindings[s].push(r):this.bindings[s]=[r],this}_off(e,t){let n=e.toLocaleLowerCase();return this.bindings[n]=this.bindings[n].filter(s=>{var r;return!(((r=s.type)===null||r===void 0?void 0:r.toLocaleLowerCase())===n&&i.isEqual(s.filter,t))}),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e)if(e[n]!==t[n])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(mn.close,{},e)}_onError(e){this._on(mn.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=cn.joining,this.joinPush.resend(e))}_getPayloadRecords(e){let t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=Fh(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=Fh(e.columns,e.old_record)),t}};var Ux=()=>{},Ox=typeof WebSocket!="undefined",tr=class{constructor(e,t){var n;this.accessToken=null,this.apiKey=null,this.channels=[],this.endPoint="",this.httpEndpoint="",this.headers=vf,this.params={},this.timeout=Pa,this.heartbeatIntervalMs=3e4,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.ref=0,this.logger=Ux,this.conn=null,this.sendBuffer=[],this.serializer=new $r,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this._resolveFetch=r=>{let o;return r?o=r:typeof fetch=="undefined"?o=(...a)=>Promise.resolve().then(()=>(Ri(),is)).then(({default:c})=>c(...a)):o=fetch,(...a)=>o(...a)},this.endPoint=`${e}/${Ca.websocket}`,this.httpEndpoint=Ia(e),t!=null&&t.transport?this.transport=t.transport:this.transport=null,t!=null&&t.params&&(this.params=t.params),t!=null&&t.headers&&(this.headers=Object.assign(Object.assign({},this.headers),t.headers)),t!=null&&t.timeout&&(this.timeout=t.timeout),t!=null&&t.logger&&(this.logger=t.logger),t!=null&&t.heartbeatIntervalMs&&(this.heartbeatIntervalMs=t.heartbeatIntervalMs);let s=(n=t==null?void 0:t.params)===null||n===void 0?void 0:n.apikey;s&&(this.accessToken=s,this.apiKey=s),this.reconnectAfterMs=t!=null&&t.reconnectAfterMs?t.reconnectAfterMs:r=>[1e3,2e3,5e3,1e4][r-1]||1e4,this.encode=t!=null&&t.encode?t.encode:(r,o)=>o(JSON.stringify(r)),this.decode=t!=null&&t.decode?t.decode:this.serializer.decode.bind(this.serializer),this.reconnectTimer=new rs(async()=>{this.disconnect(),this.connect()},this.reconnectAfterMs),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!this.conn){if(this.transport){this.conn=new this.transport(this._endPointURL(),void 0,{headers:this.headers});return}if(Ox){this.conn=new WebSocket(this._endPointURL()),this.setupConnection();return}this.conn=new Vh(this._endPointURL(),void 0,{close:()=>{this.conn=null}}),Promise.resolve().then(()=>Mu(Sf())).then(({default:e})=>{this.conn=new e(this._endPointURL(),void 0,{headers:this.headers}),this.setupConnection()})}}disconnect(e,t){this.conn&&(this.conn.onclose=function(){},e?this.conn.close(e,t!=null?t:""):this.conn.close(),this.conn=null,this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.reset())}getChannels(){return this.channels}async removeChannel(e){let t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){let e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.disconnect(),e}log(e,t,n){this.logger(e,t,n)}connectionState(){switch(this.conn&&this.conn.readyState){case ss.connecting:return Ci.Connecting;case ss.open:return Ci.Open;case ss.closing:return Ci.Closing;default:return Ci.Closed}}isConnected(){return this.connectionState()===Ci.Open}channel(e,t={config:{}}){let n=new er(`realtime:${e}`,t,this);return this.channels.push(n),n}push(e){let{topic:t,event:n,payload:s,ref:r}=e,o=()=>{this.encode(e,a=>{var c;(c=this.conn)===null||c===void 0||c.send(a)})};this.log("push",`${t} ${n} (${r})`,s),this.isConnected()?o():this.sendBuffer.push(o)}setAuth(e){this.accessToken=e,this.channels.forEach(t=>{e&&t.updateJoinPayload({access_token:e}),t.joinedOnce&&t._isJoined()&&t._push(mn.access_token,{access_token:e})})}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(n=>n.topic===e&&(n._isJoined()||n._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t._joinRef()!==e._joinRef())}setupConnection(){this.conn&&(this.conn.binaryType="arraybuffer",this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_endPointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:yf}))}_onConnMessage(e){this.decode(e.data,t=>{let{topic:n,event:s,payload:r,ref:o}=t;(o&&o===this.pendingHeartbeatRef||s===(r==null?void 0:r.type))&&(this.pendingHeartbeatRef=null),this.log("receive",`${r.status||""} ${n} ${s} ${o&&"("+o+")"||""}`,r),this.channels.filter(a=>a._isMember(n)).forEach(a=>a._trigger(s,r,o)),this.stateChangeCallbacks.message.forEach(a=>a(t))})}_onConnOpen(){this.log("transport",`connected to ${this._endPointURL()}`),this._flushSendBuffer(),this.reconnectTimer.reset(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this._sendHeartbeat(),this.heartbeatIntervalMs),this.stateChangeCallbacks.open.forEach(e=>e())}_onConnClose(e){this.log("transport","close",e),this._triggerChanError(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach(t=>t(e))}_onConnError(e){this.log("transport",e.message),this._triggerChanError(),this.stateChangeCallbacks.error.forEach(t=>t(e))}_triggerChanError(){this.channels.forEach(e=>e._trigger(mn.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;let n=e.match(/\?/)?"&":"?",s=new URLSearchParams(t);return`${e}${n}${s}`}_flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_sendHeartbeat(){var e;if(this.isConnected()){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),(e=this.conn)===null||e===void 0||e.close(xf,"hearbeat timeout");return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.setAuth(this.accessToken)}}},Vh=class{constructor(e,t,n){this.binaryType="arraybuffer",this.onclose=()=>{},this.onerror=()=>{},this.onmessage=()=>{},this.onopen=()=>{},this.readyState=ss.connecting,this.send=()=>{},this.url=null,this.url=e,this.close=n.close}};var nr=class extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}};function Dt(i){return typeof i=="object"&&i!==null&&"__isStorageError"in i}var La=class extends nr{constructor(e,t){super(e),this.name="StorageApiError",this.status=t}toJSON(){return{name:this.name,message:this.message,status:this.status}}},as=class extends nr{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}};var Nx=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(n.next(u))}catch(d){o(d)}}function c(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):s(u.value).then(a,c)}l((n=n.apply(i,e||[])).next())})},Ua=i=>{let e;return i?e=i:typeof fetch=="undefined"?e=(...t)=>Promise.resolve().then(()=>(Ri(),is)).then(({default:n})=>n(...t)):e=fetch,(...t)=>e(...t)},wf=()=>Nx(void 0,void 0,void 0,function*(){return typeof Response=="undefined"?(yield Promise.resolve().then(()=>(Ri(),is))).Response:Response}),Da=i=>{if(Array.isArray(i))return i.map(t=>Da(t));if(typeof i=="function"||i!==Object(i))return i;let e={};return Object.entries(i).forEach(([t,n])=>{let s=t.replace(/([-_][a-z])/gi,r=>r.toUpperCase().replace(/[-_]/g,""));e[s]=Da(n)}),e};var cs=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(n.next(u))}catch(d){o(d)}}function c(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):s(u.value).then(a,c)}l((n=n.apply(i,e||[])).next())})},Gh=i=>i.msg||i.message||i.error_description||i.error||JSON.stringify(i),Fx=(i,e,t)=>cs(void 0,void 0,void 0,function*(){let n=yield wf();i instanceof n&&!(t!=null&&t.noResolveJson)?i.json().then(s=>{e(new La(Gh(s),i.status||500))}).catch(s=>{e(new as(Gh(s),s))}):e(new as(Gh(i),i))}),kx=(i,e,t,n)=>{let s={method:i,headers:(e==null?void 0:e.headers)||{}};return i==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),n&&(s.body=JSON.stringify(n)),Object.assign(Object.assign({},s),t))};function qr(i,e,t,n,s,r){return cs(this,void 0,void 0,function*(){return new Promise((o,a)=>{i(t,kx(e,n,s,r)).then(c=>{if(!c.ok)throw c;return n!=null&&n.noResolveJson?c:c.json()}).then(c=>o(c)).catch(c=>Fx(c,a,n))})})}function ir(i,e,t,n){return cs(this,void 0,void 0,function*(){return qr(i,"GET",e,t,n)})}function jn(i,e,t,n,s){return cs(this,void 0,void 0,function*(){return qr(i,"POST",e,n,s,t)})}function Ef(i,e,t,n,s){return cs(this,void 0,void 0,function*(){return qr(i,"PUT",e,n,s,t)})}function Tf(i,e,t,n){return cs(this,void 0,void 0,function*(){return qr(i,"HEAD",e,Object.assign(Object.assign({},t),{noResolveJson:!0}),n)})}function Oa(i,e,t,n,s){return cs(this,void 0,void 0,function*(){return qr(i,"DELETE",e,n,s,t)})}var ln=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(n.next(u))}catch(d){o(d)}}function c(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):s(u.value).then(a,c)}l((n=n.apply(i,e||[])).next())})},Bx={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Af={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1},jr=class{constructor(e,t={},n,s){this.url=e,this.headers=t,this.bucketId=n,this.fetch=Ua(s)}uploadOrUpdate(e,t,n,s){return ln(this,void 0,void 0,function*(){try{let r,o=Object.assign(Object.assign({},Af),s),a=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(o.upsert)}),c=o.metadata;typeof Blob!="undefined"&&n instanceof Blob?(r=new FormData,r.append("cacheControl",o.cacheControl),r.append("",n),c&&r.append("metadata",this.encodeMetadata(c))):typeof FormData!="undefined"&&n instanceof FormData?(r=n,r.append("cacheControl",o.cacheControl),c&&r.append("metadata",this.encodeMetadata(c))):(r=n,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,c&&(a["x-metadata"]=this.toBase64(this.encodeMetadata(c)))),s!=null&&s.headers&&(a=Object.assign(Object.assign({},a),s.headers));let l=this._removeEmptyFolders(t),u=this._getFinalPath(l),d=yield this.fetch(`${this.url}/object/${u}`,Object.assign({method:e,body:r,headers:a},o!=null&&o.duplex?{duplex:o.duplex}:{})),f=yield d.json();return d.ok?{data:{path:l,id:f.Id,fullPath:f.Key},error:null}:{data:null,error:f}}catch(r){if(Dt(r))return{data:null,error:r};throw r}})}upload(e,t,n){return ln(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,n)})}uploadToSignedUrl(e,t,n,s){return ln(this,void 0,void 0,function*(){let r=this._removeEmptyFolders(e),o=this._getFinalPath(r),a=new URL(this.url+`/object/upload/sign/${o}`);a.searchParams.set("token",t);try{let c,l=Object.assign({upsert:Af.upsert},s),u=Object.assign(Object.assign({},this.headers),{"x-upsert":String(l.upsert)});typeof Blob!="undefined"&&n instanceof Blob?(c=new FormData,c.append("cacheControl",l.cacheControl),c.append("",n)):typeof FormData!="undefined"&&n instanceof FormData?(c=n,c.append("cacheControl",l.cacheControl)):(c=n,u["cache-control"]=`max-age=${l.cacheControl}`,u["content-type"]=l.contentType);let d=yield this.fetch(a.toString(),{method:"PUT",body:c,headers:u}),f=yield d.json();return d.ok?{data:{path:r,fullPath:f.Key},error:null}:{data:null,error:f}}catch(c){if(Dt(c))return{data:null,error:c};throw c}})}createSignedUploadUrl(e,t){return ln(this,void 0,void 0,function*(){try{let n=this._getFinalPath(e),s=Object.assign({},this.headers);t!=null&&t.upsert&&(s["x-upsert"]="true");let r=yield jn(this.fetch,`${this.url}/object/upload/sign/${n}`,{},{headers:s}),o=new URL(this.url+r.url),a=o.searchParams.get("token");if(!a)throw new nr("No token returned by API");return{data:{signedUrl:o.toString(),path:e,token:a},error:null}}catch(n){if(Dt(n))return{data:null,error:n};throw n}})}update(e,t,n){return ln(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,n)})}move(e,t,n){return ln(this,void 0,void 0,function*(){try{return{data:yield jn(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n==null?void 0:n.destinationBucket},{headers:this.headers}),error:null}}catch(s){if(Dt(s))return{data:null,error:s};throw s}})}copy(e,t,n){return ln(this,void 0,void 0,function*(){try{return{data:{path:(yield jn(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n==null?void 0:n.destinationBucket},{headers:this.headers})).Key},error:null}}catch(s){if(Dt(s))return{data:null,error:s};throw s}})}createSignedUrl(e,t,n){return ln(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e),r=yield jn(this.fetch,`${this.url}/object/sign/${s}`,Object.assign({expiresIn:t},n!=null&&n.transform?{transform:n.transform}:{}),{headers:this.headers}),o=n!=null&&n.download?`&download=${n.download===!0?"":n.download}`:"";return r={signedUrl:encodeURI(`${this.url}${r.signedURL}${o}`)},{data:r,error:null}}catch(s){if(Dt(s))return{data:null,error:s};throw s}})}createSignedUrls(e,t,n){return ln(this,void 0,void 0,function*(){try{let s=yield jn(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),r=n!=null&&n.download?`&download=${n.download===!0?"":n.download}`:"";return{data:s.map(o=>Object.assign(Object.assign({},o),{signedUrl:o.signedURL?encodeURI(`${this.url}${o.signedURL}${r}`):null})),error:null}}catch(s){if(Dt(s))return{data:null,error:s};throw s}})}download(e,t){return ln(this,void 0,void 0,function*(){let s=typeof(t==null?void 0:t.transform)!="undefined"?"render/image/authenticated":"object",r=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),o=r?`?${r}`:"";try{let a=this._getFinalPath(e);return{data:yield(yield ir(this.fetch,`${this.url}/${s}/${a}${o}`,{headers:this.headers,noResolveJson:!0})).blob(),error:null}}catch(a){if(Dt(a))return{data:null,error:a};throw a}})}info(e){return ln(this,void 0,void 0,function*(){let t=this._getFinalPath(e);try{let n=yield ir(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:Da(n),error:null}}catch(n){if(Dt(n))return{data:null,error:n};throw n}})}exists(e){return ln(this,void 0,void 0,function*(){let t=this._getFinalPath(e);try{return yield Tf(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(n){if(Dt(n)&&n instanceof as){let s=n.originalError;if([400,404].includes(s==null?void 0:s.status))return{data:!1,error:n}}throw n}})}getPublicUrl(e,t){let n=this._getFinalPath(e),s=[],r=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";r!==""&&s.push(r);let a=typeof(t==null?void 0:t.transform)!="undefined"?"render/image":"object",c=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});c!==""&&s.push(c);let l=s.join("&");return l!==""&&(l=`?${l}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}${l}`)}}}remove(e){return ln(this,void 0,void 0,function*(){try{return{data:yield Oa(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(Dt(t))return{data:null,error:t};throw t}})}list(e,t,n){return ln(this,void 0,void 0,function*(){try{let s=Object.assign(Object.assign(Object.assign({},Bx),t),{prefix:e||""});return{data:yield jn(this.fetch,`${this.url}/object/list/${this.bucketId}`,s,{headers:this.headers},n),error:null}}catch(s){if(Dt(s))return{data:null,error:s};throw s}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer!="undefined"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){let t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}};var Rf="2.7.0";var Cf={"X-Client-Info":`storage-js/${Rf}`};var sr=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(n.next(u))}catch(d){o(d)}}function c(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):s(u.value).then(a,c)}l((n=n.apply(i,e||[])).next())})},Yr=class{constructor(e,t={},n){this.url=e,this.headers=Object.assign(Object.assign({},Cf),t),this.fetch=Ua(n)}listBuckets(){return sr(this,void 0,void 0,function*(){try{return{data:yield ir(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(e){if(Dt(e))return{data:null,error:e};throw e}})}getBucket(e){return sr(this,void 0,void 0,function*(){try{return{data:yield ir(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(Dt(t))return{data:null,error:t};throw t}})}createBucket(e,t={public:!1}){return sr(this,void 0,void 0,function*(){try{return{data:yield jn(this.fetch,`${this.url}/bucket`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(Dt(n))return{data:null,error:n};throw n}})}updateBucket(e,t){return sr(this,void 0,void 0,function*(){try{return{data:yield Ef(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(Dt(n))return{data:null,error:n};throw n}})}emptyBucket(e){return sr(this,void 0,void 0,function*(){try{return{data:yield jn(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(Dt(t))return{data:null,error:t};throw t}})}deleteBucket(e){return sr(this,void 0,void 0,function*(){try{return{data:yield Oa(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(Dt(t))return{data:null,error:t};throw t}})}};var Zr=class extends Yr{constructor(e,t={},n){super(e,t,n)}from(e){return new jr(this.url,this.headers,e,this.fetch)}};var Pf="2.45.4";var Jr="";typeof Deno!="undefined"?Jr="deno":typeof document!="undefined"?Jr="web":typeof navigator!="undefined"&&navigator.product==="ReactNative"?Jr="react-native":Jr="node";var zx={"X-Client-Info":`supabase-js-${Jr}/${Pf}`},If={headers:zx},Lf={schema:"public"},Df={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Uf={};Ri();var Hx=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(n.next(u))}catch(d){o(d)}}function c(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):s(u.value).then(a,c)}l((n=n.apply(i,e||[])).next())})},Vx=i=>{let e;return i?e=i:typeof fetch=="undefined"?e=wh:e=fetch,(...t)=>e(...t)},Gx=()=>typeof Headers=="undefined"?Eh:Headers,Of=(i,e,t)=>{let n=Vx(t),s=Gx();return(r,o)=>Hx(void 0,void 0,void 0,function*(){var a;let c=(a=yield e())!==null&&a!==void 0?a:i,l=new s(o==null?void 0:o.headers);return l.has("apikey")||l.set("apikey",i),l.has("Authorization")||l.set("Authorization",`Bearer ${c}`),n(r,Object.assign(Object.assign({},o),{headers:l}))})};var Wx=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(n.next(u))}catch(d){o(d)}}function c(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):s(u.value).then(a,c)}l((n=n.apply(i,e||[])).next())})};function Nf(i){return i.replace(/\/$/,"")}function Ff(i,e){let{db:t,auth:n,realtime:s,global:r}=i,{db:o,auth:a,realtime:c,global:l}=e,u={db:Object.assign(Object.assign({},o),t),auth:Object.assign(Object.assign({},a),n),realtime:Object.assign(Object.assign({},c),s),global:Object.assign(Object.assign({},l),r),accessToken:()=>Wx(this,void 0,void 0,function*(){return""})};return i.accessToken?u.accessToken=i.accessToken:delete u.accessToken,u}var Na="2.65.0";var kf="http://localhost:9999",Bf="supabase.auth.token";var zf={"X-Client-Info":`gotrue-js/${Na}`},Wh=10;var Kr="X-Supabase-Api-Version",Xh={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}};function Hf(i){return Math.round(Date.now()/1e3)+i}function Vf(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(i){let e=Math.random()*16|0;return(i=="x"?e:e&3|8).toString(16)})}var wn=()=>typeof document!="undefined",ls={tested:!1,writable:!1},Pi=()=>{if(!wn())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(ls.tested)return ls.writable;let i=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(i,i),globalThis.localStorage.removeItem(i),ls.tested=!0,ls.writable=!0}catch{ls.tested=!0,ls.writable=!1}return ls.writable};function Fa(i){let e={},t=new URL(i);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((s,r)=>{e[r]=s})}catch{}return t.searchParams.forEach((n,s)=>{e[s]=n}),e}var ka=i=>{let e;return i?e=i:typeof fetch=="undefined"?e=(...t)=>Promise.resolve().then(()=>(Ri(),is)).then(({default:n})=>n(...t)):e=fetch,(...t)=>e(...t)},Gf=i=>typeof i=="object"&&i!==null&&"status"in i&&"ok"in i&&"json"in i&&typeof i.json=="function",$h=async(i,e,t)=>{await i.setItem(e,JSON.stringify(t))},eo=async(i,e)=>{let t=await i.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},to=async(i,e)=>{await i.removeItem(e)};function Xx(i){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",t="",n,s,r,o,a,c,l,u=0;for(i=i.replace("-","+").replace("_","/");u<i.length;)o=e.indexOf(i.charAt(u++)),a=e.indexOf(i.charAt(u++)),c=e.indexOf(i.charAt(u++)),l=e.indexOf(i.charAt(u++)),n=o<<2|a>>4,s=(a&15)<<4|c>>2,r=(c&3)<<6|l,t=t+String.fromCharCode(n),c!=64&&s!=0&&(t=t+String.fromCharCode(s)),l!=64&&r!=0&&(t=t+String.fromCharCode(r));return t}var Qr=class i{constructor(){this.promise=new i.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}};Qr.promiseConstructor=Promise;function qh(i){let e=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i,t=i.split(".");if(t.length!==3)throw new Error("JWT is not valid: not a JWT structure");if(!e.test(t[1]))throw new Error("JWT is not valid: payload is not in base64url format");let n=t[1];return JSON.parse(Xx(n))}async function Wf(i){return await new Promise(e=>{setTimeout(()=>e(null),i)})}function Xf(i,e){return new Promise((n,s)=>{(async()=>{for(let r=0;r<1/0;r++)try{let o=await i(r);if(!e(r,null,o)){n(o);return}}catch(o){if(!e(r,o)){s(o);return}}})()})}function $x(i){return("0"+i.toString(16)).substr(-2)}function qx(){let e=new Uint32Array(56);if(typeof crypto=="undefined"){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",n=t.length,s="";for(let r=0;r<56;r++)s+=t.charAt(Math.floor(Math.random()*n));return s}return crypto.getRandomValues(e),Array.from(e,$x).join("")}async function jx(i){let t=new TextEncoder().encode(i),n=await crypto.subtle.digest("SHA-256",t),s=new Uint8Array(n);return Array.from(s).map(r=>String.fromCharCode(r)).join("")}function Yx(i){return btoa(i).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Zx(i){if(!(typeof crypto!="undefined"&&typeof crypto.subtle!="undefined"&&typeof TextEncoder!="undefined"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),i;let t=await jx(i);return Yx(t)}async function hs(i,e,t=!1){let n=qx(),s=n;t&&(s+="/PASSWORD_RECOVERY"),await $h(i,`${e}-code-verifier`,s);let r=await Zx(n);return[r,n===r?"plain":"s256"]}var Jx=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function $f(i){let e=i.headers.get(Kr);if(!e||!e.match(Jx))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}var no=class extends Error{constructor(e,t,n){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=n}};function tt(i){return typeof i=="object"&&i!==null&&"__isAuthError"in i}var Ba=class extends no{constructor(e,t,n){super(e,t,n),this.name="AuthApiError",this.status=t,this.code=n}};function qf(i){return tt(i)&&i.name==="AuthApiError"}var rr=class extends no{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}},fi=class extends no{constructor(e,t,n,s){super(e,n,s),this.name=t,this.status=n}},En=class extends fi{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}};function jf(i){return tt(i)&&i.name==="AuthSessionMissingError"}var or=class extends fi{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}},us=class extends fi{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}},ds=class extends fi{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},io=class extends fi{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},ar=class extends fi{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}};function za(i){return tt(i)&&i.name==="AuthRetryableFetchError"}var so=class extends fi{constructor(e,t,n){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=n}};var Kx=function(i,e){var t={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&e.indexOf(n)<0&&(t[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(i);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(i,n[s])&&(t[n[s]]=i[n[s]]);return t},fs=i=>i.msg||i.message||i.error_description||i.error||JSON.stringify(i),Qx=[502,503,504];async function Yf(i){var e;if(!Gf(i))throw new ar(fs(i),0);if(Qx.includes(i.status))throw new ar(fs(i),i.status);let t;try{t=await i.json()}catch(r){throw new rr(fs(r),r)}let n,s=$f(i);if(s&&s.getTime()>=Xh["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?n=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(n=t.error_code),n){if(n==="weak_password")throw new so(fs(t),i.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(n==="session_not_found")throw new En}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((r,o)=>r&&typeof o=="string",!0))throw new so(fs(t),i.status,t.weak_password.reasons);throw new Ba(fs(t),i.status||500,n)}var eb=(i,e,t,n)=>{let s={method:i,headers:(e==null?void 0:e.headers)||{}};return i==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),s.body=JSON.stringify(n),Object.assign(Object.assign({},s),t))};async function ht(i,e,t,n){var s;let r=Object.assign({},n==null?void 0:n.headers);r[Kr]||(r[Kr]=Xh["2024-01-01"].name),n!=null&&n.jwt&&(r.Authorization=`Bearer ${n.jwt}`);let o=(s=n==null?void 0:n.query)!==null&&s!==void 0?s:{};n!=null&&n.redirectTo&&(o.redirect_to=n.redirectTo);let a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",c=await tb(i,e,t+a,{headers:r,noResolveJson:n==null?void 0:n.noResolveJson},{},n==null?void 0:n.body);return n!=null&&n.xform?n==null?void 0:n.xform(c):{data:Object.assign({},c),error:null}}async function tb(i,e,t,n,s,r){let o=eb(e,n,s,r),a;try{a=await i(t,Object.assign({},o))}catch(c){throw console.error(c),new ar(fs(c),0)}if(a.ok||await Yf(a),n!=null&&n.noResolveJson)return a;try{return await a.json()}catch(c){await Yf(c)}}function pi(i){var e;let t=null;nb(i)&&(t=Object.assign({},i),i.expires_at||(t.expires_at=Hf(i.expires_in)));let n=(e=i.user)!==null&&e!==void 0?e:i;return{data:{session:t,user:n},error:null}}function jh(i){let e=pi(i);return!e.error&&i.weak_password&&typeof i.weak_password=="object"&&Array.isArray(i.weak_password.reasons)&&i.weak_password.reasons.length&&i.weak_password.message&&typeof i.weak_password.message=="string"&&i.weak_password.reasons.reduce((t,n)=>t&&typeof n=="string",!0)&&(e.data.weak_password=i.weak_password),e}function Yn(i){var e;return{data:{user:(e=i.user)!==null&&e!==void 0?e:i},error:null}}function Zf(i){return{data:i,error:null}}function Jf(i){let{action_link:e,email_otp:t,hashed_token:n,redirect_to:s,verification_type:r}=i,o=Kx(i,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:t,hashed_token:n,redirect_to:s,verification_type:r},c=Object.assign({},o);return{data:{properties:a,user:c},error:null}}function Kf(i){return i}function nb(i){return i.access_token&&i.refresh_token&&i.expires_in}var ib=function(i,e){var t={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&e.indexOf(n)<0&&(t[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(i);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(i,n[s])&&(t[n[s]]=i[n[s]]);return t},ps=class{constructor({url:e="",headers:t={},fetch:n}){this.url=e,this.headers=t,this.fetch=ka(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(e,t="global"){try{return await ht(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(n){if(tt(n))return{data:null,error:n};throw n}}async inviteUserByEmail(e,t={}){try{return await ht(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Yn})}catch(n){if(tt(n))return{data:{user:null},error:n};throw n}}async generateLink(e){try{let{options:t}=e,n=ib(e,["options"]),s=Object.assign(Object.assign({},n),t);return"newEmail"in n&&(s.new_email=n==null?void 0:n.newEmail,delete s.newEmail),await ht(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:Jf,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(tt(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await ht(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Yn})}catch(t){if(tt(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,n,s,r,o,a,c;try{let l={nextPage:null,lastPage:0,total:0},u=await ht(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&n!==void 0?n:"",per_page:(r=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&r!==void 0?r:""},xform:Kf});if(u.error)throw u.error;let d=await u.json(),f=(o=u.headers.get("x-total-count"))!==null&&o!==void 0?o:0,p=(c=(a=u.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&c!==void 0?c:[];return p.length>0&&(p.forEach(v=>{let x=parseInt(v.split(";")[0].split("=")[1].substring(0,1)),g=JSON.parse(v.split(";")[1].split("=")[1]);l[`${g}Page`]=x}),l.total=parseInt(f)),{data:Object.assign(Object.assign({},d),l),error:null}}catch(l){if(tt(l))return{data:{users:[]},error:l};throw l}}async getUserById(e){try{return await ht(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Yn})}catch(t){if(tt(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){try{return await ht(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Yn})}catch(n){if(tt(n))return{data:{user:null},error:n};throw n}}async deleteUser(e,t=!1){try{return await ht(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Yn})}catch(n){if(tt(n))return{data:{user:null},error:n};throw n}}async _listFactors(e){try{let{data:t,error:n}=await ht(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:t,error:n}}catch(t){if(tt(t))return{data:null,error:t};throw t}}async _deleteFactor(e){try{return{data:await ht(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(tt(t))return{data:null,error:t};throw t}}};var Qf={getItem:i=>Pi()?globalThis.localStorage.getItem(i):null,setItem:(i,e)=>{Pi()&&globalThis.localStorage.setItem(i,e)},removeItem:i=>{Pi()&&globalThis.localStorage.removeItem(i)}};function Yh(i={}){return{getItem:e=>i[e]||null,setItem:(e,t)=>{i[e]=t},removeItem:e=>{delete i[e]}}}function ep(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self!="undefined"&&(self.globalThis=self)}}var ms={debug:!!(globalThis&&Pi()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")},ro=class extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}},Ha=class extends ro{};async function Zh(i,e,t){ms.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",i,e);let n=new globalThis.AbortController;return e>0&&setTimeout(()=>{n.abort(),ms.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",i)},e),await globalThis.navigator.locks.request(i,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:n.signal},async s=>{if(s){ms.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",i,s.name);try{return await t()}finally{ms.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",i,s.name)}}else{if(e===0)throw ms.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",i),new Ha(`Acquiring an exclusive Navigator LockManager lock "${i}" immediately failed`);if(ms.debug)try{let r=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(r,null,"  "))}catch(r){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",r)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}})}ep();var sb={url:kf,storageKey:Bf,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:zf,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1},oo=30*1e3,tp=3;async function np(i,e,t){return await t()}var gs=class i{constructor(e){var t,n;this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=i.nextInstanceID,i.nextInstanceID+=1,this.instanceID>0&&wn()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");let s=Object.assign(Object.assign({},sb),e);if(this.logDebugMessages=!!s.debug,typeof s.debug=="function"&&(this.logger=s.debug),this.persistSession=s.persistSession,this.storageKey=s.storageKey,this.autoRefreshToken=s.autoRefreshToken,this.admin=new ps({url:s.url,headers:s.headers,fetch:s.fetch}),this.url=s.url,this.headers=s.headers,this.fetch=ka(s.fetch),this.lock=s.lock||np,this.detectSessionInUrl=s.detectSessionInUrl,this.flowType=s.flowType,this.hasCustomAuthorizationHeader=s.hasCustomAuthorizationHeader,s.lock?this.lock=s.lock:wn()&&(!((t=globalThis==null?void 0:globalThis.navigator)===null||t===void 0)&&t.locks)?this.lock=Zh:this.lock=np,this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?s.storage?this.storage=s.storage:Pi()?this.storage=Qf:(this.memoryStorage={},this.storage=Yh(this.memoryStorage)):(this.memoryStorage={},this.storage=Yh(this.memoryStorage)),wn()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(r){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",r)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async r=>{this._debug("received broadcast notification from other tab or client",r),await this._notifyAllSubscribers(r.data.event,r.data.session,!1)})}this.initialize()}_debug(...e){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${Na}) ${new Date().toISOString()}`,...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){try{let e=wn()?await this._isPKCEFlow():!1;if(this._debug("#_initialize()","begin","is PKCE flow",e),e||this.detectSessionInUrl&&this._isImplicitGrantFlow()){let{data:t,error:n}=await this._getSessionFromURL(e);if(n)return this._debug("#_initialize()","error detecting session from URL",n),(n==null?void 0:n.message)==="Identity is already linked"||(n==null?void 0:n.message)==="Identity is already linked to another user"?{error:n}:(await this._removeSession(),{error:n});let{session:s,redirectType:r}=t;return this._debug("#_initialize()","detected session in URL",s,"redirect type",r),await this._saveSession(s),setTimeout(async()=>{r==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",s):await this._notifyAllSubscribers("SIGNED_IN",s)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return tt(e)?{error:e}:{error:new rr("Unexpected error during initialization",e)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,n,s;try{let r=await ht(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(n=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.captchaToken}},xform:pi}),{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};let c=o.session,l=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),{data:{user:l,session:c},error:null}}catch(r){if(tt(r))return{data:{user:null,session:null},error:r};throw r}}async signUp(e){var t,n,s;try{let r;if("email"in e){let{email:u,password:d,options:f}=e,p=null,v=null;this.flowType==="pkce"&&([p,v]=await hs(this.storage,this.storageKey)),r=await ht(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:f==null?void 0:f.emailRedirectTo,body:{email:u,password:d,data:(t=f==null?void 0:f.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken},code_challenge:p,code_challenge_method:v},xform:pi})}else if("phone"in e){let{phone:u,password:d,options:f}=e;r=await ht(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:d,data:(n=f==null?void 0:f.data)!==null&&n!==void 0?n:{},channel:(s=f==null?void 0:f.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken}},xform:pi})}else throw new us("You must provide either an email or phone number and a password");let{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};let c=o.session,l=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),{data:{user:l,session:c},error:null}}catch(r){if(tt(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithPassword(e){try{let t;if("email"in e){let{email:r,password:o,options:a}=e;t=await ht(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:jh})}else if("phone"in e){let{phone:r,password:o,options:a}=e;t=await ht(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:jh})}else throw new us("You must provide either an email or phone number and a password");let{data:n,error:s}=t;return s?{data:{user:null,session:null},error:s}:!n||!n.session||!n.user?{data:{user:null,session:null},error:new or}:(n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),{data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:s})}catch(t){if(tt(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOAuth(e){var t,n,s,r;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(n=e.options)===null||n===void 0?void 0:n.scopes,queryParams:(s=e.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(r=e.options)===null||r===void 0?void 0:r.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async _exchangeCodeForSession(e){let t=await eo(this.storage,`${this.storageKey}-code-verifier`),[n,s]=(t!=null?t:"").split("/");try{let{data:r,error:o}=await ht(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:n},xform:pi});if(await to(this.storage,`${this.storageKey}-code-verifier`),o)throw o;return!r||!r.session||!r.user?{data:{user:null,session:null,redirectType:null},error:new or}:(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),{data:Object.assign(Object.assign({},r),{redirectType:s!=null?s:null}),error:o})}catch(r){if(tt(r))return{data:{user:null,session:null,redirectType:null},error:r};throw r}}async signInWithIdToken(e){try{let{options:t,provider:n,token:s,access_token:r,nonce:o}=e,a=await ht(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:s,access_token:r,nonce:o,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:pi}),{data:c,error:l}=a;return l?{data:{user:null,session:null},error:l}:!c||!c.session||!c.user?{data:{user:null,session:null},error:new or}:(c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers("SIGNED_IN",c.session)),{data:c,error:l})}catch(t){if(tt(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOtp(e){var t,n,s,r,o;try{if("email"in e){let{email:a,options:c}=e,l=null,u=null;this.flowType==="pkce"&&([l,u]=await hs(this.storage,this.storageKey));let{error:d}=await ht(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(t=c==null?void 0:c.data)!==null&&t!==void 0?t:{},create_user:(n=c==null?void 0:c.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},code_challenge:l,code_challenge_method:u},redirectTo:c==null?void 0:c.emailRedirectTo});return{data:{user:null,session:null},error:d}}if("phone"in e){let{phone:a,options:c}=e,{data:l,error:u}=await ht(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(s=c==null?void 0:c.data)!==null&&s!==void 0?s:{},create_user:(r=c==null?void 0:c.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},channel:(o=c==null?void 0:c.channel)!==null&&o!==void 0?o:"sms"}});return{data:{user:null,session:null,messageId:l==null?void 0:l.message_id},error:u}}throw new us("You must provide either an email or phone number.")}catch(a){if(tt(a))return{data:{user:null,session:null},error:a};throw a}}async verifyOtp(e){var t,n;try{let s,r;"options"in e&&(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo,r=(n=e.options)===null||n===void 0?void 0:n.captchaToken);let{data:o,error:a}=await ht(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:r}}),redirectTo:s,xform:pi});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");let c=o.session,l=o.user;return c!=null&&c.access_token&&(await this._saveSession(c),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c)),{data:{user:l,session:c},error:null}}catch(s){if(tt(s))return{data:{user:null,session:null},error:s};throw s}}async signInWithSSO(e){var t,n,s;try{let r=null,o=null;return this.flowType==="pkce"&&([r,o]=await hs(this.storage,this.storageKey)),await ht(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(n=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&n!==void 0?n:void 0}),!((s=e==null?void 0:e.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:r,code_challenge_method:o}),headers:this.headers,xform:Zf})}catch(r){if(tt(r))return{data:null,error:r};throw r}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)throw n;if(!t)throw new En;let{error:s}=await ht(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return{data:{user:null,session:null},error:s}})}catch(e){if(tt(e))return{data:{user:null,session:null},error:e};throw e}}async resend(e){try{let t=`${this.url}/resend`;if("email"in e){let{email:n,type:s,options:r}=e,{error:o}=await ht(this.fetch,"POST",t,{headers:this.headers,body:{email:n,type:s,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},redirectTo:r==null?void 0:r.emailRedirectTo});return{data:{user:null,session:null},error:o}}else if("phone"in e){let{phone:n,type:s,options:r}=e,{data:o,error:a}=await ht(this.fetch,"POST",t,{headers:this.headers,body:{phone:n,type:s,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}}});return{data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:a}}throw new us("You must provide either an email or phone number and a type")}catch(t){if(tt(t))return{data:{user:null,session:null},error:t};throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){let n=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await n,await t()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;let n=t();for(this.pendingInLock.push((async()=>{try{await n}catch{}})()),await n;this.pendingInLock.length;){let s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await n}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{let t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null,t=await eo(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};let n=e.expires_at?e.expires_at<=Date.now()/1e3:!1;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",e.expires_at),!n){if(this.storage.isServer){let o=this.suppressGetSessionWarning;e=new Proxy(e,{get:(c,l,u)=>(!o&&l==="user"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),o=!0,this.suppressGetSessionWarning=!0),Reflect.get(c,l,u))})}return{data:{session:e},error:null}}let{session:s,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{session:null},error:r}:{data:{session:s},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(e){return e?await this._getUser(e):(await this.initializePromise,await this._acquireLock(-1,async()=>await this._getUser()))}async _getUser(e){try{return e?await ht(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Yn}):await this._useSession(async t=>{var n,s,r;let{data:o,error:a}=t;if(a)throw a;return!(!((n=o.session)===null||n===void 0)&&n.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new En}:await ht(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(r=(s=o.session)===null||s===void 0?void 0:s.access_token)!==null&&r!==void 0?r:void 0,xform:Yn})})}catch(t){if(tt(t))return jf(t)&&(await this._removeSession(),await to(this.storage,`${this.storageKey}-code-verifier`),await this._notifyAllSubscribers("SIGNED_OUT",null)),{data:{user:null},error:t};throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async n=>{let{data:s,error:r}=n;if(r)throw r;if(!s.session)throw new En;let o=s.session,a=null,c=null;this.flowType==="pkce"&&e.email!=null&&([a,c]=await hs(this.storage,this.storageKey));let{data:l,error:u}=await ht(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:a,code_challenge_method:c}),jwt:o.access_token,xform:Yn});if(u)throw u;return o.user=l.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),{data:{user:o.user},error:null}})}catch(n){if(tt(n))return{data:{user:null},error:n};throw n}}_decodeJWT(e){return qh(e)}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new En;let t=Date.now()/1e3,n=t,s=!0,r=null,o=qh(e.access_token);if(o.exp&&(n=o.exp,s=n<=t),s){let{session:a,error:c}=await this._callRefreshToken(e.refresh_token);if(c)return{data:{user:null,session:null},error:c};if(!a)return{data:{user:null,session:null},error:null};r=a}else{let{data:a,error:c}=await this._getUser(e.access_token);if(c)throw c;r={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:n-t,expires_at:n},await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)}return{data:{user:r.user,session:r},error:null}}catch(t){if(tt(t))return{data:{session:null,user:null},error:t};throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var n;if(!e){let{data:o,error:a}=t;if(a)throw a;e=(n=o.session)!==null&&n!==void 0?n:void 0}if(!(e!=null&&e.refresh_token))throw new En;let{session:s,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{user:null,session:null},error:r}:s?{data:{user:s.user,session:s},error:null}:{data:{user:null,session:null},error:null}})}catch(t){if(tt(t))return{data:{user:null,session:null},error:t};throw t}}async _getSessionFromURL(e){try{if(!wn())throw new ds("No browser detected.");if(this.flowType==="implicit"&&!this._isImplicitGrantFlow())throw new ds("Not a valid implicit grant flow url.");if(this.flowType=="pkce"&&!e)throw new io("Not a valid PKCE flow url.");let t=Fa(window.location.href);if(e){if(!t.code)throw new io("No code detected.");let{data:T,error:E}=await this._exchangeCodeForSession(t.code);if(E)throw E;let M=new URL(window.location.href);return M.searchParams.delete("code"),window.history.replaceState(window.history.state,"",M.toString()),{data:{session:T.session,redirectType:null},error:null}}if(t.error||t.error_description||t.error_code)throw new ds(t.error_description||"Error in URL with unspecified error_description",{error:t.error||"unspecified_error",code:t.error_code||"unspecified_code"});let{provider_token:n,provider_refresh_token:s,access_token:r,refresh_token:o,expires_in:a,expires_at:c,token_type:l}=t;if(!r||!a||!o||!l)throw new ds("No session defined in URL");let u=Math.round(Date.now()/1e3),d=parseInt(a),f=u+d;c&&(f=parseInt(c));let p=f-u;p*1e3<=oo&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${d}s`);let v=f-d;u-v>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",v,f,u):u-v<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",v,f,u);let{data:x,error:g}=await this._getUser(r);if(g)throw g;let m={provider_token:n,provider_refresh_token:s,access_token:r,expires_in:d,expires_at:f,refresh_token:o,token_type:l,user:x.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:m,redirectType:t.type},error:null}}catch(t){if(tt(t))return{data:{session:null,redirectType:null},error:t};throw t}}_isImplicitGrantFlow(){let e=Fa(window.location.href);return!!(wn()&&(e.access_token||e.error_description))}async _isPKCEFlow(){let e=Fa(window.location.href),t=await eo(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var n;let{data:s,error:r}=t;if(r)return{error:r};let o=(n=s.session)===null||n===void 0?void 0:n.access_token;if(o){let{error:a}=await this.admin.signOut(o,e);if(a&&!(qf(a)&&(a.status===404||a.status===401||a.status===403)))return{error:a}}return e!=="others"&&(await this._removeSession(),await to(this.storage,`${this.storageKey}-code-verifier`),await this._notifyAllSubscribers("SIGNED_OUT",null)),{error:null}})}onAuthStateChange(e){let t=Vf(),n={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,n),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async t=>{var n,s;try{let{data:{session:r},error:o}=t;if(o)throw o;await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",e,"session",r)}catch(r){await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",r),console.error(r)}})}async resetPasswordForEmail(e,t={}){let n=null,s=null;this.flowType==="pkce"&&([n,s]=await hs(this.storage,this.storageKey,!0));try{return await ht(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:s,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(r){if(tt(r))return{data:null,error:r};throw r}}async getUserIdentities(){var e;try{let{data:t,error:n}=await this.getUser();if(n)throw n;return{data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null}}catch(t){if(tt(t))return{data:null,error:t};throw t}}async linkIdentity(e){var t;try{let{data:n,error:s}=await this._useSession(async r=>{var o,a,c,l,u;let{data:d,error:f}=r;if(f)throw f;let p=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(c=e.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return await ht(this.fetch,"GET",p,{headers:this.headers,jwt:(u=(l=d.session)===null||l===void 0?void 0:l.access_token)!==null&&u!==void 0?u:void 0})});if(s)throw s;return wn()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(n==null?void 0:n.url),{data:{provider:e.provider,url:n==null?void 0:n.url},error:null}}catch(n){if(tt(n))return{data:{provider:e.provider,url:null},error:n};throw n}}async unlinkIdentity(e){try{return await this._useSession(async t=>{var n,s;let{data:r,error:o}=t;if(o)throw o;return await ht(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(s=(n=r.session)===null||n===void 0?void 0:n.access_token)!==null&&s!==void 0?s:void 0})})}catch(t){if(tt(t))return{data:null,error:t};throw t}}async _refreshAccessToken(e){let t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{let n=Date.now();return await Xf(async s=>(s>0&&await Wf(200*Math.pow(2,s-1)),this._debug(t,"refreshing attempt",s),await ht(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:pi})),(s,r)=>{let o=200*Math.pow(2,s);return r&&za(r)&&Date.now()+o-n<oo})}catch(n){if(this._debug(t,"error",n),tt(n))return{data:{session:null,user:null},error:n};throw n}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){let n=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",n),wn()&&!t.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n},error:null}}async _recoverAndRefresh(){var e;let t="#_recoverAndRefresh()";this._debug(t,"begin");try{let n=await eo(this.storage,this.storageKey);if(this._debug(t,"session from storage",n),!this._isValidSession(n)){this._debug(t,"session is not valid"),n!==null&&await this._removeSession();return}let s=Math.round(Date.now()/1e3),r=((e=n.expires_at)!==null&&e!==void 0?e:1/0)<s+Wh;if(this._debug(t,`session has${r?"":" not"} expired with margin of ${Wh}s`),r){if(this.autoRefreshToken&&n.refresh_token){let{error:o}=await this._callRefreshToken(n.refresh_token);o&&(console.error(o),za(o)||(this._debug(t,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(t,"error",n),console.error(n);return}finally{this._debug(t,"end")}}async _callRefreshToken(e){var t,n;if(!e)throw new En;if(this.refreshingDeferred)return this.refreshingDeferred.promise;let s=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new Qr;let{data:r,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!r.session)throw new En;await this._saveSession(r.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",r.session);let a={session:r.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(r){if(this._debug(s,"error",r),tt(r)){let o={session:null,error:r};return za(r)||(await this._removeSession(),await this._notifyAllSubscribers("SIGNED_OUT",null)),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(o),o}throw(n=this.refreshingDeferred)===null||n===void 0||n.reject(r),r}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,t,n=!0){let s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",t,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:t});let r=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,t)}catch(c){r.push(c)}});if(await Promise.all(o),r.length>0){for(let a=0;a<r.length;a+=1)console.error(r[a]);throw r[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await $h(this.storage,this.storageKey,e)}async _removeSession(){this._debug("#_removeSession()"),await to(this.storage,this.storageKey)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");let e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&wn()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");let e=setInterval(()=>this._autoRefreshTokenTick(),oo);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno!="undefined"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");let e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{let e=Date.now();try{return await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}let s=Math.floor((n.expires_at*1e3-e)/oo);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${oo}ms, refresh threshold is ${tp} ticks`),s<=tp&&await this._callRefreshToken(n.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof ro)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!wn()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){let t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,n){let s=[`provider=${encodeURIComponent(t)}`];if(n!=null&&n.redirectTo&&s.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n!=null&&n.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType==="pkce"){let[r,o]=await hs(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(r)}`,code_challenge_method:`${encodeURIComponent(o)}`});s.push(a.toString())}if(n!=null&&n.queryParams){let r=new URLSearchParams(n.queryParams);s.push(r.toString())}return n!=null&&n.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${e}?${s.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var n;let{data:s,error:r}=t;return r?{data:null,error:r}:await ht(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token})})}catch(t){if(tt(t))return{data:null,error:t};throw t}}async _enroll(e){try{return await this._useSession(async t=>{var n,s;let{data:r,error:o}=t;if(o)return{data:null,error:o};let a=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:{issuer:e.issuer}),{data:c,error:l}=await ht(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(n=r==null?void 0:r.session)===null||n===void 0?void 0:n.access_token});return l?{data:null,error:l}:(e.factorType==="phone"&&delete c.totp,e.factorType==="totp"&&(!((s=c==null?void 0:c.totp)===null||s===void 0)&&s.qr_code)&&(c.totp.qr_code=`data:image/svg+xml;utf-8,${c.totp.qr_code}`),{data:c,error:null})})}catch(t){if(tt(t))return{data:null,error:t};throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var n;let{data:s,error:r}=t;if(r)return{data:null,error:r};let{data:o,error:a}=await ht(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:{code:e.code,challenge_id:e.challengeId},headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token});return a?{data:null,error:a}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),{data:o,error:a})})}catch(t){if(tt(t))return{data:null,error:t};throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var n;let{data:s,error:r}=t;return r?{data:null,error:r}:await ht(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:{channel:e.channel},headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token})})}catch(t){if(tt(t))return{data:null,error:t};throw t}})}async _challengeAndVerify(e){let{data:t,error:n}=await this._challenge({factorId:e.factorId});return n?{data:null,error:n}:await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){let{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};let n=(e==null?void 0:e.factors)||[],s=n.filter(o=>o.factor_type==="totp"&&o.status==="verified"),r=n.filter(o=>o.factor_type==="phone"&&o.status==="verified");return{data:{all:n,totp:s,phone:r},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,async()=>await this._useSession(async e=>{var t,n;let{data:{session:s},error:r}=e;if(r)return{data:null,error:r};if(!s)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};let o=this._decodeJWT(s.access_token),a=null;o.aal&&(a=o.aal);let c=a;((n=(t=s.user.factors)===null||t===void 0?void 0:t.filter(d=>d.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(c="aal2");let u=o.amr||[];return{data:{currentLevel:a,nextLevel:c,currentAuthenticationMethods:u},error:null}}))}};gs.nextInstanceID=0;var rb=gs,Jh=rb;var Va=class extends Jh{constructor(e){super(e)}};var ob=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(n.next(u))}catch(d){o(d)}}function c(u){try{l(n.throw(u))}catch(d){o(d)}}function l(u){u.done?r(u.value):s(u.value).then(a,c)}l((n=n.apply(i,e||[])).next())})},ao=class{constructor(e,t,n){var s,r,o;if(this.supabaseUrl=e,this.supabaseKey=t,!e)throw new Error("supabaseUrl is required.");if(!t)throw new Error("supabaseKey is required.");let a=Nf(e);this.realtimeUrl=`${a}/realtime/v1`.replace(/^http/i,"ws"),this.authUrl=`${a}/auth/v1`,this.storageUrl=`${a}/storage/v1`,this.functionsUrl=`${a}/functions/v1`;let c=`sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`,l={db:Lf,realtime:Uf,auth:Object.assign(Object.assign({},Df),{storageKey:c}),global:If},u=Ff(n!=null?n:{},l);this.storageKey=(s=u.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(r=u.global.headers)!==null&&r!==void 0?r:{},u.accessToken?(this.accessToken=u.accessToken,this.auth=new Proxy({},{get:(d,f)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(f)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((o=u.auth)!==null&&o!==void 0?o:{},this.headers,u.global.fetch),this.fetch=Of(t,this._getAccessToken.bind(this),u.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers},u.realtime)),this.rest=new gf(`${a}/rest/v1`,{headers:this.headers,schema:u.db.schema,fetch:this.fetch}),u.accessToken||this._listenForAuthEvents()}get functions(){return new kr(this.functionsUrl,{headers:this.headers,customFetch:this.fetch})}get storage(){return new Zr(this.storageUrl,this.headers,this.fetch)}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},n={}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var e,t;return ob(this,void 0,void 0,function*(){if(this.accessToken)return yield this.accessToken();let{data:n}=yield this.auth.getSession();return(t=(e=n.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:null})}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:s,storageKey:r,flowType:o,lock:a,debug:c},l,u){var d;let f={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Va({url:this.authUrl,headers:Object.assign(Object.assign({},f),l),storageKey:r,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:s,flowType:o,lock:a,debug:c,fetch:u,hasCustomAuthorizationHeader:(d="Authorization"in this.headers)!==null&&d!==void 0?d:!1})}_initRealtimeClient(e){return new tr(this.realtimeUrl,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,n)=>{this._handleTokenChanged(t,"CLIENT",n==null?void 0:n.access_token)})}_handleTokenChanged(e,t,n){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==n?(this.realtime.setAuth(n!=null?n:null),this.changedAccessToken=n):e==="SIGNED_OUT"&&(this.realtime.setAuth(this.supabaseKey),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};var ip=(i,e,t)=>new ao(i,e,t);var sp={type:"change"},Qh={type:"start"},op={type:"end"},Ga=new Xs,rp=new Un,ab=Math.cos(70*ns.DEG2RAD),zt=new L,hn=2*Math.PI,xt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Kh=1e-6,Wa=class extends va{constructor(e,t=null){super(e,t),this.state=xt.NONE,this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:es.ROTATE,MIDDLE:es.DOLLY,RIGHT:es.PAN},this.touches={ONE:ts.ROTATE,TWO:ts.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new kn,this._lastTargetPosition=new L,this._quat=new kn().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Or,this._sphericalDelta=new Or,this._scale=1,this._panOffset=new L,this._rotateStart=new ve,this._rotateEnd=new ve,this._rotateDelta=new ve,this._panStart=new ve,this._panEnd=new ve,this._panDelta=new ve,this._dollyStart=new ve,this._dollyEnd=new ve,this._dollyDelta=new ve,this._dollyDirection=new L,this._mouse=new ve,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=lb.bind(this),this._onPointerDown=cb.bind(this),this._onPointerUp=hb.bind(this),this._onContextMenu=_b.bind(this),this._onMouseWheel=fb.bind(this),this._onKeyDown=pb.bind(this),this._onTouchStart=mb.bind(this),this._onTouchMove=gb.bind(this),this._onMouseDown=ub.bind(this),this._onMouseMove=db.bind(this),this._interceptControlDown=vb.bind(this),this._interceptControlUp=yb.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sp),this.update(),this.state=xt.NONE}update(e=null){let t=this.object.position;zt.copy(t).sub(this.target),zt.applyQuaternion(this._quat),this._spherical.setFromVector3(zt),this.autoRotate&&this.state===xt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=hn:n>Math.PI&&(n-=hn),s<-Math.PI?s+=hn:s>Math.PI&&(s-=hn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(zt.setFromSpherical(this._spherical),zt.applyQuaternion(this._quatInverse),t.copy(this.target).add(zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=zt.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ga.origin.copy(this.object.position),Ga.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ga.direction))<ab?this.object.lookAt(this.target):(rp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ga.intersectPlane(rp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Kh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Kh||this._lastTargetPosition.distanceToSquared(this.target)>Kh?(this.dispatchEvent(sp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?hn/60*this.autoRotateSpeed*e:hn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){zt.setFromMatrixColumn(t,0),zt.multiplyScalar(-e),this._panOffset.add(zt)}_panUp(e,t){this.screenSpacePanning===!0?zt.setFromMatrixColumn(t,1):(zt.setFromMatrixColumn(t,0),zt.crossVectors(this.object.up,zt)),zt.multiplyScalar(e),this._panOffset.add(zt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;zt.copy(s).sub(this.target);let r=zt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ve,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function cb(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function lb(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function hb(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(op),this.state=xt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function ub(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case es.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=xt.DOLLY;break;case es.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=xt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=xt.ROTATE}break;case es.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=xt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=xt.PAN}break;default:this.state=xt.NONE}this.state!==xt.NONE&&this.dispatchEvent(Qh)}function db(i){switch(this.state){case xt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case xt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case xt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function fb(i){this.enabled===!1||this.enableZoom===!1||this.state!==xt.NONE||(i.preventDefault(),this.dispatchEvent(Qh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(op))}function pb(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function mb(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ts.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=xt.TOUCH_ROTATE;break;case ts.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=xt.TOUCH_PAN;break;default:this.state=xt.NONE}break;case 2:switch(this.touches.TWO){case ts.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=xt.TOUCH_DOLLY_PAN;break;case ts.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=xt.TOUCH_DOLLY_ROTATE;break;default:this.state=xt.NONE}break;default:this.state=xt.NONE}this.state!==xt.NONE&&this.dispatchEvent(Qh)}function gb(i){switch(this._trackPointer(i),this.state){case xt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case xt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case xt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case xt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=xt.NONE}}function _b(i){this.enabled!==!1&&i.preventDefault()}function vb(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yb(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}{let v=function(h,_,y,R,D,F,W,B,ge={}){let Q=new Xe(p,typeof D=="string"?f(D):D);return Q.scale.set(_,y,R),Q.position.set(F,W+y/2,B),Q.castShadow=ge.cast!==!1,Q.receiveShadow=!0,ge.ry&&(Q.rotation.y=ge.ry),h.add(Q),Q},x=function(h,_,y,R,D,F,W,B,ge=12){let Q=new Xe(new Ji(_,y,R,ge),typeof D=="string"?f(D):D);return Q.position.set(F,W+R/2,B),Q.castShadow=!0,Q.receiveShadow=!0,h.add(Q),Q},g=function(h,_,y,R,D,F,W,B=0){let ge=new Xe(new Mn(_,y),typeof R=="string"?f(R):R);return ge.rotation.x=-Math.PI/2,ge.rotation.z=B,ge.position.set(D,F,W),ge.receiveShadow=!0,h.add(ge),ge},m=function(h,{w:_=1024,h:y=256,bg:R=null,fg:D="#fff",font:F="800 150px Plus Jakarta Sans, sans-serif"}={}){let W=document.createElement("canvas");W.width=_,W.height=y;let B=W.getContext("2d");R&&(B.fillStyle=R,B.fillRect(0,0,_,y)),B.fillStyle=D,B.font=F;let ge=B.measureText(h).width;ge>_*.9&&(B.font=F.replace(/\d+px/,ue=>Math.floor(parseInt(ue)*_*.9/ge)+"px")),B.textAlign="center",B.textBaseline="middle",B.fillText(h,_/2,y/2+6);let Q=new Ir(W);return Q.colorSpace=Yt,Q.anisotropy=4,Q},U=function(h,_,{w:y=1024,h:R=160,bg:D=null}={}){let F=document.createElement("canvas");F.width=y,F.height=R;let W=F.getContext("2d"),B=new Ir(F);B.colorSpace=Yt,B.anisotropy=4;let ge=()=>{W.clearRect(0,0,y,R),D&&(W.fillStyle=D,W.fillRect(0,0,y,R));let Q=_!==null&&M.complete&&M.naturalWidth,ue=Q?R*.8*M.naturalWidth/M.naturalHeight:0,Se=R*.62;W.font=`800 ${Se}px Plus Jakarta Sans, sans-serif`;let je=W.measureText(h).width,_t=y*.92-ue-(Q?R*.15:0);je>_t&&(Se*=_t/je,W.font=`800 ${Se}px Plus Jakarta Sans, sans-serif`,je=W.measureText(h).width);let Ot=(y-(je+ue+(Q?R*.15:0)))/2;Q&&(W.drawImage(M,Ot,R*.1,ue,R*.8),Ot+=ue+R*.15),W.textBaseline="middle";let Vn=0;for(let Pn of h)W.fillStyle=Pn===" "||Pn==="\xB7"?"#334155":E[Vn++%5],W.fillText(Pn,Ot,R/2+4),Ot+=W.measureText(Pn).width;B.needsUpdate=!0};return ge(),I.push(ge),B},q=function(h,_,y,R,D){let F=new wt;return v(F,4.2,.8,1.9,D,0,.35,0),v(F,2.4,.7,1.7,"#1e293b",-.2,1.12,0),[-1.3,1.3].forEach(W=>[-.95,.95].forEach(B=>{let ge=x(F,.36,.36,.25,"#111",W,.02,B,10);ge.rotation.x=Math.PI/2,ge.position.y=.36})),F.position.set(_,0,y),F.rotation.y=R,h.add(F),F},J=function(h,_,y=1){let R=new wt;x(R,.18*y,.26*y,2.2*y,"#8b5a2b",0,0,0,7);let D=new Xe(new di(1.6*y,0),f(ce[Math.floor(Math.abs(h*7+_*3))%4],{flatShading:!0}));D.position.y=3.2*y,D.castShadow=!0,R.add(D),R.position.set(h,0,_),P.add(R)},Ut=function(h,_,y,R,D,F){let W=new wt;W.position.set(y,0,R),W.rotation.y=D,h.add(W);let B=v(W,1.6,.06,.8,"#f5f5f4",0,.74,0);v(W,.06,.74,.7,"#9ca3af",-.74,0,0),v(W,.06,.74,.7,"#9ca3af",.74,0,0),v(W,.9,.5,.05,"#111827",0,.82,-.25);let ge=v(W,.84,.44,.01,f("#38bdf8",{emissive:"#0ea5e9",emissiveIntensity:.5}),0,.85,-.22,{cast:!1});v(W,.4,.04,.15,"#d1d5db",0,.8,.05);let Q=new wt;Q.position.set(0,0,.85),W.add(Q),v(Q,.5,.08,.5,"#334155",0,.42,0),v(Q,.5,.55,.08,"#334155",0,.5,.24),x(Q,.04,.04,.42,"#64748b",0,0,0,6);let ue=y+Math.sin(D)*.85,Se=R+Math.cos(D)*.85,je={id:Ye.length,f:_,x:ue,z:Se,ry:D+Math.PI,room:F,who:null,scr:ge};return Ye.push(je),B.userData.seat=je,T.push(B),je},Je=function(h,_,y,R,D,F,W="#475569"){let B=new wt;B.position.set(y,0,R),B.rotation.y=D,h.add(B),v(B,.5,.08,.5,W,0,.42,0),v(B,.5,.5,.08,W,0,.5,-.24),[-.2,.2].forEach(Q=>[-.2,.2].forEach(ue=>v(B,.05,.42,.05,"#334155",Q,0,ue)));let ge={id:Ye.length,f:_,x:y,z:R,ry:D,room:F,who:null};return Ye.push(ge),ge},Ke=function(h,_,y,R,D){let F=new wt;F.position.set(_,0,y),F.rotation.y=R,h.add(F),v(F,2.2,.45,.9,D,0,0,0),v(F,2.2,.55,.25,D,0,.45,-.33),v(F,.25,.3,.9,D,-1,.45,0),v(F,.25,.3,.9,D,1,.45,0)},Oe=function(h,_,y,R=1){x(h,.28*R,.22*R,.5*R,"#f5f5f4",_,0,y,8);let D=new Xe(new di(.55*R,0),f("#22c55e",{flatShading:!0}));D.position.set(_,.95*R,y),D.castShadow=!0,h.add(D)},bt=function(h,_,y){let D=y.s<0?Ne+1.6:2.6,F=y.s<0?-2.6:$-1.6,W=(y.x0+y.x1)/2,B=(D+F)/2,ge=y.x1-y.x0;if(y.t==="desks"){for(let Q=y.x0+2.2;Q<=y.x1-1.8;Q+=2.6)if(!(Math.abs(Q-W)<1.4))for(let ue=D+.6;ue<=F-1.2;ue+=2.8)Ut(h,_,Q,ue,0,y.k);Oe(h,y.x0+.7,y.s<0?Ne+.7:$-.7),Oe(h,y.x1-.7,y.s<0?Ne+.7:$-.7)}if(y.t==="dir"){let Q=Ut(h,_,W-4,B-1,0,y.k);Q.kaio=!0,Ut(h,_,W+3,B-1,0,y.k),Ke(h,W,B+3.2,Math.PI,"#78350f"),v(h,1.6,.4,.8,"#d6d3d1",W,0,B+1.8),v(h,6,2.2,.4,"#7c5a3a",W,0,Ne+.4),Oe(h,y.x0+.8,Ne+.8,1.3),Oe(h,y.x1-.8,Ne+.8,1.3)}if(y.t==="meet"){let Q=Math.min(ge-4,9);v(h,Q,.08,2,"#f5f5f4",W,.74,B),v(h,Q-.6,.74,.3,"#9ca3af",W,0,B);for(let ue=W-Q/2+.7;ue<=W+Q/2-.6;ue+=1.2)Je(h,_,ue,B-1.4,0,y.k),Je(h,_,ue,B+1.4,Math.PI,y.k);v(h,4,2,.1,f("#0f172a",{emissive:"#1e3a8a",emissiveIntensity:.3}),W,1,y.s<0?Ne+.3:$-.3)}if(y.t==="cafe"){v(h,8,1.05,.9,"#78350f",W,0,Ne+1),v(h,8,.06,1,"#f5f5f4",W,1.05,Ne+1);for(let Q=y.x0+3;Q<y.x1-1.5;Q+=3.2)for(let ue=D+3;ue<F;ue+=3)x(h,.6,.6,.06,"#f5f5f4",Q,.74,ue,16),x(h,.06,.06,.74,"#57534e",Q,0,ue,6),Je(h,_,Q-.9,ue,Math.PI/2,y.k,"#f59e0b"),Je(h,_,Q+.9,ue,-Math.PI/2,y.k,"#f59e0b")}if(y.t==="lib"){for(let Q=y.x0+1;Q<y.x1-.8;Q+=2.1){v(h,1.9,2.4,.5,"#7c5a3a",Q+.95,0,Ne+.4);for(let ue=0;ue<4;ue++)v(h,1.7,.35,.35,["#ef4444","#3b82f6","#eab308","#22c55e"][ue],Q+.95,.25+ue*.55,Ne+.5,{cast:!1})}v(h,4,.08,1.6,"#d6b48a",W,.74,B+1);for(let Q=-1;Q<=1;Q++)Je(h,_,W+Q*1.3,B,0,y.k),Je(h,_,W+Q*1.3,B+2,Math.PI,y.k)}if(y.t==="lounge"&&(Ke(h,W-2.5,B,Math.PI/2,"#0ea5e9"),Ke(h,W+2.5,B,-Math.PI/2,"#0ea5e9"),v(h,2,.4,1,"#f5f5f4",W,0,B),Oe(h,y.x0+.8,B,1.2),Oe(h,y.x1-.8,B,1.2),v(h,3,1.7,.1,f("#111827",{emissive:"#334155",emissiveIntensity:.3}),W,.8,y.s<0?Ne+.3:$-.3)),y.t==="bench")for(let Q=y.x0+2;Q<y.x1-1.5;Q+=2.6)Ut(h,_,Q,B-1,0,y.k),Ut(h,_,Q,B+1.6,Math.PI,y.k);if(y.t==="lobby"){let Q=new Xe(new Mn(2.6,2.9),new bn({map:N,transparent:!0}));Q.position.set(-2.6,1.9,1.62),h.add(Q),v(h,2.8,3.4,.1,"#ffffff",-2.6,0,1.55),v(h,2.8,3.4,.1,"#ffffff",2.6,0,1.55),v(h,2.4,3.4,.1,E[3],2.6,0,1.6,{cast:!1}).scale.set(2.4,.3,.02),v(h,2.4,1.1,1,E[1],-2.4,0,4.5),v(h,2.8,.08,1.2,"#f5f5f4",-2.4,1.1,4.5),Ke(h,-2.2,9,Math.PI/2,"#0f766e"),Ke(h,2.2,9,-Math.PI/2,"#0f766e"),Oe(h,-3.2,12,1.4),Oe(h,3.2,12,1.4)}if(y.t==="ai"){v(h,ge-2,2.6,.2,f("#0b1220",{emissive:"#0891b2",emissiveIntensity:.55}),W,.2,$-.4);for(let ue=y.x0+2.5;ue<y.x1-2;ue+=3.2)Ut(h,_,ue,B,Math.PI,y.k);let Q=new Xe(new di(.8,1),f("#22d3ee",{emissive:"#22d3ee",emissiveIntensity:1.2,flatShading:!0}));Q.position.set(W,2.2,B-1.5),Q.userData.spin=!0,h.add(Q)}if(y.t==="deck"){for(let ue=y.x0+2;ue<y.x1-1;ue+=5)Oe(h,ue,$-.9,1.5);Ke(h,W-4,B,0,"#f5f5f4"),Ke(h,W+3,B,0,"#f5f5f4"),x(h,.06,.06,2.6,"#57534e",W-.5,0,B+1.8,6);let Q=new Xe(new ca(1.8,.7,8),f("#f97316",{flatShading:!0}));Q.position.set(W-.5,2.8,B+1.8),Q.castShadow=!0,h.add(Q);for(let ue=y.x0+3;ue<y.x1;ue+=6)Je(h,_,ue,B-2,0,y.k,"#f5f5f4")}},b=function(h){let _=C;_.t+=h;let y=ye.userData.rot,R=_.phase==="pousado"?_.t>_.wait-3?Math.min(1,(_.t-(_.wait-3))/3):Math.max(0,1-_.t/3):1;if(y.rotation.y+=h*28*R,ye.userData.tr.rotation.z+=h*40*R,_.phase==="pousado"&&_.t>_.wait&&(_.phase="subindo",_.t=0),_.phase==="subindo"&&(ye.position.y=_.y0+Math.min(1,_.t/4)**2*22,_.t>4&&(_.phase="voando",_.t=0)),_.phase==="voando"){let F=_.t/16*Math.PI*2,W=60;ye.position.set(_.x+Math.sin(F)*W,_.y0+22,_.z+(1-Math.cos(F))*W*.7);let B=Math.cos(F),ge=.7*Math.sin(F);ye.rotation.set(0,Math.atan2(-ge,B),-.14),_.t>16&&(_.phase="descendo",_.t=0,ye.position.set(_.x,_.y0+22,_.z))}_.phase==="descendo"&&(ye.position.y=_.y0+(1-Math.min(1,_.t/5))**2*22,ye.rotation.z=-.05*(1-Math.min(1,_.t/5)),_.t>5&&(_.phase="pousado",_.t=0,_.wait=45+Math.random()*45,ye.position.y=_.y0,ye.rotation.set(0,ye.rotation.y,0)))},Ae=function({shirt:h="#2563eb",pants:_="#1f2937",skin:y="#e0ac7e",hair:R="#3f2a1d",bot:D=null}={}){let F=new wt,W=new wt;F.add(W);let B=[-.11,.11].map(ue=>{let Se=new wt;Se.position.set(ue,.86,0);let je=new Xe(k,f(_));return je.position.y=-.43,je.castShadow=!0,Se.add(je),W.add(Se),Se}),ge=new Xe(Qe,f(D||h));ge.scale.set(1,1,.72),ge.position.y=1.18,ge.castShadow=!0,W.add(ge);let Q=[-.3,.3].map(ue=>{let Se=new wt;Se.position.set(ue,1.42,0);let je=new Xe(mt,f(D?"#e5e7eb":h));return je.position.y=-.3,je.castShadow=!0,Se.add(je),W.add(Se),Se});if(D){let ue=new Xe(Ee,f(D,{flatShading:!0}));ue.rotation.x=Math.PI/2,ue.rotation.y=Math.PI/6,ue.position.y=1.78,ue.castShadow=!0,W.add(ue),[-.09,.09].forEach(je=>{let _t=new Xe(oe,f("#fff"));_t.position.set(je,1.8,.17),W.add(_t);let Ot=new Xe(Re,f("#111"));Ot.position.set(je,1.8,.22),W.add(Ot)});let Se=new Xe(oe,f(D,{emissive:D,emissiveIntensity:.6}));Se.position.y=2.07,W.add(Se),v(W,.02,.12,.02,"#94a3b8",0,1.95,0)}else{let ue=new Xe(K,f(y));ue.position.y=1.74,ue.castShadow=!0,W.add(ue);let Se=new Xe(new Bn(.21,12,8,0,Math.PI*2,0,Math.PI/2),f(R));Se.position.y=1.77,W.add(Se)}return{g:F,body:W,legs:B,arms:Q}},sn=function(h){return h.o?.02:le(h.f)},Jt=function(h,_,y){return lt[h].find(R=>_>R.x0&&_<R.x1&&y>R.zA&&y<R.zB)||null},cr=function(h,_){return h>Ce-1&&h<Be+1&&_>Ne-1&&_<$+1},mi=function(h,_){for(let y=0;y<=20;y++){let R=y/20;if(cr(h.x+(_.x-h.x)*R,h.z+(_.z-h.z)*R))return!0}return!1},Tn=function(h,_){if(!mi(h,_))return[_];let y=[{x:-26,z:-17},{x:26,z:-17},{x:26,z:17},{x:-26,z:17}].map(R=>({...R,f:0,o:!0}));for(let R of y)if(!mi(h,R)&&!mi(R,_))return[R,_];for(let R=0;R<4;R++){let D=y[R];if(!mi(h,D)){for(let F of[y[(R+1)%4],y[(R+3)%4]])if(!mi(F,_))return[D,F,_]}}return[_]},lr=function(h,_){if(!h.o&&!_.o&&h.f===_.f&&Jt(h.f,h.x,h.z)===Jt(_.f,_.x,_.z))return[{f:_.f,x:_.x,z:_.z,o:!1}];let y=[],R=(B,ge,Q,ue=!1)=>y.push({f:B,x:ge,z:Q,o:ue}),D=h;if(h.o){if(_.o)return Tn(h,_);Tn(h,{f:0,x:0,z:16,o:!0}).forEach(B=>y.push(B)),R(0,0,12),R(0,0,5),R(0,0,0),D={f:0,x:0,z:0}}else{let B=Jt(h.f,h.x,h.z);B?(R(h.f,B.cx,B.s*2.4),R(h.f,B.cx,0)):R(h.f,h.x,0)}if(_.o)return(D.f!==0||h.f!==0)&&(R(h.f,0,0),R(0,0,0)),R(0,0,5),R(0,0,12),R(0,0,16,!0),Tn({x:0,z:16},_).forEach(B=>y.push(B)),y;let F=h.o?0:h.f;F!==_.f&&(R(F,0,0),R(_.f,0,0));let W=Jt(_.f,_.x,_.z);return W?(R(_.f,W.cx,0),R(_.f,W.cx,W.s*2.4)):R(_.f,_.x,0),y.push({f:_.f,x:_.x,z:_.z,o:!1}),y},gn=function(h){var R,D,F,W;let _=Ae(h.look||{});P.add(_.g);let y={...h,m:_,f:(R=h.f)!=null?R:0,x:(D=h.x)!=null?D:0,z:(F=h.z)!=null?F:15,o:(W=h.o)!=null?W:!0,path:[],state:"idle",timer:2+Math.random()*4,seat:null,sit:!1,speed:h.speed||1.6,phase:Math.random()*9};return _.g.position.set(y.x,sn(y),y.z),He.push(y),y},Zn=function(h,_,y){h.seat&&(h.seat.who=null,h.seat=null),h.sit=!1,h.path=lr({f:h.f,x:h.x,z:h.z,o:h.o},_),h.then=y,h.state="walk"},un=function(h,_){Zn(h,{f:_.f,x:_.x,z:_.z,o:!!_.o},()=>{h.seat=_,_.who=h,h.sit=!0,h.m.g.rotation.y=_.ry,h.state="sit",h.timer=h.isPlayer?1e9:25+Math.random()*40}),_.who=h},gi=function(h){return Ye.find(_=>_.room===h&&!_.who&&!_.kaio&&_.scr)||Ye.find(_=>_.room===h&&!_.who&&!_.kaio)||Ye.find(_=>_.room===h&&!_.kaio&&_.who&&_.who.staff&&(_.who.seat=null,_.who.state="idle",_.who.timer=0,_.who.home=Ye.find(y=>y.scr&&!y.who&&y.room==="foco")||_.who.home,_.who.sit=!1,_.who=null,!0))},Ii=function(){rn.forEach(h=>{var _;P.remove(h.m.g),h.seat&&(h.seat.who=null),He.splice(He.indexOf(h),1),(_=h.tag)==null||_.remove()}),rn=[];for(let h of i[t].bots){if(h.sala==="tenis"){let D=gn({...h,look:{bot:h.cor},o:!0,f:0,x:pe-9,z:ze,speed:4});D.tennis=!0,X(D,"#a6cf4a"),rn.push(D);continue}let _=gi(h.sala)||gi("foco")||Ye.find(D=>!D.who&&D.scr&&!D.kaio);if(!_)continue;let y=ic(h.id),R=gn({...h,look:h.tipo==="pessoa"?{shirt:h.cor,skin:Tt[y%5],pants:["#1f2937","#334155","#1e3a8a"][y%3],hair:["#1c1917","#78350f","#facc15","#a8a29e"][y%4]}:{bot:h.cor},o:!1,f:_.f,x:_.x,z:_.z});R.seat=_,_.who=R,R.sit=!0,R.state="sit",R.timer=8+Math.random()*30,R.m.g.rotation.y=_.ry,R.home=_,rn.push(R)}rn.forEach(h=>{let _=document.createElement("div");_.className="tag "+{ok:"",wa:"warn",la:"late"}[h.st],_.innerHTML="<i></i>",_.append(h.emo+" "+h.nome),_.onclick=y=>{y.stopPropagation(),vs(h)},We.appendChild(_),h.tag=_}),de.material.map=U(i[t].placa,"",{bg:"#ffffff"}),de.material.needsUpdate=!0,St.forEach(h=>h.el.textContent=e[t][h.k]),tu(),typeof ur=="function"&&ur()},Xa=function(h){if(!(h.isPlayer||h.tennis||h.npc)){if(h.state==="sit"&&h.timer<=0){let _=[()=>{let y=Ye.find(R=>R.room==="cafe"&&!R.who);y&&un(h,y)},()=>{let y=ot[Math.floor(Math.random()*ot.length)];Zn(h,{f:0,x:y.x+(Math.random()-.5)*2,z:y.z+1.5,o:!0},()=>{h.state="idle",h.timer=10+Math.random()*10})},()=>{let y=Me.filter(R=>!R.who)[Math.floor(Math.random()*6)];y&&un(h,y)},()=>{let y=Ye.find(R=>(R.room==="reuniao"||R.room==="conselho")&&!R.who);y&&un(h,y)},()=>{let y=Ye.find(R=>R.room==="deck"&&!R.who);y&&un(h,y)}];_[Math.floor(Math.random()*_.length)](),h.state==="sit"&&(h.timer=10)}else h.state==="idle"&&h.timer<=0?(h.returning=!0,un(h,h.home.who&&h.home.who!==h&&gi(h.home.room)||h.home)):h.state==="sit"&&h.seat&&h.seat!==h.home&&h.timer<=0;h.state==="sit"&&h.seat!==h.home&&h.timer<=0&&un(h,h.home)}},X=function(h,_){let y=new wt,R=new Xe(new Ji(.025,.03,.3,6),f("#1f2937"));R.position.y=-.15,y.add(R);let D=new Xe(new ha(.16,.025,6,18),f(_));D.position.y=-.47,y.add(D);let F=new Xe(new Dr(.15,14),new bn({color:"#f8fafc",transparent:!0,opacity:.45,side:On}));return F.position.y=-.47,y.add(F),y.position.set(0,-.62,.05),y.rotation.x=.4,h.m.arms[1].add(y),h.racket=y,y},ft=function(h,_,y){if(!y){h.style.display="none";return}if(Ze.copy(_).project(c),Ze.z>1||Math.abs(Ze.x)>1.1||Math.abs(Ze.y)>1.1){h.style.display="none";return}h.style.display="",h.style.transform=`translate(${(Ze.x*.5+.5)*innerWidth}px,${(-Ze.y*.5+.5)*innerHeight}px) translate(-50%,-100%)`},gt=function(h,_,y){if(!y){h.style.display="none";return}if(Ze.copy(_).project(c),Ze.z>1){h.style.display="none";return}h.style.display="",h.style.transform=`translate(${(Ze.x*.5+.5)*innerWidth}px,${(-Ze.y*.5+.5)*innerHeight}px) translate(-50%,-50%)`},Wt=function(h,_,y=1.1){xe.on=!0,xe.t=0,xe.d=y,xe.p0.copy(c.position),xe.p1.copy(h),xe.t0.copy(l.target),xe.t1.copy(_)},rt=function(h,_){At=h,_||(it=!1),Le.forEach((y,R)=>y.visible=h<0||R<=h),he.visible=h<0,document.querySelectorAll("#floors button").forEach(y=>y.classList.toggle("on",+y.dataset.f===h)),!_&&(h<0?Wt(new L(95,80,142),new L(4,0,16)):innerWidth<innerHeight?Wt(new L(44,le(h)+50,10),new L(1,le(h),0)):Wt(new L(8,le(h)+36,30),new L(0,le(h),-1)))},vn=function(h){Xt.set(h.clientX/innerWidth*2-1,-(h.clientY/innerHeight)*2+1),Jn.setFromCamera(Xt,c);let _=[];He.forEach(D=>{D.m.g.visible&&D.m.g.traverse(F=>{F.isMesh&&(F.userData.agent=D,_.push(F))})});let y=Jn.intersectObjects([..._,...T],!1).find(D=>Mt(D.object));if(!y)return;let R=y.object.userData;if(R.agent&&!R.agent.npc&&!R.agent.staff&&!R.agent.isPlayer){vs(R.agent);return}if(R.seat){if(At<0){rt(R.seat.f);return}if(R.seat.who&&R.seat.who!==j){It("Mesa ocupada");return}un(j,R.seat),j.then2=()=>eu(),Ht();return}if(R.floor!==void 0){if(At<0){rt(2);return}let D=y.point;Zn(j,{f:R.floor,x:ns.clamp(D.x,Ce+.6,Be-.6),z:ns.clamp(D.z,Ne+.6,$-.6),o:!1}),Ht();return}if(R.ground){let D=y.point;if(cr(D.x,D.z))return;Zn(j,{f:0,x:D.x,z:D.z,o:!0}),Ht()}},Ht=function(){Di.style.opacity=0},Rn=function(h){Pt.innerHTML=h,An.classList.add("open")},$t=function(){An.classList.remove("open"),document.querySelectorAll("#tabs button").forEach(h=>h.classList.toggle("on",h.dataset.t==="campus"))},qa=function(h){return h.tarefas.map((_,y)=>`<div class="task"><span class="d" style="background:${_[3]?"var(--cy)":$a[_[1]]}"></span><div class="n">${at(_[0])}<small>${_[3]?"confirmada":ap[_[1]]} \xB7 +${_[2]} XP${_[6]&&!_[3]?" \xB7 voc\xEA respondeu: "+at(_[6]):""}</small></div><button class="btn" data-b="${h.id}" data-i="${y}" ${_[3]?"disabled":""}>${_[3]?"Feito":"Confirmar"}</button></div>`).join("")},vs=function(h){wp(h);let _=h.o?"ao ar livre":["t\xE9rreo","1\xBA andar","2\xBA andar"][h.f];Rn(`<h2>${at(h.emo)} ${at(h.nome)}</h2><div class="sub">${at(h.papel)} \xB7 ${at(h.sala==="tenis"?"Quadra de t\xEAnis":e[t][h.sala])} \xB7 ${_}</div>${qa(h)}
  <div class="row"><button class="btn ghost" id="seeB">Ver no campus</button><button class="btn ghost" id="callB">Chamar at\xE9 voc\xEA</button></div>${Cn?(h.tarefas.length?"":'<div class="note">Sem tarefas abertas.</div>')+'<div class="row"><button class="btn ghost" id="rmB">Tirar da equipe</button></div>':'<div class="note">Dados de exemplo. No app, o XP s\xF3 entra quando a tarefa \xE9 confirmada com evid\xEAncia.</div>'}`),Cn&&(document.getElementById("rmB").onclick=()=>{let y=document.getElementById("rmB");y.dataset.ok?kp(h):(y.dataset.ok=1,y.textContent="Toque de novo para confirmar")}),document.getElementById("seeB").onclick=()=>{$t(),h.o||rt(h.f),setTimeout(()=>Wt(h.m.g.position.clone().add(new L(7,9,11)),h.m.g.position.clone()),h.o?0:1150)},document.getElementById("callB").onclick=()=>{if(h.tennis){It(h.nome+" est\xE1 jogando"),$t();return}let y=j,R=y.m.g.rotation.y;Zn(h,{f:y.o?0:y.f,x:y.x+Math.sin(R)*1.4,z:y.z+Math.cos(R)*1.4,o:y.o},()=>{h.state="idle",h.timer=45,h.m.g.rotation.y=Math.atan2(j.x-h.x,j.z-h.z),It(h.nome+" chegou")}),It(h.nome+" est\xE1 indo at\xE9 voc\xEA"),$t()}},eu=function(){var _;let h=i[t].bots.filter(y=>y.tarefas.some(R=>!R[3]&&R[1]!=="ok"));Rn(`<h2>Sua mesa</h2><div class="sub">${at(e[t][(_=j.seat)==null?void 0:_.room]||"")} \xB7 o que pede a sua aten\xE7\xE3o</div>${h.map(y=>qa(y).replace(/<div class="n">/g,`<div class="n"><small>${at(y.emo+" "+y.nome)}</small>`)).join("")||'<div class="note">Nada pendente. Bom trabalho.</div>'}<div class="row"><button class="btn ghost" id="up">Levantar</button></div>`),document.getElementById("up").onclick=()=>{$t();let y=Jt(j.f,j.x,j.z);Zn(j,{f:j.f,x:y?y.cx:j.x,z:y?y.s*3.5:0,o:!1})}},tu=function(){let h=i[t].bots.flatMap(_=>_.tarefas.filter(y=>!y[3]));document.getElementById("nOk").textContent=h.filter(_=>_[1]==="ok").length,document.getElementById("nWa").textContent=h.filter(_=>_[1]==="wa").length,document.getElementById("nLa").textContent=h.filter(_=>_[1]==="la").length,document.getElementById("relSub").textContent=i[t].bots.length+" na equipe"},nu=function(h){let _=Math.floor(n/100)+1;n+=h;let y=Math.floor(n/100)+1;co(),It(y>_?"N\xEDvel "+y+"!":"+"+h+" XP")},co=function(){let h=Math.floor(n/100)+1;document.getElementById("lv").textContent=h,document.getElementById("xpn").textContent=n,document.getElementById("xpNext").textContent="faltam "+(h*100-n)+" para o n\xEDvel "+(h+1),document.querySelector("#bar i").style.width=n%100+"%"},It=function(h){ja.textContent=h,ja.classList.add("show"),clearTimeout(iu),iu=setTimeout(()=>ja.classList.remove("show"),1300)},hp=function(h,_){let y=h.m;if(h.state==="walk"&&h.path.length){let F=h.path[0];if(F.f!==h.f&&!F.o&&!h.o)h.f=F.f,h.x=F.x,h.z=F.z,h.path.shift();else{let W=F.x-h.x,B=F.z-h.z,ge=Math.hypot(W,B),Q=h.speed*_;ge<=Q?(h.x=F.x,h.z=F.z,h.o=F.o,h.f=F.o?0:F.f,h.path.shift()):(h.x+=W/ge*Q,h.z+=B/ge*Q,y.g.rotation.y=Math.atan2(W,B))}if(!h.path.length){h.state="idle",h.timer=6+Math.random()*8;let W=h.then;if(h.then=null,W&&W(),h===j&&j.then2&&j.sit){let B=j.then2;j.then2=null,B()}}}let R=h.state==="walk"&&h.path.length||h.manual>0;h.phase+=_*(R?h.speed*5:0);let D=R?Math.sin(h.phase)*.65:0;h.sit?(y.legs.forEach(F=>F.rotation.x=-Math.PI/2),y.body.position.y=-.4+(h.seat&&h.seat.h||0),y.arms.forEach((F,W)=>F.rotation.x=-.9+Math.sin(lo*6+W*2)*.08)):(y.legs[0].rotation.x=D,y.legs[1].rotation.x=-D,y.arms[0].rotation.x=-D*.8,y.arms[1].rotation.x=D*.8,y.body.position.y=R?Math.abs(Math.sin(h.phase))*.06:0),h.jump&&(h.jump=Math.max(0,h.jump-_*1.6),y.body.position.y+=Math.sin(h.jump*Math.PI)*.8),y.g.position.set(h.x,sn(h),h.z),y.g.visible=dn(h),h.timer-=_},up=function(h){if(Ve.x+=Ve.vx*h,Ve.z+=Ve.vz*h,Ve.vx*=Math.pow(.45,h),Ve.vz*=Math.pow(.45,h),(Ve.z<se+.3||Ve.z>te-.3)&&(Ve.vz*=-1,Ve.z=ns.clamp(Ve.z,se+.3,te-.3)),Ve.x<G+.3||Ve.x>ie-.3)if(Math.abs(Ve.z)<2.5){let _=Ve.x>47?0:1;w[_]++,Ve.last==="kaio"&&It("Gola\xE7o!"),Ve.x=47,Ve.z=0,Ve.vx=Ve.vz=0,Ie[0].el.textContent="Quadra society \xB7 "+w[0]+" x "+w[1]}else Ve.vx*=-1,Ve.x=ns.clamp(Ve.x,G+.3,ie-.3);Li.position.set(Ve.x,.22,Ve.z),Li.rotation.x+=Ve.vz*h*3,Li.rotation.z-=Ve.vx*h*3,[0,1].forEach(_=>{let y=H.filter(F=>F.team===_),R=y[0],D=1e9;y.forEach(F=>{let W=Math.hypot(F.x-Ve.x,F.z-Ve.z);W<D&&(D=W,R=F)}),y.forEach(F=>{let W=F===R?Ve.x-(_?-.4:.4):F.home.x+(Ve.x-47)*.4,B=F===R?Ve.z:F.home.z+Ve.z*.3,ge=W-F.x,Q=B-F.z;if(Math.hypot(ge,Q)>.25?(F.state="walk",F.path=[{f:0,x:W,z:B,o:!0}],F.speed=F===R?4.2:2.4):(F.state="idle",F.path=[],su(F,Ve.x-F.x,Ve.z-F.z)),F===R&&D<.7&&Math.hypot(Ve.vx,Ve.vz)<4){let Se=_?G:ie,je=Math.random()<.15?Se:y[Math.floor(Math.random()*5)].x,_t=Math.random()<.35?(Math.random()-.5)*4:y[Math.floor(Math.random()*5)].z,Ot=je-Ve.x,Vn=_t-Ve.z,Pn=Math.hypot(Ot,Vn)||1,Nt=8+Math.random()*6;Ve.vx=Ot/Pn*Nt,Ve.vz=Vn/Pn*Nt,Ve.last=_}})})},su=function(h,_,y){h.m.g.rotation.y=Math.atan2(_,y)},fp=function(h){let _=dp(),y=ae?null:_||z,R=pe-10.5;if(_||ae){let Q={x:pe-13.5,z:ze+(_&&!ae?-7:7)};(ae?_?[z,_]:[z]:[z]).forEach((Se,je)=>{let _t=Q.x,Ot=Q.z+je*1.2;Math.hypot(Se.x-_t,Se.z-Ot)>.3?(Se.state="walk",Se.path=[{f:0,x:_t,z:Ot,o:!0}]):(Se.state="idle",Se.path=[],Se.m.g.rotation.y=Math.PI/2)})}if(j.racket||X(j,"#f2d84b"),j.racket.visible=ae,z.racket.visible=!!(!_||ae),me.t+=h/(ae?1.7:1.4),me.t>=1){if(ae&&me.dir<0){let Q=Math.hypot(j.x-R,j.z-me.z1)<2.2||Math.abs(j.z-me.z1)<1.6&&j.x<pe-2;Q?j.m.arms[1].rotation.x=-2:(be[1]++,It("Ponto do advers\xE1rio")),Q||(me.z1=ze)}ae&&me.dir>0&&Math.random()<.18&&(be[0]++,It("Ponto seu!")),Ie[1].el.textContent=ae?"T\xEAnis \xB7 Voc\xEA "+be[0]+" x "+be[1]:"Quadra de t\xEAnis",me.t=0,me.dir*=-1,me.z0=me.z1,me.z1=ze+(Math.random()-.5)*(ae?7:8)}let D=pe-10.5,F=pe+10.5,W=me.dir>0?D+(F-D)*me.t:F-(F-D)*me.t,B=me.z0+(me.z1-me.z0)*me.t;Ue.position.set(W,.3+Math.sin(me.t*Math.PI)*2.4,B);let ge=(Q,ue,Se)=>{if(!Q)return;let je=me.dir===Se?me.z1:Q.z,_t=je-Q.z;Math.abs(_t)>.2?(Q.state="walk",Q.path=[{f:0,x:ue,z:je,o:!0}]):(Q.state="idle",Q.path=[]),su(Q,-Se*-1*Se,0),Q.m.g.rotation.y=Se>0?Math.PI/2:-Math.PI/2,Q.m.arms[1].rotation.x=me.t>.85&&me.dir===Se?-2:-.4};ge(y,D,-1),ge(Y,F,1)},pp=function(h){h.state!=="walk"&&h.timer<=0&&(h.state="walk",h.path=[{f:0,x:re+(Math.random()-.5)*36,z:fe+(Math.random()-.5)*44,o:!0}],h.timer=4+Math.random()*6)},ru=function(){let h=innerWidth,_=innerHeight;o.setSize(h,_,!1),c.aspect=h/_,c.fov=h<_?55:42,c.updateProjectionMatrix()},mp=function(h,_,y,R,D,F,W,B){let ge=(y-h)*(B-F)-(R-_)*(W-D);if(Math.abs(ge)<1e-9)return!1;let Q=((D-h)*(B-F)-(F-_)*(W-D))/ge,ue=((D-h)*(R-_)-(F-_)*(y-h))/ge;return Q>=0&&Q<=1&&ue>=0&&ue<=1},au=function(h,_,y,R,D){let F=R-_,W=D-y,B=Math.hypot(F,W)||1,ge=R+F/B*.35,Q=D+W/B*.35;return ou[h].some(ue=>mp(_,y,ge,Q,ue[0],ue[1],ue[2],ue[3]))},lu=function(h){let _=Ui.getBoundingClientRect(),y=_.left+_.width/2,R=_.top+_.height/2,D=h.clientX-y,F=h.clientY-R,W=Math.hypot(D,F),B=_.width/2-8;W>B&&(D*=B/W,F*=B/W),Kn.x=D/B,Kn.y=F/B,cu.style.transform=`translate(${D}px,${F}px)`},hr=function(){it=!0;let h=j.m.g.position;!j.o&&At!==j.f&&rt(j.f,!0),j.o&&At<0;let _=innerWidth<innerHeight;Wt(h.clone().add(new L(_?9:12,_?15:11,_?13:16)),h.clone().add(new L(0,1,0)),.8),Ya.copy(h),document.getElementById("fol").classList.add("on")},_p=function(h){let _=Kn.x,y=Kn.y;(Hn.w||Hn.arrowup)&&(y=-1),(Hn.s||Hn.arrowdown)&&(y=1),(Hn.a||Hn.arrowleft)&&(_=-1),(Hn.d||Hn.arrowright)&&(_=1);let R=Math.min(1,Math.hypot(_,y));if(j.manual=0,R>.12){it||hr(),(j.sit||j.state==="walk")&&(j.seat&&(j.seat.who=null,j.seat=null),j.sit=!1,j.path=[],j.state="idle",j.then=null,j.then2=null);let D=l.target.x-c.position.x,F=l.target.z-c.position.z,W=Math.hypot(D,F)||1,B={x:D/W,z:F/W},ge={x:-B.z,z:B.x},Q=B.x*-y+ge.x*_,ue=B.z*-y+ge.z*_,Se=Math.hypot(Q,ue)||1,je=4.6*R*h,_t=j.x+Q/Se*je,Ot=j.z+ue/Se*je,Vn=j.o?0:j.f,Pn=j.o?Vn===0:!0,Nt=(ys,oc)=>(j.o||j.f===0?!au(0,j.x,j.z,ys,oc):!au(Vn,j.x,j.z,ys,oc))?(j.x=ys,j.z=oc,!0):!1;if(Nt(_t,Ot)||Nt(_t,j.z)||Nt(j.x,Ot),j.o||j.f===0){let ys=!gp(j.x,j.z);ys!==j.o&&(j.o=ys,j.f=0)}ae&&(!j.o||j.x>pe+1||j.x<pe-17||Math.abs(j.z-ze)>10)&&(ae=!1,Ie[1].el.textContent="Quadra de t\xEAnis"),j.m.g.rotation.y=Math.atan2(Q,ue),j.manual=R,j.state="idle",j.timer=99}if(it){let D=j.m.g.position,F=D.clone().sub(Ya);xe.on?(xe.p1.add(F),xe.t1.add(F)):(c.position.add(F),l.target.add(F)),Ya.copy(D),!j.o&&At!==j.f&&rt(j.f,!0)}},yp=function(h,_){return h.o&&_.o||!h.o&&!_.o&&h.f===_.f},du=function(){let h=null,_=j;if(_.m.g.visible)if(_.sit)h=_.seat&&_.seat.room==="ia"?{t:"Usar o Jarvis",fn:fu}:_.seat&&_.seat.room==="arquibancada"?{t:"Levantar",fn:Qa}:{t:"Levantar",fn:Qa};else{let y=[...rn,...Qn].find(R=>yp(R,_)&&Ka(R,_.x,_.z,2.4));if(y)h={t:(y.pessoa?"Falar com ":"Conversar com ")+y.nome,fn:()=>{xp(y),y.pessoa?tc(y):vs(y,!0)}};else if(_.o&&Math.hypot(Ve.x-_.x,Ve.z-_.z)<1.8)h={t:"Chutar a bola",fn:bp};else if(ae)h={t:"Parar de jogar",fn:()=>{ae=!1,Ie[1].el.textContent="Quadra de t\xEAnis"}};else if(_.o&&_.x>pe-15&&_.x<pe&&Math.abs(_.z-ze)<8)h={t:"Jogar t\xEAnis",fn:()=>{ae=!0,be[0]=be[1]=0,j.x=pe-10.5,j.z=ze,hr(),It("Ande at\xE9 a bolinha para rebater")}};else if(!_.o&&Ka(_,0,-.6,2))h={t:"Elevador",fn:Sp};else{let R=Ye.filter(D=>!D.who&&(D.o?_.o:!_.o&&D.f===_.f)&&Ka(D,_.x,_.z,1.6)).sort((D,F)=>Math.hypot(D.x-_.x,D.z-_.z)-Math.hypot(F.x-_.x,F.z-_.z))[0];R&&(h={t:R.room==="ia"?"Sentar no Jarvis":R.room==="arquibancada"?"Sentar e assistir":"Sentar",fn:()=>{un(j,R),j.then2=R.room==="ia"?fu:R.room==="arquibancada"?Mp:eu}})}}Ja=h,Za.style.display=h?"":"none",h&&(Za.textContent=h.t)},Qa=function(){$t();let h=j.seat;h&&(h.who=null,j.seat=null),j.sit=!1,j.state="idle",h&&(j.x+=Math.sin(h.ry)*.9,j.z+=Math.cos(h.ry)*.9)},xp=function(h){h.sit||(h.m.g.rotation.y=Math.atan2(j.x-h.x,j.z-h.z)),j.m.g.rotation.y=Math.atan2(h.x-j.x,h.z-j.z),h.state==="idle"&&(h.timer=Math.max(h.timer,8))},bp=function(){let h=j.m.g.rotation.y;Ve.vx=Math.sin(h)*15,Ve.vz=Math.cos(h)*15,Ve.last="kaio",j.m.arms[0].rotation.x=-1.2},Mp=function(){it=!1,document.getElementById("fol").classList.remove("on"),Wt(new L(47,9,te+13),new L(47,0,0),1.2),It("Bom jogo!")},Sp=function(){Rn(`<h2>Elevador</h2><div class="sub">Para qual andar?</div><div class="row">${["T\xE9rreo","1\xBA andar","2\xBA andar"].map((h,_)=>`<button class="btn ${_===j.f?"ghost":""}" data-el="${_}">${h}</button>`).join("")}</div>`),Pt.querySelectorAll("[data-el]").forEach(h=>h.onclick=()=>{let _=+h.dataset.el;$t(),j.f=_,j.o=!1,j.x=0,j.z=.4,rt(_,!0),hr()})},wp=function(h){!h||h.pessoa||ho.has(h.sala)||(ho.add(h.sala),!uu&&ho.size>=5&&(uu=!0,setTimeout(()=>nu(50),600)))},fu=function(){let h=i[t].bots,_=h.flatMap(y=>y.tarefas.map((R,D)=>({b:y,t:R,i:D})).filter(R=>!R.t[3]&&R.t[1]==="la"));Rn(`<h2>Central Jarvis</h2><div class="sub">Vis\xE3o geral de ${at(i[t].nome)} agora</div>`+h.map(y=>{let R=y.tarefas.filter(F=>!F[3]),D=F=>R.filter(W=>W[1]===F).length;return`<div class="task"><span class="d" style="background:${$a[y.st]}"></span><div class="n">${at(y.emo+" "+y.nome)}<small>${D("la")} atrasadas \xB7 ${D("wa")} chegando \xB7 ${D("ok")} no prazo</small></div></div>`}).join("")+`<div class="row"><button class="btn" id="cobrar" ${_.length?"":"disabled"}>Cobrar atrasados (${_.length})</button><button class="btn ghost" id="up">Levantar</button></div><div class="note">Exemplo. No app real o Jarvis manda a cobran\xE7a pelo canal de cada bot.</div>`),document.getElementById("up").onclick=Qa,document.getElementById("cobrar").onclick=()=>{let y=[...new Set(_.map(R=>R.b.nome))].join(", ");It("Cobran\xE7a enviada"),Pt.querySelector(".note").textContent="Jarvis cobrou: "+y+"."}},ur=function(){Qn.forEach(h=>{P.remove(h.m.g),h.seat&&(h.seat.who=null),He.splice(He.indexOf(h),1),h.tag.remove()}),Qn=[],uo().forEach((h,_)=>{let y=gi(h.sala)||gi("foco");if(!y)return;let R=gn({pessoa:!0,staff:!0,nome:h.nome,papel:h.papel,sala:h.sala,o:!1,f:y.f,x:y.x,z:y.z,speed:1.5,look:{shirt:E[_%6],skin:Tt[_%5],pants:"#1f2937",hair:["#1c1917","#78350f","#facc15"][_%3]}});R.seat=y,y.who=R,R.sit=!0,R.state="sit",R.timer=30+Math.random()*60,R.m.g.rotation.y=y.ry,R.home=y,R.pid=h.id;let D=document.createElement("div");D.className="tag pes",D.innerHTML="<i></i>",D.append(h.nome),D.onclick=F=>{F.stopPropagation(),tc(R)},We.appendChild(D),R.tag=D,Qn.push(R)})},Rp=function(){Pt.insertAdjacentHTML("beforeend",'<div class="row"><button class="btn" id="addP">Adicionar pessoa</button></div>'),document.getElementById("addP").onclick=Cp,Qn.forEach(h=>{}),Qn.length&&Pt.insertAdjacentHTML("beforeend",'<div class="sub" style="margin-top:14px">Pessoas</div>'+Qn.map(h=>`<div class="bot" data-pid="${at(h.pid)}"><div class="av" style="background:#ffffff14">\u{1F464}</div><div class="n" style="flex:1"><b>${at(h.nome)}</b><small style="display:block;color:var(--mut)">${at(h.papel||"")} \xB7 ${at(e[t][h.sala]||"")}</small></div></div>`).join("")),Pt.querySelectorAll("[data-pid]").forEach(h=>h.onclick=()=>tc(Qn.find(_=>_.pid===h.dataset.pid)))},Cp=function(){Rn(`<h2>Adicionar pessoa</h2><div class="sub">Ela ganha uma mesa no campus</div>
  <form id="fp" class="form"><label>Nome<input id="pn" required maxlength="30" autocomplete="off"></label><label>Fun\xE7\xE3o<input id="pr" maxlength="40" placeholder="ex.: Secret\xE1ria" autocomplete="off"></label>
  <label>Sala<select id="ps">${Ap().map(h=>`<option value="${h}">${at(e[t][h])}</option>`).join("")}</select></label><div class="row"><button class="btn" type="submit">Adicionar</button></div></form>
  <div class="note">Por enquanto fica s\xF3 neste aparelho. Para a pessoa entrar de verdade, o pr\xF3ximo passo \xE9 o convite por e-mail ligado ao banco.</div>`),document.getElementById("fp").onsubmit=h=>{h.preventDefault();let _=document.getElementById("pn").value.trim();if(!_)return;let y=uo();y.push({id:Date.now().toString(36),nome:_,papel:document.getElementById("pr").value.trim(),sala:document.getElementById("ps").value}),ec(y),ur(),$t(),It(_+" entrou na equipe")}},tc=function(h){h&&(Rn(`<h2>\u{1F464} ${at(h.nome)}</h2><div class="sub">${at(h.papel||"Equipe")} \xB7 ${at(e[t][h.sala]||"")}</div><div class="say">\u201COi! Ainda n\xE3o tenho tarefas aqui no Jarvis.\u201D</div><div class="row"><button class="btn ghost" id="rmP">Remover da equipe</button></div>`),document.getElementById("rmP").onclick=()=>{ec(uo().filter(_=>_.id!==h.pid)),ur(),$t()})},fo=function(h,_){if(dr.innerHTML="",dr.append(h),_){let y=document.createElement("button");y.textContent=_.t,y.onclick=_.fn,dr.append(y)}dr.style.display=""},sc=function(h,_){return Promise.race([h,new Promise((y,R)=>setTimeout(()=>R(new Error("tempo esgotado")),_))])},vu=function(){let h=document.getElementById("offices");h.innerHTML="";for(let[_,y]of Object.entries(i)){let R=document.createElement("button");if(R.className=_===t?"on":"",y.kind==="escola"||_==="escola"){let D=document.createElement("img");D.src="logo.png",D.alt="",D.style.cssText="height:18px;vertical-align:-4px;margin-right:6px",R.append(D)}R.append(y.nome),R.onclick=()=>{_!==t&&(t=_,vu(),$t(),Ii())},h.append(R)}},Up=function(){Rn('<h2>Entrar no Jarvis</h2><div class="sub">Mandamos um c\xF3digo para o seu e-mail</div><form id="lf" class="form"><label>E-mail<input id="le" type="email" required autocomplete="email" inputmode="email"></label><div class="row"><button class="btn" type="submit">Enviar c\xF3digo</button></div></form><div class="note" id="lmsg"></div>'),document.getElementById("lf").onsubmit=async h=>{h.preventDefault();let _=document.getElementById("le").value.trim(),y=document.getElementById("lmsg");y.textContent="Enviando\u2026";let R=await Vt.auth.signInWithOtp({email:_,options:{shouldCreateUser:!1}});if(R.error){y.textContent="N\xE3o deu: "+R.error.message;return}Pt.innerHTML=`<h2>Digite o c\xF3digo</h2><div class="sub">Enviado para ${at(_)}</div><form id="cf" class="form"><label>C\xF3digo<input id="cc" inputmode="numeric" autocomplete="one-time-code" required maxlength="10"></label><div class="row"><button class="btn" type="submit">Entrar</button></div></form><div class="note" id="cmsg"></div>`,document.getElementById("cf").onsubmit=async D=>{D.preventDefault();let F=document.getElementById("cmsg");F.textContent="Conferindo\u2026";let W=await Vt.auth.verifyOtp({email:_,token:document.getElementById("cc").value.replace(/\s/g,""),type:"email"});if(W.error){F.textContent="C\xF3digo n\xE3o confere: "+W.error.message;return}_u=W.data.session,$t(),It("Bem-vindo, Kaio"),fr()}}},Np=function(){let h=[...new Set(Ye.filter(y=>y.scr&&!y.kaio).map(y=>y.room)),"diretoria"];Rn(`<h2>Adicionar \xE0 equipe</h2><div class="sub">${at(i[t].nome)}</div>
  <form id="fa" class="form"><label>Tipo<select id="at"><option value="bot">Agente de IA</option><option value="pessoa">Pessoa</option></select></label>
  <label>Nome<input id="an" required maxlength="40" autocomplete="off" placeholder="ex.: Criadora de conte\xFAdo"></label>
  <label>Fun\xE7\xE3o<input id="ap" maxlength="80" autocomplete="off" placeholder="ex.: posts e v\xEDdeos da rematr\xEDcula"></label>
  <label>Sala<select id="as">${h.map(y=>`<option value="${y}" ${y==="marketing"?"selected":""}>${at(e[t][y]||y)}</option>`).join("")}</select></label>
  <label id="amw">Especialidade (biblioteca de agentes)<select id="am"><option value="">Nenhuma</option>${nc.map(y=>`<option value="${at(y.slug)}">${at((y.emoji||"")+" "+y.nome)}</option>`).join("")}</select></label>
  <div class="row"><button class="btn" type="submit">Adicionar</button></div></form><div class="note" id="amsg">${Cn?"Fica salvo no banco e aparece em todos os seus aparelhos.":"Modo demonstra\xE7\xE3o: fica s\xF3 neste aparelho."}</div>`);let _=document.getElementById("at");_.onchange=()=>document.getElementById("amw").style.display=_.value==="bot"?"":"none",document.getElementById("fa").onsubmit=async y=>{y.preventDefault();let R=document.getElementById("an").value.trim();if(!R)return;let D=_.value,F=document.getElementById("ap").value.trim(),W=document.getElementById("as").value,B=document.getElementById("am").value||null;if(!Cn){let Q=uo();Q.push({id:Date.now().toString(36),nome:R,papel:F,sala:W}),ec(Q),ur(),$t(),It(R+" entrou na equipe");return}document.getElementById("amsg").textContent="Salvando\u2026";let ge=await Vt.rpc("campus_criar_agente",{p_escritorio:t,p_nome:R,p_sala:W,p_papel:F||null,p_tipo:D,p_emoji:null,p_modelo:D==="bot"?B:null,p_cor:E[ic(R)%6]});if(ge.error){document.getElementById("amsg").textContent="N\xE3o salvou: "+ge.error.message;return}$t(),It(R+" entrou na equipe"),await fr()}},yu=function(){let h=Math.min(lp.getDelta(),.05);if(lo+=h,xe.on){xe.t+=h/xe.d;let y=xe.t>=1?1:1-Math.pow(1-xe.t,3);c.position.lerpVectors(xe.p0,xe.p1,y),l.target.lerpVectors(xe.t0,xe.t1,y),xe.t>=1&&(xe.on=!1)}_p(h),l.update(),up(h),fp(h);for(let y of He)y.wander&&pp(y),Xa(y),hp(y,h);b(h),ye.visible=he.visible||C.phase!=="pousado",ne.forEach(y=>{y.g.position.x+=y.d*y.v*h,y.g.position.x>120&&(y.g.position.x=-120),y.g.position.x<-120&&(y.g.position.x=120)}),Pe.forEach((y,R)=>y.rotation.x=Math.sin(lo*2+R)*.5),P.traverse,Le[2].children.forEach(y=>{y.userData.spin&&(y.rotation.y+=h,y.position.y=2.2+Math.sin(lo*2)*.15)}),Ye.forEach(y=>{y.scr&&(y.scr.material=y.who?Bp:zp)});let _=c.position.distanceTo(l.target);rn.forEach(y=>ft(y.tag,y.m.g.position.clone().setY(y.m.g.position.y+(y.sit?2.1:2.5)),y.m.g.visible)),ft(j.tag,j.m.g.position.clone().setY(j.m.g.position.y+(j.sit?2.1:2.5)),j.m.g.visible),St.forEach(y=>gt(y.el,y.pos,At===y.f&&_<70)),Ie.forEach(y=>gt(y.el,y.pos,At<0||_>60||it)),++vp%6===0&&du(),Qn.forEach(y=>ft(y.tag,y.m.g.position.clone().setY(y.m.g.position.y+(y.sit?2.1:2.5)),y.m.g.visible)),o.render(a,c),requestAnimationFrame(yu)},i={escola:{nome:"Escola Prosperi",placa:"ESCOLA PROSPERI",kind:"escola",bots:[{id:"zeus",nome:"Zeus",emo:"\u26A1",cor:"#facc15",sala:"diretoria",st:"ok",papel:"Dire\xE7\xE3o geral",tarefas:[["Aprovar or\xE7amento de material 2027","ok",30],["Revisar contratos de fornecedores","wa",20]]},{id:"jarvis",nome:"Jarvis",emo:"\u{1F916}",cor:"#22d3ee",sala:"ia",st:"ok",papel:"Central de IA \xB7 resumo das 5h40",tarefas:[["Resumo falado das 5h40","ok",10],["Cobrar quem est\xE1 atrasado","ok",10]]},{id:"plutus",nome:"Plutus",emo:"\u{1F4B0}",cor:"#22c55e",sala:"financeiro",st:"la",papel:"Financeiro",tarefas:[["Conferir boletos vencidos","la",30],["Fechar caixa da semana","wa",20],["Lan\xE7ar notas no TecSof","ok",10]]},{id:"hermes",nome:"Hermes",emo:"\u{1F4E3}",cor:"#f97316",sala:"marketing",st:"wa",papel:"Marketing e comercial",tarefas:[["Post de rematr\xEDcula no Instagram","wa",20],["Fechar sistema da Rabbit (sexta)","ok",20]]},{id:"remat",nome:"Rematr\xEDculas",emo:"\u{1F392}",cor:"#ef4444",sala:"secretaria",st:"la",papel:"Secretaria",tarefas:[["Ligar para 5 fam\xEDlias pendentes","la",30],["Separar contratos assinados","ok",10]]},{id:"demeter",nome:"Dem\xE9ter & Atena",emo:"\u{1F3DB}\uFE0F",cor:"#a78bfa",sala:"coord",st:"ok",papel:"Coordena\xE7\xE3o pedag\xF3gica",tarefas:[["Revisar planejamento do 6\xBA ano","ok",20],["Curadoria liter\xE1ria 2027","wa",20]]},{id:"manut",nome:"Manuten\xE7\xE3o",emo:"\u{1F527}",cor:"#94a3b8",sala:"operacoes",st:"wa",papel:"Manuten\xE7\xE3o e servi\xE7os gerais",tarefas:[["Trocar l\xE2mpadas do corredor","wa",10],["Or\xE7amento da fachada","ok",20]]}]},pessoal:{nome:"Pessoal",placa:"KAIO \xB7 PESSOAL",kind:"pessoal",bots:[{id:"jarvis",nome:"Jarvis",emo:"\u{1F916}",cor:"#22d3ee",sala:"ia",st:"ok",papel:"Central de IA",tarefas:[["Resumo falado das 5h40","ok",10]]},{id:"apolo",nome:"Apolo & Cronos",emo:"\u{1F9ED}",cor:"#60a5fa",sala:"coord",st:"wa",papel:"Agenda e rotina",tarefas:[["Planejar a semana","wa",20],["Revisar h\xE1bitos do m\xEAs","ok",10]]},{id:"jordan",nome:"Jordan Belfort",emo:"\u{1F4C8}",cor:"#22c55e",sala:"financeiro",st:"ok",papel:"Investimentos",tarefas:[["Revisar carteira","ok",20]]},{id:"jubileu",nome:"Jubileu",emo:"\u231A",cor:"#eab308",sala:"marketing",st:"wa",papel:"Rel\xF3gios",tarefas:[["Avaliar rel\xF3gio anunciado","wa",20]]},{id:"dumont",nome:"Santos Dumont",emo:"\u2708\uFE0F",cor:"#38bdf8",sala:"operacoes",st:"la",papel:"Avia\xE7\xE3o \xB7 aulas de PP",tarefas:[["Revisar mat\xE9ria da \xFAltima aula","la",20]]},{id:"federer",nome:"Federer",emo:"\u{1F3BE}",cor:"#a3e635",sala:"tenis",st:"ok",papel:"T\xEAnis e esporte",tarefas:[["Treino de t\xEAnis 18h","ok",20]]}]}},e={escola:{bib:"Biblioteca",coord:"Coordena\xE7\xE3o pedag\xF3gica",cafe:"Refeit\xF3rio & caf\xE9",secretaria:"Secretaria",lobby:"Recep\xE7\xE3o",prof:"Sala dos professores",financeiro:"Financeiro",reuniao:"Sala de reuni\xE3o",lounge:"Lounge",marketing:"Marketing & comercial",foco:"Ilha de foco",operacoes:"Manuten\xE7\xE3o & opera\xE7\xF5es",diretoria:"Diretoria",conselho:"Sala do conselho",ia:"Jarvis \xB7 Central de IA",deck:"Terra\xE7o"},pessoal:{bib:"Biblioteca",coord:"Agenda & rotina",cafe:"Cozinha & caf\xE9",secretaria:"Casa & documentos",lobby:"Entrada",prof:"Est\xFAdio",financeiro:"Investimentos",reuniao:"Sala de reuni\xE3o",lounge:"Lounge",marketing:"Rel\xF3gios",foco:"Ilha de foco",operacoes:"Avia\xE7\xE3o",diretoria:"Seu escrit\xF3rio",conselho:"Sala de projetos",ia:"Jarvis \xB7 Central de IA",deck:"Terra\xE7o"}},t="escola",n=220,s=document.getElementById("c"),r=/iPhone|iPad|Android/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&innerWidth<900,o=new ta({canvas:s,antialias:!0,powerPreference:"default"});o.setPixelRatio(Math.min(devicePixelRatio,2)),s.addEventListener("webglcontextlost",h=>{h.preventDefault();let _=document.createElement("div");_.id="load",_.innerHTML='<div style="padding:24px;text-align:center">O 3D foi pausado pelo aparelho (mem\xF3ria).<br><button onclick="location.reload()" style="margin-top:12px;padding:10px 18px;border-radius:12px;border:0;font-weight:700">Recarregar</button></div>',document.body.appendChild(_)}),o.shadowMap.enabled=!0,o.shadowMap.type=uh,o.toneMapping=dh,o.toneMappingExposure=1.05;let a=new ia;a.background=new ct("#a9dcf7"),a.fog=new na("#a9dcf7",180,420);let c=new Zt(42,1,.5,900);c.position.set(95,80,142);let l=new Wa(c,s);l.target.set(4,0,16),l.enableDamping=!0,l.dampingFactor=.08,l.maxPolarAngle=1.35,l.minDistance=7,l.maxDistance=260,l.screenSpacePanning=!1,a.add(new da("#dff3ff","#6b8f4e",1.1));let u=new ma("#fff4e0",2.4);u.position.set(60,110,45),u.castShadow=!0,u.shadow.mapSize.set(r?1024:2048,r?1024:2048),Object.assign(u.shadow.camera,{left:-110,right:110,top:110,bottom:-110,near:10,far:320}),u.shadow.bias=-4e-4,u.shadow.normalBias=.04,a.add(u);let d={},f=(h,_={})=>{let y=h+JSON.stringify(_);return d[y]||(d[y]=new Ai({color:h,roughness:.85,..._}))},p=new Zi(1,1,1),T=[],E=["#7b5aa6","#3a8fd6","#a6cf4a","#ef8b3b","#e3423b","#f2d84b"],M=new Image,N=new en(M);N.colorSpace=Yt;let I=[];M.onload=()=>{N.needsUpdate=!0,I.forEach(h=>h())},M.src="logo.png";let P=new wt;a.add(P);let A=g(P,520,520,"#7fc35d",0,0,0);A.userData.ground=!0,T.push(A),g(P,240,14,"#3b3f46",0,.02,70);for(let h=-115;h<120;h+=9)g(P,4,.35,"#f5f5f4",h,.04,70);g(P,240,3,"#d6d3d1",0,.03,61.5),g(P,240,3,"#d6d3d1",0,.03,78.5);let S=-2,O=44;g(P,52,24,"#4b5058",S,.025,O);for(let h=0;h<10;h++)g(P,.2,7,"#f5f5f4",S-22.5+h*5,.04,O-6.5),g(P,.2,7,"#f5f5f4",S-22.5+h*5,.04,O+6.5);g(P,8,8,"#4b5058",S,.026,O+16);let Z=["#e3423b","#f8fafc","#1e293b","#3a8fd6","#a3a3a3","#f2d84b","#7b5aa6","#a6cf4a"];for(let h=0;h<9;h++)h%3!==1&&q(P,S-20+h*5,O-6.5,Math.PI/2,Z[h%8]),h%4!==2&&q(P,S-20+h*5,O+6.5,-Math.PI/2,Z[(h+3)%8]);let ne=[0,1,2,3].map(h=>({g:q(P,-100+h*60,h%2?73:67,h%2?0:Math.PI,Z[(h+1)%8]),d:h%2?1:-1,v:9+h*2}));[["#7b5aa6",-30],["#3a8fd6",-15],["#a6cf4a",0],["#ef8b3b",15],["#e3423b",30]].forEach(([h,_])=>{g(P,10,6,"#6aa84f",_,.03,-30);for(let y=0;y<6;y++){let R=new Xe(new di(.45,0),f(h,{flatShading:!0}));R.position.set(_-3.5+y*1.4,.4,-30+(y%2?1.2:-1.2)),P.add(R)}});let ce=["#4ade80","#22c55e","#65a30d","#86efac"];for(let h=-110;h<115;h+=11)J(h,-48,1),Math.abs(h+2)>8&&J(h,59,1),J(h+5,82,1.1);for(let h=-46;h<60;h+=10)J(-96,h,1.2),J(96,h,1.2);g(P,30,12,"#e7e5e4",0,.03,20),g(P,4,6,"#e7e5e4",0,.03,29),g(P,70,3.4,"#e7e5e4",-48,.03,20),g(P,64,3.4,"#e7e5e4",42,.03,20),g(P,3.4,60,"#e7e5e4",-30,.03,-8);let de=new Xe(new Mn(16,2.5),new bn({map:U("ESCOLA PROSPERI","",{bg:"#ffffff"}),toneMapped:!1}));v(P,17,3.1,.6,"#ffffff",0,0,27.5);for(let h=0;h<5;h++)v(P,17/5,.35,.62,E[h],-6.8+h*3.4,0,27.5);de.position.set(0,1.75,27.85),P.add(de);for(let h=-12;h<=12;h+=6)if(h){x(P,.6,.7,.7,"#a8a29e",h,0,15.8);let _=new Xe(new di(.75,0),f(E[(h/6+2+5)%5|0],{flatShading:!0}));_.position.set(h,1.2,15.8),P.add(_)}let ee=4.2,_e=44,Te=26,Ce=-22,Be=22,Ne=-13,$=13,le=h=>h*ee+.3,Le=[0,1,2].map(()=>{let h=new wt;return P.add(h),h}),he=new wt;P.add(he);let Fe=new Ai({color:"#bfe6ff",transparent:!0,opacity:.22,roughness:.05,metalness:.2,depthWrite:!1}),$e=new Ai({color:"#e0f2fe",transparent:!0,opacity:.28,roughness:.05,depthWrite:!1}),nt="#e5e7eb",Ye=[],lt=[[],[],[]],St=[],V=[[{k:"bib",x0:-22,x1:-12,s:-1,t:"lib",c:"#d6b48a"},{k:"coord",x0:-12,x1:-3,s:-1,t:"desks",c:"#c7d2fe"},{k:"cafe",x0:3,x1:22,s:-1,t:"cafe",c:"#e8c9a0"},{k:"secretaria",x0:-22,x1:-4,s:1,t:"desks",c:"#fde2c4"},{k:"lobby",x0:-4,x1:4,s:1,t:"lobby",c:"#ececec",open:!0},{k:"prof",x0:4,x1:22,s:1,t:"lounge",c:"#d9f99d"}],[{k:"financeiro",x0:-22,x1:-3,s:-1,t:"desks",c:"#bbf7d0"},{k:"reuniao",x0:3,x1:13,s:-1,t:"meet",c:"#ddd6fe"},{k:"lounge",x0:13,x1:22,s:-1,t:"lounge",c:"#fecdd3"},{k:"marketing",x0:-22,x1:-6,s:1,t:"desks",c:"#fed7aa"},{k:"foco",x0:-6,x1:6,s:1,t:"bench",c:"#e0f2fe"},{k:"operacoes",x0:6,x1:22,s:1,t:"desks",c:"#e5e7eb"}],[{k:"diretoria",x0:-22,x1:-3,s:-1,t:"dir",c:"#d6b48a"},{k:"conselho",x0:3,x1:22,s:-1,t:"meet",c:"#c7d2fe"},{k:"ia",x0:-22,x1:-6,s:1,t:"ai",c:"#0f2a33"},{k:"deck",x0:-6,x1:22,s:1,t:"deck",c:"#b07b4f",open:!0}]];for(let h=0;h<3;h++){let _=Le[h],y=le(h);_.position.y=y;let R=v(_,_e+.6,.3,Te+.6,["#f2d84b","#3a8fd6","#a6cf4a"][h],0,-.3,0);R.userData.floor=h,T.push(R),g(_,_e,3,"#e5e7eb",0,.012,0),v(_,6,2.8,.3,"#cbd5e1",0,0,-1.65),v(_,.3,2.8,11.4,"#cbd5e1",-3,0,-7.3),v(_,.3,2.8,11.4,"#cbd5e1",3,0,-7.3),v(_,6,2.8,.3,"#cbd5e1",0,0,Ne+.15),g(_,5.6,11,"#94a3b8",0,.02,-7.3),v(_,1.6,2.4,.05,"#64748b",0,0,-1.47,{cast:!1});for(let B=0;B<8;B++)v(_,2.4,.25*(B+1),.9,"#e2e8f0",-1.4,0,-11.5+B*.9);for(let B of V[h]){let ge=B.s<0?Ne:1.5,Q=B.s<0?-1.5:$,ue=(B.x0+B.x1)/2;g(_,B.x1-B.x0-.1,Q-ge-.1,B.c,ue,.015,(ge+Q)/2),lt[h].push({...B,zA:ge,zB:Q,cx:ue});let Se=B.s<0?-1.5:1.5,je=(B.x1-B.x0-1.8)/2;if(!B.open){let _t=E[(Math.round(ue)+h*3+20)%5];v(_,.16,2.75,.22,_t,ue-.95,0,Se),v(_,.16,2.75,.22,_t,ue+.95,0,Se),v(_,2.06,.22,.22,_t,ue,2.6,Se),g(_,1.7,1.4,_t,ue,.02,Se+(B.s<0?-.75:.75)).material=f(_t,{transparent:!0,opacity:.45})}B.open||(v(_,je,2.6,.08,$e,B.x0+je/2,0,Se,{cast:!1}),v(_,je,2.6,.08,$e,B.x1-je/2,0,Se,{cast:!1}),v(_,B.x1-B.x0,.08,.12,nt,ue,2.6,Se)),B.x0>Ce+.1&&!(h===0&&B.k==="lobby")&&v(_,.08,2.6,Q-ge,$e,B.x0,0,(ge+Q)/2,{cast:!1}),bt(_,h,B),St.push({k:B.k,f:h,pos:new L(ue,y+3,(ge+Q)/2)})}let D=ee-.3,F=(B,ge,Q,ue)=>{let Se=new Xe(p,Fe);Se.scale.set(B,D,.06),Se.position.set(ge,D/2,Q),Se.rotation.y=ue,_.add(Se)};h===0?(F(18,-13,$,0),F(18,13,$,0)):h===2?F(16,-14,$,0):F(_e,0,$,0),F(_e,0,Ne,0),F(Te,Ce,0,Math.PI/2),F(Te,Be,0,Math.PI/2);let W=h;for(let B=Ce;B<=Be;B+=2.2){let ge=E[W++%5];!(h===0&&Math.abs(B)<4)&&!(h===2&&B>-6)&&v(_,.22,D,.3,ge,B,0,$+.1),v(_,.22,D,.3,ge,B,0,Ne-.1)}for(let B=Ne;B<=$;B+=2.2){let ge=E[W++%5];v(_,.3,D,.22,ge,Ce-.1,0,B),v(_,.3,D,.22,ge,Be+.1,0,B)}h===2&&(v(_,28,1.1,.08,Fe,8,0,$,{cast:!1}),v(_,28,.08,.12,nt,8,1.1,$))}{let h=le(3);he.position.y=h,v(he,_e+.6,.3,Te+.6,"#e2e8f0",0,-.3,0);for(let R=0;R<5;R++){let D=(_e+.6)/5,F=Ce-.3+D*(R+.5);v(he,D,.9,.3,E[R],F,0,Ne-.15),v(he,D,.9,.3,E[4-R],F,0,$+.15)}v(he,.3,.9,Te,E[1],Ce-.15,0,0),v(he,.3,.9,Te,E[3],Be+.15,0,0);for(let R=-19;R<-3;R+=2.4)for(let D=-10;D<=-3;D+=2.6){let F=v(he,2,.08,1.4,f("#1e3a8a",{metalness:.4,roughness:.3}),R,.6,D);F.rotation.x=-.3}g(he,22,10,"#b07b4f",9,.02,5);for(let R=0;R<20;R+=4)J(0,0,0);for(let R=1;R<19;R+=4.5){let D=new wt;x(D,.12,.16,1.2,"#8b5a2b",0,0,0,6);let F=new Xe(new di(1,0),f("#22c55e",{flatShading:!0}));F.position.y=1.8,F.castShadow=!0,D.add(F),D.position.set(R,0,8),he.add(D)}x(he,3.6,3.6,.06,"#334155",15,0,-6,24),g(he,.8,3.4,"#facc15",15,.08,-6),g(he,2.4,.8,"#facc15",15,.08,-6),v(he,6,3,4,"#64748b",0,0,-7);let _=new Xe(new Mn(22,3.4),new bn({map:U("PROSPERI",null),transparent:!0})),y=new Xe(new Mn(8,9),new bn({map:N,transparent:!0,depthWrite:!1}));y.rotation.x=-Math.PI/2,y.position.set(-12,.06,6),he.add(y),_.position.set(-8,2.4,$+.35),he.add(_),he.userData.logo=_,v(he,22.5,2.6,.2,"#ffffff",-8,.7,$+.15)}{let h=Le[0];[-4.1,4.1].forEach((y,R)=>v(h,.5,3.8,.5,E[R?4:1],y,0,$+.3)),v(h,8.7,.6,.5,E[0],0,3.6,$+.3);let _=new Xe(new Mn(6,.5),new bn({map:U("ENTRADA",null),transparent:!0}));_.position.set(0,3.9,$+.57),h.add(_),g(P,8,4,E[5],0,.035,$+3)}let ye=new wt;{let h=new Xe(new Bn(1.1,14,10),f("#e3423b"));h.scale.set(1.6,1,1),h.castShadow=!0,ye.add(h);let _=new Xe(new Bn(.75,12,8),f("#bfe6ff",{roughness:.1,metalness:.3}));_.position.set(1.05,.15,0),_.scale.set(1,.8,.95),ye.add(_),v(ye,3.4,.28,.28,"#e3423b",-2.6,.1,0),v(ye,.18,1,.7,"#f2d84b",-4.2,.1,0),[-.7,.7].forEach(D=>v(ye,2.6,.1,.1,"#334155",0,-1.15,D)),[-.6,.6].forEach(D=>[-.7,.7].forEach(F=>v(ye,.08,.5,.08,"#334155",D,-1.1,F)));let y=new wt;y.position.y=1.25,ye.add(y),v(y,7,.06,.3,"#1f2937",0,0,0),v(y,.3,.06,7,"#1f2937",0,0,0),x(ye,.08,.08,.35,"#1f2937",0,.95,0,6),ye.userData.rot=y;let R=new wt;R.position.set(-4.2,.3,.38),ye.add(R),v(R,.06,1.4,.12,"#1f2937",0,-.7,0),ye.userData.tr=R,[1,-1].forEach(D=>{let F=new Xe(new Mn(1.15,1.3),new bn({map:N,transparent:!0,depthWrite:!1}));F.position.set(-.15,.05,D*1.13),F.rotation.y=D>0?0:Math.PI,ye.add(F)})}ye.rotation.order="YXZ";let C={x:15,z:-6,y0:le(3)+1.25,t:0,phase:"pousado",wait:30};ye.position.set(C.x,C.y0,C.z),P.add(ye),v(P,_e+2,.3,Te+2,"#cbd5e1",0,0,0);let G=32,ie=62,se=-11,te=11;g(P,ie-G+4,te-se+4,"#15803d",(G+ie)/2,.03,0);for(let h=0;h<6;h++)g(P,(ie-G)/6,te-se,h%2?"#16a34a":"#22a34d",G+(h+.5)*(ie-G)/6,.035,0);let De=(h,_,y,R)=>g(P,h,_,"#f8fafc",y,.04,R);De(ie-G,.15,47,se),De(ie-G,.15,47,te),De(.15,te-se,G,0),De(.15,te-se,ie,0),De(.15,te-se,47,0);{let h=new Xe(new la(2.9,3.05,40),f("#f8fafc"));h.rotation.x=-Math.PI/2,h.position.set(47,.045,0),P.add(h)}[G,ie].forEach((h,_)=>{let y=_?1:-1;v(P,.12,2,.12,"#f8fafc",h+y*.8,0,-2.5),v(P,.12,2,.12,"#f8fafc",h+y*.8,0,2.5),v(P,.12,.12,5.1,"#f8fafc",h+y*.8,2,0),De(.15,9,h-y*4,0)});for(let h=G-2;h<=ie+2;h+=3)v(P,.08,4,.08,"#334155",h,0,se-2),v(P,.08,4,.08,"#334155",h,0,te+2);v(P,ie-G+4,4,.03,new Ai({color:"#334155",transparent:!0,opacity:.18}),47,0,se-2,{cast:!1}),v(P,ie-G+4,4,.03,new Ai({color:"#334155",transparent:!0,opacity:.18}),47,0,te+2,{cast:!1});let Me=[];for(let h=0;h<2;h++){let _=te+3.6+h*1.4,y=h*.5;v(P,18,y+.05,1.2,"#cbd5e1",47,0,_+.2);let R=v(P,18,.12,.5,E[h+1],47,y+.33,_);for(let D=39;D<=55;D+=1.6){let F={id:Ye.length,f:0,o:!0,x:D,z:_+.05,ry:Math.PI,room:"arquibancada",who:null,h:y};Ye.push(F),Me.push(F)}R.userData.seat=Me[Me.length-3],T.push(R)}let pe=46,ze=34;g(P,30,16,"#2563eb",pe,.03,ze),g(P,23.8,11,"#1d4ed8",pe,.035,ze),[[23.8,.1,0,-5.5],[23.8,.1,0,5.5],[23.8,.1,0,-4.1],[23.8,.1,0,4.1],[.1,11,-11.9,0],[.1,11,11.9,0],[.1,8.2,-6.4,0],[.1,8.2,6.4,0],[12.8,.1,0,0]].forEach(([h,_,y,R])=>g(P,h,_,"#f8fafc",pe+y,.04,ze+R)),v(P,.08,1,11.8,f("#f8fafc",{transparent:!0,opacity:.6}),pe,0,ze,{cast:!1});let re=-58,fe=-6;g(P,52,62,"#86d16a",re,.02,fe);let ke=new Xe(new Dr(7,28),f("#38bdf8",{roughness:.15,metalness:.1}));ke.rotation.x=-Math.PI/2,ke.position.set(re-8,.05,fe-14),P.add(ke),g(P,18,14,"#fde68a",re+10,.04,fe+16),v(P,.1,2.4,.1,"#f8fafc",re+6,0,fe+16),v(P,.1,2.4,.1,"#f8fafc",re+14,0,fe+16),v(P,8,.05,.02,"#f8fafc",re+10,2.2,fe+16),v(P,3,2.4,3,"#f43f5e",re+8,0,fe-2);let Ge=v(P,1,.1,4,"#facc15",re+8,1.2,fe+1.6);Ge.rotation.x=.55,v(P,.15,2.6,.15,"#0ea5e9",re-4,0,fe-1),v(P,.15,2.6,.15,"#0ea5e9",re+1,0,fe-1),v(P,5.2,.15,.15,"#0ea5e9",re-1.5,2.6,fe-1);let Pe=[];[-3,0].forEach(h=>{let _=new wt;_.position.set(re+h+.5,2.6,fe-1),v(_,.02,1.9,.02,"#94a3b8",-.25,-1.9,0),v(_,.02,1.9,.02,"#94a3b8",.25,-1.9,0),v(_,.6,.06,.3,"#f43f5e",0,-1.95,0),P.add(_),Pe.push(_)});for(let h=0;h<26;h++){let _=h*2.4,y=14+h*37%10;J(re+Math.cos(_)*y*1.3,fe+Math.sin(_)*y*1.5,.9+h%3*.2)}let ot=[];[[re-14,fe+4],[re+2,fe-14],[re-2,fe+12],[re+14,fe-6]].forEach(([h,_],y)=>{v(P,2,.45,.6,"#92400e",h,0,_),ot.push({x:h,z:_+.6,ry:Math.PI})}),g(P,3,40,"#e7e5e4",re+4,.035,fe),g(P,30,3,"#e7e5e4",re,.035,fe+6);let Qe=new qs(.22,.38,4,8),mt=new qs(.07,.45,3,6),k=new qs(.09,.62,3,6),Ee=new Ji(.26,.26,.36,6),K=new Bn(.2,12,10),oe=new Bn(.055,8,6),Re=new Bn(.028,6,5),He=[],j=null,Tt=["#f1c27d","#e0ac69","#c68642","#8d5524","#ffdbac"],dt=["#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#f8fafc"],rn=[],_s={};V.forEach((h,_)=>h.forEach(y=>_s[y.k]=_));let Li=new Xe(new Bn(.22,10,8),f("#f8fafc"));Li.castShadow=!0,P.add(Li);let Ve={x:47,z:0,vx:0,vz:0,last:null},w=[0,0],H=[];for(let h=0;h<10;h++){let _=h<5?0:1,y=_?50+h%5%3*4:44-h%5%3*4,R=-7+h%5*3.5,D=gn({npc:!0,o:!0,f:0,x:y,z:R,speed:3.4,look:{shirt:_?"#f8fafc":"#eab308",pants:_?"#1d4ed8":"#111827",skin:Tt[h%5],hair:"#1c1917"}});D.home={x:y,z:R},D.team=_,H.push(D)}let Y=gn({npc:!0,o:!0,f:0,x:pe+9,z:ze,speed:4,look:{shirt:"#f8fafc",pants:"#f8fafc",skin:Tt[1]}}),z=gn({npc:!0,o:!0,f:0,x:pe-9,z:ze,speed:4,look:{shirt:"#ef8b3b",pants:"#1f2937",skin:Tt[3],hair:"#1c1917"}}),ae=!1,be=[0,0];X(Y,"#e3423b"),X(z,"#3a8fd6");let Ue=new Xe(new Bn(.09,8,6),f("#d9f99d",{emissive:"#a3e635",emissiveIntensity:.4}));P.add(Ue);let me={t:0,dir:1,z0:ze,z1:ze},qe=[];for(let h=0;h<7;h++){let _=gn({npc:!0,o:!0,f:0,x:re+(Math.random()-.5)*30,z:fe+(Math.random()-.5)*36,speed:1.1+Math.random()*.6,look:{shirt:dt[h%7],skin:Tt[h%5],pants:h%2?"#1e3a8a":"#374151",hair:["#1c1917","#78350f","#facc15"][h%3]}});h>3&&_.m.g.scale.setScalar(.7),qe.push(_),_.wander=!0}{let h=Ye.filter(y=>y.scr&&!y.kaio&&!["ia","diretoria"].includes(y.room)),_=0;h.forEach((y,R)=>{if(R%3!==0||_>=22)return;_++;let D=gn({staff:!0,o:!1,f:y.f,x:y.x,z:y.z,speed:1.4,look:{shirt:dt[R%7],skin:Tt[R%5],pants:["#1f2937","#334155","#1e3a8a"][R%3],hair:["#1c1917","#78350f","#facc15","#a8a29e"][R%4]}});D.seat=y,y.who=D,D.sit=!0,D.state="sit",D.timer=20+Math.random()*90,D.m.g.rotation.y=y.ry,D.home=y})}j=gn({isPlayer:!0,nome:"Voc\xEA",o:!1,f:2,x:-14,z:-6,speed:2.6,look:{shirt:"#0f172a",pants:"#334155",skin:"#e0ac7e",hair:"#1c1917"}});{let h=Ye.find(_=>_.kaio);j.x=h.x,j.z=h.z,j.seat=h,h.who=j,j.sit=!0,j.state="sit",j.timer=1e9,j.m.g.rotation.y=h.ry}let We=document.getElementById("labels");St.forEach(h=>{let _=document.createElement("div");_.className="room",We.appendChild(_),h.el=_});let Ie=[["Quadra society",47,3,se-4],["Quadra de t\xEAnis",pe,3,ze-9],["Parque",re,4,fe-24],["Beach play",re+10,2,fe+16],["Estacionamento",S,2,O],["Entrada",0,3,18]].map(([h,_,y,R])=>{let D=document.createElement("div");return D.className="room out",D.textContent=h,We.appendChild(D),{el:D,pos:new L(_,y,R)}});j.tag=document.createElement("div"),j.tag.className="tag me",j.tag.innerHTML="<i></i>Voc\xEA",We.appendChild(j.tag);let Ze=new L,At=-1,it=!1,xe={on:!1,t:0,p0:new L,p1:new L,t0:new L,t1:new L},dn=h=>h.o?!0:At===h.f,Jn=new _a,Xt=new ve,_n=null;s.addEventListener("pointerdown",h=>{_n={x:h.clientX,y:h.clientY,t:performance.now()}}),s.addEventListener("pointerup",h=>{if(!_n)return;Math.hypot(h.clientX-_n.x,h.clientY-_n.y)<8&&performance.now()-_n.t<450&&vn(h),_n=null});let Mt=h=>{for(;h;){if(!h.visible)return!1;h=h.parent}return!0},Di=document.getElementById("hint"),An=document.getElementById("sheet"),Pt=document.getElementById("sc"),at=h=>String(h).replace(/[&<>"']/g,_=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[_]),$a={ok:"var(--ok)",wa:"var(--wa)",la:"var(--la)"},ap={ok:"no prazo",wa:"chegando",la:"atrasada"};document.getElementById("sx").onclick=$t,Pt.addEventListener("click",h=>{let _=h.target.closest("[data-b]");if(!_)return;let y=i[t].bots.find(D=>D.id===_.dataset.b),R=y.tarefas[+_.dataset.i];R[3]||Op(y,R,_).then(D=>{if(!D)return;_.disabled=!0,_.textContent="Feito",_.closest(".task").querySelector(".d").style.background="var(--cy)";let F=rn.find(W=>W.id===y.id);if(F){F.jump=1;let W=y.tarefas.filter(B=>!B[3]);y.st=W.some(B=>B[1]==="la")?"la":W.some(B=>B[1]==="wa")?"wa":"ok",F.st=y.st,F.tag.className="tag "+{ok:"",wa:"warn",la:"late"}[y.st]}tu()})});let ja=document.getElementById("toast"),iu,cp=()=>{let h=i[t].bots.flatMap(D=>D.tarefas),_=h.filter(D=>D[3]).length,y=h.filter(D=>D[1]==="la"),R=y.filter(D=>D[3]).length;return[["Confirmar 3 tarefas hoje",Math.min(_,3),3,50],["Zerar as atrasadas",R,y.length||1,80],["Ronda: conversar com 5 setores",Math.min(ho.size,5),5,50],["Sentar na arquibancada",j.seat&&j.seat.room==="arquibancada"?1:0,1,0]]};document.querySelectorAll("#tabs button").forEach(h=>h.onclick=()=>{document.querySelectorAll("#tabs button").forEach(y=>y.classList.toggle("on",y===h));let _=h.dataset.t;_==="campus"&&($t(),rt(-1)),_==="tarefas"&&Rn(`<h2>Tarefas</h2><div class="sub">${at(i[t].nome)} \xB7 toque em Confirmar quando estiver feito</div>`+i[t].bots.map(y=>qa(y).replace(/<div class="n">/g,`<div class="n"><small>${at(y.emo+" "+y.nome)}</small>`)).join("")+(Cn?"":'<div class="note">Dados de exemplo.</div>')),_==="missoes"&&Rn('<h2>Miss\xF5es do dia</h2><div class="sub">Recompensa s\xF3 com trabalho confirmado</div>'+cp().map(y=>`<div class="task"><div class="n">${at(y[0])}<small>${y[1]}/${y[2]} \xB7 +${y[3]} XP</small><div class="prog"><i style="width:${Math.round(y[1]/y[2]*100)}%"></i></div></div></div>`).join("")),_==="bots"&&(Rn(`<h2>Equipe</h2><div class="sub">${at(i[t].nome)}</div>`+rn.map(y=>`<div class="bot" data-id="${y.id}"><div class="av" style="background:${y.cor}33">${at(y.emo)}</div><div class="n" style="flex:1"><b>${at(y.nome)}</b><small style="display:block;color:var(--mut)">${at(y.papel)}</small></div><span class="d" style="width:10px;height:10px;border-radius:50%;background:${$a[y.st]}"></span></div>`).join("")),Pt.querySelectorAll(".bot").forEach(y=>y.onclick=()=>vs(rn.find(R=>R.id===y.dataset.id))),Cn?(Pt.insertAdjacentHTML("beforeend",'<div class="row"><button class="btn" id="addA">Adicionar \xE0 equipe</button></div>'),document.getElementById("addA").onclick=Np):Rp())}),document.querySelectorAll("#floors button").forEach(h=>h.onclick=()=>rt(+h.dataset.f)),document.querySelectorAll("#offices button[data-o]").forEach(h=>h.onclick=()=>{h.dataset.o!==t&&(t=h.dataset.o,document.querySelectorAll("#offices button").forEach(_=>_.classList.toggle("on",_===h)),$t(),Ii())});let lp=new ga,lo=0,dp=()=>rn.find(h=>h.tennis);addEventListener("resize",ru),ru(),(()=>{let h=new Date().getHours();return h>=18||h<6})()&&(a.background.set("#0b1630"),a.fog.color.set("#0b1630"),u.intensity=.5,u.color.set("#9db4ff"),a.children.find(h=>h.isHemisphereLight).intensity=.45,Le.forEach((h,_)=>{let y=new pa("#ffe7b0",40,40);y.position.set(0,3.4,0),h.add(y)}),Fe.color.set("#ffd58a"),Fe.opacity=.3,Fe.emissive=new ct("#ffb347"),Fe.emissiveIntensity=.35);let ou=[[],[],[]];for(let h=0;h<3;h++){let _=ou[h];for(let y of lt[h]){let R=y.s<0?-1.5:1.5;y.open||_.push([y.x0,R,y.cx-.9,R],[y.cx+.9,R,y.x1,R]),y.x0>Ce+.1&&!(h===0&&y.k==="lobby")&&_.push([y.x0,y.zA,y.x0,y.zB])}_.push([Ce,Ne,Be,Ne],[Ce,Ne,Ce,$],[Be,Ne,Be,$]),h===0?_.push([Ce,$,-4,$],[4,$,Be,$],[-4,1.55,-1.2,1.55],[1.2,1.55,4,1.55]):_.push([Ce,$,Be,$]),_.push([-3,Ne,-3,-1.5],[3,Ne,3,-1.5],[-3,-1.5,3,-1.5])}let gp=(h,_)=>h>Ce&&h<Be&&_>Ne&&_<$,Kn={x:0,y:0,on:!1},Ui=document.getElementById("joy"),cu=Ui.querySelector("i");Ui.addEventListener("pointerdown",h=>{Kn.on=!0,Ui.setPointerCapture(h.pointerId),lu(h),Ht(),it||hr()}),Ui.addEventListener("pointermove",h=>{Kn.on&&lu(h)});let hu=()=>{Kn.on=!1,Kn.x=Kn.y=0,cu.style.transform=""};Ui.addEventListener("pointerup",hu),Ui.addEventListener("pointercancel",hu);let Hn={};addEventListener("keydown",h=>{Hn[h.key.toLowerCase()]=!0}),addEventListener("keyup",h=>{Hn[h.key.toLowerCase()]=!1});let Ya=new L;document.getElementById("fol").onclick=()=>{it?(it=!1,document.getElementById("fol").classList.remove("on")):hr()};let Za=document.getElementById("act"),Ja=null,vp=0,ho=new Set,uu=!1,Ka=(h,_,y,R)=>Math.hypot(h.x-_,h.z-y)<R;Za.onclick=()=>{Ja&&Ja.fn(),du()};let Ep={la:["T\xF4 atrasado nisso, me d\xE1 uma for\xE7a?","Isso aqui venceu, preciso da sua decis\xE3o."],wa:["T\xE1 chegando o prazo, j\xE1 t\xF4 em cima.","Faltam poucos dias, vou fechar."],ok:["Tudo em dia por aqui!","Sem pend\xEAncia, chefe."]},Tp=vs;vs=function(h,_){if(Tp(h),Cn&&!h.pessoa&&Fp(h),_){let y=Ep[h.st];Pt.querySelector(".sub").insertAdjacentHTML("afterend",`<div class="say">\u201C${at(y[Math.floor(Math.random()*y.length)])}\u201D</div>`)}};let Qn=[],pu=()=>"jarvis.campus.pessoas."+t,uo=()=>{try{return JSON.parse(localStorage.getItem(pu())||"[]")}catch{return[]}},ec=h=>{try{localStorage.setItem(pu(),JSON.stringify(h))}catch{}},Ap=()=>[...new Set(Ye.filter(h=>h.scr&&!h.kaio).map(h=>h.room))],mu="https://qydpjcudcnirhybwlnhs.supabase.co",gu="sb_publishable_41C_vG_CaaYvwiNhyGb88A_yQgSwqC1",Vt=null,Cn=!1,_u=null,nc=[];try{Vt=ip(mu,gu,{auth:{persistSession:!0,storageKey:"jarvis.sb",autoRefreshToken:!0}})}catch{Vt=null}let dr=document.getElementById("mode"),Pp={atrasado:"la",chegando:"wa",no_prazo:"ok"},Ip={gestao:"coord",comercial:"marketing",dinheiro:"financeiro",manutencao:"operacoes",central:"ia",pessoal:"coord","smash-point":"tenis"},ic=h=>{let _=0;for(let y of String(h))_=_*31+y.charCodeAt(0)|0;return Math.abs(_)};async function Lp(){let[h,_,y,R,D,F]=await Promise.all([Vt.from("escritorios").select("id,nome,emoji,cor,tipo,ordem").order("ordem"),Vt.from("bots").select("id,nome,emoji,sala,tipo,cor,missao,modelo_slug,escritorio_id,area_id").eq("ativo",!0),Vt.from("itens_situacao").select("id,bot_id,titulo,prazo,xp,situacao,status,escritorio_id").eq("ativo",!0).in("situacao",["atrasado","chegando","no_prazo"]),Vt.from("respostas").select("item_id,resposta,extra,criado_em").order("criado_em",{ascending:!1}).limit(600),Vt.from("xp_eventos").select("pontos"),Vt.from("agente_modelos").select("slug,nome,emoji,divisao").order("nome")]);for(let B of[h,_,y,R])if(B.error)throw B.error;nc=D.data||[];let W={};(F&&F.data||[]).forEach(B=>{W[B.item_id]||(W[B.item_id]=B.resposta==="texto"||!B.resposta?B.extra||"":B.resposta)});for(let B of Object.keys(i))delete i[B];for(let B of h.data){let ge=/pessoal/i.test(B.nome)||B.tipo==="pessoal"?"pessoal":"escola";e[B.id]=e[ge];let Q={},ue=[];for(let Se of _.data.filter(je=>je.escritorio_id===B.id)){let je=Se.sala||Ip[Se.area_id]||"foco",_t=Se.nome+"|"+je,Ot=y.data.filter(Nt=>Nt.bot_id===Se.id&&Nt.status!=="fechado").map(Nt=>[Nt.titulo||"Sem t\xEDtulo",Pp[Nt.situacao]||"ok",Nt.xp||10,!1,Nt.id,Nt.prazo,Nt.status==="respondido"?String(W[Nt.id]||"respondida").slice(0,60):""]);if(Q[_t]){Q[_t].tarefas.push(...Ot),Q[_t].ids.push(Se.id);continue}let Vn=nc.find(Nt=>Nt.slug===Se.modelo_slug),Pn={id:Se.id,ids:[Se.id],nome:Se.nome,emo:Se.emoji||(Se.tipo==="pessoa"?"\u{1F464}":"\u{1F916}"),cor:Se.cor||E[ic(Se.id)%6],sala:je,tipo:Se.tipo||"bot",papel:Se.missao||(Vn?Vn.nome:Se.tipo==="pessoa"?"Equipe":"Agente"),tarefas:Ot,criado:Se.id.startsWith("app-")};Q[_t]=Pn,ue.push(Pn)}ue.forEach(Se=>{Se.tarefas.sort((je,_t)=>({la:0,wa:1,ok:2})[je[1]]-{la:0,wa:1,ok:2}[_t[1]]),Se.st=Se.tarefas.some(je=>je[1]==="la")?"la":Se.tarefas.some(je=>je[1]==="wa")?"wa":"ok"}),i[B.id]={nome:B.nome,placa:(ge==="escola"?"ESCOLA ":"")+B.nome.toUpperCase().replace(/^ESCOLA ESCOLA /,"ESCOLA "),kind:ge,bots:ue}}n=(R.data||[]).reduce((B,ge)=>B+(ge.pontos||0),0),i[t]||(t=Object.keys(i).find(B=>i[B].kind==="escola")||Object.keys(i)[0])}async function fr(){try{await sc(Lp(),9e3),Cn=!0,vu(),Ii(),co(),dr.style.display="none"}catch{Cn=!1,fo("N\xE3o consegui ler o banco agora. Mostrando exemplo.",{t:"Tentar de novo",fn:fr})}}async function Dp(){if(!Vt){fo("Modo demonstra\xE7\xE3o");return}let h=null;try{h=(await sc(Vt.auth.getSession(),4e3)).data.session}catch{h=null}if(h)return _u=h,fr();try{let _=await sc(fetch(mu+"/auth/v1/health",{headers:{apikey:gu}}),4e3);if(!_.ok&&_.status!==401)throw 0;fo("Modo demonstra\xE7\xE3o",{t:"Entrar",fn:Up})}catch{fo("Modo demonstra\xE7\xE3o \xB7 os dados reais abrem no app do Jarvis")}}async function Op(h,_,y){var B;if(!Cn||!_[4])return _[3]=!0,nu(_[2]),!0;y.disabled=!0,y.textContent="Salvando\u2026";let R=await Vt.rpc("campus_confirmar_item",{p_item:_[4],p_obs:"confirmado no campus"});if(R.error)return y.disabled=!1,y.textContent="Confirmar",It("N\xE3o salvou"),!1;_[3]=!0;let D=Math.floor(n/100)+1,F=Math.max(0,(R.data.xp_total||n)-n);n=(B=R.data.xp_total)!=null?B:n,co();let W=Math.floor(n/100)+1;return It(W>D?"N\xEDvel "+W+"!":F?"+"+F+" XP":"Confirmado"),!0}let rc=null;async function Fp(h){clearInterval(rc),Pt.insertAdjacentHTML("beforeend",`<div class="sub" style="margin-top:14px">Conversa com ${at(h.nome)}</div><div id="lc" class="lc"></div>
   <form id="lcf" class="lcf"><label style="flex:1;display:flex"><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Mensagem</span><input id="lci" maxlength="4000" autocomplete="off" placeholder="Escreva para ${at(h.nome)}"></label><button class="btn" type="submit">Enviar</button></form>`);let _=document.getElementById("lc"),y=async()=>{if(!document.getElementById("lc")){clearInterval(rc);return}let R=await Vt.from("conversa_mensagens").select("autor,texto,status,criado_em").in("bot_id",h.ids||[h.id]).order("criado_em",{ascending:!1}).limit(6);if(R.error)return;let D=R.data.reverse(),F=D[D.length-1],W=F&&F.autor==="kaio"&&["pendente","lendo"].includes(F.status);_.innerHTML=D.map(B=>`<div class="lb ${B.autor==="kaio"?"me":""}">${at(B.texto)}</div>`).join("")+(W?`<div class="lb w">${Date.now()-new Date(F.criado_em)>18e4?"Sem resposta ainda. O OpenBot responde com o computador ligado.":at(h.nome)+" est\xE1 lendo\u2026"}</div>`:"")||'<div class="note">Mande a primeira mensagem.</div>'};await y(),rc=setInterval(y,5e3),document.getElementById("lcf").onsubmit=async R=>{R.preventDefault();let D=document.getElementById("lci"),F=D.value.trim();if(!F)return;D.value="";let W=(await Vt.auth.getUser()).data.user;if((await Vt.from("conversa_mensagens").insert({user_id:W.id,bot_id:h.id,autor:"kaio",texto:F})).error){It("N\xE3o enviou"),D.value=F;return}y()}}async function kp(h){if(!Cn)return;if((await Vt.from("bots").update({ativo:!1}).in("id",h.ids||[h.id])).error){It("N\xE3o removeu");return}$t(),It(h.nome+" saiu da equipe"),fr()}Ii(),co(),setTimeout(Ht,7e3),Dp(),/\/campus\//.test(location.pathname)&&(document.getElementById("sair").hidden=!1);let Bp=f("#38bdf8",{emissive:"#0ea5e9",emissiveIntensity:.9}),zp=f("#1f2937");yu();let xu=document.getElementById("load");xu.style.opacity=0,setTimeout(()=>xu.remove(),700)}})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
