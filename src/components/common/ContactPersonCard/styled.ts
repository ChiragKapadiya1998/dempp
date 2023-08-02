import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';

export const Container = styled.View`
  background-color: ${Colors.greyish8};
  border-radius: 19px;
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  padding-vertical: 16px;
`;

export const ContactLabel = styled(Typography.Rubric2)`
  color: ${Colors.greyish1};
  margin-left: ${HORIZONTAL_MARGIN}px;
`;

export const Row = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const PersonName = styled(Typography.Body1)`
  color: ${Colors.greyish2};
  font-size: 20px;
  margin-left: ${HORIZONTAL_MARGIN}px;
`;

export const TaglineLabel = styled(Typography.Rubric2)`
  color: ${Colors.greyish2};
  margin-left: ${HORIZONTAL_MARGIN}px;
  margin-top: 16px;
`;

export const TaglineText = styled.Text`
  color: ${Colors.greyish2};
  font-family: ${Typography.fontFamily};
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  margin-horizontal: ${HORIZONTAL_MARGIN}px;
  margin-top: 4px;
`;
