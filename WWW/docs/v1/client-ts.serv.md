# Client TypeScript
You can use TypeScript freely on any SSR block & as separated file

When you import TypeScript it automatically transpile into regular JavaScript

## SSR Block
```html
<script lang=ts type=module>
    import {capitalize} from '/scripts/capitalize.ts'
    let name: string;
    while(!name){
        name = capitalize(prompt('Enter Name'));
    }
</script>
```

## As Static File
`WWW/scripts/getName.ts`

```ts
let name: string;
while(!name){
    name = prompt('Enter Name');
}
```

`WWW/name-to-db.page`
```html
<script src="/scripts/getName.ts"></script>
```

### With Compile Runtime

```js
@compile{
    script('/scripts/getName.ts');
}
```