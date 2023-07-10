import { FC, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../../services/hooks/hooks';
import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../../../utils/constants/orders'
import style from './card-other.module.css'
import { ITypeIngredient } from '../../../types/types.js'


interface ICardOther {
  index: number,
  ingredient: ITypeIngredient
}

const СardOther: FC<ICardOther> = ({ ingredient, index }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: MOVE_INGREDIENT,
      dragIndex,
      hoverIndex
    })
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'sortable',
    item: () => {
      return { ...ingredient, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  const [, drop] = useDrop({
    accept: 'sortable',
    hover(item: ICardOther, monitor: any) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (!ref.current || dragIndex === hoverIndex) {
        return null;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
        return null;
      }
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex
    },
  });
  drag(drop(ref))

  const handleRemoveIngredient = () => {
    dispatch({
      type: REMOVE_INGREDIENT,
      id: ingredient.uniqueId
    })
  }

  return (
    <li className={`${style.cardIngredient} mb-4`} style={{ opacity: opacity }} ref={ref}>
      <div className={`${style.cardIngredient__icon} ml-2`}>
        <DragIcon type='primary' />
      </div>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleRemoveIngredient}
      />
    </li >
  )
};

export default СardOther