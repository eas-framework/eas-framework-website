# Packages
You can use packages to reuse components and models

Add '^' to the start of the path, and then it will redirect to modules

### Components

```html
<List folder="^listModule"/>
```

Then EAS-Framework will search for 'node_modules/listModule/Components/List.inte'

### Models

```python
#[model='^myPackage/web' title='Home Page']
```

Then EAS-Framework will search for 'node_modules/myPackage/Models/web.mode'
