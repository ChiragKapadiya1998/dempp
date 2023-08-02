import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../styles';

export default StyleSheet.create({
  // solid1
  solid1ContainerDisabled: {
    opacity: 1.0,
  },
  // outline1
  outline1ContainerEnabled: {
    backgroundColor: Colors.white,
    borderColor: Colors.greyish1,
    borderWidth: 1,
    flexBasis: 0,
    flexGrow: 1,
    marginHorizontal: 0,
    minHeight: Metrics.hp(6),
  },
  outline1TitleEnabled: {
    color: Colors.greyish1,
  },
  outline1Icon: {
    marginRight: Metrics.wp(2),
  },
  // outline2
  destructiveOutline1ContainerEnabled: {
    backgroundColor: Colors.white,
    borderColor: Colors.destructive4,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: Metrics.hp(5.5),
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 6,
  },
  // solid2
  solid2ContainerDisabled: {
    backgroundColor: Colors.greyish3,
    opacity: 0.5,
  },
  // destructive1
  destructive1ContainerEnabled: {
    backgroundColor: Colors.destructive4,
    borderRadius: 8,
    marginHorizontal: 10,
    minHeight: Metrics.hp(5.5),
    paddingHorizontal: 16,
    width: undefined,
  },
  // success1
  success1ContainerEnabled: {
    backgroundColor: Colors.accent7,
    borderRadius: 8,
    marginHorizontal: 10,
    minHeight: Metrics.hp(5.5),
    paddingHorizontal: 16,
    width: undefined,
  },
});
