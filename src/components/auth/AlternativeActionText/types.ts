import { GestureResponderEvent, StyleProp, TextStyle } from 'react-native';

export type Props = {
  highlightedText: string;
  onPress?: (event: GestureResponderEvent) => void;
  regularText: string;
  style?: StyleProp<TextStyle>;
};
