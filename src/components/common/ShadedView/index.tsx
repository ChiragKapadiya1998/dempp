import React from 'react';
import { View, ViewProps } from 'react-native';

import styles from './styles';

const ShadedView = ({ children, style, ...props }: ViewProps): JSX.Element => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default ShadedView;
