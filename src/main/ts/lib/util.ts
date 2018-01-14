// lib/util.ts

import { template } from 'micro-template';

export const unusedVariable = 'xxx';

function LoggingDelegate(message?: any, ...optionalParams: any[]): void;
function LoggingDelegate(): void {
  console.log.apply(console, arguments)
}

/**
 * undefined-safe logging function.
 */
export const log = ((typeof(console) !== 'undefined' && console.log !== undefined) ? LoggingDelegate : function(){});

declare let DEBUG: boolean | undefined;
export function debug(...args: any[]): void;
export function debug(): void {
  if ((typeof(DEBUG) !== 'undefined') && DEBUG) {
    log.apply(void 0, arguments);
  }
}

template.variable = 'tmpl';
export { template };


export function groupBy<T>(arr: T[], keyExtractor: (value: T) => string) {
  let result: {[key: string]: T[]} = {};
  for (let value of arr) {
    let key = keyExtractor(value);
    let values = result[key];
    if (values === undefined) {
      values = result[key] = [];
    }
    values.push(value);
  }
  return result;
}

export function array<T>(arrayOrObject: T | T[]): T[] {
  return (Array.isArray(arrayOrObject) ? arrayOrObject : [ arrayOrObject ]);
}


const UNESCAPE_MAP: {[c: string]: string} = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x22;': '\x22',
  '&#x27;': '\x27'
};

/**
 * Unescape html text.
 */
export function unescapeHtml(text: string): string {
  let regex = Object.keys(UNESCAPE_MAP).join('|');
  return text.replace(new RegExp(regex, 'g'), c => UNESCAPE_MAP[c]);
}

export function stripTags(text: string): string {
  return text.replace(/<[a-z/][^>]*>/g, '');
}

export function repeatString(text: string, num: number): string {
  let result = '';
  for (let i = 0; i < num; ++i) {
    result += text;
  }
  return result;
}
