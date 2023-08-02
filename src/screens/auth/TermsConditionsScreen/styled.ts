import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';

export const ScreenBody = styled.View`
  background-color: ${Colors.white};
  flex: 1;
`;

export const Paragraph = styled(Typography.Body4)`
  padding-horizontal: 16px;
  padding-top: 20px;
`;
