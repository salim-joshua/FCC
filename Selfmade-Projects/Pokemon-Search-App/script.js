const pokemonListLink = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pWeight = document.getElementById("weight");
const pHeight = document.getElementById("height");
const pImgContainer = document.getElementById("pokemon-img-container");
const pTypesContainer = document.getElementById("types");
const pHealth = document.getElementById("hp");
const pAttack = document.getElementById("attack");
const pDefense = document.getElementById("defense");
const pSpecialAttack = document.getElementById("special-attack");
const pSpecialDefense = document.getElementById("special-defense");
const pSpeed = document.getElementById("speed");

let selectedPokemon;

// TO DO : ADD CARD-CLEAR BEFORE FETCHING NEW POKEMON
// IMPLEMENT GENDER SYMBOL MATCHING: e.g. ♀ converts to -> f

const fetchPokemon = async (nameOrId) => {
  try {
    const res = await fetch(`${pokemonListLink}${nameOrId}`);
    const data = await res.json();
    displayPokemon(data);
  } catch (err) {
    console.error(err);
    alert("Pokemon not found!");
  }
}

const formatInput = (str) => {
  const specialCharsRegex = /[^a-zA-Z0-9\s\-]+/g;
  const spaceToDashRegex = /[\s]+/g;
  const cleanString = str.replace(specialCharsRegex, "");
  return cleanString.replace(spaceToDashRegex, "-").toLowerCase()
}

const findBaseStat = (stat, arr) => {
  return arr.find(statObj => statObj.stat.name === stat)?.base_stat;
}

const displayPokemon = (data) => {
  const {
    name,
    id,
    height,
    weight,
    sprites,
    stats,
    types
  } = data;
  const pokemonImg = sprites.front_default;

  pokemonName.textContent = name;
  pokemonId.textContent = `#${id}`;
  pHeight.textContent = `Height: ${height}`;
  pWeight.textContent = `Weight: ${weight}`;
  pImgContainer.innerHTML = `<img id="sprite" src="${pokemonImg}">`;

  pTypesContainer.innerHTML = types.map((typeObj) => {
    const type = typeObj.type.name;
    return `<span class="type ${type}">${type}</span>`;
  });

  pHealth.textContent = findBaseStat("hp", stats);
  pAttack.textContent = findBaseStat("attack", stats);
  pDefense.textContent = findBaseStat("defense", stats);
  pSpecialAttack.textContent = findBaseStat("special-attack", stats);
  pSpecialDefense.textContent = findBaseStat("special-defense", stats);
  pSpeed.textContent = findBaseStat("speed", stats);
}


searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = formatInput(searchInput.value);
  fetchPokemon(input);
})