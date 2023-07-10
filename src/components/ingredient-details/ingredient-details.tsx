import { FC } from 'react';
import { useParams, useLocation } from "react-router-dom";
import style from './ingredient-details.module.css'
import { useSelector } from '../../services/hooks/hooks';

const IngredientDetails: FC = () => {
  const location = useLocation();
  const { id } = useParams();
  const { ingredients } = useSelector(state => state.ingredients)
  const ingredient = ingredients.find(item => item._id === id);
  const pageIngredients = location.key === 'default'

  return (
    <>
      {ingredient && (
        <>
          {pageIngredients ?
            <h2 className={`${style.title} text text_type_main-large mt-30 ml-10 mr-10`}>Детали ингрeдиента</h2>
            :
            <h2 className={`${style.title} text text_type_main-large mt-10 ml-10 mr-10`}>Детали ингрeдиента</h2>
          }
          <div className={style.wrapper}>
            <img src={ingredient.image_large} alt={ingredient.name} />
            <p className="text text_type_main-medium mt-4 mb-3">{ingredient.name}</p>
            <ul className={`${style.energyValueList} mb-15`}>
              <li className={style.energyValue}>
                <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
              </li>
              <li className={style.energyValue}>
                <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
              </li>
              <li className={style.energyValue}>
                <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
              </li>
              <li className={style.energyValue}>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  )
}


export default IngredientDetails