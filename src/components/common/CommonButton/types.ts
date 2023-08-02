import { GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { SvgIconName } from '../SvgIcon/types';

export type CommonButtonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  gradientColors?: any;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  isLinearGradient?: boolean;

  // leftIcon?: SvgIconName;
  // rightIcon?: SvgIconName;
  // iconHeight?: number;
  // iconColor?: string;
  loading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
};
