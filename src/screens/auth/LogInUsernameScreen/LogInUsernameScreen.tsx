import React from 'react';

import AuthLogoView from '../../../components/auth/AuthLogoView';
import CountrySelect from './CountrySelect';
import { Colors } from '../../../styles';

const LogInUsernameScreen = (): JSX.Element => {
  return (
    <AuthLogoView backgroundColor={Colors.secondary5}>
      <CountrySelect />
    </AuthLogoView>
  );
};

export default LogInUsernameScreen;
