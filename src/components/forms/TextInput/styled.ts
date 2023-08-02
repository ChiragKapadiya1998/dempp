import styled from 'styled-components/native';

import { Colors, Typography } from '../../../styles';
import { AUTH_HORIZONTAL_SPACE } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export const Container = styled.KeyboardAvoidingView<{ error?: boolean }>`
  margin-horizontal: ${AUTH_HORIZONTAL_SPACE}px;
`;

export const Label = styled(Typography.Rubric2)`
  color: ${Colors.greyish2};
  padding-top: 4px;
`;

export const InputField = styled.TextInput`
  color: ${Colors.accent19};
  font-family: ${fontFamily.rf_regular};
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  justify-content: flex-start;
  letter-spacing: -0.4px;
  line-height: 22px;
  padding-bottom: 16px;
  padding-horizontal: 0px;
  padding-top: 0px;
`;

export const Required = styled.Text`
  color: ${Colors.destructive2};
`;

export const BottomLine = styled.KeyboardAvoidingView<{ error?: boolean }>`
  height: 1px;
  background-color: ${({ error }) => (error ? Colors.destructive4 : Colors.greyish11)};
  flex: 1;
  width: 100%;
  opacity: 0.5;
`;

export const NumberRemainingCharacters = styled(Typography.Caption2)`
  color: ${Colors.greyish3};
  padding-top: 9px;
  font-family: ${fontFamily.rf_regular};
`;
