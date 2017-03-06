// app/models/genes.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


//mongodb search by id
//db.genesensembls.find({"id" : "ENSG00000162367"})

// define the schema for our genes model
var genesNcbiSchema = mongoose.Schema({
        id         : String,
        dbBuild      : String,
        name       : String,
        description : String,
        status  : String,
        currentId   : String,
        chromosome    : String,
        geneticSource     : String,
        mapLocation      : String,
        otherAliases   : String,
        otherDesignations      : String,
        nomenclatureName    : String,
        nomenclatureStatus  : String,
        intt      : String,
        exonCount      : String,
        geneWeight      : String,
        summary      : String,
        chrSort      : String,
        scientificName      : String,
        commonName      : String,
        taxId      : String,
});

// create the model for genes and expose it to our app
module.exports = mongoose.model('GenesNcbi', genesNcbiSchema);