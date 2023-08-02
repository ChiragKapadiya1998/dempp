import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: hp(1.6),
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: hp(2),
    borderRadius: wp(5),
    paddingHorizontal: wp(4.2),
    shadowColor: '#F1F7FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.15,
    elevation: 5,
  },
  headerText: {
    fontFamily: fontFamily.rf_medium,
    fontSize: fontSize(13),
    lineHeight: fontSize(15),
    fontWeight: '500',
    color: Colors.accent19,
    marginLeft: wp(3),
    letterSpacing: -0.5,
    flex: 1,
  },
  bodyIcon: {
    alignSelf: 'center',
    marginLeft: wp(2.133),
    transform: [{ rotate: '270deg' }],
  },
  logoContainer: {
    alignItems: 'center',
  },
  emptyView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -1,
  },
  connectionTitle: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    fontWeight: '600',
    letterSpacing: -0.4,
    color: Colors.destructive4,
    textAlign: 'center',
    marginTop: hp(4.6),
    marginBottom: hp(1),
  },
  connectionDesc: {
    fontSize: fontSize(13),
    lineHeight: fontSize(16),
    color: Colors.black,
    textAlign: 'center',
    marginHorizontal: wp(15),
  },
  footerContent: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(2),
    marginRight: wp(5),
  },
  footerIcon: {
    width: wp(5.6),
    height: wp(5.6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary5,
    borderRadius: wp(5.6),
  },
  footerText: {
    fontSize: fontSize(13),
    fontWeight: '500',
    color: Colors.primary4,
    marginRight: wp(1.3),
    fontFamily: fontFamily.rf_medium,
    letterSpacing: -0.3,
  },
});
