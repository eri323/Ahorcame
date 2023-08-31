<template>
    <div class="bodyPaises">
      <div>
        <h1>Ahorcame</h1>
      </div>
      <div class="containerPaises">
        <div class="ContainerTituloPaises">
          <h1 class="TituloPaises">Paises</h1>
        </div>
        <div class="LetrasAñadidad">
          <h5>Aqui va la palabra</h5>
        </div>
        <div class="tecladoContainerPais">
          <h4 v-for="(letras, i) in Letras" :key="i" class="TecladoPaises">
            {{ letras.letra }}
          </h4>
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
  </script>
  
  <style scoped>
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
  .TecladoPaises {
    padding: 8px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 0;
  }
  .TecladoPaises:hover {
    color: white;
    background-color: black;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
  }
  .tecladoContainerPais {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 6px;
    width: 600px;
    font-size: 25px;
  }
  .TituloPaises{
      font-size: 55px;
  }
  </style>
  