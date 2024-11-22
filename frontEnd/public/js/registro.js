console.log("Registro.js cargado correctamente");

// Función para validar el formulario de registro
document
  .getElementById("registroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    console.log("Evento de envío interceptado");

    // Obtener los valores de los campos
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    // Limpiar los mensajes de error previos
    const errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach((msg) => msg.remove());

    let valid = true;

    // Validación de nombre de usuario
    if (username.trim() === "") {
      showError("username", "El nombre de usuario es obligatorio.");
      valid = false;
    }

    // Validación de correo electrónico
    if (email.trim() === "" || !validateEmail(email)) {
      showError("email", "Por favor ingrese un correo electrónico válido.");
      valid = false;
    }

    // Validación de contraseña
    if (password.length < 8) {
      showError("password", "La contraseña debe tener al menos 8 caracteres.");
      valid = false;
    }

    // Validación de confirmación de contraseña
    if (password !== confirmPassword) {
      showError("confirmPassword", "Las contraseñas no coinciden.");
      valid = false;
    }

    // Validación de aceptación de términos
    if (!terms) {
      showError("terms", "Debes aceptar los términos y condiciones.");
      valid = false;
    }

    // Si todo es válido, enviar el formulario (backend aplicado)
    if (valid) {
      fetch("/users/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en el registro");
          }
          return response.json();
        })
        .then((data) => {
          Swal.fire({
            title: "¡Registro Exitoso!",
            text: "¡Bienvenido a CineCalidad!",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#28a745",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/login"; // Redirige al login
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema con el registro",
            icon: "error",
            confirmButtonText: "Intentar de nuevo",
          });
          console.error("Error:", error);
        });
    }

    // Función para validar correo electrónico
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  });
