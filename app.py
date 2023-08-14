from flask import Flask, render_template, request
from helpers import get_pokemon_info

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route("/impressum", )
def impressum():
    return render_template("impressum.html")


@app.route("/disclaimer", )
def disclaimer():
    return render_template("disclaimer.html")


@app.route("/privacy_policy", )
def privacyPolicy():
    return render_template("privacy_policy.html")


if __name__ == "__main__":
    app.run(debug=True)


# @app.route("/", methods=["GET", "POST"])
# def hello_world():
#     if request.method == 'POST':
#         pokemon_id = request.form.get('pokemon_id')
#         pokemon = get_pokemon_info(pokemon_id, 'all')
#         return render_template('card.html', pokemon=pokemon, colors_list=colors)
#     else:
#         numberOfPokemons = 5
#         list = []
#         for i in range(1, numberOfPokemons):
#             pokemon = get_pokemon_info(i, 'preview')
#             list.append(pokemon)

#         print(list)
#         return render_template('main.html', pokemon_list=list, colors_list=colors)
