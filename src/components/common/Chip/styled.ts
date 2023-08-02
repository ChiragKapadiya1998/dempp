import styled from 'styled-components/native';
import { Typography } from '../../../styles';

export const Container = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-family: ${Typography.fontFamily};
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  letter-spacing: -0.15px;
  line-height: 16.71px;
`;
