import { StyleSheet } from 'react-native';
import { SafeAreaFrameContext, SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE, HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';
import { ISIOS } from '../../../utils/hooks';

const ITEM_VERTICAL_SPACE: number = hp(1.6);

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    // flexDirection: 'row',
  },
  contact: {
    paddingVertical: ITEM_VERTICAL_SPACE,
    borderBottomWidth: 1,
    borderBottomColor: '#B3B3B3',
  },
  contactText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(20),
    fontWeight: '500',
    letterSpacing: -0.24,
    color: Colors.black,
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  contactNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    paddingVertical: ITEM_VERTICAL_SPACE,
    marginLeft: HORIZONTAL_MARGIN,
    justifyContent:'space-between',
    alignItems:'center'
  },
  multiplyContainer: {
    marginTop: hp(0.81),
  },
  icon: {
    marginRight: -wp(1.85),
  },
  inviteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary4,
    height: hp(6),
    borderRadius: wp(3.4),
    marginHorizontal: wp(9.5),
  },
  header: {
    fontSize: fontSize(15),
    lineHeight: fontSize(20),
    fontWeight: '500',
    letterSpacing: -0.24,
    color: Colors.black,
  },
  headerContainer: {
    paddingVertical: wp(1.2),
    paddingHorizontal: wp(4),
    backgroundColor: Colors.secondary5,
    marginBottom: hp(0.5),
  },
  customHeader: {
    minHeight: 130,
    paddingTop: 42,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEE1E6',
    borderRadius: wp(4),
    marginTop: hp(0.5),
    marginBottom: hp(1.35),
    paddingHorizontal: wp(3.5),
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  searchInput: {
    fontSize: fontSize(15),
    lineHeight: fontSize(20),
    letterSpacing: -0.3,
    width: '100%',
    paddingVertical: hp(1.7),
    paddingHorizontal: wp(2),
    fontFamily: fontFamily.rf_medium,
    fontWeight: '400',
    color: Colors.accent19,
  },
  inviteButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: fontSize(15),
    fontFamily: fontFamily.rf_medium,
    letterSpacing: -0.4,
  },
  bottomAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    backgroundColor: Colors.greyish1,
    left: wp(2),
    right: wp(2),
    bottom: hp(4.6),
    paddingHorizontal: wp(4.35),
    paddingVertical: hp(1.15),
    borderRadius: wp(2),
    // zIndex:9999
  },
  bottomAlertText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(20),
    fontWeight: '500',
    letterSpacing: -0.24,
    color: Colors.white,
    flex: 1,
  },
  bottomAlertButtonText: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    fontWeight: '600',
    letterSpacing: -0.4,
    color: Colors.secondary2,
  },
  alphabatesContainer: {
    position: 'absolute',
    right: wp(1.75),
    marginVertical: hp(4),
    paddingVertical: hp(4),
  },
  footerContent: {
    backgroundColor: Colors.white,
    paddingTop: hp(2.5),
    borderTopStartRadius: wp(12),
    borderTopEndRadius: wp(12),
    shadowColor: '#143a73',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
});
