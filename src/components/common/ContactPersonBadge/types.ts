import { StyleProp, ViewStyle } from 'react-native';

export type ContactPersonBadgeProps = {
  name: string;
  image: string | undefined;
  containerStyle?: StyleProp<ViewStyle>;
};
