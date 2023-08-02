import { StyleProp, ViewStyle } from 'react-native';

export type AvailabilityStatus = 'sleep' | 'available' | 'feeling-chatty';

export type ModesChattyProps = {
  maxQuery: boolean;
  sleepTimeHours: number | any;
  maxQueriesLimitReached: boolean;
  availabilityStatus: AvailabilityStatus;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};
