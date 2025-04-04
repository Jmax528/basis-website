card.addEventListener("click", flipCard);
card2.addEventListener("click", flipCard2);
card3.addEventListener("click", flipCard3);
card4.addEventListener("click", flipCard4);


function flipCard() {
        let card = document.getElementById("card");
        card.classList.toggle('flipCard');
}
function flipCard2() {
        let card2 = document.getElementById("card2");
        card2.classList.toggle('flipCard2');
}
function flipCard3() {
        let card3 = document.getElementById("card3");
        card3.classList.toggle('flipCard3');
}
function flipCard4() {
        let card4 = document.getElementById("card4");
        card4.classList.toggle('flipCard4');
}