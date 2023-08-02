import { Colors } from '../../../styles';
import { HeaderStyleCollection } from './types';
import styles from './styles';

export const headerStyles: HeaderStyleCollection = {
  ['greyish6' as const]: {
    leftChevronButtonColor: Colors.greyish1,
    title: styles.titleGreyish6,
    container: styles.containerGreyish6,
  },
  ['greyish2' as const]: {
    leftChevronButtonColor: Colors.white,
    title: styles.titleGreyish2,
    container: styles.containerGreyish2,
  },
};
