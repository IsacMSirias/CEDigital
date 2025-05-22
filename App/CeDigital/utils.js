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