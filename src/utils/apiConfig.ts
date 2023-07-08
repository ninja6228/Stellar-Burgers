const BASE_URL: string = 'https://norma.nomoreparties.space/api/'
export const BASE_WSS: string = 'wss://norma.nomoreparties.space'

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const request = async (endpoint: string, options?: any) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  return checkResponse(res);
};