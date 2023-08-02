import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  bodyContentInner: {
    backgroundColor: Colors.accent21,
    width: wp(3.8),
    height: wp(3.8),
    borderRadius: wp(3.8),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(-2.5),
    marginTop: hp(-2.6),
  },
  bodyContent: {
    backgroundColor: Colors.accent7,
    width: wp(2.8),
    height: wp(2.8),
    borderRadius: wp(2.8),
    justifyContent: 'center',
    alignItems: 'center',
  },

  bodyText: {
    fontSize: fontSize(8),
    color: Colors.white,
    letterSpacing: -0.24,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: fontFamily.rf_medium,
  },
});
