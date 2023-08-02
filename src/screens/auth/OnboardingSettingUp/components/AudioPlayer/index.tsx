import moment from 'moment';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import RecorderPlayer from 'react-native-audio-recorder-player';
import { View, TouchableOpacity } from 'react-native';
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
import { wp } from '../../../../../styles/metrics';
import { Status } from '../../../../../components/common/AudioRecorderPlayer/types';
import { getSecsFromMmssString } from '../../../../../utils/functions';

const AudioPlayer = ({ setProfileAudio, setProfileAudioDuration, isa, iscount, setRecorderPlayerState }: any) => {
  const player = useRef<RecorderPlayer>(new RecorderPlayer());

  const dispatch = useAppDispatch();
  const isAudioRequired = remoteConfig().getValue('isAudioTagRequired').asBoolean();
  const maxDuration = remoteConfig().getValue('taglineAudioDuration').asNumber() / 60;
  const { data: user, loading, isUserEditing, isEditTagline } = useAppSelector((state) => state.user);
  const [play, setPlay] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState<null | string>(null);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [currentRecordDuration, setCurrentRecordDuration] = useState<string>(player.current?.mmss(0)); // mm:ss
  const [progress, setProgress] = useState({
    current: 0,
    duration: 0,
  });

  const deleteColor = Colors.destructive4;
  const opacityStyle = 1;

  useEffect(() => {
    if (audio == null) {
      setAudio(isa);
      setCurrentRecordDuration(player.current?.mmss(iscount));
    }
  }, []);

  const onDeletePress = () => {
    if (recording) onStopRecording();
    if (play) setPlay(false);
    setRecorderPlayerState(Status.Idle);
    if (isAudioRequired) return setAudio(null);
    setAudio(null);
    setProfileAudio('');
    setProfileAudioDuration(0);
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
            setCurrentRecordDuration(player.current?.mmss(Math.round(event.currentPosition / 1000)));
            setRecorderPlayerState(Status.Recording);
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
        setProfileAudio(uri);
        setProfileAudioDuration(getSecsFromMmssString(currentRecordDuration));
        setRecorderPlayerState(Status.Idle);
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
      if (audio) {
        setAudio(isa);
        setCurrentRecordDuration(iscount);
      }

      return () => {
        player.current.removeRecordBackListener();
        player.current.stopPlayer();
        player.current.stopRecorder();
      };
    }, []),
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
        setRecorderPlayerState(Status.Playing);
        player.current.startPlayer(audio);
      } else {
        player.current.stopPlayer();
        player.current.removePlayBackListener();
        setRecorderPlayerState(Status.Paused);
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

  return (
    <View style={styles.playerContainer}>
      {audio ? (
        <View style={styles.audioWrapper}>
          <TouchableOpacity onPress={() => setPlay((prev) => !prev)} style={styles.relative}>
            <SvgIcon color={Colors.primary2} height={16} name={play ? 'pause' : 'play'} style={[styles.playIcon, { opacity: opacityStyle }]} />
          </TouchableOpacity>

          <PlaybackTimeEdit style={{ color: Colors.greyish2 }}>
            {play ? moment.duration(progress.current, 'ms').abs().format('mm:ss', { trim: false }) : currentRecordDuration}
          </PlaybackTimeEdit>

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
            <DeleteRecordButtonText style={{ color: deleteColor }}>Delete</DeleteRecordButtonText>
          </DeleteRecordButton>
        </View>
      ) : (
        <>
          <FlatButton
            containerStyle={styles.audioButton}
            leftIcon={recording ? 'stop' : 'volume-high'}
            onPress={recording ? onStopRecording : onRecording}
            iconColor={Colors.primary2}
            title={
              recording ? `Stop recording (${moment.duration(progress.current, 'ms').abs().format('mm:ss', { trim: false })})` : 'Record an audio'
            }
            variant="outline1"
          />
          {!audio && isAudioRequired && !recording && !loading && (
            <ErrorMessage containerStyle={{ marginTop: 8 }}>Audio recording is required</ErrorMessage>
          )}
        </>
      )}
    </View>
  );
};

export default AudioPlayer;
