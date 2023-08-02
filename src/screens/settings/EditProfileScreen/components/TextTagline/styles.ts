import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../../styles';
import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { HORIZONTAL_MARGIN } from '../../../../../utils/constants';

export default StyleSheet.create({
  constent: {
    shadowColor: Colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
  },
  textInput: {
    marginHorizontal: HORIZONTAL_MARGIN,
    width: Metrics.screenWidth - 2 * HORIZONTAL_MARGIN,
    // maxHeight: hp(22),
  },
  textInputContent: {
    marginTop: hp(1.3),
    color: Colors.accent19,
    maxHeight: hp(15),
  },
  pencilContent: {
    position: 'absolute',
    right: 16,
    top: 25,
  },
  errorMessage: {
    marginTop: 4,
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  cancelButton: {
    minHeight: 35,
    width: undefined,
    flexGrow: undefined,
    flexBasis: undefined,
    marginHorizontal: 0,
    paddingHorizontal: wp(4.5),
    marginRight: wp(2),
    borderRadius: 10,
    borderColor: Colors.greyish27,
  },
  cancelButtonText: {
    color: Colors.greyish27,
    fontSize: fontSize(17),
    fontWeight: '500',
  },
  saveButton: {
    minHeight: 35,
    width: undefined,
    paddingHorizontal: wp(4.5),
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: Colors.primary4,
  },
  saveButtonText: {
    fontSize: fontSize(17),
    fontWeight: '500',
  },
  collapsible: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
  separateView: {
    borderWidth: 0.5,
    marginHorizontal: wp(4.3),
    borderColor: Colors.greyish12,
    // marginTop: hp(1.5),
  },
});
