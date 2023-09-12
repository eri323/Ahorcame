<template>
    <div class="bodyAnimales">
      <div>
        <h1>Ahorcame</h1>
      </div>
      <div class="containerAnimales">
        <div class="ContainerTituloAnimales">
          <h1 class="TituloAnimales">Animales</h1>
        </div>
        <div class="LetrasAñadidad">
          <h5>Aqui va la palabra</h5>
        </div>
        <div class="tecladoContainerAnimal">
          <h4 v-for="(letras, i) in Letras" :key="i" class="TecladoAnimales">
            {{ letras.letra }}
          </h4>
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
const Letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const usoLetras = ref([]);

const dificultadSelec = defineProps({
  dificultadSelec: String
})


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
        juegoGanado = true;
      }
    } else {


      // Ajusta errorCount según la dificultad seleccionada
      /*   if (dificultadSelec.value === 'Facil')  */
      letrasRestantes.value--;
      errorCount.value += 2;
      /*  else if (dificultadSelec.value === 'Medio') {
        letrasRestantes.value--;
        errorCount.value += 2; // Por ejemplo, aumenta en 2 en dificultad difícil
      } else if (dificultadSelec.value === 'Dificil') {
        letrasRestantes.value--;
        errorCount.value += 3; // Por ejemplo, aumenta en 2 en dificultad difícil
      } */

      // Llama a la función para mostrar la imagen de error.
      if (errorCount.value >= 6) {
        juegoPerdido.value = true;
        mensaje.value = "Perdiste"
      }
    }
  }
}
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
  .bodyAnimales {
    height: 100vh;
    display: flex;
    font-family: "Pa ver";
    justify-content: space-around;
    align-items: center;
  }
  .containerAnimales {
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
  .TecladoAnimales {
    padding: 8px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 0;
  }
  .TecladoAnimales:hover {
    color: white;
    background-color: black;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
  }
  .tecladoContainerAnimal {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 6px;
    width: 600px;
    font-size: 25px;
  }
  .TituloAnimales{
      font-size: 55px;
  }
  </style>
  