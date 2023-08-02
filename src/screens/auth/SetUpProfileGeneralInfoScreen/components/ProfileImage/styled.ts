import styled from 'styled-components/native';
import { Colors, Metrics } from '../../../../../styles';

export const Container = styled.TouchableOpacity``;

export const CameraIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${Colors.greyish4};
  height: ${Metrics.wp(14.5)}px;
  width: ${Metrics.wp(14.5)}px;
  border-radius: ${Metrics.wp(7.25)}px;
`;

export const PencilIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: ${Colors.white};
  height: 28px;
  width: 28px;
  border-radius: 100px;
  top: -6px;
  right: -12px;
`;
