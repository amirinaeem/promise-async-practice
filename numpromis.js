const numbers = [99, 89, 79, 49, 59, 1980, 1988, 1999, 2001, 200];
const favNumber = 7; // Your favorite number
const numUrl = `http://numbersapi.com/${favNumber}?json`;
const multiNumUrl = `http://numbersapi.com/${numbers.join(",")}?json`;
const cardContainer = document.getElementById("cardContainer");
const getCardBtn = document.getElementById("btn");

//Step 1: Make a request to the Numbers API to get a fact about your favorite number.

fetch(numUrl)
  .then((respoonse) => respoonse.json())
  .then((data) => {
    console.log(data.text);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//Step 2: Get data on multiple numbers in a single request.

fetch(multiNumUrl)
  .then((respoonse) => respoonse.json())
  .then((data) => {
    Object.keys(data).forEach((number) => {
      console.log(`${number}: ${data[number]}`);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//Step 3: Use the API to get 4 facts on your favorite number.

for (let i = 0; i < 4; i++) {
  const factUrl = `http://numbersapi.com/${favNumber}?json`;
  fetch(factUrl)
    .then((response) => response.json())
    .then((factData) => {
      console.log(`Fact ${i + 1}: ${factData.text}`);
    })
    .catch((error) => {
      console.error("Error:", error);
    }); // End of fetch request for each fact.
}

//Step 4: Make a request for multiple facts for each number in array of numbers;
numbers.forEach((number) => {
  for (let i = 0; i < 4; i++) {
    const factUrl = `http://numbersapi.com/${number}?json`;
    fetch(factUrl)
      .then((response) => response.json())
      .then((factData) => {
        console.log(`Fact ${i + 1}: ${factData.text}`);
        return `Fact ${i + 1}: ${factData.text}`;
      })
      .catch((error) => {
        console.error("Error:", error);
      }); // End of fetch request for each fact.
  }
});

//step 5: Make a request for 4 facts about the each number and put them on UI;
getCardBtn.addEventListener("click", () => {
  cardContainer.innerHTML = ""; // Clear previous cards.
  numbers.forEach((number) => {
    const factUrl = `http://numbersapi.com/${number}?json`;
    fetch(factUrl)
      .then((response) => response.json())
      .then((factData) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>Number: ${number}</h3> <p>${factData.text}</p>`;
        cardContainer.appendChild(card);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
