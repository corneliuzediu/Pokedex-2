from flask import Flask, render_template
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


@app.route("/")
def hello_world():
    numberOfPokemons = 3
    list = []
    for i in range(1, numberOfPokemons):
        pokemon = get_pokemon_info(i)
        list.append(pokemon)
        print(pokemon)

    return render_template('main.html', pokemon_list=list, colors_list=colors)


if __name__ == "__main__":
    app.run(debug=True)
