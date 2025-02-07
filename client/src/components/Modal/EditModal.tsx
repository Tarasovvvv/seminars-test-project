import { useForm } from "react-hook-form";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./Modal.module.scss";
import { ISeminar } from "src/types";

interface IEditModalProps {
  isOpen: boolean;
  seminar: ISeminar;
  onClose: () => void;
  onSave: (data: any) => void;
}

const modalRoot = document.getElementById("modal-root") || document.body;

// Модалка для редактирования
function EditModal({ isOpen, seminar, onClose, onSave }: IEditModalProps) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur" });
  // Форма дает редактировать только title и description, потому что дата
  // и время обычно не меняются после создания. Фото если хотим менять, то надо где то его хранить,
  // а тут json server просто(а ссылку вставлять как-то некрасиво), поэтому тоже нет. Id вобще
  // менять нельзя. Как итог, эти два поля только и можно по логике тут редактировать
  return (
    isOpen &&
    createPortal(
      <form onSubmit={handleSubmit(onSave)} className={styles.form}>
        <label>
          Название
          <input
            {...register("title", {
              required: "Необходимо заполнить",
              minLength: {
                value: 10,
                message: "Минимум 10 символов",
              },
            })}
            placeholder="Новое название"
            defaultValue={seminar.title}
          ></input>
          {errors?.title && <p style={{ color: "red", margin: "0" }}>{(errors!.title.message as string) || "Ошибка"}</p>}
        </label>
        <label>
          Описание
          <textarea {...register("description")} placeholder="Новое описание" defaultValue={seminar.description} />
        </label>

        <div className={styles.actions}>
          <button
            type="submit"
            disabled={!isValid}
            className={clsx(styles.button, {
              [""]: isValid,
              [styles.disabledButton]: !isValid,
            })}
          >
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

export default EditModal;
