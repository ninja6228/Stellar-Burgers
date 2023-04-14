import { useState, useEffect } from 'react';
import style from '../app/app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import TabBurgerIngredients from '../burger-Ingredients/burger-Ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { checkResponse, baseUrl } from '../../utils/apiConfig.js';
import { IngredientsContext } from '../../services/context';

function App() {
  const [ingredients, setIngredients] = useState();
  useEffect(() => {
    async function getIngredients() {
      try {
        const res = await fetch(`${baseUrl}ingredients`);
        const data = await checkResponse(res)
        setIngredients(data)
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
        {ingredients && (
          <main className={style.main}>
            <TabBurgerIngredients />
            <BurgerConstructor />
          </main>
        )}
      </IngredientsContext.Provider>
    </>
  )
}

export default App
