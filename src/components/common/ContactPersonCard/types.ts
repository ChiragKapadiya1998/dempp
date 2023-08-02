import { StyleProp, ViewStyle } from 'react-native';

export type PersonCardProps = {
  containerStyle?: StyleProp<ViewStyle>;
  name: string;
  profileImage?: string;
  tagline?: string;
  isMyCard?: boolean;
};
