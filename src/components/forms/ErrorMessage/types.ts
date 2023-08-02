import { StyleProp, ViewStyle } from 'react-native';

export type ErrorMessageProps = {
  children?: string;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  showIcon?: boolean;
};
