const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./routes/index');
const port = 5000 || process.env.PORT;
const db = require('./config/mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
//using express session
app.use(
  session({
    name: 'crm_bingo',
    secret: 'secretisoutfinally',
    resave: false,
    saveUninitialized: false,
    cookie: {
      //secure:true,
      httpOnly: true,
      maxAge: 20 * 60 * 1000,
    },
  })
);
//serve static files
app.use(express.static('./assets'));

//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//use router
app.use('/', router);

//listening to port
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server running on ${port}`);
  }
});
