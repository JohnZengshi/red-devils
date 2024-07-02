/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import IconTransfer from './IconTransfer';
import IconDiqiu from './IconDiqiu';
import IconTuichu from './IconTuichu';
import IconChevronsrightshuangyoujiantou from './IconChevronsrightshuangyoujiantou';
import IconFuzhi from './IconFuzhi';
import IconIconArrowLeft from './IconIconArrowLeft';
import IconTongdun from './IconTongdun';
import IconJindun from './IconJindun';
import IconXingdun from './IconXingdun';
import IconGuanjun from './IconGuanjun';
export { default as IconTransfer } from './IconTransfer';
export { default as IconDiqiu } from './IconDiqiu';
export { default as IconTuichu } from './IconTuichu';
export { default as IconChevronsrightshuangyoujiantou } from './IconChevronsrightshuangyoujiantou';
export { default as IconFuzhi } from './IconFuzhi';
export { default as IconIconArrowLeft } from './IconIconArrowLeft';
export { default as IconTongdun } from './IconTongdun';
export { default as IconJindun } from './IconJindun';
export { default as IconXingdun } from './IconXingdun';
export { default as IconGuanjun } from './IconGuanjun';

export type IconNames = 'transfer' | 'diqiu' | 'tuichu' | 'chevronsrightshuangyoujiantou' | 'fuzhi' | 'icon_arrow_left' | 'tongdun' | 'jindun' | 'xingdun' | 'guanjun';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'transfer':
      return <IconTransfer {...rest} />;
    case 'diqiu':
      return <IconDiqiu {...rest} />;
    case 'tuichu':
      return <IconTuichu {...rest} />;
    case 'chevronsrightshuangyoujiantou':
      return <IconChevronsrightshuangyoujiantou {...rest} />;
    case 'fuzhi':
      return <IconFuzhi {...rest} />;
    case 'icon_arrow_left':
      return <IconIconArrowLeft {...rest} />;
    case 'tongdun':
      return <IconTongdun {...rest} />;
    case 'jindun':
      return <IconJindun {...rest} />;
    case 'xingdun':
      return <IconXingdun {...rest} />;
    case 'guanjun':
      return <IconGuanjun {...rest} />;

  }

  return null;
};

export default IconFont;
