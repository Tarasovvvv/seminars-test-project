import React, { useEffect, useState, Suspense } from "react";
import { Loader, DeleteModal, EditModal } from "components/index";
import { ISeminar, Nullable } from "types/index";
import { seminarApi } from "api/index";
import styles from "src/App.module.scss";

const LazySeminar = React.lazy(() => import("components/Seminar/Seminar"));

function App() {
  const [seminars, setSeminars] = useState<Nullable<ISeminar[]>>(null);
  const [error, setError] = useState<Nullable<string>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editableId, setEditableId] = useState<Nullable<number>>(null);
  const [deletableId, setDeletableId] = useState<Nullable<number>>(null);

  const findSeminarById = (id: number): ISeminar => {
    return seminars!.find((seminar) => seminar.id === id)!;
  };

  const reload = async (): Promise<void> => {
    setError(null);
    setIsLoading(true);
    await handleGetSeminars();
    setIsLoading(false);
  };

  const handleGetSeminars = async (): Promise<void> => {
    try {
      const reposnse = await seminarApi.getSeminars();
      setSeminars(reposnse.data);
    } catch (error) {
      setError("Ошибка при загрузке");
    }
  };

  const handlePatchSeminar = async (newSeminar: ISeminar): Promise<void> => {
    if (!seminars) return; // Если по какой-то причине семинаров у пользователя нет, то не делать запрос
    try {
      const reposnse = await seminarApi.patchSeminar(newSeminar);
      const patchedSeminar: Nullable<ISeminar> = reposnse.data;
      if (patchedSeminar) {
        setSeminars((prevSeminars) => prevSeminars!.map((seminar) => (seminar.id === patchedSeminar.id ? patchedSeminar : seminar)));
      }
    } catch (error) {
      setError("Ошибка при редактировании");
    }
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Онлайн семинары</h1>
      </header>
      <main>
        {
          // Модалки для редактирования и удаления
          (editableId && (
            <EditModal
              isOpen={editableId !== null}
              seminar={findSeminarById(editableId)}
              onClose={() => setEditableId(null)}
              onSave={(data: any) => {
                handlePatchSeminar({ ...findSeminarById(editableId), title: data.title, description: data.description });
                setEditableId(null);
                reload();
              }}
            />
          )) ||
            (deletableId && <DeleteModal />)
        }
        {
          // Контентная часть
          // Сначала размещается лоадер, т.к. данные в любом случае должны загрузиться
          (isLoading && <Loader />) ||
            // Затем ошибка, если она есть + кнопка для повторной попытки загрузить семинары
            (error && (
              <>
                <p style={{ textAlign: "center" }}>{error}</p>
                <button className={styles.reloadButton} onClick={reload}>
                  <svg fill="currentColor" width="2em" height="2em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1,12A11,11,0,0,1,17.882,2.7l1.411-1.41A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707l1.128-1.128A8.994,8.994,0,0,0,3,12a1,1,0,0,1-2,0Zm21-1a1,1,0,0,0-1,1,9.01,9.01,0,0,1-9,9,8.9,8.9,0,0,1-4.42-1.166l1.127-1.127A1,1,0,0,0,8,17H4a1,1,0,0,0-1,1v4a1,1,0,0,0,.617.924A.987.987,0,0,0,4,23a1,1,0,0,0,.707-.293L6.118,21.3A10.891,10.891,0,0,0,12,23,11.013,11.013,0,0,0,23,12,1,1,0,0,0,22,11Z"></path>
                  </svg>
                </button>
              </>
            )) || (
              // Если все ок, то отображаются карточки с семинарами
              <Suspense fallback={<Loader />}>
                {
                  // Саспензия для отложенной загрузки, т.к. карточек с семинарами может быть много
                  seminars?.map((item) => (
                    <LazySeminar key={item.id} seminar={item} onEdit={() => setEditableId(item.id)} onDelete={() => setDeletableId(item.id)} />
                  ))
                }
              </Suspense>
            )
        }
      </main>
    </div>
  );
}

export default App;
