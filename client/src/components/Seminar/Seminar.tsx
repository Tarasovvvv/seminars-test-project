import styles from "./Seminar.module.scss";
import { ISeminar } from "src/types";

interface ISeminarProps {
  seminar: ISeminar;
  onEdit: () => void;
  onDelete: () => void;
}

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 3 24 21"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M5 18l11-11 3 3-11 11-4 1 1-4z" />
            </svg>
          </button>
          <button className={styles.deleteButton} onClick={() => onDelete()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 21"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default Seminar;
