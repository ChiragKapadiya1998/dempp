import React, { useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import LogInUsernameScreen from '../screens/auth/LogInUsernameScreen';
import LogInCodeScreen from '../screens/auth/LogInCodeScreen';
import SignUpPhoneScreen from '../screens/auth/SignUpPhoneScreen';
import SignUpCodeScreen from '../screens/auth/SignUpCodeScreen';
import TermsConditionsScreen from '../screens/auth/TermsConditionsScreen';
import CongratsScreen from '../screens/auth/CongratsScreen';

import { AuthStackParamList, RootStackParamList } from './types';
import { Colors } from '../styles';
import { Pages } from './Routes';
import { useAppSelector } from '../utils/hooks';
import defaultHeaderBarOptions from './defaultHeaderOptions';
import LeftChevronButton from '../components/common/Header/components/LeftChevronButton';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { inviteData } = useAppSelector((state) => state.invite);

  useEffect(() => {
    if ((inviteData && inviteData?.type === 'group-invite') || inviteData?.type === 'invite') {
      navigation.navigate(Pages.AuthStack, { screen: Pages.SignUpPhoneScreen });
    }
  }, [inviteData]);

  return (
    <Stack.Navigator
      initialRouteName={Pages.LogInUsernameScreen}
      mode="card"
      screenOptions={{
        cardStyle: { backgroundColor: Colors.white },
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name={Pages.SignUpPhoneScreen} component={SignUpPhoneScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Pages.SignUpCodeScreen} component={SignUpCodeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Pages.CongratsScreen} component={CongratsScreen} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name={Pages.LogInUsernameScreen} component={LogInUsernameScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Pages.LogInCodeScreen} component={LogInCodeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={Pages.TermsConditionsScreen}
        component={TermsConditionsScreen}
        options={() => ({
          ...defaultHeaderBarOptions,
          title: 'Terms of Service',
          headerLeft: () => <LeftChevronButton onPress={() => navigation.goBack()} tintColor={Colors.greyish3} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
