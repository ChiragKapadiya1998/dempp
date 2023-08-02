import styled from 'styled-components/native';
import { Colors, Typography } from '../../../styles';
import { hp, wp } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';

export const Container = styled.View`
  margin-right: ${HORIZONTAL_MARGIN}px;
  margin-left: ${HORIZONTAL_MARGIN}px;
`;

export const Player = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${hp(1.6)}px;
  margin-bottom: ${hp(2)}px;
`;

export const IconButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const PlaybackTime = styled(Typography.Subheadline)`
  margin-horizontal: ${wp(2)}px;
`;

export const PlaybackTimeEdit = styled(Typography.Body5)`
  margin-right: ${wp(2)}px;
`;
export const DeleteRecordButton = styled.TouchableOpacity``;

export const DeleteRecordButtonText = styled(Typography.Body4)`
  color: ${Colors.destructive4};
`;

export const Label = styled(Typography.Rubric2)`
  font-weight: bold;
  color: ${Colors.greyish2};
  padding-top: ${hp(2.3)}px;
`;
