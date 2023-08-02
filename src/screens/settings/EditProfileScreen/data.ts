import { PassionCategoryLocal } from '../../../ducks/passions/types';

export const getNumSelectedPassions = (categories: PassionCategoryLocal[]): number => {
  let result = 0;

  categories.forEach((category) =>
    category.passions.forEach(({ selected }) => {
      if (selected) result += 1;
    }),
  );

  return result;
};
