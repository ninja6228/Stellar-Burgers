import PropTypes from 'prop-types';
import style from './modal-overlay.module.css'


function ModalOverlay({ children, clickModalOverlay }) {
  return (
    <div className={style.overlay} onMouseDown={clickModalOverlay}>
      {children}
    </div>
  )
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  clickModalOverlay: PropTypes.func.isRequired
};

export default ModalOverlay