const baseURL = "https://deckofcardsapi.com/api/deck";
const getCardBtn = document.getElementById("btn");
const cardContainer = document.getElementById("cardContainer");
const btnSuffle = document.getElementById("btn-shuffle");
let deckID = "";

/* --------Global Functions --------*/

// Function to make HTTP requests to get a single card from the API
function getCard(url, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url);
  httpRequest.onload = function () {
    if (httpRequest.status === 200) {
      const data = JSON.parse(httpRequest.responseText);
      callback(null, data);
    } else {
      callback(
        new Error(`Error ${httpRequest.status}: ${httpRequest.statusText}`)
      );
    }
  };
  httpRequest.onerror = function () {
    callback(new Error("Network Error"));
  };
  httpRequest.send();
}

const firstCardCall = (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const card = data.cards[0]; // Get the first card from the response
    const cardValue = card.value.toLowerCase(); // Card value (e.g., '5', 'queen')
    const cardSuit = card.suit.toLowerCase(); // Card suit (e.g., 'spades', 'diamonds')
    console.log(`First Card: ${cardValue} of ${cardSuit}`);
    displayCard(card);
    // Print the card details
    const deckID = data.deck_id;
    getCard(`${baseURL}/${deckID}/draw/`, secondCardCall);
  }
};

const secondCardCall = (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const card = data.cards[0]; // Get the first card from the response
    const cardValue = card.value.toLowerCase(); // Card value (e.g., '5', 'queen')
    const cardSuit = card.suit.toLowerCase(); // Card suit (e.g., 'spades', 'diamonds')
    console.log(`Second card: ${cardValue} of ${cardSuit}`);
    displayCard(card);
  }
};

const displayCard = (card) => {
  const cardHTML = `
      <div class="card">
        <img src="${card.image}" alt="${card.value} of ${card.suit}">
        <p>${card.value} of ${card.suit}</p>
      </div>
    `;
  cardContainer.innerHTML = cardHTML;
};

btnSuffle.addEventListener("click", () => {
  getCardBtn.disabled = false;
  getCard(`${baseURL}/new/shuffle/`, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      deckID = data.deck_id;
      console.log("New deck created. Click the button to draw a card!");
    }
  });
});

// Helper callback function for handling requests

/*-------------- Single Request ---------------*/
getCardBtn.addEventListener("click", () => {
  if (deckID) {
    getCard(`${baseURL}/${deckID}/draw/`, (err, data) => {
      if (err) {
        console.error(err);
      } else if (data.cards.length > 0) {
        const card = data.cards[0];
        displayCard(card);
        console.log(`Drew: ${card.value} of ${card.suit}`);
      } else {
        console.log("No more cards in the deck.");
        getCardBtn.disabled = true;
      }
    });
  }
});
