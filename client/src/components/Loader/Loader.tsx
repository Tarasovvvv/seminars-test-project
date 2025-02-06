import styles from "./Loader.module.scss";

/* Компонент для отображения во время состояния загрузки(лоадер) */
function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
}

export default Loader;
