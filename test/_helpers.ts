import * as rollup from 'rollup';
import shebang from '../src/index';

export function bundleSingle(options?: object) {
  return rollup.rollup({
    input: ['./test/fixtures/single.js'],
    plugins: [
      shebang({
        include: 'single.js',
        ...options,
      }),
    ],
  });
}
