const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));



app.set("view engine", "ejs");

//-----------------------------------[URL database]------------------ 
const urlDatabase = {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com"
};
//--------------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("Hello!");
});
//--------------------------------------------------------------------
app.get("/urls", (req, res) => {
    const templateVars = { urls: urlDatabase };
    res.render("urls_index", templateVars);
});
//--------------------------------------------------------------------
app.get("/urls/:shortURL", (req,res) => {

    //console.log(" hiii");
    const templateVars = { shortURL: req.params.shortURL, longURL : urlDatabase[req.params.shortURL] };
    res.render("urls_show", templateVars)
   //res.send("shorURL");
});

//--------------------------------------------------------------------

app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });
//--------------------------------------------------------------------

app.get("/urls.json", (req, res) => {
    res.send(urlDatabase);
})

//--------------------------------------------------------------------
app.get("/hello", (req, res) => {
    res.send("<html><body>Hello <b>World</b></body></html>\n");
  });

//--------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

//--------------------------------------------------------------------
app.post("/urls", (req, res) => {
    console.log(req.body);  // Log the POST request body to the console
    res.send("Ok");         // Respond with 'Ok' (we will replace this)
  });

//   ------------------------generateRandomString-----------------------
const generateRandomString = function() {
    let result = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(let i = 0; i < 6; i++) {
        result += char.charAt(Math.floor(Math.random() * char.length));
    }
    return result;
}