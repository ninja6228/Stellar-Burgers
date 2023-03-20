import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../app-header/app-header.module.css'


function AppHeader() {
  return (
    <header className={style.header}>
      <section className={style.header__wrapper}>
        <nav className={style.header__nav}>
          <ul className={`${style['header__nav-list']} mt-4 mb-4`}>
            <li className='mr-2'>
              <a href="javascript:void(0)" className={`${style['header__link']} p-5`}>
                <BurgerIcon type='primary' />
                <p className={`${style['header__link-text']} text text_type_main-default pl-2`}>Конструктор</p>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className={`${style['header__link']} p-5`}>
                <ListIcon type='secondary' />
                <p className={`${style['header__link-text']} text text_type_main-default text_color_inactive pl-2`}>Лента заказов</p>
              </a>
            </li>
          </ul>
        </nav>
        <div className={style.header__logo}><a href="reset"><Logo /></a></div>
        <div className={style.header__profile}>
          <a href="javascript:void(0)" className={`${style['header__link']} p-5`}>
            <ProfileIcon type='secondary' />
            <p className={`${style['header__link-text']} text text_type_main-default text_color_inactive pl-2`}>Личный кабинет</p>
          </a>
        </div>
      </section>
    </header>
  )

}

export default AppHeader;