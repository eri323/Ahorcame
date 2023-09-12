<template>
  <div class="bodyFrutas">
    <div class="containerJugabilidad">
      <h1>Ahorcame</h1>
      <div class="ContainerImgs">
        <img class="imgerror" :src="'./src/assets/' + errorCount + '.png'" alt="Ahorcado">
      </div>
      <div>
        <h1 class="Msj">{{ mensaje }}</h1>
      </div>
    </div>
    <div class="ContainerFrutas">
      <div class="ContainerTitulo">
        <h1 class="Titulo">Frutas</h1>
      </div>
      <div class="LetrasAñadidasContainer">
        <h2 class="LetrasAñadidas">{{ mostrarPalabraOculta() }}</h2>
      </div>
      <div class="tecladoContainer">
        <button v-for="letter in Letras" :key="letter" class="Teclado" @click="clickLetra(letter)"
          :disabled="usoLetras.includes(letter) || !puedeSeleccionarLetra(letter) || juegoGanado">{{ letter }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, defineProps } from "vue";
/* import { dificultadSeleccionada } from './App.vue'; */
onMounted(() => {
  palabraSecreta.value = generarPalabraAleatoria(palabrasDisponibles);
  letrasRestantes.value = palabraSecreta.value.length;
});
const Letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const usoLetras = ref([]);


const props = defineProps({
  dificultadSelec: String,
});


let mensaje = ref("")
let errorCount = ref(0);
let palabraSecreta = ref('');
let juegoPerdido = ref(false);
let juegoGanado = ref(false);
let letrasRestantes = ref(0);

const palabrasDisponibles = [
  "PLATANO",
  "MANZANA",
  "NARANJA",
  "KIWI",
  "AGUACATE",
  "PAPAYA",
  "SANDIA",
  "UVA",
  "MORA",
  "FRESA",
  "GRANADILLA",
  "MARACUYA",
  "GUAYABA"
];



function clickLetra(letter) {
  if (!usoLetras.value.includes(letter)) {
    usoLetras.value.push(letter);
    if (palabraSecreta.value.includes(letter)) {
      if (letrasAdivinadas()) {
        juegoGanado.value = true;
      }
    } else {
      if (props.dificultadSelec === 'Facil') {
        letrasRestantes.value--;
        errorCount.value += 1;
      } else if (props.dificultadSelec === 'Medio') {
        letrasRestantes.value--;
        errorCount.value += 2;
      } else if (props.dificultadSelec === 'Dificil') {
        letrasRestantes.value--;
        errorCount.value += 3;
      }

      if (errorCount.value >= 6) {
        juegoPerdido.value = true;
        mensaje.value = "Perdiste";
        // También puedes ocultar la letra aquí si es necesario.
        // Esto debe manejarse en la vista, no en la lógica.
      }
    }
  }
}


/* console.log("Dificultad seleccionada:", dificultadSeleccionada.value); */
console.log("errorCount:", errorCount.value);


function mostrarPalabraOculta() {
  let palabraMostrada = '';
  for (const letra of palabraSecreta.value) {
    if (usoLetras.value.includes(letra)) {
      palabraMostrada += letra;
    } else {
      palabraMostrada += '_';
    }
    palabraMostrada += ' ';
  }
  return palabraMostrada.trim();
}

function letrasAdivinadas() {
  for (const letra of palabraSecreta.value) {
    if (!usoLetras.value.includes(letra)) {
      return false;
    }
  }
  return true;
}



function puedeSeleccionarLetra(letter) {
  return letrasRestantes.value > 0 && !usoLetras.value.includes(letter);
}
function generarPalabraAleatoria(palabras) {
  const randomIndex = Math.floor(Math.random() * palabras.length);
  return palabras[randomIndex].toUpperCase();
}

</script>

<style scoped>
.containerJugabilidad {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}

.imgerror {
  width: 400px;
  max-height: 300px;
  border-radius: 15px;
  border: 1px solid black;
}

.bodyFrutas {
  height: 100vh;
  display: flex;
  font-family: "Pa ver";
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.ContainerFrutas {
  background-color: rgba(255, 255, 255, 0.418);
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  justify-content: center;
}

@font-face {
  font-family: "Pa ver";
  src: url("./fonts/Anta-Regular.ttf");
}

.Teclado {
  font-family: "Pa ver";
  padding: 8px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0;
  font-size: 25px;
  color: black;
  border: none;
  font-weight: 800;
  text-align: center;
}

.Teclado:hover {
  color: white;
  background-color: black;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}

.tecladoContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 6px;
  width: 600px;
  font-size: 25px;
}

.Titulo {
  font-size: 55px;
}

.LetrasAñadidasContainer {
  display: flex;
  gap: 10px;
}

/* .LetrasAñadidas{
  display: block;
  border-bottom: 3px solid black;
  padding: 5px;
  width: 20px;
  font-size: 30px;
  text-align: center;
} */
</style>
