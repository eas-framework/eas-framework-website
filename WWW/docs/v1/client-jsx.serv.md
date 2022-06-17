# Client JSX & TSX
You can use JSX & TSX freely on any SSR block & as separated file

When you import JSX & TSX it automatically transpile into regular JavaScript

## SSR Block
```html
<script lang=jsx>
    const div2=(<div>{1+1}</div>);
</script>
```

## As Static File
`WWW/react/div2.tsx`

```tsx
const div2=(<div>{1+1}</div>);
```

`WWW/use-div.page`
```html
<script src="/scripts/div2.tsx"></script>
```

### With Compile Runtime

```js
#code {
    script('/scripts/div2.tsx');
}
```