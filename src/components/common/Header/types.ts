import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type HeaderVariant = 'greyish2' | 'greyish6';

type HeaderStyle = {
  leftChevronButtonColor: string;
  container: StyleProp<ViewStyle>;
  title: StyleProp<TextStyle>;
};

export type HeaderStyleCollection = {
  [K in HeaderVariant]: HeaderStyle;
};

export type HeaderProps = {
  leftChevronButtonShown?: boolean;
  leftChevronButtonTitle?: string;
  title?: string;
  variant: HeaderVariant;
};
