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

const IconDiqiu: FunctionComponent<Props> = ({ size = 18, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M652.8 374.1c-21.4-131.8-71.9-224.3-130.6-224.3S413 242.3 391.6 374.1h261.2zM380.5 515.7c0 32.8 1.8 64.2 4.9 94.4h273.4c3.1-30.3 4.9-61.7 4.9-94.4s-1.8-64.2-4.9-94.4H385.4c-3.1 30.2-4.9 61.7-4.9 94.4z"
        fill={getIconColor(color, 0, '#64B5F6')}
      />
      <path
        d="M859.7 374.1c-42.2-100.2-127.6-177.7-233.2-209 36 49.9 60.8 125 73.8 209h159.4z"
        fill={getIconColor(color, 1, '#1E88E5')}
      />
      <path
        d="M417.7 165.1c-105.4 31.3-191 108.8-233 209h159.4c12.8-84 37.6-159.1 73.6-209z"
        fill={getIconColor(color, 2, '#64B5F6')}
      />
      <path
        d="M875.4 421.3H706.2c3.1 31 4.9 62.7 4.9 94.4 0 31.7-1.8 63.5-4.9 94.4h169.1c8.1-30.3 12.7-61.7 12.7-94.4s-4.6-64.2-12.6-94.4z"
        fill={getIconColor(color, 3, '#1E88E5')}
      />
      <path
        d="M333.3 515.7c0-31.7 1.8-63.5 4.9-94.4H168.9c-8 30.3-12.7 61.7-12.7 94.4s4.7 64.2 12.7 94.4H338c-2.9-30.9-4.7-62.6-4.7-94.4zM391.6 657.4c21.4 131.8 71.9 224.3 130.6 224.3s109.2-92.5 130.6-224.3H391.6z"
        fill={getIconColor(color, 4, '#64B5F6')}
      />
      <path
        d="M626.7 866.3c105.4-31.3 191-108.8 233.2-209H700.4c-13 84.1-37.7 159.2-73.7 209z"
        fill={getIconColor(color, 5, '#1E88E5')}
      />
      <path
        d="M184.7 657.4c42.2 100.2 127.6 177.7 233.2 209-36-49.9-60.8-125-73.8-209H184.7z"
        fill={getIconColor(color, 6, '#64B5F6')}
      />
    </svg>
  );
};

export default IconDiqiu;
