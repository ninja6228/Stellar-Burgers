import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx'

const modals = document.getElementById('modals');

function Modal({ children, onClose }) {

  useEffect(() => {
    const closePressingEsc = (evt) => {
      if (evt.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener("keydown", closePressingEsc)
    return () => {
      document.removeEventListener("keydown", closePressingEsc
      )
    }
  }, [])

  const closeClickOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose()
    }
  }

  const modal = (
    <ModalOverlay clickModalOverlay={closeClickOverlay}>
      <div className={style.wrapper}>
        <div className={`${style.positionIcon} mt-15 mr-10`}>
          <CloseIcon type='primary' onClick={onClose} />
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