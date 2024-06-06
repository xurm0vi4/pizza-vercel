import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectPizzaData } from '../../redux/pizza/selectors';
import { setCurrentPage } from '../../redux/filter/slice';
import { selectFilter } from '../../redux/filter/selectors';

import './Pagination.scss';

type PaginationProps = {
  pizzasPerPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ pizzasPerPage }) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectPizzaData);
  const { currentPage } = useAppSelector(selectFilter);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(items.length / pizzasPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li
          className={`${currentPage === number ? 'active' : ''}`}
          onClick={() => dispatch(setCurrentPage(number))}
          key={number}>
          {number}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
