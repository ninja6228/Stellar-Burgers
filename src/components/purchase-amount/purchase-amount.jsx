import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { postOrder, ORDER_ITEMS_RESET } from '../../services/actions/order.js'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import Modal from "../modal/modal";
import OrderDetails from '../order-details/order-details.jsx'
import style from './purchase-amount.module.css'
import { ingredientType } from '../../utils/types.js';
import { useNavigate } from 'react-router-dom';

function PurchaseAmount({ ingredients, buns }) {
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(state => state.order);
  const { isAuth } = useSelector(state => state.user);
  const navigate = useNavigate();

  const sendOrder = () => {
    const idIngredients = [buns._id, ...ingredients.map(item => item._id), buns._id]
    if (isAuth) {
      dispatch(
        postOrder(idIngredients)
      )
    } else {
      navigate('/login')
    }
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
      <Button htmlType="button" type="primary" size="large" onClick={sendOrder}>Оформить заказ</Button>
      {
        orderDetails && (
          <Modal onClose={handleClose}>
            <OrderDetails orderDetails={orderDetails.order.number} />
          </Modal>
        )}
    </section>
  )
};

PurchaseAmount.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
  buns: PropTypes.shape(ingredientType).isRequired
}

export default PurchaseAmount