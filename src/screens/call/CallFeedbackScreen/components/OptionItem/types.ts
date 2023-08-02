import { GestureResponderEvent } from 'react-native';

export type Props = {
  isSelected: boolean;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};
