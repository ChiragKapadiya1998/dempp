import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';

export const RegularText = styled(Typography.Body4)`
  color: ${Colors.greyish3};
  margin-horizontal: 32px;
  text-align: center;
  flex-direction: row;
`;

export const HighlightedText = styled.Text`
  color: ${Colors.primary11};
`;
