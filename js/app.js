// js/asignaturas.js

document.addEventListener("DOMContentLoaded", async () => {
    await cargarAsignaturas();

    document.getElementById("formAsignatura").addEventListener("submit", async (e) => {
        e.preventDefault();
        const modo = document.getElementById("modo").value;
        const codigo = document.getElementById("codigo").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const creditos = parseInt(document.getElementById("creditos").value);

        if (!codigo || !nombre || !creditos) return;

        const nuevaAsignatura = { codigo, nombre, creditos };

        if (modo === "crear") {
            await crearAsignatura(nuevaAsignatura);
        } else {
            await editarAsignatura(codigo, nuevaAsignatura);
        }

        document.getElementById("formAsignatura").reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById("modalAsignatura"));
        modal.hide();
        await cargarAsignaturas();
    });
});

async function cargarAsignaturas() {
    const lista = document.getElementById("asignaturas-list");
    lista.innerHTML = "";
  
    const asignaturas = await obtenerAsignaturas();
  
    asignaturas.forEach(asig => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-3";
      col.innerHTML = `
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">${asig.nombre}</h5>
            <p class="card-text">Código: ${asig.codigo}<br>Créditos: ${asig.creditos}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-sm btn-primary" onclick="abrirEditar('${asig.codigo}', '${asig.nombre}', ${asig.creditos})">✏️ Editar</button>
              <button class="btn btn-sm btn-outline-success" onclick="verMatriculados('${asig.codigo}')">👨‍🎓 Ver alumnos</button>
            </div>
          </div>
        </div>`;
      lista.appendChild(col);
    });
  }

async function mostrarAsignaturas() {
    const asignaturas = await obtenerAsignaturas();
    const contenedor = document.getElementById("contenedorAsignaturas");
    contenedor.innerHTML = ""; // Limpiar anterior
    const template = document.getElementById("templateAsignatura");
  
    asignaturas.forEach((asig) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".codigo").textContent = asig.codigo;
      clone.querySelector(".nombre").textContent = asig.nombre;
      clone.querySelector(".creditos").textContent = `Créditos: ${asig.creditos}`;
  
      clone.querySelector(".btn-editar").addEventListener("click", () => {
        abrirEditar(asig.codigo, asig.nombre, asig.creditos);
      });
  
      contenedor.appendChild(clone);
    });
  }
  
