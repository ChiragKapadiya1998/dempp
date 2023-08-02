import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../styles';

import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  mainContent: {
    marginTop: hp(3),
  },
  headerContent: {
    flexDirection: 'row',
    marginHorizontal: wp(4.2),
  },
  headerLeft: {
    flex: 1,
  },
  headerLeftText: {
    fontWeight: '400',
    fontSize: fontSize(12),
    letterSpacing: -0.08,
    textTransform: 'capitalize',
    fontFamily: fontFamily.rf_regular,
  },
  headerRightText: {
    fontWeight: '400',
    fontSize: fontSize(11),
    letterSpacing: 0.066,
    color: Colors.greyish2,
    fontFamily: fontFamily.rf_regular,
  },
  bodyContent: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingHorizontal: wp(4.2),
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: hp(1.4),
    marginTop: hp(0.55),
    shadowColor: 'rgba(13, 47, 97, 0.12)',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    elevation: 5,
  },
  bodyLeftContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iconStyle: {
    height: wp(8),
    width: wp(8),
    borderRadius: wp(8),

    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyLeftText: {
    fontWeight: '500',
    fontSize: fontSize(13),
    lineHeight: fontSize(16),
    textAlign: 'left',
    marginLeft: wp(3.2),
    fontStyle: 'italic',
    color: Colors.greyish1,
  },
  bodyRightContent: {
    flexDirection: 'row',
  },
  receivedCircle: {
    height: wp(2.13),
    width: wp(2.13),
    backgroundColor: Colors.accent7,
    borderRadius: wp(2.13) / 2,
    position: 'absolute',
    right: 1,
  },
});
