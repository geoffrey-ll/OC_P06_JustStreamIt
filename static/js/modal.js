let modalDisplay = "no"; // Utile pour bloquer focus dans modal.
let previouslyFocusElement = null;

async function openModal (idMovie) {
    const modalPattern = document.querySelector("#modal_pattern");
    movieData = await loadMovieData(idMovie); // dans "home.js"
    modalMovie = await loadModalMovie(movieData, modalPattern);
    return displayModal(modalMovie);
};


async function loadModalMovie(movieData, modalPattern) {
    modalPattern.querySelector("#js_modal_title").innerText = 
        movieData.title;
    modalPattern.querySelector("#js_modal_poster").src = 
        movieData.image_url;
    modalPattern.querySelector("#js_modal_date_published").innerText = 
        movieData.date_published;
    modalPattern.querySelector("#js_modal_duration").innerText = 
        heuresMinutes(movieData.duration);
    modalPattern.querySelector("#js_modal_genres").innerText = 
        movieData.genres;
    modalPattern.querySelector("#js_modal_directors").innerText = 
        movieData.directors;
    modalPattern.querySelector("#js_modal_actors").innerText = 
        movieData.actors;
    modalPattern.querySelector("#js_modal_original_title").innerText = 
        movieData.original_title;
    modalPattern.querySelector("#js_modal_countries").innerText = 
        movieData.countries;
    modalPattern.querySelector("#js_modal_imdb_score").innerText = 
        movieData.imdb_score;
    modalPattern.querySelector("#js_modal_rated").innerText = 
        shortRatedNGross(movieData.rated);
    modalPattern.querySelector("#js_modal_worldwide_gross_income").innerText = 
        shortRatedNGross(movieData.worldwide_gross_income);
    modalPattern.querySelector("#js_modal_long_description").innerText = 
        movieData.long_description;
    modalMovie = modalPattern;
    return modalMovie;
};

function heuresMinutes(duration) {
    heures = Math.floor(duration / 60);
    minutes = duration % heures;
    if (minutes < 10) {
        minutes = "0" + minutes;
    };
    return heures + "h " + minutes + "min";
};

function shortRatedNGross(data) {
    if (data === null || data === "none") {
        return "Inconnu";
    }else {
        var test1 = data.toString().includes("Not rated");
        var test2 = data.toString().includes("unkown");
        if (test1 === true || test2 === true) {
            return "Inconnu";
        }else {
            return data;
        };
    };
};

async function displayModal(modalMovie) {
    previouslyFocusElement = document.querySelector(":focus");
    modalDisplay = "yes"
    modalMovie.removeAttribute("aria-hidden"); // pour animation ouverture/fermeture
    modalMovie.style.display = "flex";
    modalMovie.querySelector(".js_modal_close").focus();
    modalMovie.addEventListener("click", closeModal);
    modalMovie.querySelector(".js_modal_stop") // Empêche fermeture quand clique
        .addEventListener("click", stopPropagation); // dans fenêtre modal.
};

function closeModal() {
    var modalMovie = document.querySelector("#modal_pattern");
    if (previouslyFocusElement !== null) previouslyFocusElement.focus();
    modalMovie.setAttribute("aria-hidden", "true"); // pour animation ouverture/fermeture
    modalMovie.removeEventListener("click", closeModal);
    modalMovie.querySelector(".js_modal_stop")
        .removeEventListener("click", stopPropagation);
    const hideModal = function() {
        modalMovie.removeAttribute("style");
        modalMovie.removeEventListener("animationend", hideModal)
        modalDisplay = "no"
    };
    modalMovie.addEventListener("animationend", hideModal);
    resetModal(modalMovie);
};

function stopPropagation(e) {
    e.stopPropagation();
};

function resetModal(modalMovie) {
    modalMovie.querySelector("#js_modal_title").innerText = "";
    modalMovie.querySelector("#js_modal_poster").src = "";
    modalMovie.querySelector("#js_modal_date_published").innerText = "";
    modalMovie.querySelector("#js_modal_duration").innerText = "";
    modalMovie.querySelector("#js_modal_genres").innerText = "";
    modalMovie.querySelector("#js_modal_directors").innerText = "";
    modalMovie.querySelector("#js_modal_actors").innerText = "";
    modalMovie.querySelector("#js_modal_original_title").innerText = "";
    modalMovie.querySelector("#js_modal_countries").innerText = "";
    modalMovie.querySelector("#js_modal_imdb_score").innerText = "";
    modalMovie.querySelector("#js_modal_rated").innerText = "";
    modalMovie.querySelector("#js_modal_worldwide_gross_income").innerText = "";
    modalMovie.querySelector("#js_modal_long_description").innerText = "";
    modalPattern = modalMovie;
    return modalPattern;
};

window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    };
    if (e.key === "Tab" && modalDisplay === "yes") {
        focusInModal(e);
    };
});

// Bloque le focus dans la fenêtre modal lorsque ouverte.
function focusInModal(e) {
    e.preventDefault();
};
