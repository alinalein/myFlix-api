const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

module.exports = mongoose.model('Movie', movieSchema);