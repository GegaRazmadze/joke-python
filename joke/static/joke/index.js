document.addEventListener('DOMContentLoaded', function() {
    // delete joke from jokes Favoite page
    var deleteJokeFromFavoritesClass = document.querySelectorAll('.delete_joke_from_favorites_class')
    if (deleteJokeFromFavoritesClass) {
        deleteJokeFromFavoritesClass.forEach(element => {
            element.addEventListener('submit', function(event) {
            event.preventDefault();
            deleteJokeFromFavoritesPage(element);
            })
        })
    }

    // Event Listener for Rendom chuck Form 
    var rendomChuckFrom = document.querySelector('#Rendom_chuck_form')
    if (rendomChuckFrom) {
        rendomChuckFrom.addEventListener('submit', function(event) {
            event.preventDefault();
        });
    }
    
    // Event Listener for Rendom Other Jokes Form  
    var rendomOtherJokesForm = document.querySelector('#Rendom_other_jokes_form')
    if (rendomOtherJokesForm) {
        rendomOtherJokesForm.addEventListener('submit', function(event) {
            event.preventDefault();
        });
        
    }

    // add_joke_to_favorites Form 
    var addJokeToFavoritesForm = document.querySelector('#add_joke_to_favorites')
    if (addJokeToFavoritesForm) {
        addJokeToFavoritesForm.addEventListener('submit', function(event) {
            event.preventDefault();
        });
    }

    // Event Listener for Rendom chuck joke Button
    var rendomChuckButton = document.querySelector('#Rendom_chuck_button')
    if (rendomChuckButton) {
        rendomChuckButton.addEventListener('click', queryRendomChuckJoke);
    }

    // Event Listener for Rendom Other Jokes Button
    var rendomOtherJokesButton = document.querySelector('#Rendom_other_jokes_button')
    if (rendomOtherJokesButton) {
        rendomOtherJokesButton.addEventListener('click', queryRendomOtherJoke);
    }

    // joke_add_delete_button From Favorites
    var jokeAddDeleteButton = document.querySelector('#joke_add_delete_button')
    if (jokeAddDeleteButton) {
        jokeAddDeleteButton.addEventListener('click', sendAddDeleteFavoritesRequest);
    }

    // Favorite Jokes css depending on type
    var favoriteJokeconteiner = document.querySelectorAll('.favorite_joke_conteiner')
    if (favoriteJokeconteiner) {
        favoriteJokeconteiner.forEach(element => { 
            setCssForFavoritePage(element);
        });
    }

});

// Query Rendom Chuck Joke
function queryRendomChuckJoke() {
    fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
	"method": "GET",
	"headers": {
		"accept": "application/json",
		"x-rapidapi-key": "7f336c6aa9mshfffdf11697df95ep1818dcjsnb477c9914325",
		"x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com"
	}
    })
    .then(response => {
        response.json().then(function(data) {
            rendomChuckJoke(data)
          });
    })
    .catch(err => {
        console.error("Error in queryRendomChuckJoke(): ",err);
    });
}

// Query Rendom Other Jokes Joke
function queryRendomOtherJoke() {
    fetch("https://joke3.p.rapidapi.com/v1/joke", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "7f336c6aa9mshfffdf11697df95ep1818dcjsnb477c9914325",
            "x-rapidapi-host": "joke3.p.rapidapi.com"
        }
    })
    .then(response => {
        response.json().then(function(data) {
            rendomOtherJokesJoke(data)
          });
    })
    .catch(err => {
        console.error(err);
    });
}

// Display rendom Chuck Joke
function rendomChuckJoke(chuckData) {
    let text = document.querySelector('#rendom_chuck_joke');
    let joke_id_input = document.querySelector('#joke_id_input');
    let joke_body_input = document.querySelector('#joke_body_input');
    let joke_add_delete_button = document.querySelector('#joke_add_delete_button')

    const add_joke_to_favorites_form = document.querySelector('#add_joke_to_favorites');
    
    // string to array
    // {% if user.is_authenticated %}
    if (add_joke_to_favorites_form) {
        var jokes_id_data =  eval(joke_id_input.dataset.jokesid)
    }



    if (text.innerHTML === '') {
        text.innerHTML = chuckData.value
        add_joke_to_favorites_form.style.display = 'block';
    } else {
        text.innerHTML = '';
        text.innerHTML = chuckData.value;
    }

    joke_id_input.value = chuckData.id;
    joke_body_input.value = chuckData.value;

    joke_is_in_favorite = jokes_id_data.find(x => x.joke_id === joke_id_input.value);

    if (Boolean(joke_is_in_favorite)) {
        joke_add_delete_button.value = 'Remove From Favorites';
    } else {
        joke_add_delete_button.value = 'Add To Favorites';
    }
}

// Display rendom Other Joke
function rendomOtherJokesJoke(otherJokesData) {
    let text = document.querySelector('#rendom_other_joke');
    let joke_id_input = document.querySelector('#joke_id_input');
    let joke_body_input = document.querySelector('#joke_body_input');
    let joke_add_delete_button = document.querySelector('#joke_add_delete_button')

    const add_joke_to_favorites_form = document.querySelector('#add_joke_to_favorites');
    
    // string to array
    // {% if user.is_authenticated %}
    if (add_joke_to_favorites_form) {
        var jokes_id_data =  eval(joke_id_input.dataset.jokesid)
    }


    if (text.innerHTML === '') {
        text.innerHTML = otherJokesData.content
        add_joke_to_favorites_form.style.display = 'block';
    } else {
        text.innerHTML = '';
        text.innerHTML = otherJokesData.content;
    }

    joke_id_input.value = otherJokesData.id;
    joke_body_input.value = otherJokesData.content;

    joke_is_in_favorite = jokes_id_data.find(x => x.joke_id === joke_id_input.value);

    if (Boolean(joke_is_in_favorite)) {
        joke_add_delete_button.value = 'Remove From Favorites';
    } else {
        joke_add_delete_button.value = 'Add To Favorites';
    }
}

//send fetch request to server and change button style
function sendAddDeleteFavoritesRequest() {
    let joke_id_input = document.querySelector('#joke_id_input');
    let joke_type_input = document.querySelector('#joke_type_input');
    let joke_body_input = document.querySelector('#joke_body_input');
    let joke_add_delete_button = document.querySelector('#joke_add_delete_button')

    // values:
    let joke_id = joke_id_input.value
    let joke_type = joke_type_input.value
    let body = joke_body_input.value

    let button_text = joke_add_delete_button.value
    // To eliminate spaces
    let button_text_trim = button_text.trim()

    form = new FormData();
    form.append("joke_id", joke_id);
    form.append("joke_type", joke_type);
    form.append("body", body);

    fetch('/add_delete_favorites/', {
        method: 'POST',
        body: form,
    })
    .then((res) => {
        console.log(res)

        if (button_text_trim === 'Add To Favorites') {
            joke_add_delete_button.value = 'Remove From Favorites';
        } else {
            joke_add_delete_button.value = 'Add To Favorites';
        }
    })
    .catch(err => console.log(err))
}


// delete joke from jokes Favoite page
function deleteJokeFromFavoritesPage(element) {
    let joke_id = element.id
    let joke_type = document.querySelector(`#joke_type_input_${joke_id}`).value


    form = new FormData();
    form.append("joke_id", joke_id);
    form.append("joke_type", joke_type);

    fetch('/add_delete_favorites/', {
        method: 'POST',
        body: form,
    })
    .then((res) => {
        console.log(res)
        // css animation
    })
    .catch(err => console.log(err))
    
}

///////// Favorite Page styling 
function setCssForFavoritePage(element) {
    var type_of_element = element.dataset.type
    if (type_of_element === 'Chuck') {
        element.classList.add('chuck_jokes_css_class');
    } else {
        element.classList.add('other_jokes_css_class');
    }

    element.querySelector('.joke_delete_button_class').onclick = () => {
        element.style.animationPlayState = 'running';
    };
}