import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';
import { fontFamily } from '../../../utils/functions';

export const MainTitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding-horizontal: 32px;
`;

export const QuestionText = styled(Typography.Rubric3)`
  color: ${Colors.accent19};
  margin-bottom: 4px;
  font-family: ${fontFamily.rf_regular};
`;

export const RequiredText = styled.Text`
  color: ${Colors.destructive4};
`;
