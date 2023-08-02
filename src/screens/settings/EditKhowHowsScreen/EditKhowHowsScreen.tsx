import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';

import { useAppDispatch, useAppSelector, useKeyboard } from '../../../utils/hooks';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { useFocusEffect } from '@react-navigation/core';
import { KeyboardAvoidingView } from 'react-native';
import { actions as passionsActions } from '../../../ducks/passions';

import PassionsEditActions from './components/PassionsEditing/PassionsEditActions';
import PassionsCategories from './components/PassionsEditing/PassionsCategories';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EditUserScreen = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);

  const scrollRef = useRef();
  const { isKeyboardHows, keyboardHeight } = useKeyboard();

  useEffect(() => {
    if (isKeyboardHows) {
      scrollRef?.current?.scrollToEnd();
    }
  }, [isKeyboardHows]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(passionsActions.getPassionCategoryRequest());
      };
    }, []),
  );

  if (!user) return null;

  return (
    <View style={{ flex: 1 }}>
      <PassionsCategories />
      <PassionsEditActions />
      <KeyboardSpacer />
    </View>
  );
};

export default EditUserScreen;
