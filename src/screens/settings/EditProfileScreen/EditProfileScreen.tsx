import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import PassionsEditing from './components/PassionsEditing';
import TextTagline from './components/TextTagline';
import UserEditing from './components/User';
import styles from './styles';
import { ISIOS, useAppDispatch, useAppSelector, useKeyboard } from '../../../utils/hooks';
import AudioPlayer from './components/AudioPlayer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';
import { actions as passionsActions } from '../../../ducks/passions';
import rnAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import { Colors } from '../../../styles';
import TitleSmall from '../../../components/common/TitleSmall';
import SvgIcon from '../../../components/common/SvgIcon';
import MyPassions from './components/PassionsEditing/MyPassions';
import { ICON_HIT_SLOP } from '../../../utils/constants';
import { hp, wp } from '../../../styles/metrics';
import { actions as userActions } from '../../../ducks/user';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SettingsStackPages } from '../../../navigators/Routes';

const EditUserScreen = () => {
  const dispatch = useAppDispatch();
  const { data: user, isUserEditing, isEditTagline } = useAppSelector((state) => state.user);
  const { isEditing } = useAppSelector((state) => state.passions);
  const scale = useRef(new Animated.Value(1)).current;
  const scrollRef = useRef();
  const { isKeyboardHows } = useKeyboard();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (isKeyboardHows) {
      scrollRef?.current?.scrollToEnd();
    }
  }, [isKeyboardHows]);
  console.log('user', user);

  useFocusEffect(
    useCallback(() => {
      dispatch(userActions.getUserRequest());
      return () => {
        dispatch(passionsActions.getPassionCategoryRequest());
        dispatch(passionsActions.toggleEditPassions(false));
        dispatch(userActions.userEditPress(false));
        dispatch(userActions.userTaglineEditPress(false));
      };
    }, []),
  );

  const backgroundColor = isUserEditing ? 'rgba(122,132,154,0.3)' : isEditTagline ? 'rgba(122,132,154,0.3)' : '#fff';

  const onEdit = () => {
    dispatch(passionsActions.getPassionCategoryRequest());
    navigate(SettingsStackPages.EditKhowHowsScreen);
  };
  const TitleSmallColor = isUserEditing ? Colors.greyish3 : isEditTagline ? Colors.greyish3 : Colors.greyish3;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      style={{ flex: 1, backgroundColor: backgroundColor }}
      keyboardVerticalOffset={40}
    >
      <View style={[styles.screen]}>
        <UserEditing />
        <TextTagline />

        <View
          onStartShouldSetResponder={() => {
            dispatch(userActions.userEditPress(false));
            dispatch(userActions.userTaglineEditPress(false));
          }}
        >
          <View style={styles.header}>
            <TitleSmall style={[styles.titleSmall, { color: isEditing ? Colors.greyish3 : TitleSmallColor }]}>{`Selected Know-Hows`}</TitleSmall>

            <TouchableOpacity hitSlop={ICON_HIT_SLOP} onPress={onEdit} disabled={isUserEditing || isEditTagline}>
              <SvgIcon name={'pencil'} height={16} color={Colors.greyish3} />
            </TouchableOpacity>
          </View>
          <MyPassions />
        </View>
        {/* <AudioPlayer /> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditUserScreen;
