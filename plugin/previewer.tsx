import React, { useRef, useEffect } from 'react';
import Vue from 'vue';

const RootComponent = (name: string) => <div id={name}></div>;

export default (props: { path: string }) => {
  // 挂载的 vue 实例
  const vueInstanceRef = useRef<any>();
  const vueInstance = useRef<any>();

  const init = () => {
    const srcVueModuleName = props.path.replace(/\.vue$/, '').replace('./', '');
    console.log('srcVueModuleName', srcVueModuleName);
    const srvVue = require(`/src/${srcVueModuleName}.vue`).default;
    console.log('srvVue', srvVue);

    // 创建 vue 实例
    vueInstance.current = new (Vue.extend(srvVue))();

    // 实例挂载
    vueInstance.current.$mount(vueInstanceRef.current);
  };

  const com = useEffect(() => {
    init();
    return () => {
      // react 卸载时 vue 实例也卸载
      vueInstance.current?.unmount?.();
    };
  }, []);
  return <div ref={vueInstanceRef}></div>;
};
