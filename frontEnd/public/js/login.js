document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    // Obtener los valores de los campos
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Limpiar los mensajes de error previos
    const errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach((msg) => msg.remove());

    let valid = true;

    // Validación de nombre de usuario
    if (username.trim() === "") {
      showError("loginUsername", "El nombre de usuario es obligatorio.");
      valid = false;
    }

    // Validación de contraseña
    if (password.trim() === "") {
      showError("loginPassword", "La contraseña es obligatoria.");
      valid = false;
    }

    // Si todo es válido, enviar el formulario
    if (valid) {
      fetch("/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (response.ok) {
            // Redirigir al usuario a la ruta "/salas" si el inicio de sesión es exitoso
            window.location.href = "/salas";
          } else {
            // Mostrar una alerta personalizada si hay un error
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Usuario o contraseña incorrectos",
            });
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  });

// Función para mostrar mensajes de error
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.createElement("div");
  error.classList.add("error");
  error.textContent = message;
  field.insertAdjacentElement("afterend", error);
}
