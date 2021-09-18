import { ICategory } from '../models/category.model';
import { ISearchedCategory } from '../models/searched-category.model';

const getTrimmedStringInLowerCase = (string: string) => string.trim().toLowerCase();

const isIncludes = (
  baseString: string, searchString: string,
) => getTrimmedStringInLowerCase(baseString)
  .includes(
    getTrimmedStringInLowerCase(searchString),
  );

export const getSearchedCategories = (
  categories: ICategory[], searchValue: string,
): ISearchedCategory[] => {
  const searchedCategories: ISearchedCategory[] = [];
  categories.forEach((category: ICategory) => {
    if (isIncludes(category.name, searchValue)) {
      searchedCategories.push({ category });
    }
    category?.subCategories?.forEach((subcategory) => {
      if (isIncludes(subcategory.name, searchValue)) {
        searchedCategories.push({ category, subcategory });
      }
    });
  });

  return searchedCategories;
};

export const getUniqueItemsList = <T>(
  firstList: T[], secondList: T[],
) => Array.from(new Set([...firstList, ...secondList]));
