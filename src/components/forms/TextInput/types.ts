import { RefObject } from 'react';
import { StyleProp, ViewStyle, TextInputProps as InputProps, TextInput } from 'react-native';

export interface TextInputProps extends InputProps {
  containerStyle?: StyleProp<ViewStyle>;
  lebleStyle?: StyleProp<ViewStyle>;
  BottomLineStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<ViewStyle>;
  error?: string;
  label?: string;
  labelHidden?: boolean;
  numberRemainingCharactersShown?: boolean;
  ref?: RefObject<TextInput>;
  required?: boolean;
  hideBottomLine?: boolean;
}
