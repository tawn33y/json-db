import * as fs from 'fs';

export const readJsonFile = (path: string): Promise<object> => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data: Buffer): void => {
    if (err) {
      return reject(err);
    }

    try {
      const json = JSON.parse(data.toString());
      resolve(json);
    } catch (err) {
      return reject(err);
    }
  });
});

export const writeJsonFile = (path: string, data: any): Promise<void> => new Promise((resolve, reject) => {
  const json = JSON.stringify(data);
  
  fs.writeFile(path, json, (err): void => {
    if (err) {
      return reject(err);
    }

    resolve();
  });
});
