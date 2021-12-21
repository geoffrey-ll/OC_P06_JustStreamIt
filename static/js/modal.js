let modalDisplay = "no"; // Utile pour bloquer focus dans modal.
let previouslyFocusElement = null;

async function openModal (idMovie) {
    const modalPattern = document.querySelector("#js-modal-pattern");
    movieData = await getMovieData(idMovie); // dans "main.js"
    modalMovie = await loadModalMovie(movieData, modalPattern);
    return displayModal(modalMovie);
}


async function loadModalMovie(movieData, modalPattern) {
    modalPattern.querySelector("#js-modal-title").innerText = 
        movieData.title;
    modalPattern.querySelector("#js-modal-poster").src = 
        movieData.image_url;
    modalPattern.querySelector("#js-modal-poster").alt = 
        `Poster of '${movieData.original_title}' movie`;
    modalPattern.querySelector("#js-modal-date-published").innerText = 
        movieData.date_published;
    modalPattern.querySelector("#js-modal-duration").innerText = 
        heuresMinutes(movieData.duration);
    modalPattern.querySelector("#js-modal-genres").innerText = 
        movieData.genres;
    modalPattern.querySelector("#js-modal-directors").innerText = 
        movieData.directors;
    modalPattern.querySelector("#js-modal-actors").innerText = 
        movieData.actors;
    modalPattern.querySelector("#js-modal-original-title").innerText = 
        movieData.original_title;
    modalPattern.querySelector("#js-modal-countries").innerText = 
        movieData.countries;
    modalPattern.querySelector("#js-modal-imdb-score").innerText = 
        movieData.imdb_score;
    modalPattern.querySelector("#js-modal-rated").innerText = 
        shortRatedNGross(movieData.rated);
    modalPattern.querySelector("#js-modal-worldwide-gross-income").innerText = 
        shortRatedNGross(movieData.worldwide_gross_income);
    modalPattern.querySelector("#js-modal-long-description").innerText = 
        movieData.long_description;
    modalMovie = modalPattern;
    return modalMovie;
}

function heuresMinutes(duration) {
    heures = Math.floor(duration / 60);
    minutes = duration % heures;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return heures + "h " + minutes + "min";
}

function shortRatedNGross(data) {
    if (data === null || data === "none") {
        return "Inconnu";
    } else {
        var test1 = data.toString().includes("Not rated");
        var test2 = data.toString().includes("unkown");
        if (test1 === true || test2 === true) {
            return "Inconnu";
        } else {
            return data;
        }
    }
}

async function displayModal(modalMovie) {
    previouslyFocusElement = document.querySelector(":focus");
    modalDisplay = "yes"
    modalMovie.removeAttribute("aria-hidden"); // pour animation ouverture/fermeture
    modalMovie.style.display = "flex";
    modalMovie.querySelector(".js-modal-close").focus();
    modalMovie.addEventListener("click", closeModal);
    modalMovie.querySelector(".js-modal-stop") // Empêche fermeture quand clique
        .addEventListener("click", stopPropagation); // dans fenêtre modal.
}

function closeModal() {
    var modalMovie = document.querySelector("#js-modal-pattern");
    if (previouslyFocusElement !== null) previouslyFocusElement.focus();
    modalMovie.setAttribute("aria-hidden", "true"); // pour animation ouverture/fermeture
    modalMovie.removeEventListener("click", closeModal);
    modalMovie.querySelector(".js-modal-stop")
        .removeEventListener("click", stopPropagation);

    const hideModal = function() {
        modalMovie.removeAttribute("style");
        modalMovie.removeEventListener("animationend", hideModal)
        resetModal(modalMovie);
        modalDisplay = "no"
    };
    modalMovie.addEventListener("animationend", hideModal);
}

function stopPropagation(e) {
    e.stopPropagation();
}

function resetModal(modalMovie) {
    modalMovie.querySelector("#js-modal-title").innerText = "";
    modalMovie.querySelector("#js-modal-poster").src = "";
    modalMovie.querySelector("#js-modal-poster").alt = "Poster of movie";
    modalMovie.querySelector("#js-modal-date-published").innerText = "";
    modalMovie.querySelector("#js-modal-duration").innerText = "";
    modalMovie.querySelector("#js-modal-genres").innerText = "";
    modalMovie.querySelector("#js-modal-directors").innerText = "";
    modalMovie.querySelector("#js-modal-actors").innerText = "";
    modalMovie.querySelector("#js-modal-original-title").innerText = "";
    modalMovie.querySelector("#js-modal-countries").innerText = "";
    modalMovie.querySelector("#js-modal-imdb-score").innerText = "";
    modalMovie.querySelector("#js-modal-rated").innerText = "";
    modalMovie.querySelector("#js-modal-worldwide-gross-income").innerText = "";
    modalMovie.querySelector("#js-modal-long-description").innerText = "";
    modalPattern = modalMovie;
    return modalPattern;
}

window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    if (e.key === "Tab" && modalDisplay === "yes") {
        focusInModal(e);
    }
})

// Bloque le focus dans la fenêtre modal lorsque ouverte.
function focusInModal(e) {
    e.preventDefault();
}
