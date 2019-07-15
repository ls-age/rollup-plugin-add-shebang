'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var MagicString = _interopDefault(require('magic-string'));
var path = require('path');
var rollupPluginutils = require('rollup-pluginutils');

const plugin = ({
  include = ['**/cli.js', '**/bin.js'],
  exclude,
  shebang: shebangOption = '#!/usr/bin/env node'
} = {}) => {
  const filter = rollupPluginutils.createFilter(include, exclude);
  return {
    name: 'shebang',

    renderChunk(code, {
      fileName
    }, {
      dir,
      file,
      sourcemap
    }) {
      const outPath = dir ? path.join(dir, fileName) : file || fileName;

      if (!filter(path.resolve(outPath))) {
        return null;
      }

      const shebang = typeof shebangOption === 'function' ? shebangOption() : shebangOption;

      if (!shebang) {
        throw new Error('Invalid `shebang` option: Should be a string or a function returning one');
      }

      const prefix = `${shebang}

`;

      if (!sourcemap) {
        return `${prefix}${code}`;
      }

      const s = new MagicString(code);
      s.prepend(prefix);
      return {
        code: s.toString(),
        // Need to cast version, as it's declared string
        // See: https://github.com/Rich-Harris/magic-string/pull/155
        // (already merged, will be in next release)
        map: s.generateMap({
          hires: true
        })
      };
    }

  };
};

module.exports = plugin;
//# sourceMappingURL=index.js.map
