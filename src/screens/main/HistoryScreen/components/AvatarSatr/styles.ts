import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../styles';

import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  avatarContent: {
    flexDirection: 'row',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10),
  },
  avterTextContent: {
    alignSelf: 'center',
  },
  avterText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(22),
    letterSpacing: -0.03,
    fontWeight: '500',
    color: Colors.greyish27,
    fontFamily: fontFamily.rf_regular,
  },
  starIcon: {
    marginRight: wp(0.6),
  },
  starContent: {
    flexDirection: 'row',
  },
  chatqueryContentText: {
    fontSize: fontSize(12),
    lineHeight: fontSize(22),
    letterSpacing: -0.24,
    textAlign: 'center',
    fontWeight: '500',
    fontStyle: 'italic',
    color: Colors.destructive4,
    width: '72.5%',
  },
  avatarText: {
    fontSize: fontSize(16),
    lineHeight: fontSize(22),
    letterSpacing: -0.408,
    fontWeight: '600',
    color: Colors.white,
    fontFamily: fontFamily.rf_regular,
  },
  dateText: {
    fontSize: fontSize(12),
    lineHeight: fontSize(15),
    fontWeight: '400',
    color: Colors.greyish3,
    letterSpacing: 0.066,
    fontFamily: fontFamily.rf_regular,
  },
});
