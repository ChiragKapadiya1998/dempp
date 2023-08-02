import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';
import { fontSize, wp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE } from '../../../utils/constants';

export const HeadingText = styled(Typography.Body2)`
  font-size: ${fontSize(16)}px;
  line-height: ${fontSize(22)}px;
  font-weight: normal;
  text-align: center;
  color: ${Colors.greyish2};
  margin-horizontal: ${AUTH_HORIZONTAL_SPACE}px;
  margin-top: ${wp(3.26)}px;
`;

export const QueryText = styled(Typography.Body1)`
  color: ${Colors.greyish1};
`;

export const MatchingText = styled(Typography.H3)`
  color: ${Colors.primary2};
  text-align: center;
`;

export const MatchingTextTransparent = styled.Text`
  color: ${Colors.transparent};
`;
