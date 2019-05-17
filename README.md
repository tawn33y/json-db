# simple-jstore

simple-jstore is an in-memory database with automatic persistence to a JSON file. It is the fastest way to create a database for your application, especially if you do not have time to create a database using mysql, mongo, etc.

Inspired by redis/redux, simple-jstore stores your app's data in an in-memory store, and persists changes automatically to a JSON file only after a specified time interval (instead of on every store change)

## 1. Install

```bash
npm i simple-jstore
```

## 2. Example usage with express
```ts
import * as express from 'express';
import { createStore } from 'simple-jstore';

const app = express();
const port = 3000;

createStore('./store.json')
  .then(store => {

    app.get('/users', (req, res) => {
      const users = store.get('users');
      res.json(users);
    });

    app.listen(3000, () => console.log(`Server running on port ${port}`));

  })
  .catch(err => {
    console.log(err);
  });
```

## 3. Method Syntax
```ts
createStore(filePath: string, [persistInterval: number]): Promise<Store>
```

## 4. Arguments
- **filePath**: The path where your JSON file will be saved.
  <br />****NOTE****: Your JSON file should contain valid JSON. If you do not have any data, create a new file with {} as the only content,
  <br />e.g.
  ```bash
  touch store.json
  vi store.json
  
  ## in vim, enter the following
  {}

  ## esc, save and exit
  :wq
  ```
- **persistInterval**: *optional*, time in milliseconds after which changes to the store will be persisted

## 5. Return value
Calling the method returns a Promise which resolves to an object with the following methods:
- get
  ```ts
  get(key: string): any
  ```
- set
  ```ts
  set(key: string, data: any): void
  ```
- del
  ```ts
  del(key: string): void
  ```