# Scoped Script/Style

# Bundling
All content inside all script/style tags is bundled into js/css files and imported automatically to the page - meanings any SSR in this tags wan't work.

If you want to prevent that, for example, you need SSR inside the script tag then you can add the 'server' attribute.

**Same appends to style tags**

```html
<script server>
    const preventFetch = @isFetch
</script>
```

# Only in page script/style
If you have script/style with a changes that depends on the file you need to and the 'page' attribute

This will make sure that script and style will be scoped to the page.

```html
<script page>
    const name = ":name:";
</script>
```
* ':name:' is a '[define](http://localhost:8080/docs/v1/ssr#define-data)' value
