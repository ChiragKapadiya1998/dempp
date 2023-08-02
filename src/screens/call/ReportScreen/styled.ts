import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';
import { fontSize, hp } from '../../../styles/metrics';

export const HeadingText = styled(Typography.H1)`
  font-weight: 600;
  color: ${Colors.greyish1};
  text-align: center;
  margin-top: ${hp(3.5)}px;
`;

export const SubmitButtonContainer = styled.View`
  justify-content: flex-end;
`;

export const QuestionText = styled(Typography.Rubric1)`
  color: ${Colors.greyish1};
  text-transform: none;
  font-size: ${fontSize(15)};
`;
