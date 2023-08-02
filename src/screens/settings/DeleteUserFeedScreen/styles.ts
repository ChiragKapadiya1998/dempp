import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: wp(4.2),
  },
  scroll: {
    flexGrow: 1,
    width: Metrics.screenWidth,
  },
  headerText: {
    fontSize: fontSize(28),
    fontWeight: '600',
    color: Colors.accent19,
    lineHeight: fontSize(33),
    fontFamily: fontFamily.rf_medium,
  },
  headerSubText: {
    fontSize: fontSize(16),
    fontWeight: '400',
    color: Colors.accent19,
    lineHeight: fontSize(21),
    textAlign: 'center',
    marginTop: hp(2),
    fontFamily: fontFamily.rf_regular,
  },
  deleteMainContent: {
    alignItems: 'center',
    paddingVertical: hp(2),
    borderRadius: wp(3.2),
    backgroundColor: Colors.primary5,
    paddingHorizontal: wp(24),
    marginTop: hp(5),
  },
  deleteText: {
    color: Colors.greyish6,
    fontSize: fontSize(16),
    fontWeight: '500',
    lineHeight: fontSize(16),
    marginRight: wp(2),
    fontFamily: fontFamily.rf_medium,
  },
});
