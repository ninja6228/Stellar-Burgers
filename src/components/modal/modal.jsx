import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx'
import { REMOVE_SELECTED_INGREDIENTL } from '../../services/actions/ingredients'
const modals = document.getElementById('modals');

function Modal({ children, onClose }) {
  const dispatch = useDispatch();

  const close = () => {
    onClose()
    dispatch({
      type: REMOVE_SELECTED_INGREDIENTL
    })
  }

  useEffect(() => {
    const closePressingEsc = (evt) => {
      if (evt.key === 'Escape') {
        close()
      }
    }
    document.addEventListener("keydown", closePressingEsc)
    return () => {
      document.removeEventListener("keydown", closePressingEsc
      )
    }
  })

  function closeClickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      close()
    }
  }

  const modal = (
    <ModalOverlay clickModalOverlay={closeClickOverlay}>
      <div className={style.wrapper}>
        <div className={`${style.positionIcon} mt-15 mr-10`}>
          <CloseIcon type='primary' onClick={close} />
        </div>
        {children}
      </div>
    </ModalOverlay>)

  return createPortal(modal, modals)
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal