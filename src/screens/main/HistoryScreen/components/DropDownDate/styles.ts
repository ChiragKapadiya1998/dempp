import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../../../../styles';

import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  headerContent: {
    alignItems: 'flex-end',
    marginRight: wp(4.2),
    marginBottom:wp(3),
    alignSelf: 'flex-end',
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1),
    backgroundColor: '#fff',
    marginTop: hp(1.5),
    borderRadius: 15,
    shadowColor: 'rgba(13, 47, 97, 0.08)',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 9999,
    zIndex:9999
  },
  bodyContent: {
    flexDirection: 'row',
  },
  bodyText: {
    fontSize: fontSize(13),
    fontWeight: '500',
    letterSpacing: -0.3,
    color: Colors.greyish3,
    fontFamily: fontFamily.rf_medium,
    textTransform: 'capitalize',
  },
  bodyIcon: {
    alignSelf: 'center',
    marginLeft: wp(2.8),
  },
  content: {
    marginRight: wp(4),
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    marginTop: hp(0.5),
    borderRadius: 14,
    minHeight: 138,
    width: 178,
    zIndex: 1,
    position: 'absolute',
    top: Platform.OS === 'android' ? hp(12.3) : hp(11.3),
    right: 1.2,
    shadowColor:Platform.OS === 'ios' ? 'rgba(4, 50, 114, 0.5)':'black',
    shadowOpacity:0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    elevation: 20,
  },
  contentBody: {
    flexDirection: 'row',
    paddingVertical: hp(1.2),
    paddingLeft: wp(6.2),
    paddingRight: wp(3.2),
    borderBottomColor: Colors.greyish16,
  },
  contentBodyText: {
    fontSize: fontSize(13),
    fontWeight: '400',
    lineHeight: fontSize(18),
    flex: 1,
    color: Colors.accent19,
    fontFamily: fontFamily.rf_regular,
  },
  contentBodyIcon: {
    alignSelf: 'center',
  },
});
