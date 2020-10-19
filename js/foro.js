//variable
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//event listeners
evenListeners();

function evenListeners() {
  // cuando el usuario agregar un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  //cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);

    crearHTML();
  });
}

//funciones
function agregarTweet(e) {
  e.preventDefault();

  //Textarea donde el usuario escribe
  const nombre = document.querySelector("#nombre").value;
  const ubicacion = document.querySelector("#ubicacion").value;
  const tweet = document.querySelector("#tweet").value;

  //validacion
  if (nombre === "" || ubicacion === "" || tweet === "") {
    mostrarError("Todos los campos son obligatorios");
    return; //evita que se ejecute mas lineas de codigo
  }

  const tweetObj = {
    id: Date.now(),
    nombre,
    ubicacion,
    tweet, //= tweet : tweet
  };

  //añadir al arreglo de tweets
  tweets = [...tweets, tweetObj];

  //una vez agregado vamos a crear el HTML
  crearHTML();
}

//Mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "bg-red-500",
    "text-white",
    "p-3",
    "mt-5",
    "text-center",
    "alerta"
  );

  //Insertarlo en el contenido
  formulario.appendChild(mensajeError);

  //Elimina la alerta despues de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

//Muestra un listado de los tweets
function crearHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //Agregar un boton de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add(
        "float-right",
        "cursor-pointer",
        "text-red-900",
        "font-bold"
      );
      btnEliminar.innerText = "X";

      //añadir la funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      //crear el HTML
      const li = document.createElement("li");
      li.classList.add("italic", "font-extrabold");
      const pa = document.createElement("p");
      pa.classList.add("font-semibold");
      //añadir el texto
      pa.innerText =
        "--- Lugar: " + tweet.nombre + "   --- Ubicación: " + tweet.ubicacion;
      li.innerText = tweet.tweet;
      li.appendChild(btnEliminar);

      //insertarlo en el html
      listaTweets.appendChild(li);
      listaTweets.appendChild(pa);
    });
  }
  sincronizarStorage();
}

//Agrega los tweets actuales
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Eliminar un tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  crearHTML();
}

//limpiar el HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
