# Extends
Let your children **components** to extend your attributes

Works if the attribute not already appears in the child attributes

## Extends Class
Class attribute have a special behaver - 

when a class attribute already exists it will concat it to the old attribute

So for this example the classes will be in this order: link nav-link active
```jsx
<extends extends-class="link nav-link">
    <Link class="active" title="Home Page"/>
    <Link title="About"/>
    <Link title="Concat"/>
</extends>
```

## Objects
When you extends an object attribute change it in compile-runtime, it will change for all other items that extends that attribute

**Remember** that the component compile simultaneously so don't do anything that is **order** base

## Result
The 'result' component is a special component that waiting for all the previous children to finish compile and then execute his children *components*

### Working as expected {.success}
```jsx
<extends data={count: 0}>
    <IncreaseCounter/>
    <IncreaseCounter/>
    <result>
        <PrintCounter/>
    </result>
</extends>
```

### **Not** working as expected {.danger}

This print counter may be print 0, 1, 2 because the component compile simultaneously
```jsx
<extends data={count: 0}>
    <IncreaseCounter/>
    <IncreaseCounter/>
    <PrintCounter/>
</extends>
```