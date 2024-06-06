import { useEffect } from 'react';

import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import Pagination from '../../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectFilter } from '../../redux/filter/selectors';
import { selectPizzaData } from '../../redux/pizza/selectors';
import { fetchPizzas } from '../../redux/pizza/slice';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Pizzas from '../../components/Pizzas/Pizzas';

import './Home.scss';

const Home = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector(selectPizzaData);
  const { categoryId, sort, searchValue, currentPage } = useAppSelector(selectFilter);
  const pizzasPerPage = 4;

  useEffect(() => {
    const category = categoryId ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage,
      }),
    );
  }, [sort, searchValue, categoryId, currentPage]);

  // const pizzas = items && items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, id) => <Skeleton key={id} />);

  const lastPizzaIndex = currentPage * pizzasPerPage;
  const firstPizzaIndex = lastPizzaIndex - pizzasPerPage;
  const currentPizzas = items && items.slice(firstPizzaIndex, lastPizzaIndex);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <div className='content__main'>
        {status === 'error' ? (
          <h2 className='content__main-error'>Сталася помилка! На жаль, не знайшлося піци xD</h2>
        ) : status === 'loading' ? (
          <div className="content__pizzas">{skeletons}</div>
        ) : (
          <>
            {/* <div className="content__pizzas">{pizzas}</div> */}
            <Pizzas items={currentPizzas} />
            <Pagination pizzasPerPage={pizzasPerPage} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
