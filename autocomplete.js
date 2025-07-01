// autocomplete.js
export async function setupAutocomplete(inputElement, onSelect) {
  const lista = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
    .then(res => res.json())
    .then(data => data.results.map(p => p.name));

  const suggestionBox = document.createElement('ul');
  suggestionBox.style.position = 'absolute';
  suggestionBox.style.background = 'white';
  suggestionBox.style.border = '1px solid #ccc';
  suggestionBox.style.maxHeight = '200px';
  suggestionBox.style.overflowY = 'auto';
  suggestionBox.style.zIndex = '1000';
  inputElement.parentNode.appendChild(suggestionBox);

  inputElement.addEventListener('input', () => {
    const texto = inputElement.value.toLowerCase();
    suggestionBox.innerHTML = '';

    if (texto.length > 0) {
      const sugerencias = lista.filter(name => name.startsWith(texto)).slice(0, 10);
      sugerencias.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        li.style.cursor = 'pointer';
        li.style.padding = '4px';
        li.addEventListener('click', () => {
          inputElement.value = name;
          suggestionBox.innerHTML = '';
          onSelect(name);
        });
        suggestionBox.appendChild(li);
      });
    }
  });
}
