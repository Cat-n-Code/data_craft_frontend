import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { datasetsStoreName, filesStoreName, useDbStore } from "./db-store";

export interface DatasetInfo {
  id: number;
  name: string;
  fieldsCount: number;
  fileId: number;
}

export const useDatasetStore = defineStore("datasets", () => {
  const datasets: Ref<DatasetInfo[] | null> = ref(null);

  async function load() {
    const db = await useDbStore().db();
    return await new Promise((resolve, reject) => {
      let request = db
        .transaction([datasetsStoreName], "readonly")
        .objectStore(datasetsStoreName)
        .getAll();

      request.onsuccess = () => {
        datasets.value = request.result as DatasetInfo[];
        resolve(null);
      };

      request.onerror = (ev) => {
        reject(ev);
      };
    });
  }

  async function addEmpty() {
    if (datasets.value === null) {
      await load();
    }

    const db = await useDbStore().db();

    return new Promise<void>((resolve, reject) => {
      const t = db.transaction(
        [filesStoreName, datasetsStoreName],
        "readwrite"
      );

      const request = t.objectStore(filesStoreName).add({ blob: new Blob() });

      request.onsuccess = () => {
        const info = {
          name: "Новая таблица",
          fieldsCount: 0,
          fileId: request.result as number,
        };
        const addRequest = t.objectStore(datasetsStoreName).add(info);

        addRequest.onsuccess = () => {
          datasets.value = [
            ...datasets.value!,
            { id: addRequest.result as number, ...info },
          ];
          resolve();
        };

        addRequest.onerror = (ev) => {
          reject(ev);
        };
      };

      request.onerror = (ev) => {
        reject(ev);
      };
    });
  }

  async function addFromFile() {
    if (datasets.value === null) {
      await load();
    }

    const db = await useDbStore().db();

    const input = document.createElement("input");
    input.accept = ".csv,.json";
    input.type = "file";

    return new Promise<void>((resolve, reject) => {
      input.onchange = async () => {
        const f = input.files?.[0];
        if (!f) {
          return reject(new Error("No file selected"));
        }

        const t = db.transaction(
          [filesStoreName, datasetsStoreName],
          "readwrite"
        );

        const request = t.objectStore(filesStoreName).add({ blob: f });

        request.onsuccess = () => {
          const info = {
            name: f.name,
            fieldsCount: 0,
            fileId: request.result as number,
          };
          const addRequest = t.objectStore(datasetsStoreName).add(info);

          addRequest.onsuccess = () => {
            datasets.value = [
              ...datasets.value!,
              { id: addRequest.result as number, ...info },
            ];
            resolve();
          };

          addRequest.onerror = (ev) => {
            reject(ev);
          };
        };

        request.onerror = (ev) => {
          reject(ev);
        };
      };

      input.click();
    });
  }

  async function updateById(
    id: number,
    info: { name: string; fieldsCount: number }
  ) {
    if (datasets.value === null) {
      await load();
    }

    const db = await useDbStore().db();

    return new Promise<void>((resolve, reject) => {
      const t = db.transaction([datasetsStoreName], "readwrite");
      const store = t.objectStore(datasetsStoreName);
      const request = store.get(id);

      request.onsuccess = () => {
        const dataset = request.result as DatasetInfo | undefined;
        if (!dataset) {
          return reject(new Error(`Dataset with id ${id} not found`));
        }

        dataset.name = info.name;
        dataset.fieldsCount = info.fieldsCount;

        const updateRequest = store.put(dataset);

        updateRequest.onsuccess = () => {
          if (datasets.value) {
            const index = datasets.value.findIndex((d) => d.id === id);
            if (index !== -1) {
              datasets.value[index] = dataset;
            }
          }
          resolve();
        };

        updateRequest.onerror = (ev) => {
          reject(ev);
        };
      };

      request.onerror = (ev) => {
        reject(ev);
      };
    });
  }

  async function removeById(id: number) {
    if (datasets.value === null) {
      await load();
    }

    const db = await useDbStore().db();

    return new Promise<void>((resolve, reject) => {
      const t = db.transaction(
        [datasetsStoreName, filesStoreName],
        "readwrite"
      );
      const store = t.objectStore(datasetsStoreName);
      const request = store.get(id);

      request.onsuccess = () => {
        const dataset = request.result as DatasetInfo | undefined;
        if (!dataset) {
          return reject(new Error(`Dataset with id ${id} not found`));
        }

        const fileId = dataset.fileId;

        const deleteRequest = store.delete(id);

        deleteRequest.onsuccess = () => {
          const deleteFileRequest = t
            .objectStore(filesStoreName)
            .delete(fileId);

          deleteFileRequest.onsuccess = () => {
            datasets.value = datasets.value
              ? datasets.value.filter((d) => d.id !== id)
              : null;
            resolve();
          };

          deleteFileRequest.onerror = (ev) => {
            reject(ev);
          };
        };

        deleteRequest.onerror = (ev) => {
          reject(ev);
        };
      };

      request.onerror = (ev) => {
        reject(ev);
      };
    });
  }

  return { datasets, load, addEmpty, addFromFile, updateById, removeById };
});
