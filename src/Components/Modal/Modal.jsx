import PropTypes from "prop-types";

export default Modal;

import styles from "./Modal.module.css";

function Modal({ children, style }) {
  return (
    <div className={styles.ModalContainer} style={style}>
      {children}
    </div>
  );
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};
