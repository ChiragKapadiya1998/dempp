import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions } from '../../../ducks/candidates';
import GeneralPreloader from '../../preloaders/GeneralPreloader';
import { CALL_END, END_CALL_HISTORY, END_CALL_NOT_SHOW_CLOSESCREEN, NOT_SHOW_MATCHING_SCREEN, SMALL_PRELOADER_SIZE } from '../../../utils/constants';
import { Colors } from '../../../styles';
import styles from './styles';
import { Pages } from '../../../navigators/Routes';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationHelper from '../../../utils/NavigationHelper';
import { RootStackParamList } from '../../../navigators/types';
import { hp } from '../../../styles/metrics';

const SearchButton = () => {
  const dispatch = useAppDispatch();
  const { recomended } = useAppSelector((state) => state.passions);
  const { loading } = useAppSelector((state) => state.candidates);
  const { data: user } = useAppSelector((state) => state.user);
  const { userName } = useAppSelector((state) => state.auth);
  const { username } = useAppSelector((state) => state.token);
  if (!recomended.find((item) => item.selected)) return null;
  const { navigate } = useNavigation();

  const onPressSearch = async () => {
    // if (user?.name) {
    await AsyncStorage.setItem(CALL_END, JSON.stringify(false));
    await AsyncStorage.setItem(END_CALL_HISTORY, JSON.stringify(false));
    await AsyncStorage.setItem(END_CALL_NOT_SHOW_CLOSESCREEN, JSON.stringify(false));
    await AsyncStorage.setItem(NOT_SHOW_MATCHING_SCREEN, JSON.stringify(true));
    dispatch(actions.searchCandidatesRequest());
    // } else {
    //   navigate(Pages.SetUpProfileStack, {
    //     screen: Pages.OnboardingSettingUp,
    //     initial: false,
    //     params: { username: userName ? userName : username },
    //   });
    // }
  };

  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} disabled={loading} onPress={onPressSearch}>
      {loading ? (
        <GeneralPreloader color={Colors.white} containerStyle={{ width: SMALL_PRELOADER_SIZE, height: hp(2) }} />
      ) : (
        <Text style={styles.text}>Search</Text>
      )}
    </TouchableOpacity>
  );
};

export default SearchButton;
