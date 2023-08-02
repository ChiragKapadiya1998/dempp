import { StyleSheet, PixelRatio } from 'react-native';
import { Colors, Typography } from '../../../styles';

export default StyleSheet.create({
  passionContainer: {
    alignSelf: 'flex-start',
    borderColor: Colors.greyish1,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 9,
  },
  passionContainerSelected: {
    backgroundColor: Colors.accent7,
    borderColor: Colors.accent7,
    borderWidth: PixelRatio.roundToNearestPixel(1),
    borderRadius: PixelRatio.roundToNearestPixel(4),
  },
  passionTitle: {
    color: Colors.greyish1,
    fontFamily: Typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.154,
  },
  passionTitleSelected: {
    color: Colors.white,
  },
});
