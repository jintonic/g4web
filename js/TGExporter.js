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
    let variableText = '';
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
            variableText += `// Half x, Half y, Half z\n`;
            rotationText += rot;
            solidText += `:solid ${name} BOX ${p.pX}*cm ${p.pY}*cm ${p.pZ}*cm\n`;
            break;

          case 'G4Sphere':
            variableText += `// inner, outer radius, starting/delta phi, starting/delta theta\n`;
            rotationText += rot;
            solidText += `:solid ${name} SPHERE ${p.pRMin}*cm ${p.pRMax}*cm ${p.pSPhi} ${p.pDPhi} ${p.pSTheta} ${p.pDTheta}\n`;
            break;

          case 'G4Tubs':
            variableText += `// Rin, Rout, half z, start phi, dphi in degree\n`;
            rotationText += rot;
            solidText += `:solid ${name} TUBS ${p.pRMin}*cm ${p.pRMax}*cm ${p.pDz}*cm ${p.pSPhi} ${p.pDPhi}\n`;
            break;

          case 'G4Cons':
            variableText += `// Rin at -z/2, Rout at -z/2, Rin at z/2, Rout at z/2, z/2, start phi, dphi\n`;
            rotationText += rot;
            solidText += `:solid ${name} CONS ${p.pRmin2}*cm ${p.pRmax2}*cm ${p.pRmin1}*cm ${p.pRmax1}*cm ${p.pDz}*cm ${p.pSPhi} ${p.pDPhi}\n`;
            break;

          case 'G4Para':
            variableText += `// half x, y, z in cm, alpha, theta, phi in degrees\n`;
            rotationText += rot;
            solidText += `:solid ${name} PARA ${p.dx}*cm ${p.dy}*cm ${p.dz}*cm ${p.alpha} ${p.theta} ${p.phi}\n`;
            break;

          case 'G4Trd':
            variableText += `// half (X at -dz, X at +dz, Y at -dz, Y at +dz, dz)\n`;
            rotationText += rot;
            solidText += `:solid ${name} TRD ${p.dx1}*cm ${p.dx2}*cm ${p.dy1}*cm ${p.dy2}*cm ${p.dz}*cm\n`;
            break;

          case 'G4Trap':
            variableText += `// pDz, pTheta, pPhi, pDy1, pDx1, pDx2, pAlp1, pDy2, pDx3, pDx4, pAlp2\n`;
            rotationText += rot;
            solidText += `:solid ${name} TRAP ${p.pDz}*cm ${p.pTheta} ${p.pPhi} ${p.pDy1}*cm ${p.pDx1}*cm ${p.pDx2}*cm ${p.pAlpha1} ${p.pDy2}*cm ${p.pDx3}*cm ${p.pDx4}*cm ${p.pAlpha2}\n`;
            break;

          case 'G4Trap4':
            variableText += `// half z, half y, half x, x at top\n`;
            rotationText += rot;
            solidText += `:solid ${name} TRAP ${p.pZ}*cm ${p.pY}*cm ${p.pX}*cm ${p.pLTX}*cm\n`;
            break;

          case 'G4Torus':
            variableText += `// inner radius, outer radius, swept radius, starting phi, delta phi\n`;
            rotationText += rot;
            solidText += `:solid ${name} TORUS ${p.pRMin}*cm ${p.pRMax}*cm ${p.pRTor}*cm ${p.pSPhi} ${p.pDPhi}\n`;
            break;

          case 'G4EllipticalTube':
            variableText += `// half x, y, z\n`;
            rotationText += rot;
            solidText += `:solid ${name} ELLIPTICALTUBE ${p.dx}*cm ${p.dy}*cm ${p.dz}*cm\n`;
            break;

          case 'G4Ellipsoid':
            variableText += `// semi axis x, y, z, z bottom cut, z top cut\n`;
            rotationText += rot;
            solidText += `:solid ${name} ELLIPSOID ${p.xSemiAxis}*cm ${p.ySemiAxis}*cm ${p.zSemiAxis}*cm ${p.zBottomCut}*cm ${p.zTopCut}*cm\n`;
            break;

          case 'G4EllipticalCone':
            variableText += `// scaling x, y, z apex, z top plane\n`;
            rotationText += rot;
            solidText += `:solid ${name} ELLIPTICALCONE ${p.xSemiAxis}/${(p.zHeight + p.zTopCut) * 10}*cm ${p.ySemiAxis}/${(p.zHeight + p.zTopCut) * 10}*cm ${p.zHeight}*cm ${p.zTopCut}*cm\n`;
            break;

          case 'G4TwistedBox':
            variableText += `// twist angle in degree, half x, y, z in cm\n`;
            rotationText += rot;
            solidText += `:solid ${name} TWISTEDBOX ${p.twistedAngle}*degree ${p.pDx}*cm ${p.pDy}*cm ${p.pDz}*cm\n`;
            break;

          case 'G4TwistedTrd':
            variableText += `// half (x at -dz, x at +dz, y at -dz, y at +dz, z, angle)\n`;
            rotationText += rot;
            solidText += `:solid ${name} TWISTEDTRD ${p.dx1}*cm ${p.dx2}*cm ${p.dy1}*cm ${p.dy2}*cm ${p.dz}*cm ${p.twistedAngle}*degree\n`;
            break;

          case 'G4TwistedTrap':
            variableText += `// twisted angle, half dz, theta, phi, dy1, dx1, dx2, dy2, dx3, dx4, alpha\n`;
            rotationText += rot;
            solidText += `:solid ${name} TWISTEDTRAP ${p.twistedAngle}*degree ${p.dz}*cm ${p.theta}*degree ${p.phi}*degree ${p.dy1}*cm ${p.dx1}*cm ${p.dx2}*cm ${p.dy2}*cm ${p.dx3}*cm ${p.dx4}*cm ${p.alpha}*degree\n`;
            break;

          case 'G4TwistedTubs':
            variableText += `// twist angle, Rin, Rout, half z, dphi\n`;
            rotationText += rot;
            solidText += `:solid ${name} TWISTEDTUBS ${p.twistedAngle}*degree ${p.pRMin}*cm ${p.pRMax}*cm ${p.pDz}*cm ${p.pDPhi}*degree\n`;
            break;

          case 'G4Tet':
            variableText += `// anchor point, point 2, 3, 4\n`;
            rotationText += rot;
            solidText += `:solid ${name} TET ${p.anchor[0].toFixed(7)}*cm ${p.anchor[1].toFixed(7)}*cm ${p.anchor[2].toFixed(7)}*cm ${p.pP2[0].toFixed(7)}*cm ${p.pP2[1].toFixed(7)}*cm ${p.pP2[2].toFixed(7)}*cm ${p.pP3[0].toFixed(7)}*cm ${p.pP3[1].toFixed(7)}*cm ${p.pP3[2].toFixed(7)}*cm ${p.pP4[0].toFixed(7)}*cm ${p.pP4[1].toFixed(7)}*cm ${p.pP4[2].toFixed(7)}*cm\n`;
            break;

          case 'G4Hype':
            variableText += `// inner radius, outer radius, inner stereo angle, outer stereo angle, half z\n`;
            rotationText += rot;
            solidText += `:solid ${name} HYPE ${p.innerRadius}*cm ${p.outerRadius}*cm ${p.innerStereo} ${p.outerStereo} ${p.pDz}*cm\n`;
            break;

          case 'G4Polycone':
            variableText += `// start phi, dphi in degree, # of z planes, (z rInner rOuter ...)\n`;
            rotationText += rot;
            solidText += `:solid ${name} POLYCONE ${p.pSPhi} ${p.pDPhi} ${p.numZPlanes} ${formatZPlaneData(p.zPlaneData)}\n`;
            break;

          case 'G4Polyhedra':
            variableText += `// start phi, dphi in degree, # of sides, # of z planes, (z rInner rOuter ...)\n`;
            rotationText += rot;
            solidText += `:solid ${name} POLYHEDRA ${p.pSPhi} ${p.pDPhi} ${p.numSide} ${p.numZPlanes} ${formatZPlaneData(p.zPlaneData)}\n`;
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
      sceneText += `${variableText}\n`;
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
