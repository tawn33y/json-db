import { readJsonFile, writeJsonFile } from './files';
import { Store, FreeFormObject } from './store.types';

const readFromStore = (
  state: FreeFormObject, key: string,
): any => (key === '*' ? state : state[key] || undefined);

const updateStore = (state: FreeFormObject, key: string, data: any): FreeFormObject => ({
  ...state,
  [key]: data,
});

const deleteFromStore = (state: FreeFormObject, key: string): FreeFormObject => {
  if (key === '*') return {};

  const { [key]: deletedKey, ...rest } = state;

  return rest;
};

export const createStore = (
  filePath: string, persistInterval: number = 2000,
): Promise<Store> => new Promise((resolve, reject) => readJsonFile(filePath).then((data) => {
  let state = { ...data };
  let valueHasChanged = false;

  setInterval(() => {
    if (!valueHasChanged) return;

    writeJsonFile(filePath, state)
      .then(() => console.log('[✔️] store updated'))
      .catch((err) => console.log('[ERR] store failed to updated', err))
      .finally(() => {
        valueHasChanged = false;
      });
  }, persistInterval);

  resolve({
    get: (key) => readFromStore(state, key),
    set: (key, newData) => {
      state = updateStore(state, key, newData);
      valueHasChanged = true;
    },
    del: (key) => {
      state = deleteFromStore(state, key);
      valueHasChanged = true;
    },
  });
}).catch((err) => reject(err)));
