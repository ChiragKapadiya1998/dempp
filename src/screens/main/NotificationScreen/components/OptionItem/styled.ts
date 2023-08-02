import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';
import { fontFamily } from '../../../../../utils/functions';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 13px;
`;

export const TitleText = styled(Typography.Body2)`
  font-weight: normal;
  color: ${Colors.accent19};
  margin-left: 12px;
  font-family: ${fontFamily.rf_regular};
`;
