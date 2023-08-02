import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../../styles';
import { HORIZONTAL_MARGIN } from '../../../../../utils/constants';
import { fontFamily } from '../../../../../utils/functions';

export const Container = styled.View`
  margin-top: 24px;
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const LabelText = styled(Typography.Rubric2)`
  flex: 1;
  flex-direction: row;
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  color: ${Colors.greyish3};
  font-size: 10px;
`;

export const EditButton = styled.TouchableOpacity`
  padding-horizontal: ${HORIZONTAL_MARGIN}px;
`;

export const TaglineText = styled(Typography.Body4)`
  color: ${Colors.greyish1};
  margin-top: 8px;
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  font-size: 14px;
  font-weight: 400;
  font-family: ${fontFamily.rf_regular};
  line-height:18px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 8px;
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
`;
