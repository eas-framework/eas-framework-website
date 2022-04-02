*[inte]: integrction

# What is EAS-Framework?
EAS stands for embedded active server. This is an SSR (server-side rendering) for Node.JS.

Its basic concept is page-model-component, a bit similar to asp.

## Examples

model example: `www/Site.mode`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title><:title/></title>
</head>
<body>
    <:body/>
</body>
</html>
```

component example: `www/ColorButton.inte`

(component name must be capitalize)
```html
@default(blue)[color]

<button style="background-color:~color">
    <:reader/>
</button>
```

page example: `www/index.page`

```html
@[model='./Site' title='This is Home Page']
<@body/>
<p>This is a big placeholder</p>
<ColorButton folder="./">Blue Button</ColorButton>
<ColorButton folder="./" color="red">Red Button</ColorButton>

@{
    if(!Cookies.counter)
        Cookies.counter = 0
    Cookies.counter++
}

<p>Counter: @Cookies.counter</p>
```

# Folders
All those folders must be on the root folder

## Components
If exists contains components that doesn't need a 'folder' attribute

```html
<ColorButton>Blue Button</ColorButton>

```

### Nested
You can do nested components like that:

```html
<Colors:Button>Blue Button</Colors:Button>
```
Colors is the folder and Button is the component file

## Models
If exists contains models that doesn't need a relative or absolute path

```python
@[model=Site]
```

# Special component attributes
* importSource - The file that imported this component
* importSourceDirectory - The directory of the file that imported this component


### Example
If `WWW/docs/search.page` import `Components/TitleIt.inte`

Then importSource will be `WWW/docs/search.page` - relative to the website directory