import { useState } from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types.js'
import Modal from "../modal/modal";
import style from '../burger-Ingredients/burger-Ingredients.module.css'
import IngredientDetails from '../ingredient-details/ingredient-details.jsx'

// Компонент с блоком навигации по типу ингредиентов
function NavMenuIngredients() {
  const [current, setCurrent] = useState('bun')
  return (
    <div className={`${style.navMenuIngredients__wrapper} mb-10`}>
      <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
};
// Компонент карточки ингредиента
function CardIngredient({ card, handleOpen }) {
  const { image, name, price, _id } = card

  return (
    <>
      <li className={style.cardIngredient__wrapperCard} >
        <img className={`${style.cardIngredient__img} ml-4 mr-4 mb-2`} src={image} alt={name} onClick={handleOpen} id={_id}/>
        <div className={style.cardIngredient__wrapperPrice}> 
          <p className='text text_type_digits-default mb-2'>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={`${style.cardIngredient__name} text text_type_main-default mb-7`}>{name}</p>
        <Counter count={1} size="default" />
      </li>
    </>
  )
};
CardIngredient.propTypes = {
  card: PropTypes.shape(ingredientType),
  handleOpen: PropTypes.func.isRequired
};

// Компонент для секции каждго вида ингредиентов
function SectionIngredients({ data, ingredient, handleOpen }) {
  const nameSection = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки"
  }
  return (
    <section>
      <h2 className='text text_type_main-medium'>{nameSection[ingredient]}</h2>
      <ul className={`${style.listIngredients} mt-6 ml-4 mr-4 mb-9`}>
        {data.map(card => {
          return (card.type === ingredient ? <CardIngredient card={card} key={card._id} handleOpen={handleOpen} /> : null)
        })}
      </ul>
    </section>
  )
};
SectionIngredients.propTypes = {
  ingredient: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOpen: PropTypes.func.isRequired
};

// Компонент собирающий собирающий в себя все остальный компоненты для этого блока 
function TabBurgerIngredients({ data }) {

  const [active, setActive] = useState(false)
  const [descriptionIngredient, setDescriptionIngredient] = useState(null);

  function handleClose() {
    setActive(false)
  }

  function handleOpen(evt) {
    const clickСardId = evt.currentTarget.getAttribute('id');
    setDescriptionIngredient(data.find((card) => card._id === clickСardId));
    setActive(true)
  }

  const typeIngredients = [
    { type: 'bun' },
    { type: 'sauce' },
    { type: 'main' }
  ];
  return (
    <>
      <section className={`${style.tabBurgerIngredients__wrapper} pl-5`}>
        <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
        <NavMenuIngredients />
        <div className={style.tabBurgerIngredients__section}>
          {
            typeIngredients.map((item, index) => {
              return <SectionIngredients data={data} ingredient={item.type} key={index} handleOpen={handleOpen} />
            })
          }
        </div>
      </section>
      {
        active && (
          <Modal onClose={handleClose}>
            <IngredientDetails currentIngredient={descriptionIngredient} />
          </Modal>
        )
      }
    </>
  )
};

TabBurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TabBurgerIngredients


