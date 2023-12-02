const id = Math.floor((Math.random() * 150) + 1) // 1->2

let correctName;


function onKeyUp(event) {
    const input = event.currentTarget;
    const value = input.value.trim().toLowerCase();
    if (event.key === "Enter") {
        console.log("Pressed Enter");
        console.log("Value", value);
        console.log ("Correct Name", correctName);
        const img = document.querySelector("img");
        if (input.value === correctName) {
            img.classList.add("correct");
        } else {
            img.classList.add("wrong");
            setTimeout(function() {
                img.classList.remove("wrong");
            }, 3000);
        }
    }
}

fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    
    .then (function(response) {
        if(response.ok) {
            return response.json()
        }
        return null
    }) 
    .catch(function(err) {
        const p = document.createElement('p')
        p.textContent = 'Pokemon API returned non JSON'; //use .textContent to put text into the p element
        //first you create an element
        const parent = document.querySelector('section')
        //find the parent to attach to
        parent.appendChild(p)
        //append the newly created element to the parent
        parent.prepend(p)
    })
    .then(function(pokemon) {
        if(!pokemon) {
            //pokemon === undefined, null, false, "", 0
            return;
        }
            //pokemon = undefined
            console.log("Pokemon", pokemon);
            console.log("Pokemon's name", pokemon.name)

            correctName = pokemon.name;

            const img = document.querySelector('img')
            let name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
            if (id === 122) {
                name = "Mr-Mime"
            }
            img.src = `https://aelahi.dev/coen-161/pokemon/${name}.png`;
            //anytime you need to interact with the HTML from the Javascript
            //first you need a reference to the element
            const input = document.querySelector('input');
            input.addEventListener('keyup', onKeyUp);
    })
    .catch(function(err) {
        const p = document.createElement('p')
        p.textContent = err; //use .textContent to put text into the p element
        //first you create an element
        const parent = document.querySelector('section')
        //find the parent to attach to
        parent.appendChild(p)
        //append the newly created element to the parent
        parent.prepend(p)
    })