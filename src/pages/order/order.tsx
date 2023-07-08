import { FC, useEffect } from 'react';
import style from './order.module.css';
import OrderInformation from '../../components/order-information/order-information';
import { useDispatch } from '../../services/hooks/hooks';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actions';
import { wsAuthConnectionStart, wsAuthConnectionClosed } from '../../services/actions/ws-auth-actions';
import { BASE_WSS } from '../../utils/apiConfig';
import { IOrderType } from '../../types/types';

interface IOrder {
  data: Array<IOrderType> | null,
  profile: boolean
}

const Order: FC<IOrder> = ({ data, profile }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      dispatch(wsAuthConnectionStart(`${BASE_WSS}/orders`));
      return () => {
        dispatch(wsAuthConnectionClosed())
      };
    } else {
      dispatch(wsConnectionStart(`${BASE_WSS}/orders/all`));
      return () => {
        dispatch(wsConnectionClosed())
      };
    }
  }, [dispatch]);

  
  if (!data?.length) {
    return <p className={`${style.loader} text text_type_main-medium`}>Загрузка данных...</p>
  }

  return (
    <section className={`${style.pageOrder} mt-15`}>
      <OrderInformation data={data} modal={false} />
    </section>
  );
}

export default Order;