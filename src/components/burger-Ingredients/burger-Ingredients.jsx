import { useState } from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types.js'
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
function CardIngredient({ card }) {
  const { image, name, price } = card

  const [active, setActive] = useState(false)
  
  function openPopup() {
    return !active ? setActive(true) : null
  }

  return (
    <li className={style.cardIngredient__wrapperCard}>
      <img className={`${style.cardIngredient__img} ml-4 mr-4 mb-2`} src={image} alt={name} onClick={openPopup}/>
      <div className={style.cardIngredient__wrapperPrice}>
        <p className='text text_type_digits-default mb-2'>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${style.cardIngredient__name} text text_type_main-default mb-7`}>{name}</p>
      <Counter count={1} size="default" />
      <IngredientDetails active={active} setActive={setActive} data={card} />
    </li>
  )
};
CardIngredient.propTypes = {
  card: PropTypes.shape(ingredientType)
};

// Компонент для секции каждго вида ингредиентов
function SectionIngredients({ data, ingredient }) {
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
          return (card.type === ingredient ? <CardIngredient card={card} key={card._id} /> : null)
        })}
      </ul>
    </section>
  )
};
SectionIngredients.propTypes = {
  ingredient: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

// Компонент собирающий собирающий в себя все остальный компоненты для этого блока 
function TabBurgerIngredients({ data }) {
  const typeIngredients = [
    { type: 'bun' },
    { type: 'sauce' },
    { type: 'main' }
  ];
  return (
    <section className={`${style.tabBurgerIngredients__wrapper} pl-5`}>
      <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
      <NavMenuIngredients />
      <div className={style.tabBurgerIngredients__section}>
        {
          typeIngredients.map((item, index) => {
            return <SectionIngredients data={data} ingredient={item.type} key={index} />
          })
        }
      </div>
    </section>
  )
};

TabBurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TabBurgerIngredients


