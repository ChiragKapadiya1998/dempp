import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Passion } from '../../../../../ducks/passions/types';
import { useAppSelector } from '../../../../../utils/hooks';
import { Colors } from '../../../../../styles';
import { hp, wp } from '../../../../../styles/metrics';

const MyPassions: FC = () => {
  const { isEditing } = useAppSelector((state) => state.passions);
  const { data: user, isUserEditing, isEditTagline } = useAppSelector((state) => state.user);

  if (isEditing) return null;

  const myPassionText = isUserEditing ? Colors.greyish2 : isEditTagline ? Colors.greyish2 : Colors.black;
  const fontWeight = isUserEditing ? '300' : isEditTagline ? '300' : '400';
  const borderWidth = isUserEditing ? 0 : isEditTagline ? 0 : 0;
  const borderWidthColor = isUserEditing ? Colors.greyish2 : isEditTagline ? Colors.greyish2 : Colors.accent7;
  // const borderStyle = isUserEditing ? Colors.greyish10 : isEditTagline ? Colors.greyish10 : Colors.greyish28;
  const borderStyle = isUserEditing ? 'rgb(202,209,220)' : isEditTagline ? 'rgb(202,209,220)' : Colors.greyish28;
  return (
    <>
      <View
        style={[
          styles.myPassionContainer,
          { backgroundColor: isEditing ? Colors.white : 'transparent', marginHorizontal: wp(4.1), marginTop: hp(2) },
        ]}
      >
        {user?.passions.map((item, index) => {
          const backgroundColor = index % 3 === 1 ? Colors.accent10 : index % 3 === 2 ? Colors.accent9 : Colors.accent8;

          return (
            <View
              key={item.id}
              style={[styles.myPassion, { backgroundColor: backgroundColor, borderWidth: borderWidth, borderColor: borderWidthColor }]}
            >
              <Text style={[styles.myPassionText, { color: myPassionText, fontWeight: fontWeight }]}>{item.name}</Text>
            </View>
          );
        })}
      </View>
      <View style={[styles.separateView, { borderColor: borderStyle }]} />
    </>
  );
};

export default MyPassions;
