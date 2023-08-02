import styled from 'styled-components/native';
import { Colors } from '../../../../../styles';

export const Container = styled.View`
  height: 28px;
  width: 28px;
  border-radius: 28px;
  border-width: 1px;
  border-color: ${Colors.primary7};
`;

export const SelectedContainer = styled.View`
  height: 28px;
  width: 28px;
  border-radius: 28px;
  border-width: 1px;
  border-color: ${Colors.primary4};
  justify-content: center;
  align-items: center;
`;

export const SelectedDot = styled.View`
  height: 16px;
  width: 16px;
  border-radius: 16px;
  background-color: ${Colors.primary4};
`;
