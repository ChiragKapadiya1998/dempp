import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../styles';

import { fontSize, hp, wp } from '../../../../../styles/metrics';

export default StyleSheet.create({
  playerContainer: {
    paddingHorizontal: wp(4.1),
    paddingVertical: hp(2),
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
    marginTop: 7,
    paddingHorizontal: 21,
    width: undefined,
  },
  titleSmall:{
    fontSize:fontSize(11),
    fontWeight:'700',
    color: Colors.greyish2,
  }
});
