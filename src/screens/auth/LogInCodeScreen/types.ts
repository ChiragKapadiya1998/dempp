import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pages } from '../../../navigators/Routes';
import { AuthStackParamList } from '../../../navigators/types';

export type ScreenRouteProp = RouteProp<
  AuthStackParamList,
  Pages.LogInCodeScreen
>;

export type ScreenNavigationProps = StackNavigationProp<
  AuthStackParamList,
  Pages.LogInCodeScreen
>;
