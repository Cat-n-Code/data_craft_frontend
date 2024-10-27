import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const datasetsStoreName = "datasets";
export const filesStoreName = "datasetsFiles";

export const useDbStore = defineStore("db", () => {
  const db: Ref<IDBDatabase | null> = ref(null);
  const awaiters: {
    resolve: (value: IDBDatabase) => void;
    reject: (reason: any) => void;
  }[] = [];

  function initDb() {
    const request = window.indexedDB.open("dataCraft");

    request.onupgradeneeded = () => {
      const db = request.result;

      db.createObjectStore(datasetsStoreName, {
        keyPath: "id",
        autoIncrement: true,
      });
      db.createObjectStore(filesStoreName, {
        keyPath: "id",
        autoIncrement: true,
      });
    };

    request.onerror = (ev) => {
      console.error("Error occurred while opening IndexedDB:\n", ev);

      for (let awaiter of awaiters) {
        awaiter.reject("");
      }
      awaiters.length = 0;
    };

    request.onsuccess = () => {
      const db = request.result;

      for (let awaiter of awaiters) {
        awaiter.resolve(db);
      }
      awaiters.length = 0;
    };
  }

  function getDb() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      if (db.value !== null) {
        resolve(db.value);
      } else {
        awaiters.push({ resolve, reject });
        if (awaiters.length === 1) {
          initDb();
        }
      }
    });
  }

  return { db: getDb };
});
