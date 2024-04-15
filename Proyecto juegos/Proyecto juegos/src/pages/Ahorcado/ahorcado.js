import { PrintButtonLetters } from "../../components";
import { game_over, id, iniciar } from "../../utils/Ahorca";
import "./ahorcado.css";
const template =
  () => `<img id="imagen" src="dibujos/img0.png" alt="El gran juego del Ahorcado"/>
<div>
    <p id="palabra_a_adivinar"></p>
    <button id="jugar">Comenzar</button>

    <p id="resultado"></p>

    <div id="letras"></div> 
</div>`;

const listeners = () => {
  const btn = id("jugar");
  btn.addEventListener("click", iniciar);
};

export const PrintAhorcado = () => {
  document.querySelector("main").innerHTML = template();
  PrintButtonLetters();
  listeners();
  game_over();
};
