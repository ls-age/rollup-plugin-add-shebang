import { builtinModules } from 'module';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { dependencies } from './package.json';

const extensions = ['.js', '.ts'];

export default {
  external: builtinModules.concat(Object.keys(dependencies)),
  input: './src/index.ts',
  output: {
    dir: './out/',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve({ extensions }),
    babel({ extensions, include: ['src/**/*'] }),
  ],
};
