import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

//import ReviewsDAO from "./dao/ReviewsDAO.js";

//the web link: http://localhost:8000/api/v1/reviews
//database code
//use mongodb online to create the database
dotenv.config();

console.log("MONGO_USERNAME:", process.env['MONGO_USERNAME']); // Should log your username
console.log("MONGO_PASSWORD:", process.env.MONGO_PASSWORD); // Should log your password

const MongoClient = mongodb.MongoClient;
const port = 8000;

const mongo_username = process.env.MONGO_USERNAME;//['MONGO_USERNAME'];
const mongo_password = process.env.MONGO_PASSWORD;//['MONGO_PASSWORD'];
if (!mongo_username || !mongo_password) {
    console.error("MongoDB username or password is undefined. Check your .env file.");
    process.exit(1);
}

const uri = `mongodb+srv://chinezeobibomi:WDO7678lxacmAIXO@cluster0.nqnp9dv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;//`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.nqnp9dv.mongodb.net/`

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50, //how many people it can be connected to at one time
        wtimeoutMS: 2500 // how long a connection can try to connect before it times out
    }
)
.catch(error => {
    console.error(error.stack)
    process.exit(1)
})
.then(async client =>{
    app.listen(port, () => { console.log("listening on port") }) //starts the server
});