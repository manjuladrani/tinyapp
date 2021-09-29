const express = require("express");
const uuid = require('uuid/v4');

const PORT = 8080;
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.set("view engine", "ejs");

//-----------------------------------[URL database]------------------
const urlDatabase = {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com"
  };

const userDatabase = {
    gd45bif4: {
        id: 'gd45bif4',
        name: 'ved',
        email: 'ved.playing@toys.com',
        password: 'cars'
    },
    hatd56dg: {
        id: 'hatd56dg',
        name: 'Bob',
        email: 'bob.eating@fry.com',
        password: 'eating'
    },
};
const generateRandomString = function() {
    let result = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 6; i++) {
      result += char.charAt(Math.floor(Math.random() * char.length));
    }
    return result;
  };

  
  
//   const templateVars = {
//     username: req.cookies["username"],
//     // ... any other vars
//   };
//   res.render("urls_index", templateVars);
//--------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Hello!");
});
//--------------------------------------------------------------------
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

//--------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//--------------------------------------------------------------------
app.get("/urls", (req, res) => {
  const username = req.cookies["username"]
  const templateVars = { 
    username,  
    urls: urlDatabase 
};
  res.render("urls_index", templateVars);
});
//--------------------------------------------------------------------
app.get("/urls/new", (req, res) => {
    const username = req.cookies["username"]
    const templateVars = { 
      username
  };
    res.render("urls_new", templateVars);
});
//--------------------------------------------------------------------

app.get("/urls.json", (req, res) => {
  res.send(urlDatabase);
});

//--------------------------------------------------------------------

app.get("/urls/:shortURL", (req, res) => {
  const username = req.cookies["username"]
  const templateVars = {
    username,  
    shortURL: req.params.shortURL,
    
    longURL: urlDatabase[req.params.shortURL]
  };
  //console.log(templateVars);
  res.render("urls_show", templateVars);
    
});
//--------------------------------------------------------------------------
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);

});
//--------------------------------------------------------------------
app.get("/login", (req, res) => {
    let userId = req.session.user_id;
    const username = req.cookies["username"]
    let templateVars = {
        username,
        user: users[userID]
    };

    res.render('urls_login',templateVars);
})



app.post("/urls", (req, res) => {
    console.log(req.body);  // Log the POST request body to the console
    //res.send("Ok");         // Respond with 'Ok' (we will replace this)
    const shortURL = generateRandomString();
    const longURL = req.body.longURL;
    urlDatabase[shortURL] = longURL;
    res.redirect('/urls/' + shortURL);

  });
  
 app.post('/urls/:shortURL/delete', (req, res) => {
     if (urlDatabase[req.params.shortURL]) {
         delete urlDatabase[req.params.shortURL];
         res.redirect('/urls');
     }

 })
 app.post('/urls/:shortURL', (req, res) => {
    if (urlDatabase[req.params.shortURL]) {
        urlDatabase[req.params.shortURL] = req.body.longURL;
        res.redirect('/urls');
    }
 })

 app.post("/login", (req, res) => {
     res.cookie("username", req.body.username);
     res.redirect("/urls");
 })

 app.post("/logout", (req, res) => {
     res.clearCookie("username");
     res.redirect("/urls");
 })

 app.get('/register', (req, res) => {
    
    //const username = req.cookies["username"]
    let templateVars = {
        username: null
        
    };
    // display the register form
    res.render('register', templateVars);
  });

app.post('register', (req, res) => {
    //need to extract the info from the body
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

 
});