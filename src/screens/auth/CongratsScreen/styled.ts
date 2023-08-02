import styled from 'styled-components/native';
import { Colors, Metrics, Typography } from '../../../styles';
import { AUTH_HORIZONTAL_SPACE } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${AUTH_HORIZONTAL_SPACE}px;
`;

export const TitleText = styled(Typography.Large1)`
  color: ${Colors.greyish1};
  text-align: center;
  margin-bottom: ${Metrics.hp(5.7)}px;
`;

export const DescriptionText = styled(Typography.Subheadline)`
  color: ${Colors.greyish1};
  text-align: center;
  margin-top: ${Metrics.hp(4)}px;
  font-family: ${fontFamily.rf_regular};
`;
