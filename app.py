from flask import Flask, render_template, request
from utils.quiz_generator import generate_quiz
from utils.planner import create_study_plan
from utils.pdf_reader import extract_text
from utils.summarizer import summarize_text
from flask import session
from utils.mocktest import generate_mock_test
from flask import jsonify, session

app = Flask(__name__)
app.secret_key = "study_ai"
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/quiz", methods=["GET", "POST"])
def quiz():

    result = ""

    if request.method == "POST":

        topic = request.form["topic"]

        result = generate_quiz(topic)

    return render_template(
        "quiz.html",
        result=result
    )

@app.route("/planner", methods=["GET", "POST"])
def planner():

    result = ""

    if request.method == "POST":

        subjects = request.form["subjects"]
        days = request.form["days"]

        result = create_study_plan(
            subjects,
            days
        )

    return render_template(
        "planner.html",
        result=result
    )


@app.route("/summary", methods=["GET","POST"])
def summary():

    result = ""

    if request.method == "POST":

        pdf_file = request.files["pdf"]

        text = extract_text(pdf_file)

        result = summarize_text(text)

    return render_template(
        "summary.html",
        result=result
    )


from flask import render_template, request

@app.route("/mocktest", methods=["GET", "POST"])
def mocktest():

    if request.method == "POST":

        topic = request.form["topic"]

        test = generate_mock_test(topic)

        session["test"] = test

        return render_template(
            "test.html",
            test=test
        )

    return render_template("mocktest.html")
if __name__ == "__main__":
    app.run(debug=True)
app = Flask(__name__)
app.secret_key = "7b4d5d5c2f2e8e5a6f0a7f5f1e2c8d9b3a4f6c7e8d9a0b1c2d3e4f5a6b7c8d9"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/violation", methods=["POST"])
def violation():

    if "violations" not in session:
        session["violations"] = 0

    session["violations"] += 1

    return jsonify({
        "violations": session["violations"],
        "terminated": session["violations"] >= 3
    })

if __name__ == "__main__":
    app.run(debug=True)