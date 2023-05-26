import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../app-header/app-header.module.css'
import { Link, NavLink, useLocation } from "react-router-dom";

function AppHeader() {
  const location = useLocation();

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
              <NavLink to="/orders"
                className={location.pathname === '/orders'
                  ? `${style.header__link__active} text text_type_main-default p-5`
                  : `${style.header__link__inactive} text text_type_main-default p-5`}>
                <ListIcon type={location.pathname === '/orders' ? 'primary' : 'secondary'} />
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
            className={location.pathname === '/profile'
              ? `${style.header__link__active} text text_type_main-default p-5`
              : `${style.header__link__inactive} text text_type_main-default p-5`}>
            <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
            Личный кабинет
          </NavLink>
        </div>
      </section>
    </header>
  )
}

export default AppHeader;