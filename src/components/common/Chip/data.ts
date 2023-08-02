import { StyleProp, ViewStyle, TextStyle } from 'react-native';

import { ChipVariant } from './types';
import styles from './styles';

export const variantStyles: {
  [V in ChipVariant]: {
    container: StyleProp<ViewStyle>;
    containerSelected: StyleProp<ViewStyle>;
    title: StyleProp<TextStyle>;
    titleSelected: StyleProp<TextStyle>;
  };
} = {
  passion: {
    container: styles.passionContainer,
    containerSelected: styles.passionContainerSelected,
    title: styles.passionTitle,
    titleSelected: styles.passionTitleSelected,
  },
};
