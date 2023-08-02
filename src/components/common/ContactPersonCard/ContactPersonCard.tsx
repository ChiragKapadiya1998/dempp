import React from 'react';
import FastImage from 'react-native-fast-image';

import { PersonCardProps } from './types';
import styles from './styles';

import { Container, ContactLabel, Row, PersonName, TaglineLabel, TaglineText } from './styled';
import { View, Text } from 'react-native';

const PersonCard = ({ containerStyle, name, isMyCard = false, profileImage, tagline }: PersonCardProps) => (
  <Container style={containerStyle}>
    <ContactLabel>{isMyCard ? 'You' : 'Your parla contact'}</ContactLabel>
    <Row>
      {profileImage ? (
        <FastImage source={{ uri: profileImage }} style={styles.image} />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name.charAt(0)}</Text>
        </View>
      )}
      <PersonName numberOfLines={1}>{name}</PersonName>
    </Row>
    {tagline && <TaglineLabel>Tagline</TaglineLabel>}
    <TaglineText>{tagline}</TaglineText>
  </Container>
);

export default PersonCard;
