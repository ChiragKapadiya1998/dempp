import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.secondary5,
    paddingTop: 22,
  },
  title: {
    fontSize: fontSize(28),
    lineHeight: fontSize(33),
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.greyish1,
    marginTop: hp(5),
    marginBottom: 14,
    fontFamily: fontFamily.rf_medium,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingTop: 32,
    paddingHorizontal: wp(6.9),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.099,
    shadowRadius: 5,
    elevation: 5,
  },
  inputSectionTitle: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.greyish1,
    marginBottom: 9,
    marginRight: 4,
  },
  feedbackInput: {
    // marginHorizontal: 0,
    // width: '100%',
    marginTop: -15,
    marginHorizontal: 0,
    width: '100%',
    fontSize: fontSize(17),
    fontWeight: '400',
    minHeight: hp(2),
    maxHeight: hp(23),
    borderBottomWidth: 0.5,
    // paddingBottom: hp(2),
    borderBottomColor: Colors.secondary16,

    fontFamily: fontFamily.rf_regular,
    color: Colors.greyish27,
  },
  nextButton: {
    marginTop: hp(6),
    width: '100%',
  },
  TYContiner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  TYDescription: {
    color: Colors.greyish2,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 8,
  },
  icon: {
    marginBottom: 50,
  },
  rating: {
    marginTop: 12,
  },
});
