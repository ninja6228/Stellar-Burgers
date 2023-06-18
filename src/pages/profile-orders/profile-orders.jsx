import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileHistoryOrders from '../../components/profile-history-orders/profile-history-orders';
import style from './profile-orders.module.css'
import { wsAuthConnectionStart, wsAuthConnectionClosed } from '../../services/actions/ws-auth-actions';
import { BASE_WSS } from '../../utils/apiConfig';

function ProfileOrders() {
  const dispatch = useDispatch();
  const { authOrders } = useSelector(state => state.wsAuthOrders);
  
  useEffect(() => {
    dispatch(wsAuthConnectionStart(`${BASE_WSS}/orders`));
    return () => dispatch(wsAuthConnectionClosed());
  }, [dispatch]);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.history__wrapper}`}>
        <ProfileHistoryOrders orders={authOrders} />
      </div>
    </div>
  )
}

export default ProfileOrders