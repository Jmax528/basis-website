const cards = document.querySelectorAll('.gcard');

let hasFlippedCard = false;
let firstCard, secondCard;
let score;


//flips the card on click
function flipCard() {
    // if (boardLock) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');
    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        hasFlippedCard = false;
        secondCard = this;
        console.log(firstCard.dataset.heretic);
        console.log(secondCard.dataset.heretic);
        //Match?
        //If they match, disable the flip, if not flip them back
        checkForMatch();
    }

//ternary operator, an if else but with 3 blocks
//first=condition, second=execute statement, third=execute if false
//you can chain this like and if statement
function checkForMatch() {
    let match = firstCard.dataset.heretic === secondCard.dataset.heretic
match ? disableCards() : flipBack();
}
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}
function flipBack() {
    // boardLock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    },1000)
}

//(fucnction ... )(); = immediatly invoked function, shuffles the card at page reload
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;

    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));