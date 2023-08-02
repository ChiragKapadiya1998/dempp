import React from 'react';
import { BottomSheetListItemProps } from './types';
import { Container, Text } from './styled';

const BottomSheetListItem = ({
  value,
  onPress,
  selected = false,
}: BottomSheetListItemProps) => (
  <Container onPress={onPress} isSelected={selected}>
    <Text isSelected={selected}>{value}</Text>
  </Container>
);

export default BottomSheetListItem;
