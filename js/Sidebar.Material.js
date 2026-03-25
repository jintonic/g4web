/**
 * @module Sidebar.Material
 * @description Geant4 material selection panel for the Three.js editor sidebar.
 *
 * Replaces the default Three.js Sidebar.Material.js via a Vite alias defined
 * in vite.config.mjs. Vendor files under vendor/threejs/ are never modified.
 *
 * Material data is provided by the centralized MaterialDatabaseHandler module,
 * which aggregates elements and compounds with scalable, range-based numeric IDs.
 *
 * Selected material metadata is persisted on `object.userData.g4Material` so it
 * survives serialization and is available to the Geant4 export pipeline.
 *
 * @see MaterialDatabaseHandler.js — centralized material registry and lookup API.
 */
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

import {
  CATEGORY,
  getElements,
  getMaterial,
  getMaterialsByCategory,
} from './MaterialDatabaseHandler.js';

function SidebarMaterial(editor) {
  const signals = editor.signals;
  const strings = editor.strings;

  let currentObject;
  let currentMaterialSlot = 0;

  const container = new UIPanel();
  container.setId('g4MaterialPanel');
  container.setDisplay('none');

  // Current material slot (for multi-material objects)
  const materialSlotRow = new UIRow();
  materialSlotRow.add(
    new UIText(strings.getKey('sidebar/material/slot')).setClass('Label')
  );
  const materialSlotSelect = new UISelect()
    .addClass('G4MaterialSlot')
    .onChange(update);
  materialSlotSelect.setOptions({ 0: '' }).setValue(0);
  materialSlotRow.add(materialSlotSelect);
  container.add(materialSlotRow);

  // Material Category Selection
  const materialCategoryRow = new UIRow();
  materialCategoryRow.add(new UIText('Category').setClass('Label'));

  const materialCategorySelect = new UISelect().addClass('G4MaterialSelect');
  materialCategorySelect.setOptions({
    [CATEGORY.ELEMENT]: 'Elements (Periodic Table)',
    [CATEGORY.NIST]: 'NIST Compounds',
    [CATEGORY.HN]: 'HEP & Nuclear',
    [CATEGORY.SPACE]: 'Space Materials',
    [CATEGORY.BIO]: 'Bio-Chemical',
  });
  materialCategorySelect.setValue(CATEGORY.ELEMENT);
  materialCategorySelect.onChange(onCategoryChange);
  materialCategoryRow.add(materialCategorySelect);
  container.add(materialCategoryRow);

  // Element Selection Row (for periodic table elements)
  const elementSelectRow = new UIRow();
  elementSelectRow.add(new UIText('Element').setClass('Label'));

  const elementSelect = new UISelect().addClass('G4MaterialSelect');
  const elementOptions = {};
  getElements().forEach((el) => {
    elementOptions[el.material] = `${el.symbol} (${el.id}) - ${el.material}`;
  });
  elementSelect.setOptions(elementOptions);
  elementSelect.onChange(onMaterialSelect);
  elementSelectRow.add(elementSelect);
  container.add(elementSelectRow);

  // Compound Selection Row (for NIST, HN, Space, Bio)
  const compoundSelectRow = new UIRow();
  compoundSelectRow.add(new UIText('Material').setClass('Label'));

  const compoundSelect = new UISelect().addClass('G4MaterialSelect');
  compoundSelect.onChange(onMaterialSelect);
  compoundSelectRow.add(compoundSelect);
  container.add(compoundSelectRow);

  // Density Display
  const densityRow = new UIRow();
  densityRow.add(new UIText('Density (g/cm³)').setClass('Label'));
  const densityDisplay = new UIInput()
    .addClass('G4MaterialDisplay')
    .setDisabled(true);
  densityRow.add(densityDisplay);
  container.add(densityRow);

  // Mean Excitation Energy Display
  const energyRow = new UIRow();
  energyRow.add(new UIText('E (eV)').setClass('Label'));
  const energyDisplay = new UIInput()
    .addClass('G4MaterialDisplay')
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
   * When `true`, change handlers skip committing state so that
   * `refreshUI()` can restore dropdowns without side-effects.
   */
  let isRestoring = false;

  /** Updates the read-only density and energy display fields. */
  function updateDisplayFields(materialData) {
    if (!materialData) return;

    const densityValue =
      materialData.density < 0.01
        ? materialData.density.toExponential(4)
        : materialData.density.toFixed(4);

    densityDisplay.setValue(densityValue);
    energyDisplay.setValue(materialData.energy);
  }

  /** Returns the material data matching the currently visible dropdown selection. */
  function getMaterialDataFromUI() {
    const category = materialCategorySelect.getValue();

    const materialKey =
      category === CATEGORY.ELEMENT
        ? elementSelect.getValue()
        : compoundSelect.getValue();

    return getMaterial(materialKey);
  }

  /** Populates the compound dropdown for the given category. */
  function populateCompoundOptions(category) {
    const materials = getMaterialsByCategory(category);

    const options = {};
    materials.forEach((m) => {
      const displayName = m.material.replace('G4_', '').replace(/_/g, ' ');
      options[m.material] = displayName;
    });

    compoundSelect.setOptions(options);

    return materials;
  }

  /** Handles category dropdown changes. */
  function onCategoryChange() {
    const category = materialCategorySelect.getValue();

    if (category === CATEGORY.ELEMENT) {
      elementSelectRow.setDisplay('');
      compoundSelectRow.setDisplay('none');

      if (!isRestoring) {
        const materialData = getMaterial(elementSelect.getValue());
        updateDisplayFields(materialData);
      }
    } else {
      elementSelectRow.setDisplay('none');
      compoundSelectRow.setDisplay('');

      const materials = populateCompoundOptions(category);

      if (materials.length > 0) {
        compoundSelect.setValue(materials[0].material);
        updateDisplayFields(materials[0]);

        if (!isRestoring && currentObject) {
          commitMaterialToObject(materials[0]);
        }
      }
    }
  }

  /** Handles element/compound dropdown selection. */
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
   * Persists the selected material to the current object.
   *
   * userData is written before `editor.execute()` because the command
   * dispatches `signals.materialChanged` → `refreshUI()`, which reads
   * userData to restore dropdown state.
   */
  function commitMaterialToObject(materialData) {
    if (!currentObject || !materialData) return;

    const category = materialCategorySelect.getValue();

    currentObject.userData.g4Material = {
      category: category,
      material: materialData.material,
      density: materialData.density,
      energy: materialData.energy,
    };

    editor.execute(
      new SetMaterialValueCommand(
        editor,
        currentObject,
        'name',
        materialData.material,
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

    // Derive UI state from material.name
    const lookedUp = getMaterial(material.name);

    if (lookedUp) {
      const category = lookedUp.category || CATEGORY.ELEMENT;

      // Sync userData
      currentObject.userData.g4Material = {
        category: category,
        material: lookedUp.material,
        density: lookedUp.density,
        energy: lookedUp.energy,
      };

      materialCategorySelect.setValue(category);

      if (category === CATEGORY.ELEMENT) {
        elementSelectRow.setDisplay('');
        compoundSelectRow.setDisplay('none');
        elementSelect.setValue(lookedUp.material);
      } else {
        elementSelectRow.setDisplay('none');
        compoundSelectRow.setDisplay('');
        populateCompoundOptions(category);
        compoundSelect.setValue(lookedUp.material);
      }

      updateDisplayFields(lookedUp);
    } else {
      materialCategorySelect.setValue(CATEGORY.ELEMENT);
      elementSelectRow.setDisplay('');
      compoundSelectRow.setDisplay('none');

      const firstElement = getElements()[0];
      if (firstElement) {
        elementSelect.setValue(firstElement.material);
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
  if (getElements()[0]) {
    elementSelect.setValue(getElements()[0].material);
    updateDisplayFields(getElements()[0]);
  }
  isRestoring = false;

  return container;
}

export { SidebarMaterial };
