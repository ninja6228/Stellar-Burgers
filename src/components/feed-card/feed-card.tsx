import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo } from 'react';
import { useLocation } from "react-router-dom";
import style from './feed-card.module.css';
import { IOrderType } from '../../types/types';
import { useSelector } from '../../services/hooks/hooks';

interface IFeedCard {
  data: IOrderType,
  profileStatus: boolean
}

const FeedCard: FC<IFeedCard> = ({ data, profileStatus }) => {
  const location = useLocation();
  const { ingredients } = useSelector(store => store.ingredients);
  const { name, number, createdAt } = data;
  const orderIdList = data.ingredients;

  const listOrderedIngredients = orderIdList.map(item => {
    return ingredients.find(el => el._id === item)
  });

  const totalPrice = useMemo(() => {
    return (
      listOrderedIngredients.reduce((sum, item) => (item === undefined ? 0 : sum + item.price), 0)
    )
  }, [listOrderedIngredients])

  const counterIngradient = useMemo(() => {
    const listOrderedLength = listOrderedIngredients.length
    return (
      listOrderedLength > 6 ? listOrderedLength - 6 : null
    )
  }, [listOrderedIngredients])

  const statusOrder =
    (data.status === 'created') ? (<p className={`text text_type_main-default mt-2`}>Создан</p>) :
      (data.status === 'pending') ? (<p className={`text text_type_main-default mt-2`}>Готовится</p>) :
        (data.status === 'done') ? (<p className={`text text_type_main-default text_color_success mt-2`}>Выполнен</p>) : null

  return (
    <li className={location.pathname === '/profile/orders' ? `${style.section__profile}` : `${style.section}`}>
      <div className={`${style.block} mt-6 mb-6`}>
        <p className={`${style.number} text text_type_digits-default`}>#{number}</p>
        <p className={`${style.data} text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(createdAt)} /> i-GMT+3</p>
      </div>
      <h3 className={`${style.name} text text_type_main-medium`}>{name}</h3>
      {profileStatus ? (statusOrder) : (null)}
      <div className={`${style.block} mb-6 mt-6`}>
        <ul className={`${style.block__card}`}>
          {listOrderedIngredients.slice(0, 6).map((item, index) => {
            return (<li key={index} className={`${style.card}`} style={{ zIndex: 6 - index }}><img src={item?.image_mobile} className={style.card__img} alt={item?.name} /></li>)
          })}
          {(counterIngradient) ? (<div className={`${style.card__count} text text_type_main-default`}>+{counterIngradient}</div>) : null}
        </ul>
        <div className={`${style.block__price} ml-6`}>
          <span className={`${style.price__count} text text_type_digits-medium`}>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  )
}

export default FeedCard