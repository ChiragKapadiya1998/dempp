import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../../styles';
import { fontSize, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  feedbackPersonImage: {
    borderRadius: wp(12),
    height: wp(12.5),
    width: wp(12.5),
    overflow: 'hidden',
    resizeMode: FastImage.resizeMode.cover,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: Colors.white,
  },
  userText: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: Colors.accent19,
    fontFamily: fontFamily.rf_regular,
    lineHeight: fontSize(21.6),
    letterSpacing: -0.4,
  },
});
