import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';
import { fontSize, hp, wp } from '../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../utils/constants';
import { fontFamily } from '../../../utils/functions';

export default StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: Colors.white,
    // marginBottom: hp(3),
  },
  scroll: {
    // paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3.8),
    paddingHorizontal: wp(4.1),
  },
  titleSmall: {
    fontSize: fontSize(11),
    fontWeight: '600',
  },

  actions: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: HORIZONTAL_MARGIN,
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.greyish1,
    borderRadius: 8,
    marginRight: 4,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: Colors.greyish1,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    backgroundColor: Colors.primary1,
    marginLeft: 4,
  },
  saveButtonDisabled: {
    backgroundColor: Colors.greyish3,
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: Colors.white,
  },
  audioPlayer: {
    marginBottom: 16,
  },
  audioPlayerHidden: {
    position: 'absolute',
    top: 1000,
    right: 1000,
  },
  separateView: {
    borderWidth: 0.5,
    marginHorizontal: wp(4.3),
    borderColor: Colors.greyish12,
    marginTop: hp(1.5),
  },
});
