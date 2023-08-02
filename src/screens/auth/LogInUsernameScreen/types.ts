import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigators/types';
import { Pages } from '../../../navigators/Routes';

export type FormData = {
  username: string;
  password: string;
};

export type ScreenNavigationProps = StackNavigationProp<
  AuthStackParamList,
  Pages.LogInScreen
>;

export type ScreenRouteProp = RouteProp<AuthStackParamList, Pages.LogInScreen>;
