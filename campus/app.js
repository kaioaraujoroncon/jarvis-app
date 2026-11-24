(()=>{var Bp=Object.create;var po=Object.defineProperty;var zp=Object.getOwnPropertyDescriptor;var Hp=Object.getOwnPropertyNames;var Vp=Object.getPrototypeOf,Gp=Object.prototype.hasOwnProperty;var Wp=(i,t)=>()=>(i&&(t=i(i=0)),t);var Hn=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports),Xp=(i,t)=>{for(var e in t)po(i,e,{get:t[e],enumerable:!0})},xu=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Hp(t))!Gp.call(i,s)&&s!==e&&po(i,s,{get:()=>t[s],enumerable:!(n=zp(t,s))||n.enumerable});return i};var bu=(i,t,e)=>(e=i!=null?Bp(Vp(i)):{},xu(t||!i||!i.__esModule?po(e,"default",{value:i,enumerable:!0}):e,i)),qp=i=>xu(po({},"__esModule",{value:!0}),i);var ns={};Xp(ns,{Headers:()=>wh,Request:()=>ux,Response:()=>dx,default:()=>Sh,fetch:()=>hx});var lx,Ks,hx,Sh,wh,ux,dx,Ai=Wp(()=>{"use strict";lx=function(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("unable to locate global object")},Ks=lx(),hx=Ks.fetch,Sh=Ks.fetch.bind(Ks),wh=Ks.Headers,ux=Ks.Request,dx=Ks.Response});var ef=Hn(Th=>{"use strict";Object.defineProperty(Th,"__esModule",{value:!0});var Eh=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}};Th.default=Eh});var Rh=Hn(Br=>{"use strict";var nf=Br&&Br.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Br,"__esModule",{value:!0});var px=nf((Ai(),qp(ns))),mx=nf(ef()),Ah=class{constructor(t){this.shouldThrowOnError=!1,this.method=t.method,this.url=t.url,this.headers=t.headers,this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=t.shouldThrowOnError,this.signal=t.signal,this.isMaybeSingle=t.isMaybeSingle,t.fetch?this.fetch=t.fetch:typeof fetch=="undefined"?this.fetch=px.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=Object.assign({},this.headers),this.headers[t]=e,this}then(t,e){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),this.method!=="GET"&&this.method!=="HEAD"&&(this.headers["Content-Type"]="application/json");let n=this.fetch,s=n(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async r=>{var o,a,c;let l=null,h=null,d=null,f=r.status,p=r.statusText;if(r.ok){if(this.method!=="HEAD"){let m=await r.text();m===""||(this.headers.Accept==="text/csv"||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?h=m:h=JSON.parse(m))}let x=(o=this.headers.Prefer)===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),g=(a=r.headers.get("content-range"))===null||a===void 0?void 0:a.split("/");x&&g&&g.length>1&&(d=parseInt(g[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(h)&&(h.length>1?(l={code:"PGRST116",details:`Results contain ${h.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},h=null,d=null,f=406,p="Not Acceptable"):h.length===1?h=h[0]:h=null)}else{let x=await r.text();try{l=JSON.parse(x),Array.isArray(l)&&r.status===404&&(h=[],l=null,f=200,p="OK")}catch{r.status===404&&x===""?(f=204,p="No Content"):l={message:x}}if(l&&this.isMaybeSingle&&(!((c=l==null?void 0:l.details)===null||c===void 0)&&c.includes("0 rows"))&&(l=null,f=200,p="OK"),l&&this.shouldThrowOnError)throw new mx.default(l)}return{error:l,data:h,count:d,status:f,statusText:p}});return this.shouldThrowOnError||(s=s.catch(r=>{var o,a,c;return{error:{message:`${(o=r==null?void 0:r.name)!==null&&o!==void 0?o:"FetchError"}: ${r==null?void 0:r.message}`,details:`${(a=r==null?void 0:r.stack)!==null&&a!==void 0?a:""}`,hint:"",code:`${(c=r==null?void 0:r.code)!==null&&c!==void 0?c:""}`},data:null,count:null,status:0,statusText:""}})),s.then(t,e)}};Br.default=Ah});var Ph=Hn(zr=>{"use strict";var gx=zr&&zr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(zr,"__esModule",{value:!0});var _x=gx(Rh()),Ch=class extends _x.default{select(t){let e=!1,n=(t!=null?t:"*").split("").map(s=>/\s/.test(s)&&!e?"":(s==='"'&&(e=!e),s)).join("");return this.url.searchParams.set("select",n),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(t,{ascending:e=!0,nullsFirst:n,foreignTable:s,referencedTable:r=s}={}){let o=r?`${r}.order`:"order",a=this.url.searchParams.get(o);return this.url.searchParams.set(o,`${a?`${a},`:""}${t}.${e?"asc":"desc"}${n===void 0?"":n?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:n=e}={}){let s=typeof n=="undefined"?"limit":`${n}.limit`;return this.url.searchParams.set(s,`${t}`),this}range(t,e,{foreignTable:n,referencedTable:s=n}={}){let r=typeof s=="undefined"?"offset":`${s}.offset`,o=typeof s=="undefined"?"limit":`${s}.limit`;return this.url.searchParams.set(r,`${t}`),this.url.searchParams.set(o,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return this.method==="GET"?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:t=!1,verbose:e=!1,settings:n=!1,buffers:s=!1,wal:r=!1,format:o="text"}={}){var a;let c=[t?"analyze":null,e?"verbose":null,n?"settings":null,s?"buffers":null,r?"wal":null].filter(Boolean).join("|"),l=(a=this.headers.Accept)!==null&&a!==void 0?a:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${o}; for="${l}"; options=${c};`,o==="json"?this:this}rollback(){var t;return((t=this.headers.Prefer)!==null&&t!==void 0?t:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}};zr.default=Ch});var Ta=Hn(Hr=>{"use strict";var vx=Hr&&Hr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Hr,"__esModule",{value:!0});var yx=vx(Ph()),Ih=class extends yx.default{eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}in(t,e){let n=Array.from(new Set(e)).map(s=>typeof s=="string"&&new RegExp("[,()]").test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`in.(${n})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:n,type:s}={}){let r="";s==="plain"?r="pl":s==="phrase"?r="ph":s==="websearch"&&(r="w");let o=n===void 0?"":`(${n})`;return this.url.searchParams.append(t,`${r}fts${o}.${e}`),this}match(t){return Object.entries(t).forEach(([e,n])=>{this.url.searchParams.append(e,`eq.${n}`)}),this}not(t,e,n){return this.url.searchParams.append(t,`not.${e}.${n}`),this}or(t,{foreignTable:e,referencedTable:n=e}={}){let s=n?`${n}.or`:"or";return this.url.searchParams.append(s,`(${t})`),this}filter(t,e,n){return this.url.searchParams.append(t,`${e}.${n}`),this}};Hr.default=Ih});var Dh=Hn(Gr=>{"use strict";var xx=Gr&&Gr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Gr,"__esModule",{value:!0});var Vr=xx(Ta()),Lh=class{constructor(t,{headers:e={},schema:n,fetch:s}){this.url=t,this.headers=e,this.schema=n,this.fetch=s}select(t,{head:e=!1,count:n}={}){let s=e?"HEAD":"GET",r=!1,o=(t!=null?t:"*").split("").map(a=>/\s/.test(a)&&!r?"":(a==='"'&&(r=!r),a)).join("");return this.url.searchParams.set("select",o),n&&(this.headers.Prefer=`count=${n}`),new Vr.default({method:s,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(t,{count:e,defaultToNull:n=!0}={}){let s="POST",r=[];if(this.headers.Prefer&&r.push(this.headers.Prefer),e&&r.push(`count=${e}`),n||r.push("missing=default"),this.headers.Prefer=r.join(","),Array.isArray(t)){let o=t.reduce((a,c)=>a.concat(Object.keys(c)),[]);if(o.length>0){let a=[...new Set(o)].map(c=>`"${c}"`);this.url.searchParams.set("columns",a.join(","))}}return new Vr.default({method:s,url:this.url,headers:this.headers,schema:this.schema,body:t,fetch:this.fetch,allowEmpty:!1})}upsert(t,{onConflict:e,ignoreDuplicates:n=!1,count:s,defaultToNull:r=!0}={}){let o="POST",a=[`resolution=${n?"ignore":"merge"}-duplicates`];if(e!==void 0&&this.url.searchParams.set("on_conflict",e),this.headers.Prefer&&a.push(this.headers.Prefer),s&&a.push(`count=${s}`),r||a.push("missing=default"),this.headers.Prefer=a.join(","),Array.isArray(t)){let c=t.reduce((l,h)=>l.concat(Object.keys(h)),[]);if(c.length>0){let l=[...new Set(c)].map(h=>`"${h}"`);this.url.searchParams.set("columns",l.join(","))}}return new Vr.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:t,fetch:this.fetch,allowEmpty:!1})}update(t,{count:e}={}){let n="PATCH",s=[];return this.headers.Prefer&&s.push(this.headers.Prefer),e&&s.push(`count=${e}`),this.headers.Prefer=s.join(","),new Vr.default({method:n,url:this.url,headers:this.headers,schema:this.schema,body:t,fetch:this.fetch,allowEmpty:!1})}delete({count:t}={}){let e="DELETE",n=[];return t&&n.push(`count=${t}`),this.headers.Prefer&&n.unshift(this.headers.Prefer),this.headers.Prefer=n.join(","),new Vr.default({method:e,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}};Gr.default=Lh});var sf=Hn(Aa=>{"use strict";Object.defineProperty(Aa,"__esModule",{value:!0});Aa.version=void 0;Aa.version="0.0.0-automated"});var rf=Hn(Ra=>{"use strict";Object.defineProperty(Ra,"__esModule",{value:!0});Ra.DEFAULT_HEADERS=void 0;var bx=sf();Ra.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${bx.version}`}});var af=Hn(Wr=>{"use strict";var of=Wr&&Wr.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Wr,"__esModule",{value:!0});var Mx=of(Dh()),Sx=of(Ta()),wx=rf(),Uh=class i{constructor(t,{headers:e={},schema:n,fetch:s}={}){this.url=t,this.headers=Object.assign(Object.assign({},wx.DEFAULT_HEADERS),e),this.schemaName=n,this.fetch=s}from(t){let e=new URL(`${this.url}/${t}`);return new Mx.default(e,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(t){return new i(this.url,{headers:this.headers,schema:t,fetch:this.fetch})}rpc(t,e={},{head:n=!1,get:s=!1,count:r}={}){let o,a=new URL(`${this.url}/rpc/${t}`),c;n||s?(o=n?"HEAD":"GET",Object.entries(e).filter(([h,d])=>d!==void 0).map(([h,d])=>[h,Array.isArray(d)?`{${d.join(",")}}`:`${d}`]).forEach(([h,d])=>{a.searchParams.append(h,d)})):(o="POST",c=e);let l=Object.assign({},this.headers);return r&&(l.Prefer=`count=${r}`),new Sx.default({method:o,url:a,headers:l,schema:this.schemaName,body:c,fetch:this.fetch,allowEmpty:!1})}};Wr.default=Uh});var ff=Hn(tn=>{"use strict";var Xr=tn&&tn.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(tn,"__esModule",{value:!0});tn.PostgrestBuilder=tn.PostgrestTransformBuilder=tn.PostgrestFilterBuilder=tn.PostgrestQueryBuilder=tn.PostgrestClient=void 0;var cf=Xr(af());tn.PostgrestClient=cf.default;var lf=Xr(Dh());tn.PostgrestQueryBuilder=lf.default;var hf=Xr(Ta());tn.PostgrestFilterBuilder=hf.default;var uf=Xr(Ph());tn.PostgrestTransformBuilder=uf.default;var df=Xr(Rh());tn.PostgrestBuilder=df.default;tn.default={PostgrestClient:cf.default,PostgrestQueryBuilder:lf.default,PostgrestFilterBuilder:hf.default,PostgrestTransformBuilder:uf.default,PostgrestBuilder:df.default}});var Mf=Hn((nM,bf)=>{"use strict";bf.exports=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")}});var lh="170",Qi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ts={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},$p=0,Mu=1,jp=2;var Id=1,hh=2,ni=3,Ei=0,on=1,Dn=2,Si=0,Ns=1,Su=2,wu=3,Eu=4,Yp=5,Hi=100,Zp=101,Jp=102,Kp=103,Qp=104,tm=200,em=201,nm=202,im=203,Bc=204,zc=205,sm=206,rm=207,om=208,am=209,cm=210,lm=211,hm=212,um=213,dm=214,Hc=0,Vc=1,Gc=2,zs=3,Wc=4,Xc=5,qc=6,$c=7,Ld=0,fm=1,pm=2,wi=0,mm=1,gm=2,_m=3,uh=4,vm=5,ym=6,xm=7;var Dd=300,Hs=301,Vs=302,jc=303,Yc=304,ya=306,Zc=1e3,Wi=1001,Jc=1002,On=1003,bm=1004;var mo=1005;var Gn=1006,oc=1007;var Xi=1008;var oi=1009,Ud=1010,Od=1011,Tr=1012,dh=1013,qi=1014,ii=1015,Nr=1016,fh=1017,ph=1018,Gs=1020,Nd=35902,Fd=1021,kd=1022,Un=1023,Bd=1024,zd=1025,Fs=1026,Ws=1027,Hd=1028,mh=1029,Vd=1030,gh=1031;var _h=1033,ko=33776,Bo=33777,zo=33778,Ho=33779,Kc=35840,Qc=35841,tl=35842,el=35843,nl=36196,il=37492,sl=37496,rl=37808,ol=37809,al=37810,cl=37811,ll=37812,hl=37813,ul=37814,dl=37815,fl=37816,pl=37817,ml=37818,gl=37819,_l=37820,vl=37821,Vo=36492,yl=36494,xl=36495,Gd=36283,bl=36284,Ml=36285,Sl=36286;var Go=2300,wl=2301,ac=2302,Tu=2400,Au=2401,Ru=2402;var Mm=3200,Sm=3201;var Wd=0,wm=1,Mi="",$e="srgb",Ys="srgb-linear",xa="linear",_e="srgb";var xs=7680;var Cu=519,Em=512,Tm=513,Am=514,Xd=515,Rm=516,Cm=517,Pm=518,Im=519,Pu=35044;var Iu="300 es",si=2e3,Wo=2001,ai=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lu=1234567,br=Math.PI/180,Ar=180/Math.PI;function Zs(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xe[i&255]+Xe[i>>8&255]+Xe[i>>16&255]+Xe[i>>24&255]+"-"+Xe[t&255]+Xe[t>>8&255]+"-"+Xe[t>>16&15|64]+Xe[t>>24&255]+"-"+Xe[e&63|128]+Xe[e>>8&255]+"-"+Xe[e>>16&255]+Xe[e>>24&255]+Xe[n&255]+Xe[n>>8&255]+Xe[n>>16&255]+Xe[n>>24&255]).toLowerCase()}function Oe(i,t,e){return Math.max(t,Math.min(e,i))}function vh(i,t){return(i%t+t)%t}function Lm(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Dm(i,t,e){return i!==t?(e-i)/(t-i):0}function Mr(i,t,e){return(1-e)*i+e*t}function Um(i,t,e,n){return Mr(i,t,1-Math.exp(-e*n))}function Om(i,t=1){return t-Math.abs(vh(i,t*2)-t)}function Nm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Fm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function km(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Bm(i,t){return i+Math.random()*(t-i)}function zm(i){return i*(.5-Math.random())}function Hm(i){i!==void 0&&(Lu=i);let t=Lu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Vm(i){return i*br}function Gm(i){return i*Ar}function Wm(i){return(i&i-1)===0&&i!==0}function Xm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function qm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function $m(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),f=o((t-n)/2),p=r((n-t)/2),_=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*d,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*d,a*l);break;case"ZXZ":i.set(c*d,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*_,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*_,a*l);break;case"ZYZ":i.set(c*_,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Us(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ze(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var es={DEG2RAD:br,RAD2DEG:Ar,generateUUID:Zs,clamp:Oe,euclideanModulo:vh,mapLinear:Lm,inverseLerp:Dm,lerp:Mr,damp:Um,pingpong:Om,smoothstep:Nm,smootherstep:Fm,randInt:km,randFloat:Bm,randFloatSpread:zm,seededRandom:Hm,degToRad:Vm,radToDeg:Gm,isPowerOfTwo:Wm,ceilPowerOfTwo:Xm,floorPowerOfTwo:qm,setQuaternionFromProperEuler:$m,normalize:Ze,denormalize:Us},_t=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],f=n[2],p=n[5],_=n[8],x=s[0],g=s[3],m=s[6],T=s[1],E=s[4],M=s[7],N=s[2],I=s[5],D=s[8];return r[0]=o*x+a*T+c*N,r[3]=o*g+a*E+c*I,r[6]=o*m+a*M+c*D,r[1]=l*x+h*T+d*N,r[4]=l*g+h*E+d*I,r[7]=l*m+h*M+d*D,r[2]=f*x+p*T+_*N,r[5]=f*g+p*E+_*I,r[8]=f*m+p*M+_*D,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,f=a*c-h*r,p=l*r-o*c,_=e*d+n*f+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/_;return t[0]=d*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=f*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(cc.makeScale(t,e)),this}rotate(t){return this.premultiply(cc.makeRotation(-t)),this}translate(t,e){return this.premultiply(cc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},cc=new Qt;function qd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Xo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function jm(){let i=Xo("canvas");return i.style.display="block",i}var Du={};function yr(i){i in Du||(Du[i]=!0,console.warn(i))}function Ym(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Zm(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Jm(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var ue={enabled:!0,workingColorSpace:Ys,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===_e&&(i.r=ri(i.r),i.g=ri(i.g),i.b=ri(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===_e&&(i.r=ks(i.r),i.g=ks(i.g),i.b=ks(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Mi?xa:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ks(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Uu=[.64,.33,.3,.6,.15,.06],Ou=[.2126,.7152,.0722],Nu=[.3127,.329],Fu=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ku=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ue.define({[Ys]:{primaries:Uu,whitePoint:Nu,transfer:xa,toXYZ:Fu,fromXYZ:ku,luminanceCoefficients:Ou,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:Uu,whitePoint:Nu,transfer:_e,toXYZ:Fu,fromXYZ:ku,luminanceCoefficients:Ou,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}});var bs,El=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{bs===void 0&&(bs=Xo("canvas")),bs.width=t.width,bs.height=t.height;let n=bs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=bs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Xo("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ri(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ri(e[n]/255)*255):e[n]=ri(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Km=0,qo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=Zs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(lc(s[o].image)):r.push(lc(s[o]))}else r=lc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function lc(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?El.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Qm=0,Ke=class i extends ai{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Wi,s=Wi,r=Gn,o=Xi,a=Un,c=oi,l=i.DEFAULT_ANISOTROPY,h=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=Zs(),this.name="",this.source=new qo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Dd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zc:t.x=t.x-Math.floor(t.x);break;case Wi:t.x=t.x<0?0:1;break;case Jc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zc:t.y=t.y-Math.floor(t.y);break;case Wi:t.y=t.y<0?0:1;break;case Jc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=Dd;Ke.DEFAULT_ANISOTROPY=1;var ve=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],d=c[8],f=c[1],p=c[5],_=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(h-f)<.01&&Math.abs(d-x)<.01&&Math.abs(_-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+x)<.1&&Math.abs(_+g)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(l+1)/2,M=(p+1)/2,N=(m+1)/2,I=(h+f)/4,D=(d+x)/4,P=(_+g)/4;return E>M&&E>N?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=I/n,r=D/n):M>N?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=I/s,r=P/s):N<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(N),n=D/r,s=P/r),this.set(n,s,r,e),this}let T=Math.sqrt((g-_)*(g-_)+(d-x)*(d-x)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(g-_)/T,this.y=(d-x)/T,this.z=(f-h)/T,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Tl=class extends ai{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Ke(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new qo(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ci=class extends Tl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},$o=class extends Ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=On,this.minFilter=On,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Al=class extends Ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=On,this.minFilter=On,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Nn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],f=r[o+0],p=r[o+1],_=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=_,t[e+3]=x;return}if(d!==x||c!==f||l!==p||h!==_){let g=1-a,m=c*f+l*p+h*_+d*x,T=m>=0?1:-1,E=1-m*m;if(E>Number.EPSILON){let N=Math.sqrt(E),I=Math.atan2(N,m*T);g=Math.sin(g*I)/N,a=Math.sin(a*I)/N}let M=a*T;if(c=c*g+f*M,l=l*g+p*M,h=h*g+_*M,d=d*g+x*M,g===1-a){let N=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=N,l*=N,h*=N,d*=N}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[o],f=r[o+1],p=r[o+2],_=r[o+3];return t[e]=a*_+h*d+c*p-l*f,t[e+1]=c*_+h*f+l*d-a*p,t[e+2]=l*_+h*p+a*f-c*d,t[e+3]=h*_-a*d-c*f-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),d=a(r/2),f=c(n/2),p=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=f*h*d+l*p*_,this._y=l*p*d-f*h*_,this._z=l*h*_+f*p*d,this._w=l*h*d-f*p*_;break;case"YXZ":this._x=f*h*d+l*p*_,this._y=l*p*d-f*h*_,this._z=l*h*_-f*p*d,this._w=l*h*d+f*p*_;break;case"ZXY":this._x=f*h*d-l*p*_,this._y=l*p*d+f*h*_,this._z=l*h*_+f*p*d,this._w=l*h*d-f*p*_;break;case"ZYX":this._x=f*h*d-l*p*_,this._y=l*p*d+f*h*_,this._z=l*h*_-f*p*d,this._w=l*h*d+f*p*_;break;case"YZX":this._x=f*h*d+l*p*_,this._y=l*p*d+f*h*_,this._z=l*h*_-f*p*d,this._w=l*h*d-f*p*_;break;case"XZY":this._x=f*h*d-l*p*_,this._y=l*p*d-f*h*_,this._z=l*h*_+f*p*d,this._w=l*h*d+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],f=n+a+d;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>d){let p=2*Math.sqrt(1+n-a-d);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>d){let p=2*Math.sqrt(1+a-n-d);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Oe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Bu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Bu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=s+c*d+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return hc.copy(this).projectOnVector(t),this.sub(hc)}reflect(t){return this.sub(hc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},hc=new L,Bu=new Nn,$i=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Cn):Cn.fromBufferAttribute(r,o),Cn.applyMatrix4(t.matrixWorld),this.expandByPoint(Cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),go.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),go.copy(n.boundingBox)),go.applyMatrix4(t.matrixWorld),this.union(go)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Cn),Cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(pr),_o.subVectors(this.max,pr),Ms.subVectors(t.a,pr),Ss.subVectors(t.b,pr),ws.subVectors(t.c,pr),gi.subVectors(Ss,Ms),_i.subVectors(ws,Ss),Ui.subVectors(Ms,ws);let e=[0,-gi.z,gi.y,0,-_i.z,_i.y,0,-Ui.z,Ui.y,gi.z,0,-gi.x,_i.z,0,-_i.x,Ui.z,0,-Ui.x,-gi.y,gi.x,0,-_i.y,_i.x,0,-Ui.y,Ui.x,0];return!uc(e,Ms,Ss,ws,_o)||(e=[1,0,0,0,1,0,0,0,1],!uc(e,Ms,Ss,ws,_o))?!1:(vo.crossVectors(gi,_i),e=[vo.x,vo.y,vo.z],uc(e,Ms,Ss,ws,_o))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Jn=[new L,new L,new L,new L,new L,new L,new L,new L],Cn=new L,go=new $i,Ms=new L,Ss=new L,ws=new L,gi=new L,_i=new L,Ui=new L,pr=new L,_o=new L,vo=new L,Oi=new L;function uc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Oi.fromArray(i,r);let a=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),c=t.dot(Oi),l=e.dot(Oi),h=n.dot(Oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var tg=new $i,mr=new L,dc=new L,Rr=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):tg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;mr.subVectors(t,this.center);let e=mr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(mr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(dc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(mr.copy(t.center).add(dc)),this.expandByPoint(mr.copy(t.center).sub(dc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Kn=new L,fc=new L,yo=new L,vi=new L,pc=new L,xo=new L,mc=new L,Xs=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Kn.copy(this.origin).addScaledVector(this.direction,e),Kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){fc.copy(t).add(e).multiplyScalar(.5),yo.copy(e).sub(t).normalize(),vi.copy(this.origin).sub(fc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(yo),a=vi.dot(this.direction),c=-vi.dot(yo),l=vi.lengthSq(),h=Math.abs(1-o*o),d,f,p,_;if(h>0)if(d=o*c-a,f=o*a-c,_=r*h,d>=0)if(f>=-_)if(f<=_){let x=1/h;d*=x,f*=x,p=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;else f<=-_?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+f*(f+2*c)+l):f<=_?(d=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+f*(f+2*c)+l);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(fc).addScaledVector(yo,f),p}intersectSphere(t,e){Kn.subVectors(t.center,this.origin);let n=Kn.dot(this.direction),s=Kn.dot(Kn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-f.z)*d,c=(t.max.z-f.z)*d):(a=(t.max.z-f.z)*d,c=(t.min.z-f.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Kn)!==null}intersectTriangle(t,e,n,s,r){pc.subVectors(e,t),xo.subVectors(n,t),mc.crossVectors(pc,xo);let o=this.direction.dot(mc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;vi.subVectors(this.origin,t);let c=a*this.direction.dot(xo.crossVectors(vi,xo));if(c<0)return null;let l=a*this.direction.dot(pc.cross(vi));if(l<0||c+l>o)return null;let h=-a*vi.dot(mc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ce=class i{constructor(t,e,n,s,r,o,a,c,l,h,d,f,p,_,x,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,d,f,p,_,x,g)}set(t,e,n,s,r,o,a,c,l,h,d,f,p,_,x,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=f,m[3]=p,m[7]=_,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Es.setFromMatrixColumn(t,0).length(),r=1/Es.setFromMatrixColumn(t,1).length(),o=1/Es.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let f=o*h,p=o*d,_=a*h,x=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=p+_*l,e[5]=f-x*l,e[9]=-a*c,e[2]=x-f*l,e[6]=_+p*l,e[10]=o*c}else if(t.order==="YXZ"){let f=c*h,p=c*d,_=l*h,x=l*d;e[0]=f+x*a,e[4]=_*a-p,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=p*a-_,e[6]=x+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*h,p=c*d,_=l*h,x=l*d;e[0]=f-x*a,e[4]=-o*d,e[8]=_+p*a,e[1]=p+_*a,e[5]=o*h,e[9]=x-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*h,p=o*d,_=a*h,x=a*d;e[0]=c*h,e[4]=_*l-p,e[8]=f*l+x,e[1]=c*d,e[5]=x*l+f,e[9]=p*l-_,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,p=o*l,_=a*c,x=a*l;e[0]=c*h,e[4]=x-f*d,e[8]=_*d+p,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*d+_,e[10]=f-x*d}else if(t.order==="XZY"){let f=o*c,p=o*l,_=a*c,x=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=f*d+x,e[5]=o*h,e[9]=p*d-_,e[2]=_*d-p,e[6]=a*h,e[10]=x*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(eg,t,ng)}lookAt(t,e,n){let s=this.elements;return fn.subVectors(t,e),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),yi.crossVectors(n,fn),yi.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),yi.crossVectors(n,fn)),yi.normalize(),bo.crossVectors(fn,yi),s[0]=yi.x,s[4]=bo.x,s[8]=fn.x,s[1]=yi.y,s[5]=bo.y,s[9]=fn.y,s[2]=yi.z,s[6]=bo.z,s[10]=fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],f=n[9],p=n[13],_=n[2],x=n[6],g=n[10],m=n[14],T=n[3],E=n[7],M=n[11],N=n[15],I=s[0],D=s[4],P=s[8],A=s[12],S=s[1],O=s[5],J=s[9],j=s[13],nt=s[2],ct=s[6],K=s[10],dt=s[14],tt=s[3],gt=s[7],Et=s[11],Rt=s[15];return r[0]=o*I+a*S+c*nt+l*tt,r[4]=o*D+a*O+c*ct+l*gt,r[8]=o*P+a*J+c*K+l*Et,r[12]=o*A+a*j+c*dt+l*Rt,r[1]=h*I+d*S+f*nt+p*tt,r[5]=h*D+d*O+f*ct+p*gt,r[9]=h*P+d*J+f*K+p*Et,r[13]=h*A+d*j+f*dt+p*Rt,r[2]=_*I+x*S+g*nt+m*tt,r[6]=_*D+x*O+g*ct+m*gt,r[10]=_*P+x*J+g*K+m*Et,r[14]=_*A+x*j+g*dt+m*Rt,r[3]=T*I+E*S+M*nt+N*tt,r[7]=T*D+E*O+M*ct+N*gt,r[11]=T*P+E*J+M*K+N*Et,r[15]=T*A+E*j+M*dt+N*Rt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],f=t[10],p=t[14],_=t[3],x=t[7],g=t[11],m=t[15];return _*(+r*c*d-s*l*d-r*a*f+n*l*f+s*a*p-n*c*p)+x*(+e*c*p-e*l*f+r*o*f-s*o*p+s*l*h-r*c*h)+g*(+e*l*d-e*a*p-r*o*d+n*o*p+r*a*h-n*l*h)+m*(-s*a*h-e*c*d+e*a*f+s*o*d-n*o*f+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],f=t[10],p=t[11],_=t[12],x=t[13],g=t[14],m=t[15],T=d*g*l-x*f*l+x*c*p-a*g*p-d*c*m+a*f*m,E=_*f*l-h*g*l-_*c*p+o*g*p+h*c*m-o*f*m,M=h*x*l-_*d*l+_*a*p-o*x*p-h*a*m+o*d*m,N=_*d*c-h*x*c-_*a*f+o*x*f+h*a*g-o*d*g,I=e*T+n*E+s*M+r*N;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/I;return t[0]=T*D,t[1]=(x*f*r-d*g*r-x*s*p+n*g*p+d*s*m-n*f*m)*D,t[2]=(a*g*r-x*c*r+x*s*l-n*g*l-a*s*m+n*c*m)*D,t[3]=(d*c*r-a*f*r-d*s*l+n*f*l+a*s*p-n*c*p)*D,t[4]=E*D,t[5]=(h*g*r-_*f*r+_*s*p-e*g*p-h*s*m+e*f*m)*D,t[6]=(_*c*r-o*g*r-_*s*l+e*g*l+o*s*m-e*c*m)*D,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*p+e*c*p)*D,t[8]=M*D,t[9]=(_*d*r-h*x*r-_*n*p+e*x*p+h*n*m-e*d*m)*D,t[10]=(o*x*r-_*a*r+_*n*l-e*x*l-o*n*m+e*a*m)*D,t[11]=(h*a*r-o*d*r-h*n*l+e*d*l+o*n*p-e*a*p)*D,t[12]=N*D,t[13]=(h*x*s-_*d*s+_*n*f-e*x*f-h*n*g+e*d*g)*D,t[14]=(_*a*s-o*x*s-_*n*c+e*x*c+o*n*g-e*a*g)*D,t[15]=(o*d*s-h*a*s+h*n*c-e*d*c-o*n*f+e*a*f)*D,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,d=a+a,f=r*l,p=r*h,_=r*d,x=o*h,g=o*d,m=a*d,T=c*l,E=c*h,M=c*d,N=n.x,I=n.y,D=n.z;return s[0]=(1-(x+m))*N,s[1]=(p+M)*N,s[2]=(_-E)*N,s[3]=0,s[4]=(p-M)*I,s[5]=(1-(f+m))*I,s[6]=(g+T)*I,s[7]=0,s[8]=(_+E)*D,s[9]=(g-T)*D,s[10]=(1-(f+x))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Es.set(s[0],s[1],s[2]).length(),o=Es.set(s[4],s[5],s[6]).length(),a=Es.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Pn.copy(this);let l=1/r,h=1/o,d=1/a;return Pn.elements[0]*=l,Pn.elements[1]*=l,Pn.elements[2]*=l,Pn.elements[4]*=h,Pn.elements[5]*=h,Pn.elements[6]*=h,Pn.elements[8]*=d,Pn.elements[9]*=d,Pn.elements[10]*=d,e.setFromRotationMatrix(Pn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=si){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s),p,_;if(a===si)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Wo)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=si){let c=this.elements,l=1/(e-t),h=1/(n-s),d=1/(o-r),f=(e+t)*l,p=(n+s)*h,_,x;if(a===si)_=(o+r)*d,x=-2*d;else if(a===Wo)_=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Es=new L,Pn=new Ce,eg=new L(0,0,0),ng=new L(1,1,1),yi=new L,bo=new L,fn=new L,zu=new Ce,Hu=new Nn,Wn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],d=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Oe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Oe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Oe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return zu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Hu.setFromEuler(this),this.setFromQuaternion(Hu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wn.DEFAULT_ORDER="XYZ";var Cr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ig=0,Vu=new L,Ts=new Nn,Qn=new Ce,Mo=new L,gr=new L,sg=new L,rg=new Nn,Gu=new L(1,0,0),Wu=new L(0,1,0),Xu=new L(0,0,1),qu={type:"added"},og={type:"removed"},As={type:"childadded",child:null},gc={type:"childremoved",child:null},Qe=class i extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ig++}),this.uuid=Zs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new Wn,n=new Nn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ce},normalMatrix:{value:new Qt}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ts.setFromAxisAngle(t,e),this.quaternion.multiply(Ts),this}rotateOnWorldAxis(t,e){return Ts.setFromAxisAngle(t,e),this.quaternion.premultiply(Ts),this}rotateX(t){return this.rotateOnAxis(Gu,t)}rotateY(t){return this.rotateOnAxis(Wu,t)}rotateZ(t){return this.rotateOnAxis(Xu,t)}translateOnAxis(t,e){return Vu.copy(t).applyQuaternion(this.quaternion),this.position.add(Vu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Gu,t)}translateY(t){return this.translateOnAxis(Wu,t)}translateZ(t){return this.translateOnAxis(Xu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Mo.copy(t):Mo.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(gr,Mo,this.up):Qn.lookAt(Mo,gr,this.up),this.quaternion.setFromRotationMatrix(Qn),s&&(Qn.extractRotation(s.matrixWorld),Ts.setFromRotationMatrix(Qn),this.quaternion.premultiply(Ts.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(qu),As.child=t,this.dispatchEvent(As),As.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(og),gc.child=t,this.dispatchEvent(gc),gc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(qu),As.child=t,this.dispatchEvent(As),As.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,t,sg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,rg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),f=o(t.skeletons),p=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Qe.DEFAULT_UP=new L(0,1,0);Qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var In=new L,ti=new L,_c=new L,ei=new L,Rs=new L,Cs=new L,$u=new L,vc=new L,yc=new L,xc=new L,bc=new ve,Mc=new ve,Sc=new ve,Vi=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),In.subVectors(t,e),s.cross(In);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){In.subVectors(s,e),ti.subVectors(n,e),_c.subVectors(t,e);let o=In.dot(In),a=In.dot(ti),c=In.dot(_c),l=ti.dot(ti),h=ti.dot(_c),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let f=1/d,p=(l*c-a*h)*f,_=(o*h-a*c)*f;return r.set(1-p-_,_,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,ei)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ei.x),c.addScaledVector(o,ei.y),c.addScaledVector(a,ei.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return bc.setScalar(0),Mc.setScalar(0),Sc.setScalar(0),bc.fromBufferAttribute(t,e),Mc.fromBufferAttribute(t,n),Sc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(bc,r.x),o.addScaledVector(Mc,r.y),o.addScaledVector(Sc,r.z),o}static isFrontFacing(t,e,n,s){return In.subVectors(n,e),ti.subVectors(t,e),In.cross(ti).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return In.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),In.cross(ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Rs.subVectors(s,n),Cs.subVectors(r,n),vc.subVectors(t,n);let c=Rs.dot(vc),l=Cs.dot(vc);if(c<=0&&l<=0)return e.copy(n);yc.subVectors(t,s);let h=Rs.dot(yc),d=Cs.dot(yc);if(h>=0&&d<=h)return e.copy(s);let f=c*d-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Rs,o);xc.subVectors(t,r);let p=Rs.dot(xc),_=Cs.dot(xc);if(_>=0&&p<=_)return e.copy(r);let x=p*l-c*_;if(x<=0&&l>=0&&_<=0)return a=l/(l-_),e.copy(n).addScaledVector(Cs,a);let g=h*_-p*d;if(g<=0&&d-h>=0&&p-_>=0)return $u.subVectors(r,s),a=(d-h)/(d-h+(p-_)),e.copy(s).addScaledVector($u,a);let m=1/(g+x+f);return o=x*m,a=f*m,e.copy(n).addScaledVector(Rs,o).addScaledVector(Cs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},$d={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},So={h:0,s:0,l:0};function wc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var oe=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ue.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ue.workingColorSpace){return this.r=t,this.g=e,this.b=n,ue.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ue.workingColorSpace){if(t=vh(t,1),e=Oe(e,0,1),n=Oe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=wc(o,r,t+1/3),this.g=wc(o,r,t),this.b=wc(o,r,t-1/3)}return ue.toWorkingColorSpace(this,s),this}setStyle(t,e=$e){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){let n=$d[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ri(t.r),this.g=ri(t.g),this.b=ri(t.b),this}copyLinearToSRGB(t){return this.r=ks(t.r),this.g=ks(t.g),this.b=ks(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return ue.fromWorkingColorSpace(qe.copy(this),t),Math.round(Oe(qe.r*255,0,255))*65536+Math.round(Oe(qe.g*255,0,255))*256+Math.round(Oe(qe.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ue.workingColorSpace){ue.fromWorkingColorSpace(qe.copy(this),e);let n=qe.r,s=qe.g,r=qe.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ue.workingColorSpace){return ue.fromWorkingColorSpace(qe.copy(this),e),t.r=qe.r,t.g=qe.g,t.b=qe.b,t}getStyle(t=$e){ue.fromWorkingColorSpace(qe.copy(this),t);let e=qe.r,n=qe.g,s=qe.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(xi),this.setHSL(xi.h+t,xi.s+e,xi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(xi),t.getHSL(So);let n=Mr(xi.h,So.h,e),s=Mr(xi.s,So.s,e),r=Mr(xi.l,So.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qe=new oe;oe.NAMES=$d;var ag=0,ji=class extends ai{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ag++}),this.uuid=Zs(),this.name="",this.blending=Ns,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bc,this.blendDst=zc,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new oe(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xs,this.stencilZFail=xs,this.stencilZPass=xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ns&&(n.blending=this.blending),this.side!==Ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Bc&&(n.blendSrc=this.blendSrc),this.blendDst!==zc&&(n.blendDst=this.blendDst),this.blendEquation!==Hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},bn=class extends ji{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Ld,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ie=new L,wo=new _t,xn=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Pu,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)wo.fromBufferAttribute(this,e),wo.applyMatrix3(t),this.setXY(e,wo.x,wo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Us(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ze(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Us(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Us(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Us(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Us(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),n=Ze(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),n=Ze(n,this.array),s=Ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),n=Ze(n,this.array),s=Ze(s,this.array),r=Ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Pu&&(t.usage=this.usage),t}};var jo=class extends xn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Yo=class extends xn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var pe=class extends xn{constructor(t,e,n){super(new Float32Array(t),e,n)}},cg=0,yn=new Ce,Ec=new Qe,Ps=new L,pn=new $i,_r=new $i,He=new L,an=class i extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cg++}),this.uuid=Zs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qd(t)?Yo:jo)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return yn.makeRotationFromQuaternion(t),this.applyMatrix4(yn),this}rotateX(t){return yn.makeRotationX(t),this.applyMatrix4(yn),this}rotateY(t){return yn.makeRotationY(t),this.applyMatrix4(yn),this}rotateZ(t){return yn.makeRotationZ(t),this.applyMatrix4(yn),this}translate(t,e,n){return yn.makeTranslation(t,e,n),this.applyMatrix4(yn),this}scale(t,e,n){return yn.makeScale(t,e,n),this.applyMatrix4(yn),this}lookAt(t){return Ec.lookAt(t),Ec.updateMatrix(),this.applyMatrix4(Ec.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pe(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];pn.setFromBufferAttribute(r),this.morphTargetsRelative?(He.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(He),He.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(He)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(pn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];_r.setFromBufferAttribute(a),this.morphTargetsRelative?(He.addVectors(pn.min,_r.min),pn.expandByPoint(He),He.addVectors(pn.max,_r.max),pn.expandByPoint(He)):(pn.expandByPoint(_r.min),pn.expandByPoint(_r.max))}pn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)He.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(He));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)He.fromBufferAttribute(a,l),c&&(Ps.fromBufferAttribute(t,l),He.add(Ps)),s=Math.max(s,n.distanceToSquared(He))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new L,c[P]=new L;let l=new L,h=new L,d=new L,f=new _t,p=new _t,_=new _t,x=new L,g=new L;function m(P,A,S){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,A),d.fromBufferAttribute(n,S),f.fromBufferAttribute(r,P),p.fromBufferAttribute(r,A),_.fromBufferAttribute(r,S),h.sub(l),d.sub(l),p.sub(f),_.sub(f);let O=1/(p.x*_.y-_.x*p.y);isFinite(O)&&(x.copy(h).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(O),g.copy(d).multiplyScalar(p.x).addScaledVector(h,-_.x).multiplyScalar(O),a[P].add(x),a[A].add(x),a[S].add(x),c[P].add(g),c[A].add(g),c[S].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let P=0,A=T.length;P<A;++P){let S=T[P],O=S.start,J=S.count;for(let j=O,nt=O+J;j<nt;j+=3)m(t.getX(j+0),t.getX(j+1),t.getX(j+2))}let E=new L,M=new L,N=new L,I=new L;function D(P){N.fromBufferAttribute(s,P),I.copy(N);let A=a[P];E.copy(A),E.sub(N.multiplyScalar(N.dot(A))).normalize(),M.crossVectors(I,A);let O=M.dot(c[P])<0?-1:1;o.setXYZW(P,E.x,E.y,E.z,O)}for(let P=0,A=T.length;P<A;++P){let S=T[P],O=S.start,J=S.count;for(let j=O,nt=O+J;j<nt;j+=3)D(t.getX(j+0)),D(t.getX(j+1)),D(t.getX(j+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,d=new L;if(t)for(let f=0,p=t.count;f<p;f+=3){let _=t.getX(f+0),x=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)He.fromBufferAttribute(t,e),He.normalize(),t.setXYZ(e,He.x,He.y,He.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,d=a.normalized,f=new l.constructor(c.length*h),p=0,_=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let m=0;m<h;m++)f[_++]=l[p++]}return new xn(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){let f=l[h],p=t(f,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,f=l.length;d<f;d++){let p=l[d];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],d=r[l];for(let f=0,p=d.length;f<p;f++)h.push(d[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ju=new Ce,Ni=new Xs,Eo=new Rr,Yu=new L,To=new L,Ao=new L,Ro=new L,Tc=new L,Co=new L,Zu=new L,Po=new L,Xt=class extends Qe{constructor(t=new an,e=new bn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Co.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],d=r[c];h!==0&&(Tc.fromBufferAttribute(d,t),o?Co.addScaledVector(Tc,h):Co.addScaledVector(Tc.sub(e),h))}e.add(Co)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(r),Ni.copy(t.ray).recast(t.near),!(Eo.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(Eo,Yu)===null||Ni.origin.distanceToSquared(Yu)>(t.far-t.near)**2))&&(ju.copy(r).invert(),Ni.copy(t.ray).applyMatrix4(ju),!(n.boundingBox!==null&&Ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ni)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=f.length;_<x;_++){let g=f[_],m=o[g.materialIndex],T=Math.max(g.start,p.start),E=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let M=T,N=E;M<N;M+=3){let I=a.getX(M),D=a.getX(M+1),P=a.getX(M+2);s=Io(this,m,t,n,l,h,d,I,D,P),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let _=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let g=_,m=x;g<m;g+=3){let T=a.getX(g),E=a.getX(g+1),M=a.getX(g+2);s=Io(this,o,t,n,l,h,d,T,E,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,x=f.length;_<x;_++){let g=f[_],m=o[g.materialIndex],T=Math.max(g.start,p.start),E=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let M=T,N=E;M<N;M+=3){let I=M,D=M+1,P=M+2;s=Io(this,m,t,n,l,h,d,I,D,P),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let _=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let g=_,m=x;g<m;g+=3){let T=g,E=g+1,M=g+2;s=Io(this,o,t,n,l,h,d,T,E,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function lg(i,t,e,n,s,r,o,a){let c;if(t.side===on?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Ei,a),c===null)return null;Po.copy(a),Po.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Po);return l<e.near||l>e.far?null:{distance:l,point:Po.clone(),object:i}}function Io(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,To),i.getVertexPosition(c,Ao),i.getVertexPosition(l,Ro);let h=lg(i,t,e,n,To,Ao,Ro,Zu);if(h){let d=new L;Vi.getBarycoord(Zu,To,Ao,Ro,d),s&&(h.uv=Vi.getInterpolatedAttribute(s,a,c,l,d,new _t)),r&&(h.uv1=Vi.getInterpolatedAttribute(r,a,c,l,d,new _t)),o&&(h.normal=Vi.getInterpolatedAttribute(o,a,c,l,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new L,materialIndex:0};Vi.getNormal(To,Ao,Ro,f.normal),h.face=f,h.barycoord=d}return h}var Yi=class i extends an{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],d=[],f=0,p=0;_("z","y","x",-1,-1,n,e,t,o,r,0),_("z","y","x",1,-1,n,e,-t,o,r,1),_("x","z","y",1,1,t,n,e,s,o,2),_("x","z","y",1,-1,t,n,-e,s,o,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pe(l,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(d,2));function _(x,g,m,T,E,M,N,I,D,P,A){let S=M/D,O=N/P,J=M/2,j=N/2,nt=I/2,ct=D+1,K=P+1,dt=0,tt=0,gt=new L;for(let Et=0;Et<K;Et++){let Rt=Et*O-j;for(let Bt=0;Bt<ct;Bt++){let Nt=Bt*S-J;gt[x]=Nt*T,gt[g]=Rt*E,gt[m]=nt,l.push(gt.x,gt.y,gt.z),gt[x]=0,gt[g]=0,gt[m]=I>0?1:-1,h.push(gt.x,gt.y,gt.z),d.push(Bt/D),d.push(1-Et/P),dt+=1}}for(let Et=0;Et<P;Et++)for(let Rt=0;Rt<D;Rt++){let Bt=f+Rt+ct*Et,Nt=f+Rt+ct*(Et+1),X=f+(Rt+1)+ct*(Et+1),ht=f+(Rt+1)+ct*Et;c.push(Bt,Nt,ht),c.push(Nt,X,ht),tt+=6}a.addGroup(p,tt,A),p+=tt,f+=dt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function qs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Je(i){let t={};for(let e=0;e<i.length;e++){let n=qs(i[e]);for(let s in n)t[s]=n[s]}return t}function hg(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function jd(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ue.workingColorSpace}var ug={clone:qs,merge:Je},dg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xn=class extends ji{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dg,this.fragmentShader=fg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qs(t.uniforms),this.uniformsGroups=hg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Zo=class extends Qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=si}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},bi=new L,Ju=new _t,Ku=new _t,je=class extends Zo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ar*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(br*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ar*2*Math.atan(Math.tan(br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bi.x,bi.y).multiplyScalar(-t/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(bi.x,bi.y).multiplyScalar(-t/bi.z)}getViewSize(t,e){return this.getViewBounds(t,Ju,Ku),e.subVectors(Ku,Ju)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(br*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Is=-90,Ls=1,Rl=class extends Qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new je(Is,Ls,t,e);s.layers=this.layers,this.add(s);let r=new je(Is,Ls,t,e);r.layers=this.layers,this.add(r);let o=new je(Is,Ls,t,e);o.layers=this.layers,this.add(o);let a=new je(Is,Ls,t,e);a.layers=this.layers,this.add(a);let c=new je(Is,Ls,t,e);c.layers=this.layers,this.add(c);let l=new je(Is,Ls,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===si)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Wo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,f,p),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},Jo=class extends Ke{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Hs,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Cl=class extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Jo(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Yi(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:qs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:Si});r.uniforms.tEquirect.value=e;let o=new Xt(s,r),a=e.minFilter;return e.minFilter===Xi&&(e.minFilter=Gn),new Rl(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Ac=new L,pg=new L,mg=new Qt,Ln=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ac.subVectors(n,e).cross(pg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ac),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||mg.getNormalMatrix(t),s=this.coplanarPoint(Ac).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Fi=new Rr,Lo=new L,Pr=class{constructor(t=new Ln,e=new Ln,n=new Ln,s=new Ln,r=new Ln,o=new Ln){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=si){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],d=s[6],f=s[7],p=s[8],_=s[9],x=s[10],g=s[11],m=s[12],T=s[13],E=s[14],M=s[15];if(n[0].setComponents(c-r,f-l,g-p,M-m).normalize(),n[1].setComponents(c+r,f+l,g+p,M+m).normalize(),n[2].setComponents(c+o,f+h,g+_,M+T).normalize(),n[3].setComponents(c-o,f-h,g-_,M-T).normalize(),n[4].setComponents(c-a,f-d,g-x,M-E).normalize(),e===si)n[5].setComponents(c+a,f+d,g+x,M+E).normalize();else if(e===Wo)n[5].setComponents(a,d,x,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(t){return Fi.center.set(0,0,0),Fi.radius=.7071067811865476,Fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Lo.x=s.normal.x>0?t.max.x:t.min.x,Lo.y=s.normal.y>0?t.max.y:t.min.y,Lo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Lo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Yd(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function gg(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,h);else{d.sort((p,_)=>p.start-_.start);let f=0;for(let p=1;p<d.length;p++){let _=d[f],x=d[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++f,d[f]=x)}d.length=f+1;for(let p=0,_=d.length;p<_;p++){let x=d[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Mn=class i extends an{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,d=t/a,f=e/c,p=[],_=[],x=[],g=[];for(let m=0;m<h;m++){let T=m*f-o;for(let E=0;E<l;E++){let M=E*d-r;_.push(M,-T,0),x.push(0,0,1),g.push(E/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let T=0;T<a;T++){let E=T+l*m,M=T+l*(m+1),N=T+1+l*(m+1),I=T+1+l*m;p.push(E,M,I),p.push(M,N,I)}this.setIndex(p),this.setAttribute("position",new pe(_,3)),this.setAttribute("normal",new pe(x,3)),this.setAttribute("uv",new pe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},_g=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vg=`#ifdef USE_ALPHAHASH
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
#endif`,yg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sg=`#ifdef USE_AOMAP
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
#endif`,wg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eg=`#ifdef USE_BATCHING
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
#endif`,Tg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ag=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pg=`#ifdef USE_IRIDESCENCE
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
#endif`,Ig=`#ifdef USE_BUMPMAP
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
#endif`,Lg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ug=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Og=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ng=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Fg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,zg=`#define PI 3.141592653589793
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
} // validated`,Hg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vg=`vec3 transformedNormal = objectNormal;
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
#endif`,Gg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$g="gl_FragColor = linearToOutputTexel( gl_FragColor );",jg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yg=`#ifdef USE_ENVMAP
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
#endif`,Zg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Jg=`#ifdef USE_ENVMAP
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
#endif`,Kg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qg=`#ifdef USE_ENVMAP
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
#endif`,t_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,e_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,n_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,s_=`#ifdef USE_GRADIENTMAP
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
}`,r_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,o_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,a_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,c_=`uniform bool receiveShadow;
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
#endif`,l_=`#ifdef USE_ENVMAP
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
#endif`,h_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,u_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,d_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,f_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,p_=`PhysicalMaterial material;
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
#endif`,m_=`struct PhysicalMaterial {
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
}`,g_=`
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
#endif`,__=`#if defined( RE_IndirectDiffuse )
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
#endif`,v_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,y_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,x_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,S_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,w_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,E_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,T_=`#if defined( USE_POINTS_UV )
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
#endif`,A_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,R_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,C_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,P_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,I_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L_=`#ifdef USE_MORPHTARGETS
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
#endif`,D_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,O_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,N_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,F_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,k_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,B_=`#ifdef USE_NORMALMAP
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
#endif`,z_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,H_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,V_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,G_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,W_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,X_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,q_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,j_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Y_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Z_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,J_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,K_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Q_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,t0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,e0=`float getShadowMask() {
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
}`,n0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i0=`#ifdef USE_SKINNING
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
#endif`,s0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,r0=`#ifdef USE_SKINNING
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
#endif`,o0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,a0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,c0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,l0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,h0=`#ifdef USE_TRANSMISSION
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
#endif`,u0=`#ifdef USE_TRANSMISSION
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
#endif`,d0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,g0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_0=`uniform sampler2D t2D;
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
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,y0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,x0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,M0=`#include <common>
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
}`,S0=`#if DEPTH_PACKING == 3200
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
}`,w0=`#define DISTANCE
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
}`,E0=`#define DISTANCE
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
}`,T0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,A0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R0=`uniform float scale;
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
}`,C0=`uniform vec3 diffuse;
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
}`,P0=`#include <common>
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
}`,I0=`uniform vec3 diffuse;
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
}`,L0=`#define LAMBERT
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
}`,D0=`#define LAMBERT
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
}`,U0=`#define MATCAP
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
}`,O0=`#define MATCAP
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
}`,N0=`#define NORMAL
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
}`,F0=`#define NORMAL
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
}`,k0=`#define PHONG
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
}`,B0=`#define PHONG
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
}`,z0=`#define STANDARD
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
}`,H0=`#define STANDARD
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
}`,V0=`#define TOON
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
}`,G0=`#define TOON
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
}`,W0=`uniform float size;
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
}`,X0=`uniform vec3 diffuse;
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
}`,q0=`#include <common>
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
}`,$0=`uniform vec3 color;
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
}`,j0=`uniform float rotation;
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
}`,Y0=`uniform vec3 diffuse;
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
}`,ie={alphahash_fragment:_g,alphahash_pars_fragment:vg,alphamap_fragment:yg,alphamap_pars_fragment:xg,alphatest_fragment:bg,alphatest_pars_fragment:Mg,aomap_fragment:Sg,aomap_pars_fragment:wg,batching_pars_vertex:Eg,batching_vertex:Tg,begin_vertex:Ag,beginnormal_vertex:Rg,bsdfs:Cg,iridescence_fragment:Pg,bumpmap_pars_fragment:Ig,clipping_planes_fragment:Lg,clipping_planes_pars_fragment:Dg,clipping_planes_pars_vertex:Ug,clipping_planes_vertex:Og,color_fragment:Ng,color_pars_fragment:Fg,color_pars_vertex:kg,color_vertex:Bg,common:zg,cube_uv_reflection_fragment:Hg,defaultnormal_vertex:Vg,displacementmap_pars_vertex:Gg,displacementmap_vertex:Wg,emissivemap_fragment:Xg,emissivemap_pars_fragment:qg,colorspace_fragment:$g,colorspace_pars_fragment:jg,envmap_fragment:Yg,envmap_common_pars_fragment:Zg,envmap_pars_fragment:Jg,envmap_pars_vertex:Kg,envmap_physical_pars_fragment:l_,envmap_vertex:Qg,fog_vertex:t_,fog_pars_vertex:e_,fog_fragment:n_,fog_pars_fragment:i_,gradientmap_pars_fragment:s_,lightmap_pars_fragment:r_,lights_lambert_fragment:o_,lights_lambert_pars_fragment:a_,lights_pars_begin:c_,lights_toon_fragment:h_,lights_toon_pars_fragment:u_,lights_phong_fragment:d_,lights_phong_pars_fragment:f_,lights_physical_fragment:p_,lights_physical_pars_fragment:m_,lights_fragment_begin:g_,lights_fragment_maps:__,lights_fragment_end:v_,logdepthbuf_fragment:y_,logdepthbuf_pars_fragment:x_,logdepthbuf_pars_vertex:b_,logdepthbuf_vertex:M_,map_fragment:S_,map_pars_fragment:w_,map_particle_fragment:E_,map_particle_pars_fragment:T_,metalnessmap_fragment:A_,metalnessmap_pars_fragment:R_,morphinstance_vertex:C_,morphcolor_vertex:P_,morphnormal_vertex:I_,morphtarget_pars_vertex:L_,morphtarget_vertex:D_,normal_fragment_begin:U_,normal_fragment_maps:O_,normal_pars_fragment:N_,normal_pars_vertex:F_,normal_vertex:k_,normalmap_pars_fragment:B_,clearcoat_normal_fragment_begin:z_,clearcoat_normal_fragment_maps:H_,clearcoat_pars_fragment:V_,iridescence_pars_fragment:G_,opaque_fragment:W_,packing:X_,premultiplied_alpha_fragment:q_,project_vertex:$_,dithering_fragment:j_,dithering_pars_fragment:Y_,roughnessmap_fragment:Z_,roughnessmap_pars_fragment:J_,shadowmap_pars_fragment:K_,shadowmap_pars_vertex:Q_,shadowmap_vertex:t0,shadowmask_pars_fragment:e0,skinbase_vertex:n0,skinning_pars_vertex:i0,skinning_vertex:s0,skinnormal_vertex:r0,specularmap_fragment:o0,specularmap_pars_fragment:a0,tonemapping_fragment:c0,tonemapping_pars_fragment:l0,transmission_fragment:h0,transmission_pars_fragment:u0,uv_pars_fragment:d0,uv_pars_vertex:f0,uv_vertex:p0,worldpos_vertex:m0,background_vert:g0,background_frag:_0,backgroundCube_vert:v0,backgroundCube_frag:y0,cube_vert:x0,cube_frag:b0,depth_vert:M0,depth_frag:S0,distanceRGBA_vert:w0,distanceRGBA_frag:E0,equirect_vert:T0,equirect_frag:A0,linedashed_vert:R0,linedashed_frag:C0,meshbasic_vert:P0,meshbasic_frag:I0,meshlambert_vert:L0,meshlambert_frag:D0,meshmatcap_vert:U0,meshmatcap_frag:O0,meshnormal_vert:N0,meshnormal_frag:F0,meshphong_vert:k0,meshphong_frag:B0,meshphysical_vert:z0,meshphysical_frag:H0,meshtoon_vert:V0,meshtoon_frag:G0,points_vert:W0,points_frag:X0,shadow_vert:q0,shadow_frag:$0,sprite_vert:j0,sprite_frag:Y0},St={common:{diffuse:{value:new oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new oe(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},Vn={basic:{uniforms:Je([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:Je([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new oe(0)}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:Je([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new oe(0)},specular:{value:new oe(1118481)},shininess:{value:30}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:Je([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:Je([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new oe(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:Je([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:Je([St.points,St.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:Je([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:Je([St.common,St.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:Je([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:Je([St.sprite,St.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distanceRGBA:{uniforms:Je([St.common,St.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distanceRGBA_vert,fragmentShader:ie.distanceRGBA_frag},shadow:{uniforms:Je([St.lights,St.fog,{color:{value:new oe(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};Vn.physical={uniforms:Je([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new oe(0)},specularColor:{value:new oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};var Do={r:0,b:0,g:0},ki=new Wn,Z0=new Ce;function J0(i,t,e,n,s,r,o){let a=new oe(0),c=r===!0?0:1,l,h,d=null,f=0,p=null;function _(T){let E=T.isScene===!0?T.background:null;return E&&E.isTexture&&(E=(T.backgroundBlurriness>0?e:t).get(E)),E}function x(T){let E=!1,M=_(T);M===null?m(a,c):M&&M.isColor&&(m(M,1),E=!0);let N=i.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,o):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(T,E){let M=_(E);M&&(M.isCubeTexture||M.mapping===ya)?(h===void 0&&(h=new Xt(new Yi(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:qs(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,I,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ki.copy(E.backgroundRotation),ki.x*=-1,ki.y*=-1,ki.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Z0.makeRotationFromEuler(ki)),h.material.toneMapped=ue.getTransfer(M.colorSpace)!==_e,(d!==M||f!==M.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,d=M,f=M.version,p=i.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Xt(new Mn(2,2),new Xn({name:"BackgroundMaterial",uniforms:qs(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=ue.getTransfer(M.colorSpace)!==_e,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=M,f=M.version,p=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function m(T,E){T.getRGB(Do,jd(i)),n.buffers.color.setClear(Do.r,Do.g,Do.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(T,E=1){a.set(T),c=E,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,m(a,c)},render:x,addToRenderList:g}}function K0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(S,O,J,j,nt){let ct=!1,K=d(j,J,O);r!==K&&(r=K,l(r.object)),ct=p(S,j,J,nt),ct&&_(S,j,J,nt),nt!==null&&t.update(nt,i.ELEMENT_ARRAY_BUFFER),(ct||o)&&(o=!1,M(S,O,J,j),nt!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(nt).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function d(S,O,J){let j=J.wireframe===!0,nt=n[S.id];nt===void 0&&(nt={},n[S.id]=nt);let ct=nt[O.id];ct===void 0&&(ct={},nt[O.id]=ct);let K=ct[j];return K===void 0&&(K=f(c()),ct[j]=K),K}function f(S){let O=[],J=[],j=[];for(let nt=0;nt<e;nt++)O[nt]=0,J[nt]=0,j[nt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:J,attributeDivisors:j,object:S,attributes:{},index:null}}function p(S,O,J,j){let nt=r.attributes,ct=O.attributes,K=0,dt=J.getAttributes();for(let tt in dt)if(dt[tt].location>=0){let Et=nt[tt],Rt=ct[tt];if(Rt===void 0&&(tt==="instanceMatrix"&&S.instanceMatrix&&(Rt=S.instanceMatrix),tt==="instanceColor"&&S.instanceColor&&(Rt=S.instanceColor)),Et===void 0||Et.attribute!==Rt||Rt&&Et.data!==Rt.data)return!0;K++}return r.attributesNum!==K||r.index!==j}function _(S,O,J,j){let nt={},ct=O.attributes,K=0,dt=J.getAttributes();for(let tt in dt)if(dt[tt].location>=0){let Et=ct[tt];Et===void 0&&(tt==="instanceMatrix"&&S.instanceMatrix&&(Et=S.instanceMatrix),tt==="instanceColor"&&S.instanceColor&&(Et=S.instanceColor));let Rt={};Rt.attribute=Et,Et&&Et.data&&(Rt.data=Et.data),nt[tt]=Rt,K++}r.attributes=nt,r.attributesNum=K,r.index=j}function x(){let S=r.newAttributes;for(let O=0,J=S.length;O<J;O++)S[O]=0}function g(S){m(S,0)}function m(S,O){let J=r.newAttributes,j=r.enabledAttributes,nt=r.attributeDivisors;J[S]=1,j[S]===0&&(i.enableVertexAttribArray(S),j[S]=1),nt[S]!==O&&(i.vertexAttribDivisor(S,O),nt[S]=O)}function T(){let S=r.newAttributes,O=r.enabledAttributes;for(let J=0,j=O.length;J<j;J++)O[J]!==S[J]&&(i.disableVertexAttribArray(J),O[J]=0)}function E(S,O,J,j,nt,ct,K){K===!0?i.vertexAttribIPointer(S,O,J,nt,ct):i.vertexAttribPointer(S,O,J,j,nt,ct)}function M(S,O,J,j){x();let nt=j.attributes,ct=J.getAttributes(),K=O.defaultAttributeValues;for(let dt in ct){let tt=ct[dt];if(tt.location>=0){let gt=nt[dt];if(gt===void 0&&(dt==="instanceMatrix"&&S.instanceMatrix&&(gt=S.instanceMatrix),dt==="instanceColor"&&S.instanceColor&&(gt=S.instanceColor)),gt!==void 0){let Et=gt.normalized,Rt=gt.itemSize,Bt=t.get(gt);if(Bt===void 0)continue;let Nt=Bt.buffer,X=Bt.type,ht=Bt.bytesPerElement,It=X===i.INT||X===i.UNSIGNED_INT||gt.gpuType===dh;if(gt.isInterleavedBufferAttribute){let ut=gt.data,Ft=ut.stride,qt=gt.offset;if(ut.isInstancedInterleavedBuffer){for(let ee=0;ee<tt.locationSize;ee++)m(tt.location+ee,ut.meshPerAttribute);S.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let ee=0;ee<tt.locationSize;ee++)g(tt.location+ee);i.bindBuffer(i.ARRAY_BUFFER,Nt);for(let ee=0;ee<tt.locationSize;ee++)E(tt.location+ee,Rt/tt.locationSize,X,Et,Ft*ht,(qt+Rt/tt.locationSize*ee)*ht,It)}else{if(gt.isInstancedBufferAttribute){for(let ut=0;ut<tt.locationSize;ut++)m(tt.location+ut,gt.meshPerAttribute);S.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let ut=0;ut<tt.locationSize;ut++)g(tt.location+ut);i.bindBuffer(i.ARRAY_BUFFER,Nt);for(let ut=0;ut<tt.locationSize;ut++)E(tt.location+ut,Rt/tt.locationSize,X,Et,Rt*ht,Rt/tt.locationSize*ut*ht,It)}}else if(K!==void 0){let Et=K[dt];if(Et!==void 0)switch(Et.length){case 2:i.vertexAttrib2fv(tt.location,Et);break;case 3:i.vertexAttrib3fv(tt.location,Et);break;case 4:i.vertexAttrib4fv(tt.location,Et);break;default:i.vertexAttrib1fv(tt.location,Et)}}}}T()}function N(){P();for(let S in n){let O=n[S];for(let J in O){let j=O[J];for(let nt in j)h(j[nt].object),delete j[nt];delete O[J]}delete n[S]}}function I(S){if(n[S.id]===void 0)return;let O=n[S.id];for(let J in O){let j=O[J];for(let nt in j)h(j[nt].object),delete j[nt];delete O[J]}delete n[S.id]}function D(S){for(let O in n){let J=n[O];if(J[S.id]===void 0)continue;let j=J[S.id];for(let nt in j)h(j[nt].object),delete j[nt];delete J[S.id]}}function P(){A(),o=!0,r!==s&&(r=s,l(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:A,dispose:N,releaseStatesOfGeometry:I,releaseStatesOfProgram:D,initAttributes:x,enableAttribute:g,disableUnusedAttributes:T}}function Q0(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function a(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let p=0;for(let _=0;_<d;_++)p+=h[_];e.update(p,n,1)}function c(l,h,d,f){if(d===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<l.length;_++)o(l[_],h[_],f[_]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,d);let _=0;for(let x=0;x<d;x++)_+=h[x]*f[x];e.update(_,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function tv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let D=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(D){return!(D!==Un&&n.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){let P=D===Nr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==oi&&n.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==ii&&!P)}function c(D){if(D==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),N=_>0,I=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:M,vertexTextures:N,maxSamples:I}}function ev(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Ln,a=new Qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let p=d.length!==0||f||n!==0||s;return s=f,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=h(d,f,0)},this.setState=function(d,f,p){let _=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||_===null||_.length===0||r&&!g)r?h(null):l();else{let T=r?0:n,E=T*4,M=m.clippingState||null;c.value=M,M=h(_,f,E,p);for(let N=0;N!==E;++N)M[N]=e[N];m.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,f,p,_){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=c.value,_!==!0||g===null){let m=p+x*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,M=p;E!==x;++E,M+=4)o.copy(d[E]).applyMatrix4(T,a),o.normal.toArray(g,M),g[M+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function nv(i){let t=new WeakMap;function e(o,a){return a===jc?o.mapping=Hs:a===Yc&&(o.mapping=Vs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===jc||a===Yc)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Cl(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ko=class extends Zo{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Os=4,Qu=[.125,.215,.35,.446,.526,.582],Gi=20,Rc=new Ko,td=new oe,Cc=null,Pc=0,Ic=0,Lc=!1,zi=(1+Math.sqrt(5))/2,Ds=1/zi,ed=[new L(-zi,Ds,0),new L(zi,Ds,0),new L(-Ds,0,zi),new L(Ds,0,zi),new L(0,zi,-Ds),new L(0,zi,Ds),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Qo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Cc=this._renderer.getRenderTarget(),Pc=this._renderer.getActiveCubeFace(),Ic=this._renderer.getActiveMipmapLevel(),Lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=id(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Cc,Pc,Ic),this._renderer.xr.enabled=Lc,t.scissorTest=!1,Uo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hs||t.mapping===Vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Cc=this._renderer.getRenderTarget(),Pc=this._renderer.getActiveCubeFace(),Ic=this._renderer.getActiveMipmapLevel(),Lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:Nr,format:Un,colorSpace:Ys,depthBuffer:!1},s=nd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nd(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=iv(r)),this._blurMaterial=sv(r,t,e)}return s}_compileMaterial(t){let e=new Xt(this._lodPlanes[0],t);this._renderer.compile(e,Rc)}_sceneToCubeUV(t,e,n,s){let a=new je(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(td),h.toneMapping=wi,h.autoClear=!1;let p=new bn({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),_=new Xt(new Yi,p),x=!1,g=t.background;g?g.isColor&&(p.color.copy(g),t.background=null,x=!0):(p.color.copy(td),x=!0);for(let m=0;m<6;m++){let T=m%3;T===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):T===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));let E=this._cubeSize;Uo(s,T*E,m>2?E:0,E,E),h.setRenderTarget(s),x&&h.render(_,a),h.render(t,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=f,h.autoClear=d,t.background=g}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Hs||t.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=sd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=id());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Xt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Uo(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Rc)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ed[(s-r-1)%ed.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Xt(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Gi-1),x=r/_,g=isFinite(r)?1+Math.floor(h*x):Gi;g>Gi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Gi}`);let m=[],T=0;for(let D=0;D<Gi;++D){let P=D/x,A=Math.exp(-P*P/2);m.push(A),D===0?T+=A:D<g&&(T+=2*A)}for(let D=0;D<m.length;D++)m[D]=m[D]/T;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:E}=this;f.dTheta.value=_,f.mipInt.value=E-n;let M=this._sizeLods[s],N=3*M*(s>E-Os?s-E+Os:0),I=4*(this._cubeSize-M);Uo(e,N,I,3*M,2*M),c.setRenderTarget(e),c.render(d,Rc)}};function iv(i){let t=[],e=[],n=[],s=i,r=i-Os+1+Qu.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Os?c=Qu[o-i+Os-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,d=1+l,f=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,_=6,x=3,g=2,m=1,T=new Float32Array(x*_*p),E=new Float32Array(g*_*p),M=new Float32Array(m*_*p);for(let I=0;I<p;I++){let D=I%3*2/3-1,P=I>2?0:-1,A=[D,P,0,D+2/3,P,0,D+2/3,P+1,0,D,P,0,D+2/3,P+1,0,D,P+1,0];T.set(A,x*_*I),E.set(f,g*_*I);let S=[I,I,I,I,I,I];M.set(S,m*_*I)}let N=new an;N.setAttribute("position",new xn(T,x)),N.setAttribute("uv",new xn(E,g)),N.setAttribute("faceIndex",new xn(M,m)),t.push(N),s>Os&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function nd(i,t,e){let n=new ci(i,t,e);return n.texture.mapping=ya,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Uo(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function sv(i,t,e){let n=new Float32Array(Gi),s=new L(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:Gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:yh(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function id(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yh(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function sd(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function yh(){return`

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
	`}function rv(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===jc||c===Yc,h=c===Hs||c===Vs;if(l||h){let d=t.get(a),f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Qo(i)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Qo(i)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function ov(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&yr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function av(i,t,e,n){let s={},r=new WeakMap;function o(d){let f=d.target;f.index!==null&&t.remove(f.index);for(let _ in f.attributes)t.remove(f.attributes[_]);for(let _ in f.morphAttributes){let x=f.morphAttributes[_];for(let g=0,m=x.length;g<m;g++)t.remove(x[g])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(d){let f=d.attributes;for(let _ in f)t.update(f[_],i.ARRAY_BUFFER);let p=d.morphAttributes;for(let _ in p){let x=p[_];for(let g=0,m=x.length;g<m;g++)t.update(x[g],i.ARRAY_BUFFER)}}function l(d){let f=[],p=d.index,_=d.attributes.position,x=0;if(p!==null){let T=p.array;x=p.version;for(let E=0,M=T.length;E<M;E+=3){let N=T[E+0],I=T[E+1],D=T[E+2];f.push(N,I,I,D,D,N)}}else if(_!==void 0){let T=_.array;x=_.version;for(let E=0,M=T.length/3-1;E<M;E+=3){let N=E+0,I=E+1,D=E+2;f.push(N,I,I,D,D,N)}}else return;let g=new(qd(f)?Yo:jo)(f,1);g.version=x;let m=r.get(d);m&&t.remove(m),r.set(d,g)}function h(d){let f=r.get(d);if(f){let p=d.index;p!==null&&f.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function cv(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*o),e.update(p,n,1)}function l(f,p,_){_!==0&&(i.drawElementsInstanced(n,p,r,f*o,_),e.update(p,n,_))}function h(f,p,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,_);let g=0;for(let m=0;m<_;m++)g+=p[m];e.update(g,n,1)}function d(f,p,_,x){if(_===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f.length;m++)l(f[m]/o,p[m],x[m]);else{g.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,x,0,_);let m=0;for(let T=0;T<_;T++)m+=p[T]*x[T];e.update(m,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function lv(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function hv(i,t,e){let n=new WeakMap,s=new ve;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==d){let A=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",A)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],T=a.morphAttributes.color||[],E=0;p===!0&&(E=1),_===!0&&(E=2),x===!0&&(E=3);let M=a.attributes.position.count*E,N=1;M>t.maxTextureSize&&(N=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let I=new Float32Array(M*N*4*d),D=new $o(I,M,N,d);D.type=ii,D.needsUpdate=!0;let P=E*4;for(let S=0;S<d;S++){let O=g[S],J=m[S],j=T[S],nt=M*N*4*S;for(let ct=0;ct<O.count;ct++){let K=ct*P;p===!0&&(s.fromBufferAttribute(O,ct),I[nt+K+0]=s.x,I[nt+K+1]=s.y,I[nt+K+2]=s.z,I[nt+K+3]=0),_===!0&&(s.fromBufferAttribute(J,ct),I[nt+K+4]=s.x,I[nt+K+5]=s.y,I[nt+K+6]=s.z,I[nt+K+7]=0),x===!0&&(s.fromBufferAttribute(j,ct),I[nt+K+8]=s.x,I[nt+K+9]=s.y,I[nt+K+10]=s.z,I[nt+K+11]=j.itemSize===4?s.w:1)}}f={count:d,texture:D,size:new _t(M,N)},n.set(a,f),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];let _=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function uv(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,d=t.get(c,h);if(s.get(d)!==l&&(t.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return d}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var ta=class extends Ke{constructor(t,e,n,s,r,o,a,c,l,h=Fs){if(h!==Fs&&h!==Ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Fs&&(n=qi),n===void 0&&h===Ws&&(n=Gs),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:On,this.minFilter=c!==void 0?c:On,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Zd=new Ke,rd=new ta(1,1),Jd=new $o,Kd=new Al,Qd=new Jo,od=[],ad=[],cd=new Float32Array(16),ld=new Float32Array(9),hd=new Float32Array(4);function Js(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=od[s];if(r===void 0&&(r=new Float32Array(s),od[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ne(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Fe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ba(i,t){let e=ad[t];e===void 0&&(e=new Int32Array(t),ad[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function dv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function fv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2fv(this.addr,t),Fe(e,t)}}function pv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;i.uniform3fv(this.addr,t),Fe(e,t)}}function mv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4fv(this.addr,t),Fe(e,t)}}function gv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Fe(e,t)}else{if(Ne(e,n))return;hd.set(n),i.uniformMatrix2fv(this.addr,!1,hd),Fe(e,n)}}function _v(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Fe(e,t)}else{if(Ne(e,n))return;ld.set(n),i.uniformMatrix3fv(this.addr,!1,ld),Fe(e,n)}}function vv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Fe(e,t)}else{if(Ne(e,n))return;cd.set(n),i.uniformMatrix4fv(this.addr,!1,cd),Fe(e,n)}}function yv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function xv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2iv(this.addr,t),Fe(e,t)}}function bv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3iv(this.addr,t),Fe(e,t)}}function Mv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4iv(this.addr,t),Fe(e,t)}}function Sv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function wv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2uiv(this.addr,t),Fe(e,t)}}function Ev(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3uiv(this.addr,t),Fe(e,t)}}function Tv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4uiv(this.addr,t),Fe(e,t)}}function Av(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(rd.compareFunction=Xd,r=rd):r=Zd,e.setTexture2D(t||r,s)}function Rv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Kd,s)}function Cv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Qd,s)}function Pv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Jd,s)}function Iv(i){switch(i){case 5126:return dv;case 35664:return fv;case 35665:return pv;case 35666:return mv;case 35674:return gv;case 35675:return _v;case 35676:return vv;case 5124:case 35670:return yv;case 35667:case 35671:return xv;case 35668:case 35672:return bv;case 35669:case 35673:return Mv;case 5125:return Sv;case 36294:return wv;case 36295:return Ev;case 36296:return Tv;case 35678:case 36198:case 36298:case 36306:case 35682:return Av;case 35679:case 36299:case 36307:return Rv;case 35680:case 36300:case 36308:case 36293:return Cv;case 36289:case 36303:case 36311:case 36292:return Pv}}function Lv(i,t){i.uniform1fv(this.addr,t)}function Dv(i,t){let e=Js(t,this.size,2);i.uniform2fv(this.addr,e)}function Uv(i,t){let e=Js(t,this.size,3);i.uniform3fv(this.addr,e)}function Ov(i,t){let e=Js(t,this.size,4);i.uniform4fv(this.addr,e)}function Nv(i,t){let e=Js(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Fv(i,t){let e=Js(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function kv(i,t){let e=Js(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Bv(i,t){i.uniform1iv(this.addr,t)}function zv(i,t){i.uniform2iv(this.addr,t)}function Hv(i,t){i.uniform3iv(this.addr,t)}function Vv(i,t){i.uniform4iv(this.addr,t)}function Gv(i,t){i.uniform1uiv(this.addr,t)}function Wv(i,t){i.uniform2uiv(this.addr,t)}function Xv(i,t){i.uniform3uiv(this.addr,t)}function qv(i,t){i.uniform4uiv(this.addr,t)}function $v(i,t,e){let n=this.cache,s=t.length,r=ba(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Fe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Zd,r[o])}function jv(i,t,e){let n=this.cache,s=t.length,r=ba(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Fe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Kd,r[o])}function Yv(i,t,e){let n=this.cache,s=t.length,r=ba(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Fe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Qd,r[o])}function Zv(i,t,e){let n=this.cache,s=t.length,r=ba(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Fe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Jd,r[o])}function Jv(i){switch(i){case 5126:return Lv;case 35664:return Dv;case 35665:return Uv;case 35666:return Ov;case 35674:return Nv;case 35675:return Fv;case 35676:return kv;case 5124:case 35670:return Bv;case 35667:case 35671:return zv;case 35668:case 35672:return Hv;case 35669:case 35673:return Vv;case 5125:return Gv;case 36294:return Wv;case 36295:return Xv;case 36296:return qv;case 35678:case 36198:case 36298:case 36306:case 35682:return $v;case 35679:case 36299:case 36307:return jv;case 35680:case 36300:case 36308:case 36293:return Yv;case 36289:case 36303:case 36311:case 36292:return Zv}}var Pl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Iv(e.type)}},Il=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Jv(e.type)}},Ll=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Dc=/(\w+)(\])?(\[|\.)?/g;function ud(i,t){i.seq.push(t),i.map[t.id]=t}function Kv(i,t,e){let n=i.name,s=n.length;for(Dc.lastIndex=0;;){let r=Dc.exec(n),o=Dc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ud(e,l===void 0?new Pl(a,i,t):new Il(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Ll(a),ud(e,d)),e=d}}}var Bs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Kv(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function dd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Qv=37297,ty=0;function ey(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var fd=new Qt;function ny(i){ue._getMatrix(fd,ue.workingColorSpace,i);let t=`mat3( ${fd.elements.map(e=>e.toFixed(4))} )`;switch(ue.getTransfer(i)){case xa:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function pd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+ey(i.getShaderSource(t),o)}else return s}function iy(i,t){let e=ny(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function sy(i,t){let e;switch(t){case mm:e="Linear";break;case gm:e="Reinhard";break;case _m:e="Cineon";break;case uh:e="ACESFilmic";break;case ym:e="AgX";break;case xm:e="Neutral";break;case vm:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Oo=new L;function ry(){ue.getLuminanceCoefficients(Oo);let i=Oo.x.toFixed(4),t=Oo.y.toFixed(4),e=Oo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function oy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xr).join(`
`)}function ay(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function cy(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function xr(i){return i!==""}function md(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ly=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dl(i){return i.replace(ly,uy)}var hy=new Map;function uy(i,t){let e=ie[t];if(e===void 0){let n=hy.get(t);if(n!==void 0)e=ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Dl(e)}var dy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _d(i){return i.replace(dy,fy)}function fy(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function vd(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function py(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Id?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===hh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ni&&(t="SHADOWMAP_TYPE_VSM"),t}function my(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hs:case Vs:t="ENVMAP_TYPE_CUBE";break;case ya:t="ENVMAP_TYPE_CUBE_UV";break}return t}function gy(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vs:t="ENVMAP_MODE_REFRACTION";break}return t}function _y(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ld:t="ENVMAP_BLENDING_MULTIPLY";break;case fm:t="ENVMAP_BLENDING_MIX";break;case pm:t="ENVMAP_BLENDING_ADD";break}return t}function vy(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function yy(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=py(e),l=my(e),h=gy(e),d=_y(e),f=vy(e),p=oy(e),_=ay(r),x=s.createProgram(),g,m,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(xr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(xr).join(`
`),m.length>0&&(m+=`
`)):(g=[vd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xr).join(`
`),m=[vd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==wi?"#define TONE_MAPPING":"",e.toneMapping!==wi?ie.tonemapping_pars_fragment:"",e.toneMapping!==wi?sy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,iy("linearToOutputTexel",e.outputColorSpace),ry(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(xr).join(`
`)),o=Dl(o),o=md(o,e),o=gd(o,e),a=Dl(a),a=md(a,e),a=gd(a,e),o=_d(o),a=_d(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Iu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Iu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let E=T+g+o,M=T+m+a,N=dd(s,s.VERTEX_SHADER,E),I=dd(s,s.FRAGMENT_SHADER,M);s.attachShader(x,N),s.attachShader(x,I),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function D(O){if(i.debug.checkShaderErrors){let J=s.getProgramInfoLog(x).trim(),j=s.getShaderInfoLog(N).trim(),nt=s.getShaderInfoLog(I).trim(),ct=!0,K=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(ct=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,N,I);else{let dt=pd(s,N,"vertex"),tt=pd(s,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+J+`
`+dt+`
`+tt)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(j===""||nt==="")&&(K=!1);K&&(O.diagnostics={runnable:ct,programLog:J,vertexShader:{log:j,prefix:g},fragmentShader:{log:nt,prefix:m}})}s.deleteShader(N),s.deleteShader(I),P=new Bs(s,x),A=cy(s,x)}let P;this.getUniforms=function(){return P===void 0&&D(this),P};let A;this.getAttributes=function(){return A===void 0&&D(this),A};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(x,Qv)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ty++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=N,this.fragmentShader=I,this}var xy=0,Ul=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ol(t),e.set(t,n)),n}},Ol=class{constructor(t){this.id=xy++,this.code=t,this.usedTimes=0}};function by(i,t,e,n,s,r,o){let a=new Cr,c=new Ul,l=new Set,h=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(A){return l.add(A),A===0?"uv":`uv${A}`}function g(A,S,O,J,j){let nt=J.fog,ct=j.geometry,K=A.isMeshStandardMaterial?J.environment:null,dt=(A.isMeshStandardMaterial?e:t).get(A.envMap||K),tt=dt&&dt.mapping===ya?dt.image.height:null,gt=_[A.type];A.precision!==null&&(p=s.getMaxPrecision(A.precision),p!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",p,"instead."));let Et=ct.morphAttributes.position||ct.morphAttributes.normal||ct.morphAttributes.color,Rt=Et!==void 0?Et.length:0,Bt=0;ct.morphAttributes.position!==void 0&&(Bt=1),ct.morphAttributes.normal!==void 0&&(Bt=2),ct.morphAttributes.color!==void 0&&(Bt=3);let Nt,X,ht,It;if(gt){let de=Vn[gt];Nt=de.vertexShader,X=de.fragmentShader}else Nt=A.vertexShader,X=A.fragmentShader,c.update(A),ht=c.getVertexShaderID(A),It=c.getFragmentShaderID(A);let ut=i.getRenderTarget(),Ft=i.state.buffers.depth.getReversed(),qt=j.isInstancedMesh===!0,ee=j.isBatchedMesh===!0,jt=!!A.map,ae=!!A.matcap,Me=!!dt,H=!!A.aoMap,De=!!A.lightMap,Zt=!!A.bumpMap,Jt=!!A.normalMap,Ot=!!A.displacementMap,xe=!!A.emissiveMap,vt=!!A.metalnessMap,C=!!A.roughnessMap,b=A.anisotropy>0,V=A.clearcoat>0,it=A.dispersion>0,st=A.iridescence>0,et=A.sheen>0,Lt=A.transmission>0,Mt=b&&!!A.anisotropyMap,pt=V&&!!A.clearcoatMap,zt=V&&!!A.clearcoatNormalMap,rt=V&&!!A.clearcoatRoughnessMap,ft=st&&!!A.iridescenceMap,kt=st&&!!A.iridescenceThicknessMap,Gt=et&&!!A.sheenColorMap,Ct=et&&!!A.sheenRoughnessMap,re=!!A.specularMap,Kt=!!A.specularColorMap,me=!!A.specularIntensityMap,k=Lt&&!!A.transmissionMap,wt=Lt&&!!A.thicknessMap,Q=!!A.gradientMap,ot=!!A.alphaMap,At=A.alphaTest>0,Tt=!!A.alphaHash,Ht=!!A.extensions,Z=wi;A.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(Z=i.toneMapping);let Ee={shaderID:gt,shaderType:A.type,shaderName:A.name,vertexShader:Nt,fragmentShader:X,defines:A.defines,customVertexShaderID:ht,customFragmentShaderID:It,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:p,batching:ee,batchingColor:ee&&j._colorsTexture!==null,instancing:qt,instancingColor:qt&&j.instanceColor!==null,instancingMorph:qt&&j.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ut===null?i.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:Ys,alphaToCoverage:!!A.alphaToCoverage,map:jt,matcap:ae,envMap:Me,envMapMode:Me&&dt.mapping,envMapCubeUVHeight:tt,aoMap:H,lightMap:De,bumpMap:Zt,normalMap:Jt,displacementMap:f&&Ot,emissiveMap:xe,normalMapObjectSpace:Jt&&A.normalMapType===wm,normalMapTangentSpace:Jt&&A.normalMapType===Wd,metalnessMap:vt,roughnessMap:C,anisotropy:b,anisotropyMap:Mt,clearcoat:V,clearcoatMap:pt,clearcoatNormalMap:zt,clearcoatRoughnessMap:rt,dispersion:it,iridescence:st,iridescenceMap:ft,iridescenceThicknessMap:kt,sheen:et,sheenColorMap:Gt,sheenRoughnessMap:Ct,specularMap:re,specularColorMap:Kt,specularIntensityMap:me,transmission:Lt,transmissionMap:k,thicknessMap:wt,gradientMap:Q,opaque:A.transparent===!1&&A.blending===Ns&&A.alphaToCoverage===!1,alphaMap:ot,alphaTest:At,alphaHash:Tt,combine:A.combine,mapUv:jt&&x(A.map.channel),aoMapUv:H&&x(A.aoMap.channel),lightMapUv:De&&x(A.lightMap.channel),bumpMapUv:Zt&&x(A.bumpMap.channel),normalMapUv:Jt&&x(A.normalMap.channel),displacementMapUv:Ot&&x(A.displacementMap.channel),emissiveMapUv:xe&&x(A.emissiveMap.channel),metalnessMapUv:vt&&x(A.metalnessMap.channel),roughnessMapUv:C&&x(A.roughnessMap.channel),anisotropyMapUv:Mt&&x(A.anisotropyMap.channel),clearcoatMapUv:pt&&x(A.clearcoatMap.channel),clearcoatNormalMapUv:zt&&x(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:rt&&x(A.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&x(A.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&x(A.iridescenceThicknessMap.channel),sheenColorMapUv:Gt&&x(A.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&x(A.sheenRoughnessMap.channel),specularMapUv:re&&x(A.specularMap.channel),specularColorMapUv:Kt&&x(A.specularColorMap.channel),specularIntensityMapUv:me&&x(A.specularIntensityMap.channel),transmissionMapUv:k&&x(A.transmissionMap.channel),thicknessMapUv:wt&&x(A.thicknessMap.channel),alphaMapUv:ot&&x(A.alphaMap.channel),vertexTangents:!!ct.attributes.tangent&&(Jt||b),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!ct.attributes.color&&ct.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!ct.attributes.uv&&(jt||ot),fog:!!nt,useFog:A.fog===!0,fogExp2:!!nt&&nt.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ft,skinning:j.isSkinnedMesh===!0,morphTargets:ct.morphAttributes.position!==void 0,morphNormals:ct.morphAttributes.normal!==void 0,morphColors:ct.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:Bt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:A.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:Z,decodeVideoTexture:jt&&A.map.isVideoTexture===!0&&ue.getTransfer(A.map.colorSpace)===_e,decodeVideoTextureEmissive:xe&&A.emissiveMap.isVideoTexture===!0&&ue.getTransfer(A.emissiveMap.colorSpace)===_e,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Dn,flipSided:A.side===on,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Ht&&A.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&A.extensions.multiDraw===!0||ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Ee.vertexUv1s=l.has(1),Ee.vertexUv2s=l.has(2),Ee.vertexUv3s=l.has(3),l.clear(),Ee}function m(A){let S=[];if(A.shaderID?S.push(A.shaderID):(S.push(A.customVertexShaderID),S.push(A.customFragmentShaderID)),A.defines!==void 0)for(let O in A.defines)S.push(O),S.push(A.defines[O]);return A.isRawShaderMaterial===!1&&(T(S,A),E(S,A),S.push(i.outputColorSpace)),S.push(A.customProgramCacheKey),S.join()}function T(A,S){A.push(S.precision),A.push(S.outputColorSpace),A.push(S.envMapMode),A.push(S.envMapCubeUVHeight),A.push(S.mapUv),A.push(S.alphaMapUv),A.push(S.lightMapUv),A.push(S.aoMapUv),A.push(S.bumpMapUv),A.push(S.normalMapUv),A.push(S.displacementMapUv),A.push(S.emissiveMapUv),A.push(S.metalnessMapUv),A.push(S.roughnessMapUv),A.push(S.anisotropyMapUv),A.push(S.clearcoatMapUv),A.push(S.clearcoatNormalMapUv),A.push(S.clearcoatRoughnessMapUv),A.push(S.iridescenceMapUv),A.push(S.iridescenceThicknessMapUv),A.push(S.sheenColorMapUv),A.push(S.sheenRoughnessMapUv),A.push(S.specularMapUv),A.push(S.specularColorMapUv),A.push(S.specularIntensityMapUv),A.push(S.transmissionMapUv),A.push(S.thicknessMapUv),A.push(S.combine),A.push(S.fogExp2),A.push(S.sizeAttenuation),A.push(S.morphTargetsCount),A.push(S.morphAttributeCount),A.push(S.numDirLights),A.push(S.numPointLights),A.push(S.numSpotLights),A.push(S.numSpotLightMaps),A.push(S.numHemiLights),A.push(S.numRectAreaLights),A.push(S.numDirLightShadows),A.push(S.numPointLightShadows),A.push(S.numSpotLightShadows),A.push(S.numSpotLightShadowsWithMaps),A.push(S.numLightProbes),A.push(S.shadowMapType),A.push(S.toneMapping),A.push(S.numClippingPlanes),A.push(S.numClipIntersection),A.push(S.depthPacking)}function E(A,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),A.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),A.push(a.mask)}function M(A){let S=_[A.type],O;if(S){let J=Vn[S];O=ug.clone(J.uniforms)}else O=A.uniforms;return O}function N(A,S){let O;for(let J=0,j=h.length;J<j;J++){let nt=h[J];if(nt.cacheKey===S){O=nt,++O.usedTimes;break}}return O===void 0&&(O=new yy(i,S,A,r),h.push(O)),O}function I(A){if(--A.usedTimes===0){let S=h.indexOf(A);h[S]=h[h.length-1],h.pop(),A.destroy()}}function D(A){c.remove(A)}function P(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:M,acquireProgram:N,releaseProgram:I,releaseShaderCache:D,programs:h,dispose:P}}function My(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Sy(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function yd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function xd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,f,p,_,x,g){let m=i[t];return m===void 0?(m={id:d.id,object:d,geometry:f,material:p,groupOrder:_,renderOrder:d.renderOrder,z:x,group:g},i[t]=m):(m.id=d.id,m.object=d,m.geometry=f,m.material=p,m.groupOrder=_,m.renderOrder=d.renderOrder,m.z=x,m.group=g),t++,m}function a(d,f,p,_,x,g){let m=o(d,f,p,_,x,g);p.transmission>0?n.push(m):p.transparent===!0?s.push(m):e.push(m)}function c(d,f,p,_,x,g){let m=o(d,f,p,_,x,g);p.transmission>0?n.unshift(m):p.transparent===!0?s.unshift(m):e.unshift(m)}function l(d,f){e.length>1&&e.sort(d||Sy),n.length>1&&n.sort(f||yd),s.length>1&&s.sort(f||yd)}function h(){for(let d=t,f=i.length;d<f;d++){let p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function wy(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new xd,i.set(n,[o])):s>=r.length?(o=new xd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Ey(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new oe};break;case"SpotLight":e={position:new L,direction:new L,color:new oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new oe,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new oe,groundColor:new oe};break;case"RectAreaLight":e={color:new oe,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Ty(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Ay=0;function Ry(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Cy(i){let t=new Ey,e=Ty(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new Ce,o=new Ce;function a(l){let h=0,d=0,f=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let p=0,_=0,x=0,g=0,m=0,T=0,E=0,M=0,N=0,I=0,D=0;l.sort(Ry);for(let A=0,S=l.length;A<S;A++){let O=l[A],J=O.color,j=O.intensity,nt=O.distance,ct=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)h+=J.r*j,d+=J.g*j,f+=J.b*j;else if(O.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(O.sh.coefficients[K],j);D++}else if(O.isDirectionalLight){let K=t.get(O);if(K.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let dt=O.shadow,tt=e.get(O);tt.shadowIntensity=dt.intensity,tt.shadowBias=dt.bias,tt.shadowNormalBias=dt.normalBias,tt.shadowRadius=dt.radius,tt.shadowMapSize=dt.mapSize,n.directionalShadow[p]=tt,n.directionalShadowMap[p]=ct,n.directionalShadowMatrix[p]=O.shadow.matrix,T++}n.directional[p]=K,p++}else if(O.isSpotLight){let K=t.get(O);K.position.setFromMatrixPosition(O.matrixWorld),K.color.copy(J).multiplyScalar(j),K.distance=nt,K.coneCos=Math.cos(O.angle),K.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),K.decay=O.decay,n.spot[x]=K;let dt=O.shadow;if(O.map&&(n.spotLightMap[N]=O.map,N++,dt.updateMatrices(O),O.castShadow&&I++),n.spotLightMatrix[x]=dt.matrix,O.castShadow){let tt=e.get(O);tt.shadowIntensity=dt.intensity,tt.shadowBias=dt.bias,tt.shadowNormalBias=dt.normalBias,tt.shadowRadius=dt.radius,tt.shadowMapSize=dt.mapSize,n.spotShadow[x]=tt,n.spotShadowMap[x]=ct,M++}x++}else if(O.isRectAreaLight){let K=t.get(O);K.color.copy(J).multiplyScalar(j),K.halfWidth.set(O.width*.5,0,0),K.halfHeight.set(0,O.height*.5,0),n.rectArea[g]=K,g++}else if(O.isPointLight){let K=t.get(O);if(K.color.copy(O.color).multiplyScalar(O.intensity),K.distance=O.distance,K.decay=O.decay,O.castShadow){let dt=O.shadow,tt=e.get(O);tt.shadowIntensity=dt.intensity,tt.shadowBias=dt.bias,tt.shadowNormalBias=dt.normalBias,tt.shadowRadius=dt.radius,tt.shadowMapSize=dt.mapSize,tt.shadowCameraNear=dt.camera.near,tt.shadowCameraFar=dt.camera.far,n.pointShadow[_]=tt,n.pointShadowMap[_]=ct,n.pointShadowMatrix[_]=O.shadow.matrix,E++}n.point[_]=K,_++}else if(O.isHemisphereLight){let K=t.get(O);K.skyColor.copy(O.color).multiplyScalar(j),K.groundColor.copy(O.groundColor).multiplyScalar(j),n.hemi[m]=K,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=St.LTC_FLOAT_1,n.rectAreaLTC2=St.LTC_FLOAT_2):(n.rectAreaLTC1=St.LTC_HALF_1,n.rectAreaLTC2=St.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;let P=n.hash;(P.directionalLength!==p||P.pointLength!==_||P.spotLength!==x||P.rectAreaLength!==g||P.hemiLength!==m||P.numDirectionalShadows!==T||P.numPointShadows!==E||P.numSpotShadows!==M||P.numSpotMaps!==N||P.numLightProbes!==D)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=g,n.point.length=_,n.hemi.length=m,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+N-I,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=D,P.directionalLength=p,P.pointLength=_,P.spotLength=x,P.rectAreaLength=g,P.hemiLength=m,P.numDirectionalShadows=T,P.numPointShadows=E,P.numSpotShadows=M,P.numSpotMaps=N,P.numLightProbes=D,n.version=Ay++)}function c(l,h){let d=0,f=0,p=0,_=0,x=0,g=h.matrixWorldInverse;for(let m=0,T=l.length;m<T;m++){let E=l[m];if(E.isDirectionalLight){let M=n.directional[d];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),d++}else if(E.isSpotLight){let M=n.spot[p];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),p++}else if(E.isRectAreaLight){let M=n.rectArea[_];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(E.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),f++}else if(E.isHemisphereLight){let M=n.hemi[x];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(g),x++}}}return{setup:a,setupView:c,state:n}}function bd(i){let t=new Cy(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Py(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new bd(i),t.set(s,[a])):r>=o.length?(a=new bd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Nl=class extends ji{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Mm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Fl=class extends ji{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Iy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ly=`uniform sampler2D shadow_pass;
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
}`;function Dy(i,t,e){let n=new Pr,s=new _t,r=new _t,o=new ve,a=new Nl({depthPacking:Sm}),c=new Fl,l={},h=e.maxTextureSize,d={[Ei]:on,[on]:Ei,[Dn]:Dn},f=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:Iy,fragmentShader:Ly}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let _=new an;_.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Xt(_,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Id;let m=this.type;this.render=function(I,D,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||I.length===0)return;let A=i.getRenderTarget(),S=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),J=i.state;J.setBlending(Si),J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);let j=m!==ni&&this.type===ni,nt=m===ni&&this.type!==ni;for(let ct=0,K=I.length;ct<K;ct++){let dt=I[ct],tt=dt.shadow;if(tt===void 0){console.warn("THREE.WebGLShadowMap:",dt,"has no shadow.");continue}if(tt.autoUpdate===!1&&tt.needsUpdate===!1)continue;s.copy(tt.mapSize);let gt=tt.getFrameExtents();if(s.multiply(gt),r.copy(tt.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/gt.x),s.x=r.x*gt.x,tt.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/gt.y),s.y=r.y*gt.y,tt.mapSize.y=r.y)),tt.map===null||j===!0||nt===!0){let Rt=this.type!==ni?{minFilter:On,magFilter:On}:{};tt.map!==null&&tt.map.dispose(),tt.map=new ci(s.x,s.y,Rt),tt.map.texture.name=dt.name+".shadowMap",tt.camera.updateProjectionMatrix()}i.setRenderTarget(tt.map),i.clear();let Et=tt.getViewportCount();for(let Rt=0;Rt<Et;Rt++){let Bt=tt.getViewport(Rt);o.set(r.x*Bt.x,r.y*Bt.y,r.x*Bt.z,r.y*Bt.w),J.viewport(o),tt.updateMatrices(dt,Rt),n=tt.getFrustum(),M(D,P,tt.camera,dt,this.type)}tt.isPointLightShadow!==!0&&this.type===ni&&T(tt,P),tt.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(A,S,O)};function T(I,D){let P=t.update(x);f.defines.VSM_SAMPLES!==I.blurSamples&&(f.defines.VSM_SAMPLES=I.blurSamples,p.defines.VSM_SAMPLES=I.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new ci(s.x,s.y)),f.uniforms.shadow_pass.value=I.map.texture,f.uniforms.resolution.value=I.mapSize,f.uniforms.radius.value=I.radius,i.setRenderTarget(I.mapPass),i.clear(),i.renderBufferDirect(D,null,P,f,x,null),p.uniforms.shadow_pass.value=I.mapPass.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,i.setRenderTarget(I.map),i.clear(),i.renderBufferDirect(D,null,P,p,x,null)}function E(I,D,P,A){let S=null,O=P.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(O!==void 0)S=O;else if(S=P.isPointLight===!0?c:a,i.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){let J=S.uuid,j=D.uuid,nt=l[J];nt===void 0&&(nt={},l[J]=nt);let ct=nt[j];ct===void 0&&(ct=S.clone(),nt[j]=ct,D.addEventListener("dispose",N)),S=ct}if(S.visible=D.visible,S.wireframe=D.wireframe,A===ni?S.side=D.shadowSide!==null?D.shadowSide:D.side:S.side=D.shadowSide!==null?D.shadowSide:d[D.side],S.alphaMap=D.alphaMap,S.alphaTest=D.alphaTest,S.map=D.map,S.clipShadows=D.clipShadows,S.clippingPlanes=D.clippingPlanes,S.clipIntersection=D.clipIntersection,S.displacementMap=D.displacementMap,S.displacementScale=D.displacementScale,S.displacementBias=D.displacementBias,S.wireframeLinewidth=D.wireframeLinewidth,S.linewidth=D.linewidth,P.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let J=i.properties.get(S);J.light=P}return S}function M(I,D,P,A,S){if(I.visible===!1)return;if(I.layers.test(D.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&S===ni)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,I.matrixWorld);let j=t.update(I),nt=I.material;if(Array.isArray(nt)){let ct=j.groups;for(let K=0,dt=ct.length;K<dt;K++){let tt=ct[K],gt=nt[tt.materialIndex];if(gt&&gt.visible){let Et=E(I,gt,A,S);I.onBeforeShadow(i,I,D,P,j,Et,tt),i.renderBufferDirect(P,null,j,Et,I,tt),I.onAfterShadow(i,I,D,P,j,Et,tt)}}}else if(nt.visible){let ct=E(I,nt,A,S);I.onBeforeShadow(i,I,D,P,j,ct,null),i.renderBufferDirect(P,null,j,ct,I,null),I.onAfterShadow(i,I,D,P,j,ct,null)}}let J=I.children;for(let j=0,nt=J.length;j<nt;j++)M(J[j],D,P,A,S)}function N(I){I.target.removeEventListener("dispose",N);for(let P in l){let A=l[P],S=I.target.uuid;S in A&&(A[S].dispose(),delete A[S])}}}var Uy={[Hc]:Vc,[Gc]:qc,[Wc]:$c,[zs]:Xc,[Vc]:Hc,[qc]:Gc,[$c]:Wc,[Xc]:zs};function Oy(i,t){function e(){let k=!1,wt=new ve,Q=null,ot=new ve(0,0,0,0);return{setMask:function(At){Q!==At&&!k&&(i.colorMask(At,At,At,At),Q=At)},setLocked:function(At){k=At},setClear:function(At,Tt,Ht,Z,Ee){Ee===!0&&(At*=Z,Tt*=Z,Ht*=Z),wt.set(At,Tt,Ht,Z),ot.equals(wt)===!1&&(i.clearColor(At,Tt,Ht,Z),ot.copy(wt))},reset:function(){k=!1,Q=null,ot.set(-1,0,0,0)}}}function n(){let k=!1,wt=!1,Q=null,ot=null,At=null;return{setReversed:function(Tt){if(wt!==Tt){let Ht=t.get("EXT_clip_control");wt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);let Z=At;At=null,this.setClear(Z)}wt=Tt},getReversed:function(){return wt},setTest:function(Tt){Tt?ut(i.DEPTH_TEST):Ft(i.DEPTH_TEST)},setMask:function(Tt){Q!==Tt&&!k&&(i.depthMask(Tt),Q=Tt)},setFunc:function(Tt){if(wt&&(Tt=Uy[Tt]),ot!==Tt){switch(Tt){case Hc:i.depthFunc(i.NEVER);break;case Vc:i.depthFunc(i.ALWAYS);break;case Gc:i.depthFunc(i.LESS);break;case zs:i.depthFunc(i.LEQUAL);break;case Wc:i.depthFunc(i.EQUAL);break;case Xc:i.depthFunc(i.GEQUAL);break;case qc:i.depthFunc(i.GREATER);break;case $c:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ot=Tt}},setLocked:function(Tt){k=Tt},setClear:function(Tt){At!==Tt&&(wt&&(Tt=1-Tt),i.clearDepth(Tt),At=Tt)},reset:function(){k=!1,Q=null,ot=null,At=null,wt=!1}}}function s(){let k=!1,wt=null,Q=null,ot=null,At=null,Tt=null,Ht=null,Z=null,Ee=null;return{setTest:function(de){k||(de?ut(i.STENCIL_TEST):Ft(i.STENCIL_TEST))},setMask:function(de){wt!==de&&!k&&(i.stencilMask(de),wt=de)},setFunc:function(de,en,un){(Q!==de||ot!==en||At!==un)&&(i.stencilFunc(de,en,un),Q=de,ot=en,At=un)},setOp:function(de,en,un){(Tt!==de||Ht!==en||Z!==un)&&(i.stencilOp(de,en,un),Tt=de,Ht=en,Z=un)},setLocked:function(de){k=de},setClear:function(de){Ee!==de&&(i.clearStencil(de),Ee=de)},reset:function(){k=!1,wt=null,Q=null,ot=null,At=null,Tt=null,Ht=null,Z=null,Ee=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},d={},f=new WeakMap,p=[],_=null,x=!1,g=null,m=null,T=null,E=null,M=null,N=null,I=null,D=new oe(0,0,0),P=0,A=!1,S=null,O=null,J=null,j=null,nt=null,ct=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,dt=0,tt=i.getParameter(i.VERSION);tt.indexOf("WebGL")!==-1?(dt=parseFloat(/^WebGL (\d)/.exec(tt)[1]),K=dt>=1):tt.indexOf("OpenGL ES")!==-1&&(dt=parseFloat(/^OpenGL ES (\d)/.exec(tt)[1]),K=dt>=2);let gt=null,Et={},Rt=i.getParameter(i.SCISSOR_BOX),Bt=i.getParameter(i.VIEWPORT),Nt=new ve().fromArray(Rt),X=new ve().fromArray(Bt);function ht(k,wt,Q,ot){let At=new Uint8Array(4),Tt=i.createTexture();i.bindTexture(k,Tt),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<Q;Ht++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(wt,0,i.RGBA,1,1,ot,0,i.RGBA,i.UNSIGNED_BYTE,At):i.texImage2D(wt+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,At);return Tt}let It={};It[i.TEXTURE_2D]=ht(i.TEXTURE_2D,i.TEXTURE_2D,1),It[i.TEXTURE_CUBE_MAP]=ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),It[i.TEXTURE_2D_ARRAY]=ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),It[i.TEXTURE_3D]=ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ut(i.DEPTH_TEST),o.setFunc(zs),Zt(!1),Jt(Mu),ut(i.CULL_FACE),H(Si);function ut(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function Ft(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function qt(k,wt){return d[k]!==wt?(i.bindFramebuffer(k,wt),d[k]=wt,k===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=wt),k===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=wt),!0):!1}function ee(k,wt){let Q=p,ot=!1;if(k){Q=f.get(wt),Q===void 0&&(Q=[],f.set(wt,Q));let At=k.textures;if(Q.length!==At.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let Tt=0,Ht=At.length;Tt<Ht;Tt++)Q[Tt]=i.COLOR_ATTACHMENT0+Tt;Q.length=At.length,ot=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,ot=!0);ot&&i.drawBuffers(Q)}function jt(k){return _!==k?(i.useProgram(k),_=k,!0):!1}let ae={[Hi]:i.FUNC_ADD,[Zp]:i.FUNC_SUBTRACT,[Jp]:i.FUNC_REVERSE_SUBTRACT};ae[Kp]=i.MIN,ae[Qp]=i.MAX;let Me={[tm]:i.ZERO,[em]:i.ONE,[nm]:i.SRC_COLOR,[Bc]:i.SRC_ALPHA,[cm]:i.SRC_ALPHA_SATURATE,[om]:i.DST_COLOR,[sm]:i.DST_ALPHA,[im]:i.ONE_MINUS_SRC_COLOR,[zc]:i.ONE_MINUS_SRC_ALPHA,[am]:i.ONE_MINUS_DST_COLOR,[rm]:i.ONE_MINUS_DST_ALPHA,[lm]:i.CONSTANT_COLOR,[hm]:i.ONE_MINUS_CONSTANT_COLOR,[um]:i.CONSTANT_ALPHA,[dm]:i.ONE_MINUS_CONSTANT_ALPHA};function H(k,wt,Q,ot,At,Tt,Ht,Z,Ee,de){if(k===Si){x===!0&&(Ft(i.BLEND),x=!1);return}if(x===!1&&(ut(i.BLEND),x=!0),k!==Yp){if(k!==g||de!==A){if((m!==Hi||M!==Hi)&&(i.blendEquation(i.FUNC_ADD),m=Hi,M=Hi),de)switch(k){case Ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Su:i.blendFunc(i.ONE,i.ONE);break;case wu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Eu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Su:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case wu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Eu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}T=null,E=null,N=null,I=null,D.set(0,0,0),P=0,g=k,A=de}return}At=At||wt,Tt=Tt||Q,Ht=Ht||ot,(wt!==m||At!==M)&&(i.blendEquationSeparate(ae[wt],ae[At]),m=wt,M=At),(Q!==T||ot!==E||Tt!==N||Ht!==I)&&(i.blendFuncSeparate(Me[Q],Me[ot],Me[Tt],Me[Ht]),T=Q,E=ot,N=Tt,I=Ht),(Z.equals(D)===!1||Ee!==P)&&(i.blendColor(Z.r,Z.g,Z.b,Ee),D.copy(Z),P=Ee),g=k,A=!1}function De(k,wt){k.side===Dn?Ft(i.CULL_FACE):ut(i.CULL_FACE);let Q=k.side===on;wt&&(Q=!Q),Zt(Q),k.blending===Ns&&k.transparent===!1?H(Si):H(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);let ot=k.stencilWrite;a.setTest(ot),ot&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),xe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ut(i.SAMPLE_ALPHA_TO_COVERAGE):Ft(i.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(k){S!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),S=k)}function Jt(k){k!==$p?(ut(i.CULL_FACE),k!==O&&(k===Mu?i.cullFace(i.BACK):k===jp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ft(i.CULL_FACE),O=k}function Ot(k){k!==J&&(K&&i.lineWidth(k),J=k)}function xe(k,wt,Q){k?(ut(i.POLYGON_OFFSET_FILL),(j!==wt||nt!==Q)&&(i.polygonOffset(wt,Q),j=wt,nt=Q)):Ft(i.POLYGON_OFFSET_FILL)}function vt(k){k?ut(i.SCISSOR_TEST):Ft(i.SCISSOR_TEST)}function C(k){k===void 0&&(k=i.TEXTURE0+ct-1),gt!==k&&(i.activeTexture(k),gt=k)}function b(k,wt,Q){Q===void 0&&(gt===null?Q=i.TEXTURE0+ct-1:Q=gt);let ot=Et[Q];ot===void 0&&(ot={type:void 0,texture:void 0},Et[Q]=ot),(ot.type!==k||ot.texture!==wt)&&(gt!==Q&&(i.activeTexture(Q),gt=Q),i.bindTexture(k,wt||It[k]),ot.type=k,ot.texture=wt)}function V(){let k=Et[gt];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function it(){try{i.compressedTexImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function st(){try{i.compressedTexImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function et(){try{i.texSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Lt(){try{i.texSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Mt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function pt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function zt(){try{i.texStorage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function rt(){try{i.texStorage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ft(){try{i.texImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function kt(){try{i.texImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Gt(k){Nt.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Nt.copy(k))}function Ct(k){X.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),X.copy(k))}function re(k,wt){let Q=l.get(wt);Q===void 0&&(Q=new WeakMap,l.set(wt,Q));let ot=Q.get(k);ot===void 0&&(ot=i.getUniformBlockIndex(wt,k.name),Q.set(k,ot))}function Kt(k,wt){let ot=l.get(wt).get(k);c.get(wt)!==ot&&(i.uniformBlockBinding(wt,ot,k.__bindingPointIndex),c.set(wt,ot))}function me(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},gt=null,Et={},d={},f=new WeakMap,p=[],_=null,x=!1,g=null,m=null,T=null,E=null,M=null,N=null,I=null,D=new oe(0,0,0),P=0,A=!1,S=null,O=null,J=null,j=null,nt=null,Nt.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ut,disable:Ft,bindFramebuffer:qt,drawBuffers:ee,useProgram:jt,setBlending:H,setMaterial:De,setFlipSided:Zt,setCullFace:Jt,setLineWidth:Ot,setPolygonOffset:xe,setScissorTest:vt,activeTexture:C,bindTexture:b,unbindTexture:V,compressedTexImage2D:it,compressedTexImage3D:st,texImage2D:ft,texImage3D:kt,updateUBOMapping:re,uniformBlockBinding:Kt,texStorage2D:zt,texStorage3D:rt,texSubImage2D:et,texSubImage3D:Lt,compressedTexSubImage2D:Mt,compressedTexSubImage3D:pt,scissor:Gt,viewport:Ct,reset:me}}function Md(i,t,e,n){let s=Ny(n);switch(e){case Fd:return i*t;case Bd:return i*t;case zd:return i*t*2;case Hd:return i*t/s.components*s.byteLength;case mh:return i*t/s.components*s.byteLength;case Vd:return i*t*2/s.components*s.byteLength;case gh:return i*t*2/s.components*s.byteLength;case kd:return i*t*3/s.components*s.byteLength;case Un:return i*t*4/s.components*s.byteLength;case _h:return i*t*4/s.components*s.byteLength;case ko:case Bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case zo:case Ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qc:case el:return Math.max(i,16)*Math.max(t,8)/4;case Kc:case tl:return Math.max(i,8)*Math.max(t,8)/2;case nl:case il:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case sl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case rl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ol:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case al:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case cl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ll:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case hl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ul:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case dl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case fl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case pl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ml:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case gl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case _l:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Vo:case yl:case xl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Gd:case bl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ml:case Sl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ny(i){switch(i){case oi:case Ud:return{byteLength:1,components:1};case Tr:case Od:case Nr:return{byteLength:2,components:1};case fh:case ph:return{byteLength:2,components:4};case qi:case dh:case ii:return{byteLength:4,components:1};case Nd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Fy(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new _t,h=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,b){return p?new OffscreenCanvas(C,b):Xo("canvas")}function x(C,b,V){let it=1,st=vt(C);if((st.width>V||st.height>V)&&(it=V/Math.max(st.width,st.height)),it<1)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap||typeof VideoFrame!="undefined"&&C instanceof VideoFrame){let et=Math.floor(it*st.width),Lt=Math.floor(it*st.height);d===void 0&&(d=_(et,Lt));let Mt=b?_(et,Lt):d;return Mt.width=et,Mt.height=Lt,Mt.getContext("2d").drawImage(C,0,0,et,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+et+"x"+Lt+")."),Mt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),C;return C}function g(C){return C.generateMipmaps}function m(C){i.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(C,b,V,it,st=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let et=b;if(b===i.RED&&(V===i.FLOAT&&(et=i.R32F),V===i.HALF_FLOAT&&(et=i.R16F),V===i.UNSIGNED_BYTE&&(et=i.R8)),b===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(et=i.R8UI),V===i.UNSIGNED_SHORT&&(et=i.R16UI),V===i.UNSIGNED_INT&&(et=i.R32UI),V===i.BYTE&&(et=i.R8I),V===i.SHORT&&(et=i.R16I),V===i.INT&&(et=i.R32I)),b===i.RG&&(V===i.FLOAT&&(et=i.RG32F),V===i.HALF_FLOAT&&(et=i.RG16F),V===i.UNSIGNED_BYTE&&(et=i.RG8)),b===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(et=i.RG8UI),V===i.UNSIGNED_SHORT&&(et=i.RG16UI),V===i.UNSIGNED_INT&&(et=i.RG32UI),V===i.BYTE&&(et=i.RG8I),V===i.SHORT&&(et=i.RG16I),V===i.INT&&(et=i.RG32I)),b===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(et=i.RGB8UI),V===i.UNSIGNED_SHORT&&(et=i.RGB16UI),V===i.UNSIGNED_INT&&(et=i.RGB32UI),V===i.BYTE&&(et=i.RGB8I),V===i.SHORT&&(et=i.RGB16I),V===i.INT&&(et=i.RGB32I)),b===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(et=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(et=i.RGBA16UI),V===i.UNSIGNED_INT&&(et=i.RGBA32UI),V===i.BYTE&&(et=i.RGBA8I),V===i.SHORT&&(et=i.RGBA16I),V===i.INT&&(et=i.RGBA32I)),b===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(et=i.RGB9_E5),b===i.RGBA){let Lt=st?xa:ue.getTransfer(it);V===i.FLOAT&&(et=i.RGBA32F),V===i.HALF_FLOAT&&(et=i.RGBA16F),V===i.UNSIGNED_BYTE&&(et=Lt===_e?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(et=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(et=i.RGB5_A1)}return(et===i.R16F||et===i.R32F||et===i.RG16F||et===i.RG32F||et===i.RGBA16F||et===i.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function M(C,b){let V;return C?b===null||b===qi||b===Gs?V=i.DEPTH24_STENCIL8:b===ii?V=i.DEPTH32F_STENCIL8:b===Tr&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===qi||b===Gs?V=i.DEPTH_COMPONENT24:b===ii?V=i.DEPTH_COMPONENT32F:b===Tr&&(V=i.DEPTH_COMPONENT16),V}function N(C,b){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==On&&C.minFilter!==Gn?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function I(C){let b=C.target;b.removeEventListener("dispose",I),P(b),b.isVideoTexture&&h.delete(b)}function D(C){let b=C.target;b.removeEventListener("dispose",D),S(b)}function P(C){let b=n.get(C);if(b.__webglInit===void 0)return;let V=C.source,it=f.get(V);if(it){let st=it[b.__cacheKey];st.usedTimes--,st.usedTimes===0&&A(C),Object.keys(it).length===0&&f.delete(V)}n.remove(C)}function A(C){let b=n.get(C);i.deleteTexture(b.__webglTexture);let V=C.source,it=f.get(V);delete it[b.__cacheKey],o.memory.textures--}function S(C){let b=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(b.__webglFramebuffer[it]))for(let st=0;st<b.__webglFramebuffer[it].length;st++)i.deleteFramebuffer(b.__webglFramebuffer[it][st]);else i.deleteFramebuffer(b.__webglFramebuffer[it]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[it])}else{if(Array.isArray(b.__webglFramebuffer))for(let it=0;it<b.__webglFramebuffer.length;it++)i.deleteFramebuffer(b.__webglFramebuffer[it]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let it=0;it<b.__webglColorRenderbuffer.length;it++)b.__webglColorRenderbuffer[it]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[it]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let V=C.textures;for(let it=0,st=V.length;it<st;it++){let et=n.get(V[it]);et.__webglTexture&&(i.deleteTexture(et.__webglTexture),o.memory.textures--),n.remove(V[it])}n.remove(C)}let O=0;function J(){O=0}function j(){let C=O;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),O+=1,C}function nt(C){let b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function ct(C,b){let V=n.get(C);if(C.isVideoTexture&&Ot(C),C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){let it=C.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(V,C,b);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+b)}function K(C,b){let V=n.get(C);if(C.version>0&&V.__version!==C.version){X(V,C,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+b)}function dt(C,b){let V=n.get(C);if(C.version>0&&V.__version!==C.version){X(V,C,b);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+b)}function tt(C,b){let V=n.get(C);if(C.version>0&&V.__version!==C.version){ht(V,C,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+b)}let gt={[Zc]:i.REPEAT,[Wi]:i.CLAMP_TO_EDGE,[Jc]:i.MIRRORED_REPEAT},Et={[On]:i.NEAREST,[bm]:i.NEAREST_MIPMAP_NEAREST,[mo]:i.NEAREST_MIPMAP_LINEAR,[Gn]:i.LINEAR,[oc]:i.LINEAR_MIPMAP_NEAREST,[Xi]:i.LINEAR_MIPMAP_LINEAR},Rt={[Em]:i.NEVER,[Im]:i.ALWAYS,[Tm]:i.LESS,[Xd]:i.LEQUAL,[Am]:i.EQUAL,[Pm]:i.GEQUAL,[Rm]:i.GREATER,[Cm]:i.NOTEQUAL};function Bt(C,b){if(b.type===ii&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Gn||b.magFilter===oc||b.magFilter===mo||b.magFilter===Xi||b.minFilter===Gn||b.minFilter===oc||b.minFilter===mo||b.minFilter===Xi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,gt[b.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,gt[b.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,gt[b.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Et[b.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Et[b.minFilter]),b.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Rt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===On||b.minFilter!==mo&&b.minFilter!==Xi||b.type===ii&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Nt(C,b){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",I));let it=b.source,st=f.get(it);st===void 0&&(st={},f.set(it,st));let et=nt(b);if(et!==C.__cacheKey){st[et]===void 0&&(st[et]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),st[et].usedTimes++;let Lt=st[C.__cacheKey];Lt!==void 0&&(st[C.__cacheKey].usedTimes--,Lt.usedTimes===0&&A(b)),C.__cacheKey=et,C.__webglTexture=st[et].texture}return V}function X(C,b,V){let it=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(it=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(it=i.TEXTURE_3D);let st=Nt(C,b),et=b.source;e.bindTexture(it,C.__webglTexture,i.TEXTURE0+V);let Lt=n.get(et);if(et.version!==Lt.__version||st===!0){e.activeTexture(i.TEXTURE0+V);let Mt=ue.getPrimaries(ue.workingColorSpace),pt=b.colorSpace===Mi?null:ue.getPrimaries(b.colorSpace),zt=b.colorSpace===Mi||Mt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);let rt=x(b.image,!1,s.maxTextureSize);rt=xe(b,rt);let ft=r.convert(b.format,b.colorSpace),kt=r.convert(b.type),Gt=E(b.internalFormat,ft,kt,b.colorSpace,b.isVideoTexture);Bt(it,b);let Ct,re=b.mipmaps,Kt=b.isVideoTexture!==!0,me=Lt.__version===void 0||st===!0,k=et.dataReady,wt=N(b,rt);if(b.isDepthTexture)Gt=M(b.format===Ws,b.type),me&&(Kt?e.texStorage2D(i.TEXTURE_2D,1,Gt,rt.width,rt.height):e.texImage2D(i.TEXTURE_2D,0,Gt,rt.width,rt.height,0,ft,kt,null));else if(b.isDataTexture)if(re.length>0){Kt&&me&&e.texStorage2D(i.TEXTURE_2D,wt,Gt,re[0].width,re[0].height);for(let Q=0,ot=re.length;Q<ot;Q++)Ct=re[Q],Kt?k&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,Ct.width,Ct.height,ft,kt,Ct.data):e.texImage2D(i.TEXTURE_2D,Q,Gt,Ct.width,Ct.height,0,ft,kt,Ct.data);b.generateMipmaps=!1}else Kt?(me&&e.texStorage2D(i.TEXTURE_2D,wt,Gt,rt.width,rt.height),k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,rt.width,rt.height,ft,kt,rt.data)):e.texImage2D(i.TEXTURE_2D,0,Gt,rt.width,rt.height,0,ft,kt,rt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Kt&&me&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,Gt,re[0].width,re[0].height,rt.depth);for(let Q=0,ot=re.length;Q<ot;Q++)if(Ct=re[Q],b.format!==Un)if(ft!==null)if(Kt){if(k)if(b.layerUpdates.size>0){let At=Md(Ct.width,Ct.height,b.format,b.type);for(let Tt of b.layerUpdates){let Ht=Ct.data.subarray(Tt*At/Ct.data.BYTES_PER_ELEMENT,(Tt+1)*At/Ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,Tt,Ct.width,Ct.height,1,ft,Ht)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,Ct.width,Ct.height,rt.depth,ft,Ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,Gt,Ct.width,Ct.height,rt.depth,0,Ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?k&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,Ct.width,Ct.height,rt.depth,ft,kt,Ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Q,Gt,Ct.width,Ct.height,rt.depth,0,ft,kt,Ct.data)}else{Kt&&me&&e.texStorage2D(i.TEXTURE_2D,wt,Gt,re[0].width,re[0].height);for(let Q=0,ot=re.length;Q<ot;Q++)Ct=re[Q],b.format!==Un?ft!==null?Kt?k&&e.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,Ct.width,Ct.height,ft,Ct.data):e.compressedTexImage2D(i.TEXTURE_2D,Q,Gt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?k&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,Ct.width,Ct.height,ft,kt,Ct.data):e.texImage2D(i.TEXTURE_2D,Q,Gt,Ct.width,Ct.height,0,ft,kt,Ct.data)}else if(b.isDataArrayTexture)if(Kt){if(me&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,Gt,rt.width,rt.height,rt.depth),k)if(b.layerUpdates.size>0){let Q=Md(rt.width,rt.height,b.format,b.type);for(let ot of b.layerUpdates){let At=rt.data.subarray(ot*Q/rt.data.BYTES_PER_ELEMENT,(ot+1)*Q/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ot,rt.width,rt.height,1,ft,kt,At)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,ft,kt,rt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Gt,rt.width,rt.height,rt.depth,0,ft,kt,rt.data);else if(b.isData3DTexture)Kt?(me&&e.texStorage3D(i.TEXTURE_3D,wt,Gt,rt.width,rt.height,rt.depth),k&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,ft,kt,rt.data)):e.texImage3D(i.TEXTURE_3D,0,Gt,rt.width,rt.height,rt.depth,0,ft,kt,rt.data);else if(b.isFramebufferTexture){if(me)if(Kt)e.texStorage2D(i.TEXTURE_2D,wt,Gt,rt.width,rt.height);else{let Q=rt.width,ot=rt.height;for(let At=0;At<wt;At++)e.texImage2D(i.TEXTURE_2D,At,Gt,Q,ot,0,ft,kt,null),Q>>=1,ot>>=1}}else if(re.length>0){if(Kt&&me){let Q=vt(re[0]);e.texStorage2D(i.TEXTURE_2D,wt,Gt,Q.width,Q.height)}for(let Q=0,ot=re.length;Q<ot;Q++)Ct=re[Q],Kt?k&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,ft,kt,Ct):e.texImage2D(i.TEXTURE_2D,Q,Gt,ft,kt,Ct);b.generateMipmaps=!1}else if(Kt){if(me){let Q=vt(rt);e.texStorage2D(i.TEXTURE_2D,wt,Gt,Q.width,Q.height)}k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft,kt,rt)}else e.texImage2D(i.TEXTURE_2D,0,Gt,ft,kt,rt);g(b)&&m(it),Lt.__version=et.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function ht(C,b,V){if(b.image.length!==6)return;let it=Nt(C,b),st=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+V);let et=n.get(st);if(st.version!==et.__version||it===!0){e.activeTexture(i.TEXTURE0+V);let Lt=ue.getPrimaries(ue.workingColorSpace),Mt=b.colorSpace===Mi?null:ue.getPrimaries(b.colorSpace),pt=b.colorSpace===Mi||Lt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);let zt=b.isCompressedTexture||b.image[0].isCompressedTexture,rt=b.image[0]&&b.image[0].isDataTexture,ft=[];for(let ot=0;ot<6;ot++)!zt&&!rt?ft[ot]=x(b.image[ot],!0,s.maxCubemapSize):ft[ot]=rt?b.image[ot].image:b.image[ot],ft[ot]=xe(b,ft[ot]);let kt=ft[0],Gt=r.convert(b.format,b.colorSpace),Ct=r.convert(b.type),re=E(b.internalFormat,Gt,Ct,b.colorSpace),Kt=b.isVideoTexture!==!0,me=et.__version===void 0||it===!0,k=st.dataReady,wt=N(b,kt);Bt(i.TEXTURE_CUBE_MAP,b);let Q;if(zt){Kt&&me&&e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,re,kt.width,kt.height);for(let ot=0;ot<6;ot++){Q=ft[ot].mipmaps;for(let At=0;At<Q.length;At++){let Tt=Q[At];b.format!==Un?Gt!==null?Kt?k&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At,0,0,Tt.width,Tt.height,Gt,Tt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At,re,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At,0,0,Tt.width,Tt.height,Gt,Ct,Tt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At,re,Tt.width,Tt.height,0,Gt,Ct,Tt.data)}}}else{if(Q=b.mipmaps,Kt&&me){Q.length>0&&wt++;let ot=vt(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,re,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(rt){Kt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,ft[ot].width,ft[ot].height,Gt,Ct,ft[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,re,ft[ot].width,ft[ot].height,0,Gt,Ct,ft[ot].data);for(let At=0;At<Q.length;At++){let Ht=Q[At].image[ot].image;Kt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At+1,0,0,Ht.width,Ht.height,Gt,Ct,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At+1,re,Ht.width,Ht.height,0,Gt,Ct,Ht.data)}}else{Kt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Gt,Ct,ft[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,re,Gt,Ct,ft[ot]);for(let At=0;At<Q.length;At++){let Tt=Q[At];Kt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At+1,0,0,Gt,Ct,Tt.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,At+1,re,Gt,Ct,Tt.image[ot])}}}g(b)&&m(i.TEXTURE_CUBE_MAP),et.__version=st.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function It(C,b,V,it,st,et){let Lt=r.convert(V.format,V.colorSpace),Mt=r.convert(V.type),pt=E(V.internalFormat,Lt,Mt,V.colorSpace),zt=n.get(b),rt=n.get(V);if(rt.__renderTarget=b,!zt.__hasExternalTextures){let ft=Math.max(1,b.width>>et),kt=Math.max(1,b.height>>et);st===i.TEXTURE_3D||st===i.TEXTURE_2D_ARRAY?e.texImage3D(st,et,pt,ft,kt,b.depth,0,Lt,Mt,null):e.texImage2D(st,et,pt,ft,kt,0,Lt,Mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),Jt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,it,st,rt.__webglTexture,0,Zt(b)):(st===i.TEXTURE_2D||st>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,it,st,rt.__webglTexture,et),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ut(C,b,V){if(i.bindRenderbuffer(i.RENDERBUFFER,C),b.depthBuffer){let it=b.depthTexture,st=it&&it.isDepthTexture?it.type:null,et=M(b.stencilBuffer,st),Lt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=Zt(b);Jt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt,et,b.width,b.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,et,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,et,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,C)}else{let it=b.textures;for(let st=0;st<it.length;st++){let et=it[st],Lt=r.convert(et.format,et.colorSpace),Mt=r.convert(et.type),pt=E(et.internalFormat,Lt,Mt,et.colorSpace),zt=Zt(b);V&&Jt(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,pt,b.width,b.height):Jt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,zt,pt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,pt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ft(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let it=n.get(b.depthTexture);it.__renderTarget=b,(!it.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ct(b.depthTexture,0);let st=it.__webglTexture,et=Zt(b);if(b.depthTexture.format===Fs)Jt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0);else if(b.depthTexture.format===Ws)Jt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function qt(C){let b=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){let it=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),it){let st=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,it.removeEventListener("dispose",st)};it.addEventListener("dispose",st),b.__depthDisposeCallback=st}b.__boundDepthTexture=it}if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Ft(b.__webglFramebuffer,C)}else if(V){b.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[it]),b.__webglDepthbuffer[it]===void 0)b.__webglDepthbuffer[it]=i.createRenderbuffer(),ut(b.__webglDepthbuffer[it],C,!1);else{let st=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=b.__webglDepthbuffer[it];i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,et)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ut(b.__webglDepthbuffer,C,!1);else{let it=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,st)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(C,b,V){let it=n.get(C);b!==void 0&&It(it.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&qt(C)}function jt(C){let b=C.texture,V=n.get(C),it=n.get(b);C.addEventListener("dispose",D);let st=C.textures,et=C.isWebGLCubeRenderTarget===!0,Lt=st.length>1;if(Lt||(it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture()),it.__version=b.version,o.memory.textures++),et){V.__webglFramebuffer=[];for(let Mt=0;Mt<6;Mt++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[Mt]=[];for(let pt=0;pt<b.mipmaps.length;pt++)V.__webglFramebuffer[Mt][pt]=i.createFramebuffer()}else V.__webglFramebuffer[Mt]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let Mt=0;Mt<b.mipmaps.length;Mt++)V.__webglFramebuffer[Mt]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let Mt=0,pt=st.length;Mt<pt;Mt++){let zt=n.get(st[Mt]);zt.__webglTexture===void 0&&(zt.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&Jt(C)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Mt=0;Mt<st.length;Mt++){let pt=st[Mt];V.__webglColorRenderbuffer[Mt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[Mt]);let zt=r.convert(pt.format,pt.colorSpace),rt=r.convert(pt.type),ft=E(pt.internalFormat,zt,rt,pt.colorSpace,C.isXRRenderTarget===!0),kt=Zt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,ft,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,V.__webglColorRenderbuffer[Mt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ut(V.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(et){e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),Bt(i.TEXTURE_CUBE_MAP,b);for(let Mt=0;Mt<6;Mt++)if(b.mipmaps&&b.mipmaps.length>0)for(let pt=0;pt<b.mipmaps.length;pt++)It(V.__webglFramebuffer[Mt][pt],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,pt);else It(V.__webglFramebuffer[Mt],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0);g(b)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let Mt=0,pt=st.length;Mt<pt;Mt++){let zt=st[Mt],rt=n.get(zt);e.bindTexture(i.TEXTURE_2D,rt.__webglTexture),Bt(i.TEXTURE_2D,zt),It(V.__webglFramebuffer,C,zt,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,0),g(zt)&&m(i.TEXTURE_2D)}e.unbindTexture()}else{let Mt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Mt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Mt,it.__webglTexture),Bt(Mt,b),b.mipmaps&&b.mipmaps.length>0)for(let pt=0;pt<b.mipmaps.length;pt++)It(V.__webglFramebuffer[pt],C,b,i.COLOR_ATTACHMENT0,Mt,pt);else It(V.__webglFramebuffer,C,b,i.COLOR_ATTACHMENT0,Mt,0);g(b)&&m(Mt),e.unbindTexture()}C.depthBuffer&&qt(C)}function ae(C){let b=C.textures;for(let V=0,it=b.length;V<it;V++){let st=b[V];if(g(st)){let et=T(C),Lt=n.get(st).__webglTexture;e.bindTexture(et,Lt),m(et),e.unbindTexture()}}}let Me=[],H=[];function De(C){if(C.samples>0){if(Jt(C)===!1){let b=C.textures,V=C.width,it=C.height,st=i.COLOR_BUFFER_BIT,et=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(C),Mt=b.length>1;if(Mt)for(let pt=0;pt<b.length;pt++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let pt=0;pt<b.length;pt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(st|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(st|=i.STENCIL_BUFFER_BIT)),Mt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[pt]);let zt=n.get(b[pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,zt,0)}i.blitFramebuffer(0,0,V,it,0,0,V,it,st,i.NEAREST),c===!0&&(Me.length=0,H.length=0,Me.push(i.COLOR_ATTACHMENT0+pt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Me.push(et),H.push(et),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,H)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Me))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Mt)for(let pt=0;pt<b.length;pt++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[pt]);let zt=n.get(b[pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,zt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let b=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function Zt(C){return Math.min(s.maxSamples,C.samples)}function Jt(C){let b=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ot(C){let b=o.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function xe(C,b){let V=C.colorSpace,it=C.format,st=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==Ys&&V!==Mi&&(ue.getTransfer(V)===_e?(it!==Un||st!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),b}function vt(C){return typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame!="undefined"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=j,this.resetTextureUnits=J,this.setTexture2D=ct,this.setTexture2DArray=K,this.setTexture3D=dt,this.setTextureCube=tt,this.rebindTextures=ee,this.setupRenderTarget=jt,this.updateRenderTargetMipmap=ae,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=qt,this.setupFrameBufferTexture=It,this.useMultisampledRTT=Jt}function ky(i,t){function e(n,s=Mi){let r,o=ue.getTransfer(s);if(n===oi)return i.UNSIGNED_BYTE;if(n===fh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ph)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Nd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ud)return i.BYTE;if(n===Od)return i.SHORT;if(n===Tr)return i.UNSIGNED_SHORT;if(n===dh)return i.INT;if(n===qi)return i.UNSIGNED_INT;if(n===ii)return i.FLOAT;if(n===Nr)return i.HALF_FLOAT;if(n===Fd)return i.ALPHA;if(n===kd)return i.RGB;if(n===Un)return i.RGBA;if(n===Bd)return i.LUMINANCE;if(n===zd)return i.LUMINANCE_ALPHA;if(n===Fs)return i.DEPTH_COMPONENT;if(n===Ws)return i.DEPTH_STENCIL;if(n===Hd)return i.RED;if(n===mh)return i.RED_INTEGER;if(n===Vd)return i.RG;if(n===gh)return i.RG_INTEGER;if(n===_h)return i.RGBA_INTEGER;if(n===ko||n===Bo||n===zo||n===Ho)if(o===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ko)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ko)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ho)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Kc||n===Qc||n===tl||n===el)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Kc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===el)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nl||n===il||n===sl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===nl||n===il)return o===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===rl||n===ol||n===al||n===cl||n===ll||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===vl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===rl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ol)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===al)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===cl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ll)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ul)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===dl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ml)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===gl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_l)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vo||n===yl||n===xl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Vo)return o===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gd||n===bl||n===Ml||n===Sl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===bl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ml)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var kl=class extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Se=class extends Qe{constructor(){super(),this.isGroup=!0,this.type="Group"}},By={type:"move"},Sr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let g=e.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=h.position.distanceTo(d.position),p=.02,_=.005;l.inputState.pinching&&f>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(By)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Se;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},zy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hy=`
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

}`,Bl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new Ke,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Xn({vertexShader:zy,fragmentShader:Hy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Xt(new Mn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},zl=class extends ai{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,f=null,p=null,_=null,x=new Bl,g=e.getContextAttributes(),m=null,T=null,E=[],M=[],N=new _t,I=null,D=new je;D.viewport=new ve;let P=new je;P.viewport=new ve;let A=[D,P],S=new kl,O=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ht=E[X];return ht===void 0&&(ht=new Sr,E[X]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(X){let ht=E[X];return ht===void 0&&(ht=new Sr,E[X]=ht),ht.getGripSpace()},this.getHand=function(X){let ht=E[X];return ht===void 0&&(ht=new Sr,E[X]=ht),ht.getHandSpace()};function j(X){let ht=M.indexOf(X.inputSource);if(ht===-1)return;let It=E[ht];It!==void 0&&(It.update(X.inputSource,X.frame,l||o),It.dispatchEvent({type:X.type,data:X.inputSource}))}function nt(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",nt),s.removeEventListener("inputsourceschange",ct);for(let X=0;X<E.length;X++){let ht=M[X];ht!==null&&(M[X]=null,E[X].disconnect(ht))}O=null,J=null,x.reset(),t.setRenderTarget(m),p=null,f=null,d=null,s=null,T=null,Nt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",nt),s.addEventListener("inputsourceschange",ct),g.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){let ht={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,ht),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new ci(p.framebufferWidth,p.framebufferHeight,{format:Un,type:oi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let ht=null,It=null,ut=null;g.depth&&(ut=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=g.stencil?Ws:Fs,It=g.stencil?Gs:qi);let Ft={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:r};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(Ft),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),T=new ci(f.textureWidth,f.textureHeight,{format:Un,type:oi,depthTexture:new ta(f.textureWidth,f.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Nt.setContext(s),Nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function ct(X){for(let ht=0;ht<X.removed.length;ht++){let It=X.removed[ht],ut=M.indexOf(It);ut>=0&&(M[ut]=null,E[ut].disconnect(It))}for(let ht=0;ht<X.added.length;ht++){let It=X.added[ht],ut=M.indexOf(It);if(ut===-1){for(let qt=0;qt<E.length;qt++)if(qt>=M.length){M.push(It),ut=qt;break}else if(M[qt]===null){M[qt]=It,ut=qt;break}if(ut===-1)break}let Ft=E[ut];Ft&&Ft.connect(It)}}let K=new L,dt=new L;function tt(X,ht,It){K.setFromMatrixPosition(ht.matrixWorld),dt.setFromMatrixPosition(It.matrixWorld);let ut=K.distanceTo(dt),Ft=ht.projectionMatrix.elements,qt=It.projectionMatrix.elements,ee=Ft[14]/(Ft[10]-1),jt=Ft[14]/(Ft[10]+1),ae=(Ft[9]+1)/Ft[5],Me=(Ft[9]-1)/Ft[5],H=(Ft[8]-1)/Ft[0],De=(qt[8]+1)/qt[0],Zt=ee*H,Jt=ee*De,Ot=ut/(-H+De),xe=Ot*-H;if(ht.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(xe),X.translateZ(Ot),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ft[10]===-1)X.projectionMatrix.copy(ht.projectionMatrix),X.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{let vt=ee+Ot,C=jt+Ot,b=Zt-xe,V=Jt+(ut-xe),it=ae*jt/C*vt,st=Me*jt/C*vt;X.projectionMatrix.makePerspective(b,V,it,st,vt,C),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function gt(X,ht){ht===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ht.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let ht=X.near,It=X.far;x.texture!==null&&(x.depthNear>0&&(ht=x.depthNear),x.depthFar>0&&(It=x.depthFar)),S.near=P.near=D.near=ht,S.far=P.far=D.far=It,(O!==S.near||J!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),O=S.near,J=S.far),D.layers.mask=X.layers.mask|2,P.layers.mask=X.layers.mask|4,S.layers.mask=D.layers.mask|P.layers.mask;let ut=X.parent,Ft=S.cameras;gt(S,ut);for(let qt=0;qt<Ft.length;qt++)gt(Ft[qt],ut);Ft.length===2?tt(S,D,P):S.projectionMatrix.copy(D.projectionMatrix),Et(X,S,ut)};function Et(X,ht,It){It===null?X.matrix.copy(ht.matrixWorld):(X.matrix.copy(It.matrixWorld),X.matrix.invert(),X.matrix.multiply(ht.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ht.projectionMatrix),X.projectionMatrixInverse.copy(ht.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ar*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(S)};let Rt=null;function Bt(X,ht){if(h=ht.getViewerPose(l||o),_=ht,h!==null){let It=h.views;p!==null&&(t.setRenderTargetFramebuffer(T,p.framebuffer),t.setRenderTarget(T));let ut=!1;It.length!==S.cameras.length&&(S.cameras.length=0,ut=!0);for(let qt=0;qt<It.length;qt++){let ee=It[qt],jt=null;if(p!==null)jt=p.getViewport(ee);else{let Me=d.getViewSubImage(f,ee);jt=Me.viewport,qt===0&&(t.setRenderTargetTextures(T,Me.colorTexture,f.ignoreDepthValues?void 0:Me.depthStencilTexture),t.setRenderTarget(T))}let ae=A[qt];ae===void 0&&(ae=new je,ae.layers.enable(qt),ae.viewport=new ve,A[qt]=ae),ae.matrix.fromArray(ee.transform.matrix),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.projectionMatrix.fromArray(ee.projectionMatrix),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert(),ae.viewport.set(jt.x,jt.y,jt.width,jt.height),qt===0&&(S.matrix.copy(ae.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ut===!0&&S.cameras.push(ae)}let Ft=s.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")){let qt=d.getDepthInformation(It[0]);qt&&qt.isValid&&qt.texture&&x.init(t,qt,s.renderState)}}for(let It=0;It<E.length;It++){let ut=M[It],Ft=E[It];ut!==null&&Ft!==void 0&&Ft.update(ut,ht,l||o)}Rt&&Rt(X,ht),ht.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ht}),_=null}let Nt=new Yd;Nt.setAnimationLoop(Bt),this.setAnimationLoop=function(X){Rt=X},this.dispose=function(){}}},Bi=new Wn,Vy=new Ce;function Gy(i,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,jd(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,T,E,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&p(g,m,M)):m.isMeshMatcapMaterial?(r(g,m),_(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,T,E):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===on&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===on&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let T=t.get(m),E=T.envMap,M=T.envMapRotation;E&&(g.envMap.value=E,Bi.copy(M),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),g.envMapRotation.value.setFromMatrix4(Vy.makeRotationFromEuler(Bi)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,T,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*T,g.scale.value=E*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,T){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===on&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let T=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Wy(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,E){let M=E.program;n.uniformBlockBinding(T,M)}function l(T,E){let M=s[T.id];M===void 0&&(_(T),M=h(T),s[T.id]=M,T.addEventListener("dispose",g));let N=E.program;n.updateUBOMapping(T,N);let I=t.render.frame;r[T.id]!==I&&(f(T),r[T.id]=I)}function h(T){let E=d();T.__bindingPointIndex=E;let M=i.createBuffer(),N=T.__size,I=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,N,I),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,M),M}function d(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){let E=s[T.id],M=T.uniforms,N=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let I=0,D=M.length;I<D;I++){let P=Array.isArray(M[I])?M[I]:[M[I]];for(let A=0,S=P.length;A<S;A++){let O=P[A];if(p(O,I,A,N)===!0){let J=O.__offset,j=Array.isArray(O.value)?O.value:[O.value],nt=0;for(let ct=0;ct<j.length;ct++){let K=j[ct],dt=x(K);typeof K=="number"||typeof K=="boolean"?(O.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,J+nt,O.__data)):K.isMatrix3?(O.__data[0]=K.elements[0],O.__data[1]=K.elements[1],O.__data[2]=K.elements[2],O.__data[3]=0,O.__data[4]=K.elements[3],O.__data[5]=K.elements[4],O.__data[6]=K.elements[5],O.__data[7]=0,O.__data[8]=K.elements[6],O.__data[9]=K.elements[7],O.__data[10]=K.elements[8],O.__data[11]=0):(K.toArray(O.__data,nt),nt+=dt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,J,O.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,E,M,N){let I=T.value,D=E+"_"+M;if(N[D]===void 0)return typeof I=="number"||typeof I=="boolean"?N[D]=I:N[D]=I.clone(),!0;{let P=N[D];if(typeof I=="number"||typeof I=="boolean"){if(P!==I)return N[D]=I,!0}else if(P.equals(I)===!1)return P.copy(I),!0}return!1}function _(T){let E=T.uniforms,M=0,N=16;for(let D=0,P=E.length;D<P;D++){let A=Array.isArray(E[D])?E[D]:[E[D]];for(let S=0,O=A.length;S<O;S++){let J=A[S],j=Array.isArray(J.value)?J.value:[J.value];for(let nt=0,ct=j.length;nt<ct;nt++){let K=j[nt],dt=x(K),tt=M%N,gt=tt%dt.boundary,Et=tt+gt;M+=gt,Et!==0&&N-Et<dt.storage&&(M+=N-Et),J.__data=new Float32Array(dt.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=M,M+=dt.storage}}}let I=M%N;return I>0&&(M+=N-I),T.__size=M,T.__cache={},this}function x(T){let E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function g(T){let E=T.target;E.removeEventListener("dispose",g);let M=o.indexOf(E.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(let T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:c,update:l,dispose:m}}var ea=class{constructor(t={}){let{canvas:e=jm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=new Uint32Array(4),x=new Int32Array(4),g=null,m=null,T=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=$e,this.toneMapping=wi,this.toneMappingExposure=1;let M=this,N=!1,I=0,D=0,P=null,A=-1,S=null,O=new ve,J=new ve,j=null,nt=new oe(0),ct=0,K=e.width,dt=e.height,tt=1,gt=null,Et=null,Rt=new ve(0,0,K,dt),Bt=new ve(0,0,K,dt),Nt=!1,X=new Pr,ht=!1,It=!1,ut=new Ce,Ft=new Ce,qt=new L,ee=new ve,jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ae=!1;function Me(){return P===null?tt:1}let H=n;function De(w,z){return e.getContext(w,z)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${lh}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",Tt,!1),H===null){let z="webgl2";if(H=De(z,w),H===null)throw De(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Zt,Jt,Ot,xe,vt,C,b,V,it,st,et,Lt,Mt,pt,zt,rt,ft,kt,Gt,Ct,re,Kt,me,k;function wt(){Zt=new ov(H),Zt.init(),Kt=new ky(H,Zt),Jt=new tv(H,Zt,t,Kt),Ot=new Oy(H,Zt),Jt.reverseDepthBuffer&&f&&Ot.buffers.depth.setReversed(!0),xe=new lv(H),vt=new My,C=new Fy(H,Zt,Ot,vt,Jt,Kt,xe),b=new nv(M),V=new rv(M),it=new gg(H),me=new K0(H,it),st=new av(H,it,xe,me),et=new uv(H,st,it,xe),Gt=new hv(H,Jt,C),rt=new ev(vt),Lt=new by(M,b,V,Zt,Jt,me,rt),Mt=new Gy(M,vt),pt=new wy,zt=new Py(Zt),kt=new J0(M,b,V,Ot,et,p,c),ft=new Dy(M,et,Jt),k=new Wy(H,xe,Jt,Ot),Ct=new Q0(H,Zt,xe),re=new cv(H,Zt,xe),xe.programs=Lt.programs,M.capabilities=Jt,M.extensions=Zt,M.properties=vt,M.renderLists=pt,M.shadowMap=ft,M.state=Ot,M.info=xe}wt();let Q=new zl(M,H);this.xr=Q,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let w=Zt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Zt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(w){w!==void 0&&(tt=w,this.setSize(K,dt,!1))},this.getSize=function(w){return w.set(K,dt)},this.setSize=function(w,z,W=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=w,dt=z,e.width=Math.floor(w*tt),e.height=Math.floor(z*tt),W===!0&&(e.style.width=w+"px",e.style.height=z+"px"),this.setViewport(0,0,w,z)},this.getDrawingBufferSize=function(w){return w.set(K*tt,dt*tt).floor()},this.setDrawingBufferSize=function(w,z,W){K=w,dt=z,tt=W,e.width=Math.floor(w*W),e.height=Math.floor(z*W),this.setViewport(0,0,w,z)},this.getCurrentViewport=function(w){return w.copy(O)},this.getViewport=function(w){return w.copy(Rt)},this.setViewport=function(w,z,W,Y){w.isVector4?Rt.set(w.x,w.y,w.z,w.w):Rt.set(w,z,W,Y),Ot.viewport(O.copy(Rt).multiplyScalar(tt).round())},this.getScissor=function(w){return w.copy(Bt)},this.setScissor=function(w,z,W,Y){w.isVector4?Bt.set(w.x,w.y,w.z,w.w):Bt.set(w,z,W,Y),Ot.scissor(J.copy(Bt).multiplyScalar(tt).round())},this.getScissorTest=function(){return Nt},this.setScissorTest=function(w){Ot.setScissorTest(Nt=w)},this.setOpaqueSort=function(w){gt=w},this.setTransparentSort=function(w){Et=w},this.getClearColor=function(w){return w.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor.apply(kt,arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha.apply(kt,arguments)},this.clear=function(w=!0,z=!0,W=!0){let Y=0;if(w){let B=!1;if(P!==null){let at=P.texture.format;B=at===_h||at===gh||at===mh}if(B){let at=P.texture.type,bt=at===oi||at===qi||at===Tr||at===Gs||at===fh||at===ph,Dt=kt.getClearColor(),mt=kt.getClearAlpha(),$t=Dt.r,Wt=Dt.g,Pt=Dt.b;bt?(_[0]=$t,_[1]=Wt,_[2]=Pt,_[3]=mt,H.clearBufferuiv(H.COLOR,0,_)):(x[0]=$t,x[1]=Wt,x[2]=Pt,x[3]=mt,H.clearBufferiv(H.COLOR,0,x))}else Y|=H.COLOR_BUFFER_BIT}z&&(Y|=H.DEPTH_BUFFER_BIT),W&&(Y|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",Tt,!1),pt.dispose(),zt.dispose(),vt.dispose(),b.dispose(),V.dispose(),et.dispose(),me.dispose(),k.dispose(),Lt.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",cr),Q.removeEventListener("sessionend",di),Tn.stop()};function ot(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;let w=xe.autoReset,z=ft.enabled,W=ft.autoUpdate,Y=ft.needsUpdate,B=ft.type;wt(),xe.autoReset=w,ft.enabled=z,ft.autoUpdate=W,ft.needsUpdate=Y,ft.type=B}function Tt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ht(w){let z=w.target;z.removeEventListener("dispose",Ht),Z(z)}function Z(w){Ee(w),vt.remove(w)}function Ee(w){let z=vt.get(w).programs;z!==void 0&&(z.forEach(function(W){Lt.releaseProgram(W)}),w.isShaderMaterial&&Lt.releaseShaderCache(w))}this.renderBufferDirect=function(w,z,W,Y,B,at){z===null&&(z=jt);let bt=B.isMesh&&B.matrixWorld.determinant()<0,Dt=Xa(w,z,W,Y,B);Ot.setMaterial(Y,bt);let mt=W.index,$t=1;if(Y.wireframe===!0){if(mt=st.getWireframeAttribute(W),mt===void 0)return;$t=2}let Wt=W.drawRange,Pt=W.attributes.position,Yt=Wt.start*$t,fe=(Wt.start+Wt.count)*$t;at!==null&&(Yt=Math.max(Yt,at.start*$t),fe=Math.min(fe,(at.start+at.count)*$t)),mt!==null?(Yt=Math.max(Yt,0),fe=Math.min(fe,mt.count)):Pt!=null&&(Yt=Math.max(Yt,0),fe=Math.min(fe,Pt.count));let ge=fe-Yt;if(ge<0||ge===1/0)return;me.setup(B,Y,Dt,W,mt);let Te,ne=Ct;if(mt!==null&&(Te=it.get(mt),ne=re,ne.setIndex(Te)),B.isMesh)Y.wireframe===!0?(Ot.setLineWidth(Y.wireframeLinewidth*Me()),ne.setMode(H.LINES)):ne.setMode(H.TRIANGLES);else if(B.isLine){let yt=Y.linewidth;yt===void 0&&(yt=1),Ot.setLineWidth(yt*Me()),B.isLineSegments?ne.setMode(H.LINES):B.isLineLoop?ne.setMode(H.LINE_LOOP):ne.setMode(H.LINE_STRIP)}else B.isPoints?ne.setMode(H.POINTS):B.isSprite&&ne.setMode(H.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)ne.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))ne.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let yt=B._multiDrawStarts,Ge=B._multiDrawCounts,se=B._multiDrawCount,dn=mt?it.get(mt).bytesPerElement:1,jn=vt.get(Y).currentProgram.getUniforms();for(let We=0;We<se;We++)jn.setValue(H,"_gl_DrawID",We),ne.render(yt[We]/dn,Ge[We])}else if(B.isInstancedMesh)ne.renderInstances(Yt,ge,B.count);else if(W.isInstancedBufferGeometry){let yt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Ge=Math.min(W.instanceCount,yt);ne.renderInstances(Yt,ge,Ge)}else ne.render(Yt,ge)};function de(w,z,W){w.transparent===!0&&w.side===Dn&&w.forceSinglePass===!1?(w.side=on,w.needsUpdate=!0,gs(w,z,W),w.side=Ei,w.needsUpdate=!0,gs(w,z,W),w.side=Dn):gs(w,z,W)}this.compile=function(w,z,W=null){W===null&&(W=w),m=zt.get(W),m.init(z),E.push(m),W.traverseVisible(function(B){B.isLight&&B.layers.test(z.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),w!==W&&w.traverseVisible(function(B){B.isLight&&B.layers.test(z.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();let Y=new Set;return w.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let at=B.material;if(at)if(Array.isArray(at))for(let bt=0;bt<at.length;bt++){let Dt=at[bt];de(Dt,W,B),Y.add(Dt)}else de(at,W,B),Y.add(at)}),E.pop(),m=null,Y},this.compileAsync=function(w,z,W=null){let Y=this.compile(w,z,W);return new Promise(B=>{function at(){if(Y.forEach(function(bt){vt.get(bt).currentProgram.isReady()&&Y.delete(bt)}),Y.size===0){B(w);return}setTimeout(at,10)}Zt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let en=null;function un(w){en&&en(w)}function cr(){Tn.stop()}function di(){Tn.start()}let Tn=new Yd;Tn.setAnimationLoop(un),typeof self!="undefined"&&Tn.setContext(self),this.setAnimationLoop=function(w){en=w,Q.setAnimationLoop(w),w===null?Tn.stop():Tn.start()},Q.addEventListener("sessionstart",cr),Q.addEventListener("sessionend",di),this.render=function(w,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(z),z=Q.getCamera()),w.isScene===!0&&w.onBeforeRender(M,w,z,P),m=zt.get(w,E.length),m.init(z),E.push(m),Ft.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),X.setFromProjectionMatrix(Ft),It=this.localClippingEnabled,ht=rt.init(this.clippingPlanes,It),g=pt.get(w,T.length),g.init(),T.push(g),Q.enabled===!0&&Q.isPresenting===!0){let at=M.xr.getDepthSensingMesh();at!==null&&lr(at,z,-1/0,M.sortObjects)}lr(w,z,0,M.sortObjects),g.finish(),M.sortObjects===!0&&g.sort(gt,Et),ae=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,ae&&kt.addToRenderList(g,w),this.info.render.frame++,ht===!0&&rt.beginShadows();let W=m.state.shadowsArray;ft.render(W,w,z),ht===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();let Y=g.opaque,B=g.transmissive;if(m.setupLights(),z.isArrayCamera){let at=z.cameras;if(B.length>0)for(let bt=0,Dt=at.length;bt<Dt;bt++){let mt=at[bt];fi(Y,B,w,mt)}ae&&kt.render(w);for(let bt=0,Dt=at.length;bt<Dt;bt++){let mt=at[bt];gn(g,w,mt,mt.viewport)}}else B.length>0&&fi(Y,B,w,z),ae&&kt.render(w),gn(g,w,z);P!==null&&(C.updateMultisampleRenderTarget(P),C.updateRenderTargetMipmap(P)),w.isScene===!0&&w.onAfterRender(M,w,z),me.resetDefaultState(),A=-1,S=null,E.pop(),E.length>0?(m=E[E.length-1],ht===!0&&rt.setGlobalState(M.clippingPlanes,m.state.camera)):m=null,T.pop(),T.length>0?g=T[T.length-1]:g=null};function lr(w,z,W,Y){if(w.visible===!1)return;if(w.layers.test(z.layers)){if(w.isGroup)W=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(z);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||X.intersectsSprite(w)){Y&&ee.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Ft);let bt=et.update(w),Dt=w.material;Dt.visible&&g.push(w,bt,Dt,W,ee.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||X.intersectsObject(w))){let bt=et.update(w),Dt=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ee.copy(w.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),ee.copy(bt.boundingSphere.center)),ee.applyMatrix4(w.matrixWorld).applyMatrix4(Ft)),Array.isArray(Dt)){let mt=bt.groups;for(let $t=0,Wt=mt.length;$t<Wt;$t++){let Pt=mt[$t],Yt=Dt[Pt.materialIndex];Yt&&Yt.visible&&g.push(w,bt,Yt,W,ee.z,Pt)}}else Dt.visible&&g.push(w,bt,Dt,W,ee.z,null)}}let at=w.children;for(let bt=0,Dt=at.length;bt<Dt;bt++)lr(at[bt],z,W,Y)}function gn(w,z,W,Y){let B=w.opaque,at=w.transmissive,bt=w.transparent;m.setupLightsView(W),ht===!0&&rt.setGlobalState(M.clippingPlanes,W),Y&&Ot.viewport(O.copy(Y)),B.length>0&&nn(B,z,W),at.length>0&&nn(at,z,W),bt.length>0&&nn(bt,z,W),Ot.buffers.depth.setTest(!0),Ot.buffers.depth.setMask(!0),Ot.buffers.color.setMask(!0),Ot.setPolygonOffset(!1)}function fi(w,z,W,Y){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Y.id]===void 0&&(m.state.transmissionRenderTarget[Y.id]=new ci(1,1,{generateMipmaps:!0,type:Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float")?Nr:oi,minFilter:Xi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ue.workingColorSpace}));let at=m.state.transmissionRenderTarget[Y.id],bt=Y.viewport||O;at.setSize(bt.z,bt.w);let Dt=M.getRenderTarget();M.setRenderTarget(at),M.getClearColor(nt),ct=M.getClearAlpha(),ct<1&&M.setClearColor(16777215,.5),M.clear(),ae&&kt.render(W);let mt=M.toneMapping;M.toneMapping=wi;let $t=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),m.setupLightsView(Y),ht===!0&&rt.setGlobalState(M.clippingPlanes,Y),nn(w,W,Y),C.updateMultisampleRenderTarget(at),C.updateRenderTargetMipmap(at),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Pt=0,Yt=z.length;Pt<Yt;Pt++){let fe=z[Pt],ge=fe.object,Te=fe.geometry,ne=fe.material,yt=fe.group;if(ne.side===Dn&&ge.layers.test(Y.layers)){let Ge=ne.side;ne.side=on,ne.needsUpdate=!0,sn(ge,W,Y,Te,ne,yt),ne.side=Ge,ne.needsUpdate=!0,Wt=!0}}Wt===!0&&(C.updateMultisampleRenderTarget(at),C.updateRenderTargetMipmap(at))}M.setRenderTarget(Dt),M.setClearColor(nt,ct),$t!==void 0&&(Y.viewport=$t),M.toneMapping=mt}function nn(w,z,W){let Y=z.isScene===!0?z.overrideMaterial:null;for(let B=0,at=w.length;B<at;B++){let bt=w[B],Dt=bt.object,mt=bt.geometry,$t=Y===null?bt.material:Y,Wt=bt.group;Dt.layers.test(W.layers)&&sn(Dt,z,W,mt,$t,Wt)}}function sn(w,z,W,Y,B,at){w.onBeforeRender(M,z,W,Y,B,at),w.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),B.onBeforeRender(M,z,W,Y,w,at),B.transparent===!0&&B.side===Dn&&B.forceSinglePass===!1?(B.side=on,B.needsUpdate=!0,M.renderBufferDirect(W,z,Y,B,w,at),B.side=Ei,B.needsUpdate=!0,M.renderBufferDirect(W,z,Y,B,w,at),B.side=Dn):M.renderBufferDirect(W,z,Y,B,w,at),w.onAfterRender(M,z,W,Y,B,at)}function gs(w,z,W){z.isScene!==!0&&(z=jt);let Y=vt.get(w),B=m.state.lights,at=m.state.shadowsArray,bt=B.state.version,Dt=Lt.getParameters(w,B.state,at,z,W),mt=Lt.getProgramCacheKey(Dt),$t=Y.programs;Y.environment=w.isMeshStandardMaterial?z.environment:null,Y.fog=z.fog,Y.envMap=(w.isMeshStandardMaterial?V:b).get(w.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&w.envMap===null?z.environmentRotation:w.envMapRotation,$t===void 0&&(w.addEventListener("dispose",Ht),$t=new Map,Y.programs=$t);let Wt=$t.get(mt);if(Wt!==void 0){if(Y.currentProgram===Wt&&Y.lightsStateVersion===bt)return Pi(w,Dt),Wt}else Dt.uniforms=Lt.getUniforms(w),w.onBeforeCompile(Dt,M),Wt=Lt.acquireProgram(Dt,mt),$t.set(mt,Wt),Y.uniforms=Dt.uniforms;let Pt=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Pt.clippingPlanes=rt.uniform),Pi(w,Dt),Y.needsLights=Vt(w),Y.lightsStateVersion=bt,Y.needsLights&&(Pt.ambientLightColor.value=B.state.ambient,Pt.lightProbe.value=B.state.probe,Pt.directionalLights.value=B.state.directional,Pt.directionalLightShadows.value=B.state.directionalShadow,Pt.spotLights.value=B.state.spot,Pt.spotLightShadows.value=B.state.spotShadow,Pt.rectAreaLights.value=B.state.rectArea,Pt.ltc_1.value=B.state.rectAreaLTC1,Pt.ltc_2.value=B.state.rectAreaLTC2,Pt.pointLights.value=B.state.point,Pt.pointLightShadows.value=B.state.pointShadow,Pt.hemisphereLights.value=B.state.hemi,Pt.directionalShadowMap.value=B.state.directionalShadowMap,Pt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Pt.spotShadowMap.value=B.state.spotShadowMap,Pt.spotLightMatrix.value=B.state.spotLightMatrix,Pt.spotLightMap.value=B.state.spotLightMap,Pt.pointShadowMap.value=B.state.pointShadowMap,Pt.pointShadowMatrix.value=B.state.pointShadowMatrix),Y.currentProgram=Wt,Y.uniformsList=null,Wt}function pi(w){if(w.uniformsList===null){let z=w.currentProgram.getUniforms();w.uniformsList=Bs.seqWithValue(z.seq,w.uniforms)}return w.uniformsList}function Pi(w,z){let W=vt.get(w);W.outputColorSpace=z.outputColorSpace,W.batching=z.batching,W.batchingColor=z.batchingColor,W.instancing=z.instancing,W.instancingColor=z.instancingColor,W.instancingMorph=z.instancingMorph,W.skinning=z.skinning,W.morphTargets=z.morphTargets,W.morphNormals=z.morphNormals,W.morphColors=z.morphColors,W.morphTargetsCount=z.morphTargetsCount,W.numClippingPlanes=z.numClippingPlanes,W.numIntersection=z.numClipIntersection,W.vertexAlphas=z.vertexAlphas,W.vertexTangents=z.vertexTangents,W.toneMapping=z.toneMapping}function Xa(w,z,W,Y,B){z.isScene!==!0&&(z=jt),C.resetTextureUnits();let at=z.fog,bt=Y.isMeshStandardMaterial?z.environment:null,Dt=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ys,mt=(Y.isMeshStandardMaterial?V:b).get(Y.envMap||bt),$t=Y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Wt=!!W.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Pt=!!W.morphAttributes.position,Yt=!!W.morphAttributes.normal,fe=!!W.morphAttributes.color,ge=wi;Y.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ge=M.toneMapping);let Te=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ne=Te!==void 0?Te.length:0,yt=vt.get(Y),Ge=m.state.lights;if(ht===!0&&(It===!0||w!==S)){let Be=w===S&&Y.id===A;rt.setState(Y,w,Be)}let se=!1;Y.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==Ge.state.version||yt.outputColorSpace!==Dt||B.isBatchedMesh&&yt.batching===!1||!B.isBatchedMesh&&yt.batching===!0||B.isBatchedMesh&&yt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&yt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&yt.instancing===!1||!B.isInstancedMesh&&yt.instancing===!0||B.isSkinnedMesh&&yt.skinning===!1||!B.isSkinnedMesh&&yt.skinning===!0||B.isInstancedMesh&&yt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&yt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&yt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&yt.instancingMorph===!1&&B.morphTexture!==null||yt.envMap!==mt||Y.fog===!0&&yt.fog!==at||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==rt.numPlanes||yt.numIntersection!==rt.numIntersection)||yt.vertexAlphas!==$t||yt.vertexTangents!==Wt||yt.morphTargets!==Pt||yt.morphNormals!==Yt||yt.morphColors!==fe||yt.toneMapping!==ge||yt.morphTargetsCount!==ne)&&(se=!0):(se=!0,yt.__version=Y.version);let dn=yt.currentProgram;se===!0&&(dn=gs(Y,z,B));let jn=!1,We=!1,_n=!1,be=dn.getUniforms(),vn=yt.uniforms;if(Ot.useProgram(dn.program)&&(jn=!0,We=!0,_n=!0),Y.id!==A&&(A=Y.id,We=!0),jn||S!==w){Ot.buffers.depth.getReversed()?(ut.copy(w.projectionMatrix),Zm(ut),Jm(ut),be.setValue(H,"projectionMatrix",ut)):be.setValue(H,"projectionMatrix",w.projectionMatrix),be.setValue(H,"viewMatrix",w.matrixWorldInverse);let An=be.map.cameraPosition;An!==void 0&&An.setValue(H,qt.setFromMatrixPosition(w.matrixWorld)),Jt.logarithmicDepthBuffer&&be.setValue(H,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&be.setValue(H,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,We=!0,_n=!0)}if(B.isSkinnedMesh){be.setOptional(H,B,"bindMatrix"),be.setOptional(H,B,"bindMatrixInverse");let Be=B.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),be.setValue(H,"boneTexture",Be.boneTexture,C))}B.isBatchedMesh&&(be.setOptional(H,B,"batchingTexture"),be.setValue(H,"batchingTexture",B._matricesTexture,C),be.setOptional(H,B,"batchingIdTexture"),be.setValue(H,"batchingIdTexture",B._indirectTexture,C),be.setOptional(H,B,"batchingColorTexture"),B._colorsTexture!==null&&be.setValue(H,"batchingColorTexture",B._colorsTexture,C));let Li=W.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&Gt.update(B,W,dn),(We||yt.receiveShadow!==B.receiveShadow)&&(yt.receiveShadow=B.receiveShadow,be.setValue(H,"receiveShadow",B.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(vn.envMap.value=mt,vn.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&z.environment!==null&&(vn.envMapIntensity.value=z.environmentIntensity),We&&(be.setValue(H,"toneMappingExposure",M.toneMappingExposure),yt.needsLights&&Ii(vn,_n),at&&Y.fog===!0&&Mt.refreshFogUniforms(vn,at),Mt.refreshMaterialUniforms(vn,Y,tt,dt,m.state.transmissionRenderTarget[w.id]),Bs.upload(H,pi(yt),vn,C)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Bs.upload(H,pi(yt),vn,C),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&be.setValue(H,"center",B.center),be.setValue(H,"modelViewMatrix",B.modelViewMatrix),be.setValue(H,"normalMatrix",B.normalMatrix),be.setValue(H,"modelMatrix",B.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){let Be=Y.uniformsGroups;for(let An=0,Pe=Be.length;An<Pe;An++){let he=Be[An];k.update(he,dn),k.bind(he,dn)}}return dn}function Ii(w,z){w.ambientLightColor.needsUpdate=z,w.lightProbe.needsUpdate=z,w.directionalLights.needsUpdate=z,w.directionalLightShadows.needsUpdate=z,w.pointLights.needsUpdate=z,w.pointLightShadows.needsUpdate=z,w.spotLights.needsUpdate=z,w.spotLightShadows.needsUpdate=z,w.rectAreaLights.needsUpdate=z,w.hemisphereLights.needsUpdate=z}function Vt(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(w,z,W){vt.get(w.texture).__webglTexture=z,vt.get(w.depthTexture).__webglTexture=W;let Y=vt.get(w);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=W===void 0,Y.__autoAllocateDepthBuffer||Zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,z){let W=vt.get(w);W.__webglFramebuffer=z,W.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(w,z=0,W=0){P=w,I=z,D=W;let Y=!0,B=null,at=!1,bt=!1;if(w){let mt=vt.get(w);if(mt.__useDefaultFramebuffer!==void 0)Ot.bindFramebuffer(H.FRAMEBUFFER,null),Y=!1;else if(mt.__webglFramebuffer===void 0)C.setupRenderTarget(w);else if(mt.__hasExternalTextures)C.rebindTextures(w,vt.get(w.texture).__webglTexture,vt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Pt=w.depthTexture;if(mt.__boundDepthTexture!==Pt){if(Pt!==null&&vt.has(Pt)&&(w.width!==Pt.image.width||w.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(w)}}let $t=w.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(bt=!0);let Wt=vt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Wt[z])?B=Wt[z][W]:B=Wt[z],at=!0):w.samples>0&&C.useMultisampledRTT(w)===!1?B=vt.get(w).__webglMultisampledFramebuffer:Array.isArray(Wt)?B=Wt[W]:B=Wt,O.copy(w.viewport),J.copy(w.scissor),j=w.scissorTest}else O.copy(Rt).multiplyScalar(tt).floor(),J.copy(Bt).multiplyScalar(tt).floor(),j=Nt;if(Ot.bindFramebuffer(H.FRAMEBUFFER,B)&&Y&&Ot.drawBuffers(w,B),Ot.viewport(O),Ot.scissor(J),Ot.setScissorTest(j),at){let mt=vt.get(w.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+z,mt.__webglTexture,W)}else if(bt){let mt=vt.get(w.texture),$t=z||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,mt.__webglTexture,W||0,$t)}A=-1},this.readRenderTargetPixels=function(w,z,W,Y,B,at,bt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&bt!==void 0&&(Dt=Dt[bt]),Dt){Ot.bindFramebuffer(H.FRAMEBUFFER,Dt);try{let mt=w.texture,$t=mt.format,Wt=mt.type;if(!Jt.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Jt.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=w.width-Y&&W>=0&&W<=w.height-B&&H.readPixels(z,W,Y,B,Kt.convert($t),Kt.convert(Wt),at)}finally{let mt=P!==null?vt.get(P).__webglFramebuffer:null;Ot.bindFramebuffer(H.FRAMEBUFFER,mt)}}},this.readRenderTargetPixelsAsync=async function(w,z,W,Y,B,at,bt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&bt!==void 0&&(Dt=Dt[bt]),Dt){let mt=w.texture,$t=mt.format,Wt=mt.type;if(!Jt.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Jt.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=w.width-Y&&W>=0&&W<=w.height-B){Ot.bindFramebuffer(H.FRAMEBUFFER,Dt);let Pt=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Pt),H.bufferData(H.PIXEL_PACK_BUFFER,at.byteLength,H.STREAM_READ),H.readPixels(z,W,Y,B,Kt.convert($t),Kt.convert(Wt),0);let Yt=P!==null?vt.get(P).__webglFramebuffer:null;Ot.bindFramebuffer(H.FRAMEBUFFER,Yt);let fe=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Ym(H,fe,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Pt),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,at),H.deleteBuffer(Pt),H.deleteSync(fe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,z=null,W=0){w.isTexture!==!0&&(yr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,w=arguments[1]);let Y=Math.pow(2,-W),B=Math.floor(w.image.width*Y),at=Math.floor(w.image.height*Y),bt=z!==null?z.x:0,Dt=z!==null?z.y:0;C.setTexture2D(w,0),H.copyTexSubImage2D(H.TEXTURE_2D,W,0,0,bt,Dt,B,at),Ot.unbindTexture()},this.copyTextureToTexture=function(w,z,W=null,Y=null,B=0){w.isTexture!==!0&&(yr("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,w=arguments[1],z=arguments[2],B=arguments[3]||0,W=null);let at,bt,Dt,mt,$t,Wt,Pt,Yt,fe,ge=w.isCompressedTexture?w.mipmaps[B]:w.image;W!==null?(at=W.max.x-W.min.x,bt=W.max.y-W.min.y,Dt=W.isBox3?W.max.z-W.min.z:1,mt=W.min.x,$t=W.min.y,Wt=W.isBox3?W.min.z:0):(at=ge.width,bt=ge.height,Dt=ge.depth||1,mt=0,$t=0,Wt=0),Y!==null?(Pt=Y.x,Yt=Y.y,fe=Y.z):(Pt=0,Yt=0,fe=0);let Te=Kt.convert(z.format),ne=Kt.convert(z.type),yt;z.isData3DTexture?(C.setTexture3D(z,0),yt=H.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(C.setTexture2DArray(z,0),yt=H.TEXTURE_2D_ARRAY):(C.setTexture2D(z,0),yt=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,z.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,z.unpackAlignment);let Ge=H.getParameter(H.UNPACK_ROW_LENGTH),se=H.getParameter(H.UNPACK_IMAGE_HEIGHT),dn=H.getParameter(H.UNPACK_SKIP_PIXELS),jn=H.getParameter(H.UNPACK_SKIP_ROWS),We=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,ge.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ge.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,mt),H.pixelStorei(H.UNPACK_SKIP_ROWS,$t),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Wt);let _n=w.isDataArrayTexture||w.isData3DTexture,be=z.isDataArrayTexture||z.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let vn=vt.get(w),Li=vt.get(z),Be=vt.get(vn.__renderTarget),An=vt.get(Li.__renderTarget);Ot.bindFramebuffer(H.READ_FRAMEBUFFER,Be.__webglFramebuffer),Ot.bindFramebuffer(H.DRAW_FRAMEBUFFER,An.__webglFramebuffer);for(let Pe=0;Pe<Dt;Pe++)_n&&H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,vt.get(w).__webglTexture,B,Wt+Pe),w.isDepthTexture?(be&&H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,vt.get(z).__webglTexture,B,fe+Pe),H.blitFramebuffer(mt,$t,at,bt,Pt,Yt,at,bt,H.DEPTH_BUFFER_BIT,H.NEAREST)):be?H.copyTexSubImage3D(yt,B,Pt,Yt,fe+Pe,mt,$t,at,bt):H.copyTexSubImage2D(yt,B,Pt,Yt,fe+Pe,mt,$t,at,bt);Ot.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ot.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else be?w.isDataTexture||w.isData3DTexture?H.texSubImage3D(yt,B,Pt,Yt,fe,at,bt,Dt,Te,ne,ge.data):z.isCompressedArrayTexture?H.compressedTexSubImage3D(yt,B,Pt,Yt,fe,at,bt,Dt,Te,ge.data):H.texSubImage3D(yt,B,Pt,Yt,fe,at,bt,Dt,Te,ne,ge):w.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,B,Pt,Yt,at,bt,Te,ne,ge.data):w.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,B,Pt,Yt,ge.width,ge.height,Te,ge.data):H.texSubImage2D(H.TEXTURE_2D,B,Pt,Yt,at,bt,Te,ne,ge);H.pixelStorei(H.UNPACK_ROW_LENGTH,Ge),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,se),H.pixelStorei(H.UNPACK_SKIP_PIXELS,dn),H.pixelStorei(H.UNPACK_SKIP_ROWS,jn),H.pixelStorei(H.UNPACK_SKIP_IMAGES,We),B===0&&z.generateMipmaps&&H.generateMipmap(yt),Ot.unbindTexture()},this.copyTextureToTexture3D=function(w,z,W=null,Y=null,B=0){return w.isTexture!==!0&&(yr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,Y=arguments[1]||null,w=arguments[2],z=arguments[3],B=arguments[4]||0),yr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,z,W,Y,B)},this.initRenderTarget=function(w){vt.get(w).__webglFramebuffer===void 0&&C.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?C.setTextureCube(w,0):w.isData3DTexture?C.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?C.setTexture2DArray(w,0):C.setTexture2D(w,0),Ot.unbindTexture()},this.resetState=function(){I=0,D=0,P=null,Ot.reset(),me.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=ue._getDrawingBufferColorSpace(t),e.unpackColorSpace=ue._getUnpackColorSpace()}};var na=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new oe(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ia=class extends Qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Ir=class extends Ke{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,p=(o-h)/f;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new _t:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new L,s=[],r=[],o=[],a=new L,c=new Ce;for(let p=0;p<=t;p++){let _=p/t;s[p]=this.getTangentAt(_,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let _=Math.acos(Oe(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,_))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Oe(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let _=1;_<=t;_++)r[_].applyMatrix4(c.makeRotationAxis(s[_],p*_)),o[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Lr=class extends Sn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new _t){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*h-p*d+this.aX,l=f*d+p*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Hl=class extends Lr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function xh(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,d){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+d)+(c-a)/d;f*=h,p*=h,s(o,a,f,p)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var No=new L,Uc=new xh,Oc=new xh,Nc=new xh,Vl=class extends Sn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(No.subVectors(s[0],s[1]).add(s[0]),l=No);let d=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(No.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=No),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,_=Math.pow(l.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(f),p),g=Math.pow(f.distanceToSquared(h),p);x<1e-4&&(x=1),_<1e-4&&(_=x),g<1e-4&&(g=x),Uc.initNonuniformCatmullRom(l.x,d.x,f.x,h.x,_,x,g),Oc.initNonuniformCatmullRom(l.y,d.y,f.y,h.y,_,x,g),Nc.initNonuniformCatmullRom(l.z,d.z,f.z,h.z,_,x,g)}else this.curveType==="catmullrom"&&(Uc.initCatmullRom(l.x,d.x,f.x,h.x,this.tension),Oc.initCatmullRom(l.y,d.y,f.y,h.y,this.tension),Nc.initCatmullRom(l.z,d.z,f.z,h.z,this.tension));return n.set(Uc.calc(c),Oc.calc(c),Nc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Sd(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Xy(i,t){let e=1-i;return e*e*t}function qy(i,t){return 2*(1-i)*i*t}function $y(i,t){return i*i*t}function wr(i,t,e,n){return Xy(i,t)+qy(i,e)+$y(i,n)}function jy(i,t){let e=1-i;return e*e*e*t}function Yy(i,t){let e=1-i;return 3*e*e*i*t}function Zy(i,t){return 3*(1-i)*i*i*t}function Jy(i,t){return i*i*i*t}function Er(i,t,e,n,s){return jy(i,t)+Yy(i,e)+Zy(i,n)+Jy(i,s)}var sa=class extends Sn{constructor(t=new _t,e=new _t,n=new _t,s=new _t){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new _t){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Er(t,s.x,r.x,o.x,a.x),Er(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Gl=class extends Sn{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Er(t,s.x,r.x,o.x,a.x),Er(t,s.y,r.y,o.y,a.y),Er(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ra=class extends Sn{constructor(t=new _t,e=new _t){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new _t){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new _t){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wl=class extends Sn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},oa=class extends Sn{constructor(t=new _t,e=new _t,n=new _t){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new _t){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(wr(t,s.x,r.x,o.x),wr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xl=class extends Sn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(wr(t,s.x,r.x,o.x),wr(t,s.y,r.y,o.y),wr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},aa=class extends Sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new _t){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(Sd(a,c.x,l.x,h.x,d.x),Sd(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new _t().fromArray(s))}return this}},wd=Object.freeze({__proto__:null,ArcCurve:Hl,CatmullRomCurve3:Vl,CubicBezierCurve:sa,CubicBezierCurve3:Gl,EllipseCurve:Lr,LineCurve:ra,LineCurve3:Wl,QuadraticBezierCurve:oa,QuadraticBezierCurve3:Xl,SplineCurve:aa}),ql=class extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wd[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new wd[s.type]().fromJSON(s))}return this}},$l=class extends ql{constructor(t){super(),this.type="Path",this.currentPoint=new _t,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new ra(this.currentPoint.clone(),new _t(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new oa(this.currentPoint.clone(),new _t(t,e),new _t(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new sa(this.currentPoint.clone(),new _t(t,e),new _t(n,s),new _t(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new aa(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Lr(t,e,n,s,r,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},jl=class i extends an{constructor(t=[new _t(0,-.5),new _t(.5,0),new _t(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Oe(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,d=new L,f=new _t,p=new L,_=new L,x=new L,g=0,m=0;for(let T=0;T<=t.length-1;T++)switch(T){case 0:g=t[T+1].x-t[T].x,m=t[T+1].y-t[T].y,p.x=m*1,p.y=-g,p.z=m*0,x.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:g=t[T+1].x-t[T].x,m=t[T+1].y-t[T].y,p.x=m*1,p.y=-g,p.z=m*0,_.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),c.push(p.x,p.y,p.z),x.copy(_)}for(let T=0;T<=e;T++){let E=n+T*h*s,M=Math.sin(E),N=Math.cos(E);for(let I=0;I<=t.length-1;I++){d.x=t[I].x*M,d.y=t[I].y,d.z=t[I].x*N,o.push(d.x,d.y,d.z),f.x=T/e,f.y=I/(t.length-1),a.push(f.x,f.y);let D=c[3*I+0]*M,P=c[3*I+1],A=c[3*I+0]*N;l.push(D,P,A)}}for(let T=0;T<e;T++)for(let E=0;E<t.length-1;E++){let M=E+T*t.length,N=M,I=M+t.length,D=M+t.length+1,P=M+1;r.push(N,I,P),r.push(D,P,I)}this.setIndex(r),this.setAttribute("position",new pe(o,3)),this.setAttribute("uv",new pe(a,2)),this.setAttribute("normal",new pe(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},$s=class i extends jl{constructor(t=1,e=1,n=4,s=8){let r=new $l;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},Dr=class i extends an{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new L,h=new _t;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){let p=n+d/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new pe(o,3)),this.setAttribute("normal",new pe(a,3)),this.setAttribute("uv",new pe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Zi=class i extends an{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],f=[],p=[],_=0,x=[],g=n/2,m=0;T(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new pe(d,3)),this.setAttribute("normal",new pe(f,3)),this.setAttribute("uv",new pe(p,2));function T(){let M=new L,N=new L,I=0,D=(e-t)/n;for(let P=0;P<=r;P++){let A=[],S=P/r,O=S*(e-t)+t;for(let J=0;J<=s;J++){let j=J/s,nt=j*c+a,ct=Math.sin(nt),K=Math.cos(nt);N.x=O*ct,N.y=-S*n+g,N.z=O*K,d.push(N.x,N.y,N.z),M.set(ct,D,K).normalize(),f.push(M.x,M.y,M.z),p.push(j,1-S),A.push(_++)}x.push(A)}for(let P=0;P<s;P++)for(let A=0;A<r;A++){let S=x[A][P],O=x[A+1][P],J=x[A+1][P+1],j=x[A][P+1];(t>0||A!==0)&&(h.push(S,O,j),I+=3),(e>0||A!==r-1)&&(h.push(O,J,j),I+=3)}l.addGroup(m,I,0),m+=I}function E(M){let N=_,I=new _t,D=new L,P=0,A=M===!0?t:e,S=M===!0?1:-1;for(let J=1;J<=s;J++)d.push(0,g*S,0),f.push(0,S,0),p.push(.5,.5),_++;let O=_;for(let J=0;J<=s;J++){let nt=J/s*c+a,ct=Math.cos(nt),K=Math.sin(nt);D.x=A*K,D.y=g*S,D.z=A*ct,d.push(D.x,D.y,D.z),f.push(0,S,0),I.x=ct*.5+.5,I.y=K*.5*S+.5,p.push(I.x,I.y),_++}for(let J=0;J<s;J++){let j=N+J,nt=O+J;M===!0?h.push(nt,nt+1,j):h.push(nt+1,nt,j),P+=3}l.addGroup(m,P,M===!0?1:2),m+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ca=class i extends Zi{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Yl=class i extends an{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new pe(r,3)),this.setAttribute("normal",new pe(r.slice(),3)),this.setAttribute("uv",new pe(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(T){let E=new L,M=new L,N=new L;for(let I=0;I<e.length;I+=3)p(e[I+0],E),p(e[I+1],M),p(e[I+2],N),c(E,M,N,T)}function c(T,E,M,N){let I=N+1,D=[];for(let P=0;P<=I;P++){D[P]=[];let A=T.clone().lerp(M,P/I),S=E.clone().lerp(M,P/I),O=I-P;for(let J=0;J<=O;J++)J===0&&P===I?D[P][J]=A:D[P][J]=A.clone().lerp(S,J/O)}for(let P=0;P<I;P++)for(let A=0;A<2*(I-P)-1;A++){let S=Math.floor(A/2);A%2===0?(f(D[P][S+1]),f(D[P+1][S]),f(D[P][S])):(f(D[P][S+1]),f(D[P+1][S+1]),f(D[P+1][S]))}}function l(T){let E=new L;for(let M=0;M<r.length;M+=3)E.x=r[M+0],E.y=r[M+1],E.z=r[M+2],E.normalize().multiplyScalar(T),r[M+0]=E.x,r[M+1]=E.y,r[M+2]=E.z}function h(){let T=new L;for(let E=0;E<r.length;E+=3){T.x=r[E+0],T.y=r[E+1],T.z=r[E+2];let M=g(T)/2/Math.PI+.5,N=m(T)/Math.PI+.5;o.push(M,1-N)}_(),d()}function d(){for(let T=0;T<o.length;T+=6){let E=o[T+0],M=o[T+2],N=o[T+4],I=Math.max(E,M,N),D=Math.min(E,M,N);I>.9&&D<.1&&(E<.2&&(o[T+0]+=1),M<.2&&(o[T+2]+=1),N<.2&&(o[T+4]+=1))}}function f(T){r.push(T.x,T.y,T.z)}function p(T,E){let M=T*3;E.x=t[M+0],E.y=t[M+1],E.z=t[M+2]}function _(){let T=new L,E=new L,M=new L,N=new L,I=new _t,D=new _t,P=new _t;for(let A=0,S=0;A<r.length;A+=9,S+=6){T.set(r[A+0],r[A+1],r[A+2]),E.set(r[A+3],r[A+4],r[A+5]),M.set(r[A+6],r[A+7],r[A+8]),I.set(o[S+0],o[S+1]),D.set(o[S+2],o[S+3]),P.set(o[S+4],o[S+5]),N.copy(T).add(E).add(M).divideScalar(3);let O=g(N);x(I,S+0,T,O),x(D,S+2,E,O),x(P,S+4,M,O)}}function x(T,E,M,N){N<0&&T.x===1&&(o[E]=T.x-1),M.x===0&&M.z===0&&(o[E]=N/2/Math.PI+.5)}function g(T){return Math.atan2(T.z,-T.x)}function m(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var li=class i extends Yl{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var la=class i extends an{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],d=t,f=(e-t)/s,p=new L,_=new _t;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){let m=r+g/n*o;p.x=d*Math.cos(m),p.y=d*Math.sin(m),c.push(p.x,p.y,p.z),l.push(0,0,1),_.x=(p.x/e+1)/2,_.y=(p.y/e+1)/2,h.push(_.x,_.y)}d+=f}for(let x=0;x<s;x++){let g=x*(n+1);for(let m=0;m<n;m++){let T=m+g,E=T,M=T+n+1,N=T+n+2,I=T+1;a.push(E,M,I),a.push(M,N,I)}}this.setIndex(a),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(l,3)),this.setAttribute("uv",new pe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Fn=class i extends an{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],d=new L,f=new L,p=[],_=[],x=[],g=[];for(let m=0;m<=n;m++){let T=[],E=m/n,M=0;m===0&&o===0?M=.5/e:m===n&&c===Math.PI&&(M=-.5/e);for(let N=0;N<=e;N++){let I=N/e;d.x=-t*Math.cos(s+I*r)*Math.sin(o+E*a),d.y=t*Math.cos(o+E*a),d.z=t*Math.sin(s+I*r)*Math.sin(o+E*a),_.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),g.push(I+M,1-E),T.push(l++)}h.push(T)}for(let m=0;m<n;m++)for(let T=0;T<e;T++){let E=h[m][T+1],M=h[m][T],N=h[m+1][T],I=h[m+1][T+1];(m!==0||o>0)&&p.push(E,M,I),(m!==n-1||c<Math.PI)&&p.push(M,N,I)}this.setIndex(p),this.setAttribute("position",new pe(_,3)),this.setAttribute("normal",new pe(x,3)),this.setAttribute("uv",new pe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ha=class i extends an{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new L,d=new L,f=new L;for(let p=0;p<=n;p++)for(let _=0;_<=s;_++){let x=_/s*r,g=p/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(x),d.y=(t+e*Math.cos(g))*Math.sin(x),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),f.subVectors(d,h).normalize(),c.push(f.x,f.y,f.z),l.push(_/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let _=1;_<=s;_++){let x=(s+1)*p+_-1,g=(s+1)*(p-1)+_-1,m=(s+1)*(p-1)+_,T=(s+1)*p+_;o.push(x,g,T),o.push(g,m,T)}this.setIndex(o),this.setAttribute("position",new pe(a,3)),this.setAttribute("normal",new pe(c,3)),this.setAttribute("uv",new pe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Ti=class extends ji{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wd,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Fo(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Ky(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var js=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Zl=class extends js{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tu,endingEnd:Tu}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Au:r=t,a=2*e-n;break;case Ru:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Au:o=t,c=2*n-e;break;case Ru:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,p=this._weightNext,_=(n-e)/(s-e),x=_*_,g=x*_,m=-f*g+2*f*x-f*_,T=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*_+1,E=(-1-p)*g+(1.5+p)*x+.5*_,M=p*g-p*x;for(let N=0;N!==a;++N)r[N]=m*o[h+N]+T*o[l+N]+E*o[c+N]+M*o[d+N];return r}},Jl=class extends js{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),d=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*d+o[c+f]*h;return r}},Kl=class extends js{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},kn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Fo(e,this.TimeBufferType),this.values=Fo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Fo(t.times,Array),values:Fo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Kl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Jl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Zl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Go:e=this.InterpolantFactoryMethodDiscrete;break;case wl:e=this.InterpolantFactoryMethodLinear;break;case ac:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Go;case this.InterpolantFactoryMethodLinear:return wl;case this.InterpolantFactoryMethodSmooth:return ac}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Ky(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ac,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let d=a*n,f=d-n,p=d+n;for(let _=0;_!==n;++_){let x=e[d+_];if(x!==e[f+_]||x!==e[p+_]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,f=o*n;for(let p=0;p!==n;++p)e[f+p]=e[d+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};kn.prototype.TimeBufferType=Float32Array;kn.prototype.ValueBufferType=Float32Array;kn.prototype.DefaultInterpolation=wl;var Ji=class extends kn{constructor(t,e,n){super(t,e,n)}};Ji.prototype.ValueTypeName="bool";Ji.prototype.ValueBufferType=Array;Ji.prototype.DefaultInterpolation=Go;Ji.prototype.InterpolantFactoryMethodLinear=void 0;Ji.prototype.InterpolantFactoryMethodSmooth=void 0;var Ql=class extends kn{};Ql.prototype.ValueTypeName="color";var th=class extends kn{};th.prototype.ValueTypeName="number";var eh=class extends js{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)Nn.slerpFlat(r,0,o,l-a,o,l,c);return r}},ua=class extends kn{InterpolantFactoryMethodLinear(t){return new eh(this.times,this.values,this.getValueSize(),t)}};ua.prototype.ValueTypeName="quaternion";ua.prototype.InterpolantFactoryMethodSmooth=void 0;var Ki=class extends kn{constructor(t,e,n){super(t,e,n)}};Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=Go;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var nh=class extends kn{};nh.prototype.ValueTypeName="vector";var ih=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=l.length;d<f;d+=2){let p=l[d],_=l[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return _}return null}}},Qy=new ih,sh=class{constructor(t){this.manager=t!==void 0?t:Qy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};sh.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ur=class extends Qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new oe(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},da=class extends Ur{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new oe(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Fc=new Ce,Ed=new L,Td=new L,fa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pr,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Ed.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ed),Td.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Td),e.updateMatrixWorld(),Fc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Fc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Ad=new Ce,vr=new L,kc=new L,rh=class extends fa{constructor(){super(new je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new _t(4,2),this._viewportCount=6,this._viewports=[new ve(2,1,1,1),new ve(0,1,1,1),new ve(3,1,1,1),new ve(1,1,1,1),new ve(3,0,1,1),new ve(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),vr.setFromMatrixPosition(t.matrixWorld),n.position.copy(vr),kc.copy(n.position),kc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(kc),n.updateMatrixWorld(),s.makeTranslation(-vr.x,-vr.y,-vr.z),Ad.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ad)}},pa=class extends Ur{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new rh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},oh=class extends fa{constructor(){super(new Ko(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ma=class extends Ur{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.shadow=new oh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var ga=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Rd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Rd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Rd(){return performance.now()}var bh="\\[\\]\\.:\\/",tx=new RegExp("["+bh+"]","g"),Mh="[^"+bh+"]",ex="[^"+bh.replace("\\.","")+"]",nx=/((?:WC+[\/:])*)/.source.replace("WC",Mh),ix=/(WCOD+)?/.source.replace("WCOD",ex),sx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mh),rx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mh),ox=new RegExp("^"+nx+ix+sx+rx+"$"),ax=["material","materials","bones","map"],ah=class{constructor(t,e,n){let s=n||Re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Re=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(tx,"")}static parseTrackName(t){let e=ox.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);ax.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Re.Composite=ah;Re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Re.prototype.GetterByBindingType=[Re.prototype._getValue_direct,Re.prototype._getValue_array,Re.prototype._getValue_arrayElement,Re.prototype._getValue_toArray];Re.prototype.SetterByBindingTypeAndVersioning=[[Re.prototype._setValue_direct,Re.prototype._setValue_direct_setNeedsUpdate,Re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_array,Re.prototype._setValue_array_setNeedsUpdate,Re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_arrayElement,Re.prototype._setValue_arrayElement_setNeedsUpdate,Re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_fromArray,Re.prototype._setValue_fromArray_setNeedsUpdate,Re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var xb=new Float32Array(1);var Cd=new Ce,_a=class{constructor(t,e,n=0,s=1/0){this.ray=new Xs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Cr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Cd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Cd),this}intersectObject(t,e=!0,n=[]){return ch(t,this,n,e),n.sort(Pd),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ch(t[s],this,n,e);return n.sort(Pd),n}};function Pd(i,t){return i.distance-t.distance}function ch(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)ch(r[o],t,e,!0)}}var Or=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Oe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var va=class extends ai{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lh}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lh);var tf=i=>{let t;return i?t=i:typeof fetch=="undefined"?t=(...e)=>Promise.resolve().then(()=>(Ai(),ns)).then(({default:n})=>n(...e)):t=fetch,(...e)=>t(...e)};var Fr=class extends Error{constructor(t,e="FunctionsError",n){super(t),this.name=e,this.context=n}},Ma=class extends Fr{constructor(t){super("Failed to send a request to the Edge Function","FunctionsFetchError",t)}},Sa=class extends Fr{constructor(t){super("Relay Error invoking the Edge Function","FunctionsRelayError",t)}},wa=class extends Fr{constructor(t){super("Edge Function returned a non-2xx status code","FunctionsHttpError",t)}},Ea;(function(i){i.Any="any",i.ApNortheast1="ap-northeast-1",i.ApNortheast2="ap-northeast-2",i.ApSouth1="ap-south-1",i.ApSoutheast1="ap-southeast-1",i.ApSoutheast2="ap-southeast-2",i.CaCentral1="ca-central-1",i.EuCentral1="eu-central-1",i.EuWest1="eu-west-1",i.EuWest2="eu-west-2",i.EuWest3="eu-west-3",i.SaEast1="sa-east-1",i.UsEast1="us-east-1",i.UsWest1="us-west-1",i.UsWest2="us-west-2"})(Ea||(Ea={}));var fx=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(d){o(d)}}function c(h){try{l(n.throw(h))}catch(d){o(d)}}function l(h){h.done?r(h.value):s(h.value).then(a,c)}l((n=n.apply(i,t||[])).next())})},kr=class{constructor(t,{headers:e={},customFetch:n,region:s=Ea.Any}={}){this.url=t,this.headers=e,this.region=s,this.fetch=tf(n)}setAuth(t){this.headers.Authorization=`Bearer ${t}`}invoke(t,e={}){var n;return fx(this,void 0,void 0,function*(){try{let{headers:s,method:r,body:o}=e,a={},{region:c}=e;c||(c=this.region),c&&c!=="any"&&(a["x-region"]=c);let l;o&&(s&&!Object.prototype.hasOwnProperty.call(s,"Content-Type")||!s)&&(typeof Blob!="undefined"&&o instanceof Blob||o instanceof ArrayBuffer?(a["Content-Type"]="application/octet-stream",l=o):typeof o=="string"?(a["Content-Type"]="text/plain",l=o):typeof FormData!="undefined"&&o instanceof FormData?l=o:(a["Content-Type"]="application/json",l=JSON.stringify(o)));let h=yield this.fetch(`${this.url}/${t}`,{method:r||"POST",headers:Object.assign(Object.assign(Object.assign({},a),this.headers),s),body:l}).catch(_=>{throw new Ma(_)}),d=h.headers.get("x-relay-error");if(d&&d==="true")throw new Sa(h);if(!h.ok)throw new wa(h);let f=((n=h.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim(),p;return f==="application/json"?p=yield h.json():f==="application/octet-stream"?p=yield h.blob():f==="text/event-stream"?p=h:f==="multipart/form-data"?p=yield h.formData():p=yield h.text(),{data:p,error:null}}catch(s){return{data:null,error:s}}})}};var pf=bu(ff(),1),{PostgrestClient:mf,PostgrestQueryBuilder:Fb,PostgrestFilterBuilder:kb,PostgrestTransformBuilder:Bb,PostgrestBuilder:zb}=pf.default;var gf="2.10.2";var _f={"X-Client-Info":`realtime-js/${gf}`},vf="1.0.0",Pa=1e4,yf=1e3,is;(function(i){i[i.connecting=0]="connecting",i[i.open=1]="open",i[i.closing=2]="closing",i[i.closed=3]="closed"})(is||(is={}));var cn;(function(i){i.closed="closed",i.errored="errored",i.joined="joined",i.joining="joining",i.leaving="leaving"})(cn||(cn={}));var mn;(function(i){i.close="phx_close",i.error="phx_error",i.join="phx_join",i.reply="phx_reply",i.leave="phx_leave",i.access_token="access_token"})(mn||(mn={}));var Ca;(function(i){i.websocket="websocket"})(Ca||(Ca={}));var Ri;(function(i){i.Connecting="connecting",i.Open="open",i.Closing="closing",i.Closed="closed"})(Ri||(Ri={}));var qr=class{constructor(){this.HEADER_LENGTH=1}decode(t,e){return t.constructor===ArrayBuffer?e(this._binaryDecode(t)):e(typeof t=="string"?JSON.parse(t):{})}_binaryDecode(t){let e=new DataView(t),n=new TextDecoder;return this._decodeBroadcast(t,e,n)}_decodeBroadcast(t,e,n){let s=e.getUint8(1),r=e.getUint8(2),o=this.HEADER_LENGTH+2,a=n.decode(t.slice(o,o+s));o=o+s;let c=n.decode(t.slice(o,o+r));o=o+r;let l=JSON.parse(n.decode(t.slice(o,t.byteLength)));return{ref:null,topic:a,event:c,payload:l}}};var ss=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0,this.callback=t,this.timerCalc=e}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}};var we;(function(i){i.abstime="abstime",i.bool="bool",i.date="date",i.daterange="daterange",i.float4="float4",i.float8="float8",i.int2="int2",i.int4="int4",i.int4range="int4range",i.int8="int8",i.int8range="int8range",i.json="json",i.jsonb="jsonb",i.money="money",i.numeric="numeric",i.oid="oid",i.reltime="reltime",i.text="text",i.time="time",i.timestamp="timestamp",i.timestamptz="timestamptz",i.timetz="timetz",i.tsrange="tsrange",i.tstzrange="tstzrange"})(we||(we={}));var Nh=(i,t,e={})=>{var n;let s=(n=e.skipTypes)!==null&&n!==void 0?n:[];return Object.keys(t).reduce((r,o)=>(r[o]=Ex(o,i,t,s),r),{})},Ex=(i,t,e,n)=>{let s=t.find(a=>a.name===i),r=s==null?void 0:s.type,o=e[i];return r&&!n.includes(r)?xf(r,o):Oh(o)},xf=(i,t)=>{if(i.charAt(0)==="_"){let e=i.slice(1,i.length);return Cx(t,e)}switch(i){case we.bool:return Tx(t);case we.float4:case we.float8:case we.int2:case we.int4:case we.int8:case we.numeric:case we.oid:return Ax(t);case we.json:case we.jsonb:return Rx(t);case we.timestamp:return Px(t);case we.abstime:case we.date:case we.daterange:case we.int4range:case we.int8range:case we.money:case we.reltime:case we.text:case we.time:case we.timestamptz:case we.timetz:case we.tsrange:case we.tstzrange:return Oh(t);default:return Oh(t)}},Oh=i=>i,Tx=i=>{switch(i){case"t":return!0;case"f":return!1;default:return i}},Ax=i=>{if(typeof i=="string"){let t=parseFloat(i);if(!Number.isNaN(t))return t}return i},Rx=i=>{if(typeof i=="string")try{return JSON.parse(i)}catch(t){return console.log(`JSON parse error: ${t}`),i}return i},Cx=(i,t)=>{if(typeof i!="string")return i;let e=i.length-1,n=i[e];if(i[0]==="{"&&n==="}"){let r,o=i.slice(1,e);try{r=JSON.parse("["+o+"]")}catch{r=o?o.split(","):[]}return r.map(a=>xf(t,a))}return i},Px=i=>typeof i=="string"?i.replace(" ","T"):i,Ia=i=>{let t=i;return t=t.replace(/^ws/i,"http"),t=t.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),t.replace(/\/+$/,"")};var rs=class{constructor(t,e,n={},s=Pa){this.channel=t,this.event=e,this.payload=n,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(t){this.timeout=t,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(t){this.payload=Object.assign(Object.assign({},this.payload),t)}receive(t,e){var n;return this._hasReceived(t)&&e((n=this.receivedResp)===null||n===void 0?void 0:n.response),this.recHooks.push({status:t,callback:e}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);let t=e=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=e,this._matchReceive(e)};this.channel._on(this.refEvent,{},t),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(t,e){this.refEvent&&this.channel._trigger(this.refEvent,{status:t,response:e})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:t,response:e}){this.recHooks.filter(n=>n.status===t).forEach(n=>n.callback(e))}_hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}};var Fh;(function(i){i.SYNC="sync",i.JOIN="join",i.LEAVE="leave"})(Fh||(Fh={}));var Qs=class i{constructor(t,e){this.channel=t,this.state={},this.pendingDiffs=[],this.joinRef=null,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};let n=(e==null?void 0:e.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(n.state,{},s=>{let{onJoin:r,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=i.syncState(this.state,s,r,o),this.pendingDiffs.forEach(c=>{this.state=i.syncDiff(this.state,c,r,o)}),this.pendingDiffs=[],a()}),this.channel._on(n.diff,{},s=>{let{onJoin:r,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=i.syncDiff(this.state,s,r,o),a())}),this.onJoin((s,r,o)=>{this.channel._trigger("presence",{event:"join",key:s,currentPresences:r,newPresences:o})}),this.onLeave((s,r,o)=>{this.channel._trigger("presence",{event:"leave",key:s,currentPresences:r,leftPresences:o})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(t,e,n,s){let r=this.cloneDeep(t),o=this.transformState(e),a={},c={};return this.map(r,(l,h)=>{o[l]||(c[l]=h)}),this.map(o,(l,h)=>{let d=r[l];if(d){let f=h.map(g=>g.presence_ref),p=d.map(g=>g.presence_ref),_=h.filter(g=>p.indexOf(g.presence_ref)<0),x=d.filter(g=>f.indexOf(g.presence_ref)<0);_.length>0&&(a[l]=_),x.length>0&&(c[l]=x)}else a[l]=h}),this.syncDiff(r,{joins:a,leaves:c},n,s)}static syncDiff(t,e,n,s){let{joins:r,leaves:o}={joins:this.transformState(e.joins),leaves:this.transformState(e.leaves)};return n||(n=()=>{}),s||(s=()=>{}),this.map(r,(a,c)=>{var l;let h=(l=t[a])!==null&&l!==void 0?l:[];if(t[a]=this.cloneDeep(c),h.length>0){let d=t[a].map(p=>p.presence_ref),f=h.filter(p=>d.indexOf(p.presence_ref)<0);t[a].unshift(...f)}n(a,h,c)}),this.map(o,(a,c)=>{let l=t[a];if(!l)return;let h=c.map(d=>d.presence_ref);l=l.filter(d=>h.indexOf(d.presence_ref)<0),t[a]=l,s(a,l,c),l.length===0&&delete t[a]}),t}static map(t,e){return Object.getOwnPropertyNames(t).map(n=>e(n,t[n]))}static transformState(t){return t=this.cloneDeep(t),Object.getOwnPropertyNames(t).reduce((e,n)=>{let s=t[n];return"metas"in s?e[n]=s.metas.map(r=>(r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r)):e[n]=s,e},{})}static cloneDeep(t){return JSON.parse(JSON.stringify(t))}onJoin(t){this.caller.onJoin=t}onLeave(t){this.caller.onLeave=t}onSync(t){this.caller.onSync=t}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}};var kh;(function(i){i.ALL="*",i.INSERT="INSERT",i.UPDATE="UPDATE",i.DELETE="DELETE"})(kh||(kh={}));var Bh;(function(i){i.BROADCAST="broadcast",i.PRESENCE="presence",i.POSTGRES_CHANGES="postgres_changes"})(Bh||(Bh={}));var zh;(function(i){i.SUBSCRIBED="SUBSCRIBED",i.TIMED_OUT="TIMED_OUT",i.CLOSED="CLOSED",i.CHANNEL_ERROR="CHANNEL_ERROR"})(zh||(zh={}));var tr=class i{constructor(t,e={config:{}},n){this.topic=t,this.params=e,this.socket=n,this.bindings={},this.state=cn.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=t.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:""},private:!1},e.config),this.timeout=this.socket.timeout,this.joinPush=new rs(this,mn.join,this.params,this.timeout),this.rejoinTimer=new ss(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=cn.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(s=>s.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=cn.closed,this.socket._remove(this)}),this._onError(s=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,s),this.state=cn.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=cn.errored,this.rejoinTimer.scheduleTimeout())}),this._on(mn.reply,{},(s,r)=>{this._trigger(this._replyEventName(r),s)}),this.presence=new Qs(this),this.broadcastEndpointURL=Ia(this.socket.endPoint)+"/api/broadcast"}subscribe(t,e=this.timeout){var n,s;if(this.socket.isConnected()||this.socket.connect(),this.joinedOnce)throw"tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";{let{config:{broadcast:r,presence:o,private:a}}=this.params;this._onError(h=>t&&t("CHANNEL_ERROR",h)),this._onClose(()=>t&&t("CLOSED"));let c={},l={broadcast:r,presence:o,postgres_changes:(s=(n=this.bindings.postgres_changes)===null||n===void 0?void 0:n.map(h=>h.filter))!==null&&s!==void 0?s:[],private:a};this.socket.accessToken&&(c.access_token=this.socket.accessToken),this.updateJoinPayload(Object.assign({config:l},c)),this.joinedOnce=!0,this._rejoin(e),this.joinPush.receive("ok",({postgres_changes:h})=>{var d;if(this.socket.accessToken&&this.socket.setAuth(this.socket.accessToken),h===void 0){t&&t("SUBSCRIBED");return}else{let f=this.bindings.postgres_changes,p=(d=f==null?void 0:f.length)!==null&&d!==void 0?d:0,_=[];for(let x=0;x<p;x++){let g=f[x],{filter:{event:m,schema:T,table:E,filter:M}}=g,N=h&&h[x];if(N&&N.event===m&&N.schema===T&&N.table===E&&N.filter===M)_.push(Object.assign(Object.assign({},g),{id:N.id}));else{this.unsubscribe(),t&&t("CHANNEL_ERROR",new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=_,t&&t("SUBSCRIBED");return}}).receive("error",h=>{t&&t("CHANNEL_ERROR",new Error(JSON.stringify(Object.values(h).join(", ")||"error")))}).receive("timeout",()=>{t&&t("TIMED_OUT")})}return this}presenceState(){return this.presence.state}async track(t,e={}){return await this.send({type:"presence",event:"track",payload:t},e.timeout||this.timeout)}async untrack(t={}){return await this.send({type:"presence",event:"untrack"},t)}on(t,e,n){return this._on(t,e,n)}async send(t,e={}){var n,s;if(!this._canPush()&&t.type==="broadcast"){let{event:r,payload:o}=t,a={method:"POST",headers:{Authorization:this.socket.accessToken?`Bearer ${this.socket.accessToken}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:o}]})};try{let c=await this._fetchWithTimeout(this.broadcastEndpointURL,a,(n=e.timeout)!==null&&n!==void 0?n:this.timeout);return await((s=c.body)===null||s===void 0?void 0:s.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(r=>{var o,a,c;let l=this._push(t.type,t,e.timeout||this.timeout);t.type==="broadcast"&&!(!((c=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||c===void 0)&&c.ack)&&r("ok"),l.receive("ok",()=>r("ok")),l.receive("error",()=>r("error")),l.receive("timeout",()=>r("timed out"))})}updateJoinPayload(t){this.joinPush.updatePayload(t)}unsubscribe(t=this.timeout){this.state=cn.leaving;let e=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(mn.close,"leave",this._joinRef())};return this.rejoinTimer.reset(),this.joinPush.destroy(),new Promise(n=>{let s=new rs(this,mn.leave,{},t);s.receive("ok",()=>{e(),n("ok")}).receive("timeout",()=>{e(),n("timed out")}).receive("error",()=>{n("error")}),s.send(),this._canPush()||s.trigger("ok",{})})}async _fetchWithTimeout(t,e,n){let s=new AbortController,r=setTimeout(()=>s.abort(),n),o=await this.socket.fetch(t,Object.assign(Object.assign({},e),{signal:s.signal}));return clearTimeout(r),o}_push(t,e,n=this.timeout){if(!this.joinedOnce)throw`tried to push '${t}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new rs(this,t,e,n);return this._canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}_onMessage(t,e,n){return e}_isMember(t){return this.topic===t}_joinRef(){return this.joinPush.ref}_trigger(t,e,n){var s,r;let o=t.toLocaleLowerCase(),{close:a,error:c,leave:l,join:h}=mn;if(n&&[a,c,l,h].indexOf(o)>=0&&n!==this._joinRef())return;let f=this._onMessage(o,e,n);if(e&&!f)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(o)?(s=this.bindings.postgres_changes)===null||s===void 0||s.filter(p=>{var _,x,g;return((_=p.filter)===null||_===void 0?void 0:_.event)==="*"||((g=(x=p.filter)===null||x===void 0?void 0:x.event)===null||g===void 0?void 0:g.toLocaleLowerCase())===o}).map(p=>p.callback(f,n)):(r=this.bindings[o])===null||r===void 0||r.filter(p=>{var _,x,g,m,T,E;if(["broadcast","presence","postgres_changes"].includes(o))if("id"in p){let M=p.id,N=(_=p.filter)===null||_===void 0?void 0:_.event;return M&&((x=e.ids)===null||x===void 0?void 0:x.includes(M))&&(N==="*"||(N==null?void 0:N.toLocaleLowerCase())===((g=e.data)===null||g===void 0?void 0:g.type.toLocaleLowerCase()))}else{let M=(T=(m=p==null?void 0:p.filter)===null||m===void 0?void 0:m.event)===null||T===void 0?void 0:T.toLocaleLowerCase();return M==="*"||M===((E=e==null?void 0:e.event)===null||E===void 0?void 0:E.toLocaleLowerCase())}else return p.type.toLocaleLowerCase()===o}).map(p=>{if(typeof f=="object"&&"ids"in f){let _=f.data,{schema:x,table:g,commit_timestamp:m,type:T,errors:E}=_;f=Object.assign(Object.assign({},{schema:x,table:g,commit_timestamp:m,eventType:T,new:{},old:{},errors:E}),this._getPayloadRecords(_))}p.callback(f,n)})}_isClosed(){return this.state===cn.closed}_isJoined(){return this.state===cn.joined}_isJoining(){return this.state===cn.joining}_isLeaving(){return this.state===cn.leaving}_replyEventName(t){return`chan_reply_${t}`}_on(t,e,n){let s=t.toLocaleLowerCase(),r={type:s,filter:e,callback:n};return this.bindings[s]?this.bindings[s].push(r):this.bindings[s]=[r],this}_off(t,e){let n=t.toLocaleLowerCase();return this.bindings[n]=this.bindings[n].filter(s=>{var r;return!(((r=s.type)===null||r===void 0?void 0:r.toLocaleLowerCase())===n&&i.isEqual(s.filter,e))}),this}static isEqual(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(let n in t)if(t[n]!==e[n])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(t){this._on(mn.close,{},t)}_onError(t){this._on(mn.error,{},e=>t(e))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(t=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=cn.joining,this.joinPush.resend(t))}_getPayloadRecords(t){let e={new:{},old:{}};return(t.type==="INSERT"||t.type==="UPDATE")&&(e.new=Nh(t.columns,t.record)),(t.type==="UPDATE"||t.type==="DELETE")&&(e.old=Nh(t.columns,t.old_record)),e}};var Lx=()=>{},Dx=typeof WebSocket!="undefined",er=class{constructor(t,e){var n;this.accessToken=null,this.apiKey=null,this.channels=[],this.endPoint="",this.httpEndpoint="",this.headers=_f,this.params={},this.timeout=Pa,this.heartbeatIntervalMs=3e4,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.ref=0,this.logger=Lx,this.conn=null,this.sendBuffer=[],this.serializer=new qr,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this._resolveFetch=r=>{let o;return r?o=r:typeof fetch=="undefined"?o=(...a)=>Promise.resolve().then(()=>(Ai(),ns)).then(({default:c})=>c(...a)):o=fetch,(...a)=>o(...a)},this.endPoint=`${t}/${Ca.websocket}`,this.httpEndpoint=Ia(t),e!=null&&e.transport?this.transport=e.transport:this.transport=null,e!=null&&e.params&&(this.params=e.params),e!=null&&e.headers&&(this.headers=Object.assign(Object.assign({},this.headers),e.headers)),e!=null&&e.timeout&&(this.timeout=e.timeout),e!=null&&e.logger&&(this.logger=e.logger),e!=null&&e.heartbeatIntervalMs&&(this.heartbeatIntervalMs=e.heartbeatIntervalMs);let s=(n=e==null?void 0:e.params)===null||n===void 0?void 0:n.apikey;s&&(this.accessToken=s,this.apiKey=s),this.reconnectAfterMs=e!=null&&e.reconnectAfterMs?e.reconnectAfterMs:r=>[1e3,2e3,5e3,1e4][r-1]||1e4,this.encode=e!=null&&e.encode?e.encode:(r,o)=>o(JSON.stringify(r)),this.decode=e!=null&&e.decode?e.decode:this.serializer.decode.bind(this.serializer),this.reconnectTimer=new ss(async()=>{this.disconnect(),this.connect()},this.reconnectAfterMs),this.fetch=this._resolveFetch(e==null?void 0:e.fetch)}connect(){if(!this.conn){if(this.transport){this.conn=new this.transport(this._endPointURL(),void 0,{headers:this.headers});return}if(Dx){this.conn=new WebSocket(this._endPointURL()),this.setupConnection();return}this.conn=new Hh(this._endPointURL(),void 0,{close:()=>{this.conn=null}}),Promise.resolve().then(()=>bu(Mf())).then(({default:t})=>{this.conn=new t(this._endPointURL(),void 0,{headers:this.headers}),this.setupConnection()})}}disconnect(t,e){this.conn&&(this.conn.onclose=function(){},t?this.conn.close(t,e!=null?e:""):this.conn.close(),this.conn=null,this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.reset())}getChannels(){return this.channels}async removeChannel(t){let e=await t.unsubscribe();return this.channels.length===0&&this.disconnect(),e}async removeAllChannels(){let t=await Promise.all(this.channels.map(e=>e.unsubscribe()));return this.disconnect(),t}log(t,e,n){this.logger(t,e,n)}connectionState(){switch(this.conn&&this.conn.readyState){case is.connecting:return Ri.Connecting;case is.open:return Ri.Open;case is.closing:return Ri.Closing;default:return Ri.Closed}}isConnected(){return this.connectionState()===Ri.Open}channel(t,e={config:{}}){let n=new tr(`realtime:${t}`,e,this);return this.channels.push(n),n}push(t){let{topic:e,event:n,payload:s,ref:r}=t,o=()=>{this.encode(t,a=>{var c;(c=this.conn)===null||c===void 0||c.send(a)})};this.log("push",`${e} ${n} (${r})`,s),this.isConnected()?o():this.sendBuffer.push(o)}setAuth(t){this.accessToken=t,this.channels.forEach(e=>{t&&e.updateJoinPayload({access_token:t}),e.joinedOnce&&e._isJoined()&&e._push(mn.access_token,{access_token:t})})}_makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}_leaveOpenTopic(t){let e=this.channels.find(n=>n.topic===t&&(n._isJoined()||n._isJoining()));e&&(this.log("transport",`leaving duplicate topic "${t}"`),e.unsubscribe())}_remove(t){this.channels=this.channels.filter(e=>e._joinRef()!==t._joinRef())}setupConnection(){this.conn&&(this.conn.binaryType="arraybuffer",this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=t=>this._onConnError(t),this.conn.onmessage=t=>this._onConnMessage(t),this.conn.onclose=t=>this._onConnClose(t))}_endPointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:vf}))}_onConnMessage(t){this.decode(t.data,e=>{let{topic:n,event:s,payload:r,ref:o}=e;(o&&o===this.pendingHeartbeatRef||s===(r==null?void 0:r.type))&&(this.pendingHeartbeatRef=null),this.log("receive",`${r.status||""} ${n} ${s} ${o&&"("+o+")"||""}`,r),this.channels.filter(a=>a._isMember(n)).forEach(a=>a._trigger(s,r,o)),this.stateChangeCallbacks.message.forEach(a=>a(e))})}_onConnOpen(){this.log("transport",`connected to ${this._endPointURL()}`),this._flushSendBuffer(),this.reconnectTimer.reset(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this._sendHeartbeat(),this.heartbeatIntervalMs),this.stateChangeCallbacks.open.forEach(t=>t())}_onConnClose(t){this.log("transport","close",t),this._triggerChanError(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach(e=>e(t))}_onConnError(t){this.log("transport",t.message),this._triggerChanError(),this.stateChangeCallbacks.error.forEach(e=>e(t))}_triggerChanError(){this.channels.forEach(t=>t._trigger(mn.error))}_appendParams(t,e){if(Object.keys(e).length===0)return t;let n=t.match(/\?/)?"&":"?",s=new URLSearchParams(e);return`${t}${n}${s}`}_flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}_sendHeartbeat(){var t;if(this.isConnected()){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),(t=this.conn)===null||t===void 0||t.close(yf,"hearbeat timeout");return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.setAuth(this.accessToken)}}},Hh=class{constructor(t,e,n){this.binaryType="arraybuffer",this.onclose=()=>{},this.onerror=()=>{},this.onmessage=()=>{},this.onopen=()=>{},this.readyState=is.connecting,this.send=()=>{},this.url=null,this.url=t,this.close=n.close}};var nr=class extends Error{constructor(t){super(t),this.__isStorageError=!0,this.name="StorageError"}};function Le(i){return typeof i=="object"&&i!==null&&"__isStorageError"in i}var La=class extends nr{constructor(t,e){super(t),this.name="StorageApiError",this.status=e}toJSON(){return{name:this.name,message:this.message,status:this.status}}},os=class extends nr{constructor(t,e){super(t),this.name="StorageUnknownError",this.originalError=e}};var Ux=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(d){o(d)}}function c(h){try{l(n.throw(h))}catch(d){o(d)}}function l(h){h.done?r(h.value):s(h.value).then(a,c)}l((n=n.apply(i,t||[])).next())})},Ua=i=>{let t;return i?t=i:typeof fetch=="undefined"?t=(...e)=>Promise.resolve().then(()=>(Ai(),ns)).then(({default:n})=>n(...e)):t=fetch,(...e)=>t(...e)},Sf=()=>Ux(void 0,void 0,void 0,function*(){return typeof Response=="undefined"?(yield Promise.resolve().then(()=>(Ai(),ns))).Response:Response}),Da=i=>{if(Array.isArray(i))return i.map(e=>Da(e));if(typeof i=="function"||i!==Object(i))return i;let t={};return Object.entries(i).forEach(([e,n])=>{let s=e.replace(/([-_][a-z])/gi,r=>r.toUpperCase().replace(/[-_]/g,""));t[s]=Da(n)}),t};var as=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(d){o(d)}}function c(h){try{l(n.throw(h))}catch(d){o(d)}}function l(h){h.done?r(h.value):s(h.value).then(a,c)}l((n=n.apply(i,t||[])).next())})},Vh=i=>i.msg||i.message||i.error_description||i.error||JSON.stringify(i),Ox=(i,t,e)=>as(void 0,void 0,void 0,function*(){let n=yield Sf();i instanceof n&&!(e!=null&&e.noResolveJson)?i.json().then(s=>{t(new La(Vh(s),i.status||500))}).catch(s=>{t(new os(Vh(s),s))}):t(new os(Vh(i),i))}),Nx=(i,t,e,n)=>{let s={method:i,headers:(t==null?void 0:t.headers)||{}};return i==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json"},t==null?void 0:t.headers),n&&(s.body=JSON.stringify(n)),Object.assign(Object.assign({},s),e))};function $r(i,t,e,n,s,r){return as(this,void 0,void 0,function*(){return new Promise((o,a)=>{i(e,Nx(t,n,s,r)).then(c=>{if(!c.ok)throw c;return n!=null&&n.noResolveJson?c:c.json()}).then(c=>o(c)).catch(c=>Ox(c,a,n))})})}function ir(i,t,e,n){return as(this,void 0,void 0,function*(){return $r(i,"GET",t,e,n)})}function qn(i,t,e,n,s){return as(this,void 0,void 0,function*(){return $r(i,"POST",t,n,s,e)})}function wf(i,t,e,n,s){return as(this,void 0,void 0,function*(){return $r(i,"PUT",t,n,s,e)})}function Ef(i,t,e,n){return as(this,void 0,void 0,function*(){return $r(i,"HEAD",t,Object.assign(Object.assign({},e),{noResolveJson:!0}),n)})}function Oa(i,t,e,n,s){return as(this,void 0,void 0,function*(){return $r(i,"DELETE",t,n,s,e)})}var ln=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(d){o(d)}}function c(h){try{l(n.throw(h))}catch(d){o(d)}}function l(h){h.done?r(h.value):s(h.value).then(a,c)}l((n=n.apply(i,t||[])).next())})},Fx={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Tf={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1},jr=class{constructor(t,e={},n,s){this.url=t,this.headers=e,this.bucketId=n,this.fetch=Ua(s)}uploadOrUpdate(t,e,n,s){return ln(this,void 0,void 0,function*(){try{let r,o=Object.assign(Object.assign({},Tf),s),a=Object.assign(Object.assign({},this.headers),t==="POST"&&{"x-upsert":String(o.upsert)}),c=o.metadata;typeof Blob!="undefined"&&n instanceof Blob?(r=new FormData,r.append("cacheControl",o.cacheControl),r.append("",n),c&&r.append("metadata",this.encodeMetadata(c))):typeof FormData!="undefined"&&n instanceof FormData?(r=n,r.append("cacheControl",o.cacheControl),c&&r.append("metadata",this.encodeMetadata(c))):(r=n,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,c&&(a["x-metadata"]=this.toBase64(this.encodeMetadata(c)))),s!=null&&s.headers&&(a=Object.assign(Object.assign({},a),s.headers));let l=this._removeEmptyFolders(e),h=this._getFinalPath(l),d=yield this.fetch(`${this.url}/object/${h}`,Object.assign({method:t,body:r,headers:a},o!=null&&o.duplex?{duplex:o.duplex}:{})),f=yield d.json();return d.ok?{data:{path:l,id:f.Id,fullPath:f.Key},error:null}:{data:null,error:f}}catch(r){if(Le(r))return{data:null,error:r};throw r}})}upload(t,e,n){return ln(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",t,e,n)})}uploadToSignedUrl(t,e,n,s){return ln(this,void 0,void 0,function*(){let r=this._removeEmptyFolders(t),o=this._getFinalPath(r),a=new URL(this.url+`/object/upload/sign/${o}`);a.searchParams.set("token",e);try{let c,l=Object.assign({upsert:Tf.upsert},s),h=Object.assign(Object.assign({},this.headers),{"x-upsert":String(l.upsert)});typeof Blob!="undefined"&&n instanceof Blob?(c=new FormData,c.append("cacheControl",l.cacheControl),c.append("",n)):typeof FormData!="undefined"&&n instanceof FormData?(c=n,c.append("cacheControl",l.cacheControl)):(c=n,h["cache-control"]=`max-age=${l.cacheControl}`,h["content-type"]=l.contentType);let d=yield this.fetch(a.toString(),{method:"PUT",body:c,headers:h}),f=yield d.json();return d.ok?{data:{path:r,fullPath:f.Key},error:null}:{data:null,error:f}}catch(c){if(Le(c))return{data:null,error:c};throw c}})}createSignedUploadUrl(t,e){return ln(this,void 0,void 0,function*(){try{let n=this._getFinalPath(t),s=Object.assign({},this.headers);e!=null&&e.upsert&&(s["x-upsert"]="true");let r=yield qn(this.fetch,`${this.url}/object/upload/sign/${n}`,{},{headers:s}),o=new URL(this.url+r.url),a=o.searchParams.get("token");if(!a)throw new nr("No token returned by API");return{data:{signedUrl:o.toString(),path:t,token:a},error:null}}catch(n){if(Le(n))return{data:null,error:n};throw n}})}update(t,e,n){return ln(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",t,e,n)})}move(t,e,n){return ln(this,void 0,void 0,function*(){try{return{data:yield qn(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:t,destinationKey:e,destinationBucket:n==null?void 0:n.destinationBucket},{headers:this.headers}),error:null}}catch(s){if(Le(s))return{data:null,error:s};throw s}})}copy(t,e,n){return ln(this,void 0,void 0,function*(){try{return{data:{path:(yield qn(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:t,destinationKey:e,destinationBucket:n==null?void 0:n.destinationBucket},{headers:this.headers})).Key},error:null}}catch(s){if(Le(s))return{data:null,error:s};throw s}})}createSignedUrl(t,e,n){return ln(this,void 0,void 0,function*(){try{let s=this._getFinalPath(t),r=yield qn(this.fetch,`${this.url}/object/sign/${s}`,Object.assign({expiresIn:e},n!=null&&n.transform?{transform:n.transform}:{}),{headers:this.headers}),o=n!=null&&n.download?`&download=${n.download===!0?"":n.download}`:"";return r={signedUrl:encodeURI(`${this.url}${r.signedURL}${o}`)},{data:r,error:null}}catch(s){if(Le(s))return{data:null,error:s};throw s}})}createSignedUrls(t,e,n){return ln(this,void 0,void 0,function*(){try{let s=yield qn(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:e,paths:t},{headers:this.headers}),r=n!=null&&n.download?`&download=${n.download===!0?"":n.download}`:"";return{data:s.map(o=>Object.assign(Object.assign({},o),{signedUrl:o.signedURL?encodeURI(`${this.url}${o.signedURL}${r}`):null})),error:null}}catch(s){if(Le(s))return{data:null,error:s};throw s}})}download(t,e){return ln(this,void 0,void 0,function*(){let s=typeof(e==null?void 0:e.transform)!="undefined"?"render/image/authenticated":"object",r=this.transformOptsToQueryString((e==null?void 0:e.transform)||{}),o=r?`?${r}`:"";try{let a=this._getFinalPath(t);return{data:yield(yield ir(this.fetch,`${this.url}/${s}/${a}${o}`,{headers:this.headers,noResolveJson:!0})).blob(),error:null}}catch(a){if(Le(a))return{data:null,error:a};throw a}})}info(t){return ln(this,void 0,void 0,function*(){let e=this._getFinalPath(t);try{let n=yield ir(this.fetch,`${this.url}/object/info/${e}`,{headers:this.headers});return{data:Da(n),error:null}}catch(n){if(Le(n))return{data:null,error:n};throw n}})}exists(t){return ln(this,void 0,void 0,function*(){let e=this._getFinalPath(t);try{return yield Ef(this.fetch,`${this.url}/object/${e}`,{headers:this.headers}),{data:!0,error:null}}catch(n){if(Le(n)&&n instanceof os){let s=n.originalError;if([400,404].includes(s==null?void 0:s.status))return{data:!1,error:n}}throw n}})}getPublicUrl(t,e){let n=this._getFinalPath(t),s=[],r=e!=null&&e.download?`download=${e.download===!0?"":e.download}`:"";r!==""&&s.push(r);let a=typeof(e==null?void 0:e.transform)!="undefined"?"render/image":"object",c=this.transformOptsToQueryString((e==null?void 0:e.transform)||{});c!==""&&s.push(c);let l=s.join("&");return l!==""&&(l=`?${l}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}${l}`)}}}remove(t){return ln(this,void 0,void 0,function*(){try{return{data:yield Oa(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:t},{headers:this.headers}),error:null}}catch(e){if(Le(e))return{data:null,error:e};throw e}})}list(t,e,n){return ln(this,void 0,void 0,function*(){try{let s=Object.assign(Object.assign(Object.assign({},Fx),e),{prefix:t||""});return{data:yield qn(this.fetch,`${this.url}/object/list/${this.bucketId}`,s,{headers:this.headers},n),error:null}}catch(s){if(Le(s))return{data:null,error:s};throw s}})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer!="undefined"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(t){let e=[];return t.width&&e.push(`width=${t.width}`),t.height&&e.push(`height=${t.height}`),t.resize&&e.push(`resize=${t.resize}`),t.format&&e.push(`format=${t.format}`),t.quality&&e.push(`quality=${t.quality}`),e.join("&")}};var Af="2.7.0";var Rf={"X-Client-Info":`storage-js/${Af}`};var sr=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(d){o(d)}}function c(h){try{l(n.throw(h))}catch(d){o(d)}}function l(h){h.done?r(h.value):s(h.value).then(a,c)}l((n=n.apply(i,t||[])).next())})},Yr=class{constructor(t,e={},n){this.url=t,this.headers=Object.assign(Object.assign({},Rf),e),this.fetch=Ua(n)}listBuckets(){return sr(this,void 0,void 0,function*(){try{return{data:yield ir(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(t){if(Le(t))return{data:null,error:t};throw t}})}getBucket(t){return sr(this,void 0,void 0,function*(){try{return{data:yield ir(this.fetch,`${this.url}/bucket/${t}`,{headers:this.headers}),error:null}}catch(e){if(Le(e))return{data:null,error:e};throw e}})}createBucket(t,e={public:!1}){return sr(this,void 0,void 0,function*(){try{return{data:yield qn(this.fetch,`${this.url}/bucket`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(Le(n))return{data:null,error:n};throw n}})}updateBucket(t,e){return sr(this,void 0,void 0,function*(){try{return{data:yield wf(this.fetch,`${this.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(Le(n))return{data:null,error:n};throw n}})}emptyBucket(t){return sr(this,void 0,void 0,function*(){try{return{data:yield qn(this.fetch,`${this.url}/bucket/${t}/empty`,{},{headers:this.headers}),error:null}}catch(e){if(Le(e))return{data:null,error:e};throw e}})}deleteBucket(t){return sr(this,void 0,void 0,function*(){try{return{data:yield Oa(this.fetch,`${this.url}/bucket/${t}`,{},{headers:this.headers}),error:null}}catch(e){if(Le(e))return{data:null,error:e};throw e}})}};var Zr=class extends Yr{constructor(t,e={},n){super(t,e,n)}from(t){return new jr(this.url,this.headers,t,this.fetch)}};var Cf="2.45.4";var Jr="";typeof Deno!="undefined"?Jr="deno":typeof document!="undefined"?Jr="web":typeof navigator!="undefined"&&navigator.product==="ReactNative"?Jr="react-native":Jr="node";var kx={"X-Client-Info":`supabase-js-${Jr}/${Cf}`},Pf={headers:kx},If={schema:"public"},Lf={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Df={};Ai();var Bx=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(d){o(d)}}function c(h){try{l(n.throw(h))}catch(d){o(d)}}function l(h){h.done?r(h.value):s(h.value).then(a,c)}l((n=n.apply(i,t||[])).next())})},zx=i=>{let t;return i?t=i:typeof fetch=="undefined"?t=Sh:t=fetch,(...e)=>t(...e)},Hx=()=>typeof Headers=="undefined"?wh:Headers,Uf=(i,t,e)=>{let n=zx(e),s=Hx();return(r,o)=>Bx(void 0,void 0,void 0,function*(){var a;let c=(a=yield t())!==null&&a!==void 0?a:i,l=new s(o==null?void 0:o.headers);return l.has("apikey")||l.set("apikey",i),l.has("Authorization")||l.set("Authorization",`Bearer ${c}`),n(r,Object.assign(Object.assign({},o),{headers:l}))})};var Vx=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(d){o(d)}}function c(h){try{l(n.throw(h))}catch(d){o(d)}}function l(h){h.done?r(h.value):s(h.value).then(a,c)}l((n=n.apply(i,t||[])).next())})};function Of(i){return i.replace(/\/$/,"")}function Nf(i,t){let{db:e,auth:n,realtime:s,global:r}=i,{db:o,auth:a,realtime:c,global:l}=t,h={db:Object.assign(Object.assign({},o),e),auth:Object.assign(Object.assign({},a),n),realtime:Object.assign(Object.assign({},c),s),global:Object.assign(Object.assign({},l),r),accessToken:()=>Vx(this,void 0,void 0,function*(){return""})};return i.accessToken?h.accessToken=i.accessToken:delete h.accessToken,h}var Na="2.65.0";var Ff="http://localhost:9999",kf="supabase.auth.token";var Bf={"X-Client-Info":`gotrue-js/${Na}`},Gh=10;var Kr="X-Supabase-Api-Version",Wh={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}};function zf(i){return Math.round(Date.now()/1e3)+i}function Hf(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(i){let t=Math.random()*16|0;return(i=="x"?t:t&3|8).toString(16)})}var wn=()=>typeof document!="undefined",cs={tested:!1,writable:!1},Ci=()=>{if(!wn())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(cs.tested)return cs.writable;let i=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(i,i),globalThis.localStorage.removeItem(i),cs.tested=!0,cs.writable=!0}catch{cs.tested=!0,cs.writable=!1}return cs.writable};function Fa(i){let t={},e=new URL(i);if(e.hash&&e.hash[0]==="#")try{new URLSearchParams(e.hash.substring(1)).forEach((s,r)=>{t[r]=s})}catch{}return e.searchParams.forEach((n,s)=>{t[s]=n}),t}var ka=i=>{let t;return i?t=i:typeof fetch=="undefined"?t=(...e)=>Promise.resolve().then(()=>(Ai(),ns)).then(({default:n})=>n(...e)):t=fetch,(...e)=>t(...e)},Vf=i=>typeof i=="object"&&i!==null&&"status"in i&&"ok"in i&&"json"in i&&typeof i.json=="function",Xh=async(i,t,e)=>{await i.setItem(t,JSON.stringify(e))},to=async(i,t)=>{let e=await i.getItem(t);if(!e)return null;try{return JSON.parse(e)}catch{return e}},eo=async(i,t)=>{await i.removeItem(t)};function Gx(i){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="",n,s,r,o,a,c,l,h=0;for(i=i.replace("-","+").replace("_","/");h<i.length;)o=t.indexOf(i.charAt(h++)),a=t.indexOf(i.charAt(h++)),c=t.indexOf(i.charAt(h++)),l=t.indexOf(i.charAt(h++)),n=o<<2|a>>4,s=(a&15)<<4|c>>2,r=(c&3)<<6|l,e=e+String.fromCharCode(n),c!=64&&s!=0&&(e=e+String.fromCharCode(s)),l!=64&&r!=0&&(e=e+String.fromCharCode(r));return e}var Qr=class i{constructor(){this.promise=new i.promiseConstructor((t,e)=>{this.resolve=t,this.reject=e})}};Qr.promiseConstructor=Promise;function qh(i){let t=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i,e=i.split(".");if(e.length!==3)throw new Error("JWT is not valid: not a JWT structure");if(!t.test(e[1]))throw new Error("JWT is not valid: payload is not in base64url format");let n=e[1];return JSON.parse(Gx(n))}async function Gf(i){return await new Promise(t=>{setTimeout(()=>t(null),i)})}function Wf(i,t){return new Promise((n,s)=>{(async()=>{for(let r=0;r<1/0;r++)try{let o=await i(r);if(!t(r,null,o)){n(o);return}}catch(o){if(!t(r,o)){s(o);return}}})()})}function Wx(i){return("0"+i.toString(16)).substr(-2)}function Xx(){let t=new Uint32Array(56);if(typeof crypto=="undefined"){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",n=e.length,s="";for(let r=0;r<56;r++)s+=e.charAt(Math.floor(Math.random()*n));return s}return crypto.getRandomValues(t),Array.from(t,Wx).join("")}async function qx(i){let e=new TextEncoder().encode(i),n=await crypto.subtle.digest("SHA-256",e),s=new Uint8Array(n);return Array.from(s).map(r=>String.fromCharCode(r)).join("")}function $x(i){return btoa(i).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function jx(i){if(!(typeof crypto!="undefined"&&typeof crypto.subtle!="undefined"&&typeof TextEncoder!="undefined"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),i;let e=await qx(i);return $x(e)}async function ls(i,t,e=!1){let n=Xx(),s=n;e&&(s+="/PASSWORD_RECOVERY"),await Xh(i,`${t}-code-verifier`,s);let r=await jx(n);return[r,n===r?"plain":"s256"]}var Yx=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Xf(i){let t=i.headers.get(Kr);if(!t||!t.match(Yx))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}var no=class extends Error{constructor(t,e,n){super(t),this.__isAuthError=!0,this.name="AuthError",this.status=e,this.code=n}};function te(i){return typeof i=="object"&&i!==null&&"__isAuthError"in i}var Ba=class extends no{constructor(t,e,n){super(t,e,n),this.name="AuthApiError",this.status=e,this.code=n}};function qf(i){return te(i)&&i.name==="AuthApiError"}var rr=class extends no{constructor(t,e){super(t),this.name="AuthUnknownError",this.originalError=e}},hi=class extends no{constructor(t,e,n,s){super(t,n,s),this.name=e,this.status=n}},En=class extends hi{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}};function $f(i){return te(i)&&i.name==="AuthSessionMissingError"}var or=class extends hi{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}},hs=class extends hi{constructor(t){super(t,"AuthInvalidCredentialsError",400,void 0)}},us=class extends hi{constructor(t,e=null){super(t,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=e}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},io=class extends hi{constructor(t,e=null){super(t,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=e}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}},ar=class extends hi{constructor(t,e){super(t,"AuthRetryableFetchError",e,void 0)}};function za(i){return te(i)&&i.name==="AuthRetryableFetchError"}var so=class extends hi{constructor(t,e,n){super(t,"AuthWeakPasswordError",e,"weak_password"),this.reasons=n}};var Zx=function(i,t){var e={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&t.indexOf(n)<0&&(e[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(i);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(i,n[s])&&(e[n[s]]=i[n[s]]);return e},ds=i=>i.msg||i.message||i.error_description||i.error||JSON.stringify(i),Jx=[502,503,504];async function jf(i){var t;if(!Vf(i))throw new ar(ds(i),0);if(Jx.includes(i.status))throw new ar(ds(i),i.status);let e;try{e=await i.json()}catch(r){throw new rr(ds(r),r)}let n,s=Xf(i);if(s&&s.getTime()>=Wh["2024-01-01"].timestamp&&typeof e=="object"&&e&&typeof e.code=="string"?n=e.code:typeof e=="object"&&e&&typeof e.error_code=="string"&&(n=e.error_code),n){if(n==="weak_password")throw new so(ds(e),i.status,((t=e.weak_password)===null||t===void 0?void 0:t.reasons)||[]);if(n==="session_not_found")throw new En}else if(typeof e=="object"&&e&&typeof e.weak_password=="object"&&e.weak_password&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.reasons.reduce((r,o)=>r&&typeof o=="string",!0))throw new so(ds(e),i.status,e.weak_password.reasons);throw new Ba(ds(e),i.status||500,n)}var Kx=(i,t,e,n)=>{let s={method:i,headers:(t==null?void 0:t.headers)||{}};return i==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},t==null?void 0:t.headers),s.body=JSON.stringify(n),Object.assign(Object.assign({},s),e))};async function le(i,t,e,n){var s;let r=Object.assign({},n==null?void 0:n.headers);r[Kr]||(r[Kr]=Wh["2024-01-01"].name),n!=null&&n.jwt&&(r.Authorization=`Bearer ${n.jwt}`);let o=(s=n==null?void 0:n.query)!==null&&s!==void 0?s:{};n!=null&&n.redirectTo&&(o.redirect_to=n.redirectTo);let a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",c=await Qx(i,t,e+a,{headers:r,noResolveJson:n==null?void 0:n.noResolveJson},{},n==null?void 0:n.body);return n!=null&&n.xform?n==null?void 0:n.xform(c):{data:Object.assign({},c),error:null}}async function Qx(i,t,e,n,s,r){let o=Kx(t,n,s,r),a;try{a=await i(e,Object.assign({},o))}catch(c){throw console.error(c),new ar(ds(c),0)}if(a.ok||await jf(a),n!=null&&n.noResolveJson)return a;try{return await a.json()}catch(c){await jf(c)}}function ui(i){var t;let e=null;tb(i)&&(e=Object.assign({},i),i.expires_at||(e.expires_at=zf(i.expires_in)));let n=(t=i.user)!==null&&t!==void 0?t:i;return{data:{session:e,user:n},error:null}}function $h(i){let t=ui(i);return!t.error&&i.weak_password&&typeof i.weak_password=="object"&&Array.isArray(i.weak_password.reasons)&&i.weak_password.reasons.length&&i.weak_password.message&&typeof i.weak_password.message=="string"&&i.weak_password.reasons.reduce((e,n)=>e&&typeof n=="string",!0)&&(t.data.weak_password=i.weak_password),t}function $n(i){var t;return{data:{user:(t=i.user)!==null&&t!==void 0?t:i},error:null}}function Yf(i){return{data:i,error:null}}function Zf(i){let{action_link:t,email_otp:e,hashed_token:n,redirect_to:s,verification_type:r}=i,o=Zx(i,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:t,email_otp:e,hashed_token:n,redirect_to:s,verification_type:r},c=Object.assign({},o);return{data:{properties:a,user:c},error:null}}function Jf(i){return i}function tb(i){return i.access_token&&i.refresh_token&&i.expires_in}var eb=function(i,t){var e={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&t.indexOf(n)<0&&(e[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(i);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(i,n[s])&&(e[n[s]]=i[n[s]]);return e},fs=class{constructor({url:t="",headers:e={},fetch:n}){this.url=t,this.headers=e,this.fetch=ka(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(t,e="global"){try{return await le(this.fetch,"POST",`${this.url}/logout?scope=${e}`,{headers:this.headers,jwt:t,noResolveJson:!0}),{data:null,error:null}}catch(n){if(te(n))return{data:null,error:n};throw n}}async inviteUserByEmail(t,e={}){try{return await le(this.fetch,"POST",`${this.url}/invite`,{body:{email:t,data:e.data},headers:this.headers,redirectTo:e.redirectTo,xform:$n})}catch(n){if(te(n))return{data:{user:null},error:n};throw n}}async generateLink(t){try{let{options:e}=t,n=eb(t,["options"]),s=Object.assign(Object.assign({},n),e);return"newEmail"in n&&(s.new_email=n==null?void 0:n.newEmail,delete s.newEmail),await le(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:Zf,redirectTo:e==null?void 0:e.redirectTo})}catch(e){if(te(e))return{data:{properties:null,user:null},error:e};throw e}}async createUser(t){try{return await le(this.fetch,"POST",`${this.url}/admin/users`,{body:t,headers:this.headers,xform:$n})}catch(e){if(te(e))return{data:{user:null},error:e};throw e}}async listUsers(t){var e,n,s,r,o,a,c;try{let l={nextPage:null,lastPage:0,total:0},h=await le(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(e=t==null?void 0:t.page)===null||e===void 0?void 0:e.toString())!==null&&n!==void 0?n:"",per_page:(r=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&r!==void 0?r:""},xform:Jf});if(h.error)throw h.error;let d=await h.json(),f=(o=h.headers.get("x-total-count"))!==null&&o!==void 0?o:0,p=(c=(a=h.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&c!==void 0?c:[];return p.length>0&&(p.forEach(_=>{let x=parseInt(_.split(";")[0].split("=")[1].substring(0,1)),g=JSON.parse(_.split(";")[1].split("=")[1]);l[`${g}Page`]=x}),l.total=parseInt(f)),{data:Object.assign(Object.assign({},d),l),error:null}}catch(l){if(te(l))return{data:{users:[]},error:l};throw l}}async getUserById(t){try{return await le(this.fetch,"GET",`${this.url}/admin/users/${t}`,{headers:this.headers,xform:$n})}catch(e){if(te(e))return{data:{user:null},error:e};throw e}}async updateUserById(t,e){try{return await le(this.fetch,"PUT",`${this.url}/admin/users/${t}`,{body:e,headers:this.headers,xform:$n})}catch(n){if(te(n))return{data:{user:null},error:n};throw n}}async deleteUser(t,e=!1){try{return await le(this.fetch,"DELETE",`${this.url}/admin/users/${t}`,{headers:this.headers,body:{should_soft_delete:e},xform:$n})}catch(n){if(te(n))return{data:{user:null},error:n};throw n}}async _listFactors(t){try{let{data:e,error:n}=await le(this.fetch,"GET",`${this.url}/admin/users/${t.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:e,error:n}}catch(e){if(te(e))return{data:null,error:e};throw e}}async _deleteFactor(t){try{return{data:await le(this.fetch,"DELETE",`${this.url}/admin/users/${t.userId}/factors/${t.id}`,{headers:this.headers}),error:null}}catch(e){if(te(e))return{data:null,error:e};throw e}}};var Kf={getItem:i=>Ci()?globalThis.localStorage.getItem(i):null,setItem:(i,t)=>{Ci()&&globalThis.localStorage.setItem(i,t)},removeItem:i=>{Ci()&&globalThis.localStorage.removeItem(i)}};function jh(i={}){return{getItem:t=>i[t]||null,setItem:(t,e)=>{i[t]=e},removeItem:t=>{delete i[t]}}}function Qf(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self!="undefined"&&(self.globalThis=self)}}var ps={debug:!!(globalThis&&Ci()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")},ro=class extends Error{constructor(t){super(t),this.isAcquireTimeout=!0}},Ha=class extends ro{};async function Yh(i,t,e){ps.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",i,t);let n=new globalThis.AbortController;return t>0&&setTimeout(()=>{n.abort(),ps.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",i)},t),await globalThis.navigator.locks.request(i,t===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:n.signal},async s=>{if(s){ps.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",i,s.name);try{return await e()}finally{ps.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",i,s.name)}}else{if(t===0)throw ps.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",i),new Ha(`Acquiring an exclusive Navigator LockManager lock "${i}" immediately failed`);if(ps.debug)try{let r=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(r,null,"  "))}catch(r){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",r)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await e()}})}Qf();var nb={url:Ff,storageKey:kf,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Bf,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1},oo=30*1e3,tp=3;async function ep(i,t,e){return await e()}var ms=class i{constructor(t){var e,n;this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=i.nextInstanceID,i.nextInstanceID+=1,this.instanceID>0&&wn()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");let s=Object.assign(Object.assign({},nb),t);if(this.logDebugMessages=!!s.debug,typeof s.debug=="function"&&(this.logger=s.debug),this.persistSession=s.persistSession,this.storageKey=s.storageKey,this.autoRefreshToken=s.autoRefreshToken,this.admin=new fs({url:s.url,headers:s.headers,fetch:s.fetch}),this.url=s.url,this.headers=s.headers,this.fetch=ka(s.fetch),this.lock=s.lock||ep,this.detectSessionInUrl=s.detectSessionInUrl,this.flowType=s.flowType,this.hasCustomAuthorizationHeader=s.hasCustomAuthorizationHeader,s.lock?this.lock=s.lock:wn()&&(!((e=globalThis==null?void 0:globalThis.navigator)===null||e===void 0)&&e.locks)?this.lock=Yh:this.lock=ep,this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?s.storage?this.storage=s.storage:Ci()?this.storage=Kf:(this.memoryStorage={},this.storage=jh(this.memoryStorage)):(this.memoryStorage={},this.storage=jh(this.memoryStorage)),wn()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(r){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",r)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async r=>{this._debug("received broadcast notification from other tab or client",r),await this._notifyAllSubscribers(r.data.event,r.data.session,!1)})}this.initialize()}_debug(...t){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${Na}) ${new Date().toISOString()}`,...t),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){try{let t=wn()?await this._isPKCEFlow():!1;if(this._debug("#_initialize()","begin","is PKCE flow",t),t||this.detectSessionInUrl&&this._isImplicitGrantFlow()){let{data:e,error:n}=await this._getSessionFromURL(t);if(n)return this._debug("#_initialize()","error detecting session from URL",n),(n==null?void 0:n.message)==="Identity is already linked"||(n==null?void 0:n.message)==="Identity is already linked to another user"?{error:n}:(await this._removeSession(),{error:n});let{session:s,redirectType:r}=e;return this._debug("#_initialize()","detected session in URL",s,"redirect type",r),await this._saveSession(s),setTimeout(async()=>{r==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",s):await this._notifyAllSubscribers("SIGNED_IN",s)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return te(t)?{error:t}:{error:new rr("Unexpected error during initialization",t)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(t){var e,n,s;try{let r=await le(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(n=(e=t==null?void 0:t.options)===null||e===void 0?void 0:e.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:(s=t==null?void 0:t.options)===null||s===void 0?void 0:s.captchaToken}},xform:ui}),{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};let c=o.session,l=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),{data:{user:l,session:c},error:null}}catch(r){if(te(r))return{data:{user:null,session:null},error:r};throw r}}async signUp(t){var e,n,s;try{let r;if("email"in t){let{email:h,password:d,options:f}=t,p=null,_=null;this.flowType==="pkce"&&([p,_]=await ls(this.storage,this.storageKey)),r=await le(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:f==null?void 0:f.emailRedirectTo,body:{email:h,password:d,data:(e=f==null?void 0:f.data)!==null&&e!==void 0?e:{},gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken},code_challenge:p,code_challenge_method:_},xform:ui})}else if("phone"in t){let{phone:h,password:d,options:f}=t;r=await le(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:h,password:d,data:(n=f==null?void 0:f.data)!==null&&n!==void 0?n:{},channel:(s=f==null?void 0:f.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken}},xform:ui})}else throw new hs("You must provide either an email or phone number and a password");let{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};let c=o.session,l=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),{data:{user:l,session:c},error:null}}catch(r){if(te(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithPassword(t){try{let e;if("email"in t){let{email:r,password:o,options:a}=t;e=await le(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:$h})}else if("phone"in t){let{phone:r,password:o,options:a}=t;e=await le(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:$h})}else throw new hs("You must provide either an email or phone number and a password");let{data:n,error:s}=e;return s?{data:{user:null,session:null},error:s}:!n||!n.session||!n.user?{data:{user:null,session:null},error:new or}:(n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),{data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:s})}catch(e){if(te(e))return{data:{user:null,session:null},error:e};throw e}}async signInWithOAuth(t){var e,n,s,r;return await this._handleProviderSignIn(t.provider,{redirectTo:(e=t.options)===null||e===void 0?void 0:e.redirectTo,scopes:(n=t.options)===null||n===void 0?void 0:n.scopes,queryParams:(s=t.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(r=t.options)===null||r===void 0?void 0:r.skipBrowserRedirect})}async exchangeCodeForSession(t){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(t))}async _exchangeCodeForSession(t){let e=await to(this.storage,`${this.storageKey}-code-verifier`),[n,s]=(e!=null?e:"").split("/");try{let{data:r,error:o}=await le(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:t,code_verifier:n},xform:ui});if(await eo(this.storage,`${this.storageKey}-code-verifier`),o)throw o;return!r||!r.session||!r.user?{data:{user:null,session:null,redirectType:null},error:new or}:(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),{data:Object.assign(Object.assign({},r),{redirectType:s!=null?s:null}),error:o})}catch(r){if(te(r))return{data:{user:null,session:null,redirectType:null},error:r};throw r}}async signInWithIdToken(t){try{let{options:e,provider:n,token:s,access_token:r,nonce:o}=t,a=await le(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:s,access_token:r,nonce:o,gotrue_meta_security:{captcha_token:e==null?void 0:e.captchaToken}},xform:ui}),{data:c,error:l}=a;return l?{data:{user:null,session:null},error:l}:!c||!c.session||!c.user?{data:{user:null,session:null},error:new or}:(c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers("SIGNED_IN",c.session)),{data:c,error:l})}catch(e){if(te(e))return{data:{user:null,session:null},error:e};throw e}}async signInWithOtp(t){var e,n,s,r,o;try{if("email"in t){let{email:a,options:c}=t,l=null,h=null;this.flowType==="pkce"&&([l,h]=await ls(this.storage,this.storageKey));let{error:d}=await le(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(e=c==null?void 0:c.data)!==null&&e!==void 0?e:{},create_user:(n=c==null?void 0:c.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},code_challenge:l,code_challenge_method:h},redirectTo:c==null?void 0:c.emailRedirectTo});return{data:{user:null,session:null},error:d}}if("phone"in t){let{phone:a,options:c}=t,{data:l,error:h}=await le(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(s=c==null?void 0:c.data)!==null&&s!==void 0?s:{},create_user:(r=c==null?void 0:c.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},channel:(o=c==null?void 0:c.channel)!==null&&o!==void 0?o:"sms"}});return{data:{user:null,session:null,messageId:l==null?void 0:l.message_id},error:h}}throw new hs("You must provide either an email or phone number.")}catch(a){if(te(a))return{data:{user:null,session:null},error:a};throw a}}async verifyOtp(t){var e,n;try{let s,r;"options"in t&&(s=(e=t.options)===null||e===void 0?void 0:e.redirectTo,r=(n=t.options)===null||n===void 0?void 0:n.captchaToken);let{data:o,error:a}=await le(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},t),{gotrue_meta_security:{captcha_token:r}}),redirectTo:s,xform:ui});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");let c=o.session,l=o.user;return c!=null&&c.access_token&&(await this._saveSession(c),await this._notifyAllSubscribers(t.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c)),{data:{user:l,session:c},error:null}}catch(s){if(te(s))return{data:{user:null,session:null},error:s};throw s}}async signInWithSSO(t){var e,n,s;try{let r=null,o=null;return this.flowType==="pkce"&&([r,o]=await ls(this.storage,this.storageKey)),await le(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in t?{provider_id:t.providerId}:null),"domain"in t?{domain:t.domain}:null),{redirect_to:(n=(e=t.options)===null||e===void 0?void 0:e.redirectTo)!==null&&n!==void 0?n:void 0}),!((s=t==null?void 0:t.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:t.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:r,code_challenge_method:o}),headers:this.headers,xform:Yf})}catch(r){if(te(r))return{data:null,error:r};throw r}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async t=>{let{data:{session:e},error:n}=t;if(n)throw n;if(!e)throw new En;let{error:s}=await le(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:e.access_token});return{data:{user:null,session:null},error:s}})}catch(t){if(te(t))return{data:{user:null,session:null},error:t};throw t}}async resend(t){try{let e=`${this.url}/resend`;if("email"in t){let{email:n,type:s,options:r}=t,{error:o}=await le(this.fetch,"POST",e,{headers:this.headers,body:{email:n,type:s,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},redirectTo:r==null?void 0:r.emailRedirectTo});return{data:{user:null,session:null},error:o}}else if("phone"in t){let{phone:n,type:s,options:r}=t,{data:o,error:a}=await le(this.fetch,"POST",e,{headers:this.headers,body:{phone:n,type:s,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}}});return{data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:a}}throw new hs("You must provide either an email or phone number and a type")}catch(e){if(te(e))return{data:{user:null,session:null},error:e};throw e}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async e=>e))}async _acquireLock(t,e){this._debug("#_acquireLock","begin",t);try{if(this.lockAcquired){let n=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await n,await e()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,t,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;let n=e();for(this.pendingInLock.push((async()=>{try{await n}catch{}})()),await n;this.pendingInLock.length;){let s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await n}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(t){this._debug("#_useSession","begin");try{let e=await this.__loadSession();return await t(e)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let t=null,e=await to(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",e),e!==null&&(this._isValidSession(e)?t=e:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!t)return{data:{session:null},error:null};let n=t.expires_at?t.expires_at<=Date.now()/1e3:!1;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",t.expires_at),!n){if(this.storage.isServer){let o=this.suppressGetSessionWarning;t=new Proxy(t,{get:(c,l,h)=>(!o&&l==="user"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),o=!0,this.suppressGetSessionWarning=!0),Reflect.get(c,l,h))})}return{data:{session:t},error:null}}let{session:s,error:r}=await this._callRefreshToken(t.refresh_token);return r?{data:{session:null},error:r}:{data:{session:s},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(t){return t?await this._getUser(t):(await this.initializePromise,await this._acquireLock(-1,async()=>await this._getUser()))}async _getUser(t){try{return t?await le(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:t,xform:$n}):await this._useSession(async e=>{var n,s,r;let{data:o,error:a}=e;if(a)throw a;return!(!((n=o.session)===null||n===void 0)&&n.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new En}:await le(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(r=(s=o.session)===null||s===void 0?void 0:s.access_token)!==null&&r!==void 0?r:void 0,xform:$n})})}catch(e){if(te(e))return $f(e)&&(await this._removeSession(),await eo(this.storage,`${this.storageKey}-code-verifier`),await this._notifyAllSubscribers("SIGNED_OUT",null)),{data:{user:null},error:e};throw e}}async updateUser(t,e={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(t,e))}async _updateUser(t,e={}){try{return await this._useSession(async n=>{let{data:s,error:r}=n;if(r)throw r;if(!s.session)throw new En;let o=s.session,a=null,c=null;this.flowType==="pkce"&&t.email!=null&&([a,c]=await ls(this.storage,this.storageKey));let{data:l,error:h}=await le(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:e==null?void 0:e.emailRedirectTo,body:Object.assign(Object.assign({},t),{code_challenge:a,code_challenge_method:c}),jwt:o.access_token,xform:$n});if(h)throw h;return o.user=l.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),{data:{user:o.user},error:null}})}catch(n){if(te(n))return{data:{user:null},error:n};throw n}}_decodeJWT(t){return qh(t)}async setSession(t){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(t))}async _setSession(t){try{if(!t.access_token||!t.refresh_token)throw new En;let e=Date.now()/1e3,n=e,s=!0,r=null,o=qh(t.access_token);if(o.exp&&(n=o.exp,s=n<=e),s){let{session:a,error:c}=await this._callRefreshToken(t.refresh_token);if(c)return{data:{user:null,session:null},error:c};if(!a)return{data:{user:null,session:null},error:null};r=a}else{let{data:a,error:c}=await this._getUser(t.access_token);if(c)throw c;r={access_token:t.access_token,refresh_token:t.refresh_token,user:a.user,token_type:"bearer",expires_in:n-e,expires_at:n},await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)}return{data:{user:r.user,session:r},error:null}}catch(e){if(te(e))return{data:{session:null,user:null},error:e};throw e}}async refreshSession(t){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(t))}async _refreshSession(t){try{return await this._useSession(async e=>{var n;if(!t){let{data:o,error:a}=e;if(a)throw a;t=(n=o.session)!==null&&n!==void 0?n:void 0}if(!(t!=null&&t.refresh_token))throw new En;let{session:s,error:r}=await this._callRefreshToken(t.refresh_token);return r?{data:{user:null,session:null},error:r}:s?{data:{user:s.user,session:s},error:null}:{data:{user:null,session:null},error:null}})}catch(e){if(te(e))return{data:{user:null,session:null},error:e};throw e}}async _getSessionFromURL(t){try{if(!wn())throw new us("No browser detected.");if(this.flowType==="implicit"&&!this._isImplicitGrantFlow())throw new us("Not a valid implicit grant flow url.");if(this.flowType=="pkce"&&!t)throw new io("Not a valid PKCE flow url.");let e=Fa(window.location.href);if(t){if(!e.code)throw new io("No code detected.");let{data:T,error:E}=await this._exchangeCodeForSession(e.code);if(E)throw E;let M=new URL(window.location.href);return M.searchParams.delete("code"),window.history.replaceState(window.history.state,"",M.toString()),{data:{session:T.session,redirectType:null},error:null}}if(e.error||e.error_description||e.error_code)throw new us(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});let{provider_token:n,provider_refresh_token:s,access_token:r,refresh_token:o,expires_in:a,expires_at:c,token_type:l}=e;if(!r||!a||!o||!l)throw new us("No session defined in URL");let h=Math.round(Date.now()/1e3),d=parseInt(a),f=h+d;c&&(f=parseInt(c));let p=f-h;p*1e3<=oo&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${d}s`);let _=f-d;h-_>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",_,f,h):h-_<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",_,f,h);let{data:x,error:g}=await this._getUser(r);if(g)throw g;let m={provider_token:n,provider_refresh_token:s,access_token:r,expires_in:d,expires_at:f,refresh_token:o,token_type:l,user:x.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:m,redirectType:e.type},error:null}}catch(e){if(te(e))return{data:{session:null,redirectType:null},error:e};throw e}}_isImplicitGrantFlow(){let t=Fa(window.location.href);return!!(wn()&&(t.access_token||t.error_description))}async _isPKCEFlow(){let t=Fa(window.location.href),e=await to(this.storage,`${this.storageKey}-code-verifier`);return!!(t.code&&e)}async signOut(t={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(t))}async _signOut({scope:t}={scope:"global"}){return await this._useSession(async e=>{var n;let{data:s,error:r}=e;if(r)return{error:r};let o=(n=s.session)===null||n===void 0?void 0:n.access_token;if(o){let{error:a}=await this.admin.signOut(o,t);if(a&&!(qf(a)&&(a.status===404||a.status===401||a.status===403)))return{error:a}}return t!=="others"&&(await this._removeSession(),await eo(this.storage,`${this.storageKey}-code-verifier`),await this._notifyAllSubscribers("SIGNED_OUT",null)),{error:null}})}onAuthStateChange(t){let e=Hf(),n={id:e,callback:t,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",e),this.stateChangeEmitters.delete(e)}};return this._debug("#onAuthStateChange()","registered callback with id",e),this.stateChangeEmitters.set(e,n),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(e)})))(),{data:{subscription:n}}}async _emitInitialSession(t){return await this._useSession(async e=>{var n,s;try{let{data:{session:r},error:o}=e;if(o)throw o;await((n=this.stateChangeEmitters.get(t))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",t,"session",r)}catch(r){await((s=this.stateChangeEmitters.get(t))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",t,"error",r),console.error(r)}})}async resetPasswordForEmail(t,e={}){let n=null,s=null;this.flowType==="pkce"&&([n,s]=await ls(this.storage,this.storageKey,!0));try{return await le(this.fetch,"POST",`${this.url}/recover`,{body:{email:t,code_challenge:n,code_challenge_method:s,gotrue_meta_security:{captcha_token:e.captchaToken}},headers:this.headers,redirectTo:e.redirectTo})}catch(r){if(te(r))return{data:null,error:r};throw r}}async getUserIdentities(){var t;try{let{data:e,error:n}=await this.getUser();if(n)throw n;return{data:{identities:(t=e.user.identities)!==null&&t!==void 0?t:[]},error:null}}catch(e){if(te(e))return{data:null,error:e};throw e}}async linkIdentity(t){var e;try{let{data:n,error:s}=await this._useSession(async r=>{var o,a,c,l,h;let{data:d,error:f}=r;if(f)throw f;let p=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,t.provider,{redirectTo:(o=t.options)===null||o===void 0?void 0:o.redirectTo,scopes:(a=t.options)===null||a===void 0?void 0:a.scopes,queryParams:(c=t.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return await le(this.fetch,"GET",p,{headers:this.headers,jwt:(h=(l=d.session)===null||l===void 0?void 0:l.access_token)!==null&&h!==void 0?h:void 0})});if(s)throw s;return wn()&&!(!((e=t.options)===null||e===void 0)&&e.skipBrowserRedirect)&&window.location.assign(n==null?void 0:n.url),{data:{provider:t.provider,url:n==null?void 0:n.url},error:null}}catch(n){if(te(n))return{data:{provider:t.provider,url:null},error:n};throw n}}async unlinkIdentity(t){try{return await this._useSession(async e=>{var n,s;let{data:r,error:o}=e;if(o)throw o;return await le(this.fetch,"DELETE",`${this.url}/user/identities/${t.identity_id}`,{headers:this.headers,jwt:(s=(n=r.session)===null||n===void 0?void 0:n.access_token)!==null&&s!==void 0?s:void 0})})}catch(e){if(te(e))return{data:null,error:e};throw e}}async _refreshAccessToken(t){let e=`#_refreshAccessToken(${t.substring(0,5)}...)`;this._debug(e,"begin");try{let n=Date.now();return await Wf(async s=>(s>0&&await Gf(200*Math.pow(2,s-1)),this._debug(e,"refreshing attempt",s),await le(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:t},headers:this.headers,xform:ui})),(s,r)=>{let o=200*Math.pow(2,s);return r&&za(r)&&Date.now()+o-n<oo})}catch(n){if(this._debug(e,"error",n),te(n))return{data:{session:null,user:null},error:n};throw n}finally{this._debug(e,"end")}}_isValidSession(t){return typeof t=="object"&&t!==null&&"access_token"in t&&"refresh_token"in t&&"expires_at"in t}async _handleProviderSignIn(t,e){let n=await this._getUrlForProvider(`${this.url}/authorize`,t,{redirectTo:e.redirectTo,scopes:e.scopes,queryParams:e.queryParams});return this._debug("#_handleProviderSignIn()","provider",t,"options",e,"url",n),wn()&&!e.skipBrowserRedirect&&window.location.assign(n),{data:{provider:t,url:n},error:null}}async _recoverAndRefresh(){var t;let e="#_recoverAndRefresh()";this._debug(e,"begin");try{let n=await to(this.storage,this.storageKey);if(this._debug(e,"session from storage",n),!this._isValidSession(n)){this._debug(e,"session is not valid"),n!==null&&await this._removeSession();return}let s=Math.round(Date.now()/1e3),r=((t=n.expires_at)!==null&&t!==void 0?t:1/0)<s+Gh;if(this._debug(e,`session has${r?"":" not"} expired with margin of ${Gh}s`),r){if(this.autoRefreshToken&&n.refresh_token){let{error:o}=await this._callRefreshToken(n.refresh_token);o&&(console.error(o),za(o)||(this._debug(e,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(e,"error",n),console.error(n);return}finally{this._debug(e,"end")}}async _callRefreshToken(t){var e,n;if(!t)throw new En;if(this.refreshingDeferred)return this.refreshingDeferred.promise;let s=`#_callRefreshToken(${t.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new Qr;let{data:r,error:o}=await this._refreshAccessToken(t);if(o)throw o;if(!r.session)throw new En;await this._saveSession(r.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",r.session);let a={session:r.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(r){if(this._debug(s,"error",r),te(r)){let o={session:null,error:r};return za(r)||(await this._removeSession(),await this._notifyAllSubscribers("SIGNED_OUT",null)),(e=this.refreshingDeferred)===null||e===void 0||e.resolve(o),o}throw(n=this.refreshingDeferred)===null||n===void 0||n.reject(r),r}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(t,e,n=!0){let s=`#_notifyAllSubscribers(${t})`;this._debug(s,"begin",e,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:t,session:e});let r=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(t,e)}catch(c){r.push(c)}});if(await Promise.all(o),r.length>0){for(let a=0;a<r.length;a+=1)console.error(r[a]);throw r[0]}}finally{this._debug(s,"end")}}async _saveSession(t){this._debug("#_saveSession()",t),this.suppressGetSessionWarning=!0,await Xh(this.storage,this.storageKey,t)}async _removeSession(){this._debug("#_removeSession()"),await eo(this.storage,this.storageKey)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");let t=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{t&&wn()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",t)}catch(e){console.error("removing visibilitychange callback failed",e)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");let t=setInterval(()=>this._autoRefreshTokenTick(),oo);this.autoRefreshTicker=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno!="undefined"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");let t=this.autoRefreshTicker;this.autoRefreshTicker=null,t&&clearInterval(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{let t=Date.now();try{return await this._useSession(async e=>{let{data:{session:n}}=e;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}let s=Math.floor((n.expires_at*1e3-t)/oo);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${oo}ms, refresh threshold is ${tp} ticks`),s<=tp&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error("Auto refresh tick failed with error. This is likely a transient error.",e)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(t){if(t.isAcquireTimeout||t instanceof ro)this._debug("auto refresh token tick lock not available");else throw t}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!wn()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(t){console.error("_handleVisibilityChange",t)}}async _onVisibilityChanged(t){let e=`#_onVisibilityChanged(${t})`;this._debug(e,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),t||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(e,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(t,e,n){let s=[`provider=${encodeURIComponent(e)}`];if(n!=null&&n.redirectTo&&s.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n!=null&&n.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType==="pkce"){let[r,o]=await ls(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(r)}`,code_challenge_method:`${encodeURIComponent(o)}`});s.push(a.toString())}if(n!=null&&n.queryParams){let r=new URLSearchParams(n.queryParams);s.push(r.toString())}return n!=null&&n.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${t}?${s.join("&")}`}async _unenroll(t){try{return await this._useSession(async e=>{var n;let{data:s,error:r}=e;return r?{data:null,error:r}:await le(this.fetch,"DELETE",`${this.url}/factors/${t.factorId}`,{headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token})})}catch(e){if(te(e))return{data:null,error:e};throw e}}async _enroll(t){try{return await this._useSession(async e=>{var n,s;let{data:r,error:o}=e;if(o)return{data:null,error:o};let a=Object.assign({friendly_name:t.friendlyName,factor_type:t.factorType},t.factorType==="phone"?{phone:t.phone}:{issuer:t.issuer}),{data:c,error:l}=await le(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(n=r==null?void 0:r.session)===null||n===void 0?void 0:n.access_token});return l?{data:null,error:l}:(t.factorType==="phone"&&delete c.totp,t.factorType==="totp"&&(!((s=c==null?void 0:c.totp)===null||s===void 0)&&s.qr_code)&&(c.totp.qr_code=`data:image/svg+xml;utf-8,${c.totp.qr_code}`),{data:c,error:null})})}catch(e){if(te(e))return{data:null,error:e};throw e}}async _verify(t){return this._acquireLock(-1,async()=>{try{return await this._useSession(async e=>{var n;let{data:s,error:r}=e;if(r)return{data:null,error:r};let{data:o,error:a}=await le(this.fetch,"POST",`${this.url}/factors/${t.factorId}/verify`,{body:{code:t.code,challenge_id:t.challengeId},headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token});return a?{data:null,error:a}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),{data:o,error:a})})}catch(e){if(te(e))return{data:null,error:e};throw e}})}async _challenge(t){return this._acquireLock(-1,async()=>{try{return await this._useSession(async e=>{var n;let{data:s,error:r}=e;return r?{data:null,error:r}:await le(this.fetch,"POST",`${this.url}/factors/${t.factorId}/challenge`,{body:{channel:t.channel},headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token})})}catch(e){if(te(e))return{data:null,error:e};throw e}})}async _challengeAndVerify(t){let{data:e,error:n}=await this._challenge({factorId:t.factorId});return n?{data:null,error:n}:await this._verify({factorId:t.factorId,challengeId:e.id,code:t.code})}async _listFactors(){let{data:{user:t},error:e}=await this.getUser();if(e)return{data:null,error:e};let n=(t==null?void 0:t.factors)||[],s=n.filter(o=>o.factor_type==="totp"&&o.status==="verified"),r=n.filter(o=>o.factor_type==="phone"&&o.status==="verified");return{data:{all:n,totp:s,phone:r},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,async()=>await this._useSession(async t=>{var e,n;let{data:{session:s},error:r}=t;if(r)return{data:null,error:r};if(!s)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};let o=this._decodeJWT(s.access_token),a=null;o.aal&&(a=o.aal);let c=a;((n=(e=s.user.factors)===null||e===void 0?void 0:e.filter(d=>d.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(c="aal2");let h=o.amr||[];return{data:{currentLevel:a,nextLevel:c,currentAuthenticationMethods:h},error:null}}))}};ms.nextInstanceID=0;var ib=ms,Zh=ib;var Va=class extends Zh{constructor(t){super(t)}};var sb=function(i,t,e,n){function s(r){return r instanceof e?r:new e(function(o){o(r)})}return new(e||(e=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(d){o(d)}}function c(h){try{l(n.throw(h))}catch(d){o(d)}}function l(h){h.done?r(h.value):s(h.value).then(a,c)}l((n=n.apply(i,t||[])).next())})},ao=class{constructor(t,e,n){var s,r,o;if(this.supabaseUrl=t,this.supabaseKey=e,!t)throw new Error("supabaseUrl is required.");if(!e)throw new Error("supabaseKey is required.");let a=Of(t);this.realtimeUrl=`${a}/realtime/v1`.replace(/^http/i,"ws"),this.authUrl=`${a}/auth/v1`,this.storageUrl=`${a}/storage/v1`,this.functionsUrl=`${a}/functions/v1`;let c=`sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`,l={db:If,realtime:Df,auth:Object.assign(Object.assign({},Lf),{storageKey:c}),global:Pf},h=Nf(n!=null?n:{},l);this.storageKey=(s=h.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(r=h.global.headers)!==null&&r!==void 0?r:{},h.accessToken?(this.accessToken=h.accessToken,this.auth=new Proxy({},{get:(d,f)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(f)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((o=h.auth)!==null&&o!==void 0?o:{},this.headers,h.global.fetch),this.fetch=Uf(e,this._getAccessToken.bind(this),h.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers},h.realtime)),this.rest=new mf(`${a}/rest/v1`,{headers:this.headers,schema:h.db.schema,fetch:this.fetch}),h.accessToken||this._listenForAuthEvents()}get functions(){return new kr(this.functionsUrl,{headers:this.headers,customFetch:this.fetch})}get storage(){return new Zr(this.storageUrl,this.headers,this.fetch)}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},n={}){return this.rest.rpc(t,e,n)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var t,e;return sb(this,void 0,void 0,function*(){if(this.accessToken)return yield this.accessToken();let{data:n}=yield this.auth.getSession();return(e=(t=n.session)===null||t===void 0?void 0:t.access_token)!==null&&e!==void 0?e:null})}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:n,storage:s,storageKey:r,flowType:o,lock:a,debug:c},l,h){var d;let f={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Va({url:this.authUrl,headers:Object.assign(Object.assign({},f),l),storageKey:r,autoRefreshToken:t,persistSession:e,detectSessionInUrl:n,storage:s,flowType:o,lock:a,debug:c,fetch:h,hasCustomAuthorizationHeader:(d="Authorization"in this.headers)!==null&&d!==void 0?d:!1})}_initRealtimeClient(t){return new er(this.realtimeUrl,Object.assign(Object.assign({},t),{params:Object.assign({apikey:this.supabaseKey},t==null?void 0:t.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,n)=>{this._handleTokenChanged(e,"CLIENT",n==null?void 0:n.access_token)})}_handleTokenChanged(t,e,n){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN")&&this.changedAccessToken!==n?(this.realtime.setAuth(n!=null?n:null),this.changedAccessToken=n):t==="SIGNED_OUT"&&(this.realtime.setAuth(this.supabaseKey),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};var np=(i,t,e)=>new ao(i,t,e);var ip={type:"change"},Kh={type:"start"},rp={type:"end"},Ga=new Xs,sp=new Ln,rb=Math.cos(70*es.DEG2RAD),ke=new L,hn=2*Math.PI,ye={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Jh=1e-6,Wa=class extends va{constructor(t,e=null){super(t,e),this.state=ye.NONE,this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qi.ROTATE,MIDDLE:Qi.DOLLY,RIGHT:Qi.PAN},this.touches={ONE:ts.ROTATE,TWO:ts.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Nn,this._lastTargetPosition=new L,this._quat=new Nn().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Or,this._sphericalDelta=new Or,this._scale=1,this._panOffset=new L,this._rotateStart=new _t,this._rotateEnd=new _t,this._rotateDelta=new _t,this._panStart=new _t,this._panEnd=new _t,this._panDelta=new _t,this._dollyStart=new _t,this._dollyEnd=new _t,this._dollyDelta=new _t,this._dollyDirection=new L,this._mouse=new _t,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ab.bind(this),this._onPointerDown=ob.bind(this),this._onPointerUp=cb.bind(this),this._onContextMenu=mb.bind(this),this._onMouseWheel=ub.bind(this),this._onKeyDown=db.bind(this),this._onTouchStart=fb.bind(this),this._onTouchMove=pb.bind(this),this._onMouseDown=lb.bind(this),this._onMouseMove=hb.bind(this),this._interceptControlDown=gb.bind(this),this._interceptControlUp=_b.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ip),this.update(),this.state=ye.NONE}update(t=null){let e=this.object.position;ke.copy(e).sub(this.target),ke.applyQuaternion(this._quat),this._spherical.setFromVector3(ke),this.autoRotate&&this.state===ye.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=hn:n>Math.PI&&(n-=hn),s<-Math.PI?s+=hn:s>Math.PI&&(s-=hn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(ke.setFromSpherical(this._spherical),ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=ke.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ga.origin.copy(this.object.position),Ga.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ga.direction))<rb?this.object.lookAt(this.target):(sp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ga.intersectPlane(sp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Jh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Jh||this._lastTargetPosition.distanceToSquared(this.target)>Jh?(this.dispatchEvent(ip),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?hn/60*this.autoRotateSpeed*t:hn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ke.setFromMatrixColumn(e,0),ke.multiplyScalar(-t),this._panOffset.add(ke)}_panUp(t,e){this.screenSpacePanning===!0?ke.setFromMatrixColumn(e,1):(ke.setFromMatrixColumn(e,0),ke.crossVectors(this.object.up,ke)),ke.multiplyScalar(t),this._panOffset.add(ke)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;ke.copy(s).sub(this.target);let r=ke.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/e.clientHeight),this._rotateUp(hn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-hn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(hn*this._rotateDelta.x/e.clientHeight),this._rotateUp(hn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new _t,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function ob(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function ab(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function cb(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rp),this.state=ye.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function lb(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Qi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ye.DOLLY;break;case Qi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}break;case Qi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(Kh)}function hb(i){switch(this.state){case ye.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ye.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function ub(i){this.enabled===!1||this.enableZoom===!1||this.state!==ye.NONE||(i.preventDefault(),this.dispatchEvent(Kh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(rp))}function db(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function fb(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ts.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ye.TOUCH_ROTATE;break;case ts.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ye.TOUCH_PAN;break;default:this.state=ye.NONE}break;case 2:switch(this.touches.TWO){case ts.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ye.TOUCH_DOLLY_PAN;break;case ts.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ye.TOUCH_DOLLY_ROTATE;break;default:this.state=ye.NONE}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(Kh)}function pb(i){switch(this._trackPointer(i),this.state){case ye.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ye.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ye.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ye.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ye.NONE}}function mb(i){this.enabled!==!1&&i.preventDefault()}function gb(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function _b(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}{let _=function(u,v,y,R,U,F,q,G,xt={}){let $=new Xt(p,typeof U=="string"?f(U):U);return $.scale.set(v,y,R),$.position.set(F,q+y/2,G),$.castShadow=xt.cast!==!1,$.receiveShadow=!0,xt.ry&&($.rotation.y=xt.ry),u.add($),$},x=function(u,v,y,R,U,F,q,G,xt=12){let $=new Xt(new Zi(v,y,R,xt),typeof U=="string"?f(U):U);return $.position.set(F,q+R/2,G),$.castShadow=!0,$.receiveShadow=!0,u.add($),$},g=function(u,v,y,R,U,F,q,G=0){let xt=new Xt(new Mn(v,y),typeof R=="string"?f(R):R);return xt.rotation.x=-Math.PI/2,xt.rotation.z=G,xt.position.set(U,F,q),xt.receiveShadow=!0,u.add(xt),xt},m=function(u,{w:v=1024,h:y=256,bg:R=null,fg:U="#fff",font:F="800 150px Plus Jakarta Sans, sans-serif"}={}){let q=document.createElement("canvas");q.width=v,q.height=y;let G=q.getContext("2d");R&&(G.fillStyle=R,G.fillRect(0,0,v,y)),G.fillStyle=U,G.font=F;let xt=G.measureText(u).width;xt>v*.9&&(G.font=F.replace(/\d+px/,lt=>Math.floor(parseInt(lt)*v*.9/xt)+"px")),G.textAlign="center",G.textBaseline="middle",G.fillText(u,v/2,y/2+6);let $=new Ir(q);return $.colorSpace=$e,$.anisotropy=4,$},D=function(u,v,{w:y=1024,h:R=160,bg:U=null}={}){let F=document.createElement("canvas");F.width=y,F.height=R;let q=F.getContext("2d"),G=new Ir(F);G.colorSpace=$e,G.anisotropy=4;let xt=()=>{q.clearRect(0,0,y,R),U&&(q.fillStyle=U,q.fillRect(0,0,y,R));let $=v!==null&&M.complete&&M.naturalWidth,lt=$?R*.8*M.naturalWidth/M.naturalHeight:0,Ut=R*.62;q.font=`800 ${Ut}px Plus Jakarta Sans, sans-serif`;let ce=q.measureText(u).width,Ae=y*.92-lt-($?R*.15:0);ce>Ae&&(Ut*=Ae/ce,q.font=`800 ${Ut}px Plus Jakarta Sans, sans-serif`,ce=q.measureText(u).width);let Ue=(y-(ce+lt+($?R*.15:0)))/2;$&&(q.drawImage(M,Ue,R*.1,lt,R*.8),Ue+=lt+R*.15),q.textBaseline="middle";let ze=0;for(let mi of u)q.fillStyle=mi===" "||mi==="\xB7"?"#334155":E[ze++%5],q.fillText(mi,Ue,R/2+4),Ue+=q.measureText(mi).width;G.needsUpdate=!0};return xt(),I.push(xt),G},j=function(u,v,y,R,U){let F=new Se;return _(F,4.2,.8,1.9,U,0,.35,0),_(F,2.4,.7,1.7,"#1e293b",-.2,1.12,0),[-1.3,1.3].forEach(q=>[-.95,.95].forEach(G=>{let xt=x(F,.36,.36,.25,"#111",q,.02,G,10);xt.rotation.x=Math.PI/2,xt.position.y=.36})),F.position.set(v,0,y),F.rotation.y=R,u.add(F),F},K=function(u,v,y=1){let R=new Se;x(R,.18*y,.26*y,2.2*y,"#8b5a2b",0,0,0,7);let U=new Xt(new li(1.6*y,0),f(ct[Math.floor(Math.abs(u*7+v*3))%4],{flatShading:!0}));U.position.y=3.2*y,U.castShadow=!0,R.add(U),R.position.set(u,0,v),P.add(R)},De=function(u,v,y,R,U,F){let q=new Se;q.position.set(y,0,R),q.rotation.y=U,u.add(q);let G=_(q,1.6,.06,.8,"#f5f5f4",0,.74,0);_(q,.06,.74,.7,"#9ca3af",-.74,0,0),_(q,.06,.74,.7,"#9ca3af",.74,0,0),_(q,.9,.5,.05,"#111827",0,.82,-.25);let xt=_(q,.84,.44,.01,f("#38bdf8",{emissive:"#0ea5e9",emissiveIntensity:.5}),0,.85,-.22,{cast:!1});_(q,.4,.04,.15,"#d1d5db",0,.8,.05);let $=new Se;$.position.set(0,0,.85),q.add($),_($,.5,.08,.5,"#334155",0,.42,0),_($,.5,.55,.08,"#334155",0,.5,.24),x($,.04,.04,.42,"#64748b",0,0,0,6);let lt=y+Math.sin(U)*.85,Ut=R+Math.cos(U)*.85,ce={id:jt.length,f:v,x:lt,z:Ut,ry:U+Math.PI,room:F,who:null,scr:xt};return jt.push(ce),G.userData.seat=ce,T.push(G),ce},Zt=function(u,v,y,R,U,F,q="#475569"){let G=new Se;G.position.set(y,0,R),G.rotation.y=U,u.add(G),_(G,.5,.08,.5,q,0,.42,0),_(G,.5,.5,.08,q,0,.5,-.24),[-.2,.2].forEach($=>[-.2,.2].forEach(lt=>_(G,.05,.42,.05,"#334155",$,0,lt)));let xt={id:jt.length,f:v,x:y,z:R,ry:U,room:F,who:null};return jt.push(xt),xt},Jt=function(u,v,y,R,U){let F=new Se;F.position.set(v,0,y),F.rotation.y=R,u.add(F),_(F,2.2,.45,.9,U,0,0,0),_(F,2.2,.55,.25,U,0,.45,-.33),_(F,.25,.3,.9,U,-1,.45,0),_(F,.25,.3,.9,U,1,.45,0)},Ot=function(u,v,y,R=1){x(u,.28*R,.22*R,.5*R,"#f5f5f4",v,0,y,8);let U=new Xt(new li(.55*R,0),f("#22c55e",{flatShading:!0}));U.position.set(v,.95*R,y),U.castShadow=!0,u.add(U)},xe=function(u,v,y){let U=y.s<0?Nt+1.6:2.6,F=y.s<0?-2.6:X-1.6,q=(y.x0+y.x1)/2,G=(U+F)/2,xt=y.x1-y.x0;if(y.t==="desks"){for(let $=y.x0+2.2;$<=y.x1-1.8;$+=2.6)if(!(Math.abs($-q)<1.4))for(let lt=U+.6;lt<=F-1.2;lt+=2.8)De(u,v,$,lt,0,y.k);Ot(u,y.x0+.7,y.s<0?Nt+.7:X-.7),Ot(u,y.x1-.7,y.s<0?Nt+.7:X-.7)}if(y.t==="dir"){let $=De(u,v,q-4,G-1,0,y.k);$.kaio=!0,De(u,v,q+3,G-1,0,y.k),Jt(u,q,G+3.2,Math.PI,"#78350f"),_(u,1.6,.4,.8,"#d6d3d1",q,0,G+1.8),_(u,6,2.2,.4,"#7c5a3a",q,0,Nt+.4),Ot(u,y.x0+.8,Nt+.8,1.3),Ot(u,y.x1-.8,Nt+.8,1.3)}if(y.t==="meet"){let $=Math.min(xt-4,9);_(u,$,.08,2,"#f5f5f4",q,.74,G),_(u,$-.6,.74,.3,"#9ca3af",q,0,G);for(let lt=q-$/2+.7;lt<=q+$/2-.6;lt+=1.2)Zt(u,v,lt,G-1.4,0,y.k),Zt(u,v,lt,G+1.4,Math.PI,y.k);_(u,4,2,.1,f("#0f172a",{emissive:"#1e3a8a",emissiveIntensity:.3}),q,1,y.s<0?Nt+.3:X-.3)}if(y.t==="cafe"){_(u,8,1.05,.9,"#78350f",q,0,Nt+1),_(u,8,.06,1,"#f5f5f4",q,1.05,Nt+1);for(let $=y.x0+3;$<y.x1-1.5;$+=3.2)for(let lt=U+3;lt<F;lt+=3)x(u,.6,.6,.06,"#f5f5f4",$,.74,lt,16),x(u,.06,.06,.74,"#57534e",$,0,lt,6),Zt(u,v,$-.9,lt,Math.PI/2,y.k,"#f59e0b"),Zt(u,v,$+.9,lt,-Math.PI/2,y.k,"#f59e0b")}if(y.t==="lib"){for(let $=y.x0+1;$<y.x1-.8;$+=2.1){_(u,1.9,2.4,.5,"#7c5a3a",$+.95,0,Nt+.4);for(let lt=0;lt<4;lt++)_(u,1.7,.35,.35,["#ef4444","#3b82f6","#eab308","#22c55e"][lt],$+.95,.25+lt*.55,Nt+.5,{cast:!1})}_(u,4,.08,1.6,"#d6b48a",q,.74,G+1);for(let $=-1;$<=1;$++)Zt(u,v,q+$*1.3,G,0,y.k),Zt(u,v,q+$*1.3,G+2,Math.PI,y.k)}if(y.t==="lounge"&&(Jt(u,q-2.5,G,Math.PI/2,"#0ea5e9"),Jt(u,q+2.5,G,-Math.PI/2,"#0ea5e9"),_(u,2,.4,1,"#f5f5f4",q,0,G),Ot(u,y.x0+.8,G,1.2),Ot(u,y.x1-.8,G,1.2),_(u,3,1.7,.1,f("#111827",{emissive:"#334155",emissiveIntensity:.3}),q,.8,y.s<0?Nt+.3:X-.3)),y.t==="bench")for(let $=y.x0+2;$<y.x1-1.5;$+=2.6)De(u,v,$,G-1,0,y.k),De(u,v,$,G+1.6,Math.PI,y.k);if(y.t==="lobby"){let $=new Xt(new Mn(2.6,2.9),new bn({map:N,transparent:!0}));$.position.set(-2.6,1.9,1.62),u.add($),_(u,2.8,3.4,.1,"#ffffff",-2.6,0,1.55),_(u,2.8,3.4,.1,"#ffffff",2.6,0,1.55),_(u,2.4,3.4,.1,E[3],2.6,0,1.6,{cast:!1}).scale.set(2.4,.3,.02),_(u,2.4,1.1,1,E[1],-2.4,0,4.5),_(u,2.8,.08,1.2,"#f5f5f4",-2.4,1.1,4.5),Jt(u,-2.2,9,Math.PI/2,"#0f766e"),Jt(u,2.2,9,-Math.PI/2,"#0f766e"),Ot(u,-3.2,12,1.4),Ot(u,3.2,12,1.4)}if(y.t==="ai"){_(u,xt-2,2.6,.2,f("#0b1220",{emissive:"#0891b2",emissiveIntensity:.55}),q,.2,X-.4);for(let lt=y.x0+2.5;lt<y.x1-2;lt+=3.2)De(u,v,lt,G,Math.PI,y.k);let $=new Xt(new li(.8,1),f("#22d3ee",{emissive:"#22d3ee",emissiveIntensity:1.2,flatShading:!0}));$.position.set(q,2.2,G-1.5),$.userData.spin=!0,u.add($)}if(y.t==="deck"){for(let lt=y.x0+2;lt<y.x1-1;lt+=5)Ot(u,lt,X-.9,1.5);Jt(u,q-4,G,0,"#f5f5f4"),Jt(u,q+3,G,0,"#f5f5f4"),x(u,.06,.06,2.6,"#57534e",q-.5,0,G+1.8,6);let $=new Xt(new ca(1.8,.7,8),f("#f97316",{flatShading:!0}));$.position.set(q-.5,2.8,G+1.8),$.castShadow=!0,u.add($);for(let lt=y.x0+3;lt<y.x1;lt+=6)Zt(u,v,lt,G-2,0,y.k,"#f5f5f4")}},b=function(u){let v=C;v.t+=u;let y=vt.userData.rot,R=v.phase==="pousado"?v.t>v.wait-3?Math.min(1,(v.t-(v.wait-3))/3):Math.max(0,1-v.t/3):1;if(y.rotation.y+=u*28*R,vt.userData.tr.rotation.z+=u*40*R,v.phase==="pousado"&&v.t>v.wait&&(v.phase="subindo",v.t=0),v.phase==="subindo"&&(vt.position.y=v.y0+Math.min(1,v.t/4)**2*22,v.t>4&&(v.phase="voando",v.t=0)),v.phase==="voando"){let F=v.t/16*Math.PI*2,q=60;vt.position.set(v.x+Math.sin(F)*q,v.y0+22,v.z+(1-Math.cos(F))*q*.7);let G=Math.cos(F),xt=.7*Math.sin(F);vt.rotation.set(0,Math.atan2(-xt,G),-.14),v.t>16&&(v.phase="descendo",v.t=0,vt.position.set(v.x,v.y0+22,v.z))}v.phase==="descendo"&&(vt.position.y=v.y0+(1-Math.min(1,v.t/5))**2*22,vt.rotation.z=-.05*(1-Math.min(1,v.t/5)),v.t>5&&(v.phase="pousado",v.t=0,v.wait=45+Math.random()*45,vt.position.y=v.y0,vt.rotation.set(0,vt.rotation.y,0)))},Tt=function({shirt:u="#2563eb",pants:v="#1f2937",skin:y="#e0ac7e",hair:R="#3f2a1d",bot:U=null}={}){let F=new Se,q=new Se;F.add(q);let G=[-.11,.11].map(lt=>{let Ut=new Se;Ut.position.set(lt,.86,0);let ce=new Xt(k,f(v));return ce.position.y=-.43,ce.castShadow=!0,Ut.add(ce),q.add(Ut),Ut}),xt=new Xt(Kt,f(U||u));xt.scale.set(1,1,.72),xt.position.y=1.18,xt.castShadow=!0,q.add(xt);let $=[-.3,.3].map(lt=>{let Ut=new Se;Ut.position.set(lt,1.42,0);let ce=new Xt(me,f(U?"#e5e7eb":u));return ce.position.y=-.3,ce.castShadow=!0,Ut.add(ce),q.add(Ut),Ut});if(U){let lt=new Xt(wt,f(U,{flatShading:!0}));lt.rotation.x=Math.PI/2,lt.rotation.y=Math.PI/6,lt.position.y=1.78,lt.castShadow=!0,q.add(lt),[-.09,.09].forEach(ce=>{let Ae=new Xt(ot,f("#fff"));Ae.position.set(ce,1.8,.17),q.add(Ae);let Ue=new Xt(At,f("#111"));Ue.position.set(ce,1.8,.22),q.add(Ue)});let Ut=new Xt(ot,f(U,{emissive:U,emissiveIntensity:.6}));Ut.position.y=2.07,q.add(Ut),_(q,.02,.12,.02,"#94a3b8",0,1.95,0)}else{let lt=new Xt(Q,f(y));lt.position.y=1.74,lt.castShadow=!0,q.add(lt);let Ut=new Xt(new Fn(.21,12,8,0,Math.PI*2,0,Math.PI/2),f(R));Ut.position.y=1.77,q.add(Ut)}return{g:F,body:q,legs:G,arms:$}},en=function(u){return u.o?.02:ht(u.f)},un=function(u,v,y){return ae[u].find(R=>v>R.x0&&v<R.x1&&y>R.zA&&y<R.zB)||null},cr=function(u,v){return u>Rt-1&&u<Bt+1&&v>Nt-1&&v<X+1},di=function(u,v){for(let y=0;y<=20;y++){let R=y/20;if(cr(u.x+(v.x-u.x)*R,u.z+(v.z-u.z)*R))return!0}return!1},Tn=function(u,v){if(!di(u,v))return[v];let y=[{x:-26,z:-17},{x:26,z:-17},{x:26,z:17},{x:-26,z:17}].map(R=>({...R,f:0,o:!0}));for(let R of y)if(!di(u,R)&&!di(R,v))return[R,v];for(let R=0;R<4;R++){let U=y[R];if(!di(u,U)){for(let F of[y[(R+1)%4],y[(R+3)%4]])if(!di(F,v))return[U,F,v]}}return[v]},lr=function(u,v){let y=[],R=(G,xt,$,lt=!1)=>y.push({f:G,x:xt,z:$,o:lt}),U=u;if(u.o){if(v.o)return Tn(u,v);Tn(u,{f:0,x:0,z:16,o:!0}).forEach(G=>y.push(G)),R(0,0,12),R(0,0,5),R(0,0,0),U={f:0,x:0,z:0}}else{let G=un(u.f,u.x,u.z);G?(R(u.f,G.cx,G.s*2.4),R(u.f,G.cx,0)):R(u.f,u.x,0)}if(v.o)return(U.f!==0||u.f!==0)&&(R(u.f,0,0),R(0,0,0)),R(0,0,5),R(0,0,12),R(0,0,16,!0),Tn({x:0,z:16},v).forEach(G=>y.push(G)),y;let F=u.o?0:u.f;F!==v.f&&(R(F,0,0),R(v.f,0,0));let q=un(v.f,v.x,v.z);return q?(R(v.f,q.cx,0),R(v.f,q.cx,q.s*2.4)):R(v.f,v.x,0),y.push({f:v.f,x:v.x,z:v.z,o:!1}),y},gn=function(u){var R,U,F,q;let v=Tt(u.look||{});P.add(v.g);let y={...u,m:v,f:(R=u.f)!=null?R:0,x:(U=u.x)!=null?U:0,z:(F=u.z)!=null?F:15,o:(q=u.o)!=null?q:!0,path:[],state:"idle",timer:2+Math.random()*4,seat:null,sit:!1,speed:u.speed||1.6,phase:Math.random()*9};return v.g.position.set(y.x,en(y),y.z),Ht.push(y),y},fi=function(u,v,y){u.seat&&(u.seat.who=null,u.seat=null),u.sit=!1,u.path=lr({f:u.f,x:u.x,z:u.z,o:u.o},v),u.then=y,u.state="walk"},nn=function(u,v){fi(u,{f:v.f,x:v.x,z:v.z,o:!!v.o},()=>{u.seat=v,v.who=u,u.sit=!0,u.m.g.rotation.y=v.ry,u.state="sit",u.timer=u.isPlayer?1e9:25+Math.random()*40}),v.who=u},pi=function(u){return jt.find(v=>v.room===u&&!v.who&&!v.kaio&&v.scr)||jt.find(v=>v.room===u&&!v.who&&!v.kaio)||jt.find(v=>v.room===u&&!v.kaio&&v.who&&v.who.staff&&(v.who.seat=null,v.who.state="idle",v.who.timer=0,v.who.home=jt.find(y=>y.scr&&!y.who&&y.room==="foco")||v.who.home,v.who.sit=!1,v.who=null,!0))},Pi=function(){sn.forEach(u=>{var v;P.remove(u.m.g),u.seat&&(u.seat.who=null),Ht.splice(Ht.indexOf(u),1),(v=u.tag)==null||v.remove()}),sn=[];for(let u of i[e].bots){if(u.sala==="tenis"){let U=gn({...u,look:{bot:u.cor},o:!0,f:0,x:pt-9,z:zt,speed:4});U.tennis=!0,W(U,"#a6cf4a"),sn.push(U);continue}let v=pi(u.sala)||pi("foco")||jt.find(U=>!U.who&&U.scr&&!U.kaio);if(!v)continue;let y=ic(u.id),R=gn({...u,look:u.tipo==="pessoa"?{shirt:u.cor,skin:Ee[y%5],pants:["#1f2937","#334155","#1e3a8a"][y%3],hair:["#1c1917","#78350f","#facc15","#a8a29e"][y%4]}:{bot:u.cor},o:!1,f:v.f,x:v.x,z:v.z});R.seat=v,v.who=R,R.sit=!0,R.state="sit",R.timer=8+Math.random()*30,R.m.g.rotation.y=v.ry,R.home=v,sn.push(R)}sn.forEach(u=>{let v=document.createElement("div");v.className="tag "+{ok:"",wa:"warn",la:"late"}[u.st],v.innerHTML="<i></i>",v.append(u.emo+" "+u.nome),v.onclick=y=>{y.stopPropagation(),_s(u)},Wt.appendChild(v),u.tag=v}),dt.material.map=D(i[e].placa,"",{bg:"#ffffff"}),dt.material.needsUpdate=!0,Me.forEach(u=>u.el.textContent=t[e][u.k]),tu(),typeof ur=="function"&&ur()},Xa=function(u){if(!(u.isPlayer||u.tennis||u.npc)){if(u.state==="sit"&&u.timer<=0){let v=[()=>{let y=jt.find(R=>R.room==="cafe"&&!R.who);y&&nn(u,y)},()=>{let y=re[Math.floor(Math.random()*re.length)];fi(u,{f:0,x:y.x+(Math.random()-.5)*2,z:y.z+1.5,o:!0},()=>{u.state="idle",u.timer=10+Math.random()*10})},()=>{let y=Mt.filter(R=>!R.who)[Math.floor(Math.random()*6)];y&&nn(u,y)},()=>{let y=jt.find(R=>(R.room==="reuniao"||R.room==="conselho")&&!R.who);y&&nn(u,y)},()=>{let y=jt.find(R=>R.room==="deck"&&!R.who);y&&nn(u,y)}];v[Math.floor(Math.random()*v.length)](),u.state==="sit"&&(u.timer=10)}else u.state==="idle"&&u.timer<=0?(u.returning=!0,nn(u,u.home.who&&u.home.who!==u&&pi(u.home.room)||u.home)):u.state==="sit"&&u.seat&&u.seat!==u.home&&u.timer<=0;u.state==="sit"&&u.seat!==u.home&&u.timer<=0&&nn(u,u.home)}},W=function(u,v){let y=new Se,R=new Xt(new Zi(.025,.03,.3,6),f("#1f2937"));R.position.y=-.15,y.add(R);let U=new Xt(new ha(.16,.025,6,18),f(v));U.position.y=-.47,y.add(U);let F=new Xt(new Dr(.15,14),new bn({color:"#f8fafc",transparent:!0,opacity:.45,side:Dn}));return F.position.y=-.47,y.add(F),y.position.set(0,-.62,.05),y.rotation.x=.4,u.m.arms[1].add(y),u.racket=y,y},fe=function(u,v,y){if(!y){u.style.display="none";return}if(Yt.copy(v).project(c),Yt.z>1||Math.abs(Yt.x)>1.1||Math.abs(Yt.y)>1.1){u.style.display="none";return}u.style.display="",u.style.transform=`translate(${(Yt.x*.5+.5)*innerWidth}px,${(-Yt.y*.5+.5)*innerHeight}px) translate(-50%,-100%)`},ge=function(u,v,y){if(!y){u.style.display="none";return}if(Yt.copy(v).project(c),Yt.z>1){u.style.display="none";return}u.style.display="",u.style.transform=`translate(${(Yt.x*.5+.5)*innerWidth}px,${(-Yt.y*.5+.5)*innerHeight}px) translate(-50%,-50%)`},Ge=function(u,v,y=1.1){yt.on=!0,yt.t=0,yt.d=y,yt.p0.copy(c.position),yt.p1.copy(u),yt.t0.copy(l.target),yt.t1.copy(v)},se=function(u,v){Te=u,v||(ne=!1),It.forEach((y,R)=>y.visible=u<0||R<=u),ut.visible=u<0,document.querySelectorAll("#floors button").forEach(y=>y.classList.toggle("on",+y.dataset.f===u)),!v&&(u<0?Ge(new L(95,80,142),new L(4,0,16)):innerWidth<innerHeight?Ge(new L(44,ht(u)+50,10),new L(1,ht(u),0)):Ge(new L(8,ht(u)+36,30),new L(0,ht(u),-1)))},vn=function(u){We.set(u.clientX/innerWidth*2-1,-(u.clientY/innerHeight)*2+1),jn.setFromCamera(We,c);let v=[];Ht.forEach(U=>{U.m.g.visible&&U.m.g.traverse(F=>{F.isMesh&&(F.userData.agent=U,v.push(F))})});let y=jn.intersectObjects([...v,...T],!1).find(U=>be(U.object));if(!y)return;let R=y.object.userData;if(R.agent&&!R.agent.npc&&!R.agent.staff&&!R.agent.isPlayer){_s(R.agent);return}if(R.seat){if(Te<0){se(R.seat.f);return}if(R.seat.who&&R.seat.who!==Z){Ve("Mesa ocupada");return}nn(Z,R.seat),Z.then2=()=>Qh(),Be();return}if(R.floor!==void 0){if(Te<0){se(2);return}let U=y.point;fi(Z,{f:R.floor,x:es.clamp(U.x,Rt+.6,Bt-.6),z:es.clamp(U.z,Nt+.6,X-.6),o:!1}),Be();return}if(R.ground){let U=y.point;if(cr(U.x,U.z))return;fi(Z,{f:0,x:U.x,z:U.z,o:!0}),Be()}},Be=function(){Li.style.opacity=0},Rn=function(u){Pe.innerHTML=u,An.classList.add("open")},Ye=function(){An.classList.remove("open"),document.querySelectorAll("#tabs button").forEach(u=>u.classList.toggle("on",u.dataset.t==="campus"))},$a=function(u){return u.tarefas.map((v,y)=>`<div class="task"><span class="d" style="background:${v[3]?"var(--cy)":qa[v[1]]}"></span><div class="n">${he(v[0])}<small>${v[3]?"confirmada":op[v[1]]} \xB7 +${v[2]} XP</small></div><button class="btn" data-b="${u.id}" data-i="${y}" ${v[3]?"disabled":""}>${v[3]?"Feito":"Confirmar"}</button></div>`).join("")},_s=function(u){Sp(u);let v=u.o?"ao ar livre":["t\xE9rreo","1\xBA andar","2\xBA andar"][u.f];Rn(`<h2>${he(u.emo)} ${he(u.nome)}</h2><div class="sub">${he(u.papel)} \xB7 ${he(u.sala==="tenis"?"Quadra de t\xEAnis":t[e][u.sala])} \xB7 ${v}</div>${$a(u)}
  <div class="row"><button class="btn ghost" id="seeB">Ver no campus</button><button class="btn ghost" id="callB">Chamar para reuni\xE3o</button></div>${zn?(u.tarefas.length?"":'<div class="note">Sem tarefas abertas.</div>')+'<div class="row"><button class="btn ghost" id="rmB">Tirar da equipe</button></div>':'<div class="note">Dados de exemplo. No app, o XP s\xF3 entra quando a tarefa \xE9 confirmada com evid\xEAncia.</div>'}`),zn&&(document.getElementById("rmB").onclick=()=>{let y=document.getElementById("rmB");y.dataset.ok?Np(u):(y.dataset.ok=1,y.textContent="Toque de novo para confirmar")}),document.getElementById("seeB").onclick=()=>{Ye(),u.o||se(u.f),setTimeout(()=>Ge(u.m.g.position.clone().add(new L(7,9,11)),u.m.g.position.clone()),u.o?0:1150)},document.getElementById("callB").onclick=()=>{let y=jt.find(R=>R.room==="reuniao"&&!R.who);y&&!u.tennis&&(nn(u,y),u.timer=60,Ve(u.nome+" a caminho")),Ye()}},Qh=function(){var v;let u=i[e].bots.filter(y=>y.tarefas.some(R=>!R[3]&&R[1]!=="ok"));Rn(`<h2>Sua mesa</h2><div class="sub">${he(t[e][(v=Z.seat)==null?void 0:v.room]||"")} \xB7 o que pede a sua aten\xE7\xE3o</div>${u.map(y=>$a(y).replace(/<div class="n">/g,`<div class="n"><small>${he(y.emo+" "+y.nome)}</small>`)).join("")||'<div class="note">Nada pendente. Bom trabalho.</div>'}<div class="row"><button class="btn ghost" id="up">Levantar</button></div>`),document.getElementById("up").onclick=()=>{Ye();let y=un(Z.f,Z.x,Z.z);fi(Z,{f:Z.f,x:y?y.cx:Z.x,z:y?y.s*3.5:0,o:!1})}},tu=function(){let u=i[e].bots.flatMap(v=>v.tarefas.filter(y=>!y[3]));document.getElementById("nOk").textContent=u.filter(v=>v[1]==="ok").length,document.getElementById("nWa").textContent=u.filter(v=>v[1]==="wa").length,document.getElementById("nLa").textContent=u.filter(v=>v[1]==="la").length,document.getElementById("relSub").textContent=i[e].bots.length+" na equipe"},eu=function(u){let v=Math.floor(n/100)+1;n+=u;let y=Math.floor(n/100)+1;co(),Ve(y>v?"N\xEDvel "+y+"!":"+"+u+" XP")},co=function(){let u=Math.floor(n/100)+1;document.getElementById("lv").textContent=u,document.getElementById("xpn").textContent=n,document.getElementById("xpNext").textContent="faltam "+(u*100-n)+" para o n\xEDvel "+(u+1),document.querySelector("#bar i").style.width=n%100+"%"},Ve=function(u){ja.textContent=u,ja.classList.add("show"),clearTimeout(nu),nu=setTimeout(()=>ja.classList.remove("show"),1300)},lp=function(u,v){let y=u.m;if(u.state==="walk"&&u.path.length){let F=u.path[0];if(F.f!==u.f&&!F.o&&!u.o)u.f=F.f,u.x=F.x,u.z=F.z,u.path.shift();else{let q=F.x-u.x,G=F.z-u.z,xt=Math.hypot(q,G),$=u.speed*v;xt<=$?(u.x=F.x,u.z=F.z,u.o=F.o,u.f=F.o?0:F.f,u.path.shift()):(u.x+=q/xt*$,u.z+=G/xt*$,y.g.rotation.y=Math.atan2(q,G))}if(!u.path.length){u.state="idle",u.timer=6+Math.random()*8;let q=u.then;if(u.then=null,q&&q(),u===Z&&Z.then2&&Z.sit){let G=Z.then2;Z.then2=null,G()}}}let R=u.state==="walk"&&u.path.length||u.manual>0;u.phase+=v*(R?u.speed*5:0);let U=R?Math.sin(u.phase)*.65:0;u.sit?(y.legs.forEach(F=>F.rotation.x=-Math.PI/2),y.body.position.y=-.4+(u.seat&&u.seat.h||0),y.arms.forEach((F,q)=>F.rotation.x=-.9+Math.sin(lo*6+q*2)*.08)):(y.legs[0].rotation.x=U,y.legs[1].rotation.x=-U,y.arms[0].rotation.x=-U*.8,y.arms[1].rotation.x=U*.8,y.body.position.y=R?Math.abs(Math.sin(u.phase))*.06:0),u.jump&&(u.jump=Math.max(0,u.jump-v*1.6),y.body.position.y+=Math.sin(u.jump*Math.PI)*.8),y.g.position.set(u.x,en(u),u.z),y.g.visible=dn(u),u.timer-=v},hp=function(u){if(Vt.x+=Vt.vx*u,Vt.z+=Vt.vz*u,Vt.vx*=Math.pow(.45,u),Vt.vz*=Math.pow(.45,u),(Vt.z<st+.3||Vt.z>et-.3)&&(Vt.vz*=-1,Vt.z=es.clamp(Vt.z,st+.3,et-.3)),Vt.x<V+.3||Vt.x>it-.3)if(Math.abs(Vt.z)<2.5){let v=Vt.x>47?0:1;w[v]++,Vt.last==="kaio"&&Ve("Gola\xE7o!"),Vt.x=47,Vt.z=0,Vt.vx=Vt.vz=0,Pt[0].el.textContent="Quadra society \xB7 "+w[0]+" x "+w[1]}else Vt.vx*=-1,Vt.x=es.clamp(Vt.x,V+.3,it-.3);Ii.position.set(Vt.x,.22,Vt.z),Ii.rotation.x+=Vt.vz*u*3,Ii.rotation.z-=Vt.vx*u*3,[0,1].forEach(v=>{let y=z.filter(F=>F.team===v),R=y[0],U=1e9;y.forEach(F=>{let q=Math.hypot(F.x-Vt.x,F.z-Vt.z);q<U&&(U=q,R=F)}),y.forEach(F=>{let q=F===R?Vt.x-(v?-.4:.4):F.home.x+(Vt.x-47)*.4,G=F===R?Vt.z:F.home.z+Vt.z*.3,xt=q-F.x,$=G-F.z;if(Math.hypot(xt,$)>.25?(F.state="walk",F.path=[{f:0,x:q,z:G,o:!0}],F.speed=F===R?4.2:2.4):(F.state="idle",F.path=[],iu(F,Vt.x-F.x,Vt.z-F.z)),F===R&&U<.7&&Math.hypot(Vt.vx,Vt.vz)<4){let Ut=v?V:it,ce=Math.random()<.15?Ut:y[Math.floor(Math.random()*5)].x,Ae=Math.random()<.35?(Math.random()-.5)*4:y[Math.floor(Math.random()*5)].z,Ue=ce-Vt.x,ze=Ae-Vt.z,mi=Math.hypot(Ue,ze)||1,vs=8+Math.random()*6;Vt.vx=Ue/mi*vs,Vt.vz=ze/mi*vs,Vt.last=v}})})},iu=function(u,v,y){u.m.g.rotation.y=Math.atan2(v,y)},dp=function(u){let v=up(),y=at?null:v||B,R=pt-10.5;if(v||at){let $={x:pt-13.5,z:zt+(v&&!at?-7:7)};(at?v?[B,v]:[B]:[B]).forEach((Ut,ce)=>{let Ae=$.x,Ue=$.z+ce*1.2;Math.hypot(Ut.x-Ae,Ut.z-Ue)>.3?(Ut.state="walk",Ut.path=[{f:0,x:Ae,z:Ue,o:!0}]):(Ut.state="idle",Ut.path=[],Ut.m.g.rotation.y=Math.PI/2)})}if(Z.racket||W(Z,"#f2d84b"),Z.racket.visible=at,B.racket.visible=!!(!v||at),mt.t+=u/(at?1.7:1.4),mt.t>=1){if(at&&mt.dir<0){let $=Math.hypot(Z.x-R,Z.z-mt.z1)<2.2||Math.abs(Z.z-mt.z1)<1.6&&Z.x<pt-2;$?Z.m.arms[1].rotation.x=-2:(bt[1]++,Ve("Ponto do advers\xE1rio")),$||(mt.z1=zt)}at&&mt.dir>0&&Math.random()<.18&&(bt[0]++,Ve("Ponto seu!")),Pt[1].el.textContent=at?"T\xEAnis \xB7 Voc\xEA "+bt[0]+" x "+bt[1]:"Quadra de t\xEAnis",mt.t=0,mt.dir*=-1,mt.z0=mt.z1,mt.z1=zt+(Math.random()-.5)*(at?7:8)}let U=pt-10.5,F=pt+10.5,q=mt.dir>0?U+(F-U)*mt.t:F-(F-U)*mt.t,G=mt.z0+(mt.z1-mt.z0)*mt.t;Dt.position.set(q,.3+Math.sin(mt.t*Math.PI)*2.4,G);let xt=($,lt,Ut)=>{if(!$)return;let ce=mt.dir===Ut?mt.z1:$.z,Ae=ce-$.z;Math.abs(Ae)>.2?($.state="walk",$.path=[{f:0,x:lt,z:ce,o:!0}]):($.state="idle",$.path=[]),iu($,-Ut*-1*Ut,0),$.m.g.rotation.y=Ut>0?Math.PI/2:-Math.PI/2,$.m.arms[1].rotation.x=mt.t>.85&&mt.dir===Ut?-2:-.4};xt(y,U,-1),xt(Y,F,1)},fp=function(u){u.state!=="walk"&&u.timer<=0&&(u.state="walk",u.path=[{f:0,x:rt+(Math.random()-.5)*36,z:ft+(Math.random()-.5)*44,o:!0}],u.timer=4+Math.random()*6)},su=function(){let u=innerWidth,v=innerHeight;o.setSize(u,v,!1),c.aspect=u/v,c.fov=u<v?55:42,c.updateProjectionMatrix()},pp=function(u,v,y,R,U,F,q,G){let xt=(y-u)*(G-F)-(R-v)*(q-U);if(Math.abs(xt)<1e-9)return!1;let $=((U-u)*(G-F)-(F-v)*(q-U))/xt,lt=((U-u)*(R-v)-(F-v)*(y-u))/xt;return $>=0&&$<=1&&lt>=0&&lt<=1},ou=function(u,v,y,R,U){let F=R-v,q=U-y,G=Math.hypot(F,q)||1,xt=R+F/G*.35,$=U+q/G*.35;return ru[u].some(lt=>pp(v,y,xt,$,lt[0],lt[1],lt[2],lt[3]))},cu=function(u){let v=Di.getBoundingClientRect(),y=v.left+v.width/2,R=v.top+v.height/2,U=u.clientX-y,F=u.clientY-R,q=Math.hypot(U,F),G=v.width/2-8;q>G&&(U*=G/q,F*=G/q),Yn.x=U/G,Yn.y=F/G,au.style.transform=`translate(${U}px,${F}px)`},hr=function(){ne=!0;let u=Z.m.g.position;!Z.o&&Te!==Z.f&&se(Z.f,!0),Z.o&&Te<0;let v=innerWidth<innerHeight;Ge(u.clone().add(new L(v?9:12,v?15:11,v?13:16)),u.clone().add(new L(0,1,0)),.8),Ya.copy(u),document.getElementById("fol").classList.add("on")},gp=function(u){let v=Yn.x,y=Yn.y;(Bn.w||Bn.arrowup)&&(y=-1),(Bn.s||Bn.arrowdown)&&(y=1),(Bn.a||Bn.arrowleft)&&(v=-1),(Bn.d||Bn.arrowright)&&(v=1);let R=Math.min(1,Math.hypot(v,y));if(Z.manual=0,R>.12){ne||hr(),(Z.sit||Z.state==="walk")&&(Z.seat&&(Z.seat.who=null,Z.seat=null),Z.sit=!1,Z.path=[],Z.state="idle",Z.then=null,Z.then2=null);let U=l.target.x-c.position.x,F=l.target.z-c.position.z,q=Math.hypot(U,F)||1,G={x:U/q,z:F/q},xt={x:-G.z,z:G.x},$=G.x*-y+xt.x*v,lt=G.z*-y+xt.z*v,Ut=Math.hypot($,lt)||1,ce=4.6*R*u,Ae=Z.x+$/Ut*ce,Ue=Z.z+lt/Ut*ce,ze=Z.o?0:Z.f,mi=Z.o?ze===0:!0,vs=(ys,rc)=>(Z.o||Z.f===0?!ou(0,Z.x,Z.z,ys,rc):!ou(ze,Z.x,Z.z,ys,rc))?(Z.x=ys,Z.z=rc,!0):!1;if(vs(Ae,Ue)||vs(Ae,Z.z)||vs(Z.x,Ue),Z.o||Z.f===0){let ys=!mp(Z.x,Z.z);ys!==Z.o&&(Z.o=ys,Z.f=0)}at&&(!Z.o||Z.x>pt+1||Z.x<pt-17||Math.abs(Z.z-zt)>10)&&(at=!1,Pt[1].el.textContent="Quadra de t\xEAnis"),Z.m.g.rotation.y=Math.atan2($,lt),Z.manual=R,Z.state="idle",Z.timer=99}if(ne){let U=Z.m.g.position,F=U.clone().sub(Ya);yt.on?(yt.p1.add(F),yt.t1.add(F)):(c.position.add(F),l.target.add(F)),Ya.copy(U),!Z.o&&Te!==Z.f&&se(Z.f,!0)}},vp=function(u,v){return u.o&&v.o||!u.o&&!v.o&&u.f===v.f},uu=function(){let u=null,v=Z;if(v.m.g.visible)if(v.sit)u=v.seat&&v.seat.room==="ia"?{t:"Usar o Jarvis",fn:du}:v.seat&&v.seat.room==="arquibancada"?{t:"Levantar",fn:Qa}:{t:"Levantar",fn:Qa};else{let y=[...sn,...Zn].find(R=>vp(R,v)&&Ka(R,v.x,v.z,2.4));if(y)u={t:(y.pessoa?"Falar com ":"Conversar com ")+y.nome,fn:()=>{yp(y),y.pessoa?ec(y):_s(y,!0)}};else if(v.o&&Math.hypot(Vt.x-v.x,Vt.z-v.z)<1.8)u={t:"Chutar a bola",fn:xp};else if(at)u={t:"Parar de jogar",fn:()=>{at=!1,Pt[1].el.textContent="Quadra de t\xEAnis"}};else if(v.o&&v.x>pt-15&&v.x<pt&&Math.abs(v.z-zt)<8)u={t:"Jogar t\xEAnis",fn:()=>{at=!0,bt[0]=bt[1]=0,Z.x=pt-10.5,Z.z=zt,hr(),Ve("Ande at\xE9 a bolinha para rebater")}};else if(!v.o&&Ka(v,0,-.6,2))u={t:"Elevador",fn:Mp};else{let R=jt.filter(U=>!U.who&&(U.o?v.o:!v.o&&U.f===v.f)&&Ka(U,v.x,v.z,1.6)).sort((U,F)=>Math.hypot(U.x-v.x,U.z-v.z)-Math.hypot(F.x-v.x,F.z-v.z))[0];R&&(u={t:R.room==="ia"?"Sentar no Jarvis":R.room==="arquibancada"?"Sentar e assistir":"Sentar",fn:()=>{nn(Z,R),Z.then2=R.room==="ia"?du:R.room==="arquibancada"?bp:Qh}})}}Ja=u,Za.style.display=u?"":"none",u&&(Za.textContent=u.t)},Qa=function(){Ye();let u=Z.seat;u&&(u.who=null,Z.seat=null),Z.sit=!1,Z.state="idle",u&&(Z.x+=Math.sin(u.ry)*.9,Z.z+=Math.cos(u.ry)*.9)},yp=function(u){u.sit||(u.m.g.rotation.y=Math.atan2(Z.x-u.x,Z.z-u.z)),Z.m.g.rotation.y=Math.atan2(u.x-Z.x,u.z-Z.z),u.state==="idle"&&(u.timer=Math.max(u.timer,8))},xp=function(){let u=Z.m.g.rotation.y;Vt.vx=Math.sin(u)*15,Vt.vz=Math.cos(u)*15,Vt.last="kaio",Z.m.arms[0].rotation.x=-1.2},bp=function(){ne=!1,document.getElementById("fol").classList.remove("on"),Ge(new L(47,9,et+13),new L(47,0,0),1.2),Ve("Bom jogo!")},Mp=function(){Rn(`<h2>Elevador</h2><div class="sub">Para qual andar?</div><div class="row">${["T\xE9rreo","1\xBA andar","2\xBA andar"].map((u,v)=>`<button class="btn ${v===Z.f?"ghost":""}" data-el="${v}">${u}</button>`).join("")}</div>`),Pe.querySelectorAll("[data-el]").forEach(u=>u.onclick=()=>{let v=+u.dataset.el;Ye(),Z.f=v,Z.o=!1,Z.x=0,Z.z=.4,se(v,!0),hr()})},Sp=function(u){!u||u.pessoa||ho.has(u.sala)||(ho.add(u.sala),!hu&&ho.size>=5&&(hu=!0,setTimeout(()=>eu(50),600)))},du=function(){let u=i[e].bots,v=u.flatMap(y=>y.tarefas.map((R,U)=>({b:y,t:R,i:U})).filter(R=>!R.t[3]&&R.t[1]==="la"));Rn(`<h2>Central Jarvis</h2><div class="sub">Vis\xE3o geral de ${he(i[e].nome)} agora</div>`+u.map(y=>{let R=y.tarefas.filter(F=>!F[3]),U=F=>R.filter(q=>q[1]===F).length;return`<div class="task"><span class="d" style="background:${qa[y.st]}"></span><div class="n">${he(y.emo+" "+y.nome)}<small>${U("la")} atrasadas \xB7 ${U("wa")} chegando \xB7 ${U("ok")} no prazo</small></div></div>`}).join("")+`<div class="row"><button class="btn" id="cobrar" ${v.length?"":"disabled"}>Cobrar atrasados (${v.length})</button><button class="btn ghost" id="up">Levantar</button></div><div class="note">Exemplo. No app real o Jarvis manda a cobran\xE7a pelo canal de cada bot.</div>`),document.getElementById("up").onclick=Qa,document.getElementById("cobrar").onclick=()=>{let y=[...new Set(v.map(R=>R.b.nome))].join(", ");Ve("Cobran\xE7a enviada"),Pe.querySelector(".note").textContent="Jarvis cobrou: "+y+"."}},ur=function(){Zn.forEach(u=>{P.remove(u.m.g),u.seat&&(u.seat.who=null),Ht.splice(Ht.indexOf(u),1),u.tag.remove()}),Zn=[],uo().forEach((u,v)=>{let y=pi(u.sala)||pi("foco");if(!y)return;let R=gn({pessoa:!0,staff:!0,nome:u.nome,papel:u.papel,sala:u.sala,o:!1,f:y.f,x:y.x,z:y.z,speed:1.5,look:{shirt:E[v%6],skin:Ee[v%5],pants:"#1f2937",hair:["#1c1917","#78350f","#facc15"][v%3]}});R.seat=y,y.who=R,R.sit=!0,R.state="sit",R.timer=30+Math.random()*60,R.m.g.rotation.y=y.ry,R.home=y,R.pid=u.id;let U=document.createElement("div");U.className="tag pes",U.innerHTML="<i></i>",U.append(u.nome),U.onclick=F=>{F.stopPropagation(),ec(R)},Wt.appendChild(U),R.tag=U,Zn.push(R)})},Ap=function(){Pe.insertAdjacentHTML("beforeend",'<div class="row"><button class="btn" id="addP">Adicionar pessoa</button></div>'),document.getElementById("addP").onclick=Rp,Zn.forEach(u=>{}),Zn.length&&Pe.insertAdjacentHTML("beforeend",'<div class="sub" style="margin-top:14px">Pessoas</div>'+Zn.map(u=>`<div class="bot" data-pid="${he(u.pid)}"><div class="av" style="background:#ffffff14">\u{1F464}</div><div class="n" style="flex:1"><b>${he(u.nome)}</b><small style="display:block;color:var(--mut)">${he(u.papel||"")} \xB7 ${he(t[e][u.sala]||"")}</small></div></div>`).join("")),Pe.querySelectorAll("[data-pid]").forEach(u=>u.onclick=()=>ec(Zn.find(v=>v.pid===u.dataset.pid)))},Rp=function(){Rn(`<h2>Adicionar pessoa</h2><div class="sub">Ela ganha uma mesa no campus</div>
  <form id="fp" class="form"><label>Nome<input id="pn" required maxlength="30" autocomplete="off"></label><label>Fun\xE7\xE3o<input id="pr" maxlength="40" placeholder="ex.: Secret\xE1ria" autocomplete="off"></label>
  <label>Sala<select id="ps">${Tp().map(u=>`<option value="${u}">${he(t[e][u])}</option>`).join("")}</select></label><div class="row"><button class="btn" type="submit">Adicionar</button></div></form>
  <div class="note">Por enquanto fica s\xF3 neste aparelho. Para a pessoa entrar de verdade, o pr\xF3ximo passo \xE9 o convite por e-mail ligado ao banco.</div>`),document.getElementById("fp").onsubmit=u=>{u.preventDefault();let v=document.getElementById("pn").value.trim();if(!v)return;let y=uo();y.push({id:Date.now().toString(36),nome:v,papel:document.getElementById("pr").value.trim(),sala:document.getElementById("ps").value}),tc(y),ur(),Ye(),Ve(v+" entrou na equipe")}},ec=function(u){u&&(Rn(`<h2>\u{1F464} ${he(u.nome)}</h2><div class="sub">${he(u.papel||"Equipe")} \xB7 ${he(t[e][u.sala]||"")}</div><div class="say">\u201COi! Ainda n\xE3o tenho tarefas aqui no Jarvis.\u201D</div><div class="row"><button class="btn ghost" id="rmP">Remover da equipe</button></div>`),document.getElementById("rmP").onclick=()=>{tc(uo().filter(v=>v.id!==u.pid)),ur(),Ye()})},fo=function(u,v){if(dr.innerHTML="",dr.append(u),v){let y=document.createElement("button");y.textContent=v.t,y.onclick=v.fn,dr.append(y)}dr.style.display=""},sc=function(u,v){return Promise.race([u,new Promise((y,R)=>setTimeout(()=>R(new Error("tempo esgotado")),v))])},_u=function(){let u=document.getElementById("offices");u.innerHTML="";for(let[v,y]of Object.entries(i)){let R=document.createElement("button");if(R.className=v===e?"on":"",y.kind==="escola"||v==="escola"){let U=document.createElement("img");U.src="logo.png",U.alt="",U.style.cssText="height:18px;vertical-align:-4px;margin-right:6px",R.append(U)}R.append(y.nome),R.onclick=()=>{v!==e&&(e=v,_u(),Ye(),Pi())},u.append(R)}},Dp=function(){Rn('<h2>Entrar no Jarvis</h2><div class="sub">Mandamos um c\xF3digo para o seu e-mail</div><form id="lf" class="form"><label>E-mail<input id="le" type="email" required autocomplete="email" inputmode="email"></label><div class="row"><button class="btn" type="submit">Enviar c\xF3digo</button></div></form><div class="note" id="lmsg"></div>'),document.getElementById("lf").onsubmit=async u=>{u.preventDefault();let v=document.getElementById("le").value.trim(),y=document.getElementById("lmsg");y.textContent="Enviando\u2026";let R=await rn.auth.signInWithOtp({email:v,options:{shouldCreateUser:!1}});if(R.error){y.textContent="N\xE3o deu: "+R.error.message;return}Pe.innerHTML=`<h2>Digite o c\xF3digo</h2><div class="sub">Enviado para ${he(v)}</div><form id="cf" class="form"><label>C\xF3digo<input id="cc" inputmode="numeric" autocomplete="one-time-code" required maxlength="10"></label><div class="row"><button class="btn" type="submit">Entrar</button></div></form><div class="note" id="cmsg"></div>`,document.getElementById("cf").onsubmit=async U=>{U.preventDefault();let F=document.getElementById("cmsg");F.textContent="Conferindo\u2026";let q=await rn.auth.verifyOtp({email:v,token:document.getElementById("cc").value.replace(/\s/g,""),type:"email"});if(q.error){F.textContent="C\xF3digo n\xE3o confere: "+q.error.message;return}gu=q.data.session,Ye(),Ve("Bem-vindo, Kaio"),fr()}}},Op=function(){let u=[...new Set(jt.filter(y=>y.scr&&!y.kaio).map(y=>y.room)),"diretoria"];Rn(`<h2>Adicionar \xE0 equipe</h2><div class="sub">${he(i[e].nome)}</div>
  <form id="fa" class="form"><label>Tipo<select id="at"><option value="bot">Agente de IA</option><option value="pessoa">Pessoa</option></select></label>
  <label>Nome<input id="an" required maxlength="40" autocomplete="off" placeholder="ex.: Criadora de conte\xFAdo"></label>
  <label>Fun\xE7\xE3o<input id="ap" maxlength="80" autocomplete="off" placeholder="ex.: posts e v\xEDdeos da rematr\xEDcula"></label>
  <label>Sala<select id="as">${u.map(y=>`<option value="${y}" ${y==="marketing"?"selected":""}>${he(t[e][y]||y)}</option>`).join("")}</select></label>
  <label id="amw">Especialidade (biblioteca de agentes)<select id="am"><option value="">Nenhuma</option>${nc.map(y=>`<option value="${he(y.slug)}">${he((y.emoji||"")+" "+y.nome)}</option>`).join("")}</select></label>
  <div class="row"><button class="btn" type="submit">Adicionar</button></div></form><div class="note" id="amsg">${zn?"Fica salvo no banco e aparece em todos os seus aparelhos.":"Modo demonstra\xE7\xE3o: fica s\xF3 neste aparelho."}</div>`);let v=document.getElementById("at");v.onchange=()=>document.getElementById("amw").style.display=v.value==="bot"?"":"none",document.getElementById("fa").onsubmit=async y=>{y.preventDefault();let R=document.getElementById("an").value.trim();if(!R)return;let U=v.value,F=document.getElementById("ap").value.trim(),q=document.getElementById("as").value,G=document.getElementById("am").value||null;if(!zn){let $=uo();$.push({id:Date.now().toString(36),nome:R,papel:F,sala:q}),tc($),ur(),Ye(),Ve(R+" entrou na equipe");return}document.getElementById("amsg").textContent="Salvando\u2026";let xt=await rn.rpc("campus_criar_agente",{p_escritorio:e,p_nome:R,p_sala:q,p_papel:F||null,p_tipo:U,p_emoji:null,p_modelo:U==="bot"?G:null,p_cor:E[ic(R)%6]});if(xt.error){document.getElementById("amsg").textContent="N\xE3o salvou: "+xt.error.message;return}Ye(),Ve(R+" entrou na equipe"),await fr()}},vu=function(){let u=Math.min(cp.getDelta(),.05);if(lo+=u,yt.on){yt.t+=u/yt.d;let y=yt.t>=1?1:1-Math.pow(1-yt.t,3);c.position.lerpVectors(yt.p0,yt.p1,y),l.target.lerpVectors(yt.t0,yt.t1,y),yt.t>=1&&(yt.on=!1)}gp(u),l.update(),hp(u),dp(u);for(let y of Ht)y.wander&&fp(y),Xa(y),lp(y,u);b(u),vt.visible=ut.visible||C.phase!=="pousado",nt.forEach(y=>{y.g.position.x+=y.d*y.v*u,y.g.position.x>120&&(y.g.position.x=-120),y.g.position.x<-120&&(y.g.position.x=120)}),Ct.forEach((y,R)=>y.rotation.x=Math.sin(lo*2+R)*.5),P.traverse,It[2].children.forEach(y=>{y.userData.spin&&(y.rotation.y+=u,y.position.y=2.2+Math.sin(lo*2)*.15)}),jt.forEach(y=>{y.scr&&(y.scr.material=y.who?Fp:kp)});let v=c.position.distanceTo(l.target);sn.forEach(y=>fe(y.tag,y.m.g.position.clone().setY(y.m.g.position.y+(y.sit?2.1:2.5)),y.m.g.visible)),fe(Z.tag,Z.m.g.position.clone().setY(Z.m.g.position.y+(Z.sit?2.1:2.5)),Z.m.g.visible),Me.forEach(y=>ge(y.el,y.pos,Te===y.f&&v<70)),Pt.forEach(y=>ge(y.el,y.pos,Te<0||v>60||ne)),++_p%6===0&&uu(),Zn.forEach(y=>fe(y.tag,y.m.g.position.clone().setY(y.m.g.position.y+(y.sit?2.1:2.5)),y.m.g.visible)),o.render(a,c),requestAnimationFrame(vu)},i={escola:{nome:"Escola Prosperi",placa:"ESCOLA PROSPERI",kind:"escola",bots:[{id:"zeus",nome:"Zeus",emo:"\u26A1",cor:"#facc15",sala:"diretoria",st:"ok",papel:"Dire\xE7\xE3o geral",tarefas:[["Aprovar or\xE7amento de material 2027","ok",30],["Revisar contratos de fornecedores","wa",20]]},{id:"jarvis",nome:"Jarvis",emo:"\u{1F916}",cor:"#22d3ee",sala:"ia",st:"ok",papel:"Central de IA \xB7 resumo das 5h40",tarefas:[["Resumo falado das 5h40","ok",10],["Cobrar quem est\xE1 atrasado","ok",10]]},{id:"plutus",nome:"Plutus",emo:"\u{1F4B0}",cor:"#22c55e",sala:"financeiro",st:"la",papel:"Financeiro",tarefas:[["Conferir boletos vencidos","la",30],["Fechar caixa da semana","wa",20],["Lan\xE7ar notas no TecSof","ok",10]]},{id:"hermes",nome:"Hermes",emo:"\u{1F4E3}",cor:"#f97316",sala:"marketing",st:"wa",papel:"Marketing e comercial",tarefas:[["Post de rematr\xEDcula no Instagram","wa",20],["Fechar sistema da Rabbit (sexta)","ok",20]]},{id:"remat",nome:"Rematr\xEDculas",emo:"\u{1F392}",cor:"#ef4444",sala:"secretaria",st:"la",papel:"Secretaria",tarefas:[["Ligar para 5 fam\xEDlias pendentes","la",30],["Separar contratos assinados","ok",10]]},{id:"demeter",nome:"Dem\xE9ter & Atena",emo:"\u{1F3DB}\uFE0F",cor:"#a78bfa",sala:"coord",st:"ok",papel:"Coordena\xE7\xE3o pedag\xF3gica",tarefas:[["Revisar planejamento do 6\xBA ano","ok",20],["Curadoria liter\xE1ria 2027","wa",20]]},{id:"manut",nome:"Manuten\xE7\xE3o",emo:"\u{1F527}",cor:"#94a3b8",sala:"operacoes",st:"wa",papel:"Manuten\xE7\xE3o e servi\xE7os gerais",tarefas:[["Trocar l\xE2mpadas do corredor","wa",10],["Or\xE7amento da fachada","ok",20]]}]},pessoal:{nome:"Pessoal",placa:"KAIO \xB7 PESSOAL",kind:"pessoal",bots:[{id:"jarvis",nome:"Jarvis",emo:"\u{1F916}",cor:"#22d3ee",sala:"ia",st:"ok",papel:"Central de IA",tarefas:[["Resumo falado das 5h40","ok",10]]},{id:"apolo",nome:"Apolo & Cronos",emo:"\u{1F9ED}",cor:"#60a5fa",sala:"coord",st:"wa",papel:"Agenda e rotina",tarefas:[["Planejar a semana","wa",20],["Revisar h\xE1bitos do m\xEAs","ok",10]]},{id:"jordan",nome:"Jordan Belfort",emo:"\u{1F4C8}",cor:"#22c55e",sala:"financeiro",st:"ok",papel:"Investimentos",tarefas:[["Revisar carteira","ok",20]]},{id:"jubileu",nome:"Jubileu",emo:"\u231A",cor:"#eab308",sala:"marketing",st:"wa",papel:"Rel\xF3gios",tarefas:[["Avaliar rel\xF3gio anunciado","wa",20]]},{id:"dumont",nome:"Santos Dumont",emo:"\u2708\uFE0F",cor:"#38bdf8",sala:"operacoes",st:"la",papel:"Avia\xE7\xE3o \xB7 aulas de PP",tarefas:[["Revisar mat\xE9ria da \xFAltima aula","la",20]]},{id:"federer",nome:"Federer",emo:"\u{1F3BE}",cor:"#a3e635",sala:"tenis",st:"ok",papel:"T\xEAnis e esporte",tarefas:[["Treino de t\xEAnis 18h","ok",20]]}]}},t={escola:{bib:"Biblioteca",coord:"Coordena\xE7\xE3o pedag\xF3gica",cafe:"Refeit\xF3rio & caf\xE9",secretaria:"Secretaria",lobby:"Recep\xE7\xE3o",prof:"Sala dos professores",financeiro:"Financeiro",reuniao:"Sala de reuni\xE3o",lounge:"Lounge",marketing:"Marketing & comercial",foco:"Ilha de foco",operacoes:"Manuten\xE7\xE3o & opera\xE7\xF5es",diretoria:"Diretoria",conselho:"Sala do conselho",ia:"Jarvis \xB7 Central de IA",deck:"Terra\xE7o"},pessoal:{bib:"Biblioteca",coord:"Agenda & rotina",cafe:"Cozinha & caf\xE9",secretaria:"Casa & documentos",lobby:"Entrada",prof:"Est\xFAdio",financeiro:"Investimentos",reuniao:"Sala de reuni\xE3o",lounge:"Lounge",marketing:"Rel\xF3gios",foco:"Ilha de foco",operacoes:"Avia\xE7\xE3o",diretoria:"Seu escrit\xF3rio",conselho:"Sala de projetos",ia:"Jarvis \xB7 Central de IA",deck:"Terra\xE7o"}},e="escola",n=220,s=document.getElementById("c"),r=/iPhone|iPad|Android/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&innerWidth<900,o=new ea({canvas:s,antialias:!0,powerPreference:"default"});o.setPixelRatio(Math.min(devicePixelRatio,2)),s.addEventListener("webglcontextlost",u=>{u.preventDefault();let v=document.createElement("div");v.id="load",v.innerHTML='<div style="padding:24px;text-align:center">O 3D foi pausado pelo aparelho (mem\xF3ria).<br><button onclick="location.reload()" style="margin-top:12px;padding:10px 18px;border-radius:12px;border:0;font-weight:700">Recarregar</button></div>',document.body.appendChild(v)}),o.shadowMap.enabled=!0,o.shadowMap.type=hh,o.toneMapping=uh,o.toneMappingExposure=1.05;let a=new ia;a.background=new oe("#a9dcf7"),a.fog=new na("#a9dcf7",180,420);let c=new je(42,1,.5,900);c.position.set(95,80,142);let l=new Wa(c,s);l.target.set(4,0,16),l.enableDamping=!0,l.dampingFactor=.08,l.maxPolarAngle=1.35,l.minDistance=7,l.maxDistance=260,l.screenSpacePanning=!1,a.add(new da("#dff3ff","#6b8f4e",1.1));let h=new ma("#fff4e0",2.4);h.position.set(60,110,45),h.castShadow=!0,h.shadow.mapSize.set(r?1024:2048,r?1024:2048),Object.assign(h.shadow.camera,{left:-110,right:110,top:110,bottom:-110,near:10,far:320}),h.shadow.bias=-4e-4,h.shadow.normalBias=.04,a.add(h);let d={},f=(u,v={})=>{let y=u+JSON.stringify(v);return d[y]||(d[y]=new Ti({color:u,roughness:.85,...v}))},p=new Yi(1,1,1),T=[],E=["#7b5aa6","#3a8fd6","#a6cf4a","#ef8b3b","#e3423b","#f2d84b"],M=new Image,N=new Ke(M);N.colorSpace=$e;let I=[];M.onload=()=>{N.needsUpdate=!0,I.forEach(u=>u())},M.src="logo.png";let P=new Se;a.add(P);let A=g(P,520,520,"#7fc35d",0,0,0);A.userData.ground=!0,T.push(A),g(P,240,14,"#3b3f46",0,.02,70);for(let u=-115;u<120;u+=9)g(P,4,.35,"#f5f5f4",u,.04,70);g(P,240,3,"#d6d3d1",0,.03,61.5),g(P,240,3,"#d6d3d1",0,.03,78.5);let S=-2,O=44;g(P,52,24,"#4b5058",S,.025,O);for(let u=0;u<10;u++)g(P,.2,7,"#f5f5f4",S-22.5+u*5,.04,O-6.5),g(P,.2,7,"#f5f5f4",S-22.5+u*5,.04,O+6.5);g(P,8,8,"#4b5058",S,.026,O+16);let J=["#e3423b","#f8fafc","#1e293b","#3a8fd6","#a3a3a3","#f2d84b","#7b5aa6","#a6cf4a"];for(let u=0;u<9;u++)u%3!==1&&j(P,S-20+u*5,O-6.5,Math.PI/2,J[u%8]),u%4!==2&&j(P,S-20+u*5,O+6.5,-Math.PI/2,J[(u+3)%8]);let nt=[0,1,2,3].map(u=>({g:j(P,-100+u*60,u%2?73:67,u%2?0:Math.PI,J[(u+1)%8]),d:u%2?1:-1,v:9+u*2}));[["#7b5aa6",-30],["#3a8fd6",-15],["#a6cf4a",0],["#ef8b3b",15],["#e3423b",30]].forEach(([u,v])=>{g(P,10,6,"#6aa84f",v,.03,-30);for(let y=0;y<6;y++){let R=new Xt(new li(.45,0),f(u,{flatShading:!0}));R.position.set(v-3.5+y*1.4,.4,-30+(y%2?1.2:-1.2)),P.add(R)}});let ct=["#4ade80","#22c55e","#65a30d","#86efac"];for(let u=-110;u<115;u+=11)K(u,-48,1),Math.abs(u+2)>8&&K(u,59,1),K(u+5,82,1.1);for(let u=-46;u<60;u+=10)K(-96,u,1.2),K(96,u,1.2);g(P,30,12,"#e7e5e4",0,.03,20),g(P,4,6,"#e7e5e4",0,.03,29),g(P,70,3.4,"#e7e5e4",-48,.03,20),g(P,64,3.4,"#e7e5e4",42,.03,20),g(P,3.4,60,"#e7e5e4",-30,.03,-8);let dt=new Xt(new Mn(16,2.5),new bn({map:D("ESCOLA PROSPERI","",{bg:"#ffffff"}),toneMapped:!1}));_(P,17,3.1,.6,"#ffffff",0,0,27.5);for(let u=0;u<5;u++)_(P,17/5,.35,.62,E[u],-6.8+u*3.4,0,27.5);dt.position.set(0,1.75,27.85),P.add(dt);for(let u=-12;u<=12;u+=6)if(u){x(P,.6,.7,.7,"#a8a29e",u,0,15.8);let v=new Xt(new li(.75,0),f(E[(u/6+2+5)%5|0],{flatShading:!0}));v.position.set(u,1.2,15.8),P.add(v)}let tt=4.2,gt=44,Et=26,Rt=-22,Bt=22,Nt=-13,X=13,ht=u=>u*tt+.3,It=[0,1,2].map(()=>{let u=new Se;return P.add(u),u}),ut=new Se;P.add(ut);let Ft=new Ti({color:"#bfe6ff",transparent:!0,opacity:.22,roughness:.05,metalness:.2,depthWrite:!1}),qt=new Ti({color:"#e0f2fe",transparent:!0,opacity:.28,roughness:.05,depthWrite:!1}),ee="#e5e7eb",jt=[],ae=[[],[],[]],Me=[],H=[[{k:"bib",x0:-22,x1:-12,s:-1,t:"lib",c:"#d6b48a"},{k:"coord",x0:-12,x1:-3,s:-1,t:"desks",c:"#c7d2fe"},{k:"cafe",x0:3,x1:22,s:-1,t:"cafe",c:"#e8c9a0"},{k:"secretaria",x0:-22,x1:-4,s:1,t:"desks",c:"#fde2c4"},{k:"lobby",x0:-4,x1:4,s:1,t:"lobby",c:"#ececec",open:!0},{k:"prof",x0:4,x1:22,s:1,t:"lounge",c:"#d9f99d"}],[{k:"financeiro",x0:-22,x1:-3,s:-1,t:"desks",c:"#bbf7d0"},{k:"reuniao",x0:3,x1:13,s:-1,t:"meet",c:"#ddd6fe"},{k:"lounge",x0:13,x1:22,s:-1,t:"lounge",c:"#fecdd3"},{k:"marketing",x0:-22,x1:-6,s:1,t:"desks",c:"#fed7aa"},{k:"foco",x0:-6,x1:6,s:1,t:"bench",c:"#e0f2fe"},{k:"operacoes",x0:6,x1:22,s:1,t:"desks",c:"#e5e7eb"}],[{k:"diretoria",x0:-22,x1:-3,s:-1,t:"dir",c:"#d6b48a"},{k:"conselho",x0:3,x1:22,s:-1,t:"meet",c:"#c7d2fe"},{k:"ia",x0:-22,x1:-6,s:1,t:"ai",c:"#0f2a33"},{k:"deck",x0:-6,x1:22,s:1,t:"deck",c:"#b07b4f",open:!0}]];for(let u=0;u<3;u++){let v=It[u],y=ht(u);v.position.y=y;let R=_(v,gt+.6,.3,Et+.6,["#f2d84b","#3a8fd6","#a6cf4a"][u],0,-.3,0);R.userData.floor=u,T.push(R),g(v,gt,3,"#e5e7eb",0,.012,0),_(v,6,2.8,.3,"#cbd5e1",0,0,-1.65),_(v,.3,2.8,11.4,"#cbd5e1",-3,0,-7.3),_(v,.3,2.8,11.4,"#cbd5e1",3,0,-7.3),_(v,6,2.8,.3,"#cbd5e1",0,0,Nt+.15),g(v,5.6,11,"#94a3b8",0,.02,-7.3),_(v,1.6,2.4,.05,"#64748b",0,0,-1.47,{cast:!1});for(let G=0;G<8;G++)_(v,2.4,.25*(G+1),.9,"#e2e8f0",-1.4,0,-11.5+G*.9);for(let G of H[u]){let xt=G.s<0?Nt:1.5,$=G.s<0?-1.5:X,lt=(G.x0+G.x1)/2;g(v,G.x1-G.x0-.1,$-xt-.1,G.c,lt,.015,(xt+$)/2),ae[u].push({...G,zA:xt,zB:$,cx:lt});let Ut=G.s<0?-1.5:1.5,ce=(G.x1-G.x0-1.8)/2;if(!G.open){let Ae=E[(Math.round(lt)+u*3+20)%5];_(v,.16,2.75,.22,Ae,lt-.95,0,Ut),_(v,.16,2.75,.22,Ae,lt+.95,0,Ut),_(v,2.06,.22,.22,Ae,lt,2.6,Ut),g(v,1.7,1.4,Ae,lt,.02,Ut+(G.s<0?-.75:.75)).material=f(Ae,{transparent:!0,opacity:.45})}G.open||(_(v,ce,2.6,.08,qt,G.x0+ce/2,0,Ut,{cast:!1}),_(v,ce,2.6,.08,qt,G.x1-ce/2,0,Ut,{cast:!1}),_(v,G.x1-G.x0,.08,.12,ee,lt,2.6,Ut)),G.x0>Rt+.1&&!(u===0&&G.k==="lobby")&&_(v,.08,2.6,$-xt,qt,G.x0,0,(xt+$)/2,{cast:!1}),xe(v,u,G),Me.push({k:G.k,f:u,pos:new L(lt,y+3,(xt+$)/2)})}let U=tt-.3,F=(G,xt,$,lt)=>{let Ut=new Xt(p,Ft);Ut.scale.set(G,U,.06),Ut.position.set(xt,U/2,$),Ut.rotation.y=lt,v.add(Ut)};u===0?(F(18,-13,X,0),F(18,13,X,0)):u===2?F(16,-14,X,0):F(gt,0,X,0),F(gt,0,Nt,0),F(Et,Rt,0,Math.PI/2),F(Et,Bt,0,Math.PI/2);let q=u;for(let G=Rt;G<=Bt;G+=2.2){let xt=E[q++%5];!(u===0&&Math.abs(G)<4)&&!(u===2&&G>-6)&&_(v,.22,U,.3,xt,G,0,X+.1),_(v,.22,U,.3,xt,G,0,Nt-.1)}for(let G=Nt;G<=X;G+=2.2){let xt=E[q++%5];_(v,.3,U,.22,xt,Rt-.1,0,G),_(v,.3,U,.22,xt,Bt+.1,0,G)}u===2&&(_(v,28,1.1,.08,Ft,8,0,X,{cast:!1}),_(v,28,.08,.12,ee,8,1.1,X))}{let u=ht(3);ut.position.y=u,_(ut,gt+.6,.3,Et+.6,"#e2e8f0",0,-.3,0);for(let R=0;R<5;R++){let U=(gt+.6)/5,F=Rt-.3+U*(R+.5);_(ut,U,.9,.3,E[R],F,0,Nt-.15),_(ut,U,.9,.3,E[4-R],F,0,X+.15)}_(ut,.3,.9,Et,E[1],Rt-.15,0,0),_(ut,.3,.9,Et,E[3],Bt+.15,0,0);for(let R=-19;R<-3;R+=2.4)for(let U=-10;U<=-3;U+=2.6){let F=_(ut,2,.08,1.4,f("#1e3a8a",{metalness:.4,roughness:.3}),R,.6,U);F.rotation.x=-.3}g(ut,22,10,"#b07b4f",9,.02,5);for(let R=0;R<20;R+=4)K(0,0,0);for(let R=1;R<19;R+=4.5){let U=new Se;x(U,.12,.16,1.2,"#8b5a2b",0,0,0,6);let F=new Xt(new li(1,0),f("#22c55e",{flatShading:!0}));F.position.y=1.8,F.castShadow=!0,U.add(F),U.position.set(R,0,8),ut.add(U)}x(ut,3.6,3.6,.06,"#334155",15,0,-6,24),g(ut,.8,3.4,"#facc15",15,.08,-6),g(ut,2.4,.8,"#facc15",15,.08,-6),_(ut,6,3,4,"#64748b",0,0,-7);let v=new Xt(new Mn(22,3.4),new bn({map:D("PROSPERI",null),transparent:!0})),y=new Xt(new Mn(8,9),new bn({map:N,transparent:!0,depthWrite:!1}));y.rotation.x=-Math.PI/2,y.position.set(-12,.06,6),ut.add(y),v.position.set(-8,2.4,X+.35),ut.add(v),ut.userData.logo=v,_(ut,22.5,2.6,.2,"#ffffff",-8,.7,X+.15)}{let u=It[0];[-4.1,4.1].forEach((y,R)=>_(u,.5,3.8,.5,E[R?4:1],y,0,X+.3)),_(u,8.7,.6,.5,E[0],0,3.6,X+.3);let v=new Xt(new Mn(6,.5),new bn({map:D("ENTRADA",null),transparent:!0}));v.position.set(0,3.9,X+.57),u.add(v),g(P,8,4,E[5],0,.035,X+3)}let vt=new Se;{let u=new Xt(new Fn(1.1,14,10),f("#e3423b"));u.scale.set(1.6,1,1),u.castShadow=!0,vt.add(u);let v=new Xt(new Fn(.75,12,8),f("#bfe6ff",{roughness:.1,metalness:.3}));v.position.set(1.05,.15,0),v.scale.set(1,.8,.95),vt.add(v),_(vt,3.4,.28,.28,"#e3423b",-2.6,.1,0),_(vt,.18,1,.7,"#f2d84b",-4.2,.1,0),[-.7,.7].forEach(U=>_(vt,2.6,.1,.1,"#334155",0,-1.15,U)),[-.6,.6].forEach(U=>[-.7,.7].forEach(F=>_(vt,.08,.5,.08,"#334155",U,-1.1,F)));let y=new Se;y.position.y=1.25,vt.add(y),_(y,7,.06,.3,"#1f2937",0,0,0),_(y,.3,.06,7,"#1f2937",0,0,0),x(vt,.08,.08,.35,"#1f2937",0,.95,0,6),vt.userData.rot=y;let R=new Se;R.position.set(-4.2,.3,.38),vt.add(R),_(R,.06,1.4,.12,"#1f2937",0,-.7,0),vt.userData.tr=R,[1,-1].forEach(U=>{let F=new Xt(new Mn(1.15,1.3),new bn({map:N,transparent:!0,depthWrite:!1}));F.position.set(-.15,.05,U*1.13),F.rotation.y=U>0?0:Math.PI,vt.add(F)})}vt.rotation.order="YXZ";let C={x:15,z:-6,y0:ht(3)+1.25,t:0,phase:"pousado",wait:30};vt.position.set(C.x,C.y0,C.z),P.add(vt),_(P,gt+2,.3,Et+2,"#cbd5e1",0,0,0);let V=32,it=62,st=-11,et=11;g(P,it-V+4,et-st+4,"#15803d",(V+it)/2,.03,0);for(let u=0;u<6;u++)g(P,(it-V)/6,et-st,u%2?"#16a34a":"#22a34d",V+(u+.5)*(it-V)/6,.035,0);let Lt=(u,v,y,R)=>g(P,u,v,"#f8fafc",y,.04,R);Lt(it-V,.15,47,st),Lt(it-V,.15,47,et),Lt(.15,et-st,V,0),Lt(.15,et-st,it,0),Lt(.15,et-st,47,0);{let u=new Xt(new la(2.9,3.05,40),f("#f8fafc"));u.rotation.x=-Math.PI/2,u.position.set(47,.045,0),P.add(u)}[V,it].forEach((u,v)=>{let y=v?1:-1;_(P,.12,2,.12,"#f8fafc",u+y*.8,0,-2.5),_(P,.12,2,.12,"#f8fafc",u+y*.8,0,2.5),_(P,.12,.12,5.1,"#f8fafc",u+y*.8,2,0),Lt(.15,9,u-y*4,0)});for(let u=V-2;u<=it+2;u+=3)_(P,.08,4,.08,"#334155",u,0,st-2),_(P,.08,4,.08,"#334155",u,0,et+2);_(P,it-V+4,4,.03,new Ti({color:"#334155",transparent:!0,opacity:.18}),47,0,st-2,{cast:!1}),_(P,it-V+4,4,.03,new Ti({color:"#334155",transparent:!0,opacity:.18}),47,0,et+2,{cast:!1});let Mt=[];for(let u=0;u<2;u++){let v=et+3.6+u*1.4,y=u*.5;_(P,18,y+.05,1.2,"#cbd5e1",47,0,v+.2);let R=_(P,18,.12,.5,E[u+1],47,y+.33,v);for(let U=39;U<=55;U+=1.6){let F={id:jt.length,f:0,o:!0,x:U,z:v+.05,ry:Math.PI,room:"arquibancada",who:null,h:y};jt.push(F),Mt.push(F)}R.userData.seat=Mt[Mt.length-3],T.push(R)}let pt=46,zt=34;g(P,30,16,"#2563eb",pt,.03,zt),g(P,23.8,11,"#1d4ed8",pt,.035,zt),[[23.8,.1,0,-5.5],[23.8,.1,0,5.5],[23.8,.1,0,-4.1],[23.8,.1,0,4.1],[.1,11,-11.9,0],[.1,11,11.9,0],[.1,8.2,-6.4,0],[.1,8.2,6.4,0],[12.8,.1,0,0]].forEach(([u,v,y,R])=>g(P,u,v,"#f8fafc",pt+y,.04,zt+R)),_(P,.08,1,11.8,f("#f8fafc",{transparent:!0,opacity:.6}),pt,0,zt,{cast:!1});let rt=-58,ft=-6;g(P,52,62,"#86d16a",rt,.02,ft);let kt=new Xt(new Dr(7,28),f("#38bdf8",{roughness:.15,metalness:.1}));kt.rotation.x=-Math.PI/2,kt.position.set(rt-8,.05,ft-14),P.add(kt),g(P,18,14,"#fde68a",rt+10,.04,ft+16),_(P,.1,2.4,.1,"#f8fafc",rt+6,0,ft+16),_(P,.1,2.4,.1,"#f8fafc",rt+14,0,ft+16),_(P,8,.05,.02,"#f8fafc",rt+10,2.2,ft+16),_(P,3,2.4,3,"#f43f5e",rt+8,0,ft-2);let Gt=_(P,1,.1,4,"#facc15",rt+8,1.2,ft+1.6);Gt.rotation.x=.55,_(P,.15,2.6,.15,"#0ea5e9",rt-4,0,ft-1),_(P,.15,2.6,.15,"#0ea5e9",rt+1,0,ft-1),_(P,5.2,.15,.15,"#0ea5e9",rt-1.5,2.6,ft-1);let Ct=[];[-3,0].forEach(u=>{let v=new Se;v.position.set(rt+u+.5,2.6,ft-1),_(v,.02,1.9,.02,"#94a3b8",-.25,-1.9,0),_(v,.02,1.9,.02,"#94a3b8",.25,-1.9,0),_(v,.6,.06,.3,"#f43f5e",0,-1.95,0),P.add(v),Ct.push(v)});for(let u=0;u<26;u++){let v=u*2.4,y=14+u*37%10;K(rt+Math.cos(v)*y*1.3,ft+Math.sin(v)*y*1.5,.9+u%3*.2)}let re=[];[[rt-14,ft+4],[rt+2,ft-14],[rt-2,ft+12],[rt+14,ft-6]].forEach(([u,v],y)=>{_(P,2,.45,.6,"#92400e",u,0,v),re.push({x:u,z:v+.6,ry:Math.PI})}),g(P,3,40,"#e7e5e4",rt+4,.035,ft),g(P,30,3,"#e7e5e4",rt,.035,ft+6);let Kt=new $s(.22,.38,4,8),me=new $s(.07,.45,3,6),k=new $s(.09,.62,3,6),wt=new Zi(.26,.26,.36,6),Q=new Fn(.2,12,10),ot=new Fn(.055,8,6),At=new Fn(.028,6,5),Ht=[],Z=null,Ee=["#f1c27d","#e0ac69","#c68642","#8d5524","#ffdbac"],de=["#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#f8fafc"],sn=[],gs={};H.forEach((u,v)=>u.forEach(y=>gs[y.k]=v));let Ii=new Xt(new Fn(.22,10,8),f("#f8fafc"));Ii.castShadow=!0,P.add(Ii);let Vt={x:47,z:0,vx:0,vz:0,last:null},w=[0,0],z=[];for(let u=0;u<10;u++){let v=u<5?0:1,y=v?50+u%5%3*4:44-u%5%3*4,R=-7+u%5*3.5,U=gn({npc:!0,o:!0,f:0,x:y,z:R,speed:3.4,look:{shirt:v?"#f8fafc":"#eab308",pants:v?"#1d4ed8":"#111827",skin:Ee[u%5],hair:"#1c1917"}});U.home={x:y,z:R},U.team=v,z.push(U)}let Y=gn({npc:!0,o:!0,f:0,x:pt+9,z:zt,speed:4,look:{shirt:"#f8fafc",pants:"#f8fafc",skin:Ee[1]}}),B=gn({npc:!0,o:!0,f:0,x:pt-9,z:zt,speed:4,look:{shirt:"#ef8b3b",pants:"#1f2937",skin:Ee[3],hair:"#1c1917"}}),at=!1,bt=[0,0];W(Y,"#e3423b"),W(B,"#3a8fd6");let Dt=new Xt(new Fn(.09,8,6),f("#d9f99d",{emissive:"#a3e635",emissiveIntensity:.4}));P.add(Dt);let mt={t:0,dir:1,z0:zt,z1:zt},$t=[];for(let u=0;u<7;u++){let v=gn({npc:!0,o:!0,f:0,x:rt+(Math.random()-.5)*30,z:ft+(Math.random()-.5)*36,speed:1.1+Math.random()*.6,look:{shirt:de[u%7],skin:Ee[u%5],pants:u%2?"#1e3a8a":"#374151",hair:["#1c1917","#78350f","#facc15"][u%3]}});u>3&&v.m.g.scale.setScalar(.7),$t.push(v),v.wander=!0}{let u=jt.filter(y=>y.scr&&!y.kaio&&!["ia","diretoria"].includes(y.room)),v=0;u.forEach((y,R)=>{if(R%3!==0||v>=22)return;v++;let U=gn({staff:!0,o:!1,f:y.f,x:y.x,z:y.z,speed:1.4,look:{shirt:de[R%7],skin:Ee[R%5],pants:["#1f2937","#334155","#1e3a8a"][R%3],hair:["#1c1917","#78350f","#facc15","#a8a29e"][R%4]}});U.seat=y,y.who=U,U.sit=!0,U.state="sit",U.timer=20+Math.random()*90,U.m.g.rotation.y=y.ry,U.home=y})}Z=gn({isPlayer:!0,nome:"Voc\xEA",o:!1,f:2,x:-14,z:-6,speed:2.6,look:{shirt:"#0f172a",pants:"#334155",skin:"#e0ac7e",hair:"#1c1917"}});{let u=jt.find(v=>v.kaio);Z.x=u.x,Z.z=u.z,Z.seat=u,u.who=Z,Z.sit=!0,Z.state="sit",Z.timer=1e9,Z.m.g.rotation.y=u.ry}let Wt=document.getElementById("labels");Me.forEach(u=>{let v=document.createElement("div");v.className="room",Wt.appendChild(v),u.el=v});let Pt=[["Quadra society",47,3,st-4],["Quadra de t\xEAnis",pt,3,zt-9],["Parque",rt,4,ft-24],["Beach play",rt+10,2,ft+16],["Estacionamento",S,2,O],["Entrada",0,3,18]].map(([u,v,y,R])=>{let U=document.createElement("div");return U.className="room out",U.textContent=u,Wt.appendChild(U),{el:U,pos:new L(v,y,R)}});Z.tag=document.createElement("div"),Z.tag.className="tag me",Z.tag.innerHTML="<i></i>Voc\xEA",Wt.appendChild(Z.tag);let Yt=new L,Te=-1,ne=!1,yt={on:!1,t:0,p0:new L,p1:new L,t0:new L,t1:new L},dn=u=>u.o?!0:Te===u.f,jn=new _a,We=new _t,_n=null;s.addEventListener("pointerdown",u=>{_n={x:u.clientX,y:u.clientY,t:performance.now()}}),s.addEventListener("pointerup",u=>{if(!_n)return;Math.hypot(u.clientX-_n.x,u.clientY-_n.y)<8&&performance.now()-_n.t<450&&vn(u),_n=null});let be=u=>{for(;u;){if(!u.visible)return!1;u=u.parent}return!0},Li=document.getElementById("hint"),An=document.getElementById("sheet"),Pe=document.getElementById("sc"),he=u=>String(u).replace(/[&<>"']/g,v=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[v]),qa={ok:"var(--ok)",wa:"var(--wa)",la:"var(--la)"},op={ok:"no prazo",wa:"chegando",la:"atrasada"};document.getElementById("sx").onclick=Ye,Pe.addEventListener("click",u=>{let v=u.target.closest("[data-b]");if(!v)return;let y=i[e].bots.find(U=>U.id===v.dataset.b),R=y.tarefas[+v.dataset.i];R[3]||Up(y,R,v).then(U=>{if(!U)return;v.disabled=!0,v.textContent="Feito",v.closest(".task").querySelector(".d").style.background="var(--cy)";let F=sn.find(q=>q.id===y.id);if(F){F.jump=1;let q=y.tarefas.filter(G=>!G[3]);y.st=q.some(G=>G[1]==="la")?"la":q.some(G=>G[1]==="wa")?"wa":"ok",F.st=y.st,F.tag.className="tag "+{ok:"",wa:"warn",la:"late"}[y.st]}tu()})});let ja=document.getElementById("toast"),nu,ap=()=>{let u=i[e].bots.flatMap(U=>U.tarefas),v=u.filter(U=>U[3]).length,y=u.filter(U=>U[1]==="la"),R=y.filter(U=>U[3]).length;return[["Confirmar 3 tarefas hoje",Math.min(v,3),3,50],["Zerar as atrasadas",R,y.length||1,80],["Ronda: conversar com 5 setores",Math.min(ho.size,5),5,50],["Sentar na arquibancada",Z.seat&&Z.seat.room==="arquibancada"?1:0,1,0]]};document.querySelectorAll("#tabs button").forEach(u=>u.onclick=()=>{document.querySelectorAll("#tabs button").forEach(y=>y.classList.toggle("on",y===u));let v=u.dataset.t;v==="campus"&&(Ye(),se(-1)),v==="tarefas"&&Rn(`<h2>Tarefas</h2><div class="sub">${he(i[e].nome)} \xB7 toque em Confirmar quando estiver feito</div>`+i[e].bots.map(y=>$a(y).replace(/<div class="n">/g,`<div class="n"><small>${he(y.emo+" "+y.nome)}</small>`)).join("")+(zn?"":'<div class="note">Dados de exemplo.</div>')),v==="missoes"&&Rn('<h2>Miss\xF5es do dia</h2><div class="sub">Recompensa s\xF3 com trabalho confirmado</div>'+ap().map(y=>`<div class="task"><div class="n">${he(y[0])}<small>${y[1]}/${y[2]} \xB7 +${y[3]} XP</small><div class="prog"><i style="width:${Math.round(y[1]/y[2]*100)}%"></i></div></div></div>`).join("")),v==="bots"&&(Rn(`<h2>Equipe</h2><div class="sub">${he(i[e].nome)}</div>`+sn.map(y=>`<div class="bot" data-id="${y.id}"><div class="av" style="background:${y.cor}33">${he(y.emo)}</div><div class="n" style="flex:1"><b>${he(y.nome)}</b><small style="display:block;color:var(--mut)">${he(y.papel)}</small></div><span class="d" style="width:10px;height:10px;border-radius:50%;background:${qa[y.st]}"></span></div>`).join("")),Pe.querySelectorAll(".bot").forEach(y=>y.onclick=()=>_s(sn.find(R=>R.id===y.dataset.id))),zn?(Pe.insertAdjacentHTML("beforeend",'<div class="row"><button class="btn" id="addA">Adicionar \xE0 equipe</button></div>'),document.getElementById("addA").onclick=Op):Ap())}),document.querySelectorAll("#floors button").forEach(u=>u.onclick=()=>se(+u.dataset.f)),document.querySelectorAll("#offices button[data-o]").forEach(u=>u.onclick=()=>{u.dataset.o!==e&&(e=u.dataset.o,document.querySelectorAll("#offices button").forEach(v=>v.classList.toggle("on",v===u)),Ye(),Pi())});let cp=new ga,lo=0,up=()=>sn.find(u=>u.tennis);addEventListener("resize",su),su(),(()=>{let u=new Date().getHours();return u>=18||u<6})()&&(a.background.set("#0b1630"),a.fog.color.set("#0b1630"),h.intensity=.5,h.color.set("#9db4ff"),a.children.find(u=>u.isHemisphereLight).intensity=.45,It.forEach((u,v)=>{let y=new pa("#ffe7b0",40,40);y.position.set(0,3.4,0),u.add(y)}),Ft.color.set("#ffd58a"),Ft.opacity=.3,Ft.emissive=new oe("#ffb347"),Ft.emissiveIntensity=.35);let ru=[[],[],[]];for(let u=0;u<3;u++){let v=ru[u];for(let y of ae[u]){let R=y.s<0?-1.5:1.5;y.open||v.push([y.x0,R,y.cx-.9,R],[y.cx+.9,R,y.x1,R]),y.x0>Rt+.1&&!(u===0&&y.k==="lobby")&&v.push([y.x0,y.zA,y.x0,y.zB])}v.push([Rt,Nt,Bt,Nt],[Rt,Nt,Rt,X],[Bt,Nt,Bt,X]),u===0?v.push([Rt,X,-4,X],[4,X,Bt,X],[-4,1.55,-1.2,1.55],[1.2,1.55,4,1.55]):v.push([Rt,X,Bt,X]),v.push([-3,Nt,-3,-1.5],[3,Nt,3,-1.5],[-3,-1.5,3,-1.5])}let mp=(u,v)=>u>Rt&&u<Bt&&v>Nt&&v<X,Yn={x:0,y:0,on:!1},Di=document.getElementById("joy"),au=Di.querySelector("i");Di.addEventListener("pointerdown",u=>{Yn.on=!0,Di.setPointerCapture(u.pointerId),cu(u),Be(),ne||hr()}),Di.addEventListener("pointermove",u=>{Yn.on&&cu(u)});let lu=()=>{Yn.on=!1,Yn.x=Yn.y=0,au.style.transform=""};Di.addEventListener("pointerup",lu),Di.addEventListener("pointercancel",lu);let Bn={};addEventListener("keydown",u=>{Bn[u.key.toLowerCase()]=!0}),addEventListener("keyup",u=>{Bn[u.key.toLowerCase()]=!1});let Ya=new L;document.getElementById("fol").onclick=()=>{ne?(ne=!1,document.getElementById("fol").classList.remove("on")):hr()};let Za=document.getElementById("act"),Ja=null,_p=0,ho=new Set,hu=!1,Ka=(u,v,y,R)=>Math.hypot(u.x-v,u.z-y)<R;Za.onclick=()=>{Ja&&Ja.fn(),uu()};let wp={la:["T\xF4 atrasado nisso, me d\xE1 uma for\xE7a?","Isso aqui venceu, preciso da sua decis\xE3o."],wa:["T\xE1 chegando o prazo, j\xE1 t\xF4 em cima.","Faltam poucos dias, vou fechar."],ok:["Tudo em dia por aqui!","Sem pend\xEAncia, chefe."]},Ep=_s;_s=function(u,v){if(Ep(u),v){let y=wp[u.st];Pe.querySelector(".sub").insertAdjacentHTML("afterend",`<div class="say">\u201C${he(y[Math.floor(Math.random()*y.length)])}\u201D</div>`)}};let Zn=[],fu=()=>"jarvis.campus.pessoas."+e,uo=()=>{try{return JSON.parse(localStorage.getItem(fu())||"[]")}catch{return[]}},tc=u=>{try{localStorage.setItem(fu(),JSON.stringify(u))}catch{}},Tp=()=>[...new Set(jt.filter(u=>u.scr&&!u.kaio).map(u=>u.room))],pu="https://qydpjcudcnirhybwlnhs.supabase.co",mu="sb_publishable_41C_vG_CaaYvwiNhyGb88A_yQgSwqC1",rn=null,zn=!1,gu=null,nc=[];try{rn=np(pu,mu,{auth:{persistSession:!0,storageKey:"jarvis.sb",autoRefreshToken:!0}})}catch{rn=null}let dr=document.getElementById("mode"),Cp={atrasado:"la",chegando:"wa",no_prazo:"ok"},Pp={gestao:"coord",comercial:"marketing",dinheiro:"financeiro",manutencao:"operacoes",central:"ia",pessoal:"coord","smash-point":"tenis"},ic=u=>{let v=0;for(let y of String(u))v=v*31+y.charCodeAt(0)|0;return Math.abs(v)};async function Ip(){let[u,v,y,R,U]=await Promise.all([rn.from("escritorios").select("id,nome,emoji,cor,tipo,ordem").order("ordem"),rn.from("bots").select("id,nome,emoji,sala,tipo,cor,missao,modelo_slug,escritorio_id,area_id").eq("ativo",!0),rn.from("itens_situacao").select("id,bot_id,titulo,prazo,xp,situacao,status,escritorio_id").eq("ativo",!0).in("situacao",["atrasado","chegando","no_prazo"]),rn.from("xp_eventos").select("pontos"),rn.from("agente_modelos").select("slug,nome,emoji,divisao").order("nome")]);for(let F of[u,v,y,R])if(F.error)throw F.error;nc=U.data||[];for(let F of Object.keys(i))delete i[F];for(let F of u.data){let q=/pessoal/i.test(F.nome)||F.tipo==="pessoal"?"pessoal":"escola";t[F.id]=t[q];let G={},xt=[];for(let $ of v.data.filter(lt=>lt.escritorio_id===F.id)){let lt=$.sala||Pp[$.area_id]||"foco",Ut=$.nome+"|"+lt,ce=y.data.filter(ze=>ze.bot_id===$.id&&!["fechado","respondido"].includes(ze.status)).map(ze=>[ze.titulo||"Sem t\xEDtulo",Cp[ze.situacao]||"ok",ze.xp||10,!1,ze.id,ze.prazo]);if(G[Ut]){G[Ut].tarefas.push(...ce),G[Ut].ids.push($.id);continue}let Ae=nc.find(ze=>ze.slug===$.modelo_slug),Ue={id:$.id,ids:[$.id],nome:$.nome,emo:$.emoji||($.tipo==="pessoa"?"\u{1F464}":"\u{1F916}"),cor:$.cor||E[ic($.id)%6],sala:lt,tipo:$.tipo||"bot",papel:$.missao||(Ae?Ae.nome:$.tipo==="pessoa"?"Equipe":"Agente"),tarefas:ce,criado:$.id.startsWith("app-")};G[Ut]=Ue,xt.push(Ue)}xt.forEach($=>{$.tarefas.sort((lt,Ut)=>({la:0,wa:1,ok:2})[lt[1]]-{la:0,wa:1,ok:2}[Ut[1]]),$.st=$.tarefas.some(lt=>lt[1]==="la")?"la":$.tarefas.some(lt=>lt[1]==="wa")?"wa":"ok"}),i[F.id]={nome:F.nome,placa:(q==="escola"?"ESCOLA ":"")+F.nome.toUpperCase().replace(/^ESCOLA ESCOLA /,"ESCOLA "),kind:q,bots:xt}}n=(R.data||[]).reduce((F,q)=>F+(q.pontos||0),0),i[e]||(e=Object.keys(i).find(F=>i[F].kind==="escola")||Object.keys(i)[0])}async function fr(){try{await sc(Ip(),9e3),zn=!0,_u(),Pi(),co(),dr.style.display="none"}catch{zn=!1,fo("N\xE3o consegui ler o banco agora. Mostrando exemplo.",{t:"Tentar de novo",fn:fr})}}async function Lp(){if(!rn){fo("Modo demonstra\xE7\xE3o");return}let u=null;try{u=(await sc(rn.auth.getSession(),4e3)).data.session}catch{u=null}if(u)return gu=u,fr();try{let v=await sc(fetch(pu+"/auth/v1/health",{headers:{apikey:mu}}),4e3);if(!v.ok&&v.status!==401)throw 0;fo("Modo demonstra\xE7\xE3o",{t:"Entrar",fn:Dp})}catch{fo("Modo demonstra\xE7\xE3o \xB7 os dados reais abrem no app do Jarvis")}}async function Up(u,v,y){var G;if(!zn||!v[4])return v[3]=!0,eu(v[2]),!0;y.disabled=!0,y.textContent="Salvando\u2026";let R=await rn.rpc("campus_confirmar_item",{p_item:v[4],p_obs:"confirmado no campus"});if(R.error)return y.disabled=!1,y.textContent="Confirmar",Ve("N\xE3o salvou"),!1;v[3]=!0;let U=Math.floor(n/100)+1,F=Math.max(0,(R.data.xp_total||n)-n);n=(G=R.data.xp_total)!=null?G:n,co();let q=Math.floor(n/100)+1;return Ve(q>U?"N\xEDvel "+q+"!":F?"+"+F+" XP":"Confirmado"),!0}async function Np(u){if(!zn)return;if((await rn.from("bots").update({ativo:!1}).in("id",u.ids||[u.id])).error){Ve("N\xE3o removeu");return}Ye(),Ve(u.nome+" saiu da equipe"),fr()}Pi(),co(),setTimeout(Be,7e3),Lp();let Fp=f("#38bdf8",{emissive:"#0ea5e9",emissiveIntensity:.9}),kp=f("#1f2937");vu();let yu=document.getElementById("load");yu.style.opacity=0,setTimeout(()=>yu.remove(),700)}})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
