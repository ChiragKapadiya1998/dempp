import React, { FC } from 'react';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import SvgIcon from '../../../SvgIcon';
import { Container, Title } from './styled';
import { hp } from '../../../../../styles/metrics';
import { ColorPropType } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const LeftChevronButton: FC<StackHeaderLeftButtonProps> = ({ label, labelVisible, onPress, tintColor }) => (
  <Container {...{ onPress }}>
    <SvgIcon name={'left-chevron'} height={hp(2.7)} color={tintColor} />
    {labelVisible ? <Title style={{ color: tintColor }}>{label}</Title> : null}
  </Container>
);

export default LeftChevronButton;
