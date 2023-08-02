import React from 'react';
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker';

import { Colors } from '../../../styles';
import { wp } from '../../../styles/metrics';
import styles from './styles';

const CountrySelect = (props: DropDownPickerProps) => {
  return (
    <DropDownPicker
      searchable={true}
      itemSeparator={false}
      showTickIcon={false}
      searchPlaceholder={'Enter country name'}
      dropDownDirection={'AUTO'}
      bottomOffset={100}
      placeholder={'Select the country'}
      searchPlaceholderTextColor={Colors.greyish4}
      style={styles.containerStyle}
      searchContainerStyle={{ ...styles.containerStyle, padding: 0, margin: 0, borderBottomWidth: 0 }}
      searchTextInputProps={{ style: styles.searchInputContainer }}
      selectedItemLabelStyle={styles.selectedItemLabelStyle}
      selectedItemContainerStyle={styles.selectedItemContainerStyle}
      searchTextInputStyle={styles.searchTextInputStyle}
      dropDownContainerStyle={styles.dropDownContainerStyleNew}
      listItemLabelStyle={styles.listItemText}
      placeholderStyle={styles.placeholderStyle}
      textStyle={styles.blackText}
      arrowIconStyle={{ tintColor: Colors.primary4, height: wp(6.5) }}
      {...props}
    />
  );
};

export default CountrySelect;
