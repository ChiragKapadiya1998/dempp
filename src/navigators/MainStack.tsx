import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import HomeScreen from '../screens/main/HomeScreen';

import { MainStackParamList, BottomStackParamsList } from './types';
import { Colors } from '../styles';
import { Pages, BottomTabs } from './Routes';
import options from './options';

import PresetsAvailabilityScreen from '../screens/main/PresetsAvailabilityScreen';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { actions as userActions } from '../ducks/user';
import InviteScreen from '../screens/main/InviteScreen';
import ContactsScreen from '../screens/main/ContactsScreen';
import SettingsStack from './SettingsStack';
import PresetsMenu from '../components/common/PresetsMenu';
import InviteModal from '../components/modals/InviteModal';
import BlockedScreen from '../screens/main/BlockedScreen';
import ReportAlert from '../components/modals/ReportAlert';
import HistoryScreen from '../screens/main/HistoryScreen';
import InvitesSantContacts from '../screens/main/InvitesSantContacts';
import FeedbackSant from '../screens/main/FeedbackSant';
import { hp } from '../styles/metrics';
import BottomTabView from '../components/common/BottomTabs/BottomTabView';

const Stack = createStackNavigator<MainStackParamList>();
const BottomStack = createBottomTabNavigator<BottomStackParamsList>();

const BottomMenuNavigation = () => {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.getUserSessionStausRequest());
  }, []);

  // if (!user) return null;

  if (user?.status == 'blocked') {
    return (
      <Stack.Navigator initialRouteName={Pages.BlockedScreen}>
        {/* <BottomStack.Screen name={BottomTabs.BlockedScreen} component={BlockedScreen} options={options.blockTabOptions} /> */}
        {/* <BottomStack.Screen name={BottomTabs.SettingBottomTab} component={SettingsStack} options={options.settingsTabOptions} /> */}
        {/* <BottomStack.Screen name={BottomTabs.InviteBottomTab} component={InviteScreen} options={options.inviteTabOptions} /> */}
        <Stack.Screen name={Pages.BlockedScreen} component={BlockedScreen} options={options.blockTabOptions} />
      </Stack.Navigator>
    );
  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <BottomStack.Navigator
        tabBar={(props) => {
          return <BottomTabView props={props} />;
        }}
        // screenOptions={({ route }) => (
        //   options.rootTabOptions,
        //   {
        //     tabBarStyle: {
        //       shadowColor: route.name == BottomTabs.HistoryScreen ? Colors.greyish3 : Colors.white,
        //       shadowOpacity: 1,
        //       shadowOffset: {
        //         width: 0,
        //         height: 7,
        //       },
        //       shadowRadius: 17,
        //       elevation: 5,
        //       backgroundColor: Colors.secondary17,
        //       // height: hp(10.9),
        //     },
        //   }
        // )}
        initialRouteName={BottomTabs.HomeBottomTab}
      >
        <BottomStack.Screen name={BottomTabs.HomeBottomTab} component={HomeScreen} options={options.homeTabOptions} />
        <BottomStack.Screen name={BottomTabs.HistoryScreen} component={HistoryScreen} options={options.historyTabOptions} />
        <BottomStack.Screen name={BottomTabs.InviteBottomTab} component={InviteScreen} options={options.inviteTabOptions} />
      </BottomStack.Navigator>
      <PresetsMenu />
      <ReportAlert />
    </View>
  );
};

const MainStack = () => (
  <>
    <Stack.Navigator
      initialRouteName={Pages.HomeScreen}
      mode={'card'}
      screenOptions={{
        gestureEnabled: true,
        cardStyle: { backgroundColor: Colors.white },
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name={Pages.HomeScreen} component={BottomMenuNavigation} options={{ headerShown: false }} />
      <Stack.Screen name={Pages.PresetsAvailability} component={PresetsAvailabilityScreen} options={options.presetsAvailabilityOptions} />
      <Stack.Screen name={Pages.SettingStack} component={SettingsStack} options={{ headerShown: false }} />
      <Stack.Screen name={Pages.ContactsScreen} component={ContactsScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={Pages.InvitesSantContacts}
        component={InvitesSantContacts}
        options={{ headerShown: false, gestureEnabled: false, animationEnabled: false }}
      />
      <Stack.Screen
        name={Pages.FeedbackSant}
        component={FeedbackSant}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen name={Pages.BlockedScreen} component={BlockedScreen} options={options.blockTabOptions} />
    </Stack.Navigator>
    {/* <InviteModal /> */}
  </>
);

export default MainStack;
