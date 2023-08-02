import styled from 'styled-components/native';
import { Colors, Metrics, Typography } from '../../../styles';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export const Container = styled.TouchableOpacity`
  align-items: center;
  background-color: ${Colors.primary1};
  border-radius: 14px;
  flex-direction: row;
  min-height: 56px;
  justify-content: center;
`;

export const Title = styled(Typography.Body4)`
  color: ${Colors.white};
  font-family: ${fontFamily.rf_regular};
`;
