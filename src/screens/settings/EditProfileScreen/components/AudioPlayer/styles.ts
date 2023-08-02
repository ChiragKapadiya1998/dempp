import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../../styles';

import { fontSize, hp, wp } from '../../../../../styles/metrics';

export default StyleSheet.create({
  playerContainer: {
    paddingHorizontal: wp(4.1),
    // paddingVertical: hp(2),
    paddingTop: hp(3.9),
    flex: 1,
  },
  playIcon: {
    position: 'absolute',
    left: 24 / 2 - 8,
    top: 44 / 2 - 8,
  },
  relative: {
    width: 33,
    height: 44,
  },
  audioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioButton: {
    alignSelf: 'flex-start',
    flexGrow: 0,
    justifyContent: 'flex-start',

    marginTop: hp(2),
    paddingHorizontal: 21,
    width: undefined,
    borderColor: Colors.primary4,
    // paddingVertical: 0,
    minHeight: Metrics.hp(4.5),
  },
  titleSmall: {
    fontSize: fontSize(11),
    fontWeight: '700',
    color: Colors.greyish2,
  },
});
