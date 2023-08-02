import { StyleProp, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';

export type AlertProps = {
  buttons: {
    text?: string;
    variant?: 'default' | 'destructive';
    onPress?: () => void;
  }[];
  onBackdropPressValue?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  btnContentStyle?: StyleProp<ViewStyle>;
  children?: JSX.Element;
  message?: string;
  title?: string | null;
  isVisible?: boolean;
  setIsVisible?: any;
};

export type AlertType = typeof Modal & {
  open: () => void;
  close: () => void;
};
