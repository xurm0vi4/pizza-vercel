import { useEffect, useRef } from 'react';

import Search from '../Search/Search';
import Cart from '../Cart/Cart';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { selectCart } from '../../redux/cart/selectors';

import './Header.scss';

import logo from '../../assets/img/logo.png'

const Header = () => {
  const { items } = useAppSelector(selectCart);
  const { pathname } = useLocation();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <header className="header container">
      <Link to="/" className="header__logo">
        <img src={logo} alt="logo" />
        <span>Pizza</span>
      </Link>
      {pathname !== '/cart' ? (
        <>
          <Search />
          <Cart />
        </>
      ) : (
        <></>
      )}
    </header>
  );
};

export default Header;
