import mongodb from "mongodb";
import { ObjectId } from 'mongodb';
// what we use to actually access the database and make changes to it

//const ObjectId = mongodb.ObjectId;
let reviews


//exporting the reviewsDAO class so that we can import it in other files
export default class ReviewsDAO{
  static async injectDB(connection){
    //if there is already a db connection dont connect
    if(!connection){
      console.log("No connection provided");
      return;
    }
    
    if(reviews){
      console.log("Already connected to 'reviews' collection");
      return;
    }
    
    try{
      console.log("Attempting to connect to the 'reviews' collection");
      reviews = await connection.db("movies").collection("reviews");
      console.log("Connected to 'reviews' collection");
    }
    catch(exception){
      console.error(`Unable to establish collection handles in userDAO: ${exception}`);
    } 
    
    //console.log(reviews);
  }

  static async addReview(movieId, user, review){
    try{
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review
      }
    
      if(!reviews){
        throw new Error("Reviews collection is not initialized.")
      }

      console.log("adding new review...");
      //insertOne - mongodb command to insert a document into the db
      return await reviews.insertOne(reviewDoc);    
    }
    catch(exception){
      console.error(`Unable to post review: ${exception}`);
      return { error: exception };
    }
  }

  static async getReview(reviewId){
    try{
      if(!reviews){
        throw new Error("Reviews collection is not initialized.")
      }

      //findOne - mongodb command to find a document in the db, search by id
      console.log("reviewId", reviewId)
      const id = new ObjectId("66a935ae99d945f667e88ac8")//String(reviewId));
      console.log("check", id)
      return await reviews.findOne({ _id: id });
    }
    catch(exception){
      console.error(`Unable to get review: ${exception}`);
      return { error: exception };
    }
  }

  static async updateReview(reviewId, user, review){    
    try{
      if(!reviews){
        throw new Error("Reviews collection is not initialized.")
      }

      //updateOne - mongodb command to update a document in the db, search by id then set the new values
      const updateResponse = await reviews.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      );

      return updateResponse;
    }
    catch(exception){
      console.error(`Unable to update review: ${exception}`);
      return { error: exception };
    }
  }

  static async deleteReview(reviewId){
    try{
      if(!reviews){
        throw new Error("Reviews collection is not initialized.")
      }

      //deleteOne - mongodb command to delete a document in the db, search by id then delete
      const deleteResponse = await reviews.deleteOne({ _id: ObjectId(reviewId) });

      return deleteResponse;
    }
    catch(exception){
      console.error(`Unable to delete review: ${exception}`);
      return { error: exception };
    }
  }

  static async getReviewsByMovieId(movieId){
    try{
      if(!reviews){
        throw new Error("Reviews collection is not initialized.")
      }

      //when you find multiple items it returns a cursor
      //find - mongodb command to find multiple documents in the db
      const cursor = await reviews.find({ movieId: parseInt(movieId) });

      return cursor.toArray();
    }
    catch(exception){
      console.error(`Unable to get review: ${exception}`);
      return { error: exception };
    }
  }
}
