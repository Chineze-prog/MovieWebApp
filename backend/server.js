import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";

//main server code 

//what we are using to create our web-server
const app = express();

// app.use() - how we can use middle-wear: different programs express is going to use to chang how things work
app.use(cors());
//allows our server to accept json in the body of a request, if someone rends a get/post request to our server it will be able to read json
app.use(express.json());

//specifying some of the initial routes - the url that you access to get to send and recieve info.
//when creating an api its common practice to specify it is an api in th url, along with the version of the api
//and for this url we are using the route that we imported from reviews file
app.use("/api/v1/reviews", reviews);

//creating the backup route - if someone goes to a url that is not included in what we created in the route file (* - anything else) , we'll send the 404 code and display an error message
app.use("*", (request, response) => response.status(404).json({ error: "not found" }));

//export our app as a module - which will allow us to import app in the file that accesses the database which will be the file we will run to get the server running
//when you want to use code b/w files you have to use an export statement at the end to export something from that file to use to import into another file
export default app;