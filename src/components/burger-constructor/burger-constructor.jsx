import PropTypes from 'prop-types';
import { useState } from 'react';
import { CurrencyIcon, DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types.js'
import style from '../burger-constructor/burger-constructor.module.css'
import OrderDetails from '../order-details/order-details.jsx'
import Modal from "../modal/modal";

// массив ингредиентов без булочек
function listIngredients({ data }) {
  const ingredients = data.filter(item => {
    return item.type !== 'bun';
  })
  return ingredients
};

// массив только с булочками
function listBuns({ data }) {
  const buns = data.filter(item => {
    return item.type === 'bun';
  })
  return buns
};

// Компонент с карточкой ингредиента 
function СardIngredient({ ingredient }) {
  const { name, price, image } = ingredient
  return (
    <li className={`${style.cardIngredient} mb-4`}>
      <div className={`${style.cardIngredient__icon} ml-2`}><DragIcon type='primary' /></div>
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
      />
    </li>
  )
};

СardIngredient.propTypes = {
  ingredient: PropTypes.shape(ingredientType)
}

// Компонент с карточкой булочки, в зависимости от переданной позиции меняется описание 
function CardBuns({ position, buns }) {
  const positionBun = position === 'top' ? `(верх)` : `(низ)`;
  return (
    <div className={`${style.cardBuns} mr-2 ml-8 pr-3`}>
      <ConstructorElement
        type={position}
        isLocked={true}
        text={`${buns.name} ${positionBun}`}
        price={buns.price}
        thumbnail={buns.image}
      />
    </div>
  )
};

CardBuns.propTypes = {
  position: PropTypes.string.isRequired,
  buns: PropTypes.shape(ingredientType)
};

// Компонент с финальной суммой всех инградиентов и кнопкой для потверждения заказа
function PurchaseAmount({ ingredients, buns }) {

  const [active, setActive] = useState(false)

  function handleOpen() {
    setActive(true)
  }

  function handleClose() {
    setActive(false)
  }

  const arrayForPrices = []
  ingredients.map(item => arrayForPrices.push(item.price))
  const totalValueIngredients = arrayForPrices.reduce((sum, price) => sum + price, 0)

  return (
    <section className={`${style.purchaseAmount__wrapper} mt-10 mr-5`}>
      <span className='text text_type_digits-medium mr-10'>
        {totalValueIngredients + (buns[0].price * 2)}
        <CurrencyIcon />
      </span>
      <Button htmlType="button" type="primary" size="large" onClick={handleOpen}>Оформить заказ</Button>
      {
        active && (
          <Modal onClose={handleClose}>
            <OrderDetails />
          </Modal>
        )}
    </section>
  )
};

PurchaseAmount.propTypes = {
  ingredients: PropTypes.array.isRequired,
  buns: PropTypes.array.isRequired,
}

// Компонент принемающий в себя выбранные инградиенты и собирающий в себя все остальный компоненты для этого блока 
function BurgerConstructor({ data }) {
  const buns = listBuns({ data })
  const ingredients = listIngredients({ data })
  return (
    <section className={`${style.section} mt-25 pr-4 pl-2`}>
      <CardBuns position={'top'} buns={buns[0]} />
      <ul className={`${style.sectionList} mt-3 pr-3`}>
        {ingredients.map((item) => {
          return <СardIngredient ingredient={item} key={item._id} />
        })}
      </ul>
      <CardBuns position={'bottom'} buns={buns[0]} />
      <PurchaseAmount ingredients={ingredients} buns={buns} />
    </section>
  )
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerConstructor