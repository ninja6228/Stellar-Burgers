import PropTypes from 'prop-types';
import { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon, DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from "react-dnd";

import { ingredientType } from '../../utils/types.js'
import style from '../burger-constructor/burger-constructor.module.css'
import OrderDetails from '../order-details/order-details.jsx'
import Modal from "../modal/modal";
import { postOrder, ORDER_ITEMS_RESET, REMOVE_INGREDIENT, ADD_INGREDIENT, ADD_BUN, MOVE_INGREDIENT } from '../../services/actions/order.js'

function СardIngredient({ ingredient, index }) {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const moveCardHandler = (dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_INGREDIENT,
      dragIndex,
      hoverIndex
    })
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'sortable',
    item: () => {
      return { ...ingredient, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  const [, drop] = useDrop({
    accept: 'sortable',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex
    },
  });

  drag(drop(ref))



  const handleRemoveIngredient = () => {
    dispatch({
      type: REMOVE_INGREDIENT,
      id: ingredient.id
    })
  }

  return (
    <li className={`${style.cardIngredient} mb-4`} style={{ opacity: opacity }} ref={ref}>
      <div className={`${style.cardIngredient__icon} ml-2`}>
        <DragIcon type='primary' />
      </div>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleRemoveIngredient}
      />
    </li >
  )
};
СardIngredient.propTypes = {
  ingredient: PropTypes.shape(ingredientType)
}


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


function PurchaseAmount({ ingredients, buns }) {
  const dispatch = useDispatch();
  const { orderDetails, active } = useSelector(store => store.order);

  const idIngredients = [buns._id, ...ingredients.map(item => item._id), buns._id]

  const handleOpen = () => {
    dispatch(
      postOrder(idIngredients)
    )
  }

  const handleClose = () => {
    dispatch({
      type: ORDER_ITEMS_RESET
    })
  }

  const totalPrice = useMemo(() => {
    let ingredientPrice = ingredients.reduce((sum, item) => { return item.price + sum }, 0)
    return ingredientPrice + (buns.price * 2)
  }, [ingredients, buns])

  return (
    <section className={`${style.purchaseAmount__wrapper} mt-10 mr-5`}>
      <span className='text text_type_digits-medium mr-10'>
        {totalPrice}
        <CurrencyIcon />
      </span>
      <Button htmlType="button" type="primary" size="large" onClick={handleOpen}>Оформить заказ</Button>
      {
        active && (
          <Modal onClose={handleClose}>
            <OrderDetails orderDetails={orderDetails} />
          </Modal>
        )}
    </section>
  )
};
PurchaseAmount.propTypes = {
  ingredients: PropTypes.array.isRequired,
  buns: PropTypes.object.isRequired
}


function BurgerConstructor() {
  const dispatch = useDispatch();
  const { list, bun } = useSelector(store => store.order)
  const randomID = getRandom()

  function getRandom() {
    return Math.random();
  }

  const moveIngredient = (ingredient) => {
    dispatch({
      type: ingredient.type === 'bun' ? ADD_BUN : ADD_INGREDIENT,
      item: { ...ingredient, id: randomID }
    })
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      moveIngredient(item);
    }
  }) 

  return (
    (list.length || bun) ?
      <section className={`${style.section} mt-25 pr-4 pl-2`} ref={dropTarget} >
        {bun ? <CardBuns position={'top'} buns={bun} /> : <p className={`${style.clearList_bun} ${isHover ? style.item_isHovering : ''} text text_type_main-default`}>Выберите булочку и добавьте её сюда</p>}
        <ul className={`${style.sectionList} mt-3 pr-3`}>
          {list.length ? list.map((item, i) => { return <СardIngredient ingredient={item} key={i} index={i} /> })
            : <p className={`${style.clearList_ing} ${isHover ? style.item_isHovering : ''}  text text_type_main-default`}>Выберите ингредиенты и добавьте их сюда</p>}
        </ul>
        {bun ? <CardBuns position={'bottom'} buns={bun} /> : null}
        {((list.length > 0 && bun) ? (< PurchaseAmount ingredients={list} buns={bun} />) : null)}
      </section >
      :
      <section className={`${style.section} mt-25 pr-4 pl-2`} ref={dropTarget} >
        <div className={`${style.clearList} ${isHover ? style.item_isHovering : ''} text text_type_main-medium`}>Переместите сюда<br />любимую булку и ингредиенты</div>
      </section>
  )
};


export default BurgerConstructor