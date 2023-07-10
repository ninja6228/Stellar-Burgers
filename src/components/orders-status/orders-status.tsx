import { FC } from 'react';
import style from './orders-status.module.css';
import { IOrderType } from '../../types/types';

interface IOrdersStatus {
  orders: Array<IOrderType>,
  status: 'done' | 'pending' | undefined
}

const OrdersStatus: FC<IOrdersStatus> = ({ status, orders }) => {
  
  if (!orders.length) {
    return <p className={`${style.loader} text text_type_digits-default`}>Загрузка данных ...</p>;
  }
  
  const selectedType = orders.filter(item => item.status === status).slice(0, 10)

  let state = selectedType.map(item => {
    if (status === 'done') {
      return (<li key={item.number} className={`${style.numer__done} text text_type_digits-default`}>{item.number}</li>)
    } else if (status === 'pending') {
      return (<li key={item.number} className={`${style.numer__pending} text text_type_digits-default`}>{item.number}</li>)
    } else {
      return null
    }
  })

  return (
    <>
      {state}
    </>
  )
}

export default OrdersStatus