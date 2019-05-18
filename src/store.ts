import { readJsonFile, writeJsonFile } from './files';
import { Store } from './interface';

export const createStore = (filePath: string, persistInterval: number = 2000): Promise<Store> => 
  new Promise((resolve, reject) => readJsonFile(filePath).then((data) => {
    let state = { ...data };
    let valueHasChanged = false;

    setInterval(() => {
      if (!valueHasChanged) { return; }

      writeJsonFile(filePath, state)
        .then(() => console.log('@@ store updated'))
        .catch((err) => console.log('!! store failed to updated', err))
        .finally(() => valueHasChanged = false);
    }, persistInterval);

    resolve({
      get: (key: string): any => readFromStore(state, key),
      set: (key: string, data: any): void => {
        state = updateStore(state, key, data);
        valueHasChanged = true;
      },
      del: (key: string): void => {
        state = deleteFromStore(state, key);
        valueHasChanged = true;
      },
    });
  }).catch((err) => reject(err))
);

const readFromStore = (state: object, key: string): any => key === '*' ? state : state[key] || undefined;

const updateStore = (state: object, key: string, data: any): object => {
  return {
    ...state,
    [key]: data,
  };
};

const deleteFromStore = (state: object, key: string): object => {
  if (key === '*') {
    return {};
  } else {
    return Object.keys(state)
            .filter(k => k !== key)
            .reduce((acc, k) => {
              acc[k] = state[k];
              return acc;
            }, {});
  };
};
