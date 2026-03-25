import tippy from 'tippy.js';

import {
  UIPanel,
  UIRow,
  UIText,
  UIInput,
  UISpan,
  UINumber,
  UIInteger,
  UIDiv,
} from '../vendor/threejs/editor/js/libs/ui.js';
import { SetGeometryValueCommand } from '../vendor/threejs/editor/js/commands/SetGeometryValueCommand.js';
import { SetGeometryCommand } from '../vendor/threejs/editor/js/commands/SetGeometryCommand.js';
import { getEditorConfig } from '@chitrashensah/geant4-csg';

function addStopPropagation(input) {
  input.dom.addEventListener('pointerup', (e) => e.stopPropagation());
  input.dom.addEventListener('mouseup', (e) => e.stopPropagation());
}

function buildZPlaneRows(container, numPlanes, zPlaneData, onChange) {
  container.clear();
  const inputs = [];

  const headerRow = new UIRow();
  headerRow.add(new UIText('#').setWidth('30px'));
  headerRow.add(new UIText('Z').setWidth('55px'));
  headerRow.add(new UIText('rInner').setWidth('55px'));
  headerRow.add(new UIText('rOuter').setWidth('55px'));
  container.add(headerRow);

  for (let i = 0; i < numPlanes; i++) {
    const row = new UIRow();
    row.add(new UIText(`${i + 1}`).setWidth('30px'));

    const zInput = new UINumber(zPlaneData[i * 3] ?? i)
      .setWidth('55px')
      .onChange(onChange);
    const rInnerInput = new UINumber(zPlaneData[i * 3 + 1] ?? 0)
      .setWidth('55px')
      .onChange(onChange);
    const rOuterInput = new UINumber(zPlaneData[i * 3 + 2] ?? 1)
      .setWidth('55px')
      .onChange(onChange);

    addStopPropagation(zInput);
    addStopPropagation(rInnerInput);
    addStopPropagation(rOuterInput);

    row.add(zInput);
    row.add(rInnerInput);
    row.add(rOuterInput);
    container.add(row);
    inputs.push({ z: zInput, rInner: rInnerInput, rOuter: rOuterInput });
  }

  return inputs;
}

function SidebarGeometry(editor) {
  const signals = editor.signals;

  const container = new UIPanel();

  let currentGeometryType = null;

  const geometryTypeRow = new UIRow();
  const geometryType = new UIText();

  geometryTypeRow.add(new UIText('Type').setWidth('90px'));
  geometryTypeRow.add(geometryType);

  container.add(geometryTypeRow);

  const geometryNameRow = new UIRow();
  const geometryName = new UIInput().onChange(function () {
    const nameConstraint = (name) => {
      const regex = /^[a-zA-Z0-9_]+$/;
      if (!regex.test(name)) {
        alert('Warning: Name cannot contain spaces or symbols.');
        geometryName.setValue('');
        return false;
      } else {
        return true;
      }
    };

    if (editor.selected.geometry && nameConstraint(geometryName.getValue())) {
      editor.execute(
        new SetGeometryValueCommand(
          editor,
          editor.selected,
          'name',
          geometryName.getValue()
        )
      );
    }
  });

  geometryNameRow.add(new UIText('Name').setWidth('90px'));
  geometryNameRow.add(geometryName);

  container.add(geometryNameRow);

  const parameters = new UISpan();
  container.add(parameters);

  function buildGeometryParameters(object) {
    const geometry = object.geometry;
    const geometryType = geometry.type;
    const parametersContainer = new UIPanel();

    const config = getEditorConfig(geometryType, SetGeometryCommand);

    if (!config) {
      console.warn('No configuration found for:', geometryType);
      return parametersContainer;
    }

    const uiControls = {};
    const currentValues = {};
    let zPlaneContainer = null;
    let zPlaneInputsRef = [];

    Object.keys(config.parameters).forEach((paramName) => {
      const param = config.parameters[paramName];
      const geometryKey = param.geometryKey || paramName;
      currentValues[paramName] =
        geometry.parameters[geometryKey] !== undefined
          ? geometry.parameters[geometryKey]
          : param.default;
    });

    function getZPlaneData() {
      return zPlaneInputsRef.flatMap((row) => [
        row.z.getValue(),
        row.rInner.getValue(),
        row.rOuter.getValue(),
      ]);
    }

    function updateGeometry() {
      Object.keys(uiControls).forEach((paramName) => {
        const ctrl = uiControls[paramName];
        if (ctrl.isZPlane) {
          currentValues[paramName] = getZPlaneData();
        } else if (ctrl.isVector3) {
          currentValues[paramName] = [
            ctrl.x.getValue(),
            ctrl.y.getValue(),
            ctrl.z.getValue(),
          ];
        } else {
          currentValues[paramName] = ctrl.getValue();
        }
      });

      if (config.validate) {
        const validatedValues = config.validate({ ...currentValues });
        Object.keys(validatedValues).forEach((paramName) => {
          if (currentValues[paramName] !== validatedValues[paramName]) {
            currentValues[paramName] = validatedValues[paramName];
            const ctrl = uiControls[paramName];
            if (ctrl && !ctrl.isZPlane && !ctrl.isVector3) {
              ctrl.setValue(validatedValues[paramName]);
            }
          }

          // re-resolve dynamic max and min in the same pass
          const param = config.parameters[paramName];
          const ctrl = uiControls[paramName];
          if (ctrl && !ctrl.isZPlane && !ctrl.isVector3) {
            const resolvedMax =
              typeof param?.max === 'function'
                ? param.max(currentValues)
                : param?.max;
            const resolvedMin =
              typeof param?.min === 'function'
                ? param.min(currentValues)
                : param?.min;
            if (resolvedMax !== undefined || resolvedMin !== undefined) {
              ctrl.setRange(resolvedMin ?? 0, resolvedMax ?? Infinity);
            }
          }
        });
      }

      currentValues.pName = geometry.parameters.pName || geometry.name;
      editor.execute(
        new config.SetGeometryCommand(
          editor,
          object,
          config.createGeometry(currentValues)
        )
      );
    }

    Object.keys(config.parameters).forEach((paramName) => {
      const param = config.parameters[paramName];

      if (param.type === 'string') return;

      if (param.type === 'info') {
        const infoRow = new UIRow();
        const infoText = new UIText(param.label);
        infoText.dom.style.cssText = 'color:#4a9eda;';
        infoRow.add(infoText);
        parametersContainer.add(infoRow);
        return;
      }

      if (param.type === 'zplane') {
        zPlaneContainer = new UIDiv();
        parametersContainer.add(zPlaneContainer);
        zPlaneInputsRef = buildZPlaneRows(
          zPlaneContainer,
          currentValues.numZPlanes ?? 2,
          currentValues[paramName] ?? param.default,
          updateGeometry
        );
        uiControls[paramName] = { isZPlane: true };
        return;
      }

      const row = new UIRow();
      row.add(new UIText(param.label).setWidth('90px'));

      if (param.type === 'vector3') {
        const vals = currentValues[paramName] || [0, 0, 0];
        const x = new UINumber(vals[0])
          .setWidth('50px')
          .onChange(updateGeometry);
        const y = new UINumber(vals[1])
          .setWidth('50px')
          .onChange(updateGeometry);
        const z = new UINumber(vals[2])
          .setWidth('50px')
          .onChange(updateGeometry);
        addStopPropagation(x);
        addStopPropagation(y);
        addStopPropagation(z);
        row.add(x);
        row.add(y);
        row.add(z);
        parametersContainer.add(row);
        uiControls[paramName] = { isVector3: true, x, y, z };
        return;
      }

      if (param.type === 'integer') {
        const control = new UIInteger(currentValues[paramName])
          .setRange(param.min ?? 1, param.max ?? Infinity)
          .onChange(() => {
            if (paramName === 'numZPlanes' && zPlaneContainer) {
              currentValues.numZPlanes = control.getValue();
              zPlaneInputsRef = buildZPlaneRows(
                zPlaneContainer,
                control.getValue(),
                getZPlaneData(),
                updateGeometry
              );
            }
            updateGeometry();
          });
        addStopPropagation(control);
        row.add(control);
        parametersContainer.add(row);
        uiControls[paramName] = control;
        return;
      }

      const resolvedMax =
        typeof param.max === 'function' ? param.max(currentValues) : param.max;
      const resolvedMin =
        typeof param.min === 'function' ? param.min(currentValues) : param.min;

      const control = new UINumber(currentValues[paramName])
        .setRange(resolvedMin, resolvedMax)
        .setStep(param.step || 1)
        .onChange(updateGeometry);

      addStopPropagation(control);
      row.add(control);

      if (param.type === 'angle') {
        row.add(new UIText('degree').setWidth('40px'));
      } else if (param.type === 'number') {
        row.add(new UIText('cm').setWidth('30px'));
      }

      uiControls[paramName] = control;
      parametersContainer.add(row);
    });

    return parametersContainer;
  }

  async function build() {
    const object = editor.selected;

    if (object && object.geometry && !object.source) {
      const geometry = object.geometry;

      container.setDisplay('block');
      geometryName.setValue(geometry.name);

      if (currentGeometryType !== geometry.type) {
        parameters.clear();
        parameters.add(buildGeometryParameters(object));
        currentGeometryType = geometry.type;
      }
    } else {
      container.setDisplay('none');
    }
  }

  signals.objectSelected.add(function (object) {
    currentGeometryType = null;
    if (object && !object.source && object.geometry) {
      build();
    } else {
      container.setDisplay('none');
    }
  });

  signals.geometryChanged.add(function (object) {
    if (object && !object.source && object === editor.selected) {
      build();
    }
  });

  return container;
}

export { SidebarGeometry };
