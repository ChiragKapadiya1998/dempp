import styled from 'styled-components/native';
import { Colors, Metrics, Typography } from '../../../styles';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';

export const Container = styled.Pressable<{ error?: boolean }>`
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  min-height: 60px;
  width: ${Metrics.screenWidth - 2 * HORIZONTAL_MARGIN}px;
`;

export const ValueContainer = styled.View`
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
`;

export const Label = styled(Typography.Rubric2)`
  color: ${Colors.greyish2};
  padding-top: 4px;
`;

export const Required = styled.Text`
  color: ${Colors.destructive2};
`;

export const ValueText = styled(Typography.Body2)`
  flex-direction: row;
  flex: 1;
`;

export const PlaceholderText = styled(Typography.Body2)`
  color: ${Colors.greyish4};
  flex-direction: row;
  flex: 1;
`;

export const BottomLine = styled.KeyboardAvoidingView<{ error?: boolean }>`
  border-bottom-width: 1px;
  border-bottom-color: ${({ error }) => (error ? Colors.destructive4 : Colors.greyish4)};
  flex: 1;
  width: 100%;
`;
