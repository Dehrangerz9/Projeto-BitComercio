import express  from "express";
import axios from "axios";
import bodyParser from "body-parser";
import user from "./public/scripts/user.js"
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + '/public')));

app.use(bodyParser.urlencoded({ extended: true }));

const usuario = new user("John","123");

app.get("/", async (req,res)=>{
    res.render("login.ejs");
})

app.get("/index", async (req,res)=>{
    try {
        const cryptoData = await axios.get('https://api.coincap.io/v2/assets');
        res.render("index.ejs",{cryptoData:cryptoData.data});
    } catch(error){
        console.log(error);
    }
    
})

app.post("/login", async (req,res)=>{
    if (req.body.name === usuario.name && req.body.password === usuario.password){
        res.redirect("/index");
    } else {
        res.render("login.ejs");
    }  
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})