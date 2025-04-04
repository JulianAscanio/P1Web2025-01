// js/api.js
const SUPABASE_URL = "https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
};
  
  async function obtenerAsignaturas() {
    const res = await fetch(`${SUPABASE_URL}/asignatura?select=*`, { headers });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error al obtener asignaturas:", errorText);
      return [];
    }
    return await res.json();
  }
  
  async function crearAsignatura({ codigo, nombre, creditos, descripcion }) {
    const res = await fetch(`${SUPABASE_URL}/asignatura`, {
      method: "POST",
      headers,
      body: JSON.stringify([{ codigo, nombre, creditos, descripcion }])
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error al crear asignatura:", errorText);
      throw new Error("No se pudo crear");
    }
  
    return await res.json();
  }