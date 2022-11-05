# Compile RunTime
Instead of running everything every request, you can run script on compile time!

**This runtime don't works with [page-base](./ssr#small-placeholder), only with [tag-value](./ssr#page-placeholders-data)**

```js
#code {
    define('create', new Date().toLocaleString());
}
<p>Page Created: :create:</p>
```

## Methods

### define

Use the define feature
```typescript
function define(key: string, value: string)
```

### script

Add script file to the head tag (only if not already exists)
```typescript
function script(path: string, attributes: {[key: string]: string})
```

### style

Add style file to the head tag (only if not already exists)
```typescript
function script(path: string, attributes: {[key: string]: string})
```

### dependence

Add file as dependence, meaning if this file changes then the page will rebuild (hot-reload), on debug mode.
There is a support for relative path, and absolute path (from WWW folder)

If the file not-exits or already added to dependencies then the function return false
```typescript
function dependence(path: string): Promise<boolean>
```

### attrsHTML

Enable you to randers js map as HTML attributes

```typescript
function attrsHTML(...onlyAttrs?: string[]) // default form 'attrs' object
function attrsHTML(attrObject: {[key: string]: any}, ...onlyAttrs?: string[])
```

#### Only attrs
Randers only specific attribute attribute

Example:
```html
<!--index.page-->
<Some folder class="form-control" style="width:200px"/>
<!--Some.inte-->
<input #(attrsHTML())/>
```

#### Value Data
- True = Randers only the key 
```javascript
const data = {checked: true}
<input checked />
```
- False, null, undefined - skip this attribute

### attrsObjectHTML

Same as attrsHTML but randers as [object attribute](#object)

attrsObjectHTML is for using in [another component](#attrs)

```html
<!--index.page-->
<Some folder class="form-control" counter=(10) keywords=['This', 'is', 'cool', '!!!'] style="width:200px"/>
<!--Some.inte-->
<DataInput folder #(attrsObjectHTML())/>
<!--DataInput.inte-->
<div #(attrsHTML('class', 'style'))>
    #code {
        write(`<p>Counter is ${attributes.counter}, keywords: ${attributes.keywords.join(', ')}</p>`)
    }
</div>
```

### spaceOne
Add one space if value isn't evaluate to false
*this method will trim other spaces*
```ts
spaceOne(text: any): string
spaceOne(returnValue: bool, value): string
```
Examples:
```html
<input type="button" class="btn btn-link#(spaceOne(attrs.class))"/>
<input type="checkbox"#(spaceOne(attrs.checked, 'checked'))/>

<!--In case of a value-->
<input type="button" class="btn btn-link border-bottom"/>
<input type="checkbox" checked/>

<!--In case there isn't a value-->
<input type="button" class="btn btn-link"/>
<input type="checkbox"/>
```

## Variables

### store
The 'store' variable will be available for all the compile block in the page.

Regular variable will be only available in same ssr file, everything inside 'store' variable will be available through all page

```typescript
#code {
    store.counter++;
}
```

### page__filename
Full path to page


### page__dirname
Full path to page directory

### __localpath - the request-path
Same as 'page__filename' but relative to the website folder without the file extension


### __filename
Full path to this file


### __dirname
Full path to this directory

## Only on components

### attrs
An 'attrs' map for then attributes in the component.

The 'reader' key if for the html inside of the tag
```typescript
var attrs: {[key: string]: string | true | object}
```
#### Object
The attribute data will be an object/js-parse only if it is in this syntax:

```jsx
<Counter data=({start: 2, name: 'Json'}) string="whatever"/>
```
```jsx
<List array=(['array', 'of' 'items'])/>
```
```jsx
<AboutNum num=(1) openDialog=(false)/>
```
