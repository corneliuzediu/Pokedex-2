// Template for each Pokemon Card
function templateCardDiv(pokemon) {
    const backgroundColor = colors[pokemon.types[0].type.name];
    // Generate HTML elements for each type

    const typeElements = pokemon.types.map(type => {
        const typeColor = colors[type.type.name];
        return `<p class="type__element" style="background-color: ${typeColor};">${type.type.name}</p>`;
    }).join('');
    // Generate Main Card HTML element
    return `
    <div id="card__container-${pokemon['id']}" class='card__container' onclick="pokemonStats(${pokemon.id})" style="background-color: ${backgroundColor}">
        <div class="card__container--info">
            <h2>${pokemon['name'].charAt(0).toLocaleUpperCase() + pokemon['name'].slice(1)}</h2>
            <h2>${pokemon['id']} #</h2>
        </div>
        <div class="card__container--elements">${typeElements}</div>
        <div class="card__container--stats_img">
            <div class="card__container--show_stats">
                <button>Click for stats! </button>
            </div>
            <div class="card__container--img"><img src="${pokemon.image}"></div>
        </div>
    </div>`
}


//Template for Card Stats 
function templateCardStatDiv(pokemon) {
    const backgroundColor = colors[pokemon.types[0].type.name];
    let index = getIndexInPokemonList(pokemon)
    pokemon['id'] !== limit ? next = parseInt(pokemon['id']) + 1 : next = limit;
    pokemon['id'] > 1 ? previous = parseInt(pokemon['id']) - 1 : previous = 1;
    // Generate HTML Element for each ability
    const abilities = pokemon.abilities.map(ability => {
        return `<span>${ability.ability['name']}</span>`;
    }).join(', ')
    // Generate HTML Element with Genral Info
    return `<div id="stats__show--id-${pokemon}" class ="stats__show" onclick="stopPropagation(event)" style="background-color: ${backgroundColor}">
                <div class="stats__info card__container--info">
                    <h2>${pokemon['name'].charAt(0).toLocaleUpperCase() + pokemon['name'].slice(1)}</h2>
                    <h2>${pokemon['id']} #</h2>
                </div>
                <div class="stats__img__type">
                    <div class="card__container--stats_img stats__img-container">
                        <div  class="card__container--img"><img src="${pokemon['sprites']['other']['official-artwork']['front_default']}"></div>
                        <div id="stats__img__logo-id" class="stats__img__logo">
                            <img src="./static/source/img/logo.png">
                            <img src="./static/source/img/icon_pokemon.png">
                        </div>
                        <div class="card__container--img flip_img"><img src="${pokemon['sprites']['other']['official-artwork']['front_default']}"></div>
                    </div>
                    <div id="stats__card__container--elements-${pokemon}" class="card__container--elements"></div>
                </div>
                <div class="about__container">
                    <div class="info__and__stats">
                        <button id="more__info--button" class="more__info--button" onclick="showGeneralInfo()">General Info</button>
                        <button id="base__stats--button" class="base__stats--button" onclick="showMainStats()">Main stats</button>
                    </div>
                    <div id="more__info--container" class="more__info--container d-none">
                        <div id="species--id-" class="species--class">Species: <b>${pokemon['species']['name']}</b></div>
                        <div id="height--id-${pokemon}" class="height--class">Height: <b>${pokemon.height}</b></div>
                        <div id="weight--id-${pokemon}" class="weight--class">Weight: <b>${pokemon.weight}</b></div>
                        <div id="abilities--id-${pokemon}" class="abilities--class">Abilities: <b>${abilities}</b></div>
                    </div>
                        <div id="base__stats--container" class="base__stats--container d-none">
                            <div class="stats_bars">
                                <div>
                                    <h3>Health Points:</h3>
                                    <div class="progress">
                                        <div class="progress-bar bg-success" role="progressbar" aria-label="Success example" style="width: ${pokemon.stats[0].base_stat * 0.75}%" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[0].base_stat} </div>
                                    </div>
                                </div>
                                <div>
                                    <h3>Attack:</h3>
                                    <div class="progress">
                                        <div class="progress-bar bg-danger" role="progressbar" aria-label="Danger example" style="width: ${pokemon.stats[1].base_stat * 0.75}%" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[1].base_stat}</div>
                                    </div>
                                </div>
                                <div>
                                    <h3>Defense:</h3>
                                        <div class="progress">
                                    <div class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: ${pokemon.stats[2].base_stat * 0.75}%" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[2].base_stat}</div>
                                    </div>
                                </div>
                                <div>
                                    <h3>Special-Attack:</h3>
                                    <div class="progress">
                                        <div class="progress-bar bg-danger" role="progressbar" aria-label="Danger example" style="width: ${pokemon.stats[3].base_stat * 0.75}%" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[3].base_stat}</div>
                                    </div>
                                </div>
                                <div>
                                    <h3>Special-Defense:</h3>
                                    <div class="progress">
                                        <div class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: ${pokemon.stats[4].base_stat * 0.75}%" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[4].base_stat}</div>
                                    </div>
                                </div>
                                <div>
                                    <h3>Speed:</h3>
                                    <div class="progress">
                                        <div class="progress-bar bg-info" role="progressbar" aria-label="Info example" style="width: ${pokemon.stats[5].base_stat * 0.75}%" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[5].base_stat}</div>
                                    </div>
                                </div>
                            </div>
                        </div>                                             
                    </div>
                                <div class="stats__buttons">
                    <button class= "" id= "" onclick= "changePokemonCard(${pokemon['id']},${previous})"><img src="./static/source/img/arrow-left-2-32.ico"></button>
                    <button class= "" id= "" onclick= "closeStats()">(close)</button>
                    <button class= "" id= "" onclick= "changePokemonCard(${pokemon['id']},${next})"><img src="./static/source/img/arrow-right-2-32.ico"></button>
                </div>
            </div>`;
}


function templateBaseStats(baseStats) {
    return ``;
}
