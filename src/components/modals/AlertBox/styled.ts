import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';
import { fontFamily } from '../../../utils/functions';

export const Container = styled.View`
  background-color: ${Colors.white};
  border-radius: 14px;
  margin-left: 72px;
  margin-right: 72px;
  min-width: 290px;
  overflow: hidden;
`;

export const TitleText = styled(Typography.Headline)`
  align-self: center;
  flex-direction: row;
  text-align: center;
`;

export const MessageText = styled(Typography.Footnote)`
  align-self: center;
  margin-top: 2px;
  text-transform: none;
  font-family: ${fontFamily.rf_regular};
  color: ${Colors.accent19};
`;

export const Content = styled.View`
  align-self: center;
  padding: 16px;
  width: 100%;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity<{ first?: boolean }>`
  align-items: center;
  border-right-color: ${Colors.greyish7};
  border-right-width: ${({ first }) => (first ? 0.5 : 0)}px;

  padding-bottom: 16px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 16px;
`;

export const ButtonText = styled(Typography.Body1)<{
  variant?: 'default' | 'destructive';
}>`
  color: ${({ variant }) => (variant === 'destructive' ? Colors.destructive4 : Colors.primary2)};
  font-weight: bold;
`;
