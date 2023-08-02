import { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

export type DropdownProps = {
  containerStyle?: StyleProp<ViewStyle>;
  opened?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  placeholder: string;
  required?: boolean;
  value: string | null;
};
