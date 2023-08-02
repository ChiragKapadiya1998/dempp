import { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

export type ChipVariant = 'passion';

export type BottmtabType = {
  onPress?: (event: GestureResponderEvent) => void;
  selected?: boolean;
  title?: string;
  icons?: string | any;
  isActive?: boolean;
  showValue?: boolean;
};
