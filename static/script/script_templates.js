// Template for each Pokemon Card
function templateCardDiv(pokemon) {
    const backgroundColor = colors[pokemon.types[0].type.name];
    // Generate HTML elements for each type

    const typeElements = pokemon.types.map(type => {
        const typeColor = colors[type.type.name];
        return `<span class="pokemon-type" style="background-color: ${typeColor};">${type.type.name}</span>`;
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
function templateCardStatDiv(data) {
    return `<div id="stats__show--id-${data}" class ="stats__show" onclick="stopPropagation(event)">
                <div class="stats__info card__container--info">
                    <h2 id="stats__info__name-${data}">Name</h2>
                    <h2 id="stats__info__id-${data}"></h2>
                </div>
                <div class="stats__img__type">
                    <div class="card__container--stats_img stats__img-container">
                        <div id="stats__img-1--img-${data}" class="card__container--img"></div>
                        <div id="stats__img__logo-id" class="stats__img__logo">
                            <img src="./img/logo.png">
                            <img src="./img/icon_pokemon.png">
                        </div>
                        <div id="stats__img-2--img-${data}" class="card__container--img flip_img"></div>
                    </div>
                    <div id="stats__card__container--elements-${data}" class="card__container--elements"></div>
                </div>
                <div class="about__container">
                    <div class="info__and__stats">
                        <button id="more__info--button" class="more__info--button" onclick="showMoreInfo(${data})">More info</button>
                        <button id="base__stats--button" class="base__stats--button" onclick="showBaseStats(${data})">Base stats</button>
                    </div>
                    <div>
                        <div id="more__info--container" class="more__info--container d-none">
                            <div id="species--id-${data}" class="species--class"></div>
                            <div id="height--id-${data}" class="height--class"></div>
                            <div id="weight--id-${data}" class="weight--class"></div>
                            <div id="abilities--id-${data}" class="abilities--class"></div>
                        </div>
                            <div id="base__stats--container" class="base__stats--container"></div>                                             
                        </div>
                    </div>
                <div class="stats__buttons">
                    <button class= "" id= "" onclick= "goPrevious(${data})"><img src="./img/arrow-left-2-32.ico"></button>
                    <button class= "" id= "" onclick= "closeStats()">(close)</button>
                    <button class= "" id= "" onclick= "goNext(${data})"><img src="./img/arrow-right-2-32.ico"></button>
                </div>
            </div>`;
}


function templateBaseStats(baseStats) {
    return `<div class="stats_bars">
                <h3>Health Points:</h3>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" aria-label="Success example" style="width: ${(baseStats['HP']) * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['HP']} </div>
                </div>
                <h3>Attack:</h3>
                <div class="progress">
                    <div class="progress-bar bg-danger" role="progressbar" aria-label="Danger example" style="width: ${baseStats['Attack'] * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['Attack']}</div>
                </div>
                <h3>Defense:</h3>
                    <div class="progress">
                <div class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: ${baseStats['Defense'] * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['Defense']}</div>
                </div>
                <h3>Special-Attack:</h3>
                <div class="progress">
                    <div class="progress-bar bg-danger" role="progressbar" aria-label="Danger example" style="width: ${baseStats['Special-Attack'] * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['Special-Attack']}</div>
                </div>
                <h3>Special-Defense:</h3>
                <div class="progress">
                    <div class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: ${baseStats['Special-Defense'] * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['Special-Defense']}</div>
                </div>
                <h3>Speed:</h3>
                <div class="progress">
                    <div class="progress-bar bg-info" role="progressbar" aria-label="Info example" style="width: ${baseStats['Speed'] * 0.75}%" aria-valuemin="0" aria-valuemax="100">${baseStats['Speed']}</div>
                </div>
            </div>`;
}
