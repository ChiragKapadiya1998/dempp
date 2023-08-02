import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';
import { fontSize, hp } from '../../../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../../../utils/constants';

export const Container = styled.TouchableOpacity<{ isSelected?: boolean }>`
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  background-color: ${({ isSelected = false }) =>
    isSelected ? Colors.accent7 : Colors.white};
  justify-content: center;
  min-height: ${hp(4.6)}px;
`;

export const Text = styled.Text<{ isSelected?: boolean }>`
  font-family: ${Typography.fontFamily};
  font-weight: 400;
  font-style: normal;
  font-size: ${fontSize(17)}px;
  line-height: 20px;
  letter-spacing: 0.35px;
  color: ${({ isSelected = false }) =>
    isSelected ? Colors.white : Colors.black};
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
`;
