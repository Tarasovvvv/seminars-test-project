import { observer } from "mobx-react-lite";
import React, { useEffect, Suspense } from "react";
import { Loader, DeleteModal, EditModal, Error } from "components/index";
import { seminarStore } from "stores/SeminarStore";
import styles from "src/App.module.scss";

const LazySeminar = React.lazy(() => import("components/Seminar/Seminar"));

const App = observer(() => {
  const { deletableId, editableId, setDeletableId, setEditableId } = seminarStore;

  useEffect(() => {
    seminarStore.reload();
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Онлайн семинары</h1>
      </header>
      <main>
        <EditModal
          isOpen={editableId !== null}
          seminar={seminarStore.findSeminarById(editableId!)!}
          onClose={() => setEditableId(null)}
          onSave={(data: any) => {
            seminarStore.patchSeminar({ ...seminarStore.findSeminarById(editableId!)!, title: data.title, description: data.description });
            setEditableId(null);
            seminarStore.reload();
          }}
        />
        <DeleteModal
          isOpen={deletableId !== null}
          onClose={() => setDeletableId(null)}
          onDelete={() => {
            seminarStore.deleteSeminar(deletableId!);
            setDeletableId(null);
            seminarStore.reload();
          }}
        />
        <Loader isOpen={seminarStore.isLoading} />
        <Error isOpen={seminarStore.error !== null} />
        <Suspense fallback={<Loader isOpen={seminarStore.isLoading} />}>
          {seminarStore.seminars?.map((item) => (
            <LazySeminar key={item.id} seminar={item} onEdit={() => setEditableId(item.id)} onDelete={() => setDeletableId(item.id)} />
          ))}
        </Suspense>
      </main>
    </div>
  );
});

export default App;
