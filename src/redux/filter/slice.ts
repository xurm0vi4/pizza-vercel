import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceStateProps, SortProps, SortPropertyEnum } from './types';

const initialState: FilterSliceStateProps = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  sort: { name: 'популярності (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortProps>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSearchValue, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
