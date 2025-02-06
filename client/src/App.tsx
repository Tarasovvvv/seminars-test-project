import { useEffect, useState } from "react";
import { Loader, Seminar, DeleteModal, EditModal } from "components/index";
import { ISeminar, Nullable } from "types/index";
import { seminarApi } from "api/index";
import styles from "src/App.module.scss";

function App() {
  const [seminars, setSeminars] = useState<Nullable<ISeminar[]>>(null);
  const [error, setError] = useState<Nullable<string>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reposnse = await seminarApi.getSeminars();
        setSeminars(reposnse.data);
      } catch (error) {
        setError("Ошибка при загрузке");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Онлайн семинары</h1>
      </header>
      <main>{isLoading && <Loader />}</main>
      <footer className={styles.footer}>
        <p style={{ margin: 5, textTransform: "uppercase", fontWeight: 500 }}>Организация</p>
        <a href="">О нас</a>
        <a href="">Контакты</a>
      </footer>
    </div>
  );
}

export default App;
