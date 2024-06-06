import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addItem } from '../../redux/cart/slice';
import { selectCart } from '../../redux/cart/selectors';

import './PizzaBlock.scss';

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ imageUrl, price, title, id }) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);
  const findItem = items.find((obj) => obj.id === id);

  const onClickHandler = () => {
    dispatch(addItem({ imageUrl, price, title, id }));
  };
  return (
    <div className="pizza">
      <Link className="pizza__top" to={`/pizza/${id}`}>
        <img src={imageUrl} alt="" className="pizza img" />
        <h2 className="pizza__title">{title}</h2>
      </Link>
      <div className="pizza__bottom">
        <p> {price} $</p>
        <button onClick={onClickHandler}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="#fe1e1e"></path>
          </svg>
          <p>
            Додати <span>{findItem && findItem.count}</span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
