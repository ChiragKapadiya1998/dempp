import { variantStyles } from './data';
import { FlatButtonProps } from './types';
import { SvgIconName } from '../../common/SvgIcon/types';
import { GeneralPreloaderProps } from '../../preloaders/GeneralPreloader/types';
import { SMALL_PRELOADER_SIZE } from '../../../utils/constants';

export default ({
  containerStyle: style,
  disabled = false,
  leftIcon,
  iconHeight,
  iconColor,
  loading = false,
  onPress,
  variant,
  rightIcon,
  titleStyle1,
}: FlatButtonProps) => {
  const containerStyle = disabled ? variantStyles[variant].containerDisabled : variantStyles[variant].containerEnabled;

  const titleStyle = disabled ? variantStyles[variant].titleDisabled : variantStyles[variant].titleEnabled;

  const isDisabled = disabled || loading;

  const { activitIndicatorColor } = variantStyles[variant];

  const leftIconHeight = iconHeight ? iconHeight : variantStyles[variant]?.iconHeight ?? 0;

  const rightIconHeight = iconHeight ? iconHeight : variantStyles[variant]?.iconHeight ?? 0;
  const leftIconName: SvgIconName = leftIcon || 'parla-text';
  const rightIconName: SvgIconName = rightIcon || 'parla-text';
  const leftIconStyle = variantStyles[variant].iconStyle;
  const rightIconStyle = variantStyles[variant].iconStyle;

  const leftIconColor = disabled ? variantStyles[variant].iconColorDisabled : variantStyles[variant].iconColorEnabled;
  const rightIconColor = disabled ? variantStyles[variant].iconColorDisabled : variantStyles[variant].iconColorEnabled;

  const showLeftIcon = !!leftIcon && !!leftIconHeight;

  const showRightIcon = !!rightIcon && !!rightIconHeight;

  const getContainerProps = () => ({
    activeOpacity: 1,
    disabled: isDisabled,
    onPress,
    style: [containerStyle, style],
  });

  const getAcitivityIndicatorProps = (): GeneralPreloaderProps => ({
    containerStyle: { width: SMALL_PRELOADER_SIZE },
    color: activitIndicatorColor,
  });

  const getLeftIconProps = () => ({
    color: iconColor || leftIconColor,
    height: leftIconHeight,
    name: leftIconName,
    style: leftIconStyle,
  });

  const getRightIconProps = () => ({
    color: iconColor || rightIconColor,
    height: rightIconHeight,
    name: rightIconName,
    style: rightIconStyle,
  });

  return {
    getAcitivityIndicatorProps,
    getContainerProps,
    getLeftIconProps,
    showLeftIcon,
    titleStyle,
    getRightIconProps,
    showRightIcon,
  };
};
