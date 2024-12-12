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

    // Validación de fecha y hora
    if (!fechaSeleccionada || !horaSeleccionada) {
      alert("Por favor, selecciona una fecha y una hora.");
      return;
    }

    // Crea un objeto con los datos de la reserva
    const reserva = {
      nombrePelicula,
      fecha: fechaSeleccionada,
      hora: horaSeleccionada,
      asientos: Array.from(asientosSeleccionados).map((asiento) => asiento.id),
    };

    // Muestra los detalles en el modal
    const modal = document.getElementById("reservaModal");
    const modalContent = document.getElementById("reservaDetalle");
    modalContent.innerHTML = `
      <b>Película:</b> ${reserva.nombrePelicula}<br>
      <b>Fecha:</b> ${reserva.fecha}<br>
      <b>Hora:</b> ${reserva.hora}<br>
      <b>Asientos:</b> ${reserva.asientos.join(", ")}
    `;
    modal.style.display = "block";

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
          console.log("Reserva registrada exitosamente en el servidor.");
        } else {
          alert("Error al realizar la reserva en el servidor.");
        }
      })
      .catch((error) => {
        console.error("Hubo un problema al guardar la reserva:", error);
      });
  } else {
    alert("Por favor, selecciona al menos un asiento.");
  }
});

// Cerrar el modal al hacer clic en el botón de cerrar
const closeModal = document.querySelector(".close");
closeModal.addEventListener("click", () => {
  document.getElementById("reservaModal").style.display = "none";
});
