import test from 'ava';
import * as rollup from 'rollup';
import shebang from '../src/index';

test('should add shebang to rendered chunk', async t => {
  // create a bundle
  const bundle = await rollup.rollup({
    input: ['./test/fixtures/single.js'],
    plugins: [
      shebang({
        include: 'single.js',
      })
    ]
  });

  // generate code
  const { output: [output] } = await bundle.generate({
    format: 'cjs',
  });

  t.is(output.fileName, 'single.js');
  t.true(output.code.startsWith('#!/usr/bin/env node'));
});
