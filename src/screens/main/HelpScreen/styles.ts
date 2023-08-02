import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.secondary5,
  },
  listItemTitle: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    color: Colors.greyish1,
  },
  title: {
    marginTop: hp(3.8),
    marginBottom: hp(0.8),
    marginLeft: wp(6),
    fontFamily: fontFamily.rf_regular,
    // fontWeight: '400',
  },
  listContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: wp(6.2),
    paddingVertical: 1,
    shadowColor: Colors.primary5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.099,
    shadowRadius: 10,
    elevation: 5,
  },
  rightSide: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  linkText: {
    color: '#0052CC',
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    marginRight: wp(2.8),
  },
  icon: {},
  versionText: {
    fontSize: fontSize(14),
    lineHeight: fontSize(16),
    marginTop: hp(2.8),
    marginBottom: hp(1.5),
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.greyish27,
    fontFamily: fontFamily.rf_regular,
  },
  versionTextSub: {
    marginBottom: hp(1),
    fontSize: fontSize(14),
    lineHeight: fontSize(16),
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '400',
    color: Colors.primary4,
    fontFamily: fontFamily.rf_regular,
  },
});
