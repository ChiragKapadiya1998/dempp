import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChangePhoneScreen from '../screens/settings/ChangePhoneScreen';
import { ChangePhonePages } from './Routes';
import { ChangePhoneStackParamsList } from './types';
import ConfirmChangePhoneScreen from '../screens/settings/ConfirmChangePhoneScreen';
import { changePhoneOptions } from './options';

const Stack = createStackNavigator<ChangePhoneStackParamsList>();

const ChangePhoneStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={ChangePhoneScreen} name={ChangePhonePages.ChangePhoneScreen} options={changePhoneOptions.changeCallScreenOptions} />
      <Stack.Screen
        component={ConfirmChangePhoneScreen}
        name={ChangePhonePages.ConfirmChangesScreen}
        options={changePhoneOptions.changeCallScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default ChangePhoneStack;
