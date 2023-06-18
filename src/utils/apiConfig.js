const BASE_URL = 'https://norma.nomoreparties.space/api/'
export const BASE_WSS = 'wss://norma.nomoreparties.space'

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ошибка: ${res}`);
};

export const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};