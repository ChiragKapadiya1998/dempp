import styled from 'styled-components/native';
import { Colors } from '../../../../../styles';

export const Container = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${Colors.greyish4};
`;

export const SelectedContainer = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${Colors.primary2};
  justify-content: center;
  align-items: center;
`;

export const SelectedDot = styled.View`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  background-color: ${Colors.primary2};
`;
