/* eslint-disabled */
// @ts-nocheck
// @ts-ignore
import React, { useContext, useEffect, useState } from 'react';
import { context } from 'dumi/theme';
import { ICodeBlockProps } from 'dumi-theme-default/es/builtins/Previewer';
import Previewer from '../default/Previewer';
import MobilePreviewer from '../mobile/Previewer';
import { VueWrapper } from 'vuera';
import Vue from 'vue';

const defaultProps = {
  hideActions: ['CSB', 'EXTERNAL', 'RIDDLE'],
  defaultShowCode: false,
};
export default function PreviewerCustom(props: any) {
  const { meta, ...restData } = useContext(context);


  return <Previewer {...props} />;
}
