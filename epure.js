// Stockage ID des films (s'attuatile à chaque refresh de la page)

// Affichage informations films dans fenêtre modale

let list_id = {}

function stockId() {
    list_id['0x0'] = 'test'
}

stockId()


async function displayInfosInModal(name, modal_pattern) {
    await fetch("http://localhost:8000/api/v1/titles/" + list_id[name])
        .then(res => {
            if (res.ok) {
            res.json().then(data_film => {

                console.log('In dispaly modal')

                modal_pattern.querySelector('#js_modal_title').innerHTML = data_film.title
                modal_pattern.querySelector('#js_modal_poster').src = data_film.image_url
                modal_pattern.querySelector('#js_modal_date_published').innerHTML = data_film.date_published
                modal_pattern.querySelector('#js_modal_duration').innerHTML = heuresMinutes(data_film.duration)
                modal_pattern.querySelector('#js_modal_genres').innerHTML = data_film.genres
                modal_pattern.querySelector('#js_modal_directors').innerHTML = data_film.directors
                modal_pattern.querySelector('#js_modal_actors').innerHTML = data_film.actors
                modal_pattern.querySelector('#js_modal_original_title').innerHTML = data_film.original_title
                modal_pattern.querySelector('#js_modal_countries').innerHTML = data_film.countries
                modal_pattern.querySelector('#js_modal_imdb_score').innerHTML = data_film.imdb_score
                modal_pattern.querySelector('#js_modal_rated').innerHTML = shortRatedNGross(data_film.rated)
                modal_pattern.querySelector('#js_modal_worldwide_gross_income').innerHTML = shortRatedNGross(data_film.worldwide_gross_income)
                modal_pattern.querySelector('#js_modal_long_description').innerHTML = data_film.long_description



//                document.getElementById(name).innerHTML = modal

            })}
        })
        return modal_pattern
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
                    list_id['modal_0x2'] = id_third_best
                    console.log(list_id)

//                    get_poster_film(category, id_best_film_2to5)

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




// Gestion fenêtre modal
let modal = null
let previouslyFocusElement = null


async function loadModal (e) {
    e.preventDefault()
    cible = "modal_window.html#modal_pattern"
    id_film_key = e.target.getAttribute('name')

    html = await fetch(cible).then(response => response.text())
    modal_pattern = document.createRange().createContextualFragment(html).querySelector('#modal_pattern')


    document.body.append(modal_pattern)
    modal_princ = await displayInfosInModal(id_film_key, modal_pattern)

    openModal(modal_princ).then(result => console.log('fulilled')).catch(error => console.log('blalba'))



//    return setTimeout(openModal(modal_princ), 5000)
}

async function openModal(modal_princ) {
    console.log(modal_princ)

    previouslyFocusElement = document.querySelector(':focus')

    modal_princ.style.display = null
    modal_princ.Selector('.js_modal_close').focus()
    modal_princ.addEventListener('click', closeModal)
    modal_princ.removeEventListener('click', loadModal)
    modal_princ.querySelector('.js_modal_close').addEventListener('click', closeModal)
    modal_princ.querySelector('.js_modal_stop').addEventListener('click', stopPropagation)
}

function closeModal(e) {
    if (modal === null) return "rien à ouvrir"
    if (previouslyFocusElement !== null) previouslyFocusElement.focus()
    e.preventDefault()
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
    modal_to_open => {modal_to_open.addEventListener('click', loadModal)}
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

