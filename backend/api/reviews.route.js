import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

//route file

const router = express.Router();

//router.route("/").get((request, response) => response.send("hello world"));

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews);
router.route("/new").post(ReviewsCtrl.apiPostReview);
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview) //if it is a get request call that function
    .put(ReviewsCtrl.apiUpdateReview) //if it is a put request call that function
    .delete(ReviewsCtrl.apiDeleteReview) //if it is a delete request call that function
;
export default router;