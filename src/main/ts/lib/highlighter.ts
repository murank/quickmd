// lib/prismjs.ts

// webpack with node-ts can't resolve synthetic default imports
import * as Prism from 'prismjs';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-batch';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-coffeescript';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-pascal';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-yaml';

export function highlight(code: string, lang: string): string {
  return Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup);
}
