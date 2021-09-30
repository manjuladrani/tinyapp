const express = require("express");
const uuid = require('uuid/v4');

const PORT = 8080;
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { name } = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.set("view engine", "ejs");

//-----------------------------------[URL database]------------------
const urlDatabase = {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com"
  };

  const users = { 
    "userRandomID": {
      id: "userRandomID", 
      email: "user@example.com", 
      password: "purple-monkey-dinosaur"
    },
   "user2RandomID": {
      id: "user2RandomID", 
      email: "user2@example.com", 
      password: "dishwasher-funk"
    }
  }
const generateRandomString = function() {
    let result = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 6; i++) {
      result += char.charAt(Math.floor(Math.random() * char.length));
    }
    return result;
  };
 const createNewUser_id = () => {
     return user_Id = uuid().substr(0, 7);
     
    //  const newuserid = {
    //      id: user_Id,
         
    //  };
    //  users[user_Id] = newuserid;
 }
 const finduserByEmail = function (email, users) {
    for (let userId in users) {
        
        if (email === users[userId].email) {
            return true;
        }
    }
    return false;
};
const auyhenticateUser =function (email, password, users) {

    const userFound = finduserByEmail(email, users);

    if(userFound && userFound.password === password) {
        return userFound;
    }
    return false;
}
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
    //const username = req.cookies["username"]
    let templateVars = {
        //username,
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
    console.log('req.body:', req.body);
    const email = req.body.email;
    const password = req.body.password;
    const user = finduserByEmail(req.body.email, users);
    //  if(req.body.password === user['password']){
    //      req.session.user_id = user.id;
    //      res.redirect('/urls');
    //  }

    
    req.session.user_id = user.id;
     res.cookie('user_Id', user_Id);
     res.cookie("username", req.body.username);
     res.redirect("/urls");
 });

 app.post("/logout", (req, res) => {
     res.clearCookie("username");
     res.redirect("/urls");
 })

 app.get('/register', (req, res) => {
    
    const username = req.cookies["username"]
    let templateVars = {
        username: null
        
    };
    
    // display the register form
    res.render('register', templateVars);
  });

app.post('/register', (req, res) => {
    //need to extract the info from the body
    console.log('req.body:', req.body);
    const email = req.body.email;
    const password = req.body.password;

    
if (finduserByEmail(email)) {
    res.redirect(400, '/register');
  } else if (!email) {
    res.redirect(400, '/register');
  } else if (!password) {
    res.redirect(400, '/register');
  } else {
      const username = generateRandomString;
      const user_Id = createNewUser_id();
     users[user_Id] = {
         id: user_Id,
         email,
         password
     };
  }
  res.cookie('user_Id', user_Id);
  res.cookie("username", req.body.user_Id);
  res.redirect('/urls');
});



    
