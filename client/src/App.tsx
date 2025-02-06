import { useState } from "react";
import { ISeminar, Nullable } from "types/index";
import "src/App.scss";

function App() {
  const [seminars, setSeminars] = useState<Nullable<ISeminar[]>>(null);

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
