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
// const urlDatabase = {
//     "b2xVn2": "http://www.lighthouselabs.ca",
//     "9sm5xK": "http://www.google.com"
//   };

  const urlDatabase = {
    b6UTxQ: {
        longURL: "https://www.tsn.ca",
        userID: "aJ48lW"
    },
    i3BoGr: {
        longURL: "https://www.google.ca",
        userID: "aJ48lW"
    }
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
            return users[userId];
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
  const user_id = req.cookies["user_id"];
  const user = users[user_id];
  const templateVars = { 
    user,  
    urls: urlDatabase 
};
  res.render("urls_index", templateVars)
});
//--------------------------------------------------------------------
app.get("/urls/new", (req, res) => {
    const user_id = req.cookies["user_id"];
    const user = users[user_id];
    const templateVars = { 
      user
  };
    res.render("urls_new", templateVars);
});
//--------------------------------------------------------------------

/* app.get("/urls.json", (req, res) => {
  res.send(urlDatabase);
}); */

//--------------------------------------------------------------------

app.get("/urls/:shortURL", (req, res) => {
  const user_id = req.cookies["user_id"];
  const user = users[user_id];
  const templateVars = {
    user,  
    shortURL: req.params.shortURL,
    
    longURL: urlDatabase[req.params.shortURL]['longURL']
  };
  //console.log(templateVars);
  res.render("urls_show", templateVars);
    
});
//--------------------------------------------------------------------------
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]['longURL'];
  res.redirect(longURL);

});
//--------------------------------------------------------------------
app.get("/login", (req, res) => {
    let user_id = req.cookies['user_id'];
    //const username = req.cookies["user_Id"]
    let templateVars = {
        user: null
    };

    res.render('login',templateVars);
})




app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  //res.send("Ok");         // Respond with 'Ok' (we will replace this)
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;
  //longURL = urlDatabase
  const user_id  = req.cookies["user_id"];
  urlDatabase[shortURL] = {};
  urlDatabase[shortURL]['longURL'] = longURL;
  urlDatabase[shortURL]['userID'] = user_id;
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
        urlDatabase[req.params.shortURL]['longURL'] = req.body.longURL;
        res.redirect('/urls');
    }
 })

 app.post("/login", (req, res) => {
    console.log('req.body:', req.body);
    const email = req.body.email;
    const password = req.body.password;
    const user = finduserByEmail(email, users);
    //console.log("user Id from line 170", useId);
    console.log(user);
    console.log(user['id']);
    const user_id = user['id'];
   // const newUserrandomID = generateRandomString()
   
    
    //res.cookie("username", email);
     if(user) {
      //  console.log('password' + password + 'l');
      //  console.log(user['password']);
      if(user['password'] === password) {
        res.cookie("user_id", user_id);
        return res.redirect("/urls");
      }
      console.log("Bad password");
      return res.redirect("/login");
    }

    console.log("Bad email");
    return res.redirect("/login");
    
});

 app.post("/logout", (req, res) => {
     res.clearCookie("user_id");
     res.redirect("/urls");
 })

 app.get('/register', (req, res) => {
    
   const user_id = req.cookies["user_id"]
    let templateVars = {
        user: null
    };
    
    // display the register form
    res.render('register', templateVars);
  });

app.post('/register', (req, res) => {
    //need to extract the info from the body
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send("Email or password cant be empty");
    if (finduserByEmail(email, users)) return res.status(400).send("Email is taken");

    const newUserrandomID = generateRandomString()
    const newUser = {
      id: newUserrandomID,
      email: email,
      password: password
    }

    users[newUserrandomID] = newUser

    res.cookie('user_id', newUserrandomID);
    //res.cookie("username", email);
    res.redirect('/urls');
});


