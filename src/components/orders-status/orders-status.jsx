
import style from './orders-status.module.css'
import PropTypes from 'prop-types';
import { orderType } from '../../utils/types'

const OrdersStatus = ({ status, orders }) => {
  
  if (!orders) {
    return <p className={`${style.loader} text text_type_digits-default`}>Загрузка данных ...</p>;
  }

  const selectedType = orders.filter(item => item.status === status).slice(0, 10)

  return (
    selectedType.map(item => {
      if (status === 'done') {
        return (<li key={item.number} className={`${style.numer__done} text text_type_digits-default`}>{item.number}</li>)
      } else if (status === 'pending') {
        return (<li key={item.number} className={`${style.numer__pending} text text_type_digits-default`}>{item.number}</li>)
      } else {
        return null
      }
    })
  )
}

OrdersStatus.propTypes = {
  status: PropTypes.string,
  orders: PropTypes.arrayOf(PropTypes.shape(orderType))
}

export default OrdersStatus