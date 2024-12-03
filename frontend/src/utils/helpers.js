// Función para obtener la URL válida de la imagen
export const getValidImageUrl = (posterPath) => {
  if (!posterPath || typeof posterPath !== 'object') {
    return defaultPoster;
  }
  return posterPath.little || posterPath.small || posterPath.medium || posterPath.large || defaultPoster;
};

// Otra función de utilidad, por ejemplo, para formatear fechas
export const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-MX', options);
};

// Función para truncar texto
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Puedes seguir agregando más funciones aquí