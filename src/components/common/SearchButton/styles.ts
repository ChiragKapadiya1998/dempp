import { StyleSheet } from 'react-native';

import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.primary4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3.4),
    maxHeight: hp(6),
    paddingVertical: hp(1.9),
    marginVertical: wp(4),
    flex: 1,
    position: 'relative',
    bottom: 0,
  },
  text: {
    fontSize: fontSize(15),
    lineHeight: fontSize(18),
    fontWeight: '500',
    letterSpacing: -0.4,
    color: Colors.white,
    fontFamily: fontFamily.rf_regular,
  },
});
