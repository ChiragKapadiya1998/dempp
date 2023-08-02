import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  deleteMainContent: {
    alignItems: 'center',
    paddingVertical: hp(1.97),
    borderRadius: 14,
    backgroundColor: Colors.greyish1,
    alignSelf: 'center',
    width: Metrics.screenWidth - 4 * HORIZONTAL_MARGIN,
  },

  deleteStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: Colors.destructive1,
  },
  deleteText: {
    color: Colors.white,
    fontSize: fontSize(15),
    lineHeight: fontSize(18),
    textAlign: 'center',
    fontFamily: fontFamily.rf_medium,
    letterSpacing: -0.4,
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
