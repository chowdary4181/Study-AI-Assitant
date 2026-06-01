let currentQuestion = 0;

let tabSwitchCount = 0;
let examStarted = false;
let lastViolationTime = 0;

const MAX_VIOLATIONS = 3;

let timeLeft = 1800; // 30 minutes

const questions =
document.querySelectorAll(".question");

/* ---------------- TIMER ---------------- */

function startTimer(){

    const timer =
    setInterval(() => {

        if(!examStarted){

            clearInterval(timer);
            return;
        }

        const minutes =
        Math.floor(timeLeft / 60);

        const seconds =
        timeLeft % 60;

        document.getElementById(
        "timer"
        ).innerText =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

        timeLeft--;

        if(timeLeft < 0){

            clearInterval(timer);

            alert(
            "Time is over. Exam submitted."
            );

            autoSubmitExam();
        }

    },1000);
}

/* ---------------- START EXAM ---------------- */

function startExam(){

    examStarted = true;

    document.getElementById(
    "startBtn"
    ).style.display = "none";

    document.getElementById(
    "examContent"
    ).style.display = "block";

    document.documentElement
    .requestFullscreen()
    .catch(()=>{});

    updateViolationCounter();

    startTimer();

    showQuestion(0);
}

/* ---------------- QUESTIONS ---------------- */

function showQuestion(index){

    questions.forEach(q => {

        q.style.display = "none";
    });

    if(questions[index]){

        questions[index].style.display =
        "block";
    }
}

function nextQuestion(){

    if(
        currentQuestion <
        questions.length - 1
    ){

        currentQuestion++;

        showQuestion(
        currentQuestion
        );
    }
    else{

        document.getElementById(
        "questionContainer"
        ).style.display = "none";

        const coding =
        document.getElementById(
        "codingSection"
        );

        if(coding){

            coding.style.display =
            "block";
        }
    }
}

function prevQuestion(){

    if(currentQuestion > 0){

        currentQuestion--;

        showQuestion(
        currentQuestion
        );
    }
}

/* ---------------- VIOLATIONS ---------------- */

function updateViolationCounter(){

    const counter =
    document.getElementById(
    "violationCounter"
    );

    if(counter){

        counter.innerText =
        `Violations: ${tabSwitchCount}/${MAX_VIOLATIONS}`;
    }
}

function registerViolation(reason){

    if(!examStarted) return;

    const now = Date.now();

    if(
        now - lastViolationTime < 2000
    ){
        return;
    }

    lastViolationTime = now;

    tabSwitchCount++;

    updateViolationCounter();

    alert(
        reason +
        "\n\nViolation " +
        tabSwitchCount +
        "/" +
        MAX_VIOLATIONS
    );

    if(
        tabSwitchCount >=
        MAX_VIOLATIONS
    ){

        alert(
        "Maximum violations exceeded."
        );

        autoSubmitExam();
    }
}

/* ---------------- SUBMIT ---------------- */

function autoSubmitExam(){

    examStarted = false;

    const form =
    document.getElementById(
    "examForm"
    );

    if(form){

        form.submit();
    }
}

/* ---------------- TAB SWITCH ---------------- */

document.addEventListener(
"visibilitychange",
() => {

    if(!examStarted) return;

    if(document.hidden){

        registerViolation(
        "Tab switching detected."
        );
    }
});

/* ---------------- WINDOW BLUR ---------------- */

window.addEventListener(
"blur",
() => {

    if(!examStarted) return;

    registerViolation(
    "Window focus lost."
    );
});

/* ---------------- FULLSCREEN ---------------- */

document.addEventListener(
"fullscreenchange",
() => {

    if(!examStarted) return;

    if(
        !document.fullscreenElement
    ){

        registerViolation(
        "Fullscreen exited."
        );

        setTimeout(() => {

            document.documentElement
            .requestFullscreen()
            .catch(()=>{});

        },500);
    }
});

/* ---------------- RIGHT CLICK ---------------- */

document.addEventListener(
"contextmenu",
e => {

    if(!examStarted) return;

    e.preventDefault();
});

/* ---------------- COPY PASTE ---------------- */

["copy","paste","cut"]
.forEach(eventName => {

    document.addEventListener(
    eventName,
    e => {

        if(!examStarted) return;

        e.preventDefault();

        registerViolation(
        eventName +
        " blocked."
        );
    });
});

/* ---------------- SHORTCUTS ---------------- */

document.addEventListener(
"keydown",
e => {

    if(!examStarted) return;

    const key =
    e.key.toUpperCase();

    if(

        key === "F12" ||

        (
            e.ctrlKey &&
            e.shiftKey &&
            ["I","J","C"]
            .includes(key)
        ) ||

        (
            e.ctrlKey &&
            key === "U"
        )

    ){

        e.preventDefault();

        registerViolation(
        "Restricted shortcut."
        );
    }
});