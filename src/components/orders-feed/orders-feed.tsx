import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FC } from 'react'
import style from './orders-feed.module.css';
import FeedCard from '../feed-card/feed-card';
import { IOrderType } from '../../types/types';

interface IOrdersFeed {
  orders: Array<IOrderType>
}

const OrdersFeed: FC<IOrdersFeed> = ({ orders }) => {
  const location = useLocation()
  
  if (!orders.length) {
    return <p className={`${style.loader} text text_type_digits-default`}>Загрузка данных ...</p>
  }

  return (
    <ul className={`${style.section}`}>
      {orders.map((item) =>
        <Link to={`/feed/${item._id}`} state={{ background: location }} key={item._id} className={`${style.link}`}>
          <FeedCard data={item} profileStatus={false} />
        </Link>)}
    </ul>
  )
}

export default OrdersFeed 