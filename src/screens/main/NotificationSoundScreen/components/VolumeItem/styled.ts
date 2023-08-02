import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: 12px;
`;

export const TitleText = styled(Typography.Body3)`
  font-weight: normal;
  color: ${Colors.primary2};
  margin-left: 12px;
`;
