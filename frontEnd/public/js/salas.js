const asientos = document.querySelectorAll(".asiento");
const totalElement = document.getElementById("total");
const reservarBtn = document.getElementById("reservar-btn");
let totalSeleccionado = 0;

// Obtén la fecha y la hora seleccionadas
const fechaInput = document.getElementById("date");
const horaInput = document.getElementById("time");
const nombrePelicula = "Kimetsu No Yaiba"; //Esto es dinámico

// Maneja la selección de los asientos
asientos.forEach((asiento) => {
  asiento.addEventListener("click", () => {
    if (asiento.classList.contains("ocupado")) {
      alert("Este asiento ya está ocupado.");
      return;
    }

    asiento.classList.toggle("selected");
    if (asiento.classList.contains("selected")) {
      totalSeleccionado += 13000;
    } else {
      totalSeleccionado -= 13000;
    }
    totalElement.textContent = totalSeleccionado + "";
  });
});

// Maneja la acción de reservar asientos
reservarBtn.addEventListener("click", () => {
  const asientosSeleccionados = document.querySelectorAll(".asiento.selected");

  if (asientosSeleccionados.length > 0) {
    const fechaSeleccionada = fechaInput.value;
    const horaSeleccionada = horaInput.value;

    // Si la fecha y la hora están vacías, muestra un mensaje de alerta
    if (!fechaSeleccionada || !horaSeleccionada) {
      alert("Por favor, selecciona una fecha y una hora.");
      return;
    }

    // Crea un objeto con los datos de la reserva
    const reserva = {
      nombrePelicula,
      fecha: fechaSeleccionada,
      hora: horaSeleccionada,
      asientos: Array.from(asientosSeleccionados).map((asiento) => asiento.id), // Los asientos seleccionados
    };

    // Enviar la reserva al servidor
    fetch("movies/reservar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserva),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Muestra el mensaje de éxito
          const mensajeReserva = document.createElement("div");
          mensajeReserva.textContent = `Reserva exitosa. Has reservado ${asientosSeleccionados.length} asientos.`;
          mensajeReserva.classList.add("mensaje-reserva");
          document.body.appendChild(mensajeReserva);

          // Limpiar la selección después de unos segundos
          setTimeout(() => {
            document.body.removeChild(mensajeReserva);
            asientosSeleccionados.forEach((asiento) => {
              asiento.classList.remove("selected");
            });
            totalSeleccionado = 0;
            totalElement.textContent = "0";
          }, 3000);
        } else {
          alert("Error al realizar la reserva.");
        }
      })
      .catch((error) => {
        alert("Hubo un problema al guardar la reserva.");
        console.error(error);
      });
  } else {
    alert("Por favor, selecciona al menos un asiento.");
  }
});
