import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setCategoryId } from '../../redux/filter/slice';
import { selectFilter } from '../../redux/filter/selectors';

import './Categories.scss';

const categories = ['Всі', 'Новинки', 'Краща ціна', 'Класика', 'Дивина'];

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useAppSelector(selectFilter);

  return (
    <ul className="categories">
      {categories.map((category, id) => (
        <li
          key={id}
          className={`category ${categoryId === id ? 'active' : ''}`}
          onClick={() => dispatch(setCategoryId(id))}>
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
