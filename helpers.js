const getUserByEmail = function (email, users) {
    for (let userId in users) {
        
        if (email === users[userId].email) {
            return users[userId];
        }
    }
    //return false;
};

const generateRandomString = function() {
    let result = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 6; i++) {
      result += char.charAt(Math.floor(Math.random() * char.length));
    }
    return result;
  };


  // Return an object of URLs with same userID as the user
const urlsForUser = function(id, urlDatabase) {
    const userUrls = {};
    for (const shortURL in urlDatabase) {
      if (urlDatabase[shortURL].userID === id) {
        userUrls[shortURL] = urlDatabase[shortURL];
      }
    }
    return userUrls;
  };

  module.exports = { getUserByEmail, generateRandomString, urlsForUser };