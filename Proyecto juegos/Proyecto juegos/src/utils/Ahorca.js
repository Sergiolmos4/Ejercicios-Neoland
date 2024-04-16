import { palabras } from "../data/ahorcadodata"; /* Se importan las palabras que hay que adivinar en el juego */
import {
  getInfoAhorcado,
  setAciertos,
  setErrores,
  setPalabra,
} from "../global/state/ahorcadoState"; /* Se importan las funciones que nos van a permitir desarrollar el juego */

export const id = (str) => {
  return document.getElementById(str);
};

export const obtener_random = (num_min, num_max) => {
  const amplitud_valores = num_max - num_min; //valor más alto - valor más bajo del random... (7 - 0)
  const valor_al_azar =
    Math.floor(Math.random() * amplitud_valores) +
    num_min; /* 5 - 15 = 10 + 5 */
  return valor_al_azar;
};
/* Inicio del juego, la imagen se coge desde la carpeta public, dibujos */
export const iniciar = (event) => {
  const imagen = id("imagen");
  imagen.src = "dibujos/img0.png";
  const btn = id("jugar");
  btn.disabled = true;
  setErrores(0);
  setAciertos(0);

  const parrafo = id("palabra_a_adivinar");
  parrafo.innerHTML = "";

  const cant_palabras = palabras.length;
  const valor_al_azar = obtener_random(0, cant_palabras);
  setPalabra(palabras[valor_al_azar]);

  const cant_letras =
    getInfoAhorcado().palabra.length; /* Longitud de la palabra */

  const btn_letras =
    document.querySelectorAll(
      "#letras button"
    ); /* Selección botones de las letras*/
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = false;
  }

  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }
};

export const click_letras = (event) => {
  const spans = document.querySelectorAll("#palabra_a_adivinar span");
  const button = event.target;
  button.disabled = true;

  const letra = button.innerHTML.toLowerCase();
  const palabra = getInfoAhorcado().palabra.toLowerCase();
  /* Si la letra forma parte de la palabra es un acierto y se muestra en pantalla*/
  let acerto = false;
  for (let i = 0; i < palabra.length; i++) {
    if (letra == palabra[i]) {
      spans[i].innerHTML = letra;
      let aciertos = parseInt(getInfoAhorcado().cant_aciertos);
      setAciertos(aciertos + 1);
      acerto = true;
    }
  }
  /* Si hay error, la respuesta es añadir una imagen por cada error*/
  if (acerto == false) {
    let errores = parseInt(getInfoAhorcado().cant_errores);
    console.log(errores);
    setErrores(errores + 1);
    console.log("errores", getInfoAhorcado().cant_errores);
    const source = `dibujos/img${getInfoAhorcado().cant_errores}.png`;
    const imagen = document.getElementById("imagen");
    imagen.src = source;
  }
  /* Si el numero de errores llega a su maximo de 7 sale el mensaje de gameover*/
  if (getInfoAhorcado().cant_errores == 7) {
    id("resultado").innerHTML =
      "Va a ser que NO, era " + getInfoAhorcado().palabra;
    game_over();
  } else if (
    getInfoAhorcado().cant_aciertos == getInfoAhorcado().palabra.length
  ) {
    id("resultado").innerHTML = "ESO ES!! ENHORABUENA";
    game_over();
  }
  console.log(
    "la letra " + letra + " en la palabra " + palabra + " ¿existe?: " + acerto
  );
};

export const game_over = () => {
  const btn_letras = document.querySelectorAll("#letras button");
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = true;
  }
  const btn = id("comenzar");
  btn.disabled = false;
};
