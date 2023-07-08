import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FC } from 'react';
import style from './profile.module.css';
import { logout } from '../../services/actions/user';
import { useDispatch } from '../../services/hooks/hooks';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout())
  }

  const descriptionPage = location.pathname === "/profile"
    ? <p className={`text text_type_main-default ${style.profile__text}`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
    : <p className={`text text_type_main-default ${style.profile__text}`}>В этом разделе вы можете просмотреть свою историю заказов</p>

  return (
    <div className={`${style.profile__container}`}>
      <section className={`${style.profile__wrapper} mr-15 mb-30`}>
        <nav className={`${style.profile__nav} mb-20`}>
          <NavLink to={'/profile'}
            className={location.pathname === "/profile"
              ? `${style.profile__link__active} text text_type_main-medium`
              : `${style.profile__link__inactive} text text_type_main-medium`}>
            Профиль
          </NavLink>
          <NavLink to={'/profile/orders'}
            className={location.pathname === "/profile/orders"
              ? `${style.profile__link__active} text text_type_main-medium`
              : `${style.profile__link__inactive} text text_type_main-medium`}>
            История заказов
          </NavLink>
          <p onClick={handleLogout} className={`${style.profile__link__inactive} text text_type_main-medium`}>выход</p>
        </nav>
        {descriptionPage}
      </section >
      <Outlet />
    </div>
  )
}

export default Profile