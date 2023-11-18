import express  from "express";
import axios from "axios";
import bodyParser from "body-parser";
import {user,defaultUser} from "./scripts/user.js"
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/scripts')));
app.use(bodyParser.urlencoded({ extended: true }));

defaultUser.setName("John");

app.get("/", async (req,res)=>{
    res.render("login.ejs");
})

app.get("/registrar", async (req,res)=>{
    res.render("register.ejs");
})

app.get("/index", async (req,res)=>{
    try {
        const cryptoData = await axios.get('https://api.coincap.io/v2/assets');
        res.render("index.ejs",{cryptoData:cryptoData.data,userInfo:defaultUser});
    } catch(error){
        console.log(error);
    }
    
})

app.post("/login", async (req,res)=>{
    if (req.body.name === defaultUser.login && req.body.password === defaultUser.password){
        res.redirect("/index");
    } else {
        res.render("login.ejs");
    }  
})

app.get("/sua-conta/principal", async (req,res)=>{
    try {
        res.render("account.ejs",{userInfo:defaultUser});
    } catch(error){
        console.log(error);
    }
})

app.get("/sua-conta/configuracao", async (req,res)=>{
    try {
        res.render("account-config.ejs",{userInfo:defaultUser});
    } catch(error){
        console.log(error);
    }
})

app.get("/sua-conta/seguranca", async (req,res)=>{
    try {
        res.render("account-security.ejs",{userInfo:defaultUser});
    } catch(error){
        console.log(error);
    }
})

app.get("/sua-conta/configuracoes", async (req,res)=>{
    res.send("configurações")
})

app.get("/suporte", async (req,res)=>{
    res.send("Suporte")
})


app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})
