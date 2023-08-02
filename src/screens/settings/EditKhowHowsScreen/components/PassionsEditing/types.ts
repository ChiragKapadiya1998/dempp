import { GestureResponderEvent, Animated } from 'react-native';
import { Passion, PassionCategoryLocal } from '../../../../../ducks/passions/types';

export type PassionsEditingProps = {
  isPassionsEditing: boolean;
  onPassionsEditPress: (event: GestureResponderEvent) => void;
  localCategories: PassionCategoryLocal[];
  onSelectPassion: (passion: Partial<Passion>) => void;
  onCreatePassion: (passion: Partial<Passion>, categoryId: number) => void;
  onPressOther: (categoryId: number) => void;
  passionsOpacity: Animated.Value;
};
