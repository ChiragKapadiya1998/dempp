import React from 'react';
import * as Progress from 'react-native-progress';

import { AudioRecorderPlayerProps } from './types';
import FlatButton from '../../forms/FlatButton';
import useAudio from './useAudio';
import SvgIcon from '../SvgIcon';
import { PROGRESS_ICON_HEIGHT } from './data';
import { SvgIconName } from '../SvgIcon/types';
import { wp } from '../../../styles/metrics';
import { Colors } from '../../../styles';
import { Container, DeleteRecordButton, DeleteRecordButtonText, IconButton, PlaybackTime, Player, Label } from './styled';
import styles from './styles';

export default (props: AudioRecorderPlayerProps): JSX.Element | null => {
  const { containerStyle, label } = props;

  const {
    flatButtonIcon,
    flatButtonText,
    iconButtonName,
    isMounted,
    onDeleteRecordPress,
    onFlatButtonPress,
    onIconButtonPress,
    playbackProgress,
    playbackResult,
    showProgress,
  } = useAudio(props);

  if (!isMounted) return null;

  return (
    <Container style={containerStyle}>
      <Label>{label}</Label>
      {showProgress ? (
        <Player>
          <IconButton onPress={onIconButtonPress}>
            <SvgIcon color={Colors.primary2} height={PROGRESS_ICON_HEIGHT} name={iconButtonName as SvgIconName} />
            <PlaybackTime>{playbackResult}</PlaybackTime>
            <Progress.Bar
              height={2.5}
              borderWidth={0}
              width={wp(50)}
              color={Colors.primary2}
              unfilledColor={Colors.greyish5}
              progress={playbackProgress}
            />
          </IconButton>
          <DeleteRecordButton onPress={onDeleteRecordPress}>
            <DeleteRecordButtonText>Delete</DeleteRecordButtonText>
          </DeleteRecordButton>
        </Player>
      ) : (
        <FlatButton
          containerStyle={styles.audioButton}
          leftIcon={flatButtonIcon}
          onPress={onFlatButtonPress}
          title={flatButtonText}
          variant={'outline1'}
          iconColor={Colors.primary2}
        />
      )}
    </Container>
  );
};
