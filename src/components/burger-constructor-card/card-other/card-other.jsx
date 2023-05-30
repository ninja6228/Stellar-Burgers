import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useRef } from 'react';
import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../../../services/actions/order.js'
import { useDrop, useDrag } from "react-dnd";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../../utils/types.js'
import style from './card-other.module.css'

function СardOther({ ingredient, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const moveCardHandler = (dragIndex, hoverIndex) => {
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
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
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

СardOther.propTypes = {
  ingredient: PropTypes.shape(ingredientType).isRequired,
  index: PropTypes.number.isRequired
}

export default СardOther