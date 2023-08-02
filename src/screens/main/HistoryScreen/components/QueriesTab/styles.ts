import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../styles';

import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginHorizontal: wp(4),
    borderRadius: 8.5,
    marginTop: hp(2),
    paddingVertical: hp(0.26),
    paddingHorizontal: wp(0.5),
    shadowColor: 'rgba(13, 47, 97, 0.08)',
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 10,
    elevation: 5,
    zIndex: 9999,
  },
  tabQueriesContent: {
    paddingVertical: hp(0.6),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  tabQueriesText: {
    fontSize: fontSize(15),
    letterSpacing: -0.24,
    fontFamily: fontFamily.rf_regular,
    fontWeight: '500',
  },
  receivedCircle: {
    height: wp(2.13),
    width: wp(2.13),
    borderRadius: wp(2.13) / 2,
    marginLeft: wp(0.6),
    marginBottom: hp(0.9),
  },
  receivedContent: {
    flexDirection: 'row',
  },
});
