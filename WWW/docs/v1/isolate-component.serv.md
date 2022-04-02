# Isolate
Simply insert the code into js block `{}`

```jsx
@{
    const value = 1
}
<isolate>
    @{
        const value = 2;
    }
</isolate>
```