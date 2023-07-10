import { FC } from 'react';
import style from './order-details.module.css';
import done from "../../images/modal/done.svg";

interface IOrderDetails {
  orderDetails: number | undefined
}

const OrderDetails: FC<IOrderDetails> = ({ orderDetails }) => {
  return (
    <>
      <div className={`${style.wrapper} mt-30 mb-30`}>
        <h2 className={`${style.number} text text_type_digits-large mb-8`}>{orderDetails}</h2>
        <p className={`text text_type_main-medium mb-15`} >идентификатор заказа</p>
        <img className={`${style.img} mb-15`} src={done} alt="иконка галочки" />
        <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
      </div>
    </>
  )
}

export default OrderDetails

