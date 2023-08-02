import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, Animated, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { actions } from '../../../ducks/user';
import { getSendSlack, useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { AvailabilityStatus } from '../../../ducks/user/types';
import { Colors } from '../../../styles';
import { hp, wp } from '../../../styles/metrics';
import styles from './styles';
import { Pages } from '../../../navigators/Routes';
import { strings } from '../../../utils/string';
import SvgIcon from '../SvgIcon';

import { actions as userActions } from '../../../ducks/user';

const Status = () => {
  const { navigate } = useNavigation();
  const { userName } = useAppSelector((state) => state.auth);
  const { username } = useAppSelector((state) => state.token);
  const scale = useRef(new Animated.Value(0)).current;
  const user = useAppSelector((state) => state.user.data);
  const { isModesValue, isModesvisible } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isModesvisible) {
      const finalData =
        user?.availabilityStatus === 'feeling-chatty'
          ? { icon: 'chatty-icon', value: 'Chatty' }
          : user?.availabilityStatus === 'sleep'
          ? { icon: 'do-not-disturb-icon', value: 'do not disturb' }
          : { icon: 'call-normal-icon', value: 'Normal' };
      const chagegeValue = {
        isModesvisible: false,
        isModesValue: finalData,
      };
      dispatch(userActions.userModesPress(chagegeValue));
    }
  }, [user?.availabilityStatus]);

  const updateUserStatus = () => {
    // if (user?.isProfileFilled) {
    const chagegeValue = {
      isModesvisible: true,
      isModesValue: isModesValue,
    };
    dispatch(userActions.userModesPress(chagegeValue));
    // const key: AvailabilityStatus = isOff ? 'feeling-chatty' : 'sleep';
    // dispatch(actions.updateUserRequest({ availabilityStatus: key }));
    // } else {
    //   navigate(Pages.SetUpProfileStack, {
    //     screen: Pages.OnboardingSettingUp,
    //     initial: false,
    //     params: { username: userName ? userName : username },
    //   });
    // }
  };

  if (!user) return null;

  const backgroundColor =
    isModesValue?.value == 'Chatty' ? Colors.primary2 : isModesValue?.value == 'do not disturb' ? Colors.greyish3 : Colors.white;
  const textColor = isModesValue?.value == 'Normal' ? Colors.primary4 : Colors.white;

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: backgroundColor }]} onPress={updateUserStatus}>
      {isModesValue?.icon && <SvgIcon name={isModesValue?.icon} height={hp(1.7)} color={textColor} />}
      <Text style={[styles.chattyText, { color: textColor }]}>{isModesValue?.value}</Text>
    </TouchableOpacity>
  );
};

export default Status;

// <TouchableOpacity
//   style={[styles.container, { backgroundColor: isOff ? Colors.white : Colors.primary2 }]}
//   activeOpacity={1}
//   onPress={updateUserStatus}
// >
//   <Animated.View
//     style={[
//       styles.onOffContainer,
//       {
//         left: scale.interpolate({ inputRange: [0, 1], outputRange: [wp(0.5), wp(14.5)] }),
//         backgroundColor: isOff ? Colors.greyish5 : Colors.accent7,
//       },
//     ]}
//   >
//     <Text style={[styles.onOffText, { color: isOff ? Colors.greyish3 : Colors.white }]}>{isOff ? 'OFF' : 'ON'}</Text>
//   </Animated.View>
//   <Animated.View
//     style={[
//       styles.chattyTextContainer,
//       {
//         opacity: scale.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
//         left: wp(2),
//       },
//     ]}
//   >
//     <Text style={[styles.chattyText, { color: Colors.white }]}>{'Chatty'}</Text>
//   </Animated.View>
//   <Animated.View
//     style={[
//       styles.chattyTextContainer,
//       {
//         opacity: scale.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
//         right: wp(2),
//       },
//     ]}
//   >
//     <Text style={styles.chattyText}>{'Chatty'}</Text>
//   </Animated.View>
// </TouchableOpacity>

// if (user && user.availabilityStatus) {
//   const obj1 = {
//     title: strings.availabilityStatus,
//     data: {
//       availabilityStatus: `${user?.availabilityStatus}`,
//     },
//   };
//   getSendSlack(obj1);
//   if (isOff) {
//     Animated.timing(scale, {
//       duration: 500,
//       useNativeDriver: false,
//       toValue: 0,
//     }).start();
//   } else {
//     Animated.timing(scale, {
//       duration: 500,
//       useNativeDriver: false,
//       toValue: 1,
//     }).start();
//   }
// }

// return () => {
//   Animated.timing(scale, {
//     duration: 500,
//     useNativeDriver: false,
//     toValue: 0,
//   }).start();
// };
