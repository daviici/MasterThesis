
var bodyParser   = require('body-parser');
var https = require('https');
var weka = require('node-weka/lib/weka-lib.js');
var arff = require('node-arff');
var _ = require('underscore');

// Require module 
var SolrNode = require('solr-node');
 
// Create client 
var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'files',
    protocol: 'http',
    debugLevel: 'ERROR' // log4js debug level paramter 
});

var exec = require('exec');

const async = require('async');
const request = require('request');
const util = require('util');


var geralResult='';



function httpGet(url, callback) {
  const options = {
    url :  url,
    json : true
  };
  request(options,
    function(err, res, body) {
      callback(err, body);
    }
  );
}

function sampleClustering(cb) {
  arff.load('data/exemploEnsembl.arff', function (err, data) {

    if (!_.isNull(err)) {
      cb(err);
      return;
    }

    //See Weka Documentation
    var options = {
      'clusterer': 'weka.clusterers.EM',
      'params'   : ''
    };

    weka.cluster(data, options, function (err, result) {
      cb(err, result);
    });

  });
}

module.exports = function(app, passport,http) {

    app.get('/', function(req, res) {
        res.render('index.ejs', {
            user : req.user,
        }); // load the index.ejs file
    });

    app.get('/logout', function (req, res) {
      req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
            res.render('index.ejs'); // load the index.ejs file
        }  
    });  
      
    });

    app.get('/login', function(req, res) {

        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {

        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/addFavorites/:id/:specie', isLoggedIn, function(req, res) {

        var User            = require('../app/models/user');

        var email = req.user.local.email;
        var favoritesnew = req.user.local.favorites;
        var specie = req.params.specie.split(":");
        var id = req.params.id.split(":");

        var newfavorite = specie[1] + ":" + id[1];

        if(isInArray(newfavorite, favoritesnew)){
            res.redirect('/search/:' + specie[1] + "/:" + id[1]);
            return;
        }

        favoritesnew.push(newfavorite);

        var query = {'local.email':email};

        User.findOne(query, function (err, user) {
            user.local.email = req.user.local.email;
            user.local.name = req.user.local.name;
            user.local.institution = req.user.local.institution;
            user.local.password = req.user.local.password;
            user.local.favorites = favoritesnew;

            user.save(function (err) {
                if(err) {
                    res.render('index.ejs');
                    return;
                }
                else{
                    res.redirect('/search/:' + specie[1] + "/:" + id[1]);
                    return;
                }
            });
        });

    });

app.get('/proteins', function(req, res) {

        res.render('proteins.ejs', '');
});

 app.get('/getProteins', function (req, res) {
    var xyz = req.query.textinput.replace(/ /g,"%20");
    var input = xyz.split('\n');

    var urls=[];

    for(var i=0; i<input.length;i++){
        urls.push("http://www.rcsb.org/pdb/rest/describePDB?structureId="+input[i]);
    }

    async.map(urls, httpGet, function (err, resp){
      if (err) return console.log(err);
      console.log(resp);
      
                                    
      res.render('geneslist.ejs', {
        type : "pdb",
        data : resp
      });
    });
  });

 app.get('/solrPage', function(req, res) {

        res.render('solrPage.ejs', '');
});

 app.get('/solrResult', function(req, res) {
if (req.query.initial!='undefined' && req.query.final!='undefined') {
  var myStrQuery = 'q=transcript:['+req.query.initial+'%20TO%20'+req.query.final+']&wt=json';
// Search documents using myStrQuery 
client.search(myStrQuery, function (err, result) {
   if (err) {
      console.log(err);
      return;
   }
   console.log('Response:', result.response);

          res.render('geneslist.ejs', {
          type: "solr",
          numFound: result.response.numFound,
          data: result.response.docs
        });
});

}
//var objQuery = client.query().q("rna")
else{
    if(req.query.textinput!='undefined')
      var objQuery = client.query().q(req.query.textinput)
                                .rows(5000);
    else if(req.query.attStrand!=''&& req.query.attTranscript=='' && req.query.attVersion=='' && req.query.attSeq=='')
      var objQuery = client.query().q({strand:req.query.attStrand})
                                .rows(5000);
    else if(req.query.attTranscript!=''&& req.query.attStrand=='' && req.query.attVersion=='' && req.query.attSeq=='')
      var objQuery = client.query().q({transcript:req.query.attTranscript})
                                .rows(5000);
    else if(req.query.attVersion!=''&& req.query.attStrand=='' && req.query.attTranscript=='' && req.query.attSeq=='')
      var objQuery = client.query().q({version:req.query.attSVersion})
                                .rows(5000);
    else if(req.query.attSeq!=''&& req.query.attStrand=='' && req.query.attTranscript=='' && req.query.attVersion=='')
      var objQuery = client.query().q({seq_region_name:req.query.attSeq})
                                .rows(5000);
    else if(req.query.attStrand!='' && req.query.attTranscript!='' && req.query.attVersion=='' && req.query.attSeq=='')
      var objQuery = client.query().q({strand:req.query.attStrand, transcript:req.query.attTranscript})
                                .rows(5000);
    else if(req.query.attStrand!='' && req.query.attVersion!='' && req.query.attTranscript=='' && req.query.attSeq=='')
      var objQuery = client.query().q({strand:req.query.attStrand, version:req.query.attVersion})
                                .rows(5000);
    else if(req.query.attStrand!='' && req.query.attSeq!='' && req.query.attVersion=='' && req.query.attVersion=='')
      var objQuery = client.query().q({strand:req.query.attStrand, seq_region_name:req.query.attSeq})
                                .rows(5000);                           
    else if(req.query.attStrand!='' && req.query.attTranscript!='' && req.query.attVersion=='' && req.query.attSeq!='')
      var objQuery = client.query().q({strand:req.query.attStrand, transcript:req.query.attTranscript, seq_region_name:req.query.seq_region_name})
                                .rows(5000);
    
    
    else if(req.query.attTranscript!='' && req.query.attVersion!='' && req.query.attStrand=='' && req.query.attSeq=='')
      var objQuery = client.query().q({version:req.query.attVersion, transcript:req.query.attTranscript})
                                .rows(5000);
    else if(req.query.attTranscript!='' && req.query.attSeq!='' && req.query.attVersion=='' && req.query.attStrand=='')
      var objQuery = client.query().q({seq_region_name:req.query.attSeq, transcript:req.query.attTranscript})
                                .rows(5000);
    
    /*var myStrQuery = 'q=transcript:[5%20TO%2010]&wt=json';
     
    // Search documents using myStrQuery 
    client.search(myStrQuery, function (err, result) {
       if (err) {
          console.log(err);
          return;
       }
       console.log('Response:', result.response);
    
     
    
     */
    // Search documents using myStrQuery 
    client.search(objQuery, function (err, result) {
       if (err) {
          console.log(err);
          return;
       }
       console.log('Response:', result.response);
     
    
    
            res.render('geneslist.ejs', {
              type: "solr",
              numFound: result.response.numFound,
              data: result.response.docs
            });
    });
  }
});

  app.get('/getJson', function (req, res) {
// If it's not showing up, just use req.body to see what is actually being passed.
     if((req.query.textinput == '' || req.query.textinput == 'undefined')&& req.query.keggsearch=='on'){
       var options = {
          host: 'rest.kegg.jp',
          path: '/list/' + req.query.specie_id,
          headers: {
            'Content-Type': 'application/json'
        }
        };

        var request = http.get(options, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }

                    //console.log(data);          

                    var result = data.split("\n");
                    //console.log(json);
                    res.render('individual.ejs', {
                        data : result
                    });

                }); 


    }); 
    }
    else if(req.query.keggsearch=='on' && req.query.specie_id !='undefined'){
        var xyz = req.query.textinput.replace(/ /g,"%20");
        var input = xyz.split('\n');
        var specie_id = req.query.specie_id;

        var result1;
        var result2;


        var urls=[];
        var urlsInfo=[];
        var ids=[];

        //add to mongodb kegg gene
        var Genes = require('../app/models/genesKegg');
        
        Genes.find({}, 'id', function(err, genes){
        if(err){
          console.log(err);
        } else{
            for(var i=0; i<genes.length;i++)
            ids.push(genes[i].id);
        }
    });

       /* Genes.find({},  function(err, genes){
        if(err){
          console.log(err);
        } else{
            //console.log('retrieved list of names', genes.length, genes);
        }
    });*/

        for(var i=0; i<input.length;i++){
            urls.push("http://rest.kegg.jp/get/" + req.query.specie_id + ':' +input[i]);
            urlsInfo.push("http://rest.kegg.jp/list/" + req.query.specie_id + ':' +input[i]);
        }
        
        async.map(urls, httpGet, function (err, resp){
          if (err) return console.log(err);

          for(var w=0; w<resp.length; w++){
          var lines = resp[w].split("\n");
            var entries = [];
            var content = [];

            for(var i = 0;i < lines.length;i++){
                if(lines[i].substring(0,1) != ' ')
                    entries.push(lines[i].substring(0,12));
            }
            var datatojson='{';

            var copy2 = resp[w].replace(/(\r\n|\n|\r)/gm,"");
                    //console.log(copy);
                    for(var j = 0;j < entries.length-2;j++){
                        var one = copy2.match(entries[j].trim()+"(.*?)"+entries[j+1].trim());
                        content.push(one[1]);
                        //console.log(one);
                    }

                    for(var i=0;i<entries.length-2;i++){
                        if(i==entries.length-3)
                            datatojson+=''+entries[i]+':'+ " '"+content[i]+"'" +'}';
                        else
                            datatojson+=''+entries[i]+':'+ " '"+content[i]+"'" +',';
                    }
                    var temporary= JSON.stringify(eval("(" + datatojson + ")"));
                    var jsonkegg= JSON.parse(temporary);

                /**
                 * Lets Use our Models
                 * */
                //Lets create a new user
                var copyinput=input[w].replace(/(\r\n|\n|\r)/gm,"");
                    var genes1 = new Genes({id: specie_id + ":" + copyinput, entry: jsonkegg.ENTRY, name: jsonkegg.NAME, definition: jsonkegg.DEFINITION, orthology: jsonkegg.ORTHOLOGY,
                        organism: jsonkegg.ORGANISM, pathway: jsonkegg.PATHWAY, module: jsonkegg.MODULE, brite: jsonkegg.BRITE, position: jsonkegg.POSITION, motif: jsonkegg.MOTIF,
                        dblinks: jsonkegg.DBLINKS, structure: jsonkegg.STRUCTURE, aaseq: jsonkegg.AASEQ, ntseq: jsonkegg.NTSEQ});
       
                var exist=0;
                           //Lets save it
                for(var i=0;i<ids.length;i++){
                    if(specie_id + ":" + copyinput==ids[i])
                        exist=1;
                }
                if(exist==0){
                genes1.save(function (err, userObj) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('saved successfully:', userObj);
                  }
                });
             }

           }
            
        });
    async.map(urlsInfo, httpGet, function (err, resp){
          if (err) return console.log(err);
          res.render('geneslist.ejs', {
                type : "kegg",
                data : resp
            });
      });
   
    }
    else if(req.query.ensemblsearch=='on'){

        var xyz = req.query.textinput.replace(/ /g,"%20");
        var input = xyz.split('\n');
        var result;

        var urls=[];
        var urlsSequence=[];

        for(var i=0; i<input.length;i++){
          //  console.log(input[i]);
            var copyinput= input[i].replace(/(\r\n|\n|\r)/gm,"");
            urls.push("http://rest.ensembl.org/lookup/id/" + copyinput+ '?expand=1');
            urlsSequence.push("http://rest.ensembl.org/sequence/id/" + input[i]);
        }

        

       /*async.map(urlsDavid, httpGet, function (err, resp){
          if (err) return console.log(err);
          console.log(resp);
      });*/

        async.map(urlsSequence, httpGet, function (err, respSeq){
          if (err) return console.log(err);
         // console.log(resp);
     

        async.map(urls, httpGet, function (err, resp){
          if (err) return console.log(err);
          //console.log(resp);
          console.log(respSeq);
          console.log(resp);

          var Genes = require('../app/models/genesEnsembl');
          /**
           * Lets Use our Models
           * */
          //Lets create a new user
          for(var i=0; i<resp.length;i++){
              var genes1 = new Genes({object_type: resp[i].object_type, logic_name: resp[i].logic_name, version: resp[i].version, species: resp[i].species,
                  description: resp[i].description, display_name: resp[i].display_name, assembly_name: resp[i].assembly_name, biotype: resp[i].biotype,
                  end: resp[i].end, seq_region_name: resp[i].seq_region_name, db_type: resp[i].db_type, strand: resp[i].strand, id: resp[i].id,
                  start: resp[i].start, transcript: resp[i].Transcript.length, sequenceGene: respSeq[i]});
          
          //Some modifications in user object
          
          //Lets try to print and see it. You will see _id is assigned.
          
          //Lets save it
          genes1.save(function (err, userObj) {
            if (err) {
              console.log(err);
            } else {
              console.log('saved successfully:', userObj);
            }
          });
           // Update document to Solr server 
        client.update(genes1, function(err, result) {
           if (err) {
              console.log(err);
              return;
           }
           console.log('Response:', result.responseHeader);
        });
        }




          res.render('geneslist.ejs', {
                    data : resp,
                    type : "ensembl"
                });
      });
         });
    }
    else if(req.query.convertTokegg=='on'){
        var xyz = req.query.textinput.replace(/ /g,"%20");
        var input = xyz.split('\n');
        var geneToConvert="";
        var index;
        var inputTemp="";

        var urls=[];

        for(var i=0; i<input.length;i++){
          //  console.log(input[i]);
            var copyinput= input[i].replace(/(\r\n|\n|\r)/gm,"");
            urls.push("http://rest.ensembl.org/lookup/id/" + copyinput+ '?expand=1');
        }

        for(var i=0; i<input.length;i++){
            inputTemp = input[i].replace(/(\r\n|\n|\r)/gm,"");
            index = inputTemp.indexOf("ENSG");

            if (index>=0) {
                geneToConvert+=inputTemp+",";
            }
        }
        console.log(geneToConvert);

        var options2 = {
          host: 'biodb.jp',
          path: '/convert/ensg_id/kegg/'+geneToConvert,
          headers: {
            'Content-Type': 'application/json'
            }
        };

    var request2 = http.get(options2, function (response) {

        var data='';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }  
            console.log("next\n");
            console.log(data);

            var jsonkegg= JSON.parse(data);
            var json1 = jsonkegg.hfs; 
            var listKegg=[];
            for(var i=0; i<json1.length;i++){
                inputTemp = input[i].replace(/(\r\n|\n|\r)/gm,"");
                listKegg.push(inputTemp,json1[i].result.url.toString().split('?')[1]);
            }
             async.map(urls, httpGet, function (err, resp){
          if (err) return console.log(err);
          console.log(resp);

            console.log(listKegg);
            res.render('geneslist.ejs', {
                    data : listKegg,
                    info : resp,
                    type : "covertToKegg"
                });

            });
           
               // result+=data;
            }); 
        }); 
    }
    else if(req.query.convertToEnsembl=='on' && req.query.specie_id !='undefined'){
        var xyz = req.query.textinput.replace(/ /g,"%20");
        var input = xyz.split('\n');
        var geneToConvert="";
        var index;
        var inputTemp="";

        var urls=[];

        for(var i=0; i<input.length;i++){
          //  console.log(input[i]);
            var copyinput= input[i].replace(/(\r\n|\n|\r)/gm,"");
            urls.push("http://rest.kegg.jp/list/" + req.query.specie_id + ':' +copyinput);
        }

        for(var i=0; i<input.length;i++){
            inputTemp = input[i].replace(/(\r\n|\n|\r)/gm,"");
            geneToConvert+=inputTemp+",";
        }
        console.log(geneToConvert);
        var options2 = {
          host: 'biodb.jp',
          path: '/convert/kegg_id/ensg/'+geneToConvert,
          headers: {
            'Content-Type': 'application/json'
            }
        };

    var request2 = http.get(options2, function (response) {

        var data='';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }  
            console.log("next\n");
            console.log(data);

            var jsonkegg= JSON.parse(data);
            console.log(jsonkegg);
            var json1 = jsonkegg.hfs; 
            console.log(json1);
            var listKegg=[];
            
            for(var i=0; i<json1.length;i++){
                inputTemp = input[i].replace(/(\r\n|\n|\r)/gm,"");
                console.log(inputTemp,json1[i].result.url.length);
                if(inputTemp,json1[i].result.url.length>1){
                    listKegg.push(req.query.specie_id+":"+inputTemp,json1[i].result.url[0].toString().split('=')[1]);
                }
                else
                    listKegg.push(req.query.specie_id+":"+inputTemp,json1[i].result.url.toString().split('=')[1]);
            }

            console.log(listKegg);
            async.map(urls, httpGet, function (err, resp){
                if (err) return console.log(err);
                    console.log(resp);

                console.log(listKegg);
                res.render('geneslist.ejs', {
                    data : listKegg,
                    info : resp,
                    type : "convertToEnsembl"
                });

            });
           
               // result+=data;
            }); 
        }); 
       
    }
    else{
        res.send(500,'showAlert');
    }
});



//route da pagina de pesqusa de genes

    app.get('/genes', function(req, res) {


 res.render('genes.ejs', '');
});
    app.get('/wekaPage', function(req, res) {


 res.render('wekaPage.ejs', '');
});

    app.get('/wekaAction', function(req, res) {

     

arff.load('data/exemploHomeoboxNum.arff', function(err, data) {
  if (err) {
    return console.error(err);
  }
  data.randomize();
  console.log(data);
  var options = {
      'clusterer': 'weka.clusterers.SimpleKMeans',
      'params'   : '-init 0 -max-candidates 100 -periodic-pruning 10000 -min-density 2.0 -t1 -1.25 -t2 -1.0 -N 2 -A "weka.core.EuclideanDistance -R first-last" -I 500 -num-slots 1 -S 10'
    };

     var optionsMDBC = {
      'clusterer': 'weka.clusterers.MakeDensityBasedClusterer',
      'params'   : '-M 1.0E-6 -W weka.clusterers.SimpleKMeans -- -init 0 -max-candidates 100 -periodic-pruning 10000 -min-density 2.0 -t1 -1.25 -t2 -1.0 -N 2 -A "weka.core.EuclideanDistance -R first-last" -I 500 -num-slots 1 -S 10'
    };

    var testData = {
  start    : 1,
  end      : 10,
  strand: 30,
  version   : 2,
  transcript       : 34// last is class attribute 
};



    weka.cluster(data, options, function (err, result) {
        console.log("err"+ err);
        console.log("length"+result.length);
      console.log("result" + result);
      console.log(util.inspect(result, false, null));
      console.log(util.inspect(result));
      console.log(JSON.stringify(result, null, 4));
      console.dir(result, { depth: null });
      console.log('connection : %j', result);
      console.dir(result);
      console.log(result.toString);

});

 })
console.log("ok");


 res.render('wekaResult2.ejs', '');
});


//route da listagem geral dos genomes do kegg

    app.get('/genomes', function(req, res) {

console.log(req.body);
     console.log(req.query);//nao passa o selectpicker, body esta vazio
     console.log(req.params);
     console.log(res.locals);

        var options = {
          host: 'rest.kegg.jp',
          path: '/list/genome',
          headers: {
            'Content-Type': 'application/json'
        }
    };

    var request = http.get(options, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }


                    console.log(data);          

                    var result = data.split("\n");

                    res.render('genomes.ejs', {
                        data : result
                    });

                }); 


    }); 
});

    //route da listagem pathway kegg

    app.get('/pathwaykegg', function(req, res) {

        var options = {
          host: 'rest.kegg.jp',
          path: '/list/pathway',
          headers: {
            'Content-Type': 'application/json'
        }
    };

    var request = http.get(options, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }


                    console.log(data);          

                    var result = data.split("\n");

                    res.render('pathwaykegg.ejs', {
                        data : result
                    });

                }); 


    }); 
});


    //route da listagem geral do website com todos os 4000 e tal dados contendo especie, tipologia etc etc

    app.get('/general', function(req, res) {

        var options = {
          host: 'rest.kegg.jp',
          path: '/list/organism',
          headers: {
            'Content-Type': 'application/json'
        }
    };

    var request = http.get(options, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }


                    console.log(data);          

                    var result = data.split("\n");

                    res.render('general.ejs', {
                        data : result
                    });

                }); 


    }); 
});

   

    //route para a lista dos genes de uma especie (ex:hsa) vinda da lista geral

    app.get('/specific/:tipology', function(req, res) {

       var tipology = req.params.tipology;
       var trya = tipology.split(":");
       console.log(trya[1]);

       var options = {
          host: 'rest.kegg.jp',
          path: '/list/' + trya[1],
          headers: {
            'Content-Type': 'application/json'
        }
        };

        var request = http.get(options, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }

                    //console.log(data);          

                    var result = data.split("\n");
                    //console.log(json);
                    res.render('individual.ejs', {
                        data : result
                    });

                }); 


    }); 
});

    //route do pathway de uma especie - pathway dos homo sapiens (hsa) por exemplo

    app.get('/pathway/:tipology', function(req, res) {

       var tipology = req.params.tipology;
       var trya = tipology.split(":");
       console.log(trya[1]);

       var options = {
          host: 'rest.kegg.jp',
          path: '/list/pathway/' + trya[1],
          headers: {
            'Content-Type': 'application/json'
        }
        };

        var request = http.get(options, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }

                    //console.log(data);          

                    var result = data.split("\n");
                    //console.log(json);
                    res.render('pathway.ejs', {
                        data : result
                    });

                }); 


    }); 
});

    //route da lista de genes de um pathway

    app.get('/pathway/genes/:path', function(req, res){

        var xyz = req.params.path.split(':')[1];

        var options = {
          host: 'rest.kegg.jp',
          path: '/link/genes/'+xyz,
          headers: {
            'Content-Type': 'application/json'
        }
        };

        var request = http.get(options, function (response) {

        var data = '';

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }


                //console.log(data);          

                var result = data.split("\n");

                res.render('geneslist.ejs', {
                    data : result,
                    type : "pathway"
                });

            }); 


    }); 

});

    //route da página individual de um gene (recebe a especie e o id do gene - hsa:1)

    app.get('/search/:params/:params2',function(req, res) {

        var params = req.params.params;
        var params2 = req.params.params2;

        if (params == null || params2 == null){
            res.render('index.ejs');
            return;
        }


        var first = params.split(":");
        var second = params2.split(":");
        var index = first[1].indexOf("ENSG");
        console.log(first[1]);
        console.log(second[1]);
        if(first[1]== "PDB"){
          console.log("entrou");
          var urls=[];

   
        urls.push("http://www.rcsb.org/pdb/rest/describePDB?structureId="+second[1]);

        async.map(urls, httpGet, function (err, resp){
         if (err) return console.log(err);
           console.log(resp);
      
                                    
            res.render('geneslist.ejs', {
             type : "pdbIndividual",
             data : resp
            });
        });
      }

        //se gene começa por ensg(ensembl)
        if (index>=0) {
            var sequence;
            var resp;

            var options = {
          host: 'rest.ensembl.org',
          path: '/sequence/id/'+first[1].toString(),
          headers: {
            'Content-Type': 'application/json'
            }
        };

    var request = http.get(options, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }  
            sequence = eval("(function(){return " + data + ";})()");  
            var options2 = {
          host: 'rest.ensembl.org',
          path: '/lookup/id/'+first[1].toString()+'?expand=1',
          headers: {
            'Content-Type': 'application/json;expand=1'
            }
        };
    var request2 = http.get(options2, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }  
                resp = eval("(function(){return " + data + ";})()"); 

                res.render('geneslist.ejs', {
                    data : resp,
                    data2 : sequence,
                    type : "ensemblindividual"
                });
                
            }); 
        }); 
               
        });
    });

           
        return; 
        }
//---------------------
        var options = {
          host: 'rest.kegg.jp',
          path: '/get/' + first[1] + ":" + second[1],
          headers: {
            'Content-Type': 'application/json'
        }
        };

        var request = http.get(options, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }


            console.log(data);
            var lines = data.split("\n");
            var entries = [];
            var content = [];

            for(var i = 0;i < lines.length;i++){
                if(lines[i].substring(0,1) != ' ')
                    entries.push(lines[i].substring(0,12));
            }

            var copy2 = data.replace(/(\r\n|\n|\r)/gm,"");
                    //console.log(copy);
                    for(var j = 0;j < entries.length-2;j++){
                        var one = copy2.match(entries[j].trim()+"(.*?)"+entries[j+1].trim());
                        content.push(one[1]);
                        //console.log(one);
                    }
                    var options2 = {
                      host: 'rest.kegg.jp',
                      path: '/conv/ncbi-geneid/' + first[1] + ":" + second[1],
                      headers: {
                        'Content-Type': 'application/json'
                    }
                };

                var request2 = http.get(options2, function (response2) {

                    var data2 = "";

                    response2.setEncoding('utf8');

                    response2.on('data', function (chunk) {
                        data2 += chunk;
                    }); 

                    response2.on("end", function (err) {


                        data2 = data2.replace(/(\r\n|\n|\r)/gm,"");
                        if(err || !data2 || 0 === data2.length || data2 == ''){
                            res.render('search.ejs', {
                               gene : entries,
                               gene2 : content,
                               user : req.user,
                               specie: first[1],
                               id: second[1]
                           });
                        return;
                        }

                        var id = data2.match("ncbi-geneid(.*)");
                        console.log(id);
                        var options3 = {
                          host:'www.ncbi.nlm.nih.gov',
                          path: '/entrez/eutils/esummary.fcgi?db=gene&id='+id[1].split(":")[1],
                          headers: {
                            'Content_Type': 'application/x-www-form-urlencoded'
                        }
                      };
                      //https://www.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&amp;id=950906
                      // https://www.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=
                      var request3 = https.get(options3, function (response3) {

                        var data = '';

                        response3.setEncoding('utf8');

                        response3.on('data', function (chunk) {
                            data += chunk;
                        }); 

                        response3.on("end", function (err) {                              
                            if(err || data == null || data == ''){
                                res.render('search.ejs', {
                                    gene : entries,
                                    gene2 : content,                                   
                                    user : req.user,
                                    specie: first[1],
                                    id: second[1]

                                });
                                return;
                            }


                                    data = data.replace(/(\r\n|\n|\r)/gm,""); 

                                    console.log(data);    

                                    var outputNCBI = {
                                    };

                                    var one = data.match("<DbBuild>(.*)</DbBuild>");
                                    if(one != null){
                                        outputNCBI.DbBuild=one[1];
                                    }
                                    else{
                                        outputNCBI.DbBuild='Information N/a';
                                    }
                                    var two = data.match("<Name>(.*)</Name>");
                                    if(two != null){
                                        outputNCBI.Name=two[1];
                                    }
                                    else{
                                        outputNCBI.Name='Information N/a';
                                    }
                                    var three = data.match("<Description>(.*)</Description>");
                                    if(three != null){
                                        outputNCBI.Description=three[1];
                                    }
                                    else{
                                        outputNCBI.Description='Information N/a';
                                    }
                                    var four = data.match("<Status>(.*)</Status>");
                                    if(four != null){
                                        outputNCBI.Status=four[1];
                                    }
                                    else{
                                        outputNCBI.Status='Information N/a';
                                    }
                                    var five = data.match("<CurrentID>(.*)</CurrentID>");
                                    if(five != null){
                                        outputNCBI.CurrentID=five[1];
                                    }
                                    else{
                                        outputNCBI.CurrentID='Information N/a';
                                    }
                                    var six = data.match("<Chromosome>(.*)</Chromosome>");
                                    if(six != null){
                                        outputNCBI.Chromosome=six[1];
                                    }
                                    else{
                                        outputNCBI.Chromosome='Information N/a'
                                    }
                                    var seven = data.match("<GeneticSource>(.*)</GeneticSource>");
                                    if(seven != null){
                                        outputNCBI.GeneticSource=seven[1];
                                    }
                                    else{
                                        outputNCBI.GeneticSource='Information N/a';
                                    }
                                    var eight = data.match("<MapLocation>(.*)</MapLocation>");
                                    if(eight != null){
                                        outputNCBI.MapLocation=eight[1];
                                    }
                                    else{
                                        outputNCBI.MapLocation='Information N/a';
                                    }
                                    var nine = data.match("<OtherAliases>(.*)</OtherAliases>");
                                    if(nine != null){
                                        outputNCBI.OtherAliases=nine[1];
                                    }
                                    else{
                                        outputNCBI.OtherAliases='Information N/a';
                                    }
                                    var ten = data.match("<OtherDesignations>(.*)</OtherDesignations>");
                                    if(ten != null){
                                        outputNCBI.OtherDesignations=ten[1];
                                    }
                                    else{
                                        outputNCBI.OtherDesignations='Information N/a';
                                    }
                                    var eleven = data.match("<NomenclatureSymbol>(.*)</NomenclatureSymbol>");
                                    if(eleven != null){
                                        outputNCBI.NomenclatureSymbol=eleven[1];
                                    }
                                    else{
                                        outputNCBI.NomenclatureSymbol='Information N/a';
                                    }
                                    var twelve = data.match("<NomenclatureName>(.*)</NomenclatureName>");
                                    if(twelve != null){
                                        outputNCBI.NomenclatureName=twelve[1];
                                    }
                                    else{
                                        outputNCBI.NomenclatureName='Information N/a';
                                    }
                                    var thirteen = data.match("<NomenclatureStatus>(.*)</NomenclatureStatus>");
                                    if(thirteen != null){
                                        outputNCBI.NomenclatureStatus=thirteen[1];
                                    }
                                    else{
                                        outputNCBI.NomenclatureStatus='Information N/a';
                                    }
                                    var fourteen = data.match("<int>(.*)</int>");
                                    if(fourteen != null){
                                        outputNCBI.int=fourteen[1];
                                    }
                                    else{
                                        outputNCBI.int='Information N/a';
                                    }
                                    var fifteen = data.match("<ChrLoc>(.*)</ChrLoc>");
                                    if(fifteen != null){
                                        outputNCBI.ChrLoc=fifteen[1];
                                    }
                                    else{
                                        outputNCBI.ChrLoc='Information N/a';
                                    }
                                    var nineteen = data.match("<ExonCount>(.*)</ExonCount>");
                                    if(nineteen != null){
                                        outputNCBI.ExonCount=nineteen[1];
                                    }
                                    else{
                                        outputNCBI.ExonCount='Information N/a';
                                    }
                                    var twenty = data.match("<GeneWeight>(.*)</GeneWeight>");
                                    if(twenty != null){
                                        outputNCBI.GeneWeight=twenty[1];
                                    }
                                    else{
                                        outputNCBI.GeneWeight='Information N/a';
                                    }
                                    var twentyone = data.match("<Summary>(.*)</Summary>");
                                    if(twentyone != null){
                                        outputNCBI.Summary=twentyone[1];
                                    }
                                    else{
                                        outputNCBI.Summary='Information N/a';
                                    }
                                    var twentytwo = data.match("<ChrSort>(.*)</ChrSort>");
                                    if(twentytwo != null){
                                        outputNCBI.ChrSort=twentytwo[1];
                                    }
                                    else{
                                        outputNCBI.ChrSort='Information N/a';
                                    }
                                    var twentythree = data.match("<ScientificName>(.*)</ScientificName>");
                                    if(twentythree != null){
                                        outputNCBI.ScientificName=twentythree[1];
                                    }
                                    else{
                                        outputNCBI.ScientificName='Information N/a';
                                    }
                                    var twentyfour = data.match("<CommonName>(.*)</CommonName>");
                                    if(twentyfour != null){
                                        outputNCBI.CommonName=twentyfour[1];
                                    }
                                    else{
                                        outputNCBI.CommonName='Information N/a';
                                    }
                                    var twentyfive = data.match("<TaxID>(.*)</TaxID>");
                                    if(twentyfive != null){
                                        outputNCBI.TaxID=twentyfive[1];
                                    }
                                    else{
                                        outputNCBI.TaxID='Information N/a';
                                    }

                                    var Genes = require('../app/models/genesNcbi');

                                     var genes1 = new Genes({id: outputNCBI.CurrentID, dbBuild: outputNCBI.DbBuild, name: outputNCBI.Name, description: outputNCBI.Description,
                                        status: outputNCBI.Status, chromosome: outputNCBI.Chromosome, geneticSource: outputNCBI.GeneticSource, mapLocation: outputNCBI.MapLocation,
                                        otherAliases: outputNCBI.OtherAliases, otherDesignations: outputNCBI.OtherDesignations, nomenclatureName: outputNCBI.NomenclatureStatus,
                                        intt: outputNCBI.int, exonCount: outputNCBI.ExonCount, geneWeight: outputNCBI.GeneWeight, summary: outputNCBI.Summary,
                                        chrSort: outputNCBI.ChrSort, scientificName: outputNCBI.ScientificName, commonName: outputNCBI.CommonName, taxId: outputNCBI.TaxID});

                                     
                                     
                                     genes1.save(function (err, userObj) {
                                       if (err) {
                                         console.log(err);
                                       } else {
                                         console.log('saved successfully:', userObj);
                                       }
                                     });


                                        res.render('search.ejs', {

                                            gene : entries,
                                            gene2 : content,
                                            geneNCBI: outputNCBI, // get the user out of session and pass to template
                                            user : req.user,
                                           specie: first[1],
                                           id: second[1]
                                        });
                                });

});


});

}); 
});

}); 

});

    //route para procurar informação de um gene por keyword (header)

    app.post('/search', function(req, res) {

        console.log(JSON.stringify(req.body.keyword));
        var xyz = req.body.keyword.replace(/ /g,"%20");
        var options = {
          host: 'rest.kegg.jp',
          path: '/find/genes/'+JSON.stringify(xyz),
          headers: {
            'Content-Type': 'application/json'
        }
         };

        var request = http.get(options, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }

            var result = data.split("\n");

            res.render('geneslist.ejs', {
                data : result
            });

        }); 


    }); 
});

    //route para ir buscar as especies do advanced search - dropdown

    app.get('/asearch', function(req, res) {

        var Specie = require('../app/models/species');

        Specie.find(function(err, species) {
          if (err){ 
            console.error(err);
            res.render('index.ejs');
            return;
        }
        else{
            var species = JSON.parse(JSON.stringify(species));
            res.render('asearch.ejs', {
                data : species
            });
            return; 
        }

    });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function getGenes(app, passport, http, specie_id, input){
    console.log(input);
    var options = {
          host: 'rest.kegg.jp',
          path: '/list/' + specie_id + ':' +input,
          headers: {
            'Content-Type': 'application/json'
        }
         };
        var request = http.get(options, function (response) {

        

        response.setEncoding('utf8');
        var data='';
        response.on('data', function (chunk) {
            data += chunk;
        }); 
        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }
           // console.log(data);
            var result = data.split("\n");
            geralResult+=data;
    });
    });
}
function getGenesEnsembl(app, passport, http, input){
    var options = {
          host: 'rest.ensembl.org',
          path: '/lookup/id/'+input,
          headers: {
            'Content-Type': 'application/json'
            }
        };

    var request = http.get(options, function (response) {

        var data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        }); 

        response.on("end", function (err) {

            if(err || data == null || data == ''){
                res.render('index.ejs');
                return;
            }       
                console.log(data);
                geralResultEnsembl+=data;
            }); 
        }); 

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function isLoggedInBoolean(req) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return true;
    return false;
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function matchExact(r, str) {
 var match = str.match(r);
 return match != null && str == match[0];
}
