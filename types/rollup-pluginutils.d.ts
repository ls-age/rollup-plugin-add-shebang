declare module 'rollup-pluginutils' {
  export function createFilter(
    include?: Array<string | RegExp> | string | RegExp | null,
    exclude?: Array<string | RegExp> | string | RegExp | null
  ): (id: string | any) => boolean;
}
