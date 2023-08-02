import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';
import { hp } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';

export const HeadingText = styled(Typography.H1)`
  font-weight: 600;
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  text-align: center;
`;

export const InfoContainer = styled.View`
  align-items: center;
  margin-horizontal: ${HORIZONTAL_MARGIN - 3}px;
  padding-vertical: ${hp(3)}px;
  padding-horizontal: ${HORIZONTAL_MARGIN}px;
  margin-bottom: 28px;
  border-radius: 10px;
  background-color: ${Colors.white};
  shadow-color: ${Colors.black};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 10;
`;

export const FeedbackPersonNameText = styled(Typography.H3)`
  margin-top: 2px;
`;

export const SubheadingText = styled(Typography.Body2)`
  margin-top: 16px;
  text-align: center;
  font-weight: 500;
`;

export const RatingLabelText = styled(Typography.Subheadline)`
  font-weight: 400;
  color: ${Colors.greyish1};
`;

export const RequiredText = styled.Text`
  color: ${Colors.destructive4};
`;

export const Feedback = styled.View`
  margin-horizontal: ${2 * HORIZONTAL_MARGIN}px;
`;

export const FeedbackLabelText = styled(Typography.Subheadline)`
  font-weight: normal;
  color: ${Colors.accent19};
`;

export const DisclaimerText = styled(Typography.Caption2)`
  margin-top: ${hp(4)}px;
  margin-horizontal: 20px;
  color: ${Colors.greyish27};
  letter-spacing: 0.066px;
  text-align: center;
`;
