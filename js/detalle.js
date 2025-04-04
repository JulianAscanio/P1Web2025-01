const params = new URLSearchParams(window.location.search);
const codigoAsignatura = params.get("codigo");

document.addEventListener("DOMContentLoaded", async () => {
    const codigo = new URLSearchParams(location.search).get("codigo");
    if (!codigo) return;

    const asignatura = await api.obtenerAsignaturaPorCodigo(codigo);

    document.getElementById("tituloAsignatura").textContent = asignatura.nombre;
    document.getElementById("infoAsignatura").textContent = `Código: ${asignatura.codigo} - Créditos: ${asignatura.creditos}`;

    mostrarAlumnos(codigo);

    document.getElementById("formAgregarAlumno").addEventListener("submit", async (e) => {
        e.preventDefault();
        const codigoAlumno = document.getElementById("codigoAlumno").value.trim();
        const nombreAlumno = document.getElementById("nombreAlumno").value.trim();

        const matriculas = await api.obtenerMatriculasDeAsignatura(codigo);

        // Validar máximo 3 alumnos
        if (matriculas.length >= 3) {
            alert("Ya hay 3 alumnos matriculados en esta asignatura.");
            return;
        }

        // Validar que no esté repetido
        const yaInscrito = matriculas.find(m => m.codigo_alumno === codigoAlumno);
        if (yaInscrito) {
            alert("Este alumno ya está inscrito en esta asignatura.");
            return;
        }

        await api.crearAlumnoSiNoExiste(codigoAlumno, nombreAlumno);
        await api.matricularAlumno(codigoAlumno, codigo);

        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById("modalAgregarAlumno")).hide();
        mostrarAlumnos(codigo);
    });
});

async function mostrarAlumnos(codigo) {
    const matriculas = await api.obtenerAlumnosPorAsignatura(codigo);
    const lista = document.getElementById("listaAlumnos");
    lista.innerHTML = "";

    matriculas.forEach(({ alumno }) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <div>
                <strong>${alumno.nombre}</strong><br>
                <small class="text-muted">Código: ${alumno.codigo}</small>
            </div>
        `;
        lista.appendChild(li);
    });
    document.getElementById("totalAlumnos").textContent = `Total inscritos: ${matriculas.length}`;
}
