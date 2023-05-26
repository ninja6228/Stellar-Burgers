import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types.js';
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import style from './card-ingredient.module.css';
import { typeIngredient } from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';


function CardIngredient({ card, onOpen }) {
  const location = useLocation();
  const { BUN } = typeIngredient
  const { _id, type, image, name, price } = card;
  const { list, bun } = useSelector(state => state.order)

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: { ...card },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const counters = useMemo(() => {
    let ingredientsCount = list.filter((item) => item._id === _id).length;
    let counter = (type === BUN && bun && bun._id === _id ? 2 : type !== BUN && ingredientsCount ? ingredientsCount : '')
    return counter
  }, [_id, bun, list, type, BUN])

  return (
    <>
      <li className={`${style.cardIngredient__wrapperCard} ${isDrag ? style.isDrag : null}`} ref={dragRef} draggable >
        <Link to={`/ingredients/${_id}`} state={{ background: location }} >
          <img className={`${style.cardIngredient__img} ml-4 mr-4 mb-2`} src={image} alt={name} id={_id} onClick={onOpen} />
        </Link>
        <div className={style.cardIngredient__wrapperPrice} >
          <p className='text text_type_digits-default mb-2'>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={`${style.cardIngredient__name} text text_type_main-default mb-7`}>{name}</p>
        {counters ? <Counter count={counters} size="default" /> : null}
      </li >
    </>
  )
};

CardIngredient.propTypes = {
  card: PropTypes.shape(ingredientType).isRequired,
  onOpen: PropTypes.func.isRequired
};

export default CardIngredient;