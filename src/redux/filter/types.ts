export type FilterSliceStateProps = {
  categoryId: number;
  searchValue: string;
  sort: SortProps;
  currentPage: number;
};

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type SortProps = {
  name: string;
  sortProperty: SortPropertyEnum;
};
