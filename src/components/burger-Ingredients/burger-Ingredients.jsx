import { useState, createRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import style from '../burger-Ingredients/burger-Ingredients.module.css';
import { SET_SELECTED_INGREDIENT, REMOVE_SELECTED_INGREDIENTL } from '../../services/actions/ingredients.js'

import IngredientDetails from '../ingredient-details/ingredient-details';
import CardIngredient from '../card-ingredient/card-ingredient'
import Modal from "../modal/modal";

function TabBurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredients, active, selectedIngredient } = useSelector(store => store.ingredients)
  const [current, setCurrent] = useState('bun');

  const bunRef = createRef();
  const sauceRef = createRef();
  const mainRef = createRef();

  const handleClose = () => {
    dispatch({
      type: REMOVE_SELECTED_INGREDIENTL
    })
  }

  const handleTabClick = (value) => {
    setCurrent(value);
  }

  const handleOpen = (evt) => {
    const clickСardId = evt.currentTarget.getAttribute('id');
    dispatch({
      type: SET_SELECTED_INGREDIENT,
      ingadient: (ingredients.find((card) => card._id === clickСardId))
    })
  }

  const handleScroll = (e) => {
    const sauceContainer = sauceRef.current.getBoundingClientRect();
    const mainContainer = mainRef.current.getBoundingClientRect();

    e.target.offsetTop - sauceContainer.top < 0 
    ? setCurrent('bun') 
    : e.target.offsetTop - mainContainer.top < 0 
    ? setCurrent('sauce') 
    : setCurrent('main');
  }


return (
  <>
    <section className={`${style.tabBurgerIngredients__wrapper} pl-5`}>
      <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
      <div className={`${style.navMenuIngredients__wrapper} mb-10`}>
        <a className={style.navMenuIngredients__link} href="#bun">
          <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>
            Булки
          </Tab>
        </a>
        <a className={style.navMenuIngredients__link} href="#sauce">
          <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
            Соусы
          </Tab>
        </a>
        <a className={style.navMenuIngredients__link} href="#main">
          <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={style.tabBurgerIngredients__section} onScroll={handleScroll}>
        <h3 className='text text_type_main-medium' id="bun" ref={bunRef}>Булки</h3>
        <ul className={`${style.listIngredients} mt-6 ml-4 mr-4 mb-9`}>
          {ingredients.filter((item) => item.type === 'bun').map((item) =>
            <CardIngredient card={item} key={item._id} onOpen={handleOpen} />)}
        </ul>
        <h3 className='text text_type_main-medium' id="sauce" ref={sauceRef}>Соусы</h3>
        <ul className={`${style.listIngredients} mt-6 ml-4 mr-4 mb-9`}>
          {ingredients.filter((item) => item.type === 'sauce').map((item) =>
            <CardIngredient card={item} key={item._id} onOpen={handleOpen} />)}
        </ul>
        <h3 className='text text_type_main-medium' id="main" ref={mainRef}>Начинки</h3>
        <ul className={`${style.listIngredients} mt-6 ml-4 mr-4 mb-9`}>
          {ingredients.filter((item) => item.type === 'main').map((item) =>
            <CardIngredient card={item} key={item._id} onOpen={handleOpen} />)}
        </ul>
      </div>
    </section>
    {
      active && (
        <Modal onClose={handleClose}>
          <IngredientDetails currentIngredient={selectedIngredient} />
        </Modal>
      )
    }
  </>
)
};



export default TabBurgerIngredients