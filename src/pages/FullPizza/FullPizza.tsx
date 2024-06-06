import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addItem } from '../../redux/cart/slice';
import { selectCart } from '../../redux/cart/selectors';

import './FullPizza.scss';

type PizzaDataProps = {
  imageUrl: string;
  title: string;
  price: number;
};

const FullPizza = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);

  const [pizzaData, setPizzaData] = useState<PizzaDataProps>();
  const { id } = useParams();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://656b1fabdac3630cf727b77a.mockapi.io/test/pizza/' + id,
        );
        setPizzaData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPizza();
  }, []);
  const findItem = items.find((obj) => obj.id === id);

  const onButtonHandler = () => {
    if (pizzaData) {
      const { imageUrl, title, price } = pizzaData;
      dispatch(addItem({ imageUrl, title, id, price }));
    }
  };

  return (
    <>
      {pizzaData && (
        <div className="fullpizza">
          <img src={pizzaData.imageUrl} alt="pizza" />
          <h2>{pizzaData.title}</h2>
          <h3>{pizzaData.price} $</h3>
          <button onClick={onButtonHandler}>Додати {findItem && findItem.count}</button>
          <Link to="/">На головну</Link>
        </div>
      )}
    </>
  );
};

export default FullPizza;
