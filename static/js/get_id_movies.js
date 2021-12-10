



async function get_id_best_movies(list_id) {
    console.log(list_id)
    await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes")
        .then(res => {
            if (res.ok) {
                res.json().then(response1 => {
                    console.log("s'execute après tout le monde… alors qu'il est dans le await… pourquoi ?")
                    list_id['modal_best_movie'] = response1.results[0].id
                    
                    list_id['modal_0x1'] = response1.results[1].id
                    list_id['modal_0x2'] = response1.results[2].id
                    list_id['modal_0x3'] = response1.results[3].id
                    list_id['modal_0x4'] = response1.results[4].id
                    
                })
            }
        })
    return list_id[0]
}



list_id = {}
async function get_id_movies() {
    list_id['test'] = "atseina"
    await get_id_best_movies(list_id)
    console.log(list_id)
    
    // console.log(list_id)
    // console.log(list_id.test)
    console.log(list_id.modal_best_movie)
    // console.log(list_id.modal_0x1);
}

get_id_movies()

