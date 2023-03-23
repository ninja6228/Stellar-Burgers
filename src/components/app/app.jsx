import style from '../app/app.module.css'
import AppHeader from '../app-header/app-header.jsx';
import TabBurgerIngredients from '../burger-Ingredients/burger-Ingredients.jsx'
import BurgerConstructor  from '../burger-constructor/burger-constructor.jsx'
import { data } from '../../utils/data.js'


function App() {
  return (
    <>
      <AppHeader/>
      <main className={style.main}>
        <TabBurgerIngredients data={data} />
        <BurgerConstructor data={data}/>
      </main>
    </>
  )
}

export default App