import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

//route file

const router = express.Router();

//router.route("/").get((request, response) => response.send("hello world"));

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews);
router.route("/new").post(ReviewsCtrl.apiPostReviews);
router.route("/:id")
    .get(ReviewsCtrl.apiGetReviews) //if it is a get request call that function
    .put(ReviewsCtrl.apiUpdateReviews) //if it is a put request call that function
    .delete(ReviewsCtrl.apiDeleteReviews) //if it is a delete request call that function
;
export default router;