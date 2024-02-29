const express = require ('express');
const data = require("./data");
const pug = require('pug');
const path = require('path');

const app = express()
const port = 4131

app.set("views", "templates"); // look in "templates" folder for pug templates
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const bannerMessage = {"active": "false"}


app.use('/css', express.static(path.join(__dirname, 'resources', 'css')));
app.use('/js', express.static(path.join(__dirname, 'resources', 'js')));
app.use('/images', express.static(path.join(__dirname, 'resources', 'images')));

const username = 'Username';
const password = 'Password';

// Authentication checker
const checkAuthentication = (req, res) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
        return 401;
    }

    let base64Credentials = authHeader.split(' ')[1];
    let credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    let [enteredUsername, enteredPassword] = credentials.split(':');

    if (enteredUsername === username && enteredPassword === password) {
        return 200;
    } else {
        res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
        return 401;
    }
};


// Get Mainpage from '/'
app.get("/", async (req, res)=> {
    res.render("mainpage.pug")
})

// Get Mainpage from '/main'
app.get("/main", async (req, res)=> {
    res.render("mainpage.pug")
})

// Get Testimonies from '/testimonies'
app.get("/testimonies", async (req, res)=> {
    res.render("testimonies.pug")
})

// Get Contact Form from '/contact'
app.get("/contact", async (req, res)=> {
    res.render("contactform.pug")
})

// Get Contact Log Form from '/admin/contactlog'
app.get("/admin/contactlog", async (req, res)=> {
    if (checkAuthentication(req, res) === 401) {
        res.status(401).send('Unauthorized')
    } else {
        let contacts = await data.getContacts();
        res.render("contactlog.pug", { contacts: contacts })
    }
})

// Delete Contact API from '/api/contact'
app.post("/contact", async (req, res)=> {
    const confirmationFilePath = path.join(__dirname, 'templates', 'confirmation.pug');
    await data.addContact(req.body);
    res.render(confirmationFilePath);
    console.log("contacts: ", data.getContacts())
})


// Get Sale API from '/api/sale'
app.get("/api/sale", async (req, res)=> {
    res.send(JSON.stringify(bannerMessage));
})

// Delete Sale API from '/api/sale'
app.delete("/api/sale", async (req, res)=> {
    if (checkAuthentication(req, res) === 401) {
        res.status(401).send('Unauthorized')
    } else {
        bannerMessage = {"active": "false"}
        res.sendStatus(200);
    }
})

// Post Sale API from '/api/sale'
app.post("/api/sale", async (req, res)=> {
    if (checkAuthentication(req, res) === 401) {
        res.status(401).send('Unauthorized')
    } else {
        if (req.body == null) { 
            console.log("No body found");
        } else {
            console.log("type: ", (req.body))
            let parsedData = req.body
            console.log("body:", (parsedData))
            bannerMessage = {"active": "true", "message": parsedData["message"]}
        }
    }
})

app.delete("/api/contact", async (req, res)=> {
    if (checkAuthentication(req, res) === 401) {
        res.status(401).send('Unauthorized')
    } else {
        let reqData = req.body
        let saleId = reqData["id"]
        await data.deleteContact(saleId);
        res.sendStatus(200);
    }
})

const notFoundHandler = (req, res, next) => {
    res.status(404).render('404.pug');
};

app.use(notFoundHandler);  

app.listen(port , () => {
    console.log(`Example app listening on port ${port}`)
})