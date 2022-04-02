# Global Objects
All the methods/packages/classes below will be defined globals, so you do not need to import them. you can simply use it in any SSR block/server script.

# Classes
### dump
A proxy to console, but only prints if the framework runs in development mode 
### LocalSql
Easy way to use SQL Light, inside the project

Base on [sql.js](https://github.com/sql-js/sql.js)
```typescript
export default class LocalSql {
    savePath: string; //where the DataBase will be saved, the default is '/SystemSave/DataBase.db'
    hadChange: Boolean // this filed will auto-update with methods below. this determines if the file needs to update in the next check
    db: Database;
    
    //checkIntervalMinutes - check if db change and save to file
    constructor(savePath?: string, checkIntervalMinutes = 10);

    //load the db - if the folder not exists create it
    load(): Promise<void>;

    //templeate functions
    insert(queryArray: string[], ...valuesArray: any[]): number | bigint;
    affected(queryArray: string[], ...valuesArray: any[]): number;
    select(queryArray: string[], ...valuesArray: any[]): any[];
    selectOne(queryArray: string[], ...valuesArray: any[]): any;
}
```

With template functions can simply do this, without being afraid of SQL injection

```js
const myDB = new LocalSql();
await myDB.load();

const newId = myDB.insert `insert into users (name, age) values(${Post.name}, ${Post.age})`;

write(`<p>Your userId is: ${newId}</p>`);
```