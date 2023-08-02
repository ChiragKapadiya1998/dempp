import styled from 'styled-components/native';
import { Colors, Metrics } from '../../../styles';

export const Container = styled.View`
  align-items: center;
  flex-direction: row;
  margin-horizontal: ${Metrics.wp(8.7)}px;
`;

export const HorizontalLine = styled.View`
  background-color: ${Colors.primary2};
  flex-direction: row;
  flex: 1;
  height: 1px;
`;
