class A{static async exportTg(x){const T=new Set;x.scene.traverse(function(i){var a;((a=i.userData)==null?void 0:a.isSource)===!0&&i.traverse(o=>T.add(o.uuid))});const g=i=>i.geometry.name?i.geometry.name:i.name;function D(i){const a=[];for(let o=0;o<i.length;o+=3)a.push(`${i[o]}*cm ${i[o+1]} ${i[o+2]}`);return a.join(" ")}const E=x.scene.children.length;let n="",u="",h="",z="",p="",s="";if(E>0){x.scene.traverse(function(a){var y,f,P;if(!a.isMesh||T.has(a.uuid))return;const o=a.geometry.type,e=a.geometry.parameters,$=g(a),m=`:rotm ${a.name}_rot ${a.rotation.x*180/Math.PI} ${a.rotation.y*180/Math.PI} ${a.rotation.z*180/Math.PI}
`;switch(o){case"G4Box":p+=m,n+=`// Half x, Half y, Half z
:solid ${$} BOX ${e.pX}*cm ${e.pY}*cm ${e.pZ}*cm

`;break;case"G4Sphere":p+=m,n+=`// inner, outer radius, starting/delta phi, starting/delta theta
:solid ${$} SPHERE ${e.pRmin}*cm ${e.pRmax}*cm ${e.pSPhi} ${e.pDPhi} ${e.pSTheta} ${e.pDTheta}

`;break;case"G4Tubs":p+=m,n+=`// Rin, Rout, half z, start phi, dphi in degree
:solid ${$} TUBS ${e.pRmin}*cm ${e.pRmax}*cm ${e.pDz}*cm ${e.pSPhi} ${e.pDPhi}

`;break;case"G4Cons":p+=m,n+=`// Rin at -z/2, Rout at -z/2, Rin at z/2, Rout at z/2, z/2, start phi, dphi
:solid ${$} CONS ${e.pRmin2}*cm ${e.pRmax2}*cm ${e.pRmin1}*cm ${e.pRmax1}*cm ${e.pDz}*cm ${e.pSPhi} ${e.pDPhi}

`;break;case"G4Para":p+=m,n+=`// half x, y, z in cm, alpha, theta, phi in degrees
:solid ${$} PARA ${e.pDx}*cm ${e.pDy}*cm ${e.pDz}*cm ${e.pAlpha} ${e.pTheta} ${e.pPhi}

`;break;case"G4Trd":p+=m,n+=`// half (X at -dz, X at +dz, Y at -dz, Y at +dz, dz)
:solid ${$} TRD ${e.pDx1}*cm ${e.pDx2}*cm ${e.pDy1}*cm ${e.pDy2}*cm ${e.pDz}*cm

`;break;case"G4Trap":p+=m,n+=`// pDz, pTheta, pPhi, pDy1, pDx1, pDx2, pAlp1, pDy2, pDx3, pDx4, pAlp2
:solid ${$} TRAP ${e.pDz}*cm ${e.pTheta} ${e.pPhi} ${e.pDy1}*cm ${e.pDx1}*cm ${e.pDx2}*cm ${e.pAlpha1} ${e.pDy2}*cm ${e.pDx3}*cm ${e.pDx4}*cm ${e.pAlpha2}

`;break;case"G4Trap4":p+=m,n+=`// half z, half y, half x, x at top
:solid ${$} TRAP ${e.pZ}*cm ${e.pY}*cm ${e.pX}*cm ${e.pLTX}*cm

`;break;case"G4Torus":p+=m,n+=`// inner radius, outer radius, swept radius, starting phi, delta phi
:solid ${$} TORUS ${e.pRmin}*cm ${e.pRmax}*cm ${e.pRtor}*cm ${e.pSPhi} ${e.pDPhi}

`;break;case"G4EllipticalTube":p+=m,n+=`// half x, y, z
:solid ${$} ELLIPTICALTUBE ${e.pDx}*cm ${e.pDy}*cm ${e.pDz}*cm

`;break;case"G4Ellipsoid":p+=m,n+=`// semi axis x, y, z, z bottom cut, z top cut
:solid ${$} ELLIPSOID ${e.pSemiAxisX}*cm ${e.pSemiAxisY}*cm ${e.pSemiAxisZ}*cm ${e.pZBottomCut}*cm ${e.pZTopCut}*cm

`;break;case"G4EllipticalCone":p+=m,n+=`// scaling x, y, z apex, z top plane
:solid ${$} ELLIPTICALCONE ${e.pSemiAxisX}/${(e.pHeight+e.pZTopCut)*10}*cm ${e.pSemiAxisY}/${(e.pHeight+e.pZTopCut)*10}*cm ${e.pHeight}*cm ${e.pZTopCut}*cm

`;break;case"G4TwistedBox":p+=m,n+=`// twist angle in degree, half x, y, z in cm
:solid ${$} TWISTEDBOX ${e.pTwistedAngle}*degree ${e.pDx}*cm ${e.pDy}*cm ${e.pDz}*cm

`;break;case"G4TwistedTrd":p+=m,n+=`// half (x at -dz, x at +dz, y at -dz, y at +dz, z, angle)
:solid ${$} TWISTEDTRD ${e.pDx1}*cm ${e.pDx2}*cm ${e.pDy1}*cm ${e.pDy2}*cm ${e.pDz}*cm ${e.pTwistedAngle}*degree

`;break;case"G4TwistedTrap":p+=m,n+=`// twisted angle, half dz, theta, phi, dy1, dx1, dx2, dy2, dx3, dx4, alpha
:solid ${$} TWISTEDTRAP ${e.pTwistedAngle}*degree ${e.pDz}*cm ${e.pTheta}*degree ${e.pPhi}*degree ${e.pDy1}*cm ${e.pDx1}*cm ${e.pDx2}*cm ${e.pDy2}*cm ${e.pDx3}*cm ${e.pDx4}*cm ${e.pAlpha}*degree

`;break;case"G4TwistedTubs":p+=m,n+=`// twist angle, Rin, Rout, half z, dphi
:solid ${$} TWISTEDTUBS ${e.pTwistedAngle}*degree ${e.pRmin}*cm ${e.pRmax}*cm ${e.pDz}*cm ${e.pDPhi}*degree

`;break;case"G4Tet":p+=m,n+=`// anchor point, point 2, 3, 4
:solid ${$} TET ${e.anchor[0].toFixed(7)}*cm ${e.anchor[1].toFixed(7)}*cm ${e.anchor[2].toFixed(7)}*cm ${e.pP2[0].toFixed(7)}*cm ${e.pP2[1].toFixed(7)}*cm ${e.pP2[2].toFixed(7)}*cm ${e.pP3[0].toFixed(7)}*cm ${e.pP3[1].toFixed(7)}*cm ${e.pP3[2].toFixed(7)}*cm ${e.pP4[0].toFixed(7)}*cm ${e.pP4[1].toFixed(7)}*cm ${e.pP4[2].toFixed(7)}*cm

`;break;case"G4Hype":p+=m,n+=`// inner radius, outer radius, inner stereo angle, outer stereo angle, half z
:solid ${$} HYPE ${e.pInnerRadius}*cm ${e.pOuterRadius}*cm ${e.pInnerStereo} ${e.pOuterStereo} ${e.pDz}*cm

`;break;case"G4Polycone":p+=m,n+=`// start phi, dphi in degree, # of z planes, (z rInner rOuter ...)
:solid ${$} POLYCONE ${e.pSPhi} ${e.pDPhi} ${e.numZPlanes} ${D(e.zPlaneData)}

`;break;case"G4Polyhedra":p+=m,n+=`// start phi, dphi in degree, # of sides, # of z planes, (z rInner rOuter ...)
:solid ${$} POLYHEDRA ${e.pSPhi} ${e.pDPhi} ${e.numSide} ${e.numZPlanes} ${D(e.zPlaneData)}

`;break}if(!["aGenericTrapGeometry","aParaboloidGeometry"].includes(o)){let c="G4_Galactic";if((y=a.material.expertMaterialData)!=null&&y.text)c=a.material.expertMaterialData.materialName||"ExpertMaterial",s+=`${a.material.expertMaterialData.text}
`;else if((f=a.material.customMaterialData)!=null&&f.name){c=a.material.customMaterialData.name;const t=a.material.customMaterialData;if(t.tag===":ISOT")s+=`:ISOT ${t.name} ${t.z} ${t.n} ${t.a}.
`;else if(t.tag===":ELEM")s+=`:ELEM ${t.name} ${t.symbol} ${t.z}. ${t.a}.
`;else if(t.tag===":ELEM_FROM_ISOT"){let l=`:ELEM_FROM_ISOT ${t.name} ${t.symbol} ${t.numComponents}`;(t.isotopes||[]).forEach(d=>{l+=` ${d.name} ${d.fraction}`}),s+=l+`
`}else if(t.tag===":MATE")s+=`:MATE ${t.name} ${t.z}. ${t.a} ${t.density}
`;else if([":MIXT",":MIXT_BY_WEIGHT",":MIXT_BY_NATOMS",":MIXT_BY_VOLUME"].includes(t.tag)){let l=`${t.tag} ${t.name} ${t.mixtDensity} ${t.numComponents}`;(t.components||[]).forEach(d=>{l+=` ${d.name} ${d.proportion}`}),s+=l+`
`}}else a.material.name?c=a.material.name:(P=a.material.newmaterial)!=null&&P.elementType&&(c=a.material.newmaterial.elementType);u+=`:volu ${a.name} ${$} ${c}
`}h+=`:color ${a.name} ${a.material.color.r.toFixed(2)} ${a.material.color.g.toFixed(2)} ${a.material.color.b.toFixed(2)}
`;const r=a.position,R=a.parent.isMesh?a.parent.name:"world",S=r.x===0?0:r.x.toFixed(6)/10+"*cm",b=r.y===0?0:r.y.toFixed(6)/10+"*cm",G=r.z===0?0:r.z.toFixed(6)/10+"*cm";z+=`:place ${a.name} ${a.copynumber||1} ${R} ${a.name}_rot ${S} ${b} ${G}
`});let i=`:volu world BOX 5*m 5*m 5*m G4_Galactic
`;return i+=`:vis world OFF

`,s&&(i+=`// Custom material definitions
${s}
`),i+=`${p||":rotm r000 0 0 0"}
`,i+=`${n}
`,i+=`${u}
`,i+=`${h}
`,i+=`${z}
`,i}else alert("The added model could not be found.")}}export{A as TGExporter};
