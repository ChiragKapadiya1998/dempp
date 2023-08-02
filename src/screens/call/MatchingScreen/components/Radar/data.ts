/* eslint-disable global-require */
import { Source } from 'react-native-fast-image';

import { Metrics } from '../../../../../styles';
import { wp } from '../../../../../styles/metrics';
import { getCartesianFromPolar } from '../../../../../utils/functions';

export const SCALE = Metrics.screenWidth / 414;
export const PARLA_ONION_SIZE = 72;
export const SMALL_IMAGE_SIZE = wp(12);
export const MEDIUM_IMAGE_SIZE = wp(18);
export const LARGE_IMAGE_SIZE = wp(25);

export const RADIUS_1 = 100 * SCALE;
export const RADIUS_2 = 130 * SCALE;
export const RADIUS_3 = 160 * SCALE;

export const radarImages = {};

// Images of possible contacts
export const images: { source: Source; top: number; left: number; size: number }[] = [
  {
    source: require('../../../../../../assets/images/radar_image_3.png'),
    left: Metrics.screenWidth / 2 - MEDIUM_IMAGE_SIZE / 2 + getCartesianFromPolar(RADIUS_3, 275).x,
    top: Metrics.screenWidth / 2 - MEDIUM_IMAGE_SIZE / 2 + getCartesianFromPolar(RADIUS_3, 275).y,
    size: MEDIUM_IMAGE_SIZE,
  },
  {
    source: require('../../../../../../assets/images/radar_image_3.png'),
    left: Metrics.screenWidth / 2 - LARGE_IMAGE_SIZE / 2 + getCartesianFromPolar(RADIUS_3, 335).x,
    top: Metrics.screenWidth / 2 - LARGE_IMAGE_SIZE / 2 + getCartesianFromPolar(RADIUS_3, 0).y,
    size: LARGE_IMAGE_SIZE,
  },
  {
    source: require('../../../../../../assets/images/radar_image_3.png'),
    left: Metrics.screenWidth / 2 - MEDIUM_IMAGE_SIZE / 2 + getCartesianFromPolar(RADIUS_2, 100).x,
    top: Metrics.screenWidth / 2 - MEDIUM_IMAGE_SIZE / 2 + getCartesianFromPolar(RADIUS_2, 210).y,
    size: MEDIUM_IMAGE_SIZE,
  },
  {
    source: require('../../../../../../assets/images/radar_image_3.png'),
    left: Metrics.screenWidth / 2 - MEDIUM_IMAGE_SIZE / 2 + getCartesianFromPolar(RADIUS_3, 200).x,
    top: Metrics.screenWidth / 2 - MEDIUM_IMAGE_SIZE / 2 + getCartesianFromPolar(RADIUS_3, 260).y - Metrics.screenWidth / 4,
    size: MEDIUM_IMAGE_SIZE,
  },
  {
    source: require('../../../../../../assets/images/radar_image_3.png'),
    left: Metrics.screenWidth / 2 - SMALL_IMAGE_SIZE / 2 + getCartesianFromPolar(RADIUS_2, 68).x,
    top: Metrics.screenWidth / 2 - SMALL_IMAGE_SIZE / 2 + getCartesianFromPolar(RADIUS_2, 280).y - Metrics.screenWidth / 1.5,
    size: SMALL_IMAGE_SIZE,
  },
];
