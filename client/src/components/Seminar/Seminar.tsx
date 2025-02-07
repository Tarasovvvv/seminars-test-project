import { Edit, Delete } from "components/index";
import styles from "./Seminar.module.scss";
import { ISeminar } from "src/types";

interface ISeminarProps {
  seminar: ISeminar;
  onEdit: () => void;
  onDelete: () => void;
}

// Компонент представляет карточку с данными по семинару
// с двумя кнопками для удаления и редактирования

function Seminar({ seminar, onEdit, onDelete }: ISeminarProps) {
  return (
    <article>
      <img src={seminar?.photo} alt={seminar.title} />
      <div className={styles.content}>
        <div>
          <h2>{seminar.title}</h2>
          <p>{seminar?.description}</p>
          <div className={styles.datatime}>
            <span>{seminar.date}</span>
            <span>{seminar.time}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.editButton} onClick={() => onEdit()}>
            <Edit />
          </button>
          <button className={styles.deleteButton} onClick={() => onDelete()}>
            <Delete />
          </button>
        </div>
      </div>
    </article>
  );
}

export default Seminar;
