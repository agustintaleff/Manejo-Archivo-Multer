var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://ataleff:tomasa1234@drdruck.qjec2.mongodb.net/test';

MongoClient.connect(url, function(err, db) {
    console.log('Conectado');
    // var cursor = db.collection('Documents').find();
    
var cursor=db.collection('Documents').find({EmployeeName: 'Agustin'})
    cursor.each(function (err, doc) {
        console.log(doc);
    }) 
});


