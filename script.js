import { setupAutocomplete } from './autocomplete.js';
import { showPopup } from './popup.js';

const inputSearch = document.getElementById("search");
const form = document.getElementById("searchForm");
const img = document.getElementById("img");
const pokeName = document.getElementById("name");
const pokeType = document.getElementById("type");
const pokeAbilities = document.getElementById("abilities");
const pokestadistics = document.getElementById("stadistics");
const pokeEvolution = document.getElementById("evolution");
const pokeMove = document.getElementById("movement");

async function getData(id) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!respuesta.ok) {
      throw new Error('Error al obtener el Pokémon. Código: ' + respuesta.status);
    }

    const pokeData = await respuesta.json();

    img.src = pokeData.sprites.front_default;
    pokeName.textContent = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
    pokeType.textContent = "Type(s): " + pokeData.types.map(t => t.type.name).join(", ");
    pokeAbilities.textContent = "Abilities: " + pokeData.abilities.map(a => a.ability.name).join(", ");
    pokeMove.textContent = "Moves: " + pokeData.moves.slice(0, 5).map(m => m.move.name).join(", ");
    pokestadistics.innerHTML = "Stadistics:<br>" + pokeData.stats.map(s => `🟢 ${s.stat.name}: ${s.base_stat}`).join("<br>");

    const resSpecies = await fetch(pokeData.species.url);
    const speciesData = await resSpecies.json();

    const resEvol = await fetch(speciesData.evolution_chain.url);
    const evoData = await resEvol.json();

    let evoluciones = [];
    let actual = evoData.chain;

    while (actual) {
      evoluciones.push(actual.species.name);
      actual = actual.evolves_to[0];
    }

    pokeEvolution.textContent = "Evolutions: " + evoluciones.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(" → ");

  } catch (error) {
    console.error("Error al hacer la petición:", error);
    showPopup("Enter a Pokémon name or ID.");
    pokeName.textContent = "?";
    pokeType.textContent = "Type(s): ?";
    pokeAbilities.textContent = "Abilities: ?";
    pokeMove.textContent = "Moves: ?";
    pokestadistics.innerHTML = "Stadistics: ?";
    pokeEvolution.textContent = "Evolutions: ?";
    img.src = "interrogacion.webp";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let find = inputSearch.value.trim().toLowerCase();
  if (find) {
    getData(find);
  } else {
    showPopup("Please, enter a Pokémon name or ID..");
    inputSearch.focus();
  }
});

setupAutocomplete(inputSearch, (pokemonSeleccionado) => {
  getData(pokemonSeleccionado);
});
