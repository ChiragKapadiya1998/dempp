import { StyleProp, ViewStyle } from 'react-native';

export type StepperProps = {
  activeStep: number;
  containerStyle?: StyleProp<ViewStyle>;
  numberOfSteps: number;
};
