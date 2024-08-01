import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ReviewsDAO from "./dao/ReviewsDAO.js";

//database code
//use mongodb online to create the database

//the web link: http://localhost:8000/api/v1/reviews
//the first test data insertion in powershell: Invoke-WebRequest -Uri http://localhost:8000/api/v1/reviews/new -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"movieId": 12, "user": "beau", "review": "good"}'
//to get a review: Invoke-WebRequest -Uri http://localhost:8000/api/v1/reviews/66a935ae99d945f667e88ac8
//to get all reviews for a movie: Invoke-WebRequest -Uri http://localhost:8000/api/v1/reviews/movie/12
//to change a review: Invoke-WebRequest -Uri http://localhost:8000/api/v1/reviews/66a935ae99d945f667e88ac8 -Method PUT -Headers @{ "Content-Type" = "application/json" } -Body '{"user": "beau", "review": "horrible"}'
//to delete a review: Invoke-WebRequest -Uri http://localhost:8000/api/v1/reviews/66a935ae99d945f667e88ac8 -Method DELETE -Headers @{ "Content-Type" = "application/json" }

//checking the servers being used and terminating them:
//netstat -ano | findstr :8000
//taskkill /PID <PID> /F

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = 8000;

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

if (!mongo_username || !mongo_password) {
    console.error("MongoDB username or password is undefined. Check your .env file.");
    process.exit(1);
}

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.nqnp9dv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.nqnp9dv.mongodb.net/`

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50, //how many people it can be connected to at one time
        wtimeoutMS: 2500, // how long a connection can try to connect before it times out
    }      
)
.catch(error => {
    console.error("MongoDB connection error: ", error.stack)
    process.exit(1)
})
.then(async client => {
    console.log("Connected to MongoDB")
    await ReviewsDAO.injectDB(client); //sends the db conection to the reviewDAO so that we can access the db
    app.listen(port, () => { console.log(`listening on port ${port}...`) }) ;//starts the server
});