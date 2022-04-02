# Binding - Connect
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
