
const base = "https://pokeapi.co/api/v2/pokemon/";
//const ids = Array.from({length: 9}, (_, i) => i + 1); // 1..9 + pokemon psiquicos
const primeros = Array.from({length: 9},(_,i)=> i+1);
const especiales =[150,151,249]; //  incorpora  pokemones psiquicos

const ids =[...primeros,...especiales];

let data = []; //Guarda los pokemones

async function obtenerPokemon(id) {
  const res = await fetch(`${base}${id}`);
  if (!res.ok) throw new Error("Error de red");
  return res.json();
}

async function cargarPokedex() {
  try {
    mostrarCargando(true);
     data = await Promise.all(ids.map(obtenerPokemon));
    renderCards(data);
  } catch (e) {
    mostrarError("No fue posible obtener datos de la PokeAPI. Intenta nuevamente.");
  } finally {
    mostrarCargando(false);
  }
}

let coloresTipos = {fire: "#EE8130",water: "#6390F0", grass: "#7AC74C",poison: "#A33EA1",
  flying: "#A98FF3",psychic: "#F95587", bug: "#A6B91A", rock: "#B6A136",};


function renderCards(lista) {
  const grid = document.querySelector(".cards");
  grid.innerHTML = "";
  for (const p of lista) {
    const nombre = p.name;
    const id = `#${String(p.id).padStart(3, "0")}`;
    const sprite = p.sprites?.other?.["official-artwork"]?.front_default || p.sprites?.front_default;
    const tipos = p.types.map(t => t.type.name);

    grid.insertAdjacentHTML("beforeend", `
      <div  class="col-12 col-sm-6 col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${sprite}" class="card-img-top p-4" alt="${nombre}">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="card-title text-capitalize mb-0">${nombre}</h5>
              <span class="text-muted">${id}</span>
            </div>
            <div>
              ${tipos.map(t => `<span class="badge text-uppercase me-2" 
                style="background-color:${coloresTipos[t]}; color:white">${t}</span>`).join("")}
            </div>
            <div class="d-flex justify-content-center mt-3">
                 <button class="pokeBtn" type="button" data-id="${p.id}"></button>
            </div>
          </div>
        </div>
      </div>
    `);
  }
}

//agrega evento escucha al btn
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("pokeBtn")) {
    const id = parseInt(e.target.dataset.id);
    const p = data.find(pkm => pkm.id === id);
    modal(p);
  }
});

//abre el modal al clic en la pokebola
async function modal(p) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${p.id}/`);
  const species = await res.json();

  // Buscamos la descripción en español
  const flavorEntry = species.flavor_text_entries.find(f => f.language.name === "es");
  const flavor = flavorEntry ? flavorEntry.flavor_text.replace(/\n|\f/g, " ") : "Sin descripción en español";
  const tipos = p.types.map(t => t.type.name); 
  
  document.getElementById("pokeModalTitle").textContent = p.name.toUpperCase();
  document.getElementById("pokeModalID").innerHTML = `<strong>#${String(p.id).padStart(3, "0")}</strong>`;
 
  document.getElementById("pokeModalBody").innerHTML = `
    <img  id="imgModal" src="${p.sprites?.other?.["official-artwork"]?.front_default}" class="img-fluid mb-3" alt="${p.name}">
    <div class="modalCard">
       <div class="atribute">
        ${tipos.map(t => `<span class="badge text-uppercase me-2 " 
        style="background-color:${coloresTipos[t]}; color:white">${t}</span>`).join("")}      
       </div>
       <div class="moreInfo">
         <p><strong>Altura:</strong> ${p.height / 10} m</p>
         <p><strong>Peso:</strong> ${p.weight / 10} kg</p>
       </div>
       <div class="info">
          <p><strong>Descripción:</strong> ${flavor}</p>
       </div>
    </div>
       `;
   
  const modal = new bootstrap.Modal(document.getElementById('pokeModal'));
  modal.show();
}

function mostrarCargando(on){ document.getElementById("loader").hidden = !on; }
function mostrarError(msg){
  const a = document.getElementById("alert");
  a.textContent = msg; a.hidden = false;
}

document.addEventListener("DOMContentLoaded", cargarPokedex);

// funcion buscar
function buscarPokemon(nombre){
  const texto = nombre.trim();
  return data.filter(pokemon => pokemon.name === texto);

}

document.getElementById(`pokeFind`).addEventListener("input", (e) => {
  const nombre = e.target.value;
  if (!nombre) return;

  const pkm = buscarPokemon(nombre);
  if (pkm) modal(pkm); /*abre el modal con los detalles*/
});