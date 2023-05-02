import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types.js';
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import style from './card-ingredient.module.css';


function CardIngredient({ card, onOpen }) {
  const { _id, type, image, name, price } = card;
  const { list, bun } = useSelector(store => store.order)

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: { ...card },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  let ingredientsCount = list.filter((item) => item._id === _id).length;
  let counter = type === 'bun' && bun && bun._id === _id
    ? 2 : type !== 'bun' && ingredientsCount
      ? ingredientsCount : '';

  return (
    <>
      <li className={`${style.cardIngredient__wrapperCard} ${isDrag ? style.isDrag : null}`} ref={dragRef} >
        <img className={`${style.cardIngredient__img} ml-4 mr-4 mb-2`} src={image} alt={name} id={_id} onClick={onOpen} />
        <div className={style.cardIngredient__wrapperPrice} >
          <p className='text text_type_digits-default mb-2'>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={`${style.cardIngredient__name} text text_type_main-default mb-7`}>{name}</p>
        {counter ? <Counter count={counter} size="default" /> : null}
      </li>
    </>
  )
};

CardIngredient.propTypes = {
  card: PropTypes.shape(ingredientType)
};

export default CardIngredient;