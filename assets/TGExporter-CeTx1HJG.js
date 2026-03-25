class F{static async exportTg(T){const u=new Set;T.scene.traverse(function(m){var a;((a=m.userData)==null?void 0:a.isSource)===!0&&m.traverse(p=>u.add(p.uuid))});const M=m=>m.geometry.name?m.geometry.name:m.name;function z(m){const a=[];for(let p=0;p<m.length;p+=3)a.push(`${m[p]}*cm ${m[p+1]} ${m[p+2]}`);return a.join(" ")}const E=T.scene.children.length;let $="",h="",y="",f="",n="",i="",r="";if(E>0){T.scene.traverse(function(a){var D,g,P;if(!a.isMesh||u.has(a.uuid))return;const p=a.geometry.type,e=a.geometry.parameters,o=M(a),s=`:rotm ${a.name}_rot ${a.rotation.x*180/Math.PI} ${a.rotation.y*180/Math.PI} ${a.rotation.z*180/Math.PI}
`;switch(p){case"G4Box":i+=`// Half x, Half y, Half z
`,n+=s,$+=`:solid ${o} BOX ${e.pX}*cm ${e.pY}*cm ${e.pZ}*cm
`;break;case"G4Sphere":i+=`// inner, outer radius, starting/delta phi, starting/delta theta
`,n+=s,$+=`:solid ${o} SPHERE ${e.pRMin}*cm ${e.pRMax}*cm ${e.pSPhi} ${e.pDPhi} ${e.pSTheta} ${e.pDTheta}
`;break;case"G4Tubs":i+=`// Rin, Rout, half z, start phi, dphi in degree
`,n+=s,$+=`:solid ${o} TUBS ${e.pRMin}*cm ${e.pRMax}*cm ${e.pDz}*cm ${e.pSPhi} ${e.pDPhi}
`;break;case"G4Cons":i+=`// Rin at -z/2, Rout at -z/2, Rin at z/2, Rout at z/2, z/2, start phi, dphi
`,n+=s,$+=`:solid ${o} CONS ${e.pRmin2}*cm ${e.pRmax2}*cm ${e.pRmin1}*cm ${e.pRmax1}*cm ${e.pDz}*cm ${e.pSPhi} ${e.pDPhi}
`;break;case"G4Para":i+=`// half x, y, z in cm, alpha, theta, phi in degrees
`,n+=s,$+=`:solid ${o} PARA ${e.dx}*cm ${e.dy}*cm ${e.dz}*cm ${e.alpha} ${e.theta} ${e.phi}
`;break;case"G4Trd":i+=`// half (X at -dz, X at +dz, Y at -dz, Y at +dz, dz)
`,n+=s,$+=`:solid ${o} TRD ${e.dx1}*cm ${e.dx2}*cm ${e.dy1}*cm ${e.dy2}*cm ${e.dz}*cm
`;break;case"G4Trap":i+=`// pDz, pTheta, pPhi, pDy1, pDx1, pDx2, pAlp1, pDy2, pDx3, pDx4, pAlp2
`,n+=s,$+=`:solid ${o} TRAP ${e.pDz}*cm ${e.pTheta} ${e.pPhi} ${e.pDy1}*cm ${e.pDx1}*cm ${e.pDx2}*cm ${e.pAlpha1} ${e.pDy2}*cm ${e.pDx3}*cm ${e.pDx4}*cm ${e.pAlpha2}
`;break;case"G4Trap4":i+=`// half z, half y, half x, x at top
`,n+=s,$+=`:solid ${o} TRAP ${e.pZ}*cm ${e.pY}*cm ${e.pX}*cm ${e.pLTX}*cm
`;break;case"G4Torus":i+=`// inner radius, outer radius, swept radius, starting phi, delta phi
`,n+=s,$+=`:solid ${o} TORUS ${e.pRMin}*cm ${e.pRMax}*cm ${e.pRTor}*cm ${e.pSPhi} ${e.pDPhi}
`;break;case"G4EllipticalTube":i+=`// half x, y, z
`,n+=s,$+=`:solid ${o} ELLIPTICALTUBE ${e.dx}*cm ${e.dy}*cm ${e.dz}*cm
`;break;case"G4Ellipsoid":i+=`// semi axis x, y, z, z bottom cut, z top cut
`,n+=s,$+=`:solid ${o} ELLIPSOID ${e.xSemiAxis}*cm ${e.ySemiAxis}*cm ${e.zSemiAxis}*cm ${e.zBottomCut}*cm ${e.zTopCut}*cm
`;break;case"G4EllipticalCone":i+=`// scaling x, y, z apex, z top plane
`,n+=s,$+=`:solid ${o} ELLIPTICALCONE ${e.xSemiAxis}/${(e.zHeight+e.zTopCut)*10}*cm ${e.ySemiAxis}/${(e.zHeight+e.zTopCut)*10}*cm ${e.zHeight}*cm ${e.zTopCut}*cm
`;break;case"G4TwistedBox":i+=`// twist angle in degree, half x, y, z in cm
`,n+=s,$+=`:solid ${o} TWISTEDBOX ${e.twistedAngle}*degree ${e.pDx}*cm ${e.pDy}*cm ${e.pDz}*cm
`;break;case"G4TwistedTrd":i+=`// half (x at -dz, x at +dz, y at -dz, y at +dz, z, angle)
`,n+=s,$+=`:solid ${o} TWISTEDTRD ${e.dx1}*cm ${e.dx2}*cm ${e.dy1}*cm ${e.dy2}*cm ${e.dz}*cm ${e.twistedAngle}*degree
`;break;case"G4TwistedTrap":i+=`// twisted angle, half dz, theta, phi, dy1, dx1, dx2, dy2, dx3, dx4, alpha
`,n+=s,$+=`:solid ${o} TWISTEDTRAP ${e.twistedAngle}*degree ${e.dz}*cm ${e.theta}*degree ${e.phi}*degree ${e.dy1}*cm ${e.dx1}*cm ${e.dx2}*cm ${e.dy2}*cm ${e.dx3}*cm ${e.dx4}*cm ${e.alpha}*degree
`;break;case"G4TwistedTubs":i+=`// twist angle, Rin, Rout, half z, dphi
`,n+=s,$+=`:solid ${o} TWISTEDTUBS ${e.twistedAngle}*degree ${e.pRMin}*cm ${e.pRMax}*cm ${e.pDz}*cm ${e.pDPhi}*degree
`;break;case"G4Tet":i+=`// anchor point, point 2, 3, 4
`,n+=s,$+=`:solid ${o} TET ${e.anchor[0].toFixed(7)}*cm ${e.anchor[1].toFixed(7)}*cm ${e.anchor[2].toFixed(7)}*cm ${e.pP2[0].toFixed(7)}*cm ${e.pP2[1].toFixed(7)}*cm ${e.pP2[2].toFixed(7)}*cm ${e.pP3[0].toFixed(7)}*cm ${e.pP3[1].toFixed(7)}*cm ${e.pP3[2].toFixed(7)}*cm ${e.pP4[0].toFixed(7)}*cm ${e.pP4[1].toFixed(7)}*cm ${e.pP4[2].toFixed(7)}*cm
`;break;case"G4Hype":i+=`// inner radius, outer radius, inner stereo angle, outer stereo angle, half z
`,n+=s,$+=`:solid ${o} HYPE ${e.innerRadius}*cm ${e.outerRadius}*cm ${e.innerStereo} ${e.outerStereo} ${e.pDz}*cm
`;break;case"G4Polycone":i+=`// start phi, dphi in degree, # of z planes, (z rInner rOuter ...)
`,n+=s,$+=`:solid ${o} POLYCONE ${e.pSPhi} ${e.pDPhi} ${e.numZPlanes} ${z(e.zPlaneData)}
`;break;case"G4Polyhedra":i+=`// start phi, dphi in degree, # of sides, # of z planes, (z rInner rOuter ...)
`,n+=s,$+=`:solid ${o} POLYHEDRA ${e.pSPhi} ${e.pDPhi} ${e.numSide} ${e.numZPlanes} ${z(e.zPlaneData)}
`;break}if(!["aGenericTrapGeometry","aParaboloidGeometry"].includes(p)){let l="G4_Galactic";if((D=a.material.expertMaterialData)!=null&&D.text)l=a.material.expertMaterialData.materialName||"ExpertMaterial",r+=`${a.material.expertMaterialData.text}
`;else if((g=a.material.customMaterialData)!=null&&g.name){l=a.material.customMaterialData.name;const t=a.material.customMaterialData;if(t.tag===":ISOT")r+=`:ISOT ${t.name} ${t.z} ${t.n} ${t.a}.
`;else if(t.tag===":ELEM")r+=`:ELEM ${t.name} ${t.symbol} ${t.z}. ${t.a}.
`;else if(t.tag===":ELEM_FROM_ISOT"){let d=`:ELEM_FROM_ISOT ${t.name} ${t.symbol} ${t.numComponents}`;(t.isotopes||[]).forEach(x=>{d+=` ${x.name} ${x.fraction}`}),r+=d+`
`}else if(t.tag===":MATE")r+=`:MATE ${t.name} ${t.z}. ${t.a} ${t.density}
`;else if([":MIXT",":MIXT_BY_WEIGHT",":MIXT_BY_NATOMS",":MIXT_BY_VOLUME"].includes(t.tag)){let d=`${t.tag} ${t.name} ${t.mixtDensity} ${t.numComponents}`;(t.components||[]).forEach(x=>{d+=` ${x.name} ${x.proportion}`}),r+=d+`
`}}else a.material.name?l=a.material.name:(P=a.material.newmaterial)!=null&&P.elementType&&(l=a.material.newmaterial.elementType);h+=`:volu ${a.name} ${o} ${l}
`}y+=`:color ${a.name} ${a.material.color.r.toFixed(2)} ${a.material.color.g.toFixed(2)} ${a.material.color.b.toFixed(2)}
`;const c=a.position,R=a.parent.isMesh?a.parent.name:"world",S=c.x===0?0:c.x.toFixed(6)/10+"*cm",b=c.y===0?0:c.y.toFixed(6)/10+"*cm",G=c.z===0?0:c.z.toFixed(6)/10+"*cm";f+=`:place ${a.name} ${a.copynumber||1} ${R} ${a.name}_rot ${S} ${b} ${G}
`});let m=`:volu world BOX 5*m 5*m 5*m G4_Galactic
`;return m+=`:vis world OFF

`,r&&(m+=`// Custom material definitions
${r}
`),m+=`${n||":rotm r000 0 0 0"}
`,m+=`${i}
`,m+=`${$}
`,m+=`${h}
`,m+=`${y}
`,m+=`${f}
`,m}else alert("The added model could not be found.")}}export{F as TGExporter};
