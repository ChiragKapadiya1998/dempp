import moment from 'moment';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import RecorderPlayer from 'react-native-audio-recorder-player';
import { View, TouchableOpacity } from 'react-native';
import { Circle } from 'react-native-progress';
import * as Progress from 'react-native-progress';

import { Colors } from '../../../../../styles';
import SvgIcon from '../../../../../components/common/SvgIcon';
import FlatButton from '../../../../../components/forms/FlatButton';
import { actions as userActions } from '../../../../../ducks/user';
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import PermissionHelper from '../../../../../utils/PermissionHelper';
import { DeleteRecordButton, DeleteRecordButtonText, PlaybackTimeEdit } from '../../../../../components/common/AudioRecorderPlayer/styled';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/core';
import TitleSmall from '../../../../../components/common/TitleSmall';
import 'moment-duration-format';
import remoteConfig from '@react-native-firebase/remote-config';
import ErrorMessage from '../../../../../components/forms/ErrorMessage';
import { fontSize, wp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';
import { actions as passionsActions } from '../../../../../ducks/passions';

const AudioPlayer = () => {
  const dispatch = useAppDispatch();
  const isAudioRequired = remoteConfig().getValue('isAudioTagRequired').asBoolean();
  const maxDuration = remoteConfig().getValue('taglineAudioDuration').asNumber() / 60;
  const { data: user, loading, isUserEditing, isEditTagline } = useAppSelector((state) => state.user);
  const { isEditing } = useAppSelector((state) => state.passions);
  const [play, setPlay] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState<null | string>(null);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [progress, setProgress] = useState({
    current: 0,
    duration: 0,
  });

  const TitleSmallColor = isUserEditing ? Colors.greyish3 : isEditTagline ? Colors.greyish3 : isEditing ? Colors.greyish3 : Colors.greyish3;
  const audioBgColor = isUserEditing ? 'transparent' : isEditTagline ? 'transparent' : isEditing ? 'transparent' : Colors.white;
  const deleteColor = isUserEditing ? Colors.greyish3 : isEditTagline ? Colors.greyish3 : isEditing ? Colors.greyish3 : Colors.destructive4;
  const opacityStyle = isEditing ? 0.4 : isEditTagline ? 0.4 : isUserEditing ? 0.4 : 1;

  const player = useRef<RecorderPlayer>(new RecorderPlayer());
  const onDeletePress = () => {
    if (recording) onStopRecording();
    if (play) setPlay(false);

    if (isAudioRequired) return setAudio(null);
    dispatch(
      userActions.updateUserRequest({
        taglineAudio: '',
        taglineAudioDuration: 0,
      }),
    );
    setAudio(null);
  };

  const getMaxDuration = () => {
    if (maxDuration === 1) return `${maxDuration} minute`;
    else if (maxDuration < 1) return `${maxDuration * 60} seconds`;
    else if (maxDuration > 1) return `${maxDuration} minutes`;
  };

  const onRecording = () => {
    PermissionHelper.checkAudioPermissions()
      .then((allow) => {
        if (allow) {
          player.current.startRecorder();
          player.current.addRecordBackListener(async (event) => {
            setProgress({
              duration: event.currentPosition,
              current: event.currentPosition,
            });
            if (event.currentPosition > maxDuration * 60 * 1000) {
              onStopRecording();
            }
          });
        } else {
          throw new Error('Access denied');
        }

        return allow;
      })
      .then(setRecording)
      .catch(console.error);
  };

  const onStopRecording = useCallback(() => {
    player.current
      .stopRecorder()
      .then((uri) => {
        setAudio(uri);
        dispatch(
          userActions.updateUserRequest({
            taglineAudio: uri,
            taglineAudioDuration: Math.round(progress.duration),
          }),
        );
      })
      .then(() => {
        player.current.removeRecordBackListener();
        setProgress({
          current: 0,
          duration: 0,
        });
      })
      .then(() => setRecording(false))
      .catch(console.error);
  }, [progress]);

  useFocusEffect(
    useCallback(() => {
      if (user?.taglineAudio) {
        setAudio(user.taglineAudio);
      }

      return () => {
        player.current.removeRecordBackListener();
        player.current.stopPlayer();
        player.current.stopRecorder();
      };
    }, [user]),
  );

  useEffect(() => {
    if (audio) {
      if (play) {
        player.current.addPlayBackListener(async (event) => {
          setProgress({
            current: Math.round(event.currentPosition),
            duration: Math.round(event.duration) + 50,
          });
          const progress = event.currentPosition / event.duration;
          setPlaybackProgress(progress);
          if (Math.round(event.duration) - 50 <= Math.round(event.currentPosition)) setPlay(false);
        });
        player.current.startPlayer(audio);
      } else {
        player.current.stopPlayer();
        player.current.removePlayBackListener();
        setProgress({
          current: 0,
          duration: 0,
        });
      }
    }

    return () => {
      setProgress({
        current: 0,
        duration: 0,
      });
      player.current.removePlayBackListener();
    };
  }, [play, audio]);

  if (!user) return null;

  return (
    <View
      style={[styles.playerContainer]}
      onStartShouldSetResponder={() => {
        dispatch(userActions.userEditPress(false));
        dispatch(userActions.userTaglineEditPress(false));
        dispatch(passionsActions.toggleEditPassions(false));
      }}
    >
      <TitleSmall style={[styles.titleSmall, { color: TitleSmallColor }]}>{`About me and my passions (${getMaxDuration()} max)`}</TitleSmall>
      {audio ? (
        <View style={styles.audioWrapper}>
          <TouchableOpacity onPress={() => setPlay((prev) => !prev)} style={styles.relative}>
            <SvgIcon color={Colors.primary4} height={16} name={play ? 'pause' : 'play'} style={[styles.playIcon, { opacity: opacityStyle }]} />
          </TouchableOpacity>
          {loading ? (
            <PlaybackTimeEdit>...loading</PlaybackTimeEdit>
          ) : (
            <PlaybackTimeEdit style={{ color: TitleSmallColor, fontSize: fontSize(14) }}>
              {play
                ? moment.duration(progress.current, 'ms').abs().format('mm:ss', { trim: false })
                : moment
                    .duration(user?.taglineAudioDuration ?? 0, 'ms')
                    .abs()
                    .format('mm:ss', { trim: false })}
            </PlaybackTimeEdit>
          )}
          <Progress.Bar
            height={2.5}
            borderWidth={0}
            width={wp(55)}
            color={Colors.primary4}
            unfilledColor={Colors.greyish5}
            progress={playbackProgress}
          />
          {/* {<View style={{height:8,width:8,backgroundColor:Colors.primary1,borderRadius:8/2,zIndex:1000,position:'absolute',left:playbackProgress<=0?90:100+(playbackProgress*185)}}/>} */}
          <DeleteRecordButton style={{ marginLeft: 'auto' }} onPress={onDeletePress}>
            <DeleteRecordButtonText style={{ color: deleteColor, fontFamily: fontFamily.rf_regular, fontSize: fontSize(13) }}>
              Delete
            </DeleteRecordButtonText>
          </DeleteRecordButton>
        </View>
      ) : (
        <View style={{ opacity: opacityStyle }}>
          <FlatButton
            containerStyle={[styles.audioButton, { backgroundColor: audioBgColor }]}
            titleStyle={{ color: Colors.primary4 }}
            leftIcon={recording ? 'stop' : 'volume-record'}
            onPress={recording ? onStopRecording : onRecording}
            iconColor={Colors.primary4}
            title={
              recording ? `Stop recording (${moment.duration(progress.current, 'ms').abs().format('mm:ss', { trim: false })})` : 'Record an audio'
            }
            variant="outline1"
          />
          {!audio && isAudioRequired && !recording && !loading && (
            <ErrorMessage containerStyle={{ marginTop: 8, fontFamily: fontFamily.rf_regular }}>Audio recording is required</ErrorMessage>
          )}
        </View>
      )}
    </View>
  );
};

export default AudioPlayer;
