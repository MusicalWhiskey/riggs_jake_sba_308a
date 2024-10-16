console.log("SBA_308A");
document.getElementById('pokemonResultContainer').style.background = "linear-gradient(to bottom, black, darkred, white, darkblue, black)";

let style = document.createElement('style');
style.textContent = `
  .pokemon-text {
  font-family: 'Pokémon Solid', sans-serif; /* Requires the Pokémon font to be loaded */
  font-size: 75px;
  color: white;
  text-shadow: -1px -1px 0 blue, 1px -1px 0 blue, -1px 1px 0 blue, 1px 1px 0 blue;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 650px;
}

.pokemon-container {
  padding: 20px;
  margin-top: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pokémon Solid', sans-serif; /* Apply Pokémon font to the results */
}

.form-control {
  font-family: 'Pokémon Solid', sans-serif;
  font-size: 20px;
  margin-top: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e7e7e7;
  textcolor: white;
  border-color: darkblue;
}

.btn-primary {
  font-family: 'Pokémon Solid', sans-serif;
  margin-top: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: #e7e7e7;
  color: blue;
  border-color: darkblue;
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ensure input and button stretch across the full width */
}

.input-group-append {
  display: flex;
  align-items: center;
}

.pokemon-sprite {
  width: 350px; /* Adjust the width as needed */
  height: auto;
}
`;
document.head.appendChild(style);

document.getElementById('searchButton').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const pokemonResultContainer = document.getElementById('pokemonResultContainer');

    // Clear Past Results
    pokemonResultContainer.innerHTML = '';

    if (!pokemonInput) {
        alert('Enter your desired Pokémon by Name or ID.');
        return;
    }

    // Fetching Pokémon by ID or Name
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        const pokemon = await response.json();
        // Pokémon Data
        const pokemonData = `
            <h2>${pokemon.name} (#${pokemon.id})</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-sprite">
            <p><strong>Height:</strong> ${pokemon.height}</p>
            <p><strong>Weight:</strong> ${pokemon.weight}</p>
            <p><strong>Type:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        `;

        // Append the results instead of replacing the form
        pokemonResultContainer.innerHTML = pokemonData;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        alert('Unable to fetch Pokémon data. Refresh the page and try again.');
    }
});
