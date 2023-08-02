import { StyleProp, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';

export type BottomSheetProps = {
  children: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  onChange?: (isOpened: boolean) => void;
};

export type BottomSheetType = typeof Modal & {
  open: () => void;
  close: () => void;
};
