// js/api.js
const SUPABASE_URL = "https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
};

// Funciones básicas para asignaturas
async function obtenerAsignaturas() {
    const res = await fetch(`${SUPABASE_URL}/asignatura?select=*`, { headers });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error al obtener asignaturas:", errorText);
        return [];
    }

    return await res.json();
}

export async function crearAsignatura({ codigo, nombre, creditos, descripcion }) {
    const { data, error } = await supabase.from("asignaturas").insert([
      { codigo, nombre, creditos, descripcion }
    ]);
  
    if (error) {
      console.error("Error al crear asignatura:", error);
      throw error;
    }
  
    return data;
  }
  


async function obtenerAlumnosDeAsignatura(codigo_asignatura) {
    const { data, error } = await supabase
        .from("alumnos_asignatura")
        .select("*")
        .eq("codigo_asignatura", codigo_asignatura);
    if (error) throw error;
    return data;
}

async function agregarAlumnoAAsignatura(codigo_asignatura, codigo_alumno, nombre_alumno) {
    const { error } = await supabase.from("alumnos_asignatura").insert({
        codigo_asignatura,
        codigo_alumno,
        nombre_alumno
    });
    if (error) throw error;
}

