export type PizzaProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  search: string;
  sortBy: string;
  category: string;
  order: string;
  currentPage: number;
};
