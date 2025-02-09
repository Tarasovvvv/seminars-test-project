import styles from "./Loader.module.scss";

interface ILoaderProps {
  isOpen: boolean;
}

// Компонент для отображения во время состояния загрузки(лоадер)
function Loader({ isOpen }: ILoaderProps) {
  return (
    isOpen && (
      <div className={styles.loader}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    )
  );
}

export default Loader;
