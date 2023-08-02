import { Platform, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../../../styles';
import { fontSize, hp, wp } from '../../../../../styles/metrics';
import { ANDROID, HORIZONTAL_MARGIN } from '../../../../../utils/constants';
import { fontFamily } from '../../../../../utils/functions';

export default StyleSheet.create({
  container: {
    paddingHorizontal: wp(4.5),
    paddingTop: hp(2.9),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.11,
    shadowRadius: 5,
  },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: Colors.primary1,
    borderRadius: 100,
    height: 45,
    width: 45,
    justifyContent: 'center',
  },
  avatarContent: {
    alignSelf: 'center',
    borderRadius: 100,
    height: wp(19.2),
    width: wp(19.2),
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    alignSelf: 'center',
  },
  cameraContent: {
    position: 'absolute',
    left: wp(7),
  },
  name: {
    fontSize: fontSize(17),
    borderWidth: 0,
    fontFamily: fontFamily.rf_regular,
    fontStyle: 'normal',
    lineHeight: 22,
    margin: 0,
    marginBottom: 0,
    letterSpacing: -0.41,
    padding: 0,
  },
  nameText: {
    borderBottomWidth: 0,
    color: Colors.greyish1,
    flex: 1,
    flexDirection: 'row',
    fontFamily: Typography.fontFamily,
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: -0.41,
    lineHeight: 22,
    padding: 0,
  },
  nameTextEditing: {
    flex: 0,
    width: 0,
  },
  username: {
    fontSize: fontSize(17),
    // fontWeight: '400',
    marginTop: Platform.OS === ANDROID ? -4 : 0,
    fontFamily: fontFamily.rf_regular,
    lineHeight: fontSize(22),
    letterSpacing: -0.41,
    padding: 0,

  },

  names: {
    paddingLeft: wp(8.4),
    flex: 1,
  },
  pencilIcon: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 100,
    height: 28,
    justifyContent: 'center',
    position: 'absolute',
    right: -12,
    top: -6,
    width: 28,
  },
  editingName: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyish9,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: hp(2.9),
    paddingBottom: hp(3.6),
  },
  button: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4.5),
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 8,
  },
  cancelButton: {
    borderColor: Colors.greyish27,
  },
  cancelButtonText: {
    color: Colors.greyish27,
    fontSize: fontSize(15),
    fontWeight: '500',
    fontFamily: fontFamily.rf_regular,
  },
  saveButton: {
    marginLeft: wp(4),
    paddingHorizontal: wp(5.5),
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: fontSize(15),
    fontWeight: '500',
    fontFamily: fontFamily.rf_regular,
  },
  separateView: {
    borderWidth: 0.5,
    borderColor: Colors.greyish12,
    marginTop: hp(1.5),
  },
  errorMessage: {
    marginHorizontal: HORIZONTAL_MARGIN - 10,
    marginTop: hp(1.5),
  },
});
