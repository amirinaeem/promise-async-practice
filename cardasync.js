const baseURL = "https://deckofcardsapi.com/api/deck/";
const getCardBtn = document.getElementById("btn");
const cardContainer = document.getElementById("cardContainer");
const btnSuffle = document.getElementById("btn-shuffle");
let deckId = "";
let deckResponse = "";
let cardResponse = "";

//Step 1: request a single card from a newly shuffled deck;
async function requestSingleCard() {
  try {
    deckResponse = await fetch(`${baseURL}new/shuffle/?deck_count=1`);
    if (!deckResponse.ok) {
      throw new Error(`HTTP error! status: ${deckResponse.status}`);
    }
    const decData = await deckResponse.json();
    deckId = decData.deck_id;

    // Corrected URL without extra slash
    cardResponse = await fetch(`${baseURL}${deckId}/draw/?count=1`);
    if (!cardResponse.ok) {
      throw new Error(`HTTP error! status: ${cardResponse.status}`);
    }
    const cardData = await cardResponse.json();
    const card = cardData.cards[0];
    const cardValue = card.value;
    const cardSuit = card.suit.toLowerCase(); // Optional: make the suit lowercase
    console.log(`Single Card: ${cardValue} of ${cardSuit}`);
  } catch (e) {
    console.error("Error:", e.message);
  }
}

//requestSingleCard();

//Step 2: request one more card from same deck deck;

async function requestOneMoreCard() {
  try {
    // First card request
    const deckResponse = await fetch(`${baseURL}new/shuffle/?deck_count=1`);
    if (!deckResponse.ok) {
      throw new Error(`HTTP error! status: ${deckResponse.status}`);
    }
    const decData = await deckResponse.json();
    const deckId = decData.deck_id;

    const cardResponse = await fetch(`${baseURL}${deckId}/draw/?count=1`);
    if (!cardResponse.ok) {
      throw new Error(`HTTP error! status: ${cardResponse.status}`);
    }
    const cardData = await cardResponse.json();
    const card = cardData.cards[0];
    const cardValue = card.value;
    const cardSuit = card.suit.toLowerCase();
    console.log(`First Card: ${cardValue} of ${cardSuit}`);

    // Second card request
    const secondDeckResponse = await fetch(
      `${baseURL}new/shuffle/?deck_count=1`
    );
    if (!secondDeckResponse.ok) {
      throw new Error(`HTTP error! status: ${secondDeckResponse.status}`);
    }
    const secondDeckData = await secondDeckResponse.json();
    const secondDeckId = secondDeckData.deck_id;

    const secondCardResponse = await fetch(
      `${baseURL}${secondDeckId}/draw/?count=1`
    );
    if (!secondCardResponse.ok) {
      throw new Error(`HTTP error! status: ${secondCardResponse.status}`);
    }
    const secondCardData = await secondCardResponse.json();
    const secondCard = secondCardData.cards[0];
    const secondCardValue = secondCard.value;
    const secondCardSuit = secondCard.suit.toLowerCase();
    console.log(`Second Card: ${secondCardValue} of ${secondCardSuit}`);
  } catch (e) {
    console.error("Error:", e.message);
  }
}

//requestOneMoreCard();

//Step 3: display the cards on the page;
async function displayAllCards() {
  try {
    deckResponse = await fetch(`${baseURL}new/shuffle/?deck_count=1`);
    if (!deckResponse.ok) {
      throw new Error(`HTTP error! status: ${deckResponse.status}`);
    }
    const decData = await deckResponse.json();
    deckId = decData.deck_id;

    // Corrected URL without extra slash
    cardResponse = await fetch(`${baseURL}${deckId}/draw/?count=52`);
    if (!cardResponse.ok) {
      throw new Error(`HTTP error! status: ${cardResponse.status}`);
    }
    const cardData = await cardResponse.json();
    const cards = cardData.cards;
    cards.forEach((card) => {
      const imgeSrc = card.image;
      const cardImg = document.createElement("div");
      cardImg.innerHTML = `<img src="${imgeSrc}">`;
      cardContainer.appendChild(cardImg);
    });
  } catch (e) {
    console.error("Error:", e.message);
  }
}

// displayAllCards();

getCardBtn.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  displayAllCards();
});
