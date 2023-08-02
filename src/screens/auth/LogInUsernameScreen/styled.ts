import styled from 'styled-components/native';
import { Colors, Metrics } from '../../../styles';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  height: ${0.22 * Metrics.screenHeight}px;
  width: 100%;
`;

export const InputContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  padding-bottom: 16px;
  padding-top: ${0.14 * Metrics.screenHeight}px;
  width: 100%;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  max-height: 140px;
  padding-bottom: 12px;
  width: 100%;
`;

export const ActionText = styled.Text`
  align-self: flex-start;
  color: ${Colors.primary2};
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  margin-left: ${HORIZONTAL_MARGIN}px;
  padding-top: 18px;
`;
