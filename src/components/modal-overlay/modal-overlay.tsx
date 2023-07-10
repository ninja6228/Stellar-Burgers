import { FC, ReactNode, MouseEvent } from "react";
import style from './modal-overlay.module.css'

interface IModalOverlay {
  children: ReactNode,
  clickModalOverlay: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({ children, clickModalOverlay }) => {

  const closeClickOverlay = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      clickModalOverlay()
    }
  }
  return (
    <div className={style.overlay} onMouseDown={closeClickOverlay}>
      {children}
    </div>
  )
};

export default ModalOverlay