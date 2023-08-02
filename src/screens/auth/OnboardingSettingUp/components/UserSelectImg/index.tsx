import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';

import SvgIcon from '../../../../../components/common/SvgIcon';
import { Colors } from '../../../../../styles';
import { wp } from '../../../../../styles/metrics';
import { useImagePicker } from '../../../../../utils/hooks';
import imagePickerOptions from '../../../../../utils/imagePickerOptions';
import { ProfileImageProps } from '../../types';

import styles from './styles';

const UserSelectImg = ({ setProfileImage, uri }: ProfileImageProps): JSX.Element => {
  const { onOpenCamera, onOpenLibrary } = useImagePicker(setProfileImage, imagePickerOptions);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onOpenLibrary}>
        {uri ? <FastImage style={styles.imgeStyle} source={{ uri }} /> : <SvgIcon name="add-photo-icon" height={150} />}
        {uri == '' && (
          <TouchableOpacity style={styles.pulsContent} onPress={onOpenLibrary}>
            <SvgIcon name="plus-icon" height={10} color={Colors.white} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {uri !== '' && (
        <TouchableOpacity style = {styles.bottomBorder} onPress={onOpenLibrary}>
          <Text style={styles.choosePhotoText} >{'Choose another photo'}</Text>
          {/* <View style={styles.lineStyle} /> */}
        </TouchableOpacity>
      )}
    </>
  );
};

export default UserSelectImg;
