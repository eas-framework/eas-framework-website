*[SSR]: Server Side Rendering

# How to use the SSR?

Basically, every SSR block (page, model, component)
with a razor-like rendering

```js
#*Simple Comment - this is who to write SSR block *#
@code {
    let i = 0;
    i++;
}

#*This is how to print escaped text*#
Count Razor: @:(i)

#*This is how to write literal HTML*#
@("<p>Text Razor</p>")
```

## Global Object
in each SSR block, these variables are global
* Response - [TinyHttp](https://github.com/tinyhttp/tinyhttp) response object
* Request - [TinyHttp](https://github.com/tinyhttp/tinyhttp) request object
* Post - null if the method isn't a post
* Query - map of the query string
* Session - Only works if the session enable (in the settings session time bigger than 0)
* Files - [formidable files](https://github.com/node-formidable/formidable#file)
* Cookies - map of the cookie data (setting and removing will affect the cookies)
* PageVar - public variable to all the SSR blocks in the request
* GlobalVar - public variable to all the SSR blocks

## Global Methods
in each SSR block, these methods are global
* include(path, object: extends page object) - for include another SSR block - page or component
* transfer(path, preserveForm: boolean - send the form to another page, object: extends page object) -  transfer to another page without redirect
* echo - template function for writing escaped HTML
* write - writing HTML
* writeSafe - writing escaped HTML
* setResponse - replaceing every HTML that commit to print

### Echo
Echo is a template function for writing safe HTML without XSS security risk
```js
echo `<p>User name is: ${Post.name}</p>`
```

This will print:
```html
<p>User name is: &#73;&#100;&#111;</p>
```

### Stop
If you want to immediately stop the page process (equals to return/break),
you can call the `stop` function

`index.page.js`
```js
if(something){
    Response.redirect('/')
    stop()
}
```

## Sending the controllers of the page
There is a 'page' variable that contains all the variables and methods above.
This is useful when you want to send all the page controllers to a function at once.

## Global variable in every file (not just SSR blocks)
* __dirname - the current folder (although it is a model, eas-framework create that for easy use)
* __filename - the current filename (although it is a model, eas-framework create that for easy use)
* \_\_DEBUG\_\_ - boolean, true if you in debug mode

## Model
Model is a template with placeholders to use by a page. 
Use can use nested models as well.

For example:
www/site-model/site.mode
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title><:title/></title>
    <:head/>
</head>
<body>
    <p>My First WebSite</p>
    <div>
        <Link folder="./" to="/">Home</Link>
        <Link folder="./" to="/about">About</Link>
        <Link folder="./" to="/contact">Contact</Link>
    </div>
    <:body/>
</body>
</html>
```

## Component
www/site-model/Link.inte
```html
<style>
    .link-navbar {
        color:rgb(44, 117, 185);
        font-weight: bold;
    }
</style>
<a href="~to" class="link-navbar">
    <:reader/>
</a>
```

* All content of script/style tags will be written only once in separate script and style files.
You can prevent this if you need SSR inside the script/style tag with the 'server' attribute.

### Default values
You can add default values in this form
```typescript
#default('key', 'value')
#default(['key1', 'key2'], true)
```

For Example
```html
#default('to', '/Home')
<a href="~to" class="link-navbar">
    <:reader/>
</a>
```

## Page Placeholders Data
www/index.page
```html
<content:model>/site-model/site</content:model>

<content:body>
    <h1>Hello Home Page</h1>
</content:body>
```

www/about.page
```typescript
<content:model>/site-model/site</content:model>

<content:body>
    @code {
        export function printEmail(email){
            write(`<p>You can concat me at ${email}</p>`)
        }
    }
</content:body>
```

## Small Placeholder
There is a better way to write data of small placeholders.

You can use 'Page Base'
```rust
#[title=Home model="/site-model/site"]
```

This can alow be good if you want to save a placeholder between models. If you haven't used the placeholder but you want it to stay in the current model

/user-model/user
```rust
#[title=inherit header=inherit model="/site-model/site"]
```

# Define data
If you have pieces of code that repeat many times inside your code.

For example path to a component or some attribute, you can define a small placeholder inside your page/model 

```html
#define('site', '/site-model/component/')

<NavButton folder=":site:">Very cool!</NavButton>
```

The way 'define' works is:
 1. checking first if a value exists on-page
 2. if not checking the model
 3. and so on...

# Add Page Inside A Page

www/contact.page

```html
<eas-page form="./about"/>
<p>You can concat me at example@email.com</p>
```

**All the examples below will work the same with components**

You can also add page programmatically - this is done in runtime - slower
```html
@include("./about.page")
<p>You can concat me at example@email.com</p>
```

If your page export things, you can get them like that

```typescript
@code {
    const {printEmail} = await include('./about.page')
    printEmail("example@email.com")
}
```

# Separate Code File
You can separate the server-side code to a different file that will connect to a page/model/component by using the 'codefile' placeholder

My Page: WWW/About.page
```rust
#[codefile=inherit]
```
The inherit will replace by 'WWW/About.page.js' or 'WWW/About.page.ts' (if TypeScript enabled)

You can alow specify exactly the file
```rust
#[codeFile="./About.page.ts"]
```

## Enforce JS
If TypeScript is enabled you can enforce JavaScript by adding 'lang=js'

```rust
#[codefile=inherit lang=js]
```