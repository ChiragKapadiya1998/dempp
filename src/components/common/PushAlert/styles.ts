import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: -375,
    left: wp(4),
    right: wp(4),
  },
  messageContainer: {
    minHeight: hp(20),
    borderRadius: wp(5),
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    paddingBottom: 0,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(12),
    height: wp(12),
    borderRadius: wp(12),
    backgroundColor: Colors.primary1,
  },
  displayName: {
    fontSize: fontSize(15),
    lineHeight: fontSize(22),
    letterSpacing: -0.3,
    color: Colors.accent19,
    fontFamily: fontFamily.rf_medium,
  },
  inviteText: {
    fontSize: fontSize(14),
    lineHeight: fontSize(18),
    letterSpacing: -0.4,
    color: Colors.greyish3,
    fontFamily: fontFamily.rf_regular,
  },
  divider: {
    backgroundColor: Colors.greyish26,
    height: 0.5,
    opacity: 0.3,
    marginVertical: hp(1.6),
  },
  bottomContainer: {
    padding: wp(4),
    paddingTop: 0,
  },
  descriptionContainer: {},
  descriptionText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(20),
    letterSpacing: -0.24,
    fontWeight: '600',
    color: Colors.accent19,
    marginBottom: hp(1.25),
    fontFamily: fontFamily.rf_medium,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: hp(1.75),
  },
  action: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(5.6),
    borderRadius: 10,
    // marginHorizontal: wp(1),
  },
  connection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  actionText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(18),
    letterSpacing: -0.4,
    fontWeight: '500',
    color: Colors.accent19,
    fontFamily: fontFamily.rf_medium,
  },
  passions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  passion: {
    backgroundColor: Colors.white + '64',
    paddingVertical: wp(2),
    paddingHorizontal: wp(3),
    borderRadius: wp(1.2),
    marginRight: wp(1.75),
    marginBottom: hp(0.5),
  },
  passionText: {
    fontSize: fontSize(12),
    lineHeight: fontSize(14),
    letterSpacing: -0.15,
    color: Colors.accent19,
  },
  avatarText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '800',
  },
  reasonContainer: {
    marginTop: hp(0.5),
    marginBottom: hp(0.75),
  },
  reasonTitle: {
    fontSize: fontSize(15),
    lineHeight: fontSize(20),
    letterSpacing: -0.24,
    fontWeight: '600',
    color: Colors.accent19,
  },
  reasonDescription: {
    fontSize: fontSize(15),
    lineHeight: fontSize(20),
    letterSpacing: -0.24,
    color: Colors.accent19,
  },
  infoContainer: {
    flexGrow: 1,
    paddingHorizontal: wp(4),
  },
});
