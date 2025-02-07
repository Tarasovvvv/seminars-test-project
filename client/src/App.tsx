import { useEffect, useState } from "react";
import { Loader, Seminar, DeleteModal, EditModal } from "components/index";
import { ISeminar, Nullable } from "types/index";
import { seminarApi } from "api/index";
import styles from "src/App.module.scss";

function App() {
  const [seminars, setSeminars] = useState<Nullable<ISeminar[]>>(null);
  const [error, setError] = useState<Nullable<string>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editable, setEditable] = useState<Nullable<number>>(null);
  const [deletable, setDeletable] = useState<Nullable<number>>(null);

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
      <main>
        {(editable && <EditModal />) || (deletable && <DeleteModal />)}
        {(isLoading && <Loader />) ||
          (error && <p style={{ textAlign: "center" }}>{error}</p>) ||
          seminars?.map((item) => <Seminar key={item.id} seminar={item} onEdit={() => setEditable(item.id)} onDelete={() => setDeletable(item.id)} />)}
      </main>
    </div>
  );
}

export default App;
