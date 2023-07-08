import { FC } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import style from '../burger-constructor/burger-constructor.module.css';
import { ADD_INGREDIENT, ADD_BUN } from '../../utils/constants/orders';
import { typeIngredient } from '../../utils/constants/type-ingredient';
import PurchaseAmount from '../purchase-amount/purchase-amount';
import CardBuns from '../burger-constructor-card/card-buns/card-buns';
import СardOther from '../burger-constructor-card/card-other/card-other';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { ITypeIngredient } from "../../types/types";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { BUN } = typeIngredient
  const { list, bun } = useSelector(store => store.order)

  const moveIngredient = (ingredient: ITypeIngredient) => {
    dispatch({
      type: ingredient.type === BUN ? ADD_BUN : ADD_INGREDIENT,
      item: { ...ingredient, uniqueId: uuidv4() }
    })
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item: any) {
      moveIngredient(item);
    }
  })

  return (
    (list.length || bun) ?
      <section className={`${style.section} mt-25 pr-4 pl-2`} ref={dropTarget} >
        {bun ? <CardBuns position={'top'} buns={bun} /> : <p className={`${style.clearList_bun} ${isHover ? style.item_isHovering : ''} text text_type_main-default`}>Выберите булочку и добавьте её сюда</p>}
        <ul className={`${style.sectionList} mt-3 pr-3`}>
          {list.length ? list.map((item, i) => { return <СardOther ingredient={item} key={item.uniqueId} index={i} /> })
            : <p className={`${style.clearList_ing} ${isHover ? style.item_isHovering : ''}  text text_type_main-default`}>Выберите ингредиенты и добавьте их сюда</p>}
        </ul>
        {bun ? <CardBuns position={'bottom'} buns={bun} /> : null}
        {((list.length > 0 && bun) ? (<PurchaseAmount ingredients={list} buns={bun} />) : null)}
      </section >
      :
      <section className={`${style.section} mt-25 pr-4 pl-2`} ref={dropTarget} >
        <div className={`${style.clearList} ${isHover ? style.item_isHovering : ''} text text_type_main-medium`}>Переместите сюда<br />любимую булку и ингредиенты</div>
      </section>
  )
};

export default BurgerConstructor