# Svelte Component

The JS and CSS will be auto-import to the page

All props will copied to the svelte app
```html
<eas-svelte file="./path/to/svelte-file" props={counter: 0, name: 'Cool-Website'}/>
```

The framework will auto-generate div with id the svelte render as a target.
You can prevent that by passing your own selector

```html
<eas-svelte file="./path/to/svelte-file" selector="#todo"/>
```

You can also only change the id that the framework use for the div.
```html
<eas-svelte file="./path/to/svelte-file" id="#todo"/>
```

### SSR
Simply add 'SSR' attribute, the framework will do the rest.

You can't use 'selector' cause there need to be SSR writing to the page, but you can change the id.
```html
<eas-svelte file="./path/to/svelte-file" ssr/>
```

### Sass, TypeScript
If you wondering, yes all of that is supported inside of the svelte file with the framework.

* On debug mode source map will be inserted automatically 

```html
<style lang=sass>
```

If you use TypeScript with svelte import all types via 'import type', so esbuild will know what to remove.

This is necessary only on svelte because how svelte works

```html
<script lang=ts>
    @import type {coolType} from './location.ts'

    const beType: coolType = {attr1: 1, attr2: 2};
</script>
```