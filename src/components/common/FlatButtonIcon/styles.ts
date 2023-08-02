import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  deleteMainContent: {
    // marginHorizontal: wp(4.1),
    alignItems: 'center',
    paddingVertical: hp(2),
    borderRadius: wp(3.2),
    backgroundColor: Colors.greyish1,
  },

  deleteStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: Colors.destructive1,
  },
  deleteText: {
    color: Colors.white,
    fontSize: fontSize(16),
    lineHeight: fontSize(16),
    marginRight: wp(1),
    textAlign: 'center',
    fontFamily: fontFamily.rf_medium,
  },

  outline1ContainerEnabled: {
    backgroundColor: Colors.white,
    borderColor: Colors.greyish1,
    borderWidth: 1,
    flexBasis: 0,
    flexGrow: 1,
    marginHorizontal: 0,
    minHeight: Metrics.hp(6),
  },
  outline1ContainerEnabled1: {
    backgroundColor: Colors.greyish26,
    flexBasis: 0,
    flexGrow: 1,
    marginHorizontal: 0,
    minHeight: Metrics.hp(6),
  },
});
