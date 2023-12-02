//a. What does the status code 200 mean?
//      200 means that the call was successful.
//b. What happens if you remove the res.end call?
//      If you take out the end function, the call process will never end. 

const http = require("http");
const path = require("path");
const PublicHandler = require('./routes/public.js')

const requestRouter = function (req,res) 
{
    const url = new URL(req.url, `http://${req.headers.host}`)
    const pathName = url.pathname
//res.statusCode = 200;
//res.end();
    req.app = {
        publicDirectory: path.join(__dirname, "public")
    }

    for(const[key, value] of Object.entries(routes)) 
    {
        console.log(Object.entries(routes));
        if (pathName.includes(key)) // if path includes /public
        {
            if("get" === req.method.toLowerCase() && value.get) // check that the request method is same
            { //call get function
                return value.get(req,res);
            }
            else //no matching property
            {
                res.statusCode = 405; //method not allowed
                res.end();
            } 
        }
        
        else //no matching path
        { // cant handle delete so we return method not allowed
            res.writeHead(404); //not found
            res.end();
        }

    }
}


const routes =
{
    '/public/': PublicHandler
}


//curl local host 
const server = http.createServer(requestRouter)
const port = 8080
server.listen(port);
console.log("Server running at : " + port)






/*const server = http.createServer(function (req, res){
    //if the request is to read the todos
    //send back the entire array
    
    console.log("method", req.method);
    if (req.method === "get") {
        res.statusCode = 200;
        res.write(JSON.stringify(todos));
        return res.end();
    } else if (req.method === "POST") {
        todos.append("do stuff");
        res.statusCode = 201;
        return res.end();
    }
    //if the request is to create a todo
    // create a new one
    //append to array
    //send it back
    res.statusCode = 500;
    res.end();
}); */


//Extract the request path (ex. '/public/') from the req object's url property.









// class notes

/*const http = require("http");

fetch('localhost:8080/task', {
    method: 'POST',
    body: JSON.stringify({task: 'study for final'})
})

let tasks = ["study for midterms", "dont do weird things", "go to bars"];

function getAllTasks(res) {
    res.writeHead(200)
    res.write(tasks)
    res.end()
}

function getSingleTask(req, res) {
    let p = req.path.split("/");
    let index = parseInt(p[2], 10);
    
    if (index > 0 && index < tasks.length) {
        res.write(tasks[index])
        return res.end()
    } else {
        res.writeHead(404)
        res.end()
    }
}

const server2 = http.createServer(function(request, res) {
    const method = request.method
    if (method.toLowerCase() === 'get') {
        //rl localhost:8080/task/<number>

        if (req.path.startsWith('/task')) {
            return getSingleTask(req, res)
        }

        //curl localhost:8080/tasks
        if (req.path === '/tasks') {
            return getAllTasks(res)
        }
    } else if (method.toLowerCase() === 'post') {
        const body = JSON.parse(req.body)
        if (body.task) {
            tasks.append(body.task)
            res.writeHead(201)
            res.end()
        }

        res.writeHead(400)
        res.end()
    } else {
        res.writeHead(405)
        res.end()
    }
});

server2.listen(8080);
*/