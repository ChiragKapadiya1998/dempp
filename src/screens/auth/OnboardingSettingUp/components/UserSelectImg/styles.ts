import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../../../../styles';

import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  container: {
    width: wp(32),
    height: wp(32),
    borderRadius: wp(32) / 2,
    backgroundColor: Colors.secondary5,
    alignItems: 'center',
  },
  pulsContent: {
    position: 'absolute',
    right: Platform.OS == 'ios' ? -hp(0.5) : -hp(0.5),
    bottom: -10,
    width: wp(6.3),
    height: wp(6.3),
    backgroundColor: Colors.primary5,
    borderRadius: wp(6.3) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgeStyle: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(40) / 2,
  },
  choosePhotoText: {
    fontSize: fontSize(17),
    color: Colors.primary11,
    marginTop: hp(5),
    fontFamily: fontFamily.rf_regular,
    fontWeight: '400',
  },
  bottomBorder:{
    borderBottomWidth:1,
    borderBottomColor: Colors.primary11
  },
  lineStyle: {
    height: 0.5,
    width: wp(44),
    borderWidth: 0.5,
    alignSelf: 'center',
    borderColor: Colors.primary11,
  },
});
