import styled from 'styled-components/native';
import { Typography, Colors } from '../../../styles';
import { fontSize } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';

export const DescriptionText = styled.Text`
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  font-weight: 400;
  font-size: ${fontSize(14)}px;
  color: ${Colors.black};
`;

export const DescriptionTextFirstLine = styled.Text`
  margin-top: 20px;
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  font-weight: 400;
  font-size: ${fontSize(14)}px;
  color: ${Colors.black};
`;

export const MiddleDot = styled(Typography.Body3)`
  margin-left: 24px;
`;

export const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ListItemText = styled(Typography.Body5)`
  margin-right: ${HORIZONTAL_MARGIN}px;
  font-weight: 400;
  margin-left: 8px;
  font-size: ${fontSize(14)}px
  color: ${Colors.black};
  letter-spacing: -0.24px;
`;

export const EncouragingText = styled(Typography.Body2)`
  color: ${Colors.greyish1};
  text-align: center;
  font-size: 17px;
  color: ${Colors.greyish2};
  letter-spacing: -1px;
`;

export const HighlightedText1 = styled(Typography.Body2)`
  color: ${Colors.destructive4};
  font-weight: 500;
  font-size: ${fontSize(15)}px;
`;
export const HighlightedText = styled(Typography.Body2)`
  color: ${Colors.primary2};
`;
