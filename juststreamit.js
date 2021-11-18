// Stockage ID des films (s'attuatile à chaque refresh de la page)
let id_best_film

// Affichage informations films dans fenêtre modale

let list_id = {}

function stockId() {
    list_id['0x0'] = 'test'
}

stockId()


function displayInfosInModal(name) {
    fetch("http://localhost:8000/api/v1/titles/" + list_id[name])
        .then(res => {
            if (res.ok) {
            res.json().then(data_film => {
                elt = document.getElementById(name)
                elt.getElementsByClassName('js_modal_title')[0].innerHTML = data_film.title
                elt.getElementsByClassName('js_modal_poster')[0].src = data_film.image_url
                elt.getElementsByClassName('js_modal_date_published')[0].innerHTML = data_film.date_published
                elt.getElementsByClassName('js_modal_duration')[0].innerHTML = heuresMinutes(data_film.duration)
                elt.getElementsByClassName('js_modal_genres')[0].innerHTML = data_film.genres
                elt.getElementsByClassName('js_modal_directors')[0].innerHTML = data_film.directors
                elt.getElementsByClassName('js_modal_actors')[0].innerHTML = data_film.actors
                elt.getElementsByClassName('js_modal_original_title')[0].innerHTML = data_film.original_title
                elt.getElementsByClassName('js_modal_countries')[0].innerHTML = data_film.countries
                elt.getElementsByClassName('js_modal_imdb_score')[0].innerHTML = data_film.imdb_score
                elt.getElementsByClassName('js_modal_rated')[0].innerHTML = shortRatedNGross(data_film.rated)
                elt.getElementsByClassName('js_modal_worldwide_gross_income')[0].innerHTML = shortRatedNGross(data_film.worldwide_gross_income)
                elt.getElementsByClassName('js_modal_synopsis')[0].innerHTML = data_film.long_description
            })
            }
        })
}

function heuresMinutes(duration) {
    heures = Math.floor(duration / 60)
    minutes = duration % heures
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    return heures + 'h ' + minutes + 'min'
}

function shortRatedNGross(data) {
    if (data === null || data === "none") {
        return "Inconnu"
    }
    if (data.includes("Not rated") === true || data.includes("unkown") === true) {
        return "Inconnu"
    }
}



get_id_best_films()


function get_id_best_films() {
    fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes")
        .then(res => {
            if (res.ok) {
                res.json().then(data_sorted_films => {

                    console.log(data_sorted_films.results)

                    id_best_film = data_sorted_films.results[0].id
                    list_id['modal_best_film'] = id_best_film
                    get_data_best_film(id_best_film)

                    category = 0
                    id_best_film_2to5 = [
                        id_second_best = data_sorted_films.results[1].id,
                        id_third_best = data_sorted_films.results[2].id,
                        id_four_best = data_sorted_films.results[3].id,
                        id_five_best = data_sorted_films.results[4].id
                    ]

                    list_id['modal_0x1'] = id_second_best
                    console.log(list_id)
                    console.log(list_id['modal_0x1'])

                    get_poster_film(category, id_best_film_2to5)

                    page2 = data_sorted_films.next

                })
            } else {
                console.log("ERROR")}
        })
}


function get_data_best_film() {
    title_best_film = document.getElementById("title_best_film")
    synopsis_best_film = document.getElementById("synopsis_best_film")
    poster_best_film = document.getElementById("poster_best_film")
    fetch("http://localhost:8000/api/v1/titles/" + id_best_film)
        .then(res => res.json())
        .then(data_best_film => {
            title_best_film.innerHTML = data_best_film.original_title
            synopsis_best_film.innerHTML = data_best_film.long_description
            poster_best_film.src = data_best_film.image_url
        })
}


async function get_poster_film() {
    for (id of id_best_film_2to5) {
        console.log("c'est quoi l'id : " + id)
        poster_film = document.getElementById(category + "x" + id_best_film_2to5.indexOf(id))
        path = "http://localhost:8000/api/v1/titles/" + id

       await fetch(path)

            .then(res => {
                console.log(res)
                if (res.ok) {
                    res.json().then(data_film => {
                        poster_film.src = data_film.image_url
                    })
                } else {
                    console.log("ERROR")}
            })
}
}





// Gestion fenêtre modal
let modal = null
let previouslyFocusElement = null

function openModal(e) {

    console.log("je suis e")
    console.log(e)

    e.preventDefault()
    modal = document.getElementById(e.target.getAttribute('name'))
    displayInfosInModal(e.target.getAttribute('name'))
    previouslyFocusElement = document.querySelector(':focus')
    modal.removeAttribute('aria-hidden')
    modal.style.display = null
    modal.querySelector('.js_modal_close').focus()
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.removeEventListener('click', openModal)
    modal.querySelector('.js_modal_close').addEventListener('click', closeModal)
    modal.querySelector('.js_modal_stop').addEventListener('click', stopPropagation)
}

function closeModal(e) {
    if (modal === null) return "rien à ouvrir"
    if (previouslyFocusElement !== null) previouslyFocusElement.focus()
    e.preventDefault()
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js_modal_close').removeEventListener('click', closeModal)
    modal.querySelector('.js_modal_stop').removeEventListener('click', stopPropagation)
    const hideModal = function() {
        modal.style.display = "none"
        modal.removeEventListener('animationend', hideModal)
        modal = null
    }
    modal.addEventListener('animationend', hideModal())
}

function stopPropagation(e) {
    e.stopPropagation()
}

function focusInModal(e) {
    e.preventDefault()
}

document.querySelectorAll('.js_modal').forEach(
    modal_to_open => {modal_to_open.addEventListener('click', openModal)}
)

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
})




// temporaire

//
//fetch("http://localhost:8000/api/v1/titles/32138")
//    .then(res => res.json())
//    .then(data => console.log(data))
//
//fetch("http://localhost:8000/api/v1/titles/33467")
//    .then(res => res.json())
//    .then(data => console.log(data))

function test_print(){
    fetch("http://localhost:8000/api/v1/titles/499549")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value);
        })
        .catch(function(err) {
        });
    return res.blob();
}

