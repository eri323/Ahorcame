import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Frutas from "./components/Frutas.vue"
import Animales from "./components/Animales.vue"
import Paises from "./components/Paises.vue"
import Compas from "./components/CompasSena.vue"


createApp(App).mount('#app')


document.querySelector("#BtnFrutas").addEventListener("click", () => {
    createApp(Frutas).mount('#app')
});

document.querySelector("#BtnAnimales").addEventListener("click", () => {
    createApp(Animales).mount('#app')
})

document.querySelector("#BtnPaises").addEventListener("click", () => {
    createApp(Paises).mount('#app')
})


document.querySelector("#BtnCompas").addEventListener("click", () => {
    createApp(Compas).mount('#app')
})

