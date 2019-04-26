export const getNewRequest = state => state.newRequest;

export const getCities = state => getNewRequest(state).citiesSuggestions;

export const citySuggestions = state =>
  getCities(state) instanceof Array ? getCities(state).slice(0, 10) : [];

export const selectedGlobalObject = state => state.geoData.selectedGlobalObject;
