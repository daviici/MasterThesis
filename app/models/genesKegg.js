// app/models/genes.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


//mongodb search by id
//db.genesensembls.find({"id" : "ENSG00000162367"})

// define the schema for our genes model
var genesKeggSchema = mongoose.Schema({
        id         : String,
        entry      : String,
        name       : String,
        definition : String,
        orthology  : String,
        organism   : String,
        pathway    : String,
        module     : String,
        brite      : String,
        position   : String,
        motif      : String,
        dblinks    : String,
        structure  : String,
        aaseq      : String,
        ntseq      : String,
});

// create the model for genes and expose it to our app
module.exports = mongoose.model('GenesKegg', genesKeggSchema);