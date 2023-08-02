import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';

export const MainTitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding-horizontal: 30px;
`;

export const QuestionText = styled(Typography.Body5)`
  color: ${Colors.greyish1};
  margin-bottom: 8px;
`;

export const RequiredText = styled.Text`
  color: ${Colors.destructive4};
`;
