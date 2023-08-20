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
let pokemonList = [];
let searchPokemonList = [];
let allPokemons = []
let generalInfoBool = true;
let cardOpen = false;
let allowLoading = true;
let initialLoad = 151;
let limitLoad = 1010;
let next;
let previous;


// FUNCTIONS
/**
 * Fetch the pokemon from the PokeAPI and creating an array of pokemons
 */
const fetchPokemon = () => {
    pokemonList = []    // Reset the pokemon list for toogle between 151 Pokemon List and All Pokemon List
    let promises = []   // Makes an array of all the promisses from feth function
    for (let i = 1; i <= initialLoad; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`; // Base URL
        promises.push(fetch(url).then((result) => { return result.json() })); // Transform the feth into json format
    }

    Promise.all(promises).then(result => { // Provides all the pokemons at the same time 
        const pokemonMap = result.map((data) =>
        ({
            name: data.name,
            id: data.id,
            image: data['sprites']['other']['official-artwork']['front_default'],
            types: data.types,
        }))
        pokemonMap.forEach((pokemon) => pokemonList.push(pokemon))   // Add each pokemon into pokemon list
        displayPokemonCard(pokemonList)
    })
}

/**
 * Fetch more pokemons after the initial fetch
 */
const fetchMorePokemon = () => {
    addLoadingAnimation();
    let newLimit = initialLoad + 20;
    if (allowLoading) {
        debugger
        let promises = []  // Makes an array of all the promisses from feth function
        newLimit < 990 ? newLimit : newLimit = finalLoad() // Limit the iteration to be into the API data limit.
        for (let i = initialLoad + 1; i <= newLimit; i++) {
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
            pokemonList = pokemonList.concat(pokemon)
            displayPokemonCard(pokemonList)
        })
        initialLoad = newLimit
        pokemonList = pokemonList
        document.getElementById('loading_indicator').innerHTML = 'Loading more pokemons ...'
    }
}


/**
 * Display the pokemons on the display
 * 
 * @param {*} pokemonArray - List of Pokemons previous fetched 
 */
const displayPokemonCard = (pokemonArray) => {
    const pokeboard = document.getElementById("cards__wrapper");
    const pokemonHTMLString = pokemonArray.map(pokemon => templateCardDiv(pokemon)).join("");
    pokeboard.innerHTML = pokemonHTMLString;
    removeLoadingAnimation();
}


/**
 * Call the PokeAPI in order to get more data about the searched pokemon
 * 
 * @param {*} id - Id of the searched pokemon
 */
const pokemonStats = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    response = await fetch(url)
    data = await response.json()
    generateStatsDiv(data);
    generalInfoBool ? showGeneralInfo() : showMainStats() // Provides the General Information or Main Stats
    showBaseStatsOnClick()
    console.log(data);
}


/**
 * Open Pokemon Card
 */
function showBaseStatsOnClick() {
    cardOpen = true
    toogleScroll()
    document.getElementById('stats__wrapper').classList.remove('d-none');
}


/**
 * Close Pokemon Card
 */
function closeStats() {
    cardOpen = false;
    toogleScroll()
    document.getElementById('stats__wrapper').classList.add('d-none');
    document.querySelector('body').style.overflowY = ('unset');
    document.getElementById('cards__wrapper').classList.remove('blur');
}


/**
 * Provides the General Info of the Pokemon
 * 
 * Species
 * Height
 * Weight
 * Abilities
 */
function showGeneralInfo() {
    generalInfoBool = true
    document.getElementById('more__info--container').classList.remove('d-none')
    document.getElementById('more__info--button').classList.add('heighlight')
    document.getElementById('base__stats--container').classList.add('d-none')
    document.getElementById('base__stats--button').classList.remove('heighlight')
}


/**
 * Provides the Main Stats of the Pokemon
 * 
 * Health
 * Attack
 * Defense
 * Special-Attack
 * Special-Defense
 * Speed
 */
function showMainStats() {
    generalInfoBool = false
    document.getElementById('more__info--container').classList.add('d-none')
    document.getElementById('more__info--button').classList.remove('heighlight')
    document.getElementById('base__stats--container').classList.remove('d-none')
    document.getElementById('base__stats--button').classList.add('heighlight')
}


/**
 * Generate the Pokemon Card
 * 
 * @param {*} i - Object of the Pokemon to be generated
 */
function generateStatsDiv(i) {
    let stats_container = document.getElementById('stats__container');
    stats_container.innerHTML = templateCardStatDiv(i);
}


//Stop Propagation - To not close the Pokemon Card
function stopPropagation(event) {
    event.stopPropagation();
}


/**
 * For each keyup event, the function will search within the pokemon list, if any of the pokemons have the coresponding input into their name.
 * 
 * @param {*} event - "onkeyup" Event
 */
function searchPokemon(event) {
    document.getElementById('loading_indicator').innerHTML = ''; // Clear loading indicator
    searchPokemonList = pokemonList // Initializes the searching list and preserving the initial list
    searchPokemonList.length === initialLoad ? allowLoading = true : allowLoading = false; // Restrict the fetching of more Pokemon when at the bottom of the page
    let searchInput = event.target.value.toLowerCase(); // Transform all input into lowcase for filter
    let filterPokemon = searchPokemonList.filter((pokemon) => {
        return (pokemon['name'].toLowerCase().includes(searchInput)); // Return a list of all the pokemons that are metching the searched input 
    })
    displayPokemonCard(filterPokemon) // Display the list of found pokemons
    searchPokemonList = filterPokemon // Update the search list with the found pokemon list. Required for the change (next or previous) within the Pokemon Card
}


/**
 * Provides the index of the selected pokemon into the pokemon lisz
 * 
 * @param {*} clickedPokemon - Selected / Clicked Pokemon
 * @returns - The index of the pokemon into the pokemonList
 */
const getIndexInPokemonList = (clickedPokemon) => {
    const index = pokemonList.findIndex(pokemon => pokemon.id === clickedPokemon['id'])
    return index
}


/**
 * The funtion is called by the arrow / keyboard into Pokemon Card in order to provide the information from the new / previous Pokemon from the list
 * 
 * @param {*} pokeID - Current Pokemon ID
 * @param {*} newPokeID - Desired Pokemon ID
 */
const changePokemonCard = (pokeID, newPokeID) => {
    if (searchPokemonList.length == 1) { // If list has only one element
        return null
    } else if (searchPokemonList.length < initialLoad && searchPokemonList.length != 0) { // If search process have been initialized
        let newIndex = searchPokemonList.findIndex(pokemon => pokemon['id'] === pokeID);
        if (pokeID > newPokeID && newIndex >= 1) pokemonStats((searchPokemonList[newIndex - 1].id));
        if (pokeID < newPokeID && newIndex < searchPokemonList.length - 1) pokemonStats((searchPokemonList[newIndex + 1].id));
    } else { // Default case 
        pokemonStats(newPokeID)
    }
}

/**
 * Provides UI loading animation
 */
const addLoadingAnimation = () => {
    document.getElementById('cards_loading-animation').classList.remove('d-none');
}


/**
 * Remove UI loading animation
 */
const removeLoadingAnimation = () => {
    document.getElementById('cards_loading-animation').classList.add('d-none')
}



/**
 * Informs the user that no more pokemons are to be loaded
 * 
 * @returns - Value for the limit of pokemons to be fetched.
 */
const finalLoad = () => {
    document.getElementById('loading_indicator').innerHTML = "No more Pokemons to load!"
    return 1010
}


/**
 * Able and Disable the scroll of pokemons in the backgroud, when the Pokemon Card is open.
 */
const toogleScroll = () => {
    cardOpen ? document.body.classList.add('scroll-none') : document.body.classList.remove('scroll-none');
}


/**
 * Go to maine route
 */
const goToMainPage = () => {
    window.location.href = "/"
}


const disableSearch = () => {
    document.getElementById('search').classList.add('d-none')
}



// EVENT LISTENERS
/**
 * Calls a serie of functions after the DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname == '/') {
        addLoadingAnimation();
        fetchPokemon();
        switchPokemonList();
        getControllers();
    } else {
        disableSearch();
    }
})


/**
 * Changes the list of pokemons between the initial 151 pokemons or a List of all pokemons
 */
const switchPokemonList = () => {
    const switchToogle = document.getElementById("switch");
    const indicatorHTML = document.getElementById('loading_indicator');
    const labelSwitch = document.getElementById('label_switch');
    switchToogle.addEventListener("change", function () {
        allowLoading = false
        document.getElementById('search__input--id').value = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (this.checked) { // If selected, raise initial load to the maximum value
            labelSwitch.innerHTML = "Get the initial Pokemons!"
            indicatorHTML.innerHTML = "All Pokemons are loading. Please wait!";
            initialLoad = limitLoad;
        } else if (this.checked == false) {
            indicatorHTML.innerHTML = "Loading the initial 151 Pokemon ..."
            labelSwitch.innerHTML = "Get all Pokemons!"
            initialLoad = 151; // Reinitialise the initial load value to 151, coresponding the initial 151 pokemons
        }
        addLoadingAnimation();
        document.getElementById('cards__wrapper').innerHTML = ''; // Reset board
        fetchPokemon(); // Fetch the pokemons
        searchPokemonList = pokemonList // Set the searched list to the current list
        allowLoading = true
        // debugger
    });
}


/**
 * Connects the keyboard in order to navigate the pokemon cards
 */
function getControllers() {
    document.addEventListener('keyup', (e) => {
        if (cardOpen) {
            if (e.keyCode == 39) pokemonStats(next);        // Right arrow
            if (e.keyCode == 37) pokemonStats(previous);    // Left arrow
            if (e.keyCode == 27) closeStats();              // ESC key
        }
    })
}


/**
 * Observes the scroll on the page in order to load more pokemons
 */
window.addEventListener('scroll', () => {
    // Calculate the distance between the bottom of the page and the current scroll position
    const distanceToBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    const trashhold = 100
    // Calls the funtion to fetch more pokemons if the limit of existing pokemon in the list is not reached.
    distanceToBottom <= trashhold && initialLoad != limitLoad ? fetchMorePokemon() : null
});