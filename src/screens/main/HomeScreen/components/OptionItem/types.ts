import { GestureResponderEvent } from 'react-native';

export type Props = {
  isSelected: boolean;
  title: string;
  index: number;

  onPress: (event: GestureResponderEvent) => void;
};
