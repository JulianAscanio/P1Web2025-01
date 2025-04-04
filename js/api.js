// js/api.js
const SUPABASE_URL = "https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts";

const api = {
    headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    },

    // Funciones básicas para asignaturas
    async obtenerAsignaturas() {
        const res = await fetch(`${SUPABASE_URL}/asignatura?select=*`, { headers: this.headers });
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error al obtener asignaturas:", errorText);
            return [];
        }
        return await res.json();
    },

    async crearAsignatura({ codigo, nombre, creditos, descripcion }) {
        const res = await fetch(`${SUPABASE_URL}/asignatura`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify([{ codigo, nombre, creditos, descripcion }])
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error al crear asignatura:", errorText);
            throw new Error("No se pudo crear");
        }

        return await res.json();
    },

    async editarAsignatura(codigo, { nombre, creditos, descripcion }) {
        const res = await fetch(`${SUPABASE_URL}/asignatura?codigo=eq.${codigo}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ nombre, creditos, descripcion })
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error al editar asignatura:", errorText);
            throw new Error("No se pudo editar");
        }

        return await res.json();
    },

    // Funciones para alumnos

    async obtenerAsignaturaPorCodigo(codigo) {
        const res = await fetch(`${SUPABASE_URL}/asignatura?codigo=eq.${codigo}`, { headers: this.headers });
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error al obtener asignatura:", errorText);
            return null;
        }
        return await res.json();
    },

    async obtenerAlumnosPorAsignatura(codigoAsignatura) {
        const res = await fetch(`${SUPABASE_URL}/matricula?codigo_asignatura=eq.${codigoAsignatura}&select=alumno(*)`, {
            headers: this.headers
        });
        return await res.json(); 
    },

    async crearAlumnoSiNoExiste(codigo, nombre) {
        const res = await fetch(`${SUPABASE_URL}/alumno?codigo=eq.${codigo}`, { headers: this.headers });
        const data = await res.json();
        if (data.length === 0) {
            await fetch(`${SUPABASE_URL}/alumno`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify([{ codigo, nombre }])
            });
        }
    },

    async obtenerMatriculasDeAsignatura(codigoAsignatura) {
        const res = await fetch(`${SUPABASE_URL}/matricula?codigo_asignatura=eq.${codigoAsignatura}`, {
            headers: this.headers
        });
        return await res.json();
    },
    
    async matricularAlumno(codigoAlumno, codigoAsignatura) {
        await fetch(`${SUPABASE_URL}/matricula`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify([{ codigo_alumno: codigoAlumno, codigo_asignatura: codigoAsignatura }])
        });
    }
    
}