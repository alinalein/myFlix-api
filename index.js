/* eslint-disable no-undef */
// const express = require('express'),
//     app = express(),
    // morgan = require('morgan'),
    // fs = require("fs"),
    // path = require("path"),
    // bodyParser = require('body-parser'),
    // mongoose = require('mongoose'),

    // CHECK  !!!!!!!!!
    // Models = require('./models.js'),
    // Movies = Models.Movie,
    // Users = Models.User;
    // middleware from express -> Cross-Origin Resource Sharing 
    // cors = require('cors');

    // const { check, validationResult } = require('express-validator');
    // require('dotenv').config()

// to connect Mongoose to local DB-> mongoose.connect('mongodb://localhost:27017/movies_apiDB');
// connects Mongoose to the DB in Mongo Atlas 
// mongoose.connect(process.env.CONNECTION_URI);

// so I can use req.body 
// app.use(bodyParser.json());

// directs to the documentation.html
// app.use(express.static('public'));

// adds middleware to parse incoming requests with URL-encoded payloads
// app.use(express.urlencoded({ extended: true }));

// allowed CORS origins (app.use(cors()); -> If allow access for everyone)
// let allowedOrigins = ['http://localhost:8080', 'http://localhost:4200', 'http://localhost:1234', 'https://alinalein.github.io', 'https://movie-api-lina-834bc70d6952.herokuapp.com', 'https://myflix-alinalein.netlify.app'];
// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             let message = 'The CORS policy for this application doesn\'t allow access from origin' + origin;
//             return callback(new Error(message), false);
//         }
//         return callback(null, true);
//     }
// }));

// makes sure express gets to json format 
// app.use(express.json());
// (app)-> applies express also to auth.js

//  CHECK !!!!!!!!!!
// require('./src/routes/auth.js')(app);

// const passport = require('passport');

//  CHECK !!!!!!!!!!
// require('./passport');

// create a write stream & path.join appends it to ‘log.txt’ file in root directory
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
// request should be logged used the common morgan format & stream specifies to write/log the request details to -> accessLogStream
// app.use(morgan('combined', { stream: accessLogStream }));

// /**
//  * GET route to the index page.
//  * @function
//  * @name indexRoute
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  * @returns {String} Containing the message ("Welcome to the best movie search app ever!(Maybe😁))
//  */
// app.get('/', (req, res) => {
//     res.send('Welcome to the best movie search app ever!(Maybe😁)');
// });

// /**
//  * GET route to get all movies.
//  * @function
//  * @name getMovies
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  * @returns {Promise<Object[]>} Containing an array of all fetched movies from the database if promise resolved.
//  * @throws {Error} If a problem occurs while fetching the movies from the database or if the user is not logged in.
//  */
// // applies the jwt authentication to every route, except register
// app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     await Movies.find()
//         .then((movies) => {
//             res.status(201).json(movies);
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(400).send('An Error occurred: ' + err);
//         })
// });

// /**
//  * GEt route to get the requested movie.
//  * @function
//  * @name getMovie
//  * @param {Object} req - Express request object. Parameters: {String} Title - (movie Title)
//  * @param {Object} res - Express response object.
//  * @returns {Promise<Object>} Containing the requested movie if promise resolved.
//  * @throws {Error} If a problem occurs while fetching the requested movie from the database or if the user is not logged in..
//  */
// app.get('/movies/title/:Title', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     try {
//         const foundMovie = await Movies.findOne({ Title: req.params.Title })
//         if (!foundMovie) {
//             return res.status(200).send('Can\'t find a movie with this title: ' + req.params.Title)
//         }
//         res.status(201).json(foundMovie);
//     } catch (err) {
//         console.error(err);
//         res.status(400).send('An Error occurred: ' + err);
//     }
// });

// /**
//  * GEt route to get the requested director.
//  * @function
//  * @name getDirector
//  * @param {Object} req - Express request object. Parameters: {String} Director - (movie Director)
//  * @param {Object} res - Express response object.
//  * @returns {Promise<Object>} Containing the requested director if promise resolved.
//  * @throws {Error} If a problem occurs while fetching the requested director from the database or if the user is not logged in..
//  */
// app.get('/movies/director/:Director', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     await Movies.findOne({ 'Director.Name': req.params.Director }, 'Director')
//         .then((movies) => {
//             res.status(201).json(movies.Director);
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(400).send('An Error occurred:  ' + err);
//         })
// });

// /**
//  * GET route to get the requested genre.
//  * @function
//  * @name getGenre
//  * @param {Object} req - Express request object. Parameters: {String} Genre - (movie Genre)
//  * @param {Object} res - Express response object.
//  * @returns {Promise<Object>} Containing the requested genre if promise resolved.
//  * @throws {Error} If a problem occurs while fetching the requested genre from the database or if the user is not logged in.
//  */
// app.get('/movies/genre/:Genre', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     // Genre.Name from DB -> req.params.Genre -> Genre from URL
//     await Movies.findOne({ 'Genre.Name': req.params.Genre }, 'Genre')
//         .then((movies) => {
//             res.status(201).json(movies.Genre);
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(400).send('Can\'t find the genre-Err: ' + err);
//         })
// });

// /**
//  * POST route to singup as an user to the application.
//  * @function
//  * @name signupUser
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  * @returns {Promise<Object>} Containing details (Username, Email, Birthday) of the new singed up user if promise resolved.
//  * @throws {Error} If a problem occurs while the user tried to sign up.
//  * @description This route handles user sign-up. It validates the user input, checks for existing usernames, and then creates a new user in the database if the input is valid.
//  */
// app.post('/users/signup',
//     // use express validation methods
//     [check('Username', 'The user name is required and must be at least 5 characters long').isLength({ min: 5 }),
//     check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//     check('Password', 'The password is required and must be at least 8 characters long').not().isEmpty().isLength({ min: 8 }),
//     check('Email', 'Please type a valid email').isEmail(),
//     ], async (req, res) => {

//         let errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             // extract error messages from validation errors
//             const errorMessages = errors.array().map(error => error.msg);

//             // log all error messages
//             errorMessages.forEach(errorMessage => {
//                 console.error(`Validation error: ${errorMessage}`);
//             });

//             // send the error messages array with status 422
//             return res.status(422).json({ errors: 'Validation failed: ' + errorMessages });
//         }
//         let hashedPassword = Users.hashPassword(req.body.Password);
//         await Users.findOne({ Username: req.body.Username })
//             .then((user) => {
//                 if (user) {
//                     res.status(401).send('User with ' + req.body.Username + ' already exist');
//                 } else {
//                     Users.create({
//                         Username: req.body.Username,
//                         Password: hashedPassword,
//                         Email: req.body.Email,
//                         Birthday: req.body.Birthday
//                     })
//                         .then((user) => {
//                             res.status(201).json({
//                                 status: 'Successfully signed up!',
//                                 Username: user.Username,
//                                 Email: user.Email,
//                                 Birthday: user.Birthday
//                             });
//                         })
//                         .catch((err) => {
//                             console.error(err);
//                             res.status(400).send('An Error occurred 1: ' + err);
//                         })
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//                 res.status(400).send('An Error occurred 2: ' + err);
//             })
//     });

// /**
//  * GET route to get info about the requested user.
//  * @function
//  * @name getUserInfo
//  * @param {Object} req - Express request object. Parameters: {String} Username - (user Username)
//  * @param {Object} res - Express response object.
//  * @returns {Promise<Object>} Containing details (Username, Email, Birthday) about the requested user if promise resolved.
//  * @throws {Error} If a problem occurs while fetching infos about the requested user from the database or if the user is not logged in.
//  */
// app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     await Users.findOne({ Username: req.params.Username })
//         .then((user) => {
//             res.status(201).json({
//                 Username: user.Username,
//                 Email: user.Email,
//                 Birthday: user.Birthday,
//                 FavoriteMovies: user.FavoriteMovies

//             });
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(400).send('An Error occurred: ' + err);
//         })
// });

// /**
//  * PUT route to update user details.
//  * @function
//  * @name updateUserDetails
//  * @param {Object} req - Express request object. Parameters: {String} Username - (user Username)
//  * @param {Object} res - Express response object.
//  * @returns {Promise<Object>} Containing details (Username, Email, Birthday, FavoriteMovies) about the updated user if promise resolved.
//  * @throws {Error} If a problem occurs while updating the user details in the database or if the user is not logged in.
//  * @description This route allows a logged-in user to update their user details such as username (if the username is not in the database yet), email, and birthday. Only the changed details are updated in the database.
//  */
// app.put('/users/update/:Username',
//     [check('Username', 'The user name is required and must be at least 5 characters long').isLength({ min: 5 }),
//     check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric()
//         // check('Password', 'The password is required and must be at least 8 characters long').not().isEmpty().isLength({ min: 8 }),
//         // .matches(/\d/)
//         //.optional()
//         // .withMessage('Password must contain at least 1 number')
//         // .matches(/[A-Za-z]/)
//         // .withMessage('Password must contain at least 1 letter')
//         // check('Email', 'Please type a valid email').isEmail()
//     ],

//     passport.authenticate('jwt', { session: false }), async (req, res) => {

//         if (req.user.Username !== req.params.Username) {
//             return res.status(400).send('Permission denied!')
//         }
//         console.log('req.Body:', req.body)

//         let errors = validationResult(req);
//         console.log('error:', errors)
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }

//         try {
//             // extract Username from req.body
//             const { Username } = req.body;

//             // check if new username already in the BD
//             const existingUser = await Users.findOne({ Username });
//             // if the username already in DB and not owned by current user -> give an error message
//             if (existingUser && existingUser.Username !== req.params.Username) {
//                 return res.status(401).json({ error: 'Username is already in use.  Please choose another username' });
//             }
//             // set values only if they are provided in the request body
//             const updateFields = {};
//             if (req.body.Username) updateFields.Username = req.body.Username;
//             if (req.body.Password) updateFields.Password = Users.hashPassword(req.body.Password);
//             if (req.body.Email !== "" && req.body.Email !== null) updateFields.Email = req.body.Email;
//             if (req.body.Birthday) updateFields.Birthday = req.body.Birthday;

//             // update the user with new value and only the fields that been updated by user
//             const updatedUser = await Users.findOneAndUpdate(
//                 { Username: req.params.Username },
//                 { $set: updateFields },
//                 { new: true }
//             );

//             res.status(200).json({
//                 Username: updatedUser.Username,
//                 Email: updatedUser.Email,
//                 Birthday: updatedUser.Birthday,
//                 FavoriteMovies: updatedUser.FavoriteMovies
//             });
//         } catch (err) {
//             console.error(err);
//             res.status(500).send('Internal Server Error: ' + err);
//         }
//     });

// /**
//  * PUT route to add the requested movie to the user's favorite movies list.
//  * @function
//  * @name addMovie
//  * @param {Object} req - Express request object. Parameters: {String} Username - (user Username), {String} MovieID - (movie ID)
//  * @param {Object} res - Express response object.
//  * @returns {Promise<Object>} Containing details (Username, FavoriteMovies) about the updated user and a message ("Successfully added the movie to the favorite List!") if promise resolved.
//  * @throws {Error} If a problem occurs while adding the movie to the users favorite movies in the database or if the user is not logged in.
//  */
// app.put('/users/:Username/movies/add/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     if (req.user.Username !== req.params.Username) {
//         return res.status(400).send('Permission denied!')
//     }
//     await Users.findOneAndUpdate({ Username: req.params.Username },
//         { $push: { FavoriteMovies: req.params.MovieID } },
//         { new: true })
//         .then((updatedUser) => {
//             res.status(201).json({
//                 message: 'Successfully added the movie to the favorite List!\n',
//                 updatedUser: {
//                     Username: updatedUser.Username,
//                     FavoriteMovies: updatedUser.FavoriteMovies,
//                 }
//             })
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(400).send('Couldn\t add movie to favorites List-Err: ' + err);
//         })
// });

// /**
//  * DELETE route to delete the requested movie from the user's favorite movies list.
//  * @function
//  * @name deleteMovie
//  * @param {Object} req - Express request object. Parameters: {String} Username - (user Username), {String} MovieID - (movie ID)
//  * @param {Object} res - Express response object.
//  * @returns {Promise<Object>} Containing details (Username, FavoriteMovies) about the updated user and a message ("Successfully deleted the movie from the favorite list!") if promise resolved.
//  * @throws {Error} If a problem occurs while removing the movie from the users favorite movies in the database or if the user is not logged in.
//  */
// app.delete('/users/:Username/movies/remove/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     if (req.user.Username !== req.params.Username) {
//         return res.status(400).send('Permission denied!')
//     }
//     await Users.findOneAndUpdate({ Username: req.params.Username },
//         { $pull: { FavoriteMovies: req.params.MovieID } },
//         { new: true })
//         .then((updatedUser) => {
//             res.status(200).json({
//                 message: 'Successfully deleted the movie from the favorite list!',
//                 updatedUser: {
//                     Username: updatedUser.Username,
//                     FavoriteMovies: updatedUser.FavoriteMovies,
//                 }
//             });
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(400).send('Movie couldn\'t be deleted from favorite Movies-Err: ' + err);
//         })
// });

// /**
//  * DELETE user from the database.
//  * @function
//  * @name deleteUser
//  * @param {Object} req - Express request object. Parameters: {String} Username - (user Username)
//  * @param {Object} res - Express response object.
//  * @returns {Promise<String>} Containing the message ("User with Username: ' + req.params.Username + ' was deleted") if promise resolved.
//  * @throws {Error} If a problem occurs while removing the user from the database or if the user is not logged in.
//  */
// app.delete('/users/deregister/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     if (req.user.Username !== req.params.Username) {
//         return res.status(400).send('Permission denied!');
//     }
//     try {
//         const user = await Users.findOneAndDelete({ Username: req.params.Username });
//         if (!user) {
//             return res.status(400).send('No user with Username: ' + req.params.Username + ' found');
//         } else {
//             return res.status(201).json({
//                 message: 'User with Username: ' + req.params.Username + ' was deleted'
//             });
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(400).send('User couldn\'t be deleted-Err: ' + err);
//     }
// });

// app.use((err, req, res) => {
//     console.error(err.stack);
//     res.status(500).send('Internal Server Error');
// });

// // checks port number of hosting service -> if there is none, server will use port 8080
// const port = process.env.PORT || 8080;
// app.listen(port, '0.0.0.0', () => {
//     console.log('Listening on Port ' + port);
// });