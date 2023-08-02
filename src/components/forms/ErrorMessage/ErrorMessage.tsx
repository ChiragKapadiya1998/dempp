import React from 'react';

import SvgIcon from '../../common/SvgIcon';
import { Colors } from '../../../styles';
import { Container, MessageText } from './styled';
import { ErrorMessageProps } from './types';
import { wp } from '../../../styles/metrics';
import { fontFamily } from '../../../utils/functions';

const ErrorMessage = ({ children = '', containerStyle, showIcon, iconStyle }: ErrorMessageProps): JSX.Element => {
  return (
    <Container style={containerStyle}>
      {showIcon && children?.length > 0 && <SvgIcon height={wp(3.85)} name={'alert'} color={Colors.destructive4} style={iconStyle} />}
      <MessageText numberOfLines={3} style={{ fontFamily: fontFamily.rf_medium }}>
        {children}
      </MessageText>
    </Container>
  );
};

export default ErrorMessage;
