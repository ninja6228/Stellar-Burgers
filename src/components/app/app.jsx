import { useState, useEffect } from 'react';
import style from '../app/app.module.css'
import AppHeader from '../app-header/app-header.jsx';
import TabBurgerIngredients from '../burger-Ingredients/burger-Ingredients.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import { urlIngredients } from '../../utils/config.js'

function App() {
  const [ingredients, setIngredients] = useState();
  useEffect(() => {
    async function getIngredients() {
      try {
        const res = await fetch(urlIngredients);
        if (res.ok) {
          const data = await res.json();
          setIngredients(data)
        } else {
          console.log(`Ошибка: ${res.status}`);
        }
      }
      catch(error) {
        console.log(`Произошла ошибка: ${error}`);
      }
    }
    getIngredients();
  }, [])

  return (
    <>
      <AppHeader />
      {ingredients && (
        <main className={style.main}>
          <TabBurgerIngredients data={ingredients.data} />
          <BurgerConstructor data={ingredients.data} />
        </main>
      )}
    </>
  )
}

export default App
