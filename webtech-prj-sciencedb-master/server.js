var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var Sequelize = require("sequelize");

var sequelize = new Sequelize('restaurant', 'elenaiaru', '', {
   dialect: 'mysql',
   port: 3306
});

var Produs = sequelize.define('PRODUSE', {
 
  nume: {
    type: Sequelize.STRING,
    field: 'nume'
  },
  cantitate: {
    type: Sequelize.STRING,
    field: 'cantitate'
  },
  pret: {
    type: Sequelize.STRING,
    field: 'pret'
  },
  
}, {
  freezeTableName: false, // Model tableName will be the same as the model name
  timestamps: false
});

var app = express();
app.use(bodyParser.json());
app.use(cors());


var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

// REST methods
app.get('/produse', function(req,res){
    /*global Author*/
    Produs.findAll().then(function(produse){
        res.status(200).send(produse);
    });
});

app.get('/produse/:id', function(req,res){
    Produs.findAll({
        where: {
            id: req.params.id
        }
    }).then(function(produs){
        if(produs.length > 0) {
            res.status(200).send(produs[0]);
        } else {
            res.status(404).send();
        }
    })
});

app.post('/produse', function(req,res) {
   Produs.create(req.body).then(function(){
        res.status(201).send();
    }).catch(function(err){
        console.warn(err);
    });
});


app.delete('/produse/:id', function(req,res){
    
});

app.put('/produse/:id', function(req,res){
    
});

app.listen(process.env.PORT);