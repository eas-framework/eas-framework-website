# Form
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

<form action="post" sendTo="checkLogin" validator="email:email,password:6:30">
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
<form action="post" sendTo="checkLogin" validator="email:email,password:6:30" message="false">
```

  You can also override the auto-generate error message and set the message to be a string

```html
<form action="post" sendTo="checkLogin" validator="email:email,password:6:30" message="Make sure the email valid and password between 6 to 30 characters">
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
<form action="post" sendTo="checkLogin" validator="email:email,password:6:30" notValid="thatError">
```

  ### Prevent HTML on error message
  To escape HTML on error message add the 'safe' tag.

```html
<form action="post" sendTo="checkLogin" validator="email:email,password:6:30" message="This </p> will not cause an error" safe>
```
</details>

# Binding
There is another method to retrieve data from the server - with JavaScript on the client-side.
I will show the best practices of doing so.

Forms are very useful and convenient but do not fit good to events from the client side. That way we have to 'connect' tag.

```html
@{
    async function userMessage(text, userId){
        try {
            return await sendMessageToUser(text, userId, Session.userId)
        } catch {
            return {error: "Can't send message - make sure user exists"}
        }
    }
}
<connect sendTo="userMessage" name="sendMessageServer" validator="1:200,integer"/>

<input type="number" id="userId" placeholder="User Id"/>
<textarea id="message" name="message" placeholder="Enter your message"></textarea>
<button onclick="sendMessage()">Send Message</button>

<script>
    const $ = x => document.querySelector(x);

    async function sendMessage(){
        const sent = await sendMessageServer($('#userId').value, $('#message').value)

        if(sent.error) 
            return alert('Error: ' + sent.error);

        alert('Success: ' + sent);
    }
</script>
```
The response can be any type (JSON, Number, Boolean...)

<details>
  <summary>Validation Error</summary>

  You can also use 'noValid' and 'message'

```html
<connect sendTo="userMessage" name="sendMessageServer" validator="1:200,integer" noValid="() => ({error: 'fields not valid'})"/>
```

```html
<connect sendTo="userMessage" name="sendMessageServer" validator="1:200,integer" message="Enter a valid userId and make sure the message is between 1 to 200 characters"/>
```
</details>
