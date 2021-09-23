import { ICategory } from './category.model';

export interface ISearchedCategory {
  category: ICategory,
  subcategory?: ICategory,
}
