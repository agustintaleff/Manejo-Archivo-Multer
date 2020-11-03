var uri = 'mongodb+srv://ataleff:tomasa1234@drdruck.qjec2.mongodb.net/test?retryWrites=true&w=majority';
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};



async function main()
{
  await client.connect();
  await listDatabases(client);
};

main();

