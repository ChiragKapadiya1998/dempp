import React, { FC, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import SvgIcon from '../../../../../components/common/SvgIcon';
import { Colors } from '../../../../../styles';
import { AllCallHistory, AllHistory } from '../../../../../utils/reportReasons';
import { DropDownDateType } from '../../types';

import styles from './styles';

const DropDownDate: FC<DropDownDateType> = ({ isSelectValue, setIsSelectValue, tabQueries, open, setOpen }) => {
  const [data, setData] = useState(AllHistory);

  const opneDropDown = () => {
    setOpen(!open);
  };
  useEffect(() => {
    let finalData = tabQueries === 1 ? AllHistory : AllCallHistory;
    setData(finalData);
  }, [tabQueries]);

  const onPressDrop = (item: any) => {
    setIsSelectValue(item.value);
    setOpen(false);
  };

  return (
    <>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.bodyContent} onPress={opneDropDown}>
          <Text style={styles.bodyText}>{isSelectValue}</Text>
          <SvgIcon name={'dropDownArrow'} height={6} style={styles.bodyIcon} color={Colors.greyish3} />
        </TouchableOpacity>
      </View>
      {open && (
        <View style={styles.content}>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => onPressDrop(item)}
                style={[
                  styles.contentBody,
                  {
                    borderBottomWidth: index !== data.length - 1 ? 0.5 : 0,
                  },
                ]}
              >
                <Text style={[styles.contentBodyText, { fontWeight: isSelectValue == item.value ? '600' : '400' }]}>{item.label}</Text>
                {isSelectValue == item.value && <SvgIcon name={'right-icon'} height={12} style={styles.contentBodyIcon} color={Colors.accent7} />}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </>
  );
};

export default DropDownDate;
