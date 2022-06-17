# Search
Similar to [record](./record-component) but for search purposes

This will extract titles from the texts

```html
<eas-search>
    <h1 id="home-page">Home Page</h1>
    Some text
</eas-search>

```

```ts
type searchMap = {[request-path]: {
    titles: {[key: objectId]: string}
    text: string
}}
```

## Options
* name - the full path to the save location, default is `records/search.serv`
* link - the key in the map, default is request-path
* match - query selector for ids, default is 'h1\[id]...h6\[id]'

## Using the search
You can search in a 'search-record' with the build in 'SearchRecord' class

```js
import {SearchRecord} from '@eas-framework/server'

const textSearch = new SearchRecord('records/search.serv')
await textSearch.load()

export function queryText(query){
    return textSearch.search(query)
}
```

You can use then with SSR block
```jsx
@code {
    import {queryText} from './searchFile.serv.js'
}
@for(const {text, url} of queryText(Query.q ?? 'new')){
    <a href="@url">@:text</a>
}
```