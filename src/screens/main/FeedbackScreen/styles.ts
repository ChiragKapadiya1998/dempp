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
    lineHeight: fontSize(33.2),
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.accent19,
    marginTop: 10,
    marginBottom: 14,
    fontFamily: fontFamily.rf_semibold,
    letterSpacing: -0.4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '100%',
    marginTop: 21,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingTop: 32,
    paddingHorizontal: wp(6.9),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.05,
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
    fontFamily: fontFamily.rf_semibold,
  },
  feedbackInput: {
    marginHorizontal: 0,
    width: '100%',
    fontSize: fontSize(17),
    fontWeight: '400',
    minHeight: hp(5),
    maxHeight: hp(23),
    borderBottomWidth: 0.5,
    // paddingBottom: hp(2),
    borderBottomColor: Colors.secondary16,
    marginTop: hp(1.4),
    fontFamily: fontFamily.rf_regular,
    color: Colors.greyish27,
  },
  nextButton: {
    marginTop: 20,
    width: '100%',
  },
  TYContiner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  TYImage: {
    width: wp(55),
    height: wp(55),
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
});
