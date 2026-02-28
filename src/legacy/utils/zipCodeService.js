// ZIP Code Service - работа с почтовыми индексами и геолокацией

/**
 * Расчёт расстояния между двумя точками (Haversine formula)
 * @param {number} lat1 - широта точки 1
 * @param {number} lon1 - долгота точки 1
 * @param {number} lat2 - широта точки 2
 * @param {number} lon2 - долгота точки 2
 * @returns {number} - расстояние в милях
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 3959; // Радиус Земли в милях
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (degrees) => degrees * (Math.PI / 180);

/**
 * Находит все ZIP-коды в заданном радиусе от центральной точки
 * @param {number} centerLat - широта центра
 * @param {number} centerLng - долгота центра
 * @param {number} radiusMiles - радиус в милях
 * @param {Array} zipDatabase - массив ZIP-кодов с координатами
 * @returns {Array} - массив ZIP-кодов в радиусе
 */
export const findZipsInRadius = (centerLat, centerLng, radiusMiles, zipDatabase) => {
  return zipDatabase
    .filter(zip => {
      const distance = calculateDistance(centerLat, centerLng, zip.lat, zip.lng);
      return distance <= radiusMiles;
    })
    .map(zip => zip.zip);
};

/**
 * Геокодинг адреса через Mapbox API
 * @param {string} address - адрес для геокодинга
 * @param {string} mapboxToken - Mapbox API token
 * @returns {Promise<Object>} - { lat, lng, formattedAddress, zip }
 */
export const geocodeAddress = async (address, mapboxToken) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}&country=US&types=address,postcode`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const [lng, lat] = feature.center;
      
      // Извлекаем ZIP код из context
      const zipContext = feature.context?.find(c => c.id.startsWith('postcode'));
      const zip = zipContext?.text || '';
      
      return {
        lat,
        lng,
        formattedAddress: feature.place_name,
        zip
      };
    }
    
    throw new Error('Address not found');
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};

/**
 * Reverse геокодинг (координаты → адрес)
 * @param {number} lat - широта
 * @param {number} lng - долгота
 * @param {string} mapboxToken - Mapbox API token
 * @returns {Promise<Object>} - { address, zip, city, state }
 */
export const reverseGeocode = async (lat, lng, mapboxToken) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}&types=address`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      
      const zipContext = feature.context?.find(c => c.id.startsWith('postcode'));
      const cityContext = feature.context?.find(c => c.id.startsWith('place'));
      const stateContext = feature.context?.find(c => c.id.startsWith('region'));
      
      return {
        address: feature.place_name,
        zip: zipContext?.text || '',
        city: cityContext?.text || '',
        state: stateContext?.text || ''
      };
    }
    
    throw new Error('Location not found');
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
};

/**
 * Валидация ZIP-кода США
 * @param {string} zip - ZIP код для проверки
 * @returns {boolean} - валиден ли ZIP
 */
export const validateZip = (zip) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
};

/**
 * Форматирование ZIP-кода (удаление лишних символов)
 * @param {string} zip - ZIP код
 * @returns {string} - отформатированный ZIP
 */
export const formatZip = (zip) => {
  return zip.replace(/[^\d-]/g, '').slice(0, 10);
};
