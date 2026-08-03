const btn = document.querySelector("#buscar");
const select = document.querySelector("#poke-tipo");
const resultado = document.querySelector(".poke-result");

const tipos = new XMLHttpRequest();

tipos.open("GET", "https://pokeapi.co/api/v2/type");
tipos.send();

tipos.onreadystatechange = function () {
    if (tipos.readyState == 4 && tipos.status == 200) {
        const dados = JSON.parse(tipos.responseText);
        select.innerHTML = '<option value="">Todos</option>';
        dados.results.forEach(tipo => {
            select.innerHTML += `
                <option value="${tipo.name}">
                    ${tipo.name}
                </option>
            `;
        });
    }
};

btn.addEventListener("click", () => {
    const nome = document.querySelector("#poke").value.toLowerCase();
    const tipo = select.value;
    if (tipo == "") {
        buscarTodos(nome);
    } else {
        buscarPorTipo(tipo, nome);
    }
});

function buscarPorTipo(tipo, nome) {
    const req = new XMLHttpRequest();
    req.open("GET", `https://pokeapi.co/api/v2/type/${tipo}`);
    req.send();

    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            const dados = JSON.parse(req.responseText);
            resultado.innerHTML = "";
            dados.pokemon.forEach(item => {
                if (nome == "" || item.pokemon.name.includes(nome)) {
                    buscarPokemon(item.pokemon.url);
                }
            });
        }
    };
}

function buscarTodos(nome) {
    const req = new XMLHttpRequest();
    req.open("GET", "https://pokeapi.co/api/v2/pokemon?limit=1302");
    req.send();

    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            const dados = JSON.parse(req.responseText);
            resultado.innerHTML = "";
            dados.results.forEach(pokemon => {
                if (nome == "" || pokemon.name.includes(nome)) {
                    buscarPokemon(pokemon.url);
                }
            });
        }
    };
}

function buscarPokemon(url) {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.send();

    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            const pokemon = JSON.parse(req.responseText);
            let tipos = "";
            pokemon.types.forEach(tipo => {
                tipos += `<li>${tipo.type.name}</li>`;
            });
            resultado.innerHTML += `
                <div class="poke">
                    <h3 class="poke-name">${pokemon.name}</h3>
                    <ul class="poke-types">
                        ${tipos}
                    </ul>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="poke-photo">
                </div>
            `;
        }
    };
}