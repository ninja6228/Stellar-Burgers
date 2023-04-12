import { useState, useEffect } from 'react';
import style from '../app/app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import TabBurgerIngredients from '../burger-Ingredients/burger-Ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { baseUrl } from '../../utils/config.js';
import { IngredientsContext } from '../../services/context';


function App() {
  const [ingredients, setIngredients] = useState();
  useEffect(() => {
    async function getIngredients() {
      try {
        const res = await fetch(`${baseUrl}ingredients`);
        if (res.ok) {
          const data = await res.json();
          setIngredients(data)

        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      }
      catch (error) {
        console.log(`Произошла ошибка: ${error}`);
      }
    }
    getIngredients();
  }, [])

  return (
    <>
      <IngredientsContext.Provider value={ingredients}>
        <AppHeader />
        {ingredients &&

          <main className={style.main}>
            <TabBurgerIngredients />
            <BurgerConstructor />
          </main>

        }
      </IngredientsContext.Provider>
    </>
  )
}

export default App
