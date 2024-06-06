import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectFilter } from '../../redux/filter/selectors';
import { setSearchValue } from '../../redux/filter/slice';

import './Search.scss';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const { searchValue } = useAppSelector(selectFilter);

  const debounceSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 300),
    [],
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounceSearchValue(e.target.value);
  };

  const clearInput = () => {
    setValue('');
    dispatch(setSearchValue(''));
  };

  return (
    <div className="search">
      <svg
        className="search__icon"
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"></circle>
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"></line>
      </svg>
      <input
        value={value}
        onChange={(e) => onChangeInput(e)}
        placeholder="Пошук пітси..."
        className="search__input"
      />
      {searchValue && (
        <svg
          className="search__close"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={clearInput}>
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
        </svg>
      )}
    </div>
  );
};

export default Search;
