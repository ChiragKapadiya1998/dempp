import { DefaultTheme, Theme } from '@react-navigation/native';
import { Colors } from '../styles';

export const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary1,
    background: Colors.white,
    text: Colors.greyish1,
  },
};
