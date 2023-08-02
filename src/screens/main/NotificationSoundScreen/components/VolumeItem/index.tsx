import React from 'react';
import { Props } from './types';
import { Container, TitleText } from './styled';
import styles from './styles';
import { View } from 'react-native';
import { hp, wp } from '../../../../../styles/metrics';
import { Colors } from '../../../../../styles';

const VolumeItem = ({ isSelected, title, lastIndex, index, onPress }: Props): JSX.Element => {
  return (
    <Container activeOpacity={0.5} onPress={onPress} style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        {lastIndex !== index && (
          <View
            style={[
              styles.radioBtn,
              {
                left: isSelected ? wp(5.7) : wp(4.8),
              },
            ]}
          />
        )}
        <View style={styles.buttonContent}>{isSelected && <View style={styles.buttonInside} />}</View>
      </View>
      <TitleText style={[styles.text, { color: isSelected ? Colors.primary4 : Colors.primary8 }]}>{title}</TitleText>
    </Container>
  );
};

export default VolumeItem;
