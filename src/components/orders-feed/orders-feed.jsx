import style from './orders-feed.module.css';
import FeedCard from '../../components/feed-card/feed-card';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { orderType } from '../../utils/types';

const OrdersFeed = ({ orders }) => {
  const location = useLocation()

  if (!orders) {
    return <p className={`${style.loader} text text_type_digits-default`}>Загрузка данных ...</p>
  }
  
  return (
    <ul className={`${style.section}`}>
      {orders?.map((item) =>
        <Link to={`/feed/${item._id}`} state={{ background: location }} key={item._id} className={`${style.link}`}>
          <FeedCard data={item} profileStatus={false} />
        </Link>)}
    </ul>
  )
}

OrdersFeed.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape(orderType))
}

export default OrdersFeed 