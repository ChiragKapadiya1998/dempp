import { Colors } from '../../../styles';
import { VariantStyle } from './types';
import styles from './styles';

export const buttonVariants = {
  solid1: 'solid1',
  outline1: 'outline1',
  destructiveOutline1: 'destructiveOutline1',
  solid2: 'solid2',
  destructive1: 'destructive1',
  success1: 'success1',
} as const;

export const variantStyles: VariantStyle = {
  [buttonVariants.solid1]: {
    containerDisabled: styles.solid1ContainerDisabled,
    activitIndicatorColor: Colors.white,
  },
  [buttonVariants.outline1]: {
    containerEnabled: styles.outline1ContainerEnabled,
    titleEnabled: styles.outline1TitleEnabled,
    iconHeight: 16,
    iconColorEnabled: Colors.secondary1,
    iconStyle: styles.outline1Icon,
  },
  [buttonVariants.destructiveOutline1]: {
    containerEnabled: styles.destructiveOutline1ContainerEnabled,
    titleEnabled: styles.outline1TitleEnabled,
    iconHeight: 16,
    iconColorEnabled: Colors.secondary1,
    iconStyle: styles.outline1Icon,
  },
  [buttonVariants.solid2]: {
    containerDisabled: styles.solid2ContainerDisabled,
    activitIndicatorColor: Colors.white,
  },
  [buttonVariants.destructive1]: {
    containerEnabled: styles.destructive1ContainerEnabled,
  },
  [buttonVariants.success1]: {
    containerEnabled: styles.success1ContainerEnabled,
  },
};
