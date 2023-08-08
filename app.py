from flask import Flask, render_template, request
from helpers import get_pokemon_info

app = Flask(__name__)

colors = {'normal': "#BBBBAD",
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
          'fairy': "#FBACFF"}


@app.route("/", methods=["GET", "POST"])
def hello_world():
    if request.method == 'POST':
        pokemon_id = request.form.get('pokemon_id')
        pokemon = get_pokemon_info(pokemon_id, 'all')
        return render_template('card.html', pokemon=pokemon, colors_list=colors)
    else:
        numberOfPokemons = 5
        list = []
        for i in range(1, numberOfPokemons):
            pokemon = get_pokemon_info(i, 'preview')
            list.append(pokemon)

        print(list)
        return render_template('main.html', pokemon_list=list, colors_list=colors)


if __name__ == "__main__":
    app.run(debug=True)
