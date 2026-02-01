export function autoSave(editor) {
  editor.storage.init(function () {
    // 1. Load existing state
    editor.storage.get(async function (state) {
      if (state !== undefined) {
        await editor.fromJSON(state);
      } else {
        editor.signals.sceneEnvironmentChanged.dispatch('Default');
      }

      const selected = editor.config.getKey('selected');
      if (selected !== undefined) {
        editor.selectByUuid(selected);
      }
    });

    // 2. Setup Autosave
    let timeout;
    function saveState() {
      if (editor.config.getKey('autosave') === false) return;

      clearTimeout(timeout);
      timeout = setTimeout(function () {
        editor.signals.savingStarted.dispatch();
        // Give the UI a tiny moment to show the "saving" spinner if it exists
        setTimeout(function () {
          editor.storage.set(editor.toJSON());
          editor.signals.savingFinished.dispatch();
        }, 100);
      }, 1000);
    }

    // 3. Listen for changes
    const signals = editor.signals;
    const saveSignals = [
      signals.geometryChanged,
      signals.objectAdded,
      signals.objectChanged,
      signals.objectRemoved,
      signals.materialChanged,
      signals.sceneBackgroundChanged,
      signals.sceneEnvironmentChanged,
      signals.sceneFogChanged,
      signals.sceneGraphChanged,
      signals.scriptChanged,
      signals.historyChanged,
    ];

    saveSignals.forEach((signal) => signal.add(saveState));
  });
}
