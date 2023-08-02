import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { actions } from '../../../../../ducks/passions';
import { Colors } from '../../../../../styles';
import { useAppSelector } from '../../../../../utils/hooks';
import EditablePassions from '../EditablePassions';

import styles from './styles';

const PassionsCategories = ({ onPreesShow }) => {
  const dispatch = useDispatch();
  const { categories, isEditing } = useAppSelector((state) => state.passions);
  const { data: user, isUserEditing, isEditTagline } = useAppSelector((state) => state.user);
  const [queryData, setQueryData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const finalData = categories?.map((item) => {
        return {
          ...item,
          isShowVisible: false,
        };
      });
      setQueryData(finalData);

      return () => {
        if (!categories.length) {
          dispatch(actions.getPassionCategoryRequest());
        }
      };
    }, [categories]),
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(actions.getPassionCategoryRequest());
    }
  }, [categories]);

  if (!isEditing) return null;

  const toggleOther = (item) => {
    const finalData = categories?.map((element) => {
      if (element.id === item.id) {
        return {
          ...element,
          isShowVisible: !item.isShowVisible,
        };
      } else {
        return {
          ...element,
          isShowVisible: false,
        };
      }
    });
    setQueryData(finalData);
  };

  return (
    <>
      {queryData.map((item) => {
        if (!item.passions.length) return null;
        return (
          <View key={item.id} style={[styles.categoryContainer, { backgroundColor: isEditing ? Colors.white : 'transparent' }]}>
            <Text style={styles.categoryTitle}>{item.name}</Text>
            <EditablePassions {...item} isShowVisible={item.isShowVisible} toggleOther={() => toggleOther(item)} onPreesShow={onPreesShow} />
          </View>
        );
      })}
    </>
  );
};

export default PassionsCategories;
