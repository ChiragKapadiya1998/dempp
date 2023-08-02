import styled from 'styled-components/native';
import { Colors, Metrics, Typography } from '../../../styles';
import { fontFamily } from '../../../utils/functions';

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 48px;
  height: ${0.22 * Metrics.screenHeight}px;
  width: 100%;
`;

export const EncouragingText = styled(Typography.Body2)`
  color: ${Colors.greyish2};
  margin-horizontal: ${Metrics.wp(9.65)}px;
  text-align: center;
  font-family: ${fontFamily.rf_regular};
`;

export const HighlightedText = styled(Typography.Body2)`
  color: ${Colors.primary2};
  font-family: ${fontFamily.rf_regular};
`;

export const InputContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  padding-bottom: 16px;
  padding-top: ${0.08 * Metrics.screenHeight}px;
  width: 100%;
`;

export const SubmitButtonContainer = styled.View`
  justify-content: flex-start;
  height: 140px;
  width: 100%;
`;
