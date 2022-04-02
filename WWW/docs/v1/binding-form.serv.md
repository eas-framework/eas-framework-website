# Binding - Form
There are many ways to use a form, in this guild we will focus on best practices

 ## Simple form
```html
@{
    if(Post){
        if(testLogin(Post.email, Post.password))
            return Response.redirect('/');
        write('<p>Wrong email or password</p>');
    }
}

<form action="post">
    <input type="email" name="email" placeholder="Enter your email address"/>
    <input type="password" name="password" placeholder="Enter your password"/>
    <button type="submit">Submit</button>
</form>
```

EAS Framework, provide a better way of doing so

```html
@{
    function checkLogin(email, password){
        if(testLogin(email, password))
            return null, Response.redirect('/');
        
        return '<p>Wrong email or password</p>';
    }
}

<form action="post" sendTo="checkLogin">
    <input type="email" name="email" placeholder="Enter your email address"/>
    <input type="password" name="password" placeholder="Enter your password"/>
    <button type="submit">Submit</button>
</form>
```

<details>
  <summary>Change input order</summary>

  You can change the input order with the 'order' attribute
```html
@{
    function checkLogin(password,email){
        if(testLogin(email, password))
            return null, Response.redirect('/');
        
        return '<p>Wrong email or password</p>';
    }
}

<form action="post" sendTo="checkLogin" order="password,email">
    <input type="email" name="email" placeholder="Enter your email address"/>
    <input type="password" name="password" placeholder="Enter your password"/>
    <button type="submit">Submit</button>
</form>
```
</details>

## Validation

We can also add validation as needed

```html
@{
    function checkLogin(email, password){
        if(testLogin(email, password))
            return null, Response.redirect('/');
        
        return '<p>Wrong email or password</p>';
    }
}

<form action="post" sendTo="checkLogin" validator="email:email,password:6-30">
    <input type="email" name="email" placeholder="Enter your email address"/>
    <input type="password" name="password" placeholder="Enter your password"/>
    <button type="submit">Submit</button>
</form>
```
The order of the fields in 'validator' is the order of the arguments the 'sendTo' function get

### Validation Types
A simple way to validate and **parse** a form data

'Regex' and 'Function' validation will *not* parse the form data
#### Simple Types
|           | Number | Intger  | Boolean | String | Email |
|-----------|--------|---------|---------|--------|-------|
| Name      | number | integer | boolean | string | email |
| Shorthand | num    | int     | bool    | text   |       |

#### Complex Validation

|         | String Length Range           | Number Range                  | String Enum                | Number Enum                | Regex                     | Function                                                                                                     |
|---------|-------------------------------|-------------------------------|----------------------------|----------------------------|---------------------------|--------------------------------------------------------------------------------------------------------------|
| Example | 6-10                          | -5..15                        | string => cat \| dog       | number => 1 \| 8           | /^[a-z]+[0-9]$/           | myFunction                                                                                                   |
| Comment | Between 6 to 10 string length | Between -5 to 15 number range | Multiple choice for string | Multiple choice for number | Can be any Regex instance | If none of the previous methods is possible, it will call the function.   **The function can be asynchrony** |

* You can use any shorthand in enum

## Validation Options

<details>
  <summary>Default error message</summary>

  By default, the framework will enable auto-generate error messages in debug mode.

  You can disable it by setting 'message=false' OR if you want to them in production set 'message=true'

  If you want to disable it globally you can enable the "SafeDebug" plugin

```html
<form action="post" sendTo="checkLogin" validator="email:email,password:6-30" message="false">
```

  You can also override the auto-generate error message and set the message to be a string

```html
<form action="post" sendTo="checkLogin" validator="email:email,password:6-30" message="Make sure the email valid and password between 6 to 30 characters">
```
</details>                                               


<details>
  <summary>Custom error event</summary>

  'notValid' attribute contains the name of the function that will be called in case of an error.
  

  The function will get the

```typescript 
function(message: string, validationType: string (name_of_validation_type) | RegExp | method, validationArguments: []number | []string, value: string | number | boolean): Promise<any> | any
```
Example
```html
@{
    function thatError(message, type){
        return `There is an error in that type: ${type}`;
    }
}
<form action="post" sendTo="checkLogin" validator="email:email,password:6-30" notValid="thatError">
```

  ### Prevent HTML on error message
  To escape HTML on error message add the 'safe' tag.

```html
<form action="post" sendTo="checkLogin" validator="email:email,password:6-30" message="This </p> will not cause an error" safe>
```
</details>