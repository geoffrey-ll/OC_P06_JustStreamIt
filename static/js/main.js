// 0. Définir les catégories et les adresses URLS
async function choosingCategories() {
    const genres = ["", "biography", "sci-fi", "adventure"]; // maximun 4 genres. Idéalement 4.
    for (const genre of genres) {
        const countCategory = genres.indexOf(genre);
        await urlsCategory(genre, countCategory);
    };
};

async function urlsCategory(genre, countCategory) {
    for (let i = 1; i <= 2; i++) {
        const url = `http://localhost:8000/api/v1/titles/?genre=${genre}` + 
                    `&page=${i}&sort_by=-imdb_score%2C-votes`;
        const countPage = i;
        await loadSortCategoryData(url, genre, countCategory, countPage);
    };
};


// 1. Télécharger les informations des classement et des films depuis le serveur
async function loadSortCategoryData(url, genre, countCategory, countPage) {
    await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => createHTMLCategories(json, genre, countCategory, countPage))
        .catch(err => console.log(err));
};

async function loadMovieData(idMovie) {
    var movieData;
    await fetch(`http://localhost:8000/api/v1/titles/${idMovie}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(json => {movieData = json;})
    .catch(err => console.log(err));
    return movieData;
};



// 2. & 3. Création et chargement de blocs HTML dans la page HTML
async function createHTMLCategories(json, genre, countCategory, countPage) {
    if (countCategory !== "00") {
        if (countPage === 1) {
            document.getElementById("categories").innerHTML += `
            <section>
                <h1 id="title-category-${countCategory}" class="title-category"></h1>
                <div class="flex-box-row container-movies-and-nav">
                    <nav class="nav-carrousel-left">
                        <button id="shift-left-carrousel-${countCategory}" 
                        class="flex-box-row button-nav" onclick="moveCarrouselLeft(id)">
                            <div class="nav-art-generality arrow-left"></div>
                            <div class="nav-art-generality rectangle"></div>
                            <div class="nav-art-generality rectangle"></div>
                        </button>
                    </nav>

                    <div class="flex-box-row visible-movies-category">
                        <div id="js-carrousel-${countCategory}" class="flex-box-row movable"></div>
                    </div>

                    <nav class="nav-carrousel-right">
                        <button id="shift-right-carrousel-${countCategory}"
                        class="flex-box-row button-nav" onclick="moveCarrouselRight(id)">
                            <div class="nav-art-generality rectangle"></div>
                            <div class="nav-art-generality rectangle"></div>
                            <div class="nav-art-generality arrow-right"></div>
                        </button>
                    </nav>
                </div>
            </section>
            `;
        }
    }
    displayCategoryData(json, genre, countCategory, countPage);
};

async function displayCategoryData(json, genre, countCategory, countPage) {
    // Serait intéréssant d'ajouter une fonction ici (avant le remplissage) 
    // qui ajouterait le code HTML de la structure des catégories. 
    // On aurait alors autant que catégories que renseignées dans choosingCategories().
    if (countCategory === "00") { // CountCategory = "00" correspond à la section meilleur film.
        if (countPage === 1) {
            let idBestMovie = json.results[0].id;
            let bestMovieData = await loadMovieData(idBestMovie);
            displayBestMovie(bestMovieData);
        };
    }else {
        if (countPage === 1) {
            if (genre === "") {
                var idxStart = 1;
            }else {
                var idxStart = 0;
            };
            var countMovie = 4;
            displayNameCategory(genre, countCategory);
            displayPosterMovies(json, countCategory, idxStart, countMovie);
        };
        if (countPage === 2) {
            var idxStart = 0;
            if (genre === "") {
                var countMovie = 2;
            }else {
                var countMovie = 1;
            };
            displayPosterMovies(json, countCategory, idxStart, countMovie);
        };
    };
};

function displayBestMovie(bestMovieData) {
    document.getElementById("title-best-movie").innerText = 
        bestMovieData.original_title;
    document.getElementById("js-synopsis-best-movie").innerText = 
        bestMovieData.long_description;
    document.getElementById("js-poster-best-movie").setAttribute(
        "src", bestMovieData.image_url
    );
    document.getElementById("js-poster-best-movie").setAttribute(
        "alt", `poster of ${bestMovieData.original_title}`
    );
    document.getElementById("js-show-best-movie")
    .setAttribute("onclick", `openModal('${bestMovieData.id}')`)
};

function displayNameCategory(genre, countCategory) {
    let nameCategoryContainer = 
        document.getElementById(`title-category-${countCategory}`);
    let translation = translateNameCategory(genre);
    nameCategoryContainer.innerHTML = `Films ${translation}`;
};

async function displayPosterMovies(json, countCategory, idxStart, countMovie) {
    let categoryContainer = 
        document.getElementById(`js-carrousel-${countCategory}`);
    for (let i = idxStart; i <= countMovie; i++) {
        let film = json.results[i];
        let movieData = await loadMovieData(film.id);
        let originalTitle = movieData.original_title;
        categoryContainer.innerHTML += `
            <button id="${film.id}" class="movie_container" 
            title="${originalTitle}" onclick="openModal(${film.id})">
                <img class="movie_poster_container" src="${film.image_url}"
                alt="poster of «${originalTitle}»" />
            </button>
        `
    };
};






// 4. Ajouter les évènements au clic sur les éléments Html

document.addEventListener('DOMContentLoaded', main());


// 5. Autres
function translateNameCategory(genre) {
    let translation = {
        "": "les mieux notés",
        "action": "d'action",
        "adult": "pour adulte",
        "adventure": "d'aventure",
        "animation": "d'animation",
        "biography": "biopic",
        "comedy": "de comédie",
        "crime": "policier",        //
        "documentary": "documentaire",
        "drama": "de drame",
        "family": "familliaux",
        "fantasy": "fantastique",
        "film-noir": "en noir & blanc",
        "history": "historique",
        "horror": "d'épouvante-horreur",
        "music": "de comédie musical",
        "musical": "musical",
        "mystery": "policier",       //
        "news": "nouveauté",
        "reality-TV": "de télé-réalité",
        "romance": "de romance",
        "sci-fi": "de science-fiction",
        "sport": "sur le sport",
        "thriller": "thriller",
        "war": "de guerre",
        "western": "western"
    };
    return translation[genre];
};

function main() {
    urlsCategory("", "00");
    choosingCategories();
    initializeLocationTrackingCarrousel();
};


