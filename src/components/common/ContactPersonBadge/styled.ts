import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';

export const Container = styled.View`
  margin-horizontal: ${wp(2.6)}px;
`;

export const FeedbackPersonLabel = styled(Typography.Rubric2)``;

export const FeedbackPersonHorizontalContainer = styled.View`
  align-items: center;
  padding-vertical: ${hp(3)}px;
  border-radius: ${wp(2.4)}px;
  background-color: ${Colors.white};
  shadow-color: rgba(20, 58, 115, 0.15);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 10px;
  elevation: 5;
`;

export const FeedbackPersonNameText = styled(Typography.Body4)`
  font-weight: 600;
  margin-top: ${hp(1)}px;
  font-size: ${fontSize(18)};
`;
