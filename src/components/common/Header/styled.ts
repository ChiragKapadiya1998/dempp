import styled from 'styled-components/native';
import { Colors, Metrics, Typography } from '../../../styles';

export const Container = styled.View`
  background-color: ${Colors.greyish6};
  width: ${Metrics.screenWidth}px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  margin-top: 12px;
  min-height: 42px;
`;

export const Title = styled(Typography.Body1)`
  align-items: flex-end;
  flex-direction: row;
  flex: 1;
  padding-top: 9px;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;
