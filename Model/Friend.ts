const mongoose = require('mongoose');


const stuffSchema = mongoose.Schema({
    Users_id: {type: Number, require: true},
});

module.exports = mongoose.model('stuff', stuffSchema);