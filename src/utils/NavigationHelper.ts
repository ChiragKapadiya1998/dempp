import React from 'react';
import { NavigationContainerRef, NavigationState, PartialState, StackActions } from '@react-navigation/native';
import { BottomTabs, CallPages, ChangePhonePages, Pages } from '../navigators/Routes';

export default class NavigationHelper {
  static navigationRef = React.createRef<NavigationContainerRef>();

  static isReady = false;

  /** Push a new screen onto the stack */
  static push<ParamList, Route extends keyof ParamList>(name: Pages, params?: ParamList[Route]): void {
    this.navigationRef.current?.dispatch(StackActions.push(name, params as object | undefined));
  }

  /** Navigate to a route in current navigation tree */
  static navigate<ParamList, Route extends keyof ParamList>(
    name: Partial<Pages | CallPages | ChangePhonePages | BottomTabs>,
    params?: ParamList[Route],
  ): void {
    this.navigationRef.current?.navigate(name, params as object | undefined);
  }

  /** Reset the navigation state to the provided state */
  static reset(state: NavigationState | PartialState<NavigationState>): void {
    this.navigationRef.current?.reset(state);
  }

  /** Go back to the previous route in history */
  static goBack(): void {
    this.navigationRef.current?.goBack();
  }

  /** Navigate to Home screen and clear navigation history */
  static goToHomeScreen(): void {
    this.navigationRef.current?.reset({
      type: 'stack',
      key: 'root-stack',
      routeNames: [Pages.MainStack],
      routes: [
        {
          key: 'root-stack-route-1',
          name: Pages.MainStack,
          state: {
            type: 'stack',
            key: 'main-stack',
            index: 0,
            routeNames: [Pages.HomeScreen],
            routes: [
              {
                key: 'home-page-1',
                name: Pages.HomeScreen,
              },
            ],
          },
        },
      ],
      index: 0,
    });
  }

  /** Navigate to Congrats  screen and clear navigation history */
  static goToCongratsScreen(): void {
    this.navigationRef.current?.reset({
      type: 'stack',
      key: 'root-stack',
      routeNames: [Pages.AuthStack],
      routes: [
        {
          key: 'root-stack-route-1',
          name: Pages.AuthStack,
          state: {
            type: 'stack',
            key: 'auth-stack',
            index: 0,
            routeNames: [Pages.CongratsScreen],
            routes: [
              {
                key: 'login-page-1',
                name: Pages.CongratsScreen,
              },
            ],
          },
        },
      ],
      index: 0,
    });
  }
  /** Navigate to LogIn screen and clear navigation history */
  static goToLoginScreen(): void {
    this.navigationRef.current?.reset({
      type: 'stack',
      key: 'root-stack',
      routeNames: [Pages.AuthStack],
      routes: [
        {
          key: 'root-stack-route-1',
          name: Pages.AuthStack,
          state: {
            type: 'stack',
            key: 'auth-stack',
            index: 0,
            routeNames: [Pages.LogInUsernameScreen],
            routes: [
              {
                key: 'login-page-1',
                name: Pages.LogInUsernameScreen,
              },
            ],
          },
        },
      ],
      index: 0,
    });
  }

  /** Navigate to Setup profile screen and clear navigation history */
  static goToSetupProfileScreen(): void {
    this.navigationRef.current?.reset({
      type: 'stack',
      key: 'root-stack',
      routeNames: [Pages.SetUpProfileStack],
      routes: [
        {
          key: 'root-stack-route-1',
          name: Pages.SetUpProfileStack,
          state: {
            type: 'stack',
            key: 'auth-stack',
            index: 0,
            routeNames: [Pages.SettingUpUserName],
            routes: [
              {
                key: 'login-page-1',
                name: Pages.SettingUpUserName,
              },
            ],
          },
        },
      ],
      index: 0,
    });
  }
  /** Navigate to Home screen and clear navigation history */
  static goToCallScreen(): void {
    this.navigationRef.current?.reset({
      type: 'stack',
      key: 'root-stack',
      routeNames: [Pages.CallStack],
      routes: [
        {
          key: 'root-stack-route-1',
          name: Pages.CallStack,
          state: {
            type: 'stack',
            key: 'call-stack',
            index: 0,
            routeNames: [CallPages.CurrentCallScreen],
            routes: [
              {
                key: 'call-page-1',
                name: CallPages.CurrentCallScreen,
              },
            ],
          },
        },
      ],
      index: 0,
    });
  }
  /** Navigate to Home screen and clear navigation ConnectionRoomScreen */
  static goToConnectionCallScreen(): void {
    this.navigationRef.current?.reset({
      type: 'stack',
      key: 'root-stack',
      routeNames: [Pages.CallStack],
      routes: [
        {
          key: 'root-stack-route-1',
          name: Pages.CallStack,
          state: {
            type: 'stack',
            key: 'call-stack',
            index: 0,
            routeNames: [CallPages.ConnectionCallScreen],
            routes: [
              {
                key: 'call-page-1',
                name: CallPages.ConnectionCallScreen,
              },
            ],
          },
        },
      ],
      index: 0,
    });
  }
}
