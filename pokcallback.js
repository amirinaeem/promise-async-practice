const pokUrl = "https://pokeapi.co/api/v2/pokemon";
const cardContainer = document.getElementById("cardContainer");
const getCardBtn = document.getElementById("btn");
/*-------------XmlHttpRequest function--------------------*/

function getPok(url, callback) {
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

/*-------------first callback function--------------------*/

const callback = (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const results = data.results;

    let randomPokemonUrls = [];

    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * data.results.length);
      let url = results[randomIdx].url;
      randomPokemonUrls.push(url);
    }

    randomPokemonUrls.forEach((url) => {
      getPok(url, dataForEachPok);
    });
  }
};

/*-------------second callback function--------------------*/
const dataForEachPok = (err, data) => {
  let speciesUrl;
  if (err) {
    console.error(err);
  } else {
    const name = data.name;
    const imgSrc = data.sprites.front_default;
    speciesUrl = data.species.url;
    console.log(`Pokemon: ${name}`);
    getPok(speciesUrl, (err, speciesData) => {
      if (err) {
        console.error(err);
      } else {
        handleSpeciesData(speciesData, name, imgSrc);
      }
    });
  }
};

/*-------------third callback function--------------------*/
const handleSpeciesData = (data, name, imgSrc) => {
  const flavorTexts = data.flavor_text_entries;
  const englishText = flavorTexts.find((entry) => entry.language.name === "en");
  let description = englishText
    ? englishText.flavor_text
    : "No English flavor text found.";

  console.log(`${name}: ${description}`);

  // Display card on UI
  cardContainer.innerHTML += makePokeCard(name, imgSrc, description);
};

/*-------------display on Ui function--------------------*/
function makePokeCard(name, imgSrc, description) {
  return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
}

getCardBtn.addEventListener("click", () => {
  getPok(`${pokUrl}?limit=1000`, callback);
});
