import React, { useState, createRef, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, TextInput, Animated, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

import SvgIcon from '../../../../../components/common/SvgIcon';
import { Colors } from '../../../../../styles';
import { ICON_HIT_SLOP, MAX_LENGTH_TEXT_INPUT } from '../../../../../utils/constants';
import { useAppDispatch, useAppSelector, useImagePicker } from '../../../../../utils/hooks';
import styles from './styles';
import { actions as userActions } from '../../../../../ducks/user';
import BottomSheet from '../../../../../components/modals/BottomSheet';
import BottomSheetListItem from '../../../../../components/modals/BottomSheet/components/BottomSheetListItem';
import { BottomSheetType } from '../../../../../components/modals/BottomSheet/types';
import imagePickerOptions from '../../../../../utils/imagePickerOptions';
import { wp } from '../../../../../styles/metrics';
import ErrorMessage from '../../../../../components/forms/ErrorMessage';
import { actions as authActions, selectors as authSelectors } from '../../../../../ducks/auth';
import { actions as errorAction } from '../../../../../ducks/errors';
import { actions as passionsActions } from '../../../../../ducks/passions';

const nameInputRef = createRef<TextInput>();

const UserEditing = () => {
  const dispatch = useAppDispatch();
  const { data: user, isUserEditing, isEditTagline, err, userError } = useAppSelector((state) => state.user);
  const { userNameError } = useAppSelector((state) => state.auth);
  const { isEditing } = useAppSelector((state) => state.passions);
  const [onEditNameText, setOnEditNameText] = useState(false);
  const [onEditUserNameText, setOnEditUserNameText] = useState(false);

  const validError = userNameError || userError;

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const [profileImage, setProfileImage] = useState<string>('');
  const animated = useRef(new Animated.Value(0)).current;

  const onUserEditPress = () => dispatch(userActions.userEditPress(true));

  const onSavePress = () => {
    // if (username !== user?.username) {
    //   const payload: {
    //     username: string;
    //     newUser: boolean;
    //   } = {
    //     username: username,
    //   };
    //   dispatch(authActions.checkUserNameSettingRequest(payload));
    // }

    let obj = {
      name: name.trim(),
      username: username.trim(),
    };
    // setUsername(username.trim());
    dispatch(userActions.updateUserNameRequest(obj));
  };

  const onCancelPress = async () => {
    setName(user?.name ?? '');
    setUsername(user?.username ?? '');
    dispatch(userActions.userEditPress(false));
    dispatch(errorAction.removeError());
    dispatch(authActions.clearError());
    dispatch(userActions.userNameErrorValid(null));
  };

  useEffect(() => {
    if (isUserEditing) {
      nameInputRef.current?.focus();
      setOnEditNameText(true);
      Animated.timing(animated, { toValue: 12, duration: 300, useNativeDriver: false }).start();
    } else {
      nameInputRef.current?.blur();
      setOnEditNameText(false);
      Animated.timing(animated, { toValue: 0, duration: 150, useNativeDriver: false }).start();
    }
  }, [isUserEditing]);

  useEffect(() => {
    setName(user?.name ?? '');
    setUsername(user?.username ?? '');
    setProfileImage(user?.avatar?.s ?? '');

    return () => {
      dispatch(errorAction.removeError());
    };
  }, [user]);

  const { onOpenCamera, onOpenLibrary } = useImagePicker((nextProfileImage) => {
    if (!!nextProfileImage) {
      setProfileImage(nextProfileImage);
      dispatch(
        userActions.updateUserRequest({
          avatar: nextProfileImage,
        }),
      );
    }
  }, imagePickerOptions);

  const onTakePhotoPress = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      onOpenCamera();
    }, 500);
  };

  const onChoosePhotoPress = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      onOpenLibrary();
    }, 500);
  };

  const onProfileImagePress = () => bottomSheetRef.current?.open();

  if (!user) return null;
  const borderStyle = isEditing ? 'rgb(202,209,220)' : Colors.greyish28;
  const opacityStyle = isEditing ? 0.1 : isEditTagline ? 0.5 : 1;
  const textInputColor = isUserEditing ? Colors.greyish2 : isEditTagline ? Colors.greyish3 : isEditing ? Colors.greyish2 : Colors.accent19;
  const textInputUserColor = isUserEditing ? Colors.greyish2 : isEditTagline ? Colors.greyish3 : isEditing ? Colors.greyish2 : Colors.greyish3;

  return (
    <View
      onStartShouldSetResponder={() => {
        dispatch(passionsActions.toggleEditPassions(false));
        dispatch(userActions.userTaglineEditPress(false));
      }}
      style={[
        styles.container,
        {
          backgroundColor: isUserEditing ? Colors.white : 'transparent',
          borderBottomEndRadius: isUserEditing ? 20 : 0,
          borderBottomLeftRadius: isUserEditing ? 20 : 0,
          elevation: isUserEditing ? 5 : 0,
        },
      ]}
    >
      <View style={styles.user}>
        <View>
          {profileImage ? (
            isUserEditing ? (
              <View style={styles.avatarContent}>
                <FastImage source={{ uri: profileImage }} style={[styles.avatarContent, { height: wp(24), width: wp(24) }]} resizeMode="cover" />
                <TouchableOpacity style={styles.cameraContent} onPress={onProfileImagePress}>
                  <SvgIcon name="camera" height={24} color={Colors.white} />
                </TouchableOpacity>
              </View>
            ) : (
              <FastImage source={{ uri: profileImage }} style={styles.avatar} resizeMode="cover" />
            )
          ) : isUserEditing ? (
            <View style={[styles.avatarContent, { backgroundColor: Colors.primary1, opacity: opacityStyle }]}>
              <Text style={styles.avatarText}>{user?.username?.charAt(0).toUpperCase()}</Text>
              <TouchableOpacity style={styles.cameraContent} onPress={onProfileImagePress}>
                <SvgIcon name="camera" height={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.avatar, { backgroundColor: Colors.primary1, opacity: opacityStyle }]}>
              <Text style={styles.avatarText}>{user?.username?.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          {/* <View style={styles.pencilIcon}>
            <SvgIcon name="pencil" height={16} color={Colors.greyish1} />
          </View> */}
        </View>
        <View style={[styles.names, { paddingLeft: isUserEditing ? wp(8.4) : wp(4.2) }]}>
          <Animated.View style={[{ paddingVertical: animated }, isUserEditing ? styles.editingName : undefined]}>
            <TextInput
              ref={nameInputRef}
              style={[
                styles.name,
                {
                  fontWeight: isUserEditing ? '400' : '500',
                  color: isUserEditing ? (onEditNameText ? Colors.accent19 : Colors.greyish3) : textInputColor,
                },
              ]}
              value={isUserEditing ? name : user?.name ?? ''}
              onChangeText={setName}
              keyboardType={Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'}
              onSubmitEditing={onSavePress}
              blurOnSubmit
              editable={isUserEditing}
              returnKeyType="done"
              maxLength={MAX_LENGTH_TEXT_INPUT}
              textAlignVertical="top"
              onFocus={() => {
                setOnEditNameText(true);
              }}
              onBlur={() => {
                setOnEditNameText(false);
              }}
            />
          </Animated.View>
          {/* <Animated.View style={[{ paddingVertical: animated }, isUserEditing ? styles.editingName : undefined]}>
            <Text style={[styles.username, { color: isUserEditing ? Colors.greyish4 : Colors.greyish3 }]}>{user.username}</Text>
          </Animated.View> */}
          <Animated.View style={[{ paddingVertical: animated }, isUserEditing ? styles.editingName : undefined]}>
            <TextInput
              style={[
                styles.username,
                {
                  marginTop: isUserEditing ? 18 : 0,
                  fontWeight: isUserEditing ? '400' : '400',
                  color: isUserEditing ? (onEditUserNameText ? Colors.accent19 : Colors.greyish3) : textInputUserColor,
                },
              ]}
              value={isUserEditing ? username : user?.username ?? ''}
              onChangeText={(text) => {
                setUsername(text);
                // if (text == user?.username) {
                dispatch(authActions.clearError());
                dispatch(userActions.userNameErrorValid(null));
                // }
              }}
              keyboardType={Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'}
              onFocus={() => {
                setOnEditUserNameText(true);
              }}
              onBlur={() => {
                setOnEditUserNameText(false);
              }}
              onSubmitEditing={onSavePress}
              blurOnSubmit
              editable={isUserEditing}
              returnKeyType="done"
              maxLength={MAX_LENGTH_TEXT_INPUT}
              textAlignVertical="top"
            />
          </Animated.View>
          {validError && (
            <ErrorMessage containerStyle={styles.errorMessage} showIcon={true}>
              {validError}
            </ErrorMessage>
          )}
        </View>
        {!isUserEditing && (
          <TouchableOpacity onPress={onUserEditPress} hitSlop={ICON_HIT_SLOP} disabled={isEditTagline || isEditing}>
            <SvgIcon height={16} name="pencil" color={Colors.greyish3} />
          </TouchableOpacity>
        )}

        <BottomSheet ref={bottomSheetRef} containerStyle={{ paddingTop: 20 }}>
          <>
            <BottomSheetListItem value="Take a photo" onPress={onTakePhotoPress} />
            <BottomSheetListItem value="Choose from the photo library" onPress={onChoosePhotoPress} />
          </>
        </BottomSheet>
      </View>
      {isUserEditing && (
        <Animated.View style={[styles.actionsContainer, { opacity: animated.interpolate({ inputRange: [0, 10], outputRange: [0, 1] }) }]}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancelPress}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.saveButton,
              {
                backgroundColor: user?.name == name && user?.username == username ? Colors.greyish26 : Colors.primary4,
                borderColor: user?.name == name && user?.username == username ? Colors.greyish26 : Colors.primary4,
              },
            ]}
            disabled={user?.name == name && user?.username == username}
            onPress={onSavePress}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <View style={[styles.separateView, { borderColor: borderStyle }]} />
    </View>
  );
};

export default UserEditing;

// const onSavePress = () => {
//   setError(errors[errors.length - 1]?.message ?? null);

//   let obj = {
//     name,
//     username,
//   };
//   if (errors[errors.length - 1]?.message !== undefined) {
//     delete obj.username;
//     !errors[errors.length - 1]?.message && setUsername(user?.username);
//   }
//   console.log('obj', obj);

//   nameInputRef.current?.blur();
//   if (!errors[errors.length - 1]?.message) {
//     setUsername(username);
//     dispatch(userActions.updateUserRequest(obj));
//     dispatch(userActions.userEditPress(false));
//     dispatch(errorAction.removeError());
//   }
// };
