import { createPortal } from "react-dom";
import { FC, ReactNode, useEffect, } from "react";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay'

interface IModal {
  children: ReactNode
  onClose: () => void 
}

const modals = document.getElementById('modals') as HTMLElement;

const Modal: FC<IModal> = ({ children, onClose }) => {

  useEffect(() => {
    const closePressingEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener("keydown", closePressingEsc)
    return () => {
      document.removeEventListener("keydown", closePressingEsc
      )
    }
  }, [])


  const modal = (
    <ModalOverlay clickModalOverlay={onClose}>
      <div className={style.wrapper}>
        <div className={`${style.positionIcon} mt-15 mr-10`}>
          <CloseIcon type='primary' onClick={onClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>)

  return createPortal(modal, modals)
};

export default Modal