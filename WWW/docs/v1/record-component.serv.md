# Record
A way to store static html content

```html
<record>
    <h1>Hello World!</h1>
    Some text
</record>
```
*[request-path]: The path of the file relative to the website folder without the 'page' extension
This it will save in a map where the key is the request-path and the value is the html

If you have multiple record on file, it will sum up
```ts
type recordMap = {[request_path: string]: string}
```

## Options
* name - the full path to the save location, default is `records/record.serv`
* link - the key in the map, default is request-path