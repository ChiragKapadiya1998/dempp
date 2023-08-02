import React from 'react';

import SvgIcon from '../../common/SvgIcon';
import { Colors } from '../../../styles';
import { Container, TouchableContainer } from './styled';
import { RatingProps } from './types';

const Rating = ({ value, containerStyle, onChange, disabled = false, color }: RatingProps) => {
  const content = new Array(5).fill(null).map((_, index) => {
    if (index + 1 <= value) {
      return (
        <TouchableContainer
          onPress={() => onChange(index + 1)}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          disabled={disabled}
        >
          <SvgIcon name="star" height={28} color={color || Colors.accent10} />
        </TouchableContainer>
      );
    }

    return (
      <TouchableContainer
        onPress={() => onChange(index + 1)}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        disabled={disabled}
      >
        <SvgIcon name="star-outline" height={28} color={color || Colors.greyish4} />
      </TouchableContainer>
    );
  });

  return <Container style={containerStyle}>{content}</Container>;
};

export default Rating;
