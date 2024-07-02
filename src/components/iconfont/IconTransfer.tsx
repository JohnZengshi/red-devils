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

const IconTransfer: FunctionComponent<Props> = ({ size = 18, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M85.346462 170.653538c0-47.104 38.203077-85.307077 85.307076-85.307076H512c47.143385 0 85.346462 38.203077 85.346462 85.307076v170.692924c0 47.104-38.203077 85.307077-85.346462 85.307076H170.653538a85.346462 85.346462 0 0 1-85.307076-85.307076V170.653538zM426.653538 682.653538c0-47.104 38.203077-85.307077 85.346462-85.307076h341.346462c47.104 0 85.307077 38.203077 85.307076 85.307076v170.692924c0 47.104-38.203077 85.307077-85.307076 85.307076H512a85.346462 85.346462 0 0 1-85.346462-85.307076v-170.692924z"
        fill={getIconColor(color, 0, '#666666')}
      />
      <path
        d="M879.064615 287.980308l-30.72 30.72a32.019692 32.019692 0 0 0 45.292308 45.292307l55.138462-55.177846c29.184-29.144615 29.184-76.445538 0-105.629538l-55.138462-55.138462a32.019692 32.019692 0 0 0-45.292308 45.252923l30.72 30.72h-196.411077a32.019692 32.019692 0 0 0 0 63.960616h196.450462zM144.935385 799.980308l30.72 30.72a32.019692 32.019692 0 0 1-45.292308 45.292307l-55.138462-55.177846c-29.184-29.144615-29.184-76.445538 0-105.629538l55.138462-55.138462a32.019692 32.019692 0 0 1 45.292308 45.252923l-30.72 30.72h196.411077a32.019692 32.019692 0 0 1 0 63.960616H144.896z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </svg>
  );
};

export default IconTransfer;
