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

#### linkify
Type: boolean

Default: false

Uses [linkify-it](https://github.com/markdown-it/linkify-it)

#### breaks
Type: boolean

Default: true

Convert '\n' in paragraphs into <‎br>


#### typographer
Type: boolean

Default: true

Enable some language-neutral replacement * quotes beautification

#### hljs-class
Type: boolean

Default: true

If false then it will prevent adding 'hljs' class (the code background)

#### theme
Enum:  'none' | 'dark' | 'light' | 'auto'

Default: 'auto

#### code-theme
Enum: one of [highlight.js](https://highlightjs.org/) themes

Default: 'atom-one'

If you wan't a theme that automatically change base of the user preference (dark/light), you can do it like that:
```html
<markdown code-theme="qtcreator-light|qtcreator-dark">
```

#### header-link
Type: boolean

Default: true

Make header as links [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor)

#### attrs
Type: boolean

Default: true

Easy use of abbr element [markdown-it-abbr](https://github.com/markdown-it/markdown-it-abbr)

#### copy-code
Type: string

Default: '📋'

HTML to show as the copy-code button

Full documentation at the repository of [markdown-it](https://github.com/markdown-it/markdown-it)