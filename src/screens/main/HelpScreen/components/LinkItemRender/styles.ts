import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../styles';
import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  settigsItem: {
    paddingVertical: hp(1.97),
    borderBottomColor: Colors.greyish21,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTitle: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22),
    fontWeight: '400',
    color: Colors.greyish1,
    fontFamily: fontFamily.rf_regular,
  },
  subTitleText: {
    fontSize: fontSize(14),
    lineHeight: fontSize(20),
    fontWeight: '400',
    color: Colors.greyish1,
    marginBottom: hp(2),
    fontStyle: 'italic',
    letterSpacing: -0.408,
  },
  title: {
    marginTop: hp(4.8),
    marginBottom: 12,
    marginLeft: 24,
  },
  icon: { tintColor: 'rgba(60, 60, 67, 1)' },

  rightSide: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
