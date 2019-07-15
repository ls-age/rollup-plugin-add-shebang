import MagicString from 'magic-string';
import { join, resolve } from 'path';
import rollup from 'rollup';
import { createFilter } from 'rollup-pluginutils';

interface Options {
  include?: string | string[];
  exclude?: string | string[];
  shebang?: string | (() => string);
}

const plugin: rollup.PluginImpl<Options> = ({
  include = ['**/cli.js', '**/bin.js'],
  exclude,
  shebang: shebangOption = '#!/usr/bin/env node',
}: Options = {}) => {
  const filter = createFilter(include, exclude) as (fileName: string) => boolean;

  return {
    name: 'shebang',
    renderChunk(code, { fileName }, { dir, file, sourcemap }) {
      const outPath = dir ?
        join(dir, fileName) :
        file || fileName;

      if (!filter(resolve(outPath))) { return null; }

      const shebang = typeof shebangOption === 'function' ? shebangOption() : shebangOption;

      if (!shebang) {
        throw new Error('Invalid `shebang` option: Should be a string or a function returning one');
      }

      const prefix = `${shebang}

`;

      if (!sourcemap) { return `${prefix}${code}`; }

      const s = new MagicString(code);

      s.prepend(prefix);

      return {
        code: s.toString(),
        // Need to cast version, as it's declared string
        // See: https://github.com/Rich-Harris/magic-string/pull/155
        // (already merged, will be in next release)
        map: s.generateMap({ hires: true }),
      };
    },
  };
};

export default plugin;
