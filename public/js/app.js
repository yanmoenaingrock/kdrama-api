const addDeleteListeners = () => {
    const buttons = document.getElementsByClassName("delete");
    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener("click", (e) => {
            deleteDrama(buttons[i].value);
        });
    }
}

const addSubmitListener = () => {
    const submit = document.getElementById("form__submit");
    submit.addEventListener("click", addDrama)
}

const addDrama = (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const actor = document.getElementById("lead-actor").value;
    const actress = document.getElementById("lead-actress").value;
    const director = document.getElementById("director").value;
    const year = document.getElementById("year").value;
    const country = document.getElementById("country").value;
    const episodes = document.getElementById("episodes").value;
    console.log(title, actor, actress, director, year, country, episodes);

    const data = {
        title,
        director,
        leadActor: actor,
        leadActress: actress,
        noepisodes: episodes,
        releasedYear: year,
        countryOfOrigin: country,
    }

    fetch("http://localhost:3000/api/v1/dramas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then( res => {
        window.location.href = "http://localhost:3000";
    })
    .catch( err => console.log( err ));
}

const deleteDrama = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/api/v1/dramas/${id}`, {
            method: "DELETE",
        })
        .then(res => location.reload())
        .catch(err => console.log(err));
}

addDeleteListeners();
addSubmitListener();