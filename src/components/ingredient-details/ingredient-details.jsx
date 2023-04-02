import Modal from "../modal/modal";
import style from './ingredient-details.module.css'
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types.js'

function IngredientDetails({ data, active, setActive }) {
  const { name, image_large, calories, carbohydrates, fat, proteins } = data
  return (
    active && (
      <Modal active={active} setActive={setActive}>
        <h2 className={`${style.title} text text_type_main-large mt-10 ml-10 mr-10`}>Детали ингрeдиента</h2>
        <div className={style.wrapper}>
          <img src={image_large} alt={name} />
          <p className="text text_type_main-medium mt-4 mb-3">{name}</p>
          <ul className={`${style.energyValueList} mb-15`}>
            <li className={style.energyValue}>
              <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
              <p className="text text_type_digits-default text_color_inactive">{calories}</p>
            </li>
            <li className={style.energyValue}>
              <p className="text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
            </li>
            <li className={style.energyValue}>
              <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className="text text_type_digits-default text_color_inactive">{fat}</p>
            </li>
            <li className={style.energyValue}>
              <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
            </li>
          </ul>
        </div>
      </Modal>
    )
  )
};

IngredientDetails.propTypes = {
  data: PropTypes.shape(ingredientType),
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired
}

export default IngredientDetails