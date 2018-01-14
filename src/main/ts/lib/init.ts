// lib/init.ts

import GlobalController from './global-controller';
import { log } from './util';


function appendContent(html: string) {
  const elm = document.getElementsByTagName('body')[0];
  elm.insertAdjacentHTML('beforeend', html);
}

function initStyle() {
  require('editor.scss');
}

function initHtmlComponent() {
  const editorHtml: string = require('editor.html');
  appendContent(editorHtml);
}

function mountController() {
  const controller = new GlobalController();
  controller.mount();
}

export default function initialize() {
  if (typeof(Blob) === 'undefined') {
    log("You can't edit markdown in this browser.");
    return;
  }

  initStyle();
  initHtmlComponent();
  mountController();
}
