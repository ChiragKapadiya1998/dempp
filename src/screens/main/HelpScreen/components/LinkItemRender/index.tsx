import React, { useState } from 'react';
import { Link } from './types';
import styles from './styles';
import { View, TouchableOpacity, Text } from 'react-native';
import SvgIcon from '../../../../../components/common/SvgIcon';
import { Colors } from '../../../../../styles';
import { hp } from '../../../../../styles/metrics';

const LinkItemRender = ({ data, hideDividerline }: Link): JSX.Element => {
  const [hideArrow, setHideArrow] = useState(false);

  return (
    <>
      <View style={{ borderBottomWidth: hideDividerline ? 0 : 1, borderBottomColor: '#EEF0F5' }}>
        <TouchableOpacity style={[styles.settigsItem, { paddingBottom: hideArrow ? hp(0.8) : hp(1.97) }]} onPress={() => setHideArrow(!hideArrow)}>
          <View style={styles.row}>
            <Text style={[styles.listItemTitle]}>{data?.question}</Text>
          </View>
          <View style={styles.rightSide}>
            {hideArrow ? (
              <SvgIcon name="dropDownArrow" height={7} color={Colors.greyish4} style={{ transform: [{ rotate: '180deg' }] }} />
            ) : (
              <SvgIcon name="dropDownArrow" height={7} color={Colors.greyish4} />
            )}
          </View>
        </TouchableOpacity>
        {hideArrow && <Text style={styles.subTitleText}>{data?.answer}</Text>}
      </View>
    </>
  );
};

export default LinkItemRender;
