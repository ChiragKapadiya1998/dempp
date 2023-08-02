import React from 'react';
import FastImage from 'react-native-fast-image';

import { ProfileImageProps } from './types';
import SvgIcon from '../../../../../components/common/SvgIcon';
import { Colors } from '../../../../../styles';
import { Container, CameraIconContainer } from './styled';
import styles from './styles';

const ProfileImage = ({ onPress, uri }: ProfileImageProps): JSX.Element => (
  <Container onPress={onPress}>
    <CameraIconContainer>
      <SvgIcon name="camera" height={24} color={Colors.white} />
    </CameraIconContainer>
    <FastImage style={styles.image} source={{ uri }} />
    {/* <PencilIconContainer>
      <SvgIcon name="pencil" height={16} color={Colors.greyish1} />
    </PencilIconContainer> */}
  </Container>
);

export default ProfileImage;
