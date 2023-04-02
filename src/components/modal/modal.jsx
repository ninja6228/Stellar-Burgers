import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx'


function Modal({ children, active, setActive }) {
  const modals = document.getElementById('modals');
  const modal = active && (
    <ModalOverlay clickModalOverlay={closeClickOverlay}>
      <div className={style.wrapper}>
        <div className={`${style.positionIcon} mt-15 mr-10`}>
          <CloseIcon type='primary' onClick={closeModal} />
        </div>
        {children}
      </div>
    </ModalOverlay>
  )

  useEffect(() => {
    document.addEventListener("keydown", closePressingEsc)
    return () => {
      document.removeEventListener("keydown", closePressingEsc)
    }
  })

  function closeModal() {
    return active ? setActive(false) : null
  }

  function closePressingEsc(evt) {
    return evt.key === 'Escape' ? closeModal() : null
  }

  function closeClickOverlay(evt) {
    return evt.target === evt.currentTarget ? closeModal() : null
  }

  return createPortal(modal, modals)
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired
}

export default Modal