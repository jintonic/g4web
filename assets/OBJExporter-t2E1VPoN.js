import{H as V,C as W,a3 as L,a2 as S,y as N,s as k}from"./main-z5BJ3CM8.js";class E{parse(j){let r="",a=0,v=0,A=0;const n=new V,b=new W,y=new V,M=new L,d=[];function w(e){let m=0,x=0,l=0;const f=e.geometry,t=new S,i=f.getAttribute("position"),s=f.getAttribute("normal"),p=f.getAttribute("uv"),B=f.getIndex();if(r+="o "+e.name+`
`,e.material&&e.material.name&&(r+="usemtl "+e.material.name+`
`),i!==void 0)for(let o=0,u=i.count;o<u;o++,m++)n.fromBufferAttribute(i,o),n.applyMatrix4(e.matrixWorld),r+="v "+n.x+" "+n.y+" "+n.z+`
`;if(p!==void 0)for(let o=0,u=p.count;o<u;o++,l++)M.fromBufferAttribute(p,o),r+="vt "+M.x+" "+M.y+`
`;if(s!==void 0){t.getNormalMatrix(e.matrixWorld);for(let o=0,u=s.count;o<u;o++,x++)y.fromBufferAttribute(s,o),y.applyMatrix3(t).normalize(),r+="vn "+y.x+" "+y.y+" "+y.z+`
`}if(B!==null)for(let o=0,u=B.count;o<u;o+=3){for(let c=0;c<3;c++){const g=B.getX(o+c)+1;d[c]=a+g+(s||p?"/"+(p?v+g:"")+(s?"/"+(A+g):""):"")}r+="f "+d.join(" ")+`
`}else for(let o=0,u=i.count;o<u;o+=3){for(let c=0;c<3;c++){const g=o+c+1;d[c]=a+g+(s||p?"/"+(p?v+g:"")+(s?"/"+(A+g):""):"")}r+="f "+d.join(" ")+`
`}a+=m,v+=l,A+=x}function z(e){let m=0;const x=e.geometry,l=e.type,f=x.getAttribute("position");if(r+="o "+e.name+`
`,f!==void 0)for(let t=0,i=f.count;t<i;t++,m++)n.fromBufferAttribute(f,t),n.applyMatrix4(e.matrixWorld),r+="v "+n.x+" "+n.y+" "+n.z+`
`;if(l==="Line"){r+="l ";for(let t=1,i=f.count;t<=i;t++)r+=a+t+" ";r+=`
`}if(l==="LineSegments")for(let t=1,i=t+1,s=f.count;t<s;t+=2,i=t+1)r+="l "+(a+t)+" "+(a+i)+`
`;a+=m}function C(e){let m=0;const x=e.geometry,l=x.getAttribute("position"),f=x.getAttribute("color");if(r+="o "+e.name+`
`,l!==void 0){for(let t=0,i=l.count;t<i;t++,m++)n.fromBufferAttribute(l,t),n.applyMatrix4(e.matrixWorld),r+="v "+n.x+" "+n.y+" "+n.z,f!==void 0&&(b.fromBufferAttribute(f,t),N.workingToColorSpace(b,k),r+=" "+b.r+" "+b.g+" "+b.b),r+=`
`;r+="p ";for(let t=1,i=l.count;t<=i;t++)r+=a+t+" ";r+=`
`}a+=m}return j.traverse(function(e){e.isMesh===!0&&w(e),e.isLine===!0&&z(e),e.isPoints===!0&&C(e)}),r}}export{E as OBJExporter};
