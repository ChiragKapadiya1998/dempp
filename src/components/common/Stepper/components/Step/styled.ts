import { PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles/index';

export const Container = styled.View<{ isActive?: boolean }>`
  align-items: center;
  background-color: ${({ isActive }) =>
    isActive ? Colors.primary2 : Colors.white};
  border-color: ${Colors.primary2};
  border-radius: ${PixelRatio.roundToNearestPixel(16)}px;
  border-width: 1px;
  flex-direction: row;
  justify-content: center;
  min-height: ${PixelRatio.roundToNearestPixel(32)}px;
  min-width: ${PixelRatio.roundToNearestPixel(32)}px;
`;

export const Label = styled(Typography.Body2)<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? Colors.white : Colors.primary2)};
`;
