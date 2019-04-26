import axios from 'axios';

const getCitiesSuggestions = (city, areaId) => {
  const url = '/locations/city';
  return axios.get(url, {
    params: { name: city, areaId: areaId },
  });
};

const getStreets = () => {
  const url = 'locations/street';
  return axios.get(url);
};

const getGlobal = (streetId, house) => {
  const url = 'flat/global';
  return axios.get(url, {
    params: {
      streetId,
      house,
    },
  });
};

export default { getStreets, getCitiesSuggestions, getGlobal };
