import TabBurgerIngredients from '../../components/tab-burger-ingredients/tab-burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import style from './home.module.css'

function Home() {
  return (
    <div className={`${style.home_wrapper}`}>
      <TabBurgerIngredients/>
      <BurgerConstructor/>
    </div>
  )
}

export default Home;