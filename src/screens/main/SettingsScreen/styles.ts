import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.secondary5,
  },
  settigsItem: {
    paddingVertical: hp(1.7),
    borderBottomColor: Colors.greyish21,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: wp(6),
  },
  listItemTitle: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    color: Colors.accent19,
    fontFamily: fontFamily.rf_regular,
  },
  title: {
    marginTop: hp(1.8),
    marginBottom: hp(0.69),
    marginLeft: wp(6),
  },
  listContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: wp(6.2),
    shadowColor: Colors.primary5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.099,
    shadowRadius: 10,
    elevation: 5,
  },
  rightSide: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  linkText: {
    color: Colors.primary4,
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    marginRight: wp(2.8),
    fontFamily: fontFamily.rf_regular,
  },
  icon: {},
  logout: {
    marginTop: hp(1.9),
    paddingVertical: hp(0.4),
  },
  versionText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(22),
    color: Colors.greyish3,
    textAlign: 'center',
    marginVertical: hp(1),
    marginBottom: hp(3.5),
    fontFamily: fontFamily.rf_regular,
  },
});
