const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const handlebarsInstance = exphbs.create({
	defaultLayout: 'main'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use(express.json());

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

// middleware for logging
app.use(async (req, res, next) => {
    const date = new Date().toUTCString();
    const method = req.method;
    const url = req.originalUrl;
    if (!req.session.user) {
          console.log(`[${date}]: ${method} /${url} (Non-Authenticated User)`);        
    } else {
          console.log(`[${date}]: ${method} /${url} (Authenticated User)`); 
    }
    // next should happen regardless
    next()
});

// middleware to check if private access is authorized
app.use("/private", async (req, res, next) => {
    if (!req.session.user) {
          res.status(403).render('form/loginForm', {send: "You are not logged in"});
    } else {
          next()
    }
})

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});