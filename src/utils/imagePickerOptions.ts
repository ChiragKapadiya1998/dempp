import { Options } from 'react-native-image-crop-picker';
import { COMPRESS_IMAGE_MAX_HEIGHT, COMPRESS_IMAGE_MAX_WIDTH, PHOTO } from './constants';

const imagePickerOptions: Options = {
  multiple: false,
  mediaType: PHOTO,
  cropping: false,
  compressImageMaxWidth: COMPRESS_IMAGE_MAX_WIDTH,
  compressImageMaxHeight: COMPRESS_IMAGE_MAX_HEIGHT,
  useFrontCamera: true,
};

export default imagePickerOptions;
