// app/models/genes.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


//mongodb search by id
//db.genesensembls.find({"id" : "ENSG00000162367"})

// define the schema for our genes model
var genesEnsemblSchema = mongoose.Schema({
        id    : String,
        object_type      : String,
        logic_name       : String,
        version          : Number,
        species          : String,
        description      : String,
        display_name     : String,
        assembly_name    : String,
        biotype          : String,
        end              : Number,
        seq_region_name  : String,
        db_type          : String,
        strand           : Number,
        start            : Number,
        transcript       : Number,
        sequenceGene: String,
});

// create the model for genes and expose it to our app
module.exports = mongoose.model('GenesEnsembl', genesEnsemblSchema);