import { GestureResponderEvent } from 'react-native';

export type Props = {
  isSelected: boolean;
  title: string;
  index:number;
  lastIndex:number;
  onPress: (event: GestureResponderEvent) => void;
};
