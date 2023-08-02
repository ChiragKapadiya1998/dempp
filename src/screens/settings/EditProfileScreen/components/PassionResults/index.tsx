import React, { useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import { actions } from '../../../../../ducks/passions';
import { hp } from '../../../../../styles/metrics';
import { Colors } from '../../../../../styles';

const PassionResults = () => {
  const { selectCategories, categories } = useAppSelector((state) => state.passions);
  const { data: user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.toggleSelectPassions());
  }, [categories]);

  const onCategoryPress = (passion: any) => {
    dispatch(actions.togglePassions({ ...passion, categoryId: passion?.categories }));
    dispatch(actions.toggleSelectPassions());
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
      <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ flex: 1 }}>
        <View style={[styles.container, { paddingVertical: hp(0.9) }]}>
          {true
            ? selectCategories?.map((item: any, index: any) => {
                let passionStyle = index % 3 === 1 ? styles.selectedCategory1 : index % 3 === 2 ? styles.selectedCategory2 : styles.selectedCategory;
                return (
                  <View style={styles.categoryWrapper} key={item.id?.toString()}>
                    <TouchableOpacity
                      onPress={() => onCategoryPress(item)}
                      style={[item.selected ? passionStyle : styles.selectedCategoryUnselected, styles.category]}
                    >
                      <Text style={[styles.categoryText, item.selected ? styles.selectedCategoryText : undefined]}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            : user?.passions.map((item, index) => {
                let passionStyle = index % 3 == 1 ? styles.selectedCategory1 : index % 3 == 2 ? styles.selectedCategory2 : styles.selectedCategory;
                return (
                  <View style={styles.categoryWrapper} key={item.id?.toString()}>
                    <TouchableOpacity onPress={() => onCategoryPress(item)} style={[passionStyle, styles.category]}>
                      <Text style={[styles.categoryText, styles.selectedCategoryText]}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default PassionResults;
