import React from 'react';

import { DropdownProps } from './types';
import { SvgIconName } from '../../common/SvgIcon/types';
import SvgIcon from '../../common/SvgIcon';

import { Container, ValueText, PlaceholderText, BottomLine, Label, Required, ValueContainer } from './styled';

const Dropdown = ({ containerStyle, onPress, opened = false, placeholder, required = false, value }: DropdownProps) => {
  const label = !value ? '' : placeholder;
  const icon: SvgIconName = opened ? 'chevron-up' : 'chevron-down';

  return (
    <Container style={containerStyle} onPress={onPress}>
      <Label>
        {label}
        {required && !value && label && <Required>*</Required>}
      </Label>
      <ValueContainer>
        {!value ? (
          <PlaceholderText>
            {placeholder}
            {required && '*'}
          </PlaceholderText>
        ) : (
          <ValueText>{value}</ValueText>
        )}
        <SvgIcon height={10} name={icon} />
      </ValueContainer>
      <BottomLine />
    </Container>
  );
};

export default Dropdown;
