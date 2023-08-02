import { GestureResponderEvent } from 'react-native';

export type BottomSheetListItemProps = {
  value: string;
  onPress?: (event: GestureResponderEvent) => void;
  selected?: boolean;
};
