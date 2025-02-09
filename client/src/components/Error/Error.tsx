import { Reload } from "components/index";
import { seminarStore } from "stores/SeminarStore";
import styles from "./Error.module.scss";

interface IErrorProps {
  isOpen: boolean;
}

function Error({ isOpen }: IErrorProps) {
  return (
    isOpen && (
      <>
        <p style={{ textAlign: "center" }}>{seminarStore.error}</p>
        <button className={styles.reloadButton} onClick={seminarStore.reload}>
          <Reload />
        </button>
      </>
    )
  );
}

export default Error;
