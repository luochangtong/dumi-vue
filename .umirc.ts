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
  resolve: {
    includes: ['src', 'docs'],
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
