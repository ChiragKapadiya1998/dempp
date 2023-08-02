import React from 'react';
import FastImage from 'react-native-fast-image';

import { ContactPersonBadgeProps } from './types';
import { Container, FeedbackPersonHorizontalContainer, FeedbackPersonNameText } from './styled';
import styles from './styles';
import { Text, View } from 'react-native';
import { Colors } from '../../../styles';

const ContactPersonBadge = ({ containerStyle, image, name }: ContactPersonBadgeProps) => (
  <Container style={containerStyle}>
    <FeedbackPersonHorizontalContainer
      style={{
        shadowColor: Colors.primary5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      {image ? (
        <FastImage source={{ uri: image }} resizeMode={'cover'} style={styles.feedbackPersonImage} />
      ) : (
        <View style={[styles.feedbackPersonImage, { backgroundColor: Colors.primary1 }]}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
      )}
      <FeedbackPersonNameText style={styles.userText}>{name}</FeedbackPersonNameText>
    </FeedbackPersonHorizontalContainer>
  </Container>
);

export default ContactPersonBadge;
