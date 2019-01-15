const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

// Load User Model
require('./models/User');
require('./models/Story');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');
const rfps = require('./routes/rfps');
const tasks = require('./routes/tasks');

// Load Keys
const keys = require('./config/keys');
// Handlebars Helpers
const { truncate, stripTags } = require('./helpers/hbs');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect - current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

//to access form values - can use req.body.title etc
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.engine(
//   'handlebars',
//   exphbs({
//     helpers: {
//       truncate: truncate,
//       stripTags: stripTags
//     },
//     defaultLayout: 'main'
//   })
// );
app.engine(
  'handlebars',
  exphbs({
    helpers: {
      truncate: truncate,
      stripTags: stripTags
    },
    defaultLayout: 'main'
  })
);

app.set('view engine', 'handlebars');

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
);

//to solve error 'unhandled promise rejection - passport.initialize() m/w not in use
app.use(passport.initialize());
app.use([passport.session()]);

//set global vars - access info of signed in user
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//connect to folder public so that we can use our custom css file
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);
app.use('/rfps', rfps);
app.use('/tasks', tasks);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
