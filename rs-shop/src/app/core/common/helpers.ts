import { ICategory } from '../models/category.model';
import { ILocation, ITranslatedLocationResponse } from '../models/location.model';
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

export const getLocation = (location: ILocation) => location.city || location.state_prov
  || location.district || location.country_capital || location.country_name || '';

export const getTranslatedLocation = (
  location: ITranslatedLocationResponse,
) => location.results[0].components.city || location.results[0].components.town
 || location.results[0].components.village || location.results[0].components.county || '';
