console.log("SBA_308A");

document.getElementById('searchButton').addEventListener('click', async () => {
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const pokemonResultContainer = document.getElementById('pokemonResultContainer');
    
    // Clear Past Results
    pokemonResultContainer.innerHTML = '';
  
    if (!pokemonInput) {
      alert('Enter your desired Pokémon by Name or ID');
      return;
    }
    //Fetching Pokemon by ID or Name
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      
      const pokemon = await response.json();
      //Pokemon Data
      const pokemonData = `
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Height:</strong> ${pokemon.height}</p>
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        <p><strong>Type:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      `;
      
      //Error Handling
      pokemonResultContainer.innerHTML = pokemonData;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      alert('Unable to fetch Pokémon data. Try again.');
    }
  });
  