const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express(),
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    Movies = Models.Movie,
    Users = Models.User;

const { check, validationResult } = require('express-validator');

//allows Mongoose to connect to local DB-> mongoose.connect('mongodb://localhost:27017/movies_apiDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//so I can use req.body
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
//define allowed origins 
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            let message = 'The CORS policy for this application doesn\'t allow access from origin' * origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

//directs to the documentation.html
app.use(express.static('public'));

app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('An Error occurred: ' + err);
        })
});

// additional message in case the movie is not in the DB 
app.get('/movies/title/:Title', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const foundMovie = await Movies.findOne({ Title: req.params.Title })
        if (!foundMovie) {
            return res.status(200).send('Can\'t find a movie with this title: ' + req.params.Title)
        }
        res.status(201).json(foundMovie);
    } catch (err) {
        console.error(err);
        res.send(400).send('An Error occurred: ' + err);
    }
});

app.get('/movies/director/:Director', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ 'Director.Name': req.params.Director }, 'Director')
        .then((movies) => {
            res.status(201).json(movies.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('An Error occurred:  ' + err);
        })
});

app.get('/movies/genre/:Genre', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ 'Genre.Name': req.params.Genre }, 'Genre')
        .then((movies) => {
            res.status(201).json(movies.Genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('Can\'t find the genre-Err: ' + err);
        })
});

app.post('/users/register', [check('Username', 'Username is required').isLength({ min: 5 }),
check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
check('Password', 'Please type a password').not().isEmpty(),
check('Email', 'Please type a valid email').isEmail()], async (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashedPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                res.status(200).send('User with ' + req.body.Username + ' already exist');
            } else {
                Users.create({
                    Username: req.body.Username,
                    Password: hashedPassword,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                })
                    .then((user) => {
                        res.status(201).json(user);
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(400).send('An Error occurred: ' + err);
                    })
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('An Error occurred: ' + err);
        })
});

app.put('/users/update/:Username', [check('Username', 'Username is required').isLength({ min: 5 }),
check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric()],
    passport.authenticate('jwt', { session: false }), async (req, res) => {

        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }


        if (req.user.Username !== req.params.Username) {
            return res.status(400).send('Permission denied!')
        }

        await Users.findOneAndUpdate({ Username: req.params.Username }, {
            $set: {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        },
            //makes sure that the updated document is returned
            { new: true })
            .then((updatedUser) => {
                res.status(201).json(updatedUser);
            })
            .catch((err) => {
                console.error(err);
                res.status(400).send('Couldn\'t update user data: ' + err);
            })
    });

app.put('/users/:Username/movies/add/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.Username !== req.params.Username) {
        return res.status(400).send('Permission denied!')
    }
    await Users.findOneAndUpdate({ Username: req.params.Username },
        { $push: { FavoriteMovies: req.params.MovieID } },
        { new: true })
        .then((updatedUser) => {
            res.status(201).json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('Couldn\t add movie to favorites List-Err: ' + err);
        })
});

app.delete('/users/:Username/movies/remove/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.Username !== req.params.Username) {
        return res.status(400).send('Permission denied!')
    }
    await Users.findOneAndUpdate({ Username: req.params.Username },
        { $pull: { FavoriteMovies: req.params.MovieID } },
        { new: true })
        .then((updatedUser) => {
            res.status(200).json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('Movie couldn\'t be deleted from favorite Movies-Err: ' + err);
        })
});

app.delete('/users/deregister/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.Username !== req.params.Username) {
        return res.status(400).send('Permission denied!')
    }
    await Users.findOneAndDelete({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(200).send('No user with Username: ' + req.params.Username + ' found');
            } else {
                res.status(201).send('User with Username: ' + req.params.Username + ' was deleted');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('User couldn\'t be deleted-Err: ' + err);
        })
});

//uses the common morgan format 
app.use(morgan('common'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});