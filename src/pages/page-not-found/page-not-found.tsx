import { FC } from 'react';
import { Link } from "react-router-dom";
import style from './page-not-found.module.css'

const PageNotFound: FC = () => {
  return (
    <section className={`${style.container}`}>
      <h2 className={`text text_type_main-large ${style.error}`}>404</h2>
      <p className={`text text_type_main-large ${style.text}`}>Такой страницы нет 👽</p>
      <Link to={"/"} className={`${style.link} text text_color_accent mt-15`}>Вернуться на орбиту</Link>
    </section>
  )
}

export default PageNotFound