# simple-jstore

*simple-jstore* is an in-memory database with automatic persistence to a JSON file.

Inspired by redis/redux, *simple-jstore* is the fastest way to create a server database for your application. It stores your app's data in an in-memory key-value store, and persists changes automatically to a JSON file.

**FEATURES**:
1) All the data is stored in-memory. Thus each read/write operation happens really fast, contrary to parsing the data from the JSON file for every read/write request.
2) Data is persisted to the JSON file only after a specified time interval to avoid multiple simultaneous writes, e.g. imagine 3000 requests all writing to the JSON file at once
3) One typical usecase for this package is in fast server deployments with minimal focus on the database, e.g. when building a data server for a frontend SPA (angular, react, vue, etc) with the objective of not spending too much time building the db (mysql, mongo, etc)

## 1. Install

```bash
npm install --save simple-jstore
```

## 2. Example usage
```
.
├── src
|   ├── store.json
|   └── index.js
```

store.json
```json
{ "users": [{ "id": 1, "name": "John Doe" }], "notes": [] }
```

index.js
```ts
(async () => {
  const store = await createStore('./store.json');

  const users = store.get('users'); // => [{ "id": 1, "name": "John Doe" }]

  const storeValue = store.get('*'); // => { "users": [{ "id": 1, "name": "John Doe" }], "notes": [] }
  
  const newUser = { id: 2, name: "Jane Doe" };
  store.set('users', [...users, newUser]);
  // store.get('users') => [{ "id": 1, "name": "John Doe" }, { "id": 2, "name": "Jane Doe" }]

  store.del('users'); 
  // store.get('users') => undefined
  // store.get('*') => { "notes": [] }

  store.del('*');
  // store.get('*') => {}
})();

```

## 3. Example usage with express
```
.
├── src
|   ├── store.json
|   └── index.js
```

store.json
```json
{ "users": [{ "id": 1, "name": "John Doe" }] }
```

index.js
```js
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

    app.get('/users/:userId', (req, res) => {
      const users = store.get('users');
      const user = users.find(id => id === userId);
      res.json(user);
    });

    app.listen(3000, () => console.log(`Server running on port ${port}`));

  })
  .catch(err => {
    console.log(err);
  });
```

## 4. API
### **```createStore(filePath: string, [persistInterval: number]): Promise<Store>```**
#### Arguments
- ```filePath``` (string, required)
  <br />The path where your JSON file will be saved.
  <br />****NOTE****: Your JSON file should contain valid JSON. An empty JSON file (with no data) should contain the following:
  ```json
  {}
  ```
- ```persistInterval``` (number, not required, default=2000)
  <br />Time in milliseconds after which changes to the store will be persisted.

#### Return value
The method returns a Promise which resolves to an object with the following methods:
- ```get``` (key: string) => any
- ```set``` (key: string, data: any) => void
- ```del``` (key: string) => void
