# Binding - Form

There are many ways to use a form, in this guild we will focus on best practices

## Simple form

```html
@code { 
  if(Post){ 
    if(testLogin(Post.email, Post.password)) 
      return Response.redirect('/');
    write('<p>Wrong email or password</p>');
  } 
}

<form action="post">
  <input type="email" name="email" placeholder="Enter your email address" />
  <input type="password" name="password" placeholder="Enter your password" />
  <button type="submit">Submit</button>
</form>
```

EAS Framework, provide a better way of doing so

```html
@code { 
  function checkLogin(email, password){ 
    if(testLogin(email, password)) 
      return null, Response.redirect('/'); 
    return '<p>Wrong email or password</p>';
  } 
}

<eas-form server-fn="checkLogin">
  <input type="email" name="email" placeholder="Enter your email address" />
  <input type="password" name="password" placeholder="Enter your password" />
  <button type="submit">Submit</button>
</eas-form>
```

<details>
  <summary>Change input order</summary>

You can change the input order with the 'order' attribute

```html
@code { 
  function checkLogin(password,email){ 
    if(testLogin(email, password)) 
      return null, Response.redirect('/'); 
    return '<p>Wrong email or password</p>'; 
  } 
}

<eas-form server-fn="checkLogin" order="password,email">
  <input type="email" name="email" placeholder="Enter your email address" />
  <input type="password" name="password" placeholder="Enter your password" />
  <button type="submit">Submit</button>
</eas-form>
```

</details>

## Validation

We can also add validation as needed

```html
@code { 
  function checkLogin(email, password){ 
    if(testLogin(email, password))
      return null, Response.redirect('/');
  return '<p>Wrong email or password</p>'; } 
}

<eas-form server-fn="checkLogin" validate="email:email,password:6-30">
  <input type="email" name="email" placeholder="Enter your email address" />
  <input type="password" name="password" placeholder="Enter your password" />
  <button type="submit">Submit</button>
</eas-form>
```

The order of the fields in 'validate' is the order of the arguments the 'server-fn' function get

### Validation Types

A simple way to validate and **parse** a form data

'Regex' and 'Function' validation will _not_ parse the form data

#### Simple Types

|           | Number | Intger  | Boolean | String | Email |
| --------- | ------ | ------- | ------- | ------ | ----- |
| Name      | number | integer | boolean | string | email |
| Shorthand | num    | int     | bool    | text   |       |

#### Complex Validation

<table>
    <thead>
        <tr>
            <th></th>
            <th>String Length Range</th>
            <th>Integer Number Range</th>
            <th>Float Number Range</th>
            <th>String Enum</th>
            <th>Number Enum</th>
            <th>Regex</th>
            <th>Function</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Example</td>
            <td>6-10</td>
            <td>-5..15</td>
            <td>-5.2..15.0</td>
            <td>string =&gt; cat | dog</td>
            <td>number =&gt; 1 | 8</td>
            <td>/^[a-z]+[0-9]$/</td>
            <td>myFunction</td>
        </tr>
        <tr>
            <td>Comment</td>
            <td>Between 6 to 10 string length</td>
            <td>Between -5 to 15 number range</td>
            <td>Between -5.2 to 15 number range</td>
            <td>Multiple choice for string</td>
            <td>Multiple choice for number</td>
            <td>Can be any Regex instance</td>
            <td>If none of the previous methods is possible, it will call the function. **The function can be asynchrony**</td>
        </tr>
    </tbody>
</table>

- You can use any shorthand in enum

## Validation Options

<details>
  <summary>Default error message</summary>

By default, the framework will enable auto-generate error messages in debug mode.

You can disable it by setting 'error-msg=false' OR if you want to them in production set 'error-msg=true'

If you want to disable it globally you can enable the "SafeDebug" plugin

```html
<eas-form server-fn="checkLogin" validate="email:email,password:6-30" error-msg="false">

</eas-form>
```

You can also override the auto-generate error message and set the 'error-msg' to be a string

```html
<eas-form server-fn="checkLogin" validate="email:email,password:6-30" error-msg="Make sure the email valid and password between 6 to 30 characters">

</eas-form>
```

</details>

<details>
  <summary>Custom error event</summary>

'error-fn' attribute contains the name of the function that will be called in case of an error.

The function will get the

```typescript
function(message: string, validationType: string (name_of_validation_type) | RegExp | method, validationArguments: []number | []string, value: string | number | boolean): Promise<any> | any
```

Example

```html
@code { 
  function thatError(message, type){ 
    return `There is an error in that type:${type}`; 
  } 
}
<eas-form server-fn="checkLogin" validate="email:email,password:6-30" error-fn="thatError">

</eas-form>
```

### Escape Server Response

To escape HTML message from server-fn, error-msg, error-fn add the 'escape-response' tag.

```html
<eas-form server-fn="checkLogin" validate="email:email,password:6-30" error-msg="This </p> will not cause an error" escape-response>

</eas-form>
```

</details>
