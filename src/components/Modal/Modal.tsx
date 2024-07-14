import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
      <div
        data-testid='modal-overlay'
        className={styles.modalOverlay}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
