import React, { memo, PropsWithChildren } from 'react';

import { ChipProps } from './types';
import { Container, Title } from './styled';
import { variantStyles } from './data';

const Chip = ({
  title,
  selected = false,
  onPress,
  containerStyle,
  variant,
}: ChipProps): JSX.Element => (
  <Container
    {...{ onPress }}
    style={[
      variantStyles[variant].container,
      selected && variantStyles[variant].containerSelected,
      containerStyle,
    ]}
  >
    <Title
      style={[
        variantStyles[variant].title,
        selected && variantStyles[variant].titleSelected,
      ]}
    >
      {title}
    </Title>
  </Container>
);

const arePropsEqual = <P extends ChipProps>(
  prevProps: Readonly<PropsWithChildren<P>>,
  nextProps: Readonly<PropsWithChildren<P>>,
): boolean => {
  const { selected: prevSelected, title: prevTitle } = prevProps;
  const { selected: nextSelected, title: nextTitle } = nextProps;

  return prevSelected === nextSelected && prevTitle === nextTitle;
};

export default memo(Chip, arePropsEqual);
