document.addEventListener("DOMContentLoaded", async () => {
    await mostrarAsignaturas();

    // Agregar asignatura
    document.getElementById("formNuevaAsignatura").addEventListener("submit", async (e) => {
        e.preventDefault();

        const codigo = document.getElementById("codigo").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const creditos = parseInt(document.getElementById("creditos").value);
        const descripcion = document.getElementById("descripcion").value.trim();

        if (!codigo || !nombre || isNaN(creditos)) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        await api.crearAsignatura({ codigo, nombre, creditos, descripcion });
        alert("Asignatura agregada correctamente");

        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById("modalAgregar")).hide();

        await mostrarAsignaturas();
    });

    document.getElementById("formEditarAsignatura").addEventListener("submit", async (e) => {
        e.preventDefault();

        const codigo = document.getElementById("codigoEditar").value;
        const nombre = document.getElementById("nombreEditar").value.trim();
        const creditos = parseInt(document.getElementById("creditosEditar").value);
        const descripcion = document.getElementById("descripcionEditar").value.trim();

        if (!nombre || isNaN(creditos)) {
            alert("Por favor, completa los campos correctamente.");
            return;
        }

        try {
            await api.editarAsignatura(codigo, { nombre, creditos, descripcion });
            alert("Asignatura editada correctamente");

            bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
            await mostrarAsignaturas();
        } catch (error) {
            alert("No se pudo editar la asignatura");
        }

    });

});

async function mostrarAsignaturas() {
    const asignaturas = await api.obtenerAsignaturas();
    const contenedor = document.getElementById("contenedorAsignaturas");
    contenedor.innerHTML = "";
    const template = document.getElementById("templateAsignatura");

    asignaturas.forEach((asig) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".codigo").textContent = asig.codigo;
        clone.querySelector(".nombre").textContent = asig.nombre;
        clone.querySelector(".creditos").textContent = `Créditos: ${asig.creditos}`;
        clone.querySelector(".descripcion").textContent = asig.descripcion;

        clone.querySelector(".btn-editar").addEventListener("click", () => {
            abrirEditar(asig.codigo, asig.nombre, asig.creditos, asig.descripcion);
        });

        // Botón Ver alumnos
        const btnVerAlumnos = clone.querySelector("button.btn-outline-success");
        btnVerAlumnos.addEventListener("click", () => {
            window.location.href = `detalle.html?codigo=${asig.codigo}`;
        });

        contenedor.appendChild(clone);
    });
}

function abrirEditar(codigo, nombre, creditos, descripcion) {
    document.getElementById("codigoEditar").value = codigo;
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("creditosEditar").value = creditos;
    document.getElementById("descripcionEditar").value = descripcion;

    const modal = new bootstrap.Modal(document.getElementById("modalEditar"));
    modal.show();
}
