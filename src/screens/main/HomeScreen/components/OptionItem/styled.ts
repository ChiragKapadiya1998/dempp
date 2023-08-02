import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';
import { fontFamily } from '../../../../../utils/functions';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 13px;
`;

export const TitleText = styled(Typography.Body2)`
  color: ${Colors.accent19};
  margin-left: 12px;
  font-size: 14px;
  font-weight: 400;
  font-family: ${fontFamily.rf_regular};

`;
