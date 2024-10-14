const favNumber = 5;
const numbers = [1, 2, 3, 4, 5];
const numUrl = `http://numbersapi.com/${favNumber}?json`;
const multiNumUrl = `http://numbersapi.com/${numbers.join(",")}?json`;
const cardContainer = document.getElementById("cardContainer");
const getCardBtn = document.getElementById("btn");

// Step 1:  get a fact about your favorite number.
async function getOneFactNumber() {
  try {
    const response = await fetch(numUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.text);
  } catch (e) {
    console.error("Error:", e);
  }
}

//getOneFactNumber();

// Step 2:  get facts about multiple numbers in a single request.

async function getMultiFactNumber() {
  try {
    const response = await fetch(multiNumUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    Object.keys(data).forEach((number) => {
      console.log(`${number}: ${data[number]}`);
    });
  } catch (e) {
    console.error("Error:", e);
  }
}

//getMultiFactNumber()

// Step 3:  Use the API to get 4 facts on your favorite number;

async function getFourFactsNumber() {
  try {
    const response = await fetch(numUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    for (let i = 0; i < 4; i++) {
      const factUrl = `http://numbersapi.com/${favNumber}?json`;
      const factResponse = await fetch(factUrl);
      if (!factResponse.ok) {
        throw new Error(`HTTP error! status: ${factResponse.status}`);
      }
      const factData = await factResponse.json();
      console.log(factData.text);

      // Step 4: put the results on the UI;
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<p>${factData.text}</p>`;
      cardContainer.appendChild(card);
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

//getFourFactsNumber();

// Step 4: put the results on the UI;
getCardBtn.addEventListener("click", () => {
  getFourFactsNumber();
});
