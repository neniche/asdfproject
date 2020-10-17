// variables de formulario
const apellidoInput = document.querySelector("#apellido");
const nombreInput = document.querySelector("#nombre");
const tipoContactoInput = document.getElementsByName("contacto");
const contacto = document.querySelectorAll('input[name="contacto"]');
const celular = document.querySelector("#celular");
const email = document.querySelector("#email");
const celularInput = document.querySelector("#celularInput");
const containerContacto = document.querySelector("#container-contacto");
const emailInput = document.querySelector("#emailInput");
const mensajeInput = document.querySelector("#mensaje");
const btnEnviar = document.querySelector("#submit");
const titulo = document.querySelector("#titulo");
const formulario = document.querySelector("#formulario");
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let nombreEsValido = false;
let apellidoEsValido = false;
let mensajeEsValido = false;

const obligatorios = {
  apellido: "",
  nombre: "",
  mensaje: "",
};

//iniciar contacto page
document.addEventListener("DOMContentLoaded", iniciarPaginaContacto);

// campos del formulario
apellidoInput.addEventListener("change", validarFormulario);
nombreInput.addEventListener("change", validarFormulario);
mensajeInput.addEventListener("change", validarFormulario);

formulario.addEventListener("submit", enviarFormulario);

if (contacto) {
  for (let i = 0; i < contacto.length; i++) {
    contacto[i].addEventListener("change", mostrarCamposContacto);
  }
}

function iniciarPaginaContacto() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

//Funcion que resetea el formulario
function resetearFormulario() {
  formulario.reset();
  iniciarPaginaContacto();
  nombreInput.classList.remove("border-green-500");
  apellidoInput.classList.remove("border-green-500");
  mensajeInput.classList.remove("border-green-500");
}

function mostrarCamposContacto(e) {
  const item = this.value; // this == the clicked radio, which launched the function
  // console.log(item);

  const contactI = document.querySelector("input.contacto");
  const contactL = document.querySelector("label.contacto");

  if (item === "email") {
    if (contactL || contactI) {
      contactL.remove();
      contactI.remove();
    }
    const emailLabel = document.createElement("label");
    emailLabel.classList.add(
      "inline-block",
      "uppercase",
      "text-white",
      "tracking-wide",
      "text-xs",
      "font-bold",
      "my-2",
      "contacto"
    );
    emailLabel.setAttribute("id", "emailLabel");
    emailLabel.textContent = "E-mail";
    const emailInput = document.createElement("input");
    emailInput.classList.add(
      "appearance-none",
      "block",
      "w-3/4",
      "bg-gray-200",
      "text-gray-700",
      "border",
      "border-gray-200",
      "rounded",
      "py-3",
      "px-4",
      "leading-tight",
      "focus:outline-none",
      "focus:bg-white",
      "focus:border-gray-500",
      "contacto"
    );
    emailInput.setAttribute("placeholder", "Escribe tu correo electronico");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("id", "emailInput");
    containerContacto.appendChild(emailLabel);
    containerContacto.appendChild(emailInput);

    emailInput.addEventListener("blur", validarFormulario);
  } else if (item === "celular") {
    if (contactL || contactI) {
      contactL.remove();
      contactI.remove();
    }
    const celularLabel = document.createElement("label");
    celularLabel.classList.add(
      "inline-block",
      "uppercase",
      "text-white",
      "tracking-wide",
      "text-xs",
      "font-bold",
      "my-2",
      "contacto"
    );
    celularLabel.textContent = "Celular";
    const celularInput = document.createElement("input");
    celularInput.classList.add(
      "appearance-none",
      "block",
      "w-3/4",
      "bg-gray-200",
      "text-gray-700",
      "border",
      "border-gray-200",
      "rounded",
      "py-3",
      "px-4",
      "leading-tight",
      "focus:outline-none",
      "focus:bg-white",
      "focus:border-gray-500",
      "contacto"
    );
    celularInput.setAttribute("placeholder", "Escribe tu numero de celular");
    celularInput.setAttribute("type", "number");
    celularInput.setAttribute("id", "celularInput");
    containerContacto.appendChild(celularLabel);
    containerContacto.appendChild(celularInput);

    celularInput.addEventListener("blur", validarFormulario);
  }
}

//validar formulario
function validarFormulario(e) {
  e.preventDefault();

  const { apellido, nombre, mensaje } = obligatorios;

  // console.log(e.target.id);
  if (e.target.id === "nombre") {
    if (e.target.value.length < 3) {
      nombreEsValido = false;
      e.target.classList.remove("border", "border-green");
      e.target.classList.add("border", "border-red-500");
      mostrarAlerta("Campo nombre debe tener mas de 2 letras", "error");
    } else {
      nombreEsValido = true;
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    }
  }

  if (e.target.id === "apellido") {
    if (e.target.value.length < 3) {
      apellidoEsValido = false;
      e.target.classList.remove("border", "border-green");
      e.target.classList.add("border", "border-red-500");
      mostrarAlerta("Campo apellido debe tener mas de 2 letras", "error");
    } else {
      apellidoEsValido = true;
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    }
  }
  // console.log(e.target.type);
  if (e.target.id === "celularInput") {
    // console.log(e.target.value.length);
    if (e.target.value.length !== 9) {
      e.target.classList.remove("border", "border-green");
      e.target.classList.add("border", "border-red-500");
      mostrarAlerta("Campo telefono debe contener 9 digitos", "error");
    } else {
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    }
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green");
      e.target.classList.add("border", "border-red-500");
      mostrarAlerta("Email no es valido", "error");
    }
  }

  if (e.target.id === "mensaje") {
    // console.log(e.target.value.length);
    if (e.target.value.length < 5) {
      mensajeEsValido = false;
      e.target.classList.remove("border", "border-green");
      e.target.classList.add("border", "border-red-500");
      mostrarAlerta("El mensaje debe contener mas de 5 letras", "error");
    } else {
      mensajeEsValido = true;
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    }
  }
  console.log(mensajeEsValido);
  console.log(apellidoEsValido);
  console.log(nombreEsValido);

  if (nombreEsValido && apellidoEsValido && mensajeEsValido) {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function enviarFormulario(e) {
  e.preventDefault();
  mostrarAlerta("Mensaje enviado Exitosamente!", "exito");
  resetearFormulario();
}

function mostrarAlerta(mensaje, tipo) {
  const existeAlerta = document.querySelector(".alerta");

  if (!existeAlerta) {
    const divMensaje = document.createElement("p");
    if (tipo === "error") {
      divMensaje.classList.add(
        "border",
        "border-red-500",
        "bg-red-500",
        "text-white",
        "p-3",
        "mt-5",
        "text-center",
        "alerta"
      );
    } else if (tipo === "exito") {
      divMensaje.classList.add(
        "border",
        "border-green-500",
        "bg-green-500",
        "text-white",
        "p-3",
        "mt-5",
        "text-center",
        "alerta"
      );
    }

    //mensaje de error
    divMensaje.textContent = mensaje;

    titulo.insertBefore(divMensaje, null);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}
