import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../styles';
import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  text: {
    fontSize: fontSize(14),
    marginTop: hp(0.6),
    fontWeight: '400',
    lineHeight: fontSize(22),
    fontFamily: fontFamily.rf_regular,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 8,
    width: 8,
    borderWidth: 1,
    borderRadius: 8 / 2,
    marginLeft: wp(2.8),
    borderColor: Colors.primary10,
    backgroundColor: Colors.primary10,
  },
  buttonInside: {
    height: 16,
    width: 16,
    backgroundColor: Colors.primary4,
    borderRadius: 16 / 2,
  },
  radioBtn: {
    borderWidth: 1,
    height: hp(0.2),
    width: wp(38),
    position: 'absolute',
    zIndex: 1000,
    top: 3,
    borderColor: Colors.primary10,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'column',
  },
});
