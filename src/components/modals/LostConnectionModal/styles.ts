import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: -100,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    width: wp(85.25),
    paddingVertical: wp(8.6),
    paddingHorizontal: wp(3.85),
    borderTopRightRadius: wp(3.38),
    borderTopLeftRadius: wp(3.38),
    backgroundColor: Colors.white,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: wp(85.25),
    height: hp(5.5),
    borderBottomRightRadius: wp(3.38),
    borderBottomLeftRadius: wp(3.38),
    backgroundColor: Colors.white,
  },
  headeringContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    letterSpacing: -0.4,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  textSubStyle: {
    fontSize: fontSize(13),
    lineHeight: fontSize(16),
    letterSpacing: -0.07,
    textAlign: 'center',
    color: Colors.black,
  },
  separateContent: {
    height: 0.5,
    backgroundColor: 'rgba(60, 60, 67, 0.36)',
  },
  separatefooter: {
    width: 0.5,
    height: hp(5.5),
    backgroundColor: 'rgba(60, 60, 67, 0.36)',
  },
});
