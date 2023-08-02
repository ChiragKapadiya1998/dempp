import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pages } from '../../../navigators/Routes';
import { AuthStackParamList } from '../../../navigators/types';

export type ScreenRouteProp = RouteProp<
  AuthStackParamList,
  Pages.SignUpCodeScreen
>;

export type ScreenNavigationProps = StackNavigationProp<
  AuthStackParamList,
  Pages.SignUpCodeScreen
>;
