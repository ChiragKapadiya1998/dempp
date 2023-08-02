import { StyleProp, ViewStyle } from 'react-native';

export enum Status {
  Idle = 'Idle',
  Recording = 'Recording',
  Paused = 'Paused',
  Playing = 'Playing',
}

export type AudioRecorderPlayerProps = {
  containerStyle?: StyleProp<ViewStyle>;
  initialRecord?: string;
  initialDuration?: number;
  label?: string;
  maxRecordDuration?: number;
  onChange?: (status: Status, path: string | null, duration: number) => void;
  onRecordDelete?: () => void;
  onRecordingComplete?: (path: string) => void;
};
