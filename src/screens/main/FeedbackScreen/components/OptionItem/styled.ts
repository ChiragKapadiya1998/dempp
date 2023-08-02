import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';
import { fontSize } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 8px;
`;

export const TitleText = styled(Typography.Body3)`
  font-weight: normal;
  color: ${Colors.greyish2};
  margin-left: 12px;
  font-family: ${fontFamily.rf_regular};
  font-size: ${fontSize(14)};
  line-height: ${fontSize(17.5)};
`;
