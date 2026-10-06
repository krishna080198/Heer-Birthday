```javascript
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

// Hero photo
$("#hp").src = photos[3];


/* ==========================================================
   3. NAVIGATION MENU
   ========================================================== */

const navigationItems = [
    ["Home", "home"],
    ["Our Story", "story"],
    ["18 Years", "years"],
    ["Memories", "memories"],
    ["Things I Love About You", "love"],
    ["For Your Bad Days", "bad"],
    ["Open When...", "open-when"],
    ["Birthday Letter", "letter"],
    ["Our Music", "music"],
    ["My Wishes For You", "wishes"],
    ["The Future You", "future"],
    ["Final Surprise", "final"]
];

$("#menu").innerHTML = navigationItems
    .map(([title, section]) => {
        return `<a href="#${section}">${title}</a>`;
    })
    .join("");

// Mobile menu
$("#mb").onclick = () => {
    $("#menu").classList.toggle("on");
};

// Close menu after clicking a link
$("#menu").onclick = () => {
    $("#menu").classList.remove("on");
};


/* ==========================================================
   4. INTRO SCREEN
   ========================================================== */

$("#open").onclick = () => {
    $("#intro").classList.add("off");

    // Start falling petals
    petals();
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

    // Give every photo a slightly different rotation
    const rotation =
        (index % 2 ? 1 : -1) * (1 + (index % 3));

    photoCard.style.setProperty("--r", `${rotation}deg`);

    // Open photo in lightbox
    photoCard.onclick = () => {

        $("#li").src = photo;
        $("#lb").classList.add("on");

        // Floating hearts
        for (let i = 0; i < 8; i++) {
            createHeart(
                innerWidth * Math.random(),
                innerHeight * 0.8
            );
        }
    };

    $("#gal").append(photoCard);
});

// Close lightbox
$("#lb").onclick = () => {
    $("#lb").classList.remove("on");
};


/* ==========================================================
   6. OUR STORY TIMELINE
   ========================================================== */

CFG.timeline.forEach(([year, title, description]) => {

    const timelineCard = createElement(
        "div",
        `
            <h3>${year}</h3>

            <p class="hand">
                ${title}
            </p>

            <p>
                ${description}
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


/**
 * Displays the current chapter.
 */
const showChapter = () => {

    const photo =
        photos[currentChapter % photos.length];

    const title =
        CFG.chapterTitles[currentChapter];

    const note =
        CFG.chNotes[currentChapter];

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


/**
 * Moves between chapters.
 */
const changeChapter = (direction) => {

    currentChapter =
        (currentChapter + direction + 18) % 18;

    showChapter();
};


// Previous chapter
$("#pv").onclick = () => {
    changeChapter(-1);
};

// Next chapter
$("#nx").onclick = () => {
    changeChapter(1);
};

// Initial chapter
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
   9. SWIPE SUPPORT FOR MOBILE
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

CFG.love.forEach(([title, message]) => {

    const loveCard = createElement(
        "div",
        `
            <h3>${title}</h3>

            <p class="hand" hidden>
                ${message}
            </p>

            <p style="color: var(--soft)">
                Tap to open ♡
            </p>
        `,
        "card rev"
    );

    loveCard.onclick = () => {

        const hiddenMessage =
            loveCard.querySelector(".hand");

        hiddenMessage.hidden = false;

        // Remove "Tap to open" text
        loveCard.lastChild.remove();
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
   12. "OPEN WHEN..." LETTERS
   ========================================================== */

CFG.openWhen.forEach(([title, message]) => {

    const envelopeButton = createElement(
        "button",
        `💌 ${title}`,
        "g env"
    );

    envelopeButton.onclick = () => {

        $("#mt").innerHTML = `
            <p>${message}</p>
        `;

        $("#md").classList.add("on");
    };

    $("#ow").append(envelopeButton);
});


// Close modal
$("#mc").onclick = () => {
    $("#md").classList.remove("on");
};


/* ==========================================================
   13. FOR YOUR BAD DAYS
   ========================================================== */

$("#badtxt").innerHTML = CFG.bad
    .map(message => `<p>${message}</p>`)
    .join("");


/* ==========================================================
   14. BIRTHDAY LETTER
   ========================================================== */

$("#lt").innerHTML = CFG.letter
    .map(paragraph => `<p>${paragraph}</p>`)
    .join("");


/* ==========================================================
   15. GENERIC CARD SECTIONS
   ========================================================== */

const createCards = (containerSelector, items) => {

    items.forEach(item => {

        const card = createElement(
            "div",
            item,
            "card hand"
        );

        $(containerSelector).append(card);
    });
};


// Perfect little things
createCards("#pf", CFG.perfect);

// Birthday wishes
createCards("#ws", CFG.wishes);

// Promises
createCards("#pm", CFG.promises);


/* ==========================================================
   16. QUESTIONS & ANSWERS
   ========================================================== */

CFG.qa.forEach(([question, answer]) => {

    const questionCard = createElement(
        "div",
        `
            <h3>${question}</h3>

            <p class="hand" hidden>
                ${answer}
            </p>
        `,
        "card rev"
    );

    questionCard.onclick = () => {

        questionCard.querySelector(
            ".hand"
        ).hidden = false;
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


/**
 * Loads the currently selected song.
 */
const loadSong = () => {

    const song = CFG.songs[currentSong];

    $("#sn").textContent = song.t;
    $("#sa").textContent = song.a;
    $("#sq").textContent = song.q;

    audio.src = song.src;

    $("#sh").textContent =
        song.src
            ? ""
            : "Add your own legal audio file in CFG.songs[].src";

    $("#vn").classList.remove("spin");

    $("#pp").textContent = "▶";
};


/**
 * Play / pause current song.
 */
const toggleMusic = () => {

    if (!CFG.songs[currentSong].src) {
        return;
    }

    if (audio.paused) {

        audio.play();

        $("#vn").classList.add("spin");
        $("#pp").textContent = "❚❚";

    } else {

        audio.pause();

        $("#vn").classList.remove("spin");
        $("#pp").textContent = "▶";
    }
};


// Play / pause
$("#pp").onclick = toggleMusic;


// Next song
$("#sn2").onclick = () => {

    currentSong =
        (currentSong + 1) % CFG.songs.length;

    loadSong();
};


// Previous song
$("#sp").onclick = () => {

    currentSong =
        (currentSong - 1 + CFG.songs.length) %
        CFG.songs.length;

    loadSong();
};


// Update progress bar
audio.ontimeupdate = () => {

    $("#pr").value = audio.duration
        ? (audio.currentTime / audio.duration) * 100
        : 0;
};


// Seek
$("#pr").oninput = (event) => {

    audio.currentTime =
        audio.duration *
        event.target.value / 100;
};


// Volume
$("#vo").oninput = (event) => {

    audio.volume = event.target.value;
};


// Load first song
loadSong();


/* ==========================================================
   19. MUSIC EXPERIENCE
   ========================================================== */

$("#mgo").onclick = async () => {

    $("#mgo").remove();

    const messages = [
        "Close your eyes for a second.",
        "And just listen.",
        ...CFG.songs.map(song => song.q)
    ];

    for (const message of messages) {

        $("#mm").style.opacity = 0;

        await new Promise(resolve =>
            setTimeout(resolve, 900)
        );

        $("#mm").textContent = message;

        $("#mm").style.transition =
            "opacity 1.2s";

        $("#mm").style.opacity = 1;

        await new Promise(resolve =>
            setTimeout(resolve, 3000)
        );
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


    // Birthday is today
    if (
        now.toDateString() ===
        birthday.toDateString()
    ) {

        $("#cd").textContent =
            "TODAY IS YOUR DAY ♡";

        return;
    }


    // If birthday has passed,
    // calculate next year's birthday
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


// Start countdown
updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* ==========================================================
   21. FINAL SURPRISE
   ========================================================== */

$("#last").onclick = async () => {

    const finaleScreen = $("#fin");

    finaleScreen.classList.add("on");


    for (const message of CFG.finale) {

        $("#ft").style.opacity = 0;

        await new Promise(resolve =>
            setTimeout(resolve, 900)
        );

        $("#ft").textContent = message;

        $("#ft").style.transition =
            "opacity 1.2s";

        $("#ft").style.opacity = 1;

        await new Promise(resolve =>
            setTimeout(resolve, 2600)
        );
    }


    // Allow clicking anywhere to close
    finaleScreen.onclick = () => {
        finaleScreen.classList.remove("on");
    };
};


/* ==========================================================
   22. FLOATING HEART EFFECT
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


    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 1400);
}


/* ==========================================================
   23. HEARTS FOLLOWING THE MOUSE
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

function petals() {

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


        // Remove old petals
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

    keyboardSequence.push(
        key.toLowerCase()
    );


    // Keep only the last 4 characters
    keyboardSequence =
        keyboardSequence.slice(-4);


    // Check if the secret code matches
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
    }
}
```