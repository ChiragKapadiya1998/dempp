import styled from 'styled-components/native';
import { Metrics, Typography, Colors } from '../../../styles';
import { AUTH_HORIZONTAL_SPACE, HORIZONTAL_MARGIN } from '../../../utils/constants';

export const Container = styled.ScrollView`
  background-color: ${Colors.white};
  elevation: 1;
  flex-grow: 1;
  width: ${Metrics.screenWidth}px;
`;

export const Caption = styled(Typography.Rubric2)`
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  margin-top: ${Metrics.hp(3.66)}px;
`;

export const ProfileImageContainer = styled.View`
  flex-direction: row;
  margin-horizontal: ${AUTH_HORIZONTAL_SPACE}px;
  margin-top: ${Metrics.hp(1.75)}px;
`;
