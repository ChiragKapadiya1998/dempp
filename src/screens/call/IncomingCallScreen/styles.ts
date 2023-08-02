import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { IS_IOS } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
    paddingHorizontal: wp(3.2),
    paddingBottom: 0,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: IS_IOS ? wp(31) : wp(21),
    height: IS_IOS ? wp(31) : wp(21),
    borderRadius: IS_IOS ? wp(31) : wp(21),
    backgroundColor: Colors.white,
  },
  avatarText: {
    fontSize: fontSize(35),
    color: Colors.black,
    fontWeight: '600',
  },
  whiteLogo: {
    // position: 'absolute',
    // top: 35,
    // right: 16,
    alignSelf: 'center',
    marginBottom: hp(2.7),
  },
  actions: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems:'center',
    marginBottom: hp(6),
  },
  button: {
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    paddingVertical: hp(1.9),
    marginHorizontal: wp(3.7),
  },
  decline: {
    backgroundColor: Colors.destructive4,
    // marginRight: 11,
  },
  accept: {
    backgroundColor: Colors.destructive3,

    // marginLeft: 11,
  },
  buttonText: {
    fontSize: fontSize(15),
    color: Colors.white,
    fontFamily: fontFamily.rf_medium,
    fontWeight: '500',
    letterSpacing: -0.4,
    lineHeight: fontSize(18),
  },
  passions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  passion: {
    borderRadius: 4,
    paddingHorizontal: 17,
    paddingVertical: 3,
    marginRight: 9,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: Colors.greyish3,
  },
  details: {
    paddingVertical: IS_IOS ? hp(2.9) : hp(1.7),
    paddingHorizontal: wp(5.2),
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: IS_IOS ? hp(8.2) : hp(4),
  },
  description: {
    fontSize: fontSize(15),
    color: Colors.white,
    marginBottom: 8,
    fontFamily: fontFamily.rf_regular,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: fontSize(18),
    letterSpacing: -0.3,
  },
  info: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  caller: {
    fontSize: IS_IOS ? fontSize(28) : fontSize(18),
    color: Colors.white,
    marginBottom: hp(0.9),
    marginTop: hp(1.9),
    paddingVertical: hp(1.5),
    fontFamily: fontFamily.rf_semibold,
    letterSpacing: -0.4,
    fontWeight: '600',
    lineHeight: IS_IOS ? fontSize(33.5) : fontSize(21.6),
  },
  body: {
    fontSize: fontSize(17),
    color: Colors.white,
    fontFamily: fontFamily.rf_regular,
    letterSpacing: -0.3,
    lineHeight: fontSize(22.95),
    fontWeight: '400',
  },
  reasonContainer: {
    marginTop: 16,
    marginBottom: 22,
  },
  reasonTitle: {
    fontSize: fontSize(15),
    fontWeight: '500',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 5,
  },
  reasonDescription: {
    fontSize: fontSize(15),
    fontWeight: '300',
    color: Colors.white,
    textAlign: 'center',
  },
});
