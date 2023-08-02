import { StyleSheet } from 'react-native';
import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  mainStyle: {
    paddingVertical: hp(1.6),

    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(5),
    justifyContent: 'space-between',
    paddingHorizontal: wp(4.2),
  },
  bodyIcon: {
    alignSelf: 'center',
    marginLeft: wp(2.133),
    transform: [{ rotate: '270deg' }],
  },
  textContent: {
    fontSize: fontSize(13),
    fontWeight: '500',
    letterSpacing: -0.3,
    flex: 1,
    marginLeft: wp(5),
    fontFamily: fontFamily.rf_semibold,
    lineHeight: fontSize(15.5),
  },
});
