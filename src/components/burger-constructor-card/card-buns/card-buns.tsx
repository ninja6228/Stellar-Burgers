import { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './card-buns.module.css';
import { ITypeIngredient } from '../../../types/types'

interface ICardBuns {
  position: 'top' | 'bottom',
  buns: ITypeIngredient
}

const CardBuns: FC<ICardBuns> = ({ position, buns }) => {
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

export default CardBuns