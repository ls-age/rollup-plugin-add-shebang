# rollup-plugin-add-shebang

[![Greenkeeper badge](https://badges.greenkeeper.io/ls-age/rollup-plugin-add-shebang.svg)](https://greenkeeper.io/)

> Rollup plugin that adds shebangs to output files

## Installation

As usual, run `npm install --save-dev rollup-plugin-add-shebang`.

## Usage

Inside your *rollup.config.js* to which files a shebang should be added:

```javascript
// rollup.config.js
import shebang from 'rollup-plugin-add-shebang';

export default {
  ...
  plugins: [
    shebang({
      // A single or an array of filename patterns. Defaults to ['**/cli.js', '**/bin.js'].
      include: 'out/cli.js'
      // you could also 'exclude' here
      // or specify a special shebang using the 'shebang' option
    }),
  ],
  ...
};
```

## Advantages over other shebang plugins

- You don't have to add shebangs to your source files
- It works when using code splitting
