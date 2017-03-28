var http = require('http');
var fs = require('fs');
var url = require('url');
var obj;


function affiche_objet(obj) {
	var ch='<table>'
	for (i=0 ; i<obj.length; i++){
		var objet = obj[i];
		for (propriete in objet) {
			ch+="<tr>"+"<td>"+propriete+'</td>'+'<td>'+objet[propriete]+'</td>'+"</tr>";
		}
	}
ch += '</table>'
return ch;
}


// Créer un serveur
http.createServer( function (request, response) {  
   // On extrait de la requête «request» le chemin  qui nous donnera le nom de fichier
   var pathname = url.parse(request.url).pathname;
  // affiche le nom du fichier pour laquelle la requête a été généré
   console.log("Request for " + pathname + " received.");

	if(request.url=='/provinces') {
		fs.readFile('provinces.json', 'utf-8', function (err, data) {
		if (err) return console.error(err);
		obj = JSON.parse(data)

		  response.writeHead(200, {"Content-Type": "text/html"});
		  response.write(affiche_objet(obj));
		  response.end();
		});

	} else {
		fs.readFile('etats.json', 'utf-8', function (err, data) {
		if (err) return console.error(err);
		obj = JSON.parse(data)
		console.log(obj);
		response.writeHead(200, {"Content-Type": "text/html"});
	  response.write(affiche_objet(obj));
 	 response.end();
		});
	}

}).listen(8081);

// message console
console.log('Serveur se trouvant à http://127.0.0.1:8081/');



