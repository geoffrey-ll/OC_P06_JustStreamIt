// Stockage ID des films (s'attuatile à chaque refresh de la page)

// Affichage informations films dans fenêtre modale

//let list_id = {}

//get_id_category1()
//get_id_category2()
//get_id_category3()

function stockage_id() {
    globalThis.modal_best_film = null
    globalThis.modal_0x1 = null
    globalThis.modal_0x2 = null
    globalThis.modal_0x3 = null
    globalThis.modal_0x4 = null
    globalThis.modal_0x5 = null
    globalThis.modal_0x6 = null
    globalThis.modal_0x7 = null
    globalThis.modal_1x1 = null
    globalThis.modal_1x2 = null
    globalThis.modal_1x3 = null
    globalThis.modal_1x4 = null
    globalThis.modal_1x5 = null
    globalThis.modal_1x6 = null
    globalThis.modal_1x7 = null
    globalThis.modal_2x1 = null
    globalThis.modal_2x2 = null
    globalThis.modal_2x3 = null
    globalThis.modal_2x4 = null
    globalThis.modal_2x5 = null
    globalThis.modal_2x6 = null
    globalThis.modal_2x7 = null
    globalThis.modal_3x1 = null
    globalThis.modal_3x2 = null
    globalThis.modal_3x3 = null
    globalThis.modal_3x4 = null
    globalThis.modal_3x5 = null
    globalThis.modal_3x6 = null
    globalThis.modal_3x7 = null
}

// Collecte des id des films



async function get_id_best_films_all_genres() {
    url_search_best = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes"
    pages = [url_search_best, url_search_best.next]
    count = 1
    for (page of pages) {

        await fetch(page)
            .then(res => {
                if (res.ok) {
                    res.json().then(data_sorted_films => {

                        if (count = 1) {
                            globalThis.modal_best_film = data_sorted_films.results[0].id
                            console.log(modal_best_film)
                            modal_0x1 = data_sorted_films.results[1].id
                            modal_0x2 = data_sorted_films.results[2].id
                            modal_0x3 = data_sorted_films.results[3].id
                            modal_0x4 = data_sorted_films.results[4].id
                            count += 1
                        }
                        if (count = 2) {
                            modal_0x5 = data_sorted_films.results[0].id
                            modal_0x6 = data_sorted_films.results[1].id
                            modal_0x7 = data_sorted_films.results[2].id
                        }
                    })
                }
            })
    }
}

async function get_id_category1() {
    url_search_best = "http://localhost:8000/api/v1/titles/?genre=biography&sort_by=-imdb_score%2C-votes"
    pages = [url_search_best, url_search_best.next]
    count = 1

    for (page of pages) {
        await fetch(page)
            .then(res => {
                if (res.ok) {
                    res.json().then(data_sorted_films => {

                        if (count = 1) {
                            modal_1x1 = data_sorted_films.results[0].id
                            modal_1x2 = data_sorted_films.results[1].id
                            modal_1x3 = data_sorted_films.results[2].id
                            modal_1x4 = data_sorted_films.results[3].id
                            modal_1x5 = data_sorted_films.results[4].id
                            count += 1
                        }
                        if (count = 2) {
                            modal_1x6 = data_sorted_films.results[0].id
                            modal_1x7 = data_sorted_films.results[1].id
                            modal_1x8 = data_sorted_films.results[2].id
                        }
                    })
                }
            })
    }
}

async function get_id_category2(){
    url_search_best = "http://localhost:8000/api/v1/titles/?genre=sci-fi&sort_by=-imdb_score%2C-votes"
    pages = [url_search_best, url_search_best.next]
    count = 1

    for (page of pages) {
        await fetch(page)
            .then(res => {
                if (res.ok) {
                    res.json().then(data_sorted_films => {

                        if (count = 1) {
                            modal_2x1 = data_sorted_films.results[0].id
                            modal_2x2 = data_sorted_films.results[1].id
                            modal_2x3 = data_sorted_films.results[2].id
                            modal_2x4 = data_sorted_films.results[3].id
                            modal_2x5 = data_sorted_films.results[4].id
                            count += 1
                        }
                        if (count = 2) {
                            modal_2x6 = data_sorted_films.results[0].id
                            modal_2x7 = data_sorted_films.results[1].id
                            modal_2x8 = data_sorted_films.results[2].id
                        }
                    })
                }
            })
    }
}

async function get_id_category3(){
    url_search_best = "http://localhost:8000/api/v1/titles/?genre=adventure&sort_by=-imdb_score%2C-votes"
    pages = [url_search_best, url_search_best.next]
    count = 1

    for (page of pages) {
        await fetch(page)
            .then(res => {
                if (res.ok) {
                    res.json().then(data_sorted_films => {

                        if (count = 1) {
                            modal_3x1 = data_sorted_films.results[0].id
                            modal_3x2 = data_sorted_films.results[1].id
                            modal_3x3 = data_sorted_films.results[2].id
                            modal_3x4 = data_sorted_films.results[3].id
                            modal_3x5 = data_sorted_films.results[4].id
                            count += 1
                        }
                        if (count = 2) {
                            modal_3x6 = data_sorted_films.results[0].id
                            modal_3x7 = data_sorted_films.results[1].id
                            modal_3x8 = data_sorted_films.results[2].id
                        }
                    })
                }
            })
    }
}





function get_data_best_film() {
    title_best_film = document.getElementById("title_best_film")
    synopsis_best_film = document.getElementById("synopsis_best_film")
    poster_best_film = document.getElementById("poster_best_film")
    fetch("http://localhost:8000/api/v1/titles/" + modal_best_film)
        .then(res => res.json())
        .then(data_best_film => {
            title_best_film.innerHTML = data_best_film.original_title
            synopsis_best_film.innerHTML = data_best_film.long_description
            poster_best_film.src = data_best_film.image_url
        })
}


// Remplissage fenêtre modale

async function displayInfosInModal(name, modal_pattern) {
    await fetch("http://localhost:8000/api/v1/titles/" + list_id[name])
        .then(res => {
            if (res.ok) {
            res.json().then(data_film => {

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



// Gestion fenêtre modal
let modal = null
let previouslyFocusElement = null

async function loadModal (e) {
    e.preventDefault()
    cible = "modal_window.html#modal_pattern"
    const existingModal = document.querySelector('#modal_pattern')
    if (existingModal !== null) {
        return openModal(existingModal)
    } else {
        id_film_key = e.target.getAttribute('name')

        html = await fetch(cible).then(response => response.text())
        modal_pattern = document.createRange().createContextualFragment(html).querySelector('#modal_pattern')

        document.body.append(modal_pattern)
        modal = await displayInfosInModal(id_film_key, modal_pattern)

        openModal(modal).then(result => console.log('fulilled')).catch(error => console.log('error'))
    }
}

async function openModal(modal) {
    previouslyFocusElement = document.querySelector(':focus')
    modal.removeAttribute('aria-hidden')
    modal.style.display = null
    modal.querySelector('.js_modal_close').focus()
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.removeEventListener('click', loadModal)
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
    modal.addEventListener('animationend', hideModal)
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


// Gestion du script


get_id_best_films_all_genres()
get_id_category1()
get_id_category2()
get_id_category3()
console.log(modal_best_film)


console.log(modal_0x1)
console.log(modal_0x2)
console.log(modal_0x3)
console.log(modal_0x4)
console.log(modal_0x5)
console.log(modal_0x6)
console.log(modal_0x7)
console.log(modal_1x1)
console.log(modal_1x2)
console.log(modal_1x3)
console.log(modal_1x4)
console.log(modal_1x5)
console.log(modal_1x6)
console.log(modal_1x7)
console.log(modal_2x1)
console.log(modal_2x2)
console.log(modal_2x3)
console.log(modal_2x4)
console.log(modal_2x5)
console.log(modal_2x6)
console.log(modal_2x7)
console.log(modal_3x1)
console.log(modal_3x2)
console.log(modal_3x3)
console.log(modal_3x4)
console.log(modal_3x5)
console.log(modal_3x6)
console.log(modal_3x7)





// temporaire
