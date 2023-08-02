import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  skipText: {
    fontSize: fontSize(17),
    color: Colors.greyish3,
    fontFamily: fontFamily.rf_medium,
  },
  header: {
    width: '100%',
    paddingHorizontal: 32,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacer: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
  },
  pagintion: {
    marginTop: 'auto',
    marginBottom: hp(2.4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  paginationButtonText: {
    color: Colors.primary4,
    fontSize: fontSize(17),
    fontFamily: fontFamily.rf_medium,
  },
  content: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    paddingBottom: 42,
  },
  contentImageContainer: {
    alignSelf: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentText: {
    // paddingHorizontal: wp(8.2),
    fontSize: fontSize(20),
    lineHeight: fontSize(32),
    color: Colors.greyish2,
    textAlign: 'center',
    fontFamily: fontFamily.rf_regular,
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.primary4,
  },
  disabledDot: {
    backgroundColor: '#C4C4C4',
  },
  paginationButton: {
    flex: 0.3,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
