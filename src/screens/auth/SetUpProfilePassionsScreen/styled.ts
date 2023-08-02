import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';
import { hp } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';

export const RubricTitle = styled(Typography.Headline)`
  color: ${Colors.greyish1};
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  margin-vertical: ${hp(1.75)}px;
`;

export const RubricDescription = styled(Typography.Rubric2)`
  font-weight: bold;
  color: ${Colors.greyish2};
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  margin-top: ${hp(3.66)}px;
`;
