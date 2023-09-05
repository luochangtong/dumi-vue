import React from 'react';
import { VueWrapper } from 'vuera';

export default function VueWrap(props: any) {
  return <VueWrapper component={props.children}></VueWrapper>;
}
