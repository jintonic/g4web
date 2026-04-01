class TGExporter {
  static async exportTg(editor) {
    const sourceUUIDs = new Set();
    editor.scene.traverse(function (obj) {
      if (obj.userData?.isSource === true) {
        obj.traverse((child) => sourceUUIDs.add(child.uuid));
      }
    });

    // Helper: solid name
    const sn = (o) => (o.geometry.name ? o.geometry.name : o.name);

    // Helper: format zPlaneData flat array into "z*cm rInner rOuter ..." groups
    function formatZPlaneData(zPlaneData) {
      const parts = [];
      for (let i = 0; i < zPlaneData.length; i += 3) {
        parts.push(
          `${zPlaneData[i]}*cm ${zPlaneData[i + 1]} ${zPlaneData[i + 2]}`
        );
      }
      return parts.join(' ');
    }

    const modelCount = editor.scene.children.length;

    let solidText = '';
    let voluText = '';
    let colorText = '';
    let placeText = '';
    let rotationText = '';
    let customMaterialText = '';

    if (modelCount > 0) {
      editor.scene.traverse(function (children) {
        if (!children.isMesh) return;
        if (sourceUUIDs.has(children.uuid)) return;

        const type = children.geometry.type;
        const p = children.geometry.parameters;
        const name = sn(children);
        const rot = `:rotm ${children.name}_rot ${(children.rotation.x * 180) / Math.PI} ${(children.rotation.y * 180) / Math.PI} ${(children.rotation.z * 180) / Math.PI}\n`;

        switch (type) {
          case 'G4Box':
            rotationText += rot;
            solidText += `// Half x, Half y, Half z\n:solid ${name} BOX ${p.pX}*cm ${p.pY}*cm ${p.pZ}*cm\n\n`;
            break;

          case 'G4Sphere':
            rotationText += rot;
            solidText += `// inner, outer radius, starting/delta phi, starting/delta theta\n:solid ${name} SPHERE ${p.pRmin}*cm ${p.pRmax}*cm ${p.pSPhi} ${p.pDPhi} ${p.pSTheta} ${p.pDTheta}\n\n`;
            break;

          case 'G4Tubs':
            rotationText += rot;
            solidText += `// Rin, Rout, half z, start phi, dphi in degree\n:solid ${name} TUBS ${p.pRmin}*cm ${p.pRmax}*cm ${p.pDz}*cm ${p.pSPhi} ${p.pDPhi}\n\n`;
            break;

          case 'G4Cons':
            rotationText += rot;
            solidText += `// Rin at -z/2, Rout at -z/2, Rin at z/2, Rout at z/2, z/2, start phi, dphi\n:solid ${name} CONS ${p.pRmin2}*cm ${p.pRmax2}*cm ${p.pRmin1}*cm ${p.pRmax1}*cm ${p.pDz}*cm ${p.pSPhi} ${p.pDPhi}\n\n`;
            break;

          case 'G4Para':
            rotationText += rot;
            solidText += `// half x, y, z in cm, alpha, theta, phi in degrees\n:solid ${name} PARA ${p.pDx}*cm ${p.pDy}*cm ${p.pDz}*cm ${p.pAlpha} ${p.pTheta} ${p.pPhi}\n\n`;
            break;

          case 'G4Trd':
            rotationText += rot;
            solidText += `// half (X at -dz, X at +dz, Y at -dz, Y at +dz, dz)\n:solid ${name} TRD ${p.pDx1}*cm ${p.pDx2}*cm ${p.pDy1}*cm ${p.pDy2}*cm ${p.pDz}*cm\n\n`;
            break;

          case 'G4Trap':
            rotationText += rot;
            solidText += `// pDz, pTheta, pPhi, pDy1, pDx1, pDx2, pAlp1, pDy2, pDx3, pDx4, pAlp2\n:solid ${name} TRAP ${p.pDz}*cm ${p.pTheta} ${p.pPhi} ${p.pDy1}*cm ${p.pDx1}*cm ${p.pDx2}*cm ${p.pAlpha1} ${p.pDy2}*cm ${p.pDx3}*cm ${p.pDx4}*cm ${p.pAlpha2}\n\n`;
            break;

          case 'G4Trap4':
            rotationText += rot;
            solidText += `// half z, half y, half x, x at top\n:solid ${name} TRAP ${p.pZ}*cm ${p.pY}*cm ${p.pX}*cm ${p.pLTX}*cm\n\n`;
            break;

          case 'G4Torus':
            rotationText += rot;
            solidText += `// inner radius, outer radius, swept radius, starting phi, delta phi\n:solid ${name} TORUS ${p.pRmin}*cm ${p.pRmax}*cm ${p.pRtor}*cm ${p.pSPhi} ${p.pDPhi}\n\n`;
            break;

          case 'G4EllipticalTube':
            rotationText += rot;
            solidText += `// half x, y, z\n:solid ${name} ELLIPTICALTUBE ${p.pDx}*cm ${p.pDy}*cm ${p.pDz}*cm\n\n`;
            break;

          case 'G4Ellipsoid':
            rotationText += rot;
            solidText += `// semi axis x, y, z, z bottom cut, z top cut\n:solid ${name} ELLIPSOID ${p.pSemiAxisX}*cm ${p.pSemiAxisY}*cm ${p.pSemiAxisZ}*cm ${p.pZBottomCut}*cm ${p.pZTopCut}*cm\n\n`;
            break;

          case 'G4EllipticalCone':
            rotationText += rot;
            solidText += `// scaling x, y, z apex, z top plane\n:solid ${name} ELLIPTICALCONE ${p.pSemiAxisX}/${(p.pHeight + p.pZTopCut) * 10}*cm ${p.pSemiAxisY}/${(p.pHeight + p.pZTopCut) * 10}*cm ${p.pHeight}*cm ${p.pZTopCut}*cm\n\n`;
            break;

          case 'G4TwistedBox':
            rotationText += rot;
            solidText += `// twist angle in degree, half x, y, z in cm\n:solid ${name} TWISTEDBOX ${p.pTwistedAngle}*degree ${p.pDx}*cm ${p.pDy}*cm ${p.pDz}*cm\n\n`;
            break;

          case 'G4TwistedTrd':
            rotationText += rot;
            solidText += `// half (x at -dz, x at +dz, y at -dz, y at +dz, z, angle)\n:solid ${name} TWISTEDTRD ${p.pDx1}*cm ${p.pDx2}*cm ${p.pDy1}*cm ${p.pDy2}*cm ${p.pDz}*cm ${p.pTwistedAngle}*degree\n\n`;
            break;

          case 'G4TwistedTrap':
            rotationText += rot;
            solidText += `// twisted angle, half dz, theta, phi, dy1, dx1, dx2, dy2, dx3, dx4, alpha\n:solid ${name} TWISTEDTRAP ${p.pTwistedAngle}*degree ${p.pDz}*cm ${p.pTheta}*degree ${p.pPhi}*degree ${p.pDy1}*cm ${p.pDx1}*cm ${p.pDx2}*cm ${p.pDy2}*cm ${p.pDx3}*cm ${p.pDx4}*cm ${p.pAlpha}*degree\n\n`;
            break;

          case 'G4TwistedTubs':
            rotationText += rot;
            solidText += `// twist angle, Rin, Rout, half z, dphi\n:solid ${name} TWISTEDTUBS ${p.pTwistedAngle}*degree ${p.pRmin}*cm ${p.pRmax}*cm ${p.pDz}*cm ${p.pDPhi}*degree\n\n`;
            break;

          case 'G4Tet':
            rotationText += rot;
            solidText += `// anchor point, point 2, 3, 4\n:solid ${name} TET ${p.anchor[0].toFixed(7)}*cm ${p.anchor[1].toFixed(7)}*cm ${p.anchor[2].toFixed(7)}*cm ${p.pP2[0].toFixed(7)}*cm ${p.pP2[1].toFixed(7)}*cm ${p.pP2[2].toFixed(7)}*cm ${p.pP3[0].toFixed(7)}*cm ${p.pP3[1].toFixed(7)}*cm ${p.pP3[2].toFixed(7)}*cm ${p.pP4[0].toFixed(7)}*cm ${p.pP4[1].toFixed(7)}*cm ${p.pP4[2].toFixed(7)}*cm\n\n`;
            break;

          case 'G4Hype':
            rotationText += rot;
            solidText += `// inner radius, outer radius, inner stereo angle, outer stereo angle, half z\n:solid ${name} HYPE ${p.pInnerRadius}*cm ${p.pOuterRadius}*cm ${p.pInnerStereo} ${p.pOuterStereo} ${p.pDz}*cm\n\n`;
            break;

          case 'G4Polycone':
            rotationText += rot;
            solidText += `// start phi, dphi in degree, # of z planes, (z rInner rOuter ...)\n:solid ${name} POLYCONE ${p.pSPhi} ${p.pDPhi} ${p.numZPlanes} ${formatZPlaneData(p.zPlaneData)}\n\n`;
            break;

          case 'G4Polyhedra':
            rotationText += rot;
            solidText += `// start phi, dphi in degree, # of sides, # of z planes, (z rInner rOuter ...)\n:solid ${name} POLYHEDRA ${p.pSPhi} ${p.pDPhi} ${p.numSide} ${p.numZPlanes} ${formatZPlaneData(p.zPlaneData)}\n\n`;
            break;

          default:
            break;
        }

        // :volu
        const excludedTypes = ['aGenericTrapGeometry', 'aParaboloidGeometry'];
        if (!excludedTypes.includes(type)) {
          let materialName = 'G4_Galactic';

          if (children.material.expertMaterialData?.text) {
            materialName =
              children.material.expertMaterialData.materialName ||
              'ExpertMaterial';
            customMaterialText += `${children.material.expertMaterialData.text}\n`;
          } else if (children.material.customMaterialData?.name) {
            materialName = children.material.customMaterialData.name;
            const data = children.material.customMaterialData;
            if (data.tag === ':ISOT') {
              customMaterialText += `:ISOT ${data.name} ${data.z} ${data.n} ${data.a}.\n`;
            } else if (data.tag === ':ELEM') {
              customMaterialText += `:ELEM ${data.name} ${data.symbol} ${data.z}. ${data.a}.\n`;
            } else if (data.tag === ':ELEM_FROM_ISOT') {
              let line = `:ELEM_FROM_ISOT ${data.name} ${data.symbol} ${data.numComponents}`;
              (data.isotopes || []).forEach((iso) => {
                line += ` ${iso.name} ${iso.fraction}`;
              });
              customMaterialText += line + '\n';
            } else if (data.tag === ':MATE') {
              customMaterialText += `:MATE ${data.name} ${data.z}. ${data.a} ${data.density}\n`;
            } else if (
              [
                ':MIXT',
                ':MIXT_BY_WEIGHT',
                ':MIXT_BY_NATOMS',
                ':MIXT_BY_VOLUME',
              ].includes(data.tag)
            ) {
              let line = `${data.tag} ${data.name} ${data.mixtDensity} ${data.numComponents}`;
              (data.components || []).forEach((c) => {
                line += ` ${c.name} ${c.proportion}`;
              });
              customMaterialText += line + '\n';
            }
          } else if (children.material.name) {
            materialName = children.material.name;
          } else if (children.material.newmaterial?.elementType) {
            materialName = children.material.newmaterial.elementType;
          }

          voluText += `:volu ${children.name} ${name} ${materialName}\n`;
        }

        // :color
        colorText += `:color ${children.name} ${children.material.color.r.toFixed(2)} ${children.material.color.g.toFixed(2)} ${children.material.color.b.toFixed(2)}\n`;

        // :place
        const pos = children.position;
        const parent = children.parent.isMesh ? children.parent.name : 'world';
        const fx = pos.x === 0 ? 0 : pos.x.toFixed(6) / 10 + '*cm';
        const fy = pos.y === 0 ? 0 : pos.y.toFixed(6) / 10 + '*cm';
        const fz = pos.z === 0 ? 0 : pos.z.toFixed(6) / 10 + '*cm';
        placeText += `:place ${children.name} ${children.copynumber || 1} ${parent} ${children.name}_rot ${fx} ${fy} ${fz}\n`;
      });

      let sceneText = `:volu world BOX 5*m 5*m 5*m G4_Galactic\n`;
      sceneText += `:vis world OFF\n\n`;
      if (customMaterialText) {
        sceneText += `// Custom material definitions\n${customMaterialText}\n`;
      }
      sceneText += `${rotationText || ':rotm r000 0 0 0'}\n`;
      sceneText += `${solidText}\n`;
      sceneText += `${voluText}\n`;
      sceneText += `${colorText}\n`;
      sceneText += `${placeText}\n`;
      return sceneText;
    } else {
      alert('The added model could not be found.');
    }
  }
}

export { TGExporter };
