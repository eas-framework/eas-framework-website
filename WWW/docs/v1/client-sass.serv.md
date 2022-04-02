# Client Sass
You can use Sass/Scss freely on any SSR block & as separated file

When you import Sass & Scss it automatically transpile into regular css

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

### With Compile Runtime

```js
@compile{
    style('/colors.sass');
}
```