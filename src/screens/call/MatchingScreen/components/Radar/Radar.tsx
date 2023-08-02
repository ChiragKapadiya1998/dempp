import React from 'react';
import { View, PixelRatio } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import AnimatedLottieView from 'lottie-react-native';

import { images } from './data';
import { hp, wp } from '../../../../../styles/metrics';
import { Container } from './styled';
import styles from './styles';
import { matching } from '../../../../../utils/lottieSources';

const Radar = () => (
  <Container>
    <AnimatedLottieView source={matching} autoPlay loop style={{ height: hp(52) }} />
    {/* <Svg width={wp(100)} height={wp(100)} viewBox={`0 0 ${wp(100)} ${wp(100)}`}>
      <Circle cx={wp(50)} cy={wp(50)} r={wp(75 / 2)} fill="white" fillOpacity="0.5" stroke="white" strokeWidth="0.5" />
      <Circle cx={wp(50)} cy={wp(50)} r={wp(56 / 2)} fill="white" fillOpacity="0.6" stroke="white" strokeWidth="0.5" />
      <Circle cx={wp(50)} cy={wp(50)} r={wp(41 / 2)} fill="white" stroke="white" strokeWidth="0.5" />
      <View style={styles.imagesContainer}>
        <FastImage source={require('../../../../../../assets/images/radar_image_1.png')} resizeMode={'contain'} style={styles.radarImage} />
        <FastImage source={require('../../../../../../assets/images/radar_image_2.png')} resizeMode={'contain'} style={styles.logo} />
      </View>
      {images.map((image, index) => (
        <FastImage
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          source={image.source}
          style={{
            height: PixelRatio.roundToNearestPixel(image.size),
            width: PixelRatio.roundToNearestPixel(image.size),
            borderRadius: PixelRatio.roundToNearestPixel(image.size / 2),
            left: image.left,
            top: image.top,
          }}
        />
      ))}
    </Svg> */}
  </Container>
);

export default Radar;
