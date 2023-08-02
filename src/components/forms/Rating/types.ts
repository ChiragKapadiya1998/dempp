import { StyleProp, ViewStyle } from 'react-native';

export type RatingProps = {
  value: number;
  onChange: (nextValue: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  color?: string;
};
