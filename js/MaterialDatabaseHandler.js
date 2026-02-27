/**
 * @module MaterialDatabase
 * @description Centralized Geant4 material registry with scalable ID ranges.
 *
 * Imports raw material data from SimpleElementDatabase.js and CompoundMaterialDatabase.js,
 * assigns stable numeric IDs within reserved ranges, and exposes lookups
 * by the Geant4 `material` string — the canonical key for all materials.
 *
 * ID Range Allocation:
 *   Category               Range       Reserved Slots
 *   ─────────────────────  ──────────  ──────────────
 *   Elements (Periodic)    1–200       200
 *   NIST Compounds         201–500     300
 *   HEP & Nuclear          501–600     100
 *   Space Materials        601–700     100
 *   Bio-Chemical           701–900     200
 *
 * For elements, the numeric ID equals the atomic number (Z).
 * For compounds, IDs are auto-assigned sequentially from the range start.
 * Adding new entries to any category will never collide with another category.
 *
 * @see SimpleElementDatabase.js    — raw element data.
 * @see CompoundMaterialDatabase.js — raw compound data (NIST, HEP, Space, Bio).
 * @see Sidebar.Material.js  — consumes this module for the editor material panel.
 */

import { elements } from './SimpleElementDatabase.js';
import {
  nistCompounds,
  hnCompounds,
  spaceCompounds,
  bioCompounds,
} from './CompoundMaterialDatabase.js';

/** Material category keys. */
export const CATEGORY = Object.freeze({
  ELEMENT: 'element',
  NIST: 'nist',
  HN: 'hn',
  SPACE: 'space',
  BIO: 'bio',
});

/** Reserved ID ranges per category. */
export const ID_RANGES = Object.freeze({
  [CATEGORY.ELEMENT]: { start: 1, end: 200 },
  [CATEGORY.NIST]: { start: 201, end: 500 },
  [CATEGORY.HN]: { start: 501, end: 600 },
  [CATEGORY.SPACE]: { start: 601, end: 700 },
  [CATEGORY.BIO]: { start: 701, end: 900 },
});

/** @type {Map<string, Object>} Materials keyed by `material`. */
const registry = new Map();

/** @type {Map<string, Object[]>} Material arrays keyed by category. */
const categoryMap = new Map();

/**
 * Registers a batch of materials for a single category.
 *
 * @param {string} category   One of {@link CATEGORY} values.
 * @param {Object[]} entries  Raw material objects (must have `material`).
 * @param {Object}  [options]
 * @param {boolean} [options.useAtomicNumber=false]  When `true`, the
 *   `atomicNumber` field on each entry is used as the numeric ID (elements
 *   use this so that ID === Z). Otherwise IDs are auto-assigned starting
 *   from the category's range start.
 */
function registerCategory(category, entries, { useAtomicNumber = false } = {}) {
  const range = ID_RANGES[category];

  if (!range) {
    throw new Error(`MaterialDatabase: unknown category "${category}".`);
  }

  const registered = [];
  let nextAutoId = range.start;

  for (const raw of entries) {
    if (!raw.material) {
      throw new Error(
        `MaterialDatabase: entry in "${category}" is missing material.`
      );
    }

    if (registry.has(raw.material)) {
      throw new Error(
        `MaterialDatabase: duplicate material "${raw.material}".`
      );
    }

    const id = useAtomicNumber ? raw.atomicNumber : nextAutoId;

    if (id < range.start || id > range.end) {
      throw new Error(
        `MaterialDatabase: ID ${id} for "${raw.material}" is outside ` +
          `the ${category} range [${range.start}–${range.end}].`
      );
    }

    const entry = Object.freeze({ ...raw, id, category });
    registry.set(raw.material, entry);
    registered.push(entry);

    if (!useAtomicNumber) {
      nextAutoId++;
    }
  }

  categoryMap.set(category, Object.freeze(registered));
}

registerCategory(CATEGORY.ELEMENT, elements, { useAtomicNumber: true });
registerCategory(CATEGORY.NIST, nistCompounds);
registerCategory(CATEGORY.HN, hnCompounds);
registerCategory(CATEGORY.SPACE, spaceCompounds);
registerCategory(CATEGORY.BIO, bioCompounds);

// Public API

/**
 * Looks up a material by its Geant4 type string.
 *
 * @param {string} material  e.g. `'G4_Fe'`, `'G4_WATER'`
 * @returns {Object|undefined}  The registry entry, or `undefined`.
 */
export function getMaterial(material) {
  return registry.get(material);
}

/**
 * Looks up a material by its numeric ID.
 *
 * @param {number} id
 * @returns {Object|undefined}
 */
export function getMaterialById(id) {
  for (const entry of registry.values()) {
    if (entry.id === id) return entry;
  }

  return undefined;
}

/**
 * Returns all registered materials in a given category.
 *
 * @param {string} category  One of {@link CATEGORY} values.
 * @returns {Object[]}
 */
export function getMaterialsByCategory(category) {
  return categoryMap.get(category) ?? [];
}

/**
 * Returns all registered elements.
 *
 * @returns {Object[]}
 */
export function getElements() {
  return getMaterialsByCategory(CATEGORY.ELEMENT);
}
