import PropTypes from 'prop-types';
import style from './order-details.module.css';
import Modal from "../modal/modal";
import checkMarkIcon from "../../images/modal/checkMarkIcon.png";

function OrderDetails({ active, setActive }) {
  return (
    active && (
      <Modal active={active} setActive={setActive}>
        <div className={`${style.wrapper} mt-30 mb-30`}>
          <h2 className={`${style.number} text text_type_digits-large mb-8`}>034536</h2>
          <p className={`text text_type_main-medium mb-15`} >идентификатор заказа</p>
          <img className={`${style.img} mb-15`} src={checkMarkIcon} alt="иконка галочки" />
          <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
          <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
      </Modal>
    )
  )
}

OrderDetails.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired
}

export default OrderDetails