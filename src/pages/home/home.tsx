import { FC } from 'react';
import TabBurgerIngredients from '../../components/tab-burger-ingredients/tab-burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import style from './home.module.css'

const Home: FC = () => {
  return (
    <div className={`${style.home_wrapper}`}>
      <TabBurgerIngredients />
      <BurgerConstructor />
    </div>
  )
}

export default Home;