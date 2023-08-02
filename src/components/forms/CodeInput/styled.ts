import styled from 'styled-components/native';
import { AUTH_HORIZONTAL_SPACE } from '../../../utils/constants';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin-horizontal: ${AUTH_HORIZONTAL_SPACE}px;
`;

export const GhostTextInput = styled.TextInput`
  height: 0px;
  position: absolute;
  right: -1000px;
  width: 0px;
`;
