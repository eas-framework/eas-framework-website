# Compile RunTime
Instead of running everything every request, you can run script on compile time!

```js
@compile {
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

## Variables

### store
The 'store' variable will be available for all the compile block in the page.

Regular variable will be only available in same ssr file, everything inside 'store' variable will be available through all page

```typescript
@compile {
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

### attributes
An 'attributes' map for then attributes in the component.

The 'reader' key if for the html inside of the tag
```typescript
var attributes: {[key: string]: string | true}
```