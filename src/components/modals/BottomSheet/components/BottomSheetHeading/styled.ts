import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';
import { HORIZONTAL_MARGIN } from '../../../../../utils/constants';

export const Heading = styled(Typography.Rubric2)`
  color: ${Colors.black};
  padding-top: 32px;
  margin-left: ${2 * HORIZONTAL_MARGIN}px;
`;
