# Binding - API
Any page that ends with '.api.ts' or '.api.js', will read as an API page.
Every API function returns only JSON format. If a method returns text then the API call will return 
```js
{text: "My Text"}
```

If the API function returns null then it won't return anything and we need to make the return manually.
```js
async func (Request: Request | any, Response: Response | any){
    Response.json({text: 'Success'});
}
```

Start by creating a file in the path you want your API on, for example, we want our on API to be something like that: '/user/:id/name', will return the user name.

For that I will create a file: `user.api.js`
```js
export default {
    GET: {
        define: {
            'userId': parseInt,
        },

        'name': {
            async func (Request: Request | any, Response: Response | any, [], {userId}){
                return await getNameById(userId);
            }
        },

        'age': {
            async func (Request: Request | any, Response: Response | any, [], {userId}){
                return await getAgeById(userId);
            }
        }
    }
}
```

For example, I can make the following HTTP request:
```js
const userName = await fetch('/user/43/name');
alert('User Name: ' + await userName.text());
```

In this example, we define the first slash as an userId with the type of an integer, if the validation/parsing fail we will get an auto-generated error.

The next slash can be 'name' or 'age', and then the API activate. 

# Custom validation
A simple example of how to validate 'define' properties and custom properties.

Within the 'define' hash map, you can use your own methods - this is an asynchrony operation.

You can also use Regex or array as an enum string.

(The 'Boolean' function will also work)

If you add "any" this will alow any value and won't parse it - remaining as a string.
```js
export default {
    GET: {
        'compare': {
            define: {
                'userId1': Number,
                'userId2': String,

                async validateFunc({ userId1, userId2 }, Request: Request | any, Response: Response | any) {
                    return (await userExists(userId1)) && (await userExists(userId2));
                }
            },

            'lastLogin': {
                validateURL: [
                    ['MM-DD-YYYY', 'MM-DD'] // enum date format check
                ],

                func(Request: Request | any, Response: Response | any, [format], { userId1, userId2 }) {
                    return compereDate(format, userId1, userId2);
                }
            }
        },

        // HTTP GET: /user/compere/52/89/lastLogin/MM-DD

        POST: {
            'update': {
                define: {
                    'userId': Number,

                    async validateFunc({ userId }, Request: Request | any, Response: Response | any) {
                        return await userExists(userId)
                    }
                },

                'image': {
                    validateFunc(_, Request: Request | any, Response: Response | any) {
                        return Request.files.image;
                    },
                    func(Request: Request | any, Response: Response | any, _, { userId }) {
                        return updateImage(userId, Request.files.image);
                    }
                }
            }
        }

        // HTTP POST: /user/update/89/image
        // form: {image: ImageFile}
    }
}
```

## validateFunc Method
Can returns boolean or string.
In case of an error, the API will return {error: "Some Error Text"}

### Inside a 'define' property.
```typescript
async validateFunc(defineObject: {[key: string]: any}, Request: Request | any, Response: Response | any)
```
You can add properties to 'defineObject' so you can use them within 'func'

### Inside a URL property
```typescript
async validateFunc(notParseSlashArray: string[], Request: Request | any, Response: Response | any, parsedSlashArray: any[])
```
You can push values to 'parsedSlashArray' so you can use them within 'func'

## Safe Debug
If you don't want to return code info about the error you can enable the plugin 'SafeDebug'

## Method

There are many ways to define the method. You can also no a nested definition

### As Export
```js
export const GET = {
    ...
}

export const POST = {
    ...
}

export const DELETE = {
    ...
}
```

### Nested

```js
export default {
    define: {
        'userId': Number,

        async validateFunc({ userId }, Request: Request | any, Response: Response | any) {
            return await userExists(userId)
        },
    },

    'image': {
        GET: {
            'size': {
                func(Request: Request | any, Response: Response | any, _, { userId }) {
                    return imageSize(fuserId);
                }
            }
        },
        POST: {
            'upload': {
                validateFunc(_, Request: Request | any, Response: Response | any) {
                    return Request.files.image;
                },
                func(Request: Request | any, Response: Response | any, _, { userId }) {
                    return updateImage(userId, Request.files.image);
                }
            }
        }
    }
}
```

# Default function
Add 'func' to the root of the object
```js
export default {
    define: {
        'userId': Number,

        async validateFunc({ userId }, Request: Request | any, Response: Response | any) {
            return await userExists(userId)
        },
    },

    'image': {
        GET: {
            'size': {
                func(Request: Request | any, Response: Response | any, _, { userId }) {
                    return imageSize(fuserId);
                }
            }
        }
    },

    func (Request: Request | any, Response: Response | any){ // default function
        Response.sendStatus(404);
    }
}
```