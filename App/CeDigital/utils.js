// Funciones útiles y flexibles

export const API_URL = "http://localhost:5265";

export const MONGO_API_URL = "http://localhost:5046";

export const goTo = (e, navigate, url, state = {}) => {
  e.preventDefault();
  navigate(url, { state });
}

export const updateValue = (setFunction, event) => {
  setFunction(event.target.value);
}

export const fetchEstudianteFromMongo = async (carnet) => {
  try {
    const response = await fetch(`${MONGO_API_URL}/api/Estudiante?carnet=${carnet}`);
    if (!response.ok) throw new Error('Estudiante no encontrado en MongoDB');
    const estudiante = await response.json();
    return estudiante;
  } catch (error) {
    console.error('Error al obtener estudiante de Mongo:', error);
    return null;
  }
};
