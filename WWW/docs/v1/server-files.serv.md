# How to add a server script

Files that end with '.serv.js' or '.serv.ts' (When TypeScript enabled) will not be visible as normal text files and can only be imported by the server.

## Import on start
If you need file to be imported as the server start you can add the path to the Settings file

Setting file will search the file in the WWW folder
```js
general: {
    importOnLoad: ["OnStart.serv.ts"]
}
```

The server will try to call function name 'StartServer'

```typescript
function StartServer(app: TinyApp, { server: http.server, close: () => void }, Settings: ExportSettings)
```