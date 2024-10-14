const baseURL = "https://deckofcardsapi.com/api/deck";
const getCardBtn = document.getElementById("btn");
const cardContainer = document.getElementById("cardContainer");
const btnSuffle = document.getElementById("btn-shuffle");
let deckId = "";

// make request a single card from a newly shuffled deck;
function getSingleCard() {
  fetch(`${baseURL}/new/shuffle/?deck_count=1`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      return fetch(`${baseURL}/${deckId}/draw/?count=1`);
    })
    .then((response) => response.json())
    .then((cardData) => {
      const card = cardData.cards[0];
      const cardValue = card.value.toLowerCase();
      const cardSuit = card.suit.toLowerCase();
      console.log(`Single Card: ${cardValue} of ${cardSuit}`);
    })
    .catch((error) => console.error("Error:", error));
}

//getSingleCard();

//rquest one more card from the same deck;

function getOneMoreCard() {
  fetch(`${baseURL}/new/shuffle/?deck_count=1`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      return fetch(`${baseURL}/${deckId}/draw/?count=1`);
    })
    .then((response) => response.json())
    .then((cardData) => {
      const card = cardData.cards[0];
      const cardValue = card.value.toLowerCase();
      const cardSuit = card.suit.toLowerCase();
      console.log(`First Card: ${cardValue} of ${cardSuit}`);

      const deckId = cardData.deck_id;
      return fetch(`${baseURL}/${deckId}/draw/?count=1`);
    })
    .then((response) => response.json())
    .then((oneMore) => {
      const card = oneMore.cards[0];
      const cardValue = card.value.toLowerCase();
      const cardSuit = card.suit.toLowerCase();
      console.log(`One More Card: ${cardValue} of ${cardSuit}`);
    })
    .catch((error) => console.error("Error:", error));
}

//getOneMoreCard ()

//getting all of the cards and displaying them on the UI;

function getAndDisplayAllCards() {
  fetch(`${baseURL}/new/shuffle/?deck_count=1`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      return fetch(`${baseURL}/${deckId}/draw/?count=52`);
    })
    .then((response) => response.json())
    .then((allCards) => {
      allCards.cards.forEach((card) => {
        const imgSrc = card.image;
        const cardImg = document.createElement("div");
        cardImg.classList.add("card");
        cardImg.innerHTML = `<img src="${imgSrc}">`;
        cardContainer.appendChild(cardImg);
      });
    })
    .catch((error) => console.error("Error:", error));
}

getCardBtn.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  getAndDisplayAllCards();
});
