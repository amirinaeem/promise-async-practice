const pokUrl = "https://pokeapi.co/api/v2/pokemon?limit=1000";
const cardContainer = document.getElementById("cardContainer");
const getCardBtn = document.getElementById("btn");

//get names and URLs for every pokemon in the database.
function getPokemonNamesAndUrls() {
  fetch(pokUrl)
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;
      results.forEach((pokemon) => {
        const name = pokemon.name;
        const url = pokemon.url;
        console.log(name, url);
      });
    })
    .catch((error) => console.error("Error:", error));
}

//getPokemonNamesAndUrls();

//Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs.

function getRandomThreePokemons() {
  fetch(pokUrl)
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * results.length);
        randomPokemonUrls.push(results[randomIndex].url);
      }
      randomPokemonUrls.forEach((url) => {
        fetch(url)
          .then((response) => response.json())
          .then((pokemon) => {
            console.log(pokemon);
          })
          .catch((error) => console.error("Error:", error));
      });
    })
    .catch((error) => console.error("Error:", error));
}

//getRandomThreePokemons()

//make another request, this time to that pokemon’s species URL for the random pokemon;
function getRandomThreePokemonsDescription() {
  fetch(pokUrl)
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * results.length);
        randomPokemonUrls.push(results[randomIndex].url);
      }
      randomPokemonUrls.forEach((url) => {
        fetch(url)
          .then((response) => response.json())
          .then((pokemon) => {
            const pokNames = pokemon.name.toUpperCase();
            const speciesUrl = pokemon.species.url;
            fetch(speciesUrl)
              .then((response) => response.json())
              .then((species) => {
                const description = species.flavor_text_entries.find(
                  (entry) => entry.language.name === "en"
                ).flavor_text;
                console.log(pokNames + ":", description);
              })
              .catch((error) => console.error("Error:", error));
          })
          .catch((error) => console.error("Error:", error));
      });
    })
    .catch((error) => console.error("Error:", error));
}

//getRandomThreePokemonsDescription()

// get names, images and descriptions for the random pokemons;
function getImageNameAndDescriptions() {
  fetch(pokUrl)
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * results.length);
        randomPokemonUrls.push(results[randomIndex].url);
      }
      randomPokemonUrls.forEach((url) => {
        fetch(url)
          .then((response) => response.json())
          .then((pokemon) => {
            const pokNames = pokemon.name.toUpperCase();
            const speciesUrl = pokemon.species.url;
            const imgSrc = pokemon.sprites.front_default;
            let description = "";
            fetch(speciesUrl)
              .then((response) => response.json())
              .then((species) => {
                description = species.flavor_text_entries.find(
                  (entry) => entry.language.name === "en"
                ).flavor_text;
                console.log(pokNames + ":", description);

                cardContainer.innerHTML += `
                    <div class="card">
                    <h1>${pokNames}</h1>
                    <img src=${imgSrc} />
                    <p>${description}</p>
                  </div>
                  `;
              })
              .catch((error) => console.error("Error:", error));
          })
          .catch((error) => console.error("Error:", error));
      });
    })
    .catch((error) => console.error("Error:", error));
}

getCardBtn.addEventListener("click", () => {
  getImageNameAndDescriptions();
});
