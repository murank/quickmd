// lib/content-saver.ts


import templateHTML from 'template.html';
import builtinCSS from 'default.scss';

import { debug, template } from './util';

const MIME_TYPE = 'text/html';

interface TemplateParams {
  title: string;
  style: string;
  html: string;
  toc: string;
  markdown: string;
  defaultStyle?: string;
}

export default class ContentSaver {
  private readonly saveStrategy: SaveStrategy;
  private readonly templateFunc: Function;

  constructor() {
    this.saveStrategy = this.createSaveStrategy();
    this.templateFunc = template(templateHTML);
  }

  save(filename: string, contents: TemplateParams): void {
    contents.defaultStyle = contents.defaultStyle || builtinCSS;
    const html = this.templateFunc(contents);
    this.saveStrategy.save(filename, html);
  }

  private createSaveStrategy(): SaveStrategy {
    if (window.navigator.msSaveBlob) {
      debug('IE');
      return new IESaveStrategy();
    } else if (window.URL && window.URL.createObjectURL) {
      debug('Firefox');
      return new FirefoxSaveStrategy();
    } else if ((<any>window).webkitURL && (<any>window).webkitURL.createObject) {
      debug('Chrome');
      return new ChromeSaveStrategy();
    } else if ((<any>window).Base64 && (<any>window).Base64.encode) {
      debug('safari');
      return new SafariSaveStrategy();
    }

    throw new Error("You can't save content in this browser");
  }
}

interface SaveStrategy {
  save(filename: string, content: string): void;
}

abstract class BlobSaveStrategy implements SaveStrategy {
  save(filename: string, content: string): void {
    const blob = new Blob([ content ], { type: MIME_TYPE });
    this.doSave(filename, blob);
  }

  abstract doSave(filename: string, blob: Blob): void;
}

abstract class AbstractAnchorBasedSaveStrategy extends BlobSaveStrategy {
  doSave(filename: string, blob: Blob): void {
    const a = document.createElement('a');
    a.download = filename;
    a.target = '_blank';

    this.doSaveViaAnchor(a, blob);
  }

  abstract doSaveViaAnchor(a: HTMLAnchorElement, blob: Blob): void;
}

class IESaveStrategy extends BlobSaveStrategy {
  doSave(filename: string, blob: Blob): void {
    window.navigator.msSaveBlob(blob, filename);
  }
}

class FirefoxSaveStrategy extends AbstractAnchorBasedSaveStrategy {
  doSaveViaAnchor(a: HTMLAnchorElement, blob: Blob) {
    a.style.cssText = 'display:none';
    a.href = window.URL.createObjectURL(blob);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

class ChromeSaveStrategy extends AbstractAnchorBasedSaveStrategy {
  doSaveViaAnchor(a: HTMLAnchorElement, blob: Blob) {
    a.href = (<any>window).webkitURL.createObjectURL(blob);
    a.click();
  }
}

class SafariSaveStrategy implements SaveStrategy {
  save(filename: string, content: string): void {
    window.open(`data:${MIME_TYPE};base64,${(<any>window).Base64.encode(content)}`, '_blank');
  }
}
