import { useState, createRef, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './tab-burger-ingredients.module.css';
import { SET_SELECTED_INGREDIENT, REMOVE_SELECTED_INGREDIENTL } from '../../services/actions/ingredients.js'
import IngredientDetails from '../ingredient-details/ingredient-details';
import CardIngredient from '../card-ingredient/card-ingredient'
import Modal from "../modal/modal";
import { typeIngredient } from '../../utils/constants'


function TabBurgerIngredients() {
  const dispatch = useDispatch();
  const { BUN, MAIN, SAUCE } = typeIngredient
  const { ingredients, selectedIngredient } = useSelector(store => store.ingredients)
  const [current, setCurrent] = useState(BUN);

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
      ? setCurrent(BUN)
      : e.target.offsetTop - mainContainer.top < 0
        ? setCurrent(SAUCE)
        : setCurrent(MAIN);
  }

  const tabBuns = useMemo(() => {
    return ingredients.filter((item) => item.type === BUN)
  }, [ingredients, BUN])

  const tabSouse = useMemo(() => {
    return ingredients.filter((item) => item.type === SAUCE)
  }, [ingredients, SAUCE])

  const tabMain = useMemo(() => {
    return ingredients.filter((item) => item.type === MAIN)
  }, [ingredients, MAIN])

  return (
    <>
      <section className={`${style.tabBurgerIngredients__wrapper} pl-5`}>
        <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
        <div className={`${style.navMenuIngredients__wrapper} mb-10`}>
          <a className={style.navMenuIngredients__link} href="#bun">
            <Tab value={BUN} active={current === BUN} onClick={handleTabClick}>
              Булки
            </Tab>
          </a>
          <a className={style.navMenuIngredients__link} href={"#sauce"}>
            <Tab value={SAUCE} active={current === SAUCE} onClick={handleTabClick}>
              Соусы
            </Tab>
          </a>
          <a className={style.navMenuIngredients__link} href="#main">
            <Tab value={MAIN} active={current === MAIN} onClick={handleTabClick}>
              Начинки
            </Tab>
          </a>
        </div>
        <div className={style.tabBurgerIngredients__section} onScroll={handleScroll}>
          <h3 className='text text_type_main-medium' id={BUN} ref={bunRef}>Булки</h3>
          <ul className={`${style.listIngredients} mt-6 ml-4 mr-4 mb-9`}>
            {tabBuns.map((item) => <CardIngredient card={item} key={item._id} onOpen={handleOpen} />)}
          </ul>
          <h3 className='text text_type_main-medium' id={SAUCE} ref={sauceRef}>Соусы</h3>
          <ul className={`${style.listIngredients} mt-6 ml-4 mr-4 mb-9`}>
            {tabSouse.map((item) => <CardIngredient card={item} key={item._id} onOpen={handleOpen} />)}
          </ul>
          <h3 className='text text_type_main-medium' id="main" ref={mainRef}>Начинки</h3>
          <ul className={`${style.listIngredients} mt-6 ml-4 mr-4 mb-9`}>
            {tabMain.map((item) => <CardIngredient card={item} key={item._id} onOpen={handleOpen} />)}
          </ul>
        </div>
      </section>
      {
        selectedIngredient && (
          <Modal onClose={handleClose}>
            <IngredientDetails currentIngredient={selectedIngredient} />
          </Modal>
        )
      }
    </>
  )
};



export default TabBurgerIngredients