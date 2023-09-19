<template>
  <div class="bodyPaises">
    <div class="containerJugabilidad">
      <h1>Ahorcame</h1>
      <div class="ContainerImgs">
        <img
          class="imgerror"
          :src="'./src/assets/' + errorCount + '.png'"
          alt="Ahorcado"
        />
      </div>
      <div>
        <h1 class="Msj">{{ mensaje }}</h1>
      </div>
    </div>
    <div class="containerPaises">
      <div class="ContainerTituloPaises">
        <h1 class="TituloPaises">Paises</h1>
      </div>
      <div class="LetrasAñadidad">
        <h2 class="LetrasAñadidas">{{ mostrarPalabraOculta() }}</h2>
      </div>
      <div class="tecladoContainerPais">
        <button
          v-for="letter in Letras"
          :key="letter"
          class="TecladoPais"
          @click="clickLetra(letter)"
          :disabled="
            usoLetras.includes(letter) ||
            !puedeSeleccionarLetra(letter) ||
            juegoGanado
          "
        >
          {{ letter }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
onMounted(() => {
  palabraSecreta.value = generarPalabraAleatoria(palabrasDisponibles);
  letrasRestantes.value = palabraSecreta.value.length;
});
const Letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const usoLetras = ref([]);

const dificultadSelec = defineProps({
  dificultadSelec: String,
});

let mensaje = ref("");
let errorCount = ref(0);
let palabraSecreta = ref("");
let juegoPerdido = ref(false);
let juegoGanado = ref(false);
let letrasRestantes = ref(0);

const palabrasDisponibles = [
  "COLOMBIA",
  "CHILE",
  "CHINA",
  "JAPON",
  "ESPAÑA",
  "SUECIA",
  "MARRUECOS",
  "EGIPTO",
  "AUSTRALIA",
  "NUEVA ZELANDA",
  "CANADA",
  "RUSIA",
  "VENEZUELA",
  "PAISES BAJOS",
];

function clickLetra(letter) {
  if (!usoLetras.value.includes(letter)) {
    usoLetras.value.push(letter);
    if (palabraSecreta.value.includes(letter)) {
      if (letrasAdivinadas()) {
        juegoGanado = true;
      }
    } else {
      letrasRestantes.value--;
      errorCount.value += 1;
    }
    if (errorCount.value >= 5) {
      juegoPerdido.value = true;
      mensaje.value = "Perdiste";
      errorCount.value = 5;
    }
  }
}
console.log("errorCount:", errorCount.value);

function mostrarPalabraOculta() {
  let palabraMostrada = "";
  for (const letra of palabraSecreta.value) {
    if (usoLetras.value.includes(letra)) {
      palabraMostrada += letra;
    } else {
      palabraMostrada += "_";
    }
    palabraMostrada += " ";
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
.imgerror {
  width: 400px;
  max-height: 300px;
  border-radius: 15px;
  border: 1px solid black;
}
.containerJugabilidad {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}
.bodyPaises {
  height: 100vh;
  display: flex;
  font-family: "Pa ver";
  justify-content: space-around;
  align-items: center;
}
.containerPaises {
  background-color: rgba(255, 255, 255, 0.418);
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
}
@font-face {
  font-family: "Pa ver";
  src: url("./fonts/Anta-Regular.ttf");
}

.tecladoContainerPais {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 6px;
  width: 600px;
  font-size: 25px;
}
.TituloPaises {
  font-size: 55px;
}
.TecladoPais {
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

.TecladoPais:hover {
  color: white;
  background-color: black;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}
</style>
