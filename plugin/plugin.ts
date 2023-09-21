// @ts-nocheck
import { IApi } from '@umijs/types';
import path from 'path';

export default (api: IApi) => {
  api.register({
    key: 'dumi.registerCompiletime',
    fn: () => {
      return {
        name: 'test',
        component: path.join(__dirname, 'previewer.tsx'),
        transformer: ({
          attrs, // code 标签的属性
          mdAbsPath, // 当前 Markdown 文件的路径
          node, // 语法树节点
        }: {
          attrs: any;
          mdAbsPath: any;
          node: any;
        }) => {
          const { source, lang } = node.properties; // 组件源码

          if (lang === 'vue') {
            /**
             * srcVueRltPath: 组件源码.vue的相对路径
             * 由组件对应index.md文件路径转换而来
             * Foo/index.vue
             */
            const srcVueRltPath = path
              .relative(api.paths.absSrcPath, mdAbsPath)
              .replace(/index\.md$/, attrs.src.replace('./', ''));

            /**
             * srcVueAbsPath: 组件源码.vue的绝对路径
             * ···/src/Too/index.vue
             */
            const srcVueAbsPath = path.join(api.paths.absTmpPath, '..', srcVueRltPath);

            return {
              rendererProps: {
                path: srcVueRltPath,
              },
              previewerProps: {
                sources: {
                  'demo.vue': {
                    path: srcVueAbsPath..replace(/\\/g, '/'), // 防止windows上获取的路径是反斜杠的情况
                  },
                },
                dependencies: {},
                lang: 'vue',
              },
            };
          }
        },
      };
    },
  });
};
