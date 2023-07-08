import style from './profile-history-orders.module.css'
import FeedCard from '../feed-card/feed-card'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FC } from 'react';
import { IOrderType } from '../../types/types'

interface IProfileHistoryOrders {
  orders: Array<IOrderType> | null
}

const ProfileHistoryOrders: FC<IProfileHistoryOrders> = ({ orders }) => {
  const location = useLocation();

  if (!orders) {
    return (<p className={`${style.loader} text text_type_main-medium`}>Загрузка данных...</p>)
  }

  if (orders.length === 0) {
    return (<p className={`${style.clearList} text text_type_main-medium`}>У вас еще нет заказов</p>)
  }

  return (
    <ul className={`${style.section}`}>
      {orders.map((item) => {
        return (
          <Link to={`/profile/orders/${item._id}`} key={item._id} state={{ background: location }} className={`${style.link}`}>
            <FeedCard data={item} key={item._id} profileStatus={true} />
          </Link>
        )
      }).reverse()}
    </ul>
  )
}

export default ProfileHistoryOrders