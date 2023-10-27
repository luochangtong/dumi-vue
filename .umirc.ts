import { defineConfig } from 'dumi';
import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';

export default defineConfig({
  title: 'dumi1',
  mode: 'site',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  plugins: [path.resolve('plugin/plugin.ts')],
  alias: {
    // 'COMPONENTS/Avatar': '@components/BC/Avatar', // 这里可以修改import,
    // 'foo': 'xx/xx/foo', // import 'foo' 将变为 import 'xx/xx/foo'
  },
  resolve: {
    includes: ['src', 'docs'],
    previewLangs: ['.vue'],
  },
  dynamicImportSyntax: {},
  nodeModulesTransform: {
    type: 'none',
  },
  extraBabelPlugins: [
    [
      '@babel/plugin-proposal-optional-chaining',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    [
      'import',
      {
        libraryName: 'dumi-theme-default',
        libraryDirectory: 'es',
        style: true,
      },
      'dumi-theme-default',
    ],
  ],
  chainWebpack(config, { webpack }) {

    // 支持识别.vue，index.vue，无需手动输入xxx/index.vue
    config.resolve.extensions.delete('.tsx');
    config.resolve.extensions.add('.vue');
    config.resolve.extensions.add('.tsx');
    
    // alias
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .exclude.add([path.resolve('../src/.umi'), path.resolve('node_modules')])
      .end()
      .use('vue-loader')
      .loader('vue-loader');

    config.plugin('VueLoaderPlugin').use(VueLoaderPlugin);
  },
});
