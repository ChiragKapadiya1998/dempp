import React, { useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../../utils/hooks';

import PassionsCategories from './PassionsCategories';

import { Colors } from '../../../../../styles';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const PassionsEditing = () => {
  const dispatch = useDispatch();
  const { isUserEditing, isEditTagline } = useAppSelector((state) => state.user);
  const { isEditing } = useAppSelector((state) => state.passions);

  const borderStyle = isUserEditing ? Colors.greyish10 : isEditTagline ? Colors.greyish11 : Colors.greyish28;

  return (
    <>
      {/* <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: isEditing ? Colors.white : 'transparent',
            borderTopStartRadius: isEditing ? 30 : 0,
            borderTopEndRadius: isEditing ? 30 : 0,
            elevation: isEditing ? 6 : 0,
            flexGrow: 1,
            marginTop: 50,
            borderColor: 'red',
            borderWidth: 1,
          },
        ]}
      > */}
      <PassionsCategories />
      {/* </KeyboardAwareScrollView> */}

      {/* <View style={[styles.separateView, { borderColor: borderStyle }]} /> */}
    </>
  );
};

export default PassionsEditing;
