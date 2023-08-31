<template>
  <div class="body">
    <div class="inicio">
      <div class="encabezado">
        <h1 class="title">Bienvenido</h1>
        <p class="TextInicio">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum velit odit quo, debitis expedita explicabo
          ullam dolor ad earum voluptatem sit eligendi inventore aperiam molestiae reiciendis incidunt vel ducimus.
          Voluptate.</p>
      </div>
      <div class="jugar">
        <button class="BotonJugar type1" @click="ShowCard">
          <span class="btn-txt">Jugar</span>
        </button>
        <div id="ContainerDificultad" :class="{ 'visible': isCardVisible }">
          <h3>Elige la dificultad </h3>
          <div class="BotonesDificultad">
            <button class="BotonFacil" id="Botones" @click="ShowCardCategoria">{{ DificultadFacil }}</button>
            <button class="BotonMedio" id="Botones" @click="ShowCardCategoria">{{ DificultadMedio }}</button>
            <button class="BotonDificil" id="Botones" @click="ShowCardCategoria">{{ DificultadDificil }}</button>
          </div>
        </div>
        <div id="ContainerCategoria" :class="{ 'visibleCategoria': isCardVisibleCategoria }">
          <h3>Elige la categoria en la que desees jugar</h3>
          <div class="BotonesCategoria">
            <button id="BtnFrutas" class="BtnCategoria">
              <span class="spanbtn">Frutas</span>
            </button>
            <button id="BtnAnimales" class="BtnCategoria">
              <span class="spanbtn">Animales</span>
            </button>
            <button id="BtnPaises" class="BtnCategoria"><span class="spanbtn">Paises</span></button>
            <button id="BtnCompas" class="BtnCategoria"><span class="spanbtn">Compas del SENA</span></button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script setup>

import { ref } from 'vue';

let isCardVisible = ref(false)

let isCardVisibleCategoria = ref(false)

let DificultadFacil = ref("Facil")

let DificultadMedio = ref("Medio")

let DificultadDificil = ref("Dificil")

function ShowCard() {
  isCardVisible.value = true;
}

function ShowCardCategoria() {
  isCardVisibleCategoria.value = true;
}


</script>

<style scoped>

.body{
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 55px;
  
}
.TextInicio{
  font-size: 20px;
}
* {
  font-family: "Pa ver";
}

@font-face {
  font-family: "Pa ver";
  src: url("./fonts/Anta-Regular.ttf");
}

.inicio {
  font-family: "Pa ver";
  background-color: rgba(255, 255, 255, 0.418);
  padding: 20PX;
  border-radius: 15PX;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.encabezado {
  color: rgb(0, 0, 0);
  font-weight: 900;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.jugar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.BotonJugar {
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  height: 50px;
  width: 100px;
  position: relative;
  background-color: white;
  cursor: pointer;
  border: 2px solid #252525;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.type1::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.5s ease-in-out;
  background-color: #333;
  border-radius: 30px;
  visibility: hidden;
  height: 10px;
  width: 10px;
  z-index: -1;
}

.BotonJugar:hover {
  background-color: black;
  color: white;
  box-shadow: 1px 1px 200px #252525;
  color: #fff;
  border: none;
  font-size: 17px;
}

#ContainerDificultad {
  display: flex;
  flex-direction: column;
  display: none;
  align-items: center;
}

.type1:hover::after {
  visibility: visible;
  transform: scale(100) translateX(2px);
}

#ContainerDificultad.visible {
  display: flex;
}

.BotonesDificultad {
  display: flex;
  gap: 10px;
}

#Botones {
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  font-size: 17px;
  height: 50px;
  width: 100px;
}

#Botones:hover {
  background-color: black;
  color: white;
  transition: all 0.5s ease-in-out;
}

#ContainerCategoria {

  flex-direction: column;
  display: flex;
  display: none;
  justify-content: center;
  align-items: center;
}

.BotonesCategoria {
  display: flex;
  justify-content: center;
  gap: 10px;
}

#ContainerCategoria.visibleCategoria {
  display: flex;
}

.BtnCategoria {
  padding: 10px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: inline-block;
  color: #000000;
  text-align: center;
  font-size: 17px;
  width: 130px;
  transition: all 0.5s;
  height: 50px;
  width: 100px;
}

.spanbtn {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.spanbtn:after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -15px;
  transition: 0.5s;
}


.BtnCategoria:hover .spanbtn {
  padding-right: 15px;
}

.BtnCategoria:hover .spanbtn:after {
  opacity: 1;
  right: 0;
}

.BtnCategoria:hover {
  background-color: black;
  color: white;
}

.btn-txt {
  z-index: 1;
  font-size: 17px;
}

#BtnCompas {
  display: flex;
  align-items: center;
}
</style>