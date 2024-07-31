import ReviewsDAO from "../dao/ReviewsDAO.js"; // what we use to actually access the database and make changes to it

//controller file - to tell what to do when we go to the different routes

//exporting the reviewsController class so that we can import it in other files
export default class ReviewsController{
    //it is static bcos you can call it directly from the ReviewsController class
    //if it wasn't static we would have to create an instance of a ReviewsController
    static async apiPostReview(request, response, next){
        try{
            //body is some json that u include in the url
            const movieId = parseInt(request.body.movieId);
            const review = request.body.review;
            const user = request.body.user;

            console.log('movieid ', movieId);
            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            );

            response.json({ status: "success" });
        }
        catch(exception){
            response.status(500).json({ error: exception.message });
        }
    }

    static async apiGetReview(request, response, next){
        try{
            //params is what u can get right from the url
            let id = request.params.id || {};
            let review = await ReviewsDAO.getReview(id);

            if(!review){
                response.status(404).json({ error: "Not found" });
                return;
            }

            response.json(review)
        }
        catch(exception){
            console.log(`api, ${exception}`);
            response.status(500).json({ error: exception });
        }
    }

    static async apiUpdateReview(request, response, next){
        try{
            //params is what u can get right from the url
            let reviewId = request.params.id;
            const review = request.body.review;
            const user = request.body.user;

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            );

            var{ error } = reviewResponse;

            if(error){
                response.status(400).json({ error });
                return;
            }

            //if the modified count is 0means nothing was changed
            if(reviewResponse.modifiedCount === 0){
                throw new Error( "unable to update review" );
            }

            response.json({ status: "success" });
        }
        catch(exception){
            response.status(500).json({ error: exception.message });
        }
    }

    static async apiDeleteReview(request, response, next){
        try{
            let reviewId = request.params.id;

            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);

            response.json({ status: "success" });
        }
        catch(exception){
            response.status(500).json({ error: exception.message });
        }
    }

    static async apiGetReviews(request, response, next){
        try{
            let id = request.params.id || {};

            const reviews = await ReviewsDAO.getReviewsByMovieId(id);

            if(!reviews){
                response.status(404).json({ error: "Not found" });
                return;
            }

            response.json(reviews);
        }
        catch(exception){
            console.log(`api, ${exception}`);
            response.status(500).json({ error: exception });
        }
    }
}