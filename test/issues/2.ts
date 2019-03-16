import test from 'ava';
import { OutputChunk } from 'rollup';
import { bundleSingle } from '../_helpers';

test('should not add sourcemap if not wanted', async (t) => {
  // create a bundle
  const bundle = await bundleSingle();

  // generate code
  const checkMap = async (sourcemap: boolean | 'inline', check: (output: OutputChunk) => void) => {
    const { output: [output] } = await bundle.generate({
      format: 'cjs',
      sourcemap,
    });

    t.is(output.fileName, 'single.js');
    check(output);
  };

  await checkMap(true, (chunk) => t.truthy(chunk.map));
  await checkMap(false, (chunk) => t.falsy(chunk.map));
  await checkMap('inline', (chunk) => t.truthy(chunk.map));
});
