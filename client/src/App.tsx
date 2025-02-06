import { useState } from "react";
import { Seminar, ModalDelete, ModalEdit } from "@components/index";
import "@/App.scss";

const SEMINAR_API_URL: string = "http://localhost:3000/seminars";

function App() {
  const [count, setCount] = useState(0);

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
