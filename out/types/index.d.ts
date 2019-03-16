import rollup from 'rollup';
interface Options {
    include?: string | string[];
    exclude?: string | string[];
    shebang?: string;
}
declare const plugin: rollup.PluginImpl<Options>;
export default plugin;
