from flask import Flask, render_template,send_from_directory

app = Flask(__name__, static_folder='static', static_url_path='/static')


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route("/impressum")
def impressum():
    return render_template("impressum.html")


@app.route("/disclaimer")
def disclaimer():
    return render_template("disclaimer.html")



if __name__ == "__main__":
    app.run(debug=True)

