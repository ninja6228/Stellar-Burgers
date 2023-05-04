import style from '../app/app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import TabBurgerIngredients from '../tab-burger-ingredients/tab-burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getIngredients } from '../../services/actions/ingredients'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    error ? <h2 className={style.error}>Произошла ошибка 👽 попробуйте перезагрузить страницу</h2>
      : (
        <>
          <AppHeader />
          <main className={style.main}>
            <DndProvider backend={HTML5Backend}>
              <TabBurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </>
      )
      
  )
}


export default App
