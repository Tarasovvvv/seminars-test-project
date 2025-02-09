import { makeAutoObservable, runInAction, action } from "mobx";
import { seminarApi } from "api/index";
import { ISeminar, Nullable } from "types/index";

class SeminarStore {
  seminars: Nullable<ISeminar[]> = null;
  error: Nullable<string> = null;
  isLoading: boolean = true;
  editableId: Nullable<number> = null;
  deletableId: Nullable<number> = null;

  findSeminarById(id: number): ISeminar | undefined {
    return this.seminars?.find((seminar) => seminar.id === id);
  }

  setEditableId(id: Nullable<number>) {
    this.editableId = id;
  }

  setDeletableId(id: Nullable<number>) {
    this.deletableId = id;
  }

  async reload() {
    runInAction(() => {
      this.error = null;
      this.isLoading = true;
    });
    await this.getSeminars();
    runInAction(() => {
      this.isLoading = false;
    });
  }

  async getSeminars() {
    try {
      const response = await seminarApi.getSeminars();
      runInAction(() => {
        this.seminars = response.data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Ошибка при загрузке";
      });
    }
  }

  async patchSeminar(newSeminar: ISeminar) {
    if (!this.seminars) return;
    try {
      const response = await seminarApi.patchSeminar(newSeminar);
      const patchedSeminar = response.data;
      if (patchedSeminar) {
        runInAction(() => {
          this.seminars = this.seminars!.map((seminar) => (seminar.id === patchedSeminar.id ? patchedSeminar : seminar));
        });
      }
    } catch (error) {
      runInAction(() => {
        this.error = "Ошибка при редактировании";
      });
    }
  }

  async deleteSeminar(id: number) {
    if (!this.seminars) return;
    try {
      const response = await seminarApi.deleteSeminar(id);
      runInAction(() => {
        if (response.data) {
          this.seminars = this.seminars!.filter((seminar) => seminar.id !== id);
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Ошибка при удалении";
      });
    }
  }

  constructor() {
    makeAutoObservable(this, {
      reload: action.bound,
      setEditableId: action.bound,
      setDeletableId: action.bound,
      getSeminars: action.bound,
      patchSeminar: action.bound,
      deleteSeminar: action.bound,
    });
  }
}

export const seminarStore = new SeminarStore();
