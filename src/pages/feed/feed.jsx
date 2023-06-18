import { useEffect } from 'react';
import style from './feed.module.css'
import { useDispatch, useSelector } from 'react-redux';
import OrdersStatus from '../../components/orders-status/orders-status'
import OrdersFeed from '../../components/orders-feed/orders-feed'
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actions'
import { BASE_WSS } from '../../utils/apiConfig';

function Feed() {
  const dispatch = useDispatch();
  const { total, totalToday, orders } = useSelector(state => state.wsOrders);

  useEffect(() => {
    dispatch(wsConnectionStart(`${BASE_WSS}/orders/all`));
    return () => dispatch(wsConnectionClosed());
  }, [dispatch]);

  return (
    <div className={`${style.container}`}>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>Лента заказов</h1>
      <div className={`${style.wrapper}`}>
        <section className={`${style.section__card}`}>
          <OrdersFeed orders={orders} />
        </section>
        <section className={`${style.section}`}>
          <div className={`${style.section__status}`}>
            <div className={`${style.section__status__wrapper} mr-9`}>
              <h3 className={`text text_type_main-medium mb-6`}>Готовы:</h3>
              <ul className={`${style.section__status__wrapper__numer}`}>
                <OrdersStatus status={'done'} orders={orders} />
              </ul>
            </div>
            <div className={`${style.section__status__wrapper}`}>
              <h3 className={`text text_type_main-medium mb-6`}>В работе:</h3>
              <ul className={`${style.section__status__wrapper__numer}`}>
                <OrdersStatus status={'pending'} orders={orders} />
              </ul>
            </div>
          </div>
          <h3 className={`text text_type_main-medium mt-15`}>Выполнено за все время: </h3>
          <p className={`${style.section__status__quantity} text text_type_digits-large`}>{total}</p>
          <h3 className={`text text_type_main-medium mt-15`}>Выполнено за сегодня:</h3>
          <p className={`${style.section__status__quantity} text text_type_digits-large`}>{totalToday}</p>
        </section>
      </div >
    </div >
  );
}

export default Feed;