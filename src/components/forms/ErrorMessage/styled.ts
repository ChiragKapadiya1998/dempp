import styled from 'styled-components/native';
import { Colors, Metrics, Typography } from '../../../styles';
import { fontSize, wp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE } from '../../../utils/constants';

export const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-horizontal: ${AUTH_HORIZONTAL_SPACE}px;
  min-height: 16px;
  width: ${Metrics.screenWidth - 2 * AUTH_HORIZONTAL_SPACE}px;
`;

export const MessageText = styled.Text`
  flex: 1;
  color: ${Colors.destructive4};
  flex-direction: row;
  font-family: ${Typography.fontFamily};
  font-size: ${fontSize(13)}px;
  font-weight: 600;
  line-height: ${fontSize(16)}px;
  margin-left: ${wp(1)}px;
`;
