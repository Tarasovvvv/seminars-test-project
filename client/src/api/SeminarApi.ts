import { ISeminar, Nullable } from "types/index";
import axios from "axios";

/* Класс для создания и использования инстансов аксиоса, слушающего json server
 *
 * Содержит стандартные CRUD операции:
 *   получение get;
 *   изменение patch(сделал именно его, потому что дата и время обычно не меняются, следовательно изменения всегда частичные);
 *   удаление delete.
 */
class SeminarApi {
  private instance: Axios.AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getSeminars() {
    return this.instance.get<Nullable<ISeminar[]>>("seminars");
  }

  async patchSeminar(seminar: ISeminar) {
    return this.instance.patch<Nullable<ISeminar>>(`seminars/${seminar.id}`, seminar);
  }

  async deleteSeminar(id: number) {
    return this.instance.delete(`seminars/${id}`);
  }
}

export const seminarApi = new SeminarApi();
