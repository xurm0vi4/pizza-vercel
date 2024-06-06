
export type CartItemProps = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
};

export type CartSliceState = {
  items: CartItemProps[];
  totalPrice: number;
};
