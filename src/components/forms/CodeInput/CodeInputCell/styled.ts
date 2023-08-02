import styled from 'styled-components/native';
import { Colors, Typography } from '../../../../styles';
import { wp } from '../../../../styles/metrics';

export const Container = styled.View<{ invalid?: boolean }>`
  align-items: center;
  justify-content: center;
  border-color: ${({ invalid }) => (invalid ? Colors.destructive4 : Colors.greyish3)}
  border-radius: ${wp(1)}px;
  border-width: 1px;
  height: ${wp(15.5)}px;
  width: ${wp(11)}px;
`;

export const Char = styled(Typography.H1)`
  color: ${Colors.greyish1};
`;
