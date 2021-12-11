// 0. Définir les adresses des URLS
async function urlsCategory(genre, countCategory) {
    for (let i = 1; i <= 2; i++) {
        const url = `http://localhost:8000/api/v1/titles/?genre=${genre}` + 
                    `&page=${i}&sort_by=-imdb_score%2C-votes`;
        const countPage = i;
        await loadData(url, countPage, genre, countCategory);
    };
};


// 1. Télécharger les informations des films depuis le serveur

async function loadData(url, countPage, genre, countCategory) {
    await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => displayData(json, countPage, genre, countCategory))
        .catch(err => console.log(err))
};


// 2. Créer le blocs d'éléments Html pour chaque film à afficher

function displayData(json, countPage, genre, countCategory) {
    if (countPage === 1) {
        var countMovie = 4;
        displayNameCategory(genre, countCategory);
        displayPosterMovies(json, genre, countMovie, countCategory);
    };
    if (countPage === 2) {
        var countMovie = 1;
        displayPosterMovies(json, genre, countMovie, countCategory);
    };
};

function displayNameCategory(genre, countCategory) {
    let nameCategory = document.getElementById(`category${countCategory}`);
    // let translation = {
    //     "action": "d'action",
    //     "adult": "pour adulte",
    //     "adventure": "d'aventure",
    //     "animation": "d'animation",
    //     "biography": "biopic",
    //     "comedy": "de comédie",
    //     "crime": "policier",        //
    //     "documentary": "documentaire",
    //     "drama": "de drame",
    //     "family": "familliaux",
    //     "fantasy": "fantastique",
    //     "film-noir": "en noir & blanc",
    //     "history": "historique",
    //     "horor": "d'épouvante-horreur",
    //     "music": "de comédie musical",
    //     "musical": "musical",
    //     "mystery": "policier",       //
    //     "news": "nouveauté",
    //     "reality-TV": "de télé-réalité",
    //     "romance": "de romance",
    //     "sci-fi": "de science-fiction",
    //     "sport": "sur le sport",
    //     "thriller": "thriller",
    //     "war": "de guerre",
    //     "western": "western"
    // };
    let translation = translateNameCategory(genre);
    nameCategory.innerHTML = `Films ${translation}`
};

function translateNameCategory(genre) {
    let translation = {
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
        "horor": "d'épouvante-horreur",
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

function displayPosterMovies(json, genre, countMovie, countCategory) {
    let categoryContainer = document.getElementById(`best_category${countCategory}_movies`);
    for (let i = 0; i <= countMovie; i++) {
        let film = json.results[i];
        categoryContainer.innerHTML += 
                `
                <button id="${film.id}" class="movie_container" 
                title="${film.title}">
                    <img class="movie_poster_container" src="${film.image_url}"
                    alt="poster_of_${film.title}"/>
                </button>
                `
    };
        //document.getElementById(`${film.id}`).addEventListener('Click', displayModal(`${film.id}`));
};

// 3. Ajouter le bloc Html du film dans la page Html


// 4. Ajouter les évènements au clic sur les éléments Html


function main() {
    const genres = ["biography", "sci-fi", "adventure"];
    for (const genre of genres) {
        const countCategory = genres.indexOf(genre) + 1;
        urlsCategory(genre, countCategory);
    };
};

document.addEventListener('DOMContentLoaded', main());