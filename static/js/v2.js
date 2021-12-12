// 0. Définir les adresses des URLS
async function choosingCategories() {
    const genres = ["", "biography", "sci-fi", "adventure"]; // maximun 4 genres. Idéalement 4.
    for (const genre of genres) {
        const countCategory = genres.indexOf(genre);
        // console.log(genre, countCategory)
        await urlsCategory(genre, countCategory);
    };
};


async function urlsCategory(genre, countCategory) {
    for (let i = 1; i <= 2; i++) {
        const url = `http://localhost:8000/api/v1/titles/?genre=${genre}` + 
                    `&page=${i}&sort_by=-imdb_score%2C-votes`;
        const countPage = i;
        await loadData(url, genre, countCategory, countPage);
    };
};


// 1. Télécharger les informations des films depuis le serveur

async function loadData(url, genre, countCategory, countPage) {
    await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => displayData(json, genre, countCategory, countPage))
        .catch(err => console.log(err));
};


// 2. Créer le blocs d'éléments Html pour chaque film à afficher

async function displayData(json, genre, countCategory, countPage) {
    // Serait intéréssant d'ajouter une fonction ici (avant le remplissage) 
    // qui ajouterait le code HTML de la structure des catégories. 
    // On aurait alors autant que catégories que renseignées dans choosingCategories().


    if (countCategory === "00") { // CountCategory = "00" correspond à la section meilleur film.
        if (countPage === 1) {
            displayBestMovie(json);
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

function displayBestMovie(json) {
    document.getElementById("title_best_movie").innerHTML = json.results[0].title
    document.getElementById("synopsis_best_movie").innerHTML = "Seulement pour tester"
    document.getElementById("poster_best_movie").setAttribute("src", json.results[0].image_url)
    document.getElementById("poster_best_movie").setAttribute("alt", `poster of ${json.results[0].title}`)
};

function displayNameCategory(genre, countCategory) {
    let nameCategory = document.getElementById(`title_category${countCategory}`);
    let translation = translateNameCategory(genre);
    nameCategory.innerHTML = `Films ${translation}`
};

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

async function displayPosterMovies(json, countCategory, idxStart, countMovie) {
    let categoryContainer = document.getElementById(`best_category${countCategory}_movies`);
    for (let i = idxStart; i <= countMovie; i++) {
        let film = json.results[i];
        let originalTitle = await getOriginalTitle(film.id);
        categoryContainer.innerHTML += 
                `
                <button id="${film.id}" class="movie_container" 
                title="${originalTitle}">
                    <img class="movie_poster_container" src="${film.image_url}"
                    alt="poster of «${originalTitle}»" />
                </button>
                `
    };
        //document.getElementById(`${film.id}`).addEventListener('Click', displayModal(`${film.id}`));
};


async function getOriginalTitle(idMovie) {
    var originalTitle;
    await fetch(`http://localhost:8000/api/v1/titles/${idMovie}`, {
        method: "GET",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(json => {originalTitle = json.original_title;})
    .catch(err => console.log(err));
    return originalTitle;
};

// 3. Ajouter le bloc Html du film dans la page Html


// 4. Ajouter les évènements au clic sur les éléments Html


function main() {
    urlsCategory("", "00");
    choosingCategories();
}

document.addEventListener('DOMContentLoaded', main());