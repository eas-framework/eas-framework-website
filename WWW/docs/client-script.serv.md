*[SSR]: Server Side Rendering

# TypeScipt

You can enable TypeScipt globaly from the Settings.ts/Settings.js file,
```js
compile: {
    compileSyntax: ["TypeScript"]
}
```

Now you can use it within any SSR block and with files that end with .ts. You can import them as regular js files.
```html
<script src="/content/main-script.ts"></script>
```

### Inside a script tag
```typescript
<script lang="ts">
    let text: string;

    function logText(){
        console.log('The text is:', text)
    }
</script>
```
* You can also use "jsx", "tsx"

# Sass

Sass is automatically enabled, all you need to do is to add files ending with .sass or scss and import them as regular CSS.
```html
<link rel="stylesheet" href="/content/main-style.sass"/>
```


### Inside a style tag

```html
<style lang="sass">
    @import './colors.sass'

    body
        .move
            height: 200px
</style>
```
* You can also use "scss"

# Bundling
All content inside all script tags is bundled into one js file that is imported automatically to the page - mining any SSR in this tags wan't work.

If you want to prevent that, for example, you need SSR inside the script tag then you can add the 'server' attribute.

**Same appends to style tags**

```html
<script server>
    const preventFetch = @isFetch
</script>
```

# Only in page script/style
If you have script/style with a changing depends on the file you need to and the 'page' attribute

This will make sure that script and style will render to a specific files that separate for the page and not to something that is for the model/component

*[:name:]: A 'define' value
```html
<script page>
    const name = ":name:";
</script>
```

# And Svelte component

The JS and CSS will be auto-import to the page

All props will copied to the svelte app
```html
<svelte from="./path/to/svelte-file" props={counter: 0, name: 'Cool-Website'}/>
```

The framework will auto-generate div with id the svelte render as a target.
You can prevent that by passing your own selector

```html
<svelte from="./path/to/svelte-file" selector="#todo"/>
```

You can also only change the id that the framework use for the div.
```html
<svelte from="./path/to/svelte-file" id="#todo"/>
```

### SSR
Simply add 'SSR' attribute, the framework will do the rest.

You can't use 'selector' cause there need to be SSR writing to the page, but you can change the id.
```html
<svelte from="./path/to/svelte-file" ssr/>
```

### Sass, TypeScript
If you wondering, yes all of that is supported inside of the svelte file with the framework.

* On debug mode source map will be inserted automatically 