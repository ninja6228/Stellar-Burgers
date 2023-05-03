import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import style from '../burger-constructor/burger-constructor.module.css'
import { ADD_INGREDIENT, ADD_BUN } from '../../services/actions/order.js'
import { randomID } from '../../utils/burger-constructor.utils.js'
import { typeIngredient } from '../../utils/constants.js'
import PurchaseAmount from '../purchase-amount/purchase-amount.jsx'
import CardBuns from '../burger-constructor-card/card-buns/card-buns.jsx';
import СardOther from '../burger-constructor-card/card-other/card-other';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { BUN } = typeIngredient
  const { list, bun } = useSelector(store => store.order)
  const uniqueId = randomID()

  const moveIngredient = (ingredient) => {
    dispatch({
      type: ingredient.type === BUN ? ADD_BUN : ADD_INGREDIENT,
      item: { ...ingredient, id: uniqueId }
    })
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      moveIngredient(item);
    }
  })

  return (
    (list.length || bun) ?
      <section className={`${style.section} mt-25 pr-4 pl-2`} ref={dropTarget} >
        {bun ? <CardBuns position={'top'} buns={bun} /> : <p className={`${style.clearList_bun} ${isHover ? style.item_isHovering : ''} text text_type_main-default`}>Выберите булочку и добавьте её сюда</p>}
        <ul className={`${style.sectionList} mt-3 pr-3`}>
          {list.length ? list.map((item, i) => { return <СardOther ingredient={item} key={i} index={i} /> })
            : <p className={`${style.clearList_ing} ${isHover ? style.item_isHovering : ''}  text text_type_main-default`}>Выберите ингредиенты и добавьте их сюда</p>}
        </ul>
        {bun ? <CardBuns position={'bottom'} buns={bun} /> : null}
        {((list.length > 0 && bun) ? (< PurchaseAmount ingredients={list} buns={bun} />) : null)}
      </section >
      :
      <section className={`${style.section} mt-25 pr-4 pl-2`} ref={dropTarget} >
        <div className={`${style.clearList} ${isHover ? style.item_isHovering : ''} text text_type_main-medium`}>Переместите сюда<br />любимую булку и ингредиенты</div>
      </section>
  )
};

export default BurgerConstructor