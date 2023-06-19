import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import style from './order-information.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { orderType } from '../../utils/types';

const OrderInformation = ({ data, modal }) => {
  const { id } = useParams();
  const location = useLocation();
  const { ingredients } = useSelector(store => store.ingredients)
  const styles = (location.key === 'default' ? style.title : null)
  const modalStyle = modal ? style.orderModal : null;

  if (!data) {
    return <p className={`${style.loader}`}>Загрузка данных ...</p>;
  }

  const selectedOrder = data.find(item => item._id === id)
  if (!selectedOrder) return null;

  const listOrderedIngredients = selectedOrder.ingredients.filter(ingredient => ingredient != null).map(item => {
    return ingredients.find(el => el._id === item)
  });

  const totalPrice = listOrderedIngredients.reduce((sum, item) => sum + item.price, 0)

  const listUniqueIngradients = [...new Set(listOrderedIngredients)]

  const statusOrder =
    (selectedOrder.status === 'done') ? (<p className={`text text_type_main-default text_color_success mt-2`}>Выполнен</p>) :
      (selectedOrder.status === 'pending') ? (<p className={`text text_type_main-default mt-2`}>Готовится</p>) :
        (selectedOrder.status === 'created') ? (<p className={`text text_type_main-default mt-2`}>Создан</p>) : null

  return (
    <section className={`${style.container} ${modalStyle} mt-15`}>
      <h2 className={`${styles} text text_type_digits-default`}>#{selectedOrder.number}</h2>
      <h2 className={`text text_type_main-medium  mt-10`}>{selectedOrder.name}</h2>
      {statusOrder}
      <h3 className={`text text_type_main-medium mt-15 mb-6`}>Состав:</h3>
      <ul className={`${style.block__ingredients}`}>
        {listUniqueIngradients.map((item, index) => {
          return (
            <li key={index} className={`${style.block__ingredient} mb4`}>
              <div className={`${style.block__ingredient__wrapper__img}`}>
                <img src={item.image_mobile} alt={item.name} className={`${style.block__ingredient__img}`} />
              </div>
              <p className="text text_type_main-default mr-4 ml-4">{item.name}</p>
              <div className={`${style.block__ingredient__count} mr-6`}>
                <p className="text text_type_digits-default mr-2">{listOrderedIngredients.filter(el => el._id === item._id).length}</p>
                <p className="text text_type_digits-default mr-2">x {item.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          )
        })}
      </ul>
      <div className={`${style.block__info} mt-10`}>
        <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(selectedOrder.createdAt)} /> i-GMT+3</p>
        <div className={`${style.block__info_price}`}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section >
  )
}

OrderInformation.propTypes = {
  modal: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape(orderType))
}

export default OrderInformation