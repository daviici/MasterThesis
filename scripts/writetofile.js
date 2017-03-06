////////////////////////////////////////////////////
/**
 * writeTextFile write data to file on hard drive
 * @param  string  filepath   Path to file on hard drive
 * @param  sring   output     Data to be written
 */



function WriteToFile(ids, content) { 
	
	/*ids = JSON.parse(ids);
	content = JSON.parse(content);
	
	var namefile = content[0];
	namefile = namefile.replace(/^\s+|\s+$/g,"");
	namefile = namefile.substr(0,namefile.indexOf(' '));
	
	var arrayData = [];

	for(var i =0; i< ids.length-2 ; i++) {
		//console.log("1 : " + ids[i] + "  2:  " + content[i]);
		var entry = "kegg_"+ids[i].trim().toLowerCase()+"("+namefile+", '"+content[i].replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
	}

  	var blob = new Blob([arrayData.join('\r\n')], {type: "text/plain;charset=utf-8"});
 	saveAs(blob, "gene_"+namefile+".pl");*/
 	ids = JSON.parse(ids);
	content = JSON.parse(content);
	
	var namefile = content[0];
	namefile = namefile.replace(/^\s+|\s+$/g,"");
	namefile = namefile.substr(0,namefile.indexOf(' '));

	var attributeKeggData="@relation Kegg\n\n@attribute ID string\n@attribute entry string\n@attribute name string\n@attribute definition string\n@attribute orthology string\n@attribute organism string\n@attribute pathway string\n@attribute disease string\n@attribute module string\n@attribute brite string\n@attribute position string\n@attribute motif string\n@attribute dblinks string\n@attribute structure string\n@attribute aaseq string\n@attribute ntseq string\n\n@data";
	var arrayData = [];
	var entry="@data\n"+namefile+",";
	var j=0;
	var attributes=["entry","name","definition","orthology","organism","pathway","brite","position","motif","dblinks","aaseq","ntseq"];

	/*for(var i =0; i< attributes.length ; i++) {
		for(var j=0; j<ids.length-2; j++){
			if(attributes[i]==ids[j].trim().toLowerCase()){
				if(i==ids.length-3)
					entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"");
				else
					entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
				}
			else{
				entry+="noInformation"+",";
			}
		}
	}*/
	var i=0;
	if("entry"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("name"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("definition"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("orthology"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("organism"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("pathway"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("disease"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("module"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("brite"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("position"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("motif"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("dblinks"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("structure"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("aaseq"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("ntseq"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
/*
	for(var i =0; i< ids.length-2 ; i++) {
		attributeKeggData+="@attribute " +ids[i].trim().toLowerCase()+" string\n"
		//console.log("1 : " + ids[i] + "  2:  " + content[i]);
		if(i==ids.length-3)
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"");
		else
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
	}*/

	arrayData.push(attributeKeggData);
	arrayData.push(entry);

  	var blob = new Blob([arrayData.join('\r\n')], {type: "text/plain;charset=utf-8"});
 	saveAs(blob, "gene_"+namefile+".arff");


}



function WriteToFileNCBI(name, content){ 
	
	name = JSON.parse(name);
	geneNCBI = JSON.parse(content);
	
	
	var namefile = content[0];
	namefile = namefile.replace(/^\s+|\s+$/g,"");
	namefile = namefile.substr(0,namefile.indexOf(' '));

	var attributeNCBIData="@relation NCBI\n\n@attribute ID string\n@attribute DbBuild string\n@attribute Name string\n@attribute Description string\n@attribute Status numeric\n@attribute CurrentID numeric\n@attribute Chromosome numeric\n@attribute GeneticSource string\n@attribute MapLocation string\n@attribute OtherAliases string\n@attribute OtherDesignations string\n@attribute NomenclatureSymbol string\n@attribute NomenclatureName string\n@attribute NomenclatureStatus string\n@attribute int numeric\n@attribute ChrLoc numeric\n@attribute ExonCount numeric\n@attribute GeneWeight numeric\n@attribute Summary string\n@attribute ChrSort numeric\n@attribute ScientificName string\n@attribute CommonName string\n@attribute TaxID numeric\n\n@data";
	

	
	var arrayData = [];
      var entry = name+ ","+geneNCBI.DbBuild.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
      geneNCBI.Name.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
      geneNCBI.Description.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.Status.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.CurrentID.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.Chromosome.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.GeneticSource.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.MapLocation.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.OtherAliases.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.OtherDesignations.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.NomenclatureSymbol.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.NomenclatureName.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.NomenclatureStatus.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.int.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.ChrLoc.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.ExonCount.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.GeneWeight.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.Summary.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.ChrSort.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.ScientificName.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.CommonName.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+ ","+
       geneNCBI.TaxID.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"");
		
       arrayData.push(attributeNCBIData);
		arrayData.push(entry);
   
/*
	if (geneNCBI.DbBuild != null) { 
        var entry = "ncbi_dbbuild"+"("+name+", '"+geneNCBI.DbBuild.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    } 
    if (geneNCBI.Name != null) { 
        var entry = "ncbi_name"+"("+name+", '"+geneNCBI.Name.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    } 
    if (geneNCBI.Description != null) { 
        var entry = "ncbi_description"+"("+name+", '"+geneNCBI.Description.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    } 
    if (geneNCBI.Status != null) { 
        var entry = "ncbi_status"+"("+name+", '"+geneNCBI.Status.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    } 
    if (geneNCBI.CurrentID != null) { 
        var entry = "ncbi_currentid"+"("+name+", '"+geneNCBI.CurrentID.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    } 
    if (geneNCBI.Chromosome != null) { 
        var entry = "ncbi_chromosome"+"("+name+", '"+geneNCBI.Chromosome.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.GeneticSource != null) { 
        var entry = "ncbi_geneticsource"+"("+name+", '"+geneNCBI.GeneticSource.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.MapLocation != null) { 
        var entry = "ncbi_maplocation"+"("+name+", '"+geneNCBI.MapLocation.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.OtherAliases != null) { 
        var entry = "ncbi_otheraliases"+"("+name+", '"+geneNCBI.OtherAliases.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.OtherDesignations != null) { 
        var entry = "ncbi_otherdesignations"+"("+name+", '"+geneNCBI.OtherDesignations.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.NomenclatureSymbol != null) { 
        var entry = "ncbi_nomenclaturesymbol"+"("+name+", '"+geneNCBI.NomenclatureSymbol.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.NomenclatureName != null) { 
        var entry = "ncbi_nomenclaturename"+"("+name+", '"+geneNCBI.NomenclatureName.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.NomenclatureStatus != null) { 
        var entry = "ncbi_nomenclaturestatus"+"("+name+", '"+geneNCBI.NomenclatureStatus.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.int != null) { 
        var entry = "ncbi_int"+"("+name+", '"+geneNCBI.int.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.ChrLoc != null) { 
        var entry = "ncbi_chrloc"+"("+name+", '"+geneNCBI.ChrLoc.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
     if (geneNCBI.ExonCount != null) { 
        var entry = "ncbi_exoncount"+"("+name+", '"+geneNCBI.ExonCount.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
     if (geneNCBI.GeneWeight != null) { 
        var entry = "ncbi_geneweight"+"("+name+", '"+geneNCBI.GeneWeight.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
     if (geneNCBI.Summary != null) { 
        var entry = "ncbi_summary"+"("+name+", '"+geneNCBI.Summary.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.ChrSort != null) { 
        var entry = "ncbi_chrsort"+"("+name+", '"+geneNCBI.ChrSort.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.ScientificName != null) { 
        var entry = "ncbi_scientificname"+"("+name+", '"+geneNCBI.ScientificName.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
    if (geneNCBI.CommonName != null) { 
        var entry = "ncbi_commonname"+"("+name+", '"+geneNCBI.CommonName.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }
     if (geneNCBI.TaxID != null) { 
        var entry = "ncbi_taxid"+"("+name+", '"+geneNCBI.TaxID.replace(/^\s+|\s+$/g,"")+"').";
		arrayData.push(entry);
    }	
*/
  	var blob = new Blob([arrayData.join('\r\n')], {type: "text/plain;charset=utf-8"});
 	saveAs(blob, "gene_"+name+".arff");
	
}

function WriteDisease(content, ids) {

	var disease = JSON.parse(content);
	ids = JSON.parse(ids);
	
	var namefile = disease[0];
	namefile = namefile.replace(/^\s+|\s+$/g,"");
	namefile = namefile.substr(0,namefile.indexOf(' '));
	console.log("nam " + namefile);
	var arrayData = [];

	for(var i =0; i< disease.length-2 ; i++) {
		var entry = "disease_"+ids[i].trim().toLowerCase()+"("+namefile+", '"+disease[i].replace(/'/g, "\\'")+"').";

		arrayData.push(entry);
	}

    var blob = new Blob([arrayData.join('\r\n')], {type: "text/plain;charset=utf-8"});
 	saveAs(blob, "disease_"+namefile+".pl");

}

function WritePathway(content, namefile) {
	
	var namefileSplit = namefile.split(":");
	var namePath = namefileSplit[1];
	var namePathWay = namePath.split(",");
	var namepathway = namePathWay[0].substr(0,namePathWay[0].length-1);
	
	//console.log("asafa  " + namepathway + "  --  " + JSON.parse(JSON.stringify(content[i].split("\t")))[1];

	var arrayData = [];
	content = JSON.parse(content);
	for(var i=0; i < content.length; i++) { 
		var entry = "pathway_"+i+"("+namepathway+", '"+ content[i] +"').";

		arrayData.push(entry);
		
	}
	

  	var blob = new Blob([arrayData.join('\r\n')], {type: "text/plain;charset=utf-8"});
 	saveAs(blob, "pathway_"+namepathway+".pl");

} 

function WriteToFileWeka(ids, content) { 
	
	ids = JSON.parse(ids);
	content = JSON.parse(content);
	
	var namefile = content[0];
	namefile = namefile.replace(/^\s+|\s+$/g,"");
	namefile = namefile.substr(0,namefile.indexOf(' '));

	var attributeKeggData="@relation Kegg\n\n@attribute ID string\n@attribute entry string\n@attribute name string\n@attribute definition string\n@attribute orthology string\n@attribute organism string\n@attribute pathway string\n@attribute disease string\n@attribute module string\n@attribute brite string\n@attribute position string\n@attribute motif string\n@attribute dblinks string\n@attribute structure string\n@attribute aaseq string\n@attribute ntseq string\n\n@data";
	var arrayData = [];
	var entry="@data\n"+namefile+",";
	var j=0;
	var attributes=["entry","name","definition","orthology","organism","pathway","brite","position","motif","dblinks","aaseq","ntseq"];

	/*for(var i =0; i< attributes.length ; i++) {
		for(var j=0; j<ids.length-2; j++){
			if(attributes[i]==ids[j].trim().toLowerCase()){
				if(i==ids.length-3)
					entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"");
				else
					entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
				}
			else{
				entry+="noInformation"+",";
			}
		}
	}*/
	var i=0;
	if("entry"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("name"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("definition"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("orthology"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("organism"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("pathway"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("disease"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("module"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("brite"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("position"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("motif"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("dblinks"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("structure"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("aaseq"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
		if("ntseq"==ids[i].trim().toLowerCase()){
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
			i++;
		}else {
			entry += "noinformation"+",";
		}
/*
	for(var i =0; i< ids.length-2 ; i++) {
		attributeKeggData+="@attribute " +ids[i].trim().toLowerCase()+" string\n"
		//console.log("1 : " + ids[i] + "  2:  " + content[i]);
		if(i==ids.length-3)
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"");
		else
			entry += content[i].replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+",";
	}*/

	arrayData.push(attributeKeggData);
	arrayData.push(entry);

  	var blob = new Blob([arrayData.join('\r\n')], {type: "text/plain;charset=utf-8"});
 	saveAs(blob, "gene_"+namefile+".arff");

}
/*id,species,source,type,logic_name,description,display_name,assembly_name,seq_region_name,start,end,strand,version,db_type,transcript*/
function WtritoToFileEnsembl(id,species,source,type,logic_name,description,display_name,assembly_name,seq_region_name,start,end,strand,version,db_type,transcript,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14,b15,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,d15,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12,g13,g14,g15,h1,h2,h3,h4,h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,h15,i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,j1,j2,j3,j4,j5,j6,j7,j8,j9,j10,j11,j12,j13,j14,j15,k1,k2,k3,k4,k5,k6,k7,k8,k9,k10,k11,k12,k13,k14,k15,l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,o1,o2,o3,o4,o5,o6,o7,o8,o9,o10,o11,o12,o13,o14,o15,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,aa1,aa2,aa3,aa4,aa5,aa6,aa7,aa8,aa9,aa10,aa11,aa12,aa13,aa14,aa15,ab1,ab2,ab3,ab4,ab5,ab6,ab7,ab8,ab9,ab10,ab11,ab12,ab13,ab14,ab15,ac1,ac2,ac3,ac4,ac5,ac6,ac7,ac8,ac9,ac10,ac11,ac12,ac13,ac14,ac15,ad1,ad2,ad3,ad4,ad5,ad6,ad7,ad8,ad9,ad10,ad11,ad12,ad13,ad14,ad15,ae1,ae2,ae3,ae4,ae5,ae6,ae7,ae8,ae9,ae10,ae11,ae12,ae13,ae14,ae15,af1,af2,af3,af4,af5,af6,af7,af8,af9,af10,af11,af12,af13,af14,af15,ag1,ag2,ag3,ag4,ag5,ag6,ag7,ag8,ag9,ag10,ag11,ag12,ag13,ag14,ag15,ah1,ah2,ah3,ah4,ah5,ah6,ah7,ah8,ah9,ah10,ah11,ah12,ah13,ah14,ah15,ai1,ai2,ai3,ai4,ai5,ai6,ai7,ai8,ai9,ai10,ai11,ai12,ai13,ai14,ai15,aj1,aj2,aj3,aj4,aj5,aj6,aj7,aj8,aj9,aj10,aj11,aj12,aj13,aj14,aj15) { 
	
	var namefile = "wekaDatasets";

	//var attributeKeggData="@relation Kegg\n@attribute ID string\n@attribute entry string\n@attribute name string\n@attribute definition string\n@attribute orthology string\n@attribute organism string\n@attribute pathway string\n@attribute module string\n@attribute brite string\n@attribute position string\n@attribute motif string\n@attribute dblinks string\n@attribute structure string\n@attribute aaseq string\n@attribute ntseq string\n\n@data";
	var attributeEnsemblData="@relation Ensembl\n\n@attribute ID string\n@attribute species string\n@attribute source string\n@attribute type string\n@attribute logic_name string\n@attribute description string\n@attribute display_name string\n@attribute assembly_name string\n@attribute seq_region_name numeric\n@attribute start numeric\n@attribute end numeric\n@attribute strand numeric\n@attribute version numeric\n@attribute db_type string\n@attribute transcript numeric\n\n@data";
	
	var arrayData = [];
	arrayData.push(attributeEnsemblData);
var entry= id+","/*+species+","+source+","+type+","+logic_name+","+description.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+display_name+","+assembly_name+","+seq_region_name+","*/+start+","+end+","+strand+","+version+","+db_type+","+transcript+"\n"+
			a1+","/*+a2+","+a3+","+a4+","+a5+","+a6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+a7+","+a8+","+a9+","*/+a10+","+a11+","+a12+","+a13+","+a14+","+a15+"\n"+
			b1+","/*+b2+","+b3+","+b4+","+b5+","+b6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+b7+","+b8+","+b9+","*/+b10+","+b11+","+b12+","+b13+","+b14+","+b15+"\n"+
			c1+","/*+c2+","+c3+","+c4+","+c5+","+c6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+c7+","+c8+","+c9+","*/+c10+","+c11+","+c12+","+c13+","+c14+","+c15+"\n"+
			d1+","/*+d2+","+d3+","+d4+","+d5+","+d6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+d7+","+d8+","+d9+","*/+d10+","+d11+","+d12+","+d13+","+d14+","+d15+"\n"+
			e1+","/*+e2+","+e3+","+e4+","+e5+","+e6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+e7+","+e8+","+e9+","*/+e10+","+e11+","+e12+","+e13+","+e14+","+e15+"\n"+
			f1+","/*+f2+","+f3+","+f4+","+f5+","+f6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+f7+","+f8+","+f9+","*/+f10+","+f11+","+f12+","+f13+","+f14+","+f15+"\n"+
			g1+","/*+g2+","+g3+","+g4+","+g5+","+g6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+g7+","+g8+","+g9+","*/+g10+","+g11+","+g12+","+g13+","+g14+","+g15+"\n"+
			h1+","/*+h2+","+h3+","+h4+","+h5+","+h6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+h7+","+h8+","+h9+","*/+h10+","+h11+","+h12+","+h13+","+h14+","+h15+"\n"+
			i1+","/*+i2+","+i3+","+i4+","+i5+","+i6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+i7+","+i8+","+i9+","*/+i10+","+i11+","+i12+","+i13+","+i14+","+i15+"\n"+
			j1+","/*+j2+","+j3+","+j4+","+j5+","+j6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+j7+","+j8+","+j9+","*/+j10+","+j11+","+j12+","+j13+","+j14+","+j15+"\n"+
			k1+","/*+k2+","+k3+","+k4+","+k5+","+k6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+k7+","+k8+","+k9+","*/+k10+","+k11+","+k12+","+k13+","+k14+","+k15+"\n"+
			l1+","/*+l2+","+l3+","+l4+","+l5+","+l6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+l7+","+l8+","+l9+","*/+l10+","+l11+","+l12+","+l13+","+l14+","+l15+"\n"+
			m1+","/*+m2+","+m3+","+m4+","+m5+","+m6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+m7+","+m8+","+m9+","*/+m10+","+m11+","+m12+","+m13+","+m14+","+m15+"\n"+
			n1+","/*+n2+","+n3+","+n4+","+n5+","+n6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+n7+","+n8+","+n9+","*/+n10+","+n11+","+n12+","+n13+","+n14+","+n15+"\n"+
			o1+","/*+o2+","+o3+","+o4+","+o5+","+o6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+o7+","+o8+","+o9+","*/+o10+","+o11+","+o12+","+o13+","+o14+","+o15+"\n"+
			p1+","/*+p2+","+p3+","+p4+","+p5+","+g6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+p7+","+p8+","+p9+","*/+p10+","+p11+","+p12+","+p13+","+p14+","+p15+"\n"+
			q1+","/*+q2+","+q3+","+q4+","+q5+","+q6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+q7+","+q8+","+q9+","*/+q10+","+q11+","+q12+","+q13+","+q14+","+q15+"\n"+
			r1+","/*+r2+","+r3+","+r4+","+r5+","+r6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+r7+","+r8+","+r9+","*/+r10+","+r11+","+r12+","+r13+","+r14+","+r15+"\n"+
			s1+","/*+s2+","+s3+","+s4+","+s5+","+s6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+s7+","+s8+","+s9+","*/+s10+","+s11+","+s12+","+s13+","+s14+","+s15+"\n"+
			aa1+","/*+aa2+","+aa3+","+aa4+","+aa5+","+aa6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+aa7+","+aa8+","+aa9+","*/+aa10+","+aa11+","+aa12+","+aa13+","+aa14+","+aa15+"\n"+
			ab1+","/*+ab2+","+ab3+","+ab4+","+ab5+","+ab6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+ab7+","+ab8+","+ab9+","*/+ab10+","+ab11+","+ab12+","+ab13+","+ab14+","+ab15+"\n"+
			ac1+","/*+ac2+","+ac3+","+ac4+","+ac5+","+ac6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+ac7+","+ac8+","+ac9+","*/+ac10+","+ac11+","+ac12+","+ac13+","+ac14+","+ac15+"\n"+
			ad1+","/*+ad2+","+ad3+","+ad4+","+ad5+","+ad6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+ad7+","+ad8+","+ad9+","*/+ad10+","+ad11+","+ad12+","+ad13+","+ad14+","+ad15+"\n"+
			ae1+","/*+ae2+","+ae3+","+ae4+","+ae5+","+ae6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+ae7+","+ae8+","+ae9+","*/+ae10+","+ae11+","+ae12+","+ae13+","+ae14+","+ae15+"\n"+
			af1+","/*+af2+","+af3+","+af4+","+af5+","+af6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+af7+","+af8+","+af9+","*/+af10+","+af11+","+af12+","+af13+","+af14+","+af15+"\n"+
			ag1+","/*+ag2+","+ag3+","+ag4+","+ag5+","+ag6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+ag7+","+ag8+","+ag9+","*/+ag10+","+ag11+","+ag12+","+ag13+","+ag14+","+ag15+"\n"+
			ah1+","/*+ah2+","+ah3+","+ah4+","+ah5+","+ah6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+ah7+","+ah8+","+ah9+","*/+ah10+","+ah11+","+ah12+","+ah13+","+ah14+","+ah15+"\n"+
			ai1+","/*+ai2+","+ai3+","+ai4+","+ai5+","+ai6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+ai7+","+ai8+","+ai9+","*/+ai10+","+ai11+","+ai12+","+ai13+","+ai14+","+ai15+"\n"+
			aj1+","/*+aj2+","+aj3+","+aj4+","+aj5+","+aj6.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+aj7+","+aj8+","+aj9+","*/+aj10+","+aj11+","+aj12+","+aj13+","+aj14+","+aj15+"\n";
			

/*var entry=id+","+species+","+source+","+type+","+logic_name+","+description.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+display_name+","+assembly_name+","+seq_region_name+","+
start+","+end+","+strand+","+version+","+db_type+","+transcript;
*/	/*for(var i =0; i< content.length; i++) {
		//console.log("1 : " + ids[i] + "  2:  " + content[i]);
		entry = content[i].ID+", "+content[i].object_type+", "+content[i].logic_name+", "+content[i].version+", "+content[i].species+", "+content[i].description+", "+
		content[i].display_name+", "+content[i].assembly_name+", "+content[i].biotype+", "+content[i].end+", "+content[i].seq_region_name+", "+content[i].db_type+", "
		+content[i].strand+", "+content[i].start+", "+content[i].transcript.length;
		entry += content[i].id+","+content[i].object_type+","+content[i].logic_name+","+content[i].version+","+content[i].species+","+content[i].description.replace(/^\s+|,| |\t|  |" "|' '|\s+$/g,"")+","+
		content[i].display_name+","+content[i].assembly_name+","+content[i].biotype+","+content[i].end+","+content[i].seq_region_name+","+content[i].db_type+","
		+content[i].strand+","+content[i].start+","+content[i].transcript.length+"\n";

*/
	arrayData.push(entry);
	//}


  	var blob = new Blob([arrayData.join('\r\n')], {type: "text/plain;charset=utf-8"});
 	saveAs(blob, "gene_"+namefile+".arff");


}
