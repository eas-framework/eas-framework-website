*[CSR]: Client Side Rendering

# Client - CSR
### How to use CSR?
There is an option for CSR, it is the client tag.


```html
<div id="posts"></div>
<eas-client fn-name="andPosts" params="posts, onlyName" selector="#posts">
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
</eas-client>

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
