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

const IconFuzhi: FunctionComponent<Props> = ({ size = 18, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1025 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M688.7 1023.3H142.2c-76.2 0-138.1-62-138.1-138.1V338.7c0-76.2 62-138.1 138.1-138.1h546.5c76.2 0 138.1 62 138.1 138.1v546.5c0 76.1-62 138.1-138.1 138.1z"
        fill={getIconColor(color, 0, '#999999')}
      />
      <path
        d="M987.8 447.8c-21 0-38-17-38-38V141.7c0-34.3-27.9-62.1-62.1-62.1H614.1c-21 0-38-17-38-38s17-38 38-38h273.6c76.2 0 138.1 62 138.1 138.1v268.1c0 21-17 38-38 38z"
        fill={getIconColor(color, 1, '#999999')}
      />
    </svg>
  );
};

export default IconFuzhi;
