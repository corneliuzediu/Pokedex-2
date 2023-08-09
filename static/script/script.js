// CONSTANTS

colors = {
    'normal': "#BBBBAD",
    'grass': "#48D0B0",
    'fire': "#FB6D6C",
    'water': "#76BDFD",
    'fighting': "#A55744",
    'flying': "#7AA4FF",

    'poison': "#A95EA1",
    'ground': "peru",
    'rock': "#CEBC72",
    'bug': "#C2D11E",
    'ghost': "#7973D5",
    'electric': "#FFD86F",

    'psychic': "#FE64B3",
    'ice': "#95F1FE",
    'dragon': "#8C76FF",
    'dark': "#8B6653",
    'steel': "#C4C2DA",
    'fairy': "#FBACFF"
}


// VARIABLES
let pokemonList;

// FUNTIONS

const fetchPokemon = () => {
    let promises = []  //Makes an array of all the promisses from feth function
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`; // Base URL
        promises.push(fetch(url).then((result) => { return result.json() })); // Transform the feth into json format
    }

    Promise.all(promises).then(result => { // Provides all the pokemons at the same time 
        const pokemon = result.map((data) =>
        ({
            name: data.name,
            id: data.id,
            image: data['sprites']['other']['official-artwork']['front_default'],
            types: data.types,
        }))
        // console.log(pokemon)
        pokemonList = pokemon
        displayPokemonCard(pokemon)
        // console.log(pokemonList);
    })
}

const displayPokemonCard = (pokemon) => {
    const pokeboard = document.getElementById("cards__wrapper");
    const pokemonHTMLString = pokemon.map(pokemon => templateCardDiv(pokemon)).join("");
    pokeboard.innerHTML = pokemonHTMLString;
}

const pokemonStats = async (id) => {
    debugger
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    response = await fetch(url)
    data = await response.json()
    showBaseStatsOnClick(data)

}

function closeStats() {
    document.getElementById('stats__wrapper').classList.add('d-none');
    document.querySelector('body').style.overflowY = ('unset');
    document.getElementById('cards__wrapper').classList.remove('blur');
}

function showBaseStatsOnClick(data) {
    document.getElementById('stats__wrapper').classList.remove('d-none');
    generateStatsDiv(data);
}

function generateStatsDiv(i) {
    let stats_container = document.getElementById('stats__container');
    stats_container.innerHTML = ``;
    stats_container.innerHTML = templateCardStatDiv(i);
}

//Stop Propagation
function stopPropagation(event) {
    event.stopPropagation();
}


// The funtions are called when the DOM Content is full loaded 
document.addEventListener("DOMContentLoaded", () => {
    // console.log(pokemonList);
})


fetchPokemon();



