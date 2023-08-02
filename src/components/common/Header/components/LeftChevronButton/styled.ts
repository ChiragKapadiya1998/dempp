import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';
import { HORIZONTAL_MARGIN } from '../../../../../utils/constants';

export const Container = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  height: 100%;
  padding-horizontal: ${HORIZONTAL_MARGIN}px;
`;

export const Title = styled(Typography.Body1)`
  color: ${Colors.greyish1};
`;
