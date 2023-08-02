import { GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { SvgIconName } from '../../common/SvgIcon/types';
import { buttonVariants } from './data';

type ButtonVariant = typeof buttonVariants[keyof typeof buttonVariants];

type VariantElementStyle = {
  activitIndicatorColor?: string;
  containerDisabled?: StyleProp<ViewStyle>;
  containerEnabled?: StyleProp<ViewStyle>;
  titleDisabled?: StyleProp<TextStyle>;
  titleEnabled?: StyleProp<TextStyle>;
  iconHeight?: number;
  iconColorEnabled?: string;
  iconColorDisabled?: string;
  iconStyle?: StyleProp<TextStyle>;
};

export type VariantStyle = {
  [ButtonVariant: string]: VariantElementStyle;
};

export type FlatButtonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  titleStyle1?: StyleProp<TextStyle>;
  disabled?: boolean;
  leftIcon?: SvgIconName;
  rightIcon?: SvgIconName;
  iconHeight?: number;
  iconColor?: string;
  loading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  variant: ButtonVariant;
};
