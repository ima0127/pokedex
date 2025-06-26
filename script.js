const inputSearch = document.getElementById("search");
const btn = document.getElementById("btn");
const img = document.getElementById("img");
const pokeName = document.getElementById("name");
const pokeType = document.getElementById("type");
const pokeAbilities = document.getElementById("abilities");
const pokestadistics = document.getElementById("stadistics");
const pokeEvolution = document.getElementById("evolution");
const pokeMove = document.getElementById("movement");
// Función asincrónica para obtener datos de la API
async function getData(id) {

    try {
        // Hacemos una petición GET a la API usando fetch
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        // Verificamos si la respuesta fue exitosa (status 200–299)
        if (!respuesta.ok) {
            throw new Error('Error al obtener los usuarios. Código: ' + respuesta.status);
        }

        // Convertimos la respuesta en formato JSON
        const pokeData = await respuesta.json();

        // Mostramos los datos obtenidos en la consola
        console.log("Lista de fotos obtenidos desde la API:");
        console.log(pokeData);

        img.src = pokeData.sprites.front_default;

        pokeName.textContent = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);;

        pokeType.textContent = "Type(s): " + pokeData.types.map(t => t.type.name).join(", ");

        pokeAbilities.textContent = "Abilities: " + pokeData.abilities.map(a => a.ability.name).join(", ");
        
        pokeMove.textContent = "Moves: " + pokeData.moves
            .slice(0, 5)
            .map(m => m.move.name)
            .join(", ");

        pokestadistics.innerHTML = "Stadistics:<br>" + pokeData.stats
            .map(s => `🟢 ${s.stat.name}: ${s.base_stat}`)
            .join("<br>");


        

    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra en el proceso
        console.error("Ocurrió un error al hacer la petición:", error);
        alert("Sorry, be sure to spell the pokemon name or id correctly")
    }
}

btn.addEventListener("click", function () {
    let find = inputSearch.value.trim().toLowerCase();
    if (find) {
        getData(find);
    } else {
        alert("Please try to write an id or name of Pokemon");
    }
});