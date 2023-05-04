import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientType } from '../../../utils/types'
import style from './card-buns.module.css'

function CardBuns({ position, buns }) {
  const positionBun = position === 'top' ? `(верх)` : `(низ)`;
  return (
    <div className={`${style.cardBuns} mr-2 ml-8 pr-3`}>
      <ConstructorElement
        type={position}
        isLocked={true}
        text={`${buns.name} ${positionBun}`}
        price={buns.price}
        thumbnail={buns.image}
      />
    </div>
  )
};

CardBuns.propTypes = {
  position: PropTypes.string.isRequired,
  buns: PropTypes.shape(ingredientType).isRequired
};

export default CardBuns