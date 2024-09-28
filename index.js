// Obtener elementos desde el DOM
const piedra = document.getElementById("piedra");
const papel = document.getElementById("papel");
const tijeras = document.getElementById("tijeras");

// Nuevos elementos para mostrar las elecciones
const eleccionJugador = document.getElementById("eleccion-jugador");
const eleccionBot = document.getElementById("eleccion-bot");
const victoriasElemento = document.getElementById("victorias");
const derrotasElemento = document.getElementById("derrotas");

// Variables de control de selección y conteo
let selecciono_Piedra = false;
let selecciono_Papel = false;
let selecciono_Tijeras = false;
let victorias = 0; // Contador de victorias
let derrotas = 0; // Contador de derrotas
let puedeJugar = true; // Controla si se puede jugar

// Reinicia el estado del juego y los colores de selección
function reiniciar() {
  selecciono_Piedra = false;
  selecciono_Papel = false;
  selecciono_Tijeras = false;
  puedeJugar = true; // Permitir presionar teclas nuevamente

  // Resetear colores
  piedra.classList.remove("seleccionado");
  papel.classList.remove("seleccionado");
  tijeras.classList.remove("seleccionado");
  piedra.classList.remove("seleccionado-bot");
  papel.classList.remove("seleccionado-bot");
  tijeras.classList.remove("seleccionado-bot");

  // Reiniciar elecciones
  eleccionJugador.innerText = "Ninguna";
  eleccionBot.innerText = "Ninguna";
}

// Muestra el resultado del juego en una alerta
function mostrarResultado(mensaje, estado, seleccionBot) {
  // Crear un nuevo div para la alerta
  const alertaDiv = document.createElement("div");
  alertaDiv.classList.add("alerta", estado); // Agregar las clases de alerta y estado
  alertaDiv.innerText = mensaje; // Establecer el mensaje de la alerta
  document.body.appendChild(alertaDiv); // Agregar la alerta al DOM

  // Suavizar la aparición de la alerta
  alertaDiv.style.opacity = "0";
  setTimeout(() => {
    alertaDiv.style.opacity = "1"; // Aumentar la opacidad para mostrarla
  }, 0); // Esperar un ciclo de renderizado

  // Eliminar la alerta después de 3 segundos
  setTimeout(() => {
    alertaDiv.style.opacity = "0"; // Bajar la opacidad antes de eliminar
    setTimeout(() => {
      alertaDiv.remove(); // Eliminar el div del DOM
      reiniciar(); // Reiniciar el juego
    }, 300); // Esperar 300ms para que la animación de desvanecimiento se complete
  }, 3000); // Mantener la alerta visible durante 3 segundos
}

// Evento de clic para cada opción
piedra.addEventListener("click", () => {
  if (puedeJugar) {
    selecciono_Piedra = true;
    juega();
  }
});

tijeras.addEventListener("click", () => {
  if (puedeJugar) {
    selecciono_Tijeras = true;
    juega();
  }
});

papel.addEventListener("click", () => {
  if (puedeJugar) {
    selecciono_Papel = true;
    juega();
  }
});

// Evento de teclas presionadas
document.addEventListener("keydown", function (event) {
  if (!puedeJugar) return; // No hacer nada si el juego no está activo

  switch (event.key) {
    case "r": // Piedra
      selecciono_Piedra = true;
      juega();
      break;
    case "p": // Papel
      selecciono_Papel = true;
      juega();
      break;
    case "t": // Tijeras
      selecciono_Tijeras = true;
      juega();
      break;
    default:
      break; // No hacer nada si no se presionó una tecla relevante
  }
});

// Función para manejar la lógica del juego
function juega() {
  puedeJugar = false; // Desactivar la posibilidad de seleccionar nuevamente

  // Actualizar la elección del jugador en el DOM
  if (selecciono_Piedra) {
    eleccionJugador.innerText = "Piedra";
    piedra.classList.add("seleccionado"); // Agregar color de selección
  }
  if (selecciono_Papel) {
    eleccionJugador.innerText = "Papel";
    papel.classList.add("seleccionado");
  }
  if (selecciono_Tijeras) {
    eleccionJugador.innerText = "Tijeras";
    tijeras.classList.add("seleccionado");
  }

  // Elección aleatoria del bot
  const opciones = ["piedra", "papel", "tijeras"];
  const seleccionBot = opciones[Math.floor(Math.random() * opciones.length)];
  eleccionBot.innerText =
    seleccionBot.charAt(0).toUpperCase() + seleccionBot.slice(1); // Capitaliza la primera letra

  // Colorear la elección del bot
  if (seleccionBot === "piedra") {
    piedra.classList.add("seleccionado-bot");
  } else if (seleccionBot === "papel") {
    papel.classList.add("seleccionado-bot");
  } else if (seleccionBot === "tijeras") {
    tijeras.classList.add("seleccionado-bot");
  }

  // Lógica del juego
  if (
    (selecciono_Piedra && seleccionBot === "tijeras") ||
    (selecciono_Papel && seleccionBot === "piedra") ||
    (selecciono_Tijeras && seleccionBot === "papel")
  ) {
    victorias++; // Incrementar contador de victorias
    mostrarResultado("¡Haz ganado!", "alerta-victoria", seleccionBot);
  } else if (
    (selecciono_Piedra && seleccionBot === "papel") ||
    (selecciono_Papel && seleccionBot === "tijeras") ||
    (selecciono_Tijeras && seleccionBot === "piedra")
  ) {
    derrotas++; // Incrementar contador de derrotas
    mostrarResultado("¡Haz perdido!", "alerta-derrota", seleccionBot);
  } else {
    mostrarResultado("¡Es un empate!", "alerta-empate", seleccionBot);
  }

  // Actualizar el conteo de victorias y derrotas en el DOM
  victoriasElemento.innerText = victorias;
  derrotasElemento.innerText = derrotas;
}
