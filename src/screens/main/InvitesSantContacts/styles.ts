import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { AUTH_HORIZONTAL_SPACE, HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

const ITEM_VERTICAL_SPACE: number = hp(1.6);

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    paddingVertical: ITEM_VERTICAL_SPACE,
    borderBottomWidth: 1,
    borderBottomColor: '#B3B3B3',
  },
  imageStyles: {
    width: wp(55),
    height: wp(55),
  },
  updatedIconStyle: {
    width: wp(64),
    height: wp(55),
  },
  invitesText: {
    fontSize: fontSize(28),
    lineHeight: fontSize(33),
    color: Colors.accent19,
    marginTop: hp(5),
    fontWeight: '600',
    fontFamily: fontFamily.rf_medium,
    letterSpacing: -0.4,
  },
  invitesSubText: {
    fontSize: fontSize(17),
    lineHeight: fontSize(22.95),
    color: Colors.accent19,
    textAlign: 'center',
    marginTop: hp(1.5),
    fontFamily: fontFamily.rf_regular,
    letterSpacing: -0.3,
  },
  submitButton: {
    marginHorizontal: AUTH_HORIZONTAL_SPACE,
    marginTop: hp(6),
  },
});
