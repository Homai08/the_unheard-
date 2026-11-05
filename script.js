// ========================================
// THE UNHEARD - INTERACTIVE NEWSPAPER
// ========================================


// NEWSPAPER STORIES

const stories = [

    // STORY 1

    {
        title: "Silence in the Name of Faith",

        category: "THE LEAD STORY",

        subtitle:
            "When the same words become freedom for one " +
            "and obedience for another.",

        image: "images/silence.jpeg",

        article: `
            <p>Books.</p>

            <p>A powerful tool.</p>

            <p>
                But power depends on the hands
                that hold it.
            </p>

            <p>
                When a man opens them,<br>
                he finds freedom, authority, and rights.
            </p>

            <p>
                When a woman opens the same books,<br>
                she is reminded of obedience,
                patience, and sacrifice.
            </p>

            <p>
                Same books.<br>
                Same words.<br>
                Different expectations.
            </p>

            <p>But is it really the books?</p>

            <p>
                Or the people who choose which words
                deserve to be heard?
            </p>

            <div class="final-question">
                Is it the books though or the abuse of books?
            </div>
        `
    },


    // STORY 2

    {
        title: "In the Name of Love",

        category: "RELATIONSHIPS & SOCIETY",

        subtitle:
            "When jealousy becomes affection, " +
            "control becomes protection, and abuse becomes love.",

        image: "images/butterfly.jpeg",

        article: `
            <p>Love.</p>

            <p>
                But what if it comes in the form of jealousy?
            </p>

            <p>In the form of control?</p>

            <p>
                When someone smiles at you,<br>
                it becomes an excuse for them to hurt you.
            </p>

            <p>Because it's love, isn't it?</p>

            <p>
                Dressing presentably becomes
                "wh**ing" for other men.
            </p>

            <p>
                Jealousy becomes affection.<br>
                Control becomes protection.<br>
                Abuse becomes love.
            </p>

            <p>But is it?</p>

            <p>
                Is love jealousy?<br>
                Is love control?<br>
                Is love abuse?
            </p>

            <div class="final-question">
    So, is it butterflies in the stomach, or throwing up butterflies with blood?
</div>
`
},

{
    title: "The Suffocation of Safety",

    category: "SOCIETY & FREEDOM",

    subtitle: "When protection becomes restriction.",

    image: "images/barbedwire.jpeg",

    article: `
        <p>Safety.</p>

        <p>At home, surrounded by four walls.</p>
        <p>For our safety.</p>

        <p>Going out with friends? Be careful.</p>
        <p>For our safety.</p>

        <p>Dating someone? Beware of deception and sexual abuse.</p>
        <p>For our safety.</p>

        <p>Dress appropriately. Behave according to society's expectations.</p>
        <p>For our safety.</p>

        <p>Going out at night? Stay home.</p>
        <p>For our safety.</p>

        <p>Every warning adds another wall. Every restriction tightens the barbed wire.</p>

        <p>The dangers are real. But why must our freedom be the price of protection?</p>

              <div class="final-question">
            Are these walls keeping us safe, or slowly suffocating us in the name of safety?
        </div>
    `
},

{
    title: "Rising from the Ashes",

    category: "HOPE & RESISTANCE",

    subtitle: "Even when freedom seems impossible, there is always one day.",

    image: "images/phoenix.jpeg",

    article: `
        <p>When the world zips your mouth shut, you must find a needle and unzip it, even if it leaves you bleeding.</p>

        <p>When you vomit butterflies with blood, remember that even a butterfly must survive its chrysalis before it can fly.</p>

        <p>When the barbed wire tightens around you, grip it. Feel the pricks and that red fluid pouring down your elbow. It's not weakness. <strong>It's power.</strong> And despite the pain, you still have to break through.</p>

        <p>Because freedom comes at a price, one even the world's richest person cannot afford to pay.</p>

        <p>And perhaps we won't change the world overnight.</p>

        <p>But we can make it better for those who come after us.</p>

        <div class="final-question">
            Because <strong>one day</strong>, we will rise like the mythical phoenix. Imaginary to some, yet a symbol of something that cannot be denied: our ability to rise from the ashes.
        </div>
    `
}

];


// ========================================
// PUZZLE SETTINGS
// ========================================

const gridSize = 3;
const totalPieces = gridSize * gridSize;

const correctOrder = Array.from(
    { length: totalPieces },
    (_, index) => index
);

let currentStory = 0;

let pieces = [...correctOrder];
let selectedPiece = null;
let moves = 0;
let completed = false;


// ========================================
// HTML ELEMENTS
// ========================================

const board = document.getElementById("puzzle-board");
const skipButton = document.getElementById("skip-btn");

const puzzlePreviousButton =
    document.getElementById("puzzle-previous-btn");

const puzzleNextButton =
    document.getElementById("puzzle-next-btn");

const movesText = document.getElementById("moves");

const restartButton = document.getElementById("restart-btn");

const okayButton = document.getElementById("okay-btn");

const playAgainButton = document.getElementById("play-again-btn");

const previousButton = document.getElementById("previous-btn");

const nextButton = document.getElementById("next-btn");

const puzzleSection = document.getElementById("puzzle-section");

const completionMessage = document.getElementById("completion-message");

const articleSection = document.getElementById("article-section");

const storyTitle = document.getElementById("story-title");

const storyCategory = document.getElementById("story-category");

const storySubtitle = document.getElementById("story-subtitle");

const articleTitle = document.getElementById("article-title");

const articleContent = document.getElementById("article-content");

const pageNumber = document.getElementById("page-number");


// ========================================
// LOAD A NEWSPAPER STORY
// ========================================

function loadStory(index) {

    currentStory = index;

    const story = stories[currentStory];

    // Change newspaper heading
    storyTitle.textContent = story.title;

    storyCategory.textContent = story.category;

    storySubtitle.textContent = story.subtitle;

    // Change article
    articleTitle.textContent = story.title;

    articleContent.innerHTML = story.article;

    // Update page number
    pageNumber.textContent =
        `PAGE ${currentStory + 1} OF ${stories.length}`;

    // Show or hide navigation buttons
    previousButton.classList.toggle(
        "hidden",
        currentStory === 0
    );

    nextButton.classList.toggle(
        "hidden",
        currentStory === stories.length - 1
    );
    puzzlePreviousButton.classList.toggle(
    "hidden",
    currentStory === 0
);

puzzleNextButton.classList.toggle(
    "hidden",
    currentStory === stories.length - 1
);

    // Start the puzzle for this story
    startPuzzle();

    // Scroll to top of newspaper
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// SHUFFLE PUZZLE
// ========================================

function shufflePuzzle() {

    pieces = [...correctOrder];

    for (let i = pieces.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [pieces[i], pieces[randomIndex]] =
            [pieces[randomIndex], pieces[i]];
    }

    // Don't start with a solved puzzle
    if (isPuzzleSolved()) {

        [pieces[0], pieces[1]] =
            [pieces[1], pieces[0]];
    }
}


// ========================================
// CREATE PUZZLE
// ========================================

function createPuzzle() {

    board.innerHTML = "";

    const imagePath = stories[currentStory].image;

    pieces.forEach((pieceNumber, position) => {

        const piece = document.createElement("button");

        piece.type = "button";

        piece.className = "puzzle-piece";

        const row = Math.floor(pieceNumber / gridSize);

        const col = pieceNumber % gridSize;

        const x = (col / (gridSize - 1)) * 100;

        const y = (row / (gridSize - 1)) * 100;

        // Use the current story's illustration
        piece.style.backgroundImage = `url("${imagePath}")`;

        piece.style.backgroundPosition = `${x}% ${y}%`;

        piece.setAttribute(
            "aria-label",
            `Puzzle position ${position + 1}`
        );

        piece.setAttribute("aria-pressed", "false");

        piece.addEventListener("click", () => {

            selectPiece(position);

        });

        board.appendChild(piece);
    });
}


// ========================================
// SELECT AND SWAP PIECES
// ========================================

function selectPiece(position) {

    if (completed) {
        return;
    }

    if (selectedPiece === null) {

        selectedPiece = position;

        highlightSelectedPiece();

        return;
    }

    if (selectedPiece === position) {

        selectedPiece = null;

        highlightSelectedPiece();

        return;
    }

    // Swap selected pieces
    [pieces[selectedPiece], pieces[position]] =
        [pieces[position], pieces[selectedPiece]];

    selectedPiece = null;

    moves++;

    movesText.textContent = `Moves: ${moves}`;

    createPuzzle();

    if (isPuzzleSolved()) {

        puzzleCompleted();
    }
}


// ========================================
// HIGHLIGHT SELECTED PIECE
// ========================================

function highlightSelectedPiece() {

    const buttons = board.querySelectorAll(".puzzle-piece");

    buttons.forEach((button, index) => {

        const selected = index === selectedPiece;

        button.classList.toggle("selected", selected);

        button.setAttribute(
            "aria-pressed",
            String(selected)
        );
    });
}


// ========================================
// CHECK IF PUZZLE IS SOLVED
// ========================================

function isPuzzleSolved() {

    return pieces.every((piece, index) => {

        return piece === correctOrder[index];

    });
}


// ========================================
// PUZZLE COMPLETED
// ========================================

function puzzleCompleted() {

    completed = true;

    board.querySelectorAll("button").forEach(button => {

        button.disabled = true;

    });

    restartButton.classList.add("hidden");

    completionMessage.classList.remove("hidden");

    completionMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    okayButton.focus();
}


// ========================================
// OK BUTTON - SHOW ARTICLE
// ========================================

okayButton.addEventListener("click", () => {

    puzzleSection.classList.add("hidden");

    completionMessage.classList.add("hidden");

    articleSection.classList.remove("hidden");

    articleSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// ========================================
// RESTART PUZZLE
// ========================================

restartButton.addEventListener("click", startPuzzle);

playAgainButton.addEventListener("click", startPuzzle);


// ========================================
// NEXT STORY
// ========================================

nextButton.addEventListener("click", () => {

    if (currentStory < stories.length - 1) {

        loadStory(currentStory + 1);

    }
});


// ========================================
// PREVIOUS STORY
// ========================================

previousButton.addEventListener("click", () => {

    if (currentStory > 0) {

        loadStory(currentStory - 1);

    }
});


// ========================================
// RESET PUZZLE
// ========================================

function startPuzzle() {

    moves = 0;

    selectedPiece = null;

    completed = false;

    movesText.textContent = "Moves: 0";

    puzzleSection.classList.remove("hidden");

    completionMessage.classList.add("hidden");

    articleSection.classList.add("hidden");

    restartButton.classList.remove("hidden");

    shufflePuzzle();

    createPuzzle();
}

// ========================================
// SKIP PUZZLE
// ========================================

skipButton.addEventListener("click", () => {

    puzzleSection.classList.add("hidden");

    completionMessage.classList.add("hidden");

    articleSection.classList.remove("hidden");

    articleSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// ========================================
// NEXT STORY WITHOUT SOLVING PUZZLE
// ========================================

puzzleNextButton.addEventListener("click", () => {

    if (currentStory < stories.length - 1) {
        loadStory(currentStory + 1);
    }

});


// ========================================
// PREVIOUS STORY WITHOUT SOLVING PUZZLE
// ========================================

puzzlePreviousButton.addEventListener("click", () => {

    if (currentStory > 0) {
        loadStory(currentStory - 1);
    }

});
// ========================================
// START WEBSITE
// ========================================

loadStory(0);