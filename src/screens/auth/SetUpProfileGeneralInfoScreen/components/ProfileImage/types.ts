import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

export type ProfileImageProps = {
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  uri?: string;
};
