import style from './order.module.css'
import OrderInformation from '../../components/order-information/order-information';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actions';
import { wsAuthConnectionStart, wsAuthConnectionClosed } from '../../services/actions/ws-auth-actions';
import { BASE_WSS } from '../../utils/apiConfig';
import PropTypes from 'prop-types';
import { orderType } from '../../utils/types'

function Order({ data, profile }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!data) {
      if (profile) {
        dispatch(wsAuthConnectionStart(`${BASE_WSS}/orders`));
        return () => dispatch(wsAuthConnectionClosed());
      } else {
        dispatch(wsConnectionStart(`${BASE_WSS}/orders/all`));
        return () => dispatch(wsConnectionClosed());
      }
    }
  }, [dispatch]);

  return (
    <>
      {data
        ? <section className={`${style.pageOrder} mt-15`}>
          <OrderInformation data={data} />
        </section>
        : <p className={`${style.loader} text text_type_main-medium`}>Загрузка данных...</p>}
    </>
  );
}

Order.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape(orderType)),
  profile: PropTypes.bool
}

export default Order;