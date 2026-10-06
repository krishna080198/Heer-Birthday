/* ==========================================================
   FOR MY HEER
   Birthday Website Behaviour
   ----------------------------------------------------------
   All personal content is loaded from config.js (CFG)
   ========================================================== */


/* ==========================================================
   1. HELPER FUNCTIONS
   ========================================================== */

const $ = (selector) => document.querySelector(selector);

const createElement = (tag, html, className = "") => {
    const element = document.createElement(tag);
    element.innerHTML = html;

    if (className) {
        element.className = className;
    }

    return element;
};


/* ==========================================================
   2. BASIC SETUP
   ========================================================== */

const photos = CFG.photos;

$("#hp").src = photos[3];


/* ==========================================================
   3. NAVIGATION
   ========================================================== */

const navigationItems = [
    ["Home", "home"],
    ["Our Story", "story"],
    ["18 Years", "years"],
    ["Memories", "memories"],
    ["Things I Love", "love"],
    ["For Your Bad Days", "bad"],
    ["Open When", "open-when"],
    ["Birthday Letter", "letter"],
    ["Music", "music"],
    ["My Wishes", "wishes"],
    ["Future You", "future"],
    ["Final Surprise", "final"]
];

$("#menu").innerHTML = navigationItems
    .map(([title, section]) => `<a href="#${section}">${title}</a>`)
    .join("");

$("#mb").onclick = () => {
    $("#menu").classList.toggle("on");
};

$("#menu").onclick = () => {
    $("#menu").classList.remove("on");
};


/* ==========================================================
   4. INTRO SCREEN
   ========================================================== */

$("#open").onclick = () => {
    $("#intro").classList.add("off");
    startPetals();
};


/* ==========================================================
   5. PHOTO GALLERY
   ========================================================== */

photos.forEach((photo, index) => {

    const caption = CFG.captions[index] || "";

    const photoCard = createElement(
        "figure",
        `
            <img
                loading="lazy"
                src="${photo}"
                alt="Khushboo"
            >

            <span>${caption}</span>
        `,
        "pol"
    );

    const rotation =
        (index % 2 ? 1 : -1) * (1 + (index % 3));

    photoCard.style.setProperty(
        "--r",
        `${rotation}deg`
    );

    photoCard.onclick = () => {

        $("#li").src = photo;
        $("#lb").classList.add("on");

        for (let i = 0; i < 8; i++) {
            createHeart(
                innerWidth * Math.random(),
                innerHeight * 0.8
            );
        }
    };

    $("#gal").append(photoCard);
});


$("#lb").onclick = () => {
    $("#lb").classList.remove("on");
};


/* ==========================================================
   6. OUR STORY TIMELINE
   ========================================================== */

CFG.timeline.forEach((item) => {

    const timelineCard = createElement(
        "div",
        `
            <h3>${item[0]}</h3>

            <p class="hand">
                ${item[1]}
            </p>

            <p>
                ${item[2]}
            </p>
        `,
        "card"
    );

    $("#tl").append(timelineCard);
});


/* ==========================================================
   7. 18 YEARS SECTION
   ========================================================== */

let currentChapter = 0;

const showChapter = () => {

    const photo =
        photos[currentChapter % photos.length];

    const title =
        CFG.chapterTitles?.[currentChapter] ||
        `Chapter ${currentChapter + 1}`;

    const note =
        CFG.chNotes?.[currentChapter] ||
        "";

    $("#bk").innerHTML = `
        <img
            src="${photo}"
            alt="A beautiful memory"
        >

        <div>
            <h3>${title}</h3>

            <p class="hand">
                ${note}
            </p>
        </div>
    `;

    $("#ct").textContent =
        `${String(currentChapter + 1).padStart(2, "0")} / 18`;
};


const changeChapter = (direction) => {

    currentChapter =
        (currentChapter + direction + 18) % 18;

    showChapter();
};


$("#pv").onclick = () => {
    changeChapter(-1);
};

$("#nx").onclick = () => {
    changeChapter(1);
};

showChapter();


/* ==========================================================
   8. KEYBOARD NAVIGATION
   ========================================================== */

addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft") {
        changeChapter(-1);
    }

    if (event.key === "ArrowRight") {
        changeChapter(1);
    }

    checkSecretCode(event.key);
});


/* ==========================================================
   9. MOBILE SWIPE
   ========================================================== */

let touchStartX = 0;

$("#bk").ontouchstart = (event) => {
    touchStartX = event.touches[0].clientX;
};

$("#bk").ontouchend = (event) => {

    const touchEndX =
        event.changedTouches[0].clientX;

    const difference =
        touchEndX - touchStartX;

    if (Math.abs(difference) > 50) {

        changeChapter(
            difference < 0 ? 1 : -1
        );
    }
};


/* ==========================================================
   10. THINGS I LOVE ABOUT YOU
   ========================================================== */

CFG.love.forEach((item) => {

    const loveCard = createElement(
        "div",
        `
            <h3>${item[0]}</h3>

            <p class="hand" hidden>
                ${item[1]}
            </p>

            <p style="color: var(--soft)">
                Tap to open ♡
            </p>
        `,
        "card rev"
    );

    loveCard.onclick = () => {

        const message =
            loveCard.querySelector(".hand");

        message.hidden = false;

        const hint =
            loveCard.querySelector(
                "p:last-child"
            );

        if (hint) {
            hint.remove();
        }
    };

    $("#lv").append(loveCard);
});


/* ==========================================================
   11. MEMORY JAR
   ========================================================== */

$("#jar").onclick = () => {

    const randomIndex =
        Math.floor(
            Math.random() * CFG.memories.length
        );

    $("#note").textContent =
        CFG.memories[randomIndex];

    createHeart(
        innerWidth / 2,
        innerHeight / 2
    );
};


/* ==========================================================
   12. OPEN WHEN...
   ========================================================== */

CFG.openWhen.forEach((item) => {

    const envelopeButton = createElement(
        "button",
        `💌 ${item[0]}`,
        "g env"
    );

    envelopeButton.onclick = () => {

        $("#mt").innerHTML = `
            <p>${item[1]}</p>
        `;

        $("#md").classList.add("on");
    };

    $("#ow").append(envelopeButton);
});


$("#mc").onclick = () => {
    $("#md").classList.remove("on");
};


/* ==========================================================
   13. FOR YOUR BAD DAYS
   ========================================================== */

$("#badtxt").innerHTML = CFG.bad
    .map((message) => `<p>${message}</p>`)
    .join("");


/* ==========================================================
   14. BIRTHDAY LETTER
   ========================================================== */

$("#lt").innerHTML = CFG.letter
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");


/* ==========================================================
   15. GENERIC CARD SECTIONS
   ========================================================== */

const createCards = (selector, items) => {

    items.forEach((item) => {

        const card = createElement(
            "div",
            item,
            "card hand"
        );

        $(selector).append(card);
    });
};


createCards("#pf", CFG.perfect);
createCards("#ws", CFG.wishes);
createCards("#pm", CFG.promises);


/* ==========================================================
   16. QUESTIONS & ANSWERS
   ========================================================== */

CFG.qa.forEach((item) => {

    const questionCard = createElement(
        "div",
        `
            <h3>${item[0]}</h3>

            <p class="hand" hidden>
                ${item[1]}
            </p>
        `,
        "card rev"
    );

    questionCard.onclick = () => {

        const answer =
            questionCard.querySelector(".hand");

        answer.hidden = false;
    };

    $("#qa").append(questionCard);
});


/* ==========================================================
   17. FUTURE YOU
   ========================================================== */

$("#fu").innerHTML = `
    <p
        class="hand"
        style="font-size: 1.5rem"
    >
        ${CFG.future}
    </p>
`;


/* ==========================================================
   18. MUSIC PLAYER
   ========================================================== */

const audio = new Audio();

let currentSong = 0;


const loadSong = () => {

    const song = CFG.songs[currentSong];

    $("#sn").textContent = song.t;
    $("#sa").textContent = song.a;
    $("#sq").textContent = song.q;

    audio.src = song.src || "";

    $("#sh").textContent = song.src
        ? ""
        : "Add your own legal audio file in CFG.songs[].src";

    $("#vn").classList.remove("spin");

    $("#pp").textContent = "▶";
};


const toggleMusic = () => {

    const song = CFG.songs[currentSong];

    if (!song || !song.src) {
        return;
    }

    if (audio.paused) {

        audio.play().catch(() => {});

        $("#vn").classList.add("spin");
        $("#pp").textContent = "❚❚";

    } else {

        audio.pause();

        $("#vn").classList.remove("spin");
        $("#pp").textContent = "▶";
    }
};


$("#pp").onclick = toggleMusic;


$("#sn2").onclick = () => {

    currentSong =
        (currentSong + 1) % CFG.songs.length;

    loadSong();
};


$("#sp").onclick = () => {

    currentSong =
        (currentSong - 1 + CFG.songs.length) %
        CFG.songs.length;

    loadSong();
};


audio.ontimeupdate = () => {

    $("#pr").value = audio.duration
        ? (audio.currentTime / audio.duration) * 100
        : 0;
};


$("#pr").oninput = (event) => {

    if (!audio.duration) {
        return;
    }

    audio.currentTime =
        audio.duration *
        Number(event.target.value) / 100;
};


$("#vo").oninput = (event) => {
    audio.volume = Number(event.target.value);
};


loadSong();


/* ==========================================================
   19. MUSIC EXPERIENCE
   ========================================================== */

$("#mgo").onclick = async () => {

    $("#mgo").remove();

    const messages = [
        "Close your eyes for a second.",
        "And just listen.",
        ...CFG.songs.map((song) => song.q)
    ];

    for (const message of messages) {

        $("#mm").style.opacity = "0";

        await new Promise((resolve) => {
            setTimeout(resolve, 900);
        });

        $("#mm").textContent = message;

        $("#mm").style.transition =
            "opacity 1.2s";

        $("#mm").style.opacity = "1";

        await new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });
    }

    $("#mm").textContent =
        "Happy birthday, Heer ♡";
};


/* ==========================================================
   20. BIRTHDAY COUNTDOWN
   ========================================================== */

const updateCountdown = () => {

    const now = new Date();

    const [month, day] =
        CFG.birthday
            .split("-")
            .map(Number);

    let birthday = new Date(
        now.getFullYear(),
        month - 1,
        day
    );


    if (
        now.toDateString() ===
        birthday.toDateString()
    ) {

        $("#cd").textContent =
            "TODAY IS YOUR DAY ♡";

        return;
    }


    if (birthday < now) {

        birthday = new Date(
            now.getFullYear() + 1,
            month - 1,
            day
        );
    }


    const secondsLeft =
        Math.floor(
            (birthday - now) / 1000
        );


    const days =
        Math.floor(secondsLeft / 86400);

    const hours =
        Math.floor(secondsLeft / 3600) % 24;

    const minutes =
        Math.floor(secondsLeft / 60) % 60;

    const seconds =
        secondsLeft % 60;


    $("#cd").innerHTML = `
        <div>
            ${days}
            <small>Days</small>
        </div>

        <div>
            ${hours}
            <small>Hours</small>
        </div>

        <div>
            ${minutes}
            <small>Minutes</small>
        </div>

        <div>
            ${seconds}
            <small>Seconds</small>
        </div>
    `;
};


updateCountdown();

setInterval(updateCountdown, 1000);


/* ==========================================================
   21. FINAL SURPRISE
   ========================================================== */

$("#last").onclick = async () => {

    const finaleScreen = $("#fin");

    finaleScreen.classList.add("on");

    for (const message of CFG.finale) {

        $("#ft").style.opacity = "0";

        await new Promise((resolve) => {
            setTimeout(resolve, 900);
        });

        $("#ft").textContent = message;

        $("#ft").style.transition =
            "opacity 1.2s";

        $("#ft").style.opacity = "1";

        await new Promise((resolve) => {
            setTimeout(resolve, 2600);
        });
    }

    finaleScreen.onclick = () => {
        finaleScreen.classList.remove("on");
    };
};


/* ==========================================================
   22. FLOATING HEARTS
   ========================================================== */

function createHeart(x, y) {

    const heart = createElement(
        "div",
        "♡",
        "h"
    );

    heart.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        color: #e98aa3;
        font-size: ${16 + Math.random() * 14}px;
    `;

    document.body.append(heart);

    setTimeout(() => {
        heart.remove();
    }, 1400);
}


/* ==========================================================
   23. MOUSE HEARTS
   ========================================================== */

let lastMouseHeart = 0;

addEventListener("mousemove", (event) => {

    if (Date.now() - lastMouseHeart > 180) {

        lastMouseHeart = Date.now();

        createHeart(
            event.clientX,
            event.clientY
        );
    }
});


/* ==========================================================
   24. DOUBLE CLICK HEART BURST
   ========================================================== */

addEventListener("dblclick", (event) => {

    for (let i = 0; i < 5; i++) {

        createHeart(
            event.clientX + i * 8,
            event.clientY
        );
    }
});


/* ==========================================================
   25. FALLING PETALS
   ========================================================== */

let petalsStarted = false;

function startPetals() {

    // Prevent multiple intervals
    if (petalsStarted) {
        return;
    }

    petalsStarted = true;

    setInterval(() => {

        const petal = createElement(
            "div",
            "❀",
            "pt"
        );

        petal.style.left =
            `${Math.random() * 100}vw`;

        petal.style.fontSize =
            `${10 + Math.random() * 10}px`;

        petal.style.animationDuration =
            `${9 + Math.random() * 7}s`;

        document.body.append(petal);

        setTimeout(() => {
            petal.remove();
        }, 16000);

    }, 1400);
}


/* ==========================================================
   26. SECRET MODAL
   ========================================================== */

$("#sec").onclick = () => {

    $("#mt").innerHTML = `
        <p>
            Okay, you found my little secret.
            I love how curious you are. ♡
        </p>
    `;

    $("#md").classList.add("on");
};


/* ==========================================================
   27. SECRET KEYBOARD CODE
   ----------------------------------------------------------
   Type: H E E R
   ========================================================== */

let keyboardSequence = [];

const secretCode = [
    "h",
    "e",
    "e",
    "r"
];


function checkSecretCode(key) {

    if (!key || key.length !== 1) {
        return;
    }

    keyboardSequence.push(
        key.toLowerCase()
    );

    keyboardSequence =
        keyboardSequence.slice(-4);


    if (
        keyboardSequence.join("") ===
        secretCode.join("")
    ) {

        $("#mt").innerHTML = `
            <p>
                Fine. One more surprise. ♡
            </p>

            <img
                src="${photos[11]}"
                style="
                    width: 100%;
                    border-radius: 8px;
                "
                alt="One more special memory"
            >
        `;

        $("#md").classList.add("on");

        // Reset secret code
        keyboardSequence = [];
    }
}