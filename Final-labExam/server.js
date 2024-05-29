const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const session = require('express-session');
const gamesRouter = require('./routes/games');
const newsRouter = require('./routes/news');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel')
const Product = require('./models/productModel')
const path = require("path");
const fs = require("fs");
const visitedProductsRouter = require('./routes/visitedproduct');

const mongoURL="mongodb+srv://faizan:faizan123@gamingcluster.him3olp.mongodb.net/GamingDB"



app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


// Middleware to fetch user from the session
app.use(async (req, res, next) => {
  if (req.session.userId) {
      try {
          const user = await User.findById(req.session.userId);
          res.locals.user = user; // Attach the user object to res.locals
      } catch (error) {
          console.log(error);
      }
  } else {
      res.locals.user = null; // Ensure user is null if not logged in
  }
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(authRoutes);

const {uploadOnCloudinary} = require("./utils/cloudinaryConfig");
const {upload} = require("./middleware/multerConfig");

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
      return next();
  } else {
      res.send(`<script>alert("User not logged in!"); window.location.href = "/login";</script>`);
  }
}


// Routes
app.use('/games', gamesRouter);

app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Radiant' })
})

app.get('/contact', (req, res) => {
    res.render('contact', { pageTitle: 'Contact Us' })
})

app.use('/', visitedProductsRouter);

app.use('/newswire', newsRouter);
// app.get('/newswire', (req, res) => {
//     res.render('newswire', { pageTitle: 'NewsWire' })
// })
app.get('/login', (req, res) => {
  res.render('login')
})

app.use('createGame', gamesRouter);
app.use('createNews', newsRouter);

const productsRouter = require('./routes/fproduct');
app.use(productsRouter);

app.get('/fproducts', (req, res) => {
  res.render('fproducts')
})


app.get('/createGame', (req, res) => {
  res.render('createGame')
})
app.get('/createNews', (req, res) => {
  res.render('createNews')
})
app.get('/editGame', (req, res) => {
  res.render('editGame')
})
app.get('/register', (req, res) => {
  res.render('register')
})


// Connect to MongoDB
async function connectdb(){
    try{
        await mongoose
      .connect(mongoURL)
      .then(() => {
        console.log("DB Connected");
      })
      .catch((err) => {
        console.log("Unable to connect",err);
      });
    }catch(err){
        console.log(err)
    }
    }
    connectdb();


app.listen(4000);