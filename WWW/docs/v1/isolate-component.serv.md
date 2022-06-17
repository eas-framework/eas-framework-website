# Isolate
Simply insert the code into js block `{}`

```jsx
@code {
    const value = 1
}
<eas-isolate>
    @{
        const value = 2;
    }
</eas-isolate>
```