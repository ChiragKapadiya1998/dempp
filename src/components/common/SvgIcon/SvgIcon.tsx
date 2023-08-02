import React from 'react';
import Svg from 'react-native-svg';
import { Props } from './types';
import { iconSource } from './data';
import { Colors } from '../../../styles';

const SvgIcon = ({
  color = Colors.black,
  height,
  name,
  style,
}: Props): JSX.Element => {
  const source = iconSource[name];
  const { Content, baseHeight, baseWidth } = source;
  const scale = height / baseHeight;
  const width = scale * baseWidth;
  const viewBox = `0 0 ${baseWidth} ${baseHeight}`;

  return (
    <Svg {...{ width, height, viewBox, style }}>
      <Content {...{ color }} />
    </Svg>
  );
};

export default SvgIcon;
