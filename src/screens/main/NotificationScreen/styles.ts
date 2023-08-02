import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary5,
    // paddingTop: 22,
  },
  title: {
    marginTop: hp(2),
    paddingHorizontal: wp(4.2),
    fontSize: fontSize(11),
    lineHeight: fontSize(16),
    color: Colors.greyish27,
    textTransform: 'uppercase',
    fontFamily: fontFamily.rf_medium,
  },
  contentContainer: {
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 20,
    marginTop: hp(1.35),
    paddingVertical: hp(1.4),
    paddingLeft: wp(8),
    paddingRight: wp(5),
    shadowColor: Colors.primary5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  nextButton: {
    minHeight: hp(6),
    marginHorizontal: wp(6),
    backgroundColor: Colors.primary4,
    borderRadius: 15,
  },

  applyMainContent: {
    alignItems: 'center',
    paddingVertical: hp(2),
    backgroundColor: Colors.primary4,
    paddingHorizontal: wp(24),
    marginTop: hp(4),
    marginHorizontal: wp(6),
    borderRadius: 15,
  },
  applyText: {
    color: Colors.greyish6,
    fontSize: fontSize(17),
    fontWeight: '500',
    lineHeight: fontSize(16),
    marginRight: wp(2),
    fontFamily: fontFamily.rf_medium,
  },
  contentBodyIcon: {
    alignSelf: 'center',
    marginVertical: hp(0.26),
  },
  disableButton: {
    backgroundColor: Colors.greyish26,
    paddingHorizontal: wp(24),
    marginTop: hp(4),
    marginHorizontal: wp(6),
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: hp(2),
  },
});
