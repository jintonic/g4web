import { UIPanel, UIRow } from 'three/editor/js/libs/ui.js';

function MenubarShare(editor) {
  const container = new UIPanel();
  container.setClass('menu');

  const title = new UIPanel();
  title.setClass('title');
  title.setTextContent('Share');
  container.add(title);

  const options = new UIPanel();
  options.setClass('options');
  container.add(options);

  const option = new UIRow();
  option.setClass('option');
  option.setTextContent('Take Screenshot');
  option.onClick(async function () {
    const { showShareScreenshotPanel } =
      await import('/js/ShareScreenshotPanel.js');
    showShareScreenshotPanel(editor);
  });
  options.add(option);

  return container;
}

export { MenubarShare };
