import test from 'ava';
import { bundleSingle } from '../_helpers';

test('should throw with invalid shebang', async (t) => {
  const bundle = await bundleSingle({
    shebang() { // eslint-disable no-empty
    },
  });

  const error = await t.throwsAsync(bundle.generate({ format: 'cjs' }), {
    instanceOf: Error,
  }) as { [key: string]: any };

  t.is(error.code, 'PLUGIN_ERROR');
  t.is(error.hook, 'renderChunk');
  t.is(error.plugin, 'shebang');
  t.regex(error.message, /shebang.*option/i);
});
