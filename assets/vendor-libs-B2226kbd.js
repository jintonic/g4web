import{I as ae,i as $,a3 as Z,V as F,bg as ue,bh as dr,e as j,bi as We,aH as mr,y as pr,be as gr,bj as qr,aF as ti,bk as it,bl as ee,ak as k,bm as Lt,bn as G,bo as ii,bp as Gr,bq as _i,br as $r,bs as V,bt as ri,bu as vr,bv as Yr,bw as xr,bx as Ct,u as Ie,J as jr,X as Ge,d as Xr,c as yr,U as Qr,F as Ai,aT as Bt,by as nt,bz as rt,f as br,bA as le,bB as ne,$ as re,al as pe,an as ge,bC as Kr,Q as Zr,bD as Jr,bE as es,o as at,bF as ts,bG as Tr,aM as wr,N as is,bH as rs,bI as ss,m as ns,bJ as as}from"./vendor-three-cPJTOjbb.js";const Sr=0,os=1,_r=2,Ii=2,Ut=1.25,Ri=1,L=32,H=L/4,gi=65535,cs=gi<<16,Mt=Math.pow(2,-24),vi=Symbol("SKIP_GENERATION"),Ar={strategy:Sr,maxDepth:40,maxLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[vi]:!1};function z(s,e,t){return t.min.x=e[s],t.min.y=e[s+1],t.min.z=e[s+2],t.max.x=e[s+3],t.max.y=e[s+4],t.max.z=e[s+5],t}function Mi(s){let e=-1,t=-1/0;for(let i=0;i<3;i++){const n=s[i+3]-s[i];n>t&&(t=n,e=i)}return e}function Pi(s,e){e.set(s)}function Ci(s,e,t){let i,n;for(let a=0;a<3;a++){const r=a+3;i=s[a],n=e[a],t[a]=i<n?i:n,i=s[r],n=e[r],t[r]=i>n?i:n}}function ot(s,e,t){for(let i=0;i<3;i++){const n=e[s+2*i],a=e[s+2*i+1],r=n-a,c=n+a;r<t[i]&&(t[i]=r),c>t[i+3]&&(t[i+3]=c)}}function je(s){const e=s[3]-s[0],t=s[4]-s[1],i=s[5]-s[2];return 2*(e*t+t*i+i*e)}function N(s,e){return e[s+15]===gi}function q(s,e){return e[s+6]}function Y(s,e){return e[s+14]}function U(s){return s+H}function W(s,e){const t=e[s+6];return s+t*H}function Et(s,e){return e[s+7]}function Wt(s,e,t,i,n){let a=1/0,r=1/0,c=1/0,l=-1/0,h=-1/0,f=-1/0,u=1/0,o=1/0,m=1/0,g=-1/0,y=-1/0,d=-1/0;const b=s.offset||0;for(let p=(e-b)*6,v=(e+t-b)*6;p<v;p+=6){const x=s[p+0],T=s[p+1],S=x-T,w=x+T;S<a&&(a=S),w>l&&(l=w),x<u&&(u=x),x>g&&(g=x);const I=s[p+2],R=s[p+3],A=I-R,M=I+R;A<r&&(r=A),M>h&&(h=M),I<o&&(o=I),I>y&&(y=I);const _=s[p+4],P=s[p+5],C=_-P,D=_+P;C<c&&(c=C),D>f&&(f=D),_<m&&(m=_),_>d&&(d=_)}i[0]=a,i[1]=r,i[2]=c,i[3]=l,i[4]=h,i[5]=f,n[0]=u,n[1]=o,n[2]=m,n[3]=g,n[4]=y,n[5]=d}const oe=32,ls=(s,e)=>s.candidate-e.candidate,he=new Array(oe).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),ct=new Float32Array(6);function us(s,e,t,i,n,a){let r=-1,c=0;if(a===Sr)r=Mi(e),r!==-1&&(c=(e[r]+e[r+3])/2);else if(a===os)r=Mi(s),r!==-1&&(c=fs(t,i,n,r));else if(a===_r){const l=je(s);let h=Ut*n;const f=t.offset||0,u=(i-f)*6,o=(i+n-f)*6;for(let m=0;m<3;m++){const g=e[m],b=(e[m+3]-g)/oe;if(n<oe/4){const p=[...he];p.length=n;let v=0;for(let T=u;T<o;T+=6,v++){const S=p[v];S.candidate=t[T+2*m],S.count=0;const{bounds:w,leftCacheBounds:I,rightCacheBounds:R}=S;for(let A=0;A<3;A++)R[A]=1/0,R[A+3]=-1/0,I[A]=1/0,I[A+3]=-1/0,w[A]=1/0,w[A+3]=-1/0;ot(T,t,w)}p.sort(ls);let x=n;for(let T=0;T<x;T++){const S=p[T];for(;T+1<x&&p[T+1].candidate===S.candidate;)p.splice(T+1,1),x--}for(let T=u;T<o;T+=6){const S=t[T+2*m];for(let w=0;w<x;w++){const I=p[w];S>=I.candidate?ot(T,t,I.rightCacheBounds):(ot(T,t,I.leftCacheBounds),I.count++)}}for(let T=0;T<x;T++){const S=p[T],w=S.count,I=n-S.count,R=S.leftCacheBounds,A=S.rightCacheBounds;let M=0;w!==0&&(M=je(R)/l);let _=0;I!==0&&(_=je(A)/l);const P=Ri+Ut*(M*w+_*I);P<h&&(r=m,h=P,c=S.candidate)}}else{for(let x=0;x<oe;x++){const T=he[x];T.count=0,T.candidate=g+b+x*b;const S=T.bounds;for(let w=0;w<3;w++)S[w]=1/0,S[w+3]=-1/0}for(let x=u;x<o;x+=6){let w=~~((t[x+2*m]-g)/b);w>=oe&&(w=oe-1);const I=he[w];I.count++,ot(x,t,I.bounds)}const p=he[oe-1];Pi(p.bounds,p.rightCacheBounds);for(let x=oe-2;x>=0;x--){const T=he[x],S=he[x+1];Ci(T.bounds,S.rightCacheBounds,T.rightCacheBounds)}let v=0;for(let x=0;x<oe-1;x++){const T=he[x],S=T.count,w=T.bounds,R=he[x+1].rightCacheBounds;S!==0&&(v===0?Pi(w,ct):Ci(w,ct,ct)),v+=S;let A=0,M=0;v!==0&&(A=je(ct)/l);const _=n-v;_!==0&&(M=je(R)/l);const P=Ri+Ut*(A*v+M*_);P<h&&(r=m,h=P,c=T.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${a} used.`);return{axis:r,pos:c}}function fs(s,e,t,i){let n=0;const a=s.offset;for(let r=e,c=e+t;r<c;r++)n+=s[(r-a)*6+i*2];return n/t}class Vt{constructor(){this.boundingData=new Float32Array(6)}}function hs(s,e,t,i,n,a){let r=i,c=i+n-1;const l=a.pos,h=a.axis*2,f=t.offset||0;for(;;){for(;r<=c&&t[(r-f)*6+h]<l;)r++;for(;r<=c&&t[(c-f)*6+h]>=l;)c--;if(r<c){for(let u=0;u<e;u++){let o=s[r*e+u];s[r*e+u]=s[c*e+u],s[c*e+u]=o}for(let u=0;u<6;u++){const o=r-f,m=c-f,g=t[o*6+u];t[o*6+u]=t[m*6+u],t[m*6+u]=g}r++,c--}else return r}}let Ir,Pt,si,Rr;const ds=Math.pow(2,32);function ni(s){return"count"in s?1:1+ni(s.left)+ni(s.right)}function ms(s,e,t){return Ir=new Float32Array(t),Pt=new Uint32Array(t),si=new Uint16Array(t),Rr=new Uint8Array(t),ai(s,e)}function ai(s,e){const t=s/4,i=s/2,n="count"in e,a=e.boundingData;for(let r=0;r<6;r++)Ir[t+r]=a[r];if(n)return e.buffer?(Rr.set(new Uint8Array(e.buffer),s),s+e.buffer.byteLength):(Pt[t+6]=e.offset,si[i+14]=e.count,si[i+15]=gi,s+L);{const{left:r,right:c,splitAxis:l}=e,h=s+L;let f=ai(h,r);const u=s/L,m=f/L-u;if(m>ds)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return Pt[t+6]=m,Pt[t+7]=l,ai(f,c)}}function ps(s,e,t,i,n,a){const{maxDepth:r,verbose:c,maxLeafSize:l,strategy:h,onProgress:f}=n,u=s.primitiveBuffer,o=s.primitiveBufferStride,m=new Float32Array(6);let g=!1;const y=new Vt;return Wt(e,t,i,y.boundingData,m),b(y,t,i,m),y;function d(p){f&&f((p-a.offset)/a.count)}function b(p,v,x,T=null,S=0){if(!g&&S>=r&&(g=!0,c&&console.warn(`BVH: Max depth of ${r} reached when generating BVH. Consider increasing maxDepth.`)),x<=l||S>=r)return d(v+x),p.offset=v,p.count=x,p;const w=us(p.boundingData,T,e,v,x,h);if(w.axis===-1)return d(v+x),p.offset=v,p.count=x,p;const I=hs(u,o,e,v,x,w);if(I===v||I===v+x)d(v+x),p.offset=v,p.count=x;else{p.splitAxis=w.axis;const R=new Vt,A=v,M=I-v;p.left=R,Wt(e,A,M,R.boundingData,m),b(R,A,M,m,S+1);const _=new Vt,P=I,C=x-M;p.right=_,Wt(e,P,C,_.boundingData,m),b(_,P,C,m,S+1)}return p}}function gs(s,e){const t=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=s.getRootRanges(e.range),n=i[0],a=i[i.length-1],r={offset:n.offset,count:a.offset+a.count-n.offset},c=new Float32Array(6*r.count);c.offset=r.offset,s.computePrimitiveBounds(r.offset,r.count,c),s._roots=i.map(l=>{const h=ps(s,c,l.offset,l.count,e,r),f=ni(h),u=new t(L*f);return ms(0,h,u),u})}class xi{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){const e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}class vs{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const e=[];let t=null;this.setBuffer=i=>{t&&e.push(t),t=i,this.float32Array=new Float32Array(i),this.uint16Array=new Uint16Array(i),this.uint32Array=new Uint32Array(i)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}}const B=new vs;let me,qe;const Fe=[],lt=new xi(()=>new ae);function xs(s,e,t,i,n,a){me=lt.getPrimitive(),qe=lt.getPrimitive(),Fe.push(me,qe),B.setBuffer(s._roots[e]);const r=oi(0,s.geometry,t,i,n,a);B.clearBuffer(),lt.releasePrimitive(me),lt.releasePrimitive(qe),Fe.pop(),Fe.pop();const c=Fe.length;return c>0&&(qe=Fe[c-1],me=Fe[c-2]),r}function oi(s,e,t,i,n=null,a=0,r=0){const{float32Array:c,uint16Array:l,uint32Array:h}=B;let f=s*2;if(N(f,l)){const o=q(s,h),m=Y(f,l);return z(s,c,me),i(o,m,!1,r,a+s/H,me)}else{let A=function(_){const{uint16Array:P,uint32Array:C}=B;let D=_*2;for(;!N(D,P);)_=U(_),D=_*2;return q(_,C)},M=function(_){const{uint16Array:P,uint32Array:C}=B;let D=_*2;for(;!N(D,P);)_=W(_,C),D=_*2;return q(_,C)+Y(D,P)};const o=U(s),m=W(s,h);let g=o,y=m,d,b,p,v;if(n&&(p=me,v=qe,z(g,c,p),z(y,c,v),d=n(p),b=n(v),b<d)){g=m,y=o;const _=d;d=b,b=_,p=v}p||(p=me,z(g,c,p));const x=N(g*2,l),T=t(p,x,d,r+1,a+g/H);let S;if(T===Ii){const _=A(g),C=M(g)-_;S=i(_,C,!0,r+1,a+g/H,p)}else S=T&&oi(g,e,t,i,n,a,r+1);if(S)return!0;v=qe,z(y,c,v);const w=N(y*2,l),I=t(v,w,b,r+1,a+y/H);let R;if(I===Ii){const _=A(y),C=M(y)-_;R=i(_,C,!0,r+1,a+y/H,v)}else R=I&&oi(y,e,t,i,n,a,r+1);return!!R}}const st=new B.constructor,Ft=new B.constructor,de=new xi(()=>new ae),De=new ae,Be=new ae,qt=new ae,Gt=new ae;let $t=!1;function ys(s,e,t,i){if($t)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");$t=!0;const n=s._roots,a=e._roots;let r,c=0,l=0;const h=new $().copy(t).invert();for(let f=0,u=n.length;f<u;f++){st.setBuffer(n[f]),l=0;const o=de.getPrimitive();z(0,st.float32Array,o),o.applyMatrix4(h);for(let m=0,g=a.length;m<g&&(Ft.setBuffer(a[m]),r=ie(0,0,t,h,i,c,l,0,0,o),Ft.clearBuffer(),l+=a[m].byteLength/L,!r);m++);if(de.releasePrimitive(o),st.clearBuffer(),c+=n[f].byteLength/L,r)break}return $t=!1,r}function ie(s,e,t,i,n,a=0,r=0,c=0,l=0,h=null,f=!1){let u,o;f?(u=Ft,o=st):(u=st,o=Ft);const m=u.float32Array,g=u.uint32Array,y=u.uint16Array,d=o.float32Array,b=o.uint32Array,p=o.uint16Array,v=s*2,x=e*2,T=N(v,y),S=N(x,p);let w=!1;if(S&&T)f?w=n(q(e,b),Y(e*2,p),q(s,g),Y(s*2,y),l,r+e/H,c,a+s/H):w=n(q(s,g),Y(s*2,y),q(e,b),Y(e*2,p),c,a+s/H,l,r+e/H);else if(S){const I=de.getPrimitive();z(e,d,I),I.applyMatrix4(t);const R=U(s),A=W(s,g);z(R,m,De),z(A,m,Be);const M=I.intersectsBox(De),_=I.intersectsBox(Be);w=M&&ie(e,R,i,t,n,r,a,l,c+1,I,!f)||_&&ie(e,A,i,t,n,r,a,l,c+1,I,!f),de.releasePrimitive(I)}else{const I=U(e),R=W(e,b);z(I,d,qt),z(R,d,Gt);const A=h.intersectsBox(qt),M=h.intersectsBox(Gt);if(A&&M)w=ie(s,I,t,i,n,a,r,c,l+1,h,f)||ie(s,R,t,i,n,a,r,c,l+1,h,f);else if(A)if(T)w=ie(s,I,t,i,n,a,r,c,l+1,h,f);else{const _=de.getPrimitive();_.copy(qt).applyMatrix4(t);const P=U(s),C=W(s,g);z(P,m,De),z(C,m,Be);const D=_.intersectsBox(De),E=_.intersectsBox(Be);w=D&&ie(I,P,i,t,n,r,a,l,c+1,_,!f)||E&&ie(I,C,i,t,n,r,a,l,c+1,_,!f),de.releasePrimitive(_)}else if(M)if(T)w=ie(s,R,t,i,n,a,r,c,l+1,h,f);else{const _=de.getPrimitive();_.copy(Gt).applyMatrix4(t);const P=U(s),C=W(s,g);z(P,m,De),z(C,m,Be);const D=_.intersectsBox(De),E=_.intersectsBox(Be);w=D&&ie(R,P,i,t,n,r,a,l,c+1,_,!f)||E&&ie(R,C,i,t,n,r,a,l,c+1,_,!f),de.releasePrimitive(_)}}return w}const Fi=new ae,Ee=new Float32Array(6);class bs{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...Ar,...e},gs(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,t,i,n){let a=1/0,r=1/0,c=1/0,l=-1/0,h=-1/0,f=-1/0;for(let u=e,o=e+t;u<o;u++){this.writePrimitiveBounds(u,Ee,0);const[m,g,y,d,b,p]=Ee;m<a&&(a=m),d>l&&(l=d),g<r&&(r=g),b>h&&(h=b),y<c&&(c=y),p>f&&(f=p)}return i[n+0]=a,i[n+1]=r,i[n+2]=c,i[n+3]=l,i[n+4]=h,i[n+5]=f,i}computePrimitiveBounds(e,t,i){const n=i.offset||0;for(let a=e,r=e+t;a<r;a++){this.writePrimitiveBounds(a,Ee,0);const[c,l,h,f,u,o]=Ee,m=(c+f)/2,g=(l+u)/2,y=(h+o)/2,d=(f-c)/2,b=(u-l)/2,p=(o-h)/2,v=(a-n)*6;i[v+0]=m,i[v+1]=d+(Math.abs(m)+d)*Mt,i[v+2]=g,i[v+3]=b+(Math.abs(g)+b)*Mt,i[v+4]=y,i[v+5]=p+(Math.abs(y)+p)*Mt}return i}shiftPrimitiveOffsets(e){const t=this._indirectBuffer;if(t)for(let i=0,n=t.length;i<n;i++)t[i]+=e;else{const i=this._roots;for(let n=0;n<i.length;n++){const a=i[n],r=new Uint32Array(a),c=new Uint16Array(a),l=a.byteLength/L;for(let h=0;h<l;h++){const f=H*h,u=2*f;N(u,c)&&(r[f+6]+=e)}}}}traverse(e,t=0){const i=this._roots[t],n=new Uint32Array(i),a=new Uint16Array(i);r(0);function r(c,l=0){const h=c*2,f=N(h,a);if(f){const u=n[c+6],o=a[h+14];e(l,f,new Float32Array(i,c*4,6),u,o)}else{const u=U(c),o=W(c,n),m=Et(c,n);e(l,f,new Float32Array(i,c*4,6),m)||(r(u,l+1),r(o,l+1))}}}refit(){const e=this._roots;for(let t=0,i=e.length;t<i;t++){const n=e[t],a=new Uint32Array(n),r=new Uint16Array(n),c=new Float32Array(n),l=n.byteLength/L;for(let h=l-1;h>=0;h--){const f=h*H,u=f*2;if(N(u,r)){const m=q(f,a),g=Y(u,r);this.writePrimitiveRangeBounds(m,g,Ee,0),c.set(Ee,f)}else{const m=U(f),g=W(f,a);for(let y=0;y<3;y++){const d=c[m+y],b=c[m+y+3],p=c[g+y],v=c[g+y+3];c[f+y]=d<p?d:p,c[f+y+3]=b>v?b:v}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(i=>{z(0,new Float32Array(i),Fi),e.union(Fi)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:i,intersectsRange:n,intersectsPrimitive:a,scratchPrimitive:r,iterate:c}=e;if(n&&a){const u=n;n=(o,m,g,y,d)=>u(o,m,g,y,d)?!0:c(o,m,this,a,g,y,r)}else n||(a?n=(u,o,m,g)=>c(u,o,this,a,m,g,r):n=(u,o,m)=>m);let l=!1,h=0;const f=this._roots;for(let u=0,o=f.length;u<o;u++){const m=f[u];if(l=xs(this,u,i,n,t,h),l)break;h+=m.byteLength/L}return l}bvhcast(e,t,i){let{intersectsRanges:n}=i;return ys(this,e,t,n)}}function Ts(){return typeof SharedArrayBuffer<"u"}function zt(s){return s.index?s.index.count:s.attributes.position.count}function kt(s){return zt(s)/3}function Mr(s,e=ArrayBuffer){return s>65535?new Uint32Array(new e(4*s)):new Uint16Array(new e(2*s))}function ws(s,e){if(!s.index){const t=s.attributes.position.count,i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,n=Mr(t,i);s.setIndex(new Z(n,1));for(let a=0;a<t;a++)n[a]=a}}function Ss(s,e,t){const i=zt(s)/t,n=e||s.drawRange,a=n.start/t,r=(n.start+n.count)/t,c=Math.max(0,a),l=Math.min(i,r)-c;return{offset:Math.floor(c),count:Math.floor(l)}}function _s(s,e){return s.groups.map(t=>({offset:t.start/e,count:t.count/e}))}function Di(s,e,t){const i=Ss(s,e,t),n=_s(s,t);if(!n.length)return[i];const a=[],r=i.offset,c=i.offset+i.count,l=zt(s)/t,h=[];for(const o of n){const{offset:m,count:g}=o,y=m,d=isFinite(g)?g:l-m,b=m+d;y<c&&b>r&&(h.push({pos:Math.max(r,y),isStart:!0}),h.push({pos:Math.min(c,b),isStart:!1}))}h.sort((o,m)=>o.pos!==m.pos?o.pos-m.pos:o.type==="end"?-1:1);let f=0,u=null;for(const o of h){const m=o.pos;f!==0&&m!==u&&a.push({offset:u,count:m-u}),f+=o.isStart?1:-1,u=m}return a}function As(s,e){const t=s[s.length-1],i=t.offset+t.count>2**16,n=s.reduce((h,f)=>h+f.count,0),a=i?4:2,r=e?new SharedArrayBuffer(n*a):new ArrayBuffer(n*a),c=i?new Uint32Array(r):new Uint16Array(r);let l=0;for(let h=0;h<s.length;h++){const{offset:f,count:u}=s[h];for(let o=0;o<u;o++)c[l+o]=f+o;l+=u}return c}class Is extends bs{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(t.useSharedArrayBuffer&&!Ts())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?i=>this._indirectBuffer[i]:i=>i,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...Ar,...t},t[vi]||this.init(t)}init(e){const{geometry:t,primitiveStride:i}=this;if(e.indirect){const n=Di(t,e.range,i),a=As(n,e.useSharedArrayBuffer);this._indirectBuffer=a}else ws(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new ae))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Di(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}}class fe{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let i=1/0,n=-1/0;for(let a=0,r=e.length;a<r;a++){const l=e[a][t];i=l<i?l:i,n=l>n?l:n}this.min=i,this.max=n}setFromPoints(e,t){let i=1/0,n=-1/0;for(let a=0,r=t.length;a<r;a++){const c=t[a],l=e.dot(c);i=l<i?l:i,n=l>n?l:n}this.min=i,this.max=n}isSeparated(e){return this.min>e.max||e.min>this.max}}fe.prototype.setFromBox=(function(){const s=new F;return function(t,i){const n=i.min,a=i.max;let r=1/0,c=-1/0;for(let l=0;l<=1;l++)for(let h=0;h<=1;h++)for(let f=0;f<=1;f++){s.x=n.x*l+a.x*(1-l),s.y=n.y*h+a.y*(1-h),s.z=n.z*f+a.z*(1-f);const u=t.dot(s);r=Math.min(u,r),c=Math.max(u,c)}this.min=r,this.max=c}})();const Rs=(function(){const s=new F,e=new F,t=new F;return function(n,a,r){const c=n.start,l=s,h=a.start,f=e;t.subVectors(c,h),s.subVectors(n.end,n.start),e.subVectors(a.end,a.start);const u=t.dot(f),o=f.dot(l),m=f.dot(f),g=t.dot(l),d=l.dot(l)*m-o*o;let b,p;d!==0?b=(u*o-g*m)/d:b=0,p=(u+b*o)/m,r.x=b,r.y=p}})(),yi=(function(){const s=new j,e=new F,t=new F;return function(n,a,r,c){Rs(n,a,s);let l=s.x,h=s.y;if(l>=0&&l<=1&&h>=0&&h<=1){n.at(l,r),a.at(h,c);return}else if(l>=0&&l<=1){h<0?a.at(0,c):a.at(1,c),n.closestPointToPoint(c,!0,r);return}else if(h>=0&&h<=1){l<0?n.at(0,r):n.at(1,r),a.closestPointToPoint(r,!0,c);return}else{let f;l<0?f=n.start:f=n.end;let u;h<0?u=a.start:u=a.end;const o=e,m=t;if(n.closestPointToPoint(u,!0,e),a.closestPointToPoint(f,!0,t),o.distanceToSquared(u)<=m.distanceToSquared(f)){r.copy(o),c.copy(u);return}else{r.copy(f),c.copy(m);return}}}})(),Ms=(function(){const s=new F,e=new F,t=new dr,i=new ue;return function(a,r){const{radius:c,center:l}=a,{a:h,b:f,c:u}=r;if(i.start=h,i.end=f,i.closestPointToPoint(l,!0,s).distanceTo(l)<=c||(i.start=h,i.end=u,i.closestPointToPoint(l,!0,s).distanceTo(l)<=c)||(i.start=f,i.end=u,i.closestPointToPoint(l,!0,s).distanceTo(l)<=c))return!0;const y=r.getPlane(t);if(Math.abs(y.distanceToPoint(l))<=c){const b=y.projectPoint(l,e);if(r.containsPoint(b))return!0}return!1}})(),Ps=["x","y","z"],ce=1e-15,Bi=ce*ce;function K(s){return Math.abs(s)<ce}class se extends We{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new F),this.satBounds=new Array(4).fill().map(()=>new fe),this.points=[this.a,this.b,this.c],this.plane=new dr,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new ue,this.needsUpdate=!0}intersectsSphere(e){return Ms(e,this)}update(){const e=this.a,t=this.b,i=this.c,n=this.points,a=this.satAxes,r=this.satBounds,c=a[0],l=r[0];this.getNormal(c),l.setFromPoints(c,n);const h=a[1],f=r[1];h.subVectors(e,t),f.setFromPoints(h,n);const u=a[2],o=r[2];u.subVectors(t,i),o.setFromPoints(u,n);const m=a[3],g=r[3];m.subVectors(i,e),g.setFromPoints(m,n);const y=h.length(),d=u.length(),b=m.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,y<ce?d<ce||b<ce?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(i)):d<ce?b<ce?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):b<ce&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(i),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(c,e),this.needsUpdate=!1}}se.prototype.closestPointToSegment=(function(){const s=new F,e=new F,t=new ue;return function(n,a=null,r=null){const{start:c,end:l}=n,h=this.points;let f,u=1/0;for(let o=0;o<3;o++){const m=(o+1)%3;t.start.copy(h[o]),t.end.copy(h[m]),yi(t,n,s,e),f=s.distanceToSquared(e),f<u&&(u=f,a&&a.copy(s),r&&r.copy(e))}return this.closestPointToPoint(c,s),f=c.distanceToSquared(s),f<u&&(u=f,a&&a.copy(s),r&&r.copy(c)),this.closestPointToPoint(l,s),f=l.distanceToSquared(s),f<u&&(u=f,a&&a.copy(s),r&&r.copy(l)),Math.sqrt(u)}})();se.prototype.intersectsTriangle=(function(){const s=new se,e=new fe,t=new fe,i=new F,n=new F,a=new F,r=new F,c=new ue,l=new ue,h=new F,f=new j,u=new j;function o(v,x,T,S){const w=i;!v.isDegenerateIntoPoint&&!v.isDegenerateIntoSegment?w.copy(v.plane.normal):w.copy(x.plane.normal);const I=v.satBounds,R=v.satAxes;for(let _=1;_<4;_++){const P=I[_],C=R[_];if(e.setFromPoints(C,x.points),P.isSeparated(e)||(r.copy(w).cross(C),e.setFromPoints(r,v.points),t.setFromPoints(r,x.points),e.isSeparated(t)))return!1}const A=x.satBounds,M=x.satAxes;for(let _=1;_<4;_++){const P=A[_],C=M[_];if(e.setFromPoints(C,v.points),P.isSeparated(e)||(r.crossVectors(w,C),e.setFromPoints(r,v.points),t.setFromPoints(r,x.points),e.isSeparated(t)))return!1}return T&&(S||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),T.start.set(0,0,0),T.end.set(0,0,0)),!0}function m(v,x,T,S,w,I,R,A,M,_,P){let C=R/(R-A);_.x=S+(w-S)*C,P.start.subVectors(x,v).multiplyScalar(C).add(v),C=R/(R-M),_.y=S+(I-S)*C,P.end.subVectors(T,v).multiplyScalar(C).add(v)}function g(v,x,T,S,w,I,R,A,M,_,P){if(w>0)m(v.c,v.a,v.b,S,x,T,M,R,A,_,P);else if(I>0)m(v.b,v.a,v.c,T,x,S,A,R,M,_,P);else if(A*M>0||R!=0)m(v.a,v.b,v.c,x,T,S,R,A,M,_,P);else if(A!=0)m(v.b,v.a,v.c,T,x,S,A,R,M,_,P);else if(M!=0)m(v.c,v.a,v.b,S,x,T,M,R,A,_,P);else return!0;return!1}function y(v,x,T,S){const w=x.degenerateSegment,I=v.plane.distanceToPoint(w.start),R=v.plane.distanceToPoint(w.end);return K(I)?K(R)?o(v,x,T,S):(T&&(T.start.copy(w.start),T.end.copy(w.start)),v.containsPoint(w.start)):K(R)?(T&&(T.start.copy(w.end),T.end.copy(w.end)),v.containsPoint(w.end)):v.plane.intersectLine(w,i)!=null?(T&&(T.start.copy(i),T.end.copy(i)),v.containsPoint(i)):!1}function d(v,x,T){const S=x.a;return K(v.plane.distanceToPoint(S))&&v.containsPoint(S)?(T&&(T.start.copy(S),T.end.copy(S)),!0):!1}function b(v,x,T){const S=v.degenerateSegment,w=x.a;return S.closestPointToPoint(w,!0,i),w.distanceToSquared(i)<Bi?(T&&(T.start.copy(w),T.end.copy(w)),!0):!1}function p(v,x,T,S){if(v.isDegenerateIntoSegment)if(x.isDegenerateIntoSegment){const w=v.degenerateSegment,I=x.degenerateSegment,R=n,A=a;w.delta(R),I.delta(A);const M=i.subVectors(I.start,w.start),_=R.x*A.y-R.y*A.x;if(K(_))return!1;const P=(M.x*A.y-M.y*A.x)/_,C=-(R.x*M.y-R.y*M.x)/_;if(P<0||P>1||C<0||C>1)return!1;const D=w.start.z+R.z*P,E=I.start.z+A.z*C;return K(D-E)?(T&&(T.start.copy(w.start).addScaledVector(R,P),T.end.copy(w.start).addScaledVector(R,P)),!0):!1}else return x.isDegenerateIntoPoint?b(v,x,T):y(x,v,T,S);else{if(v.isDegenerateIntoPoint)return x.isDegenerateIntoPoint?x.a.distanceToSquared(v.a)<Bi?(T&&(T.start.copy(v.a),T.end.copy(v.a)),!0):!1:x.isDegenerateIntoSegment?b(x,v,T):d(x,v,T);if(x.isDegenerateIntoPoint)return d(v,x,T);if(x.isDegenerateIntoSegment)return y(v,x,T,S)}}return function(x,T=null,S=!1){this.needsUpdate&&this.update(),x.isExtendedTriangle?x.needsUpdate&&x.update():(s.copy(x),s.update(),x=s);const w=p(this,x,T,S);if(w!==void 0)return w;const I=this.plane,R=x.plane;let A=R.distanceToPoint(this.a),M=R.distanceToPoint(this.b),_=R.distanceToPoint(this.c);K(A)&&(A=0),K(M)&&(M=0),K(_)&&(_=0);const P=A*M,C=A*_;if(P>0&&C>0)return!1;let D=I.distanceToPoint(x.a),E=I.distanceToPoint(x.b),Re=I.distanceToPoint(x.c);K(D)&&(D=0),K(E)&&(E=0),K(Re)&&(Re=0);const Me=D*E,Ye=D*Re;if(Me>0&&Ye>0)return!1;n.copy(I.normal),a.copy(R.normal);const Pe=n.cross(a);let xe=0,Ot=Math.abs(Pe.x);const Si=Math.abs(Pe.y);Si>Ot&&(Ot=Si,xe=1),Math.abs(Pe.z)>Ot&&(xe=2);const Ce=Ps[xe],Or=this.a[Ce],Hr=this.b[Ce],Lr=this.c[Ce],Ur=x.a[Ce],Wr=x.b[Ce],Vr=x.c[Ce];if(g(this,Or,Hr,Lr,P,C,A,M,_,f,c))return o(this,x,T,S);if(g(x,Ur,Wr,Vr,Me,Ye,D,E,Re,u,l))return o(this,x,T,S);if(f.y<f.x){const Ht=f.y;f.y=f.x,f.x=Ht,h.copy(c.start),c.start.copy(c.end),c.end.copy(h)}if(u.y<u.x){const Ht=u.y;u.y=u.x,u.x=Ht,h.copy(l.start),l.start.copy(l.end),l.end.copy(h)}return f.y<u.x||u.y<f.x?!1:(T&&(u.x>f.x?T.start.copy(l.start):T.start.copy(c.start),u.y<f.y?T.end.copy(l.end):T.end.copy(c.end)),!0)}})();se.prototype.distanceToPoint=(function(){const s=new F;return function(t){return this.closestPointToPoint(t,s),t.distanceTo(s)}})();se.prototype.distanceToTriangle=(function(){const s=new F,e=new F,t=["a","b","c"],i=new ue,n=new ue;return function(r,c=null,l=null){const h=c||l?i:null;if(this.intersectsTriangle(r,h))return(c||l)&&(c&&h.getCenter(c),l&&h.getCenter(l)),0;let f=1/0;for(let u=0;u<3;u++){let o;const m=t[u],g=r[m];this.closestPointToPoint(g,s),o=g.distanceToSquared(s),o<f&&(f=o,c&&c.copy(s),l&&l.copy(g));const y=this[m];r.closestPointToPoint(y,s),o=y.distanceToSquared(s),o<f&&(f=o,c&&c.copy(y),l&&l.copy(s))}for(let u=0;u<3;u++){const o=t[u],m=t[(u+1)%3];i.set(this[o],this[m]);for(let g=0;g<3;g++){const y=t[g],d=t[(g+1)%3];n.set(r[y],r[d]),yi(i,n,s,e);const b=s.distanceToSquared(e);b<f&&(f=b,c&&c.copy(s),l&&l.copy(e))}}return Math.sqrt(f)}})();class X{constructor(e,t,i){this.isOrientedBox=!0,this.min=new F,this.max=new F,this.matrix=new $,this.invMatrix=new $,this.points=new Array(8).fill().map(()=>new F),this.satAxes=new Array(3).fill().map(()=>new F),this.satBounds=new Array(3).fill().map(()=>new fe),this.alignedSatBounds=new Array(3).fill().map(()=>new fe),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),i&&this.matrix.copy(i)}set(e,t,i){this.min.copy(e),this.max.copy(t),this.matrix.copy(i),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}}X.prototype.update=(function(){return function(){const e=this.matrix,t=this.min,i=this.max,n=this.points;for(let h=0;h<=1;h++)for(let f=0;f<=1;f++)for(let u=0;u<=1;u++){const o=1*h|2*f|4*u,m=n[o];m.x=h?i.x:t.x,m.y=f?i.y:t.y,m.z=u?i.z:t.z,m.applyMatrix4(e)}const a=this.satBounds,r=this.satAxes,c=n[0];for(let h=0;h<3;h++){const f=r[h],u=a[h],o=1<<h,m=n[o];f.subVectors(c,m),u.setFromPoints(f,n)}const l=this.alignedSatBounds;l[0].setFromPointsField(n,"x"),l[1].setFromPointsField(n,"y"),l[2].setFromPointsField(n,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();X.prototype.intersectsBox=(function(){const s=new fe;return function(t){this.needsUpdate&&this.update();const i=t.min,n=t.max,a=this.satBounds,r=this.satAxes,c=this.alignedSatBounds;if(s.min=i.x,s.max=n.x,c[0].isSeparated(s)||(s.min=i.y,s.max=n.y,c[1].isSeparated(s))||(s.min=i.z,s.max=n.z,c[2].isSeparated(s)))return!1;for(let l=0;l<3;l++){const h=r[l],f=a[l];if(s.setFromBox(h,t),f.isSeparated(s))return!1}return!0}})();X.prototype.intersectsTriangle=(function(){const s=new se,e=new Array(3),t=new fe,i=new fe,n=new F;return function(r){this.needsUpdate&&this.update(),r.isExtendedTriangle?r.needsUpdate&&r.update():(s.copy(r),s.update(),r=s);const c=this.satBounds,l=this.satAxes;e[0]=r.a,e[1]=r.b,e[2]=r.c;for(let o=0;o<3;o++){const m=c[o],g=l[o];if(t.setFromPoints(g,e),m.isSeparated(t))return!1}const h=r.satBounds,f=r.satAxes,u=this.points;for(let o=0;o<3;o++){const m=h[o],g=f[o];if(t.setFromPoints(g,u),m.isSeparated(t))return!1}for(let o=0;o<3;o++){const m=l[o];for(let g=0;g<4;g++){const y=f[g];if(n.crossVectors(m,y),t.setFromPoints(n,e),i.setFromPoints(n,u),t.isSeparated(i))return!1}}return!0}})();X.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();X.prototype.distanceToPoint=(function(){const s=new F;return function(t){return this.closestPointToPoint(t,s),t.distanceTo(s)}})();X.prototype.distanceToBox=(function(){const s=["x","y","z"],e=new Array(12).fill().map(()=>new ue),t=new Array(12).fill().map(()=>new ue),i=new F,n=new F;return function(r,c=0,l=null,h=null){if(this.needsUpdate&&this.update(),this.intersectsBox(r))return(l||h)&&(r.getCenter(n),this.closestPointToPoint(n,i),r.closestPointToPoint(i,n),l&&l.copy(i),h&&h.copy(n)),0;const f=c*c,u=r.min,o=r.max,m=this.points;let g=1/0;for(let d=0;d<8;d++){const b=m[d];n.copy(b).clamp(u,o);const p=b.distanceToSquared(n);if(p<g&&(g=p,l&&l.copy(b),h&&h.copy(n),p<f))return Math.sqrt(p)}let y=0;for(let d=0;d<3;d++)for(let b=0;b<=1;b++)for(let p=0;p<=1;p++){const v=(d+1)%3,x=(d+2)%3,T=b<<v|p<<x,S=1<<d|b<<v|p<<x,w=m[T],I=m[S];e[y].set(w,I);const A=s[d],M=s[v],_=s[x],P=t[y],C=P.start,D=P.end;C[A]=u[A],C[M]=b?u[M]:o[M],C[_]=p?u[_]:o[M],D[A]=o[A],D[M]=b?u[M]:o[M],D[_]=p?u[_]:o[M],y++}for(let d=0;d<=1;d++)for(let b=0;b<=1;b++)for(let p=0;p<=1;p++){n.x=d?o.x:u.x,n.y=b?o.y:u.y,n.z=p?o.z:u.z,this.closestPointToPoint(n,i);const v=n.distanceToSquared(i);if(v<g&&(g=v,l&&l.copy(i),h&&h.copy(n),v<f))return Math.sqrt(v)}for(let d=0;d<12;d++){const b=e[d];for(let p=0;p<12;p++){const v=t[p];yi(b,v,i,n);const x=i.distanceToSquared(n);if(x<g&&(g=x,l&&l.copy(i),h&&h.copy(n),x<f))return Math.sqrt(x)}}return Math.sqrt(g)}})();class Cs extends xi{constructor(){super(()=>new se)}}const J=new Cs,Xe=new F,Yt=new F;function Fs(s,e,t={},i=0,n=1/0){const a=i*i,r=n*n;let c=1/0,l=null;if(s.shapecast({boundsTraverseOrder:f=>(Xe.copy(e).clamp(f.min,f.max),Xe.distanceToSquared(e)),intersectsBounds:(f,u,o)=>o<c&&o<r,intersectsTriangle:(f,u)=>{f.closestPointToPoint(e,Xe);const o=e.distanceToSquared(Xe);return o<c&&(Yt.copy(Xe),c=o,l=u),o<a}}),c===1/0)return null;const h=Math.sqrt(c);return t.point?t.point.copy(Yt):t.point=Yt.clone(),t.distance=h,t.faceIndex=l,t}const ut=parseInt(gr)>=169,Ds=parseInt(gr)<=161,ye=new F,be=new F,Te=new F,ft=new j,ht=new j,dt=new j,Ei=new F,zi=new F,ki=new F,Qe=new F;function Bs(s,e,t,i,n,a,r,c){let l;if(a===mr?l=s.intersectTriangle(i,t,e,!0,n):l=s.intersectTriangle(e,t,i,a!==pr,n),l===null)return null;const h=s.origin.distanceTo(n);return h<r||h>c?null:{distance:h,point:n.clone()}}function Ni(s,e,t,i,n,a,r,c,l,h,f){ye.fromBufferAttribute(e,a),be.fromBufferAttribute(e,r),Te.fromBufferAttribute(e,c);const u=Bs(s,ye,be,Te,Qe,l,h,f);if(u){if(i){ft.fromBufferAttribute(i,a),ht.fromBufferAttribute(i,r),dt.fromBufferAttribute(i,c),u.uv=new j;const m=We.getInterpolation(Qe,ye,be,Te,ft,ht,dt,u.uv);ut||(u.uv=m)}if(n){ft.fromBufferAttribute(n,a),ht.fromBufferAttribute(n,r),dt.fromBufferAttribute(n,c),u.uv1=new j;const m=We.getInterpolation(Qe,ye,be,Te,ft,ht,dt,u.uv1);ut||(u.uv1=m),Ds&&(u.uv2=u.uv1)}if(t){Ei.fromBufferAttribute(t,a),zi.fromBufferAttribute(t,r),ki.fromBufferAttribute(t,c),u.normal=new F;const m=We.getInterpolation(Qe,ye,be,Te,Ei,zi,ki,u.normal);u.normal.dot(s.direction)>0&&u.normal.multiplyScalar(-1),ut||(u.normal=m)}const o={a,b:r,c,normal:new F,materialIndex:0};if(We.getNormal(ye,be,Te,o.normal),u.face=o,u.faceIndex=a,ut){const m=new F;We.getBarycoord(Qe,ye,be,Te,m),u.barycoord=m}}return u}function Oi(s){return s&&s.isMaterial?s.side:s}function Nt(s,e,t,i,n,a,r){const c=i*3;let l=c+0,h=c+1,f=c+2;const{index:u,groups:o}=s;s.index&&(l=u.getX(l),h=u.getX(h),f=u.getX(f));const{position:m,normal:g,uv:y,uv1:d}=s.attributes;if(Array.isArray(e)){const b=i*3;for(let p=0,v=o.length;p<v;p++){const{start:x,count:T,materialIndex:S}=o[p];if(b>=x&&b<x+T){const w=Oi(e[S]),I=Ni(t,m,g,y,d,l,h,f,w,a,r);if(I)if(I.faceIndex=i,I.face.materialIndex=S,n)n.push(I);else return I}}}else{const b=Oi(e),p=Ni(t,m,g,y,d,l,h,f,b,a,r);if(p)if(p.faceIndex=i,p.face.materialIndex=0,n)n.push(p);else return p}return null}function O(s,e,t,i){const n=s.a,a=s.b,r=s.c;let c=e,l=e+1,h=e+2;t&&(c=t.getX(c),l=t.getX(l),h=t.getX(h)),n.x=i.getX(c),n.y=i.getY(c),n.z=i.getZ(c),a.x=i.getX(l),a.y=i.getY(l),a.z=i.getZ(l),r.x=i.getX(h),r.y=i.getY(h),r.z=i.getZ(h)}function Es(s,e,t,i,n,a,r,c){const{geometry:l,_indirectBuffer:h}=s;for(let f=i,u=i+n;f<u;f++)Nt(l,e,t,f,a,r,c)}function zs(s,e,t,i,n,a,r){const{geometry:c,_indirectBuffer:l}=s;let h=1/0,f=null;for(let u=i,o=i+n;u<o;u++){let m;m=Nt(c,e,t,u,null,a,r),m&&m.distance<h&&(f=m,h=m.distance)}return f}function ks(s,e,t,i,n,a,r){const{geometry:c}=t,{index:l}=c,h=c.attributes.position;for(let f=s,u=e+s;f<u;f++){let o;if(o=f,O(r,o*3,l,h),r.needsUpdate=!0,i(r,o,n,a))return!0}return!1}function Ns(s,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=s.geometry,i=t.index?t.index.array:null,n=t.attributes.position;let a,r,c,l,h=0;const f=s._roots;for(let o=0,m=f.length;o<m;o++)a=f[o],r=new Uint32Array(a),c=new Uint16Array(a),l=new Float32Array(a),u(0,h),h+=a.byteLength;function u(o,m,g=!1){const y=o*2;if(N(y,c)){const d=q(o,r),b=Y(y,c);let p=1/0,v=1/0,x=1/0,T=-1/0,S=-1/0,w=-1/0;for(let I=3*d,R=3*(d+b);I<R;I++){let A=i[I];const M=n.getX(A),_=n.getY(A),P=n.getZ(A);M<p&&(p=M),M>T&&(T=M),_<v&&(v=_),_>S&&(S=_),P<x&&(x=P),P>w&&(w=P)}return l[o+0]!==p||l[o+1]!==v||l[o+2]!==x||l[o+3]!==T||l[o+4]!==S||l[o+5]!==w?(l[o+0]=p,l[o+1]=v,l[o+2]=x,l[o+3]=T,l[o+4]=S,l[o+5]=w,!0):!1}else{const d=U(o),b=W(o,r);let p=g,v=!1,x=!1;if(e){if(!p){const A=d/H+m/L,M=b/H+m/L;v=e.has(A),x=e.has(M),p=!v&&!x}}else v=!0,x=!0;const T=p||v,S=p||x;let w=!1;T&&(w=u(d,m,p));let I=!1;S&&(I=u(b,m,p));const R=w||I;if(R)for(let A=0;A<3;A++){const M=d+A,_=b+A,P=l[M],C=l[M+3],D=l[_],E=l[_+3];l[o+A]=P<D?P:D,l[o+A+3]=C>E?C:E}return R}}}function ve(s,e,t,i,n){let a,r,c,l,h,f;const u=1/t.direction.x,o=1/t.direction.y,m=1/t.direction.z,g=t.origin.x,y=t.origin.y,d=t.origin.z;let b=e[s],p=e[s+3],v=e[s+1],x=e[s+3+1],T=e[s+2],S=e[s+3+2];return u>=0?(a=(b-g)*u,r=(p-g)*u):(a=(p-g)*u,r=(b-g)*u),o>=0?(c=(v-y)*o,l=(x-y)*o):(c=(x-y)*o,l=(v-y)*o),a>l||c>r||((c>a||isNaN(a))&&(a=c),(l<r||isNaN(r))&&(r=l),m>=0?(h=(T-d)*m,f=(S-d)*m):(h=(S-d)*m,f=(T-d)*m),a>f||h>r)?!1:((h>a||a!==a)&&(a=h),(f<r||r!==r)&&(r=f),a<=n&&r>=i)}function Os(s,e,t,i,n,a,r,c){const{geometry:l,_indirectBuffer:h}=s;for(let f=i,u=i+n;f<u;f++){let o=h?h[f]:f;Nt(l,e,t,o,a,r,c)}}function Hs(s,e,t,i,n,a,r){const{geometry:c,_indirectBuffer:l}=s;let h=1/0,f=null;for(let u=i,o=i+n;u<o;u++){let m;m=Nt(c,e,t,l?l[u]:u,null,a,r),m&&m.distance<h&&(f=m,h=m.distance)}return f}function Ls(s,e,t,i,n,a,r){const{geometry:c}=t,{index:l}=c,h=c.attributes.position;for(let f=s,u=e+s;f<u;f++){let o;if(o=t.resolveTriangleIndex(f),O(r,o*3,l,h),r.needsUpdate=!0,i(r,o,n,a))return!0}return!1}function Us(s,e,t,i,n,a,r){B.setBuffer(s._roots[e]),ci(0,s,t,i,n,a,r),B.clearBuffer()}function ci(s,e,t,i,n,a,r){const{float32Array:c,uint16Array:l,uint32Array:h}=B,f=s*2;if(N(f,l)){const o=q(s,h),m=Y(f,l);Es(e,t,i,o,m,n,a,r)}else{const o=U(s);ve(o,c,i,a,r)&&ci(o,e,t,i,n,a,r);const m=W(s,h);ve(m,c,i,a,r)&&ci(m,e,t,i,n,a,r)}}const Ws=["x","y","z"];function Vs(s,e,t,i,n,a){B.setBuffer(s._roots[e]);const r=li(0,s,t,i,n,a);return B.clearBuffer(),r}function li(s,e,t,i,n,a){const{float32Array:r,uint16Array:c,uint32Array:l}=B;let h=s*2;if(N(h,c)){const u=q(s,l),o=Y(h,c);return zs(e,t,i,u,o,n,a)}else{const u=Et(s,l),o=Ws[u],g=i.direction[o]>=0;let y,d;g?(y=U(s),d=W(s,l)):(y=W(s,l),d=U(s));const p=ve(y,r,i,n,a)?li(y,e,t,i,n,a):null;if(p){const T=p.point[o];if(g?T<=r[d+u]:T>=r[d+u+3])return p}const x=ve(d,r,i,n,a)?li(d,e,t,i,n,a):null;return p&&x?p.distance<=x.distance?p:x:p||x||null}}const mt=new ae,ze=new se,ke=new se,Ke=new $,Hi=new X,pt=new X;function qs(s,e,t,i){B.setBuffer(s._roots[e]);const n=ui(0,s,t,i);return B.clearBuffer(),n}function ui(s,e,t,i,n=null){const{float32Array:a,uint16Array:r,uint32Array:c}=B;let l=s*2;if(n===null&&(t.boundingBox||t.computeBoundingBox(),Hi.set(t.boundingBox.min,t.boundingBox.max,i),n=Hi),N(l,r)){const f=e.geometry,u=f.index,o=f.attributes.position,m=t.index,g=t.attributes.position,y=q(s,c),d=Y(l,r);if(Ke.copy(i).invert(),t.boundsTree)return z(s,a,pt),pt.matrix.copy(Ke),pt.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:p=>pt.intersectsBox(p),intersectsTriangle:p=>{p.a.applyMatrix4(i),p.b.applyMatrix4(i),p.c.applyMatrix4(i),p.needsUpdate=!0;for(let v=y*3,x=(d+y)*3;v<x;v+=3)if(O(ke,v,u,o),ke.needsUpdate=!0,p.intersectsTriangle(ke))return!0;return!1}});{const b=kt(t);for(let p=y*3,v=(d+y)*3;p<v;p+=3){O(ze,p,u,o),ze.a.applyMatrix4(Ke),ze.b.applyMatrix4(Ke),ze.c.applyMatrix4(Ke),ze.needsUpdate=!0;for(let x=0,T=b*3;x<T;x+=3)if(O(ke,x,m,g),ke.needsUpdate=!0,ze.intersectsTriangle(ke))return!0}}}else{const f=U(s),u=W(s,c);return z(f,a,mt),!!(n.intersectsBox(mt)&&ui(f,e,t,i,n)||(z(u,a,mt),n.intersectsBox(mt)&&ui(u,e,t,i,n)))}}const gt=new $,jt=new X,Ze=new X,Gs=new F,$s=new F,Ys=new F,js=new F;function Xs(s,e,t,i={},n={},a=0,r=1/0){e.boundingBox||e.computeBoundingBox(),jt.set(e.boundingBox.min,e.boundingBox.max,t),jt.needsUpdate=!0;const c=s.geometry,l=c.attributes.position,h=c.index,f=e.attributes.position,u=e.index,o=J.getPrimitive(),m=J.getPrimitive();let g=Gs,y=$s,d=null,b=null;n&&(d=Ys,b=js);let p=1/0,v=null,x=null;return gt.copy(t).invert(),Ze.matrix.copy(gt),s.shapecast({boundsTraverseOrder:T=>jt.distanceToBox(T),intersectsBounds:(T,S,w)=>w<p&&w<r?(S&&(Ze.min.copy(T.min),Ze.max.copy(T.max),Ze.needsUpdate=!0),!0):!1,intersectsRange:(T,S)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:I=>Ze.distanceToBox(I),intersectsBounds:(I,R,A)=>A<p&&A<r,intersectsRange:(I,R)=>{for(let A=I,M=I+R;A<M;A++){O(m,3*A,u,f),m.a.applyMatrix4(t),m.b.applyMatrix4(t),m.c.applyMatrix4(t),m.needsUpdate=!0;for(let _=T,P=T+S;_<P;_++){O(o,3*_,h,l),o.needsUpdate=!0;const C=o.distanceToTriangle(m,g,d);if(C<p&&(y.copy(g),b&&b.copy(d),p=C,v=_,x=A),C<a)return!0}}}});{const w=kt(e);for(let I=0,R=w;I<R;I++){O(m,3*I,u,f),m.a.applyMatrix4(t),m.b.applyMatrix4(t),m.c.applyMatrix4(t),m.needsUpdate=!0;for(let A=T,M=T+S;A<M;A++){O(o,3*A,h,l),o.needsUpdate=!0;const _=o.distanceToTriangle(m,g,d);if(_<p&&(y.copy(g),b&&b.copy(d),p=_,v=A,x=I),_<a)return!0}}}}}),J.releasePrimitive(o),J.releasePrimitive(m),p===1/0?null:(i.point?i.point.copy(y):i.point=y.clone(),i.distance=p,i.faceIndex=v,n&&(n.point?n.point.copy(b):n.point=b.clone(),n.point.applyMatrix4(gt),y.applyMatrix4(gt),n.distance=y.sub(n.point).length(),n.faceIndex=x),i)}function Qs(s,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=s.geometry,i=t.index?t.index.array:null,n=t.attributes.position;let a,r,c,l,h=0;const f=s._roots;for(let o=0,m=f.length;o<m;o++)a=f[o],r=new Uint32Array(a),c=new Uint16Array(a),l=new Float32Array(a),u(0,h),h+=a.byteLength;function u(o,m,g=!1){const y=o*2;if(N(y,c)){const d=q(o,r),b=Y(y,c);let p=1/0,v=1/0,x=1/0,T=-1/0,S=-1/0,w=-1/0;for(let I=d,R=d+b;I<R;I++){const A=3*s.resolveTriangleIndex(I);for(let M=0;M<3;M++){let _=A+M;_=i?i[_]:_;const P=n.getX(_),C=n.getY(_),D=n.getZ(_);P<p&&(p=P),P>T&&(T=P),C<v&&(v=C),C>S&&(S=C),D<x&&(x=D),D>w&&(w=D)}}return l[o+0]!==p||l[o+1]!==v||l[o+2]!==x||l[o+3]!==T||l[o+4]!==S||l[o+5]!==w?(l[o+0]=p,l[o+1]=v,l[o+2]=x,l[o+3]=T,l[o+4]=S,l[o+5]=w,!0):!1}else{const d=U(o),b=W(o,r);let p=g,v=!1,x=!1;if(e){if(!p){const A=d/H+m/L,M=b/H+m/L;v=e.has(A),x=e.has(M),p=!v&&!x}}else v=!0,x=!0;const T=p||v,S=p||x;let w=!1;T&&(w=u(d,m,p));let I=!1;S&&(I=u(b,m,p));const R=w||I;if(R)for(let A=0;A<3;A++){const M=d+A,_=b+A,P=l[M],C=l[M+3],D=l[_],E=l[_+3];l[o+A]=P<D?P:D,l[o+A+3]=C>E?C:E}return R}}}function Ks(s,e,t,i,n,a,r){B.setBuffer(s._roots[e]),fi(0,s,t,i,n,a,r),B.clearBuffer()}function fi(s,e,t,i,n,a,r){const{float32Array:c,uint16Array:l,uint32Array:h}=B,f=s*2;if(N(f,l)){const o=q(s,h),m=Y(f,l);Os(e,t,i,o,m,n,a,r)}else{const o=U(s);ve(o,c,i,a,r)&&fi(o,e,t,i,n,a,r);const m=W(s,h);ve(m,c,i,a,r)&&fi(m,e,t,i,n,a,r)}}const Zs=["x","y","z"];function Js(s,e,t,i,n,a){B.setBuffer(s._roots[e]);const r=hi(0,s,t,i,n,a);return B.clearBuffer(),r}function hi(s,e,t,i,n,a){const{float32Array:r,uint16Array:c,uint32Array:l}=B;let h=s*2;if(N(h,c)){const u=q(s,l),o=Y(h,c);return Hs(e,t,i,u,o,n,a)}else{const u=Et(s,l),o=Zs[u],g=i.direction[o]>=0;let y,d;g?(y=U(s),d=W(s,l)):(y=W(s,l),d=U(s));const p=ve(y,r,i,n,a)?hi(y,e,t,i,n,a):null;if(p){const T=p.point[o];if(g?T<=r[d+u]:T>=r[d+u+3])return p}const x=ve(d,r,i,n,a)?hi(d,e,t,i,n,a):null;return p&&x?p.distance<=x.distance?p:x:p||x||null}}const vt=new ae,Ne=new se,Oe=new se,Je=new $,Li=new X,xt=new X;function en(s,e,t,i){B.setBuffer(s._roots[e]);const n=di(0,s,t,i);return B.clearBuffer(),n}function di(s,e,t,i,n=null){const{float32Array:a,uint16Array:r,uint32Array:c}=B;let l=s*2;if(n===null&&(t.boundingBox||t.computeBoundingBox(),Li.set(t.boundingBox.min,t.boundingBox.max,i),n=Li),N(l,r)){const f=e.geometry,u=f.index,o=f.attributes.position,m=t.index,g=t.attributes.position,y=q(s,c),d=Y(l,r);if(Je.copy(i).invert(),t.boundsTree)return z(s,a,xt),xt.matrix.copy(Je),xt.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:p=>xt.intersectsBox(p),intersectsTriangle:p=>{p.a.applyMatrix4(i),p.b.applyMatrix4(i),p.c.applyMatrix4(i),p.needsUpdate=!0;for(let v=y,x=d+y;v<x;v++)if(O(Oe,3*e.resolveTriangleIndex(v),u,o),Oe.needsUpdate=!0,p.intersectsTriangle(Oe))return!0;return!1}});{const b=kt(t);for(let p=y,v=d+y;p<v;p++){const x=e.resolveTriangleIndex(p);O(Ne,3*x,u,o),Ne.a.applyMatrix4(Je),Ne.b.applyMatrix4(Je),Ne.c.applyMatrix4(Je),Ne.needsUpdate=!0;for(let T=0,S=b*3;T<S;T+=3)if(O(Oe,T,m,g),Oe.needsUpdate=!0,Ne.intersectsTriangle(Oe))return!0}}}else{const f=U(s),u=W(s,c);return z(f,a,vt),!!(n.intersectsBox(vt)&&di(f,e,t,i,n)||(z(u,a,vt),n.intersectsBox(vt)&&di(u,e,t,i,n)))}}const yt=new $,Xt=new X,et=new X,tn=new F,rn=new F,sn=new F,nn=new F;function an(s,e,t,i={},n={},a=0,r=1/0){e.boundingBox||e.computeBoundingBox(),Xt.set(e.boundingBox.min,e.boundingBox.max,t),Xt.needsUpdate=!0;const c=s.geometry,l=c.attributes.position,h=c.index,f=e.attributes.position,u=e.index,o=J.getPrimitive(),m=J.getPrimitive();let g=tn,y=rn,d=null,b=null;n&&(d=sn,b=nn);let p=1/0,v=null,x=null;return yt.copy(t).invert(),et.matrix.copy(yt),s.shapecast({boundsTraverseOrder:T=>Xt.distanceToBox(T),intersectsBounds:(T,S,w)=>w<p&&w<r?(S&&(et.min.copy(T.min),et.max.copy(T.max),et.needsUpdate=!0),!0):!1,intersectsRange:(T,S)=>{if(e.boundsTree){const w=e.boundsTree;return w.shapecast({boundsTraverseOrder:I=>et.distanceToBox(I),intersectsBounds:(I,R,A)=>A<p&&A<r,intersectsRange:(I,R)=>{for(let A=I,M=I+R;A<M;A++){const _=w.resolveTriangleIndex(A);O(m,3*_,u,f),m.a.applyMatrix4(t),m.b.applyMatrix4(t),m.c.applyMatrix4(t),m.needsUpdate=!0;for(let P=T,C=T+S;P<C;P++){const D=s.resolveTriangleIndex(P);O(o,3*D,h,l),o.needsUpdate=!0;const E=o.distanceToTriangle(m,g,d);if(E<p&&(y.copy(g),b&&b.copy(d),p=E,v=P,x=A),E<a)return!0}}}})}else{const w=kt(e);for(let I=0,R=w;I<R;I++){O(m,3*I,u,f),m.a.applyMatrix4(t),m.b.applyMatrix4(t),m.c.applyMatrix4(t),m.needsUpdate=!0;for(let A=T,M=T+S;A<M;A++){const _=s.resolveTriangleIndex(A);O(o,3*_,h,l),o.needsUpdate=!0;const P=o.distanceToTriangle(m,g,d);if(P<p&&(y.copy(g),b&&b.copy(d),p=P,v=A,x=I),P<a)return!0}}}}}),J.releasePrimitive(o),J.releasePrimitive(m),p===1/0?null:(i.point?i.point.copy(y):i.point=y.clone(),i.distance=p,i.faceIndex=v,n&&(n.point?n.point.copy(b):n.point=b.clone(),n.point.applyMatrix4(yt),y.applyMatrix4(yt),n.distance=y.sub(n.point).length(),n.faceIndex=x),i)}function Ui(s,e,t){return s===null?null:(s.point.applyMatrix4(e.matrixWorld),s.distance=s.point.distanceTo(t.ray.origin),s.object=e,s)}const bt=new X,Tt=new qr,Wi=new F,Vi=new $,qi=new F,Qt=["getX","getY","getZ"];class Dt extends Is{static serialize(e,t={}){t={cloneBuffers:!0,...t};const i=e.geometry,n=e._roots,a=e._indirectBuffer,r=i.getIndex(),c={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(c.roots=n.map(l=>l.slice()),c.index=r?r.array.slice():null,c.indirectBuffer=a?a.slice():null):(c.roots=n,c.index=r?r.array:null,c.indirectBuffer=a),c}static deserialize(e,t,i={}){i={setIndex:!0,indirect:!!e.indirectBuffer,...i};const{index:n,roots:a,indirectBuffer:r}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),l(a));const c=new Dt(t,{...i,[vi]:!0});if(c._roots=a,c._indirectBuffer=r||null,i.setIndex){const h=t.getIndex();if(h===null){const f=new Z(e.index,1,!1);t.setIndex(f)}else h.array!==n&&(h.array.set(n),h.needsUpdate=!0)}return c;function l(h){for(let f=0;f<h.length;f++){const u=h[f],o=new Uint32Array(u),m=new Uint16Array(u);for(let g=0,y=u.byteLength/L;g<y;g++){const d=H*g,b=2*d;N(b,m)||(o[d+6]=o[d+6]/H-g)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use maxLeafSize, instead.'),t={...t,maxLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,i){const n=this.geometry,a=this._indirectBuffer,r=n.attributes.position,c=n.index?n.index.array:null,h=(a?a[e]:e)*3;let f=h+0,u=h+1,o=h+2;c&&(f=c[f],u=c[u],o=c[o]);for(let m=0;m<3;m++){const g=r[Qt[m]](f),y=r[Qt[m]](u),d=r[Qt[m]](o);let b=g;y<b&&(b=y),d<b&&(b=d);let p=g;y>p&&(p=y),d>p&&(p=d),t[i+m]=b,t[i+m+3]=p}return t}computePrimitiveBounds(e,t,i){const n=this.geometry,a=this._indirectBuffer,r=n.attributes.position,c=n.index?n.index.array:null,l=r.normalized;if(e<0||t+e-i.offset>i.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");const h=r.array,f=r.offset||0;let u=3;r.isInterleavedBufferAttribute&&(u=r.data.stride);const o=["getX","getY","getZ"],m=i.offset;for(let g=e,y=e+t;g<y;g++){const b=(a?a[g]:g)*3,p=(g-m)*6;let v=b+0,x=b+1,T=b+2;c&&(v=c[v],x=c[x],T=c[T]),l||(v=v*u+f,x=x*u+f,T=T*u+f);for(let S=0;S<3;S++){let w,I,R;l?(w=r[o[S]](v),I=r[o[S]](x),R=r[o[S]](T)):(w=h[v+S],I=h[x+S],R=h[T+S]);let A=w;I<A&&(A=I),R<A&&(A=R);let M=w;I>M&&(M=I),R>M&&(M=R);const _=(M-A)/2,P=S*2;i[p+P+0]=A+_,i[p+P+1]=_+(Math.abs(A)+_)*Mt}}return i}raycastObject3D(e,t,i=[]){const{material:n}=e;if(n===void 0)return;Vi.copy(e.matrixWorld).invert(),Tt.copy(t.ray).applyMatrix4(Vi),qi.setFromMatrixScale(e.matrixWorld),Wi.copy(Tt.direction).multiply(qi);const a=Wi.length(),r=t.near/a,c=t.far/a;if(t.firstHitOnly===!0){let l=this.raycastFirst(Tt,n,r,c);l=Ui(l,e,t),l&&i.push(l)}else{const l=this.raycast(Tt,n,r,c);for(let h=0,f=l.length;h<f;h++){const u=Ui(l[h],e,t);u&&i.push(u)}}return i}refit(e=null){return(this.indirect?Qs:Ns)(this,e)}raycast(e,t=ti,i=0,n=1/0){const a=this._roots,r=[],c=this.indirect?Ks:Us;for(let l=0,h=a.length;l<h;l++)c(this,l,t,e,r,i,n);return r}raycastFirst(e,t=ti,i=0,n=1/0){const a=this._roots;let r=null;const c=this.indirect?Js:Vs;for(let l=0,h=a.length;l<h;l++){const f=c(this,l,t,e,i,n);f!=null&&(r==null||f.distance<r.distance)&&(r=f)}return r}intersectsGeometry(e,t){let i=!1;const n=this._roots,a=this.indirect?en:qs;for(let r=0,c=n.length;r<c&&(i=a(this,r,e,t),!i);r++);return i}shapecast(e){const t=J.getPrimitive(),i=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?Ls:ks});return J.releasePrimitive(t),i}bvhcast(e,t,i){let{intersectsRanges:n,intersectsTriangles:a}=i;const r=J.getPrimitive(),c=this.geometry.index,l=this.geometry.attributes.position,h=this.indirect?g=>{const y=this.resolveTriangleIndex(g);O(r,y*3,c,l)}:g=>{O(r,g*3,c,l)},f=J.getPrimitive(),u=e.geometry.index,o=e.geometry.attributes.position,m=e.indirect?g=>{const y=e.resolveTriangleIndex(g);O(f,y*3,u,o)}:g=>{O(f,g*3,u,o)};if(a){if(!(e instanceof Dt))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');const g=(y,d,b,p,v,x,T,S)=>{for(let w=b,I=b+p;w<I;w++){m(w),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let R=y,A=y+d;R<A;R++)if(h(R),r.needsUpdate=!0,a(r,f,R,w,v,x,T,S))return!0}return!1};if(n){const y=n;n=function(d,b,p,v,x,T,S,w){return y(d,b,p,v,x,T,S,w)?!0:g(d,b,p,v,x,T,S,w)}}else n=g}return super.bvhcast(e,t,{intersectsRanges:n})}intersectsBox(e,t){return bt.set(e.min,e.max,t),bt.needsUpdate=!0,this.shapecast({intersectsBounds:i=>bt.intersectsBox(i),intersectsTriangle:i=>bt.intersectsTriangle(i)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,i={},n={},a=0,r=1/0){return(this.indirect?an:Xs)(this,e,t,i,n,a,r)}closestPointToPoint(e,t={},i=0,n=1/0){return Fs(this,e,t,i,n)}}function on(s){switch(s){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function cn(s){switch(s){case 1:return Ct;case 2:return xr;case 3:return V;case 4:return V}}function Gi(s){switch(s){case 1:return Yr;case 2:return vr;case 3:return ri;case 4:return ri}}class Pr extends ee{constructor(){super(),this.minFilter=k,this.magFilter=k,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){const t=this.overrideItemSize,i=e.itemSize,n=e.count;if(t!==null){if(i*n%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=n*i/t}const a=e.itemSize,r=e.count,c=e.normalized,l=e.array.constructor,h=l.BYTES_PER_ELEMENT;let f=this._forcedType,u=a;if(f===null)switch(l){case Float32Array:f=G;break;case Uint8Array:case Uint16Array:case Uint32Array:f=it;break;case Int8Array:case Int16Array:case Int32Array:f=Lt;break}let o,m,g,y,d=on(a);switch(f){case G:g=1,m=cn(a),c&&h===1?(y=l,d+="8",l===Uint8Array?o=ii:(o=_i,d+="_SNORM")):(y=Float32Array,d+="32F",o=G);break;case Lt:d+=h*8+"I",g=c?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,m=Gi(a),h===1?(y=Int8Array,o=_i):h===2?(y=Int16Array,o=$r):(y=Int32Array,o=Lt);break;case it:d+=h*8+"UI",g=c?Math.pow(2,l.BYTES_PER_ELEMENT*8-1):1,m=Gi(a),h===1?(y=Uint8Array,o=ii):h===2?(y=Uint16Array,o=Gr):(y=Uint32Array,o=it);break}u===3&&(m===V||m===ri)&&(u=4);const b=Math.ceil(Math.sqrt(r))||1,p=u*b*b,v=new y(p),x=e.normalized;e.normalized=!1;for(let T=0;T<r;T++){const S=u*T;v[S]=e.getX(T)/g,a>=2&&(v[S+1]=e.getY(T)/g),a>=3&&(v[S+2]=e.getZ(T)/g,u===4&&(v[S+3]=1)),a>=4&&(v[S+3]=e.getW(T)/g)}e.normalized=x,this.internalFormat=d,this.format=m,this.type=o,this.image.width=b,this.image.height=b,this.image.data=v,this.needsUpdate=!0,this.dispose(),e.itemSize=i,e.count=n}}class Cr extends Pr{constructor(){super(),this._forcedType=it}}class Fr extends Pr{constructor(){super(),this._forcedType=G}}class ln{constructor(){this.index=new Cr,this.position=new Fr,this.bvhBounds=new ee,this.bvhContents=new ee,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){const{geometry:t}=e;if(fn(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){const i=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==i.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{const n=Mr(zt(t));this._cachedIndexAttr=new Z(n,1,!1)}un(t,i,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){const{index:e,position:t,bvhBounds:i,bvhContents:n}=this;e&&e.dispose(),t&&t.dispose(),i&&i.dispose(),n&&n.dispose()}}function un(s,e,t){const i=t.array,n=s.index?s.index.array:null;for(let a=0,r=e.length;a<r;a++){const c=3*a,l=3*e[a];for(let h=0;h<3;h++)i[c+h]=n?n[l+h]:l+h}}function fn(s,e,t){const i=s._roots;if(i.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");const n=i[0],a=new Uint16Array(n),r=new Uint32Array(n),c=new Float32Array(n),l=n.byteLength/L,h=2*Math.ceil(Math.sqrt(l/2)),f=new Float32Array(4*h*h),u=Math.ceil(Math.sqrt(l)),o=new Uint32Array(2*u*u);for(let m=0;m<l;m++){const g=m*L/4,y=g*2,d=g;for(let b=0;b<3;b++)f[8*m+0+b]=c[d+0+b],f[8*m+4+b]=c[d+3+b];if(N(y,a)){const b=Y(y,a),p=q(g,r),v=cs|b;o[m*2+0]=v,o[m*2+1]=p}else{const b=r[g+6],p=Et(g,r);o[m*2+0]=p,o[m*2+1]=b}}e.image.data=f,e.image.width=h,e.image.height=h,e.format=V,e.type=G,e.internalFormat="RGBA32F",e.minFilter=k,e.magFilter=k,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=o,t.image.width=u,t.image.height=u,t.format=vr,t.type=it,t.internalFormat="RG32UI",t.minFilter=k,t.magFilter=k,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}const hn=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,dn=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = currNodeIndex + boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;

			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return found;

}
`,mn=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;function Dr(s,e,t=0){if(s.isInterleavedBufferAttribute){const i=s.itemSize;for(let n=0,a=s.count;n<a;n++){const r=n+t;e.setX(r,s.getX(n)),i>=2&&e.setY(r,s.getY(n)),i>=3&&e.setZ(r,s.getZ(n)),i>=4&&e.setW(r,s.getW(n))}}else{const i=e.array,n=i.constructor,a=i.BYTES_PER_ELEMENT*s.itemSize*t;new n(i.buffer,a,s.array.length).set(s.array)}}function tt(s,e=null){const t=s.array.constructor,i=s.normalized,n=s.itemSize,a=e===null?s.count:e;return new Z(new t(n*a),n,i)}function Ve(s,e){if(!s&&!e)return!0;if(!!s!=!!e)return!1;const t=s.count===e.count,i=s.normalized===e.normalized,n=s.array.constructor===e.array.constructor,a=s.itemSize===e.itemSize;return!(!t||!i||!n||!a)}function pn(s){const e=s[0].index!==null,t=new Set(Object.keys(s[0].attributes));if(!s[0].getAttribute("position"))throw new Error("StaticGeometryGenerator: position attribute is required.");for(let i=0;i<s.length;++i){const n=s[i];let a=0;if(e!==(n.index!==null))throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(const r in n.attributes){if(!t.has(r))throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+r+'" attribute exists among all geometries, or in none of them.');a++}if(a!==t.size)throw new Error("StaticGeometryGenerator: All geometries must have the same number of attributes.")}}function gn(s){let e=0;for(let t=0,i=s.length;t<i;t++)e+=s[t].getIndex().count;return e}function vn(s){let e=0;for(let t=0,i=s.length;t<i;t++)e+=s[t].getAttribute("position").count;return e}function xn(s,e,t){s.index&&s.index.count!==e&&s.setIndex(null);const i=s.attributes;for(const n in i)i[n].count!==t&&s.deleteAttribute(n)}function yn(s,e={},t=new Ie){const{useGroups:i=!1,forceUpdate:n=!1,skipAssigningAttributes:a=[],overwriteIndex:r=!0}=e;pn(s);const c=s[0].index!==null,l=c?gn(s):-1,h=vn(s);if(xn(t,l,h),i){let u=0;for(let o=0,m=s.length;o<m;o++){const g=s[o];let y;c?y=g.getIndex().count:y=g.getAttribute("position").count,t.addGroup(u,y,o),u+=y}}if(c){let u=!1;if(t.index||(t.setIndex(new Z(new Uint32Array(l),1,!1)),u=!0),u||r){let o=0,m=0;const g=t.getIndex();for(let y=0,d=s.length;y<d;y++){const b=s[y],p=b.getIndex();if(!(!n&&!u&&a[y]))for(let x=0;x<p.count;++x)g.setX(o+x,p.getX(x)+m);o+=p.count,m+=b.getAttribute("position").count}}}const f=Object.keys(s[0].attributes);for(let u=0,o=f.length;u<o;u++){let m=!1;const g=f[u];if(!t.getAttribute(g)){const b=s[0].getAttribute(g);t.setAttribute(g,tt(b,h)),m=!0}let y=0;const d=t.getAttribute(g);for(let b=0,p=s.length;b<p;b++){const v=s[b],x=!n&&!m&&a[b],T=v.getAttribute(g);x||Dr(T,d,y),y+=T.count}}}function bn(s,e,t){const i=s.index,a=s.attributes.position.count,r=i?i.count:a;let c=s.groups;c.length===0&&(c=[{count:r,start:0,materialIndex:0}]);let l=s.getAttribute("materialIndex");if(!l||l.count!==a){let f;t.length<=255?f=new Uint8Array(a):f=new Uint16Array(a),l=new Z(f,1,!1),s.deleteAttribute("materialIndex"),s.setAttribute("materialIndex",l)}const h=l.array;for(let f=0;f<c.length;f++){const u=c[f],o=u.start,m=u.count,g=Math.min(m,r-o),y=Array.isArray(e)?e[u.materialIndex]:e,d=t.indexOf(y);for(let b=0;b<g;b++){let p=o+b;i&&(p=i.getX(p)),h[p]=d}}}function Tn(s,e){if(!s.index){const t=s.attributes.position.count,i=new Array(t);for(let n=0;n<t;n++)i[n]=n;s.setIndex(i)}if(!s.attributes.normal&&e&&e.includes("normal")&&s.computeVertexNormals(),!s.attributes.uv&&e&&e.includes("uv")){const t=s.attributes.position.count;s.setAttribute("uv",new Z(new Float32Array(t*2),2,!1))}if(!s.attributes.uv2&&e&&e.includes("uv2")){const t=s.attributes.position.count;s.setAttribute("uv2",new Z(new Float32Array(t*2),2,!1))}if(!s.attributes.tangent&&e&&e.includes("tangent"))if(s.attributes.uv&&s.attributes.normal)s.computeTangents();else{const t=s.attributes.position.count;s.setAttribute("tangent",new Z(new Float32Array(t*4),4,!1))}if(!s.attributes.color&&e&&e.includes("color")){const t=s.attributes.position.count,i=new Float32Array(t*4);i.fill(1),s.setAttribute("color",new Z(i,4))}}function bi(s){let e=0;if(s.byteLength!==0){const t=new Uint8Array(s);for(let i=0;i<s.byteLength;i++){const n=t[i];e=(e<<5)-e+n,e|=0}}return e}function $i(s){let e=s.uuid;const t=Object.values(s.attributes);s.index&&(t.push(s.index),e+=`index|${s.index.version}`);const i=Object.keys(t).sort();for(const n of i){const a=t[n];e+=`${n}_${a.version}|`}return e}function Yi(s){const e=s.skeleton;return e?(e.boneTexture||e.computeBoneTexture(),`${bi(e.boneTexture.image.data.buffer)}_${e.boneTexture.uuid}`):null}class wn{constructor(e=null){this.matrixWorld=new $,this.geometryHash=null,this.skeletonHash=null,this.primitiveCount=-1,e!==null&&this.updateFrom(e)}updateFrom(e){const t=e.geometry,i=(t.index?t.index.count:t.attributes.position.count)/3;this.matrixWorld.copy(e.matrixWorld),this.geometryHash=$i(t),this.primitiveCount=i,this.skeletonHash=Yi(e)}didChange(e){const t=e.geometry,i=(t.index?t.index.count:t.attributes.position.count)/3;return!(this.matrixWorld.equals(e.matrixWorld)&&this.geometryHash===$i(t)&&this.skeletonHash===Yi(e)&&this.primitiveCount===i)}}const we=new F,Se=new F,_e=new F,ji=new Ge,wt=new F,Kt=new F,Xi=new Ge,Qi=new Ge,St=new $,Ki=new $;function Zi(s,e,t){const i=s.skeleton,n=s.geometry,a=i.bones,r=i.boneInverses;Xi.fromBufferAttribute(n.attributes.skinIndex,e),Qi.fromBufferAttribute(n.attributes.skinWeight,e),St.elements.fill(0);for(let c=0;c<4;c++){const l=Qi.getComponent(c);if(l!==0){const h=Xi.getComponent(c);Ki.multiplyMatrices(a[h].matrixWorld,r[h]),Sn(St,Ki,l)}}return St.multiply(s.bindMatrix).premultiply(s.bindMatrixInverse),t.transformDirection(St),t}function Zt(s,e,t,i,n){wt.set(0,0,0);for(let a=0,r=s.length;a<r;a++){const c=e[a],l=s[a];c!==0&&(Kt.fromBufferAttribute(l,i),t?wt.addScaledVector(Kt,c):wt.addScaledVector(Kt.sub(n),c))}n.add(wt)}function Sn(s,e,t){const i=s.elements,n=e.elements;for(let a=0,r=n.length;a<r;a++)i[a]+=n[a]*t}function _n(s){const{index:e,attributes:t}=s;if(e)for(let i=0,n=e.count;i<n;i+=3){const a=e.getX(i),r=e.getX(i+2);e.setX(i,r),e.setX(i+2,a)}else for(const i in t){const n=t[i],a=n.itemSize;for(let r=0,c=n.count;r<c;r+=3)for(let l=0;l<a;l++){const h=n.getComponent(r,l),f=n.getComponent(r+2,l);n.setComponent(r,l,f),n.setComponent(r+2,l,h)}}return s}function An(s,e={},t=new Ie){e={applyWorldTransforms:!0,attributes:[],...e};const i=s.geometry,n=e.applyWorldTransforms,a=e.attributes.includes("normal"),r=e.attributes.includes("tangent"),c=i.attributes,l=t.attributes;for(const p in t.attributes)(!e.attributes.includes(p)||!(p in i.attributes))&&t.deleteAttribute(p);!t.index&&i.index&&(t.index=i.index.clone()),l.position||t.setAttribute("position",tt(c.position)),a&&!l.normal&&c.normal&&t.setAttribute("normal",tt(c.normal)),r&&!l.tangent&&c.tangent&&t.setAttribute("tangent",tt(c.tangent)),Ve(i.index,t.index),Ve(c.position,l.position),a&&Ve(c.normal,l.normal),r&&Ve(c.tangent,l.tangent);const h=c.position,f=a?c.normal:null,u=r?c.tangent:null,o=i.morphAttributes.position,m=i.morphAttributes.normal,g=i.morphAttributes.tangent,y=i.morphTargetsRelative,d=s.morphTargetInfluences,b=new jr;b.getNormalMatrix(s.matrixWorld),i.index&&t.index.array.set(i.index.array);for(let p=0,v=c.position.count;p<v;p++)we.fromBufferAttribute(h,p),f&&Se.fromBufferAttribute(f,p),u&&(ji.fromBufferAttribute(u,p),_e.fromBufferAttribute(u,p)),d&&(o&&Zt(o,d,y,p,we),m&&Zt(m,d,y,p,Se),g&&Zt(g,d,y,p,_e)),s.isSkinnedMesh&&(s.applyBoneTransform(p,we),f&&Zi(s,p,Se),u&&Zi(s,p,_e)),n&&we.applyMatrix4(s.matrixWorld),l.position.setXYZ(p,we.x,we.y,we.z),f&&(n&&Se.applyNormalMatrix(b),l.normal.setXYZ(p,Se.x,Se.y,Se.z)),u&&(n&&_e.transformDirection(s.matrixWorld),l.tangent.setXYZW(p,_e.x,_e.y,_e.z,ji.w));for(const p in e.attributes){const v=e.attributes[p];v==="position"||v==="tangent"||v==="normal"||!(v in c)||(l[v]||t.setAttribute(v,tt(c[v])),Ve(c[v],l[v]),Dr(c[v],l[v]))}return s.matrixWorld.determinant()<0&&_n(t),t}class In extends Ie{constructor(){super(),this.version=0,this.hash=null,this._diff=new wn}isCompatible(e,t){const i=e.geometry;for(let n=0;n<t.length;n++){const a=t[n],r=i.attributes[a],c=this.attributes[a];if(r&&!Ve(r,c))return!1}return!0}updateFrom(e,t){const i=this._diff;return i.didChange(e)?(An(e,t,this),i.updateFrom(e),this.version++,this.hash=`${this.uuid}_${this.version}`,!0):!1}}const mi=0,Br=1,Er=2;function Rn(s,e){for(let t=0,i=s.length;t<i;t++)s[t].traverseVisible(a=>{a.isMesh&&e(a)})}function Mn(s){const e=[];for(let t=0,i=s.length;t<i;t++){const n=s[t];Array.isArray(n.material)?e.push(...n.material):e.push(n.material)}return e}function Pn(s,e,t){if(s.length===0){e.setIndex(null);const i=e.attributes;for(const n in i)e.deleteAttribute(n);for(const n in t.attributes)e.setAttribute(t.attributes[n],new Z(new Float32Array(0),4,!1))}else yn(s,t,e);for(const i in e.attributes)e.attributes[i].needsUpdate=!0}class Cn{constructor(e){this.objects=null,this.useGroups=!0,this.applyWorldTransforms=!0,this.generateMissingAttributes=!0,this.overwriteIndex=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=new Map,this._geometryMergeSets=new WeakMap,this._mergeOrder=[],this._dummyMesh=null,this.setObjects(e||[])}_getDummyMesh(){if(!this._dummyMesh){const e=new Xr,t=new Ie;t.setAttribute("position",new Z(new Float32Array(9),3)),this._dummyMesh=new yr(t,e)}return this._dummyMesh}_getMeshes(){const e=[];return Rn(this.objects,t=>{e.push(t)}),e.sort((t,i)=>t.uuid>i.uuid?1:t.uuid<i.uuid?-1:0),e.length===0&&e.push(this._getDummyMesh()),e}_updateIntermediateGeometries(){const{_intermediateGeometry:e}=this,t=this._getMeshes(),i=new Set(e.keys()),n={attributes:this.attributes,applyWorldTransforms:this.applyWorldTransforms};for(let a=0,r=t.length;a<r;a++){const c=t[a],l=c.uuid;i.delete(l);let h=e.get(l);(!h||!h.isCompatible(c,this.attributes))&&(h&&h.dispose(),h=new In,e.set(l,h)),h.updateFrom(c,n)&&this.generateMissingAttributes&&Tn(h,this.attributes)}i.forEach(a=>{e.delete(a)})}setObjects(e){Array.isArray(e)?this.objects=[...e]:this.objects=[e]}generate(e=new Ie){const{useGroups:t,overwriteIndex:i,_intermediateGeometry:n,_geometryMergeSets:a}=this,r=this._getMeshes(),c=[],l=[],h=a.get(e)||[];this._updateIntermediateGeometries();let f=!1;r.length!==h.length&&(f=!0);for(let o=0,m=r.length;o<m;o++){const g=r[o],y=n.get(g.uuid);l.push(y);const d=h[o];!d||d.uuid!==y.uuid?(c.push(!1),f=!0):d.version!==y.version?c.push(!1):c.push(!0)}Pn(l,e,{useGroups:t,forceUpdate:f,skipAssigningAttributes:c,overwriteIndex:i}),f&&e.dispose(),a.set(e,l.map(o=>({version:o.version,uuid:o.uuid})));let u=mi;return f?u=Er:c.includes(!1)&&(u=Br),{changeType:u,materials:Mn(r),geometry:e}}}function Fn(s){const e=new Set;for(let t=0,i=s.length;t<i;t++){const n=s[t];for(const a in n){const r=n[a];r&&r.isTexture&&e.add(r)}}return Array.from(e)}function Dn(s){const e=[],t=new Set;for(let n=0,a=s.length;n<a;n++)s[n].traverse(r=>{r.visible&&(r.isRectAreaLight||r.isSpotLight||r.isPointLight||r.isDirectionalLight)&&(e.push(r),r.iesMap&&t.add(r.iesMap))});const i=Array.from(t).sort((n,a)=>n.uuid<a.uuid?1:n.uuid>a.uuid?-1:0);return{lights:e,iesTextures:i}}class Bn{get initialized(){return!!this.bvh}constructor(e){this.bvhOptions={},this.attributes=["position","normal","tangent","color","uv","uv2"],this.generateBVH=!0,this.bvh=null,this.geometry=new Ie,this.staticGeometryGenerator=new Cn(e),this._bvhWorker=null,this._pendingGenerate=null,this._buildAsync=!1}setObjects(e){this.staticGeometryGenerator.setObjects(e)}setBVHWorker(e){this._bvhWorker=e}async generateAsync(e=null){if(!this._bvhWorker)throw new Error('PathTracingSceneGenerator: "setBVHWorker" must be called before "generateAsync" can be called.');if(this.bvh instanceof Promise)return this._pendingGenerate||(this._pendingGenerate=new Promise(async()=>(await this.bvh,this._pendingGenerate=null,this.generateAsync(e)))),this._pendingGenerate;{this._buildAsync=!0;const t=this.generate(e);return this._buildAsync=!1,t.bvh=this.bvh=await t.bvh,t}}generate(e=null){const{staticGeometryGenerator:t,geometry:i,attributes:n}=this,a=t.objects;t.attributes=n,a.forEach(u=>{u.traverse(o=>{o.isSkinnedMesh&&o.skeleton&&o.skeleton.update()})});const r=t.generate(i),c=r.materials,l=Fn(c),{lights:h,iesTextures:f}=Dn(a);if(r.changeType!==mi&&bn(i,c,c),this.generateBVH){if(this.bvh instanceof Promise)throw new Error("PathTracingSceneGenerator: BVH is already building asynchronously.");if(r.changeType===Er){const u={strategy:_r,maxLeafTris:1,indirect:!0,onProgress:e,...this.bvhOptions};this._buildAsync?this.bvh=this._bvhWorker.generate(i,u):this.bvh=new Dt(i,u)}else r.changeType===Br&&this.bvh.refit()}return{bvhChanged:r.changeType!==mi,bvh:this.bvh,lights:h,iesTextures:f,geometry:i,materials:c,textures:l,objects:a}}}const En=new Qr(-1,1,1,-1,0,1);class zn extends Ie{constructor(){super(),this.setAttribute("position",new Ai([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ai([0,2,0,0,2,0],2))}}const kn=new zn;class $e{constructor(e){this._mesh=new yr(kn,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,En)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ti extends Bt{set needsUpdate(e){super.needsUpdate=!0,this.dispatchEvent({type:"recompilation"})}constructor(e){super(e);for(const t in this.uniforms)Object.defineProperty(this,t,{get(){return this.uniforms[t].value},set(i){this.uniforms[t].value=i}})}setDefine(e,t=void 0){if(t==null){if(e in this.defines)return delete this.defines[e],this.needsUpdate=!0,!0}else if(this.defines[e]!==t)return this.defines[e]=t,this.needsUpdate=!0,!0;return!1}}class Nn extends Ti{constructor(e){super({blending:nt,uniforms:{target1:{value:null},target2:{value:null},opacity:{value:1}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				uniform float opacity;

				uniform sampler2D target1;
				uniform sampler2D target2;

				varying vec2 vUv;

				void main() {

					vec4 color1 = texture2D( target1, vUv );
					vec4 color2 = texture2D( target2, vUv );

					float invOpacity = 1.0 - opacity;
					float totalAlpha = color1.a * invOpacity + color2.a * opacity;

					if ( color1.a != 0.0 || color2.a != 0.0 ) {

						gl_FragColor.rgb = color1.rgb * ( invOpacity * color1.a / totalAlpha ) + color2.rgb * ( opacity * color2.a / totalAlpha );
						gl_FragColor.a = totalAlpha;

					} else {

						gl_FragColor = vec4( 0.0 );

					}

				}`}),this.setValues(e)}}function _t(s=1){let e="uint";return s>1&&(e="uvec"+s),`
		${e} sobolReverseBits( ${e} x ) {

			x = ( ( ( x & 0xaaaaaaaau ) >> 1 ) | ( ( x & 0x55555555u ) << 1 ) );
			x = ( ( ( x & 0xccccccccu ) >> 2 ) | ( ( x & 0x33333333u ) << 2 ) );
			x = ( ( ( x & 0xf0f0f0f0u ) >> 4 ) | ( ( x & 0x0f0f0f0fu ) << 4 ) );
			x = ( ( ( x & 0xff00ff00u ) >> 8 ) | ( ( x & 0x00ff00ffu ) << 8 ) );
			return ( ( x >> 16 ) | ( x << 16 ) );

		}

		${e} sobolHashCombine( uint seed, ${e} v ) {

			return seed ^ ( v + ${e}( ( seed << 6 ) + ( seed >> 2 ) ) );

		}

		${e} sobolLaineKarrasPermutation( ${e} x, ${e} seed ) {

			x += seed;
			x ^= x * 0x6c50b47cu;
			x ^= x * 0xb82f1e52u;
			x ^= x * 0xc7afe638u;
			x ^= x * 0x8d22f6e6u;
			return x;

		}

		${e} nestedUniformScrambleBase2( ${e} x, ${e} seed ) {

			x = sobolLaineKarrasPermutation( x, seed );
			x = sobolReverseBits( x );
			return x;

		}
	`}function At(s=1){let e="uint",t="float",i="",n=".r",a="1u";return s>1&&(e="uvec"+s,t="vec"+s,i=s+"",s===2?(n=".rg",a="uvec2( 1u, 2u )"):s===3?(n=".rgb",a="uvec3( 1u, 2u, 3u )"):(n="",a="uvec4( 1u, 2u, 3u, 4u )")),`

		${t} sobol${i}( int effect ) {

			uint seed = sobolGetSeed( sobolBounceIndex, uint( effect ) );
			uint index = sobolPathIndex;

			uint shuffle_seed = sobolHashCombine( seed, 0u );
			uint shuffled_index = nestedUniformScrambleBase2( sobolReverseBits( index ), shuffle_seed );
			${t} sobol_pt = sobolGetTexturePoint( shuffled_index )${n};
			${e} result = ${e}( sobol_pt * 16777216.0 );

			${e} seed2 = sobolHashCombine( seed, ${a} );
			result = nestedUniformScrambleBase2( result, seed2 );

			return SOBOL_FACTOR * ${t}( result >> 8 );

		}
	`}const zr=`

	// Utils
	const float SOBOL_FACTOR = 1.0 / 16777216.0;
	const uint SOBOL_MAX_POINTS = 256u * 256u;

	${_t(1)}
	${_t(2)}
	${_t(3)}
	${_t(4)}

	uint sobolHash( uint x ) {

		// finalizer from murmurhash3
		x ^= x >> 16;
		x *= 0x85ebca6bu;
		x ^= x >> 13;
		x *= 0xc2b2ae35u;
		x ^= x >> 16;
		return x;

	}

`,On=`

	const uint SOBOL_DIRECTIONS_1[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0xa0000000u, 0xf0000000u,
		0x88000000u, 0xcc000000u, 0xaa000000u, 0xff000000u,
		0x80800000u, 0xc0c00000u, 0xa0a00000u, 0xf0f00000u,
		0x88880000u, 0xcccc0000u, 0xaaaa0000u, 0xffff0000u,
		0x80008000u, 0xc000c000u, 0xa000a000u, 0xf000f000u,
		0x88008800u, 0xcc00cc00u, 0xaa00aa00u, 0xff00ff00u,
		0x80808080u, 0xc0c0c0c0u, 0xa0a0a0a0u, 0xf0f0f0f0u,
		0x88888888u, 0xccccccccu, 0xaaaaaaaau, 0xffffffffu
	);

	const uint SOBOL_DIRECTIONS_2[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x60000000u, 0x90000000u,
		0xe8000000u, 0x5c000000u, 0x8e000000u, 0xc5000000u,
		0x68800000u, 0x9cc00000u, 0xee600000u, 0x55900000u,
		0x80680000u, 0xc09c0000u, 0x60ee0000u, 0x90550000u,
		0xe8808000u, 0x5cc0c000u, 0x8e606000u, 0xc5909000u,
		0x6868e800u, 0x9c9c5c00u, 0xeeee8e00u, 0x5555c500u,
		0x8000e880u, 0xc0005cc0u, 0x60008e60u, 0x9000c590u,
		0xe8006868u, 0x5c009c9cu, 0x8e00eeeeu, 0xc5005555u
	);

	const uint SOBOL_DIRECTIONS_3[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x20000000u, 0x50000000u,
		0xf8000000u, 0x74000000u, 0xa2000000u, 0x93000000u,
		0xd8800000u, 0x25400000u, 0x59e00000u, 0xe6d00000u,
		0x78080000u, 0xb40c0000u, 0x82020000u, 0xc3050000u,
		0x208f8000u, 0x51474000u, 0xfbea2000u, 0x75d93000u,
		0xa0858800u, 0x914e5400u, 0xdbe79e00u, 0x25db6d00u,
		0x58800080u, 0xe54000c0u, 0x79e00020u, 0xb6d00050u,
		0x800800f8u, 0xc00c0074u, 0x200200a2u, 0x50050093u
	);

	const uint SOBOL_DIRECTIONS_4[ 32 ] = uint[ 32 ](
		0x80000000u, 0x40000000u, 0x20000000u, 0xb0000000u,
		0xf8000000u, 0xdc000000u, 0x7a000000u, 0x9d000000u,
		0x5a800000u, 0x2fc00000u, 0xa1600000u, 0xf0b00000u,
		0xda880000u, 0x6fc40000u, 0x81620000u, 0x40bb0000u,
		0x22878000u, 0xb3c9c000u, 0xfb65a000u, 0xddb2d000u,
		0x78022800u, 0x9c0b3c00u, 0x5a0fb600u, 0x2d0ddb00u,
		0xa2878080u, 0xf3c9c040u, 0xdb65a020u, 0x6db2d0b0u,
		0x800228f8u, 0x400b3cdcu, 0x200fb67au, 0xb00ddb9du
	);

	uint getMaskedSobol( uint index, uint directions[ 32 ] ) {

		uint X = 0u;
		for ( int bit = 0; bit < 32; bit ++ ) {

			uint mask = ( index >> bit ) & 1u;
			X ^= mask * directions[ bit ];

		}
		return X;

	}

	vec4 generateSobolPoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			return vec4( 0.0 );

		}

		// NOTE: this sobol "direction" is also available but we can't write out 5 components
		// uint x = index & 0x00ffffffu;
		uint x = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_1 ) ) & 0x00ffffffu;
		uint y = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_2 ) ) & 0x00ffffffu;
		uint z = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_3 ) ) & 0x00ffffffu;
		uint w = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_4 ) ) & 0x00ffffffu;

		return vec4( x, y, z, w ) * SOBOL_FACTOR;

	}

`,Hn=`

	// Seeds
	uniform sampler2D sobolTexture;
	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;

	uint sobolGetSeed( uint bounce, uint effect ) {

		return sobolHash(
			sobolHashCombine(
				sobolHashCombine(
					sobolHash( bounce ),
					sobolPixelIndex
				),
				effect
			)
		);

	}

	vec4 sobolGetTexturePoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			index = index % SOBOL_MAX_POINTS;

		}

		uvec2 dim = uvec2( textureSize( sobolTexture, 0 ).xy );
		uint y = index / dim.x;
		uint x = index - y * dim.x;
		vec2 uv = vec2( x, y ) / vec2( dim );
		return texture( sobolTexture, uv );

	}

	${At(1)}
	${At(2)}
	${At(3)}
	${At(4)}

`;class Ln extends Ti{constructor(){super({blending:nt,uniforms:{resolution:{value:new j}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`

				${zr}
				${On}

				varying vec2 vUv;
				uniform vec2 resolution;
				void main() {

					uint index = uint( gl_FragCoord.y ) * uint( resolution.x ) + uint( gl_FragCoord.x );
					gl_FragColor = generateSobolPoint( index );

				}
			`})}}class Un{generate(e,t=256){const i=new rt(t,t,{type:G,format:V,minFilter:k,magFilter:k,generateMipmaps:!1}),n=e.getRenderTarget();e.setRenderTarget(i);const a=new $e(new Ln);return a.material.resolution.set(t,t),a.render(e),e.setRenderTarget(n),a.dispose(),i}}class Wn extends br{set bokehSize(e){this.fStop=this.getFocalLength()/e}get bokehSize(){return this.getFocalLength()/this.fStop}constructor(...e){super(...e),this.fStop=1.4,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=25,this.anamorphicRatio=1}copy(e,t){return super.copy(e,t),this.fStop=e.fStop,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio,this}}class Vn{constructor(){this.bokehSize=0,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=10,this.anamorphicRatio=1}updateFrom(e){e instanceof Wn?(this.bokehSize=e.bokehSize,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio):(this.bokehSize=0,this.apertureRotation=0,this.apertureBlades=0,this.focusDistance=10,this.anamorphicRatio=1)}}function Jt(s){const e=new Uint16Array(s.length);for(let t=0,i=s.length;t<i;++t)e[t]=le.toHalfFloat(s[t]);return e}function Ji(s,e,t=0,i=s.length){let n=t,a=t+i-1;for(;n<a;){const r=n+a>>1;s[r]<e?n=r+1:a=r}return n-t}function qn(s,e,t){return .2126*s+.7152*e+.0722*t}function Gn(s,e=ne){const t=s.clone();t.source=new Kr({...t.image});const{width:i,height:n,data:a}=t.image;let r=a;if(t.type!==e){e===ne?r=new Uint16Array(a.length):r=new Float32Array(a.length);let c;a instanceof Int8Array||a instanceof Int16Array||a instanceof Int32Array?c=2**(8*a.BYTES_PER_ELEMENT-1)-1:c=2**(8*a.BYTES_PER_ELEMENT)-1;for(let l=0,h=a.length;l<h;l++){let f=a[l];t.type===ne&&(f=le.fromHalfFloat(a[l])),t.type!==G&&t.type!==ne&&(f/=c),e===ne&&(r[l]=le.toHalfFloat(f))}t.image.data=r,t.type=e}if(t.flipY){const c=r;r=r.slice();for(let l=0;l<n;l++)for(let h=0;h<i;h++){const f=n-l-1,u=4*(l*i+h),o=4*(f*i+h);r[o+0]=c[u+0],r[o+1]=c[u+1],r[o+2]=c[u+2],r[o+3]=c[u+3]}t.flipY=!1,t.image.data=r}return t}class $n{constructor(){const e=new ee(Jt(new Float32Array([0,0,0,0])),1,1);e.type=ne,e.format=V,e.minFilter=re,e.magFilter=re,e.wrapS=pe,e.wrapT=pe,e.generateMipmaps=!1,e.needsUpdate=!0;const t=new ee(Jt(new Float32Array([0,1])),1,2);t.type=ne,t.format=Ct,t.minFilter=re,t.magFilter=re,t.generateMipmaps=!1,t.needsUpdate=!0;const i=new ee(Jt(new Float32Array([0,0,1,1])),2,2);i.type=ne,i.format=Ct,i.minFilter=re,i.magFilter=re,i.generateMipmaps=!1,i.needsUpdate=!0,this.map=e,this.marginalWeights=t,this.conditionalWeights=i,this.totalSum=0}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){const t=Gn(e);t.wrapS=pe,t.wrapT=ge;const{width:i,height:n,data:a}=t.image,r=new Float32Array(i*n),c=new Float32Array(i*n),l=new Float32Array(n),h=new Float32Array(n);let f=0,u=0;for(let d=0;d<n;d++){let b=0;for(let p=0;p<i;p++){const v=d*i+p,x=le.fromHalfFloat(a[4*v+0]),T=le.fromHalfFloat(a[4*v+1]),S=le.fromHalfFloat(a[4*v+2]),w=qn(x,T,S);b+=w,f+=w,r[v]=w,c[v]=b}if(b!==0)for(let p=d*i,v=d*i+i;p<v;p++)r[p]/=b,c[p]/=b;u+=b,l[d]=b,h[d]=u}if(u!==0)for(let d=0,b=l.length;d<b;d++)l[d]/=u,h[d]/=u;const o=new Uint16Array(n),m=new Uint16Array(i*n);for(let d=0;d<n;d++){const b=(d+1)/n,p=Ji(h,b);o[d]=le.toHalfFloat((p+.5)/n)}for(let d=0;d<n;d++)for(let b=0;b<i;b++){const p=d*i+b,v=(b+1)/i,x=Ji(c,v,d*i,i);m[p]=le.toHalfFloat((x+.5)/i)}this.dispose();const{marginalWeights:g,conditionalWeights:y}=this;g.image={width:n,height:1,data:o},g.needsUpdate=!0,y.image={width:i,height:n,data:m},y.needsUpdate=!0,this.totalSum=f,this.map=t}}const ei=6,Yn=0,jn=1,Xn=2,Qn=3,Kn=4,te=new F,Q=new F,er=new $,He=new Zr,tr=new F,Le=new F,Zn=new F(0,1,0);class Jn{constructor(){const e=new ee(new Float32Array(4),1,1);e.format=V,e.type=G,e.wrapS=ge,e.wrapT=ge,e.generateMipmaps=!1,e.minFilter=k,e.magFilter=k,this.tex=e,this.count=0}updateFrom(e,t=[]){const i=this.tex,n=Math.max(e.length*ei,1),a=Math.ceil(Math.sqrt(n));i.image.width!==a&&(i.dispose(),i.image.data=new Float32Array(a*a*4),i.image.width=a,i.image.height=a);const r=i.image.data;for(let l=0,h=e.length;l<h;l++){const f=e[l],u=l*ei*4;let o=0;for(let g=0;g<ei*4;g++)r[u+g]=0;f.getWorldPosition(Q),r[u+o++]=Q.x,r[u+o++]=Q.y,r[u+o++]=Q.z;let m=Yn;if(f.isRectAreaLight&&f.isCircular?m=jn:f.isSpotLight?m=Xn:f.isDirectionalLight?m=Qn:f.isPointLight&&(m=Kn),r[u+o++]=m,r[u+o++]=f.color.r,r[u+o++]=f.color.g,r[u+o++]=f.color.b,r[u+o++]=f.intensity,f.getWorldQuaternion(He),f.isRectAreaLight)te.set(f.width,0,0).applyQuaternion(He),r[u+o++]=te.x,r[u+o++]=te.y,r[u+o++]=te.z,o++,Q.set(0,f.height,0).applyQuaternion(He),r[u+o++]=Q.x,r[u+o++]=Q.y,r[u+o++]=Q.z,r[u+o++]=te.cross(Q).length()*(f.isCircular?Math.PI/4:1);else if(f.isSpotLight){const g=f.radius||0;tr.setFromMatrixPosition(f.matrixWorld),Le.setFromMatrixPosition(f.target.matrixWorld),er.lookAt(tr,Le,Zn),He.setFromRotationMatrix(er),te.set(1,0,0).applyQuaternion(He),r[u+o++]=te.x,r[u+o++]=te.y,r[u+o++]=te.z,o++,Q.set(0,1,0).applyQuaternion(He),r[u+o++]=Q.x,r[u+o++]=Q.y,r[u+o++]=Q.z,r[u+o++]=Math.PI*g*g,r[u+o++]=g,r[u+o++]=f.decay,r[u+o++]=f.distance,r[u+o++]=Math.cos(f.angle),r[u+o++]=Math.cos(f.angle*(1-f.penumbra)),r[u+o++]=f.iesMap?t.indexOf(f.iesMap):-1}else if(f.isPointLight){const g=te.setFromMatrixPosition(f.matrixWorld);r[u+o++]=g.x,r[u+o++]=g.y,r[u+o++]=g.z,o++,o+=4,o+=1,r[u+o++]=f.decay,r[u+o++]=f.distance}else if(f.isDirectionalLight){const g=te.setFromMatrixPosition(f.matrixWorld),y=Q.setFromMatrixPosition(f.target.matrixWorld);Le.subVectors(g,y).normalize(),r[u+o++]=Le.x,r[u+o++]=Le.y,r[u+o++]=Le.z}}this.count=e.length;const c=bi(r.buffer);return this.hash!==c?(this.hash=c,i.needsUpdate=!0,!0):!1}}function ir(s,e,t,i,n){if(e>i)throw new Error;const a=s.length/e,r=s.constructor.BYTES_PER_ELEMENT*8;let c=1;switch(s.constructor){case Uint8Array:case Uint16Array:case Uint32Array:c=2**r-1;break;case Int8Array:case Int16Array:case Int32Array:c=2**(r-1)-1;break}for(let l=0;l<a;l++){const h=4*l,f=e*l;for(let u=0;u<i;u++)t[n+h+u]=e>=u+1?s[f+u]/c:0}}class ea extends Jr{constructor(){super(),this._textures=[],this.type=G,this.format=V,this.internalFormat="RGBA32F"}updateAttribute(e,t){const i=this._textures[e];i.updateFrom(t);const n=i.image,a=this.image;if(n.width!==a.width||n.height!==a.height)throw new Error("FloatAttributeTextureArray: Attribute must be the same dimensions when updating single layer.");const{width:r,height:c,data:l}=a,f=r*c*4*e;let u=t.itemSize;u===3&&(u=4),ir(i.image.data,u,l,4,f),this.dispose(),this.needsUpdate=!0}setAttributes(e){const t=e[0].count,i=e.length;for(let u=0,o=i;u<o;u++)if(e[u].count!==t)throw new Error("FloatAttributeTextureArray: All attributes must have the same item count.");const n=this._textures;for(;n.length<i;){const u=new Fr;n.push(u)}for(;n.length>i;)n.pop();for(let u=0,o=i;u<o;u++)n[u].updateFrom(e[u]);const r=n[0].image,c=this.image;(r.width!==c.width||r.height!==c.height||r.depth!==i)&&(c.width=r.width,c.height=r.height,c.depth=i,c.data=new Float32Array(c.width*c.height*c.depth*4));const{data:l,width:h,height:f}=c;for(let u=0,o=i;u<o;u++){const m=n[u],y=h*f*4*u;let d=e[u].itemSize;d===3&&(d=4),ir(m.image.data,d,l,4,y)}this.dispose(),this.needsUpdate=!0}}class ta extends ea{updateNormalAttribute(e){this.updateAttribute(0,e)}updateTangentAttribute(e){this.updateAttribute(1,e)}updateUvAttribute(e){this.updateAttribute(2,e)}updateColorAttribute(e){this.updateAttribute(3,e)}updateFrom(e,t,i,n){this.setAttributes([e,t,i,n])}}function wi(s,e){return s.uuid<e.uuid?1:s.uuid>e.uuid?-1:0}function pi(s){return`${s.source.uuid}:${s.colorSpace}`}function ia(s){const e=new Set,t=[];for(let i=0,n=s.length;i<n;i++){const a=s[i],r=pi(a);e.has(r)||(e.add(r),t.push(a))}return t}function ra(s){const e=s.map(i=>i.iesMap||null).filter(i=>i),t=new Set(e);return Array.from(t).sort(wi)}function sa(s){const e=new Set;for(let i=0,n=s.length;i<n;i++){const a=s[i];for(const r in a){const c=a[r];c&&c.isTexture&&e.add(c)}}const t=Array.from(e);return ia(t).sort(wi)}function na(s){const e=[];return s.traverse(t=>{t.visible&&(t.isRectAreaLight||t.isSpotLight||t.isPointLight||t.isDirectionalLight)&&e.push(t)}),e.sort(wi)}const kr=45,rr=kr*4;class aa{constructor(){this._features={}}isUsed(e){return e in this._features}setUsed(e,t=!0){t===!1?delete this._features[e]:this._features[e]=!0}reset(){this._features={}}}class oa extends ee{constructor(){super(new Float32Array(4),1,1),this.format=V,this.type=G,this.wrapS=ge,this.wrapT=ge,this.minFilter=k,this.magFilter=k,this.generateMipmaps=!1,this.features=new aa}updateFrom(e,t){function i(g,y,d=-1){if(y in g&&g[y]){const b=pi(g[y]);return u[b]}else return d}function n(g,y,d){return y in g?g[y]:d}function a(g,y,d,b){const p=g[y]&&g[y].isTexture?g[y]:null;if(p){p.matrixAutoUpdate&&p.updateMatrix();const v=p.matrix.elements;let x=0;d[b+x++]=v[0],d[b+x++]=v[3],d[b+x++]=v[6],x++,d[b+x++]=v[1],d[b+x++]=v[4],d[b+x++]=v[7],x++}return 8}let r=0;const c=e.length*kr,l=Math.ceil(Math.sqrt(c))||1,{image:h,features:f}=this,u={};for(let g=0,y=t.length;g<y;g++)u[pi(t[g])]=g;h.width!==l&&(this.dispose(),h.data=new Float32Array(l*l*4),h.width=l,h.height=l);const o=h.data;f.reset();for(let g=0,y=e.length;g<y;g++){const d=e[g];if(d.isFogVolumeMaterial){f.setUsed("FOG");for(let v=0;v<rr;v++)o[r+v]=0;o[r+0+0]=d.color.r,o[r+0+1]=d.color.g,o[r+0+2]=d.color.b,o[r+8+3]=n(d,"emissiveIntensity",0),o[r+12+0]=d.emissive.r,o[r+12+1]=d.emissive.g,o[r+12+2]=d.emissive.b,o[r+52+1]=d.density,o[r+52+3]=0,o[r+56+2]=4,r+=rr;continue}o[r++]=d.color.r,o[r++]=d.color.g,o[r++]=d.color.b,o[r++]=i(d,"map"),o[r++]=n(d,"metalness",0),o[r++]=i(d,"metalnessMap"),o[r++]=n(d,"roughness",0),o[r++]=i(d,"roughnessMap"),o[r++]=n(d,"ior",1.5),o[r++]=n(d,"transmission",0),o[r++]=i(d,"transmissionMap"),o[r++]=n(d,"emissiveIntensity",0),"emissive"in d?(o[r++]=d.emissive.r,o[r++]=d.emissive.g,o[r++]=d.emissive.b):(o[r++]=0,o[r++]=0,o[r++]=0),o[r++]=i(d,"emissiveMap"),o[r++]=i(d,"normalMap"),"normalScale"in d?(o[r++]=d.normalScale.x,o[r++]=d.normalScale.y):(o[r++]=1,o[r++]=1),o[r++]=n(d,"clearcoat",0),o[r++]=i(d,"clearcoatMap"),o[r++]=n(d,"clearcoatRoughness",0),o[r++]=i(d,"clearcoatRoughnessMap"),o[r++]=i(d,"clearcoatNormalMap"),"clearcoatNormalScale"in d?(o[r++]=d.clearcoatNormalScale.x,o[r++]=d.clearcoatNormalScale.y):(o[r++]=1,o[r++]=1),r++,o[r++]=n(d,"sheen",0),"sheenColor"in d?(o[r++]=d.sheenColor.r,o[r++]=d.sheenColor.g,o[r++]=d.sheenColor.b):(o[r++]=0,o[r++]=0,o[r++]=0),o[r++]=i(d,"sheenColorMap"),o[r++]=n(d,"sheenRoughness",0),o[r++]=i(d,"sheenRoughnessMap"),o[r++]=i(d,"iridescenceMap"),o[r++]=i(d,"iridescenceThicknessMap"),o[r++]=n(d,"iridescence",0),o[r++]=n(d,"iridescenceIOR",1.3);const b=n(d,"iridescenceThicknessRange",[100,400]);o[r++]=b[0],o[r++]=b[1],"specularColor"in d?(o[r++]=d.specularColor.r,o[r++]=d.specularColor.g,o[r++]=d.specularColor.b):(o[r++]=1,o[r++]=1,o[r++]=1),o[r++]=i(d,"specularColorMap"),o[r++]=n(d,"specularIntensity",1),o[r++]=i(d,"specularIntensityMap");const p=n(d,"thickness",0)===0&&n(d,"attenuationDistance",1/0)===1/0;if(o[r++]=Number(p),r++,"attenuationColor"in d?(o[r++]=d.attenuationColor.r,o[r++]=d.attenuationColor.g,o[r++]=d.attenuationColor.b):(o[r++]=1,o[r++]=1,o[r++]=1),o[r++]=n(d,"attenuationDistance",1/0),o[r++]=i(d,"alphaMap"),o[r++]=d.opacity,o[r++]=d.alphaTest,!p&&d.transmission>0)o[r++]=0;else switch(d.side){case ti:o[r++]=1;break;case mr:o[r++]=-1;break;case pr:o[r++]=0;break}o[r++]=Number(n(d,"matte",!1)),o[r++]=Number(n(d,"castShadow",!0)),o[r++]=Number(d.vertexColors)|Number(d.flatShading)<<1,o[r++]=Number(d.transparent),r+=a(d,"map",o,r),r+=a(d,"metalnessMap",o,r),r+=a(d,"roughnessMap",o,r),r+=a(d,"transmissionMap",o,r),r+=a(d,"emissiveMap",o,r),r+=a(d,"normalMap",o,r),r+=a(d,"clearcoatMap",o,r),r+=a(d,"clearcoatNormalMap",o,r),r+=a(d,"clearcoatRoughnessMap",o,r),r+=a(d,"sheenColorMap",o,r),r+=a(d,"sheenRoughnessMap",o,r),r+=a(d,"iridescenceMap",o,r),r+=a(d,"iridescenceThicknessMap",o,r),r+=a(d,"specularColorMap",o,r),r+=a(d,"specularIntensityMap",o,r)}const m=bi(o.buffer);return this.hash!==m?(this.hash=m,this.needsUpdate=!0,!0):!1}}const sr=new at;function ca(s){return s?`${s.uuid}:${s.version}`:null}function la(s,e){for(const t in e)t in s&&(s[t]=e[t])}class nr extends es{constructor(e,t,i){const n={format:V,type:ii,minFilter:re,magFilter:re,wrapS:pe,wrapT:pe,generateMipmaps:!1,...i};super(e,t,1,n),la(this.texture,n),this.texture.setTextures=(...r)=>{this.setTextures(...r)},this.hashes=[null];const a=new $e(new ua);this.fsQuad=a}setTextures(e,t,i=this.width,n=this.height){const a=e.getRenderTarget(),r=e.toneMapping,c=e.getClearAlpha();e.getClearColor(sr);const l=t.length||1;(i!==this.width||n!==this.height||this.depth!==l)&&(this.setSize(i,n,l),this.hashes=new Array(l).fill(null)),e.setClearColor(0,0),e.toneMapping=ts;const h=this.fsQuad,f=this.hashes;let u=!1;for(let o=0,m=l;o<m;o++){const g=t[o],y=ca(g);g&&(f[o]!==y||g.isWebGLRenderTarget)&&(g.matrixAutoUpdate=!1,g.matrix.identity(),h.material.map=g,e.setRenderTarget(this,o),h.render(e),g.updateMatrix(),g.matrixAutoUpdate=!0,f[o]=y,u=!0)}return h.material.map=null,e.setClearColor(sr,c),e.setRenderTarget(a),e.toneMapping=r,u}dispose(){super.dispose(),this.fsQuad.dispose()}}class ua extends Bt{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}constructor(){super({uniforms:{map:{value:null}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				varying vec2 vUv;
				void main() {

					gl_FragColor = texture2D( map, vUv );

				}
			`})}}function fa(s,e=Math.random()){for(let t=s.length-1;t>0;t--){const i=Math.floor(e()*(t+1)),n=s[t];s[t]=s[i],s[i]=n}return s}class ha{constructor(e,t,i=Math.random){const n=e**t,a=new Uint16Array(n);let r=n;for(let c=0;c<n;c++)a[c]=c;this.samples=new Float32Array(t),this.strataCount=e,this.reset=function(){for(let c=0;c<n;c++)a[c]=c;r=0},this.reshuffle=function(){r=0},this.next=function(){const{samples:c}=this;r>=a.length&&(fa(a,i),this.reshuffle());let l=a[r++];for(let h=0;h<t;h++)c[h]=(l%e+i())/e,l=Math.floor(l/e);return c}}}class da{constructor(e,t,i=Math.random){let n=0;for(const l of t)n+=l;const a=new Float32Array(n),r=[];let c=0;for(const l of t){const h=new ha(e,l,i);h.samples=new Float32Array(a.buffer,c,h.samples.length),c+=h.samples.length*4,r.push(h)}this.samples=a,this.strataCount=e,this.next=function(){for(const l of r)l.next();return a},this.reshuffle=function(){for(const l of r)l.reshuffle()},this.reset=function(){for(const l of r)l.reset()}}}class ma{constructor(e=0){this.m=2147483648,this.a=1103515245,this.c=12345,this.seed=e}nextInt(){return this.seed=(this.a*this.seed+this.c)%this.m,this.seed}nextFloat(){return this.nextInt()/(this.m-1)}}class pa extends ee{constructor(e=1,t=1,i=8){super(new Float32Array(1),1,1,V,G),this.minFilter=k,this.magFilter=k,this.strata=i,this.sampler=null,this.generator=new ma,this.stableNoise=!1,this.random=()=>this.stableNoise?this.generator.nextFloat():Math.random(),this.init(e,t,i)}init(e=this.image.height,t=this.image.width,i=this.strata){const{image:n}=this;if(n.width===t&&n.height===e&&this.sampler!==null)return;const a=new Array(e*t).fill(4),r=new da(i,a,this.random);n.width=t,n.height=e,n.data=r.samples,this.sampler=r,this.dispose(),this.next()}next(){this.sampler.next(),this.needsUpdate=!0}reset(){this.sampler.reset(),this.generator.seed=0}}function ga(s,e=Math.random){for(let t=s.length-1;t>0;t--){const i=~~((e()-1e-6)*t),n=s[t];s[t]=s[i],s[i]=n}}function va(s,e){s.fill(0);for(let t=0;t<e;t++)s[t]=1}class ar{constructor(e){this.count=0,this.size=-1,this.sigma=-1,this.radius=-1,this.lookupTable=null,this.score=null,this.binaryPattern=null,this.resize(e),this.setSigma(1.5)}findVoid(){const{score:e,binaryPattern:t}=this;let i=1/0,n=-1;for(let a=0,r=t.length;a<r;a++){if(t[a]!==0)continue;const c=e[a];c<i&&(i=c,n=a)}return n}findCluster(){const{score:e,binaryPattern:t}=this;let i=-1/0,n=-1;for(let a=0,r=t.length;a<r;a++){if(t[a]!==1)continue;const c=e[a];c>i&&(i=c,n=a)}return n}setSigma(e){if(e===this.sigma)return;const t=~~(Math.sqrt(20*e**2)+1),i=2*t+1,n=new Float32Array(i*i),a=e*e;for(let r=-t;r<=t;r++)for(let c=-t;c<=t;c++){const l=(t+c)*i+r+t,h=r*r+c*c;n[l]=Math.E**(-h/(2*a))}this.lookupTable=n,this.sigma=e,this.radius=t}resize(e){this.size!==e&&(this.size=e,this.score=new Float32Array(e*e),this.binaryPattern=new Uint8Array(e*e))}invert(){const{binaryPattern:e,score:t,size:i}=this;t.fill(0);for(let n=0,a=e.length;n<a;n++)if(e[n]===0){const r=~~(n/i),c=n-r*i;this.updateScore(c,r,1),e[n]=1}else e[n]=0}updateScore(e,t,i){const{size:n,score:a,lookupTable:r}=this,c=this.radius,l=2*c+1;for(let h=-c;h<=c;h++)for(let f=-c;f<=c;f++){const u=(c+f)*l+h+c,o=r[u];let m=e+h;m=m<0?n+m:m%n;let g=t+f;g=g<0?n+g:g%n;const y=g*n+m;a[y]+=i*o}}addPointIndex(e){this.binaryPattern[e]=1;const t=this.size,i=~~(e/t),n=e-i*t;this.updateScore(n,i,1),this.count++}removePointIndex(e){this.binaryPattern[e]=0;const t=this.size,i=~~(e/t),n=e-i*t;this.updateScore(n,i,-1),this.count--}copy(e){this.resize(e.size),this.score.set(e.score),this.binaryPattern.set(e.binaryPattern),this.setSigma(e.sigma),this.count=e.count}}class xa{constructor(){this.random=Math.random,this.sigma=1.5,this.size=64,this.majorityPointsRatio=.1,this.samples=new ar(1),this.savedSamples=new ar(1)}generate(){const{samples:e,savedSamples:t,sigma:i,majorityPointsRatio:n,size:a}=this;e.resize(a),e.setSigma(i);const r=Math.floor(a*a*n),c=e.binaryPattern;va(c,r),ga(c,this.random);for(let u=0,o=c.length;u<o;u++)c[u]===1&&e.addPointIndex(u);for(;;){const u=e.findCluster();e.removePointIndex(u);const o=e.findVoid();if(u===o){e.addPointIndex(u);break}e.addPointIndex(o)}const l=new Uint32Array(a*a);t.copy(e);let h;for(h=e.count-1;h>=0;){const u=e.findCluster();e.removePointIndex(u),l[u]=h,h--}const f=a*a;for(h=t.count;h<f/2;){const u=t.findVoid();t.addPointIndex(u),l[u]=h,h++}for(t.invert();h<f;){const u=t.findCluster();t.removePointIndex(u),l[u]=h,h++}return{data:l,maxValue:f}}}function ya(s){return s>=3?4:s}function ba(s){switch(s){case 1:return Ct;case 2:return xr;default:return V}}class Ta extends ee{constructor(e=64,t=1){super(new Float32Array(4),1,1,V,G),this.minFilter=k,this.magFilter=k,this.size=e,this.channels=t,this.update()}update(){const e=this.channels,t=this.size,i=new xa;i.channels=e,i.size=t;const n=ya(e),a=ba(n);(this.image.width!==t||a!==this.format)&&(this.image.width=t,this.image.height=t,this.image.data=new Float32Array(t**2*n),this.format=a,this.dispose());const r=this.image.data;for(let c=0,l=e;c<l;c++){const h=i.generate(),f=h.data,u=h.maxValue;for(let o=0,m=f.length;o<m;o++){const g=f[o]/u;r[o*n+c]=g}}this.needsUpdate=!0}}const wa=`

	struct PhysicalCamera {

		float focusDistance;
		float anamorphicRatio;
		float bokehSize;
		int apertureBlades;
		float apertureRotation;

	};

`,Sa=`

	struct EquirectHdrInfo {

		sampler2D marginalWeights;
		sampler2D conditionalWeights;
		sampler2D map;

		float totalSum;

	};

`,_a=`

	#define RECT_AREA_LIGHT_TYPE 0
	#define CIRC_AREA_LIGHT_TYPE 1
	#define SPOT_LIGHT_TYPE 2
	#define DIR_LIGHT_TYPE 3
	#define POINT_LIGHT_TYPE 4

	struct LightsInfo {

		sampler2D tex;
		uint count;

	};

	struct Light {

		vec3 position;
		int type;

		vec3 color;
		float intensity;

		vec3 u;
		vec3 v;
		float area;

		// spot light fields
		float radius;
		float near;
		float decay;
		float distance;
		float coneCos;
		float penumbraCos;
		int iesProfile;

	};

	Light readLightInfo( sampler2D tex, uint index ) {

		uint i = index * 6u;

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );

		Light l;
		l.position = s0.rgb;
		l.type = int( round( s0.a ) );

		l.color = s1.rgb;
		l.intensity = s1.a;

		l.u = s2.rgb;
		l.v = s3.rgb;
		l.area = s3.a;

		if ( l.type == SPOT_LIGHT_TYPE || l.type == POINT_LIGHT_TYPE ) {

			vec4 s4 = texelFetch1D( tex, i + 4u );
			vec4 s5 = texelFetch1D( tex, i + 5u );
			l.radius = s4.r;
			l.decay = s4.g;
			l.distance = s4.b;
			l.coneCos = s4.a;

			l.penumbraCos = s5.r;
			l.iesProfile = int( round( s5.g ) );

		} else {

			l.radius = 0.0;
			l.decay = 0.0;
			l.distance = 0.0;

			l.coneCos = 0.0;
			l.penumbraCos = 0.0;
			l.iesProfile = - 1;

		}

		return l;

	}

`,Aa=`

	struct Material {

		vec3 color;
		int map;

		float metalness;
		int metalnessMap;

		float roughness;
		int roughnessMap;

		float ior;
		float transmission;
		int transmissionMap;

		float emissiveIntensity;
		vec3 emissive;
		int emissiveMap;

		int normalMap;
		vec2 normalScale;

		float clearcoat;
		int clearcoatMap;
		int clearcoatNormalMap;
		vec2 clearcoatNormalScale;
		float clearcoatRoughness;
		int clearcoatRoughnessMap;

		int iridescenceMap;
		int iridescenceThicknessMap;
		float iridescence;
		float iridescenceIor;
		float iridescenceThicknessMinimum;
		float iridescenceThicknessMaximum;

		vec3 specularColor;
		int specularColorMap;

		float specularIntensity;
		int specularIntensityMap;
		bool thinFilm;

		vec3 attenuationColor;
		float attenuationDistance;

		int alphaMap;

		bool castShadow;
		float opacity;
		float alphaTest;

		float side;
		bool matte;

		float sheen;
		vec3 sheenColor;
		int sheenColorMap;
		float sheenRoughness;
		int sheenRoughnessMap;

		bool vertexColors;
		bool flatShading;
		bool transparent;
		bool fogVolume;

		mat3 mapTransform;
		mat3 metalnessMapTransform;
		mat3 roughnessMapTransform;
		mat3 transmissionMapTransform;
		mat3 emissiveMapTransform;
		mat3 normalMapTransform;
		mat3 clearcoatMapTransform;
		mat3 clearcoatNormalMapTransform;
		mat3 clearcoatRoughnessMapTransform;
		mat3 sheenColorMapTransform;
		mat3 sheenRoughnessMapTransform;
		mat3 iridescenceMapTransform;
		mat3 iridescenceThicknessMapTransform;
		mat3 specularColorMapTransform;
		mat3 specularIntensityMapTransform;

	};

	mat3 readTextureTransform( sampler2D tex, uint index ) {

		mat3 textureTransform;

		vec4 row1 = texelFetch1D( tex, index );
		vec4 row2 = texelFetch1D( tex, index + 1u );

		textureTransform[0] = vec3(row1.r, row2.r, 0.0);
		textureTransform[1] = vec3(row1.g, row2.g, 0.0);
		textureTransform[2] = vec3(row1.b, row2.b, 1.0);

		return textureTransform;

	}

	Material readMaterialInfo( sampler2D tex, uint index ) {

		uint i = index * 45u;

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );
		vec4 s4 = texelFetch1D( tex, i + 4u );
		vec4 s5 = texelFetch1D( tex, i + 5u );
		vec4 s6 = texelFetch1D( tex, i + 6u );
		vec4 s7 = texelFetch1D( tex, i + 7u );
		vec4 s8 = texelFetch1D( tex, i + 8u );
		vec4 s9 = texelFetch1D( tex, i + 9u );
		vec4 s10 = texelFetch1D( tex, i + 10u );
		vec4 s11 = texelFetch1D( tex, i + 11u );
		vec4 s12 = texelFetch1D( tex, i + 12u );
		vec4 s13 = texelFetch1D( tex, i + 13u );
		vec4 s14 = texelFetch1D( tex, i + 14u );

		Material m;
		m.color = s0.rgb;
		m.map = int( round( s0.a ) );

		m.metalness = s1.r;
		m.metalnessMap = int( round( s1.g ) );
		m.roughness = s1.b;
		m.roughnessMap = int( round( s1.a ) );

		m.ior = s2.r;
		m.transmission = s2.g;
		m.transmissionMap = int( round( s2.b ) );
		m.emissiveIntensity = s2.a;

		m.emissive = s3.rgb;
		m.emissiveMap = int( round( s3.a ) );

		m.normalMap = int( round( s4.r ) );
		m.normalScale = s4.gb;

		m.clearcoat = s4.a;
		m.clearcoatMap = int( round( s5.r ) );
		m.clearcoatRoughness = s5.g;
		m.clearcoatRoughnessMap = int( round( s5.b ) );
		m.clearcoatNormalMap = int( round( s5.a ) );
		m.clearcoatNormalScale = s6.rg;

		m.sheen = s6.a;
		m.sheenColor = s7.rgb;
		m.sheenColorMap = int( round( s7.a ) );
		m.sheenRoughness = s8.r;
		m.sheenRoughnessMap = int( round( s8.g ) );

		m.iridescenceMap = int( round( s8.b ) );
		m.iridescenceThicknessMap = int( round( s8.a ) );
		m.iridescence = s9.r;
		m.iridescenceIor = s9.g;
		m.iridescenceThicknessMinimum = s9.b;
		m.iridescenceThicknessMaximum = s9.a;

		m.specularColor = s10.rgb;
		m.specularColorMap = int( round( s10.a ) );

		m.specularIntensity = s11.r;
		m.specularIntensityMap = int( round( s11.g ) );
		m.thinFilm = bool( s11.b );

		m.attenuationColor = s12.rgb;
		m.attenuationDistance = s12.a;

		m.alphaMap = int( round( s13.r ) );

		m.opacity = s13.g;
		m.alphaTest = s13.b;
		m.side = s13.a;

		m.matte = bool( s14.r );
		m.castShadow = bool( s14.g );
		m.vertexColors = bool( int( s14.b ) & 1 );
		m.flatShading = bool( int( s14.b ) & 2 );
		m.fogVolume = bool( int( s14.b ) & 4 );
		m.transparent = bool( s14.a );

		uint firstTextureTransformIdx = i + 15u;

		// mat3( 1.0 ) is an identity matrix
		m.mapTransform = m.map == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx );
		m.metalnessMapTransform = m.metalnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 2u );
		m.roughnessMapTransform = m.roughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 4u );
		m.transmissionMapTransform = m.transmissionMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 6u );
		m.emissiveMapTransform = m.emissiveMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 8u );
		m.normalMapTransform = m.normalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 10u );
		m.clearcoatMapTransform = m.clearcoatMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 12u );
		m.clearcoatNormalMapTransform = m.clearcoatNormalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 14u );
		m.clearcoatRoughnessMapTransform = m.clearcoatRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 16u );
		m.sheenColorMapTransform = m.sheenColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 18u );
		m.sheenRoughnessMapTransform = m.sheenRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 20u );
		m.iridescenceMapTransform = m.iridescenceMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 22u );
		m.iridescenceThicknessMapTransform = m.iridescenceThicknessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 24u );
		m.specularColorMapTransform = m.specularColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 26u );
		m.specularIntensityMapTransform = m.specularIntensityMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 28u );

		return m;

	}

`,Ia=`

	struct SurfaceRecord {

		// surface type
		bool volumeParticle;

		// geometry
		vec3 faceNormal;
		bool frontFace;
		vec3 normal;
		mat3 normalBasis;
		mat3 normalInvBasis;

		// cached properties
		float eta;
		float f0;

		// material
		float roughness;
		float filteredRoughness;
		float metalness;
		vec3 color;
		vec3 emission;

		// transmission
		float ior;
		float transmission;
		bool thinFilm;
		vec3 attenuationColor;
		float attenuationDistance;

		// clearcoat
		vec3 clearcoatNormal;
		mat3 clearcoatBasis;
		mat3 clearcoatInvBasis;
		float clearcoat;
		float clearcoatRoughness;
		float filteredClearcoatRoughness;

		// sheen
		float sheen;
		vec3 sheenColor;
		float sheenRoughness;

		// iridescence
		float iridescence;
		float iridescenceIor;
		float iridescenceThickness;

		// specular
		vec3 specularColor;
		float specularIntensity;
	};

	struct ScatterRecord {
		float specularPdf;
		float pdf;
		vec3 direction;
		vec3 color;
	};

`,Ra=`

	// samples the the given environment map in the given direction
	vec3 sampleEquirectColor( sampler2D envMap, vec3 direction ) {

		return texture2D( envMap, equirectDirectionToUv( direction ) ).rgb;

	}

	// gets the pdf of the given direction to sample
	float equirectDirectionPdf( vec3 direction ) {

		vec2 uv = equirectDirectionToUv( direction );
		float theta = uv.y * PI;
		float sinTheta = sin( theta );
		if ( sinTheta == 0.0 ) {

			return 0.0;

		}

		return 1.0 / ( 2.0 * PI * PI * sinTheta );

	}

	// samples the color given env map with CDF and returns the pdf of the direction
	float sampleEquirect( vec3 direction, inout vec3 color ) {

		float totalSum = envMapInfo.totalSum;
		if ( totalSum == 0.0 ) {

			color = vec3( 0.0 );
			return 1.0;

		}

		vec2 uv = equirectDirectionToUv( direction );
		color = texture2D( envMapInfo.map, uv ).rgb;

		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}

	// samples a direction of the envmap with color and retrieves pdf
	float sampleEquirectProbability( vec2 r, inout vec3 color, inout vec3 direction ) {

		// sample env map cdf
		float v = texture2D( envMapInfo.marginalWeights, vec2( r.x, 0.0 ) ).x;
		float u = texture2D( envMapInfo.conditionalWeights, vec2( r.y, v ) ).x;
		vec2 uv = vec2( u, v );

		vec3 derivedDirection = equirectUvToDirection( uv );
		direction = derivedDirection;
		color = texture2D( envMapInfo.map, uv ).rgb;

		float totalSum = envMapInfo.totalSum;
		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}
`,Ma=`

	float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

		return smoothstep( coneCosine, penumbraCosine, angleCosine );

	}

	float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), EPSILON );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	}

	float getPhotometricAttenuation( sampler2DArray iesProfiles, int iesProfile, vec3 posToLight, vec3 lightDir, vec3 u, vec3 v ) {

		float cosTheta = dot( posToLight, lightDir );
		float angle = acos( cosTheta ) / PI;

		return texture2D( iesProfiles, vec3( angle, 0.0, iesProfile ) ).r;

	}

	struct LightRecord {

		float dist;
		vec3 direction;
		float pdf;
		vec3 emission;
		int type;

	};

	bool intersectLightAtIndex( sampler2D lights, vec3 rayOrigin, vec3 rayDirection, uint l, inout LightRecord lightRec ) {

		bool didHit = false;
		Light light = readLightInfo( lights, l );

		vec3 u = light.u;
		vec3 v = light.v;

		// check for backface
		vec3 normal = normalize( cross( u, v ) );
		if ( dot( normal, rayDirection ) > 0.0 ) {

			u *= 1.0 / dot( u, u );
			v *= 1.0 / dot( v, v );

			float dist;

			// MIS / light intersection is not supported for punctual lights.
			if(
				( light.type == RECT_AREA_LIGHT_TYPE && intersectsRectangle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) ) ||
				( light.type == CIRC_AREA_LIGHT_TYPE && intersectsCircle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) )
			) {

				float cosTheta = dot( rayDirection, normal );
				didHit = true;
				lightRec.dist = dist;
				lightRec.pdf = ( dist * dist ) / ( light.area * cosTheta );
				lightRec.emission = light.color * light.intensity;
				lightRec.direction = rayDirection;
				lightRec.type = light.type;

			}

		}

		return didHit;

	}

	LightRecord randomAreaLightSample( Light light, vec3 rayOrigin, vec2 ruv ) {

		vec3 randomPos;
		if( light.type == RECT_AREA_LIGHT_TYPE ) {

			// rectangular area light
			randomPos = light.position + light.u * ( ruv.x - 0.5 ) + light.v * ( ruv.y - 0.5 );

		} else if( light.type == CIRC_AREA_LIGHT_TYPE ) {

			// circular area light
			float r = 0.5 * sqrt( ruv.x );
			float theta = ruv.y * 2.0 * PI;
			float x = r * cos( theta );
			float y = r * sin( theta );

			randomPos = light.position + light.u * x + light.v * y;

		}

		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );
		vec3 direction = toLight / dist;
		vec3 lightNormal = normalize( cross( light.u, light.v ) );

		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.emission = light.color * light.intensity;
		lightRec.dist = dist;
		lightRec.direction = direction;

		// TODO: the denominator is potentially zero
		lightRec.pdf = lightDistSq / ( light.area * dot( direction, lightNormal ) );

		return lightRec;

	}

	LightRecord randomSpotLightSample( Light light, sampler2DArray iesProfiles, vec3 rayOrigin, vec2 ruv ) {

		float radius = light.radius * sqrt( ruv.x );
		float theta = ruv.y * 2.0 * PI;
		float x = radius * cos( theta );
		float y = radius * sin( theta );

		vec3 u = light.u;
		vec3 v = light.v;
		vec3 normal = normalize( cross( u, v ) );

		float angle = acos( light.coneCos );
		float angleTan = tan( angle );
		float startDistance = light.radius / max( angleTan, EPSILON );

		vec3 randomPos = light.position - normal * startDistance + u * x + v * y;
		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );

		vec3 direction = toLight / max( dist, EPSILON );
		float cosTheta = dot( direction, normal );

		float spotAttenuation = light.iesProfile != - 1 ?
			getPhotometricAttenuation( iesProfiles, light.iesProfile, direction, normal, u, v ) :
			getSpotAttenuation( light.coneCos, light.penumbraCos, cosTheta );

		float distanceAttenuation = getDistanceAttenuation( dist, light.distance, light.decay );
		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.dist = dist;
		lightRec.direction = direction;
		lightRec.emission = light.color * light.intensity * distanceAttenuation * spotAttenuation;
		lightRec.pdf = 1.0;

		return lightRec;

	}

	LightRecord randomLightSample( sampler2D lights, sampler2DArray iesProfiles, uint lightCount, vec3 rayOrigin, vec3 ruv ) {

		LightRecord result;

		// pick a random light
		uint l = uint( ruv.x * float( lightCount ) );
		Light light = readLightInfo( lights, l );

		if ( light.type == SPOT_LIGHT_TYPE ) {

			result = randomSpotLightSample( light, iesProfiles, rayOrigin, ruv.yz );

		} else if ( light.type == POINT_LIGHT_TYPE ) {

			vec3 lightRay = light.u - rayOrigin;
			float lightDist = length( lightRay );
			float cutoffDistance = light.distance;
			float distanceFalloff = 1.0 / max( pow( lightDist, light.decay ), 0.01 );
			if ( cutoffDistance > 0.0 ) {

				distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDist / cutoffDistance ) ) );

			}

			LightRecord rec;
			rec.direction = normalize( lightRay );
			rec.dist = length( lightRay );
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity * distanceFalloff;
			rec.type = light.type;
			result = rec;

		} else if ( light.type == DIR_LIGHT_TYPE ) {

			LightRecord rec;
			rec.dist = 1e10;
			rec.direction = light.u;
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity;
			rec.type = light.type;

			result = rec;

		} else {

			// sample the light
			result = randomAreaLightSample( light, rayOrigin, ruv.yz );

		}

		return result;

	}

`,Pa=`

	vec3 sampleHemisphere( vec3 n, vec2 uv ) {

		// https://www.rorydriscoll.com/2009/01/07/better-sampling/
		// https://graphics.pixar.com/library/OrthonormalB/paper.pdf
		float sign = n.z == 0.0 ? 1.0 : sign( n.z );
		float a = - 1.0 / ( sign + n.z );
		float b = n.x * n.y * a;
		vec3 b1 = vec3( 1.0 + sign * n.x * n.x * a, sign * b, - sign * n.x );
		vec3 b2 = vec3( b, sign + n.y * n.y * a, - n.y );

		float r = sqrt( uv.x );
		float theta = 2.0 * PI * uv.y;
		float x = r * cos( theta );
		float y = r * sin( theta );
		return x * b1 + y * b2 + sqrt( 1.0 - uv.x ) * n;

	}

	vec2 sampleTriangle( vec2 a, vec2 b, vec2 c, vec2 r ) {

		// get the edges of the triangle and the diagonal across the
		// center of the parallelogram
		vec2 e1 = a - b;
		vec2 e2 = c - b;
		vec2 diag = normalize( e1 + e2 );

		// pick the point in the parallelogram
		if ( r.x + r.y > 1.0 ) {

			r = vec2( 1.0 ) - r;

		}

		return e1 * r.x + e2 * r.y;

	}

	vec2 sampleCircle( vec2 uv ) {

		float angle = 2.0 * PI * uv.x;
		float radius = sqrt( uv.y );
		return vec2( cos( angle ), sin( angle ) ) * radius;

	}

	vec3 sampleSphere( vec2 uv ) {

		float u = ( uv.x - 0.5 ) * 2.0;
		float t = uv.y * PI * 2.0;
		float f = sqrt( 1.0 - u * u );

		return vec3( f * cos( t ), f * sin( t ), u );

	}

	vec2 sampleRegularPolygon( int sides, vec3 uvw ) {

		sides = max( sides, 3 );

		vec3 r = uvw;
		float anglePerSegment = 2.0 * PI / float( sides );
		float segment = floor( float( sides ) * r.x );

		float angle1 = anglePerSegment * segment;
		float angle2 = angle1 + anglePerSegment;
		vec2 a = vec2( sin( angle1 ), cos( angle1 ) );
		vec2 b = vec2( 0.0, 0.0 );
		vec2 c = vec2( sin( angle2 ), cos( angle2 ) );

		return sampleTriangle( a, b, c, r.yz );

	}

	// samples an aperture shape with the given number of sides. 0 means circle
	vec2 sampleAperture( int blades, vec3 uvw ) {

		return blades == 0 ?
			sampleCircle( uvw.xy ) :
			sampleRegularPolygon( blades, uvw );

	}


`,Ca=`

	bool totalInternalReflection( float cosTheta, float eta ) {

		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		return eta * sinTheta > 1.0;

	}

	// https://google.github.io/filament/Filament.md.html#materialsystem/diffusebrdf
	float schlickFresnel( float cosine, float f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0, vec3 f90 ) {

		return f0 + ( f90 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	float dielectricFresnel( float cosThetaI, float eta ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float ni = eta;
		float nt = 1.0;

		// Check for total internal reflection
		float sinThetaISq = 1.0f - cosThetaI * cosThetaI;
		float sinThetaTSq = eta * eta * sinThetaISq;
		if( sinThetaTSq >= 1.0 ) {

			return 1.0;

		}

		float sinThetaT = sqrt( sinThetaTSq );

		float cosThetaT = sqrt( max( 0.0, 1.0f - sinThetaT * sinThetaT ) );
		float rParallel = ( ( nt * cosThetaI ) - ( ni * cosThetaT ) ) / ( ( nt * cosThetaI ) + ( ni * cosThetaT ) );
		float rPerpendicular = ( ( ni * cosThetaI ) - ( nt * cosThetaT ) ) / ( ( ni * cosThetaI ) + ( nt * cosThetaT ) );
		return ( rParallel * rParallel + rPerpendicular * rPerpendicular ) / 2.0;

	}

	// https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics/schlickapproximation
	float iorRatioToF0( float eta ) {

		return pow( ( 1.0 - eta ) / ( 1.0 + eta ), 2.0 );

	}

	vec3 evaluateFresnel( float cosTheta, float eta, vec3 f0, vec3 f90 ) {

		if ( totalInternalReflection( cosTheta, eta ) ) {

			return f90;

		}

		return schlickFresnel( cosTheta, f0, f90 );

	}

	// TODO: disney fresnel was removed and replaced with this fresnel function to better align with
	// the glTF but is causing blown out pixels. Should be revisited
	// float evaluateFresnelWeight( float cosTheta, float eta, float f0 ) {

	// 	if ( totalInternalReflection( cosTheta, eta ) ) {

	// 		return 1.0;

	// 	}

	// 	return schlickFresnel( cosTheta, f0 );

	// }

	// https://schuttejoe.github.io/post/disneybsdf/
	float disneyFresnel( vec3 wo, vec3 wi, vec3 wh, float f0, float eta, float metalness ) {

		float dotHV = dot( wo, wh );
		if ( totalInternalReflection( dotHV, eta ) ) {

			return 1.0;

		}

		float dotHL = dot( wi, wh );
		float dielectricFresnel = dielectricFresnel( abs( dotHV ), eta );
		float metallicFresnel = schlickFresnel( dotHL, f0 );

		return mix( dielectricFresnel, metallicFresnel, metalness );

	}

`,Fa=`

	// Fast arccos approximation used to remove banding artifacts caused by numerical errors in acos.
	// This is a cubic Lagrange interpolating polynomial for x = [-1, -1/2, 0, 1/2, 1].
	// For more information see: https://github.com/gkjohnson/three-gpu-pathtracer/pull/171#issuecomment-1152275248
	float acosApprox( float x ) {

		x = clamp( x, -1.0, 1.0 );
		return ( - 0.69813170079773212 * x * x - 0.87266462599716477 ) * x + 1.5707963267948966;

	}

	// An acos with input values bound to the range [-1, 1].
	float acosSafe( float x ) {

		return acos( clamp( x, -1.0, 1.0 ) );

	}

	float saturateCos( float val ) {

		return clamp( val, 0.001, 1.0 );

	}

	float square( float t ) {

		return t * t;

	}

	vec2 square( vec2 t ) {

		return t * t;

	}

	vec3 square( vec3 t ) {

		return t * t;

	}

	vec4 square( vec4 t ) {

		return t * t;

	}

	vec2 rotateVector( vec2 v, float t ) {

		float ac = cos( t );
		float as = sin( t );
		return vec2(
			v.x * ac - v.y * as,
			v.x * as + v.y * ac
		);

	}

	// forms a basis with the normal vector as Z
	mat3 getBasisFromNormal( vec3 normal ) {

		vec3 other;
		if ( abs( normal.x ) > 0.5 ) {

			other = vec3( 0.0, 1.0, 0.0 );

		} else {

			other = vec3( 1.0, 0.0, 0.0 );

		}

		vec3 ortho = normalize( cross( normal, other ) );
		vec3 ortho2 = normalize( cross( normal, ortho ) );
		return mat3( ortho2, ortho, normal );

	}

`,Da=`

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the rectangle on that same plane.
	// Plane intersection: https://lousodrome.net/blog/light/2020/07/03/intersection-of-a-ray-and-a-plane/
	bool intersectsRectangle( vec3 center, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( center - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 p = rayOrigin + rayDirection * t;
			vec3 vi = p - center;

			// check if p falls inside the rectangle
			float a1 = dot( u, vi );
			if ( abs( a1 ) <= 0.5 ) {

				float a2 = dot( v, vi );
				if ( abs( a2 ) <= 0.5 ) {

					dist = t;
					return true;

				}

			}

		}

		return false;

	}

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the circle on that same plane. See above URL for a description of the plane intersection algorithm.
	bool intersectsCircle( vec3 position, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( position - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 hit = rayOrigin + rayDirection * t;
			vec3 vi = hit - position;

			float a1 = dot( u, vi );
			float a2 = dot( v, vi );

			if( length( vec2( a1, a2 ) ) <= 0.5 ) {

				dist = t;
				return true;

			}

		}

		return false;

	}

`,Ba=`

	// add texel fetch functions for texture arrays
	vec4 texelFetch1D( sampler2DArray tex, int layer, uint index ) {

		uint width = uint( textureSize( tex, 0 ).x );
		uvec2 uv;
		uv.x = index % width;
		uv.y = index / width;

		return texelFetch( tex, ivec3( uv, layer ), 0 );

	}

	vec4 textureSampleBarycoord( sampler2DArray tex, int layer, vec3 barycoord, uvec3 faceIndices ) {

		return
			barycoord.x * texelFetch1D( tex, layer, faceIndices.x ) +
			barycoord.y * texelFetch1D( tex, layer, faceIndices.y ) +
			barycoord.z * texelFetch1D( tex, layer, faceIndices.z );

	}

`,Nr=`

	// TODO: possibly this should be renamed something related to material or path tracing logic

	#ifndef RAY_OFFSET
	#define RAY_OFFSET 1e-4
	#endif

	// adjust the hit point by the surface normal by a factor of some offset and the
	// maximum component-wise value of the current point to accommodate floating point
	// error as values increase.
	vec3 stepRayOrigin( vec3 rayOrigin, vec3 rayDirection, vec3 offset, float dist ) {

		vec3 point = rayOrigin + rayDirection * dist;
		vec3 absPoint = abs( point );
		float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
		return point + offset * ( maxPoint + 1.0 ) * RAY_OFFSET;

	}

	// https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md#attenuation
	vec3 transmissionAttenuation( float dist, vec3 attColor, float attDist ) {

		vec3 ot = - log( attColor ) / attDist;
		return exp( - ot * dist );

	}

	vec3 getHalfVector( vec3 wi, vec3 wo, float eta ) {

		// get the half vector - assuming if the light incident vector is on the other side
		// of the that it's transmissive.
		vec3 h;
		if ( wi.z > 0.0 ) {

			h = normalize( wi + wo );

		} else {

			// Scale by the ior ratio to retrieve the appropriate half vector
			// From Section 2.2 on computing the transmission half vector:
			// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
			h = normalize( wi + wo * eta );

		}

		h *= sign( h.z );
		return h;

	}

	vec3 getHalfVector( vec3 a, vec3 b ) {

		return normalize( a + b );

	}

	// The discrepancy between interpolated surface normal and geometry normal can cause issues when a ray
	// is cast that is on the top side of the geometry normal plane but below the surface normal plane. If
	// we find a ray like that we ignore it to avoid artifacts.
	// This function returns if the direction is on the same side of both planes.
	bool isDirectionValid( vec3 direction, vec3 surfaceNormal, vec3 geometryNormal ) {

		bool aboveSurfaceNormal = dot( direction, surfaceNormal ) > 0.0;
		bool aboveGeometryNormal = dot( direction, geometryNormal ) > 0.0;
		return aboveSurfaceNormal == aboveGeometryNormal;

	}

	// ray sampling x and z are swapped to align with expected background view
	vec2 equirectDirectionToUv( vec3 direction ) {

		// from Spherical.setFromCartesianCoords
		vec2 uv = vec2( atan( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

	vec3 equirectUvToDirection( vec2 uv ) {

		// undo above adjustments
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		// from Vector3.setFromSphericalCoords
		float theta = uv.x * 2.0 * PI;
		float phi = uv.y * PI;

		float sinPhi = sin( phi );

		return vec3( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

	// power heuristic for multiple importance sampling
	float misHeuristic( float a, float b ) {

		float aa = a * a;
		float bb = b * b;
		return aa / ( aa + bb );

	}

	// tentFilter from Peter Shirley's 'Realistic Ray Tracing (2nd Edition)' book, pg. 60
	// erichlof/THREE.js-PathTracing-Renderer/
	float tentFilter( float x ) {

		return x < 0.5 ? sqrt( 2.0 * x ) - 1.0 : 1.0 - sqrt( 2.0 - ( 2.0 * x ) );

	}
`,or=`

	// https://www.shadertoy.com/view/wltcRS
	uvec4 WHITE_NOISE_SEED;

	void rng_initialize( vec2 p, int frame ) {

		// white noise seed
		WHITE_NOISE_SEED = uvec4( p, uint( frame ), uint( p.x ) + uint( p.y ) );

	}

	// https://www.pcg-random.org/
	void pcg4d( inout uvec4 v ) {

		v = v * 1664525u + 1013904223u;
		v.x += v.y * v.w;
		v.y += v.z * v.x;
		v.z += v.x * v.y;
		v.w += v.y * v.z;
		v = v ^ ( v >> 16u );
		v.x += v.y*v.w;
		v.y += v.z*v.x;
		v.z += v.x*v.y;
		v.w += v.y*v.z;

	}

	// returns [ 0, 1 ]
	float pcgRand() {

		pcg4d( WHITE_NOISE_SEED );
		return float( WHITE_NOISE_SEED.x ) / float( 0xffffffffu );

	}

	vec2 pcgRand2() {

		pcg4d( WHITE_NOISE_SEED );
		return vec2( WHITE_NOISE_SEED.xy ) / float(0xffffffffu);

	}

	vec3 pcgRand3() {

		pcg4d( WHITE_NOISE_SEED );
		return vec3( WHITE_NOISE_SEED.xyz ) / float( 0xffffffffu );

	}

	vec4 pcgRand4() {

		pcg4d( WHITE_NOISE_SEED );
		return vec4( WHITE_NOISE_SEED ) / float( 0xffffffffu );

	}
`,Ea=`

	uniform sampler2D stratifiedTexture;
	uniform sampler2D stratifiedOffsetTexture;

	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;
	vec4 pixelSeed = vec4( 0 );

	vec4 rand4( int v ) {

		ivec2 uv = ivec2( v, sobolBounceIndex );
		vec4 stratifiedSample = texelFetch( stratifiedTexture, uv, 0 );
		return fract( stratifiedSample + pixelSeed.r ); // blue noise + stratified samples

	}

	vec3 rand3( int v ) {

		return rand4( v ).xyz;

	}

	vec2 rand2( int v ) {

		return rand4( v ).xy;

	}

	float rand( int v ) {

		return rand4( v ).x;

	}

	void rng_initialize( vec2 screenCoord, int frame ) {

		// tile the small noise texture across the entire screen
		ivec2 noiseSize = ivec2( textureSize( stratifiedOffsetTexture, 0 ) );
		ivec2 pixel = ivec2( screenCoord.xy ) % noiseSize;
		vec2 pixelWidth = 1.0 / vec2( noiseSize );
		vec2 uv = vec2( pixel ) * pixelWidth + pixelWidth * 0.5;

		// note that using "texelFetch" here seems to break Android for some reason
		pixelSeed = texture( stratifiedOffsetTexture, uv );

	}

`,za=`

	// diffuse
	float diffuseEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float fl = schlickFresnel( wi.z, 0.0 );
		float fv = schlickFresnel( wo.z, 0.0 );

		float metalFactor = ( 1.0 - surf.metalness );
		float transFactor = ( 1.0 - surf.transmission );
		float rr = 0.5 + 2.0 * surf.roughness * fl * fl;
		float retro = rr * ( fl + fv + fl * fv * ( rr - 1.0f ) );
		float lambert = ( 1.0f - 0.5f * fl ) * ( 1.0f - 0.5f * fv );

		// TODO: subsurface approx?

		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		color = ( 1.0 - F ) * transFactor * metalFactor * wi.z * surf.color * ( retro + lambert ) / PI;

		return wi.z / PI;

	}

	vec3 diffuseDirection( vec3 wo, SurfaceRecord surf ) {

		vec3 lightDirection = sampleSphere( rand2( 11 ) );
		lightDirection.z += 1.0;
		lightDirection = normalize( lightDirection );

		return lightDirection;

	}

	// specular
	float specularEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// if roughness is set to 0 then D === NaN which results in black pixels
		float metalness = surf.metalness;
		float roughness = surf.filteredRoughness;

		float eta = surf.eta;
		float f0 = surf.f0;

		vec3 f0Color = mix( f0 * surf.specularColor * surf.specularIntensity, surf.color, surf.metalness );
		vec3 f90Color = vec3( mix( surf.specularIntensity, 1.0, surf.metalness ) );
		vec3 F = evaluateFresnel( dot( wo, wh ), eta, f0Color, f90Color );

		vec3 iridescenceF = evalIridescence( 1.0, surf.iridescenceIor, dot( wi, wh ), surf.iridescenceThickness, f0Color );
		F = mix( F, iridescenceF,  surf.iridescence );

		// PDF
		// See 14.1.1 Microfacet BxDFs in https://www.pbr-book.org/
		float incidentTheta = acos( wo.z );
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );
		float ggxPdf = D * G1 * max( 0.0, abs( dot( wo, wh ) ) ) / abs ( wo.z );

		color = wi.z * F * G * D / ( 4.0 * abs( wi.z * wo.z ) );
		return ggxPdf / ( 4.0 * dot( wo, wh ) );

	}

	vec3 specularDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 12 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}


	// transmission
	/*
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// See section 4.2 in https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;
		bool thinFilm = surf.thinFilm;

		color = surf.transmission * surf.color;

		float denom = pow( eta * dot( wi, wh ) + dot( wo, wh ), 2.0 );
		return ggxPDF( wo, wh, filteredRoughness ) / denom;

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;

		// sample ggx vndf distribution which gives a new normal
		vec3 halfVector = ggxDirection(
			wo,
			vec2( filteredRoughness ),
			rand2( 13 )
		);

		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );
		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}

		return normalize( lightDirection );

	}
	*/

	// TODO: This is just using a basic cosine-weighted specular distribution with an
	// incorrect PDF value at the moment. Update it to correctly use a GGX distribution
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		color = surf.transmission * surf.color;

		// PDF
		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		// float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		// if ( F >= 1.0 ) {

		// 	return 0.0;

		// }

		// return 1.0 / ( 1.0 - F );

		// reverted to previous to transmission. The above was causing black pixels
		float eta = surf.eta;
		float f0 = surf.f0;
		float cosTheta = min( wo.z, 1.0 );
		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		float reflectance = schlickFresnel( cosTheta, f0 );
		bool cannotRefract = eta * sinTheta > 1.0;
		if ( cannotRefract ) {

			return 0.0;

		}

		return 1.0 / ( 1.0 - reflectance );

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float roughness = surf.filteredRoughness;
		float eta = surf.eta;
		vec3 halfVector = normalize( vec3( 0.0, 0.0, 1.0 ) + sampleSphere( rand2( 13 ) ) * roughness );
		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );

		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}
		return normalize( lightDirection );

	}

	// clearcoat
	float clearcoatEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		float ior = 1.5;
		float f0 = iorRatioToF0( ior );
		bool frontFace = surf.frontFace;
		float roughness = surf.filteredClearcoatRoughness;

		float eta = frontFace ? 1.0 / ior : ior;
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float F = schlickFresnel( dot( wi, wh ), f0 );

		float fClearcoat = F * D * G / ( 4.0 * abs( wi.z * wo.z ) );
		color = color * ( 1.0 - surf.clearcoat * F ) + fClearcoat * surf.clearcoat * wi.z;

		// PDF
		// See equation (27) in http://jcgt.org/published/0003/02/03/
		return ggxPDF( wo, wh, roughness ) / ( 4.0 * dot( wi, wh ) );

	}

	vec3 clearcoatDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredClearcoatRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 14 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}

	// sheen
	vec3 sheenColor( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf ) {

		float cosThetaO = saturateCos( wo.z );
		float cosThetaI = saturateCos( wi.z );
		float cosThetaH = wh.z;

		float D = velvetD( cosThetaH, surf.sheenRoughness );
		float G = velvetG( cosThetaO, cosThetaI, surf.sheenRoughness );

		// See equation (1) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
		vec3 color = surf.sheenColor;
		color *= D * G / ( 4.0 * abs( cosThetaO * cosThetaI ) );
		color *= wi.z;

		return color;

	}

	// bsdf
	void getLobeWeights(
		vec3 wo, vec3 wi, vec3 wh, vec3 clearcoatWo, SurfaceRecord surf,
		inout float diffuseWeight, inout float specularWeight, inout float transmissionWeight, inout float clearcoatWeight
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;
		// float fEstimate = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float fEstimate = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );

		float transSpecularProb = mix( max( 0.25, fEstimate ), 1.0, metalness );
		float diffSpecularProb = 0.5 + 0.5 * metalness;

		diffuseWeight = ( 1.0 - transmission ) * ( 1.0 - diffSpecularProb );
		specularWeight = transmission * transSpecularProb + ( 1.0 - transmission ) * diffSpecularProb;
		transmissionWeight = transmission * ( 1.0 - transSpecularProb );
		clearcoatWeight = surf.clearcoat * schlickFresnel( clearcoatWo.z, 0.04 );

		float totalWeight = diffuseWeight + specularWeight + transmissionWeight + clearcoatWeight;
		diffuseWeight /= totalWeight;
		specularWeight /= totalWeight;
		transmissionWeight /= totalWeight;
		clearcoatWeight /= totalWeight;
	}

	float bsdfEval(
		vec3 wo, vec3 clearcoatWo, vec3 wi, vec3 clearcoatWi, SurfaceRecord surf,
		float diffuseWeight, float specularWeight, float transmissionWeight, float clearcoatWeight, inout float specularPdf, inout vec3 color
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;

		float spdf = 0.0;
		float dpdf = 0.0;
		float tpdf = 0.0;
		float cpdf = 0.0;
		color = vec3( 0.0 );

		vec3 halfVector = getHalfVector( wi, wo, surf.eta );

		// diffuse
		if ( diffuseWeight > 0.0 && wi.z > 0.0 ) {

			dpdf = diffuseEval( wo, wi, halfVector, surf, color );
			color *= 1.0 - surf.transmission;

		}

		// ggx specular
		if ( specularWeight > 0.0 && wi.z > 0.0 ) {

			vec3 outColor;
			spdf = specularEval( wo, wi, getHalfVector( wi, wo ), surf, outColor );
			color += outColor;

		}

		// transmission
		if ( transmissionWeight > 0.0 && wi.z < 0.0 ) {

			tpdf = transmissionEval( wo, wi, halfVector, surf, color );

		}

		// sheen
		color *= mix( 1.0, sheenAlbedoScaling( wo, wi, surf ), surf.sheen );
		color += sheenColor( wo, wi, halfVector, surf ) * surf.sheen;

		// clearcoat
		if ( clearcoatWi.z >= 0.0 && clearcoatWeight > 0.0 ) {

			vec3 clearcoatHalfVector = getHalfVector( clearcoatWo, clearcoatWi );
			cpdf = clearcoatEval( clearcoatWo, clearcoatWi, clearcoatHalfVector, surf, color );

		}

		float pdf =
			dpdf * diffuseWeight
			+ spdf * specularWeight
			+ tpdf * transmissionWeight
			+ cpdf * clearcoatWeight;

		// retrieve specular rays for the shadows flag
		specularPdf = spdf * specularWeight + cpdf * clearcoatWeight;

		return pdf;

	}

	float bsdfResult( vec3 worldWo, vec3 worldWi, SurfaceRecord surf, inout vec3 color ) {

		if ( surf.volumeParticle ) {

			color = surf.color / ( 4.0 * PI );
			return 1.0 / ( 4.0 * PI );

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 wi = normalize( surf.normalInvBasis * worldWi );

		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		vec3 clearcoatWi = normalize( surf.clearcoatInvBasis * worldWi );

		vec3 wh = getHalfVector( wo, wi, surf.eta );
		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		getLobeWeights( wo, wi, wh, clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float specularPdf;
		return bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, specularPdf, color );

	}

	ScatterRecord bsdfSample( vec3 worldWo, SurfaceRecord surf ) {

		if ( surf.volumeParticle ) {

			ScatterRecord sampleRec;
			sampleRec.specularPdf = 0.0;
			sampleRec.pdf = 1.0 / ( 4.0 * PI );
			sampleRec.direction = sampleSphere( rand2( 16 ) );
			sampleRec.color = surf.color / ( 4.0 * PI );
			return sampleRec;

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		mat3 normalBasis = surf.normalBasis;
		mat3 invBasis = surf.normalInvBasis;
		mat3 clearcoatNormalBasis = surf.clearcoatBasis;
		mat3 clearcoatInvBasis = surf.clearcoatInvBasis;

		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		// using normal and basically-reflected ray since we don't have proper half vector here
		getLobeWeights( wo, wo, vec3( 0, 0, 1 ), clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float pdf[4];
		pdf[0] = diffuseWeight;
		pdf[1] = specularWeight;
		pdf[2] = transmissionWeight;
		pdf[3] = clearcoatWeight;

		float cdf[4];
		cdf[0] = pdf[0];
		cdf[1] = pdf[1] + cdf[0];
		cdf[2] = pdf[2] + cdf[1];
		cdf[3] = pdf[3] + cdf[2];

		if( cdf[3] != 0.0 ) {

			float invMaxCdf = 1.0 / cdf[3];
			cdf[0] *= invMaxCdf;
			cdf[1] *= invMaxCdf;
			cdf[2] *= invMaxCdf;
			cdf[3] *= invMaxCdf;

		} else {

			cdf[0] = 1.0;
			cdf[1] = 0.0;
			cdf[2] = 0.0;
			cdf[3] = 0.0;

		}

		vec3 wi;
		vec3 clearcoatWi;

		float r = rand( 15 );
		if ( r <= cdf[0] ) { // diffuse

			wi = diffuseDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[1] ) { // specular

			wi = specularDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[2] ) { // transmission / refraction

			wi = transmissionDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[3] ) { // clearcoat

			clearcoatWi = clearcoatDirection( clearcoatWo, surf );
			wi = normalize( invBasis * normalize( clearcoatNormalBasis * clearcoatWi ) );

		}

		ScatterRecord result;
		result.pdf = bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, result.specularPdf, result.color );
		result.direction = normalize( surf.normalBasis * wi );

		return result;

	}

`,ka=`

	// returns the hit distance given the material density
	float intersectFogVolume( Material material, float u ) {

		// https://raytracing.github.io/books/RayTracingTheNextWeek.html#volumes/constantdensitymediums
		return material.opacity == 0.0 ? INFINITY : ( - 1.0 / material.opacity ) * log( u );

	}

	ScatterRecord sampleFogVolume( SurfaceRecord surf, vec2 uv ) {

		ScatterRecord sampleRec;
		sampleRec.specularPdf = 0.0;
		sampleRec.pdf = 1.0 / ( 2.0 * PI );
		sampleRec.direction = sampleSphere( uv );
		sampleRec.color = surf.color;
		return sampleRec;

	}

`,Na=`

	// The GGX functions provide sampling and distribution information for normals as output so
	// in order to get probability of scatter direction the half vector must be computed and provided.
	// [0] https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf
	// [1] https://hal.archives-ouvertes.fr/hal-01509746/document
	// [2] http://jcgt.org/published/0007/04/01/
	// [4] http://jcgt.org/published/0003/02/03/

	// trowbridge-reitz === GGX === GTR

	vec3 ggxDirection( vec3 incidentDir, vec2 roughness, vec2 uv ) {

		// TODO: try GGXVNDF implementation from reference [2], here. Needs to update ggxDistribution
		// function below, as well

		// Implementation from reference [1]
		// stretch view
		vec3 V = normalize( vec3( roughness * incidentDir.xy, incidentDir.z ) );

		// orthonormal basis
		vec3 T1 = ( V.z < 0.9999 ) ? normalize( cross( V, vec3( 0.0, 0.0, 1.0 ) ) ) : vec3( 1.0, 0.0, 0.0 );
		vec3 T2 = cross( T1, V );

		// sample point with polar coordinates (r, phi)
		float a = 1.0 / ( 1.0 + V.z );
		float r = sqrt( uv.x );
		float phi = ( uv.y < a ) ? uv.y / a * PI : PI + ( uv.y - a ) / ( 1.0 - a ) * PI;
		float P1 = r * cos( phi );
		float P2 = r * sin( phi ) * ( ( uv.y < a ) ? 1.0 : V.z );

		// compute normal
		vec3 N = P1 * T1 + P2 * T2 + V * sqrt( max( 0.0, 1.0 - P1 * P1 - P2 * P2 ) );

		// unstretch
		N = normalize( vec3( roughness * N.xy, max( 0.0, N.z ) ) );

		return N;

	}

	// Below are PDF and related functions for use in a Monte Carlo path tracer
	// as specified in Appendix B of the following paper
	// See equation (34) from reference [0]
	float ggxLamda( float theta, float roughness ) {

		float tanTheta = tan( theta );
		float tanTheta2 = tanTheta * tanTheta;
		float alpha2 = roughness * roughness;

		float numerator = - 1.0 + sqrt( 1.0 + alpha2 * tanTheta2 );
		return numerator / 2.0;

	}

	// See equation (34) from reference [0]
	float ggxShadowMaskG1( float theta, float roughness ) {

		return 1.0 / ( 1.0 + ggxLamda( theta, roughness ) );

	}

	// See equation (125) from reference [4]
	float ggxShadowMaskG2( vec3 wi, vec3 wo, float roughness ) {

		float incidentTheta = acos( wi.z );
		float scatterTheta = acos( wo.z );
		return 1.0 / ( 1.0 + ggxLamda( incidentTheta, roughness ) + ggxLamda( scatterTheta, roughness ) );

	}

	// See equation (33) from reference [0]
	float ggxDistribution( vec3 halfVector, float roughness ) {

		float a2 = roughness * roughness;
		a2 = max( EPSILON, a2 );
		float cosTheta = halfVector.z;
		float cosTheta4 = pow( cosTheta, 4.0 );

		if ( cosTheta == 0.0 ) return 0.0;

		float theta = acosSafe( halfVector.z );
		float tanTheta = tan( theta );
		float tanTheta2 = pow( tanTheta, 2.0 );

		float denom = PI * cosTheta4 * pow( a2 + tanTheta2, 2.0 );
		return ( a2 / denom );

	}

	// See equation (3) from reference [2]
	float ggxPDF( vec3 wi, vec3 halfVector, float roughness ) {

		float incidentTheta = acos( wi.z );
		float D = ggxDistribution( halfVector, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );

		return D * G1 * max( 0.0, dot( wi, halfVector ) ) / wi.z;

	}

`,Oa=`

	// XYZ to sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	vec3 fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 iorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float iorToFresnel0( float transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ) );

	}

	// Fresnel equations for dielectric/dielectric interfaces. See https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;

		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - square( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * square( phase ) );
		xyz /= 1.0685e-7;

		vec3 srgb = XYZ_TO_REC709 * xyz;
		return srgb;

	}

	// See Section 4. Analytic Spectral Integration, A Practical Extension to Microfacet Theory for the Modeling of Varying Iridescence, https://hal.archives-ouvertes.fr/hal-01518344/document
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIor -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIor = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );

		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = square( outsideIOR / iridescenceIor ) * ( 1.0 - square( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = iorToFresnel0( iridescenceIor, outsideIOR );
		float R12 = schlickFresnel( cosTheta1, R0 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIor < outsideIOR ) {

			phi12 = PI;

		}

		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = iorToFresnel0( baseIOR, iridescenceIor );
		vec3 R23 = schlickFresnel( cosTheta2, R1 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[0] < iridescenceIor ) {

			phi23[ 0 ] = PI;

		}

		if ( baseIOR[1] < iridescenceIor ) {

			phi23[ 1 ] = PI;

		}

		if ( baseIOR[2] < iridescenceIor ) {

			phi23[ 2 ] = PI;

		}

		// Phase shift
		float OPD = 2.0 * iridescenceIor * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = square( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

`,Ha=`

	// See equation (2) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetD( float cosThetaH, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		float invAlpha = 1.0 / alpha;

		float sqrCosThetaH = cosThetaH * cosThetaH;
		float sinThetaH = max( 1.0 - sqrCosThetaH, 0.001 );

		return ( 2.0 + invAlpha ) * pow( sinThetaH, 0.5 * invAlpha ) / ( 2.0 * PI );

	}

	float velvetParamsInterpolate( int i, float oneMinusAlphaSquared ) {

		const float p0[5] = float[5]( 25.3245, 3.32435, 0.16801, -1.27393, -4.85967 );
		const float p1[5] = float[5]( 21.5473, 3.82987, 0.19823, -1.97760, -4.32054 );

		return mix( p1[i], p0[i], oneMinusAlphaSquared );

	}

	float velvetL( float x, float alpha ) {

		float oneMinusAlpha = 1.0 - alpha;
		float oneMinusAlphaSquared = oneMinusAlpha * oneMinusAlpha;

		float a = velvetParamsInterpolate( 0, oneMinusAlphaSquared );
		float b = velvetParamsInterpolate( 1, oneMinusAlphaSquared );
		float c = velvetParamsInterpolate( 2, oneMinusAlphaSquared );
		float d = velvetParamsInterpolate( 3, oneMinusAlphaSquared );
		float e = velvetParamsInterpolate( 4, oneMinusAlphaSquared );

		return a / ( 1.0 + b * pow( abs( x ), c ) ) + d * x + e;

	}

	// See equation (3) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetLambda( float cosTheta, float alpha ) {

		return abs( cosTheta ) < 0.5 ? exp( velvetL( cosTheta, alpha ) ) : exp( 2.0 * velvetL( 0.5, alpha ) - velvetL( 1.0 - cosTheta, alpha ) );

	}

	// See Section 3, Shadowing Term, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetG( float cosThetaO, float cosThetaI, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		return 1.0 / ( 1.0 + velvetLambda( cosThetaO, alpha ) + velvetLambda( cosThetaI, alpha ) );

	}

	float directionalAlbedoSheen( float cosTheta, float alpha ) {

		cosTheta = saturate( cosTheta );

		float c = 1.0 - cosTheta;
		float c3 = c * c * c;

		return 0.65584461 * c3 + 1.0 / ( 4.16526551 + exp( -7.97291361 * sqrt( alpha ) + 6.33516894 ) );

	}

	float sheenAlbedoScaling( vec3 wo, vec3 wi, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );
		float eWi = directionalAlbedoSheen( saturateCos( wi.z ), alpha );

		return min( 1.0 - maxSheenColor * eWo, 1.0 - maxSheenColor * eWi );

	}

	// See Section 5, Layering, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float sheenAlbedoScaling( vec3 wo, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );

		return 1.0 - maxSheenColor * eWo;

	}

`,La=`

#ifndef FOG_CHECK_ITERATIONS
#define FOG_CHECK_ITERATIONS 30
#endif

// returns whether the given material is a fog material or not
bool isMaterialFogVolume( sampler2D materials, uint materialIndex ) {

	uint i = materialIndex * 45u;
	vec4 s14 = texelFetch1D( materials, i + 14u );
	return bool( int( s14.b ) & 4 );

}

// returns true if we're within the first fog volume we hit
bool bvhIntersectFogVolumeHit(
	vec3 rayOrigin, vec3 rayDirection,
	usampler2D materialIndexAttribute, sampler2D materials,
	inout Material material
) {

	material.fogVolume = false;

	for ( int i = 0; i < FOG_CHECK_ITERATIONS; i ++ ) {

		// find nearest hit
		uvec4 faceIndices = uvec4( 0u );
		vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
		vec3 barycoord = vec3( 0.0 );
		float side = 1.0;
		float dist = 0.0;
		bool hit = bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
		if ( hit ) {

			// if it's a fog volume return whether we hit the front or back face
			uint materialIndex = uTexelFetch1D( materialIndexAttribute, faceIndices.x ).r;
			if ( isMaterialFogVolume( materials, materialIndex ) ) {

				material = readMaterialInfo( materials, materialIndex );
				return side == - 1.0;

			} else {

				// move the ray forward
				rayOrigin = stepRayOrigin( rayOrigin, rayDirection, - faceNormal, dist );

			}

		} else {

			return false;

		}

	}

	return false;

}

`,Ua=`

	// step through multiple surface hits and accumulate color attenuation based on transmissive surfaces
	// returns true if a solid surface was hit
	bool attenuateHit(
		RenderState state,
		Ray ray, float rayDist,
		out vec3 color
	) {

		// store the original bounce index so we can reset it after
		uint originalBounceIndex = sobolBounceIndex;

		int traversals = state.traversals;
		int transmissiveTraversals = state.transmissiveTraversals;
		bool isShadowRay = state.isShadowRay;
		Material fogMaterial = state.fogMaterial;

		vec3 startPoint = ray.origin;

		// hit results
		SurfaceHit surfaceHit;

		color = vec3( 1.0 );

		bool result = true;
		for ( int i = 0; i < traversals; i ++ ) {

			sobolBounceIndex ++;

			int hitType = traceScene( ray, fogMaterial, surfaceHit );

			if ( hitType == FOG_HIT ) {

				result = true;
				break;

			} else if ( hitType == SURFACE_HIT ) {

				float totalDist = distance( startPoint, ray.origin + ray.direction * surfaceHit.dist );
				if ( totalDist > rayDist ) {

					result = false;
					break;

				}

				// TODO: attenuate the contribution based on the PDF of the resulting ray including refraction values
				// Should be able to work using the material BSDF functions which will take into account specularity, etc.
				// TODO: should we account for emissive surfaces here?

				uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
				Material material = readMaterialInfo( materials, materialIndex );

				// adjust the ray to the new surface
				bool isEntering = surfaceHit.side == 1.0;
				ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

				#if FEATURE_FOG

				if ( material.fogVolume ) {

					fogMaterial = material;
					fogMaterial.fogVolume = surfaceHit.side == 1.0;
					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;
					continue;

				}

				#endif

				if ( ! material.castShadow && isShadowRay ) {

					continue;

				}

				vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
				vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

				// albedo
				vec4 albedo = vec4( material.color, material.opacity );
				if ( material.map != - 1 ) {

					vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
					albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

				}

				if ( material.vertexColors ) {

					albedo *= vertexColor;

				}

				// alphaMap
				if ( material.alphaMap != - 1 ) {

					albedo.a *= texture2D( textures, vec3( uv, material.alphaMap ) ).x;

				}

				// transmission
				float transmission = material.transmission;
				if ( material.transmissionMap != - 1 ) {

					vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
					transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

				}

				// metalness
				float metalness = material.metalness;
				if ( material.metalnessMap != - 1 ) {

					vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
					metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

				}

				float alphaTest = material.alphaTest;
				bool useAlphaTest = alphaTest != 0.0;
				float transmissionFactor = ( 1.0 - metalness ) * transmission;
				if (
					transmissionFactor < rand( 9 ) && ! (
						// material sidedness
						material.side != 0.0 && surfaceHit.side == material.side

						// alpha test
						|| useAlphaTest && albedo.a < alphaTest

						// opacity
						|| material.transparent && ! useAlphaTest && albedo.a < rand( 10 )
					)
				) {

					result = true;
					break;

				}

				if ( surfaceHit.side == 1.0 && isEntering ) {

					// only attenuate by surface color on the way in
					color *= mix( vec3( 1.0 ), albedo.rgb, transmissionFactor );

				} else if ( surfaceHit.side == - 1.0 ) {

					// attenuate by medium once we hit the opposite side of the model
					color *= transmissionAttenuation( surfaceHit.dist, material.attenuationColor, material.attenuationDistance );

				}

				bool isTransmissiveRay = dot( ray.direction, surfaceHit.faceNormal * surfaceHit.side ) < 0.0;
				if ( ( isTransmissiveRay || isEntering ) && transmissiveTraversals > 0 ) {

					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;

				}

			} else {

				result = false;
				break;

			}

		}

		// reset the bounce index
		sobolBounceIndex = originalBounceIndex;
		return result;

	}

`,Wa=`

	vec3 ndcToRayOrigin( vec2 coord ) {

		vec4 rayOrigin4 = cameraWorldMatrix * invProjectionMatrix * vec4( coord, - 1.0, 1.0 );
		return rayOrigin4.xyz / rayOrigin4.w;
	}

	Ray getCameraRay() {

		vec2 ssd = vec2( 1.0 ) / resolution;

		// Jitter the camera ray by finding a uv coordinate at a random sample
		// around this pixel's UV coordinate for AA
		vec2 ruv = rand2( 0 );
		vec2 jitteredUv = vUv + vec2( tentFilter( ruv.x ) * ssd.x, tentFilter( ruv.y ) * ssd.y );
		Ray ray;

		#if CAMERA_TYPE == 2

			// Equirectangular projection
			vec4 rayDirection4 = vec4( equirectUvToDirection( jitteredUv ), 0.0 );
			vec4 rayOrigin4 = vec4( 0.0, 0.0, 0.0, 1.0 );

			rayDirection4 = cameraWorldMatrix * rayDirection4;
			rayOrigin4 = cameraWorldMatrix * rayOrigin4;

			ray.direction = normalize( rayDirection4.xyz );
			ray.origin = rayOrigin4.xyz / rayOrigin4.w;

		#else

			// get [- 1, 1] normalized device coordinates
			vec2 ndc = 2.0 * jitteredUv - vec2( 1.0 );
			ray.origin = ndcToRayOrigin( ndc );

			#if CAMERA_TYPE == 1

				// Orthographic projection
				ray.direction = ( cameraWorldMatrix * vec4( 0.0, 0.0, - 1.0, 0.0 ) ).xyz;
				ray.direction = normalize( ray.direction );

			#else

				// Perspective projection
				ray.direction = normalize( mat3( cameraWorldMatrix ) * ( invProjectionMatrix * vec4( ndc, 0.0, 1.0 ) ).xyz );

			#endif

		#endif

		#if FEATURE_DOF
		{

			// depth of field
			vec3 focalPoint = ray.origin + normalize( ray.direction ) * physicalCamera.focusDistance;

			// get the aperture sample
			// if blades === 0 then we assume a circle
			vec3 shapeUVW= rand3( 1 );
			int blades = physicalCamera.apertureBlades;
			float anamorphicRatio = physicalCamera.anamorphicRatio;
			vec2 apertureSample = blades == 0 ? sampleCircle( shapeUVW.xy ) : sampleRegularPolygon( blades, shapeUVW );
			apertureSample *= physicalCamera.bokehSize * 0.5 * 1e-3;

			// rotate the aperture shape
			apertureSample =
				rotateVector( apertureSample, physicalCamera.apertureRotation ) *
				saturate( vec2( anamorphicRatio, 1.0 / anamorphicRatio ) );

			// create the new ray
			ray.origin += ( cameraWorldMatrix * vec4( apertureSample, 0.0, 0.0 ) ).xyz;
			ray.direction = focalPoint - ray.origin;

		}
		#endif

		ray.direction = normalize( ray.direction );

		return ray;

	}

`,Va=`

	vec3 directLightContribution( vec3 worldWo, SurfaceRecord surf, RenderState state, vec3 rayOrigin ) {

		vec3 result = vec3( 0.0 );

		// uniformly pick a light or environment map
		if( lightsDenom != 0.0 && rand( 5 ) < float( lights.count ) / lightsDenom ) {

			// sample a light or environment
			LightRecord lightRec = randomLightSample( lights.tex, iesProfiles, lights.count, rayOrigin, rand3( 6 ) );

			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, lightRec.direction ) < 0.0;
			if ( isSampleBelowSurface ) {

				lightRec.pdf = 0.0;

			}

			// check if a ray could even reach the light area
			Ray lightRay;
			lightRay.origin = rayOrigin;
			lightRay.direction = lightRec.direction;
			vec3 attenuatedColor;
			if (
				lightRec.pdf > 0.0 &&
				isDirectionValid( lightRec.direction, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, lightRay, lightRec.dist, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float lightMaterialPdf = bsdfResult( worldWo, lightRec.direction, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( lightMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					float lightPdf = lightRec.pdf / lightsDenom;
					float misWeight = lightRec.type == SPOT_LIGHT_TYPE || lightRec.type == DIR_LIGHT_TYPE || lightRec.type == POINT_LIGHT_TYPE ? 1.0 : misHeuristic( lightPdf, lightMaterialPdf );
					result = attenuatedColor * lightRec.emission * state.throughputColor * sampleColor * misWeight / lightPdf;

				}

			}

		} else if ( envMapInfo.totalSum != 0.0 && environmentIntensity != 0.0 ) {

			// find a sample in the environment map to include in the contribution
			vec3 envColor, envDirection;
			float envPdf = sampleEquirectProbability( rand2( 7 ), envColor, envDirection );
			envDirection = invEnvRotation3x3 * envDirection;

			// this env sampling is not set up for transmissive sampling and yields overly bright
			// results so we ignore the sample in this case.
			// TODO: this should be improved but how? The env samples could traverse a few layers?
			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, envDirection ) < 0.0;
			if ( isSampleBelowSurface ) {

				envPdf = 0.0;

			}

			// check if a ray could even reach the surface
			Ray envRay;
			envRay.origin = rayOrigin;
			envRay.direction = envDirection;
			vec3 attenuatedColor;
			if (
				envPdf > 0.0 &&
				isDirectionValid( envDirection, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, envRay, INFINITY, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float envMaterialPdf = bsdfResult( worldWo, envDirection, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( envMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					envPdf /= lightsDenom;
					float misWeight = misHeuristic( envPdf, envMaterialPdf );
					result = attenuatedColor * environmentIntensity * envColor * state.throughputColor * sampleColor * misWeight / envPdf;

				}

			}

		}

		// Function changed to have a single return statement to potentially help with crashes on Mac OS.
		// See issue #470
		return result;

	}

`,qa=`

	#define SKIP_SURFACE 0
	#define HIT_SURFACE 1
	int getSurfaceRecord(
		Material material, SurfaceHit surfaceHit, sampler2DArray attributesArray,
		float accumulatedRoughness,
		inout SurfaceRecord surf
	) {

		if ( material.fogVolume ) {

			vec3 normal = vec3( 0, 0, 1 );

			SurfaceRecord fogSurface;
			fogSurface.volumeParticle = true;
			fogSurface.color = material.color;
			fogSurface.emission = material.emissiveIntensity * material.emissive;
			fogSurface.normal = normal;
			fogSurface.faceNormal = normal;
			fogSurface.clearcoatNormal = normal;

			surf = fogSurface;
			return HIT_SURFACE;

		}

		// uv coord for textures
		vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
		vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

		// albedo
		vec4 albedo = vec4( material.color, material.opacity );
		if ( material.map != - 1 ) {

			vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
			albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

		}

		if ( material.vertexColors ) {

			albedo *= vertexColor;

		}

		// alphaMap
		if ( material.alphaMap != - 1 ) {

			albedo.a *= texture2D( textures, vec3( uv, material.alphaMap ) ).x;

		}

		// possibly skip this sample if it's transparent, alpha test is enabled, or we hit the wrong material side
		// and it's single sided.
		// - alpha test is disabled when it === 0
		// - the material sidedness test is complicated because we want light to pass through the back side but still
		// be able to see the front side. This boolean checks if the side we hit is the front side on the first ray
		// and we're rendering the other then we skip it. Do the opposite on subsequent bounces to get incoming light.
		float alphaTest = material.alphaTest;
		bool useAlphaTest = alphaTest != 0.0;
		if (
			// material sidedness
			material.side != 0.0 && surfaceHit.side != material.side

			// alpha test
			|| useAlphaTest && albedo.a < alphaTest

			// opacity
			|| material.transparent && ! useAlphaTest && albedo.a < rand( 3 )
		) {

			return SKIP_SURFACE;

		}

		// fetch the interpolated smooth normal
		vec3 normal = normalize( textureSampleBarycoord(
			attributesArray,
			ATTR_NORMAL,
			surfaceHit.barycoord,
			surfaceHit.faceIndices.xyz
		).xyz );

		// roughness
		float roughness = material.roughness;
		if ( material.roughnessMap != - 1 ) {

			vec3 uvPrime = material.roughnessMapTransform * vec3( uv, 1 );
			roughness *= texture2D( textures, vec3( uvPrime.xy, material.roughnessMap ) ).g;

		}

		// metalness
		float metalness = material.metalness;
		if ( material.metalnessMap != - 1 ) {

			vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
			metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

		}

		// emission
		vec3 emission = material.emissiveIntensity * material.emissive;
		if ( material.emissiveMap != - 1 ) {

			vec3 uvPrime = material.emissiveMapTransform * vec3( uv, 1 );
			emission *= texture2D( textures, vec3( uvPrime.xy, material.emissiveMap ) ).xyz;

		}

		// transmission
		float transmission = material.transmission;
		if ( material.transmissionMap != - 1 ) {

			vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
			transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

		}

		// normal
		if ( material.flatShading ) {

			// if we're rendering a flat shaded object then use the face normals - the face normal
			// is provided based on the side the ray hits the mesh so flip it to align with the
			// interpolated vertex normals.
			normal = surfaceHit.faceNormal * surfaceHit.side;

		}

		vec3 baseNormal = normal;
		if ( material.normalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( normal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, normal );

				vec3 uvPrime = material.normalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.normalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.normalScale;
				normal = vTBN * texNormal;

			}

		}

		normal *= surfaceHit.side;

		// clearcoat
		float clearcoat = material.clearcoat;
		if ( material.clearcoatMap != - 1 ) {

			vec3 uvPrime = material.clearcoatMapTransform * vec3( uv, 1 );
			clearcoat *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatMap ) ).r;

		}

		// clearcoatRoughness
		float clearcoatRoughness = material.clearcoatRoughness;
		if ( material.clearcoatRoughnessMap != - 1 ) {

			vec3 uvPrime = material.clearcoatRoughnessMapTransform * vec3( uv, 1 );
			clearcoatRoughness *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatRoughnessMap ) ).g;

		}

		// clearcoatNormal
		vec3 clearcoatNormal = baseNormal;
		if ( material.clearcoatNormalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( clearcoatNormal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, clearcoatNormal );

				vec3 uvPrime = material.clearcoatNormalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.clearcoatNormalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.clearcoatNormalScale;
				clearcoatNormal = vTBN * texNormal;

			}

		}

		clearcoatNormal *= surfaceHit.side;

		// sheenColor
		vec3 sheenColor = material.sheenColor;
		if ( material.sheenColorMap != - 1 ) {

			vec3 uvPrime = material.sheenColorMapTransform * vec3( uv, 1 );
			sheenColor *= texture2D( textures, vec3( uvPrime.xy, material.sheenColorMap ) ).rgb;

		}

		// sheenRoughness
		float sheenRoughness = material.sheenRoughness;
		if ( material.sheenRoughnessMap != - 1 ) {

			vec3 uvPrime = material.sheenRoughnessMapTransform * vec3( uv, 1 );
			sheenRoughness *= texture2D( textures, vec3( uvPrime.xy, material.sheenRoughnessMap ) ).a;

		}

		// iridescence
		float iridescence = material.iridescence;
		if ( material.iridescenceMap != - 1 ) {

			vec3 uvPrime = material.iridescenceMapTransform * vec3( uv, 1 );
			iridescence *= texture2D( textures, vec3( uvPrime.xy, material.iridescenceMap ) ).r;

		}

		// iridescence thickness
		float iridescenceThickness = material.iridescenceThicknessMaximum;
		if ( material.iridescenceThicknessMap != - 1 ) {

			vec3 uvPrime = material.iridescenceThicknessMapTransform * vec3( uv, 1 );
			float iridescenceThicknessSampled = texture2D( textures, vec3( uvPrime.xy, material.iridescenceThicknessMap ) ).g;
			iridescenceThickness = mix( material.iridescenceThicknessMinimum, material.iridescenceThicknessMaximum, iridescenceThicknessSampled );

		}

		iridescence = iridescenceThickness == 0.0 ? 0.0 : iridescence;

		// specular color
		vec3 specularColor = material.specularColor;
		if ( material.specularColorMap != - 1 ) {

			vec3 uvPrime = material.specularColorMapTransform * vec3( uv, 1 );
			specularColor *= texture2D( textures, vec3( uvPrime.xy, material.specularColorMap ) ).rgb;

		}

		// specular intensity
		float specularIntensity = material.specularIntensity;
		if ( material.specularIntensityMap != - 1 ) {

			vec3 uvPrime = material.specularIntensityMapTransform * vec3( uv, 1 );
			specularIntensity *= texture2D( textures, vec3( uvPrime.xy, material.specularIntensityMap ) ).a;

		}

		surf.volumeParticle = false;

		surf.faceNormal = surfaceHit.faceNormal;
		surf.normal = normal;

		surf.metalness = metalness;
		surf.color = albedo.rgb;
		surf.emission = emission;

		surf.ior = material.ior;
		surf.transmission = transmission;
		surf.thinFilm = material.thinFilm;
		surf.attenuationColor = material.attenuationColor;
		surf.attenuationDistance = material.attenuationDistance;

		surf.clearcoatNormal = clearcoatNormal;
		surf.clearcoat = clearcoat;

		surf.sheen = material.sheen;
		surf.sheenColor = sheenColor;

		surf.iridescence = iridescence;
		surf.iridescenceIor = material.iridescenceIor;
		surf.iridescenceThickness = iridescenceThickness;

		surf.specularColor = specularColor;
		surf.specularIntensity = specularIntensity;

		// apply perceptual roughness factor from gltf. sheen perceptual roughness is
		// applied by its brdf function
		// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#microfacet-surfaces
		surf.roughness = roughness * roughness;
		surf.clearcoatRoughness = clearcoatRoughness * clearcoatRoughness;
		surf.sheenRoughness = sheenRoughness;

		// frontFace is used to determine transmissive properties and PDF. If no transmission is used
		// then we can just always assume this is a front face.
		surf.frontFace = surfaceHit.side == 1.0 || transmission == 0.0;
		surf.eta = material.thinFilm || surf.frontFace ? 1.0 / material.ior : material.ior;
		surf.f0 = iorRatioToF0( surf.eta );

		// Compute the filtered roughness value to use during specular reflection computations.
		// The accumulated roughness value is scaled by a user setting and a "magic value" of 5.0.
		// If we're exiting something transmissive then scale the factor down significantly so we can retain
		// sharp internal reflections
		surf.filteredRoughness = applyFilteredGlossy( surf.roughness, accumulatedRoughness );
		surf.filteredClearcoatRoughness = applyFilteredGlossy( surf.clearcoatRoughness, accumulatedRoughness );

		// get the normal frames
		surf.normalBasis = getBasisFromNormal( surf.normal );
		surf.normalInvBasis = inverse( surf.normalBasis );

		surf.clearcoatBasis = getBasisFromNormal( surf.clearcoatNormal );
		surf.clearcoatInvBasis = inverse( surf.clearcoatBasis );

		return HIT_SURFACE;

	}
`,Ga=`

	struct Ray {

		vec3 origin;
		vec3 direction;

	};

	struct SurfaceHit {

		uvec4 faceIndices;
		vec3 barycoord;
		vec3 faceNormal;
		float side;
		float dist;

	};

	struct RenderState {

		bool firstRay;
		bool transmissiveRay;
		bool isShadowRay;
		float accumulatedRoughness;
		int transmissiveTraversals;
		int traversals;
		uint depth;
		vec3 throughputColor;
		Material fogMaterial;

	};

	RenderState initRenderState() {

		RenderState result;
		result.firstRay = true;
		result.transmissiveRay = true;
		result.isShadowRay = false;
		result.accumulatedRoughness = 0.0;
		result.transmissiveTraversals = 0;
		result.traversals = 0;
		result.throughputColor = vec3( 1.0 );
		result.depth = 0u;
		result.fogMaterial.fogVolume = false;
		return result;

	}

`,$a=`

	#define NO_HIT 0
	#define SURFACE_HIT 1
	#define LIGHT_HIT 2
	#define FOG_HIT 3

	// Passing the global variable 'lights' into this function caused shader program errors.
	// So global variables like 'lights' and 'bvh' were moved out of the function parameters.
	// For more information, refer to: https://github.com/gkjohnson/three-gpu-pathtracer/pull/457
	int traceScene(
		Ray ray, Material fogMaterial, inout SurfaceHit surfaceHit
	) {

		int result = NO_HIT;
		bool hit = bvhIntersectFirstHit( bvh, ray.origin, ray.direction, surfaceHit.faceIndices, surfaceHit.faceNormal, surfaceHit.barycoord, surfaceHit.side, surfaceHit.dist );

		#if FEATURE_FOG

		if ( fogMaterial.fogVolume ) {

			// offset the distance so we don't run into issues with particles on the same surface
			// as other objects
			float particleDist = intersectFogVolume( fogMaterial, rand( 1 ) );
			if ( particleDist + RAY_OFFSET < surfaceHit.dist ) {

				surfaceHit.side = 1.0;
				surfaceHit.faceNormal = normalize( - ray.direction );
				surfaceHit.dist = particleDist;
				return FOG_HIT;

			}

		}

		#endif

		if ( hit ) {

			result = SURFACE_HIT;

		}

		return result;

	}

`;class Ya extends Ti{onBeforeRender(){this.setDefine("FEATURE_DOF",this.physicalCamera.bokehSize===0?0:1),this.setDefine("FEATURE_BACKGROUND_MAP",this.backgroundMap?1:0),this.setDefine("FEATURE_FOG",this.materials.features.isUsed("FOG")?1:0)}constructor(e){super({transparent:!0,depthWrite:!1,defines:{FEATURE_MIS:1,FEATURE_RUSSIAN_ROULETTE:1,FEATURE_DOF:1,FEATURE_BACKGROUND_MAP:0,FEATURE_FOG:1,RANDOM_TYPE:2,CAMERA_TYPE:0,DEBUG_MODE:0,ATTR_NORMAL:0,ATTR_TANGENT:1,ATTR_UV:2,ATTR_COLOR:3},uniforms:{resolution:{value:new j},opacity:{value:1},bounces:{value:10},transmissiveBounces:{value:10},filterGlossyFactor:{value:0},physicalCamera:{value:new Vn},cameraWorldMatrix:{value:new $},invProjectionMatrix:{value:new $},bvh:{value:new ln},attributesArray:{value:new ta},materialIndexAttribute:{value:new Cr},materials:{value:new oa},textures:{value:new nr().texture},lights:{value:new Jn},iesProfiles:{value:new nr(360,180,{type:ne,wrapS:ge,wrapT:ge}).texture},environmentIntensity:{value:1},environmentRotation:{value:new $},envMapInfo:{value:new $n},backgroundBlur:{value:0},backgroundMap:{value:null},backgroundAlpha:{value:1},backgroundIntensity:{value:1},backgroundRotation:{value:new $},seed:{value:0},sobolTexture:{value:null},stratifiedTexture:{value:new pa},stratifiedOffsetTexture:{value:new Ta(64,1)}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vec4 mvPosition = vec4( position, 1.0 );
					mvPosition = modelViewMatrix * mvPosition;
					gl_Position = projectionMatrix * mvPosition;

					vUv = uv;

				}

			`,fragmentShader:`
				#define RAY_OFFSET 1e-4
				#define INFINITY 1e20

				precision highp isampler2D;
				precision highp usampler2D;
				precision highp sampler2DArray;
				vec4 envMapTexelToLinear( vec4 a ) { return a; }
				#include <common>

				// bvh intersection
				${hn}
				${mn}
				${dn}

				// uniform structs
				${wa}
				${_a}
				${Sa}
				${Aa}
				${Ia}

				// random
				#if RANDOM_TYPE == 2 	// Stratified List

					${Ea}

				#elif RANDOM_TYPE == 1 	// Sobol

					${or}
					${zr}
					${Hn}

					#define rand(v) sobol(v)
					#define rand2(v) sobol2(v)
					#define rand3(v) sobol3(v)
					#define rand4(v) sobol4(v)

				#else 					// PCG

				${or}

					// Using the sobol functions seems to break the the compiler on MacOS
					// - specifically the "sobolReverseBits" function.
					uint sobolPixelIndex = 0u;
					uint sobolPathIndex = 0u;
					uint sobolBounceIndex = 0u;

					#define rand(v) pcgRand()
					#define rand2(v) pcgRand2()
					#define rand3(v) pcgRand3()
					#define rand4(v) pcgRand4()

				#endif

				// common
				${Ba}
				${Ca}
				${Nr}
				${Fa}
				${Da}

				// environment
				uniform EquirectHdrInfo envMapInfo;
				uniform mat4 environmentRotation;
				uniform float environmentIntensity;

				// lighting
				uniform sampler2DArray iesProfiles;
				uniform LightsInfo lights;

				// background
				uniform float backgroundBlur;
				uniform float backgroundAlpha;
				#if FEATURE_BACKGROUND_MAP

				uniform sampler2D backgroundMap;
				uniform mat4 backgroundRotation;
				uniform float backgroundIntensity;

				#endif

				// camera
				uniform mat4 cameraWorldMatrix;
				uniform mat4 invProjectionMatrix;
				#if FEATURE_DOF

				uniform PhysicalCamera physicalCamera;

				#endif

				// geometry
				uniform sampler2DArray attributesArray;
				uniform usampler2D materialIndexAttribute;
				uniform sampler2D materials;
				uniform sampler2DArray textures;
				uniform BVH bvh;

				// path tracer
				uniform int bounces;
				uniform int transmissiveBounces;
				uniform float filterGlossyFactor;
				uniform int seed;

				// image
				uniform vec2 resolution;
				uniform float opacity;

				varying vec2 vUv;

				// globals
				mat3 envRotation3x3;
				mat3 invEnvRotation3x3;
				float lightsDenom;

				// sampling
				${Pa}
				${Ra}
				${Ma}

				${La}
				${Na}
				${Ha}
				${Oa}
				${ka}
				${za}

				float applyFilteredGlossy( float roughness, float accumulatedRoughness ) {

					return clamp(
						max(
							roughness,
							accumulatedRoughness * filterGlossyFactor * 5.0 ),
						0.0,
						1.0
					);

				}

				vec3 sampleBackground( vec3 direction, vec2 uv ) {

					vec3 sampleDir = sampleHemisphere( direction, uv ) * 0.5 * backgroundBlur;

					#if FEATURE_BACKGROUND_MAP

					sampleDir = normalize( mat3( backgroundRotation ) * direction + sampleDir );
					return backgroundIntensity * sampleEquirectColor( backgroundMap, sampleDir );

					#else

					sampleDir = normalize( envRotation3x3 * direction + sampleDir );
					return environmentIntensity * sampleEquirectColor( envMapInfo.map, sampleDir );

					#endif

				}

				${Ga}
				${Wa}
				${$a}
				${Ua}
				${Va}
				${qa}

				void main() {

					// init
					rng_initialize( gl_FragCoord.xy, seed );
					sobolPixelIndex = ( uint( gl_FragCoord.x ) << 16 ) | uint( gl_FragCoord.y );
					sobolPathIndex = uint( seed );

					// get camera ray
					Ray ray = getCameraRay();

					// inverse environment rotation
					envRotation3x3 = mat3( environmentRotation );
					invEnvRotation3x3 = inverse( envRotation3x3 );
					lightsDenom =
						( environmentIntensity == 0.0 || envMapInfo.totalSum == 0.0 ) && lights.count != 0u ?
							float( lights.count ) :
							float( lights.count + 1u );

					// final color
					gl_FragColor = vec4( 0, 0, 0, 1 );

					// surface results
					SurfaceHit surfaceHit;
					ScatterRecord scatterRec;

					// path tracing state
					RenderState state = initRenderState();
					state.transmissiveTraversals = transmissiveBounces;
					#if FEATURE_FOG

					state.fogMaterial.fogVolume = bvhIntersectFogVolumeHit(
						ray.origin, - ray.direction,
						materialIndexAttribute, materials,
						state.fogMaterial
					);

					#endif

					for ( int i = 0; i < bounces; i ++ ) {

						sobolBounceIndex ++;

						state.depth ++;
						state.traversals = bounces - i;
						state.firstRay = i == 0 && state.transmissiveTraversals == transmissiveBounces;

						int hitType = traceScene( ray, state.fogMaterial, surfaceHit );

						// check if we intersect any lights and accumulate the light contribution
						// TODO: we can add support for light surface rendering in the else condition if we
						// add the ability to toggle visibility of the the light
						if ( ! state.firstRay && ! state.transmissiveRay ) {

							LightRecord lightRec;
							float lightDist = hitType == NO_HIT ? INFINITY : surfaceHit.dist;
							for ( uint i = 0u; i < lights.count; i ++ ) {

								if (
									intersectLightAtIndex( lights.tex, ray.origin, ray.direction, i, lightRec ) &&
									lightRec.dist < lightDist
								) {

									#if FEATURE_MIS

									// weight the contribution
									// NOTE: Only area lights are supported for forward sampling and can be hit
									float misWeight = misHeuristic( scatterRec.pdf, lightRec.pdf / lightsDenom );
									gl_FragColor.rgb += lightRec.emission * state.throughputColor * misWeight;

									#else

									gl_FragColor.rgb += lightRec.emission * state.throughputColor;

									#endif

								}

							}

						}

						if ( hitType == NO_HIT ) {

							if ( state.firstRay || state.transmissiveRay ) {

								gl_FragColor.rgb += sampleBackground( ray.direction, rand2( 2 ) ) * state.throughputColor;
								gl_FragColor.a = backgroundAlpha;

							} else {

								#if FEATURE_MIS

								// get the PDF of the hit envmap point
								vec3 envColor;
								float envPdf = sampleEquirect( envRotation3x3 * ray.direction, envColor );
								envPdf /= lightsDenom;

								// and weight the contribution
								float misWeight = misHeuristic( scatterRec.pdf, envPdf );
								gl_FragColor.rgb += environmentIntensity * envColor * state.throughputColor * misWeight;

								#else

								gl_FragColor.rgb +=
									environmentIntensity *
									sampleEquirectColor( envMapInfo.map, envRotation3x3 * ray.direction ) *
									state.throughputColor;

								#endif

							}
							break;

						}

						uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
						Material material = readMaterialInfo( materials, materialIndex );

						#if FEATURE_FOG

						if ( hitType == FOG_HIT ) {

							material = state.fogMaterial;
							state.accumulatedRoughness += 0.2;

						} else if ( material.fogVolume ) {

							state.fogMaterial = material;
							state.fogMaterial.fogVolume = surfaceHit.side == 1.0;

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );
							continue;

						}

						#endif

						// early out if this is a matte material
						if ( material.matte && state.firstRay ) {

							gl_FragColor = vec4( 0.0 );
							break;

						}

						// if we've determined that this is a shadow ray and we've hit an item with no shadow casting
						// then skip it
						if ( ! material.castShadow && state.isShadowRay ) {

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						SurfaceRecord surf;
						if (
							getSurfaceRecord(
								material, surfaceHit, attributesArray, state.accumulatedRoughness,
								surf
							) == SKIP_SURFACE
						) {

							// only allow a limited number of transparency discards otherwise we could
							// crash the context with too long a loop.
							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						scatterRec = bsdfSample( - ray.direction, surf );
						state.isShadowRay = scatterRec.specularPdf < rand( 4 );

						bool isBelowSurface = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal ) < 0.0;
						vec3 hitPoint = stepRayOrigin( ray.origin, ray.direction, isBelowSurface ? - surf.faceNormal : surf.faceNormal, surfaceHit.dist );

						// next event estimation
						#if FEATURE_MIS

						gl_FragColor.rgb += directLightContribution( - ray.direction, surf, state, hitPoint );

						#endif

						// accumulate a roughness value to offset diffuse, specular, diffuse rays that have high contribution
						// to a single pixel resulting in fireflies
						// TODO: handle transmissive surfaces
						if ( ! surf.volumeParticle && ! isBelowSurface ) {

							// determine if this is a rough normal or not by checking how far off straight up it is
							vec3 halfVector = normalize( - ray.direction + scatterRec.direction );
							state.accumulatedRoughness += max(
								sin( acosApprox( dot( halfVector, surf.normal ) ) ),
								sin( acosApprox( dot( halfVector, surf.clearcoatNormal ) ) )
							);

							state.transmissiveRay = false;

						}

						// accumulate emissive color
						gl_FragColor.rgb += ( surf.emission * state.throughputColor );

						// skip the sample if our PDF or ray is impossible
						if ( scatterRec.pdf <= 0.0 || ! isDirectionValid( scatterRec.direction, surf.normal, surf.faceNormal ) ) {

							break;

						}

						// if we're bouncing around the inside a transmissive material then decrement
						// perform this separate from a bounce
						bool isTransmissiveRay = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal * surfaceHit.side ) < 0.0;
						if ( ( isTransmissiveRay || isBelowSurface ) && state.transmissiveTraversals > 0 ) {

							state.transmissiveTraversals --;
							i --;

						}

						//

						// handle throughput color transformation
						// attenuate the throughput color by the medium color
						if ( ! surf.frontFace ) {

							state.throughputColor *= transmissionAttenuation( surfaceHit.dist, surf.attenuationColor, surf.attenuationDistance );

						}

						#if FEATURE_RUSSIAN_ROULETTE

						// russian roulette path termination
						// https://www.arnoldrenderer.com/research/physically_based_shader_design_in_arnold.pdf
						uint minBounces = 3u;
						float depthProb = float( state.depth < minBounces );

						float rrProb = luminance( state.throughputColor * scatterRec.color / scatterRec.pdf );
						rrProb /= luminance( state.throughputColor );
						rrProb = sqrt( rrProb );
						rrProb = max( rrProb, depthProb );
						rrProb = min( rrProb, 1.0 );
						if ( rand( 8 ) > rrProb ) {

							break;

						}

						// perform sample clamping here to avoid bright pixels
						state.throughputColor *= min( 1.0 / rrProb, 20.0 );

						#endif

						// adjust the throughput and discard and exit if we find discard the sample if there are any NaNs
						state.throughputColor *= scatterRec.color / scatterRec.pdf;
						if ( any( isnan( state.throughputColor ) ) || any( isinf( state.throughputColor ) ) ) {

							break;

						}

						//

						// prepare for next ray
						ray.direction = scatterRec.direction;
						ray.origin = hitPoint;

					}

					gl_FragColor.a *= opacity;

					#if DEBUG_MODE == 1

					// output the number of rays checked in the path and number of
					// transmissive rays encountered.
					gl_FragColor.rgb = vec3(
						float( state.depth ),
						transmissiveBounces - state.transmissiveTraversals,
						0.0
					);
					gl_FragColor.a = 1.0;

					#endif

				}

			`}),this.setValues(e)}}function*ja(){const{_renderer:s,_fsQuad:e,_blendQuad:t,_primaryTarget:i,_blendTargets:n,_sobolTarget:a,_subframe:r,alpha:c,material:l}=this,h=new Ge,f=new Ge,u=t.material;let[o,m]=n;for(;;){c?(u.opacity=this._opacityFactor/(this.samples+1),l.blending=nt,l.opacity=1):(l.opacity=this._opacityFactor/(this.samples+1),l.blending=Tr);const[g,y,d,b]=r,p=i.width,v=i.height;l.resolution.set(p*d,v*b),l.sobolTexture=a.texture,l.stratifiedTexture.init(20,l.bounces+l.transmissiveBounces+5),l.stratifiedTexture.next(),l.seed++;const x=this.tiles.x||1,T=this.tiles.y||1,S=x*T,w=Math.ceil(p*d),I=Math.ceil(v*b),R=Math.floor(g*p),A=Math.floor(y*v),M=Math.ceil(w/x),_=Math.ceil(I/T);for(let P=0;P<T;P++)for(let C=0;C<x;C++){const D=s.getRenderTarget(),E=s.autoClear,Re=s.getScissorTest();s.getScissor(h),s.getViewport(f);let Me=C,Ye=P;if(!this.stableTiles){const xe=this._currentTile%(x*T);Me=xe%x,Ye=~~(xe/x),this._currentTile=xe+1}const Pe=T-Ye-1;i.scissor.set(R+Me*M,A+Pe*_,Math.min(M,w-Me*M),Math.min(_,I-Pe*_)),i.viewport.set(R,A,w,I),s.setRenderTarget(i),s.setScissorTest(!0),s.autoClear=!1,e.render(s),s.setViewport(f),s.setScissor(h),s.setScissorTest(Re),s.setRenderTarget(D),s.autoClear=E,c&&(u.target1=o.texture,u.target2=i.texture,s.setRenderTarget(m),t.render(s),s.setRenderTarget(D)),this.samples+=1/S,C===x-1&&P===T-1&&(this.samples=Math.round(this.samples)),yield}[o,m]=[m,o]}}const cr=new at;class lr{get material(){return this._fsQuad.material}set material(e){this._fsQuad.material.removeEventListener("recompilation",this._compileFunction),e.addEventListener("recompilation",this._compileFunction),this._fsQuad.material=e}get target(){return this._alpha?this._blendTargets[1]:this._primaryTarget}set alpha(e){this._alpha!==e&&(e||(this._blendTargets[0].dispose(),this._blendTargets[1].dispose()),this._alpha=e,this.reset())}get alpha(){return this._alpha}get isCompiling(){return!!this._compilePromise}constructor(e){this.camera=null,this.tiles=new j(3,3),this.stableNoise=!1,this.stableTiles=!0,this.samples=0,this._subframe=new Ge(0,0,1,1),this._opacityFactor=1,this._renderer=e,this._alpha=!1,this._fsQuad=new $e(new Ya),this._blendQuad=new $e(new Nn),this._task=null,this._currentTile=0,this._compilePromise=null,this._sobolTarget=new Un().generate(e),this._primaryTarget=new rt(1,1,{format:V,type:G,magFilter:k,minFilter:k}),this._blendTargets=[new rt(1,1,{format:V,type:G,magFilter:k,minFilter:k}),new rt(1,1,{format:V,type:G,magFilter:k,minFilter:k})],this._compileFunction=()=>{const t=this.compileMaterial(this._fsQuad._mesh);t.then(()=>{this._compilePromise===t&&(this._compilePromise=null)}),this._compilePromise=t},this.material.addEventListener("recompilation",this._compileFunction)}compileMaterial(){return this._renderer.compileAsync(this._fsQuad._mesh)}setCamera(e){const{material:t}=this;t.cameraWorldMatrix.copy(e.matrixWorld),t.invProjectionMatrix.copy(e.projectionMatrixInverse),t.physicalCamera.updateFrom(e);let i=0;e.projectionMatrix.elements[15]>0&&(i=1),e.isEquirectCamera&&(i=2),t.setDefine("CAMERA_TYPE",i),this.camera=e}setSize(e,t){e=Math.ceil(e),t=Math.ceil(t),!(this._primaryTarget.width===e&&this._primaryTarget.height===t)&&(this._primaryTarget.setSize(e,t),this._blendTargets[0].setSize(e,t),this._blendTargets[1].setSize(e,t),this.reset())}getSize(e){e.x=this._primaryTarget.width,e.y=this._primaryTarget.height}dispose(){this._primaryTarget.dispose(),this._blendTargets[0].dispose(),this._blendTargets[1].dispose(),this._sobolTarget.dispose(),this._fsQuad.dispose(),this._blendQuad.dispose(),this._task=null}reset(){const{_renderer:e,_primaryTarget:t,_blendTargets:i}=this,n=e.getRenderTarget(),a=e.getClearAlpha();e.getClearColor(cr),e.setRenderTarget(t),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(i[0]),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(i[1]),e.setClearColor(0,0),e.clearColor(),e.setClearColor(cr,a),e.setRenderTarget(n),this.samples=0,this._task=null,this.material.stratifiedTexture.stableNoise=this.stableNoise,this.stableNoise&&(this.material.seed=0,this.material.stratifiedTexture.reset())}update(){this.material.onBeforeRender(),!this.isCompiling&&(this._task||(this._task=ja.call(this)),this._task.next())}}const Ae=new j,ur=new j,It=new is,Rt=new at;class Xa extends ee{constructor(e=512,t=512){super(new Float32Array(e*t*4),e,t,V,G,wr,pe,ge,re,re),this.generationCallback=null}update(){this.dispose(),this.needsUpdate=!0;const{data:e,width:t,height:i}=this.image;for(let n=0;n<t;n++)for(let a=0;a<i;a++){ur.set(t,i),Ae.set(n/t,a/i),Ae.x-=.5,Ae.y=1-Ae.y,It.theta=Ae.x*2*Math.PI,It.phi=Ae.y*Math.PI,It.radius=1,this.generationCallback(It,Ae,ur,Rt);const c=4*(a*t+n);e[c+0]=Rt.r,e[c+1]=Rt.g,e[c+2]=Rt.b,e[c+3]=1}}copy(e){return super.copy(e),this.generationCallback=e.generationCallback,this}}const fr=new F;class Qa extends Xa{constructor(e=512){super(e,e),this.topColor=new at().set(16777215),this.bottomColor=new at().set(0),this.exponent=2,this.generationCallback=(t,i,n,a)=>{fr.setFromSpherical(t);const r=fr.y*.5+.5;a.lerpColors(this.bottomColor,this.topColor,r**this.exponent)}}copy(e){return super.copy(e),this.topColor.copy(e.topColor),this.bottomColor.copy(e.bottomColor),this}}class Ka extends Bt{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}constructor(e){super({uniforms:{map:{value:null},opacity:{value:1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				uniform float opacity;
				varying vec2 vUv;

				vec4 clampedTexelFatch( sampler2D map, ivec2 px, int lod ) {

					vec4 res = texelFetch( map, ivec2( px.x, px.y ), 0 );

					#if defined( TONE_MAPPING )

					res.xyz = toneMapping( res.xyz );

					#endif

			  		return linearToOutputTexel( res );

				}

				void main() {

					vec2 size = vec2( textureSize( map, 0 ) );
					vec2 pxUv = vUv * size;
					vec2 pxCurr = floor( pxUv );
					vec2 pxFrac = fract( pxUv ) - 0.5;
					vec2 pxOffset;
					pxOffset.x = pxFrac.x > 0.0 ? 1.0 : - 1.0;
					pxOffset.y = pxFrac.y > 0.0 ? 1.0 : - 1.0;

					vec2 pxNext = clamp( pxOffset + pxCurr, vec2( 0.0 ), size - 1.0 );
					vec2 alpha = abs( pxFrac );

					vec4 p1 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxCurr.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxCurr.y ), 0 ),
						alpha.x
					);

					vec4 p2 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxNext.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxNext.y ), 0 ),
						alpha.x
					);

					gl_FragColor = mix( p1, p2, alpha.y );
					gl_FragColor.a *= opacity;
					#include <premultiplied_alpha_fragment>

				}
			`}),this.setValues(e)}}class Za extends Bt{constructor(){super({uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`
				#define ENVMAP_TYPE_CUBE_UV

				uniform samplerCube envMap;
				uniform float flipEnvMap;
				varying vec2 vUv;

				#include <common>
				#include <cube_uv_reflection_fragment>

				${Nr}

				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					rayDirection.x *= flipEnvMap;
					gl_FragColor = textureCube( envMap, rayDirection );

				}`}),this.depthWrite=!1,this.depthTest=!1}}class hr{constructor(e){this._renderer=e,this._quad=new $e(new Za)}generate(e,t=null,i=null){if(!e.isCubeTexture)throw new Error("CubeToEquirectMaterial: Source can only be cube textures.");const n=e.images[0],a=this._renderer,r=this._quad;t===null&&(t=4*n.height),i===null&&(i=2*n.height);const c=new rt(t,i,{type:G,colorSpace:n.colorSpace}),l=n.height,h=Math.log2(l)-2,f=1/l,u=1/(3*Math.max(Math.pow(2,h),112));r.material.defines.CUBEUV_MAX_MIP=`${h}.0`,r.material.defines.CUBEUV_TEXEL_WIDTH=u,r.material.defines.CUBEUV_TEXEL_HEIGHT=f,r.material.uniforms.envMap.value=e,r.material.uniforms.flipEnvMap.value=e.isRenderTargetTexture?1:-1,r.material.needsUpdate=!0;const o=a.getRenderTarget(),m=a.autoClear;a.autoClear=!0,a.setRenderTarget(c),r.render(a),a.setRenderTarget(o),a.autoClear=m;const g=new Uint16Array(t*i*4),y=new Float32Array(t*i*4);a.readRenderTargetPixels(c,0,0,t,i,y),c.dispose();for(let b=0,p=y.length;b<p;b++)g[b]=le.toHalfFloat(y[b]);const d=new ee(g,t,i,V,ne);return d.minFilter=rs,d.magFilter=re,d.wrapS=pe,d.wrapT=pe,d.mapping=wr,d.needsUpdate=!0,d}dispose(){this._quad.dispose()}}function Ja(s){return s.extensions.get("EXT_float_blend")}const Ue=new j;class io{get multipleImportanceSampling(){return!!this._pathTracer.material.defines.FEATURE_MIS}set multipleImportanceSampling(e){this._pathTracer.material.setDefine("FEATURE_MIS",e?1:0)}get transmissiveBounces(){return this._pathTracer.material.transmissiveBounces}set transmissiveBounces(e){this._pathTracer.material.transmissiveBounces=e}get bounces(){return this._pathTracer.material.bounces}set bounces(e){this._pathTracer.material.bounces=e}get filterGlossyFactor(){return this._pathTracer.material.filterGlossyFactor}set filterGlossyFactor(e){this._pathTracer.material.filterGlossyFactor=e}get samples(){return this._pathTracer.samples}get target(){return this._pathTracer.target}get tiles(){return this._pathTracer.tiles}get stableNoise(){return this._pathTracer.stableNoise}set stableNoise(e){this._pathTracer.stableNoise=e}get isCompiling(){return!!this._pathTracer.isCompiling}constructor(e){this._renderer=e,this._generator=new Bn,this._pathTracer=new lr(e),this._queueReset=!1,this._clock=new ss,this._compilePromise=null,this._lowResPathTracer=new lr(e),this._lowResPathTracer.tiles.set(1,1),this._quad=new $e(new Ka({map:null,transparent:!0,blending:nt,premultipliedAlpha:e.getContextAttributes().premultipliedAlpha})),this._materials=null,this._previousEnvironment=null,this._previousBackground=null,this._internalBackground=null,this.renderDelay=100,this.minSamples=5,this.fadeDuration=500,this.enablePathTracing=!0,this.pausePathTracing=!1,this.dynamicLowRes=!1,this.lowResScale=.25,this.renderScale=1,this.synchronizeRenderSize=!0,this.rasterizeScene=!0,this.renderToCanvas=!0,this.textureSize=new j(1024,1024),this.rasterizeSceneCallback=(t,i)=>{this._renderer.render(t,i)},this.renderToCanvasCallback=(t,i,n)=>{const a=i.autoClear;i.autoClear=!1,n.render(i),i.autoClear=a},this.setScene(new ns,new br)}setBVHWorker(e){this._generator.setBVHWorker(e)}setScene(e,t,i={}){e.updateMatrixWorld(!0),t.updateMatrixWorld();const n=this._generator;if(n.setObjects(e),this._buildAsync)return n.generateAsync(i.onProgress).then(a=>this._updateFromResults(e,t,a));{const a=n.generate();return this._updateFromResults(e,t,a)}}setSceneAsync(...e){this._buildAsync=!0;const t=this.setScene(...e);return this._buildAsync=!1,t}setCamera(e){this.camera=e,this.updateCamera()}updateCamera(){const e=this.camera;e.updateMatrixWorld(),this._pathTracer.setCamera(e),this._lowResPathTracer.setCamera(e),this.reset()}updateMaterials(){const e=this._pathTracer.material,t=this._renderer,i=this._materials,n=this.textureSize,a=sa(i);e.textures.setTextures(t,a,n.x,n.y),e.materials.updateFrom(i,a),this.reset()}updateLights(){const e=this.scene,t=this._renderer,i=this._pathTracer.material,n=na(e),a=ra(n);i.lights.updateFrom(n,a),i.iesProfiles.setTextures(t,a),this.reset()}updateEnvironment(){const e=this.scene,t=this._pathTracer.material;if(this._internalBackground&&(this._internalBackground.dispose(),this._internalBackground=null),t.backgroundBlur=e.backgroundBlurriness,t.backgroundIntensity=e.backgroundIntensity??1,t.backgroundRotation.makeRotationFromEuler(e.backgroundRotation).invert(),e.background===null)t.backgroundMap=null,t.backgroundAlpha=0;else if(e.background.isColor){this._colorBackground=this._colorBackground||new Qa(16);const i=this._colorBackground;i.topColor.equals(e.background)||(i.topColor.set(e.background),i.bottomColor.set(e.background),i.update()),t.backgroundMap=i,t.backgroundAlpha=1}else if(e.background.isCubeTexture){if(e.background!==this._previousBackground){const i=new hr(this._renderer).generate(e.background);this._internalBackground=i,t.backgroundMap=i,t.backgroundAlpha=1}}else t.backgroundMap=e.background,t.backgroundAlpha=1;if(t.environmentIntensity=e.environmentIntensity??1,t.environmentRotation.makeRotationFromEuler(e.environmentRotation).invert(),this._previousEnvironment!==e.environment)if(e.environment!==null)if(e.environment.isCubeTexture){const i=new hr(this._renderer).generate(e.environment);t.envMapInfo.updateFrom(i)}else t.envMapInfo.updateFrom(e.environment);else t.environmentIntensity=0;this._previousEnvironment=e.environment,this._previousBackground=e.background,this.reset()}_updateFromResults(e,t,i){const{materials:n,geometry:a,bvh:r,bvhChanged:c}=i;this._materials=n;const h=this._pathTracer.material;return c&&(h.bvh.updateFrom(r),h.attributesArray.updateFrom(a.attributes.normal,a.attributes.tangent,a.attributes.uv,a.attributes.color),h.materialIndexAttribute.updateFrom(a.attributes.materialIndex)),this._previousScene=e,this.scene=e,this.camera=t,this.updateCamera(),this.updateMaterials(),this.updateEnvironment(),this.updateLights(),i}renderSample(){const e=this._lowResPathTracer,t=this._pathTracer,i=this._renderer,n=this._clock,a=this._quad;this._updateScale(),this._queueReset&&(t.reset(),e.reset(),this._queueReset=!1,a.material.opacity=0,n.start());const r=n.getDelta()*1e3,c=n.getElapsedTime()*1e3;if(!this.pausePathTracing&&this.enablePathTracing&&this.renderDelay<=c&&!this.isCompiling&&t.update(),t.alpha=t.material.backgroundAlpha!==1||!Ja(i),e.alpha=t.alpha,this.renderToCanvas){const l=this._renderer,h=this.minSamples;if(c>=this.renderDelay&&this.samples>=this.minSamples&&(this.fadeDuration!==0?a.material.opacity=Math.min(a.material.opacity+r/this.fadeDuration,1):a.material.opacity=1),!this.enablePathTracing||this.samples<h||a.material.opacity<1){if(this.dynamicLowRes&&!this.isCompiling){e.samples<1&&(e.material=t.material,e.update());const f=a.material.opacity;a.material.opacity=1-a.material.opacity,a.material.map=e.target.texture,a.render(l),a.material.opacity=f}(!this.dynamicLowRes&&this.rasterizeScene||this.dynamicLowRes&&this.isCompiling)&&this.rasterizeSceneCallback(this.scene,this.camera)}this.enablePathTracing&&a.material.opacity>0&&(a.material.opacity<1&&(a.material.blending=this.dynamicLowRes?as:Tr),a.material.map=t.target.texture,this.renderToCanvasCallback(t.target,l,a),a.material.blending=nt)}}reset(){this._queueReset=!0,this._pathTracer.samples=0}dispose(){this._renderQuad.dispose(),this._renderQuad.material.dispose(),this._pathTracer.dispose()}_updateScale(){if(this.synchronizeRenderSize){this._renderer.getDrawingBufferSize(Ue);const e=Math.floor(this.renderScale*Ue.x),t=Math.floor(this.renderScale*Ue.y);if(this._pathTracer.getSize(Ue),Ue.x!==e||Ue.y!==t){const i=this.lowResScale;this._pathTracer.setSize(e,t),this._lowResPathTracer.setSize(Math.floor(e*i),Math.floor(t*i))}}}}export{$e as F,io as W};
