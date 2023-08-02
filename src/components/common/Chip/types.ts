import { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

export type ChipVariant = 'passion';

export type ChipProps = {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  selected?: boolean;
  title: string;
  variant: ChipVariant;
};
