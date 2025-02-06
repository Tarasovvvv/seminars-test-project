import { useEffect, useState } from "react";
import { Seminar, DeleteModal, EditModal } from "components/index";
import { ISeminar, Nullable } from "types/index";
import { seminarApi } from "api/index";
import "src/App.scss";

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
    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <header>
        <h1>Онлайн семинары</h1>
      </header>
      <main></main>
      <footer>
        <p style={{ margin: 5, textTransform: "uppercase", fontWeight: 500 }}>Организация</p>
        <a href="">О нас</a>
        <a href="">Контакты</a>
      </footer>
    </div>
  );
}

export default App;
