import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import TitleSmall from '../../../../../components/common/TitleSmall';
import { actions } from '../../../../../ducks/passions';
import { Colors } from '../../../../../styles';
import { hp } from '../../../../../styles/metrics';
import { useAppSelector, useKeyboard } from '../../../../../utils/hooks';
import PassionResults from '../PassionResults';
import EditablePassions from './EditablePassions';
import styles from './styles';

const PassionsCategories = () => {
  const dispatch = useDispatch();
  const { selectCategories, categories, isEditing } = useAppSelector((state) => state.passions);
  const [queryData, setQueryData] = useState([]);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const { isKeyboardHows } = useKeyboard();
  const scrollRef = useRef();
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    if (isKeyboardHows) {
      scrollRef?.current?.scrollToEnd();
    }
  }, [isKeyboardHows]);
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

  setTimeout(() => {
    setShowToastMessage(false);
  }, 800);

  return (
    <>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View style={styles.header}>
          <TitleSmall style={[styles.titleSmall, { color: Colors.greyish3, fontWeight: '600', marginTop: hp(0) }]}>{`Know-Hows`}</TitleSmall>
        </View>
        <View style={styles.selectedCategoryContent}>
          <Text style={[styles.categoryTitle, { marginTop: hp(1.9), marginBottom: hp(0.5) }]}>{'Selected Know-Hows'}</Text>
          <PassionResults />
        </View>

        {queryData?.map((item) => {
          if (!item.passions.length) return null;
          return (
            <View key={item.id} style={[styles.categoryContainer, { backgroundColor: isEditing ? Colors.white : 'transparent' }]}>
              <Text style={styles.categoryTitle}>{item.name}</Text>
              <EditablePassions
                {...item}
                isShowVisible={item.isShowVisible}
                toggleOther={() => toggleOther(item)}
                onPreesShow={(data) => {
                  setShowToastMessage(data);
                }}
              />
            </View>
          );
        })}
      </ScrollView>
      {showToastMessage && (
        <View
          style={{
            backgroundColor: Colors.greyish18,
            position: 'absolute',
            bottom: bottom + hp(12),
            height: hp(4),
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              paddingHorizontal: 20,
              color: Colors.white,
            }}
          >
            {'tag already exists!'}
          </Text>
        </View>
      )}
    </>
  );
};

export default PassionsCategories;
