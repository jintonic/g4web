export class FileDropHandler {
  constructor(editor) {
    this.editor = editor;
    this.loader = editor.loader;

    this.init();
  }

  init() {
    // prevent browser from opening the file in the tab
    document.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    });

    document.addEventListener('drop', (event) => {
      event.preventDefault();

      if (event.dataTransfer.types.includes('Files')) {
        // use the editor's built-in loader logic
        this.loader.loadFiles(event.dataTransfer.files);
      }
    });
  }
}
