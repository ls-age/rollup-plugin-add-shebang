# rollup-plugin-add-shebang

> Rollup plugin that adds shebangs to output files

[![CircleCI](https://circleci.com/gh/ls-age/rollup-plugin-add-shebang/tree/master.svg?style=svg)](https://circleci.com/gh/ls-age/rollup-plugin-add-shebang/tree/master)

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
      // or specify a special shebang (or a function returning one) using the 'shebang' option
    }),
  ],
  ...
};
```

## Advantages over other shebang plugins

- You don't have to add shebangs to your source files
- It works when using code splitting
