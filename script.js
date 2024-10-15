console.log("SBA_308A");

document.getElementById('searchButton').addEventListener('click', async () => {
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const pokemonContainer = document.getElementById('pokemonContainer');
    
    // Clear previous results
    pokemonContainer.innerHTML = '';
  
    if (!pokemonInput) {
      alert('Enter your desired Pokémon by Name or ID');
      return;
    }
    //Fetching inputing pokemon
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      
      const pokemon = await response.json();
      
      const pokemonData = `
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Height:</strong> ${pokemon.height}</p>
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        <p><strong>Type:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      `;
      
      pokemonContainer.innerHTML = pokemonData;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      alert('Could not fetch Pokémon data. Please try again.');
    }
  });
  