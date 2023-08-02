import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(3.7),
    padding: wp(0.5),
    borderRadius: wp(5.5),
    marginLeft: wp(1.75),
    paddingHorizontal: wp(3.5),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.099,
    shadowRadius: 7,
    elevation: 5,
    justifyContent:'center'
  },
  onOffContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: wp(0.5),
    borderRadius: wp(5),
    height: wp(5),
    width: wp(5),
  },
  onOffText: {
    fontSize: fontSize(7),
    fontWeight: 'bold',
    marginLeft: wp(0.25),
    marginTop: wp(0.25),
  },
  chattyTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: wp(6),
  },
  chattyText: {
    fontSize: fontSize(9),
    lineHeight: fontSize(10),
    fontWeight: '800',
    letterSpacing: 0.14,
    color: Colors.primary5,
    marginLeft: wp(2),
    textTransform: 'uppercase',
    fontFamily: fontFamily.rf_bold,
  },
});
