/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, SVGAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

const IconTuichu: FunctionComponent<Props> = ({ size = 18, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M1024 448c0 19.2-6.4 32-19.2 44.8l0 0-128 128 0 0C864 633.6 851.2 640 832 640c-38.4 0-64-25.6-64-64 0-19.2 6.4-32 19.2-44.8l0 0L806.4 512 640 512C601.6 512 576 486.4 576 448c0-38.4 25.6-64 64-64l166.4 0-19.2-19.2 0 0C774.4 352 768 339.2 768 320c0-38.4 25.6-64 64-64 19.2 0 32 6.4 44.8 19.2l0 0 128 128 0 0C1017.6 416 1024 428.8 1024 448zM832 128l-128 0L576 128 294.4 128l121.6 70.4 0 0C435.2 211.2 448 230.4 448 256l0 512 64 0 192 0 128 0c38.4 0 64 25.6 64 64s-25.6 64-64 64L512 896 448 896l0 64c0 38.4-25.6 64-64 64-12.8 0-25.6-6.4-32-12.8l0 0-320-192 0 0 0 0c-6.4-6.4-12.8-12.8-19.2-19.2 0 0 0 0 0-6.4C6.4 787.2 0 780.8 0 768L0 64c0-25.6 19.2-51.2 38.4-57.6C44.8 0 57.6 0 64 0l0 0 512 0 256 0c38.4 0 64 25.6 64 64C896 102.4 870.4 128 832 128z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

export default IconTuichu;
