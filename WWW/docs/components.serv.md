*[CSR]: Client Side Rendering

# CSR
### How to use CSR?
There is an option for CSR, it is the client tag.


```html
<div id="posts"></div>
<client name="andPosts" params="posts, onlyName" selector="#posts">
    @for(let i in posts){
        <div class="post">
            <p>@:i.name</p>

            @if(!onlyName){
                <div class="post-body">
                    @i.body
                </div>
            }
        </div>
    }
</client>

<script>
    andPosts({posts: postArray, onlyName: true});
</script>
```
* The CSR will also return the created children as an HTMLCollection
* On debug there will be js comments with CSR, you can disable them with the 'SafeDebug' plugin.
* You can change the default selector from JS bypassing another argument
```js
andPosts({posts: postArray, onlyName: true}, '#adminPosts');
```


# Markdown

Easy way to use markdown inside an SSR block.

Syntax Highlighting build in!

### How to use

Simply add the markdown tag
```html
<markdown>
# Hello World
* Item in list
</markdown>
```

### Options
* linkify - boolean (uses [linkify-it](https://github.com/markdown-it/linkify-it))
* breaks - boolean (Convert '\n' in paragraphs into <‎br>)
* typographer - boolean (Enable some language-neutral replacement * quotes beautification)
* hljsClass - boolean (if false then it will prevent adding 'hljs' class (the code background))
* theme - 'none' | 'dark' | 'light' | 'auto' (default)
* codeTheme - one of [highlight.js](https://highlightjs.org/) themes
* headerLink - boolean (make header as links [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor))
* attrs - boolean (add attributes [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs))
* abbr - boolean (easy use of abbr element [markdown-it-abbr](https://github.com/markdown-it/markdown-it-abbr))
* copyCode - boolean (button to easily copy code)

### Code Themes
One of the code theme, default is 'atom-one'

If you wan't a theme that automatically change base of the user preference (dark/light), you can do it like that:
```html
<markdown code-theme="qtcreator-light|qtcreator-dark">
```

Full documentation at the repository of [markdown-it](https://github.com/markdown-it/markdown-it)