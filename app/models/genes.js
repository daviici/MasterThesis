// app/models/genes.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our genes model
var genesSchema = mongoose.Schema({

        geneKeggID     : String,
        geneNcbiID	   : String,
        geneEnsemblID  : String,

});

// create the model for genes and expose it to our app
module.exports = mongoose.model('Genes', genesSchema);