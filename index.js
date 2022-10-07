const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile('home.html', {root: __dirname })
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.sendFile('user.json', {root: __dirname })
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login/:username/:password', (req,res) => {
  let rawuser = fs.readFileSync('./user.json', 'utf8'),
  user = JSON.parse(rawuser);
// In the if (operation == 'insert') block
var hasUser = user.username === req.params.username;
if (hasUser) {
  var ifCorrect = user.password === req.params.password;
  if( ifCorrect ){
    res.send({
      status: true,
      message: "User Is valid"
  });
}
  else{
    res.send({
      status: false,
      message: "Password is invalid"
  });
  }
  }
  else{
    res.send({
      status: false,
      message: "User Name is invalid"
  });
  }

});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  res.send("<b> "+req.params.username+" successfully logged out.<b>");
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));