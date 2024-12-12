// Obtén el cuerpo de la tabla
const reservasTableBody = document.querySelector("#reservasTable tbody");

// Función para obtener las reservas del backend
async function fetchReservas() {
  try {
    const response = await fetch("/movies/reservas");
    const data = await response.json();

    if (data.success) {
      const reservas = data.data;

      // Vacía la tabla antes de llenarla
      reservasTableBody.innerHTML = "";

      // Itera sobre las reservas y agrégalas a la tabla
      reservas.forEach((reserva) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${reserva.nombrePelicula}</td>
          <td>${reserva.fecha}</td>
          <td>${reserva.hora}</td>
          <td>${reserva.asientos.join(", ")}</td>
        `;
        reservasTableBody.appendChild(row);
      });
    } else {
      console.error("No se pudieron obtener las reservas.");
    }
  } catch (error) {
    console.error("Error al obtener reservas:", error);
  }
}

// Llama a la función para cargar las reservas al cargar la página
fetchReservas();
