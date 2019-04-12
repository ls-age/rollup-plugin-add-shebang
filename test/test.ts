import test from 'ava';
import { bundleSingle } from './_helpers';

test('should add shebang to rendered chunk', async (t) => {
  // create a bundle
  const bundle = await bundleSingle();

  // generate code
  const { output: [output] } = await bundle.generate({
    format: 'cjs',
  });

  t.is(output.fileName, 'single.js');
  t.true(output.code.startsWith('#!/usr/bin/env node'));
});

test('should add shebang to rendered chunk, using a function', async (t) => {
  // create a bundle
  const bundle = await bundleSingle({
    shebang() {
      return '#!/usr/bin/env ts-node';
    },
  });

  // generate code
  const { output: [output] } = await bundle.generate({
    format: 'cjs',
  });

  t.is(output.fileName, 'single.js');
  t.true(output.code.startsWith('#!/usr/bin/env ts-node'));
});
