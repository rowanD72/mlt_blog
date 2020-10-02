const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require('express-session');
const flash = require('connect-flash');

const fileUpload = require("express-fileupload");

//Controllers
const newPostController = require('./controllers/newPage');
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const menuPost = require("./controllers/menuPost");
const aboutPost = require("./controllers/aboutPost");
const contactPost = require('./controllers/contactPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');



//Middleware Section
const validateMiddleware = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMilddleware');



const PORT = process.env.PORT || 4000;

// Express init
const app = new express();

//EJS init
app.set("view engine", "ejs");

//Connect Flash Middleware
app.use(flash());

//DOT ENV
require("dotenv").config();

//Database
const dbURI = process.env.DATABASE;
const usrURI = process.env.USERDB;

//PORT Display
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//BLOG POST Database
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((res) => console.log("Database is connected"))
  .catch((err) => console.log(err));

//USER DATABASE
mongoose
  .connect(usrURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((res) => console.log("User Database is connected"))
  .catch((err) => console.log(err));



//Body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

//Express Session 
app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))


//Express FileUpload
app.use(fileUpload());


//Hiding login button when user already logged in
global.loggedIn = null;

app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next()
});

//Express Middleware
app.use("/posts/store", validateMiddleware);

//New Post GET Route
app.get("/posts/new", authMiddleware, newPostController);

//Display a list of blog post on the index (home) page
app.get("/", homeController);

//Adding id to each post
//Each Post will now have it's own page
app.get("/post/:id", getPostController);

//BlogPost POST Routes
app.post("/posts/store", authMiddleware, storePostController);

//Register GET Request Route
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

//Register Post Route
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

//Login GET Route
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

//Login Post Route
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

//Logout GET Route
app.get('/auth/logout', logoutController)

//Menu GET Request Route
app.get('/menu', menuPost);

//About GET Request Route
app.get('/about', aboutPost);

//Contact GET Request Route
app.get('/contact', contactPost);


//Contact POST Route
app.post('/contact', contactPost);

//404 NOT FOUND
app.use((req, res) => res.render('notfound'));