const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=503cef423e8b2627576db25f757ba21c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=503cef423e8b2627576db25f757ba21c&query=';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);

function returnMovies(url){
    fetch(url) //makes a network request to the 'url'
        .then(res => res.json()) //converts the response 'res' to JSON format
        .then(function(data){   
            console.log(data.results);
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');

                const title = document.createElement('h4');
                title.setAttribute('id', 'title');

                const center = document.createElement('div');
                center.setAttribute('class', 'center');

                title.innerHTML = `${element.title}`;
                image.src = IMG_PATH + element.poster_path;

                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);
                main.appendChild(div_row);
            });
        });
}

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;
    const searchUrl = SEARCHAPI + searchItem + "";

    if(searchItem){
        returnMovies(searchUrl);
        search.value = '';
    }
});