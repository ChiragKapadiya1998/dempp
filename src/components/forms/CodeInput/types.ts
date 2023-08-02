import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type CodeInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  invalid?: boolean;
  length: number;
  onBlur?: () => void;
  onChangeText: (text: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value: string;
};
