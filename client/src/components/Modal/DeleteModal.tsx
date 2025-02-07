import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

interface IDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const modalRoot = document.getElementById("modal-root") || document.body;

// Модалка для удаления. Просто две кнопки: удалить или отменить
function DeleteModal({ isOpen, onClose, onDelete }: IDeleteModalProps) {
  return (
    isOpen &&
    createPortal(
      <form onSubmit={onDelete} className={styles.form}>
        <h2>Удалить?</h2>
        <div className={styles.actions}>
          <button type="submit" className={styles.button}>
            Подтвердить
          </button>
          <button type="button" onClick={onClose} className={styles.button}>
            Отмена
          </button>
        </div>
      </form>,
      modalRoot
    )
  );
}

export default DeleteModal;
