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

const IconChevronsrightshuangyoujiantou: FunctionComponent<Props> = ({ size = 18, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M523.477333 691.925333l180.992-180.992-180.992-181.077333a42.666667 42.666667 0 1 1 60.330667-60.330667l211.2 211.2c6.4 6.4 10.325333 14.336 11.818667 22.613334l0.597333 5.034666v5.034667a42.496 42.496 0 0 1-12.416 27.648l-211.2 211.2a42.666667 42.666667 0 0 1-60.330667-60.330667z m-298.666666 0l180.992-180.992L224.810667 329.813333a42.666667 42.666667 0 1 1 60.330666-60.330666l211.2 211.2c6.4 6.4 10.325333 14.336 11.818667 22.613333l0.597333 5.034667v5.034666a42.496 42.496 0 0 1-12.416 27.648l-211.2 211.2a42.666667 42.666667 0 0 1-60.330666-60.330666z"
        fill={getIconColor(color, 0, '#666666')}
      />
    </svg>
  );
};

export default IconChevronsrightshuangyoujiantou;
