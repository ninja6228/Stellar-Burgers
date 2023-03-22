import React from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../burger-Ingredients/burger-Ingredients.module.css'




function CardIngredient({ card }) {
  const valueCount = (<Counter count={card.__v} />).props['count'];
  return (
    <li className={style.cardIngredient__wrapperCard}>
      <img className={`${style.cardIngredient__img} ml-4 mr-4 mb-2`} src={card.image} alt={card.name} />
      <div className={style.cardIngredient__wrapperPrice}>
        <p className='text text_type_digits-default mb-2'>{card.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${style.cardIngredient__name} text text_type_main-default mb-7`}>{card.name}</p>
      <div className={valueCount > 0 ? null : style.cardIngredient__counter}>
        <Counter count={card.__v} size="default" />
      </div>
    </li>
  )
}

function NavMenuIngredients() {
  const [current, setCurrent] = React.useState('bun')
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
}

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
}

function TabBurgerIngredients({ data }) {
  const typeIngredients = [
    { type: 'bun', id: 1 },
    { type: 'sauce', id: 2 },
    { type: 'main', id: 3 }
  ];
  return (
    <section className={`${style.tabBurgerIngredients__wrapper} pl-5`}>
      <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
      <NavMenuIngredients />
      <div className={style.tabBurgerIngredients__section}>
        {
          typeIngredients.map(item => {
            return <SectionIngredients data={data} ingredient={item.type} key={item.id} />
          })
        }
      </div>
    </section>
  )
}



export default TabBurgerIngredients


