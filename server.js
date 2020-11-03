// call all the required packages
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
// app.use(bodyParser.urlencoded({extended:true}));


 
//CREATE EXPRESS APP
const app = express();
 
//ROUTES WILL GO HERE
// app.get('/', function(req, res) {
//     res.json({ message: 'WELCOME' }); 
//     res.end; 
// });
 
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })

// Upload 1 archivo
  app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
  })

//Upload multiples archivos
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
   
      res.send(files)
    
  })


//Upload Fotos a MongoDB
const myurl = 'mongodb+srv://ataleff:tomasa1234@drdruck.qjec2.mongodb.net/Test2?retryWrites=true&w=majority';
const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(myurl, { useNewUrlParser: true });
const client = new MongoClient(myurl, { useNewUrlParser: true, useUnifiedTopology: true});

console.log(myurl);

MongoClient.connect(err => {
  if (err) return console.log(err)
  const collection = client.db("Test2").collection("Documents");
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
  client.close();
}).catch(function () {
  console.log("Promise Rejected");
});




// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://DRDRUCK:<tomasa1234>@drdruck.qjec2.mongodb.net/<DrDruck>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log(collection.indexInformation),
  
//   client.close();
// });




// ROUTES
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
   
  });

app.listen(3000, () => console.log('Server started on port 3000'));