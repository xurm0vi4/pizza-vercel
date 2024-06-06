import React from 'react';

import PizzaBlock from '../PizzaBlock/PizzaBlock';
import { PizzaProps } from '../../redux/pizza/types';

type PizzasBlockProps = {
  items: PizzaProps[];
};

const Pizzas: React.FC<PizzasBlockProps> = ({ items }) => {
  const pizzas = items && items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return <div className="content__pizzas">{pizzas}</div>;
};

export default Pizzas;
