/**
 * @module Sidebar.Material
 * @description Geant4 material selection panel for the Three.js editor sidebar.
 *
 * Replaces the default Three.js Sidebar.Material.js via a Vite alias defined
 * in vite.config.mjs. Vendor files under vendor/threejs/ are never modified.
 *
 * Material data is sourced from two companion modules:
 *   - PeriodicTable.js  — 98 elements (Z = 1–98)
 *   - CompoundMaterials.js — NIST, HEP/Nuclear, Space, and Bio-Chemical compounds
 *
 * Selected material metadata is persisted on `object.userData.g4Material` so it
 * survives serialization and is available to the Geant4 export pipeline.
 */

import * as THREE from 'three';

import {
  UIInput,
  UIPanel,
  UIRow,
  UISelect,
  UIText,
} from 'three/editor/js/libs/ui.js';
import { SetMaterialValueCommand } from 'three/editor/js/commands/SetMaterialValueCommand.js';
import { SidebarMaterialColorProperty } from 'three/editor/js/Sidebar.Material.ColorProperty.js';
import { SidebarMaterialNumberProperty } from 'three/editor/js/Sidebar.Material.NumberProperty.js';

import { periodicTableData, getElementByType } from './PeriodicTable.js';
import {
  nistCompoundMaterialOptions,
  hnMaterialOptions,
  spaceMaterialOptions,
  bioMaterialOptions,
  getCompoundByType,
} from './CompoundMaterials.js';

/** Enum-like keys for material category selection. */
const MATERIAL_TYPES = {
  ELEMENT: 'element',
  NIST: 'nist',
  HN: 'hn',
  SPACE: 'space',
  BIO: 'bio',
};

function SidebarMaterial(editor) {
  const signals = editor.signals;
  const strings = editor.strings;

  let currentObject;
  let currentMaterialSlot = 0;

  const container = new UIPanel();
  container.setBorderTop('0');
  container.setDisplay('none');
  container.setPaddingTop('20px');

  // Current material slot (for multi-material objects)
  const materialSlotRow = new UIRow();
  materialSlotRow.add(
    new UIText(strings.getKey('sidebar/material/slot')).setClass('Label')
  );
  const materialSlotSelect = new UISelect()
    .setWidth('170px')
    .setFontSize('12px')
    .onChange(update);
  materialSlotSelect.setOptions({ 0: '' }).setValue(0);
  materialSlotRow.add(materialSlotSelect);
  container.add(materialSlotRow);

  // Material Category Selection
  const materialCategoryRow = new UIRow();
  materialCategoryRow.add(new UIText('Category').setClass('Label'));

  const materialCategorySelect = new UISelect()
    .setWidth('150px')
    .setFontSize('12px');
  materialCategorySelect.setOptions({
    [MATERIAL_TYPES.ELEMENT]: 'Elements (Periodic Table)',
    [MATERIAL_TYPES.NIST]: 'NIST Compounds',
    [MATERIAL_TYPES.HN]: 'HEP & Nuclear',
    [MATERIAL_TYPES.SPACE]: 'Space Materials',
    [MATERIAL_TYPES.BIO]: 'Bio-Chemical',
  });
  materialCategorySelect.setValue(MATERIAL_TYPES.ELEMENT);
  materialCategorySelect.onChange(onCategoryChange);
  materialCategoryRow.add(materialCategorySelect);
  container.add(materialCategoryRow);

  // Element Selection Row (for periodic table elements)
  const elementSelectRow = new UIRow();
  elementSelectRow.add(new UIText('Element').setClass('Label'));

  const elementSelect = new UISelect().setWidth('150px').setFontSize('12px');
  const elementOptions = {};
  periodicTableData.forEach((el) => {
    elementOptions[el.elementType] =
      `${el.symbol} (${el.id}) - ${el.elementType}`;
  });
  elementSelect.setOptions(elementOptions);
  elementSelect.onChange(onMaterialSelect);
  elementSelectRow.add(elementSelect);
  container.add(elementSelectRow);

  // Compound Selection Row (for NIST, HN, Space, Bio)
  const compoundSelectRow = new UIRow();
  compoundSelectRow.add(new UIText('Material').setClass('Label'));

  const compoundSelect = new UISelect().setWidth('150px').setFontSize('12px');
  compoundSelect.onChange(onMaterialSelect);
  compoundSelectRow.add(compoundSelect);
  container.add(compoundSelectRow);

  // Density Display
  const densityRow = new UIRow();
  densityRow.add(new UIText('Density (g/cm³)').setClass('Label'));
  const densityDisplay = new UIInput()
    .setWidth('150px')
    .setFontSize('12px')
    .setDisabled(true);
  densityRow.add(densityDisplay);
  container.add(densityRow);

  // Mean Excitation Energy Display
  const energyRow = new UIRow();
  energyRow.add(new UIText('E (eV)').setClass('Label'));
  const energyDisplay = new UIInput()
    .setWidth('150px')
    .setFontSize('12px')
    .setDisabled(true);
  energyRow.add(energyDisplay);
  container.add(energyRow);

  // Color
  const materialColor = new SidebarMaterialColorProperty(
    editor,
    'color',
    strings.getKey('sidebar/material/color')
  );
  container.add(materialColor);

  // Opacity
  const materialOpacity = new SidebarMaterialNumberProperty(
    editor,
    'opacity',
    strings.getKey('sidebar/material/opacity'),
    [0, 1]
  );
  container.add(materialOpacity);

  /**
   * Guards against cascading updates. When `true`, change handlers skip
   * committing state so that `refreshUI()` can restore dropdowns without
   * side-effects. See `commitMaterialToObject()` and `onMaterialSelect()`.
   */
  let isRestoring = false;

  /** Updates the read-only density and energy display fields. Pure UI — no side effects. */
  function updateDisplayFields(materialData) {
    if (!materialData) return;

    const densityValue =
      materialData.density < 0.01
        ? materialData.density.toExponential(4)
        : materialData.density.toFixed(4);

    densityDisplay.setValue(densityValue);
    energyDisplay.setValue(materialData.energy);
  }

  /** Returns the material data object matching the currently visible dropdown selection. */
  function getMaterialDataFromUI() {
    const category = materialCategorySelect.getValue();

    if (category === MATERIAL_TYPES.ELEMENT) {
      return getElementByType(elementSelect.getValue());
    } else {
      return getCompoundByType(compoundSelect.getValue());
    }
  }

  /** Populates the compound dropdown for the given category and returns its materials array. */
  function populateCompoundOptions(category) {
    let materials = [];

    switch (category) {
      case MATERIAL_TYPES.NIST:
        materials = nistCompoundMaterialOptions;
        break;
      case MATERIAL_TYPES.HN:
        materials = hnMaterialOptions;
        break;
      case MATERIAL_TYPES.SPACE:
        materials = spaceMaterialOptions;
        break;
      case MATERIAL_TYPES.BIO:
        materials = bioMaterialOptions;
        break;
    }

    const options = {};
    materials.forEach((m) => {
      const displayName = m.elementType.replace('G4_', '').replace(/_/g, ' ');
      options[m.elementType] = displayName;
    });

    compoundSelect.setOptions(options);

    return materials;
  }

  /** Handles category dropdown changes — toggles row visibility and auto-selects the first material. */
  function onCategoryChange() {
    const category = materialCategorySelect.getValue();

    if (category === MATERIAL_TYPES.ELEMENT) {
      elementSelectRow.setDisplay('');
      compoundSelectRow.setDisplay('none');

      if (!isRestoring) {
        const materialData = getElementByType(elementSelect.getValue());
        updateDisplayFields(materialData);
      }
    } else {
      elementSelectRow.setDisplay('none');
      compoundSelectRow.setDisplay('');

      const materials = populateCompoundOptions(category);

      if (materials.length > 0) {
        compoundSelect.setValue(materials[0].elementType);
        updateDisplayFields(materials[0]);

        if (!isRestoring && currentObject) {
          commitMaterialToObject(materials[0]);
        }
      }
    }
  }

  /** Handles element/compound dropdown selection — updates display and commits to object. */
  function onMaterialSelect() {
    const materialData = getMaterialDataFromUI();

    if (materialData) {
      updateDisplayFields(materialData);

      if (!isRestoring && currentObject) {
        commitMaterialToObject(materialData);
      }
    }
  }

  /**
   * Persists the selected material to the current object. This is the single
   * mutation point — all other functions are either pure-UI or read-only.
   *
   * IMPORTANT: userData must be written before `editor.execute()` because the
   * command dispatches `signals.materialChanged` → `refreshUI()`, which reads
   * userData to restore dropdown state. Writing after would cause a one-behind lag.
   */
  function commitMaterialToObject(materialData) {
    if (!currentObject || !materialData) return;

    const category = materialCategorySelect.getValue();

    currentObject.userData.g4Material = {
      category: category,
      elementType: materialData.elementType,
      density: materialData.density,
      energy: materialData.energy,
    };

    editor.execute(
      new SetMaterialValueCommand(
        editor,
        currentObject,
        'name',
        materialData.elementType,
        currentMaterialSlot
      )
    );
  }

  function update() {
    const previousSelectedSlot = currentMaterialSlot;
    currentMaterialSlot = parseInt(materialSlotSelect.getValue());

    if (currentMaterialSlot !== previousSelectedSlot) {
      editor.signals.materialChanged.dispatch(
        currentObject,
        currentMaterialSlot
      );
    }

    let material = editor.getObjectMaterial(currentObject, currentMaterialSlot);

    if (material) {
      refreshUI();
    }
  }

  function setRowVisibility() {
    const material = currentObject.material;

    if (Array.isArray(material)) {
      materialSlotRow.setDisplay('');
    } else {
      materialSlotRow.setDisplay('none');
    }
  }

  /** Rebuilds all UI fields from the current object's state. */
  function refreshUI() {
    if (!currentObject) return;

    isRestoring = true;

    let material = currentObject.material;

    if (Array.isArray(material)) {
      const slotOptions = {};
      currentMaterialSlot = Math.max(
        0,
        Math.min(material.length, currentMaterialSlot)
      );

      for (let i = 0; i < material.length; i++) {
        slotOptions[i] = String(i + 1) + ': ' + material[i].name;
      }

      materialSlotSelect.setOptions(slotOptions).setValue(currentMaterialSlot);
    }

    material = editor.getObjectMaterial(currentObject, currentMaterialSlot);

    if (currentObject.userData.g4Material) {
      const g4Data = currentObject.userData.g4Material;
      const category = g4Data.category || MATERIAL_TYPES.ELEMENT;

      materialCategorySelect.setValue(category);

      if (category === MATERIAL_TYPES.ELEMENT) {
        elementSelectRow.setDisplay('');
        compoundSelectRow.setDisplay('none');
        elementSelect.setValue(g4Data.elementType);
      } else {
        elementSelectRow.setDisplay('none');
        compoundSelectRow.setDisplay('');
        populateCompoundOptions(category);
        compoundSelect.setValue(g4Data.elementType);
      }

      updateDisplayFields(g4Data);
    } else {
      materialCategorySelect.setValue(MATERIAL_TYPES.ELEMENT);
      elementSelectRow.setDisplay('');
      compoundSelectRow.setDisplay('none');

      const firstElement = periodicTableData[0];
      if (firstElement) {
        elementSelect.setValue(firstElement.elementType);
        updateDisplayFields(firstElement);
      }
    }

    setRowVisibility();

    isRestoring = false;
  }

  // Signal listeners

  signals.objectSelected.add(function (object) {
    let hasMaterial = false;

    if (object && object.material) {
      hasMaterial = true;

      if (Array.isArray(object.material) && object.material.length === 0) {
        hasMaterial = false;
      }
    }

    if (hasMaterial) {
      currentObject = object;
      refreshUI();
      container.setDisplay('');
    } else {
      currentObject = null;
      container.setDisplay('none');
    }
  });

  signals.materialChanged.add(refreshUI);

  // Initial state
  isRestoring = true;
  elementSelectRow.setDisplay('');
  compoundSelectRow.setDisplay('none');
  if (periodicTableData[0]) {
    elementSelect.setValue(periodicTableData[0].elementType);
    updateDisplayFields(periodicTableData[0]);
  }
  isRestoring = false;

  return container;
}

export { SidebarMaterial };
