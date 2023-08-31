<template>
  <div class="bodyFrutas">
    <div>
      <h1>Ahorcame</h1>
    </div>
    <div class="ContainerFrutas">
      <div class="ContainerTitulo">
        <h1 class="Titulo">Frutas</h1>
      </div>
      <div class="LetrasAñadidasContainer">
        <div class="LetrasAñadidas" ref="letrasAñadidas1"></div>
        <div class="LetrasAñadidas" ref="letrasAñadidas2"></div>
        <div class="LetrasAñadidas"></div>
        <div class="LetrasAñadidas"></div>
        <div class="LetrasAñadidas"></div>
      </div>
      <div class="tecladoContainer">
        <button v-for="(letras, i) in Letras" :key="i" class="Teclado" @click="selectLetter(letras.letra)">
          {{ letras.letra }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const Letras = ref([
  { letra: "A" },
  { letra: "B" },
  { letra: "C" },
  { letra: "D" },
  { letra: "E" },
  { letra: "F" },
  { letra: "G" },
  { letra: "H" },
  { letra: "I" },
  { letra: "J" },
  { letra: "K" },
  { letra: "L" },
  { letra: "M" },
  { letra: "N" },
  { letra: "Ñ" },
  { letra: "O" },
  { letra: "P" },
  { letra: "Q" },
  { letra: "R" },
  { letra: "S" },
  { letra: "T" },
  { letra: "U" },
  { letra: "V" },
  { letra: "W" },
  { letra: "X" },
  { letra: "Y" },
  { letra: "Z" },
]);

const letrasAñadidas1 = ref([]);
const letrasAñadidas2 = ref([]);

// Función para manejar la selección de letras
function selectLetter(letter) {
  letrasAñadidas1.value.push(letter);
  letrasAñadidas2.value.push(letter);
}
</script>

<style scoped>
.bodyFrutas {
  height: 100vh;
  display: flex;
  font-family: "Pa ver";
  justify-content: space-around;
  align-items: center;
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
.LetrasAñadidasContainer{
  display: flex;
  gap: 10px;
}
.LetrasAñadidas{
  display: block;
  border-bottom: 3px solid black;
  padding: 5px;
  width: 20px;
  font-size: 30px;
  text-align: center;
}
</style>
