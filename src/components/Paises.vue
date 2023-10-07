<template>
  <div class="bodyPaises">
    <div v-if="MostrarDificultad">
      <div id="ContainerDificultad">
        <h3 style="font-size: 40px; margin: 0;">Elige la dificultad</h3>
        <div class="BotonesDificultad">
          <button class="BotonFacil" id="Botones" @click="seleccionarDificultad('Facil')">
            <span class="BotonDificultadSpan">
              {{ DificultadFacil }}
              <!-- <Frutas :dificultadSelec="dificultadSeleccionada"/>  -->
            </span>
          </button>
          <button class="BotonMedio" id="Botones" @click="seleccionarDificultad('Medio')">
            <span class="BotonDificultadSpan">
              {{ DificultadMedio }}
              <!-- <Frutas :dificultadSelec="dificultadSeleccionada"/> --></span>
          </button>
          <button class="BotonDificil" id="Botones" @click="seleccionarDificultad('Dificil')">
            <span class="BotonDificultadSpan">
              {{ DificultadDificil }}
              <!-- <Frutas :dificultadSelec="dificultadSeleccionada"/> -->
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="Container1" v-if="MostrarJugabilidad">
      <div class="containerJugabilidad">
        <h1 style="text-align: center;">¡Adivina la palabra y salva a Homero!</h1>
        <div class="ContainerImgs">
          <img class="imgerror" :src="currentImg" alt="Ahorcado" />
        </div>

      </div>
      <div class="containerPaises">
        <div class="ContainerTituloPaises">
          <h1 class="TituloPaises">Paises</h1>
        </div>
        <div class="LetrasAñadidad" v-if="LA">
          <h2 class="LetrasAñadidas">{{ mostrarPalabraOculta() }}</h2>
        </div>
        <div class="tecladoContainerPais" v-if="MostrarTeclado">
          <button v-for="letter in Letras" :key="letter" class="TecladoPais" @click="clickLetra(letter)" :disabled="usoLetras.includes(letter) ||
            !puedeSeleccionarLetra(letter) ||
            juegoGanado
            ">
            {{ letter }}
          </button>
        </div>
        <div style="display: flex; flex-direction: column;
         gap: 15px; justify-content: center;">
          <h1>{{ mensaje2 }}</h1>
          <h1 class="Msj">{{ mensaje }}</h1>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import img0 from "../assets/0.jpg"
import img1 from "../assets/1.jpg"
import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"
import img4 from "../assets/4.jpg"
import img5 from "../assets/5.jpg"
import img6 from "../assets/6.jpg"
onMounted(() => {
  palabraSecreta.value = generarPalabraAleatoria(palabrasDisponibles);
  letrasRestantes.value = palabraSecreta.value.length;
});
const Letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const usoLetras = ref([]);
let MostrarDificultad = ref(true)
let MostrarJugabilidad = ref(false)
const dificultadSelec = defineProps({
  dificultadSelec: String,
});
let DificultadFacil = ref("Facil")
let currentImg = ref(img0);
let currentImg1 = ref(img1);
let currentImg2 = ref(img2);
let currentImg3 = ref(img3);
let currentImg4 = ref(img4);
let currentImg5 = ref(img5);
let currentImg6 = ref(img6);
let DificultadMedio = ref("Medio")
let MostrarTeclado = ref(true)
let DificultadDificil = ref("Dificil")
let mensaje = ref("");
let errorCount = ref(0);
let palabraSecreta = ref("");
let juegoPerdido = ref(false);
let juegoGanado = ref(false);
let letrasRestantes = ref(0);
let LA = ref(true)
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
const dificultadSeleccionada = ref('');

const dificultadError = ref(0);
const seleccionarDificultad = (dificultad) => {
  dificultadSeleccionada.value = dificultad;
  MostrarJugabilidad.value = true
  MostrarDificultad.value = false
  console.log("difi:", dificultadSeleccionada.value);
};
function clickLetra(letter) {
  if (!usoLetras.value.includes(letter)) {
    usoLetras.value.push(letter);
    if (palabraSecreta.value.includes(letter)) {
      if (letrasAdivinadas()) {
        juegoGanado.value = true;
      }
    } else if (dificultadSeleccionada.value == "Facil") {
      letrasRestantes.value--;
      errorCount.value += 1;

      if (errorCount.value <= 6) {
        currentImg.value = eval(`img${errorCount.value}`);
      }
    } else if (dificultadSeleccionada.value == "Medio") {
      letrasRestantes.value--;
      errorCount.value += 2;

      if (errorCount.value <= 6) {
        currentImg.value = eval(`img${errorCount.value}`);
      }
    } else if (dificultadSeleccionada.value == "Dificil") {
      letrasRestantes.value--;
      errorCount.value += 3;

      if (errorCount.value <= 6) {
        currentImg.value = eval(`img${errorCount.value}`);
      }
    }

    if (errorCount.value >= 6) {
      juegoPerdido.value = true;
      mensaje.value = "Perdiste";
      errorCount.value = 6;
      MostrarTeclado.value = false;
      mensaje2.value = palabraSecreta.value
      LA.value = false;
    }
  }
}
console.log("errorCount:", errorCount.value);
let mensaje2 = ref("")
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
#Botones {
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  font-size: 17px;
  height: 50px;

}

#Botones:hover {
  background-color: black;
  color: white;
  transition: all 0.5s ease-in-out;
}

.BotonDificultadSpan {
  padding: 20px 20px;
}

.imgerror {
  width: 400px;
  max-height: 300px;
  border-radius: 15px;
  border: 1px solid black;
}

.BotonesDificultad {
  display: flex;
  gap: 10px;
}

.containerJugabilidad {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.759);
  padding: 20px;
  border-radius: 15px;
  gap: 20px;
}

.Container1 {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.bodyPaises {
  padding-top: 150px;
  display: flex;
  font-family: "Pa ver";
  justify-content: space-around;
  align-items: center;
}

#ContainerDificultad {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.582);
  padding: 20px;
  border-radius: 15px;
  gap: 20px;
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

@media screen and (max-width: 640px) {
  .tecladoContainerPais {
    width: auto;
  }
}

@media screen and (max-width: 430px) {
  .imgerror {
    width: 300px;
    max-height: 200px;
  }
}
</style>
