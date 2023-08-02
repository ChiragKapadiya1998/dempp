import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import FlatButton from '../../../../../components/forms/FlatButton';
import { actions } from '../../../../../ducks/passions';
import { useAppSelector, useKeyboard } from '../../../../../utils/hooks';
import ErrorMessage from '../../../../../components/forms/ErrorMessage';
import styles from './styles';
import remoteConfig from '@react-native-firebase/remote-config';
import { Colors } from '../../../../../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IS_IOS } from '../../../../../utils/constants';
import { hp } from '../../../../../styles/metrics';
import { black } from '../../../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
const PassionsEditActions = () => {
  const { isKeyboardHows } = useKeyboard();
  const { bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const min = remoteConfig().getValue('knowHowsMin').asNumber();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isEditing, categories, loading } = useAppSelector((state) => state.passions);

  useEffect(() => {
    const arrayOfPassionsLength = categories.map((item) => item.passions.filter((item) => item.selected).length);
    const passionsLength = arrayOfPassionsLength.length ? arrayOfPassionsLength.reduce((a, b) => a + b) : arrayOfPassionsLength.length;
    const isNotEnough = passionsLength < min;
    setDisabled(isNotEnough);
    setError(!isNotEnough ? null : `Please select at least ${min} know hows.`);
  }, [categories]);

  const onFinishEdit = () => goBack();

  const onSave = () => {
    dispatch(actions.updatePassionsRequest());
  };

  const onCancel = () => {
    onFinishEdit();
    dispatch(actions.getPassionCategoryRequest());
  };

  return (
    <>
      <View
        style={[
          {
            backgroundColor: Colors.white,
            paddingBottom: IS_IOS ? (isKeyboardHows ? 0 : bottom) : isKeyboardHows ? bottom : 0,
          },
        ]}
      >
        <View
          style={{
            backgroundColor: Colors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: IS_IOS ? 'rgba(224, 221, 221, 1)' : black,
            shadowOffset: {
              width: 0,
              height: -5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 10,
            paddingBottom: IS_IOS ? (isKeyboardHows ? 10 : 0) : isKeyboardHows ? 0 : 18,
          }}
        >
          {error && (
            <ErrorMessage showIcon containerStyle={{ marginTop: 16, paddingBottom: hp(3) }}>
              {error}
            </ErrorMessage>
          )}
          <View
            style={[
              styles.actionsContainer,
              {
                backgroundColor: Colors.white,
                borderTopLeftRadius: error == null ? 20 : 0,
                borderTopRightRadius: error == null ? 20 : 0,
                paddingTop: error == null ? hp(3) : 0,
                paddingBottom: IS_IOS ? 0 : bottom,
              },
            ]}
          >
            <FlatButton
              containerStyle={[styles.actionButton, styles.actionCancel]}
              titleStyle={{ color: Colors.greyish27 }}
              onPress={onCancel}
              title="Cancel"
              variant="outline1"
            />
            <FlatButton
              containerStyle={[styles.actionButton, styles.actionSave]}
              disabled={disabled}
              loading={loading}
              onPress={onSave}
              title="Save"
              variant="solid1"
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default PassionsEditActions;
