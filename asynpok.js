const pokUrl = "https://pokeapi.co/api/v2/pokemon?limit=1000";
const cardContainer = document.getElementById("cardContainer");
const getCardBtn = document.getElementById("btn");

// Step 1: Make a request names and URLS Pokémon.
async function requestNameAndUrls() {
  try {
    const response = await fetch(pokUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const results = data.results;
    results.forEach((pokemon) => {
      const name = pokemon.name;
      const url = pokemon.url;
      console.log(name, url);
    });
  } catch {
    console.error("Error fetching data");
  }
}

//requestNameAndUrls()

// Step 2: pick three at random and make requests to their URLs;
async function requestThreeRandomUrl() {
  try {
    const response = await fetch(pokUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const results = data.results;
    let randomUrl = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * results.length);
      randomUrl.push(results[randomIndex].url);
    }
    for (let url of randomUrl) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    }
  } catch {
    console.error("Error fetching data");
  }
}

//requestThreeRandomUrl()

// Step 3: get names, descriptions of random pokomans;

async function requestThreeRandomNameAndDescription() {
  try {
    // Fetch the list of Pokémon
    const response = await fetch(pokUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const results = data.results;

    // Pick three random Pokémon URLs
    let randomUrls = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * results.length);
      randomUrls.push(results[randomIndex].url);
    }

    // Loop through each random Pokémon URL and fetch details
    for (let url of randomUrls) {
      const pokemonResponse = await fetch(url);
      if (!pokemonResponse.ok) {
        throw new Error(`HTTP error! status: ${pokemonResponse.status}`);
      }
      const pokemonData = await pokemonResponse.json();
      const pokemonName = pokemonData.name;
      const speciesUrl = pokemonData.species.url;

      // Fetch the species information for the Pokémon
      const speciesResponse = await fetch(speciesUrl);
      if (!speciesResponse.ok) {
        throw new Error(`HTTP error! status: ${speciesResponse.status}`);
      }
      const speciesData = await speciesResponse.json();

      // Find the English description of the species
      const englishEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );

      if (englishEntry) {
        const description = englishEntry.flavor_text;
        console.log(`${pokemonName}: ${description}`);
      } else {
        console.log(`${pokemonName}: No English description found.`);
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

//requestThreeRandomNameAndDescription();

// Step 4: Display the fetched Pokémon details on the UI;

async function displayNameImagePok() {
  try {
    // Fetch the list of Pokémon
    const response = await fetch(pokUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const results = data.results;

    // Pick three random Pokémon URLs
    let randomUrls = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * results.length);
      randomUrls.push(results[randomIndex].url);
    }

    // Loop through each random Pokémon URL and fetch details
    for (let url of randomUrls) {
      const pokemonResponse = await fetch(url);
      if (!pokemonResponse.ok) {
        throw new Error(`HTTP error! status: ${pokemonResponse.status}`);
      }
      const pokemonData = await pokemonResponse.json();
      const pokemonName = pokemonData.name;
      const speciesUrl = pokemonData.species.url;
      const imgSrc = pokemonData.sprites.front_default;
      let description = "";

      // Fetch the species information for the Pokémon
      const speciesResponse = await fetch(speciesUrl);
      if (!speciesResponse.ok) {
        throw new Error(`HTTP error! status: ${speciesResponse.status}`);
      }
      const speciesData = await speciesResponse.json();

      // Find the English description of the species
      const englishEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );

      if (englishEntry) {
        description = englishEntry.flavor_text;
        console.log(`${pokemonName}: ${description}`);
      } else {
        console.log(`${pokemonName}: No English description found.`);
      }

      // Display card on UI
      cardContainer.innerHTML += `<div class="card">
                <img src="${imgSrc}" alt="${pokemonName}">
                <h2>${pokemonName}</h2>
                <p>${description}</p>
            </div>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

//displayNameImagePok()

getCardBtn.addEventListener("click", () => {
  displayNameImagePok();
});
