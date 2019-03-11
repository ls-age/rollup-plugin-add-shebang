import MagicString, { SourceMap } from 'magic-string';
import { join, resolve } from 'path';
import rollup from 'rollup';
import { createFilter } from 'rollup-pluginutils';

interface Options {
  include?: string | string[];
  exclude?: string | string[];
  shebang?: string;
}

const plugin: rollup.PluginImpl<Options> = ({
  include = ['**/cli.js', '**/bin.js'],
  exclude,
  shebang = '#!/usr/bin/env node',
}: Options = {}) => {
  const filter = createFilter(include, exclude) as (fileName: string) => boolean;

  return { name: 'shebang',
    renderChunk(code, { fileName }, { dir, file }) {
      const outPath = dir ?
        join(dir, fileName) :
        file || fileName;

      if (!filter(resolve(outPath))) { return null; }

      const s = new MagicString(code);

      s.prepend(`${shebang}

`);

      return {
        code: s.toString(),
        // Need to cast version, as it's declared string
        // See: https://github.com/Rich-Harris/magic-string/pull/155
        // (already merged, will be in next release)
        map: s.generateMap({ hires: true }) as SourceMap & { version: number },
      };
    },
  };
};

export default plugin;
