import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import SetUpProfileGeneralInfoScreen from '../screens/auth/SetUpProfileGeneralInfoScreen';
import SetUpProfilePassionsScreen from '../screens/auth/SetUpProfilePassionsScreen';

import { SetUpProfileStackParamList } from './types';
import { Colors } from '../styles';
import { Pages } from './Routes';
import defaultHeaderBarOptions from './defaultHeaderOptions';
import LeftChevronButton from '../components/common/Header/components/LeftChevronButton';
import SettingUpUserName from '../screens/auth/SettingUpUserName';
import OnboardingSettingUp from '../screens/auth/OnboardingSettingUp';

const Stack = createStackNavigator<SetUpProfileStackParamList>();
const SetUpProfileStack = () => (
  <Stack.Navigator
    // initialRouteName={Pages.SettingUpUserName}
    mode="card"
    screenOptions={{
      gestureEnabled: true,
      cardStyle: { backgroundColor: Colors.white },
      ...TransitionPresets.SlideFromRightIOS,
    }}
  >
    <Stack.Screen name={Pages.SettingUpUserName} component={SettingUpUserName} options={{ headerShown: false, gestureEnabled: false }} />
    <Stack.Screen name={Pages.OnboardingSettingUp} component={OnboardingSettingUp} options={{ headerShown: false, gestureEnabled: false }} />
    <Stack.Screen
      name={Pages.SetUpProfileGeneralInfoScreen}
      component={SetUpProfileGeneralInfoScreen}
      options={{
        ...defaultHeaderBarOptions,
        title: 'Set up Profile',
      }}
    />
    <Stack.Screen
      name={Pages.SetUpProfilePassionsScreen}
      component={SetUpProfilePassionsScreen}
      options={{
        ...defaultHeaderBarOptions,
        title: 'Set up Profile',
        headerLeft: (props) => <LeftChevronButton {...props} tintColor={Colors.greyish3} />,
      }}
    />
  </Stack.Navigator>
);

export default SetUpProfileStack;
