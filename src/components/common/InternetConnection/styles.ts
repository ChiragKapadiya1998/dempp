import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionTitle: {
    fontSize: fontSize(18),
    lineHeight: fontSize(21.6),
    fontFamily: fontFamily.rf_regular,
    fontWeight: '600',
    letterSpacing: -0.4,
    color: Colors.destructive4,
    textAlign: 'center',
    marginTop: hp(4),
    marginBottom: hp(1),
  },
  connectionDesc: {
    fontSize: fontSize(14),
    lineHeight: fontSize(17.5),
    color: Colors.accent19,
    textAlign: 'center',
    marginHorizontal: wp(15),
    fontFamily: fontFamily.rf_regular,
  },
  overlay: {
    margin: 0,
    backgroundColor: Colors.white,
  },
  footerStyle: {
    width: wp(19.2),
    height: wp(19.2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.greyish28,
    borderRadius: wp(19.2),
    alignSelf: 'center',
    top: hp(15),
  },
});
