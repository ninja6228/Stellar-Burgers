import { Link, NavLink, useLocation } from "react-router-dom";
import { FC } from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../app-header/app-header.module.css';
import { useSelector } from '../../services/hooks/hooks';


const AppHeader: FC = () => {
  const location = useLocation();
  const user = useSelector(state => state.user.form);

  return (
    <header className={style.header}>
      <section className={style.header__wrapper}>
        <nav className={style.header__nav}>
          <ul className={`${style.header__navList} mt-4 mb-4`}>
            <li className='mr-2'>
              <NavLink to="/"
                className={location.pathname === "/"
                  ? `${style.header__link__active} text text_type_main-default p-5`
                  : `${style.header__link__inactive} text text_type_main-default p-5`}>
                <BurgerIcon type={location.pathname === "/"
                  ? 'primary'
                  : 'secondary'} />
                Конструктор
              </NavLink>
            </li>
            <li>
              <NavLink to="/feed"
                className={location.pathname === '/feed'
                  ? `${style.header__link__active} text text_type_main-default p-5`
                  : `${style.header__link__inactive} text text_type_main-default p-5`}>
                <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
                Лента заказов
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/" className={style.header__logo}>
          <Logo />
        </Link>
        <div className={style.header__profile}>
          <NavLink to="/profile"
            className={location.pathname === '/profile' || location.pathname === '/profile/orders'
              ? `${style.header__link__active} text text_type_main-default p-5`
              : `${style.header__link__inactive} text text_type_main-default p-5`}>
            <ProfileIcon type={location.pathname === '/profile' || location.pathname === '/profile/orders' ? 'primary' : 'secondary'} />
            {user ? user?.name : `Личный кабинет`}
          </NavLink>
        </div>
      </section>
    </header>
  )
}

export default AppHeader;