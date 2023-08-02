import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';
import { HORIZONTAL_MARGIN } from '../../../../../utils/constants';

export const Overlay = styled.Pressable`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(9, 30, 66, 0.4);
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.View`
  background-color: ${Colors.white};
  padding-vertical: 20px;
  padding-horizontal: ${HORIZONTAL_MARGIN}px;
  max-width: 270px;
  border-radius: 14px;
`;

export const HeadingText = styled(Typography.Headline)`
  text-align: center;
`;

export const HeadingTextRed = styled.Text`
  color: ${Colors.destructive4};
`;

export const InstructionText = styled(Typography.Footnote)`
  text-align: center;
  text-transform: undefined;
  margin-top: 2px;
`;

export const TextInput = styled.TextInput`
  background-color: ${Colors.greyish9};
  margin-top: 20px;
  min-height: 40px;
  font-family: ${Typography.fontFamily};
  padding-horizontal: ${HORIZONTAL_MARGIN}px;
  padding-vertical: 9px;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.24px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  margin-top: 10px;
`;

export const ConfirmButtonTitle = styled(Typography.Headline)`
  color: ${Colors.destructive4};
  text-align: center;
`;
