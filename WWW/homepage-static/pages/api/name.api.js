
let name = 'John Doe';

setInterval(() => name = 'John Doe', 1000*30);

export default {
    POST: {
        update: {
            func(req, res) {
                name = String(req.body.name).substring(0, 20);
                return 'ok';
            }
        }
    },
    GET: {
        age: {
            define: {
                age: Number
            },
            
            func(req, res, [word], {age}) {
                return name + ' is ' + age + ' years old - ' + word;
            }
        }
    }
}