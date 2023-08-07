from flask import Flask, render_template
from helpers import get_pokemon_info

app = Flask(__name__)


@app.route("/")
def hello_world():
    numberOfPokemons = 4
    list = []
    for i in range(1, numberOfPokemons):
        pokemon = get_pokemon_info(i)
        list.append(pokemon)

    return render_template('main.html', pokemon_list=list)


if __name__ == "__main__":
    app.run(debug=True)
