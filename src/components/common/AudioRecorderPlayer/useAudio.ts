import { useState, useRef, useEffect } from 'react';
import { Keyboard } from 'react-native';
import AudioPlayerRecorder from 'react-native-audio-recorder-player';

import { AudioRecorderPlayerProps, Status } from './types';
import { SvgIconName } from '../SvgIcon/types';
import PermissionHelper from '../../../utils/PermissionHelper';
import { getSecsFromMmssString } from '../../../utils/functions';
import remoteConfig from '@react-native-firebase/remote-config';

export default ({ onChange, initialRecord, onRecordDelete, onRecordingComplete, initialDuration }: AudioRecorderPlayerProps) => {
  const playerRecorder = useRef<AudioPlayerRecorder>(new AudioPlayerRecorder());
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [recordPath, setRecordPath] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0); // per
  const [playbackTime, setPlaybackTime] = useState<string>(playerRecorder.current?.mmss(0)); // mm:ss
  const [playbackDuration, setPlaybackDuration] = useState<string>(playerRecorder.current?.mmss(0)); // mm:ss
  const [currentRecordDuration, setCurrentRecordDuration] = useState<string>(playerRecorder.current?.mmss(0)); // mm:ss
  const [isMounted, setIsMounted] = useState<boolean>(false);

  /** Subscribe for recording */
  useEffect(() => {
    playerRecorder.current?.addRecordBackListener(async (event) => {
      if (event.currentPosition >= remoteConfig().getValue('taglineAudioDuration').asNumber() * 1000) {
        const position = Math.round(event.currentPosition / 1000);
        setPlaybackDuration(playerRecorder.current?.mmss(position));
        const path = await playerRecorder.current?.stopRecorder();

        setStatus(Status.Idle);
        setCurrentRecordDuration(playerRecorder.current?.mmss(0));
        setRecordPath(path);
        onRecordingComplete?.(path);
      }

      setCurrentRecordDuration(playerRecorder.current?.mmss(Math.round(event.currentPosition / 1000)));
      return null;
    });

    return () => playerRecorder.current?.removeRecordBackListener();
  }, []);

  /** Subscribe for playing back */
  useEffect(() => {
    playerRecorder.current?.addPlayBackListener(async (event) => {
      if (event.currentPosition === event.duration) {
        setStatus(Status.Idle);
      }

      setPlaybackTime(playerRecorder.current?.mmss(Math.round(event.currentPosition / 1000)));

      const progress = event.currentPosition / event.duration;

      setPlaybackProgress(progress);
    });

    return () => playerRecorder.current?.removePlayBackListener();
  }, []);

  useEffect(() => {
    onChange?.(status, recordPath, getSecsFromMmssString(playbackDuration));
  }, [status, recordPath, playbackDuration]);

  useEffect(() => {
    if (initialRecord) setRecordPath(initialRecord);
    if (initialDuration) setPlaybackDuration(playerRecorder.current?.mmss(initialDuration));
    setIsMounted(true);
  }, []);

  /** Start recording */
  const onStartRecordingPress = async () => {
    Keyboard.dismiss();
    const isMicrophonePermissionGranted = await PermissionHelper.checkAudioPermissions();

    if (!isMicrophonePermissionGranted) return;
    await playerRecorder.current?.startRecorder();
    setStatus(Status.Recording);
  };

  /** Stop recording */
  const onStopRecordingPress = async () => {
    setPlaybackDuration(currentRecordDuration);

    const path = await playerRecorder.current?.stopRecorder();

    setStatus(Status.Idle);
    setCurrentRecordDuration(playerRecorder.current?.mmss(0));
    setRecordPath(path);
    onRecordingComplete?.(path);
  };

  /** Start or resume playing */
  const onStartPlayingPress = async () => {
    Keyboard.dismiss();
    if (status === Status.Paused) {
      await playerRecorder.current?.resumePlayer();
    } else {
      await playerRecorder.current?.startPlayer();
      await playerRecorder.current?.setVolume(1);
    }

    setStatus(Status.Playing);
  };

  /** Pause playing */
  const onPausePlayingPress = async () => {
    await playerRecorder.current?.pausePlayer();
    setStatus(Status.Paused);
  };

  /** Delete record */
  const onDeleteRecordPress = async () => {
    setPlaybackDuration(playerRecorder.current?.mmss(0));
    setPlaybackProgress(0);
    setRecordPath(null);
    setStatus(Status.Idle);
    setPlaybackTime(playerRecorder.current?.mmss(0));
    onRecordDelete?.();

    if (status === Status.Paused || status === Status.Playing) {
      await playerRecorder.current?.stopPlayer();
    }
  };

  const showProgress = !!recordPath;
  const flatButtonText = status === Status.Idle ? 'Record an audio' : `Stop recording (${currentRecordDuration})`;
  const flatButtonIcon: SvgIconName = status === Status.Idle ? 'volume-high' : 'stop';
  const onFlatButtonPress = status === Status.Idle ? onStartRecordingPress : onStopRecordingPress;
  const iconButtonName = [Status.Idle, Status.Paused].includes(status) ? 'play' : 'pause';
  const onIconButtonPress = [Status.Idle, Status.Paused].includes(status) ? onStartPlayingPress : onPausePlayingPress;
  const playbackResult = status === Status.Idle && !!recordPath ? playbackDuration : playbackTime;

  return {
    flatButtonIcon,
    flatButtonText,
    iconButtonName,
    onDeleteRecordPress,
    onFlatButtonPress,
    onIconButtonPress,
    playbackProgress,
    playbackResult,
    showProgress,
    isMounted,
  };
};
