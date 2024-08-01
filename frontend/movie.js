const APILINK = 'http://localhost:8000/api/v1/reviews/';

const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");
const main = document.getElementById("section");
const title = document.getElementById("title");

//change the movie title displayed
title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML = `
    <div class = "row">
        <div class = "column">
            <div class = "card">New Review
                <p>
                    <strong>Review: </strong>
                    <input type = "text" id = "new_review" value = "" placeholder = "Enter Review...">
                </p>
                <p>
                    <strong>User: </strong>
                    <input type = "text" id = "new_user" value = "" placeholder = "Enter Username...">
                </p>
                <p>
                    <a href = "#" onclick = "saveReview('new_review', 'new_user')">💾</a>
                </p>
            </div>
        </div>
    </div>
`;
main.appendChild(div_new);

returnReviews(APILINK);

//unicode code for pencil:`\u270F`- js, &#x270F; - html
//unicode for trashcan: `\u1F5D1` - js, &#128465; - html
//unicode for saveIcon: `\u1F4BE` -js, &#128190; - html

function returnReviews(url){
    fetch(url + "movie/" + movieId) //makes a network request to the 'url'
        .then(res => res.json()) //converts the response 'res' to JSON format
        .then(function(data){   
            console.log(data);
            data.forEach(review => {
                //another way to do this is to add the html directly
                const div_card = document.createElement('div');
                div_card.innerHTML = `
                    <div class = "row">
                        <div class = "column">
                            <div class = "card" id = "${review._id}">
                                <p><strong>Review: </strong>${review.review}</p>
                                <p><strong>User: </strong>${review.user}</p>
                                <p>
                                    <a href = "#" onclick = "editReview('${review._id}', '${review.review}', '${review.user}')">✏️</a>
                                    <a href = "#" onclick = "deleteReview('${review._id}')">🗑</a>
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                main.appendChild(div_card);
            });
        });
}

function editReview(id, review, user){
    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = `
        <p>
            <strong>Review: </strong>
            <input type = "text" id = "${reviewInputId}" value = "${review}" placeholder = "">
        </p>
        <p>
            <strong>User: </strong>
            <input type = "text" id = "${userInputId}" value = "${user}" placeholder = "">
        </p>
        <p>
            <a href = "#" onclick = "saveReview('${reviewInputId}', '${userInputId}', '${id}')">💾</a>
        </p>
    `;
}

function saveReview(reviewInputId, userInputId, id = ""){
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;
console.log(user);

    if(id){ //empty string evaluates to false
        //default is a get request if you dont specify, but here it is a put request
        fetch(APILINK + id + "", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        })
            .then(result => result.json())
            .then(result => {
                console.log(result)
                location.reload(); //reloads the url/website
            });
    }
    else{ //we are creating a new review
        //default is a get request if you dont specify, but here it is a post request
        fetch(APILINK + "new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
        })
            .then(result => result.json())
            .then(result => {
                console.log(result);
                location.reload(); //reloads the url/website
            });
    }   
}

function deleteReview(id){
    fetch(APILINK + id + "", {
        method: 'DELETE'
    })
        .then(result => result.json())
        .then(result => {
            console.log(result);
            location.reload();
        });
}