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

        contenedor.appendChild(clone);
    });
}

