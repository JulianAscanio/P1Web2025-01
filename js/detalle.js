import { obtenerAsignatura, obtenerAlumnosDeAsignatura, agregarAlumnoAAsignatura } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const codigo = params.get("codigo");
  if (!codigo) {
    alert("Código no encontrado");
    location.href = "index.html";
    return;
  }

  const asignatura = await obtenerAsignatura(codigo);
  document.getElementById("tituloAsignatura").textContent = `${asignatura.nombre}`;
  document.getElementById("infoAsignatura").textContent = `Código: ${asignatura.codigo} | Créditos: ${asignatura.creditos}`;

  await cargarAlumnos(codigo);

  document.getElementById("formAgregarAlumno").addEventListener("submit", async (e) => {
    e.preventDefault();
    const codAlumno = document.getElementById("codigoAlumno").value.trim();
    const nomAlumno = document.getElementById("nombreAlumno").value.trim();

    const alumnosActuales = await obtenerAlumnosDeAsignatura(codigo);
    if (alumnosActuales.length >= 3) {
      alert("Máximo 3 alumnos por asignatura");
      return;
    }

    if (alumnosActuales.find(a => a.codigo_alumno === codAlumno)) {
      alert("El alumno ya está inscrito");
      return;
    }

    await agregarAlumnoAAsignatura(codigo, codAlumno, nomAlumno);
    alert("Alumno agregado");
    e.target.reset();
    bootstrap.Modal.getInstance(document.getElementById("modalAgregarAlumno")).hide();
    await cargarAlumnos(codigo);
  });
});

async function cargarAlumnos(codigo) {
  const lista = document.getElementById("listaAlumnos");
  lista.innerHTML = "";
  const alumnos = await obtenerAlumnosDeAsignatura(codigo);
  if (alumnos.length === 0) {
    lista.innerHTML = `<li class="list-group-item text-muted">No hay alumnos inscritos</li>`;
    return;
  }

  alumnos.forEach(al => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${al.nombre_alumno} (${al.codigo_alumno})`;
    lista.appendChild(li);
  });
}
