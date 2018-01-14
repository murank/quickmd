// lib/controls.ts

import Control from './control';

/**
 * Declare controls.
 */
interface Controls {
  // global tags
  body: Control;
  title: Control;

  // buttons
  editButton: Control;
  saveButton: Control;

  // options
  markdown: Control;
  userStyle: Control;

  // global pane
  contentPane: Control;
  tocPane: Control;
  editorPane: Control;

  // edit pane
  editor: Control;
  mdTab: Control;
  cssTab: Control;
}

export default Controls;
