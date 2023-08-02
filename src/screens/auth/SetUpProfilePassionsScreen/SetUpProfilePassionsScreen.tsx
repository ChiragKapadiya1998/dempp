import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import FlatButton from '../../../components/forms/FlatButton';
import Stepper from '../../../components/common/Stepper';
import styles from './styles';
import { RubricDescription, RubricTitle } from './styled';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { actions as passionsActions } from '../../../ducks/passions';
import { actions as authActions } from '../../../ducks/auth';
import { View } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { SetUpProfileStackParamList } from '../../../navigators/types';
import { Pages } from '../../../navigators/Routes';
import remoteConfig from '@react-native-firebase/remote-config';
import ErrorMessage from '../../../components/forms/ErrorMessage';
import requestErrors from '../../../utils/requestErrors';
import PassionsCategories from '../OnboardingSettingUp/components/PassionsCategories';

const SetUpProfilePassionsScreen = () => {
  const min = remoteConfig().getValue('knowHowsMin').asNumber();
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(true);
  const { categories, loading: passionsLoading } = useAppSelector((state) => state.passions);
  const { loading } = useAppSelector((state) => state.user);
  const { err, isUserProfileSetting } = useAppSelector((state) => state.auth);
  const [error, setError] = useState<null | string>(null);
  const [passionsCount, setPassionsCount] = useState<number>(0);
  const route = useRoute<RouteProp<SetUpProfileStackParamList, Pages.SetUpProfilePassionsScreen>>();

  useEffect(() => {
    const arrayOfPassionsLength = categories.map((item) => item.passions.filter((item) => item.selected).length);
    const passionsLength = arrayOfPassionsLength.length ? arrayOfPassionsLength.reduce((a, b) => a + b) : arrayOfPassionsLength.length;

    const isNotEnough = passionsLength < min;
    setDisabled(isNotEnough);
    setError(!isNotEnough ? null : `Please select at least ${min} know hows.`);
    setPassionsCount(Number(passionsLength));
  }, [categories]);

  useFocusEffect(
    useCallback(() => {
      dispatch(passionsActions.toggleEditPassions(true));
    }, []),
  );

  const onSave = () => {
    dispatch(
      authActions.setUpUserProfileRequest({
        ...route.params,
        passions: categories.map((item) => item.passions.filter((item) => item.selected)).flat(),
      }),
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (err) {
        const findError = requestErrors.find((rError) => rError.code === err);
        setError(findError ? findError.message : err);
        dispatch(authActions.clearError());
      }
    }, [err]),
  );

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Stepper numberOfSteps={2} activeStep={2} containerStyle={styles.stepper} />
      <RubricDescription>{`Select at least ${remoteConfig()
        .getValue('knowHowsMin')
        .asNumber()} know-hows that you can talk about`}</RubricDescription>
      <RubricTitle>
        {`My know-how`}
        {passionsCount > 0 ? ` (${passionsCount})` : ``}
      </RubricTitle>
      <KeyboardAwareScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
        <View style={styles.catagoriesContainer}>
          <PassionsCategories />
        </View>
        {error && (
          <ErrorMessage containerStyle={styles.errorMessage} showIcon={true}>
            {error}
          </ErrorMessage>
        )}
        <FlatButton
          title={'Save'}
          variant={'solid1'}
          loading={passionsLoading || loading || isUserProfileSetting}
          disabled={disabled || loading || isUserProfileSetting}
          onPress={onSave}
          containerStyle={styles.saveButton}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SetUpProfilePassionsScreen;
