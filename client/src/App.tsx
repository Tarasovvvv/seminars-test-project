import React, { useEffect, useState, Suspense } from "react";
import { Loader, DeleteModal, EditModal, Reload } from "components/index";
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

  const handleDeleteSeminar = async (id: number): Promise<void> => {
    if (!seminars) return;
    try {
      const reposnse = await seminarApi.deleteSeminar(id);
      const deletedSeminar: Nullable<{}> = reposnse.data;
      if (deletedSeminar) {
        setSeminars((prevSeminars) => prevSeminars!.filter((seminar) => seminar.id !== deletableId));
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
            (deletableId && (
              <DeleteModal
                isOpen={deletableId !== null}
                onClose={() => setDeletableId(null)}
                onDelete={() => {
                  handleDeleteSeminar(deletableId);
                  setDeletableId(null);
                  reload();
                }}
              />
            ))
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
                  <Reload />
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
