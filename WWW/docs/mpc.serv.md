*[inte]: integrction

# What is EAS-Framework?
EAS stands for embedded active server. This is an SSR (server-side rendering) for Node.JS.

Its basic concept is page-model-component, a bit similar to asp.

## Examples

model example: www/Site.mode
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

component example: www/ColorButton.inte

```html
@default(blue)[color]

<button style="background-color:~color">
    <:reader/>
</button>
```

page example: www/index.page

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