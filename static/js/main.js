var numberCategories;

// 0. Définir les catégories et les adresses URLS
async function choosingCategories() {
    var allCategories = "no";
    var genres;
    if (allCategories === "yes") {
        genres = translateNameCategory("justListGenres");
    } else {
        // Autant de catégories que souhaités
        // Ne pas répéter une catégories
        genres = ["", "biography", "sci-fi", "adventure"];
    }
    numberCategories = genres.length;
    for (const genre of genres) {
        const countCategory = genres.indexOf(genre);
        await urlsCategory(genre, countCategory);
    }
}

async function urlsCategory(genre, countCategory) {
    for (let i = 1; i <= 2; i++) {
        const url = `http://localhost:8000/api/v1/titles/?genre=${genre}` + 
                    `&page=${i}&sort_by=-imdb_score%2C-votes`;
        const countPage = i;
        await getSortCategoryData(url, genre, countCategory, countPage);
    }
}


// 1. Télécharger les informations des classement et des films depuis le serveur
async function getSortCategoryData(url, genre, countCategory, countPage) {
    await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => displayCategoryData(json, genre, countCategory, countPage))
        .catch(err => console.log(err));
}

async function getMovieData(idMovie) {
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
}



// 2. & 3. Création et chargement de blocs HTML dans la page HTML
async function createHTMLCategories(countCategory, countPage) {
    if (countCategory !== "00") {
        if (countPage === 1) {
            document.getElementById("categories").innerHTML += `
            <section>
                <h1 id="title-category-${countCategory}" 
                class="js-title-category">
                </h1>
                <div class="flex-box-row js-container-movies-and-nav">
                    <nav class="nav-carrousel-left">
                        <button id="shift-left-carrousel-${countCategory}" 
                        class="button-nav-left"
                        onclick="moveCarrouselLeft(id)">
                        </button>
                    </nav>

                    <div class="flex-box-row js-visible-movies-category">
                        <div id="js-carrousel-${countCategory}" 
                        class="flex-box-row js-movable">
                        </div>
                    </div>

                    <nav class="nav-carrousel-right">
                        <button id="shift-right-carrousel-${countCategory}"
                        class="button-nav-right"
                        onclick="moveCarrouselRight(id)">
                        </button>
                    </nav>
                </div>
            </section>
            `;
        }
    }
}

async function displayCategoryData(json, genre, countCategory, countPage) {
    createHTMLCategories(countCategory, countPage);
    // CountCategory = "00" correspond à la section meilleur film.
    if (countCategory === "00") {
        if (countPage === 1) {
            let idBestMovie = json.results[0].id;
            let bestMovieData = await getMovieData(idBestMovie);
            displayBestMovie(bestMovieData);
        }
    } else {
        if (countPage === 1) {
            if (genre === "") {
                var idxStart = 1;
            } else {
                var idxStart = 0;
            }
            var countMovie = 4;
            displayNameCategory(genre, countCategory);
            displayPosterMovies(json, countCategory, idxStart, countMovie);
        }
        if (countPage === 2) {
            var idxStart = 0;
            if (genre === "") {
                var countMovie = 2;
            } else {
                var countMovie = 1;
            }
            displayPosterMovies(json, countCategory, idxStart, countMovie);
        }
    }
}

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
    document.getElementById("js-show-best-movie").setAttribute(
        "onclick", `openModal('${bestMovieData.id}')`
    );
}

function displayNameCategory(genre, countCategory) {
    let nameCategoryContainer = 
        document.getElementById(`title-category-${countCategory}`);
    let translation = translateNameCategory(genre);
    nameCategoryContainer.innerHTML = `Films ${translation}`;
}

async function displayPosterMovies(json, countCategory, idxStart, countMovie) {
    let categoryContainer = 
        document.getElementById(`js-carrousel-${countCategory}`);
    for (let i = idxStart; i <= countMovie; i ++) {
        let film = json.results[i];
        let movieData = await getMovieData(film.id);
        let originalTitle = movieData.original_title;
        categoryContainer.innerHTML += `
            <button id="${film.id}" class="js-movie-container" 
            title="${originalTitle}" onclick="openModal(${film.id})">
                <img class="js-movie-poster-container" src="${film.image_url}"
                alt="poster of «${originalTitle}»" />
            </button>
        `
    }
}



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
    if (genre == "justListGenres") {
        return Object.keys(translation)
    } else {
        return translation[genre];
    }
}

function main() {
    urlsCategory("", "00");
    choosingCategories();
    initializeLocationTrackingCarrousel(numberCategories);
}
